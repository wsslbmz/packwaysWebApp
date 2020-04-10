import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdresseService {
  constructor(public http: Http) { }
  url = 'http://147.135.136.78:8052/adress';

  getAdresses(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

}
