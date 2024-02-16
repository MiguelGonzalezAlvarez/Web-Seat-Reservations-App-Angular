import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app/app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FlexLayoutModule,
        ReservationsModule,
        SharedModule
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a toolbar and a router-outlet', () => {
    const compiled = fixture.nativeElement;
    const toolbarElement = compiled.querySelector('toolbar');
    const routerOutletElement = compiled.querySelector('router-outlet');

    expect(toolbarElement).toBeTruthy();
    expect(routerOutletElement).toBeTruthy();
  });
});