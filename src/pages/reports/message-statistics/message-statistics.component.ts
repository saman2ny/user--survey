import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'app-message-statistics',
  templateUrl: './message-statistics.component.html',
  styleUrls: ['./message-statistics.component.css']
})
export class MessageStatisticsComponent implements OnInit {
  user: any;
  role: any = {};
  SearchValue: any;
  filterDetailsObj: any = {
    receivedDate: [new Date(), new Date()],
    sentDate: [new Date(), new Date()],
    deliveryDate: [new Date(), new Date()],

    includeCommentCheck: true,
    includeDetailsCheck: true,
    "isDownload": false,
    "deliveryStatus": "",
    "channelId": "",
    "channelAddress": ""

    // "channel":1
  }
  tableFilter: any = {
    searchTypeFilter: "",
    includeCommentCheck: true,
    includeDetailsCheck: true,
  }
  summaryDetailsDummy: any;
  isFirstTime: any = true;
  oTable: any;
  isFilterStatus: boolean;
  maxDate = new Date();
  channels: any = []
  tableStatus: any = [
    {
      id: 1,
      name: "Success",
      isChecked: true,
    },
    {
      id: 2,
      name: "Failure",
      isChecked: true,

    },
    {
      id: 3,
      name: "Pending",
      isChecked: true,

    },
    {
      id: 4,
      name: "Blocked",
      isChecked: true,

    },
    {
      id: 5,
      name: "Expired",
      isChecked: true,

    },
    {
      id: 6,
      name: "OPT Out",
      isChecked: true,

    },
  ]
  summaryDetails: any = [];
  edit: any;
  filterDetailsObjs: any ={};
  page = 1;
  totalRecCount: any;


  constructor(public common: CommonService, public constantsService: ConstantsService, public apiService: ApiService, public router: Router) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    // this.filterDetailsObj.receivedDate[0] = moment().subtract(13, 'month').toDate();
    // this.filterDetailsObj.sentDate[0] = moment().subtract(13, 'month').toDate();
    // this.filterDetailsObj.deliveryDate[0] = moment().subtract(13, 'month').toDate();

    this.apiService.post(this.constantsService.getChannels, {}).subscribe((succ: any) => {

      this.channels = succ.data;
    });

  }
  refresh() {
    this.filterDetailsObj = {
      receivedDate: [new Date(), new Date()],
      sentDate: [new Date(), new Date()],
      deliveryDate: [new Date(), new Date()],

      includeCommentCheck: true,
      includeDetailsCheck: true,
      "isDownload": false,
      "deliveryStatus": "",
      "channelId": "",
      "channelAddress": ""
      // "channel":1
    }
    this.loadData();
  }

  ngOnInit(): void {

    // this.loadJquery();
    this.loadData();
  }
  loadData() {

    

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 1000);

    this.edit = this.common.getEditService()
    if (!_.isEmpty(this.edit)) {
console.log(this.edit['ToDate'], "this.edit['RECD_DATE_TIME']")
    // this.filterDetailsObj.receivedFromDate = moment(this.filterDetailsObj.receivedDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.receivedToDate = moment(this.filterDetailsObj.receivedDate[1]).format("YYYY-MM-DD")
    // this.filterDetailsObj.sentFromDate = moment(this.filterDetailsObj.sentDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.sentToDate = moment(this.filterDetailsObj.sentDate[1]).format("YYYY-MM-DD")
    // this.filterDetailsObj.deliveryFromDate = moment(this.filterDetailsObj.deliveryDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.deliveryToDate = moment(this.filterDetailsObj.deliveryDate[1]).format("YYYY-MM-DD")

    
    this.filterDetailsObjs.receivedFromDate = moment(this.edit['FromDate']).format("YYYY-MM-DD")
    this.filterDetailsObjs.receivedToDate = moment(this.edit['ToDate']).format("YYYY-MM-DD")
    // this.filterDetailsObjs.sentFromDate = moment(this.edit['FromDate']).format("YYYY-MM-DD")
    // this.filterDetailsObjs.sentToDate = moment(this.edit['ToDate']).format("YYYY-MM-DD")
    
    if(this.edit['deliveryStatus'] === null){
      this.filterDetailsObjs.deliveryStatus = null
    } 

    if(this.edit['deliveryStatus'] != null){
  this.filterDetailsObjs.deliveryStatus = JSON.stringify(this.edit['deliveryStatus'])
}
if(this.edit['channelAddress'] != null){
    this.filterDetailsObjs.channelAddress = this.edit['channelAddress']
} else {
  this.filterDetailsObjs.channelAddress = ""
}
if(this.edit['channel'] != null){
    this.filterDetailsObjs.channelId = this.edit['channel']
} else {
  this.filterDetailsObjs.channelId = ""
}
    this.filterDetailsObjs.isDownload = false


    
    this.common.showLoading();
    this.apiService.post(this.constantsService.messageStatisticsDetailReport, this.filterDetailsObjs).subscribe((succ: any) => {

      $("#detailFilter").modal("hide")
      this.common.hideLoading()

      // Object.assign(this.summaryDetails, succ.data)
      this.summaryDetailsDummy = succ.data;
      // this.totalRecCount =  this.summaryDetailsDummy[0].totalRecords






      if (this.isFirstTime) {
        this.isFirstTime = false

        setTimeout(() => {
          this.initTable();

        }, 1000);

      }
      else {
        // $(".summaryDatatable").dataTable().fnDestroy();
        this.oTable.destroy();

        this.reinitTable();

      }

      // this.list=[{

      // }]

    }, err => {
      this.common.hideLoading()
      $("#detailFilter").modal("hide")


    })
  }else{

  }

  }
  resetSearch() {
    this.SearchValue = '';
    $('.summaryDatatable').dataTable().fnDestroy();
    this.initTable();
  }
  initTable() {
    this.oTable = $(".summaryDatatable").DataTable({

      sScrollX: "100%",
      // searching: false, 
      aaSorting: [],
    })
    var oTableSearch = this.oTable
    $('#searchTextId').keyup(function () {
      oTableSearch.search($(this).val()).draw();

    })
    setTimeout(() => {
      this.common.hideLoading();
      this.loadJquery();

    }, 1000);
  }
  reinitTable() {

    // this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();

    setTimeout(() => {

      this.initTable();

    }, 1000);
  }
  onStatusChange() {
    // this.oTable.clear()
    this.common.showLoading()
    this.summaryDetailsDummy = []
    this.oTable.destroy();
    this.isFilterStatus = false;
    for (let i = 0; i < this.tableStatus.length; i++) {
      if (this.tableStatus[i].isChecked) {
        for (let j = 0; j < this.summaryDetails.length; j++) {
          if (this.tableStatus[i].id == this.summaryDetails[j].deliveryStatus) {
            this.summaryDetailsDummy.push(this.summaryDetails[j])
            this.isFilterStatus = true;
          }
        }
      }
    }
    this.reinitTable();

  }
  clearTableFilter() {
    this.summaryDetailsDummy = []
    this.oTable.destroy();
    this.isFilterStatus = false;
    for (let i = 0; i < this.tableStatus.length; i++) {
      this.tableStatus[i].isChecked = true;
    }
    this.summaryDetailsDummy = this.summaryDetails;
    this.reinitTable();
  }

  filter() {
   
    this.isFilterStatus = false;


    this.LoadFilter();
  }
  LoadFilter(){

    // this.filterDetailsObj.sentFromDate = moment(this.filterDetailsObj.sentDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.sentToDate = moment(this.filterDetailsObj.sentDate[1]).format("YYYY-MM-DD")
    this.filterDetailsObj.deliveryFromDate = moment(this.filterDetailsObj.deliveryDate[0]).format("YYYY-MM-DD")
    this.filterDetailsObj.deliveryToDate = moment(this.filterDetailsObj.deliveryDate[1]).format("YYYY-MM-DD")

    this.filterDetailsObj.channelAddress = this.filterDetailsObj.channelAddress
    this.filterDetailsObj.channel = parseInt(this.filterDetailsObj.channelId)
    this.filterDetailsObj.isDownload = false
    this.filterDetailsObj.deliveryStatus = this.filterDetailsObj.deliveryStatus
    this.filterDetailsObj.pageIndex = 1
    this.filterDetailsObj.noOfRecords = 10

    this.filterDetailsObj.receivedFromDate = this.filterDetailsObjs.receivedFromDate
    this.filterDetailsObj.receivedToDate =  this.filterDetailsObjs.receivedToDate

    this.apiService.post(this.constantsService.messageStatisticsDetailReport, this.filterDetailsObj).subscribe((succ: any) => {

      $("#detailFilter").modal("hide")
      this.common.hideLoading()

      // Object.assign(this.summaryDetails, succ.data)
      this.summaryDetailsDummy = succ.data;
      // this.page = 1
      // this.totalRecCount =  this.summaryDetailsDummy[0].totalRecords
      if (this.isFirstTime) {
        this.isFirstTime = false

        setTimeout(() => {
          this.initTable();

        }, 1000);

      }
      else {
        // $(".summaryDatatable").dataTable().fnDestroy();
        this.oTable.destroy();

        this.reinitTable();

      }



    }, err => {
      this.common.hideLoading()
      $("#detailFilter").modal("hide")


    })
  


  }

  close(){
    this.clear()
    
    // this.filterForm.get('ToDate').clearValidators()
    // this.filterForm.get('ToDate').updateValueAndValidity();
    $("#detailFilter").modal("hide")
    }

  clear() {

    this.filterDetailsObj = {
      receivedDate: [new Date(), new Date()],
      sentDate: [new Date(), new Date()],
      deliveryDate: [new Date(), new Date()],

      includeCommentCheck: true,
      includeDetailsCheck: true,
      "isDownload": false,
      "deliveryStatus": "",
      "channelId": "",

    }

    

    $("#detailFilter").modal("hide")
    this.loadData()
    // this.filterDetailsObj.receivedDate[0] = moment().subtract(3, 'month').toDate();
    // this.filterDetailsObj.sentDate[0] = moment().subtract(3, 'month').toDate();
    // this.filterDetailsObj.deliveryDate[0] = moment().subtract(3, 'month').toDate();
  }
  loadJquery() {
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

        $(tableSelector + ' thead tr th').each(function (index, v) {
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
              whileScrolling: function () {
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
                whileScrolling: function () {
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
      var tableSelector = ".summaryDatatable";
      // var table = $(tableSelector).DataTable({
      //   sScrollX: "100%"

      // });

      // new $.fn.dataTable.FixedColumns(table);
      changeRichScrollbar(tableParentSelector, tableSelector);
    }, 100);
    $(".user-arrow").on('click', function () {
      var thposition = $(this).parent("th").offset();
      var cthposition = thposition.left + 30;
      var thdatavalue = $(this).parent("th").attr("data-val");
      $(".userarrow-section_" + thdatavalue).css({
        "left": cthposition
      });
      var thiselement = $(this);
      if ($(this).hasClass('filter-open')) {
        $(".userarrow-section_" + thdatavalue + " .table-checkfilter").addClass("active");
        setTimeout(function () {
          thiselement.removeClass('filter-open');
          thiselement.addClass('filter-close');
        }, 500);
      }
      if ($(this).hasClass('filter-close')) {
        $(".userarrow-section_" + thdatavalue + " .table-checkfilter").removeClass("active");
        setTimeout(function () {
          thiselement.removeClass('filter-close');
          thiselement.addClass('filter-open');
        }, 500);
      }
      $('.tablesearch-content').mCustomScrollbar('update');
      return false;
    });
  }
  downloadReport(format) {


    this.common.showLoading();
    this.filterDetailsObj.receivedFromDate = this.filterDetailsObjs.receivedFromDate
    this.filterDetailsObj.receivedToDate =  this.filterDetailsObjs.receivedToDate
    // this.filterDetailsObj.sentFromDate = moment(this.filterDetailsObj.sentDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.sentToDate = moment(this.filterDetailsObj.sentDate[1]).format("YYYY-MM-DD")
    if(this.isFilterStatus === false){
    this.filterDetailsObj.deliveryFromDate = moment(this.filterDetailsObj.deliveryDate[0]).format("YYYY-MM-DD")
    this.filterDetailsObj.deliveryToDate = moment(this.filterDetailsObj.deliveryDate[1]).format("YYYY-MM-DD")
    }else{
      this.filterDetailsObj.deliveryFromDate = " "
      this.filterDetailsObj.deliveryToDate = " "
    }

    this.filterDetailsObj.isDownload = true
    this.filterDetailsObj.fileType = format;

    this.apiService.downloadFile(this.constantsService.messageStatisticsReportDownload, this.filterDetailsObj).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, "Message Statistics", format);
    }, err => {


      this.common.hideLoading();

    });

  }
}
