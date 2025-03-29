export interface ExcelSheetConfig<T extends object> {
  sheetName: string;
  data: T[];
  title?: string;
  protectSheet?: boolean;
}
