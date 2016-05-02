import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import { AutoValidate } from "../../AutoValidation/AutoValidation";

import { Validators } from 'angular2/common';

@Injectable()
export class DoublerService {
    private _numberInfoSubject = new BehaviorSubject<INumberInfo>(null);
    numberInfo$: Observable<INumberInfo> = this._numberInfoSubject
        .publishReplay(1)
        .refCount();

    private _multiply: boolean = true;

    private _currentNumber$ :Observable<number> = Observable
        .timer(1, 1000)
        .map(() => {
          const multiplier = this._multiply
            ? this._numberInfo.multiplier
            : 1;
          const number = this._numberInfo.number;
          this._multiply = !this._multiply;

          return number * multiplier;
    });

    get currentNumber$() :Observable<number> {
        return this._currentNumber$;
    }

    private _numberInfo :INumberInfo;
    set numberInfo(numberInfo :INumberInfo) {
        this._numberInfo = numberInfo;
    }

    constructor() {
        this._numberInfo = new INumberInfo();
        this._numberInfo.multiplier = 2;
        this._numberInfo.number = 5;
        console.log(this._numberInfo);
    }
}

export class INumberInfo  {
    @AutoValidate([Validators.minLength(1), Validators.maxLength(2)])
    multiplier: number;

    @AutoValidate([Validators.minLength(1)])
    number: number;
}
