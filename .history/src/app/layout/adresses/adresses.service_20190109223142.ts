import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdresseService {
  constructor(public http: Http) { }
  url = 'http://147.135.136.78:8052/adress';

  getAdresses(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  addadress (latpos, lngpos, updateday, createdby, updateby,createdday,labelAdr,contactAdr,mobileAdr,typeAdr,sharedtoAdr,userAdr,cityAdr,imgAdr){

    let date = new Date();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let adressdata = {
      geolocAdr:{
      lat:latpos,
      lng:lngpos  
      },
      updateday:date,
      createdby:createdby,
      updateby:updateby,
      createdday:date,
      contactAdr:contactAdr,
      labelAdr:labelAdr,
      mobileAdr:mobileAdr,
      typeAdr:typeAdr,
      sharedtoAdr:[sharedtoAdr],
      userAdr:userAdr,
      cityAdr:cityAdr,
      imgAdr:imgAdr,
      deletedbyUser: false
        }
	
		 this.http.post(this.url+"add", adressdata ,options).subscribe(data => {
      // console.log(data['_body']);
     }, error => {
      // console.log(error);// Error getting the data
      this.extras.errorAlert()
    });

  }

}
