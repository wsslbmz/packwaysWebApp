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
    items2: any[];
    sDate: any;
    eDate: any;
    constructor(public pickUpService: PickUpService) {}

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
            for (let index = 0; index < this.jsonObj.length; index++) {
                const jTemp = this.jsonObj[index];
                this.items.push(jTemp);
            }
            for (let i = 0; i < this.items.length; i++) {
                const jTemp = this.items[i];
                if (this.items[i][1] !== '0' || this.items[i][1] !== 0) {
                    this.items2.push(this.items[i]);
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
}
