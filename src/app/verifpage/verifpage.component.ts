import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../router.animations';
import { RequestOptions, Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifpage',
  templateUrl: './verifpage.component.html',
  styleUrls: ['./verifpage.component.scss'],
  animations: [routerTransition()]
})
export class VerifpageComponent implements OnInit {

  public url = 'http://147.135.136.78:8052/user/';
  codeVerif : any;
  constructor(private http : Http, private snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
  }


  testvalid(){
    let id = localStorage.getItem('idUser');
    let code = localStorage.getItem('code');
    
    if(this.codeVerif === code){
      const userdata = {
        accountActive : true
      };
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json' );
      const options = new RequestOptions({ headers: headers });
      this.http.put(this.url + 'update/' + id, userdata, options).subscribe(data => {
        console.log('User Blocked');
      }, error => {
      });
      this.router.navigate(['login']);
  }else{
    this.snackBar.open('Le code de validation est incorrect', 'Fermer', {
      duration: 5000,
  });
  }

  }

}
