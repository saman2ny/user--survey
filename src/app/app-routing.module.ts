import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

 
  {
    path: '',
    loadChildren: () => import('src/pages/home/home.module')
    .then(m => m.HomeModule)
  },


  {
    path: 'demo-reports',
    loadChildren: () => import('src/pages/survey/reports-survey/reports-survey.module')
    .then(m => m.ReportsSurveyModule)
  }
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
