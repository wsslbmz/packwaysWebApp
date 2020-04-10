import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParainageComponent } from './parainage.component';

describe('ParainageComponent', () => {
  let component: ParainageComponent;
  let fixture: ComponentFixture<ParainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
