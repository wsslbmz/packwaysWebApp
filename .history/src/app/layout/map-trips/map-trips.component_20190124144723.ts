import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

let google: any;
@Component({
  selector: 'app-map-trips',
  templateUrl: './map-trips.component.html',
  styleUrls: ['./map-trips.component.scss'],
  animations: [routerTransition()]
})
export class MapTripsComponent implements OnInit {


directionsDisplay;
directionsService = new google.maps.DirectionsService;
map;
stop;
start;
end;

  constructor() { }

  ngOnInit() {        
  }

  initialize() {
    this.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

    var myOptions = {
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }

    this.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    this.directionsDisplay.setMap(this.map);
    this.calcRoute();
}

calcRoute() {

    var waypts = [];

    this.stop = new google.maps.LatLng(51.943571, 6.463856)
    waypts.push({
        location: stop,
        stopover: true
    });
    this.stop = new google.maps.LatLng(51.945032, 6.465776)
    waypts.push({
        location: stop,
        stopover: true
    });
    this.stop = new google.maps.LatLng(51.945538, 6.469413)
    waypts.push({
        location: stop,
        stopover: true
    });
    this.stop = new google.maps.LatLng(51.947462, 6.467941)
    waypts.push({
        location: stop,
        stopover: true
    });
    this.stop = new google.maps.LatLng(51.945409, 6.465562)
    waypts.push({
        location: stop,
        stopover: true
    });
    this.stop = new google.maps.LatLng(51.943700, 6.462096)
    waypts.push({
        location: stop,
        stopover: true
    });

    this.start = new google.maps.LatLng(51.943382, 6.463116);
    this.end = new google.maps.LatLng(51.943382, 6.463116);
    
    this.createMarker(this.start);
    
    var request = {
        origin: this.start,
        destination: this.end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    };

    this.directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
            var route = response.routes[0];
        }
    });
}

createMarker(latlng) {
    
    var marker = new google.maps.Marker({
        position: latlng,
        map: this.map
    });
}


}
