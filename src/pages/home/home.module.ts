import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSidenavModule,MatToolbarModule,MatIconModule } from '@angular/material';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from 'src/guards/auth-guard.service';

// import { MyProfileComponent } from './my-profile/my-profile.component';
// import { ChangePasswordComponent } from '../user/change-password/change-password.component';
// import { SafelistComponent } from '../home/safelist/safelist.component';

import { ShowDatePipe } from 'src/pipes/show-date.pipe';
import { SafePipe } from 'src/pipes/safe.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import {DropdownModule} from 'primeng/dropdown';
//import { PaginatorModule, ConfirmDialogModule,DataTableModule, ConfirmationService, PickListModule, ListboxModule, CalendarModule } from 'primeng/primeng';
//import { EditorModule } from 'primeng/editor';

import {MultiSelectModule} from 'primeng/multiselect';
import {MatButtonModule} from '@angular/material/button';


// import { DynamicFormsComponent } from './DynamicForms/Master pages/dynamic-forms/dynamic-forms/dynamic-forms.component';
// import { DynamicformsAddEditComponent } from './DynamicForms/Master pages/dynamic-forms/dynamicforms-add-edit/dynamicforms-add-edit.component';
// import { DynamicFormsPopupComponent } from './DynamicForms/Master pages/dynamic-forms/dynamic-forms-popup/dynamic-forms-popup.component';
// import { DynamicformslistComponent } from './DynamicForms/Master pages/dynamic-forms/dynamicformslist/dynamicformslist.component';
// import { SDragNDrop} from '../home/dragndrop.directive'

// import {
//   AppAsideModule,
//   AppBreadcrumbModule,
//   AppHeaderModule,
//   AppFooterModule,
//   AppSidebarModule,
// } from '@coreui/angular';


@NgModule({
  // declarations: [],
  imports: [
    CommonModule,
    GoogleChartsModule,
    RouterModule.forChild([
      {       
        
        path: '',
        component: LandingPageComponent,
        children: [
          {
        
            path: '',
            loadChildren: () => import('src/pages/survey/survey.module')
              .then(({ SurveyModule }) => SurveyModule)
          
         
        }
      ]}
        
    ]),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    NgxIntlTelInputModule,
    AutoCompleteModule,
    DropdownModule,
    MatButtonModule,
    MultiSelectModule,TranslateModule,
    // MatSidenavModule,MatToolbarModule,MatIconModule,DragDropModule,
    // PaginatorModule,
    //     ConfirmDialogModule,
    //     ListboxModule, CalendarModule, 
   // EditorModule

  ],

  declarations: [LandingPageComponent, 
     //  DynamicFormsComponent,
    //  DynamicformsAddEditComponent, DynamicFormsPopupComponent, DynamicformslistComponent,SDragNDrop
    ],
     providers: [
     // ConfirmationService
  ],
})


export class HomeModule { }