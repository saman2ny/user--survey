import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { CountryService } from 'src/service/country.service';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  user: any = {};
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "isMainChecker": false,
    "menuId": 0
  }
  isScroll: boolean;
  status: any = [
  ];
  listAllCustomers: any = [];
  manageCustomer: any = [];
  reqCust: any = {}
  customerObj: any = {}
  CustomerForm: FormGroup
  CustomerFormGrid: FormGroup
  showDetails: boolean = false
  role: any;
  hours: any = [];
  listBranchs = [];
  edit: any = {};
  isApprove: boolean;
  RoleDisable: boolean = false;
  errReasonMsg: boolean;
  table: any;
  listCustomers: any;
  SearchValue:any;
  tableBranch: any = [];
  listCompany: any[];
  statusInActive: any = true;
  statusActive: any = true;
  listMainCustomers: any = [];
  addobj: any = {};
  
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) {

    this.user = this.common.getUser();
    this.reqObj.branchId =  this.user.data["branchId"]
    this.role = this.common.getRole();
    //this.countryService.getApiCountryCode();
    
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;

  }
  changeField(event, pattern, min, limitTo, id, length) {
    var k;
    k = event.keyCode; 
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
  resetSearch() {
    this.SearchValue = '';
$('.datatable').dataTable().fnDestroy();
this.reinitTable();
    }

  ngOnInit() {
    myMethod();
    selectSearchMethod();

    this.apiService.post(this.constantsService.listBranchWithHead, {}).subscribe((succ: any) => {
      this.listBranchs = succ.data;
      // let messageText = [];
      // let item = this.listBranchs.forEach((item, i) => {
      //   this.addobj = {}
      //   this.addobj['branchId'] = 0
      //   this.addobj['branchName'] = 'Home Branch'
      //   // this.listBranchs.push(obj)

      // });
      // this.listBranchs.push(this.addobj)

      

      // this.listBranchs = messageText;
      
    }, err => {
      
    })

    
    this.common.showLoading()
    this.apiService.post(this.constantsService.listCustomers, this.reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading()
        this.listMainCustomers = succ.data;
        this.listAllCustomers = Object.assign(this.listMainCustomers, {})
        this.getBranchMaster();

        setTimeout(() => {
          $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
          });
          this.loadJquery();
          this.initDatatable();
  
        }, 1500);
        

    }, err => {
      this.common.hideLoading()
      
    }
    )


         



    this.CustomerForm = this.formBuilder.group({
      customerNumber: ['', Validators.compose([Validators.required, Validators.maxLength(300)])]
    });

    this.CustomerFormGrid = this.formBuilder.group({
      customerNumber: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      mobileNo: ['', Validators.compose([Validators.required])],
      // remobileNo: ['', Validators.compose([Validators.required])],
      nationalID: [{ value: '', disabled: true }],
      branchId: [{ value: '', disabled: true }],
      userType: [{ value: '', disabled: true }],
      emailID: ['', [Validators.required, Validators.email]],
      messageLanguageID: [''],
      noMsgStartTime: [''],
      noMsgEndTime: [''],
      // allowUSSD: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      reason: [''],
    });


    // this.CustomerFormGrid.controls['allowUSSD'].disable();

    this.edit = this.common.getEditcustomerDetails()
    if (this.edit.isApprove) {
      this.isApprove = true;
      
      this.CustomerFormGrid.disable();
      this.RoleDisable = true;
      this.common.showLoading();
      this.apiService.post(this.constantsService.getCustomerApproveData, this.edit).subscribe((succ: any) => {
        
        this.common.hideLoading();
        if (succ.code == 200) {
          let newValue = JSON.parse(succ.data.new_DTLS);
          
          this.customerObj = newValue
          this.customerObj.wfId = succ.data.wf_ID;
          setTimeout(() => {
            // this.setBranch();

          }, 1000);

        } else {
          this.common.showErrorMessage(succ.message);
        }

        // this.getOperatorDetails = succ.data;
      }, err => {
        this.common.hideLoading();
        this.common.showErrorMessage(err.message)

        
      })
    }

   
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
    // $(".user-arrow").on('click', function () {
    //   if ($(this).hasClass('filter-open')) {
    //     $(this).parent("th").find(".table-checkfilter").addClass("active");
    //     $(this).parent("th").prop("disabled", true);
    //     setTimeout(function () {
    //       $('.user-arrow').removeClass('filter-open');
    //       $('.user-arrow').addClass('filter-close');
    //     }, 500);
    //   }
    //   if ($(this).hasClass('filter-close')) {
    //     $(this).parent("th").find(".table-checkfilter").removeClass("active");
    //     setTimeout(function () {
    //       $('.user-arrow').removeClass('filter-close');
    //       $('.user-arrow').addClass('filter-open');
    //     }, 500);
    //   }
    //   $('.tablesearch-content').mCustomScrollbar('update');
    //   return false;
    // });


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


  searchCustomer() {
    
    this.common.showLoading()
    this.apiService.post(this.constantsService.searchLocalCustomerUnsub, this.reqCust).subscribe((succ: any) => {
      
      this.common.hideLoading()

      if (succ.code == 200) {
        this.showDetails = true;
        this.customerObj = succ.data
        // this.setBranch();
      } else {
        this.common.showErrorMessage(succ.message);
        this.showDetails = false
      }



    }, err => {
      this.common.hideLoading()

      
    })

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

  UpdateCustomer() {
    if (this.CustomerFormGrid.invalid) {
      this.CustomerFormGrid.markAllAsTouched();
      return;
    }
    this.common.showLoading();
    this.apiService.post(this.constantsService.updateCustomer, this.customerObj).subscribe((succ: any) => {
      
      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.showDetails = false
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    });
    return;
  }

  approve(data) {
    let obj: any = {
      wfId: this.customerObj.wfId
    }
    if (data != 'approve') {
      this.CustomerFormGrid.controls['reason'].enable();
      if (!this.customerObj.reason) {
        this.common.showErrorMessage("Reason is Must for Reject");
        this.errReasonMsg = true;
        return;
      }
      obj.reason = this.customerObj.reason;
    } else {
      obj.isApprove = true;
    }
    // return;
    let url = this.constantsService.approveOrRejectCustomer
    

    // return;
    this.common.showLoading()
    this.apiService.post(url, obj).subscribe((succ: any) => {
      
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.ngOnInit()
        // this.back();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#userModal').modal('hide')
      this.common.hideLoading();
      
    });

  }

  regCustomer() {
   this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
      "isMainChecker": false,
      "menuId": 0
    }
    this.isScroll = true;
    this.router.navigateByUrl("/home/customer-management");
  }

  gotoCustomer(data) {
      this.common.setEditcustomerDetails(data);
      
      this.router.navigateByUrl('/home/customer-management');
    }

  back() {
    this.location.back();
    this.showDetails = false
  }
  ngOnDestroy() {
    // var Opid = {};
    // this.common.setEditcustomerDetails(Opid)
  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  
  getBranchId(name) {
    let branch = this.listBranchs.filter(
      bran => {
        if (bran.branchName == name)
          return bran;
      });
    if (branch.length)
      return branch[0].branchId
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
    }
  
  

    getBranchMaster() {
    this.tableBranch = [];
    for (let i = 0; i < this.listAllCustomers.length; i++) {
      // if()
      this.tableBranch.push({
        id: i + 1,
        name:this.getBranchName(this.listAllCustomers[i].branchId),
        isChecked: true,

      })
    }
    var uniqueArray = _.uniqBy(this.tableBranch, 'name');

    
    this.tableBranch = uniqueArray
    
  }

  branchChange() {
    
    this.listAllCustomers = [];
    let temp = 0;
    for (let i = 0; i < this.tableBranch.length; i++) {
      if (this.tableBranch[i].isChecked) {

        for (let j = 0; j < this.listMainCustomers.length; j++) {
          
          if (this.listMainCustomers[j].branchId == this.getBranchId(this.tableBranch[i].name)) {
            this.listAllCustomers.push(this.listMainCustomers[j]);
            temp++;
          }
        }
      }
    }
    if (temp == this.listMainCustomers.length) {
      this.reqObj.isCountryFilter = false;
    } else {
      this.reqObj.isCountryFilter = true;
    }
    
    // setTimeout(() => {
    this.reinitTable();

  }
  onStatusChange(status) {

    
    this.listAllCustomers = [];
    let temp = 0;
    for (let j = 0; j < this.listMainCustomers.length; j++) {

      if (this.statusActive && this.listMainCustomers[j].status == "true") {
        this.listAllCustomers.push(this.listMainCustomers[j]);
        temp++;
      }
      if (this.statusInActive && this.listMainCustomers[j].status == "false") {
        this.listAllCustomers.push(this.listMainCustomers[j]);

        temp++;

      }

    }
    if (temp == this.listMainCustomers.length) {
      this.reqObj.isStatusFilter = false;
    } else {
      this.reqObj.isStatusFilter = true;

    }
    this.reinitTable();

  }

  clearAllFilter() {
    this.listAllCustomers = this.listMainCustomers;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.reqObj.isCountryFilter = false;
    this.statusActive = true
    this.statusInActive = true
    for (let i = 0; i < this.tableBranch.length; i++) {
      this.tableBranch[i].isChecked = true;
    }

  }

  clearBranch(){
    this.listAllCustomers = this.listMainCustomers;
    this.reinitTable();
    this.reqObj.isCountryFilter = false;
    for (let i = 0; i < this.tableBranch.length; i++) {
      this.tableBranch[i].isChecked = true;
    }
  }


  clearStatus() {
    this.listAllCustomers = this.listMainCustomers;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.statusActive = true
    this.statusInActive = true
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      this.initDatatable();

    }, 1000);
  }
}
