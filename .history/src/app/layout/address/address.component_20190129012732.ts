/// <reference types="@types/googlemaps" />
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatSnackBar } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { AddressService } from './address.service';
import {Address} from './Address';
import * as $ from 'jquery';
import { Http } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as jsonData from './tunisia.json';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  animations: [routerTransition()]
  /* styles: [`
    agm-map {
      height: 300px;
    }
  `],
  template: `
    <div class="container">
      <h1></h1>
      <div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl" id="inputNAdresse">
      </div>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom" (mapClick)="mapClicked($event)" id="map" #map>
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
        <agm-marker
      *ngFor="let m of markers; let i = index"
      (markerClick)="clickedMarker(m.label, i)"
      [latitude]="m.lat"
      [longitude]="m.lng"
      [label]="m.label"
      [markerDraggable]="m.draggable"
      (dragEnd)="markerDragEnd(m, $event)">

    <agm-info-window>
      <strong>InfoWindow content</strong>
    </agm-info-window>

  </agm-marker>
      </agm-map>
    </div>
  ` */
})
export class AddressComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  markers: marker[] = [];
  closeResult: string;
  currentUser: any;
  auth: any;
  id: any;
  jsonObj: any;
  result: any;
  adresses = [];
  obj: Address;
  objAdresse = new Address();

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

  searchTerm: FormControl = new FormControl();
  searchResult = [];

  private example = jsonData;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    public http: Http,
    public sanitizer: DomSanitizer,
    private tservice: AddressService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAdresses();
    this.getGovAndDelegOfTunisia();
  }

  searchAddressFromList() {
    this.searchTerm.valueChanges
   		.debounceTime(400)
   		.subscribe(data => {
   			this.tservice.search_word(data).subscribe(response => {
   				console.log(response);
   				this.searchResult = response;
   			});
   		});
  }

  getAdresses() {
    this.jsonObj = null;
    this.adresses = [];
    this.auth = localStorage.getItem('auth');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.auth === 'admin') {
        this.id = 'Admin';
    } else {
        this.id = this.currentUser.data[0].idUser;
    }
    this.tservice.getAdressByUser(this.id).subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            this.adresses.push(this.jsonObj[index]);
        }
    });
  }

  initMapInModal() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const options = {
        types: ['(regions)'],
        componentRestrictions: {country: 'tn'}
      };
      const searchTextFiel = document.getElementById('inputAdrModal');
      const autocomplete = new google.maps.places.Autocomplete(searchTextFiel as HTMLInputElement, options);
      // const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          let address = '';
           if (place.address_components) {
             address = [
               (place.address_components[0] && place.address_components[0].long_name || ''),
               (place.address_components[1] && place.address_components[1].long_name || ''),
               (place.address_components[2] && place.address_components[2].long_name || ''),
               (place.address_components[3] && place.address_components[3].long_name || '')
             ].join(' ');
           }
          console.log(address);
          console.log(place.geometry);

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.latitude);
          console.log(this.longitude);
          this.zoom = 12;

          $('#latglob').val(this.latitude);
          $('#lngglob').val(this.longitude);
          $('#cityglob').val(address);
        });
      });
    });
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

  openAddModal(content) {
    this.list = [];
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.initMapInModal();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
    this.markers.push({
      lat: this.latitude,
      lng: this.longitude,
      draggable: true
    });
  }

  clickedMarker(label: string, index: number) {
    alert(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    if (this.markers.length === 0) {
      console.log('$event ', $event);
      console.log('$event.coords ', $event.coords);
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
      console.log('this.markers', this.markers);
      this.getAddressFromLatLng($event.coords.lat, $event.coords.lng);
    }
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    this.getAddressFromLatLng($event.coords.lat, $event.coords.lng);
  }

  getAddressFromLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder;
    const latlng = {lat: lat, lng: lng};
    let rslt = '';
    geocoder.geocode({'location': latlng}, function(results) {
      if (results[0]) {
        console.log(results[0]);
        console.log(results[0].formatted_address);
        rslt = results[0].formatted_address.toString();
      } else {
        console.log('No results found');
      }
    });
    /* setTimeout(function() {
      this.snackBar.open(rslt, 'Fermer', {
        duration: 2000,
      });
    }, 4000); */
    return rslt;
  }

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
  this.tservice.addadress(this.latGlobal, this.lngGlobal, this.currentUser.data[0].idUser, this.currentUser.data[0].idUser,
       this.labelAdresse, this.nomContact, this.telContact, this.typeAdresse, this.list, this.currentUser.data[0].nameUser,
        this.cityGlobal, this.base64textString[0]);

  window.location.reload();
}

deleteAdresse(adresse) {
  this.tservice.deleteAdr(adresse.idAdress);
  $('#adr-row-' + adresse.idAdress).hide('slow', function() {
      $(this).remove();
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
    let photo = this.obj.imgAdr;
    if (photo != null) {
        const i = photo.indexOf(',');
        photo = photo.slice(i + 1, photo.length);
        const photoRes = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + photo);
        this.objAdresse.imgAdr = photoRes;
    } else {
        this.objAdresse.imgAdr = null;
    }
  }

  getGovAndDelegOfTunisia() {
      /* const jd: any = this.example;
      const obj = Array.of(jd);
      const jsonOb = obj[0].default;
      console.log('Json data : ', jsonOb);
      let json = (jsonOb.responseJSON);
      const gouvernorat = $( '#gouvernorat' );
      const delegation = $( '#delegation' );
      for (let index = 0; index < jsonOb.length; index++) {

        gouvernorat.append('<option value="' + jsonOb[index] + '">' +  jsonOb[index]  + '</option>');
      }
      console.log('jsonOb[2]', jsonOb[2]); */

      let ajaxJson = this.http.get( "https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json")
      .subscribe(data => {
      let result = data['_body'];
      // let jo = JSON.parse(result);
      const obj = Array.of(result);
      const jsonOb: any = obj[0];
      const gouvernorat = $( '#gouvernorat' );
      const delegation = $( '#delegation' );
      console.log('data', jsonOb);
      for (let index = 0; index < jsonOb.length; index++) {

        gouvernorat.append('<option value="' + jsonOb[index] + '">' +  jsonOb[index]  + '</option>');
      }

  });

  }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
