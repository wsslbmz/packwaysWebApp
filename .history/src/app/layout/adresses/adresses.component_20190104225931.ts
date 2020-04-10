import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TripService } from './trips.service';
import {Trip} from './Trip';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
// import { Observable} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    animations: [routerTransition()]
})
export class TripsComponent implements OnInit {
    closeResult: string;
    trips: Trip[];
    tripss: any;
    items = [];
    itemsLocal = [];
    jsonObj: any;
    result: any;
    datas: any = null;
    obj: Trip;
    objTrip = new Trip();

    private url = 'http://147.135.136.78:8052/trip/';
    constructor(private modalService: NgbModal, private tservice: TripService, public http: Http, public sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.getTripss();
    }

    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    getTripss() {
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServer().subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);          
            }

        });
    }

    /* applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dat.filter = filterValue;
    } */

    editTrip(trip){
        this.obj = trip;
        this.objTrip.sourceTrip = this.obj.sourceTrip;
        this.objTrip.destTrip = this.obj.destTrip;
        this.objTrip.statusTrip = this.obj.statusTrip;
        this.objTrip.prevStatusTrip = this.obj.prevStatusTrip;
        this.objTrip.costTrip = this.obj.costTrip;
        this.objTrip.timingTrip = this.obj.timingTrip;
        this.objTrip.createdday = this.obj.createdday;
        this.objTrip.getedday = this.obj.getedday;
        this.objTrip.affectedday = this.obj.affectedday;
        this.objTrip.startdelday = this.obj.startdelday;
        this.objTrip.livredday = this.obj.livredday;
        this.objTrip.returnedday = this.obj.returnedday;
        this.objTrip.modeTrip = this.obj.modeTrip;
        this.objTrip.codeTrip = this.obj.codeTrip;
        this.objTrip.codeExp = this.obj.codeExp;
        this.objTrip.listdriverTrip = this.obj.listdriverTrip;
        this.objTrip.packageTrip = this.obj.packageTrip;
        //this.objTrip.id = this.obj.idTrip;
     
    }

    infoTrip(trip){
        this.obj = trip;
        this.objTrip.refTrip = this.obj.refTrip;
        this.objTrip.sourceTrip = this.obj.sourceTrip;
        this.objTrip.destTrip = this.obj.destTrip;
        this.objTrip.statusTrip = this.obj.statusTrip;
        this.objTrip.prevStatusTrip = this.obj.prevStatusTrip;
        this.objTrip.costTrip = this.obj.costTrip;
        this.objTrip.timingTrip = this.obj.timingTrip;
        this.objTrip.createdday = this.obj.createdday;
        this.objTrip.getedday = this.obj.getedday;
        this.objTrip.affectedday = this.obj.affectedday;
        this.objTrip.startdelday = this.obj.startdelday;
        this.objTrip.livredday = this.obj.livredday;
        this.objTrip.returnedday = this.obj.returnedday;
        this.objTrip.modeTrip = this.obj.modeTrip;
        this.objTrip.codeTrip = this.obj.codeTrip;
        this.objTrip.codeExp = this.obj.codeExp;
        this.objTrip.listdriverTrip = this.obj.listdriverTrip;
        this.objTrip.packageTrip = this.obj.packageTrip;
        this.objTrip.userTrip = this.obj.userTrip;
        if(this.obj.driverTrip != null){
            this.objTrip.driverTrip = this.obj.driverTrip;     
        }      
        let photo = this.obj.packageTrip.imgPackage;
        let i = photo.indexOf(",");
        photo = photo.slice(i+1,photo.length);
        let photoRes = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + photo);
        this.objTrip.image = photoRes;  
    }

    
}


