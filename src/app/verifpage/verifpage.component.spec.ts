import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifpageComponent } from './verifpage.component';

describe('VerifpageComponent', () => {
  let component: VerifpageComponent;
  let fixture: ComponentFixture<VerifpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
