import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';

@Component({
  selector: 'app-default-services',
  templateUrl: './default-services.component.html',
  styleUrls: ['./default-services.component.css']
})
export class DefaultServicesComponent implements OnInit, OnDestroy {

  user: any = {};
  listServices: any = [];
  isScroll: boolean;
  selectedService: any = {};
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 100,
    "pageIndex": 1,
    "categoryId": "",
    // "statusFilter": "1",
    "isMainChecker": false,
    "menuId": 0,
    "status": [],
    "sortBy": []
  }
  status: any = [

  ];
  role: any;
  listCategory: any = [];
  listChannels: any = [];
  listTemplates: any = [];
  approve: boolean;
  errMsg: boolean;
  reopen: boolean;
  serviceStatus: any = "";
  isMainChecker: any;
  AppOrRejForm: FormGroup;
  statusForm: FormGroup;

  sortList: any = [];
  searchStatusFilter: any;
  searchTypeFilter: any;
  table: any;
  listMainServices: any = [];
  tableChannel: any = [];
  SearchValue: any;
  statusInActive: any = true;
  statusActive: any = true;
  statusApproved: any = true;
  statusPending: any = true;
  statusDraft: any = true
  statusReopen: any = true
  statusPendingForApproval: any = true




  // isMainChecker: number = 0;

  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();

    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;



    this.statusForm = this.formBuilder.group({

      statusGroup: new FormArray([]),
      searchStatusFilter: []

    });



    this.apiService.post(this.constantsService.getStatusM, this.reqObj).subscribe((succ: any) => {


      if (succ.data)
        this.status = succ.data;

      for (let i = 0; i < this.status.length; i++) {
        this.status[i].theCheckbox = true;
      }

      this.status.forEach((o, i) => {
        const control = new FormControl();
        (this.statusForm.controls.statusGroup as FormArray).push(control);
      });

    }, err => {
      this.common.hideLoading()



    })
  }

  ngOnInit() {
    myMethod();
    selectSearchMethod();

    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });


    // ListCategory 
    this.apiService.post(this.constantsService.getServiceMasterData, {}).subscribe((succ: any) => {

      this.listCategory = succ.data.category;


    }, err => {

    })

    //ListChannel
    this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
      this.listChannels = succ.data.channel;


    }, err => {

    })

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);


    this.common.showLoading()
    this.apiService.post(this.constantsService.listServices, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading()
      this.listMainServices = succ.data;


      this.listServices = Object.assign(this.listMainServices, {})
      this.getChannelMaster();


      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        this.loadJquery();
        this.initDatatable();

      }, 1500);

      // }
    }, err => {
      this.common.hideLoading()

    }
    )



  }

  getChannelMaster() {
    this.tableChannel = [];
    for (let i = 0; i < this.listServices.length; i++) {
      // if()
      this.tableChannel.push({
        id: i + 1,
        name: this.getChannelName(this.listServices[i].channelId),
        isChecked: true,

      })
    }
    var uniqueArray = _.uniqBy(this.tableChannel, 'name');


    this.tableChannel = uniqueArray


  }



  ChannelChange() {
    this.common.showLoading()

    this.listServices = [];
    let temp = 0;
    for (let i = 0; i < this.tableChannel.length; i++) {
      if (this.tableChannel[i].isChecked) {

        for (let j = 0; j < this.listMainServices.length; j++) {

          if (this.listMainServices[j].channelId == this.getChannelId(this.tableChannel[i].name)) {
            this.listServices.push(this.listMainServices[j]);
            temp++;
          }
        }
      }
    }
    if (temp == this.listMainServices.length) {
      this.reqObj.isChannelFilter = false;
    } else {
      this.reqObj.isChannelFilter = true;
    }

    this.reinitTable();

  }



  onStatusChange(status) {
    this.common.showLoading()

    this.listServices = [];
    let temp = 0;
    for (let j = 0; j < this.listMainServices.length; j++) {

      if (this.statusActive && this.listMainServices[j].isActive == "true") {
        this.listServices.push(this.listMainServices[j]);
        temp++;
      }
      if (this.statusInActive && this.listMainServices[j].isActive == "false") {
        this.listServices.push(this.listMainServices[j]);

        temp++;

      }

    }
    if (temp == this.listMainServices.length) {
      this.reqObj.isStatusFilter = false;
    } else {
      this.reqObj.isStatusFilter = true;

    }
    this.reinitTable();

  }



  onApprovalStatusChange(ApprovalStatus) {


    this.common.showLoading()

    this.listServices = [];
    let temp = 0;
    for (let j = 0; j < this.listMainServices.length; j++) {

      if (this.statusApproved && this.listMainServices[j].status == "Approved") {
        this.listServices.push(this.listMainServices[j]);
        temp++;
      }
      if (this.statusDraft && this.listMainServices[j].status == "Draft") {
        this.listServices.push(this.listMainServices[j]);

        temp++;

      } if (this.statusPending && this.listMainServices[j].status == "Rejected") {
        this.listServices.push(this.listMainServices[j]);

        temp++;

      } if (this.statusReopen && this.listMainServices[j].status == "Reopen") {
        this.listServices.push(this.listMainServices[j]);

        temp++;

      }
      if (this.statusPendingForApproval && this.listMainServices[j].status == "Pending For Approval") {
        this.listServices.push(this.listMainServices[j]);

        temp++;

      }
    }
    if (temp == this.listMainServices.length) {
      this.reqObj.isApprovalStatusFilter = false;
    } else {
      this.reqObj.isApprovalStatusFilter = true;

    }
    this.reinitTable();


  }
  clearApprovedStatus() {
    this.listServices = this.listMainServices;
    this.reinitTable();
    this.reqObj.isApprovalStatusFilter = false;
    this.statusApproved = true
    this.statusDraft = true
    this.statusReopen = true
    this.statusPending = true
    this.statusPendingForApproval = true
  }


  clearAllFilter() {
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.listServices = this.listMainServices;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.reqObj.isApprovalStatusFilter = false;
    this.reqObj.isChannelFilter = false;
    this.statusActive = true
    this.statusInActive = true
    this.statusApproved = true
    this.statusDraft = true
    this.statusReopen = true
    this.statusPending = true
    this.statusPendingForApproval = true
    for (let i = 0; i < this.tableChannel.length; i++) {
      this.tableChannel[i].isChecked = true;
    }

  }


  clearChannel() {
    this.listServices = this.listMainServices;
    this.reinitTable();
    this.reqObj.isChannelFilter = false;
    for (let i = 0; i < this.tableChannel.length; i++) {
      this.tableChannel[i].isChecked = true;
    }
  }

  clearStatus() {
    this.listServices = this.listMainServices;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.statusActive = true
    this.statusInActive = true
  }


  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      this.common.hideLoading()

      this.initDatatable();

    }, 1000);
  }

  loadJquery() {
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
    $(".user-arrow").on('click', function () {
      var arrowelement = $(this);
      if ($(this).hasClass('filter-open')) {
        $(this).parent("th").find(".table-checkfilter").addClass("active");
        $(this).parent("th").prop("disabled", true);
        setTimeout(function () {
          arrowelement.removeClass('filter-open');
          arrowelement.addClass('filter-close');
        }, 500);
      }
      if ($(this).hasClass('filter-close')) {
        $(this).parent("th").find(".table-checkfilter").removeClass("active");
        setTimeout(function () {
          arrowelement.removeClass('filter-close');
          arrowelement.addClass('filter-open');
        }, 500);
      }
      $('.tablesearch-content').mCustomScrollbar('update');
      return false;
    });


    if ($(window).width() > 768) {
      $(".tablebody").mCustomScrollbar({
        axis: "y",
        theme: "dark",
        scrollbarPosition: "outside",
        advanced: {
          updateOnContentResize: true
        }
      });
    } else {
      $('.tablebody').mCustomScrollbar('destroy');
    }
    $(window).resize(function () {
      if ($(window).width() > 768) {
        $(".tablebody").mCustomScrollbar({
          axis: "y",
          theme: "dark",
          scrollbarPosition: "outside",
          advanced: {
            updateOnContentResize: true
          }
        });
      } else {
        $('.tablebody').mCustomScrollbar('destroy');
      }
    });
  }


  initDatatable() {
    setTimeout(() => {
      //  alert("2")
      var oTable = $(".datatable").DataTable({
        scrollCollapse: true,
        aaSorting: [[0, 'asc']]
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })
    }, 1500);
  }


  getCategoryName(id) {
    let branch = this.listCategory.filter(
      bran => {
        if (bran.categoryId == parseInt(id))
          return bran;
      });
    if (branch.length)
      return branch[0].categoryName
  }

  getChannelName(id) {
    if (this.listChannels.length == 0)
      return;
    let channels = this.listChannels.filter(
      depart => {
        if (depart.channelId == id)
          return depart;
      });
    if (channels.length)
      return channels[0].channelDesc
  }


  getChannelId(name) {
    if (this.listChannels.length == 0)
      return;
    let channels = this.listChannels.filter(
      depart => {
        if (depart.channelDesc == name)
          return depart;
      });
    if (channels.length)
      return channels[0].channelId
  }

  ngOnDestroy() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "categoryId": "",
      "isMainChecker": false,
      "menuId": 0,
      "status": [],
      "sortBy": []

    }
  }


  deleteService() {
    this.common.showLoading()
    let obj = { notiId: this.selectedService, isMainChecker: this.reqObj.isMainChecker }
    this.apiService.post(this.constantsService.deleteService, obj).subscribe((succ: any) => {

      $('#serviceModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#serviceModal').modal('hide')

      this.common.hideLoading();

    });
  }

  showModal(notiId) {

    $('#serviceModal').modal('show')
    this.selectedService = notiId;
  }

  showModalDraft(wfId) {
    $('#draftModal').modal('show')
    this.selectedService = wfId;
  }

  deleteDraft() {
    this.common.showLoading()
    let obj = { wfId: this.selectedService }
    this.apiService.post(this.constantsService.deleteDraft, obj).subscribe((succ: any) => {

      $('#draftModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#draftModal').modal('hide')
      this.common.hideLoading();

    });
  }


  addService() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "isMainChecker": false,
      "categoryId": "",
      "menuId": 0,
      "status": [],
      "sortBy": []

    }
    this.isScroll = true;

    this.router.navigateByUrl("/home/service-management/add-default-services");
  }

  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();
  }

  approveServices(data) {
    this.serviceStatus = 2;
    $('#userModal').modal('show')
    data.title = "Alert message"
    data.body = "Are you sure you want to approve"
    this.selectedService = data;
  }
  rejectServices(data) {
    this.serviceStatus = 4;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reject"
    this.AppOrRejForm.get('reason').reset()
    this.selectedService = data;
  }

  reopenServices(data) {
    this.serviceStatus = 5;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reopen"
    this.AppOrRejForm.get('reason').reset()
    this.selectedService = data;
  }

  send() {
    let url;
    if (this.serviceStatus == 4) {
      if (!this.selectedService.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.rejectServices
    } else if (this.serviceStatus == 2) {
      url = this.constantsService.approveServices
    }
    if (this.serviceStatus == 5) {
      if (!this.selectedService.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.reopenServicess
    }


    // return;
    this.errMsg = false;
    this.common.showLoading()

    this.apiService.post(url, { wfId: this.selectedService.wfId, reason: this.selectedService.reason }).subscribe((succ: any) => {

      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.listTemplates = [];
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#userModal').modal('hide')
      this.common.hideLoading();

    });

  }




  onChange(status) {

    this.reqObj.status = [];
    if (status.id == 6) {
      for (let i = 0; i < this.status.length; i++) {
        if (status.theCheckbox)
          this.status[i].theCheckbox = true;
        else
          this.status[i].theCheckbox = false;

      }
      this.ngOnInit();
      return;
    } else {
      if (!status.theCheckbox) {
        this.status[0].theCheckbox = false;
      }
    }


    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i].theCheckbox)
        this.reqObj.status.push(this.status[i].id)

    }
    this.ngOnInit();
  }
  clearSort() {
    this.sortList = [];
    this.reqObj.sortBy = [];
    this.ngOnInit();

  }

  gotoDefaultService(data) {
    if (data.status == "Draft") {
      data.status = "1";
      this.common.setEditService(data);
    }
    if (data.status == "Approved") {
      data.status = "2";
      this.common.setEditService(data);
    }
    if (data.status == "Pending For Approval") {
      data.status = "3";
      this.common.setEditService(data);

    }
    if (data.status == "Rejected") {
      data.status = "4";
      this.common.setEditService(data);
    }
    if (data.status == "Reopen") {
      data.status = "5";
      this.common.setEditService(data);
    }
    this.router.navigateByUrl('/home/service-management/add-default-services');

  }



  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  changeField(event, pattern, min, limitTo, id, length) {
    var k;
    k = event.keyCode;  //         k = event.keyCode;  (Both can be used)
    const value = event.target.value.substr(0, limitTo);
    if (event.target.value != value) {
      event.target.value = value;
      return;
    }
    let patt = new RegExp(pattern);
    event.target.value = event.target.value.replace(patt, '');
    if (event.target.value != value) {
      return;
    }
    if (length >= limitTo) {
      return;
    }
  }
}