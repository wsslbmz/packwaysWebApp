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


  getUsersFromServe(key1,key2) {
    return this.http.get(`${this.url}/bykey?keyExp=`+key1+'&keyDes='+key2);
  }


  deleteUser(idUser,userdata) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    this.http.put(this.url + 'update/' + idUser, userdata, options).subscribe(data => {
      console.log('User deleted');
    }, error => {
    });

  }

  BlockUser(idUser,userdata) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    this.http.put(this.url + 'update/' + idUser, userdata, options).subscribe(data => {
      console.log('User Blocked');
    }, error => {
    });

  }

  gettripLivree(id){
    
    this.http.get(this.urlTrip+"byuser?id="+id+"&statustrip=Livree").subscribe(data => {
      this.result = data['_body']
     // console.log(data['_body'])
      let jo = JSON.parse(this.result);
      let obj = Array.of(jo.data);      
    })
  }

  getTripsByUserAndDate(idUser, sDate, eDate) {
    return this.http.get(`${this.urlTrip}bydate/` + idUser + `?d1=`  + sDate + `&d2=` + eDate);
  }

  updateUser(userdata, id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/update/' + id, userdata, options);
    console.log("updated suscess")
  }

}
