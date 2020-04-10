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
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
    </div>
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
    /* this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
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
    }); */
    let input1: any;
    this.mapsAPILoader.load().then(() => {

      // input1 = document.getElementById('inputNAdresse');
      // const autocomplete = new google.maps.places.SearchBox(input1);
      const autocomplete = new google.maps.places.SearchBox(this.searchElementRef.nativeElement);
      autocomplete.addListener('places_changed', function() {
        console.log('okiii');
        this.ngZone.run(() => {
          console.log('okiii22222');
          // get the place result
          const place = autocomplete.getPlaces();

          // verify result
          if (place[0].geometry === undefined || place[0].geometry === null) {
            return;
          }
          console.log(place[0].geometry);

          // set latitude, longitude and zoom
          this.latitude = place[0].geometry.location.lat();
          this.longitude = place[0].geometry.location.lng();
          console.log(this.latitude);
          console.log(this.longitude);

          this.zoom = 12;
        });
      });
    });
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
}
