import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';





// import { AuthGuard } from 'src/guards/auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
// import { ShowDatePipe } from 'src/pipes/show-date.pipe';
// import { ApporveUserComponent } from './apporve-user/apporve-user.component';
import { SharedModule } from 'src/shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {DropdownModule} from 'primeng/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    
  },
  {
    path: 'operator',
    component: AddUserComponent,
    
  },
  // {
  //   path: 'approve-operator',
  //   component: ApporveUserComponent,
    
  // },
];

@NgModule({
  // declarations: [],
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    AutoCompleteModule,
    DropdownModule,
    NgxIntlTelInputModule
    
  ],
  entryComponents: [],
  declarations: [UserListComponent, AddUserComponent,
    //  ApporveUserComponent
    ]
})
export class UserManagementModule { }
