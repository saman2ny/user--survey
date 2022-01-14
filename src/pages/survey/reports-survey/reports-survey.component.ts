/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, ElementRef, OnInit, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { Survey } from 'src/models/survey';


@Component({
  selector: 'app-reports-survey',
  templateUrl: './reports-survey.component.html',
  styleUrls: ['./reports-survey.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsSurveyComponent extends OnDestroyMixin implements OnInit {

  survey: Survey;
  // charts

  single: any[];
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  dates: { id: number; name: string; single: any }[];

  constructor(private common: CommonService,
    private apiService: ApiService,
    public constantsService: ConstantsService) {
    super();
    this.loadDetails();
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
      surveyId: 564,
      surveyName: 'string',
      surveyStatus: 0,
      surveyUrl: 'string',
      typeId: 0
    };

    this.apiService.postSurvey(this.constantsService.surveyReport, this.survey).
      pipe(untilComponentDestroyed(this)).
      subscribe((succ: any) => {
        console.log(succ.ques[0].report, 1);
        this.dates = JSON.parse(succ.ques[0].report);
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


  // export const single = [
  //   {
  //     name: 'Germany',
  //     value: 8940000
  //   },
  //   {
  //     name: 'USA',
  //     value: 5000000
  //   },
  //   {
  //     name: 'France',
  //     value: 7200000
  //   }
  // ];


