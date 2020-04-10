import { Component, OnInit } from '@angular/core';
import { PickUpService } from './pickup.service';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
    sDate: any;
    eDate: any;
    constructor(public pickUpService: PickUpService) {}

    ngOnInit() {
        this.getNbTripsByUserAndDate ();
    }

    getNbTripsByUserAndDate () {
        this.sDate = '';
        this.eDate = '';
        if ((this.startDate !== null || this.startDate !== '') && 
        (this.endDate !== null || this.endDate !== '')) {
            this.sDate = this.splitDateFormatMDY(this.startDate);
            this.eDate = this.splitDateFormatMDY(this.endDate);
        }        
        this.items = [];

        this.pickUpService.getNbTripsByUserAndDate(this.sDate, this.eDate).subscribe(data => {
            this.result = data['_body'];
    
            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                let jTemp = this.jsonObj[index];
                /* let tab: any = [];
                tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY(jTemp.affectedday),
                 this.splitDateFormatMDY(jTemp.livredday), jTemp.packageTrip.valPackage); */
                this.items.push(jTemp);
            }
            console.log('this.items', this.items[0]);
        },
        err => {
            console.log(err);
        },
        () => {
            //this.excelService.generateExcel(this.tripsByUserAndDate);
            // this.spinner.hide();
        });

    }

    splitDateFormatMDY(dd){
        let dformat = '';
        if (dd != null) {
            let d = '' + dd;
            let arr = d.split(" ");
            dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
        }
        return dformat;
      }
}
