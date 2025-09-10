import { Component } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss'],
})
export class CreateCharacterComponent {
  swService: StarWarsService;
  sidesDict: { display: string; value: string }[];
  defaultSide: string;

  constructor(swService: StarWarsService) {
    this.swService = swService;
    this.sidesDict = this.swService.getSides().map((side) => ({
      display: side === 'all' ? 'NONE' : side.toUpperCase(),
      value: side === 'all' ? 'none' : side,
    }));
    this.defaultSide = this.sidesDict[0].value;
  }

  onSubmit(submittedForm: any) {
    if (submittedForm.invalid) {
      return;
    }
    this.swService.addCharacter(
      submittedForm.value.characterName,
      submittedForm.value.selectSide
    );
    submittedForm.reset();
  }
}
