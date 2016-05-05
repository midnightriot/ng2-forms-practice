import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import { AutoValidate } from "../../AutoValidation/AutoValidation";

import { Validators } from 'angular2/common';
import {IAutoValidatable} from "../../AutoValidation/AutoValidation";
import {IValidationRule} from "../../AutoValidation/AutoValidation";

@Injectable()
export class DoublerService {
    private _numberInfoSubject :BehaviorSubject<INumberInfo>;
    numberInfo$: Observable<INumberInfo>;

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
        this.numberInfo = <INumberInfo> {
            number: 5,
            multiplier: 2
        };

        console.log(this._numberInfo);
        this._numberInfoSubject =  new BehaviorSubject<INumberInfo>(this._numberInfo);
        this.numberInfo$ = this._numberInfoSubject
            .publishReplay(1)
            .refCount();

        this.numberInfo$.subscribe(x => console.log('observe', x));

    }
}

export class INumberInfo implements IAutoValidatable  {
    @AutoValidate([Validators.required, Validators.maxLength(2)])
    multiplier: number;

    @AutoValidate([Validators.required, Validators.maxLength(4)])
    number: number;

    __autoValidationRules :IValidationRule[];
}
