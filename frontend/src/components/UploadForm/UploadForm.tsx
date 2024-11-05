import React, { useState, useCallback, useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FileInput } from '@mantine/core';
import Papa from 'papaparse';
import { GridApi, ColDef, CellClassParams } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { useUploadStore } from '~/stores/UploadStore';
import parseCSV from '~/utilities/parseCSV';
import { TICValidationSchema, uploadFileSchema } from '~/validators/tic.validator';

type UploadFormProps = {
  onSubmit?: () => void;
};

type UploadData = z.infer<typeof uploadFileSchema>;

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const { uploadCSVFile } = useUploadStore();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: { csvFile: undefined }
  });

  const gridApiRef = useRef<GridApi | null>(null);

  const [rowData, setRowData] = useState<UploadData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGridReady: AgGridReactProps['onGridReady'] = useCallback((event) => {
    gridApiRef.current = event.api;
  }, []);

  const handleFileUpload = useCallback(
    async (file: File | null) => {
      if (!file) return;

      const parsedCsv = await parseCSV(file);
      setValue('csvFile', file);
      setRowData(parsedCsv.table);
      setColumnDefs(
        parsedCsv.fields.map((field) => ({
          headerName: field,
          field,
          cellClassRules: {
            'border-red-400': (params: CellClassParams) => {
              const validation = TICValidationSchema.safeParse({ [params.colDef.headerName!]: params.value });
              return !!validation.error.formErrors.fieldErrors[params.colDef.headerName!];
            }
          },
          tooltipValueGetter: (params) => {
            const validation = TICValidationSchema.safeParse({ [params.colDef.headerName!]: params.value });
            return validation.error.formErrors.fieldErrors?.[params.colDef.headerName!];
          }
        }))
      );
    },
    [setValue]
  );

  const handleFormSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      const errors = rowData.some((row) => !TICValidationSchema.safeParse(row).success);

      if (errors) return alert('You have some errors in your CSV data.');
      setIsLoading(true);

      try {
        const csv = Papa.unparse(rowData);
        const blob = new File([csv], data.csvFile.name, { type: 'text/csv;charset=utf-8;' });

        await uploadCSVFile(blob);

        setRowData([]);
        setColumnDefs([]);
        setValue('csvFile', undefined);

        onSubmit();
      } catch (error) {
        alert('Error uploading CSV file');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [rowData, uploadCSVFile, setValue, onSubmit]
  );

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box>
          <Box mb="md">
            <Controller name="csvFile" control={control} render={({ field }) => <FileInput placeholder="Choose file" accept=".csv" {...field} onChange={handleFileUpload} />} />
          </Box>
          <Box mb="md">
            <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
                defaultColDef={{ editable: true, tooltipComponentParams: { arrow: true } }}
                tooltipTrigger="focus"
              />
            </div>
          </Box>
          <Button className="!w-full" type="submit" disabled={rowData.length === 0} loading={isLoading}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UploadForm;
