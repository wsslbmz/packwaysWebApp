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

  getUsers() {
    this.items = [];
    this.getUsersFromServe().subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            this.items.push(this.jsonObj[index]);
        }
    });
    return this.items;
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


}
