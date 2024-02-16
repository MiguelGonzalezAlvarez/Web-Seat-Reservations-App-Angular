import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReservationsScreenComponent } from './reservations-screen.component';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ReservationsService } from '../../services/reservations.service';
import { ReservationsListComponent } from '../../components/reservations-list/reservations-list.component';

describe('ReservationsScreenComponent', () => {
  let component: ReservationsScreenComponent;
  let fixture: ComponentFixture<ReservationsScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsScreenComponent, ReservationsListComponent], // Agrega ReservationsListComponent aquí
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        ReservationsService,
        ShoppingCartService,
        ChangeDetectorRef
      ],
      imports: [
        RouterTestingModule,
        CommonModule,
        SharedModule,
        HttpClientTestingModule
      ]
    });

    fixture = TestBed.createComponent(ReservationsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});