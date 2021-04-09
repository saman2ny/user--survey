import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-approve-customer',
  templateUrl: './approve-customer.component.html',
  styleUrls: ['./approve-customer.component.css']
})
export class ApproveCustomerComponent implements OnInit {
  user: any = {};
  listCustomer: any = [];
  approve: boolean;
  selectedUser: any = {};
  errMsg: boolean;
  reqObj = {
    "searchText": "",
    "noOfRecords": 100,
    "pageIndex": 1,
    "isMainChecker": false,
    "menuId": 0,
    "isCustomerUpdate": true,
  }
  isScroll: boolean;
  selectedCustomer: any = {};
  role: any;
  maxIncidentReasonLength: number = 50;
  NormalForm:FormGroup
  customerObj: any = {};
  CustomerUpdate: any = { };
  CustomerReg: any = { };
  CustomerActive: any = { };
  customerSub: any = { };
  customerregH: boolean = false
  customerUpdateH: boolean = false
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
      this.user = this.common.getUser();
      this.role = this.common.getRole();
      
      
      // this.reqObj.isMainChecker = this.role.isChecker;
      this.reqObj.menuId = this.common.getMainMenu().menuId;
      // this.isMainChecker = this.common.getMainMenu().isMainChecker;
      this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;

  }

  ngOnInit() {
   
    this.common.showLoading()
    myMethod();
    selectSearchMethod();
    this.countList()
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
    $(".user-arrow").click(function () {
      $(this).parent("th").find(".table-checkfilter").toggleClass("active");
      $('.tablesearch-content').mCustomScrollbar('update');
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


    this.NormalForm = this.formBuilder.group({

      reason: ['', Validators.maxLength(50)],

    });



    this.selectedCustomer.isCustomerRegistration = "true"
    this.selectedCustomer.isCustomerUpdate = "false"     
    this.selectedCustomer.isActiveOrDeactive = "false"
    this.selectedCustomer.isUnsubscribe = "false"



    //Customer Pending List
    this.apiService.post(this.constantsService.pendingCustTxnsList, this.selectedCustomer).subscribe((succ: any) => {
      
      this.common.hideLoading();
 
this.listCustomer = succ.data
        // this.customerObj = succ.data
     
    }, err => {
      this.common.hideLoading()

      
    })
  }


  countList(){
    // 1
    var countPush = []
    this.selectedCustomer.isCustomerRegistration = "true"
    this.selectedCustomer.isCustomerUpdate = "false"     
    this.selectedCustomer.isActiveOrDeactive = "false"
    this.selectedCustomer.isUnsubscribe = "false"


    //Customer Pending List
    this.apiService.post(this.constantsService.pendingCustTxnsList, this.selectedCustomer).subscribe((succ: any) => {
      
      this.common.hideLoading();
 
      countPush.push(succ.data.length)
this.CustomerReg = countPush

setTimeout(() => {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  });
}, 1000);
        // this.customerObj = succ.data
     
    }, err => {
      this.common.hideLoading()

      
    })




    // 2
    var countPush2 = []
    this.selectedCustomer.isCustomerRegistration = "false"
    this.selectedCustomer.isCustomerUpdate = "true"     
    this.selectedCustomer.isActiveOrDeactive = "false"
    this.selectedCustomer.isUnsubscribe = "false"


    //Customer Pending List
    this.apiService.post(this.constantsService.pendingCustTxnsList, this.selectedCustomer).subscribe((succ: any) => {
      
      this.common.hideLoading();
 
      countPush2.push(succ.data.length)
      this.CustomerUpdate = countPush2

     
    }, err => {
      this.common.hideLoading()

      
    })



    

    // 3
    var countPush3 = []
    this.selectedCustomer.isCustomerRegistration = "false"
    this.selectedCustomer.isCustomerUpdate = "false"     
    this.selectedCustomer.isActiveOrDeactive = "true"
    this.selectedCustomer.isUnsubscribe = "false"


    //Customer Pending List
    this.apiService.post(this.constantsService.pendingCustTxnsList, this.selectedCustomer).subscribe((succ: any) => {
      
      this.common.hideLoading();
 
      countPush3.push(succ.data.length)
      this.CustomerActive = countPush3

     
    }, err => {
      this.common.hideLoading()

      
    })


        // 3
        var countPush4 = []
        this.selectedCustomer.isCustomerRegistration = "false"
        this.selectedCustomer.isCustomerUpdate = "false"     
        this.selectedCustomer.isActiveOrDeactive = "false"
        this.selectedCustomer.isUnsubscribe = "true"
    
    
        //Customer Pending List
        this.apiService.post(this.constantsService.pendingCustTxnsList, this.selectedCustomer).subscribe((succ: any) => {
          
          this.common.hideLoading();
     
          countPush4.push(succ.data.length)
          this.customerSub = countPush4
    
         
        }, err => {
          this.common.hideLoading()
    
          
        })

  }
  ngOnDestroy() {

    this.reqObj = {
    "searchText": "",
    "noOfRecords": 100,
    "pageIndex": 1,
    "isMainChecker": false,
    "menuId": 0,
    "isCustomerUpdate": true,
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
  approveServices(data) {
    this.approve = true;
    $('#userModal').modal('show')
    data.title = "Alert message"
    data.body = "Are you sure you want to approve"
    this.selectedCustomer = data;
  }
  rejectServices(data) {
    this.approve = false;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reject"
    this.selectedCustomer = data;
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

  send() {
    
    let obj: any = {
      wfId: this.selectedCustomer.wfId
    }
    if (!this.approve) {

      if (!this.selectedCustomer.reason) {
        this.errMsg = true;
        return;
      }
      obj.reason = this.selectedCustomer.reason;

    } else {
      obj.isApprove = true;
    }
    // return;
   let url = this.constantsService.approveOrRejectCustomer
    
    // return;
    this.errMsg = false;
    // this.common.showLoading()

    this.apiService.post(url, obj).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.listCustomer = [];
        this.common.showSuccessMessage(succ.message);

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

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  gotoCustomer(data) {
    data.isApprove = true;
    this.common.setEditcustomerDetails(data)
    this.router.navigateByUrl('/home/customer-management');
  }

  singleClick(val)

  {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
  }, 1000);

    if(val == 1)
    {
  

  this.selectedCustomer.isCustomerRegistration = "true"
  this.selectedCustomer.isCustomerUpdate = "false"     
      this.selectedCustomer.isActiveOrDeactive = "false"
      this.selectedCustomer.isUnsubscribe = "false"
    }
     if (val == 2)
    {
      this.selectedCustomer.isCustomerUpdate = "true"
      this.selectedCustomer.isCustomerRegistration = "false"
      this.selectedCustomer.isActiveOrDeactive = "false"
      this.selectedCustomer.isUnsubscribe = "false"



    }
    if (val == 3){
      this.selectedCustomer.isActiveOrDeactive = "true"
      this.selectedCustomer.isCustomerUpdate = "false"
      this.selectedCustomer.isCustomerRegistration = "false"
      
      this.selectedCustomer.isUnsubscribe = "false"
    }
     if (val == 4){
      this.selectedCustomer.isUnsubscribe = "true"
      this.selectedCustomer.isActiveOrDeactive = "false"
      this.selectedCustomer.isCustomerUpdate = "false"
      this.selectedCustomer.isCustomerRegistration = "false"
    }

         //Customer Pending List
         this.apiService.post(this.constantsService.pendingCustTxnsList, this.selectedCustomer).subscribe((succ: any) => {
          
          this.common.hideLoading();
      if(succ.code = 200){
            this.listCustomer = succ.data;
            if(this.selectedCustomer.isCustomerRegistration === "true" ){
              var customer =  succ.data
              this.CustomerReg = customer.length

            }
            if(this.selectedCustomer.isCustomerUpdate === "true" ){
              var customer =  succ.data
              this.CustomerUpdate = customer.length

            }

            if(this.selectedCustomer.isActiveOrDeactive === "true" ){
              var customer =  succ.data
              this.CustomerActive = customer.length

            }
            if(this.selectedCustomer.isUnsubscribe === "true" ){
              var customer =  succ.data
              this.customerSub = customer.length

            }
      }
         
        }, err => {
          this.common.hideLoading()
      
          
        })


  }

  cancel(){
    $('#approveModale').modal('hide')
    $('#userModale').modal('hide')

  }
  
  showAprroveorRejecte(data, req)
  {
    this.customerObj.firstName = req.firstName
    this.customerObj.emailID = req.emailID
    this.customerObj.mobileNo = req.mobileNo
    this.customerObj.requestType = req.requestType
    this.customerObj.wfId = req.wfId
  
    if (data != 'approve') {
        this.approve = false
        $('#userModale').modal('show')

    } else {
      this.approve = true
      $('#approveModale').modal('show')


    }
  }

  sendOver(data) {
    this.common.showLoading()

    let obj: any = {
      wfId: this.customerObj.wfId
    }
    if (data != 'approve') {
      if (!this.customerObj.reason) {
        this.common.showErrorMessage("Reason is Must for Reject");
        // this.errReasonMsg = true;
        this.common.hideLoading();
        return;
      }
      obj.reason = this.customerObj.reason;
      // this.errReasonMsg = false;
    } else {
      obj.isApprove = true;
    }
    
    // return;

    this.apiService.post(this.constantsService.approveOrRejectCustomer, obj).subscribe((succ: any) => {
      

      this.common.hideLoading();
      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);
        // this.location.back();
        this.ngOnInit()
        $('#approveModale').modal('hide')
        $('#userModale').modal('hide')

        // this.back();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide')
      $('#approveModale').modal('hide')
      this.common.hideLoading();
      
    });
  }

  approveField(event, pattern, min, limitTo, id) {
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
   
  }


}
