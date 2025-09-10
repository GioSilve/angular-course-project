import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() characters: { id: number; name: string; side: string }[];
  @Input() sides: string[];

  constructor() {
    this.characters = [];
    this.sides = [];
  }
}
