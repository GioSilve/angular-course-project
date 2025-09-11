import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  swService: StarWarsService;
  characters: { id: number; name: string; side: string }[];
  sides: string[];
  selectedSide: string;
  activatedRoute: ActivatedRoute;
  subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.swService = swService;
    this.characters = [];
    this.sides = this.swService.getSides().slice(1);
    this.selectedSide = 'all';
    this.activatedRoute = activatedRoute;
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedSide = params['side'];
      this.characters = this.swService.getCharacters(this.selectedSide);
    });
    this.subscription = this.swService.charactersChanged.subscribe(() => {
      this.characters = this.swService.getCharacters(this.selectedSide);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
