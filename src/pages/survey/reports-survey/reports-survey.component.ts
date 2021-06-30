import { Component, OnInit ,Input, ViewChildren, ViewChild,ElementRef, Renderer2} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { GoogleChart } from '../../../directives/angular6-google-chart.directive';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from 'angular-google-charts';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';
declare var google: any;
import jsPDF from 'jspdf';
// import {jsPDF} from 'jspdf';
// declare var jsPDF: any;


import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reports-survey',
  templateUrl: './reports-survey.component.html',
  styleUrls: ['./reports-survey.component.css']
})
export class ReportsSurveyComponent implements OnInit {
  user: any;
  edit: any = {};
  showReports: any = []
  showReportsDemo: any = {}
  @ViewChildren( GoogleChart ) cartDirectiveRef;
  // @ViewChild('pieChart') pieChart: ElementRef



  
 charts: Array<{
  title: string,
  type: string,
  data: Array<any>,
  columnNames?: Array<string>,
  options?: {}
}> = [];

@ViewChild('chart')
chart: GoogleChartComponent;

  chartData: Array<any>;
 type: any = {};
 @ViewChild('content', {static: false}) content: ElementRef;


  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, private renderer: Renderer2) { 
      this.user = this.common.getUser();

    }

    downloadReport(){
      const doc = new jsPDF();

      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf");

    }



    generarPDF() {
      this.common.showLoading()
      const div = document.getElementById('content');
      const options = {
        background: 'white',
        scale: 3
      };
  
      html2canvas(div, options).then((canvas) => {
  
        var img = canvas.toDataURL("image/PNG");
        var doc = new jsPDF('l', 'mm', 'a4', 1);
  
        // Add image Canvas to PDF
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  
        return doc;
      }).then((doc) => {
        doc.save('postres.pdf');  
        this.common.hideLoading()

      });
    }

    
   
  
  

  ngOnInit(): void {
    myMethod();
    // this.loadJquery();
    selectSearchMethod();
    this.reportscall();

  

  }

  reportscall(){
  

    
    this.edit =  this.common.getSurveyId()
    if (!_.isEmpty(this.edit)) {
      let frame = {
        "ansColor": "string",
        "bgColor": "string",
        "bgImageByte": null,
        "bgImgString": "string",
        "code": 0,
        "companyId": 0,
        "config": "string",
        "createdBy": "string",
        "createdOn": "2021-06-23T10:00:05.078Z",
        "cutOffDate": "2021-06-23T10:00:05.079Z",
        "fontStyle": "string",
        "maxResponseCount": 0,
        "message": "string",
        "progressBar": 0,
        "quesColor": "string",
        "respCount": 0,
        "showQuesNo": 0,
        "surveyId": this.edit.surveyId,
        "surveyName": "string",
        "surveyStatus": 0,
        "surveyUrl": "string",
        "typeId": 0
      }

      google.charts.load('current', { 'packages': ['corechart'] });
      // google.charts.setOnLoadCallback(this.drawChart);
      this.drawChart()
      
      this.apiService.postSurvey(this.constantsService.surveyReport, frame).subscribe((succ: any) => {
        this.showReports = succ.ques[4]
        this.showReportsDemo = this.showReports.report
        console.log(this.showReportsDemo + "succ")
        var onbj1:any = {} ;
        // onbj1 =
        // {
        //   "data" : {
        //     "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ],
        //     "datasets" : [ {
        //       "data" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        //       "backgroundColor" : "rgba(68,102,11,0.571)",
        //       "borderWidth" : 2,
        //       "label" : "Opinion"
        //     } ]
        //   },
        //   "type" : "bar"
        // }

               onbj1 =
        {
          "data" : {
            "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ],
            "datasets" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
          },
          "type" : "bar"
        }

        console.log(onbj1['data'] + "onbj1")



      }, err => {
        this.common.hideLoading();
        console.log(err + "err")
      });

    }else{

      this.router.navigateByUrl("/");

    }
    window.scroll(0,0);

  }


  goDownload(format){
    setTimeout(() => {
    if(format === 'pdf'){
      $('.buttons-pdf').click()
    }

  },1000)

  }
  
  drawChart = () => {

    this.charts.push({
      title: 'Line Chart',
      type: 'LineChart',
      data: [
        ['Apr 19', 21],
        ['May 19', 15],
        ['June 19', 17],
        ['July 19', 19]
      ],
    });

    this.charts.push({
      title: 'Line Chart',
      type: 'LineChart',
      data: [
        ['April 19', 100],
        ['May 19', 117],
        ['June 19', 66],
        ['July 19', 103]
      ],
      options : {
        vAxis:{
          minValue: 0,
          maxValue: 160
        }
      }
    });
  
    const options = {
      title: 'My Daily Activities',
      legend: {position: 'top'}
    };
  
    // const chart = new google.visualization.PieChart(document.querySelector('#pieChart'));
  
    // chart.draw(data, options);
    this.type ="BarChart"
    for(var i=0 ; i < this.charts.length; i++){
      this.chartData  = this.charts[i].data

    }
    // this.chartData  = this.charts
  }

  ngAfterViewInit() {
    // google.charts.load('current', { 'packages': ['corechart'] });
    // google.charts.setOnLoadCallback(this.drawChart);
  }


}
