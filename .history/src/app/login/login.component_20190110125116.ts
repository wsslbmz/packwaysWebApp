import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormControl, Validators , FormGroup } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

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
    public userData: any;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private tservice: LoginService,
        private modalService: NgbModal,
        public http: Http,
        public sanitizer: DomSanitizer
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    authlogin() {
            this.tservice.loginUser(this.login, this.password).map(res => res.json()).subscribe((res) => {
                console.log('testttttt', res);
                console.log(this.login, this.password);

                if (res.success) {
                    console.log('testttttt', res);
                   this.tservice.loginUser(this.login, this.password).toPromise().then((response) => {
                     this.userData = response.json();
                     console.log('API Response : ', response.json());
                   });
                   localStorage.setItem('loginLS', this.login);
                   localStorage.setItem('pwdLS', this.password);
                   // this.navCtrl.setRoot(HomePage);
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
