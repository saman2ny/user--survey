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
@Component({
  selector: 'app-list-template-parameters',
  templateUrl: './list-template-parameters.component.html',
  styleUrls: ['./list-template-parameters.component.css']
})
export class ListTemplateParametersComponent implements OnInit, OnDestroy {

  isScroll: boolean;
  user: any = {};
  listTemplate: any = [];
  selectedUser: any;
  ServiceList: any = {};
  SelectForm: FormGroup;
  beforeListingTemplate: any = [];
  notiId: any;
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 1000,
    "pageIndex": 1,
  //  "statusFilter": "1",
    "isMainChecker":false,
    "menuId": 0,
  }
  selectedService: any;
  role: any;
  approve: boolean;
  errMsg: boolean;
  status: any = [

  ];
  // listOperator: any = [];
  selectedTemplateParameters: any = {};
  listTemplates: any = [];
  tmpParamStatus: any = "";
  AppOrRejForm: FormGroup;
  table: any;
  SearchValue:any;
  statusInActive: any = true;
  statusActive: any = true;
  statusApproved: any = true;
  statusPending: any = true;
  statusDraft: any = true
  statusReopen: any = true
  statusPendingForApproval: any = true
  listMainOperator: any = [];
  statusForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;

    this.SelectForm = this.formBuilder.group({
      listServices: ['', Validators.required],
    });

    // this.apiService.post(this.constantsService.getStatusM, this.reqObj).subscribe((succ: any) => {
      

    //   if (succ.data)
    //     this.status = succ.data;

    //   for (let i = 0; i < this.status.length; i++) {
    //     this.status[i].theCheckbox = true;
    //   }

    //   this.status.forEach((o, i) => {
    //     const control = new FormControl();
    //     (this.statusForm.controls.statusGroup as FormArray).push(control);
    //   });

    // }, err => {
    //   this.common.hideLoading()

      

    // })
  

  }
  
  resetSearch() {
    this.SearchValue = '';
$('.datatable').dataTable().fnDestroy();
this.initDatatable();
    }
    
  ngOnInit() {
    myMethod();

    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });

    this.common.showLoading();


    // this.apiService.post(this.constantsService.listServicesDropdown, this.reqObj).subscribe((succ: any) => {
    
    //   this.common.hideLoading()
    //   this.beforeListingTemplate = succ ? succ.data.serviceList : [];

    // }, err => {
    //   this.common.hideLoading()

    
    // }
    // )

    this.apiService.post(this.constantsService.listTemplateParameterByServices, this.reqObj).subscribe((succ: any) => {
      
      if(!succ.data){
        return;
      }
      // this.listTemplate = succ ? succ.data : [];
      this.listMainOperator = succ.data;

      
      this.listTemplate = Object.assign(this.listMainOperator, {})
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        this.loadJquery();
        this.initDatatable();

      }, 2500);

    }, err => {

      
    }
    ) 

    // setTimeout(() => {
    //   $('[data-toggle="tooltip"]').tooltip({
    //     trigger:'hover'
    //   });
    // }, 3000);   

  }

 onApprovalStatusChange(ApprovalStatus){


    this.common.showLoading()
    
    this.listTemplate = [];
    let temp = 0;
    for (let j = 0; j < this.listMainOperator.length; j++) {

      if (this.statusApproved && this.listMainOperator[j].status == "Approved") {
        this.listTemplate.push(this.listMainOperator[j]);
        temp++;
      }
      if (this.statusPending && this.listMainOperator[j].status == "Rejected") {
        this.listTemplate.push(this.listMainOperator[j]);

        temp++;

      }
      if (this.statusPending && this.listMainOperator[j].status == "Draft") {
        this.listTemplate.push(this.listMainOperator[j]);

        temp++;

      }
      if (this.statusPending && this.listMainOperator[j].status == "Reopen") {
        this.listTemplate.push(this.listMainOperator[j]);

        temp++;

      }
      if (this.statusPending && this.listMainOperator[j].status == "Pending For Approval") {
        this.listTemplate.push(this.listMainOperator[j]);

        temp++;

      }

    }
    if (temp == this.listMainOperator.length) {
      this.reqObj.isApprovalStatusFilter = false;
    } else {
      this.reqObj.isApprovalStatusFilter = true;

    }
    this.initDatatable();


  }
  
  onStatusChange(status) {
    this.common.showLoading()
        
        this.listTemplate = [];
        let temp = 0;
        for (let j = 0; j < this.listMainOperator.length; j++) {
    
          if (this.statusActive && this.listMainOperator[j].isActive == "true") {
            this.listTemplate.push(this.listMainOperator[j]);
            temp++;
          }
          if (this.statusInActive && this.listMainOperator[j].isActive == "false") {
            this.listTemplate.push(this.listMainOperator[j]);
    
            temp++;
    
          }
    
        }
        if (temp == this.listMainOperator.length) {
          this.reqObj.isStatusFilter = false;
        } else {
          this.reqObj.isStatusFilter = true;
    
        }
        this.initDatatable()
    
      }
      clearApprovedStatus(){
        this.listTemplate = this.listTemplate;
        this.initDatatable();
        this.reqObj.isStatusFilter = false;
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
      this.listTemplate = this.listMainOperator;
      this.initDatatable();
      this.reqObj.isStatusFilter = false;
      this.reqObj.isApprovalStatusFilter = false;
      
      this.statusActive = true
      this.statusInActive = true
      this.statusApproved = true
      this.statusDraft = true
      this.statusReopen = true
      this.statusPending = true
      this.statusPendingForApproval = true

  
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
    $('.datatable').dataTable().fnDestroy();

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

    this.common.hideLoading()
  }



  // search() {
  //   this.common.showLoading();
  //   this.apiService.post(this.constantsService.templateList, this.reqObj).subscribe((succ: any) => {
  
  //     this.common.hideLoading()
  //     if(!succ.data){
  //       return;
  //     }
  //     this.listTemplate = succ ? succ.data : [];

  //   }, err => {
  //     this.common.hideLoading()

  
  //   }
  //   )
  // }

  // onChange(notiId) {
   
  //   this.common.setEditService(notiId)
  //   this.reqObj["serviceId"] = notiId  
  //   this.common.showLoading();
  //   this.apiService.post(this.constantsService.listTemplateParameterByServices, this.reqObj).subscribe((succ: any) => {
  
  //     this.common.hideLoading()
  //     if(!succ.data){
  //       return;
  //     }
  //     this.listTemplate = succ ? succ.data : [];

  //   }, err => {
  //     this.common.hideLoading()

  
  //   }
  //   ) 
  // }

  ngOnDestroy() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    //  "statusFilter": "1",
      "isMainChecker":false,
      "menuId": 0,
    }
    // var notiId = {};
    // this.common.setEditTemplateParams(notiId)
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


  addTemplate() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
     // "statusFilter": "1",
      "isMainChecker":false,
      "menuId": 0,
    }
    var notiId = {};
    this.common.setEditTemplateParams(notiId)
    this.isScroll = true;
    this.router.navigate(['../home/service-management/add-template/']);

  }


  deleteTemplate() {
    this.common.showLoading()
    let obj={ id: this.selectedTemplateParameters ,isMainChecker:this.reqObj.isMainChecker }
    this.apiService.post(this.constantsService.deleteTemplateParameters, obj).subscribe((succ: any) => {
      
      $('#TemplateModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();

        this.ngOnInit();
  
  //  var notiId = this.reqObj["serviceId"]
  //       this.onChange(notiId);
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#TemplateModal').modal('hide')

      this.common.hideLoading();
      
    });

  }

  showModal(id) {
    
    $('#TemplateModal').modal('show')
    this.selectedTemplateParameters = id;
  }

  
  showModalDraft(wfId){
    $('#draftModal').modal('show')
    this.selectedTemplateParameters = wfId;
  }

  deleteDraft() {
    this.common.showLoading()
    let obj = { wfId: this.selectedTemplateParameters}
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

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  onChangeStatus(id) {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.reqObj.searchText = "";
    this.ngOnInit();
  }

  gotoParams(data) {
    // var notiId = { "notiId": id };
    // this.common.setEditTemplateParams(notiId)
    
    // this.router.navigateByUrl('/home/service-management/add-template');
    if(data.status  == "Draft")
    {
      data.status = "1";
      this.common.setEditTemplateParams(data);
      
      this.router.navigateByUrl('/home/service-management/add-template');
    }
    if(data.status  == "Approved")
    {
      data.status = "2";
      this.common.setEditTemplateParams(data);
      
      this.router.navigateByUrl('/home/service-management/add-template');
    }
    if(data.status  == "Pending For Approval")
    {
      data.status = "3";
      this.common.setEditTemplateParams(data);
      
      this.router.navigateByUrl('/home/service-management/add-template');
    }
    if(data.status  == "Rejected")
    {
      data.status = "4";
      this.common.setEditTemplateParams(data);
      
      this.router.navigateByUrl('/home/service-management/add-template');
    }
    if(data.status  == "Reopen")
    {
      data.status = "5";
      this.common.setEditTemplateParams(data);
      
      this.router.navigateByUrl('/home/service-management/add-template');
    } 
  }

  approveTemplateParam(data) {
    // this.approve = true;
    this.tmpParamStatus = 2;
    $('#userModal').modal('show')
    data.title = "Alert message"
    data.body = "Are you sure you want to approve"
    this.selectedTemplateParameters = data;


  }
  rejectTemplateParam(data) {
    // this.approve = false;
    this.tmpParamStatus = 4;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reject"
    this.AppOrRejForm.get('reason').reset()
    this.selectedTemplateParameters = data;
  }

  reopenTemplateParam(data) {
    this.tmpParamStatus = 5;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reopen"
    this.AppOrRejForm.get('reason').reset()
    this.selectedTemplateParameters = data;
  }

  send() {
    let url;
    // if (!this.approve) {
    //   if (!this.selectedTemplateParameters.reason) {
    //     this.errMsg = true;
    //     return;
    //   }
    //   url = this.constantsService.rejectTemplateParameters
    // } else {
    //   url = this.constantsService.approveTemplateParameters
    // }

    if (this.tmpParamStatus == 4) {
      if (!this.selectedTemplateParameters.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.rejectTemplateParameters
    } else if (this.tmpParamStatus == 2) {
      url = this.constantsService.approveTemplateParameters
    }
    if (this.tmpParamStatus == 5) {
      if (!this.selectedTemplateParameters.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.reopenTemplateParameterss
    }

    
    this.errMsg = false;
    this.common.showLoading()
    this.apiService.post(url, { wfId: this.selectedTemplateParameters.wfId, reason: this.selectedTemplateParameters.reason }).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        // this.listTemplates = [];
        this.common.showSuccessMessage(succ.message);
        //   var notiId = this.common.getEditService()
        // this.onChange(notiId)
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

  // gotToApprove(data) {

  //   data.status=this.reqObj.statusFilter;
  //   this.common.setEditTemplateParams(data);
  //   this.router.navigateByUrl('/home/service-management/add-template');
    
  // }

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
