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
  selector: 'app-generic-reports',
  templateUrl: './generic-reports.component.html',
  styleUrls: ['./generic-reports.component.css']
})
export class GenericReportsComponent implements OnInit {
  SearchValue: any;
  detailSummary = true;
  user: any;
  role: any = {};
  filterDetailsObj: any = {
    requestedDate: [new Date(), new Date()],
    processedDate: [new Date(), new Date()],
    serviceType: "",
    serviceStatus: "",
    userType: "",
    roles: [],
    menus: [],
    groupList: [],
    privilegeList: [],


  };
  statusCompany: any = true;
  statusBranch: any = true;
  statusSuperAdmin: any = true
  listUserType: any = [];
  listMainOperator: any = [];
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
    searchTypeFilter: ""
  };
  summaryDetailsDummy: any;
  isFilterStatus: boolean;
  privilegeList: any;
  roleMaster: any;
  tableStatus: any = [
    {
      id: 1,
      name: "Active",
      isChecked: true,
    },
    {
      id: 2,
      name: "Inactive",
      isChecked: true,

    },
  ];
  companyMaster: any = [];
  branchMaster: any = [];
  isSuperAdmin: boolean;
  ischangeModifiedDate: boolean;

  constructor(public common: CommonService, public constantsService: ConstantsService, public apiService: ApiService, public router: Router) {

    this.user = this.common.getUser();
    this.role = this.common.getRole();
    // this.filterDetailsObj.requestedDate[0] = moment().subtract(2, 'days').toDate();





    if (this.user.companyId == 0) {
      this.hideUserColumn = true;
      this.isSuperAdmin = true;

    }
    if (this.user.data.adminUser) {
      this.hideUserColumn = true;
      this.isSuperAdmin = false;
    }
    this.apiService.post(this.constantsService.getUserProfileReportMaster, {}).subscribe((succ: any) => {

      this.privilegeList = succ.data.privilegeList;
      this.roleMaster = succ.data.roleMaster;
      this.listMainOperator = succ.data;


      this.summaryDetailsDummy = Object.assign(this.listMainOperator, {})

      this.companyMaster.push({
        companyName: "All",
        companyId: "",
      });
      this.branchMaster.push({
        branchName: "All",
        branchId: "",
      });
      this.companyMaster = this.companyMaster.concat(succ.data.companyMaster);
      this.branchMaster = this.branchMaster.concat(succ.data.branchMaster);

      // this.filterDetailsObj.serviceType = this.serviceStatusMaster[0]
      // this.filterDetailsObj.serviceStatus = this.serviceTypeMaster[0]

    }, err => {
      this.common.hideLoading();


    }
    );
    this.filterDetailsObj.requestedDate[0] = moment().subtract(3, 'month').toDate();
    this.filterDetailsObj.processedDate[0] = moment().subtract(3, 'month').toDate();
  }
  refresh() {
    this.filterDetailsObj = {
      requestedDate: [new Date(), new Date()],
      processedDate: [new Date(), new Date()],
      serviceType: "",
      serviceStatus: "",
      userType: "",
      roles: [],
      menus: [],
      groupList: [],
      privilegeList: [],
      // "channel":1
    };
    this.filterDetailsObj.requestedDate[0] = moment().subtract(3, 'month').toDate();
    this.filterDetailsObj.processedDate[0] = moment().subtract(3, 'month').toDate();
    this.isFirstTime = true;
    this.ischangeModifiedDate = false;
    this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();
    this.loadData();
  }
  ngOnInit(): void {

     //this.loadJquery();
    this.loadData();
  }
  changeModifiedDate() {
    this.ischangeModifiedDate = true;

  }
  loadData() {

    if (!this.isFirstTime) {
      this.filterDetailsObj.createdDateFrom = moment(this.filterDetailsObj.requestedDate[0]).format("YYYY-MM-DD");
      this.filterDetailsObj.createdDateTo = moment(this.filterDetailsObj.requestedDate[1]).format("YYYY-MM-DD");




      for (let i = 0; i < this.filterDetailsObj.groupList.length; i++) {
        this.filterDetailsObj.roles.push(this.filterDetailsObj.groupList[i].groupId);
      }
      for (let i = 0; i < this.filterDetailsObj.privilegeList.length; i++) {
        this.filterDetailsObj.menus.push(this.filterDetailsObj.privilegeList[i].menuId);
      }

      if (this.filterDetailsObj.comp)
        this.filterDetailsObj.companyId = this.filterDetailsObj.comp.companyId;
      if (this.filterDetailsObj.selectedBranch)
        this.filterDetailsObj.branchId = this.filterDetailsObj.selectedBranch.branchId;

    }
    if (this.ischangeModifiedDate) {
      this.filterDetailsObj.modifiedDateFrom = moment(this.filterDetailsObj.processedDate[0]).format("YYYY-MM-DD");
      this.filterDetailsObj.modifiedDateTo = moment(this.filterDetailsObj.processedDate[1]).format("YYYY-MM-DD");

    }


    this.common.showLoading();
    this.apiService.post(this.constantsService.getUserProfileReport, this.filterDetailsObj).subscribe((succ: any) => {
      console.log(succ);
      this.common.hideLoading();

      Object.assign(this.summaryDetails, succ.data);
      // this.summaryDetails = succ.data.auditReportList;
      this.summaryDetailsDummy = succ.data;
      if (this.isFirstTime) {
        this.isFirstTime = false;

        setTimeout(() => {
          this.initTable();
          //this.ngOnInit();
        }, 1000);

      }
      else {
        // $(".summaryDatatable").dataTable().fnDestroy();
       // this.initTable();
      
        this.reinitTable();

      }
      // this.tableService = succ.data.serviceStatusMaster;
      // this.tableServiceType = succ.data.serviceTypeMaster;
      // this.tableService = []
      // this.tableServiceType = []
      // for (let i = 0; i < succ.data.serviceStatusMaster.length; i++) {
      //   let obj = {
      //     id: i + 1,
      //     name: succ.data.serviceStatusMaster[i],
      //     isChecked: true,
      //   }
      //   this.tableService.push(obj);
      // }
      // for (let i = 0; i < succ.data.serviceTypeMaster.length; i++) {
      //   let obj = {
      //     id: i + 1,
      //     name: succ.data.serviceTypeMaster[i],
      //     isChecked: true,

      //   }
      //   this.tableServiceType.push(obj);
      // }
      // this.list=[{

      // }]

    }, err => {
      this.common.hideLoading();


    }
    );
  }

  onApprovalStatusChange(ApprovalStatus) {


    this.common.showLoading()
    this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();

    this.summaryDetailsDummy = [];
    let temp = 0;
    for (let j = 0; j < this.summaryDetails.length; j++) {

      if (this.statusBranch && this.summaryDetails[j].userType == "Branch") {
        this.summaryDetailsDummy.push(this.summaryDetails[j]);
        temp++;
      }
      else if (this.statusCompany && this.summaryDetails[j].userType == "Company") {
        this.summaryDetailsDummy.push(this.summaryDetails[j]);

        temp++;

      }
      else if (this.statusSuperAdmin && this.summaryDetails[j].userType == "Super Admin") {
        this.summaryDetailsDummy.push(this.summaryDetails[j]);

        temp++;

      }

    }
    setTimeout(() => {
      if (temp == this.listMainOperator.length) {
        this.filterDetailsObj.isApprovalStatusFilter = false;
      } else {
        this.filterDetailsObj.isApprovalStatusFilter = true;
  
      }
      this.initTable();
    }, 500);
  


  }
  clearApprovedStatus() {
    this.summaryDetailsDummy = this.summaryDetailsDummy;
    this.initTable();
    this.filterDetailsObj.isStatusFilter = false;
    this.filterDetailsObj.isApprovalStatusFilter = false;
    this.statusSuperAdmin = true
    this.statusCompany = true
    this.statusBranch = true

  }


  clearAllFilter() {
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.summaryDetailsDummy = this.listMainOperator;
    this.initTable();
    this.filterDetailsObj.isStatusFilter = false;
    this.filterDetailsObj.isApprovalStatusFilter = false;

    this.statusSuperAdmin = true
    this.statusCompany = true
    this.statusBranch = true



  }

  filter() {
    this.summaryDetails = [];

    this.summaryDetailsDummy = [];
    this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();

    this.loadData();
  }
  clear() {

    this.filterDetailsObj = {
      requestedDate: [new Date(), new Date()],
      processedDate: [new Date(), new Date()],
      serviceType: "",
      serviceStatus: "",
      userType: "",
      roles: [],
      menus: [],
      groupList: [],
      privilegeList: [],


    };
    this.filterDetailsObj.requestedDate[0] = moment().subtract(3, 'month').toDate();
    this.filterDetailsObj.processedDate[0] = moment().subtract(3, 'month').toDate();
  }

  initTable() {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
      this.common.hideLoading();
    }, 1000);
    this.oTable = $(".summaryDatatable").DataTable({

      sScrollX: "100%",
      // searching: false,
      aaSorting: [],
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
          orientation: 'landscape',
          pageSize: 'A0',
          className: "buttonsToHide",
          customize: function (doc) {
            doc.defaultStyle.fontSize = 20; //2,3,4,etc doc.styles.tableHeader.fontSize = 1; //2, 3, 4, etc }
          }
        }
        // 'pdf',
        // 'print'
      ]
    });
    var oTableSearch = this.oTable;
    $('#searchTextId').keyup(function () {
      oTableSearch.search($(this).val()).draw();

    });
    setTimeout(() => {

      this.loadJquery();

    }, 1000);
  }
  reinitTable() {
    // this.oTable.destroy();
    // $('.summaryDatatable').dataTable().fnDestroy();

    setTimeout(() => {
      //this.ngOnInit();
     this.initTable();

    }, 1000);
  }
  resetSearch() {
     this.SearchValue = '';
    // this.oTable.destroy();
    // $('.summaryDatatable').dataTable().fnDestroy();
    this.refresh();
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
    $(".promolist ul").mCustomScrollbar({
      axis: "y",
      theme: "dark",
      scrollbarPosition: "inside",
      advanced: {
        updateOnContentResize: true
      }
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
        });
        $(parentSelector + ' .dataTables_scrollBody').css("border-bottom", "none");
      }



      var parentSelector = ".parentId";
      var tableSelector = ".summaryDatatable";
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
  onStatusChange() {
    // this.oTable.clear()
    this.summaryDetailsDummy = [];
    // this.oTable.destroy();
    this.isFilterStatus = false;
    this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();
    for (let i = 0; i < this.tableStatus.length; i++) {
      if (this.tableStatus[i].isChecked) {
        for (let j = 0; j < this.summaryDetails.length; j++) {
          if (this.tableStatus[i].name == this.summaryDetails[j].opStatus) {
            this.summaryDetailsDummy.push(this.summaryDetails[j]);
            this.isFilterStatus = true;
          }
        }
      }
    }
    this.reinitTable();

  }

  clearTableFilter() {
    this.summaryDetailsDummy = [];
    // this.oTable.destroy();
    this.oTable.destroy();
    $('.summaryDatatable').dataTable().fnDestroy();
    this.isFilterStatus = false;
    for (let i = 0; i < this.tableStatus.length; i++) {
      this.tableStatus[i].isChecked = true;
    }
    this.summaryDetailsDummy = this.summaryDetails;

    this.reinitTable();
  }
  downloadReport(format) {
    // if (format == 'pdf')
    //   $('.buttons-pdf').click();
    // else if (format == 'xlsx')
    //   $('.buttons-excel').click();
    // else if (format == 'csv')
    //   $('.buttons-csv').click();

    // this.common.showLoading();
    // this.filterDetailsObj.createdDateFrom = moment(this.filterDetailsObj.requestedDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.createdDateTo = moment(this.filterDetailsObj.requestedDate[1]).format("YYYY-MM-DD")

    // this.filterDetailsObj.modifiedDateFrom = moment(this.filterDetailsObj.processedDate[0]).format("YYYY-MM-DD")
    // this.filterDetailsObj.modifiedDateTo = moment(this.filterDetailsObj.processedDate[1]).format("YYYY-MM-DD")
    // this.filterDetailsObj.modifiedDateTo = moment(this.filterDetailsObj.processedDate[1]).format("YYYY-MM-DD")
    // this.filterDetailsObj.modifiedDateTo = moment(this.filterDetailsObj.processedDate[1]).format("YYYY-MM-DD")



    // for (let i = 0; i < this.filterDetailsObj.groupList.length; i++) {
    //   this.filterDetailsObj.roles.push(this.filterDetailsObj.groupList[i].groupId)
    // }
    // for (let i = 0; i < this.filterDetailsObj.privilegeList.length; i++) {
    //   this.filterDetailsObj.menus.push(this.filterDetailsObj.privilegeList[i].menuId)
    // }


    // if (this.filterDetailsObj.comp)
    //   this.filterDetailsObj.companyId = this.filterDetailsObj.comp.companyId
    // if (this.filterDetailsObj.selectedBranch)
    //   this.filterDetailsObj.branchId = this.filterDetailsObj.selectedBranch.branchId


    this.filterDetailsObj.isDownload = true
    this.filterDetailsObj.fileType = format;

    this.apiService.downloadFile(this.constantsService.userProfileReportDownload, this.filterDetailsObj).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, "User Profile", format);
    }, err => {


      this.common.hideLoading();

    });

  }
}
