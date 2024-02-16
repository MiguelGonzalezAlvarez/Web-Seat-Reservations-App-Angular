import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ReservationItemComponent } from './reservation-item.component';
import { Router } from '@angular/router';

describe('ReservationItemComponent', () => {
  let component: ReservationItemComponent;
  let fixture: ComponentFixture<ReservationItemComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationItemComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.cardId).toBe(0);
    expect(component.title).toBe('');
    expect(component.subtitle).toBe('');
    expect(component.image).toBe('');
    expect(component.startDate).toBe('');
    expect(component.endDate).toBe('');
    expect(component.description).toBe('');
  });

  it('should navigate to detail page on button click with cardId', () => {
    component.cardId = 1;

    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');

    const button = fixture.debugElement.query(By.css('.buy-button')).nativeElement;
    button.click();

    expect(navigateSpy).toHaveBeenCalledWith(['seat-reservation-app/reservation-detail', 1]);
  });

  it('should not navigate to detail page on button click without cardId', () => {
    component.cardId = 0;

    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');
    const consoleSpy = spyOn(console, 'log');

    const button = fixture.debugElement.query(By.css('.buy-button')).nativeElement;
    button.click();

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
  });


});
