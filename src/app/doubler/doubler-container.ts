import {Component} from 'angular2/core';
import {DoublerService, INumberInfo} from './doubler-service'
import { Observable } from 'rxjs/Observable';
import {DoublerDisplay} from "./doubler-display";
import {DoublerInput} from "./doubler-input";

@Component({
  selector: 'doubler',
    providers: [DoublerService],
    directives: [DoublerDisplay, DoublerInput],
  template: `
      <div>
        <doubler-display [currentNumber]="currentNumber$ | async"></doubler-display>
        <doubler-input [numberInfo]="numberInfo$ | async"
                       (onUpdateNumberInfo)="updateNumberInfo($event)"></doubler-input>
      </div>
  `
})
export class DoublerContainer {
    get currentNumber$() :Observable<number> {
        return this._doublerService.currentNumber$;
    }

    get numberInfo$() :Observable<INumberInfo> {
        return this._doublerService.numberInfo$;
    }

    updateNumberInfo(numberInfo :INumberInfo) {
        this._doublerService.numberInfo = numberInfo;
    }

    constructor(private _doublerService :DoublerService) {

    }
}
