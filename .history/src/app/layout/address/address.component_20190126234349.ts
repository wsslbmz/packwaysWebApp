/// <reference types="@types/googlemaps" />
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

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
      <h1>Angular 2 + Google Maps Places Autocomplete</h1>
      <div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl" id="inputNAdresse">
      </div>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom" id="map" #map>
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
    </div>
    <button class="btn btn-success" (click)="showMarker()">Ajuster ma postion</button>
  `
})
export class AddressComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
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

  showMarker() {
    let map = new google.maps.Map(document.getElementById('map'));
    map.addListener('click', function(e) {
      this.placeMarkerAndPanTo(e.latLng, map);
    });
  }
  placeMarkerAndPanTo(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
  }
}
