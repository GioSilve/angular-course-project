import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { id: 1, name: 'Luke Skywalker', side: '' },
    { id: 2, name: 'Darth Vader', side: '' },
    { id: 3, name: 'Han Solo', side: '' },
    { id: 4, name: 'Leia Organa', side: '' },
    { id: 5, name: 'Obi-Wan Kenobi', side: '' },
    { id: 6, name: 'Yoda', side: '' },
  ];
  private sides = ['all', 'light', 'dark'];
  private selectedTab = this.sides[0];
  private logService: LogService;

  constructor(logService: LogService) {
    this.logService = logService;
  }

  getCharacters() {
    if (this.selectedTab === this.sides[0]) {
      return this.characters;
    }
    return this.characters.filter(
      (character) => character.side === this.selectedTab
    );
  }

  getSides() {
    return this.sides;
  }

  getSelectedTab() {
    return this.selectedTab;
  }

  setSelectedTab(side: string) {
    this.selectedTab = side;
  }

  onSideButtonClicked(characterSide: {
    id: number;
    name: string;
    side: string;
  }) {
    this.characters = this.characters.map((character) => {
      if (character.id === characterSide.id) {
        return {
          id: character.id,
          name: character.name,
          side: characterSide.side,
        };
      }
      return character;
    });
    this.logService.writeLog(
      `Changed side of ${characterSide.name} to ${characterSide.side}`
    );
  }
}
