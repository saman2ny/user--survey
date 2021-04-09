import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { SharedModule } from 'src/shared/shared.module';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { DropdownModule } from 'primeng/dropdown';


import { MultiSelectModule } from 'primeng/multiselect';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ListPromotionalMarketingComponent } from './list-promotional-marketing/list-promotional-marketing.component';
import { AddPromotionalMarketingComponent } from './add-promotional-marketing/add-promotional-marketing.component';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { ApprovePromotionalMarketingComponent } from './approve-promotional-marketing/approve-promotional-marketing.component';

const routes: Routes = [


  {
    path: '',
    component: ListPromotionalMarketingComponent,

  },


  {
    path: 'add-promotional',
    component: AddPromotionalMarketingComponent,

  },

  // {
  //   path: 'approve-promotional',
  //   component: ApprovePromotionalMarketingComponent,

  // }




];

@NgModule({
  declarations: [ListPromotionalMarketingComponent, AddPromotionalMarketingComponent,
    // ApprovePromotionalMarketingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,TranslateModule,CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    // BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule,
    SharedModule
  ]
})
export class PromotionalMarketingModule { }
