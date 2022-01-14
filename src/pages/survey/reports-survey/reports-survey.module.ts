import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsSurveyComponent } from './reports-survey.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github
};

@NgModule({
  declarations: [ReportsSurveyComponent],
  imports: [
    CommonModule,
    FeatherModule.pick(icons),
    RouterModule.forChild([
      {

        path: '',
        component: ReportsSurveyComponent
      }
      ]),
      FormsModule,
    NgxChartsModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [
    ReportsSurveyComponent
  ]
})
export class ReportsSurveyModule { }
