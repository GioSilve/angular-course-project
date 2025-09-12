import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class StarWarsService {
  private characters = [
    { id: 1, name: 'Luke Skywalker', side: 'none' },
    { id: 2, name: 'Darth Vader', side: 'none' },
    { id: 3, name: 'Han Solo', side: 'none' },
  ];
  private sides = ['all', 'light', 'dark'];
  private selectedTab = this.sides[0];
  private logService: LogService;
  private httpClient: HttpClient;
  charactersChanged = new Subject<void>();

  constructor(logService: LogService, httpClient: HttpClient) {
    this.logService = logService;
    this.httpClient = httpClient;
  }

  fetchCharacters() {
    this.httpClient
      .get('https://swapi.info/api/people')
      .pipe(
        map((response: any) => {
          const extractedChars = response?.map((char: any, index: number) => {
            return {
              id: index,
              name: char.name,
              side: 'none',
            };
          });
          return extractedChars ?? [];
        })
      )
      .subscribe((data) => {
        this.characters = data;
        this.charactersChanged.next();
      });
  }

  getCharacters(selectedSide: string) {
    if (selectedSide === this.sides[0]) {
      return this.characters.slice();
    }
    return this.characters.filter(
      (character) => character.side === selectedSide
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
    this.charactersChanged.next();
    this.logService.writeLog(
      `Changed side of ${characterSide.name} to ${characterSide.side}`
    );
  }

  addCharacter(name: string, side: string) {
    const newCharacter = {
      id: this.characters.length + 1,
      name: name,
      side: side,
    };
    if (this.characters.find((character) => character.name === name)) {
      return;
    }
    this.characters.push(newCharacter);
    this.logService.writeLog(`Added character ${name} to side ${side}`);
  }
}
