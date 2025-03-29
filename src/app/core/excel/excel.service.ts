import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ExcelSheetConfig } from './excel.model';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  async exportMultipleSheets(
    sheets: ExcelSheetConfig<any>[],
    fileName: string
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();

    for (const sheet of sheets) {
      const worksheet = workbook.addWorksheet(sheet.sheetName);

      // Optional: Title (merged & styled)
      if (sheet.title) {
        const columnCount = Object.keys(sheet.data[0] || {}).length;
        const titleRow = worksheet.addRow([sheet.title]);
        titleRow.font = { bold: true, size: 16 };
        worksheet.mergeCells(1, 1, 1, columnCount);
        titleRow.alignment = { horizontal: 'center' };
        worksheet.addRow([]);
      }

      if (sheet.data.length === 0) continue;

      const headers = Object.keys(sheet.data[0]);
      const headerRow = worksheet.addRow(headers);
      headerRow.font = { bold: true };
      headerRow.alignment = { horizontal: 'center' };

      sheet.data.forEach((item) => {
        const row = headers.map((key) => item[key]);
        worksheet.addRow(row);
      });

      // Autofit columns
      worksheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell!({ includeEmpty: true }, (cell) => {
          const value = cell.value ? cell.value.toString() : '';
          if (value.length > maxLength) {
            maxLength = value.length;
          }
        });
        column.width = maxLength + 2;
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName}.xlsx`);
  }
}
