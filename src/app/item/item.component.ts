import { Component, Input } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  swService: StarWarsService;
  @Input() character: { id: number; name: string; side: string };
  @Input() sides: string[];

  constructor(swService: StarWarsService) {
    this.swService = swService;
    this.character = { id: 0, name: '', side: '' };
    this.sides = [];
  }

  onSideButtonClicked(characterSide: {
    id: number;
    name: string;
    side: string;
  }) {
    this.swService.onSideButtonClicked(characterSide);
  }

  getButtonColor(side: string) {
    if (side === this.sides[0]) {
      return 'light';
    }
    if (side === this.sides[1]) {
      return 'danger';
    }
    return 'primary';
  }
}
