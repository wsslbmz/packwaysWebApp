import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statlivreur',
  templateUrl: './statlivreur.component.html',
  styleUrls: ['./statlivreur.component.scss']
})
export class StatlivreurComponent implements OnInit {

  url = 'http://147.135.136.78:8052/trip/statbydriver';

  jsonObj: any;
  constructor(private http : Http) { }

  ngOnInit() {
    this.getStatLivreur();
  }


  getStatLivreur(){
    return this.http.get(this.url).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.jsonObj = obj[0];
      console.log(this.jsonObj);
    })
  }

}
