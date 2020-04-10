import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdresseService } from './adresses.service';
import {Adresse} from './Adresse';
import { DomSanitizer } from '@angular/platform-browser';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutoCompleteComponent} from 'ng-auto-complete';

declare const google: any;
@Component({
    selector: 'app-adresses',
    templateUrl: './adresses.component.html',
    styleUrls: ['./adresses.component.scss'],
    animations: [routerTransition()]
})

export class AdressesComponent implements OnInit {

    @ViewChild(NgAutoCompleteComponent) public completer: NgAutoCompleteComponent;

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

    public addrKeys: string[];
    public addr: object;
    public latitude: number;
    public longitude: number;

    public list: any;
    public gov: any;

    searchQuery: any;
    input: any;
    public map ;
    public currentLocation;
    public mapstop: boolean;

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
        console.log(this.input);
        console.log(searchBox);
        searchBox.addListener('places_changed', function() {
           const places = searchBox.getPlaces();
           console.log(places);
           console.log(places[0]);
           console.log(places[0].geometry.location.lat());
           console.log(places[0].geometry.location.lng());
           let address = '';
           if (places[0].address_components) {
             address = [
               (places[0].address_components[0] && places[0].address_components[0].short_name || ''),
               (places[0].address_components[1] && places[0].address_components[1].short_name || ''),
               (places[0].address_components[2] && places[0].address_components[2].short_name || '')
             ].join(' ');
           }
           console.log(address);

          if (places.length === 0) {
            return;
          }
       });


    }

      Selected(item: SelectedAutocompleteItem) {
        console.log(item);
    }


    createMap(location = new google.maps.LatLng(36.7067011, 10.42221219999999)) {
        // console.log('init location ' + location)
        const mapOptions = {
          center: location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
        const mapEl = document.getElementById('map');
        const map = new google.maps.Map(mapEl, mapOptions);

        // Create the search box and link it to the UI element.
        this.input = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(this.input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
          console.log('changed', this.input);
          this.searchQuery = '';

        });
        let markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              this.searchQuery = '';
              const places = searchBox.getPlaces();
              console.log(places);
              if (places.length === 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {

                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              const bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log('Returned place contains no geometry');
                  return;
                }


                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: '/',
                  title: place.name,
                  position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });
        return map;
      }


      addMapEventListeners() {
        google.maps.event.addListener(this.map, 'dragstart', () => {
          this.mapstop = false;
        });
        google.maps.event.addListener(this.map, 'dblclick', () => {
          this.mapstop = false;
        });
        google.maps.event.addListener(this.map, 'zoom_changed', () => {
          this.mapstop = false;
        });
        google.maps.event.addListener(this.map, 'idle', () => {
          this.mapstop = true;
          // console.log("mapppppppppppp idle")
        });

      }
}


