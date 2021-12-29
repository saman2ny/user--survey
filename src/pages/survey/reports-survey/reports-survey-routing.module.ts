import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsSurveyComponent } from './reports-survey.component';



const routes: Routes = [
    {
        path: '',
        component: ReportsSurveyComponent

    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ReportsSurveyRoutingModule { }
