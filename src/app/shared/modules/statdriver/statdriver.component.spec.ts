import { StatDriverComponent } from './statdriver.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('StatDriverComponent', () => {
    let component: StatDriverComponent;
    let fixture: ComponentFixture<StatDriverComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [StatDriverComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StatDriverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
