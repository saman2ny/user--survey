import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsSurveyComponent } from './reports-survey.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [ReportsSurveyComponent],
  imports: [
    CommonModule,
    // ReportsSurveyRoutingModule,
    RouterModule.forChild([
      {       
        
        path: '',
        component: ReportsSurveyComponent
      }
      ]),
      FormsModule,
    NgxChartsModule
  ],
  exports: [
    ReportsSurveyComponent
  ]
})
export class ReportsSurveyModule { }
