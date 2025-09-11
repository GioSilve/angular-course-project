import { Component } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  swService: StarWarsService;
  sides: string[];

  constructor(swService: StarWarsService) {
    this.swService = swService;
    this.sides = this.swService.getSides();
  }
}
