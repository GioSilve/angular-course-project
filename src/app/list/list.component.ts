import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() characters: { id: number; name: string; side: string }[] = [];
  @Input() sides: string[] = [];
  @Output() sideButtonClicked = new EventEmitter<{
    id: number;
    side: string;
  }>();

  onSideButtonClicked(characterSide: { id: number; side: string }) {
    this.sideButtonClicked.emit(characterSide);
  }
}
