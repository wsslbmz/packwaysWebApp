import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { User } from 'src/app/layout/profile/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {

  disable: boolean;
  closeResult: string;
  dataUser: any;
  currentUser: any;
  obj: any;
  objUser = new User;

  constructor(private modalService: NgbModal, public userService: ProfileService,) { }

  ngOnInit() {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);

    this.editUser(this.dataUser);
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
    this.objUser.mfUser = this.obj.mfUser;
    this.objUser.steUser= this.obj.steUser;
    this.objUser.cout=this.obj.cout;
    this.objUser.codeParenage=this.obj.codeParenage;
    this.objUser.codeParan=this.obj.codeParan;
    
    
    if(this.objUser.codeParan===null){
        this.disable=false;
    }else{
        this.disable=true;
    }
    console.log("codeeee",this.disable);
}

  openC(content){
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

  Update(){
    this.updateUser(this.objUser.idUser,this.objUser.login,this.objUser.password,this.objUser.nameUser,
                    this.objUser.surnameUser,this.objUser.emailUser,this.objUser.mobileUser,this.objUser.adressUser,
                    this.objUser.mfUser, this.objUser.steUser,this.objUser.cout,this.objUser.codeParenage, this.objUser.codeParan )
                   

   }
   updateUser(idUser,login,password,nameUser,surnameUser,emailUser,mobileUser,adress,mfUser,steUser,cout,codeParenage, codeParan){
    let Userdata = {
        login:login,
        password:password,
        nameUser: nameUser,
        surnameUser:surnameUser,
        emailUser:emailUser,
        mobileUser:mobileUser,
        adressUser:adress,
        updateday:new Date,
        updateby:idUser,
        mfUser: mfUser,
        steUser: steUser,
        cout:cout,
        codeParenage:codeParenage,
        codeParan:codeParan
      }
      console.log("data",Userdata)
      this.userService.updateUser(Userdata,idUser).subscribe(data => {
        const result = data['_body'];
        localStorage.setItem('currentUser', result);
        localStorage.setItem('loginLS',this.objUser.login );
        localStorage.setItem('pwdLS',this.objUser.password );
        window.location.reload();
       }, error => {
        console.log(error); // Error getting the data
      });
   }


}
