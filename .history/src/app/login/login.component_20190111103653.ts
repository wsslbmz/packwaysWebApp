import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormControl, Validators , FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    userForm: FormGroup;
    login: any;
    password: any;
    selectedRbValue: any;
    form;

    constructor(
        private fb: FormBuilder,
        private translate: TranslateService,
        public router: Router,
        private loginservice: LoginService,
        private modalService: NgbModal,
        public http: Http,
        public sanitizer: DomSanitizer
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
            this.form = fb.group({
                email: ['', [Validators.required, Validators.minLength(3)]],
                password: ['', Validators.required]
              });
    }

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    authlogin() {
        console.log('selectedRbValue: ', this.selectedRbValue);
        if (this.form.valid) {
        if (this.selectedRbValue === 'admin') {
            console.log('authloginAdmin');
            this.authloginAdmin();
        } else {
            console.log('authloginUser');
            this.authloginUser();
        }
    }
    }

    authloginUser() {
            this.loginservice.loginUser(this.form.value.email, this.form.value.password).map(res => res.json()).subscribe((res) => {
                console.log('testttttt', res);
                console.log(this.form.value.email, this.form.value.password);

                if (res.success) {
                    console.log('testttttt', res);
                   this.loginservice.loginUser(this.form.value.email, this.form.value.password).toPromise().then((response) => {
                     this.loginservice.userData = response.json();
                     console.log('API Response : ', response.json());
                     console.log('userData: ', this.loginservice.userData.data[0].nameUser);
                     localStorage.setItem('currentUser', JSON.stringify(response.json()));
                   });

                   localStorage.setItem('loginLS', this.form.value.email);
                   localStorage.setItem('pwdLS', this.form.value.password);
                   localStorage.setItem('isLoggedin', 'true');
                   localStorage.setItem('auth', 'user');
                   this.router.navigate(['dashboard']);
                } else if (res.data === 'Account is not Active') {
                    console.log('Account is not Active');
                } else {
                    console.log('Le login ou le mot de passe est incorect');
                }
        }, (err) => {
            console.log('Problème de connexion internet');
        });
    }

    authloginAdmin() {
        this.loginservice.loginAdmin(this.form.value.email, this.form.value.password).map(res => res.json()).subscribe((res) => {
            console.log('testttttt', res);
            console.log(this.form.value.email, this.form.value.password);

            if (res.success) {
                 console.log('testttttt', res);
                 this.loginservice.loginAdmin(this.form.value.email, this.form.value.password).toPromise().then((response) => {
                 this.loginservice.userData = response.json();
                 console.log('API Response : ', response.json());
                 console.log('userData: ', this.loginservice.userData.data[0].nameUser);
                 localStorage.setItem('currentUser', JSON.stringify(response.json()));
               });

               localStorage.setItem('loginLS', this.form.value.email);
               localStorage.setItem('pwdLS', this.form.value.password);
               localStorage.setItem('isLoggedin', 'true');
               localStorage.setItem('auth', 'admin');
            } else if (res.data === 'Account is not Active') {
                console.log('Account is not Active');
            } else {
                console.log('Le login ou le mot de passe est incorect');
            }
    }, (err) => {
        console.log('Problème de connexion internet');
    });
    }
}
