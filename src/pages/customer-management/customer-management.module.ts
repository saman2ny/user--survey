import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ApproveCustomerComponent } from './approve-customer/approve-customer.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/shared/shared.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { BlockCopyPasteDirective } from '.././../directives/BlockCopyPasteDirective';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },

  {
    path: 'approve-customer',
    component: ApproveCustomerComponent
  },


  {
    path: 'customerDetails',
    component: CustomerDetailsComponent
  }

]

@NgModule({
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxIntlTelInputModule,
  ],
  declarations: [BlockCopyPasteDirective, CustomerListComponent, ApproveCustomerComponent, CustomerDetailsComponent]
})
export class CustomerManagementModule { }
