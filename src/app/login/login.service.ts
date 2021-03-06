import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    public userData: any;

  constructor(public http: Http) { }
  url = 'http://147.135.136.78:8052/user/';
  urlA = 'http://147.135.136.78:8052/admin/';

  loginUser(login, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('cache-control', 'no-cache');
    return this.http.post(this.url + 'signin?login=' + login + '&password=' + password, {headers: headers});
  }
  loginAdmin(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('cache-control', 'no-cache');
    return this.http.post(this.urlA + 'signin?email=' + email + '&password=' + password, {headers: headers});
  }

}