import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  characters = [
    { id: 1, name: 'Luke Skywalker', side: '' },
    { id: 2, name: 'Darth Vader', side: '' },
    { id: 3, name: 'Han Solo', side: '' },
    { id: 4, name: 'Leia Organa', side: '' },
    { id: 5, name: 'Obi-Wan Kenobi', side: '' },
    { id: 6, name: 'Yoda', side: '' },
  ];
  sides = ['all', 'light', 'dark'];
  selectedTab = this.sides[0];

  getCharacters() {
    if (this.selectedTab === this.sides[0]) {
      return this.characters;
    }
    return this.characters.filter(
      (character) => character.side === this.selectedTab
    );
  }

  onSelectedTab(side: string) {
    this.selectedTab = side;
  }

  onSideButtonClicked(characterSide: { id: number; side: string }) {
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
  }
}
