import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AuthGuard } from 'src/guards/auth-guard.service';
import { ShowDatePipe } from 'src/pipes/show-date.pipe';
import { CorporateListComponent } from './corporate-list/corporate-list.component';
import { AddCorporateComponent } from './add-corporate/add-corporate.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


const routes: Routes= [
  {
    path: '',
    component:CorporateListComponent
  },
  {
    path: 'corporate',
    component:AddCorporateComponent
  },

]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxIntlTelInputModule,
  ],
  entryComponents: [],
  declarations: [CorporateListComponent, AddCorporateComponent]
})
export class CorporateMasterModule { }
