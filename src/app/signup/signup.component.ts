import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    
    jsonObj: any;
    code: number;
    selectedRbValue: string;
    form;
    MF : any;
    nomSte :any;
    codeParrain : any;
    adress : any ;
    url = 'http://147.135.136.78:8052/user/';
    urlN = 'http://147.135.136.78:8052/notification/';
    constructor(private translate: TranslateService, 
                private fb: FormBuilder,
                private snackBar: MatSnackBar,
                public http: Http,
                public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.form = fb.group({
            email: ['', [Validators.required, Validators.minLength(3),Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            nom: ['', [Validators.required, Validators.minLength(3)]],
            prenom: ['', [Validators.required, Validators.minLength(3)]],
            tel: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]]
          });
    }

    ngOnInit() {}

    addValidForm() {
        if (this.form.valid) {
             if (this.selectedRbValue === 'user') {
                console.log('authloginUser');
               // this.authloginUser();
            } else {
                //alert('Veuillez préciser votre profil.');
                this.snackBar.open('Veuillez selectionner le profil user.', 'Fermer', {
                    duration: 5000,
                });
            }
        }
    }


    testajout(){
        
        let userData = {
            nameUser : this.form.value.nom,
            surnameUser : this.form.value.prenom,
            login : this.form.value.login,
            password : this.form.value.password,
            emailUser : this.form.value.email,
            mobileUser : this.form.value.tel,
            adressUser : this.adress,
            mfUser : this.MF,
            steUser : this.nomSte,
            codeParan : this.codeParrain,
            accountActive: false,
            createdday : new Date()

        }

        if (this.form.valid) { 
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json' );
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this.url + 'add', userData, options).subscribe(data => {
                const result = data['_body'];
                const jo = JSON.parse(result);
                const obj = Array.of(jo.data);
                this.jsonObj = obj[0];
                console.log("datafromsrever: ", this.jsonObj[this.jsonObj.length-1].mobileUser )
                localStorage.setItem('idUser',this.jsonObj[this.jsonObj.length-1].idUser);
               }, error => {
                console.log(error); // Error getting the data
               },
               () => {
                this.code = Math.floor((Math.random()*100000)+1)
                if (this.code < 10000) {
                  this.code = this.code + 10000;
                }
                localStorage.setItem('code',""+this.code);
                this.router.navigate(['verif']);  
                  let notifData = {
                      typeNotification:"ValidNum",
                      msgNotification:this.code+"#"+this.jsonObj[this.jsonObj.length-1].mobileUser,
                      idUser : this.jsonObj[this.jsonObj.length-1].idUser,
                      createdby : this.jsonObj[this.jsonObj.length-1].idUser,
                      updateby : this.jsonObj[this.jsonObj.length-1].idUser,
                      createdday : new Date(),
                      status : false
                  }
      
                  console.log("notification: ",notifData.msgNotification)
                  this.addnotif(notifData, options);
              });
              
              
              
        }else{
            this.snackBar.open('Veuillez remplir tous les champs.', 'Fermer', {
                duration: 5000,
            });
            return;
        }
    }


    addnotif(notifData,options){
        return this.http.post(this.urlN + 'add', notifData, options).subscribe(data => {
            const result = data['_body'];
            console.log("notif created success")
        }, error => {
            console.log(error); // Error getting the data
        });
    }

}
