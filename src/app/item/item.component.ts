import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() character: { id: number; name: string; side: string } = {
    id: 0,
    name: '',
    side: '',
  };
  @Input() sides: string[] = [];
  @Output() sideButtonClicked = new EventEmitter<{
    id: number;
    side: string;
  }>();

  onSideButtonClicked(characterSide: { id: number; side: string }) {
    this.sideButtonClicked.emit(characterSide);
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
