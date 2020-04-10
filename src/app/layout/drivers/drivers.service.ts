import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DriversService {

    constructor(public http: Http) { }
    public url = 'http://147.135.136.78:8052/driver/';
    public urlTrip = 'http://147.135.136.78:8052/trip/';
    result: any;
    jsonObj: any;
    items: any;

    getDriversFromServe() {
        return this.http.get(`${this.url}/alls`);
      }

      getTripsByDriverAndDate(idDriver, sDate, eDate){
        return this.http.get(`${this.urlTrip}bydatedriver?id=` + idDriver + `&d1=`  + sDate + `&d2=` + eDate);
      }

      deleteDriver(idDriver,driverData) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        this.http.put(this.url + 'update/' + idDriver, driverData, options).subscribe(data => {
          console.log('Driver deleted');
        }, error => {
        });    
      }

      updateDriver(driverData, id) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.url + '/update/' + id, driverData, options);
        console.log("updated suscess")
      }


      BlockDriver(idDriver,driverData) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        this.http.put(this.url + 'update/' + idDriver, driverData, options).subscribe(data => {
          console.log('User Blocked');
        }, error => {
        });
    
      }
    
}