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


  citymap = {
    chicago: {
      center: {lat: 41.878, lng: -87.629},
      population: 2714856
    },
    newyork: {
      center: {lat: 40.714, lng: -74.005},
      population: 8405837
    },
    losangeles: {
      center: {lat: 34.052, lng: -118.243},
      population: 3857799
    },
    vancouver: {
      center: {lat: 49.25, lng: -123.1},
      population: 603502
    }
  };

  first = new google.maps.LatLng(42.496403, -124.413128);
  second = new google.maps.LatLng(42.496401, -124.413126);

  constructor() { }

  ngOnInit() {    
    this.initMap();
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
      //this.computeTotalDistance(rslt);
    });

    this.displayRoute('Perth, WA', 'Sydney, NSW', directionsService, directionsDisplay);
   // this.addCircle(map);
  }

  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,      
      waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
      //waypoints: [{location: this.first},{location: this.second}],
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

  computeTotalDistance(result) {
    console.log('result: ', result);
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

  addCircle(map) {
    // tslint:disable-next-line:forin
    for (var city in this.citymap) {
      // Add the circle for this city to the map.
      let cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: this.citymap[city].center,
        radius: Math.sqrt(this.citymap[city].population) * 100
      });
    }
  }

  
}
