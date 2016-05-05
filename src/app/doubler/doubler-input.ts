import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
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
export class DoublerInput implements OnInit{
    @Input() numberInfo :INumberInfo;

    @Output() onUpdateNumberInfo = new EventEmitter();

    numberForm :ControlGroup; // Would be nice to have strongly typed TypedControlGroup<numberInfo>

    update() {
        this.onUpdateNumberInfo.emit(this.numberInfo);
    }

    constructor(private autoBuilder: AutoFormBuilder) {

    }

    ngOnInit() {
        console.log('template@constructor', this.numberInfo);

        this.numberForm = this.autoBuilder.autoGroup(INumberInfo, this.numberInfo);
        // Strongly typed form builder? or build from model?
        //this.numberForm = this.builder.group({
        //    number: [this.numberInfo.number, Validators.required],
        //    multiplier: [this.numberInfo.multiplier, Validators.required]
        //});
        console.log('template@constructor', this.numberInfo);
    }
}
