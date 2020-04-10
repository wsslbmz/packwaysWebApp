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


declare const google: any;
@Component({
    selector: 'app-adresses',
    templateUrl: './adresses.component.html',
    styleUrls: ['./adresses.component.scss'],
    animations: [routerTransition()]
})

export class AdressesComponent implements OnInit {

    @ViewChild(NgAutoCompleteComponent) public completer: NgAutoCompleteComponent;

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    public group = [
        CreateNewAutocompleteGroup('Ville', 'completer',
            [
                {title: 'Ariana', id: '1'},
                {title: 'Beja', id: '2'},
                {title: 'Ben Arous', id: '3'},
                {title: 'Bizerte', id: '4'},
                {title: 'Gabes', id: '5'},
                {title: 'Gafsa', id: '6'},
                {title: 'Jendouba', id: '7'},
                {title: 'Kairouan', id: '8'},
                {title: 'Kasserine', id: '9'},
                {title: 'Kebili', id: '10'},
                {title: 'Kef', id: '11'},
                {title: 'Mahdia', id: '12'},
                {title: 'Manouba', id: '13'},
                {title: 'Medenine', id: '14'},
                {title: 'Monastir', id: '15'},
                {title: 'Nabeul', id: '16'},
                {title: 'Sfax', id: '17'},
                {title: 'Sidi Bouzid', id: '18'},
                {title: 'Siliana', id: '19'},
                {title: 'Sousse', id: '20'},
                {title: 'Tataouine', id: '21'},
                {title: 'Tozeur', id: '22'},
                {title: 'Tunis', id: '23'},
                {title: 'Zaghouan', id: '24'},

            ],
            {titleKey: 'title', childrenKey: null}
        ),
    ];

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
    handleError : any;

    latGlobal: any;
    lngGlobal: any;
    list: string[];


    // tslint:disable-next-line:max-line-length
    constructor(private modalService: NgbModal, private tservice: AdresseService, public http: Http, public sanitizer: DomSanitizer, public elementRef: ElementRef) {}

    ngOnInit() {
        this.getAdressess();
        // this.autoMaps();
        // this.map = this.createMap();
        // this.addMapEventListeners();
    }

    ngAfterViewInit() {
    }


    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openAddModal(content) {
        this.list = [
            '25063551',
            '25697304',
            '11111111'
          ];

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
        this.input = document.getElementById('inputNewNomAdresse');
        const searchBox = new google.maps.places.SearchBox(this.input);
        searchBox.addListener('places_changed', function() {
           const places = searchBox.getPlaces();
           console.log(places[0].geometry.location.lat());
           console.log(places[0].geometry.location.lng());
           this.latGlobal = places[0].geometry.location.lat();
           this.lngGlobal = places[0].geometry.location.lng();
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
           console.log(address);

           const mapProp = {
            center: new google.maps.LatLng(this.latGlobal, this.lngGlobal),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

          if (places.length === 0) {
            return;
          }
       });


    }

      Selected(item: SelectedAutocompleteItem) {
        console.log(item);
    }


    showMarker(){
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
      hideMarker(){
        if(this.Marker){
          this.Marker.setMap(null);
        }
      }


}


