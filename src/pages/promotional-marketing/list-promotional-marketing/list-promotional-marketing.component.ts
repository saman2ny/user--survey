import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
import * as _ from 'lodash';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-list-promotional-marketing',
  templateUrl: './list-promotional-marketing.component.html',
  styleUrls: ['./list-promotional-marketing.component.css']
})
export class ListPromotionalMarketingComponent implements OnInit, OnDestroy {

  role: any;
  user: any = {};
  listPromotions: any = [];
  isScroll: boolean;
  listChannels: any = [];
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "statusFilter": "1",
    status: [1, 2,3, 4, 5],
    "isMainChecker": false,
    "menuId": 0,
  }
  selectedPromotion: any = {};
  selectedStatus : any ={};
  status: any = [

  ];
  approve: boolean;
  errMsg: boolean;
  promoStatus: any = "";
  AppOrRejForm: FormGroup;
  table: any;
  filterStatus: any[];
  SearchValue:any;
  // isMainChecker: number = 0;
  searchStatusFilter = ""
  listOriginalPromotions: any;
  isFilterStatus: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    
    
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;

    this.apiService.post(this.constantsService.getStatusM, this.reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading();
      if (succ.data)
        this.status = succ.data;

    }, err => {
      this.common.hideLoading()

      

    })
  }
  resetSearch() {
    this.SearchValue = '';
$('.datatable').dataTable().fnDestroy();
this.reinitTable() 
    }

  ngOnInit() {
    myMethod();
    selectSearchMethod();
    this.loadJquery();
    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });

    this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
      this.listChannels = succ.data.channel;
      
    }, err => {
      
    })
    this.loadData();

  }
  loadJquery() {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);
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
        $(this).parent("th").prop("disabled",true);
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
  loadData() {
    
    // this.reqObj.pageIndex=1;
    this.common.showLoading()
    this.apiService.post(this.constantsService.listPromotions, this.reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading()
      if (!succ.data) {
        return;
      }
      this.filterStatus = [];
      for (let i = 0; i < succ.data.length; i++) {
        // succ.data[i].ser = this.getServicesId(succ.data[i].listservices);
        this.filterStatus.push(
          {

            statusDesc: succ.data[i].status,
            id: i,
          }
        )
      }
      
      this.filterStatus = _.uniqBy(this.filterStatus, 'statusDesc');

      // var uniqueArray = _.uniqBy(this.tableCountry, 'name');

      // for (let j = 0; j < this.filterStatus.length; j++) {
      //   this.filterStatus[j].theCheckbox = true;
      // }
      


      this.listOriginalPromotions = succ.data;
      this.listPromotions = succ.data;


      setTimeout(() => {
        this.initTable();
        

      }, 1000);

    }, err => {
      this.common.hideLoading()
      
    }
    )
  }
  initTable() {
    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      aaSorting: [],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      this.initTable();

    }, 1000);
  }
  onStatusChange(status) {

    this.listPromotions = []
    this.isFilterStatus = false;
    for (let i = 0; i < this.listOriginalPromotions.length; i++) {

      for (let j = 0; j < this.filterStatus.length; j++) {
        if (this.filterStatus[j].theCheckbox)
          if (this.listOriginalPromotions[i].status == this.filterStatus[j].statusDesc) {
            this.listPromotions.push(this.listOriginalPromotions[i]);
            this.isFilterStatus = true;

          }
      }
    }
    this.reinitTable();
    // this.changeSearch();
    // this.reqObj.pageIndex = 1;
    // this.isScroll = false;
    // this.reqObj.searchText = "";
    // this.ngOnInit();
  }
  clearFilter() {
    this.listPromotions = []
    this.isFilterStatus = false;

    this.listPromotions = this.listOriginalPromotions
    for (let j = 0; j < this.filterStatus.length; j++) {
      this.filterStatus[j].theCheckbox = true;
    }
    this.reinitTable();
  }
  getChannelName(id) {
    let branch = this.listChannels.filter(
      bran => {
        if (bran.channelId == parseInt(id))
          return bran;
      });
    if (branch.length)
      return branch[0].channelDesc
  }
  RemoveBracket(id) {

    
    // var array = id.replace(/[\[\]"]+/g,"");
    // return array

    if (id === undefined) {
      return;
    }
    var array = id.toString().replace(/[\[\]']/g, '');;
    return array;


  }

  addPromotion() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "statusFilter": "1",
      "isMainChecker": false,
      "menuId": 0,
      status: [1,2, 3, 4, 5],


    }
    this.isScroll = true;
    this.router.navigateByUrl('/home/promotional-marketing/add-promotional');
  }
  
  deletePromotion() {
    this.common.showLoading();
    let obj, url;
    if (this.selectedStatus == 'Approved') {

      obj = { reqId: this.selectedPromotion, isMainChecker: this.reqObj.isMainChecker, fromdate: "", toDate: "" }
      url = this.constantsService.deletePromotion

    } else {
      url = this.constantsService.deleteDrafts
      obj = { wfId: this.selectedPromotion, isMainChecker: this.reqObj.isMainChecker, fromdate: "", toDate: "" }
    }
    this.apiService.post(url, obj).subscribe((succ: any) => {
      
      $('#serviceModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();

        this.loadData();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#serviceModal').modal('hide')
      this.common.hideLoading();
      
    });
  }

  showModal(reqId, name) {
    $('#serviceModal').modal('show');
    this.selectedPromotion = reqId;

    if (name == 'Approved') {
      this.selectedStatus = 'Approved'
    } else {
      this.selectedStatus = 'Draft'

    }
    // var json = [];
    // json.push(reqId)
  }

  onScroll() {
    
    ++this.reqObj.pageIndex;
    this.isScroll = true;
    //  this.loadData();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.loadData();
    
  }

  goEditListPromotion(id: any) {
    var reqId = { "reqId": id };
    this.common.setEditPromotion(reqId)
    
    this.router.navigateByUrl('/home/promotional-marketing/add-promotional');
  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  ngOnDestroy() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "statusFilter": "1",
      "isMainChecker": false,
      "menuId": 0,
      status: [1,2, 3, 4, 5],

    }
  }


  approvePromotions(data) {
    // this.approve = true;
    this.promoStatus = 2;
    $('#userModal').modal('show')
    data.title = "Alert message"
    data.body = "Are you sure you want to approve"
    this.selectedPromotion = data;
  }
  rejectPromotions(data) {
    // this.approve = false;
    this.promoStatus = 4;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reject"
    this.AppOrRejForm.get('reason').reset()
    this.selectedPromotion = data;
  }
  reopenPromotions(data) {
    this.promoStatus = 5;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reopen"
    this.AppOrRejForm.get('reason').reset()
    this.selectedPromotion = data;
  }

  send() {
    let url;
    // if (!this.approve) {

    //   if (!this.selectedPromotion.reason) {
    //     this.errMsg = true;
    //     return;
    //   }
    //   url = this.constantsService.rejectPromotion

    // } else {
    //   url = this.constantsService.approvePromotions
    // }

    if (this.promoStatus == 4) {
      if (!this.selectedPromotion.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.rejectPromotion
    } else if (this.promoStatus == 2) {
      url = this.constantsService.approvePromotions
    }
    if (this.promoStatus == 5) {
      if (!this.selectedPromotion.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.reopenPromotions
    }

    
    this.errMsg = false;
    this.common.showLoading()

    this.apiService.post(url, { wfId: this.selectedPromotion.wfId, reason: this.selectedPromotion.reason }).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.listPromotions = [];
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();

        this.loadData();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#userModal').modal('hide')
      this.common.hideLoading();
      
    });

  }

  gotoPromotion(data) {
    if (data.status == 'Approved')
      data.status = 2;
    if (data.status == 'Draft')
      data.status = 1;
    if (data.status == 'Pending For Approval')
      data.status = 3;
    if (data.status == 'Rejected')
      data.status = 4;
    if (data.status == 'Reopen')
      data.status = 5;
    // data.status = this.reqObj.statusFilter;
    this.common.setEditPromotion(data)
    this.router.navigateByUrl('/home/promotional-marketing/add-promotional');
  }

  onChange(id) {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.reqObj.searchText = "";
    this.loadData();
  }
  // getServicesId(service) {
  //   var str = service.replace('[', '')
  //   str = str.replace(']', '')
  //   str = str.split(',')
  //   return str;
  // }
  getChannels(id) {
    if (!id) {
      return "";
    }
    let channel = JSON.parse(id);
    let channelName = ""
    for (let i = 0; i < this.listChannels.length; i++) {
      for (let j = 0; j < channel.length; j++) {
        if (channel[j] == this.listChannels[i].channelId) {
          if (channelName == '')
            channelName += this.listChannels[i].channelDesc
          else
            channelName += ", " + this.listChannels[i].channelDesc

        }
      }

    }
    return channelName

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
      // this.licenseNumberError=false;
      // this.appService.numberfield(length,limitTo);
      return;
    }
    // if(id=='reason'){
    //   this.errReasonMsg=false;
    // }
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}
