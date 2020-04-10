import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PickUpService {

    constructor(public http: Http, public httpc: HttpClient) { } 

    public url = 'http://147.135.136.78:8052/trip/';
    result: any;
    jsonObj: any;
    items: any;

    getNbTripsByUserAndDate(sDate, eDate){
        return this.http.get(`${this.url}bydateanduser/` + `?d1=`  + sDate + `&d2=` + eDate);
    }

    getAllTrips(){
        return this.http.get(`${this.url}all`);
    }

    generatePackwaysReport(date){
        return this.http.get(`${this.url}statbyday/` + `?date=`  + date);
    }

    getCaisseService(){
        return this.httpc.get(`${this.url}caisse`);

    }

}