import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdresseService {
  items: any[];
  jsonObj: any;
  auth: string;
  id: any;
  result: any;
  currentUser: any;
  constructor(public http: Http) { }
  url = 'http://147.135.136.78:8052/adress';


  
  getAdressByUser(id){
    return this.http.get(`${this.url}/byuser?id=`+id);
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

  getAdresses(){
    this.jsonObj = null;
    this.items = [];
    this.auth=localStorage.getItem('auth');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.auth==="admin"){
        this.id="Admin";
    }else{
        this.id = this.currentUser.data[0].idUser;
    }
    this.getAdressByUser(this.id).subscribe(data => {
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


}
