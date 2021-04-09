import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {


  user: any = {};
  listGroup: any = [];
  selectedUser: any = {};
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    isMainChecker: 1
  }
  isScroll: boolean;
  SearchValue:any;
  role: any;
  isMainChecker: any;
  AppOrRejForm: any;
  errMsg: boolean;
  searchStatusFilter = "";
  filterStatus: any = [
    {  
      statusDesc: 'Active',
      statusId: 1
    },
    {
      statusDesc: 'Deactive',
      statusId: 0
    },
    {
      statusDesc: 'Draft',
      statusId: 4
    },
    {
      statusDesc: 'Pending For Approval',
      statusId: 3
    },

  ];
  isFilterStatus: boolean;
  listOriginalGroup: any;
  constructor(private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public formBuilder: FormBuilder) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    
    this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.isMainChecker = 1;
    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });

  }
  resetSearch() {
    this.SearchValue = '';
$('.datatable').dataTable().fnDestroy();
this.initTable();
    }
  ngOnInit() {

    myMethod();
    this.reqObj.isMainChecker = this.isMainChecker;
    
    this.common.showLoading();
    this.apiService.post(this.constantsService.listGroup, this.reqObj).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading()
      this.listGroup = succ.data;

      if (succ.txnData.length) {
        for (let i = 0; i < succ.txnData.length; i++) {
          let json = JSON.parse(succ.txnData[i].new_DTLS);
          console.log(json)
          let obj: any = {

            groupId: succ.txnData[i].wf_ID,
            createdBy: succ.txnData[i].userId,
            modifiedDate: succ.txnData[i].record_TIME,
            wfId: succ.txnData[i].wf_ID,
            groupNewDetails: succ.txnData[i].new_DTLS,
            txn_CODE: succ.txnData[i].txn_CODE,
            TXN_SUB_CODE: succ.txnData[i].txn_SUB_CODE,
            statusId: 3
          }

          if (succ.txnData[i].txn_SUB_CODE == 'Draft') {
            obj.statusId = 4;
          }
          // if (succ.txnData[i].txn_SUB_CODE == 'Delete') {
          obj.groupName = json.role.groupName
          obj.groupDesc = json.role.groupDesc
          obj.createdBy = json.role.createdBy
          obj.isShortMessageRequired = json.role.isShortMessageRequired
          obj.shortMessageLength = json.role.shortMessageLength

          // }
          // if (succ.txnData[i].txn_SUB_CODE == 'Add') {

          // obj.groupName = json.role.groupName
          // obj.groupDesc = json.role.groupDesc
          // }

          this.listGroup.push(obj);
        }
        // this.listGroup = this.listGroup.concat(succ.txnData);
        // this.isScroll = false;
      }
      for (let j = 0; j < this.listGroup.length; j++) {
        if (this.listGroup[j].status == '1')
          this.listGroup[j].statusId == 1
        else if (this.listGroup[j].status == '0')
          this.listGroup[j].statusId == 0
      }
      
      this.listOriginalGroup = this.listGroup;
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        this.initTable();
      }, 1000);
      selectSearchMethod();
      // this.listGroup=[{

      // }]

    }, err => {
      this.common.hideLoading()

      
    }
    )



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
  send() {
    let url;
    if (this.selectedUser.changeStauts != 2) {

      if (!this.selectedUser.reason) {

        this.errMsg = true;
        return;
      }


      url = this.constantsService.rejectGroup
    } else {
      this.selectedUser.groupNewDetails = JSON.parse(this.selectedUser.groupNewDetails)
      url = this.constantsService.approveGroup
    }
    
    // return;
    this.errMsg = false;
    this.common.showLoading()

    this.apiService.post(url, this.selectedUser).subscribe((succ: any) => {
      
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
  initTable() {
    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      aaSorting: [],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
    this.common.hideLoading();
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      this.initTable();

    }, 1000);
  }
  ngOnDestroy() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      isMainChecker: 1
    }
    this.listGroup = [];

  }
  deleteUser() {
    this.common.showLoading()

    // let obj = {
    //   id: this.selectedUser.groupId,
    //   groupName: this.selectedUser.groupName,
    //   isMainChecker: this.isMainChecker

    // }
    this.selectedUser.id = this.selectedUser.groupId
    this.selectedUser.isMainChecker = this.isMainChecker
    this.apiService.post(this.constantsService.deleteGroup, this.selectedUser).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.listGroup = [];
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
  showModal(user) {
    // let data={}
    // =\
    $('#userModal').modal('show')

    this.selectedUser = user;
  }


  goEditListManagement(group) {
    // var Opid = { "opEmailId": id };
    if (group.statusId == '4') {
      group.statusName = "Draft";
    }
    if (group.statusId == '3') {
      group.statusName = "Pending For Approval";
    }
    this.common.setEditGroup(group)
    
    this.router.navigateByUrl('/home/group-management/group-privileges');


  }
  addGroup() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      isMainChecker: 1
    }
    this.isScroll = true;
    this.router.navigateByUrl('/home/group-management/group-privileges');

  }
  onStatusChange(status) {
    this.common.showLoading();
    this.listGroup = []
    this.isFilterStatus = false;
    for (let i = 0; i < this.listOriginalGroup.length; i++) {

      for (let j = 0; j < this.filterStatus.length; j++) {
        if (this.filterStatus[j].theCheckbox) {
          if (this.listOriginalGroup[i].statusId == this.filterStatus[j].statusId) {
            this.listGroup.push(this.listOriginalGroup[i]);
            this.isFilterStatus = true; 

          }
          else if (this.listOriginalGroup[i].status == this.filterStatus[j].statusId) {
            this.listGroup.push(this.listOriginalGroup[i]);
            this.isFilterStatus = true;

          }
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
    this.common.showLoading();
    this.listGroup = []
    this.isFilterStatus = false;

    this.listGroup = this.listOriginalGroup
    for (let j = 0; j < this.filterStatus.length; j++) {
      this.filterStatus[j].theCheckbox = true;
    }
    this.reinitTable();
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

