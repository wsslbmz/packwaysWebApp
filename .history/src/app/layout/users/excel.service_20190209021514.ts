import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './packwayslogo.js';
import * as logoRevomonFile from './revomonlogo.js';
import { formatDate } from '@angular/common';

//import * as Excel from 'exceljs/dist/exceljs.min.js';
//import * as ExcelProper from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
 data: any; 

  constructor() {

  }

  generateExcel(tripsData, nameuser, startDate, endDate) {
    // Excel Title, Header, Data
    const title = 'Rapport de livraison de client: '+nameuser ;
    const header = ['REF', 'Status', 'Frais', 'Ville de destination', 'Postulation',
     'Ramassage', 'Livraison', 'Clôture', 'Montant'];
      this.data = tripsData;


    // Create workbook and worksheet
    //const workbook: ExcelProper.Workbook = new Excel.Workbook();
    let workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport de livraison');

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });

    const logoRevomon = workbook.addImage({
      base64: logoRevomonFile.logoRevomonBase64,
      extension: 'png',
    });

    worksheet.mergeCells('B1:B3');
    worksheet.addImage(logo, 'B1:B3');
    //worksheet.addRow([]);    

    // Add Row and formatting
  
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    //worksheet.addRow([]);
    worksheet.addRow(['De: ' + startDate + ' à: '+ endDate]);
    const subTitleRow = worksheet.addRow(['Date de génération: ' + formatDate(new Date(), 'd MMM yyyy HH:mm', 'en')]);

    worksheet.mergeCells('G1:G3');
    worksheet.addImage(logoRevomon, 'G1:G3');
    //worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('D4:F4');
    worksheet.mergeCells('D5:F5');    


    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      row.alignment = {vertical: 'middle', horizontal: 'center'};
      const qty = row.getCell(2);
      let color = 'FF99FF99';
      if (qty.value !== 'Livree') {
        color = 'FF9999';
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }; 
    });

    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 17;
    worksheet.getColumn(4).width = 47;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;

    worksheet.getColumn(4).alignment = {vertical: 'middle', horizontal: 'left'};
    worksheet.getRow(4).alignment = {vertical: 'middle', horizontal: 'center'};
    worksheet.getRow(5).alignment = {vertical: 'middle', horizontal: 'center'};    

    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);

    // Footer Row
    const footerRow = worksheet.addRow(['']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:I${footerRow.number}`);


    let nameReport = 'RapportDeLivraisonDe_'+nameuser+'.xlsx';   //.xlsx
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      //const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, nameReport);
    });

  }



}
