import { Trip } from './../trips/Trip';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CourbeilleService {

    constructor(public http: Http){}

    url = 'http://147.135.136.78:8052/trip';



    getTrips(): Observable<any> {
        return this.http.get(`${this.url}/deleted`);
      }

      deleteTrip(idtrip, status) {
        const auth = localStorage.getItem('auth');
        console.log('suscéés', auth);
    
        const date = new Date();
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        let tripdata: any;
          tripdata = {
            deleted: false
          };
        
        this.http.put(this.url+'/update/' + idtrip, tripdata, options).subscribe(data => {
        }, error => {
        });
    
    }
}