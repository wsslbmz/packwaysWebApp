import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TripsComponent } from './trips.component';
import { TripsModule } from './trips.module';

describe('TripsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TripsModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TripsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
