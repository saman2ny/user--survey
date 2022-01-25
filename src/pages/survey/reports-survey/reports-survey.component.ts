/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { Survey, SurveyTypeId } from 'src/models/survey';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reports-survey',
  templateUrl: './reports-survey.component.html',
  styleUrls: ['./reports-survey.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsSurveyComponent extends OnDestroyMixin implements OnInit {
  survey: Survey;
  single: any[];
  multi: any[];
  view: any[] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Attempted';
  showYAxisLabel = true;
  yAxisLabel = 'Answered';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  SurveyTypeId = SurveyTypeId;
  surverReports: any;
  getSurveyId: any;

  constructor(private common: CommonService,
    private apiService: ApiService,
    public constantsService: ConstantsService,
    private snapshotRouter: ActivatedRoute, private router: Router) {
    super();
    // this.getSurveyId = this.common.getSurveyId();
    this.getSurveyId = this.snapshotRouter.snapshot.queryParams.surveryId;

    if (this.getSurveyId) {
      this.loadDetails();
    } else {
      this.loadFail();
    }

    // this.loadDetails();

    // this.dates = [
    //   {
    //     id: 1, name: 'hello', single: [
    //       {
    //         name: 'Germany',
    //         value: 8940000
    //       },
    //       {
    //         name: 'USA',
    //         value: 5000000
    //       },
    //       {
    //         name: 'France',
    //         value: 7200000
    //       }
    //     ]
    //   },
    //   {
    //     id: 2, name: 'hello', single: [
    //       {
    //         name: 'Germany',
    //         value: 8940000
    //       },
    //       {
    //         name: 'USA',
    //         value: 5000000
    //       },
    //       {
    //         name: 'France',
    //         value: 7200000
    //       }
    //     ]
    //   },
    //   {
    //     id: 3, name: 'hello', single: [
    //       {
    //         name: 'Germany',
    //         value: 8940000
    //       },
    //       {
    //         name: 'USA',
    //         value: 5000000
    //       },
    //       {
    //         name: 'France',
    //         value: 7200000
    //       }
    //     ]
    //   },
    //   {
    //     id: 4, name: 'hello', single: [
    //       {
    //         name: 'Germany',
    //         value: 8940000
    //       },
    //       {
    //         name: 'USA',
    //         value: 5000000
    //       },
    //       {
    //         name: 'France',
    //         value: 7200000
    //       }
    //     ]
    //   }
    // ];

  }
  loadFail(): void {
    this.router.navigateByUrl('/');
  }

  loadDetails(): void {

    this.survey = {
      ansColor: 'string',
      bgColor: 'string',
      bgImageByte: [],
      bgImgString: 'string',
      code: 0,
      companyId: 0,
      config: 'string',
      createdBy: 'string',
      createdOn: '2021-06-23T10:00:05.078Z',
      cutOffDate: '2021-06-23T10:00:05.079Z',
      fontStyle: 'string',
      maxResponseCount: 0,
      message: 'string',
      progressBar: 0,
      quesColor: 'string',
      respCount: 0,
      showQuesNo: 0,
      surveyId: this.getSurveyId,
      surveyName: 'string',
      surveyStatus: 0,
      surveyUrl: 'string',
      typeId: 0
    };

    this.apiService.postSurvey(this.constantsService.surveyReport, this.survey).
      pipe(untilComponentDestroyed(this)).
      subscribe((succ: any) => {
        this.surverReports = succ.ques;
      }, err => {
        this.common.hideLoading();

      });
  }

  ngOnInit(): void {
    // Object.assign(this, { single });
  }

  onSelect(event): void {
    console.log(event);
  }

}
