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
import { CountryService } from 'src/service/country.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {


  user: any = {};
  listOperator: any = [];
  selectedUser: any = {};
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "statusFilter": "6",
    "filterStatus":"Pending",
    "stat": {},
    "isMainChecker": false,
    "menuId": 0,
  }
  status: any = [

  ];
  isScroll: boolean;
  listBranchs: any = [];
  listDepartments: any = [];
  role: any;
  approve: boolean;
  errMsg: boolean;
  isMainChecker: number = 0;
  AppOrRejForm: FormGroup;
  table: any;
  listMainOperator: any = []
  tableDepartment: any = [];
  statusInActive: any = true;
  statusActive: any = true;
  RoleDisable: boolean = false;
  statusApproved: any = true;
  statusPending: any = true;
  hideDelete: boolean;
  hideChecker: boolean;
  addobj:any;
  SearchValue:any;
  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public countryService: CountryService) {
    this.role = this.common.getRole();
    //this.countryService.getApiCountryCode();
    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.user = this.common.getUser();
    this.reqObj.branchId =  this.user.data["branchId"]
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;
    // this.apiService.post(this.constantsService.listBranchWithHead, {}).subscribe((succ: any) => {
    //   this.listBranchs = succ.data;
      
    // }, err => {
      
    // })

    this.apiService.post(this.constantsService.getOperatorStatusM, this.reqObj).subscribe((succ: any) => {
      
      if (succ.data) {

        // this.status.push(succ.data[2]);
        // this.status.push(succ.data[3]);
        // this.status.push(succ.data[4]);
        this.status = succ.data;
        // for(let i=0;i<succ.data.length;i++){
        //   this.status.push({
        //     label:succ.data[i].statusDesc,
        //     value:succ.data[i].id
        //   })
        // }
        // this.reqObj.statusFilter = this.status[0].id;

        // this.ngOnInit();
      }

    }, err => {
      // this.common.hideLoading()

      

    })


    // ListDepartment
    this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
      this.listDepartments = succ.data;
      
    }, err => {
      
    })
  }

  ngOnInit() {

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    },1000);
    myMethod();
    selectSearchMethod();
    // this.setOperatorData();
    
    this.common.showLoading()
    this.apiService.post(this.constantsService.listAllUserssss, this.reqObj).subscribe((succ: any) => {
      
      if(succ.code == 200){
        // this.common.showSuccessMessage(succ.message)
        this.listMainOperator = succ.data
         this.listOperator = Object.assign(this.listMainOperator, {})
        


        
        this.getDepartmentMaster();
        setTimeout(() => {
          $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
          });
           this.loadJquery();
           this.initDatatable();
  
        }, 1500);

      }
     }, err => {
      this.common.hideLoading()

      
    })
    


    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });


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

  // setOperatorData() {

  // }

    
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

  getDepartmentMaster() {
    this.tableDepartment = [];
    for (let i = 0; i < this.listOperator.length; i++) {
      // if()
      this.tableDepartment.push({
        id: i + 1,
        name:this.getDepartmentName(this.listOperator[i].departmentId),
        isChecked: true,

      })
    }
    var uniqueArray = _.uniqBy(this.tableDepartment, 'name');

    
    this.tableDepartment = uniqueArray
    
  }


  departmentChange() {
    this.common.showLoading()
    
    this.listOperator = [];
    let temp = 0;
    for (let i = 0; i < this.tableDepartment.length; i++) {
      if (this.tableDepartment[i].isChecked) {

        for (let j = 0; j < this.listMainOperator.length; j++) {
          
          if (this.listMainOperator[j].departmentId == this.getDepartmentId(this.tableDepartment[i].name)) {
            
            this.listOperator.push(this.listMainOperator[j]);
            temp++;
          }
        }
      }
    }
    if (temp == this.listMainOperator.length) {
      this.reqObj.isDepartmentFilter = false;
    } else {
      this.reqObj.isDepartmentFilter = true;
    }
    
   this.reinitTable();

  }





  onStatusChange(status) {
this.common.showLoading()
    
    this.listOperator = [];
    let temp = 0;
    for (let j = 0; j < this.listMainOperator.length; j++) {

      if (this.statusActive && this.listMainOperator[j].opStatus == "Active") {
        this.listOperator.push(this.listMainOperator[j]);
        temp++;
      }
      if (this.statusInActive && this.listMainOperator[j].opStatus == "Inactive") {
        this.listOperator.push(this.listMainOperator[j]);

        temp++;

      }

    }
    if (temp == this.listMainOperator.length) {
      this.reqObj.isStatusFilter = false;
    } else {
      this.reqObj.isStatusFilter = true;

    }
    this.reinitTable();

  }

  onApprovalStatusChange(ApprovalStatus){


    this.common.showLoading()
    
    this.listOperator = [];
    let temp = 0;
    for (let j = 0; j < this.listMainOperator.length; j++) {

      if (this.statusApproved && this.listMainOperator[j].status == "Y") {
        this.listOperator.push(this.listMainOperator[j]);
        temp++;
      }
      if (this.statusPending && this.listMainOperator[j].status == "N") {
        this.listOperator.push(this.listMainOperator[j]);

        temp++;

      }

    }
    if (temp == this.listMainOperator.length) {
      this.reqObj.isApprovalStatusFilter = false;
    } else {
      this.reqObj.isApprovalStatusFilter = true;

    }
    this.reinitTable();


  }
  clearApprovedStatus(){
      this.listOperator = this.listMainOperator;
      this.reinitTable();
      this.reqObj.isApprovalStatusFilter = false;
      this.statusApproved = true
      this.statusPending = true
  }
  clearAllFilter() {
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.listOperator = this.listMainOperator;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.reqObj.isApprovalStatusFilter = false;
    this.reqObj.isDepartmentFilter = false;
    this.statusActive = true
    this.statusInActive = true
    this.statusApproved = true
    this.statusPending = true
    for (let i = 0; i < this.tableDepartment.length; i++) {
      this.tableDepartment[i].isChecked = true;
    }

  }

  clearDepartment(){
    this.listOperator = this.listMainOperator;
    this.reinitTable();
    this.reqObj.isDepartmentFilter = false;
    for (let i = 0; i < this.tableDepartment.length; i++) {
      this.tableDepartment[i].isChecked = true;
    }
  }

  clearStatus() {
    this.listOperator = this.listMainOperator;
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

  setDataToTable(data){
    if(this.reqObj.statusFilter=='6' && data.length==0){
      // ++this.reqObj.pageIndex;
      // this.isScroll = true;
      return [];
    }
    
    if(data.length==0){
      return [];
    }
    let users = [];
    for (let i = 0; i < data.length; i++) {
      let user = data[i];
      if (user.new_DTLS) {
        user.opUserId = user.wf_REF_ID
        user.createdDate = user.record_TIME
        user.createdBy = user.maker_USER_ID

        user.recordName = user.wf_REF_ID;
        user.action = user.txn_SUB_CODE;
        user.makerUserId = user.maker_USER_ID;

        user.wfId = user.wf_ID
        if (user.wf_STATUS == 'N') {
          user.recordStatus = "Pending For Approval"
          user.statusFilter = 3;
          users.push(user);
        }
        if (user.wf_STATUS == 'Y') {
          user.recordStatus = "Success"
          // user.statusFilter = 3;


        } else if (user.wf_STATUS == 'R') {
          user.recordStatus = "Rejected"
          user.statusFilter = 4;

          users.push(user);
        }

      } else {
        user.statusFilter = 2;
        user.recordStatus = "Approved"

        users.push(user);

      }


    }
    if(this.reqObj.filterStatus=='Pending' && this.reqObj.statusFilter=='6' && data.length<10){
      this.reqObj.pageIndex=1;
      this.isScroll = true;
      this.reqObj.filterStatus="Approved";
      // this.setOperatorData();
    }
    
    return users;
  }
  getBranchName(id) {
    let branch = this.listBranchs.filter(
      bran => {
        if (bran.branchId == parseInt(id))
          return bran;
      });
    if (branch.length)
      return branch[0].branchName
  }

  

  getDepartmentName(id) {
    if (this.listDepartments.length == 0)
      return;
    let department = this.listDepartments.filter(
      depart => {
        if (depart.departmentId == id)
          return depart;
        
        // book.BrandName.toLowerCase().indexOf(id) > -1
      });
    
    if (department.length)
      return department[0].departmentName

  }
  
  getDepartmentId(name) {
    if (this.listDepartments.length == 0)
      return;
    let department = this.listDepartments.filter(
      depart => {
        if (depart.departmentName == name)
          return depart;
        
        // book.BrandName.toLowerCase().indexOf(id) > -1
      });
    
    if (department.length)
      return department[0].departmentId

  }

  ngOnDestroy() {
    
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "statusFilter": "6",
      "isMainChecker": false,
      "menuId": 0,

    }
    // this.common.setEditOperator({})
  }
  gotoDefaultUser(user){
    if(user.status  == "N")
    {
      user.status = "N"
    
    this.common.setEditOperator(user)
    
    this.router.navigateByUrl('/home/operator-management/operator');
    }

    if(user.status  == "Y")
    {
      user.status = "Y"
    
    this.common.setEditOperator(user)
    
    this.router.navigateByUrl('/home/operator-management/operator');
    }
  }

  showModal(data) {
    $('#userModal').modal('show')
    this.selectedUser = data;
  }
  
  deleteUser() {
    this.common.showLoading()
    let obj = { opId: this.selectedUser.opId, isMainChecker: this.reqObj.isMainChecker }
    this.apiService.post(this.constantsService.deleteOperator, obj).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')

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
      $('#userModal').modal('hide')

      this.common.hideLoading();
      
    });
  }

  

  passwordReset(data) {
    
    this.common.showLoading()

    this.apiService.post(this.constantsService.passwordReset, { opId: data.opId }).subscribe((succ: any) => {
      

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);

        // this.setOperatorData();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {


      this.common.hideLoading();
      
    });

  }
  gotoApprove(data) {

    if (this.reqObj.statusFilter == "4") {

      return ;

    }

    // var Opid = { "opEmailId": id };
    data.isApprove = true;
    this.common.setEditOperator(data)
    
    this.router.navigateByUrl('/home/operator-management/operator');
  }
  goEditListManagement(id: any) {
    
    var Opid = { "opId": id };
    this.common.setEditOperator(id)
    
    this.router.navigateByUrl('/home/operator-management/operator');


  }
  goTo(data){
    if (this.reqObj.statusFilter == "4" || data.statusFilter=='4') {

      return;

    }
    if (this.reqObj.statusFilter == "3" || data.statusFilter=='3') {
      data.isApprove = true;
    }
    this.common.setEditOperator(data)
    
    this.router.navigateByUrl('/home/operator-management/operator');

  }
  addOperator() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "statusFilter": "6",
      "isMainChecker": false,
      "menuId": 0,

    }
    this.isScroll = true;
    this.router.navigateByUrl('/home/operator-management/operator');

  }
  onScroll() {
    
    ++this.reqObj.pageIndex;
    this.isScroll = true;
    // this.setOperatorData();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    // this.setOperatorData();
    
  }
  approveUser(data) {
    this.approve = true;
    $('#userApproveModal').modal('show')
    data.title = "Alert message"
    data.body = "Are you sure you want to approve"
    this.selectedUser = data;


  }
  rejectUser(data) {
    this.approve = false;
    $('#userApproveModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reject"
    this.selectedUser = data;
  }

  initDatatable() {
    // setTimeout(() => {
    //  alert("2")
    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      // aaSorting: [[0, 'asc']],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
    this.common.hideLoading()
  }
  
  send() {
    let url;
    if (!this.approve) {

      if (!this.selectedUser.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.rejectOperator

    } else {
      url = this.constantsService.approveOperator
    }
    
    // return;
    this.errMsg = false;
    this.common.showLoading()

    this.apiService.post(url, { wfId: this.selectedUser.wfId, reason: this.selectedUser.reason }).subscribe((succ: any) => {
      
      $('#userApproveModal').modal('hide')
      // this.ngOnInit();

      this.common.hideLoading();
      if (succ.code == 200) {
        this.listOperator = [];
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userApproveModal').modal('hide')

      this.common.hideLoading();
      
    });

  }

  onChange(event) {
    
    this.reqObj.statusFilter = event.value.id;
    this.reqObj.filterStatus="Pending";
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.reqObj.searchText = "";
    // this.setOperatorData();
  }

  getAccessRole(role) {
    if('isDelete' || 'isChecker'){
      let access = this.role[role] ? false : true;
      if(access === false){
          this.hideDelete = false 
          this.hideChecker = false 

      }else{
        this.hideDelete = true
        this.hideChecker = true

      }
      return access;
    }
  
    else{
    let access = this.role[role] ? false : true;
    return access;
    }

//     let access = this.role[role] ? 0 : 1;

//     if(access == 0){
//  let Finalaccess = true
//     return Finalaccess
//   }else{
//     let Finalaccess = false
//     return Finalaccess
//   }

  }
}
