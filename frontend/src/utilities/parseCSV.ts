import Papa, { ParseResult } from 'papaparse';

type CSVParseResult = {
  table: Record<string, string>[];
  fields: string[];
};

const parseCSV = async (file: File): Promise<CSVParseResult> => {
  const text = await file.text();
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Record<string, string>>) =>
        resolve({
          table: results.data,
          fields: results.meta.fields ?? []
        }),
      error: (error: Error) => reject(error)
    });
  });
};

export default parseCSV;
