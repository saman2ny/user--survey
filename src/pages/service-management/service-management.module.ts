import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthGuard } from 'src/guards/auth-guard.service';

//Service-component
import { DefaultServicesComponent } from './default-services/default-services.component';
import { AddDefaultServicesComponent } from './default-services/add-default-services/add-default-services.component';

//Template-Parameters
import { AddTemplateParametersComponent } from './template-parameters/add-template-parameters/add-template-parameters.component';
import { ListTemplateParametersComponent } from './template-parameters/list-template-parameters/list-template-parameters.component';


//Message-Templates
import { ListMessageTemplatesComponent } from './message-templates/list-message-templates/list-message-templates.component';

import { AddMessageTemplatesComponent } from './message-templates/add-message-templates/add-message-templates.component';
import { ShowDatePipe } from 'src/pipes/show-date.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateModule } from '@ngx-translate/core';

import { DropdownModule } from 'primeng/dropdown';


import { MultiSelectModule } from 'primeng/multiselect';
import { MaskTypeComponent } from './mask-type/mask-type.component';
import { ListMaskComponent } from './mask-type/list-mask/list-mask.component';



const routes: Routes = [


  {
    path: '',
    component: ListTemplateParametersComponent,
    
  },

  
  {
    path: 'add-template',
    component: AddTemplateParametersComponent,
    
  },



    
  {
    path: 'default-services',
    component: DefaultServicesComponent,
    
  },
  {
    path: 'add-default-services',
    component: AddDefaultServicesComponent,
    
  },

  
  {
    path: 'message-templates',
    component: ListMessageTemplatesComponent,
    
  },
       
  {
    path: 'add-message-templates',
    component: AddMessageTemplatesComponent,
    
  },
  {
    path: 'list-mask',
    component: ListMaskComponent,
    
  },
  {
    path: 'mask-type',
    component: MaskTypeComponent,
    
  },

  

];

@NgModule({
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    DropdownModule,
    MultiSelectModule,
    SharedModule,
    CKEditorModule,

  ],
  entryComponents: [],
  declarations: [  AddTemplateParametersComponent, ListTemplateParametersComponent,  DefaultServicesComponent, AddDefaultServicesComponent, ListMessageTemplatesComponent, AddMessageTemplatesComponent, MaskTypeComponent, ListMaskComponent  ],

})
export class ServiceManagementModule { }
