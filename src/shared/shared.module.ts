import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDatePipe } from 'src/pipes/show-date.pipe';
// import { NgSelect2Module } from 'ng-select2';
import { TemplateFilterPipe } from 'src/pipes/template-filter.pipe';
import { CustomeTableFilterPipe } from 'src/pipes/custome-table-filter.pipe';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SafePipe } from 'src/pipes/safe.pipe';


const PIPES = [
  ShowDatePipe,
  TemplateFilterPipe,
  CustomeTableFilterPipe,
  SafePipe
]; 


@NgModule({
  declarations: [PIPES],
  providers:[],
  exports: [
    PIPES
  ],
  imports: [
    CommonModule,
    // NgSelect2Module,
    
  ]
})
export class SharedModule { }
