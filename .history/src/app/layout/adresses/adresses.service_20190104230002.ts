import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TripService {
  constructor(public http: Http) { }
  url = 'http://localhost:4000';
  urls = 'http://147.135.136.78:8052/trip';

  getTrips() {
    return this.http.get(`${this.url}/trips`);
  }

  getTripsFromServer(): Observable<any> {
    return this.http.get(`${this.urls}/notdeleted`);
  }

}
