import { AdresseService } from './../adresses/adresses.service';
import { Adresse } from './../adresses/Adresse';
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

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
//import * as XLSX from 'ts-xlsx';
import * as XLSX from 'xlsx';
import { globalJsVar } from "./tunisia.js";
import { globalJsVarUp } from "./tunisia-adr.js";

import { TripExcelService } from './excel-trip.service';
import {NgxImageCompressService} from 'ngx-image-compress';

declare var angular: any;
declare var UIkit: any;

declare var require: any;
const TunisiaGovAndDelg = require('./tunisia.js');
const TunisiaAdr = require('./tunisia-adr.js');
type AOA = any[][];
@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    animations: [routerTransition()]
})
export class TripsComponent implements OnInit {
    

    entier: number;
    valHt: any;
    numBl: any;
    lngAdrUp1: any;
    latAdrUp1: any;
    cityAdrUp1: any;
    lngGlobalSourceUp: any;
    latGlobalSourceUp: any;
    cityGlobalSourceUp: any;
    out: number;
    clientRapport: any;
    ListScanNB: number =0;
    clientFilterTest: any;
    ngdriverTrip: any;
    Listdriverauto = [];
    Listuserauto = [];
    selecteduserExp: any;
    ListScan = [];
    searchTermscan: any;
    userName: any;
    NBchecked: number;
    sommeTotal: any =0;
    Listuser = [] ;
    data=[];
    closedTrips2= [];
    itemStatus: any;
    actionA: any;
    actionA2 : any;
    actionF: any;
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
    closedTrips = [];

    nxtBtnDisabled = false;
    prvBtnDisabled = false;
    nDate: any;
    pDate: any;

    base64textString = [];

    driver:any;
    Listdriver = [];
    currentUser: any;

    cityAdresseExp: any;
    contactAdresseExp: any;
    telContAdresseExp: any;
    cityAdresseDest: any;
    labelAdresseDest: any;
    contactAdresseDest: any;
    telContAdresseDest: any;
    telContAdresseDest2: any;
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
    //chooseView = 'none';
    chooseView: any;
    displayedNumberList = ['20', '50', '70', '100', '150', '200', '300', '400', '500', 'all'];
    inputPreMessageToClient: any;
    inputCusMessageToClient: any;
    PreMessages = ['Numéro incorrect !', 'Client non joignable par téléphone !',
     'Colis non conforme à l\'attente du client', 'Client absent au RDV !', 'Tout est bien :)', 'Client contacté.'];
     PreMessagesAction = ['Livraison aujourd\'hui ', 'Livraison demain', 'Livraison le lendemain', 'Livraison dans trois jours'];
    trpMsg: any;

    statusList = ['cherche un livreur', 'Livreur en chemin', 'Chez Livreur', 'livraison en cours', 'Livree', 'Annulée', 'Retour'];

    dateJ: any;
    totalTripInManifest: any;

    zipCode: any;
    gouvernorat: any;
    delegation: any;
    inputComposedAdresse: any;
    latitude2: number;
    longitude2: number;

    displayQrCode: boolean;
    selectedAll: any;
    dnow: any;
    changeColorByStatusTrip: boolean;
    refColor: boolean;
    varcolor: any;

    startDateFilter: any; endDateFilter: any; clientFilter: any; clientFilter2: any; driverFilter: any; driverFilter2: any; stateFilter: any; enRetardFilter: any; payementStatusFilter: any; enRecolteFilter:any;

    idUserFiltredTrip: any; dateFiltredTrip: any; dateFiltredTrip2: any; sizeFiltredTrip: any; 
    keyFiltredTrip: any; keyFiltredTrip1: any; keyFiltredTrip2: any; keyFiltredTrip3: any; keyFiltredTrip4: any; btnFiltredTrip: any;
    keyFiltredTrip5: any;

    selectedAdresseExpExcel: any;

	disableInputValTrip: boolean = false;
    editAdrDestFlag: boolean = false;
    zipCodeUp: any;
    cityAdresseDestUp: any;
    gouvernoratUp: any;
    delegationUp: any;
    latGlobalDestUp: any;
    lngGlobalDestUp: any;
    cityGlobalDestUp: any;

    latAdrUp: any;
    lngAdrUp: any;
    cityAdrUp: any;

    arrayBuffer: any;
    file: File;
    tripsFromExcel: AOA;
    tripsFromExcelTemp: AOA;
    jsonExcelObj: any;
    tunisiaData1: any[] = [];
    drvTrip: any;
    listDeleg: any[];
    tunisiaData = [];

    valpack: any;
    costtrip: any;
    tripsByUser: any;
    selectedUser: any;

    imgResultBeforeCompress:string;
    imgResultAfterCompress:string;
    


    constructor( private imageCompress: NgxImageCompressService,  private modalService: NgbModal,public adressService: AdresseService, private tservice: TripService,
         public loginService: LoginService, public http: Http, public sanitizer: DomSanitizer, public router: Router,
         private spinner: NgxSpinnerService, private snackBar: MatSnackBar, private tripExcelService: TripExcelService) {
            this.auth = localStorage.getItem('auth');
            if (this.auth === 'admin') {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
            this.random = Math.random;
         }

    ngOnInit() {


        this.checkedTrips = [];
        this.NBchecked=0;
        this.chooseView = 50;
        // this.getTrips();
        // this.getFiltredTrips(null, null, null);
        this.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter2,
            this.stateFilter, this.enRetardFilter, this.payementStatusFilter, this.driverFilter2, null);
        // this.getTripsOnInit();
        /* this.tservice.getTrips().subscribe( data => {
            this.items = data;
        }); */

        this.getAllDrivers();
        this.getAllUsers();

        this.id = this.id.replace('UT', '');
        this.Adresses = this.adressService.getAdresses();
        console.log(this.Adresses);

    }

    onClickUserExp(user){
        if(user != null){
            this.selectedUser = user.title; 
            let ind = this.Listuserauto.indexOf(this.selectedUser);
            this.selecteduserExp = this.Listuser[ind]; 
        }
        this.dataUser = this.selecteduserExp;
        this.Adresses = this.adressService.getAdressesForUser(this.selecteduserExp.idUser)
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

    openSm(content) {
        this.modalService.open(content, { size: 'sm' }).result.then((result) => {
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

    onKeyAdr(){
        this.tunisiaData = globalJsVar;
        //console.log('globalJsVarvvvvvvvv', globalJsVar);
    }
    resetDelegInput(){
        this.delegation = '';
    }

    onKeyAdrUp(){
        this.tunisiaData = globalJsVarUp;
        //console.log('globalJsVarvvvvvvvvUp', globalJsVarUp);
    }
    resetDelegInputUp(){
        this.delegationUp = '';
    }

    openAddModal(content) {
        console.log('checkedTrips ', this.checkedTrips);
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.searchPlaces();
        this.getGovAndDelegOfTunisia();
        const key = this.zipCode;
        const gouvernorat = $( '#gouvernorat' );
        const delegation = $( '#delegation' );
        const compoAdr = $( '#cityGlobalDest' );
        const zip = $( '#zipCode' );
        const delegation2 = $( '#delegation2' );
        // TunisiaGovAndDelg.autocompleteFromJson(delegation2, tunData);
        TunisiaGovAndDelg.findGovAndDelegByZipCode(key, gouvernorat, delegation, compoAdr, zip, this.tunisiaData);
        this.tunisiaData = globalJsVar;
        console.log('globalJsVarv', globalJsVar);
        /* $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {
            var json = (data);
            var dd;
            $.each( json , function (index, value)
            {
                var deleg = json[ index ];
                $.each( deleg, function (index, value)
                {
                    var adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'];
                    dd = dd + ', "' + adr + '"';
                });

            });
            console.log(dd);
        }); */
    }


    openDechargeModal(content) {
        this.entier =Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
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
            const dj = new Date();
            this.dateJ = this.changeDateFormatDMY(dj);
            for(let i =0; i < this.checkedTrips.length; i++) {
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

    openBlModal2(content, trip) {        
        this.tripBl = trip;
        this.open(content);
        this.numBl = this.tripBl.refTrip.substr(3);
        this.valHt = this.tripBl.packageTrip.valPackage / 1.19;
        this.valHt = this.valHt.toFixed(2);
    }

    getTrips() {
        this.auth = localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin') {
            this.id = 'admin';
            
        } else {
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

    getFiltredTrips1(dateTp, dateTp2, keyTp, keyTp1, keyTp2, keyTp3, keyTp4,keyTp5, btnTp) {

        
        this.spinner.show();
        this.auth = localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin') {
            this.id = 'admin';
            this.userName = this.dataUser.name
        } else {
            this.id = 'UT' + this.currentUser.data[0].idUser;
            this.userName = this.dataUser.nameUser;
        }
        console.log(this.id);
        this.jsonObj = null;
        this.items = [];
        console.log('this.chooseView', this.chooseView);

        console.log('dateTp', dateTp);
        if ((dateTp != null) && (dateTp != '')) {
            this.dateFiltredTrip = this.changeDateFormatMDY(dateTp);
            console.log('dateFiltredTrip', this.dateFiltredTrip);
        } else {
            this.dateFiltredTrip = '';
        }
        if ((dateTp2 != null) && (dateTp2 != '')) {
            this.dateFiltredTrip2 = this.changeDateFormatMDY(dateTp2);
            console.log('dateFiltredTrip2', this.dateFiltredTrip2);
        } else {
            this.dateFiltredTrip2 = '';
        }

        if (keyTp != null) {
            this.keyFiltredTrip = keyTp;
        } else {
            this.keyFiltredTrip = '';
        }
        if ((keyTp1 != null) && (keyTp1 != 'tous')) {
            this.keyFiltredTrip1 = keyTp1;
        } else {
            this.keyFiltredTrip1 = '';
        }
        if (keyTp2 != null) {
            console.log('keyTp2', keyTp2);
            if (keyTp2 === 'tous') {
                console.log('keyTp22 ok', keyTp2);
                this.keyFiltredTrip2 = '';
            } else {
                console.log('keyTp233 ok', keyTp2);
                this.keyFiltredTrip2 = keyTp2;
            }
        } else {
            this.keyFiltredTrip2 = '';
        }
        if (keyTp3 != null) {
            this.keyFiltredTrip3 = keyTp3;
        } else {
            this.keyFiltredTrip3 = '';
        }
        if (keyTp4 != null) {
            if (keyTp4 === 'tous') {
                this.keyFiltredTrip4 = '';
            } else {
                this.keyFiltredTrip4 = keyTp4;
            }
        } else {
            this.keyFiltredTrip4 = '';
        }
        if ((keyTp5 != null) && (keyTp5 != 'tous')) {
            this.keyFiltredTrip5 = keyTp5;
        } else {
            this.keyFiltredTrip5 = '';
        }

        if (btnTp != null) {
            this.btnFiltredTrip = btnTp;
        } else {
            this.btnFiltredTrip = '';
        }
        console.log("key1==",this.keyFiltredTrip1)
        console.log("key5==",this.keyFiltredTrip5)
        console.log("key3==",this.keyFiltredTrip3)
        this.tservice.getFiltredTrips1(this.id, this.chooseView, this.dateFiltredTrip, this.dateFiltredTrip2,
            this.keyFiltredTrip, this.keyFiltredTrip1, this.keyFiltredTrip2, this.keyFiltredTrip3, this.keyFiltredTrip4,
            this.keyFiltredTrip5, this.btnFiltredTrip).subscribe(data => {
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
        
        this.driverFilter2 = '';
        this.clientFilter2 = '';
        this.driverFilter = '';
        this.clientFilter = '';
        
        // this.setCheckedTrip();
    }
    scanList(){
        //console.log("sanc: ",this.searchTermscan)
        let verif =false;
        for(let index = 0; index < this.ListScan.length; index++){
            if (this.searchTermscan === this.ListScan[index].idTrip) {
                verif = true;
            }
        }
        if(verif === false){
            this.tservice.getTripscanList(this.searchTermscan).subscribe(data => {
                this.result = data['_body'];
                //console.log(data['_body'])
                const jo = JSON.parse(this.result);
                const obj = Array.of(jo.data);
                this.ListScan.push(obj[0]);
            // console.log(this.ListScan)
            })
        }else{
            this.snackBar.open('Ce colis a été scanné', 'Fermer', {
                duration: 8000,
            });
        }
        this.searchTermscan='';
        this.ListScanNB = this.ListScan.length +1;
    }
    chercher(){
        this.items= [];
            for (let index = 0; index < this.ListScan.length; index++) {
                this.items.push(this.ListScan[index]);
            }
            this.itemsSearch = this.items;
            this.spinner.hide();
           // console.log('dataList:', this.items)
        this.ListScan = [];
        this.ListScanNB = this.ListScan.length;
        //window.location.reload();
    }
    deleteScanList(trip) {
        for (let i = 0; i < this.ListScan.length; i++) {
            if (trip.idTrip === this.ListScan[i].idTrip) {
                this.ListScan.splice(i, 1);
            }
        }
        this.ListScanNB = this.ListScan.length;
        console.log('msggggg',trip.msgTrip.length-1);
    }

    getFiltredTrips(dateTp, keyTp, btnTp) {
        this.spinner.show();
        this.auth = localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin') {
            this.id = 'admin';
        } else {
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
        this.jsonObj = null;
        this.items = [];
        console.log('this.chooseView', this.chooseView);


        if (dateTp != null) {
            this.dateFiltredTrip = dateTp;
        } else {
            this.dateFiltredTrip = '';
        }

        if (keyTp != null) {
            this.keyFiltredTrip = keyTp;
        } else {
            this.keyFiltredTrip = '';
        }
        if (btnTp != null) {
            this.btnFiltredTrip = btnTp;
        } else {
            this.btnFiltredTrip = '';
        }

        this.tservice.getFiltredTrips(this.id, this.dateFiltredTrip, this.chooseView, this.keyFiltredTrip, this.btnFiltredTrip).subscribe(data => {
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

    }

    getFiltredTripsOnNext() {
        
        let nextTripDate =null;
        if (this.items.length !== 0) {
            if((this.stateFilter === 'cherche un livreur')||(this.stateFilter === null)||(this.stateFilter === '')){
                nextTripDate = this.items[this.items.length - 1].createdday;
            }else if(this.stateFilter === 'Livreur en chemin'){
                nextTripDate = this.items[this.items.length - 1].affectedday;
            }else if(this.stateFilter === 'Chez Livreur'){
                nextTripDate = this.items[this.items.length - 1].getedday;
            }else if(this.stateFilter === 'livraison en cours'){
                nextTripDate = this.items[this.items.length - 1].startdelday
            }else if(this.stateFilter === 'Livree'){
                nextTripDate = this.items[this.items.length - 1].livredday
            }else if (this.stateFilter === 'Retour'){
                nextTripDate = this.items[this.items.length - 1].prereturnedday
            }else if(this.stateFilter === 'Annulée'){
                nextTripDate = this.items[this.items.length - 1].datecanceledDriver
            }
            this.prvBtnDisabled = false;
            this.nxtBtnDisabled = false;
            this.getFiltredTrips1(nextTripDate, (this.endDateFilter), this.searchTerm, this.clientFilter2,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, this.driverFilter2, null);
        } else {
            console.log('this.items.length === 0');
            this.prvBtnDisabled = true;
            this.getFiltredTrips1((this.startDateFilter), (this.endDateFilter), this.searchTerm, this.clientFilter2, 
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, this.driverFilter2, null);
        }
    }

    getFiltredTripsOnPrevious() {
        if (this.items.length !== 0) {
            const btnPrev = 'previous';
            let prevTripDate = null;
            if((this.stateFilter === 'cherche un livreur')||(this.stateFilter === null)||(this.stateFilter === '')){
                prevTripDate = this.items[0].createdday;
            }else if(this.stateFilter === 'Livreur en chemin'){
                prevTripDate = this.items[0].affectedday;
            }else if(this.stateFilter === 'Chez Livreur'){
                prevTripDate = this.items[0].getedday;
            }else if(this.stateFilter === 'livraison en cours'){
                prevTripDate = this.items[0].startdelday
            }else if(this.stateFilter === 'Livree'){
                prevTripDate = this.items[0].livredday
            }else if (this.stateFilter === 'Retour'){
                prevTripDate = this.items[0].prereturnedday
            }else if(this.stateFilter === 'Annulée'){
                prevTripDate = this.items[0].datecanceledDriver
            }
            this.prvBtnDisabled = false;
            this.nxtBtnDisabled = false;
            this.getFiltredTrips1((this.startDateFilter), prevTripDate, this.searchTerm, this.clientFilter2,this.driverFilter2,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, btnPrev);
        } else {
            this.prvBtnDisabled = true;
            this.getFiltredTrips1((this.startDateFilter), (this.endDateFilter), this.searchTerm, this.clientFilter2, 
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter,this.driverFilter2, null);
        }
    }

    selectAll(event) {
        this.checkedTrips = [];
        if(event.target.checked) {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].selected = true;
                this.checkedTrips.push(this.items[i]);
            }
        } else {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].selected = false;
            }
            this.checkedTrips = [];
        }
        this.NBchecked=this.checkedTrips.length;
    }
      checkIfAllSelected() {
        this.selectedAll = this.items.every(function(item:any) {
            return item.selected == true;
        });
      }

    onCheckboxChange(option, event) {
        if(event.target.checked) {
          this.checkedTrips.push(option);
        } else {
          for(let i =0 ; i < this.items.length; i++) {
            if(this.checkedTrips[i] == option) {
              this.checkedTrips.splice(i,1);
            }
          }
        }
        this.NBchecked=this.checkedTrips.length;
        console.log(this.checkedTrips);
    }

    closeTrip() {
        let id = this.checkedTrips[0].userTrip.idUser
        this.closedTrips=[];
        for (let i = 0; i < this.checkedTrips.length; i++) {
            if(this.checkedTrips[i].statusTrip === 'Retour'){
                this.checkedTrips[i].packageTrip.valPackage = 0;
                console.log("retour: ", this.checkedTrips[i].packageTrip.valPackage)
            }
            this.closedTrips.push(this.checkedTrips[i].idTrip);
            if(((this.checkedTrips[i].paymentStatus!=='En cours de payement') && (this.checkedTrips[i].paymentStatus!=='En cours de retour')) || (this.checkedTrips[i].argentRecolte===null)){
                this.snackBar.open('Immpossible de modifier le colis '+this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
            if(this.checkedTrips[i].userTrip.idUser!==id){
                this.snackBar.open('Immpossible de modifier le colis '+ this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
        }
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlCloseTrip = 'http://147.135.136.78:8052/trip/updateclosed';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlCloseTrip+'?name='+this.userName, this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });
        this.checkedTrips=[];
        
    }

    recolterTrip() {
        this.closedTrips=[];
        for (let i = 0; i < this.checkedTrips.length; i++) {
            this.closedTrips.push(this.checkedTrips[i].idTrip);
            if((this.checkedTrips[i].statusTrip!=='Livree')&&(this.checkedTrips[i].statusTrip!=='Retour')){
                this.snackBar.open('Immpossible de modifier le colis '+this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
            if((this.checkedTrips[i].paymentStatus==='En cours de payement') || (this.checkedTrips[i].paymentStatus==='Payee') || (this.checkedTrips[i].isClosed===true)){
                this.snackBar.open('Immpossible de modifier le colis '+this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
        }

        console.log("cheked",this.closedTrips)
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlrecolterTrip = 'http://147.135.136.78:8052/trip/updaterecolter';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlrecolterTrip+'?name='+this.userName, this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        }); 
        let id = '5ca28097e4970623916b53e7';
        this.affectDriverStatus(id,this.closedTrips);
        this.checkedTrips=[];
        console.log('fin updaterecolté:')
      
    }

    EncoursPayementTrip() {
        this.closedTrips=[];
        let id = this.checkedTrips[0].userTrip.idUser
        for (let i = 0; i < this.checkedTrips.length; i++) {
            this.closedTrips.push(this.checkedTrips[i].idTrip);
            if(this.checkedTrips[i].argentRecolte!==true){
                this.snackBar.open('Immpossible de modifier le colis '+ this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
            if(this.checkedTrips[i].userTrip.idUser!==id){
                this.snackBar.open('Immpossible de modifier le colis '+ this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
            if((this.checkedTrips[i].isClosed===true) || (this.checkedTrips[i].paymentStatus==='Payee')){
                this.snackBar.open('Immpossible de modifier le colis '+ this.checkedTrips[i].refTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }
        }

        console.log("cheked",this.closedTrips)
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlpayedTrip = 'http://147.135.136.78:8052/trip/updatepayed';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlpayedTrip+'?name='+this.userName, this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });

        this.checkedTrips= [];
    }


    getTripsOnInit() {
        console.log('numDisplayedElement', this.numDisplayedElement) ;
        this.auth = localStorage.getItem('auth');
        console.log('login',this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin') {
            this.id = 'Admin';
        } else {
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

        const stat = trip.argentRecolte;
        console.warn(stat);
		if (stat === true) {
			this.disableInputValTrip = true;
		}

        this.idTrip = trip.idTrip;
        this.obj = trip;
        this.objTrip.refTrip = this.obj.refTrip;
        this.objTrip.sourceTrip = this.obj.sourceTrip;
        this.objTrip.destTrip = this.obj.destTrip;

        this.cityGlobalDestUp = this.obj.destTrip.cityAdr;
        this.latGlobalDestUp = this.obj.destTrip.geolocAdr.lat;
        this.lngGlobalDestUp = this.obj.destTrip.geolocAdr.lng;

        this.cityAdrUp = this.obj.destTrip.cityAdr;
        this.latAdrUp = this.obj.destTrip.geolocAdr.lat;
        this.lngAdrUp = this.obj.destTrip.geolocAdr.lng;

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
        this.objTrip.prereturnedday = this.obj.prereturnedday;
        this.objTrip.modeTrip = this.obj.modeTrip;
        this.objTrip.codeTrip = this.obj.codeTrip;
        this.objTrip.codeExp = this.obj.codeExp;
        this.objTrip.listdriverTrip = this.obj.listdriverTrip;
        this.objTrip.packageTrip = this.obj.packageTrip;
        this.objTrip.descriptionTrip = this.obj.descriptionTrip;
        this.objTrip.driverTrip = this.obj.driverTrip;
        if(this.objTrip.driverTrip !== null){
            this.ngdriverTrip = this.objTrip.driverTrip.nameDriver+' '+this.objTrip.driverTrip.surnameDriver;
        }
        console.log('this.objTrip.driverTrip', this.objTrip.driverTrip);
        // this.objTrip.id = this.obj.idTrip;

        // this.AskOfBonLiv(trip);
        this.open(content);
        this.searchPlacesOnUpTrip();
        $('#newAdrDest').hide();
        $('#newAdrSource').hide();
        const gouvernoratUp = $( '#gouvernoratUp' );
        const delegationUp = $( '#delegationUp' );
        const key = this.zipCodeUp;
        const compoAdr = $( '#cityGlobalDestUp' );
        const zip = $( '#zipCodeUp' );
        TunisiaAdr.loadAdrOfTunisia(gouvernoratUp, delegationUp);
        TunisiaAdr.findAdrByZipCode(key, gouvernoratUp, delegationUp, compoAdr, zip);

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
        this.objTrip.prereturnedday = this.obj.prereturnedday;
        this.objTrip.modeTrip = this.obj.modeTrip;
        this.objTrip.codeTrip = this.obj.codeTrip;
        this.objTrip.codeExp = this.obj.codeExp;
        this.objTrip.listdriverTrip = this.obj.listdriverTrip;
        this.objTrip.packageTrip = this.obj.packageTrip;
        this.objTrip.userTrip = this.obj.userTrip;
        this.objTrip.descriptionTrip = this.obj.descriptionTrip;
        this.objTrip.msgTrip = this.obj.msgTrip;
        this.objTrip.lastupdateby= this.obj.lastupdateby;
        this.objTrip.lastupdateday = this.obj.lastupdateday;
        this.objTrip.historique = this.obj.historique;
        this.objTrip.driverTrip = this.obj.driverTrip;
        let photo = this.obj.packageTrip.imgPackage;
        if(photo != null) {
            const i = photo.indexOf(',');
            photo = photo.slice(i + 1, photo.length);
            const photoRes = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + photo);
            this.objTrip.image = photoRes;
        } else {
            this.objTrip.image = null;
        }

        console.log('this.objTrip.msgTrip: ', this.objTrip.msgTrip.length);

        this.open(content);
    }

    addTrip() {
        let newAdr: any; let contactTel: any;
        const a = $('#latGlobalDest').val();
        //const a = $('36.81897').val();
        const b = $('lngGlobalDest').val();
        //const b = $('10.16579').val();
        const c = $('#cityGlobalDest').val();
        
        newAdr = $('#cityGlobalDest').val();
        console.log('desttttttt',newAdr)
        contactTel = $('#inputDestTel').val();
       // const regex =/^[0-9]+$/;
       const regex = /^-?(?:\d+|\d{0,9}(?:,\d{9})+)(?:(\.|,)\d+)?$/;

            if (!this.selectedAdresseExp) {
                this.snackBar.open('Veuillez sélectionner l\'adresse source!', 'Fermer', {
                    duration: 12000,
                });
                return;
            } else if (a === '' || b === '' || c === '') {
                if (newAdr.indexOf('Gouvernorat') >= 0) {
                    this.snackBar.open('Veuillez sélectionner le gouvernorat.', 'Fermer', {
                        duration: 5000,
                    });
                    return;
                } else if (newAdr.indexOf('Delegation') >= 0) {
                    this.snackBar.open('Veuillez sélectionner la délégation.', 'Fermer', {
                        duration: 5000,
                    });
                    return;
                }/*else {
                    this.snackBar.open('Veuillez remplir l\'adresse de déstinataire!', 'Fermer', {
                        duration: 5000,
                    });
                    return;
                }*/

            } else if (!this.contactAdresseDest) {
                this.snackBar.open('Veuillez remplir le nom de déstinataire!', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.telContAdresseDest) {
                this.snackBar.open('Veuillez remplir le téléphone de déstinataire!', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (contactTel.length !== 8) {
                this.snackBar.open('Le numéro de téléphone est invalide', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.selectedTripType) {
                this.snackBar.open('Veuillez sélectionner le type de colis!', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.descriptionTrip) {
                this.snackBar.open('Veuillez remplir la description de colis!', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.valueTrip) {
                this.snackBar.open('Veuillez remplir la valeur de colis!', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.valueTrip.match(regex)) {
                this.snackBar.open('La valeur de colis doit être un numéro.', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.modeLiv) {
                this.snackBar.open('Veuillez sélectionner le mode de livraison!', 'Fermer', {
                    duration: 5000,
                });
                return;
            } else if (!this.typePaiement) {
                this.snackBar.open('Veuillez sélectionner le type de paiement!', 'Fermer', {
                    duration: 5000,
                });
                return;
            }


        this.latGlobalDest = $('#latGlobalDest').val();
        console.log("latlng= ",this.latGlobalDest)
        //this.latGlobalDest= $('36.81897').val();;
        if(this.latGlobalDest === ''){
            this.latGlobalDest= $('36.81897').val();
        }
        this.lngGlobalDest = $('#lngGlobalDest').val();
        //this.lngGlobalDest = $('10.16579').val()
        if(this.lngGlobalDest === ''){
            this.lngGlobalDest = $('10.16579').val();
        }
        this.cityGlobalDest = $('#cityGlobalDest').val();
        if(this.cityGlobalDest === ''){
            this.cityGlobalDest = this.cityAdresseDest;
        }
        console.log(this.latGlobalDest + '***' + this.lngGlobalDest + '***' + this.cityGlobalDest);

        const nowd = new Date();
        this.sizePack = '' + this.longueurTrip + 'X' + this.largeurTrip + 'X' + this.hauteurTrip;
        this.calculePrice();

        if (this.selectedTripType === 'doc' || this.selectedTripType === 'pack') {
            this.sizePack = null;
            this.poidsTrip = 0;
        }

        let g = $('#gouvernorat').val();
        let d = $('#delegation').val();
        const z = $('#zipCode').val();
        const adr = $('#inputDestAdresseCity').val();
        if( g === '' ){
            g= this.gouvernorat;
        }
        if(d === ''){
            d = this.delegation;
        }
        console.log('cityAdresseDest', adr);
        console.log('gouvernorat', g);
        console.log('deleg', d);
        console.log('zppp', z);
        console.log('selectedAdresseDest ', this.selectedAdresseDest);

        if ((this.cityGlobalDest).indexOf('Gouvernorat') >= 0) {
            this.snackBar.open('Veuillez sélectionner le gouvernorat.', 'Fermer', {
                duration: 5000,
            });
            return;
        }

        if ((this.cityGlobalDest).indexOf('Delegation') >= 0) {
            this.snackBar.open('Veuillez sélectionner la délégation.', 'Fermer', {
                duration: 5000,
            });
            return;
        }

        let labelAdrD;
        if (this.selectedAdresseDest !== undefined) {
            console.log('1111');
            labelAdrD = '';
        /* } else if ((g !== null || g !== '')  && (d != null || d !== '') && (z != null || z !== '')) { */
        } else if ((g) && (z)) {
            // labelAdrD = (<HTMLInputElement>document.getElementById('inputDestAdresseCity')).value;
            labelAdrD = adr;
            console.log('2222');
        } else {
            labelAdrD = '';
        }

        this.cityGlobalDest = ''+labelAdrD + ' ' + this.cityGlobalDest + ' '+ d + ' ' + g;
        console.log('this.cityGlobalDest', this.cityGlobalDest);

        this.valueTrip = this.valueTrip.replace(/,/g, '.');

        this.tservice.addTrip(
            this.dataUser.nameUser, this.dataUser.emailUser, this.dataUser.rateUser, this.dataUser.idUser,
            this.dataUser.nbrateUser, this.dataUser.nbrdeliveryUser, this.dataUser.mobileUser, this.dataUser.surnameUser,
            this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng, this.selectedAdresseExp.contactAdr,
            this.selectedAdresseExp.mobileAdr, this.contactAdresseDest,
            this.telContAdresseDest,this.telContAdresseDest2, nowd, 'UT' + this.dataUser.idUser, this.dataUser.idUser,
            nowd, this.latGlobalDest, this.lngGlobalDest, this.modeLiv,
            this.pricePack, this.selectedTripType, this.valueTrip, this.poidsTrip,
            this.sizePack, this.typePaiement, 'REF', 'cherche un livreur',
            this.selectedAdresseExp.cityAdr, this.cityGlobalDest, this.base64textString[0], this.descriptionTrip,
            null, this.selectedAdresseExp.labelAdr, null);

      //window.location.reload();

       /* setTimeout(function() {
            this.getFiltredTrips(null, null, null);
       }, 5000);   */
    }

    updatetrip() {
        const ac = $('#cityAdresseDestUp').val();
        const g = $('#gouvernoratUp').val();
        const d = $('#delegationUp').val();
        const z = $('#zipCodeUp').val();
        let adr: any; let newLat: any; let newLng: any; let oldAdr: any; let newAddress: any;
        adr = $('#cityGlobalDestUp').val();
        oldAdr = $('#cityAdrUp').val();
        newLat = $('#latGlobalDestUp').val();
        newLng = $('#lngGlobalDestUp').val();
        const titleBtn = $('#btnShowHide').text();
        newAddress = ac + ' ' + adr;
        adr = newAddress;
        console.log('adrrrrrrr', adr);

        const stat = this.objTrip.statusTrip;
        this.drvTrip = null;
		if ((stat !== 'cherche un livreur') && (this.ngdriverTrip)) {
			this.drvTrip = this.getSelectedDriver2(this.ngdriverTrip);
		}
		if(titleBtn === 'Annuler') {
            console.log('Annuler');
			if (adr === oldAdr) {
                this.snackBar.open('Veuillez entrer la nouvelle adresse de déstinataire!', 'Fermer', {
                    duration: 12000,
                });
                return;
            } else if (adr.indexOf('Gouvernorat') >= 0) {
				this.snackBar.open('Veuillez sélectionner le gouvernorat.', 'Fermer', {
					duration: 5000,
				});
				return;
			} else if (adr.indexOf('Delegation') >= 0) {
				this.snackBar.open('Veuillez sélectionner la délégation.', 'Fermer', {
					duration: 5000,
				});
				return;
			} else {
                console.log('okk');
				this.update(this.objTrip.destTrip.contactAdr, adr, this.objTrip.destTrip.mobileAdr, this.objTrip.destTrip.mobileAdr2,
					this.objTrip.timingTrip, this.objTrip.statusTrip, this.objTrip.prevStatusTrip,
					this.objTrip.createdday, this.objTrip.affectedday, this.objTrip.getedday,
					this.objTrip.startdelday, this.objTrip.livredday, this.objTrip.returnedday,
                    this.objTrip.costTrip, this.objTrip.packageTrip.valPackage, this.objTrip.descriptionTrip, newLat, newLng, this.drvTrip);
                    //window.location.reload();
			}
		} else {
            console.log('Editer');
			this.update(this.objTrip.destTrip.contactAdr, this.cityAdrUp, this.objTrip.destTrip.mobileAdr, this.objTrip.destTrip.mobileAdr2,
				this.objTrip.timingTrip, this.objTrip.statusTrip, this.objTrip.prevStatusTrip,
				this.objTrip.createdday, this.objTrip.affectedday, this.objTrip.getedday,
				this.objTrip.startdelday, this.objTrip.livredday, this.objTrip.returnedday,
                this.objTrip.costTrip, this.objTrip.packageTrip.valPackage, this.objTrip.descriptionTrip, this.latAdrUp, this.lngAdrUp, this.drvTrip);
                //window.location.reload();
                
		}
    }

    showResultV2(result) {
        $( '#latGlobalDestUp' ).val(result.geometry.location.lat());
        $( '#lngGlobalDestUp' ).val(result.geometry.location.lng());
        console.log('biiiiiiiien');
      }


    update(contactAdr, cityAdr, mobileAdr, mobileAdr2,timingTrip, statusTrip, prevStatusTrip, createday, affectedday, getedday, startdelday, livredday,
         returnedday, costTrip, valTrip, descriptionTrip, latdes, lngdes, driver) {

            console.log('cityAdr ', cityAdr);
            console.log('cityAdr ', latdes);
            console.log('cityAdr ', lngdes);

        let x = null;
        if (driver != null) {
            console.log(driver);
            if(driver.createdday != null) {
                driver.createdday = new Date(driver.createdday);
            }
            if(driver.updateday != null) {
                driver.updateday = new Date(driver.updateday);
            }
            if(driver.lastUpdate != null) {
                driver.lastUpdate = new Date(driver.lastUpdate);
            }

          for (let i = 0; i < driver.vehicleDriver.length; i++) {
              if(driver.vehicleDriver[i].createdday != null) {
                driver.vehicleDriver[i].createdday = new Date(driver.vehicleDriver[i].createdday);
              }
              if(driver.vehicleDriver[i].updateday != null) {
                driver.vehicleDriver[i].updateday = new Date(driver.vehicleDriver[i].updateday);
              }
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
                geolocAdr: {
                lat: latdes,
                lng: lngdes,
                },
                contactAdr: contactAdr,
                mobileAdr: mobileAdr,
                cityAdr: cityAdr,
                mobileAdr2: mobileAdr2
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
            descriptionTrip: descriptionTrip,
            listdriverTrip: x,
            packageTrip: {
                valPackage: valTrip
            },
            lastupdateby: this.userName
        };
        console.log('data=', tripData);
        this.tservice.updateTrip(tripData, this.idTrip).subscribe(data => {
            const result = data['_body'];
            console.log(data['_body']);
            const jo = JSON.parse(result);
            const obj = Array.of(jo.data);
            //this.getFiltredTrips(null, null, null);
            this.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter2,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, this.driverFilter2, null);
            this.snackBar.open('La modification a été effectuée avec succès', 'Fermer', {
                duration: 5000,
            });
           }, error => {
            console.log(error); // Error getting the data
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
          });
    }

    actionfinanciere(popup,item) {
        if(item==='En caisse') {
            this.openBlModal2(popup,null);
        }
        if(item==='Colturer/Payer') {
            this.openBlModal2(popup,null);
        }
        if(item==='En cours de payement') {
            this.openBlModal2(popup,null);
        }
    }


    actionSendSms() {
        this.closedTrips = [];
        if(this.checkedTrips.length <=0) {
            this.snackBar.open('Aucun colis sélectionné ', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        
        for (let i = 0; i < this.checkedTrips.length; i++) {
            this.closedTrips.push(this.checkedTrips[i].idTrip);
        }
        let msg = '';
        if (!this.inputPreMessageToClient && !this.inputCusMessageToClient) {
            this.snackBar.open('Veuillez entrer un message!', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        if (this.inputCusMessageToClient) {
            msg = this.inputCusMessageToClient;
            this.inputCusMessageToClient = '';
        } else {
            msg = this.inputPreMessageToClient;
            this.inputPreMessageToClient = '';
        }
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlCloseTrip = 'http://147.135.136.78:8052/trip/sendAllsms';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlCloseTrip+'?name='+ this.userName +'&sms=' + msg , this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });

        this.checkedTrips=[];
    }


    actionEtat() {
        console.log(this.itemStatus);
        this.closedTrips = [];
        this.closedTrips2 = [];
        for (let i = 0; i < this.checkedTrips.length; i++) {
            if(this.itemStatus==='Livreur en chemin'){
                if(this.checkedTrips[i].statusTrip=== 'cherche un livreur') {
                    this.closedTrips.push(this.checkedTrips[i].idTrip);
                }
            } else {
                if((this.checkedTrips[i].statusTrip==='Livreur en chemin')||(this.checkedTrips[i].statusTrip==='cherche un livreur')
                    ||(this.checkedTrips[i].statusTrip==='Chez Livreur')||(this.checkedTrips[i].statusTrip==='livraison en cours')) {
                    this.closedTrips.push(this.checkedTrips[i].idTrip);
                }
            }
        }
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlCloseTrip = 'http://147.135.136.78:8052/trip/updatestatus';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlCloseTrip+'?status='+ this.itemStatus +'&name=' + this.userName, this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });
        for (let i = 0; i < this.checkedTrips.length; i++) {
            if((this.checkedTrips[i].statusTrip==='cherche un livreur')||(this.checkedTrips[i].statusTrip==='Livreur en chemin')
                ||(this.checkedTrips[i].statusTrip==='Chez Livreur')||(this.checkedTrips[i].statusTrip==='livraison en cours')) {
                this.closedTrips2.push(this.checkedTrips[i].idTrip);
            }
        }

            if(this.closedTrips2.length!==0) {
                let id : any ;
                if(this.itemStatus === 'Livreur en chemin') {
                    id ='5bc7c6a9e497065337087304';

                } else {
                    id ='5c92601de497060edb100034';
                }
                this.affectDriverStatus(id,this.closedTrips2);
            }

        this.checkedTrips=[];
    }

    affectDriverStatus(id,list) {
        
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlCloseTrip = 'http://147.135.136.78:8052/trip/updatedriver/';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlCloseTrip + id +'?name='+ this.userName, list , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });
        this.checkedTrips = [];
        
    }

    affectDriver(content) {
        if(this.checkedTrips.length <=0) {
            this.snackBar.open('Aucun colis sélectionné ', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        /*
        if(this.actionA.idDriver=== '5ca28097e4970623916b53e7'){
            this.snackBar.open('Vouz ne pouvez modifier car le livreur est packways Financier', 'Fermer', {
                duration: 12000,
            });
            return;
        }*/
        console.log(this.actionA);
        this.open(content)
    }

    actionAffectation() {
        this.closedTrips = [];
        for (let i = 0; i < this.checkedTrips.length; i++) {
            this.closedTrips.push(this.checkedTrips[i].idTrip);
            /*
            if((this.checkedTrips[i].statusTrip==='Livree') ||(this.checkedTrips[i].statusTrip==='Annulée')) {
                this.snackBar.open('Immpossible de modifier le colis '+this.checkedTrips[i].refTrip+' car le status est : '+this.checkedTrips[i].statusTrip, 'Fermer', {
                    duration: 12000,
                });
                return;
            }*/
        }
        if(this.actionA.idDriver === '5ca28097e4970623916b53e7'){
            this.snackBar.open('Vouz ne pouvez modifier car le livreur est packways Financier', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlCloseTrip = 'http://147.135.136.78:8052/trip/updatedriver/';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlCloseTrip+this.actionA.idDriver +'?name='+ this.userName, this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });
        this.checkedTrips=[];
        this.actionA = '';
        this.actionA2 = '';
    }


    getAllDrivers() {
        this.tservice.getDrivers().subscribe(data => {
         this.result = data['_body'];
         // console.log(data['_body'])
         const jo = JSON.parse(this.result);
         const obj = Array.of(jo.data);
         this.jsonObj = obj[0];
         //this.Listdriver = this.jsonObj;
         for(let i=0;i<this.jsonObj.length;i++){
            if(this.jsonObj[i].accountActive === true){
                this.Listdriver.push(this.jsonObj[i]);
                this.Listdriverauto.push(this.jsonObj[i].nameDriver +' '+this.jsonObj[i].surnameDriver);
            }
        }
         // console.log('listdriver!::', this.Listdriver);
       }, error => {
         // console.log(error);
       });
    }

    getAllUsers() {
        this.tservice.getUsers().subscribe(data => {
         this.result = data['_body'];
         // console.log(data['_body'])
         const jo = JSON.parse(this.result);
         const obj = Array.of(jo.data);
         this.jsonObj = obj[0];
         //this.Listuser = this.jsonObj;
         for(let i=0;i<this.jsonObj.length;i++){
             if(this.jsonObj[i].accountActive === true){
                this.Listuser.push(this.jsonObj[i]);
                 this.Listuserauto.push(this.jsonObj[i].nameUser +' '+this.jsonObj[i].surnameUser);
             }
         }
         //console.log('listuser!::', this.Listuserauto);
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
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        // $( '#cityGlobalDest' ).val(address);
        //this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }
      show2() {
        document.getElementById('div_dimensions').style.display = 'block';
        console.log('block');
        this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
            this.latGlobalDest, this.lngGlobalDest, 'K' );
        console.log('distancePack', this.distancePack);
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        // $( '#cityGlobalDest' ).val(address);
        //this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }

      onUploadChange(evt: any) {
        console.log("evvvvvt", evt);
        const file = evt.target.files[0];
        console.log("fillll", file);

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
        // this.getTrips();
        this.getFiltredTrips(null, null, null);

    }

    onClickAdrExp() {
        console.log('Addresse Exp name', this.selectedAdresseExp);
        this.cityAdresseExp = this.selectedAdresseExp.cityAdr;
        this.contactAdresseExp = this.selectedAdresseExp.contactAdr;
        this.telContAdresseExp = this.selectedAdresseExp.mobileAdr;
    }

    onClickAdrDest() {
        if (!this.selectedAdresseExp) {
            this.snackBar.open('Merci de sélectionner l\'adresse source!', 'Fermer', {
                duration: 12000,
            });
            return;
        } else {
            console.log('Addresse Dest name', this.selectedAdresseDest);
            this.cityAdresseDest = this.selectedAdresseDest.cityAdr;
            this.contactAdresseDest = this.selectedAdresseDest.contactAdr;
            this.telContAdresseDest = this.selectedAdresseDest.mobileAdr;

            $('#latGlobalDest').val(this.selectedAdresseDest.geolocAdr.lat);
            $('#lngGlobalDest').val(this.selectedAdresseDest.geolocAdr.lng);
            $('#cityGlobalDest').val(this.selectedAdresseDest.cityAdr);

            this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
                this.selectedAdresseDest.geolocAdr.lat, this.selectedAdresseDest.geolocAdr.lng, 'K' );
            console.log('distancePack', this.distancePack);

            /* let p1  = new google.maps.LatLng(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng);
            let p2  = new google.maps.LatLng(this.selectedAdresseDest.geolocAdr.lat, this.selectedAdresseDest.geolocAdr.lng);
            this.calculeDistance(p1, p2, this.distancePack); */
        }
    }

    deleteTrip(trip) {
        if (localStorage.getItem('auth') === 'admin') {
            this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
            $('#trip-row-' + trip.idTrip).hide('slow', function() {
                    $(this).remove();
            });
        } else if ( ( trip.statusTrip !== 'Chez Livreur' || trip.statusTrip !== 'livraison en cours'
        || ( (trip.statusTrip !== 'Livree') && (!(trip.isClosed)) ) ) ) {
            this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
            $('#trip-row-' + trip.idTrip).hide('slow', function() {
                    $(this).remove();
            });

        } else {
            this.snackBar.open('Impossible de supprimer le colis.', 'Fermer', {
                duration: 12000,
            });
        }
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
        if(this.dataUser.cout !== null){
            this.pricePack = this.dataUser.cout;
        }else{
            this.pricePack = 6;
        }
        if (this.selectedTripType === 'doc' || this.selectedTripType === 'pack') {
            //this.pricePack = 6;
          if (this.modeLiv === 'immediate') {
              this.pricePack = this.pricePack + this.percentage(this.pricePack, 50);
          }
          } else if (this.selectedTripType === 'packbig') {

                if (this.modeLiv === 'immediate') {
                    // console.log(this.distancePack)
                    //this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
                    this.pricePack = this.pricePack + ((this.distancePack / 1000) * 0.3);
                } else if (this.modeLiv === '24H') {
                    //this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
                    console.log('prriiiiiiiiic', this.pricePack);
                } else if (this.modeLiv === '48H') {
                    //this.pricePack = 6;
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
        const sid = trp.idTrip;
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
        const dj = new Date();
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
        pdf.save('Manifeste_' + this.dateJ + '.pdf');
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
        const idt = this.tripBl.refTrip;
        html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 295;
        //const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgHeight = canvas.height * imgWidth / (canvas.width * 1.5);
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('/layout/assets/images/logo.png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 190);
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('BonDeLivraison_' + idt + '.pdf');
        });
    }


    // generate PDF Bon de Livrason
    AskOfBonLiv(trip) {
        console.log(this.auth);
        this.tservice.AskOfBonLiv(trip.idTrip, this.auth).subscribe(data => {
            console.log(data['_body']);
        });
    }

    changeDateFormat(dd) {
        const d = new Date(dd);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const hour = d.getHours();
        const min = d.getMinutes();
        // var sec = d.getSeconds();
        const dformat = [day, month, year].join('/') + ' ' + [hour, min].join(':');

        return dformat;
    }

    changeDateFormatMDY(dd) {
        const d = new Date(dd);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const dformat = [month, day, year].join('/');

        return dformat;
     }

    changeDateFormatDMY(dd) {
        const d = new Date(dd);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const dformat = [day, month, year].join('/');

        return dformat;
     }
     changeDateFormatDMY2(dd) {
        const d = new Date(dd);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const dformat = [day, month, year].join('-');

        return dformat;
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

      splitDateFormatMDY2(dd) {
        let dformat = '';
        if (dd != null) {
            const d = '' + dd;
            const arr = d.split(" ");
            dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
        }
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
        /* if (this.items !== undefined) {
          this.items = this.itemsSearch;
          this.items = this.filterItems(this.searchTerm);
        } */
        // this.getFiltredTrips(null, this.searchTerm, null);
        console.log('testmsg',this.startDateFilter)
        this.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter2,
            this.stateFilter, this.enRetardFilter, this.payementStatusFilter, this.driverFilter2,null);

      }

      searchPlaces() {
		const options = {
			// types: ['(regions)'],
			componentRestrictions: {country: 'tn'}
		};
        this.input = document.getElementById('inputDestAdresseCity');
		const autocomplete = new google.maps.places.Autocomplete(this.input as HTMLInputElement, options);
        autocomplete.addListener('place_changed', () => {
           const place: google.maps.places.PlaceResult = autocomplete.getPlace();

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
           console.log('addressss', address);
           $('#latGlobalDest').val(place.geometry.location.lat());
           $('#lngGlobalDest').val(place.geometry.location.lng());
           $('#cityGlobalDest').val(address);
       });

       this.latGlobalDest = $('#latGlobalDest').val();
       this.lngGlobalDest = $('#lngGlobalDest').val();

    }

    searchPlacesOnUpTrip() {
		const options = {
			// types: ['(regions)'],
			componentRestrictions: {country: 'tn'}
		};
        this.input = document.getElementById('cityAdresseDestUp');
		const autocomplete = new google.maps.places.Autocomplete(this.input as HTMLInputElement, options);
        autocomplete.addListener('place_changed', () => {
           const place: google.maps.places.PlaceResult = autocomplete.getPlace();
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
           $('#latGlobalDestUp').val(place.geometry.location.lat());
           $('#lngGlobalDestUp').val(place.geometry.location.lng());
           $('#cityGlobalDestUp').val(address);
       });

       this.latGlobalDest = $('#latGlobalDestUp').val();
       this.lngGlobalDest = $('#lngGlobalDestUp').val();

    }

      searchPlacesV2() {

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
           $('#latGlobalDest').val(places[0].geometry.location.lat());
           $('#lngGlobalDest').val(places[0].geometry.location.lng());
           $('#cityGlobalDest').val(address);
           console.log(address);
           console.log(places[0].geometry.location.lat());
           console.log(places[0].geometry.location.lng());

          if (places.length === 0) {
            return;
          }
       });

       this.latGlobalDest = $('#latGlobalDest').val();
       this.lngGlobalDest = $('#lngGlobalDest').val();

       /* this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
        this.latGlobalDest, this.lngGlobalDest, 'K' );
    console.log('distancePack', this.distancePack); */



    }

    onClickPreMsg() {
        console.log('inputPreMessageToClient: ', this.inputPreMessageToClient);
        console.log('inputCusMessageToClient: ', this.inputCusMessageToClient);
        this.addMsg();
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

    addMsg() {

        let msg = '';
        if (!this.inputPreMessageToClient && !this.inputCusMessageToClient) {
            this.snackBar.open('Veuillez entrer un message!', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        if (this.inputCusMessageToClient) {
            msg = this.inputCusMessageToClient;
        } else {
            msg = this.inputPreMessageToClient;
        }

        const date = new Date();
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const msgdata = {
          msgTrip : [{
            ownerMsg: localStorage.getItem('auth'),
            contentMsg: msg,
            dateMsg: date
          }]
          };

        this.http.put('http://147.135.136.78:8052/trip/update/' + this.trpMsg.idTrip, msgdata , options).subscribe(data => {
            this.snackBar.open('Message envoyé avec succès.', 'Fermer', {
                duration: 5000,
            });
            }, error => {
            console.log(error); // Error getting the data
        });
      }

      initListGov() {
        this.listDeleg = [];
        console.log('cccc', this.listDeleg);
      }

    getGovAndDelegOfTunisia() {
        const gouvernorat = $( '#gouvernorat' );
        const delegation = $( '#delegation' );
        const key = '2035'; // $( '#zipCode' ).val();
        this.listDeleg = [];
        TunisiaGovAndDelg.loadGovAndDelegOfTunisia(gouvernorat, delegation, key);
        console.log('bbbb', this.listDeleg);
    }

    getDelegFromGov() {
        const gov = $( '#gouvernorat' ).val();
        const zp = $( '#zipCode' ).val();
        const del = $( '#delegation' );
        this.delegation = '';
        TunisiaGovAndDelg.getDelegFromGov(gov, del, zp, this.tunisiaData);
    }

    getDelegFromGovOnUp() {
        const gov = $( '#gouvernoratUp' ).val();
        const zp = $( '#zipCodeUp' ).val();
        const del = $( '#delegationUp' );
        this.delegationUp = '';
        TunisiaAdr.getDelegFromGov(gov, del, zp, this.tunisiaData);
    }

    getLatLngFromGov() {
        /* const gov = (<HTMLInputElement>document.getElementById('gouvernorat')).value;
        console.log('gooov ', gov);
        const address = gov + ', Tunisie'; */
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        //this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }

      getGovAndDelegFromIndex() {
        const gov = $( '#gouvernorat' ).val();
        const del = $( '#delegation' ).val();
        const zp = $( '#zipCode' );
        const compoAdr = $( '#cityGlobalDest' );
        // TunisiaGovAndDelg.getGovAndDelegFromIndex(gov, del, zp, compoAdr);
        const vill = this.delegation + ', ' +gov;
        compoAdr.val(vill);
        const addr = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        console.log('address ', addr);
        const res = vill.split(",");
        // const numZp = vill.replace(/[^0-9]/g, '');
        const numZp = res[res.length - 2].trim();
        zp.val(numZp);
        let address: any = '';
        address = addr || 'Tunis, Tunisie';
        //this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }

      getAdrFromIndex() {
        const gov = $( '#gouvernoratUp' ).val();
        const del = $( '#delegationUp' ).val();
        const zp = $( '#zipCodeUp' );
        const compoAdr = $( '#cityGlobalDestUp' );
        // TunisiaAdr.getAdrFromIndex(gov, del, zp, compoAdr);
        const vill = this.delegationUp + ', ' +gov;
        compoAdr.val(vill);
        const addr = (<HTMLInputElement>document.getElementById('cityGlobalDestUp')).value;
        console.log('addresssss ', addr);
        const res = vill.split(",");
        // const numZp = vill.replace(/[^0-9]/g, '');
        const numZp = res[res.length - 2].trim();
        zp.val(numZp);
        let address: any = '';
        address = addr || 'Tunis, Tunisie';
        //this.getLatitudeLongitudeFromAddress(this.showResultV2, address);
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
        // (<HTMLInputElement>document.getElementById('latitude2')).value = result.geometry.location.lat();
        // (<HTMLInputElement>document.getElementById('longitude2')).value = result.geometry.location.lng();
        $( '#latGlobalDest' ).val(result.geometry.location.lat());
        $( '#lngGlobalDest' ).val(result.geometry.location.lng());
      }

    showStatusTrip(trip) {
          this.changeColorByStatusTrip = false;
          this.dnow = new Date().getTime();
          const dif = Number('172800000');
          let d1;

          /* if (trip.getedday != null) {
            const dramassage = new Date(trip.getedday).getTime();
            const diff = this.dnow - dramassage;
            if ((diff >=  dif) && (trip.nbTentative === 0) && (trip.statusTrip !== 'Livree')) {
                this.changeColorByStatusTrip = true;
             } else {
                this.changeColorByStatusTrip = false;
             }
          } else {
            this.changeColorByStatusTrip = true;
          }
          return this.changeColorByStatusTrip; */
        if (trip.statusTrip === 'cherche un livreur') {
            d1 = new Date(trip.createdday).getTime();
        } else if (trip.statusTrip === 'Livreur en chemin') {
                d1 = new Date(trip.affectedday).getTime();
          } else if (trip.statusTrip === 'Chez Livreur') {
                    d1 = new Date(trip.getedday).getTime();
            } else if (trip.statusTrip === 'livraison en cours') {
                        d1 = new Date(trip.startdelday).getTime();
             } else if (trip.statusTrip === 'Livree') {
                            d1 = new Date(trip.livredday).getTime();
              } else if (trip.statusTrip === 'Retour') {
                                d1 = new Date(trip.returnedday).getTime();
               }
        const diff = this.dnow - d1;
        if ((diff >=  dif) && (trip.nbTentative === 0)) {
            this.changeColorByStatusTrip = true;
        } else {
            this.changeColorByStatusTrip = false;

        }

        return this.changeColorByStatusTrip;
    }


    onFileChange(evt: any, contentImport) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
        console.log('type', target.files[0].type);
        const typeFile = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
       /* if (target.files[0].type !== typeFile) {
           /* this.snackBar.open('Échec, le fichier est invalide, les extensions autorisées sont: .xlsx et xls.', 'Fermer', {
                duration: 5000,
            });
            return;
        } else {*/
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                this.tripsFromExcelTemp = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
                this.tripsFromExcel = this.tripsFromExcelTemp;
                this.tripsFromExcel.shift();

            };
            reader.readAsBinaryString(target.files[0]);
            this.openSm(contentImport);
        // }
    }

    tripsFromExcelAdrLatLng() {
        console.log('Test11');
        if (this.tripsFromExcel !== null && this.tripsFromExcel.length > 0) {
            let city = '';
            console.log('this.tripsFromExcel.length', this.tripsFromExcel.length);
            for(let i =0; i < this.tripsFromExcel.length; i++) {
                city = ''+ this.tripsFromExcel[i][2] +', '+ this.tripsFromExcel[i][3] +', ' + this.tripsFromExcel[i][4] + ', ' + this.tripsFromExcel[i][5];
                console.log(city);
                this.tripsFromExcel[i].push(city);
                //this.getLatitudeLongitudeFromAddress2(this.showResult2, city, this.tripsFromExcel, i);
            }
            console.log('Test11');
        }
    }

    getLatitudeLongitudeFromAddress2(callback, address, tripsFromExcel, index) {
        address = address || 'Tunis, Tunisie';
        // Initialize the Geocoder
        const geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    tripsFromExcel[index].push(results[0].geometry.location.lat());
                    tripsFromExcel[index].push(results[0].geometry.location.lng());
                    callback(results[0], address, index);
                }
            });
        }
      }

    showResult2(result, address, index) {
        console.log('index ' + index, result.geometry.location.lat());
        console.log('index ' + index, result.geometry.location.lng());
    }

    showArrayTrip() {
        console.log(this.tripsFromExcel);
    }

    /* addTripsFromExcelFile() {
        this.spinner.show();
        setTimeout(() => {
            this.addTripsFromExcel();
        }, 8000);

    } */

    addTripsFromExcelFile() {
        this.spinner.show();
        const that = this;
        console.log('Test2');
        const nowd = new Date();
		const tripType = 'pack';
        const sizePack = null;
        const poidsTrip = 0;
		const modeLiv = '24H';
        const labelAdrD = '';
		const pricePack = 6;
        const typePaiement = 'Contre remboursement';
        //const regex = /^[0-9]+$/;
        const regex = /^-?(?:\d+|\d{0,9}(?:,\d{9})+)(?:(\.|,)\d+)?$/;
        let checkValidFile = true;

        if (!this.selectedAdresseExpExcel) {
            this.snackBar.open('Échec, veuillez sélectionner votre adresse source.', 'Fermer', {
                duration: 5000,
            });
            return;
        } else if (this.tripsFromExcel !== null && this.tripsFromExcel.length > 0) {

            console.log('aaaaaaa111111111aa',this.tripsFromExcel);
            for (let i = 0; i < this.tripsFromExcel.length; i++) {
                // let valueTrip: any; let telContAdresseDest: any;
                const contactAdresseDest = this.tripsFromExcel[i][0];
                const telContAdresseDest = this.tripsFromExcel[i][1];
                const descriptionTrip = this.tripsFromExcel[i][6];
                let valueTrip = this.tripsFromExcel[i][7];
                const cityGlobalDest = this.tripsFromExcel[i][8];
                const latGlobalDest = this.tripsFromExcel[i][9];
                //const latGlobalDest = 36.81897;
                const lngGlobalDest = this.tripsFromExcel[i][10];
                //const lngGlobalDest = 10.16579;

                console.log('aaaaaaaaa');
                if ((descriptionTrip === undefined) || (valueTrip === undefined) || (telContAdresseDest === undefined)
                || (contactAdresseDest === undefined) || (cityGlobalDest === undefined)) {
                    checkValidFile = false;
                    this.snackBar.open('Échec de l\'importation, veuillez réessayer. Assurez-vous d\'importer un fichier valide.', 'Fermer', {
                        duration: 5000,
                    });
                    return;
                } else if ((descriptionTrip === null || descriptionTrip === '') || (valueTrip === null || valueTrip === '')
                || (telContAdresseDest === null || telContAdresseDest === '')
                || (contactAdresseDest === null || contactAdresseDest === '') || (cityGlobalDest === null || cityGlobalDest === '')) {
                    checkValidFile = false;
                    this.snackBar.open('Échec de l\'importation, veuillez réessayer. Assurez-vous d\'importer un fichier valide.', 'Fermer', {
                        duration: 5000,
                    });
                    return;
                }

                //valueTrip = valueTrip.replace(/,/g, '.');
                this.tservice.addTripFromExcel(
                    this.dataUser.nameUser, this.dataUser.emailUser, this.dataUser.rateUser, this.dataUser.idUser,
                    this.dataUser.nbrateUser, this.dataUser.nbrdeliveryUser, this.dataUser.mobileUser, this.dataUser.surnameUser,
                    this.selectedAdresseExpExcel.geolocAdr.lat, this.selectedAdresseExpExcel.geolocAdr.lng, this.selectedAdresseExpExcel.contactAdr,
                    this.selectedAdresseExpExcel.mobileAdr, contactAdresseDest,
                    telContAdresseDest, null,nowd, 'UT' + this.dataUser.idUser, this.dataUser.idUser,
                    nowd, latGlobalDest, lngGlobalDest, modeLiv,
                    pricePack, tripType, valueTrip, poidsTrip,
                    sizePack, typePaiement, 'REF', 'cherche un livreur',
                    this.selectedAdresseExpExcel.cityAdr, cityGlobalDest, null, descriptionTrip,
                    null, this.selectedAdresseExpExcel.labelAdr, labelAdrD);
                    setTimeout(function() {
                   }, 1000);
            }
            // this.spinner.hide();
            // window.location.reload();
            this.snackBar.open('Ajout avec succès.', 'Fermer', {
                duration: 5000,
            });

        } else {
            this.snackBar.open('Échec de l\'importation, veuillez réessayer. Assurez-vous d\'importer un fichier valide.', 'Fermer', {
                duration: 5000,
            });
        }
        this.out = this.tripsFromExcel.length *1000;
        /*
        setTimeout(function() {
            /* that.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter2,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null); 
                window.location.reload();
       }, this.out);
       */
      this.spinner.hide();
    }

    EditAddressDest() {
        const titleBtn = $('#btnShowHide').text();
        if (titleBtn === 'Editer') {
            this.cityGlobalDestUp = this.objTrip.destTrip.cityAdr;
            this.latGlobalDestUp = this.objTrip.destTrip.geolocAdr.lat;
            this.lngGlobalDestUp = this.objTrip.destTrip.geolocAdr.lng;
            $('#newAdrDest').show();
            $('#btnShowHide').text('Annuler');
            $('#inputDestTrip').hide();
        } else {
            this.cityGlobalDestUp = this.cityAdrUp;
            this.latGlobalDestUp = this.latAdrUp;
            this.lngGlobalDestUp = this.lngAdrUp;
            $('#newAdrDest').hide();
            $('#inputDestTrip').show();
            $('#btnShowHide').text('Editer');
        }
    }


    EditAddressSource() {
        const titleBtn = $('#btnShowHide1').text();
        if (titleBtn === 'Editer') {
            this.cityGlobalSourceUp = this.objTrip.sourceTrip.cityAdr;
            this.latGlobalSourceUp = this.objTrip.sourceTrip.geolocAdr.lat;
            this.lngGlobalSourceUp = this.objTrip.sourceTrip.geolocAdr.lng;
            $('#newAdrSource').show();
            $('#btnShowHide1').text('Annuler');
            $('#inputSourceTrip').hide();
        } else {
            this.cityGlobalSourceUp = this.cityAdrUp1;
            this.latGlobalSourceUp = this.latAdrUp1;
            this.lngGlobalSourceUp = this.lngAdrUp1;
            $('#newAdrSource').hide();
            $('#inputSourceTrip').show();
            $('#btnShowHide1').text('Editer');
        }
    }


    updateArgentRecolte() {
        console.log(this.tripBl.idTrip)
        if((this.tripBl.statusTrip!=='Livree')||(this.tripBl.statusTrip!=='Retour')) {
            this.snackBar.open('Immpossible de modifier le colis '+this.tripBl.refTrip, 'Fermer', {
                duration: 12000,
            });
            return;
        }
       const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
          const Trip = {
            argentRecolte:true,
            lastupdateby : this.userName
          };

        this.http.put('http://147.135.136.78:8052/trip/updateargentrecolter/' + this.tripBl.idTrip, Trip , options).subscribe(data => {
            this.snackBar.open('Ce clois est récolté avec succès.', 'Fermer', {
                duration: 5000,
            });
            }, error => {
            console.log(error); // Error getting the data
        });
    }

    tets() {
        console.log('driverrrr',this.actionA);

    }

    getvalue = (item : String, content:any) => {
        if(this.userName ==='Achref Cherif'){
            if(this.checkedTrips.length<=0) {
                this.snackBar.open('Aucun colis sélectionné ', 'Fermer', {
                    duration: 12000,
                });
                return;
            }else{
                for (let i = 0; i < this.checkedTrips.length; i++) {
                    if(this.checkedTrips[i].statusTrip === 'Retour'){
                        this.checkedTrips[i].packageTrip.valPackage = 0;
                        console.log("retour: ", this.checkedTrips[i].packageTrip.valPackage)
                    }
                }
            }

            console.log(item);
            this.calculsommeTotal();
            console.log(this.sommeTotal);
            this.actionfinanciere(content,item);
        }else{
            this.snackBar.open('Vous n avez pas le droit de modifier', 'Fermer', {
                duration: 12000,
            }); 
        }
      
    }

    getvalueEtat = (item : String, content:any) => {
        if(this.checkedTrips.length<=0) {
            this.snackBar.open('Aucun colis sélectionné ', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        console.log(item);
        this.openModalstatus(content,item);
    }

    openModalstatus(content, item) {
        this.itemStatus = item;
        this.open(content);
    }

    openmodelExport(content) {
        if(this.checkedTrips.length <= 0) {
            this.snackBar.open('Aucun colis sélectionné ', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        this.open(content);
    }

    generatePackwaysExcelReport() {

        // Excel Title, Header, Data
        const title = 'Rapport de colis de PACKWAYS';
        const header = ['Destinataire', 'Tél', 'Adresse', 'Description', 'Montant', 'Status', 'Date'];

        for (let i = 0; i < this.checkedTrips.length; i++) {
            const tab: any = [];
            let date:any;
            if(this.checkedTrips[i].statusTrip==='Livree') {
                date = this.checkedTrips[i].livredday;
            } else {
                date = this.checkedTrips[i].createdday;
            }
            tab.push(this.checkedTrips[i].destTrip.contactAdr, this.checkedTrips[i].destTrip.mobileAdr,
                     this.checkedTrips[i].destTrip.cityAdr, this.checkedTrips[i].descriptionTrip,
                     this.checkedTrips[i].packageTrip.valPackage, this.checkedTrips[i].statusTrip, date);

            this.data.push(tab);
        }


        // Create workbook and worksheet
        // const workbook: ExcelProper.Workbook = new Excel.Workbook();
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('');

        // Add Header Row
        const headerRow = worksheet.addRow(header);
        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(3).width = 50;
        worksheet.getColumn(4).width = 40;
        worksheet.getColumn(6).width = 20;
        worksheet.getColumn(7).width = 30;
        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF00' },
            bgColor: { argb: 'FF0000FF' }
          };
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          cell.alignment = {vertical: 'middle', horizontal: 'center'};
        });
        // worksheet.addRows(data);


        // Add Data and Conditional Formatting
        this.data.forEach(d => {
          const row = worksheet.addRow(d);
          row.alignment = {vertical: 'middle', horizontal: 'center'};
        });
         const d = new Date();
        // worksheet.getColumn(5).alignment = {vertical: 'middle', horizontal: 'left'};
        worksheet.getRow(4).alignment = {vertical: 'middle', horizontal: 'center'};
        worksheet.getRow(5).alignment = {vertical: 'middle', horizontal: 'center'};
        const nameReport = 'PACKWAYS-repport-' + this.changeDateFormatDMY(d) + '' + '.xlsx';   // .xlsx
        // tslint:disable-next-line:no-shadowed-variable
        workbook.xlsx.writeBuffer().then((buff: ArrayBuffer) => {
          // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, nameReport);
        });

      }
      calculsommeTotal() {
          this.sommeTotal = 0;
        for (let i = 0; i < this.checkedTrips.length; i++) {
            this.sommeTotal = this.sommeTotal + Number(this.checkedTrips[i].packageTrip.valPackage);
        }
      }
      deleteChecked(trip) {
        for (let i = 0; i < this.checkedTrips.length; i++) {
            if (trip.idTrip === this.checkedTrips[i].idTrip) {
                this.checkedTrips.splice(i, 1);
            }
        }
        this.calculsommeTotal();
      }

      showFinancialStatus(trip) {
        let financialStatus = '';
        if (trip.paymentStatus) {
            if (trip.paymentStatus === 'Payee') {
                financialStatus = 'Payé';
            } else if (trip.paymentStatus === 'En cours de payement') {
                financialStatus = 'En cours de paiement';
            }else if(trip.paymentStatus === 'En cours de retour'){
                financialStatus = 'En cours de retour';
            }else if (trip.paymentStatus === 'Retournee'){
                financialStatus = 'Retournee';
            }

        } else if (trip.argentRecolte) {
            financialStatus = 'Récolté';
        }
        return financialStatus;
      }


      generateExcelReportForClient() {

        this.tripsByUser = [];
        this.costtrip = 0;
        this.valpack = 0;
        const nameuser = this.selectedUser;
        console.log('nameuser', nameuser);
        if (nameuser === null || nameuser === undefined) {
            this.snackBar.open('Veuillez sélectionner le client.', 'Fermer', {
                duration: 10000,
            });
            return;
        }
        if (this.payementStatusFilter !== 'Récolté/RetourBC') {
            /* this.snackBar.open('Veuillez sélectionner l\'option Récolté et Retour BC comme status de paiement.', 'Fermer', {
                duration: 10000,
            });
            return; */
        }
        if (this.checkedTrips.length === 0) {
            this.snackBar.open('Veuillez sélectionner au moins un colis.', 'Fermer', {
                duration: 10000,
            });
            return;
        }

        console.log('clientfilter', this.clientFilterTest);        
        for (let i = 0; i < this.checkedTrips.length; i++) {
            const jTemp = this.checkedTrips[i];

            if (jTemp.userTrip.idUser !== this.clientFilterTest) {
                this.snackBar.open('Veuillez vérifier la liste des colis sélectionnés. Il y a des colis qui ne correspondent pas au client '+nameuser, 'Fermer', {
                    duration: 10000,
                });
                return;
            }

            if (jTemp.statusTrip === 'Retour') {
                if (jTemp.isBilled === true) {
                    jTemp.packageTrip.valPackage = 0;
                    jTemp.statusTrip = 'Retour';
                } else {
                    jTemp.costTrip = 3;
                    jTemp.packageTrip.valPackage = 0;
                    jTemp.statusTrip = 'Retour';
                }
            }

            this.costtrip = this.costtrip + jTemp.costTrip;
            this.valpack = this.valpack + jTemp.packageTrip.valPackage;
            const tab: any = [];
            tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY2(jTemp.createdday),
             this.splitDateFormatMDY2(jTemp.livredday), jTemp.descriptionTrip, jTemp.packageTrip.valPackage);
            this.tripsByUser.push(tab);
        }

        const tab1: any = [];
        tab1.push('', '', this.costtrip, '', '', '', this.valpack);
        this.tripsByUser.push(tab1);

        const montantNet = this.valpack - this.costtrip;
        this.tripExcelService.generateExcel(this.tripsByUser, nameuser, montantNet,this.clientRapport.mobileUser,this.clientRapport.adressUser);

        this.clientFilterTest = '';
        this.selectedUser = null;
      }

      getSelectedUser(user: any) {
          if(user != null){
            this.selectedUser = user.title; 
                console.log('idSelectedUser', this.selectedUser);
                let ind = this.Listuserauto.indexOf(this.selectedUser);
                console.log("iiiind ", ind);
                this.clientFilter2 = this.Listuser[ind].idUser; 
                this.clientFilterTest = this.Listuser[ind].idUser;
                this.clientRapport =  this.Listuser[ind];
                
                /*
                const arr = user.split(' ');
                this.selectedUser = null;        
                for (let i = 0; i < this.Listuser.length; i++) {            
                    const idu = this.Listuser[i].idUser;
                    if (idu === arr[1]) {
                        console.log('okiii');
                        this.selectedUser = '' + this.Listuser[i].nameUser + ' ' + this.Listuser[i].surnameUser;
                        return;
                    }
                }*/                
        
                return this.selectedUser;
          }
          
    }

    getSelectedDriver(driver: any) {
        if(driver != null){
              //this.selectedUser = driver.title; 
              console.log('idSelectedUser', this.selectedUser);
              let ind = this.Listdriverauto.indexOf(driver.title);
              console.log("iiiind ", ind);
              this.driverFilter2 = this.Listdriver[ind].idDriver; 
              this.actionA = this.Listdriver[ind];
              console.log("actionnnn ", this.actionA);

        }
        return this.actionA;
        
    }

    getSelectedDriver2(driver: any) {
              let ind = this.Listdriverauto.indexOf(driver);
              let driverreturn = this.Listdriver[ind];

        return driverreturn;
        
    }

     compressFile() {
  
        this.imageCompress.uploadFile().then(({image, orientation}) => {
        
          this.imgResultBeforeCompress = image;
          console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
          
          this.imageCompress.compressFile(image, orientation, 50, 50).then(
            result => {
              this.imgResultAfterCompress = result;
              //this.onUploadChange(result);
              console.log("ressssssssss", result);
              this.base64textString = [];
              this.base64textString.push(result);
              console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            }
          );
          
        });
        
      } 
    
}


