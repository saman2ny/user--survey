import { Component, OnInit ,Input, ViewChildren, ViewChild,ElementRef, Renderer2, HostListener} from '@angular/core';
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
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
@HostListener('window:resize', ['$event'])

  chartData: Array<any>;
 type: any = {};
 @ViewChild('content', {static: false}) content: ElementRef;
  listQuestionTypes: any = [];
  chartsDemo: any;
  chartsAndReports: any = [];





  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, private renderer: Renderer2) { 
      this.user = this.common.getUser();

      
    this.apiService.getSurvey(this.constantsService.fetchQuestionType, {}).subscribe((succ: any) => {
      console.log(succ, "listQuestion")


      this.listQuestionTypes = succ


    }, err => {
      this.common.hideLoading()


    })

    }



    async  generarPDF() {
      this.common.showLoading()
      // const div = document.getElementById('content');
      // const options = {
      //   background: 'white',
      //   scale: 3
      // };
  
      // html2canvas(div, options).then((canvas) => {
  
      //   var img = canvas.toDataURL("image/PNG");
      //   var doc = new jsPDF('p', 'mm', 'a4', 1);
  
      //   // Add image Canvas to PDF
      //   const bufferX = 5;
      //   const bufferY = 5;
      //   const imgProps = (<any>doc).getImageProperties(img);
      //   const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      //   return doc;
      // }).then((doc) => {
      //   var d = new Date().toISOString().slice(0, 19).replace(/-/g, "");
      //   var filename = 'report_' + d + '.pdf';
      //   doc.save(filename);  
      //   this.common.hideLoading()

      // });














      // const div = document.getElementById('content');


      // var HTML_Width = $("#content").width();
      // var HTML_Height = $("#content").height();
      // var top_left_margin = 15;
      // var PDF_Width = HTML_Width+(top_left_margin*2);
      // var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
      // var canvas_image_width = HTML_Width;
      // var canvas_image_height = HTML_Height;
      
      // var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
      
  
      // html2canvas($("#content")[0],{allowTaint:true}).then(function(canvas) {
      //   canvas.getContext('2d');
        
      //   console.log(canvas.height+"  "+canvas.width);
        
        
      //   var imgData = canvas.toDataURL("image/jpeg", 1.0);
      //   var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
      //     pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        
        
      //   for (var i = 1; i <= totalPDFPages; i++) { 
      //     pdf.addPage(PDF_Width, PDF_Height);
      //     pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      //   }
      //           var d = new Date().toISOString().slice(0, 19).replace(/-/g, "");
      //   var filename = 'report_' + d + '.pdf';
      //     pdf.save(filename);

      //     });
















      //       const div = document.getElementById('content');
      // const options = {
      //   background: 'white',
      //   scale: 3
      // };
  
      // html2canvas(div, options).then((canvas) => {
      //   console.log(div, "div")
      //   var img = canvas.toDataURL("image/PNG");
      //   var doc = new jsPDF('p', 'mm', 'a4');
  
      //   // Add image Canvas to PDF
      //   const bufferX = 5;
      //   const bufferY = 5;
      //   const imgProps = (<any>doc).getImageProperties(img);
      //   const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX;
      //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      //   // return doc;
      //   var d = new Date().toISOString().slice(0, 19).replace(/-/g, "");
      //   var filename = 'report_' + d + '.pdf';
      //   doc.save(filename);  
      // })








      const doc = new jsPDF('p', 'mm', 'a4');
      const options = {
        pagesplit: true
      };
      // const ids = document.querySelectorAll('[id]');
      const ids = document.querySelectorAll('[class=content]');
              const length = ids.length;

              // for (let i = 0; i < length; i++) {
              //   const chart = document.getElementById(ids[i].id);
              //   console.log(chart, "checkserrrrr")
              // }

      for (let i = 0; i < length; i++) {
        const chart = document.getElementById(ids[i].id);
        console.log(chart, "chartiiiiii")

        // excute this function then exit loop
        await html2canvas(chart, { scale: 3 }).then(function (canvas) { 
          doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 50, 200, 150);
          if (i < (length - 1)) {
            doc.addPage();
          }
        });
        console.log(i, "iiiiii")
      }

      // download the pdf with all charts
              var d = new Date().toISOString().slice(0, 19).replace(/-/g, "");
        var filename = 'report_' + d + '.pdf';
      doc.save(filename);
    
      this.common.hideLoading()




    }

    
  //  search with this query
  //   iterate pages html2canvas based on array
  

  ngOnInit(): void {
    const surverId = this.activatedRoute.snapshot.params.surveyId
    console.log(surverId, "surverId")
    myMethod();
    selectSearchMethod();
    this.reportscall(surverId);

  

  }

  reportscall(surverId){
  

    
    this.edit =  this.common.getSurveyId()
    if (!_.isEmpty(this.edit)) {
      let frame = {
        "ansColor": "string",
        "bgColor": "string",
        "bgImageByte": null,
        "bgImgString": null,
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
        "surveyId": surverId,
        "surveyName": "string",
        "surveyStatus": 0,
        "surveyUrl": "string",
        "typeId": 0
      }

      google.charts.load('current', { 'packages': ['corechart'] });
      this.common.showLoading()

      // this.drawChart()
      
      this.apiService.postSurvey(this.constantsService.surveyReport, frame).subscribe((succ: any) => {
        this.showReports = succ.ques
        console.log(JSON.stringify(succ.ques) + "succ")
        for(var i=0 ; i < this.showReports.length; i++){

          if(this.showReports[i].quesTypeId === 2){
            var reports= JSON.parse(this.showReports[i].report)
            for(var w=0 ; w < reports.length; w++){
              this.charts.push({
                title: 'Line Chart',
                type: 'LineChart',
                data: [
                  for (var k in reports) {
                    if (reports.hasOwnProperty(k)) {
                       user[k] = reports[k];
                    }
                },
                  // [
                    
                    
                      // this.showReports[i].ansList[w].ansText, this.showReports[i].ansList[w].attempted]
                // ],
              });
         
            }
            
            let chrts = {"chartss": this.charts}
            console.log(chrts, "chrts");
            this.showReports[i].charts = this.charts

          }

          // if(this.showReports[i].quesTypeId === "2"){
          //   if(!this.showReports[i].ansList){return null}else{

          //   }

          // }

          
        //   if(this.showReports[i].quesTypeId === 3){
        //     if(this.showReports[i].ansList.length === 0){
        //       this.showReports[i].charts = []

        //     }else{            
          
        //     for(var w=0 ; w < this.showReports[i].ansList.length; w++){
        //       this.charts.push({
        //         title: 'Line Chart',
        //         type: 'LineChart',
        //         data: [
        //           [this.showReports[i].ansList[w].ansText, this.showReports[i].ansList[w].attempted]
        //         ],
        //       });
         
        //     }
            
        //     let chrts = {"chartss": this.charts}
        //     console.log(chrts, "chrts");
        //     this.showReports[i].charts = this.charts

        //   }
        // }

                
          // if(this.showReports[i].quesTypeId === "6"){
          //   if(!this.showReports[i].ansList){return null}else{

          //   }
          // }

                     
          // if(this.showReports[i].quesTypeId === "7"){
           
          // }


        }

        // this.drawChart()
        console.log(this.showReports, "an2ny");

        this.common.hideLoading();

      }, err => {
        this.common.hideLoading();
        console.log(err + "err")
      });

    }else{

      this.router.navigateByUrl("/");

    }
    window.scroll(0,0);

  }


  getDataText(id) {
    let findedData = this.listQuestionTypes.find(i => i.quesTypeId === id);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.quesTypeDesc;
} 

  drawChart = () => {
    this.common.showLoading()

    this.charts.push({
      title: 'Line Chart',
      type: 'LineChart',
      data: [
        ['Apr 111', 111],
        ['May 123', 123],
        ['June 124', 124],
        ['July 125', 125]
      ],
    });

    this.charts.push({
      title: 'Line Chart',
      type: 'LineChart',
      data: [
        ['Apr 31', 21],
        ['May 31', 15],
        ['June 31', 17],
        ['July 31', 19]
      ],
    });


    this.charts.push({
      title: 'Line Chart',
      type: 'LineChart',
      data: [
        ['Apr 21', 21],
        ['May 21', 15],
        ['June 21', 17],
        ['July 21', 19]
      ],
    });

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
  
    this.type ="BarChart"
    // this.chartsDemo = []
    for(var i=0 ; i < this.charts.length; i++){
      this.chartData  = this.charts[i].data

    }
    // this.chartData  = this.charts
    var chartsandreports = {"reports": this.showReports, "charts": this.charts}
   this.chartsAndReports = chartsandreports
    console.log(chartsandreports, "22222222222222222222222")
    this.common.hideLoading();

  }

  


}
