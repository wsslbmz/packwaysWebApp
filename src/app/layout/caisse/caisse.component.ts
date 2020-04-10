import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss'],
  animations: [routerTransition()]
})
export class CaisseComponent implements OnInit {

  items1: any = [];
  Obj: any;
  closeResult: string;
  searchTerm: any;
  somme: number;
  sommeCout: any;
  sommeVal: any;
  itemsSearch: any;
  items: any =[];
  jsonObj: any;
  constructor(private http : Http, private modalService: NgbModal) { }
  url = 'http://147.135.136.78:8052/trip/bykey1?id=admin&size=5000&DD=&DF=&key=&key1=&key2=&key3=&key4=Récolté&key5=&BTN=';
  url2 ='http://147.135.136.78:8052/trip/recolterparclient';
  ngOnInit() {
   this.GetCaisse();
   this.getTripsRecolterParClient();
  }


  GetCaisse(){
    this.items=[];
    this.sommeVal=0
    this.sommeCout = 0;
    this.somme = 0;
    return this.http.get(this.url).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.jsonObj = obj[0];
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
        if(this.jsonObj[index].statusTrip === 'Livree'){
          this.sommeVal += this.jsonObj[index].packageTrip.valPackage;
          this.sommeCout  += this.jsonObj[index].costTrip;
        }else{
          if(this.jsonObj[index].isBilled === true){
            this.sommeCout  += this.jsonObj[index].costTrip;
          }
        }
    }
    this.somme = this.sommeVal - this.sommeCout;
    this.itemsSearch = this.items;
    console.log("test",this.items);
    console.log('cout : ',this.sommeCout);
    console.log('Valeur : ',this.somme);
    console.log('somme : ',this.sommeVal);
    })
  }

  changeDateFormat(dd) {
    const d = new Date(dd);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();
    // var sec = d.getSeconds();
    const dformat = [day, month, year].join('/') + ' ' + [hour, min].join(':');

    return dformat;
}

showFinancialStatus(trip) {
  let financialStatus = '';
  if (trip.paymentStatus) {
      if (trip.paymentStatus === 'Payee') {
          financialStatus = 'Payé';
      } else if (trip.paymentStatus === 'En cours de payement') {
          financialStatus = 'En cours de paiement';
      }else if(trip.paymentStatus === 'En cours de retour'){
          financialStatus = 'En cours de retour';
      }else if (trip.paymentStatus === 'Retournee'){
          financialStatus = 'Retournee';
      }

  } else if (trip.argentRecolte) {
      financialStatus = 'Récolté';
  }
  return financialStatus;
}


filterItems(searchTerm) {

  return this.items.filter((item) => {
      let ref: any; let nomuser: any; let nomdriver: any; let status: any; let recolteDate :any;

      if (item != null && item.refTrip != null) {
          ref = item.refTrip.toString();
      } else {
          ref = ' ';
      }
      if (item != null && item.userTrip.nameUser != null) {
        nomuser = item.userTrip.nameUser.toString();
      } else {
        nomuser = ' ';
      }/*
      if (item != null && item.driverTrip.nameDriver != null) {
        nomdriver = item.driverTrip.nameDriver.toString();
      } else {
        nomdriver = ' ';
      }*/
      if (item != null && item.statusTrip != null) {
        status = item.statusTrip.toString();
      } else {
        status = ' ';
      }
    if (item != null && item.recoltdate != null) {
        recolteDate = this.changeDateFormat(item.recoltdate).toString();
    } else {
        recolteDate = ' ';
    }

    //console.log("recoooot",this.changeDateFormat(item.recoltdate))

      return ref.indexOf(searchTerm) > -1
              || nomuser.indexOf(searchTerm) > -1
              ||recolteDate.indexOf(searchTerm) > -1
              || status.indexOf(searchTerm) > -1
              ;

  });

}

setFilteredItems() {
    console.log('okiii');

  this.items = [];
  if (this.items !== undefined) {
    this.items = this.itemsSearch;
    this.items = this.filterItems(this.searchTerm);
  }

}

getTripsRecolterParClient(){
  return this.http.get(this.url2).subscribe(data => {
    const result = data['_body'];
    const jo = JSON.parse(result);
    const obj = Array.of(jo.data);
    this.Obj = obj[0];
    for (let index = 0; index < this.Obj.length; index++) {
      this.items1.push(this.Obj[index]);
    }
  })
}

open(content) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

}
