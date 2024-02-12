import { Component, Input } from '@angular/core';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent {
  @Input() eventList: Event[] = [];
}
