import { Component, Directive, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GoogleMapsAPIWrapper, LatLng } from '@agm/core';
import { InfoWindow, GoogleMap } from '@agm/core/services/google-maps-types';

declare var google: any;
@Component({
  selector: 'app-map-trips',
  templateUrl: './map-trips.component.html',
  styleUrls: ['./map-trips.component.scss'],
  animations: [routerTransition()]
})
@Directive({
  selector: 'sebm-google-map-directions'
})
export class MapTripsComponent implements OnInit {

 

public lat: Number = 33.667090;
public lng: Number = 10.016560;
 
//public origin: any;
//public destination: any;

/* @Input() origin;
@Input() destination;
@Input() waypoints; */
origin = { longitude: 4.333, lattitude: -1.2222 };  // its a example aleatory position
destination = { longitude: 22.311, lattitude: -0.123 };
waypoints = { longitude: 22.311, lattitude: -0.123 };

constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
ngOnInit(){
  this.gmapsApi.getNativeMap().then(map => {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);
            directionsService.route({
                    origin: {lat: this.origin.lattitude, lng: this.origin.longitude},
                    destination: {lat: this.destination.lattitude, lng: this.destination.longitude},
                    waypoints: this.waypoints,
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING'
                  }, function(response, status) {
                              if (status === 'OK') {
                                directionsDisplay.setDirections(response);
                              } else {
                                window.alert('Directions request failed due to ' + status);
                              }
            });

  });
}

  getDirection() {
    //this.origin = { lat: 33.667090, lng: 10.016560 };
    //this.destination = { lat: 36.716927, lng: 10.370461 };
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

  getStatus(status) {
    console.log('status', status);
  }

  public obtainInfowindow(window: InfoWindow) {
    //this.infoWindow = window;
}

public change(event: any) {
  //this.waypoints = event.request.waypoints;
}

}
