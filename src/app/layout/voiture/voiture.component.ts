import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss'],
  animations: [routerTransition()]
})
export class VoitureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
