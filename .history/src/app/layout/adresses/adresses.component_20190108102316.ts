import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdresseService } from './adresses.service';
import {Adresse} from './Adresse';
import { DomSanitizer } from '@angular/platform-browser';

// import { Observable} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

declare const google: any;



@Component({
    selector: 'app-adresses',
    templateUrl: './adresses.component.html',
    styleUrls: ['./adresses.component.scss'],
    animations: [routerTransition()]
})

export class AdressesComponent implements OnInit {
    closeResult: string;
    adresses: Adresse[];
    adressess: any;
    items = [];
    itemsLocal = [];
    jsonObj: any;
    result: any;
    datas: any = null;
    obj: Adresse;
    objAdresse = new Adresse();

    public addrKeys: string[];
    public addr: object;
    public latitude: number;
    public longitude: number;

    private input: HTMLInputElement;

    // tslint:disable-next-line:max-line-length
    constructor(private modalService: NgbModal, private tservice: AdresseService, public http: Http, public sanitizer: DomSanitizer, public elRef: ElementRef) {
        this.input = elRef.nativeElement;
    }

    ngOnInit() {
        this.getAdressess();
        // this.autoMaps();
    }

    ngAfterViewInit() {
        this.autoMaps();
    }


    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        // this.autoMaps();
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

    getAdressess() {
        this.jsonObj = null;
        this.items = [];
        this.tservice.getAdresses().subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }

        });
    }

    editAdresse(adresse) {
        this.obj = adresse;
        this.objAdresse.updateday = this.obj.updateday;
        this.objAdresse.geolocAdr = this.obj.geolocAdr;
        this.objAdresse.labelAdr = this.obj.labelAdr;
        this.objAdresse.typeAdr = this.obj.typeAdr;
        this.objAdresse.cityAdr = this.obj.cityAdr;
        this.objAdresse.deletedbyUser = this.obj.deletedbyUser;
        this.objAdresse.createdday = this.obj.createdday;
        this.objAdresse.createdby = this.obj.createdby;
        this.objAdresse.updateby = this.obj.updateby;
        this.objAdresse.deletedbyDriver = this.obj.deletedbyDriver;
        this.objAdresse.createdday = this.obj.createdday;
        this.objAdresse.sharedtoAdr = this.obj.sharedtoAdr;
        this.objAdresse.contactAdr = this.obj.contactAdr;
        this.objAdresse.mobileAdr = this.obj.mobileAdr;
        this.objAdresse.idAdress = this.obj.idAdress;
        this.objAdresse.userAdr = this.obj.userAdr;
    }

    autoMaps() {
        // const el: HTMLInputElement = this.elementRef.nativeElement.querySelector('#searchTextFiel');
        input: HTMLInputElement = this.elRef.nativeElement.querySelector('#searchTextFiel');
        // this.input = document.getElementById('searchTextFiel');
        const autocomplete = new google.maps.places.Autocomplete(this.input);
        // console.log(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            // this.addr = addrObj;
            // console.log(addrObj);
            // this.addrKeys = Object.keys(addrObj);
            console.log(autocomplete);
            const placee = autocomplete.getPlace();
            console.log(placee.name);
            console.log(placee.geometry.location.lat());
            console.log(placee.geometry.location.lng());
            let address = '';
              if (placee.address_components) {
                address = [
                  (placee.address_components[0] && placee.address_components[0].short_name || ''),
                  (placee.address_components[1] && placee.address_components[1].short_name || ''),
                  (placee.address_components[2] && placee.address_components[2].short_name || '')
                ].join(' ');
              }
              console.log(address);
        });
      }
}


