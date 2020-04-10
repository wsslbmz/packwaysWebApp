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

  getTripsByUserAndDate2(idUser, sDate, eDate) {
    this.tripsByUserAndDate = [];
    this.http.get(`${this.urlTrip}bydate/` + idUser + `?d1=`  + sDate + `&d2=` + eDate).subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            let jTemp = this.jsonObj[index];
            let tab: any = [];
            tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.changeDateFormatDMY(jTemp.affectedday),
             this.changeDateFormatDMY(jTemp.livredday), jTemp.packageTrip.valPackage);
            this.tripsByUserAndDate.push(tab);
        }
    });
    console.log('this.tripsByUserAndDate ', this.tripsByUserAndDate);
    return this.tripsByUserAndDate;
  }


  getTripsByUserAndDate(idUser, sDate, eDate) {
    return this.http.get(`${this.urlTrip}bydate/` + idUser + `?d1=`  + sDate + `&d2=` + eDate);
  }

  changeDateFormatDMY(dd){
    var d = new Date(dd);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();    
    let dformat = [day, month, year].join('/');

    return dformat;
 }


}
