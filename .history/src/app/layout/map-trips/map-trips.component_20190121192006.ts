import { Component, Directive, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GoogleMapsAPIWrapper, LatLng } from '@agm/core';
import { InfoWindow, GoogleMap } from '@agm/core/services/google-maps-types';
@Component({
  selector: 'app-map-trips',
  templateUrl: './map-trips.component.html',
  styleUrls: ['./map-trips.component.scss'],
  animations: [routerTransition()]
})
export class MapTripsComponent implements OnInit {

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onResponse: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendInfoWindow: EventEmitter<InfoWindow> = new EventEmitter<InfoWindow>();
  @Output() status: EventEmitter<string> = new EventEmitter<string>();

public lat: Number = 33.667090;
public lng: Number = 10.016560;
 
public origin: any;
public destination: any;

public renderOptions: object = {
   polylineOptions: { strokeColor: '#f0f' },
   draggable: true,
   suppressMarkers: true,
   suppressInfoWindows: false,
  };

public origin1: Object = { lat: 33.667090, lng: 10.016560 };
public destination1: Object = { lat: 36.716927, lng: 10.370461 };

public origin2: Object = { lat: 36.716927, lng: 10.370461 };
public destination2: Object = { lat: 35.789524, lng: 10.972017 };

public markerOptions = {
  origin: {
    icon: 'https://i.imgur.com/7teZKif.png',
    draggable: true,
  },
  destination: {
    icon: 'https://i.imgur.com/7teZKif.png',
      draggable: true,
      infoWindow: `<h4>Hello<h4>`
  },
  waypoints: [
    {
      icon: 'https://i.imgur.com/7teZKif.png',
     infoWindow: `<h4>Hello<h4>`
    },
]
};

public infoWindow: InfoWindow = undefined;

/* */
public origin3: LatLng | string | google.maps.Place
public destination3: LatLng | string | google.maps.Place
public travelMode: string = 'DRIVING'
public transitOptions: string = 'TRANSIT' // default: 'DRIVING'
public transitOptions1: any = {
  departureTime: new Date('2018/05/20 13:14'),
  arrivalTime: new Date('2018/05/20 13:30'),
  modes: ['BUS'],
}
public drivingOptions: any = {
  departureTime: new Date('2018/05/20 13:14'),
  arrivalTime: new Date('2018/05/20 13:30'),
  modes: ['BUS'],
}
public waypoints: object = [
  {
      location: { lat: this.lat, lng: this.lng },
      stopover: true,
  },
  {
      location: 'Joplin, MO',
      stopover: false,
  },{
      location: 'Oklahoma City, OK',
      stopover: true,
  }]
public optimizeWaypoints: boolean = true
public provideRouteAlternatives: boolean = true
public avoidHighways: boolean = true
public avoidTolls: boolean = true
//public renderOptions: any
public visible: boolean = true
public panel: object | undefined


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

public change(event: any) {
  this.waypoints = event.request.waypoints;
}

}
