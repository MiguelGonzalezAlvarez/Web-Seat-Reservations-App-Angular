import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent {
  @Input() cardId: number = 0;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() image: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() description: string = '';

  constructor(private router: Router) { }

  public navigateToDetail(): void {
    const detailUrl = '/reservations/detail';
    this.cardId ? this.router.navigate([detailUrl, this.cardId]) : console.log("Unable to navigate to detail page");
  }

}
