import {Component, Input, Output EventEmitter} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {DoublerService, INumberInfo} from './doubler-service'
import { Observable } from 'rxjs/Subject';

@Component({
    selector: 'doubler-input',

    template: `
      <form [ngFormModel]="numberForm" (submit)="update()">
        <label>NUMBER</label>
        <input ngControl="number" type="text" #number="ngForm"/>

        <label>MULTIPLIER</label>
        <input ngControl="multiplier" type="text" #multiplier="ngForm" />

        <button type="submit" value="UPDATE" [disabled]="!numberForm.valid"/>
      </form>
  `
})
export class DoublerInput {
    @Input numberInfo :INumberInfo;

    @Output onUpdateNumberInfo = new EventEmitter<INumberInfo>();

    update() {
        // ToDo: Validate
        // If valid
        const numberInfo: INumberInfo = {
            number: 0, // set to from form
            multiplier: 0 // set form form
        };

        this.onUpdateNumberInfo.emit(numberInfo);
    }
}
