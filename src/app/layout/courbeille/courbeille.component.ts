import { CourbeilleService } from './courbeille.serveice';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from '../trips/Trip';
import {  MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-courbeille',
  templateUrl: './courbeille.component.html',
  styleUrls: ['./courbeille.component.scss'],
  animations: [routerTransition()]
})
export class CourbeilleComponent implements OnInit {

    tripBl: any;
    objTrip = new Trip();
    closeResult: string;
    obj: any;
    items: any = [];
  jsonObj: any;
  result: any;
  constructor(private tservice : CourbeilleService , public sanitizer: DomSanitizer, 
    private snackBar: MatSnackBar, private modalService: NgbModal) { }

  ngOnInit() {
    this.getTripsDeleted();
  }


  getTripsDeleted() {
      this.items= [];
    this.tservice.getTrips().subscribe(data => {
     this.result = data['_body'];
     //console.log(data['_body'])
     const jo = JSON.parse(this.result);
     const obj = Array.of(jo.data);
     this.jsonObj = obj[0];
     for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
    }
      console.log('listdriver!::',this.jsonObj);
   }, error => {
     // console.log(error);
   });
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


infoTrip(content, trip) {
    this.obj = trip;
    this.objTrip.refTrip = this.obj.refTrip;
    this.objTrip.sourceTrip = this.obj.sourceTrip;
    this.objTrip.destTrip = this.obj.destTrip;
    this.objTrip.statusTrip = this.obj.statusTrip;
    this.objTrip.prevStatusTrip = this.obj.prevStatusTrip;
    this.objTrip.costTrip = this.obj.costTrip;
    this.objTrip.timingTrip = this.obj.timingTrip;
    this.objTrip.createdday = this.obj.createdday;
    this.objTrip.getedday = this.obj.getedday;
    this.objTrip.affectedday = this.obj.affectedday;
    this.objTrip.startdelday = this.obj.startdelday;
    this.objTrip.livredday = this.obj.livredday;
    this.objTrip.returnedday = this.obj.returnedday;
    this.objTrip.prereturnedday = this.obj.prereturnedday;
    this.objTrip.modeTrip = this.obj.modeTrip;
    this.objTrip.codeTrip = this.obj.codeTrip;
    this.objTrip.codeExp = this.obj.codeExp;
    this.objTrip.listdriverTrip = this.obj.listdriverTrip;
    this.objTrip.packageTrip = this.obj.packageTrip;
    this.objTrip.userTrip = this.obj.userTrip;
    this.objTrip.descriptionTrip = this.obj.descriptionTrip;
    this.objTrip.msgTrip = this.obj.msgTrip;
    this.objTrip.lastupdateby= this.obj.lastupdateby;
    this.objTrip.lastupdateday = this.obj.lastupdateday;
    this.objTrip.historique = this.obj.historique;
    if (this.obj.driverTrip != null) {
        this.objTrip.driverTrip = this.obj.driverTrip;
    }
    let photo = this.obj.packageTrip.imgPackage;
    if(photo != null) {
        const i = photo.indexOf(',');
        photo = photo.slice(i + 1, photo.length);
        const photoRes = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + photo);
        this.objTrip.image = photoRes;
    } else {
        this.objTrip.image = null;
    }

    //console.log('this.objTrip.msgTrip: ', this.objTrip.msgTrip.length);

    this.open(content);
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
openBlModal2(content, trip) {        
    this.tripBl = trip;
    this.open(content);
}


deleteTrip(trip) {
    if (localStorage.getItem('auth') === 'admin') {
        this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
        $('#trip-row-' + trip.idTrip).hide('slow', function() {
                $(this).remove();
        });
    } else if ( ( trip.statusTrip !== 'Chez Livreur' || trip.statusTrip !== 'livraison en cours'
    || ( (trip.statusTrip !== 'Livree') && (!(trip.isClosed)) ) ) ) {
        this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
        $('#trip-row-' + trip.idTrip).hide('slow', function() {
                $(this).remove();
        });

    } else {
        this.snackBar.open('Impossible de supprimer le colis.', 'Fermer', {
            duration: 12000,
        });
    }
}




}
