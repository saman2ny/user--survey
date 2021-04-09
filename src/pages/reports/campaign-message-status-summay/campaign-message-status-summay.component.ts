import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-campaign-message-status-summay',
  templateUrl: './campaign-message-status-summay.component.html',
  styleUrls: ['./campaign-message-status-summay.component.css']
})
export class CampaignMessageStatusSummayComponent implements OnInit {

  SearchValue:any;
  listMessageSummary: any = [];
  // reqObj: any = { };

  filterDetailsObj: any = {
    FromDate: [new Date(), new Date()],
    ToDate: [new Date(), new Date()],
  
  }
  reqObj: any = {
    "fromDate": moment(this.filterDetailsObj.FromDate[0]).subtract(60, 'days').format("YYYY-MM-DD"),
    "PageIndex": 1,
    "noOfRecords":10,
    "toDate": moment(this.filterDetailsObj.ToDate[0]).format("YYYY-MM-DD") 
}
  totalRecCount: any;
@Input('loadingDelay') public loadingDelay =  2000
page = 1;
  totalRec: any;
  maxDate = new Date();
  channels: any = [];
  isFilterStatus: boolean;
  user: any;
  role: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
      this.user = this.common.getUser();
      this.role = this.common.getRole();

      this.apiService.post(this.constantsService.getChannels, {}).subscribe((succ: any) => {

        this.channels = succ.data;
      });

     }

  resetSearch() {
    this.SearchValue = '';
    $('.dataTables_scrollBody').mCustomScrollbar('destroy');
    this.ngOnInit();
    }
  ngOnInit(): void {
    myMethod();
    selectSearchMethod();


    $(".search-input .icon-search").click(function () {
      $(this).parent(".search-input").addClass("active");
    });
    $(".search-input .closesearch").click(function () {
      $(this).parent(".search-input").removeClass("active");
    });
    $(".tablesearch-content").mCustomScrollbar({
      axis: "y",
      theme: "dark",
      scrollbarPosition: "inside",
      advanced: {
        updateOnContentResize: true
      }
    });
    setTimeout(() => {
      function changeRichScrollbar(parentSelector, tableSelector) {
        console.log('check')
        $(tableSelector + ' thead tr th').each(function(index, v) {
          // var style = $(v).attr('style');
          // $(v).css({
          //   cssText: style + "; height: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important;"
          // });
        });
        
        
        if ($(window).width() > 768) {
        $(parentSelector + ' .dataTables_scrollBody').mCustomScrollbar({
          axis: "x",
          scrollInertia: 0,
          theme: "dark",
          callbacks: {
            whileScrolling: function() {
              $(parentSelector + " .dataTables_scrollHead").scrollLeft(this.mcs.left * -1);
            },            
          },
        });
      } else {
        $('.dataTables_scrollBody').mCustomScrollbar('destroy');
      }
      $(window).resize(function () {
        if ($(window).width() > 768) {
          $(parentSelector + ' .dataTables_scrollBody').mCustomScrollbar({
            axis: "x",
            scrollInertia: 0,
            theme: "dark",
            callbacks: {
              whileScrolling: function() {
                $(parentSelector + " .dataTables_scrollHead").scrollLeft(this.mcs.left * -1);
              },             
            },
          });
        } else {
          $('.dataTables_scrollBody').mCustomScrollbar('destroy');
        }
      })
        $(parentSelector + ' .dataTables_scrollBody').css("border-bottom", "none");
      }

      
      
      var tableParentSelector = ".parentId";
      var tableSelector = ".datatable";
      var table = $(tableSelector).DataTable({
        sScrollX: "100%"
         
      });
      
      // new $.fn.dataTable.FixedColumns(table);
      changeRichScrollbar(tableParentSelector, tableSelector);
    }, 100);
    $(".user-arrow").on('click', function () {
      var thposition = $(this).parent("th").offset();
      var cthposition =  thposition.left + 30;
      var thdatavalue = $(this).parent("th").attr("data-val");      
      $(".userarrow-section_"+thdatavalue).css({        
        "left":cthposition
      });
      var thiselement = $(this);
      if ($(this).hasClass('filter-open')) {       
        $(".userarrow-section_"+thdatavalue+" .table-checkfilter").addClass("active");       
        setTimeout(function () {
          thiselement.removeClass('filter-open');
          thiselement.addClass('filter-close');
        }, 500);
      }
      if ($(this).hasClass('filter-close')) {
        $(".userarrow-section_"+thdatavalue+" .table-checkfilter").removeClass("active");
        setTimeout(function () {
          thiselement.removeClass('filter-close');
          thiselement.addClass('filter-open');
        }, 500);
      }
      $('.tablesearch-content').mCustomScrollbar('update');
      return false;
    });
  
  
  // this.reqObj = 
  //   {
 
  //     "fromDate": "2020-01-24",
  //     "toDate": "2020-12-04"     
  //   }
  this.listCall()
 
      
  }

  listCall(){
     //ListChannel
     this.apiService.post(this.constantsService.campaignSummary, this.reqObj).subscribe((succ: any) => {
      this.listMessageSummary = succ.data;
      this.totalRecCount =  this.listMessageSummary[0].totalRecords
      console.log(this.totalRecCount);

      

      var formDatedate = moment(this.reqObj.fromDate, 'YYYY-MM-DD')
      console.log(formDatedate.format('MM/DD/YYYY'), 'formDatedate')
      this.reqObj.fromDate = formDatedate.format('MM/DD/YYYY')

      
      this.filterDetailsObj.FromDate[0] = new Date(this.reqObj.fromDate)

      var toDatedate = moment(this.reqObj.toDate, 'YYYY-MM-DD')
      console.log(toDatedate.format('MM/DD/YYYY'), 'formDatedate')
      this.reqObj.toDate = toDatedate.format('MM/DD/YYYY')

      this.filterDetailsObj.ToDate[0] = new Date(this.reqObj.toDate)

      
    }, err => {
      
    })

    setTimeout(() => {
      this.totalRec = this.totalRecCount;
      console.log(this.totalRec);
      }, this.loadingDelay);
  }


  
  clear() {

    this.filterDetailsObj = {
      FromDate: [new Date(), new Date()],
      ToDate: [new Date(), new Date()],
    
    }



  this.reqObj.fromDate = moment(this.filterDetailsObj.FromDate[0]).subtract(30, 'days').format("YYYY-MM-DD")
  this.reqObj.toDate = moment(this.filterDetailsObj.ToDate[0]).format("YYYY-MM-DD") 
  this.reqObj.PageIndex =  1
  this.listCall()
    // this.filterDetailsObj.receivedDate[0] = moment().subtract(3, 'month').toDate();
    // this.filterDetailsObj.sentDate[0] = moment().subtract(3, 'month').toDate();
    // this.filterDetailsObj.deliveryDate[0] = moment().subtract(3, 'month').toDate();
  }


  close(){
    this.clear()
    
    // this.filterForm.get('ToDate').clearValidators()
    // this.filterForm.get('ToDate').updateValueAndValidity();
    $("#sidemodal").modal("hide")
    }

  handlePageChange(event) {
    this.page = event;
    console.log(event, "newPage")
    // ++this.reqObj.PageIndex;
    this.reqObj.PageIndex =  event ;
    this.reqObj.fromDate =   moment(this.filterDetailsObj.FromDate[0]).format("YYYY-MM-DD") ;
    this.reqObj.toDate =  moment(this.filterDetailsObj.ToDate[0]).format("YYYY-MM-DD") ;
    this.reqObj.noOfRecords = 10,

    console.log(this.reqObj, "PageIndex")

    this.listCall()


  }

  gotoMessageSatticsReport(one, two){
    let frame = {"FromDate": two.RECD_DATE_TIME, "ToDate":  two.RECD_DATE_TIME, "deliveryStatus": one,  "channel": this.filterDetailsObj.channelId,  "channelAddress": this.filterDetailsObj.channelAddress,"PageIndex": 1}

    this.common.setEditService(frame);

    this.router.navigateByUrl('/home/reports/campaignMessageDetailSummary');


  }

  
  filter() {
    this.isFilterStatus = false;
    this.reqObj.fromDate = moment(this.filterDetailsObj.FromDate[0]).format("YYYY-MM-DD")
    this.reqObj.toDate = moment(this.filterDetailsObj.ToDate[0]).format("YYYY-MM-DD")
    this.reqObj.channelAddress = this.filterDetailsObj.channelAddress
    this.reqObj.channel = parseInt(this.filterDetailsObj.channelId)
    this.reqObj.isDownload = false
    this.reqObj.deliveryStatus = this.filterDetailsObj.deliveryStatus
    this.reqObj.pageIndex = 1
    this.reqObj.noOfRecords = 10
    $("#sidemodal").modal("hide")

    this.listCall();
  }



  downloadReport(format) {


    this.common.showLoading();
    // this.filterDetailsObj.receivedFromDate = moment(this.filterDetailsObj.receivedDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.receivedToDate = moment(this.filterDetailsObj.receivedDate[1]).format("YYYY-MM-DD")
    // this.filterDetailsObj.sentFromDate = moment(this.filterDetailsObj.sentDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.sentToDate = moment(this.filterDetailsObj.sentDate[1]).format("YYYY-MM-DD")
    // this.filterDetailsObj.deliveryFromDate = moment(this.filterDetailsObj.deliveryDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.deliveryToDate = moment(this.filterDetailsObj.deliveryDate[1]).format("YYYY-MM-DD")

    // this.filterDetailsObj.isDownload = true
    // this.filterDetailsObj.fileType = format;


    var formDatedate = moment(this.reqObj.fromDate, 'MM/DD/YYYY')
    console.log(formDatedate.format('YYYY-MM-DD'), 'formDatedate')
    this.reqObj.fromDate = formDatedate.format('YYYY-MM-DD')

    var toDatedate = moment(this.reqObj.toDate, 'MM/DD/YYYY')
    console.log(toDatedate.format('YYYY-MM-DD'), 'formDatedate')
    this.reqObj.toDate = toDatedate.format('YYYY-MM-DD')

    this.reqObj.isDownload = true
    this.reqObj.fileType = format;


    this.apiService.downloadFile(this.constantsService.campaignSummaryDownload, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, "Message Statistics", format);
    }, err => {


      this.common.hideLoading();

    });

  }



}
