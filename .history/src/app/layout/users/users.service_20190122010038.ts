import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  public url = 'http://147.135.136.78:8052/user/';
  public urlTrip = 'http://147.135.136.78:8052/trip/';
  result: any;
  jsonObj: any;
  items: any;
  tripsByUserAndDate: any;
  constructor(public http: Http) { }


  getUsersFromServe() {
    return this.http.get(`${this.url}/all`);
  }


  deleteUser(idUser) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });

    const userdata = {
      deleted : true
    };
    this.http.put(this.url + 'update/' + idUser, userdata, options).subscribe(data => {
      console.log('Adresse deleted');
    }, error => {
    });

  }

  BlockUser(idUser,userdata) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    this.http.put(this.url + 'update/' + idUser, userdata, options).subscribe(data => {
      console.log('User Blocked',data['_body']);
    }, error => {
    });

  }


  getTripsByUserAndDate(idUser, sDate, eDate) {
    return this.http.get(`${this.urlTrip}bydate/` + idUser + `?d1=`  + sDate + `&d2=` + eDate);
  }

}
