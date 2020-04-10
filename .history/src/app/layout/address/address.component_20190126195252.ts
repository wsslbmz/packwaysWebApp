import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  animations: [routerTransition()]
})
export class AddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
