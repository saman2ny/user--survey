import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignUploadComponent } from './campaign-upload/campaign-upload.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/shared/shared.module';
import { CampaignMessageStatusSummayComponent } from './campaign-message-status-summay/campaign-message-status-summay.component';
import { CampaignMessageDetailSummayComponent } from './campaign-message-detail-summay/campaign-message-detail-summay.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GenericReportsComponent } from './generic-reports/generic-reports.component';
import { AuditlogReportComponent } from './auditlog-report/auditlog-report.component';
import { MessageStatisticsComponent } from './message-statistics/message-statistics.component';
import { AuditlogSummaryComponent } from './auditlog-summary/auditlog-summary.component';
import { MessageSummaryComponent } from './message-summary/message-summary.component';
import { MessageSummaryDetailComponent } from './message-summary/message-summary-detail/message-summary-detail.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


const routes: Routes = [

  {
    path: 'campaignUpload',
    component: CampaignUploadComponent,

  },
  {
    path: 'campaignMessageStatusSummary',
    component: CampaignMessageStatusSummayComponent,

  },
  {
    path: 'campaignMessageDetailSummary',
    component: CampaignMessageDetailSummayComponent,

  },
  {
    path: 'app-generic-reports',
    component: GenericReportsComponent,

  },
  {
    path: 'app-auditlog-report',
    component: AuditlogReportComponent,

  },
  {
    path: 'app-message-statistics',
    component: MessageStatisticsComponent,

  },
  {
    path: 'app-auditlog-summary',
    component: AuditlogSummaryComponent,

  },
  {
    path: 'app-message-summary',
    component: MessageSummaryComponent,

  },
  {
    path: 'app-message-summary-detail',
    component: MessageSummaryDetailComponent,

  }

];
@NgModule({
  declarations: [CampaignUploadComponent, CampaignMessageStatusSummayComponent, CampaignMessageDetailSummayComponent, GenericReportsComponent, AuditlogReportComponent, MessageStatisticsComponent, AuditlogSummaryComponent, MessageSummaryComponent, MessageSummaryDetailComponent],
  imports: [
    CommonModule,TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DropdownModule,
    NgxPaginationModule,
    MultiSelectModule,
  ]
})
export class ReportsModule { }
