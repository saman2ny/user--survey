import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthGuard } from 'src/guards/auth-guard.service';
import { OtpComponent } from './otp/otp.component';
import { TranslateModule } from '@ngx-translate/core';


// import {TableModule} from 'primeng/table';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    
  },
  {
    path: 'ForgotPassword',
    component: ForgotPasswordComponent,
    
  },
  {
    path: 'two-factor-auth', 
    component: OtpComponent,
    
  }
];

@NgModule({
    // declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      InfiniteScrollModule,
      TranslateModule

            // TableModule,
      

    ],
    entryComponents: [],
    declarations: [LoginComponent, ForgotPasswordComponent, OtpComponent]
  })


export class UserModule { }