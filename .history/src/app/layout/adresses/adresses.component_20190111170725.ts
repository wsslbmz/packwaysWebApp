import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdresseService } from './adresses.service';
import {Adresse} from './Adresse';
import { DomSanitizer } from '@angular/platform-browser';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutoCompleteComponent} from 'ng-auto-complete';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as $ from 'jquery';


declare const google: any;
@Component({
    selector: 'app-adresses',
    templateUrl: './adresses.component.html',
    styleUrls: ['./adresses.component.scss'],
    animations: [routerTransition()]
})

export class AdressesComponent implements OnInit {

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    auth:any;
    id:any;
    currentUser:any;
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

    input: any;

    adrPosition: any;
    Marker: any;
    handleError: any;

    latgl: any;
    lnggl: any;
    latGlobal: any;
    lngGlobal: any;
    cityGlobal: any;
    list: any;

    numTel: any;
    labelAdresse: any;
    nomContact: any;
    telContact: any;
    imgAdresse: any;
    typeAdresse: any;

    base64textString = [];

    constructor(private modalService: NgbModal, private tservice: AdresseService, public http: Http, public sanitizer: DomSanitizer, public elementRef: ElementRef) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.items = this.tservice.getAdresses();
        console.log('iteeeeeems', this.items);
        this.latgl = '33.888077';
        this.lnggl = '8.888077';

           const mapProp = {
            center: new google.maps.LatLng(this.latgl, this.lnggl),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }


    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openAddModal(content) {
        this.list = [];
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.searchPlaces();
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
/*
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
    }*/

    

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
        const searchTextFiel = document.getElementById('inputNewNomAdresse');
        const autocomplete = new google.maps.places.Autocomplete(searchTextFiel as HTMLInputElement);
        console.log(searchTextFiel);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
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

    searchPlaces() {

        $('#idstatmap').hide();
        this.input = document.getElementById('inputNewNomAdresse');
        const searchBox = new google.maps.places.SearchBox(this.input);
        searchBox.addListener('places_changed', function() {
           const places = searchBox.getPlaces();
           /* console.log(places[0].geometry.location.lat());
           console.log(places[0].geometry.location.lng());
           this.latGlobal = places[0].geometry.location.lat();
           this.lngGlobal = places[0].geometry.location.lng(); */
           /* (<HTMLInputElement>document.getElementById('inputNewCityAdresse')).value = places[0].address_components[2].long_name; */
           let address = '';
           if (places[0].address_components) {
             address = [
               (places[0].address_components[0] && places[0].address_components[0].long_name || ''),
               (places[0].address_components[1] && places[0].address_components[1].long_name || ''),
               (places[0].address_components[2] && places[0].address_components[2].long_name || ''),
               (places[0].address_components[3] && places[0].address_components[3].long_name || '')
             ].join(' ');
           }
           $('#latglob').val(places[0].geometry.location.lat());
           $('#lngglob').val(places[0].geometry.location.lng());
           $('#cityglob').val(address);

          if (places.length === 0) {
            return;
          }

          this.hide = true;
          console.log(this.hide);
          $('#idstatmap').show();
          // tslint:disable-next-line:max-line-length
          $('#idimgmap').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=' + places[0].geometry.location.lat() + ',' + places[0].geometry.location.lng() + '&zoom=12&size=800x320&markers=color:red%7Clabel:D%7C' + places[0].geometry.location.lat() + ',' + places[0].geometry.location.lng() + '&maptype=roadmap&key=AIzaSyDfv9xCJhmLahpNkDvNDUmZ8jSkHiA19oE');
       });


    }

    /* showMarker(){
        this.hideMarker();
        this.Marker =  new google.maps.Marker({
          map : this.map,
          animation : google.maps.Animation.BOUNCE,
          position : this.map.getCenter(),
          icon : 'src/assets/imgs/bg_pin.png'
        });
          this.Marker.setAnimation(google.maps.Animation.BOUNCE);
          this.markerLocation();
        // let markerlocation = new google.maps.LatLng();
        // markerlocation = this.Marker.getPosition();
          //this.updateLocation(this.adrPosition.lat().toString(),this.adrPosition.lng().toString())
        }

      markerLocation() {
        let markerlocation = new google.maps.LatLng();
        markerlocation = this.Marker.getPosition();
        this.adrPosition = markerlocation;
        this.latGlobal = (this.adrPosition.lat()).toString();
         this.lngGlobal = (this.adrPosition.lng()).toString();
        return (markerlocation);
      }
      hideMarker() {
        if(this.Marker) {
          this.Marker.setMap(null);
        }
      }
 */
      addNumToList() {
          this.list.push(this.numTel);

          console.log(this.typeAdresse);
          console.log(this.base64textString);
      }

      onUploadChange(evt: any) {
        const file = evt.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = this.handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        }
      }

      handleReaderLoaded(e) {
        this.base64textString = [];
        this.base64textString.push('data:image/jpeg;base64,' + btoa(e.target.result));
      }
      
     addAdresse() {
        this.latGlobal = $('#latglob').val(); 
        this.lngGlobal = $('#lngglob').val(); 
        this.cityGlobal = $('#cityglob').val(); 
         console.log('this.latGlobal: ', this.latGlobal);         
        this.tservice.addadress(this.latGlobal, this.lngGlobal, this.currentUser.data[0].idUser, this.currentUser.data[0].idUser, this.labelAdresse, this.nomContact, this.telContact, this.typeAdresse, this.list, this.currentUser.data[0].nameUser, this.cityGlobal, this.base64textString[0]);
     }





}


