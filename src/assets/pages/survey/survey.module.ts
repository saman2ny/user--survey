import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';


import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorCircleModule } from 'ngx-color/circle'


import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';

import {SliderModule} from 'primeng/slider';


const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyAdm4mSab0cqZLEpGbQjpG7mDfM87pSAzQ'
};

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ListSurveyComponent } from './list-survey/list-survey.component';
import { PostSurveyComponent } from './post-survey/post-survey.component';
import { ReportsSurveyComponent } from './reports-survey/reports-survey.component';
import { GoogleChartsModule } from 'angular-google-charts';


const routes: Routes = [


  {
    path: '',
    component: ListSurveyComponent,
    
  },
  {
    path: 'post-survey',
    component: PostSurveyComponent,
    
  },
  // {
  //   path: 'reports-survey/:surveyId',
  //   component: ReportsSurveyComponent,
    
  // },
]
@NgModule({
  declarations: [ListSurveyComponent, PostSurveyComponent],
  imports: [
    SliderModule,
    ColorSketchModule,
    ColorCircleModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    DropdownModule,
    MultiSelectModule,
    FontPickerModule,
    GoogleChartsModule
    ],
    providers: [
      {
        provide: FONT_PICKER_CONFIG,
        useValue: DEFAULT_FONT_PICKER_CONFIG
      }
    ]
})
export class SurveyModule { }
