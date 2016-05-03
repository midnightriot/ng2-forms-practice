import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_PROVIDERS,
        FormBuilder,
        Validators,
        ControlGroup} from 'angular2/common';
import {INumberInfo} from './doubler-service';

import { AutoFormBuilder } from "../../AutoValidation/AutoValidation";

@Component({
    selector: 'doubler-input',
    providers: [AutoFormBuilder],
    template: require('./templates/doubler-input.html')
})
export class DoublerInput {
    @Input() numberInfo :INumberInfo;

    @Output() onUpdateNumberInfo = new EventEmitter();

    numberForm :ControlGroup; // Would be nice to have strongly typed TypedControlGroup<numberInfo>

    update() {
        const numberInfo: INumberInfo = {
            // Strongly typed controller properties?

            number: this.numberForm.controls.number.value,
            multiplier: this.numberForm.controls.multiplier.value
        };

        this.onUpdateNumberInfo.emit(numberInfo);
    }

    constructor(autoBuilder: AutoFormBuilder) {
        this.numberInfo = new INumberInfo();
        this.numberForm = autoBuilder.autoGroup(this.numberInfo);
        // Strongly typed form builder? or build from model?
        //this.numberForm = builder.group({
        //    number: ['', Validators.required],
        //    multiplier: ['', Validators.required]
        //});
    }
}
