import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AddressService {
  //items: any[];
  //jsonObj: any;
  auth: string;
  id: any;
  //result: any;
  currentUser: any;
  constructor(public http: Http) { }
  url = 'http://147.135.136.78:8052/adress';



  getAdressByUser(id): Observable<any> {
    return this.http.get(`${this.url}/byuser?id=` + id);
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

  getAdresses() {
    let jsonObjAdr: any = null;
    const itemsAdr: any = [];
    let result: any;
    this.auth = localStorage.getItem('auth');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.auth === 'admin') {
        this.id = 'Admin';
    } else {
        this.id = this.currentUser.data[0].idUser;
    }
    this.getAdressByUser(this.id).subscribe(data => {
        result = data['_body'];

        const jo = JSON.parse(result);
        const obj = Array.of(jo.data);
        jsonObjAdr = obj[0];
        for (let index = 0; index < jsonObjAdr.length; index++) {
          itemsAdr.push(jsonObjAdr[index]);
        }
    });
    return itemsAdr;
}

    deleteAdr(idAdr) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });

        const adrdata = {
            deletedbyUser : true
        };
        this.http.put(this.url + '/update/' + idAdr, adrdata, options).subscribe(data => {
            console.log('Adresse deleted');
            }, error => {
        });

    }

    search_word(term){
        return this.http.get(this.url + term).map(res => {
        	return res.json().map(item => {
        		return item.word
        	})
        })
    }


}
