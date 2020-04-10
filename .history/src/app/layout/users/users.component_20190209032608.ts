import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './users.service';
import {User} from './User';
import { DomSanitizer } from '@angular/platform-browser';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutoCompleteComponent} from 'ng-auto-complete';
import { ExcelService } from './excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as $ from 'jquery';
import { Trip } from '../trips/Trip';


declare const google: any;
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit {

    obj: any;
    closeResult: string;
    items: any;
    searchTerm: string = '';
    itemsSearch = [];
    objUser = new User;
    idUserTr: any;    
    nameUser: any;
    surnameUser: any;
    emailUser: any; 
    mobileUser: any;
    tripsByUserAndDate: any;
    startDate: any;
    endDate: any;
    sDate: any;
    eDate: any;
    tripStatus: any;

    result: any;
   jsonObj: any;
    valpack: any;
    costtrip: any;

    constructor( public userService: UserService, private modalService: NgbModal,
         private excelService: ExcelService, private spinner: NgxSpinnerService) { }
  
    ngOnInit() {
      this.getUsers();
    }
  
    open(content) {
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    openRl(content, user) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.objUser = user;
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


    getUsers() {
        this.items = [];
        this.userService.getUsersFromServe().subscribe(data => {
            this.result = data['_body'];
    
            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            this.itemsSearch = this.items;
        });
    }

      editUser(user) {
        this.obj = user;
        this.objUser.idUser=this.obj.idUser;
        this.objUser.nameUser = this.obj.nameUser;
        this.objUser.surnameUser = this.obj.surnameUser;
        this.objUser.mobileUser = this.obj.mobileUser;
        this.objUser.emailUser = this.obj.emailUser;
        this.objUser.adressUser = this.obj.adressUser;
        this.objUser.deleted = this.obj.deleted;
        this.objUser.createdday = this.obj.createdday;
        this.objUser.createdby = this.obj.createdby;
        this.objUser.updateby = this.obj.updateby;
        this.objUser.createdday = this.obj.createdday;
        this.objUser.login = this.obj.login;
        this.objUser.password = this.obj.password;
        this.objUser.imgUser = this.obj.imgUser;
        this.objUser.rateUser = this.obj.rateUser;
        this.objUser.nbrateUser = this.obj.nbrateUser;
        console.log(this.objUser);
    }

    deleteUser(user) {
        let Userdata = {
            deleted:true
        }
       this.userService.deleteUser(user.idUser,Userdata);
      $('#user-row-' + user.idUser).hide('slow', function() {
          $(this).remove();
      });
   }

   Update(){
    this.updateUser(this.objUser.idUser,this.objUser.login,this.objUser.password,this.objUser.nameUser,
                    this.objUser.surnameUser,this.objUser.emailUser,this.objUser.mobileUser,this.objUser.adressUser )
                    window.location.reload();

   }
   updateUser(idUser,login,password,nameUser,surnameUser,emailUser,mobileUser,adress){
    let Userdata = {
        login:login,
        password:password,
        nameUser: nameUser,
        surnameUser:surnameUser,
        emailUser:emailUser,
        mobileUser:mobileUser,
        adressUser:adress,
        updateday:new Date,
        updateby:idUser
      }
      console.log("data",Userdata)
      this.userService.updateUser(Userdata,idUser).subscribe(data => {
        const result = data['_body'];
       }, error => {
        console.log(error); // Error getting the data
      });
   }


   filterItems(searchTerm) {    

    return this.items.filter((item) => {
        let nomUser: any; let loginUser: any; let mobUser: any; let snomUser: any; let mailUser: any; let adrUser: any; let createdDate: any; let accountStatus: any;

        if (item != null && item.nameUser != null) {
            nomUser = item.nameUser.toString();
        } else {
            nomUser = ' ';
        }
        if (item != null && item.login != null) {
            loginUser = item.login.toString();
        } else {
            loginUser = ' ';
        }
        if (item != null && item.mobileUser != null) {
            mobUser = item.mobileUser.toString();
        } else {
            mobUser = ' ';
        }
        if (item != null && item.surnameUser != null) {
            snomUser = item.surnameUser.toString();
        } else {
            snomUser = ' ';
        }
        if (item != null && item.emailUser != null) {
            mailUser = item.emailUser.toString();
        } else {
            mailUser = ' ';
        }
        if (item != null && item.adressUser != null) {
            adrUser = item.adressUser.toString();
        } else {
            adrUser = ' ';
        }
        if (item != null && item.createdday != null) {
            createdDate = item.createdday.toString();
        } else {
            createdDate = ' ';
        }
        if (item != null && item.accountActive != null) {
            accountStatus = item.accountActive.toString();
        } else {
            accountStatus = ' ';
        }

        return nomUser.indexOf(searchTerm) > -1
                || loginUser.indexOf(searchTerm) > -1
                || mobUser.indexOf(searchTerm) > -1
                || snomUser.indexOf(searchTerm) > -1
                || mailUser.indexOf(searchTerm) > -1
                || adrUser.indexOf(searchTerm) > -1
                || createdDate.indexOf(searchTerm) > -1
                || accountStatus.indexOf(searchTerm) > -1
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

   changeDateTimeFormat(dd){
    var d = new Date(dd);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    // var sec = d.getSeconds();
    let dformat = [day, month, year].join('/')+' '+[hour, min].join(':');

    return dformat;
 }

 changeDateFormatMDY(dd){
    var d = new Date(dd);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    let year = d.getFullYear();    
    let dformat = [month, day, year].join('/');

    return dformat;
 }

    generateExcel() {
        //this.spinner.show();
        this.idUserTr = 'UT' + this.objUser.idUser;
        this.sDate = this.changeDateFormatMDY(this.startDate);
        this.eDate = this.changeDateFormatMDY(this.endDate);
        this.tripsByUserAndDate = [];        

        this.userService.getTripsByUserAndDate(this.idUserTr, this.sDate, this.eDate).subscribe(data => {
            this.result = data['_body'];
    
            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            let cloture = '';
            this.costtrip = 0;
            this.valpack = 0;
            
            for (let index = 0; index < this.jsonObj.length; index++) {
                let jTemp = this.jsonObj[index];

                if (this.tripStatus === 'Tous' || this.tripStatus === '') {
                    if (jTemp.isClosed === true) {
                        cloture = 'Oui';
                    } else {
                        cloture = 'Non';
                    }
    
                    if (jTemp.statusTrip === 'Retour') {
                        if (jTemp.isBilled === true) {
                            jTemp.packageTrip.valPackage = 0;
                            jTemp.statusTrip = 'Retour avec frais';
                        } else {
                            jTemp.costTrip = 0;
                            jTemp.packageTrip.valPackage = 0;
                            jTemp.statusTrip = 'Retour sans frais';
                        }
                    }                
    
                    this.costtrip = this.costtrip + jTemp.costTrip;
                    this.valpack = this.valpack + jTemp.packageTrip.valPackage;
                    let tab: any = [];
                    tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY(jTemp.createdday),
                    this.splitDateFormatMDY(jTemp.getedday), this.splitDateFormatMDY(jTemp.livredday),
                    cloture, jTemp.packageTrip.valPackage);
                    this.tripsByUserAndDate.push(tab);

                } else if (this.tripStatus === 'Livree et retour') {
                    if (jTemp.statusTrip === 'Livree' || jTemp.statusTrip === 'Retour') {                        
                            if (jTemp.isClosed === true) {
                                cloture = 'Oui';
                            } else {
                                cloture = 'Non';
                            }
            
                            if (jTemp.statusTrip === 'Retour') {
                                if (jTemp.isBilled === true) {
                                    jTemp.packageTrip.valPackage = 0;
                                    jTemp.statusTrip = 'Retour avec frais';
                                } else {
                                    jTemp.costTrip = 0;
                                    jTemp.packageTrip.valPackage = 0;
                                    jTemp.statusTrip = 'Retour sans frais';
                                }
                            }                
            
                            this.costtrip = this.costtrip + jTemp.costTrip;
                            this.valpack = this.valpack + jTemp.packageTrip.valPackage;
                            let tab: any = [];
                            tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY(jTemp.createdday),
                            this.splitDateFormatMDY(jTemp.getedday), this.splitDateFormatMDY(jTemp.livredday),
                            cloture, jTemp.packageTrip.valPackage);
                            this.tripsByUserAndDate.push(tab);                                             
                    }

                } else if (this.tripStatus === 'Livree') {
                    if (jTemp.statusTrip === 'Livree') {
                        if (jTemp.isClosed === true) {
                            cloture = 'Oui';
                        } else {
                            cloture = 'Non';
                        }

                        this.costtrip = this.costtrip + jTemp.costTrip;
                        this.valpack = this.valpack + jTemp.packageTrip.valPackage;
                        let tab: any = [];
                        tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY(jTemp.createdday),
                        this.splitDateFormatMDY(jTemp.getedday), this.splitDateFormatMDY(jTemp.livredday),
                        cloture, jTemp.packageTrip.valPackage);
                        this.tripsByUserAndDate.push(tab);                        
                    }

                } else if (this.tripStatus === 'Retour') {
                    if (jTemp.statusTrip === 'Retour') {
                        if (jTemp.isClosed === true) {
                            cloture = 'Oui';
                        } else {
                            cloture = 'Non';
                        }
        
                        if (jTemp.statusTrip === 'Retour') {
                            if (jTemp.isBilled === true) {
                                jTemp.packageTrip.valPackage = 0;
                                jTemp.statusTrip = 'Retour avec frais';
                            } else {
                                jTemp.costTrip = 0;
                                jTemp.packageTrip.valPackage = 0;
                                jTemp.statusTrip = 'Retour sans frais';
                            }
                        }            

                        this.costtrip = this.costtrip + jTemp.costTrip;
                        this.valpack = this.valpack + jTemp.packageTrip.valPackage;
                        let tab: any = [];
                        tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY(jTemp.createdday), 
                        this.splitDateFormatMDY(jTemp.getedday), this.splitDateFormatMDY(jTemp.livredday),
                        cloture, jTemp.packageTrip.valPackage);
                        this.tripsByUserAndDate.push(tab);                        
                    }
                }
            }
            let tab1: any = [];
            tab1.push('', '', '', '', '', '', '', '', '');
            tab1.push('', '', this.costtrip, '', '', '', '', '', this.valpack);   
            this.tripsByUserAndDate.push(tab1);
        },
        err => {
            console.log(err);
        },
        () => {
            let nameuser = ''+this.objUser.nameUser+' '+this.objUser.surnameUser;
            let montantNet = this.valpack - this.costtrip;
            this.excelService.generateExcel(this.tripsByUserAndDate, nameuser, this.changeDateFormatDMY2(this.startDate), this.changeDateFormatDMY2(this.endDate), montantNet);
            // this.spinner.hide();
        });

    }

    changeDateFormatDMY(dd){
        var d = new Date(dd);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        let dformat = [day, month, year].join('/');

        return dformat;
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

     changeDateFormatDMY2(dd){
        const arr = dd.split('-');
        const dformat = arr[1] + '/' + arr[2] + '/' + arr[0];

        return dformat;
     }


     OnBlock(user) {
        const userdata = {
            accountActive : false
          };
        this.userService.BlockUser(user.idUser,userdata);
        //$('#user-tdactif-' + user.idUser).val("Inactif");
        window.location.reload();

     }

     OnDeBlock(user) {
        const userdata = {
            accountActive : true
          };
        this.userService.BlockUser(user.idUser, userdata);
        //$('#user-tdinactif-' +user.idUser).val("Actif");
        window.location.reload();

     }
}


