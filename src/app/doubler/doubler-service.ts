import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Subject';

@Injectable()
export class DoublerService {
  private _multiply: boolean = true;

  private _numberInfo$ :Observable<number> = Observable
    .timer(1, 1000)
    .map(() => {
      const multiplier = this._multiply
        ? this._numberInfo.multiplier
        : 1;
      const number = this._numberInfo.number;
      this._multiply = !this._multiply;

      return number * multiplier;
    });

  get numberInfo$() :Observable<number> {
    return this._numberInfo$;
  }

  private _numberInfo :INumberInfo = {
    multiplier: 2,
    number: 5
  };
  set numberInfo(numberInfo :INumberInfo) {
    this._numberInfo = numberInfo;
  }
}

export interface INumberInfo {
  multiplier: number;
  number: number;
}
