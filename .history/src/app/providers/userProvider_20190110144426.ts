import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProvider {
    public userData: any;

  constructor(public http: Http) {
      setTimeout(() => {
          console.log(this.userData);
      }, 10000);
   }
  url = 'http://147.135.136.78:8052/user/';

  loginUser(login, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('cache-control', 'no-cache');
    return this.http.post(this.url + 'signin?login=' + login + '&password=' + password, {headers: headers});
  }

}
