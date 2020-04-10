/// <reference types="@types/googlemaps" />
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-address',
  // templateUrl: './address.component.html',
  // styleUrls: ['./address.component.scss'],
  animations: [routerTransition()],
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
  template: `
    <div class="container">
      <h1></h1>
      <div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl" id="inputNAdresse">
      </div>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom" (mapClick)="mapClicked($event)" id="map" #map>
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
        <agm-marker
      *ngFor="let m of markers; let i = index"
      (markerClick)="clickedMarker(m.label, i)"
      [latitude]="m.lat"
      [longitude]="m.lng"
      [label]="m.label"
      [markerDraggable]="m.draggable"
      (dragEnd)="markerDragEnd(m, $event)">

    <agm-info-window>
      <strong>InfoWindow content</strong>
    </agm-info-window>

  </agm-marker>
      </agm-map>
    </div>
  `
})
export class AddressComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  markers: marker[] = [];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const options = {
        types: ['(regions)'],
        componentRestrictions: {country: 'tn'}
      };
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place.geometry);

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.latitude);
          console.log(this.longitude);

          this.zoom = 12;
        });
      });
    });
    /* this.mapsAPILoader.load().then(() => {

      const searchBox = new google.maps.places.SearchBox(this.searchElementRef.nativeElement);
      searchBox.addListener('places_changed', function() {
        console.log('okiii');
        // this.ngZone.run(() => {
          console.log('okiii22222');
          // get the place result
          const places = searchBox.getPlaces();

          // verify result
          if (places[0].geometry === undefined || places[0].geometry === null) {
            return;
          }
          console.log(places[0].geometry);

          // set latitude, longitude and zoom
          this.latitude = places[0].geometry.location.lat();
          this.longitude = places[0].geometry.location.lng();
          console.log(this.latitude);
          console.log(this.longitude);

          this.zoom = 12;
        // });
      });
    }); */
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  clickedMarker(label: string, index: number) {
    alert(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    if (this.markers.length === 0) {
      console.log('$event ', $event);
      console.log('$event.coords ', $event.coords);
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
      console.log('this.markers', this.markers);
      this.getAddressFromLatLng($event.coords.lat, $event.coords.lng);
    }
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    this.getAddressFromLatLng($event.coords.lat, $event.coords.lng);
  }

  getAddressFromLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder;
    const latlng = {lat: lat, lng: lng};
    let rslt = '';
    geocoder.geocode({'location': latlng}, function(results) {
      if (results[0]) {
        console.log(results[0]);
        console.log(results[0].formatted_address);
        rslt = results[0].formatted_address.toString();
      } else {
        console.log('No results found');
      }
    });
    /* setTimeout(function() {
      this.snackBar.open(rslt, 'Fermer', {
        duration: 2000,
      });
    }, 4000); */
    return rslt;
  }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
