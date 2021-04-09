import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributionListComponent } from './distribution-list/distribution-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/shared/shared.module';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: DistributionListComponent
  },
  {
    path: 'distribution',
    component: AddContactsComponent
  },
]

@NgModule({
  declarations: [DistributionListComponent, AddContactsComponent],
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    NgxIntlTelInputModule,
    // AutofocusFixModule


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class DistributionListModule { }
