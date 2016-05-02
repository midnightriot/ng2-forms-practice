import {ValidatorFn} from 'angular2/src/common/forms/directives/validators'
import {FORM_PROVIDERS,
    FormBuilder,
    Validators,
    ControlGroup} from 'angular2/common';

//# Make Class validatable with Attributes

//export interface IAutoValidatable {
//    autoValidationRules :IValidationRule[];
//}

export function AutoValidate(validators :ValidatorFn[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const validationRule: IValidationRule = {
            propertyKey: propertyKey,
            validators: validators
        };

        if (target == null) {
            throw new Error('AutoValidate was meant to be used as a property decorator');
        }

        if (target.__autoValidationRules) { // ToDo: use better check for is array.
            target.__autoValidationRules.push(validationRule);
        } else {
            target.__autoValidationRules = [validationRule];
        }

        console.log(target);
    };
}

// This will be build using autoValidation Attribute
export interface IValidationRule {
    propertyKey: string,
    validators: ValidatorFn[] // May need to adjust type to allow for Required validation type.
}

//# Build From from autovalidation



//# Add 'strongly' typed property to autovalidation by returning controls from validation bassed off of name