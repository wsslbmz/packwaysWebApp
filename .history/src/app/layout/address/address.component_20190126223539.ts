/// <reference types="@types/googlemaps" />
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  animations: [routerTransition()],

})
export class AddressComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public bounds: google.maps.LatLngBounds;
  public markers: google.maps.Marker[];
  public icon: any;
  public agmMap: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('agmMap') set content(map: AgmMap) {
    if (map) {
      map.mapReady.subscribe(map => {
        this.agmMap = map;
      });
    }
  }

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
    this.mapsAPILoader.load().then(() => {
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

          /* this.markers.forEach(marker => {
            marker.setMap(null);
          }); */
          this.markers = [];
          this.bounds = new google.maps.LatLngBounds();
          places.forEach(place => {
            if (!place.geometry) {
              console.log('Returned place contains no geometry');
              return;
            }
            this.icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            this.markers.push(
              new google.maps.Marker({
                map: this.agmMap,
                icon: this.icon,
                title: place.name,
                position: place.geometry.location
              })
            );
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              this.bounds.union(place.geometry.viewport);
            } else {
              this.bounds.extend(place.geometry.location);
            }
          });
          this.agmMap.fitBounds(this.bounds);

          // set latitude, longitude and zoom
          this.latitude = places[0].geometry.location.lat();
          this.longitude = places[0].geometry.location.lng();

          this.zoom = 12;
        // });
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
