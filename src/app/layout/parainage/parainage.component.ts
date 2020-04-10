import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-parainage',
  templateUrl: './parainage.component.html',
  styleUrls: ['./parainage.component.scss'],
  animations: [routerTransition()]
})
export class ParainageComponent implements OnInit {

  url = 'http://147.135.136.78:8052/trip/parainage';
  items: any[];
  jsonObj: any[];
  id: any;
  currentUser: any;
  constructor(private http : Http) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = this.currentUser.data[0].idUser;
    console.log(this.id)
    this.getClientParainee(this.id);
  }

  getClientParainee(id){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.url+'?id='+id).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.jsonObj = obj[0];
      console.log('data: ',this.jsonObj);
     for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
      console.log('data: ',this.items);
    })
  }

}
