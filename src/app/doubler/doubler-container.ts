import {Component} from 'angular2/core';
import {DoublerService, INumberInfo} from './doubler-service'
import { Observable } from 'rxjs/Subject';

@Component({
  selector: 'doubler',

  template: `
      <md-card>
        <doubler-input [numberInfo]="numberInfo$ | async">
                       (onUpdateNumberInfo)="updateNumberInfo($event)"</doubler-input>
      </md-card>
  `
})
export class DoublerContainer {
    get numberInfo$() :Observable<number> {
        return this._doublerService.numberInfo$;
    }

    updateNumberInfo(numberInfo :INumberInfo) {
        this._doublerService.numberInfo = numberInfo;
    }

    constructor(private _doublerService :DoublerService) {

    }
}
