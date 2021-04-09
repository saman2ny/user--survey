import {Directive, ElementRef, Input, Output, OnInit, EventEmitter, HostBinding, HostListener} from '@angular/core';
declare const google: any;
declare let googleLoaded: any;
declare const googleChartsPackagesToLoad: any;


@Directive({
    selector: '[GoogleChart]'
})

  export class GoogleChart implements OnInit {
    public _element: any;
    tempChartData;
    tempChartType;
    tempChartOptions;
    tempChartColumn;
    tempEle;
    @Input('chartType') public chartType: string;
    @Input('chartOptions') public chartOptions: Object;
    @Input('loadingDelay') public loadingDelay = 0;
    @Input('chartData') public chartData: Object;
    @Input('chartColumn') public chartColumn: Object;
    @Output('itemSelect') public itemSelect: EventEmitter<{ row: number, column: number }> = new EventEmitter();
    @Output('itemDeselect') public itemDeselect: EventEmitter<void> = new EventEmitter<void>();

    constructor(public element: ElementRef) {
        this._element = this.element.nativeElement;
    }

    ngOnInit() {
        if (!googleLoaded) {
            googleLoaded = true;
            google.charts.load('visualization', '1.1', {'packages': ['controls']});
        }
        setTimeout(() => this.drawGraph(this.chartOptions, this.chartType, this.chartData, this.chartColumn, this._element), this.loadingDelay);
    }

    drawGraph(chartOptions,chartType,chartData,chartColumn,ele) {

        // storing temporary data for @HostListener on reszie event
        this.tempChartOptions = chartOptions;
        this.tempChartType = chartType;
        this.tempChartData = chartData;
        this.tempChartColumn = chartColumn;
        this.tempEle = ele;


        if(chartData == null || chartData == "") {
           
           return;
        }

        
       

        google.charts.setOnLoadCallback(drawChart);
        const self = this;
        function drawChart() {

            // condtion to check chart is a simple chart or range chartType
            // if it has chartControls as parameter than its range chart else simole chart
            
            if(chartColumn) {


                          var data = new google.visualization.DataTable();

                          //  setting columns for chart
                          chartColumn = JSON.parse(chartColumn);
                          for(var i=0; i<chartColumn.length; i++) {
                             data.addColumn(chartColumn[i].colType,chartColumn[i].colName);
                          }

                         chartData = JSON.parse(chartData);
						 
                         for(var i=0; i < chartData.length; i++) {
                           var newDate = new Date(chartData[i][0]);
                           chartData[i][0] = newDate;
                         }
                         
                         data.addRows(chartData);


//Important
				var date_formatter = new google.visualization.DateFormat({ 
					pattern: "MM/dd/yyyy hh:mm"
				}); 
				date_formatter.format(data, 0);


                         const wrapper = new google.visualization.ChartWrapper({
                                 chartType: chartType,
                                 dataTable: data,
                                 options: chartOptions || {}
                          });
                          wrapper.draw(ele);





            } else {
                        chartData = JSON.parse(chartData);
                        const wrapper = new google.visualization.ChartWrapper({
                                chartType: chartType,
                                dataTable: chartData,
                                options: chartOptions || {}
                         });
                         wrapper.draw(ele);



            }

        }
    }

    @HostListener('window:resize') onResize() {
      this.drawGraph(this.tempChartOptions,this.tempChartType,this.tempChartData,this.tempChartColumn,this.tempEle);
    }
}
