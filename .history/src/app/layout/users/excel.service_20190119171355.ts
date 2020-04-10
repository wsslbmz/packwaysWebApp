import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './packwayslogo.js';
import { formatDate } from '@angular/common';
import { Http} from '@angular/http';
//import * as Excel from 'exceljs/dist/exceljs.min.js';
//import * as ExcelProper from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
 data: any;
 public urlTrip = 'http://147.135.136.78:8052/trip/';
  result: any;
  jsonObj: any;
  items: any;
  tripsByUserAndDate: any;

  constructor(public http: Http) {

  }

  generateExcel(idUsr, dateD, dateF) {
    // Excel Title, Header, Data
    const title = 'Rapport de livraison';
    const header = ['REF', 'Status du colis', 'Frais de livraison', 'Ville de destination',
     'Date d\'expédition', 'Date de livraison', 'Montant du colis'];
      this.data = this.getTripsByUserAndDate(idUsr, dateD, dateF);
      /* [
      [2007, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10],
      [2007, 1, 'Toyota ', 'Toyota Rav4', 819, 6.5],
      [2007, 1, 'Toyota ', 'Toyota Avensis', 787, 6.2],
      [2007, 1, 'Volkswagen ', 'Volkswagen Golf', 720, 5.7],
      [2007, 1, 'Toyota ', 'Toyota Corolla', 691, 5.4],
      [2007, 1, 'Peugeot ', 'Peugeot 307', 481, 3.8],
      [2008, 1, 'Toyota ', 'Toyota Prius', 217, 2.2],
      [2008, 1, 'Skoda ', 'Skoda Octavia', 216, 2.2],
      [2008, 1, 'Peugeot ', 'Peugeot 308', 135, 1.4],
      [2008, 2, 'Ford ', 'Ford Mondeo', 624, 5.9],
      [2008, 2, 'Volkswagen ', 'Volkswagen Passat', 551, 5.2],
      [2008, 2, 'Volkswagen ', 'Volkswagen Golf', 488, 4.6],
      [2008, 2, 'Volvo ', 'Volvo V70', 392, 3.7],
      [2008, 2, 'Toyota ', 'Toyota Auris', 342, 3.2],
      [2008, 2, 'Volkswagen ', 'Volkswagen Tiguan', 340, 3.2],
      [2008, 2, 'Toyota ', 'Toyota Avensis', 315, 3],
      [2008, 2, 'Nissan ', 'Nissan Qashqai', 272, 2.6],
      [2008, 2, 'Nissan ', 'Nissan X-Trail', 271, 2.6],
      [2008, 2, 'Mitsubishi ', 'Mitsubishi Outlander', 257, 2.4],
      [2008, 2, 'Toyota ', 'Toyota Rav4', 250, 2.4],
      [2008, 2, 'Ford ', 'Ford Focus', 235, 2.2],
      [2008, 2, 'Skoda ', 'Skoda Octavia', 225, 2.1],
      [2008, 2, 'Toyota ', 'Toyota Yaris', 222, 2.1],
      [2008, 2, 'Honda ', 'Honda CR-V', 219, 2.1],
      [2008, 2, 'Audi ', 'Audi A4', 200, 1.9],
      [2008, 2, 'BMW ', 'BMW 3-serie', 184, 1.7],
      [2008, 2, 'Toyota ', 'Toyota Prius', 165, 1.6],
      [2008, 2, 'Peugeot ', 'Peugeot 207', 144, 1.4]
    ]; */

    // Create workbook and worksheet
    //const workbook: ExcelProper.Workbook = new Excel.Workbook();
    let workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapport de livraison');


    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : ' + formatDate(new Date(), 'd MMM yy HH:mm', 'en')]);


    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });

    worksheet.addImage(logo, 'E1:F3');
    worksheet.addImage(logo, 'A1:B3');
    worksheet.mergeCells('A1:D2');


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
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999';
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    }

    );

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);

    // Footer Row
    const footerRow = worksheet.addRow(['J\'atteste                            avoir reçule montant total des colis.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    
    // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
      //const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'RapportDeLivraison.xlsx');
    });

  }



  getTripsByUserAndDate(idUser, sDate, eDate) {
    this.tripsByUserAndDate = [];
    this.http.get(`${this.urlTrip}bydate/` + idUser + `?d1=`  + sDate + `&d2=` + eDate).subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            let jTemp = this.jsonObj[index];
            let tab: any = [];
            tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.changeDateFormatDMY(jTemp.affectedday),
             this.changeDateFormatDMY(jTemp.livredday), jTemp.packageTrip.valPackage);
            this.tripsByUserAndDate.push(tab);
        }
    });
    console.log('this.tripsByUserAndDate ', this.tripsByUserAndDate);
    return this.tripsByUserAndDate;
  }

  changeDateFormatDMY(dd){
    var d = new Date(dd);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();    
    let dformat = [day, month, year].join('/');

    return dformat;
 }
}
