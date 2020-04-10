import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
  constructor(public http: Http,public httpc:HttpClient) { }
  url = 'http://147.135.136.78:8052/trip';
  urlD = 'http://147.135.136.78:8052/driver';

  getTripsEncours(id) {
    return this.httpc.get(`${this.url}/encours?id=`+id);
  }

  getTripsLivree(id) {
    return this.httpc.get(`${this.url}/livree?id=`+id);
  }

  getTripsAnnulee(id) {
    return this.httpc.get(`${this.url}/annulee?id=`+id);
  }

  getDriverActive() {
    return this.httpc.get(`${this.urlD}/activelast`);
  }
  getTripRetournee(id) {
    return this.httpc.get(`${this.url}/Retournee?id=`+id);
  }
  getTripRetour(id) {
    return this.httpc.get(`${this.url}/enretour?id=`+id);
  }
  getTripChezlivreur(id) {
    return this.httpc.get(`${this.url}/chezlivreur?id=`+id);
  }
  getTripEncoursdeLivraison(id) {
    return this.httpc.get(`${this.url}/encourslivraison?id=`+id);
  }
  getTripEnchemin(id) {
    return this.httpc.get(`${this.url}/enchemin?id=`+id);
  }
  getTripChercheLivreur(id) {
    return this.httpc.get(`${this.url}/cherchelivreur?id=`+id);
  }


}