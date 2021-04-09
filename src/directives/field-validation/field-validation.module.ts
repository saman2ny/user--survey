import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldValidationDirective } from './field-validation.directive';



@NgModule({
  declarations: [FieldValidationDirective],
  imports: [
    CommonModule
  ]
})
export class FieldValidationModule { }
