import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-trips',
  templateUrl: './map-trips.component.html',
  styleUrls: ['./map-trips.component.scss']
})
export class MapTripsComponent implements OnInit {

public lat: Number = 24.799448;
public lng: Number = 120.979021;
 
public origin: any;
public destination: any;

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

}
