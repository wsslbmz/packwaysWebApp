import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatlivreurComponent } from './statlivreur.component';

describe('StatlivreurComponent', () => {
  let component: StatlivreurComponent;
  let fixture: ComponentFixture<StatlivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatlivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatlivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
