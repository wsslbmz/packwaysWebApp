import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './users.service';
import {User} from './User';
import { DomSanitizer } from '@angular/platform-browser';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutoCompleteComponent} from 'ng-auto-complete';
import { ExcelService } from './excel.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as $ from 'jquery';


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

    constructor( public userService: UserService, private modalService: NgbModal, private excelService: ExcelService) { }
  
    ngOnInit() {
      this.items = this.userService.getUsers();
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
      editUser(user) {
        this.obj = user;
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
      //this.uservice.deleteUser(user.idUser);
      $('#adr-row-' + user.idUser).hide('slow', function() {
          $(this).remove();
      });
   }

   addUser(){

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
    var year = d.getFullYear();    
    let dformat = [month, day, year].join('/');

    return dformat;
 }

    generateExcel() {
        this.idUserTr = 'UT' + this.objUser.idUser;
        this.sDate = this.changeDateFormatMDY(this.startDate);
        this.eDate = this.changeDateFormatMDY(this.endDate);

        return new Promise((resolve, reject) => {
            this.tripsByUserAndDate = this.userService.getTripsByUserAndDate(this.idUserTr, this.sDate, this.eDate);
            resolve();
        }).then(res => this.excelService.generateExcel(this.tripsByUserAndDate));

    }

}


