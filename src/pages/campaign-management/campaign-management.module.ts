import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WebToSMSComponent } from './web-to-sms/web-to-sms.component';
import { PushSmsCampaignComponent } from './push-sms-campaign/push-sms-campaign.component';
import { LIVE_ANNOUNCER_PROVIDER } from '@angular/cdk/a11y';

// import { ApprovePushSmsCampaignComponent } from './approve-push-sms-campaign/approve-push-sms-campaign.component';
// import { EnableOrDisablePullCampaignComponent } from './enable-or-disable-pull-campaign/enable-or-disable-pull-campaign.component';
// import { PullSMSCampaignComponent } from './pull-smscampaign/pull-smscampaign.component';
// import { ApprovePullSMSCampaignComponent } from './approve-pull-smscampaign/approve-pull-smscampaign.component';
import { SharedModule } from 'src/shared/shared.module';
import { PushSmsListComponent } from './push-sms-list/push-sms-list.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { PullSmsListComponent } from './pull-sms-list/pull-sms-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CategroryMasterComponent } from './categrory-master/categrory-master.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
// import { AutofocusFixModule } from 'ngx-autofocus-fix';


import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';



const routes: Routes = [
  {
    path: '',
    component: WebToSMSComponent
  },
  {
    path: 'PushSmsList',
    component: PushSmsListComponent
  },
  {
    path: 'PushSms',
    component: PushSmsCampaignComponent
  },
  // {
  //   path: 'ApprovePushSms',
  //   component: ApprovePushSmsCampaignComponent
  // },
  // {
  //   path: 'PullSMSList',
  //   component: PullSmsListComponent
  // },
  // {
  //   path: 'PullSMS',
  //   component: PullSMSCampaignComponent
  // },
  // {
  //   path: 'ApprovePullSMS',
  //   component: ApprovePullSMSCampaignComponent
  // },
  // {
  //   path: 'EnableOrDisablePull',
  //   component: EnableOrDisablePullCampaignComponent
  // },
  {
    path: 'categoryMaster',
    component: CategroryMasterComponent
  },
  {
    path: 'AddCategory',
    component: AddCategoryComponent
  },


]


const customLyouts: IKeyboardLayouts = {
  ...keyboardLayouts,
  'Tolles Layout': {
    'name': 'Awesome layout',
    'keys': [
      [
        ['1', '!'],
        ['2', '@'],
        ['3', '#']
      ]
    ],
    'lang': ['de-CH']
  }
};

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
    CKEditorModule,
    NgxIntlTelInputModule,
    // AutofocusFixModule
    MatKeyboardModule,MultiSelectModule,
    DropdownModule,

  ],

  declarations: [
    
    WebToSMSComponent, PushSmsCampaignComponent, 
     PushSmsListComponent, CategroryMasterComponent, AddCategoryComponent
  ],
  
  providers: [
    { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLyouts }

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class CampaignManagementModule { }
