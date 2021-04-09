import { AbstractControl } from '@angular/forms';

export function spaceValidator(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
      console.log(control.value);
      return { required: true }
    }
    else {
      return null;
    }
  }


  export function specialCharacters(control: AbstractControl) {
    if (control && control.value && control.value.replace(/[^\w\s]/gi, '').length) {
      control.setValue('');
      console.log(control.value);
      return { required: true }
    }
    else {
      return null;
    }
  }