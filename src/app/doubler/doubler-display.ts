import { Component, Input } from 'angular2/core';

@Component({
    selector: 'doubler-display',
    template: require('./templates/doubler-display.html')
})
export class DoublerDisplay {
    @Input() currentNumber :number;
}
