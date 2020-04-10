import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adresse } from './Adresse';


@Injectable()
export class AdresseService {
  constructor(public http: HttpClient) { }
  url = 'http://147.135.136.78:8052/adress';
  baseUrl: string = 'http://147.135.136.78:8052/adress/all';

  getAdressesTest() {
    return this.http.get<Adresse[]>(this.baseUrl);
  }

  getAdresses(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  addadress (latpos, lngpos, createdby, updateby, labelAdr, contactAdr, mobileAdr, typeAdr, sharedtoAdr, userAdr, cityAdr, imgAdr) {
    const date = new Date();
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });

    const adressdata = {
      geolocAdr: {
      lat: latpos,
      lng: lngpos
      },
      updateday: date,
      createdby: createdby,
      updateby: updateby,
      createdday: date,
      contactAdr: contactAdr,
      labelAdr: labelAdr,
      mobileAdr: mobileAdr,
      typeAdr: typeAdr,
      sharedtoAdr: sharedtoAdr,
      userAdr: userAdr,
      cityAdr: cityAdr,
      imgAdr: imgAdr,
      deletedbyUser: false
        };

		 this.http.post(this.url + '/add', adressdata , options).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error); // Error getting the data
    });

  }


}
