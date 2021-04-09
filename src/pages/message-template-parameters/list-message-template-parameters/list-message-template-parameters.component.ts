import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
// import { AnyNaptrRecord } from 'dns';


@Component({
  selector: 'app-list-message-template-parameters',
  templateUrl: './list-message-template-parameters.component.html',
  styleUrls: ['./list-message-template-parameters.component.css']
})
export class ListMessageTemplateParametersComponent implements OnInit {
  @Input('maxLength') public maxLength = 2;

  approve: boolean;
  AppOrRejForm : FormGroup;
  role: any;
  user: any = {};
  listTemplate: any = [];
  isScroll: boolean;
  listChannels: any = [];
  reqObj:any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "statusFilter": 1,
    "isMainChecker":false,
    "menuId": 0,
    "channelID":1
  }
  status: any = [

  ];
  SearchValue:any;
  selectedPromotion: any;

  isMainChecker: number = 0;
  selectedUser: any = {};
  errMsg: boolean;
  channelId: any = {

  };
  isActiveChannel :boolean = false
  selectedCampaignTemplate: any = {

  };
  templateStatus: any = "";
  finally: any[];
  showTables: boolean
  channelIdChange: any;

  constructor(public formBuilder: FormBuilder,private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {

      this.user = this.common.getUser();
      this.role = this.common.getRole();
      
      
      // this.reqObj.isMainChecker = this.role.isChecker;
      this.reqObj.menuId = this.common.getMainMenu().menuId;
      // this.isMainChecker = this.common.getMainMenu().isMainChecker;
      this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;
  }

  onChangeSelect(id) {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.reqObj.searchText = "";
    this.ngOnInit();
  }

  addTemplate()
{

  this.reqObj = {
    "searchText": "",
    "noOfRecords": 1000,
    "pageIndex": 1,
    "statusFilter": 1,
    "isMainChecker":false,
    "menuId": 0,
    "channelID":1

  }
  

  
  if(this.channelIdChange === undefined || this.channelIdChange === "undefined" || this.channelIdChange === null || this.channelIdChange === ""
  ){
    // alert("default")
    const channelList: any =  this.listChannels;

    let dupObj = channelList[0]
    
    this.common.setEditServiceActiveChannels(dupObj)
    this.router.navigateByUrl('/home/message-template-management/message-template');
  }else
  {
    // alert("nondefault")

    const channelList: any =  this.listChannels;
    let obj;
    for (var i = 0; i < channelList.length; i++) {
      if (this.channelIdChange == channelList[i].channelId) {
        
        // channelList[i].active = 1
        
        obj = channelList[i]
  
      }
    }
  
    this.common.setEditServiceActiveChannels(obj)
    this.router.navigateByUrl('/home/message-template-management/message-template');
  }


  // if (_.isEmpty(this.channelId)) {
  //   var channelDescp =  this.listChannels[0]
  //   var tempChannels = channelDescp;
  //   this.common.setEditServiceActiveChannels(tempChannels)
  //   this.router.navigateByUrl('/home/message-template-management/message-template');
    
  // }
  // else
  // {
  //   var channelDescp =  this.channelId
  //   var tempChannels = channelDescp;
  //   this.common.setEditServiceActiveChannels(tempChannels)
  //   this.router.navigateByUrl('/home/message-template-management/message-template');
    
  // }

}

  ngOnInit() {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
  }, 1000);
    myMethod();
    selectSearchMethod();
    this.common.setEditMessageTemplate({})
    this.common.setEditServiceActiveChannels({})


  this.AppOrRejForm = this.formBuilder.group({
    reason: ['']
  });

  this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
    this.listChannels = succ.data.channel;
    var channelDup = 1
this.showSms(channelDup, "default")
    
  }, err => {
    
  })
//   setTimeout(() => {
// this.common.hideLoading()
// var channelDup = 1
// this.showSms(channelDup, "default")
// }, 5000);

  }
 

  showSms(langId, mPush?){
    

    this.common.showLoading();
    this.apiService.post(this.constantsService.campaignTemplateLists, this.reqObj).subscribe((succ: any) => {
      
   
  
      const langList: any = succ.data;
      let obj;
      this.finally = [];
      for (var i = 0; i < langList.length; i++) {
        if (langId == langList[i].channelId) {
          
          obj = langList[i]
          this.finally.push(obj)
                  
  
  
        }
      }
      
  
  
        // this.listTemplate = this.finally ? this.finally : ["NO DaTA"];
        // this.showTables = true
        
      
        
        setTimeout(() => {
          $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
          });
           this.loadJquery();
           
           if(mPush === "changed")
           {
            this.initDatatable();
            this.listTemplate = this.finally ? this.finally : ["NO DaTA"];
            this.showTables = true
            this.common.hideLoading();

            
           }if(mPush === "default")
           {
        
            // this.reinitTable();
  
            this.initDatatable();
            this.listTemplate = this.finally ? this.finally : ["NO DaTA"];
            this.showTables = true
            
            $(function() {
              $('#load0').addClass('active');
              }); 
              this.common.hideLoading()
 
           }
      
  
        }, 1500);
     
    }, err => {
      this.common.hideLoading()
      
    })
  }

  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      // this.initDatatable();
      this.common.hideLoading()
  
  
    }, 1000);
  }


  initDatatable() {
    $('.datatable').dataTable().fnDestroy();
  
    setTimeout(() => {
    //  alert("2")
    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      // aaSorting: [[0, 'asc']],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
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
    // $(".user-arrow").click(function () {
    //   $(this).parent("th").find(".table-checkfilter").toggleClass("active");
    //   $('.tablesearch-content').mCustomScrollbar('update');
    // });
   $(".user-arrow").click(function () {
      $(this).parent("th").find(".table-checkfilter").toggleClass("active");
      $('.tablesearch-content').mCustomScrollbar('update');
      $(this).toggleClass("filter-close").removeClass('filter-open')
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

  getchannelId(channels, e:any){
    
    this.channelId = channels
    this.channelIdChange = channels.channelId
    this.reqObj.channelID = channels.channelId
    // if(channels.channelId == 1){
    //   this.isActiveChannel = true
    // }
    // this.isActiveChannel = !this.isActiveChannel
    // this.gotoActive(channelId)
  

    

  var className = e.target.className

  $(this).closest('." '+ className + ' "').prev('.active').removeClass('active');

  $(this).closest('." '+ className + ' "').prev('.active').addClass('active');

    var langId =  this.channelIdChange
    this.showSms(langId, "changed")
  }

  getAccessRole(role){  
    let access=this.role[role]?false:true;   
    return access;    
  }  

  onScroll() {
    
    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }

  changeSearch(val) {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
      if(val.length <= this.maxLength)
      {
        
      }
      else
      {
        this.ngOnInit();
        
      }
    
  }

  getChannelName(id) {
    let branch = this.listChannels.filter(
      bran => {        
        if (bran.channelId   == parseInt(id) )
          return bran;
      });
    if(branch.length)
    return branch[0].channelDesc
  }  

  showModal(id) {
    
    $('#serviceModal').modal('show')
    this.selectedCampaignTemplate = id;
  }
  
  approveMsgTemplates(data) {
    this.templateStatus = 2;
    $('#userModal').modal('show')
    data.title = "Alert Message"
    data.body = "Are You Sure You want to Approve"
    this.selectedCampaignTemplate = data;
  }
  
  rejectMsgTemplates(data) {
    this.templateStatus = 4;
      $('#userModal').modal('show');
      data.title = "Alert message"
      data.body = "Are you sure you want to reject"
      this.AppOrRejForm.get('reason').reset()
      this.selectedCampaignTemplate = data;
  }
  
  reopenMsgTemplates(data) {
    this.templateStatus = 5;
    $('#userModal').modal('show');
    data.title = "Alert message"
    data.body = "Are you sure you want to reopen"
    this.AppOrRejForm.get('reason').reset()
    this.selectedCampaignTemplate = data;
  }
  
  send() {
    let url;
    if (this.templateStatus == 4) {
      if (!this.selectedCampaignTemplate.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.rejectCampaignTemplates
    } else if (this.templateStatus == 2) {
      url = this.constantsService.approveCampaignTemplates
    }
    if (this.templateStatus == 5) {
      if (!this.selectedCampaignTemplate.reason) {
        this.errMsg = true;
        return;
      }
      url = this.constantsService.reopenCampaignTemplates
    }
  
    
    // return;
    this.errMsg = false;
    this.common.showLoading()
  
    this.apiService.post(url, { wfId: this.selectedCampaignTemplate.wfId, reason: this.selectedCampaignTemplate.reason }).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')
  
      this.common.hideLoading();
      if (succ.code == 200) {
        
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();

        var langId= 1

        this.showSms(langId, "default")

        // this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#userModal').modal('hide')
      this.common.hideLoading();
      
    });
  
  }
  
  clearAllFilter(){
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.initDatatable()
  }
  deleteCampaignTemplate(){

  
  
  var deletee = {"id": this.selectedCampaignTemplate, "isMainChecker": this.isMainChecker}
  
  this.apiService.post(this.constantsService.deleteCampaignTemplates, deletee).subscribe((succ: any) => {
    
    
    if(succ.code == 200){
      this.common.showSuccessMessage(succ.message)
      $('#serviceModal').modal('hide');
      this.ngOnInit();
    }
    this.common.hideLoading()   
  }, err => {
    $('#serviceModal').modal('hide');
    this.common.hideLoading()
    
  }
  )
  }

  
  showModalDraft(wfId){
    $('#draftModal').modal('show')
    this.selectedCampaignTemplate = wfId;
  }

  deleteDraft() {
    this.common.showLoading()
    let obj = { wfId: this.selectedCampaignTemplate}
    this.apiService.post(this.constantsService.deleteDraftCampaignTemplate, obj).subscribe((succ: any) => {
      
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

  goToCampaignTemplate(data){
    if (data.status == 'Approved')
    {
      data.statusValue = 2;
      this.common.setEditMessageTemplate(data)
      this.router.navigateByUrl('/home/message-template-management/message-template');
    }
      if (data.status == 'Draft')
      {
        data.statusValue = 1;
        this.common.setEditMessageTemplate(data)
        this.router.navigateByUrl('/home/message-template-management/message-template');
      }
      if (data.status == 'Pending For Approval')
      {
        data.statusValue = 3;
        this.common.setEditMessageTemplate(data)
        this.router.navigateByUrl('/home/message-template-management/message-template');
      }
      if (data.status == 'Rejected')
      {
        data.statusValue = 4;
        this.common.setEditMessageTemplate(data)
        this.router.navigateByUrl('/home/message-template-management/message-template');
      }
      if (data.status == 'Reopen')
      {
        data.statusValue = 5;
        this.common.setEditMessageTemplate(data)
        this.router.navigateByUrl('/home/message-template-management/message-template');
      }
      // data.status = this.reqObj.statusFilter;
  
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

  ngOnDestroy() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 1000,
      "pageIndex": 1,
      "statusFilter": 1,
      "isMainChecker":false,
      "menuId": 0,
      "channelID":1

    }
  }
}
