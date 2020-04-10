import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';
import { User } from './User';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  obj: any;
  closeResult: string;
  items: any;
  objUser = new User;
  constructor( public uservice: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    //this.items = this.uservice.getAdresses();
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


}
