import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { AddGroupComponent } from './add-group/add-group.component';
import { GroupPrivilegesComponent } from './group-privileges/group-privileges.component';
import { PageListComponent } from './page-list/page-list.component';
import { AddPageComponent } from './add-page/add-page.component';
// import { BranchComponent } from './branch/branch.component';
// import { DepartmentComponent } from './department/department.component';
import { SharedModule } from 'src/shared/shared.module';
import { LanguageMasterComponent } from './language-master/language-master.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent
  },
  //  {
  //   path: 'group',
  //   component: AddGroupComponent
  // },
  {
    path: 'group-privileges',
    component: GroupPrivilegesComponent
  },
  {
    path: 'languageMaster',
    component: LanguageMasterComponent
  },
  {
    path: 'pageList',
    component: PageListComponent
  },
  {
    path: 'addPage',
    component: AddPageComponent
  },
  // {
  //   path: 'branch',
  //   component: BranchComponent
  // },
  // {
  //   path: 'department',
  //   component: DepartmentComponent
  // },

]

@NgModule({
  declarations: [GroupListComponent, GroupPrivilegesComponent, LanguageMasterComponent,PageListComponent, AddPageComponent,
    // ,AddGroupComponent,
    //  BranchComponent, DepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,TranslateModule
  ]
})
export class GroupManagementModule { }
