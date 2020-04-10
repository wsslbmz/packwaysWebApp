import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourbeilleComponent } from './courbeille.component';

describe('CourbeilleComponent', () => {
  let component: CourbeilleComponent;
  let fixture: ComponentFixture<CourbeilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourbeilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourbeilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
