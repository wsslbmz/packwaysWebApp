import { AdresseService } from './../adresses/adresses.service';
import { Adresse } from './../adresses/Adresse';
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
import { LoginService } from 'src/app/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

//import * as bootstrap from 'bootstrap';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf'; 
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
//import * as angular from 'angular';

declare var angular: any;
declare var UIkit: any;

declare var require: any;
const TunisiaGovAndDelg = require('./tunisia.js');
@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    animations: [routerTransition()]
})
export class TripsComponent implements OnInit {
    

    jsonObj1:any;
    closeResult: string;
    auth:any
    id:any;
    idTrip:any;
    Adresses =[];
    trips: Trip[];
    tripss: any;
    items = [];
    itemsSearch = [];
    itemsLocal = [];
    jsonObj: any;
    result: any;
    datas: any = null;
    obj: Trip;
    objTrip = new Trip();

    checkedTrips = [];

    nxtBtnDisabled = false;
    prvBtnDisabled = false;
    nDate: any;
    pDate: any;

    base64textString = [];

    driver:any;
    Listdriver:any;
    currentUser: any;

    cityAdresseExp: any;
    contactAdresseExp: any;
    telContAdresseExp: any;
    cityAdresseDest: any;
    labelAdresseDest: any;
    contactAdresseDest: any;
    telContAdresseDest: any;
    selectedAdresseExp: any;
    selectedAdresseDest: any;

    selectedTripType: any;
    longueurTrip: any;
    largeurTrip: any;
    hauteurTrip: any;
    poidsTrip: any;
    imgTrip: any;
    valueTrip: any;
    descriptionTrip: any;
    modeLiv: any;
    typePaiement: any;
    sizePack: string;
    pricePack: number;
    dataUser: any;
    poidVol: any;
    distancePack: any;

    fraixTotal: any;
    valeurTotal: any;

    tripBl: any;
    isVisible: boolean;
    
    searchTerm: string = '';
    input: any;
    latGlobalDest: any;
    lngGlobalDest: any;
    cityGlobalDest: any;
    random: any;
    scans: any;

    numDisplayedElement: any;
    sizeListTrip: any;
    displayedNumber: any;
    chooseView = 'none';
    displayedNumberList = ['20', '50', '70', '100', '150', '200', '300', '400', '500', 'all'];
    inputPreMessageToClient: any;
    inputCusMessageToClient: any;
    PreMessages = ['Numéro incorrect', 'Client injoignable', 'Client absent au rendez-vous', 'Colis non conforme'];
    trpMsg: any;

    dateJ: any;
    totalTripInManifest: any;

    gouvernorat: any;
    delegation: any;
    inputComposedAdresse: any;
    latitude2: number;
    longitude2: number;

    displayQrCode: boolean;

    constructor(private modalService: NgbModal,public adressService: AdresseService, private tservice: TripService,
         public loginService: LoginService, public http: Http, public sanitizer: DomSanitizer, public router: Router,
         private spinner: NgxSpinnerService, private snackBar: MatSnackBar,) {
            this.auth = localStorage.getItem('auth');
            if (this.auth === 'admin'){
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
            this.random = Math.random;            
         }

    ngOnInit() {
        this.getTrips();                
        // this.getTripsOnInit();
        /* this.tservice.getTrips().subscribe( data => {
            this.items = data;
        }); */

        this.getAllDrivers();
        
        this.id = this.id.replace('UT', '');
        this.Adresses = this.adressService.getAdresses();
        console.log(this.Adresses);                    
    }
    
    /* MyCtrl($timeout, $q) {
        var fetchOne = function() {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve([this.random, this.random + 100, this.random + 200]);
            }, this.random * 5000);
            return deferred.promise;
        };
        
        this.scans = [];
        for (var i = 0; i < 5; i++) {
            fetchOne().then(function(items) {
                angular.forEach(items, function(item) {
                    this.scans.push(item);
                });
            });
        };
    } */

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
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.searchPlaces();
        this.getGovAndDelegOfTunisia();
    }    
    
    
    openDechargeModal(content) {
        this.displayQrCode = true;
        console.log('numDisplayedElement', this.numDisplayedElement) ;
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        if(this.checkedTrips != null) {
            this.fraixTotal = 0;
            this.valeurTotal = 0;
            this.totalTripInManifest = this.checkedTrips.length;
            let dj = new Date();
            this.dateJ = this.changeDateFormatDMY(dj);
            for(let i =0; i< this.checkedTrips.length; i++){
                this.fraixTotal = this.fraixTotal + this.checkedTrips[i].costTrip;
                this.valeurTotal = this.valeurTotal + this.checkedTrips[i].packageTrip.valPackage;
            }
        }

    }
    openBordereauxModal(content) {        
        this.openDechargeModal(content);
        this.displayQrCode = false;
    }

    openBlModal(content, trip) {
        this.AskOfBonLiv(trip);
        this.tripBl = trip;
        this.open(content);
    }

    getTrips() {
        this.auth =localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin'){
            this.id ='admin';
        }else{
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
        this.jsonObj = null;
        this.items = [];
        console.log('this.chooseView', this.chooseView);
        if (this.chooseView != 'none') {
            this.sizeListTrip = this.chooseView;
        } else {
            this.sizeListTrip = 20;
        }
        this.tservice.getTrips(this.id, this.sizeListTrip).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            this.itemsSearch = this.items;
            this.spinner.hide();
        });

        this.setCheckedTrip();
    }

    getTripsOnInit() {
        console.log('numDisplayedElement', this.numDisplayedElement) ;
        this.auth =localStorage.getItem('auth');
        console.log('login',this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === "admin"){
            this.id ="Admin";
        }else{
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
       // let id="Admin";
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServerOnInit(this.id).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            if (this.items.length === 20) {
                this.nDate = this.items[this.items.length - 1].createdday;
                this.pDate = this.items[0].createdday;
                this.nxtBtnDisabled = true;
                this.prvBtnDisabled = true;
            } else {
                this.nxtBtnDisabled = false;
                this.prvBtnDisabled = false;
            }

        });

        this.setCheckedTrip();
    }

    getTripsOnNext(nextDate) {
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServerOnNext(this.id,nextDate).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            console.log(this.items.length);
            if (this.items.length === 20) {
                this.nDate = this.items[this.items.length - 1].createdday;
                this.pDate = this.items[0].createdday;
                this.nxtBtnDisabled = true;
                this.prvBtnDisabled = true;
            } else {
                this.nxtBtnDisabled = false;
            }
        });
        this.setCheckedTrip();
    }

    getTripsOnPrevious(previousDate) {
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServerOnPrevious(this.id,previousDate).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            if (this.items.length === 20) {
                this.nDate = this.items[this.items.length - 1].createdday;
                this.pDate = this.items[0].createdday;
                this.prvBtnDisabled = true;
                this.nxtBtnDisabled = true;
            } else {
                this.prvBtnDisabled = false;
            }

        });
        this.setCheckedTrip();
    }

    /* applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dat.filter = filterValue;
    } */

    editTrip(content, trip) {        
        this.idTrip =trip.idTrip;
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
        // this.objTrip.id = this.obj.idTrip;

        // this.AskOfBonLiv(trip);
        this.open(content);

    }

    infoTrip(content, trip) {
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
        this.objTrip.descriptionTrip = this.obj.descriptionTrip;
        this.objTrip.msgTrip = this.obj.msgTrip;
        if (this.obj.driverTrip != null) {
            this.objTrip.driverTrip = this.obj.driverTrip;
        }
        let photo = this.obj.packageTrip.imgPackage;
        if(photo != null) {
            const i = photo.indexOf(',');
            photo = photo.slice(i + 1, photo.length);
            const photoRes = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + photo);
            this.objTrip.image = photoRes;
        } else {
            this.objTrip.image = null;
        }

        this.open(content);
    }

    addTrip() {
        const a = $('#latglobDest').val();
        const b = $('#cityglobDest').val();
            if (a === null || a === '' || a === undefined || b === null || b === '' || b === undefined ||
             this.selectedAdresseExp === undefined ||
            this.contactAdresseDest === undefined || this.telContAdresseDest === undefined || this.selectedTripType === undefined
            || this.descriptionTrip === undefined || this.valueTrip === undefined ||
             this.modeLiv === undefined || this.typePaiement === undefined) {
                this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', {
                    duration: 5000,
                });
                return;
        }
        this.latGlobalDest = $('#latglobDest').val();
        this.lngGlobalDest = $('#lngglobDest').val();
        this.cityGlobalDest = $('#cityglobDest').val();
        console.log(this.latGlobalDest+'***'+this.lngGlobalDest+'***'+this.cityGlobalDest);

        const nowd = new Date();
        this.sizePack = ''+this.longueurTrip+ 'X'+this.largeurTrip + 'X' + this.hauteurTrip;
        this.calculePrice();

        if (this.selectedTripType === 'doc' || this.selectedTripType === 'pack') {
            this.sizePack = null;
            this.poidsTrip = 0;
        }

        this.tservice.addTrip(
            this.dataUser.nameUser, this.dataUser.emailUser, this.dataUser.rateUser, this.dataUser.idUser,
            this.dataUser.nbrateUser, this.dataUser.nbrdeliveryUser, this.dataUser.mobileUser, this.dataUser.surnameUser,
            this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng, this.selectedAdresseExp.contactAdr,
            this.selectedAdresseExp.mobileAdr, this.contactAdresseDest,
            this.telContAdresseDest, nowd, 'UT' + this.dataUser.idUser, this.dataUser.idUser,
            nowd, this.latGlobalDest, this.lngGlobalDest, this.modeLiv,
            this.pricePack, this.selectedTripType, this.valueTrip, this.poidsTrip,
            this.sizePack, this.typePaiement, 'REF', 'cherche un livreur',
            this.selectedAdresseExp.cityAdr, this.cityGlobalDest, this.base64textString[0], this.descriptionTrip,
            null);

       window.location.reload();
    }

    updatetrip() {

        this.update(this.objTrip.destTrip.contactAdr, this.objTrip.destTrip.mobileAdr, this.objTrip.destTrip.cityAdr,
             this.objTrip.timingTrip, this.objTrip.statusTrip, this.objTrip.prevStatusTrip,
                    this.objTrip.createdday, this.objTrip.affectedday, this.objTrip.getedday,
                    this.objTrip.startdelday, this.objTrip.livredday, this.objTrip.returnedday,
                    this.objTrip.costTrip, this.objTrip.packageTrip.valPackage, this.driver);
                    //window.location.reload();
    }

    update(contactAdr, mobileAdr, cityAdr, timingTrip, statusTrip, prevStatusTrip, createday, affectedday, getedday, startdelday, livredday,
         returnedday, costTrip, valTrip, driver) {

        let x = null;
        if (driver != null) {
          driver.createdday = new Date(driver.createdday);
          driver.updateday = new Date(driver.updateday);
          driver.lastUpdate = new Date(driver.lastUpdate);
          for (let i = 0; i < driver.vehicleDriver.length; i++) {
            driver.vehicleDriver[i].createdday = new Date(driver.vehicleDriver[i].createdday);
            driver.vehicleDriver[i].updateday = new Date(driver.vehicleDriver[i].updateday);
          }
          x = [driver];
        }

         if (createday != null) {
             createday = new Date(createday);
         }
         if (affectedday != null) {
            affectedday = new Date(affectedday);
          }
          if (getedday != null) {
            getedday = new Date(getedday);
          }
          if (startdelday != null) {
            startdelday = new Date(startdelday);
          }
          if (livredday != null) {
            livredday = new Date(livredday);
          }
          if (returnedday != null) {
            returnedday = new Date(returnedday);
          }

        const tripData = {
            destTrip: {
                contactAdr: contactAdr,
                mobileAdr: mobileAdr,
                cityAdr: cityAdr
            },
            timingTrip: timingTrip,
            statusTrip: statusTrip,
            prevStatusTrip: prevStatusTrip,
            createdday: createday,
            affectedday: affectedday,
            getedday: getedday,
            startdelday: startdelday,
            livredday: livredday,
            returnedday: returnedday,
            costTrip: costTrip,
            listdriverTrip: x,
            packageTrip: {
                valPackage: valTrip
            }
        };
        console.log('data=', tripData);
        this.tservice.updateTrip(tripData, this.idTrip).subscribe(data => {
            const result = data['_body'];
            console.log(data['_body']);
            const jo = JSON.parse(result);
            const obj = Array.of(jo.data);
            this.snackBar.open('La modification a été effectuée avec succès', 'Fermer', {
                duration: 5000,
            });
           }, error => {
            console.log(error); // Error getting the data
            this.snackBar.open('Error! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
          });
    }

    getAllDrivers() {
        this.tservice.getDrivers().subscribe(data => {
         this.result = data['_body'];
         // console.log(data['_body'])
         const jo = JSON.parse(this.result);
         const obj = Array.of(jo.data);
         this.jsonObj = obj[0];
         this.Listdriver = this.jsonObj;
         console.log('listdriver!::', this.Listdriver);
       }, error => {
         // console.log(error);
       });
    }

    show1() {
        document.getElementById('div_dimensions').style.display = 'none';
        console.log('none');
        this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
            this.latGlobalDest, this.lngGlobalDest, 'K' );
        console.log('distancePack', this.distancePack);
        const address = (<HTMLInputElement>document.getElementById('inputComposedAdresse')).value;
        $( '#cityglobDest' ).val(address);
      }
      show2() {
        document.getElementById('div_dimensions').style.display = 'block';
        console.log('block');
        this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
            this.latGlobalDest, this.lngGlobalDest, 'K' );
        console.log('distancePack', this.distancePack);
        const address = (<HTMLInputElement>document.getElementById('inputComposedAdresse')).value;
        $( '#cityglobDest' ).val(address);
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

    onChangeDisplayedElement() {

        this.spinner.show();
        this.getTrips();

    }

    onClickAdrExp() {
        console.log('Addresse Exp name', this.selectedAdresseExp);
        this.cityAdresseExp = this.selectedAdresseExp.cityAdr;
        this.contactAdresseExp = this.selectedAdresseExp.contactAdr;
        this.telContAdresseExp = this.selectedAdresseExp.mobileAdr;
    }

    onClickAdrDest() {
        if (!this.selectedAdresseExp) {
            alert('Veuillez sélectionner l\'adresse source!');
        } else {
            console.log('Addresse Dest name', this.selectedAdresseDest);
            this.cityAdresseDest = this.selectedAdresseDest.cityAdr;
            this.contactAdresseDest = this.selectedAdresseDest.contactAdr;
            this.telContAdresseDest = this.selectedAdresseDest.mobileAdr;

            $('#latglobDest').val(this.selectedAdresseDest.geolocAdr.lat);
            $('#lngglobDest').val(this.selectedAdresseDest.geolocAdr.lng);
            $('#cityglobDest').val(this.selectedAdresseDest.cityAdr);

            this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
                this.selectedAdresseDest.geolocAdr.lat, this.selectedAdresseDest.geolocAdr.lng, 'K' );
            console.log('distancePack', this.distancePack);

            /* let p1  = new google.maps.LatLng(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng);
            let p2  = new google.maps.LatLng(this.selectedAdresseDest.geolocAdr.lat, this.selectedAdresseDest.geolocAdr.lng);
            this.calculeDistance(p1, p2, this.distancePack); */
        }
    }

    deleteTrip(trip) {
        this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
        $('#trip-row-' + trip.idTrip).hide('slow', function() {
                $(this).remove();
        });
    }


    // f1
    calculeDistance(pt1, pt2, distance) {
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
            origins: [pt1],
            destinations: [pt2],
            travelMode: google.maps.TravelMode['DRIVING'],
            avoidHighways: false,
            avoidTolls: false,
            }, callback.bind(this));

        function callback(response) {
            distance = response.rows[0].elements[0].distance.value;
            this.distancePack = response.rows[0].elements[0].distance.value;
            console.log('distancePackkk', this.distancePack);
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        } else {
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lon1 - lon2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === 'K') { dist = dist * 1.609344; }
            if (unit === 'N') { dist = dist * 0.8684; }
            return dist;
        }
    }

    // f2
    calculePrice() {
        if (this.selectedTripType === 'doc' || this.selectedTripType === 'pack') {
          this.pricePack = 6;
          if (this.modeLiv === 'immediate') {
              this.pricePack = this.pricePack + this.percentage(this.pricePack, 50);
          }
          } else if (this.selectedTripType === 'packbig') {

                if (this.modeLiv === 'immediate') {
                    // console.log(this.distancePack)
                    this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
                    this.pricePack = this.pricePack + ((this.distancePack / 1000) * 0.3);
                } else if (this.modeLiv === '24H') {
                    this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
                    console.log('prriiiiiiiiic', this.pricePack);
                } else if (this.modeLiv === '48H') {
                    this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
              }
            }
            this.pricePack = Number(this.pricePack.toFixed());
    }

    percentage(num, per) {
      return (num / 100) * per;
    }

    calculeExtraWieght(price, wieght) {
    let extraWieght = 0 ;

    if (this.poidVol > wieght) {
        wieght = this.poidVol;
    }

    // console.log("poidVol "+ this.poidVol);
    // console.log("poidVol "+ wieght);

    if (wieght > 10 && wieght <= 30) {
        extraWieght = (wieght - 10) * 0.5;
        price = price + extraWieght;
    } else if (wieght > 30 && wieght <= 50) {
        extraWieght = (wieght - 10) * 0.45;
        price = price + extraWieght;
    } else if (wieght > 50 && wieght <= 100) {
        extraWieght = (wieght - 10) * 0.4;
        price = price + extraWieght;
    } else if (wieght > 100 && wieght <= 200) {
        extraWieght = (wieght - 10) * 0.35;
        price = price + extraWieght;
    } else if (wieght > 200) {
        extraWieght = (wieght - 10) * 0.3;
        price = price + extraWieght;
    }
    console.log('wwwwwwwwwwwww', wieght);
    console.log('extraaaaaaaaa', extraWieght);
    return extraWieght;
    }


    checkedTrip(trp) {
        let sid = trp.idTrip;
        console.log('sid: ', sid);
        let findInCheckedList = false;
        if (this.checkedTrips.length === 0) {
            console.log('list vide');
            this.checkedTrips.push(trp);
        } else {
            console.log('list non vide');
        /* if (this.checkedTrips != null && this.checkedTrips.length === 0) { */
            for (let i = 0; i < this.checkedTrips.length; i++) {
                console.log('this.checkedTrips[i].idTrip: ', this.checkedTrips[i].idTrip);
                if (this.checkedTrips[i].idTrip === sid) {
                    console.log('idTrip === sid');
                    this.checkedTrips.splice(i, 1);
                    findInCheckedList = true;
                } else {
                    console.log('idTrip !== sid');
                    findInCheckedList = false;
                }
            }
            if (findInCheckedList === false) {
                this.checkedTrips.push(trp);
            }
        }

        console.log(this.checkedTrips);
    }

    setCheckedTrip() {
        if (this.checkedTrips != null) {
            for (let i = 0; i < this.checkedTrips.length - 1; i++) {
                const sid = this.checkedTrips[i].idTrip;
                $('#checked-trip-' + sid).attr( 'checked' );
            }
            console.log('checked okiiiiiii');
        }
    }


    public generateDechargeForAdmin() {
        const data = document.getElementById('contentToConvert');
        let dj = new Date();
        this.dateJ = this.changeDateFormatDMY2(dj);
        html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / (canvas.width * 1.5);
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('/layout/assets/images/logo.png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Manifeste_'+this.dateJ+'.pdf');
        for (let i = 0; i < this.checkedTrips.length; i++) {
            const sid = this.checkedTrips[i].idTrip;
            $('#checked-trip-' + sid).prop('checked', false);
        }
        this.checkedTrips = [];
        this.dateJ = '';
        this.totalTripInManifest = '';
        this.fraixTotal = '';
        this.valeurTotal = '';
        });


        /*heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save('MYBL.pdf'); // Generated PDF
        }); */
    }

    public generateBLivraison() {
        const data = document.getElementById('contentBlToConvert');
        let idt = this.tripBl.refTrip;
        html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 200;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('/layout/assets/images/logo.png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 190);
        pdf.save('BonDeLivraison_'+idt+'.pdf');
        });
    }


    // generate PDF Bon de Livrason
    AskOfBonLiv(trip) {
        console.log(this.auth);
        this.tservice.AskOfBonLiv(trip.idTrip, this.auth).subscribe(data =>{
            console.log(data['_body']);
        });
    }

    changeDateFormat(dd){
        let d = new Date(dd);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let hour = d.getHours();
        let min = d.getMinutes();
        // var sec = d.getSeconds();
        const dformat = [day, month, year].join('/')+' '+[hour, min].join(':');

        return dformat;
    }
    changeDateFormatDMY(dd){
        var d = new Date(dd);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        const dformat = [day, month, year].join('/');

        return dformat;
     }
     changeDateFormatDMY2(dd){
        let d = new Date(dd);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        const dformat = [day, month, year].join('-');

        return dformat;
     }

    generateDechargeForClient() {
        const doc = new jsPDF();
        doc.autoTable({html: '#contentToConvert'});
        doc.save('Decharge.pdf');

    }

    filterItems(searchTerm) {
        // console.log('itemsss: ', this.items);

        return this.items.filter((item) => {
            let nomEx: any; let nomDes: any; let mobileEX: any; let mobileDes: any; let nomDr: any; let mobileDr: any;

            if (item.userTrip != null && item.userTrip.nameUser != null) {
                nomEx = item.userTrip.nameUser.toString();
            } else {
                nomEx = ' ';
            }
            if (item.destTrip != null && item.destTrip.contactAdr != null) {
                nomDes = item.destTrip.contactAdr.toString();
            } else {
                nomDes = ' ';
            }
            if (item.userTrip != null && item.userTrip.mobileUser != null) {
                mobileEX = item.userTrip.mobileUser.toString();
            } else {
                mobileEX = ' ';
            }
            if (item.destTrip != null && item.destTrip.mobileAdr != null) {
                mobileDes = item.destTrip.mobileAdr.toString();
            } else {
                mobileDes = ' ';
            }
            if (item.driverTrip != null && item.driverTrip.nameDriver != null) {
                nomDr = item.driverTrip.nameDriver.toString();
            } else {
                nomDr = ' ';
            }
            if (item.driverTrip != null && item.driverTrip.mobileDriver != null) {
                mobileDr = item.driverTrip.mobileDriver.toString();
            } else {
                mobileDr = ' ';
            }

            return item.statusTrip.indexOf(searchTerm) > -1
                    || item.refTrip.indexOf(searchTerm) > -1
                    || nomEx.indexOf(searchTerm) > -1
                    || nomDes.indexOf(searchTerm) > -1
                    || mobileEX.indexOf(searchTerm) > -1
                    || mobileDes.indexOf(searchTerm) > -1
                    || item.createdday.indexOf(searchTerm) > -1
                    || nomDr.indexOf(searchTerm) > -1
                    || mobileDr.indexOf(searchTerm) > -1
                    ;

        });

      }

      setFilteredItems() {

        this.items = [];
        if (this.items !== undefined) {
          this.items = this.itemsSearch;
          this.items = this.filterItems(this.searchTerm);
        }

      }

      searchPlaces() {

        this.input = document.getElementById('inputDestAdresseCity');
        const searchBox = new google.maps.places.SearchBox(this.input);
        searchBox.addListener('places_changed', function() {
           const places = searchBox.getPlaces();
           console.log(this.palces);
           let address = '';
           if (places[0].address_components) {
             address = [
               (places[0].address_components[0] && places[0].address_components[0].long_name || ''),
               (places[0].address_components[1] && places[0].address_components[1].long_name || ''),
               (places[0].address_components[2] && places[0].address_components[2].long_name || ''),
               (places[0].address_components[3] && places[0].address_components[3].long_name || '')
             ].join(' ');
           }
           $('#latglobDest').val(places[0].geometry.location.lat());
           $('#lngglobDest').val(places[0].geometry.location.lng());
           $('#cityglobDest').val(address);
           console.log(address);
           console.log(places[0].geometry.location.lat());
           console.log(places[0].geometry.location.lng());

          if (places.length === 0) {
            return;
          }
       });

       this.latGlobalDest = $('#latglobDest').val();
       this.lngGlobalDest = $('#lngglobDest').val();

       /* this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
        this.latGlobalDest, this.lngGlobalDest, 'K' );
    console.log('distancePack', this.distancePack); */



    }

    onClickPreMsg() {
        console.log('inputPreMessageToClient: ', this.inputPreMessageToClient);
        console.log('inputCusMessageToClient: ', this.inputCusMessageToClient);
    }

    openLinkPos(idtrip) {
        window.open('http://pw.dotways.fr/?pack=' + idtrip, '_blank');
    }

    openMsgModal(content, trp) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.trpMsg = trp;
    }

    getGovAndDelegOfTunisia() {
        const gouvernorat = $( '#gouvernorat' );
        const delegation = $( '#delegation' );
        TunisiaGovAndDelg.loadGovAndDelegOfTunisia(gouvernorat, delegation);
    }

    getLatLngFromGov() {
        const gov = (<HTMLInputElement>document.getElementById('gouvernorat')).value;
        console.log('gooov ', gov);
        const address = gov + ', Tunisie';
        this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }

      getLatLngByAddress() {
        const gov = $( '#gouvernorat' ).val();
        const del = $( '#delegation' ).val();
        const compoAdr = $( '#inputComposedAdresse' );
        TunisiaGovAndDelg.getGovAndDelegFromIndex(gov, del, compoAdr);
        const address = (<HTMLInputElement>document.getElementById('inputComposedAdresse')).value;
        console.log('address ', address);
      }

      getLatitudeLongitudeFromAddress(callback, address) {
        address = address || 'Tunis, Tunisie';
        // Initialize the Geocoder
        const geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    callback(results[0]);
                }
            });
        }
      }
      showResult(result) {
        (<HTMLInputElement>document.getElementById('latitude2')).value = result.geometry.location.lat();
        (<HTMLInputElement>document.getElementById('longitude2')).value = result.geometry.location.lng();
        $( '#latglobDest' ).val(result.geometry.location.lat());
        $( '#lngglobDest' ).val(result.geometry.location.lng());
      }


}


