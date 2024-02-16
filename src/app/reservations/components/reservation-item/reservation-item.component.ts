import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DETAIL_URL } from '../../constants/reservation-urls';

@Component({
  selector: 'reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent {
  @Input() cardId: number = 0;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() image: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() description: string = '';

  constructor(private router: Router) { }

  public navigateToDetail(): void {
    this.cardId ? this.router.navigate([DETAIL_URL, this.cardId]) : console.log("Unable to navigate to detail page");
  }
}
