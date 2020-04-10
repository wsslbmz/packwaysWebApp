import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    sommeLC: number;
    somm: any;
    sommeCH: any;
    items: any =[];
    jsonObj: any;
    ChercheL: Array<any> = [];
    Enchemin: Array<any> = [];
    Encours: Array<any> = [];
    Chezlivreur: Array<any> = [];
    Retour: Array<any> = [];
    Retournee: Array<any> = [];
    driver: Array<any> = [];
    postes: Array<any> = [];
    livree: Array<any> = [];
    annulee: Array<any> = [];
    result: any;
    id:any;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    isVisible: boolean;

    constructor(public dservice: DashboardService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'PACKWAYS',
                text:
                    'The way how to deliver.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'PACKWAYS',
                text: 'Assez Simple, Assez Rapide 24/7.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'PACKWAYS',
                text:
                    'PACKWAYS est une plateforme de livraison permettant d’envoyer des colis 24h/24h et 7J/7 en quelques clic et sans avoir à se déplacer.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );

        if (localStorage.getItem('auth') === 'admin') {
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }

    ngOnInit() {
        if(localStorage.getItem('auth')==='admin'){
            this.id='admin';
        }else{
            this.id='UT'+JSON.parse(localStorage.getItem('currentUser')).data[0].idUser;
        }

        this.getTripPostées();
        this.getTripLivree();
        this.getTripAnnulee();
        this.getDriverAcrives();
        this.getTripRetournee();
        this.getTripChezlivreur();
        this.getTripEncourLivraison();
        this.getTripRetour();
        this.getTripEnchemin();
        this.getTripChercheLivreur();
        this.getTrips()
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }


    getTripPostées(){
       this.dservice.getTripsEncours(this.id).subscribe((data: any ) =>{           
            this.postes = data;            
        });
    }

    getTripLivree(){
        this.dservice.getTripsLivree(this.id).subscribe((data: any) =>{             
             this.livree = data;            
         })
    }

    getTripAnnulee(){
        this.dservice.getTripsAnnulee(this.id).subscribe((data: any)=>{            
             this.annulee = data;            
         })
    }

    getTripRetournee(){
        this.dservice.getTripRetournee(this.id).subscribe((data : any) =>{
            this.Retournee=data;
        console.log("Retournee",this.Retournee);
        })
    }
    getTripRetour(){
        this.dservice.getTripRetour(this.id).subscribe((data : any) =>{
            this.Retour=data;
        console.log("Retour",this.Retour);
        })
    }
    getTripChezlivreur(){
        this.dservice.getTripChezlivreur(this.id).subscribe((data : any) =>{
            this.Chezlivreur=data;
        console.log("Chez livreur",this.Chezlivreur);
        })
    }
    getTripEncourLivraison(){
        this.dservice.getTripEncoursdeLivraison(this.id).subscribe((data : any) =>{
            this.Encours=data;
        console.log("EN cours",this.Encours);
        })
    }
    getTripEnchemin(){
        this.dservice.getTripEnchemin(this.id).subscribe((data : any) =>{
            this.Enchemin=data;
        console.log("En chemein",this.Enchemin);
        })
    }
    getTripChercheLivreur(){
        this.dservice.getTripChercheLivreur(this.id).subscribe((data : any) =>{
            this.ChercheL=data;
        console.log("Cherche Livreur::",this.ChercheL);
        })
    }


    getDriverAcrives(){
        this.dservice.getDriverActive().subscribe((data : any) =>{             
             this.driver = data;            
         })
    }

    getTrips(){
        this.sommeCH = 0;
        this.sommeLC = 0;
        this.dservice.getTripParClient().subscribe(data => {
            const result = data['_body'];
            const jo = JSON.parse(result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            console.log('cleint: ',this.jsonObj)
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
                this.somm = this.jsonObj[index]
                this.sommeCH += Number(this.somm[1]);
                this.sommeLC += Number(this.somm[2]);
            }

            console.log('cleint2222: ',this.items)
            console.log('somme222: ',this.sommeCH )
            console.log('somme222: ',this.sommeLC)
        })
    }
}
