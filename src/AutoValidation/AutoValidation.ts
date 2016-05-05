import {ValidatorFn} from 'angular2/src/common/forms/directives/validators'
import * as modelModule from 'angular2/src/common/forms/model';
import {FORM_PROVIDERS,
    FormBuilder,
    Validators,
    ControlGroup} from 'angular2/common';

import { Injectable } from 'angular2/core';

import 'lodash';

//# Make Class validatable with Attributes

//export interface IAutoValidatable {
//    autoValidationRules :IValidationRule[];
//}

export function AutoValidate(validators :ValidatorFn[]) {
    return function (target: any, propertyKey: string) {
        const validationRule: IValidationRule = {
            propertyKey: propertyKey,
            validators: validators
        };

        if (target == null) {
            throw new Error('AutoValidate was meant to be used as a property decorator');
        }

        if (_.isArray(target.__autoValidationRules)) {
            target.__autoValidationRules.push(validationRule);
        } else {
            target.__autoValidationRules = [validationRule];
        }
    };
}

// This will be build using autoValidation Attribute
export interface IValidationRule {
    propertyKey: string,
    validators: ValidatorFn[] // May need to adjust type to allow for Required validation type.
}

//(MyClass: typeof MyClass)

//# Build From from autovalidation
@Injectable()
export class AutoFormBuilder extends FormBuilder {
    //autoGroup(validatable :any): modelModule.ControlGroup{
    //    if (!validatable.__autoValidationRules){
    //        throw new Error('Unable to set up AutoGroup: class contains no @AutoValidate properties');
    //    }
    //
    //    let controlGroup = {};
    //
    //    _.forEach(validatable.__autoValidationRules, (x :IValidationRule) => {
    //        controlGroup[x.propertyKey] = ['', Validators.compose(x.validators) ];
    //    });
    //
    //    return this.group(controlGroup);
    //}

    autoGroup<T extends IAutoValidatable>(type: { new(): T ;}, templateObject? :T): modelModule.ControlGroup { // Note: unexpected behavior may occur if type does not have parameterless constructor.
        let validatable :any = new type();

        if (!validatable.__autoValidationRules){
            throw new Error('Does not implement IAutoValidatable');
        }

        let controlGroup = {};

        _.forEach(validatable.__autoValidationRules, (x :IValidationRule) => {
            let initialValue = '';

            if (templateObject != null) {
                initialValue = (templateObject[x.propertyKey] != null)
                    ? templateObject[x.propertyKey]
                    : '';
            }

            controlGroup[x.propertyKey] = [initialValue, Validators.compose(x.validators) ];
        });

        return this.group(controlGroup);
    }
}

export interface IAutoValidatable{
    __autoValidationRules :IValidationRule[];
}


//# Add 'strongly' typed property to autovalidation by returning controls from validation bassed off of name
