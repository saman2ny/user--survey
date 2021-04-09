import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-auditlog-summary',
  templateUrl: './auditlog-summary.component.html',
  styleUrls: ['./auditlog-summary.component.css']
})
export class AuditlogSummaryComponent implements OnInit {
  detailSummary = true;
  user: any;
  role: any = {};
  SearchValue:any;
  filterDetailsObj: any = {
    requestedDate: [new Date(), new Date()],
    processedDate: [new Date(), new Date()],
    serviceType: "",
    serviceStatus: "",
    includeCommentCheck: true,
    includeDetailsCheck: true,

  }
  summaryDetails: any = [];
  maxDate = new Date();
  serviceStatusMaster: any;
  serviceTypeMaster: any;
  hideUserColumn: boolean = false;
  isFirstTime: boolean = true;
  oTable: any;
  tableService: any = [];
  tableServiceType: any = [];
  tableFilter: any = {
    searchTypeFilter: "",
    includeCommentCheck: true,
    includeDetailsCheck: true,
  }
  summaryDetailsDummy: any;
  isFilterStatus: boolean;
  proccessedBy: any;
  constructor(public common: CommonService, public constantsService: ConstantsService, public apiService: ApiService, public router: Router) {

    this.user = this.common.getUser();
    this.role = this.common.getRole();
    // this.filterDetailsObj.requestedDate[0] = moment().subtract(1, 'da').toDate();
    // this.filterDetailsObj.processedDate[0] = moment().subtract(1, 'week').toDate();
    


    

    if (this.user.companyId == 0) {
      this.hideUserColumn = true;
    }
    if (this.user.data.adminUser) {
      this.hideUserColumn = true;
    }
    this.apiService.post(this.constantsService.getAduitLogReportMaster, {}).subscribe((succ: any) => {
      
      this.serviceStatusMaster = succ.data.serviceStatusMaster;
      this.serviceTypeMaster = succ.data.serviceTypeMaster;

      // this.filterDetailsObj.serviceType = this.serviceStatusMaster[0]
      // this.filterDetailsObj.serviceStatus = this.serviceTypeMaster[0]

    }, err => {
      this.common.hideLoading()

      
    }
    )

  }
  resetSearch() {
    this.SearchValue = '';
    $('.summaryDatatable').dataTable().fnDestroy();
    this.ngOnInit();
    }
  refresh() {
    this.filterDetailsObj = {
      requestedDate: [new Date(), new Date()],
      processedDate: [new Date(), new Date()],
      serviceType: "",
      serviceStatus: "",
      includeCommentCheck: true,
      includeDetailsCheck: true,
      // "channel":1
    }
  
    this.isFirstTime = true;

    // this.oTable.destroy();
    this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();
    this.loadData();
  }
  ngOnInit(): void {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
  }, 1000);
    // this.loadJquery();
    this.loadData();
  }
  loadData() {
    
    this.filterDetailsObj.fromRequestDate = moment(this.filterDetailsObj.requestedDate[0]).format("YYYY-MM-DD")
    this.filterDetailsObj.toRequestDate = moment(this.filterDetailsObj.requestedDate[1]).format("YYYY-MM-DD")
    this.filterDetailsObj.fromProcessedDate = moment(this.filterDetailsObj.processedDate[0]).format("YYYY-MM-DD")
    this.filterDetailsObj.toProcessedDate = moment(this.filterDetailsObj.processedDate[1]).format("YYYY-MM-DD")
    if (this.filterDetailsObj.includeCommentCheck) {
      this.tableFilter.includeCommentCheck = true;
    } else {
      this.tableFilter.includeCommentCheck = false;
    }

    if (this.filterDetailsObj.includeDetailsCheck) {
      this.tableFilter.includeDetailsCheck = true;
    } else {
      this.tableFilter.includeDetailsCheck = false;
    }
    this.common.showLoading();
    this.apiService.post(this.constantsService.getAuditLogReport, this.filterDetailsObj).subscribe((succ: any) => {
      
      $("#detailFilter").modal("hide")
      this.common.hideLoading()

      Object.assign(this.summaryDetails, succ.data.auditReportList)
      this.summaryDetailsDummy = succ.data.auditReportList;
      




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
      // this.tableService = succ.data.serviceStatusMaster;
      // this.tableServiceType = succ.data.serviceTypeMaster;
      this.tableService = []
      this.tableServiceType = []
      for (let i = 0; i < succ.data.serviceStatusMaster.length; i++) {
        let obj = {
          id: i + 1,
          name: succ.data.serviceStatusMaster[i],
          isChecked: true,
        }
        this.tableService.push(obj);
      }
      for (let i = 0; i < succ.data.serviceTypeMaster.length; i++) {
        let obj = {
          id: i + 1,
          name: succ.data.serviceTypeMaster[i],
          isChecked: true,

        }
        this.tableServiceType.push(obj);
      }
      // this.list=[{

      // }]

    }, err => {
      this.common.hideLoading()
      $("#detailFilter").modal("hide")

      
    }
    )
  }
  filter() {
    this.isFilterStatus = false;
    this.loadData();
  }
  clear() {
    // this.filterDetailsObj.requestedDate[0] = moment().subtract(3, 'month').toDate();
    // this.filterDetailsObj.processedDate[0] = moment().subtract(3, 'month').toDate();
    this.filterDetailsObj = {
      requestedDate: [new Date(), new Date()],
      processedDate: [new Date(), new Date()],
      serviceType: "",
      serviceStatus: "",
      includeCommentCheck: true,
      includeDetailsCheck: true,

    }
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
      this.loadJquery();
      this.common.hideLoading();
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



      var parentSelector = ".parentId";
      var tableSelector = ".summaryDatatable";

      // var table = $(tableSelector).DataTable({
      //   sScrollX: "100%"

      // });

      // new $.fn.dataTable.FixedColumns(table);
      changeRichScrollbar(parentSelector, tableSelector);
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
    }, 100);

  }
  clearFilter() {
    this.common.showLoading();
    this.summaryDetailsDummy = []
    this.oTable.destroy();
    this.isFilterStatus = false;
    for (let i = 0; i < this.tableService.length; i++) {
      this.tableService[i].isChecked = true;
    }
    this.summaryDetailsDummy = this.summaryDetails;
    this.reinitTable();
  }
  onStatusChange() {
    // this.oTable.clear()
    this.common.showLoading();
    this.summaryDetailsDummy = []
    this.oTable.destroy();
    this.isFilterStatus = false;
    for (let i = 0; i < this.tableService.length; i++) {
      if (this.tableService[i].isChecked) {
        for (let j = 0; j < this.summaryDetails.length; j++) {
          if (this.tableService[i].name == this.summaryDetails[j].txnSubCode) {
            this.summaryDetailsDummy.push(this.summaryDetails[j])
            this.isFilterStatus = true;
          }
        }
      }
    }
    this.reinitTable();

  }
  downloadReport(format) {

    
    this.common.showLoading();
    this.filterDetailsObj.fromRequestDate = moment(this.filterDetailsObj.requestedDate[0]).format("YYYY-MM-DD")
    this.filterDetailsObj.toRequestDate = moment(this.filterDetailsObj.requestedDate[1]).format("YYYY-MM-DD")
    this.filterDetailsObj.fromProcessedDate = moment(this.filterDetailsObj.processedDate[0]).format("YYYY-MM-DD")
    this.filterDetailsObj.toProcessedDate = moment(this.filterDetailsObj.processedDate[1]).format("YYYY-MM-DD")

    this.filterDetailsObj.isDownload = true
    this.filterDetailsObj.fileType = format;

    this.apiService.downloadFile(this.constantsService.auditLogReportDownload, this.filterDetailsObj).subscribe((succ: any) => {
      
      this.common.hideLoading();

      this.common.downloadFile(succ, "AuditLog Summary", format);
    }, err => {


      this.common.hideLoading();
      
    });

  }
}
