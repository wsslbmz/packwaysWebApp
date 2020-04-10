import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-map-trips',
  templateUrl: './map-trips.component.html',
  styleUrls: ['./map-trips.component.scss'],
  animations: [routerTransition()]
})
export class MapTripsComponent implements OnInit {

public lat: Number = 33.667090;
public lng: Number = 10.016560;
 
public origin: any;
public destination: any;

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 33.667090, lng: 10.016560 };
    this.destination = { lat: 36.716927, lng: 10.370461 };
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

}
