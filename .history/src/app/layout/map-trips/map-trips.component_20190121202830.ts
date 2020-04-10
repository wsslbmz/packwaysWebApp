import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InfoWindow } from '@agm/core/services/google-maps-types' // option
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

public renderOptions: object = { polylineOptions: { strokeColor: '#f0f' }, suppressMarkers: true };

public origin1: Object = { lat: 33.667090, lng: 10.016560 };
public destination1: Object = { lat: 36.716927, lng: 10.370461 };

public origin2: Object = { lat: 36.716927, lng: 10.370461 };
public destination2: Object = { lat: 35.789524, lng: 10.972017 };

public markerOptions = {
  origin: {
    draggable: true,
  },
  destination: {
      draggable: true,
      infoWindow: `<h4>Hello<h4>`
  },
};

public infoWindow: InfoWindow = undefined;


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

  getStatus(status) {
    console.log('status', status);
  }

  public obtainInfowindow(window: InfoWindow) {
    this.infoWindow = window;
}

}
