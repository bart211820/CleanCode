import {Component, Input } from '@angular/core';
import {Merchandise} from '../../../shared/modelsAndTheirServices/merchandise';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent {
  @Input() merchandise: Merchandise;

  constructor() { }

}
