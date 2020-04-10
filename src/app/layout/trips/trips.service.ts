import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Trip } from './Trip';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class TripService {
  constructor(public http: Http, private httpc: HttpClient ,private snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }
  // url = 'http://147.135.136.78:8052/trip/alls';
  url = 'http://147.135.136.78:8052/trip';
  urlAdd = 'http://147.135.136.78:8052/trip/add';
  // urltrip = 'http://147.135.136.78:8052/trip/bydate20?date=01/05/2019 2:47:21';
  urlUp = 'http://147.135.136.78:8052/trip/update/';

  urlD = 'http://147.135.136.78:8052/driver';
  urlU = 'http://147.135.136.78:8052/user';


  /* getTrips() {
    return this.httpc.get<Trip[]>(this.url);
  } */

  getFiltredTrips(id, date, size, key, btn): Observable<any> {
    //http://147.135.136.78:8052/trip/bykey?id=admin&date=&size=&key=Liv&BTN=
    return this.http.get(`${this.url}/bykey?id=` + id + `&date=` + date + `&size=` + size + `&key=` + key + `&BTN=` + btn);
  }

  getFiltredTrips1(id, size, d1, d2, key, key1, key2, key3, key4, key5, btn): Observable<any> {
    //http://147.135.136.78:8052/trip/bykey?id=admin&date=&size=&key=Liv&BTN=
    return this.http.get(`${this.url}/bykey1?id=` + id + `&size=` + size + `&DD=` + d1 + `&DF=` + d2 + `&key=` + key + `&key1=` + key1 + `&key2=` + key2 + `&key3=` + key3 + `&key4=` + key4  + `&key5=` + key5 + `&BTN=` + btn);
  }

  getTrips(id, size): Observable<any> {
    return this.http.get(`${this.url}/sansdate2?id=` + id + `&size=` + size);
  }

  getNoDeletedTripsFromServer(): Observable<any> {
    return this.http.get(`${this.url}/notdeleted`);
  }

  getTripsFromServerOnNext(id, nextDate): Observable<any> {
    return this.http.get(`${this.url}/bydate20?id=` + id + `&date=` + nextDate);
  }

  getTripsFromServerOnPrevious(id, previousDate): Observable<any> {
    return this.http.get(`${this.url}/bydate20prec?id=` + id + `&date=` + previousDate);
  }

  // Changement de web service ===> Ajout de flag deletedByUser
  getTripsFromServerOnInit(id): Observable<any> {
    return this.http.get(`${this.url}/sansdate?id=` + id);
    // return this.http.get(`${this.urls}/all`);
  }

  AskOfBonLiv(id, auth): Observable<any> {
    return this.http.get(`${this.url}/generatepdf?id=` + id + `&auth=` + auth);
  }

  getTripscanList(id){
    return this.http.get(`${this.url}/one/` + id );
  }

  updateTrip(tripdata, id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/update/' + id, tripdata, options);
  }

  getDrivers() {
    return this.http.get(`${this.urlD}/alls`);
  }

  getUsers() {
    return this.http.get(`${this.urlU}/actives`);
  }

  deleteTrip(idtrip, status) {
    const auth = localStorage.getItem('auth');
    console.log('suscéés', auth);

    const date = new Date();
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    let tripdata: any;
    if (auth === 'admin') {
      tripdata = {
        deleted: true
      };
    } else {
        tripdata = {
          deletedbyUser: true,
          datecanceledUser: date
        };
    }
    this.http.put(this.urlUp + idtrip, tripdata, options).subscribe(data => {
    }, error => {
    });

}

addTrip (nameUser, emailUser, rateUser, idUser, nbrateUser, nbrdeliveryUser, mobileUser,
   surnameUser, latsrc, lngsrc, contactAdrsrc, mobileAdrsrc, contactAdrdes,
   mobileAdrdes,mobileAdrdes2, updateday, createdby, updateby, createdday, latdes, lngdes,
    timingTrip, costTrip, typePackage, valPackage, weightPackage, sizePackage, modeTrip,
    refTrip, statusTrip, cityAdrS, cityAdrD, imgPack, descPack, selectedDriver, labelAdrS, labelAdrD) {

  let codeTrip =  Math.floor((Math.random() * 100000) + 1);
  if (codeTrip < 10000) {
    codeTrip = codeTrip + 10000;
  }
  // console.log(codeTrip)
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });

    const deliverydata = {
        codeTrip : codeTrip,
        userTrip: {
          nameUser: nameUser,
          emailUser: emailUser,
          rateUser: rateUser,
          idUser: idUser,
          nbrateUser: nbrateUser,
          nbrdeliveryUser: nbrdeliveryUser,
          mobileUser: mobileUser,
          surnameUser: surnameUser
        },
        sourceTrip: {
          geolocAdr: {
          lat: latsrc,
          lng: lngsrc
          },
          contactAdr: contactAdrsrc,
          mobileAdr: mobileAdrsrc,
          cityAdr: cityAdrS,
          labelAdr: labelAdrS,
        },
        destTrip: {
          geolocAdr: {
          lat: latdes,
          lng: lngdes,
          },
          contactAdr: contactAdrdes,
          mobileAdr: mobileAdrdes,
          cityAdr: cityAdrD,
          labelAdr: labelAdrD,
          mobileAdr2:mobileAdrdes2
        },
        timingTrip: timingTrip,
        updateday: updateday,
        packageTrip: {
          typePackage: typePackage,
          valPackage: valPackage,
          weightPackage: weightPackage,
          sizePackage: sizePackage,
          imgPackage: imgPack},
        createdby: createdby,
        updateby: updateby,
        createdday: createdday,
        refTrip: refTrip,
        costTrip: costTrip,
        statusTrip: statusTrip,
        deletedbyUser: false,
        deletedbyDriver: false,
        noticeTrip: [],
        modeTrip : modeTrip,
        descriptionTrip : descPack,
        msgTrip : [],
        selectedDriverTrip: selectedDriver
      };

    this.spinner.show();
     this.http.post(this.urlAdd, deliverydata , options).subscribe(data => { 
       console.log('Ok',data['_body']);
       this.spinner.hide();
        window.location.reload();
        this.snackBar.open('votre colis a été ajouté avec succés', 'Fermer', {
          duration: 12000,
          });
       
       
        
     }, error => {
      this.snackBar.open('Erreur de postulation', 'Fermer', {
        duration: 12000,
        });
     });
}

addTripFromExcel (nameUser, emailUser, rateUser, idUser, nbrateUser, nbrdeliveryUser, mobileUser,
  surnameUser, latsrc, lngsrc, contactAdrsrc, mobileAdrsrc, contactAdrdes,
  mobileAdrdes,mobileAdrdes2, updateday, createdby, updateby, createdday, latdes, lngdes,
   timingTrip, costTrip, typePackage, valPackage, weightPackage, sizePackage, modeTrip,
   refTrip, statusTrip, cityAdrS, cityAdrD, imgPack, descPack, selectedDriver, labelAdrS, labelAdrD) {

 let codeTrip =  Math.floor((Math.random() * 100000) + 1);
 if (codeTrip < 10000) {
   codeTrip = codeTrip + 10000;
 }
 // console.log(codeTrip)
   const headers = new Headers();
   headers.append('Accept', 'application/json');
   headers.append('Content-Type', 'application/json' );
   const options = new RequestOptions({ headers: headers });

   const deliverydata = {
       codeTrip : codeTrip,
       userTrip: {
         nameUser: nameUser,
         emailUser: emailUser,
         rateUser: rateUser,
         idUser: idUser,
         nbrateUser: nbrateUser,
         nbrdeliveryUser: nbrdeliveryUser,
         mobileUser: mobileUser,
         surnameUser: surnameUser
       },
       sourceTrip: {
         geolocAdr: {
         lat: latsrc,
         lng: lngsrc
         },
         contactAdr: contactAdrsrc,
         mobileAdr: mobileAdrsrc,
         cityAdr: cityAdrS,
         labelAdr: labelAdrS,
       },
       destTrip: {
         geolocAdr: {
         lat: latdes,
         lng: lngdes,
         },
         contactAdr: contactAdrdes,
         mobileAdr: mobileAdrdes,
         cityAdr: cityAdrD,
         labelAdr: labelAdrD,
         mobileAdr2:mobileAdrdes2
       },
       timingTrip: timingTrip,
       updateday: updateday,
       packageTrip: {
         typePackage: typePackage,
         valPackage: valPackage,
         weightPackage: weightPackage,
         sizePackage: sizePackage,
         imgPackage: imgPack},
       createdby: createdby,
       updateby: updateby,
       createdday: createdday,
       refTrip: refTrip,
       costTrip: costTrip,
       statusTrip: statusTrip,
       deletedbyUser: false,
       deletedbyDriver: false,
       noticeTrip: [],
       modeTrip : modeTrip,
       descriptionTrip : descPack,
       msgTrip : [],
       selectedDriverTrip: selectedDriver
     };

   this.spinner.show();
    this.http.post(this.urlAdd, deliverydata , options).subscribe(data => { 
      console.log('Ok',data['_body']);
      this.spinner.hide();
     // window.location.reload();
       this.snackBar.open('votre colis a été ajouté avec succés', 'Fermer', {
         duration: 12000,
         });
      
      
       
    }, error => {
     this.snackBar.open('Erreur de postulation', 'Fermer', {
       duration: 12000,
       });
    });
}


}
