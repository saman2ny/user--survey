import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddCompanyComponent } from './add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CompanyComponent } from './company-list/company.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { ImageCropperModule } from 'ngx-image-cropper';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { DropdownModule } from 'primeng/dropdown';


import { MultiSelectModule } from 'primeng/multiselect';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  },
  {
    path: 'company',
    component: AddCompanyComponent
  }

]

@NgModule({
  declarations: [CompanyComponent, AddCompanyComponent],
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ImageCropperModule,
    NgxIntlTelInputModule,
    MultiSelectModule,
    DropdownModule,
    AutoCompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class CompanyMasterModule { }
