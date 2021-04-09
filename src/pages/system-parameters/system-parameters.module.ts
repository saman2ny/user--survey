import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSystemParametersComponent } from './list-system-parameters/list-system-parameters.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { SharedModule } from 'src/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SystemAlertsComponent } from './system-alerts/system-alerts.component';

import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';


const routes: Routes = [

  {
    path: '',
    component: ListSystemParametersComponent,
    
  },
  {
    path: 'system-alerts',
    component: SystemAlertsComponent,
    
  },
]



@NgModule({
  declarations: [ListSystemParametersComponent, SystemAlertsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
  ]
})
export class SystemParametersModule { }
