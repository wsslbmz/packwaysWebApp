import { Component, OnInit } from '@angular/core';
import { PickUpService } from './pickup.service';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from './excel.service';

@Component({
    selector: 'app-pickup',
    templateUrl: './pickup.component.html',
    styleUrls: ['./pickup.component.scss'],
    animations: [routerTransition()]
})
export class PickUpComponent implements OnInit {

    endDate: any;
    startDate: any;
    obj: any;
    tripsByUserAndDate: any[];
    closeResult: string;
    jsonObj: any;
    result: any;
    items: any[];
    items2: any[];
    sDate: any;
    eDate: any;
    tripsAll: any;
    constructor(public pickUpService: PickUpService, private excelService: ExcelService) {}

    ngOnInit() {
        this.getNbTripsByUserAndDate ();
    }

    getNbTripsByUserAndDate () {
        this.sDate = '';
        this.eDate = '';
        // console.log('this.startDate', this.startDate);
        if ((this.startDate !== null || this.startDate !== '' || this.startDate !== undefined) &&
        (this.endDate !== null || this.endDate !== '' || this.endDate !== undefined)) {
            this.sDate = this.splitDateFormatMDY(this.startDate);
            this.eDate = this.splitDateFormatMDY(this.endDate);
        }
        this.items = [];
        this.items2 = [];
        // console.log('this.sDate', this.sDate);
        // console.log('this.startDate2', this.splitDateFormatMDY(this.startDate));

        this.pickUpService.getNbTripsByUserAndDate(this.sDate, this.eDate).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            this.jsonObj.sort(function (a, b) {
                return b[1] - a[1];
             });
            for (let index = 0; index < this.jsonObj.length; index++) {
                const jTemp = this.jsonObj[index];
                const zero = '' + 0;
                if ((jTemp[1]).toString() !== zero) {
                    this.items.push(jTemp);
                }
            }
        },
        err => {
            console.log(err);
        },
        () => {
            // this.excelService.generateExcel(this.tripsByUserAndDate);
            // this.spinner.hide();
        });

    }

    splitDateFormatMDY(dd) {
        let dformat = '';
        if (dd != null) {
            const d = '' + dd;
            const arr = d.split('-');
            dformat = arr[1] + '/' + arr[2] + '/' + arr[0];
        }
        return dformat;
      }

      splitDateFormatMDY2(dd){
        let dformat = '';
        if (dd != null) {
            let d = '' + dd;
            let arr = d.split(" ");
            dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
        }
        return dformat;
     }

      generateExcel() {                        
        this.tripsAll = [];        

        this.pickUpService.getAllTrips().subscribe(data => {
            this.result = data['_body'];
    
            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];         
            let deletedTp = '';            
            
            for (let index = (this.jsonObj.length) - 1; index >= 0; index++) {
                let jTemp = this.jsonObj[index];
                if (jTemp.deleted !== null) {
                    if (jTemp.deleted === true) {
                        deletedTp = 'Oui';
                    } else {
                        deletedTp = 'Non';
                    }
                }				
                let userName = jTemp.userTrip.nameUser;

                let tab: any = [];
				tab.push(jTemp.refTrip, userName, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY2(jTemp.createdday),
				this.splitDateFormatMDY2(jTemp.getedday), this.splitDateFormatMDY2(jTemp.livredday),
				deletedTp, jTemp.packageTrip.valPackage);
				this.tripsAll.push(tab);
            }            
        },
        err => {
            console.log(err);
        },
        () => {            
            this.excelService.generateExcel(this.tripsAll);            
        });

}
}
