import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { spaceValidator } from 'src/service/utils';


declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  manageCustomer: any = [];
  reqCust: any = {}
  customerObj: any = {

    channel: []


  }
  CustomerForm: FormGroup
  CustomerFormGrid: FormGroup
  SubForm: FormGroup;
  ActiveForm: FormGroup;
  showDetails: boolean = false
  role: any;
  hours: any = [];
  listBranchs = [];
  edit: any = {};
  isApprove: boolean;
  RoleDisable: boolean = false;
  errReasonMsg: boolean;
  isEdit: boolean = false;
  listSenderId: any = [];
  listOperatorId: any = [];
  listLanguageId: any = []
  listChannelId: any = [];
  listPriorityId: any = [];
  listCategoryId: any = [];
  listChannelIdDup: any = [];
  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
  selectedCorpPreMobileNo = "in"
  theCheckbox = false;
  operatorObjselectedGroups: any;
  listAllCustomerLogs: any = [];
  isScroll: boolean;
  Edit: boolean = false;

  updateButton: boolean = false;
  SubmitButton: boolean = false;
  showNames: boolean = false
  showAdd: boolean = true
  firstName: any;
  CustomerTopForm: FormGroup;
  customerObjs: any = {

  }
  listAllTmpCustomers: any = [];
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "isMainChecker": false,
    "menuId": 0
  }

  reqObjs = {
    "customerNumber": ""
  }
  user: any;
  table: any;
  channelId: any;

  maxIncidentReasonLength: number = 50;
  approve: boolean;
  logsHideDetails: boolean;
  defaultTrue: boolean = false
  listClasscode = [];
  notiDesc: boolean = false
  preVEmail: any = {};
  premobileNo: any = {};
  prefirstName: any = {};
  presubUnSub: any = {};
  preassociatemobileNo: any = {};
  prechannel: any;
  prechannel2: any;
  updateEmail: any = {};
  updatemobileNo: any = {};
  updatefirstName: any = {};
  updatesubUnSub: any = {};
  updateassociatemobileNo: any = {};
  updatechannel: any = {};

  precreatedTime: any = {}
  precreatedTime2: any = {}
  updatecreatedTime: any = {}
  updatecreatedTime2: any = {}

  preChannel: any = {}
  updateChannel: any = {}
  preLang: any = {}
  updateLang: any = {}
  updateActive: any = {}
  preActive: any = {}

  preBranchId: any = {}
  updateBranchId: any = {}

  beastMode: boolean
  emailMode: boolean
  mobileMode: boolean
  timeMode: boolean
  langMode: boolean
  channelMode: boolean
  branchMode: boolean
  showBranche: boolean
  editFirstName: boolean
  isActivveDeactive: boolean
  isSubUnsub: boolean
  defaultTrue2: boolean = false
  temp: any = {};
  pluginVali: boolean;
  active: boolean = true;
  sub: boolean = true;
details : any ={};
  CustomerFormGridOld: any ={};
  CustomerFormGridNew: any ={};
  SubFormOld: any ={};
  SubFormNew: any ={};
  ActiveFormOld: any ={};
  ActiveFormNew: any ={};
  CustomerTopFormOld: any ={};
  CustomerTopFormNew: any = {};
  adminUser: any;
  CountryISO: any = [];

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) {


    this.allCounties = this.countryService.allCountries;
    this.SubmitButton = true

    this.CountryISO = this.countryService.getcountryCode();

    this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
      this.common.hideLoading();      
      
      this.listChannelId = succ.data.channel; 
      this.listChannelId.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.CustomerFormGrid.controls.channelId as FormArray).push(control);
      });
      
    }, err => {
      
    })

    this.apiService.post(this.constantsService.getActiveLanguages, {}).subscribe((succ: any) => {
      this.common.hideLoading();     
      this.listLanguageId = succ.data;
      
    }, err => {
      
    })

    this.user = this.common.getUser();
    this.details =  this.user.data["userGroupName"]
    this.adminUser =  this.user.data.adminUser
    
// this.customerObj.companyIdLoad =  this.user["companyId"]
this.customerObj.branchId =  this.user.data["branchId"]


if((this.adminUser === true && this.details==="Company") || this.details === "Super Admin"){
 
this.showBranche = false
  this.apiService.post(this.constantsService.listBranchMain, {}).subscribe((succ: any) => {
    this.listBranchs = succ.data;
    this.listBranchs.forEach((o, i) => {
      
      var arrat = []
      if(o.branchId === this.customerObj.branchId){
        arrat.push(o)
        

        this.listBranchs = arrat ;
        

      }
    }); 
    
  }, err => {
    
  })

}

else if(this.details === "Branch"){
 
  this.showBranche = false

  this.apiService.post(this.constantsService.listBranchMain, {}).subscribe((succ: any) => {
    this.listBranchs = succ.data;
    this.listBranchs.forEach((o, i) => {
      
      var arrat = []
      if(o.branchId === this.customerObj.branchId){
        arrat.push(o)
        

        this.listBranchs = arrat ;
        

      }
    }); 
    
  }, err => {
    
  })

}else
{
  this.showBranche = true

  this.apiService.post(this.constantsService.listBranchMain, {}).subscribe((succ: any) => {
    this.listBranchs = succ.data;
    
  }, err => {
    
  })

}


    this.role = this.common.getRole();
    
    
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;

    // this.apiService.post(this.constantsService.listBranchMain, {}).subscribe((succ: any) => {
    //   this.listBranchs = succ.data;
    
    // }, err => {
    
    // })

    this.apiService.post(this.constantsService.listCustClassCode, {}).subscribe((succ: any) => {
      this.listClasscode = succ.data;
      
    }, err => {
      
    })

    this.common.showLoading();



  }


  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }


  ngOnInit() {


    this.showNames = true
    this.showAdd = false
    myMethod();
    selectSearchMethod();




    this.CustomerTopForm = this.formBuilder.group({
      firstName: ['', Validators.required],
    })

    this.CustomerTopForm.patchValue(this.CustomerTopForm) 



    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);



    this.CustomerForm = this.formBuilder.group({
      customerNumber: ['', Validators.compose([Validators.required, Validators.maxLength(300)])]
    });
    
    this.CustomerFormGrid = this.formBuilder.group({
      customerNumber: ['', [Validators.required, spaceValidator]],
      firstName: ['', [Validators.required, spaceValidator]],
      mobileNo: ['', Validators.compose([Validators.required])],
      nationalID: ['', [Validators.required, spaceValidator]],
      branchId: [''],
      classCode: ['', Validators.required],
      emailID: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      messageLanguageID: ['', Validators.required],
      noMsgStartTime: ['', Validators.required],
      noMsgEndTime: ['', Validators.required],
      // status: [''],
      // reason: [''],
      associatemobileNo: ['',Validators.required],
      showSelectChannel: [''],
      channelId: new FormArray([], this.minSelectedCheckboxes(1)),
    });


    this.CustomerFormGrid.patchValue(this.CustomerFormGrid) 

    this.CustomerFormGrid.controls['associatemobileNo'].disable()


    this.SubForm = this.formBuilder.group({
      subUnSub: [''],
      subReasons: ['']
    })

    this.SubForm.patchValue(this.SubForm) 


    this.ActiveForm = this.formBuilder.group({
      status: [''],
      reasons: ['']
    })
    this.ActiveForm.patchValue(this.ActiveForm) 

    

    this.edit = this.common.getEditcustomerDetails()
    if (_.isEmpty(this.edit)) {
      this.Edit = false
      this.customerObj.status = true
      this.customerObj.subUnSub = true
      this.logsHideDetails = false
      this.temp.status = "new";
      if(this.details === "Branch"){
         this.CustomerFormGrid.controls['branchId'].disable()
      } else {
        this.CustomerFormGrid.controls['branchId'].enable()
      }


    }
    else if (this.edit.isApprove) {
      
      this.logsHideDetails = true

      this.isApprove = true;

      this.showAdd = true

      
      this.temp.status = "new";
      this.temp.status = "channel";
      this.temp.status = "search";


      this.CustomerFormGrid.disable();
      this.SubForm.disable()
      this.ActiveForm.disable()
      this.RoleDisable = true;
      this.common.showLoading();
      this.apiService.post(this.constantsService.getCustomerApproveData, this.edit).subscribe((succ: any) => {
        
        if (succ.code == 200) {

          let newValue = JSON.parse(succ.data.txnTableData.new_DTLS);
          
          this.customerObj = newValue
          this.customerObj.txn_CODE = succ.data.txnTableData.txn_CODE
          this.customerObj.phoneNo = newValue.mobileNo
          this.customerObj.wfId = succ.data.txnTableData.wf_ID;
          this.customerObj.status = JSON.parse(newValue.status);
          this.customerObj.subUnSub = JSON.parse(newValue.subUnSub);

          this.firstName = newValue.firstName;
          //  var status = newValue.status
          

          //inga thappu nadakuthu ama ji
          if (this.customerObj.status === true || this.customerObj.status === "true") {
            this.defaultTrue = false
            this.active= true
          }
          else {
            this.defaultTrue = true
            this.active= false

          }

          var subUnSub = newValue.subUnSub
          

          if (this.customerObj.subUnSub === true || this.customerObj.subUnSub === "true") {
            this.defaultTrue2 = false
            this.sub= true

          }
          else {
            this.defaultTrue2 = true
            this.sub= false

          }




          





          let ch = newValue.channel
          this.customerObj.channel = [];

          setTimeout(() => {


            for (let i = 0; i < this.listChannelId.length; i++) {
              for (let j = 0; j < ch.length; j++) {
                if (ch[j] == this.listChannelId[i].channelId)
                  // this.onChangeService(this.listChannelId[i])
                  this.listChannelId[i].isChecked = true;
              }
            }
            this.customerObj.channel = ch;
            // this.customerObj.selectAllChannels = ch




          }, 3000);



          //Mobile No
          var mobile = _.split(this.customerObj.mobileNo, '-', 2);
          this.customerObj.opPreMobileNo = mobile[0]
          this.customerObj.opPostMobileNo = mobile[1]

          var mobile = _.split(this.customerObj.mobileNo, '-', 2);
          this.CustomerFormGrid.controls.mobileNo.setValue(mobile[1]);
          let countryCode: any = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });
          countryCode = countryCode[0]
          this.selectedCorpPreMobileNo = countryCode[1];

          //Associate Mon No
          if (succ.data.txnTableData.new_DTLS.associatemobileNo == " " || succ.data.txnTableData.new_DTLS.associatemobileNo == null || succ.data.txnTableData.new_DTLS.associatemobileNo == undefined || succ.data.txnTableData.new_DTLS.associatemobileNo == "undefined") { this.customerObj.associatemobileNo == " " } else {
            var assomobile = _.split(succ.data.txnTableData.new_DTLS.associatemobileNo, '-', 2);
            this.customerObj.opPreMobileNo = assomobile[0]
            this.customerObj.opPostMobileNo = assomobile[1]

            var assomobile = _.split(this.customerObj.associatemobileNo, '-', 2);
            this.CustomerFormGrid.controls.associatemobileNo.setValue(assomobile[1]);
            let countryCodee: any = this.allCounties.filter(element => {
              return element[2] == mobile[0];
            });
            countryCodee = countryCodee[0]
            this.selectedCorpPreMobileNo = countryCodee[1];
          }



          let previousData = succ.data.mainTableData;
          let newData = newValue;
          


          let check = newValue.associatemobileNo
          this.preassociatemobileNo = previousData.associatemobileNo
          //  this.preassociatemobileNo = " "
          let f = _.includes(check, this.preassociatemobileNo);
          let ff = !f
          //  alert(ff)
          if (ff != false) { this.beastMode = true } else { this.beastMode = false; }


          let check2 = newValue.emailID
          this.preVEmail = previousData.emailID
          let f2 = _.includes(check2, this.preVEmail);
          let fff = !f2
          //  alert(ff)
          if (fff != false) { this.emailMode = true } else { this.emailMode = false; }


          let check3 = this.customerObj.phoneNo
          this.premobileNo = previousData.mobileNo
          let f3 = _.includes(check3, this.premobileNo);
          let ffff = !f3
          //  alert(ff)
          if (ffff != false) { this.mobileMode = true } else { this.mobileMode = false; }


          let check4 = newValue.firstName
          this.prefirstName = previousData.firstName
          let f4 = _.includes(check4, this.prefirstName);
          let fffffffff = !f4
          //  alert(ff)
          if (fffffffff != false) { this.editFirstName = true } else { this.editFirstName = false; }





          let check5 = newValue.noMsgStartTime
          let check66 = previousData.noMsgStartTime
          let f5 = _.includes(check5, check66);
          let check77 = newValue.noMsgEndTime
          var preEndTime = previousData.noMsgEndTime
          let f55 = _.includes(check77, preEndTime);
          if (f5 == false || f55 == false) {
            // alert("true")
            this.timeMode = true
          } else {
            this.timeMode = false
          }



          let check6 = newValue.messageLanguageID
          this.precreatedTime = previousData.messageLanguageID
          let f6 = _.includes(check6, this.precreatedTime);
          let fffffff = !f6
          //  alert(ff)
          if (fffffff != false) { this.langMode = true } else { this.langMode = false; }

          //  channelMode : boolean


          let check7 = newValue.channel
          this.precreatedTime = previousData.channel
          let f7 = _.includes(check7, this.precreatedTime);
          let ffffffff = !f7
          //  alert(ff)
          if (ffffffff != false) { this.channelMode = false } else { this.channelMode = false; }


          let check8 = JSON.parse(newValue.status)
          var newSttaus = JSON.parse(previousData.status)
          let fffff =! _.isEqual(check8, newSttaus);
          // alert(fffff)
          if (fffff === true) {
            this.isActivveDeactive = true
          }else
          {
            this.isActivveDeactive = false;
          }
          // if(check8 != newSttaus){this.isActivveDeactive = false } else { this.isActivveDeactive = true; }


          let check9 = JSON.parse(newValue.subUnSub)
          var newSubUnsub  = JSON.parse(previousData.subUnSub)
          let clease =! _.isEqual(check9, newSubUnsub);

             if (clease === true) {
            this.isSubUnsub = true
          }else
          {
            this.isSubUnsub = false;
          }
          // if(check9 != newSubUnsub){this.isSubUnsub = false } else { this.isSubUnsub = true; }


          let check10 = newValue.branchId
          let updateBranch = previousData.branchId
          let f10 = _.includes(check10, updateBranch);
          let ffffffffffff = !f10
          // alert(ffffffffffff)
          if (ffffffffffff != false) { this.branchMode = true } else { this.branchMode = false; }


          this.preBranchId = previousData.branchId
          this.preLang = previousData.messageLanguageID
          let preCreatedTime = previousData.noMsgStartTime
          let preEndTimee = previousData.noMsgEndTime
          this.preVEmail = previousData.emailID
          this.premobileNo = previousData.mobileNo
          this.prefirstName = previousData.firstName
          this.presubUnSub = previousData.subUnSub
          this.preActive = previousData.status
          this.preassociatemobileNo = previousData.associatemobileNo
          // this.prechannel = previousData.channel
          var bindprechannel = previousData.channel

          this.updateBranchId = newValue.branchId
          this.updateChannel = newValue.channel
          this.updateLang = newValue.messageLanguageID
          let UpdatedCreatedTime = newValue.noMsgStartTime
          let UpdatedEndTime = newValue.noMsgEndTime
          this.updateEmail = newValue.emailID
          this.updatemobileNo = this.customerObj.phoneNo
          this.updatefirstName = newValue.firstName
          this.firstName = newValue.firstName
          this.updatesubUnSub = newValue.subUnSub
          this.updateActive = newValue.status
          this.updateassociatemobileNo = newValue.associatemobileNo
          this.updatechannel = newValue.channel



          // CREATED

          // this.precreatedTime = moment(preCreatedTime, 'h:mm A');
          

          var now = moment(preCreatedTime).format('h:mm A');
          this.precreatedTime = now




          this.precreatedTime2 = moment(preEndTimee).format('h:mm A');
          
          //UPDATED

          this.updatecreatedTime = moment(UpdatedCreatedTime).format('h:mm A');
          

          this.updatecreatedTime2 = moment(UpdatedEndTime).format('h:mm A');
          


          if (this.updatesubUnSub === true) {
            this.updatesubUnSub = "SUBSCRIBE"
          } else {
            this.updatesubUnSub = "UNSUBSCRIBE"
          }


          if (this.presubUnSub === "true") {
            this.presubUnSub = "SUBSCRIBE"
          } else {
            this.presubUnSub = "UNSUBSCRIBE"
          }


          if (this.updateActive === true) {
            
            this.updateActive = "ACTIVE"
          } else {
            this.updateActive = "DEACTIVE"
          }


          if (this.preActive === "true") {
            this.preActive = "ACTIVE"
          } else {
            this.preActive = "DEACTIVE"
          }












        } else {
          this.common.showErrorMessage(succ.message);
        }
      }, err => {
        this.common.hideLoading();
        this.common.showErrorMessage(err.message)

        
      })
    }
    else {
      
      this.notiDesc = true
      this.logsHideDetails = true
      // this.temp.status = "new";
        this.temp.status = "search"
      this.CustomerFormGrid.controls['customerNumber'].disable();
      this.CustomerFormGrid.controls['nationalID'].disable();
      this.CustomerFormGrid.controls['branchId'].disable();
      this.CustomerFormGrid.controls['classCode'].disable();
     
      this.Edit = true;
      this.updateButton = true;
      this.SubmitButton = false;
      this.showNames = false
      this.showAdd = true
      this.common.showLoading();
      this.apiService.post(this.constantsService.getCustomerDetails, this.edit).subscribe((succ: any) => {
        this.common.hideLoading();
        this.customerObj = succ.data;
        this.customerObj.status = JSON.parse(succ.data.status);
        this.customerObj.subUnSub = JSON.parse(succ.data.subUnSub);

        
        if (succ.code == 200) {

          this.customerObj = succ.data

          //Subscription
          this.firstName = succ.data.firstName

          if (this.customerObj.status === true || this.customerObj.status === "true") {
            this.defaultTrue = false
            this.active= true
          }
          else {
            this.defaultTrue = true
            this.active= false

          }


          if (this.customerObj.subUnSub === true || this.customerObj.subUnSub === "true") {
            this.defaultTrue2 = false
            this.sub= true

          }
          else {
            this.defaultTrue2 = true
            this.sub= false

          }

          // this.customerObj.channelId = succ.data.channel

          // let ch = JSON.parse(this.customerObj.channelId)

          
          this.CustomerFormGrid.controls.firstName.setValue(succ.data.firstName);
          
          //Used for edit Dup
          this.CustomerTopForm.controls.firstName.setValue(succ.data.firstName);

          // this.customerObj.channelId = [];
          let ch = JSON.parse(succ.data.channel)
          this.customerObj.channel = [];

          setTimeout(() => {


            for (let i = 0; i < this.listChannelId.length; i++) {
              for (let j = 0; j < ch.length; j++) {
                if (ch[j] == this.listChannelId[i].channelId)
                  // this.onChangeService(this.listChannelId[i])
                  this.listChannelId[i].isChecked = true;
              }
            }
            this.customerObj.channel = ch;
            // this.customerObj.selectAllChannels = ch





          }, 2000);

          //Mobile No
          var mobile = _.split(this.customerObj.mobileNo, '-', 2);
          this.customerObj.opPreMobileNo = mobile[0]
          this.customerObj.opPostMobileNo = mobile[1]

          var mobile = _.split(this.customerObj.mobileNo, '-', 2);
          this.CustomerFormGrid.controls.mobileNo.setValue(mobile[1]);
          let countryCode: any = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });
          countryCode = countryCode[0]
          this.selectedCorpPreMobileNo = countryCode[1];

          //Associate Mon No
          var assomobile = _.split(this.customerObj.associatemobileNo, '-', 2);
          this.customerObj.opPreMobileNo = assomobile[0]
          this.customerObj.opPostMobileNo = assomobile[1]

          var assomobile = _.split(this.customerObj.associatemobileNo, '-', 2);
          this.CustomerFormGrid.controls.associatemobileNo.setValue(assomobile[1]);
          let countryCodee: any = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });
          countryCodee = countryCodee[0]
          this.selectedCorpPreMobileNo = countryCodee[1];

          setTimeout(() => {

    // Customer From
    // Customer From
    // Customer From
            this.CustomerFormGridOld = this.CustomerFormGrid.value

                this.CustomerFormGrid.valueChanges.subscribe(value => {
                  
                  
                  this.CustomerFormGridNew = value 
                });


                //Subscribtion
                //Subscribtion
                //Subscribtion
                this.SubFormOld = this.SubForm.value

                this.SubForm.valueChanges.subscribe(value => {
                
                
                this.SubFormNew = value 
                });

                //Active
                //Active
                //Active
                this.ActiveFormOld = this.ActiveForm.value

                this.ActiveForm.valueChanges.subscribe(value => {
                
                
                this.ActiveFormNew = value 
                });

                

                //CustomerTopForm
                //CustomerTopForm
                //CustomerTopForm
                this.CustomerTopFormOld = this.CustomerTopForm.value

                this.CustomerTopForm.valueChanges.subscribe(value => {
                
                
                this.CustomerTopFormNew = value 
                });

          }, 2000);

        }
        else {
          this.common.hideLoading()
        }


      }, err => {
        
        this.common.showErrorMessage(err.message)

        this.common.hideLoading();

      })


    }

  }

  selectAllChannels() {
    this.customerObj.showSelectChannel = !this.customerObj.showSelectChannel
    
    this.customerObj.channel=[]
    for (var i = 0; i < this.listChannelId.length; i++) {

      if (this.customerObj.showSelectChannel) {
        this.listChannelId[i].isChecked = true;
        
        this.customerObj.channel.push(this.listChannelId[i].channelId)
       




      } else {
        this.listChannelId[i].isChecked = false;


      }


    }
    this.customerObj.channelId = JSON.stringify(this.customerObj.channel);
    
  }

  onChangeService(channel) {
    if (!channel.isChecked)
      channel.isChecked = false;
    else
      channel.isChecked = true;

    if (channel.isChecked) {
      this.customerObj.channel.push(channel.channelId)
    } else {
      for (let i = 0; i < this.customerObj.channel.length; i++) {
        if (this.customerObj.channel[i] == channel.channelId) {
          this.customerObj.channel.splice(i, 1);
        }
      }
    }
    this.customerObj.channelId = JSON.stringify(this.customerObj.channel);
    
    // var lets = { "notiId": chekd }
    // this.apiService.post(this.constantsService.listforEdit, lets).subscribe((succ: any) => {
    //   const channelId = succ.data.channelId
    
    //   this.promObj.channelId = channelId;
    // },
    //   (err) => {

    //   })
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






  ngAfterViewInit() {
    this.common.showLoading();

    setInterval(() => {
      $('.icon-checkout-previous').click(function () {
        $(this).find('.popup-previous').toggleClass('show');
      });



    }, 2000);




  }


  buttonSearch() {
    let custNmbuer = this.reqCust.customerNumber
    this.showListModalDetails(custNmbuer)

  }
  openauditModal() {
    // $("#auditModal").modal('show')
    
     let repost =  this.edit
    this.customerAuditLogs(repost)
  }

  topEdite() {
    this.customerObjs.firstName = this.firstName
    // this.customerObj.serviceName = this.serviceName
  }


  topEditSave() {
    if (this.CustomerTopForm.invalid) {
      this.CustomerTopForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      //  this.common.showLoading()
      this.customerObjs.firstName = this.customerObjs.firstName
      this.customerObj.isCustomerUpdate = true;
      this.customerObj.activeReason = this.customerObj.reasons


      this.customerObj.channel = this.customerObj.channelId


      this.customerObj.mobileNo = this.common.convertCompleteCountryCode(this.customerObj.mobileNo);
      this.customerObj.associatemobileNo = this.common.convertCompleteCountryCode(this.customerObj.associatemobileNo);

      // this.apiService.post(this.constantsService.updateCustomer, this.customerObj).subscribe((succ: any) => {
      
      //   this.common.hideLoading()
      //   if (succ.code == 200) {
      //     this.common.showSuccessMessage(succ.message);
      //   }
      //   else {
      //     this.common.showErrorMessage(succ.message)
      //   }
      // },
      //   err => {
      //     this.common.hideLoading()

      //   });

    }
  }


  subChange() {

    if (this.customerObj.subUnSub == undefined) {
      // alert("1")
      this.SubForm.get('subReasons').setValidators(Validators.required)
      this.SubForm.get('subReasons').updateValueAndValidity();
      this.customerObj.subUnSub = false
      this.sub = false


    }

    if (this.customerObj.subUnSub == true) {
      // alert("2")

      this.SubForm.get('subReasons').clearValidators();
      this.SubForm.get('subReasons').updateValueAndValidity();
      this.customerObj.subUnSub = true
      this.sub = true



    }

    if (this.customerObj.subUnSub == false) {
      // alert("3")
      this.customerObj.subUnSub = false
      this.SubForm.get('subReasons').setValidators(Validators.required)
      this.SubForm.get('subReasons').updateValueAndValidity();
      this.sub = false




    }



  }
  ActiveUpdate() {
    // this.serviceObj.isActive = this.serviceObj.isActive
    if (this.customerObj.status == undefined) {
      this.customerObj.status = false
      this.active = false
      this.ActiveForm.get('reasons').setValidators(Validators.required)
      this.ActiveForm.get('reasons').updateValueAndValidity();


    }

    if (this.customerObj.status == true) {
      this.customerObj.status = true
      this.active = true

      this.ActiveForm.get('reasons').clearValidators();
      this.ActiveForm.get('reasons').updateValueAndValidity();


    }

    if (this.customerObj.status == false) {
      this.customerObj.status = false
      this.active = false

      this.ActiveForm.get('reasons').setValidators(Validators.required)
      this.ActiveForm.get('reasons').updateValueAndValidity();



    }


  }

  statusSubmit() {

    if (this.ActiveForm.invalid) {
      this.ActiveForm.markAllAsTouched();
      return;
    }
    else {
      this.common.showLoading();
      this.customerObj.channel = JSON.stringify(this.customerObj.channel);


      this.customerObj.mobileNo = this.common.convertCompleteCountryCode(this.customerObj.mobileNo)
      if (this.customerObj.associatemobileNo == " " || this.customerObj.associatemobileNo == null || this.customerObj.associatemobileNo == undefined || this.customerObj.associatemobileNo == "undefined") {
        this.customerObj.associatemobileNo = " "
      }
      else {
        this.customerObj.associatemobileNo = this.common.convertCompleteCountryCode(this.customerObj.associatemobileNo);
      }

      this.customerObj.isActiveOrDeactive = true;
      this.customerObj.isCustomerUpdate = false;
      this.customerObj.activeReason = this.customerObj.reasons
      
      this.common.setCustomer(this.customerObj);

      this.apiService.post(this.constantsService.updateCustomer, this.customerObj).subscribe((succ: any) => {
        
        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          $("#activeModal").modal('hide')
          this.router.navigateByUrl('home/customer-management/customerDetails')

        }
        else {
          this.common.showErrorMessage(succ.message)
        }
      });
      return;
    }
  }

  subSubmit() {
    if (this.SubForm.invalid) {
      this.SubForm.markAllAsTouched();
      return;
    }
    else {
      this.common.showLoading();

      this.customerObj.channel = JSON.stringify(this.customerObj.channel);


      this.customerObj.mobileNo = this.common.convertCompleteCountryCode(this.customerObj.mobileNo);
      // this.customerObj.associatemobileNo = this.common.convertCompleteCountryCode(this.customerObj.associatemobileNo);
      // this.customerObj.reason = this.customerObj.subReasons

      if (this.customerObj.associatemobileNo == " " || this.customerObj.associatemobileNo == null || this.customerObj.associatemobileNo == undefined || this.customerObj.associatemobileNo == "undefined") {
        this.customerObj.associatemobileNo = " "
      }
      else {
        this.customerObj.associatemobileNo = this.common.convertCompleteCountryCode(this.customerObj.associatemobileNo);
      }
      this.customerObj.unsubReason = this.customerObj.subReasons
      this.common.setCustomer(this.customerObj);

      this.apiService.post(this.constantsService.updateSubUnSub, this.customerObj).subscribe((succ: any) => {
        
        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          $("#subModal").modal('hide')
          this.router.navigateByUrl('home/customer-management/customerDetails')
        }
        else {
          this.common.showErrorMessage(succ.message)
        }
      });
      return;
    }

  }
  cancelSub() {
    $("#subModal").modal('hide')

  }
  cancelActive() {
    $("#activeModal").modal('hide')
  }
  setBranch() {
    let branch = this.listBranchs.filter(
      bran => {
        if (bran.branchId == parseInt(this.customerObj.branchCode))
          return bran;
      });
    if (branch.length)
      this.customerObj.branchName = branch[0].branchName
  }

 

  searchCustomer(customer) {
    
    this.reqCust['customerNumber'] = customer.customerNumber
    this.common.showLoading()
    this.apiService.post(this.constantsService.searchCustomer, this.reqCust).subscribe((succ: any) => {
      
      this.common.hideLoading()
      if (succ.code == 200) {
        this.showDetails = true;
        this.customerObj = succ.data

        let ch = JSON.parse(succ.data.channel)
        this.customerObj.channel = [];

        setTimeout(() => {


          for (let i = 0; i < this.listChannelId.length; i++) {
            for (let j = 0; j < ch.length; j++) {
              if (ch[j] == this.listChannelId[i].channelId)
                // this.onChangeService(this.listChannelId[i])
                this.listChannelId[i].isChecked = true;
            }
          }
          this.customerObj.channel = ch;
        }, 3000);


        if (succ.data.status == "true") {

          this.defaultTrue = false
        }
        else {
          this.defaultTrue = true


        }

        //Mobile No
        var mobile = _.split(this.customerObj.mobileNo, '-', 2);
        this.customerObj.opPreMobileNo = mobile[0]
        this.customerObj.opPostMobileNo = mobile[1]

        var mobile = _.split(this.customerObj.mobileNo, '-', 2);
        this.CustomerFormGrid.controls.mobileNo.setValue(mobile[1]);
        let countryCode: any = this.allCounties.filter(element => {
          return element[2] == mobile[0];
        });
        countryCode = countryCode[0]
        this.selectedCorpPreMobileNo = countryCode[1];

        //Associate Mon No
        var assomobile = _.split(this.customerObj.associatemobileNo, '-', 2);
        this.customerObj.opPreMobileNo = assomobile[0]
        this.customerObj.opPostMobileNo = assomobile[1]

        var assomobile = _.split(this.customerObj.associatemobileNo, '-', 2);
        this.CustomerFormGrid.controls.associatemobileNo.setValue(assomobile[1]);
        let countryCodee: any = this.allCounties.filter(element => {
          return element[2] == mobile[0];
        });
        countryCodee = countryCodee[0]
        this.selectedCorpPreMobileNo = countryCodee[1];




        $("#searchModal").modal('hide');



      } else {
        this.common.showErrorMessage(succ.message);
        this.showDetails = false
      }
    }, err => {
      this.common.hideLoading()
      
    })
  }

  openSearchModal() {
    $("#searchModal").modal('show');


  }

  CloseModalActive(){
    $("#activeModal").modal('hide');
    this.SubForm.get('reasons').clearValidators();
    this.SubForm.get('reasons').updateValueAndValidity();

  }

  CloseModalSub(){
    $("#subModal").modal('hide');
    this.SubForm.get('subReasons').clearValidators();
    this.SubForm.get('subReasons').updateValueAndValidity();

  }
  showListModalDetails(custNumber) {

    let custNmr = { 'customerNumber': custNumber }
    this.apiService.post(this.constantsService.searchCustomer, custNmr).subscribe((succ: any) => {
      
      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        let ezhil = []
        ezhil.push(succ.data)
        
        this.listAllTmpCustomers = ezhil
        // this.reqObjs['customerNumber'] = succ.data.customerNumber
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    });



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

  associateChange($event) {

    
    if ($event.target.checked == true) {
      this.CustomerFormGrid.controls['associatemobileNo'].enable()

    }
    else {
      // alert("2")
      this.CustomerFormGrid.controls['associatemobileNo'].disable()


    }
  }
  focusOutMobile(){
    this.pluginVali = true
  }
  registerCustomer() {
    var opMobileNo  = this.CustomerFormGrid.get('mobileNo').value
    if (_.isEmpty(opMobileNo) ) { this.pluginVali = false }else{this.pluginVali = true}


    if (this.CustomerFormGrid.invalid) {
      this.CustomerFormGrid.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      this.common.showLoading();
      this.customerObj.channel = this.customerObj.channelId

      this.customerObj.mobileNo = this.common.convertCompleteCountryCode(this.customerObj.mobileNo)
      
      if (this.customerObj.associatemobileNo == " " || this.customerObj.associatemobileNo == null || this.customerObj.associatemobileNo == undefined || this.customerObj.associatemobileNo == "undefined") {
        this.customerObj.associatemobileNo = " "
      }
      else {
        this.customerObj.associatemobileNo = this.common.convertCompleteCountryCode(this.customerObj.associatemobileNo);
      }

 

      this.customerObj.status = true
      this.customerObj.subUnSub = true
      this.common.setCustomer(this.customerObj);

      this.apiService.post(this.constantsService.customerRegistration, this.customerObj).subscribe((succ: any) => {
        
        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.showDetails = false
          this.router.navigateByUrl('home/customer-management/customerDetails')


        }
        else {
          this.common.showErrorMessage(succ.message)
          this.common.hideLoading()
        }
      });
      return;
    }}
  

  updateCustomer() {

    
    var opMobileNo  = this.CustomerFormGrid.get('mobileNo').value
    if (_.isEmpty(opMobileNo) ) { this.pluginVali = false }else{this.pluginVali = true}


    if (this.CustomerFormGrid.invalid) {
      this.CustomerFormGrid.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
    this.common.showLoading();

    

    if(_.isEmpty(this.CustomerTopFormNew)){
      this.CustomerTopFormNew = this.CustomerTopFormOld
    }
    else{
      this.CustomerTopFormNew = this.CustomerTopFormNew
    }
           
   


    if(_.isEmpty(this.CustomerFormGridNew)){
      this.CustomerFormGridNew = this.CustomerFormGridOld
    }
    else{
      this.CustomerFormGridNew = this.CustomerFormGridNew
    }
           
    

    
    if(_.isEmpty(this.ActiveFormNew)){
      this.ActiveFormNew = this.ActiveFormOld
    }
    else{
      this.ActiveFormNew = this.ActiveFormNew
    }
    
    


        
    if(_.isEmpty(this.SubFormNew)){
      this.SubFormNew = this.SubFormOld
    }
    else{
      this.SubFormNew = this.SubFormNew
    }
    
    


  this.common.showLoading()

    if(_.isEmpty(this.CustomerFormGridNew)){
      this.CustomerFormGridNew = this.CustomerFormGridOld
    }
    else{
      this.CustomerFormGridNew = this.CustomerFormGridNew
    }
    
    if(_.isEqual(this.CustomerFormGridOld, this.CustomerFormGridNew) && _.isEqual(this.ActiveFormOld, this.ActiveFormNew)
    && _.isEqual(this.SubFormOld, this.SubFormNew) && _.isEqual(this.CustomerTopFormOld, this.CustomerTopFormNew) ){
   let b4Update =  this.common.b4Update()
   this.common.showErrorMessage(b4Update)
   this.common.hideLoading()
   // return;
   }else{

    this.customerObj.channel = JSON.stringify(this.customerObj.channel);


    this.customerObj.mobileNo = this.common.convertCompleteCountryCode(this.customerObj.mobileNo)
    this.customerObj.isCustomerUpdate = true;
    this.customerObj.isActiveOrDeactive = false;


    if (this.customerObjs.firstName === undefined) {
      // alert("same")
      this.customerObj.firstName = this.customerObj.firstName
    }

    if (this.customerObjs.firstName != undefined) {
      // alert("diff")
      this.customerObj.firstName = this.customerObjs.firstName
    }


    if (this.customerObj.associatemobileNo == " " || this.customerObj.associatemobileNo == null || this.customerObj.associatemobileNo == undefined || this.customerObj.associatemobileNo == "undefined") {
      this.customerObj.associatemobileNo = " "
    }
    else {
      this.customerObj.associatemobileNo = this.common.convertCompleteCountryCode(this.customerObj.associatemobileNo);
    }

    
    this.common.setCustomer(this.customerObj);


 
    this.apiService.post(this.constantsService.updateCustomer, this.customerObj).subscribe((succ: any) => {
      
      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.showDetails = false
        this.router.navigateByUrl('home/customer-management/customerDetails')

      }
      else {
        this.common.showErrorMessage(succ.message)
        this.router.navigateByUrl('home/customer-management/customerDetails')

        this.common.hideLoading()
      }
    });
    this.common.hideLoading()

    return;

  
  }
}
}

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  cancel() {
    $('#approveModale').modal('hide')
    $('#userModale').modal('hide')

  }
  
  showAprroveorRejecte(data) {
    if (data != 'approve') {
      this.approve = false
      $('#userModale').modal('show')

  } else {
    this.approve = true
    $('#approveModale').modal('show')


  }

    
    // return;
    // this.common.showLoading()

  }

  sendOver(data) {

    let obj: any = {
      wfId: this.customerObj.wfId
      // channel: this.customerObj.channelId
    }
    if (data != 'approve') {
      if (!this.customerObj.reason) {
        this.common.showErrorMessage("Reason is Must for Reject");
        // this.errReasonMsg = true;

        return;
      }
      obj.reason = this.customerObj.reason;
      // this.errReasonMsg = false;
    } else {
      obj.isApprove = true;
    }
    
    // return;
    // this.common.showLoading()
    

    this.apiService.post(this.constantsService.approveOrRejectCustomer, obj).subscribe((succ: any) => {
      

      this.common.hideLoading();
      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);

        // this.location.back();
        $('#approveModale').modal('hide')
        $('#userModale').modal('hide')
        this.router.navigate(['/home/customer-management/approve-customer/'])
        // this.back();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#approveModale').modal('hide')
      $('#userModale').modal('hide')
      this.common.hideLoading();
      
    });
  }

  customerAuditLogs(repost) {
    

    var wfRefId = this.common.getEditcustomerDetails()
    this.edit = { "wfRefId": wfRefId.customerNumber }

    this.common.showLoading()
    this.apiService.post(this.constantsService.getCustomerAuditLogs, this.edit).subscribe((succ: any) => {
      
      this.common.hideLoading()

      this.listAllCustomerLogs = succ.data;
      let logFiles = succ.data
      this.common.setAuditLogs(logFiles)
      this.common.setAuditLogsDatas(repost)
      this.router.navigate(['/home/auditlogs/'])

    }, err => {
      this.common.hideLoading()
      
    });
  }


  back() {
    // this.showDetails = false
    this.router.navigateByUrl('home/customer-management/customerDetails')
  }

  backToList(){
    this.router.navigateByUrl('home/customer-management/customerDetails')
  }

  backToApproveList(){
    this.router.navigateByUrl('home/customer-management/approve-customer')
  }
  ngOnDestroy() {

    this.common.setEditcustomerDetails({})
  }
}
