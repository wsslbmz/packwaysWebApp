import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdressesComponent } from './adresses.component';
import { AdressesModule } from './adresses.module';

describe('AdressesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AdressesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AdressesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
