import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ListBranchComponent } from './list-branch/list-branch.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { SharedModule } from 'src/shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';



const routes: Routes = [
  {
    path: '',
    component: ListBranchComponent,
    
  },
  {
    path: 'add-branch',
    component: AddBranchComponent,
    
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    NgxIntlTelInputModule

  ],
  declarations: [ListBranchComponent, AddBranchComponent],

})
export class BranchMasterModule { }
