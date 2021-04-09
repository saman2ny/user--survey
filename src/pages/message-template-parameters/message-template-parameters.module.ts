import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthGuard } from 'src/guards/auth-guard.service';

import { ListMessageTemplateParametersComponent } from './list-message-template-parameters/list-message-template-parameters.component';
import { AddMessageTemplateParametersComponent } from './add-message-template-parameters/add-message-template-parameters.component';
import { SharedModule } from 'src/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [

  {
    path: '',
    component: ListMessageTemplateParametersComponent,
    
  },

  
  {
    path: 'message-template',
    component: AddMessageTemplateParametersComponent,
    
  },

]

@NgModule({
  declarations: [ListMessageTemplateParametersComponent, AddMessageTemplateParametersComponent],
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    CKEditorModule,

  ]
})
export class MessageTemplateParametersModule { }
