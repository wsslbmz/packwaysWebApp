import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
@Component({
  selector: 'app-map-trips',
  templateUrl: './map-trips.component.html',
  styleUrls: ['./map-trips.component.scss'],
  animations: [routerTransition()]
})
export class MapTripsComponent implements OnInit {

lat: number = 33.667090;
lng: number = 10.016560;

public origin: any;
public destination: any;

public renderOptions: object = { polylineOptions: { strokeColor: '#f0f' }, draggable: true, };

public origin1: Object = { lat: 33.667090, lng: 10.016560 };
public destination1: Object = { lat: 36.716927, lng: 10.370461 };

public origin2: Object = { lat: 36.716927, lng: 10.370461 };
public destination2: Object = { lat: 35.789524, lng: 10.972017 };

public travelMode = 'DRIVING';
public transitOptions: any = undefined;
public drivingOptions: any = undefined;

public optimizeWaypoints = true;
public provideRouteAlternatives = true;
public avoidHighways = true;
public avoidTolls = true;
public visible = true;
public panel: object | undefined;

public waypoints: object = [
  {
      location: { lat: 34.667090, lng: 10.716560 },
      stopover: true,
  }];

public markerOptions = {
  origin: {
    draggable: true,
    infoWindow: 'This is origin.',
  },
  destination: {
      draggable: true,
      infoWindow: `<h4>Hello<h4>`,
      label: 'marker label',
      opacity: 0.8,
  },
  waypoints: {
    icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
    label: 'marker label',
    opacity: 0.8,
},
};

markers = [
  { latitude: 52.228973, longitude: 20.728218, draggable: true }
  ];

public infoWindow: InfoWindow = undefined;


  constructor() { }

  ngOnInit() {
    //this.getDirection();
    this.initMap();
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

placeMarker(position: any) {
  const lat = position.coords.lat;
  const lng = position.coords.lng;

  this.markers.push({ latitude: lat, longitude: lng, draggable: true });
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: -24.345, lng: 134.46}  // Australia.
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map,
      panel: document.getElementById('right-panel')
    });

    directionsDisplay.addListener('directions_changed', function() {
      let rslt: any = directionsDisplay.getDirections();
      console.log('rslt: ', rslt);
      //this.computeDistance(rslt);
    });
    this.computeDistance(directionsDisplay.getDirections());

    this.displayRoute('Perth, WA', 'Sydney, NSW', directionsService, directionsDisplay);
  }

  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  public computeDistance(result) {
    console.log('result: ', result);
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
