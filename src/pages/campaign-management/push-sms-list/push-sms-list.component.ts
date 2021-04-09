import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CountryService } from 'src/service/country.service';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-push-sms-list',
  templateUrl: './push-sms-list.component.html',
  styleUrls: ['./push-sms-list.component.css']
})
export class PushSmsListComponent implements OnInit {

  user: any = {};
  listPushCampaign: any = [];
  selectedUser: any = {};
  errMsg: boolean;
  // isMainChecker: any;

  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,

    "isMainChecker": false,
    "menuId": 0,
    "campaignType": [],
    "status": [6],
    "sortBy": [],
  }
  isScroll: boolean;
  role: any;
  approveModal: boolean;
  listOperator: any = [];
  status: any = [

  ];
  SearchValue: any;
  campaingnType: any = [
    { name: "Push", theCheckbox: true },
    { name: "Pull", theCheckbox: true },
    { name: "Push & Pull", theCheckbox: true }
  ];
  ide: any = [];
  channelList: any = [];
  AppOrRejForm: FormGroup;
  statusForm: FormGroup;
  searchStatusFilter: any;
  campaingnTypeForm: FormGroup;
  searchTypeFilter: any;
  sortList: any = [];
  table: any;
  listOriginalPushCampaign: any;
  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public countryService: CountryService) {
    this.role = this.common.getRole();
    this.user = this.common.getUser();
    //this.countryService.getApiCountryCode();

    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    this.statusForm = this.formBuilder.group({

      statusGroup: new FormArray([]),
      searchStatusFilter: []

    });
    this.campaingnTypeForm = this.formBuilder.group({

      campaingnTypeGroup: new FormArray([]),
      searchTypeFilter: []

    });
    this.campaingnType.forEach((o, i) => {
      const control = new FormControl();
      (this.campaingnTypeForm.controls.campaingnTypeGroup as FormArray).push(control);
    });
    // this.status.push({ id: 1, name: "Approve" });

    // if (this.role.isChecker) {
    //   this.status.push({ id: 2, name: "Waiting For Approval" });
    // }
    // this.status.push({ id: 3, name: "Reject" });

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
    this.apiService.post(this.constantsService.getChannel, {}).subscribe((succ: any) => {


      this.channelList = succ.data.channel;
      for(let i=0;i<this.channelList.length;i++){
        if(this.channelList[i].channelId==1){
          this.constantsService.isSmsChannelAvailable =true
        }
      }
      // this.list=[{

      // }]
      console.log(succ)
    }, err => {
      this.common.hideLoading()


    }
    )

    this.apiService.post(this.constantsService.getRolesByUserId, this.user.data).subscribe((succ: any) => {


      console.log(succ)
      let maxLength = 0, isRequired = 1;
      for (let i = 0; i < succ.data.length; i++) {
        if (succ.data[i].isShortMessageRequired) {
          if (maxLength < succ.data[i].shortMessageLength) {
            maxLength = succ.data[i].shortMessageLength
          }
        } else {
         
          isRequired = 0;
          break;
        }
      }
      console.log(maxLength);
      if (isRequired) {
        if (maxLength > this.constantsService.pushDefaultMsgLength)
          this.constantsService.pushMessageLength = this.constantsService.pushDefaultMsgLength;
        else
          this.constantsService.pushMessageLength = maxLength

      }else{
        this.constantsService.pushMessageLength = this.constantsService.pushDefaultMsgLength;

      }

    }, err => {
      this.common.hideLoading()


    })

  }
  addPushSMS() {

  }
  resetSearch() {
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.reinitTable();
  }
  ngOnInit() {

    myMethod();

    this.user = this.common.getUser()

    this.common.showLoading()



    this.apiService.post(this.constantsService.listPushCampaign, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();


      if (succ.data) {
        this.listOriginalPushCampaign = succ.data;
        this.listPushCampaign = succ.data;

      }
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        this.initTable();
      }, 1000);

      selectSearchMethod();
      // this.listOperator=[{

      // }]

    }, err => {
      this.common.hideLoading()


    }
    )


    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });


    $('.designdata-table').DataTable({
      retrieve: true,
      scrollY: "500px",
      scrollCollapse: true,
      paging: false,
      searching: false,
      info: false,
      columnDefs: [
        { "targets": 2, "orderable": false },
        { "targets": 3, "orderable": false },
        { "targets": 5, "orderable": false },
        { "targets": 6, "orderable": false }
      ],
      "fnInitComplete": function () {
        $(".dataTables_scrollBody").mCustomScrollbar({
          axis: "y",
          theme: "dark",
          scrollbarPosition: "outside",
          advanced: {
            updateOnContentResize: true
          }
        });
      },
      "fnDrawCallback": function (oSettings) {
        $(".dataTables_scrollBody").mCustomScrollbar({
          axis: "y",
          theme: "dark",
          scrollbarPosition: "outside",
          advanced: {
            updateOnContentResize: true
          }
        });
      }
    });

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
  getCampaignName(id) {
    if (id == 1) {
      return "Push";
    } else if (id == 2) {
      return "Pull";

    }
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
  ngOnDestroy() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "isMainChecker": false,
      "menuId": 0,
      "campaignType": [],
      "status": [6],
      "sortBy": [],
    }

  }
  onScroll() {

    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();

  }
  changeStatus(data, status) {
    $('#approveModal').modal('show')
    data.changeStauts = status
    data.title = "Alert message"
    if (status == 5) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to make to return to maker"
    }
    else if (status == 2) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to approve"
    }
    else if (status == 4) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to reject"
    }
    else if (status == 6) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to stop"
    }
    else if (status == 7) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to resume"
    }

    this.selectedUser = data;
    this.selectedUser.reason = "";
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




  deleteUser() {
    this.common.showLoading()

    let pushsms: any = { "pushsms": { campaignId: this.selectedUser.campaignId, campaignDesc: this.selectedUser.campaignDesc } }
    pushsms.isMainChecker = this.reqObj.isMainChecker
    this.apiService.post(this.constantsService.deletePushCampaign, pushsms).subscribe((succ: any) => {

      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        // this.ngOnInit();
        this.changeSearch();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide')

      this.common.hideLoading();

    });
  }


  showModal(user) {
    // let data={}
    // =\
    $('#userModal').modal('show')

    this.selectedUser = user;
  }

  send() {
    let url;
    if (this.selectedUser.changeStauts != 2) {

      if (!this.selectedUser.reason) {
        this.errMsg = true;
        return;
      }

      if (this.selectedUser.changeStauts == 6)
        url = this.constantsService.stopPush
      else if (this.selectedUser.changeStauts == 7)
        url = this.constantsService.stopPush
      else if (this.selectedUser.changeStauts == 4)
        url = this.constantsService.rejectPushCampaign
      else
        url = this.constantsService.returnToMakerPushCampaign
    } else {
      url = this.constantsService.approvePushCampaign
    }

    // return;
    this.errMsg = false;
    this.common.showLoading()
    let PushId: any = { "pushsms": this.selectedUser };
    this.apiService.post(url, PushId).subscribe((succ: any) => {

      $('#approveModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        $('.datatable').dataTable().fnDestroy();
        this.changeSearch();
        this.common.showSuccessMessage(succ.message);

        // this.ngOnInit(); 
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#approveModal').modal('hide')

      this.common.hideLoading();

    });

  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
  campaginTypeChange(event) {


  }
  gottoAdd() {
    this.router.navigateByUrl('/home/campaign-management/PushSms');
  }

  gotoPushSms(push: any, status) {

    // var PushId = { "pushsms": {"campaignDesc":push} };
    if (push.status == 'Approved')
      push.campaingStatus = 2;
    if (push.status == 'Draft')
      push.campaingStatus = 1;
    if (push.status == 'Pending For Approval')
      push.campaingStatus = 3;
    if (push.status == 'Rejected')
      push.campaingStatus = 4;
    if (push.status == 'Reopen')
      push.campaingStatus = 5;


    this.common.setEditpushCampaign(push)

    this.router.navigateByUrl('/home/campaign-management/PushSms');
  }


  gotoPush() {

    this.router.navigateByUrl('/home/campaign-management/PushSms');
  }
  gotoApprove(data) {

    // var Opid = { "opEmailId": id };
    data.isApprove = true;
    this.common.setEditpushCampaign(data)

    this.router.navigateByUrl('/home/campaign-management/PushSms');
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {

      this.initTable();

    }, 1000);
  }
  onChange(status) {
    this.listPushCampaign = [];



    this.reqObj.status = [];
    // this.reqObj.noOfRecords = 10;
    // this.reqObj.pageIndex = 1;
    if (status.id == 6) {
      for (let i = 0; i < this.status.length; i++) {
        if (status.theCheckbox)
          this.status[i].theCheckbox = true;
        else
          this.status[i].theCheckbox = false;

      }
      this.reqObj.status.push(6);
      this.listPushCampaign = this.listOriginalPushCampaign;
      this.reinitTable();

      return;
    } else {
      if (!status.theCheckbox) {
        this.status[0].theCheckbox = false;
      }

    }


    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i].theCheckbox)
        this.reqObj.status.push(this.status[i].statusDesc)

    }

    for (let j = 0; j < this.listOriginalPushCampaign.length; j++) {
      for (let k = 0; k < this.reqObj.status.length; k++) {
        if (this.listOriginalPushCampaign[j].status == this.reqObj.status[k]) {
          this.listPushCampaign.push(this.listOriginalPushCampaign[j])
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

  campaingnTypeChange() {

    this.listPushCampaign = [];
    this.reqObj.campaignType = [];
    for (let i = 0; i < this.campaingnType.length; i++) {
      if (this.campaingnType[i].theCheckbox) {
        this.reqObj.campaignType.push(this.campaingnType[i].name)
      }

    }

    for (let j = 0; j < this.listOriginalPushCampaign.length; j++) {
      for (let k = 0; k < this.reqObj.campaignType.length; k++) {
        if (this.listOriginalPushCampaign[j].campaignType == this.reqObj.campaignType[k]) {
          this.listPushCampaign.push(this.listOriginalPushCampaign[j])
        }
      }
    }
    this.reinitTable();
    // listOriginalPushCampaign


    // this.reqObj.campaignType = [];
    // this.reqObj.noOfRecords = 10;
    // this.reqObj.pageIndex = 1;

    // for (let i = 0; i < this.campaingnType.length; i++) {
    //   if (this.campaingnType[i].theCheckbox)
    //     this.reqObj.campaignType.push(this.campaingnType[i].name)
    // }

    // this.changeSearch();
  }
  sort(displayName, keyName) {
    for (let i = 0; i < this.sortList.length; i++) {
      if (this.sortList[i] == displayName) {
        this.sortList.splice(i, 1);
        this.reqObj.sortBy.splice(i, 1);
        this.reqObj.pageIndex = 1;
        // this.changeSearch();
        return;
      }

    }
    this.sortList.push(displayName);
    this.reqObj.sortBy.push(keyName);
    this.reqObj.pageIndex = 1;
    // this.changeSearch();

  }
  deleteSort(name) {
    for (let i = 0; i < this.sortList.length; i++) {
      if (this.sortList[i] == name) {
        this.sortList.splice(i, 1);
        this.reqObj.sortBy.splice(i, 1);
        this.reqObj.pageIndex = 1;
        // this.changeSearch();
        return;
      }

    }
  }
  checkSort(name) {

    for (let i = 0; i < this.sortList.length; i++) {
      if (this.sortList[i] == name)
        return true;
    }
    return false;

  }
  clearSort() {
    this.sortList = [];
    this.reqObj.sortBy = [];
    this.reqObj.pageIndex = 1;
    // this.changeSearch();

  }
}
