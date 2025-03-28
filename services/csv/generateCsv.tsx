import * as FileSystem from 'expo-file-system';

export const generateCsv = async (salesRecords: any[]): Promise<string> => {
  const headers = 'Item Code, Item Name, Quantity, Date Created, Time Created\n';
  const rows = salesRecords.map(record => {
    return `${record.code}, ${record.name}, ${record.qty}, ${record.date}, ${record.time}`;
  }).join('\n');

  const csvContent = headers + rows;

  const fileUri = FileSystem.documentDirectory + 'sales_records.csv';

  try {
    await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
    return fileUri;
  } catch (error) {
    throw error;
  }
};