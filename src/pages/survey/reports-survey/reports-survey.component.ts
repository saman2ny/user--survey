/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, ElementRef, OnInit, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-reports-survey',
  templateUrl: './reports-survey.component.html',
  styleUrls: ['./reports-survey.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsSurveyComponent implements OnInit {

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

  constructor() {

this.dates = [
  {id: 1, name: 'hello', single: [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ]
},
  {id: 2, name: 'hello', single: [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ]},
  {id: 3, name: 'hello', single: [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ]},
  {id: 4, name: 'hello', single: [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ]}
];

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


