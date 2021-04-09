import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import * as moment from 'moment';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';

@Component({
  selector: 'app-campaign-message-detail-summay',
  templateUrl: './campaign-message-detail-summay.component.html',
  styleUrls: ['./campaign-message-detail-summay.component.css']
})
export class CampaignMessageDetailSummayComponent implements OnInit {


  isFilterStatus: boolean;

  user: any = {};
  campaginList: any = [];
  reqObj = {
    "channelId": 0,
    "campaignId": 0,
    "campaignStatus": 0,
    "noOfRecords": 100000,
    "pageIndex": 1,
    "fileType": "",
    "isDownload": false,
    "Date": [new Date(), new Date()],
    "fromDate": "",
    "toDate": "",
    "createdfromDate": "",
    "createdtoDate": "",
    "channelAddress": ""
  }
  campaignStatus: any = [
    {
      id: 1,
      name: "Pending Approval"
    },
    {
      id: 2,
      name: "Approved"
    },
    {
      id: 3,
      name: "Reject"
    },
    {
      id: 4,
      name: "Scheduled"
    },
    {
      id: 5,
      name: "Delivery Success"
    },
    {
      id: 6,
      name: "Delivery Failure"
    },
  ];
  maxDate: any = new Date();
  isScroll: boolean;
  role: any;
  channelList: any;
  campaignNames: any;
  campaignName: any;
  oTable: any;
  isFirstTime: boolean = true;
  SearchValue: string = "";
  edit: any;
  totalRecCount: any;
  page: number;
  constructor(private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser()
    this.role = this.common.getRole();



    this.apiService.post(this.constantsService.getChannel, {}).subscribe((succ: any) => {

      this.common.hideLoading()
      this.channelList = succ.data.channel;
      this.onChannelChange(0);
      this.getData();
      // this.list=[{

      // }]

    }, err => {
      this.common.hideLoading()


    }
    )
  }
  ngOnInit() {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 1000);
  }
  getData() {

    this.common.showLoading();

    this.edit = this.common.getEditService()
    if (!_.isEmpty(this.edit)) {
console.log(this.edit['ToDate'], "this.edit['RECD_DATE_TIME']")




if(this.edit['campaignStatus'] === null){
  this.reqObj.campaignStatus = null
} 

if(this.edit['campaignStatus'] != null){
this.reqObj.campaignStatus = this.edit['deliveryStatus']
}
if(this.edit['channelAddress'] != null){
this.reqObj.channelAddress = this.edit['channelAddress']
} else {
this.reqObj.channelAddress = ""
}
if(this.edit['channel'] != null){
this.reqObj.channelId = this.edit['channel']
}


    this.reqObj.isDownload = false;
    


    this.reqObj.createdfromDate = moment(this.edit['FromDate']).format("YYYY-MM-DD")
    this.reqObj.createdtoDate = moment(this.edit['FromDate']).format("YYYY-MM-DD")

    this.apiService.post(this.constantsService.campaignMessageDetailReportUserLevel, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();
      console.log(succ);
      this.campaginList = succ.data;
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
      this.common.hideLoading();


    }
    )
  }

  }
  initTable() {
    this.oTable = $(".summaryDatatable").DataTable({

      sScrollX: "100%",
      dom: 'Bfrtip',
      // buttons: true,
      // widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto','auto'],
      // pageSize: 'A0',
      buttons: [
        // 'copy', 
        { extend: "excel", title: this.role.menuLabel, className: "buttonsToHide" },
        {
          extend: "pdfHtml5",
          title: this.role.menuLabel,
          // orientation: 'landscape',
          pageSize: 'A3',
          className: "buttonsToHide",
          // customize: function (doc) {
          //   doc.defaultStyle.fontSize = 20; //2,3,4,etc doc.styles.tableHeader.fontSize = 1; //2, 3, 4, etc }
          // }
        }
        // 'pdf',
        // 'print'
      ],
      aaSorting: [],
    })
    var oTableSearch = this.oTable
    $('#searchTextId').keyup(function () {
      oTableSearch.search($(this).val()).draw();

    })
    setTimeout(() => {
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
  ngOnDestroy() {

    this.reqObj = {
      "channelId": 0,
      "campaignId": 0,
      "campaignStatus": 0,
      "noOfRecords": 10,
      "pageIndex": 1,
      "fileType": "",
      "isDownload": false,
      "Date": [new Date(), new Date()],
      "fromDate": "",
      "toDate": "",
      "createdfromDate": "",
      "createdtoDate": "",
      "channelAddress": ""
    }
  }

  onScroll() {

    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.getData();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();

  }
  clear() {
    this.refresh();
  }
  onChange(id) {

  }
  resetSearch() {
    this.SearchValue = '';
    // $('.summaryDatatable').dataTable().fnDestroy();
    // this.initTable();
  }
  refresh() {
    this.reqObj = {
      "channelId": 0,
      "campaignId": 0,
      "campaignStatus": 0,
      "noOfRecords": 10,
      "pageIndex": 1,
      "fileType": "",
      "isDownload": false,
      "Date": [new Date(), new Date()],
      "fromDate": "",
      "toDate": "",
      "createdfromDate": "",
      "createdtoDate": "",
      "channelAddress": ""
    }
    this.getData()
  }
  onCampaignChange() {

    // this.campaignName=this.campaignNames[index].campaignDesc
    // this.apiService.post(this.constantsService.getChannelByCampaginName, { campaignId: id }).subscribe((succ: any) => {

    //   this.common.hideLoading();

    //   this.channelList = succ.data;


    // }, err => {


    //   this.common.hideLoading();

    // });
  }

  onChannelChange(id) {



    this.apiService.post(this.constantsService.getCampaginNameByChannel, { channelId: id }).subscribe((succ: any) => {

      this.common.hideLoading();

      this.campaignNames = succ.data;
      // this.initTable();

    }, err => {


      this.common.hideLoading();

    });
  }

  getReport() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.isFilterStatus = false

    this.LoadFilter();
  }


  LoadFilter(){

    this.reqObj.fromDate = moment(this.reqObj.Date[0]).format("YYYY-MM-DD");
    this.reqObj.toDate = moment(this.reqObj.Date[1]).format("YYYY-MM-DD");

    this.reqObj.channelAddress = this.reqObj.channelAddress
    this.reqObj.campaignId =this.reqObj.campaignId 
    this.reqObj.channelId =this.reqObj.channelId 
    this.reqObj.isDownload = false
    this.reqObj.campaignStatus = this.reqObj.campaignStatus
    this.reqObj.pageIndex = 1
    this.reqObj.noOfRecords = 10

    this.reqObj.createdfromDate = this.reqObj.createdfromDate 
    this.reqObj.createdtoDate =  this.reqObj.createdtoDate

    this.apiService.post(this.constantsService.campaignMessageDetailReportUserLevel, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();
      console.log(succ);
      $("#detailFilter").modal("hide")

      this.campaginList = succ.data;
      // this.page = 1
      // this.totalRecCount =  this.campaginList[0].totalRecords
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
      $("#detailFilter").modal("hide")

      this.common.hideLoading();


    }
    )



  }


  close(){
    this.clear()
    
    // this.filterForm.get('ToDate').clearValidators()
    // this.filterForm.get('ToDate').updateValueAndValidity();
    $("#detailFilter").modal("hide")
    }
    

  downloadReport(format) {


    // if (format == 'pdf')
    //   $('.buttons-pdf').click()
    // else if (format == 'xlsx')
    //   $('.buttons-excel').click()
    // else if (format == 'csv')
    //   $('.buttons-csv').click()

    this.common.showLoading();
    // var dist = { distributionId: distribution.distributionId }

      
    
      
    this.reqObj.createdfromDate = this.reqObj.createdfromDate
    this.reqObj.createdtoDate =  this.reqObj.createdtoDate

    if(this.isFilterStatus === false){
      this.reqObj.fromDate = moment(this.reqObj.Date[0]).format("YYYY-MM-DD")
      this.reqObj.toDate = moment(this.reqObj.Date[1]).format("YYYY-MM-DD")
      }else{
        this.reqObj.fromDate = ""
        this.reqObj.toDate = ""
      }

    this.reqObj.isDownload = true;
    this.reqObj.fileType = format;

    this.apiService.downloadFile(this.constantsService.campaignMessageDetailReportDownload, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, "CampaignMessageDetails", format);
    }, err => {


      this.common.hideLoading();

    });

  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
  getChannelName(id) {
    if (this.channelList.length == 0)
      return;
    let channels = this.channelList.filter(
      depart => {
        if (depart.channelId == id)
          return depart;

        // book.BrandName.toLowerCase().indexOf(id) > -1
      });

    if (channels.length)
      return channels[0].channelDesc
  }

}
