import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProfileService{
    public url = 'http://147.135.136.78:8052/user/';
    constructor(public http: Http, public httpc: HttpClient) { } 

    updateUser(userdata, id) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.url + 'updateuser/' + id, userdata, options);
        console.log("updated suscess")
      }

}