import { AppError } from '~/errors/app.error';
import { Injection } from '~/injection';
import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { BillingCodeType, BillingClass, PlanMarketType, TinType } from '~/modules/upload/constants';
import fileSchema from '~/modules/upload/json/file.schema.json';
import UploadStore from '~/modules/upload/upload.store';
import { InternalFileData, UploadTICFile, TICFile } from '~/modules/upload/types';
import { parseCsvFile } from '~/utils/parse-csv-file';

@injectable()
class UploadService {
  private ajv = new Ajv();

  constructor(@inject(Injection.UploadStore) private readonly uploadStore: UploadStore) {}

  public async generateFromCSVFile(csv: File): Promise<UploadTICFile[]> {
    const parsedCsv = await parseCsvFile(csv);

    const internalData: InternalFileData[] = parsedCsv.table.map((row) => ({
      groupName: row['Group Name'],
      providerName: row['Provider Name'],
      plan: row['Plan'],
      planId: row['Plan ID'],
      placeOfService: row['Place of Service'],
      claimType: row['Claim Type'] as BillingClass,
      procedureCode: row['Procedure Code'],
      providerId: row['Provider ID'],
      allowed: parseFloat(row['Allowed']),
      billed: parseFloat(row['Billed'])
    }));

    const newFiles = internalData.map(async (row) => {
      const fileRow = this.convertInternalFileRowToRMFRow(row);
      return await this.uploadStore.saveFileToMFR(fileRow);
    });

    return Promise.all(newFiles);
  }

  private convertInternalFileRowToRMFRow(row: InternalFileData): TICFile {
    const fileRow: TICFile = {
      reporting_entity_name: row.groupName,
      reporting_entity_type: PlanMarketType.GROUP,
      plan_name: row.plan,
      plan_id_type: 'plan_id',
      plan_id: row.planId,
      plan_market_type: PlanMarketType.GROUP,
      last_updated_on: new Date().toISOString().split('T')[0],
      version: '1.0',
      out_of_network: [
        {
          name: row.providerName,
          billing_code_type: BillingCodeType.CPT,
          billing_code_type_version: '2024',
          billing_code: row.procedureCode,
          description: row.placeOfService,
          allowed_amounts: [
            {
              tin: {
                type: TinType.EIN,
                value: row.providerId
              },
              service_code: [],
              billing_class: row.claimType?.toLowerCase() as BillingClass,
              payments: [
                {
                  allowed_amount: row.allowed,
                  billing_code_modifier: [],
                  providers: [
                    {
                      billed_charge: row.billed,
                      npi: [parseInt(row.providerId, 10)]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const validate = this.ajv.compile(fileSchema);
    if (!validate(fileRow)) {
      throw new AppError('Invalid row data', StatusCodes.BAD_REQUEST);
    }

    return fileRow;
  }
}

export default UploadService;
