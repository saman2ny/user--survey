import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import { spaceValidator } from 'src/service/utils';


@Component({
  selector: 'app-add-default-services',
  templateUrl: './add-default-services.component.html',
  styleUrls: ['./add-default-services.component.css']
})
export class AddDefaultServicesComponent implements OnInit, OnDestroy {

  ServiceForm: FormGroup;
  ServiceTopForm: FormGroup;
  isActiveForm: FormGroup
  user: any = {};
  edit: any;
  Edit: boolean = false;
  getServiceDetails: any;
  serviceObj: any = {
    promoId: []
  }

  listCategory: any = [];
  getEditServiceDetails: any;
  role: any;
  isApprove: boolean;
  errReasonMsg: boolean;
  listSenderId: any;
  listOperatorId: any;
  listLanguageId: any
  listChannelId: any;
  listPriorityId: any;
  listCategoryId: any;
  EnableLimit: boolean = false;
  EnablePull: boolean = false;
  EnableBlockTime: boolean = true;
  isMainChecker: any;
  temp: any = {};
  subscription: boolean = false;
  isActive: boolean = false
  serviceId: any = {};
  serviceName: any = {};
  oldOne: string;
  showNames: boolean = false
  showAdd: boolean = true
  notiId: boolean = false
  notiDesc: boolean = false
  showPencil: boolean = false
  // subscriptionValue: String = "disable";

  defaultTrue: boolean = true;
  statusHideInAdd: boolean;
  active: boolean = true;
  ServiceFormOld: any = {

  };
  keywordForm: any = {};
  ServiceFormNew: any = {};
  isActiveFormNew: any = {};
  isActiveFormOld: any = {};
  ServiceTopFormNew: any = {};
  ServiceTopFormOld: any = {};
  isNew: boolean;
  listPromo: any = [];
  mobileApp: boolean;
  listmobileApp: any;
  Keywords: any = [];
  listLanguages: any = [];
  langObj: any = {
    language: ""
  }
  selectedChannel: any = {};
  DupLang: any = []
  Languageobj: any;

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location) {
    this.showPencil = true
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.common.showLoading();
    this.apiService.post(this.constantsService.listPromoDropdown, {}).subscribe((succ: any) => {
      this.common.hideLoading();
      this.listPromo = succ.data;
    }, err => {
      this.common.hideLoading();

    })

    this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
      this.listChannelId = succ.data.channel;
      this.common.hideLoading();

    }, err => {

    })

    this.apiService.post(this.constantsService.getActiveLanguages, {}).subscribe((succ: any) => {
      this.common.hideLoading();

      this.listLanguageId = succ.data;

      this.langObj.language = this.listLanguageId[0].langId;
      let fg = this.formBuilder.group({
        'channel': ['', Validators.required],


      });
    })

    this.apiService.post(this.constantsService.listMobileAppIdDropdown, {}).subscribe((succ: any) => {
      let arrayParse = succ.data;
      let obj;
      let arrPush = []

      for (var i = 0; i < arrayParse.length; i++) {
        obj = JSON.parse(arrayParse[i])
        arrPush.push(obj)

      }

      this.listmobileApp = arrPush

      this.common.hideLoading();
    }, err => {
      console.log(err + "err")
    })

    this.apiService.post(this.constantsService.getServiceMasterData, {}).subscribe((succ: any) => {
      this.listSenderId = succ.data.senderId;
      this.listOperatorId = succ.data.smsoperator;
      this.listPriorityId = succ.data.priority;
      this.listCategoryId = succ.data.category;
      this.common.hideLoading();


    }, err => {

    })

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

  ngOnInit() {
    myMethod();
    selectSearchMethod();
    this.showNames = true
    this.showAdd = false
    this.ServiceForm = this.formBuilder.group({
      notiId: ['', Validators.compose([Validators.required, Validators.maxLength(15), spaceValidator])],
      notiDesc: ['', Validators.compose([Validators.required, Validators.maxLength(200), spaceValidator])],
      categoryId: ['', Validators.required],
      // isActive: ['', Validators.required],
      channelId: ['', Validators.required],
      serviceUrl: [''],
      promoIde: [''],
      tranCode: ['', Validators.compose([Validators.required, Validators.maxLength(200), spaceValidator])],
      senderId: ['', Validators.required],
      smsCid: ['', Validators.required],
      mobileAppId: [''],
      // genericService: ['', Validators.required],
      priorityId: ['', Validators.required],
      otpMaskingFlag: [''],
      txnMnemonic: ['', Validators.maxLength(200)],
      limitAmount: [''],
      greaterLimit: [''],
      minParam: ['', Validators.maxLength(15)],
      maxParam: ['', Validators.maxLength(15)],
      pullType: ['', Validators.maxLength(5)],
      // Language: [''],
      keyword: new FormArray([]),
      finTxn: [''],
      validateCustomerAccount: [''],
      multiRequest: [''],
      multiReply: [''],
      validateCustomer: [''],
      confirmKeyReq: [''],
      id: [''],
      subscription: [''],
      validateBlockTime: [''],



    });

    this.ServiceForm.patchValue(this.ServiceForm)

    this.ServiceTopForm = this.formBuilder.group({
      serviceId: ['', Validators.required],
      serviceName: ['', [Validators.required, spaceValidator]],
    })
    this.ServiceTopForm.patchValue(this.ServiceTopForm)

    this.isActiveForm = this.formBuilder.group({
      isActive: [''],
      reasons: [''],
    })
    this.isActiveForm.patchValue(this.isActiveForm)

    this.edit = this.common.getEditService()
    if (_.isEmpty(this.edit)) {
      this.isNew = true;
      this.temp.status = "new";
      this.statusHideInAdd = false
      this.isActiveForm.disable()

    } else {
      this.isNew = false;
      if (this.edit.status == 1) {
        this.temp.status = 'draft';
        this.ServiceTopForm.disable()
        // this.isActiveForm.disable()
        this.statusHideInAdd = false
        this.showNames = false
        this.showAdd = true
        this.showPencil = true
        this.getNonApproveData();
      }
      if (this.edit.status == 2) {
        this.temp.status = 'edit';
        this.ServiceForm.controls['categoryId'].disable();
        this.notiId = true
        this.notiDesc = true
        this.showNames = false
        this.showAdd = true
        this.showPencil = false
        this.statusHideInAdd = true
        this.ServiceTopForm.controls['serviceId'].disable();
        this.getApprovedData();
      }
      if (this.edit.status == 3) {
        this.ServiceForm.disable();
        this.temp.status = 'approveOrReject';
        this.ServiceTopForm.disable()
        this.isActiveForm.disable()
        this.showNames = false
        this.showAdd = true
        this.showPencil = true
        this.statusHideInAdd = true
        this.getNonApproveData();
      }
      if (this.edit.status == 4) {
        this.temp.status = 'reject';
        this.ServiceForm.disable();
        this.ServiceTopForm.disable()
        this.isActiveForm.disable()
        this.showNames = false
        this.showAdd = true
        this.showPencil = true
        this.statusHideInAdd = true
        this.getNonApproveData();
      }
      if (this.edit.status == 5) {
        this.temp.status = 'reopen';
        this.ServiceTopForm.disable()
        // this.isActiveForm.disable()
        this.showNames = false
        this.showAdd = true
        this.showPencil = true
        this.statusHideInAdd = false
        this.getNonApproveData();
      }
    }
  }


  Subscription() {
    this.subscription = !this.subscription;
    if (this.subscription ? true : false) {

      // this.subscriptionValue = "enable"
    }
    else {
      // this.subscriptionValue = "disable"
    }

  }



  topEditSave() {
    if (this.ServiceTopForm.invalid) {
      this.ServiceTopForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      this.common.showLoading()
      if (this.ServiceForm.controls.keyword.value.length != 0) {
        let values = this.ServiceForm.controls.keyword.value

        const lookup = values.reduce((a, e) => {
          a[e.Language] = ++a[e.Language] || 0;
          return a;
        }, {});

        var chek = values.filter(e => lookup[e.Language]);
        if (chek != 0) {
          this.common.showErrorMessage("Duplicated")
          this.common.hideLoading()
        } else {
          this.common.hideLoading()



          let messageText = [];
          var keyword = this.ServiceForm.controls.keyword.value;

          let item = keyword.forEach((item, i) => {
            let obj: any = {}
            var key = (item.Language).trim();
            obj[key] = item.keyword;
            messageText.push(obj)


          });
          this.serviceObj.keyword = JSON.stringify(messageText)
          this.maintopEditSave()
        }
      } else {

        this.maintopEditSave()

      }
    }
  }

  maintopEditSave() {
    this.common.showLoading()

    this.serviceObj.notiId = this.serviceObj.serviceId
    this.serviceObj.notiDesc = this.serviceObj.serviceName
    this.serviceObj.isMainChecker = this.isMainChecker;
    this.serviceObj.isActive = this.serviceObj.isActive
    this.apiService.post(this.constantsService.updateServices, this.serviceObj).subscribe((succ: any) => {

      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/service-management/default-services/']);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    },
      err => {
        this.common.hideLoading()

      });
  }
  openModal() {
    $("#userModal").modal("show")
  }
  closeModal() {
    $("#userModal").modal("hide")
  }
  ActiveUpdate() {
    if (this.serviceObj.isActive == undefined) {
      this.isActiveForm.get('reasons').setValidators(Validators.required)
      this.isActiveForm.get('reasons').updateValueAndValidity();

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.serviceObj.isActive = false
        $("#userModal").modal("hide")

      }
    }

    if (this.serviceObj.isActive == true) {
      this.serviceObj.isActive = true
      this.isActiveForm.get('reasons').clearValidators();
      this.isActiveForm.get('reasons').updateValueAndValidity();

      $("#userModal").modal("hide")
    }

    if (this.serviceObj.isActive == false) {
      this.isActiveForm.get('reasons').setValidators(Validators.required)
      this.isActiveForm.get('reasons').updateValueAndValidity();

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.serviceObj.isActive = false
        $("#userModal").modal("hide")

      }

    }


  }
  getApprovedData() {
    // alert("2")
    this.common.showLoading();
    this.apiService.post(this.constantsService.listforEdit, this.edit).subscribe((succ: any) => {
      this.common.hideLoading();
      this.getEditServiceDetails = succ;

      if (succ.code == 200) {

        this.serviceObj = succ.data;

        //Subscription
        this.serviceId = succ.data.notiId
        this.serviceName = succ.data.notiDesc
        this.ServiceTopForm.controls.serviceName.setValue(succ.data.notiDesc)
        this.ServiceTopForm.controls.serviceId.setValue(succ.data.notiId)


        var isActive = JSON.parse(succ.data.isActive);
        this.serviceObj.isActive = isActive







        if (this.serviceObj.isActive == true) {
          this.defaultTrue = true
          this.active = true

        }
        else {
          this.defaultTrue = false
          this.active = false


        }

        var channelId = (succ.data.channelId).toString();
        this.serviceObj.channelId = channelId

        if (this.serviceObj.channelId === "3" || this.serviceObj.channelId === 3) {
          this.mobileApp = true
        } else {
          this.mobileApp = false

        }


        var subscription = JSON.parse(succ.data.subscription);
        this.serviceObj.subscription = subscription
        //OTPFLASK
        var otpMaskingFlag = JSON.parse(succ.data.otpMaskingFlag);
        this.serviceObj.otpMaskingFlag = otpMaskingFlag
        //blockTime
        var validateBlockTime = JSON.parse(succ.data.validateBlockTime);
        this.serviceObj.validateBlockTime = validateBlockTime

        //greaterLimit
        var greaterLimit = JSON.parse(succ.data.greaterLimit);
        this.serviceObj.greaterLimit = greaterLimit
        //finTxn
        var finTxn = JSON.parse(succ.data.finTxn);
        this.serviceObj.finTxn = finTxn
        //validateCustomerAccount
        var validateCustomerAccount = JSON.parse(succ.data.validateCustomerAccount);
        this.serviceObj.validateCustomerAccount = validateCustomerAccount
        //multiRequest
        var multiRequest = JSON.parse(succ.data.multiRequest);
        this.serviceObj.multiRequest = multiRequest
        //multiReply
        var multiReply = JSON.parse(succ.data.multiReply);
        this.serviceObj.multiReply = multiReply
        //validateCustomer
        var validateCustomer = JSON.parse(succ.data.validateCustomer);
        this.serviceObj.validateCustomer = validateCustomer
        //confirmKeyReq
        var confirmKeyReq = JSON.parse(succ.data.confirmKeyReq);
        this.serviceObj.confirmKeyReq = confirmKeyReq

        this.showContainer(this.serviceObj.categoryId);




        let messageText = []
        if (!_.isEmpty(succ.data.keyword)) {


          var keyword = JSON.parse(succ.data.keyword)
          let item = keyword.forEach((item, i) => {
            for (var key in keyword[i]) {
              if (keyword[i].hasOwnProperty(key)) {
                var obj = {};
                obj["Language"] = key;
                obj["Keyword"] = keyword[i][key];
                this.addMobileAppForm(obj)


                messageText.push(obj)
              }
            }

          });

          var contactArr = messageText;
        }


        let service = JSON.parse(succ.data.promoIds)
        this.serviceObj.promoId = [];
        for (var i = 0; i < service.length; i++) {
          for (let j = 0; j < this.listPromo.length; j++) {
            var removeSpaces = service[i]
            if (removeSpaces == this.listPromo[j].reqId)

              this.serviceObj.promoId.push(this.listPromo[j])
          }
        }
        setTimeout(() => {


          this.ServiceFormOld = this.ServiceForm.value

          this.ServiceForm.valueChanges.subscribe(value => {


            this.ServiceFormNew = value
          });

          this.isActiveFormOld = this.isActiveForm.value

          this.isActiveForm.valueChanges.subscribe(value => {


            this.isActiveFormNew = value
          });

          this.ServiceTopFormOld = this.ServiceTopForm.value

          this.ServiceTopForm.valueChanges.subscribe(value => {


            this.ServiceTopFormNew = value
          });





          let mobileAppIds = JSON.parse(succ.data.mobileAppIds)
          this.serviceObj.mobileAppId = [];
          for (var i = 0; i < mobileAppIds.length; i++) {
            for (let j = 0; j < this.listmobileApp.length; j++) {
              var removeSpaces = mobileAppIds[i]
              if (removeSpaces == this.listmobileApp[j].mobileId)

                this.serviceObj.mobileAppId.push(this.listmobileApp[j])
            }
          }

        }, 3000);







      }
      else {
        this.common.hideLoading();
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)

    })
  }
  changeLanguage($event) {
    this.Languageobj = ($event.target.value).trim()
  }

  addKeyword() {

    if (this.ServiceForm.controls.keyword.invalid) {
      this.ServiceForm.controls.keyword.markAllAsTouched();
      return;

    }

    this.addMobileAppForm();
  }
  addMobileAppForm(app?: any) {
    this.Keywords.push({
      "Language": "",
      'keyword': "",
    });

    let fg;
    if (app) {

      fg = this.formBuilder.group({
        'Language': [app.Language, Validators.required],
        'keyword': [app.Keyword, Validators.required],

      });
    } else {

      fg = this.formBuilder.group({
        'Language': ["", Validators.required],
        'keyword': ["", Validators.required],

      });
    }

    (<FormArray>this.ServiceForm.get('keyword')).push(fg);

  }

  deleteKeyword(index: number) {


    if (this.ServiceForm.get('keyword').value[index]) {
      (<FormArray>this.ServiceForm.get('keyword')).setErrors(null);
      (<FormArray>this.ServiceForm.get('keyword')).value[index].status = 'valid';
      (<FormArray>this.ServiceForm.get('keyword')).removeAt(index)

      return;
    }
    (<FormArray>this.ServiceForm.get('mobileApp')).removeAt(index)

    delete this.ServiceForm[index];
  }
  getNonApproveData() {
    this.common.showLoading();
    this.apiService.post(this.constantsService.getApproveData, this.edit).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        let newValue = JSON.parse(succ.data.new_DTLS);

        this.serviceObj = newValue
        this.serviceObj.wfId = succ.data.wf_ID

        this.serviceObj.channelId = JSON.parse(newValue.channelId)
        if (this.serviceObj.channelId === "3" || this.serviceObj.channelId === 3) {
          this.mobileApp = true
        } else {
          this.mobileApp = false

        }

        this.serviceId = newValue.notiId
        this.serviceName = newValue.notiDesc





        var channelId = JSON.parse(newValue.channelId);
        this.serviceObj.channelId = channelId.toString()
        //Subscription

        var subscription = JSON.parse(newValue.subscription);
        this.serviceObj.subscription = subscription
        //OTPFLASK
        var otpMaskingFlag = JSON.parse(newValue.otpMaskingFlag);
        this.serviceObj.otpMaskingFlag = otpMaskingFlag
        //blockTime
        var validateBlockTime = JSON.parse(newValue.validateBlockTime);
        this.serviceObj.validateBlockTime = validateBlockTime
        //greaterLimit
        var greaterLimit = JSON.parse(newValue.greaterLimit);
        this.serviceObj.greaterLimit = greaterLimit
        //finTxn
        var finTxn = JSON.parse(newValue.finTxn);
        this.serviceObj.finTxn = finTxn
        //validateCustomerAccount
        var validateCustomerAccount = JSON.parse(newValue.validateCustomerAccount);
        this.serviceObj.validateCustomerAccount = validateCustomerAccount
        //multiRequest
        var multiRequest = JSON.parse(newValue.multiRequest);
        this.serviceObj.multiRequest = multiRequest
        //multiReply
        var multiReply = JSON.parse(newValue.multiReply);
        this.serviceObj.multiReply = multiReply
        //validateCustomer
        var validateCustomer = JSON.parse(newValue.validateCustomer);
        this.serviceObj.validateCustomer = validateCustomer
        //confirmKeyReq
        var confirmKeyReq = JSON.parse(newValue.confirmKeyReq);
        this.serviceObj.confirmKeyReq = confirmKeyReq

        this.serviceObj.categoryId = JSON.parse(newValue.categoryId)
        this.showContainer(this.serviceObj.categoryId);



        var isActive = newValue.isActive;
        this.serviceObj.isActive = isActive


        if (this.serviceObj.isActive === true || this.serviceObj.isActive === "true") {
          this.defaultTrue = true
          this.active = true
          this.serviceObj.isActive = true

        }
        else {
          this.defaultTrue = false
          this.active = false
          this.serviceObj.isActive = false


        }



        let messageText = []
        if (!_.isEmpty(newValue.keyword)) {
          var keyword = JSON.parse(newValue.keyword)
          let item = keyword.forEach((item, i) => {
            for (var key in keyword[i]) {
              if (keyword[i].hasOwnProperty(key)) {

                var obj = {};
                obj["Language"] = key;
                obj["Keyword"] = keyword[i][key];
                this.addMobileAppForm(obj)


                messageText.push(obj)
              }
            }

          });

          var contactArr = messageText;

        }



        let service = JSON.parse(newValue.promoIds);

        let mobileAppIds = JSON.parse(newValue.mobileAppIds)


        setTimeout(() => {

          // this.serviceObj.promoId.length = service.length;
          this.serviceObj.promoId = [];
          for (var i = 0; i < service.length; i++) {
            for (let j = 0; j < this.listPromo.length; j++) {
              var removeSpaces = service[i]
              if (removeSpaces == this.listPromo[j].reqId)

                this.serviceObj.promoId.push(this.listPromo[j])
            }
          }


          this.serviceObj.mobileAppId = [];
          for (var i = 0; i < mobileAppIds.length; i++) {
            for (let j = 0; j < this.listmobileApp.length; j++) {
              var removeSpaces = mobileAppIds[i]
              if (removeSpaces == this.listmobileApp[j].mobileId)

                this.serviceObj.mobileAppId.push(this.listmobileApp[j])
            }
          }

        }, 4000);



      } else {
        this.common.hideLoading();
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)


    })
  }

  showContainer(value) {
    this.serviceObj.value = value;
    if (value == "3") {
      this.EnableLimit = true
      this.EnablePull = false
      this.selectedChannel.isPush = false;
      this.ServiceForm.get('limitAmount').setValidators(Validators.required);
      this.ServiceForm.get('greaterLimit').setValidators(Validators.required);
      this.ServiceForm.get('confirmKeyReq').clearValidators();
      this.ServiceForm.get('confirmKeyReq').updateValueAndValidity();
      this.ServiceForm.get('keyword').clearValidators();
      this.ServiceForm.get('keyword').updateValueAndValidity();
      this.ServiceForm.get('serviceUrl').clearValidators();
      this.ServiceForm.get('serviceUrl').updateValueAndValidity();
    }
    else if (value == "5") {
      this.EnablePull = true
      this.EnableLimit = false
      this.EnableBlockTime = false
      this.selectedChannel.isPush = true;
      this.ServiceForm.get('confirmKeyReq').setValidators(Validators.required);
      this.ServiceForm.get('serviceUrl').setValidators(Validators.required);
      this.ServiceForm.get('limitAmount').clearValidators();
      this.ServiceForm.get('limitAmount').updateValueAndValidity();
      this.ServiceForm.get('greaterLimit').clearValidators();
      this.ServiceForm.get('greaterLimit').updateValueAndValidity();
      this.ServiceForm.addControl('keywords', new FormArray([]));
      // this.addKeyword()
      if (_.isEmpty(this.edit)) {

        this.addMobileAppForm()
      }

    }
    else {
      this.EnablePull = false
      this.EnableLimit = false
      this.selectedChannel.isPush = false;
      this.ServiceForm.get('limitAmount').clearValidators();
      this.ServiceForm.get('limitAmount').updateValueAndValidity();
      this.ServiceForm.get('confirmKeyReq').clearValidators();
      this.ServiceForm.get('confirmKeyReq').updateValueAndValidity();
      this.ServiceForm.get('greaterLimit').clearValidators();
      this.ServiceForm.get('greaterLimit').updateValueAndValidity();
      this.ServiceForm.get('keyword').clearValidators();
      this.ServiceForm.get('keyword').updateValueAndValidity();
      this.ServiceForm.get('serviceUrl').clearValidators();
      this.ServiceForm.get('serviceUrl').updateValueAndValidity();
    }
  }

  channelChange($event) {
    let getChhannel = this.serviceObj.channelId
    if (getChhannel === "3") {
      this.mobileApp = true
      this.ServiceForm.get('mobileAppId').setValidators(Validators.required);
      this.ServiceForm.get('mobileAppId').updateValueAndValidity();

    } else {
      this.mobileApp = false
      this.ServiceForm.get('mobileAppId').clearValidators();
      this.ServiceForm.get('mobileAppId').updateValueAndValidity();
    }
  }
  approve(data) {
    let url = ""

    if (data == 'reject') {
      if (!this.serviceObj.reason) {
        this.common.showErrorMessage("Reason is must for reject");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.rejectServices
    } else if (data == 'approve') {
      url = this.constantsService.approveServices
    }
    if (data == 'reopen') {
      if (!this.serviceObj.reason) {
        this.common.showErrorMessage("Reason is must for reopen");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.reopenServicess
    }


    this.common.showLoading()
    this.apiService.post(url, { wfId: this.serviceObj.wfId, reason: this.serviceObj.reason }).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.back();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      this.common.hideLoading();

    });
  }


  ngOnDestroy() {
    var notiId = {};
    this.common.setEditService(notiId)
  }


  Update() {
    this.common.showLoading()
    if (this.serviceObj.invalid) {
      this.serviceObj.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {


      if (this.ServiceForm.controls.keyword.value.length != 0) {
        let values = this.ServiceForm.controls.keyword.value

        const lookup = values.reduce((a, e) => {
          a[e.Language] = ++a[e.Language] || 0;
          return a;
        }, {});

        var chek = values.filter(e => lookup[e.Language]);
        if (chek != 0) {
          this.common.showErrorMessage("Duplicated")
          this.common.hideLoading()
        } else {
          this.common.hideLoading()



          let messageText = [];
          var keyword = this.ServiceForm.controls.keyword.value;

          let item = keyword.forEach((item, i) => {
            let obj: any = {}
            var key = (item.Language).trim();
            obj[key] = item.keyword;

            messageText.push(obj)


          });



          this.serviceObj.keyword = JSON.stringify(messageText)
          this.mainUpdate()
        }
      } else {

        this.mainUpdate()

      }

    }
  }

  mainUpdate() {
    this.common.showLoading()
    if (_.isEmpty(this.ServiceFormNew)) {
      this.ServiceFormNew = this.ServiceFormOld
    }
    else {
      this.ServiceFormNew = this.ServiceFormNew
    }



    if (_.isEmpty(this.isActiveFormNew)) {
      this.isActiveFormNew = this.isActiveFormOld
    }
    else {
      this.isActiveFormNew = this.isActiveFormNew
    }



    if (_.isEmpty(this.ServiceTopFormNew)) {
      this.ServiceTopFormNew = this.ServiceTopFormOld
    }
    else {
      this.ServiceTopFormNew = this.ServiceTopFormNew
    }


    if (_.isEqual(this.ServiceFormOld, this.ServiceFormNew) && _.isEqual(this.isActiveFormOld, this.isActiveFormNew)
      && _.isEqual(this.ServiceTopFormOld, this.ServiceTopFormNew)) {

      let b4Update = this.common.b4Update()
      this.common.showErrorMessage(b4Update)
      this.common.hideLoading()
    }
    else {




      if (this.serviceObj.serviceName == undefined) {

        this.serviceObj.notiId = this.serviceId
        this.serviceObj.notiDesc = this.serviceName
      }
      if (this.serviceObj.serviceName != undefined) {

        this.serviceObj.notiId = this.serviceObj.serviceId
        this.serviceObj.notiDesc = this.serviceObj.serviceName
      }

      this.serviceObj.isMainChecker = this.isMainChecker;


      var emptyId = []
      if (_.isEmpty(this.serviceObj.promoId)) {
        this.serviceObj.promoId = []


      } else {
        for (let z = 0; z < this.serviceObj.promoId.length; z++) {
          var pushNotId = this.serviceObj.promoId[z].reqId
          emptyId.push(pushNotId)
        }
        this.serviceObj.promoId = emptyId
      }

      var emptyId2 = []
      if (_.isEmpty(this.serviceObj.mobileAppId)) {
        this.serviceObj.mobileAppId = []

      } else {
        for (let z = 0; z < this.serviceObj.mobileAppId.length; z++) {
          var mobileAppId = this.serviceObj.mobileAppId[z].mobileId
          emptyId2.push(mobileAppId)
        }
        this.serviceObj.mobileAppId = emptyId2

      }



      this.apiService.post(this.constantsService.updateServices, this.serviceObj).subscribe((succ: any) => {

        this.common.hideLoading();
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/service-management/default-services/']);
        }
        else {
          this.common.showErrorMessage(succ.message)
          this.common.hideLoading()
        }
      },
        err => {
          this.common.hideLoading()
        });
    }

  }



  getKeyForm(index) {
    return this.ServiceForm['controls'].keywords['controls'][index] as FormArray;
  }

  Submit() {
    if (this.ServiceForm.invalid) {
      this.ServiceForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      this.common.showLoading()
      if (this.ServiceForm.controls.keyword.value.length != 0) {
        let values = this.ServiceForm.controls.keyword.value

        const lookup = values.reduce((a, e) => {
          a[e.Language] = ++a[e.Language] || 0;
          return a;
        }, {});

        var chek = values.filter(e => lookup[e.Language]);
        if (chek != 0) {
          this.common.showErrorMessage("Duplicated")
          this.common.hideLoading()
        } else {
          this.common.hideLoading()



          let messageText = [];
          var keyword = this.ServiceForm.controls.keyword.value;

          let item = keyword.forEach((item, i) => {
            let obj: any = {}

            var key = (item.Language).trim();
            obj[key] = item.keyword;

            messageText.push(obj)


          });



          this.serviceObj.keyword = JSON.stringify(messageText)
          this.mainSubmit()
        }
      } else {

        this.mainSubmit()

      }
    }

  }


  mainSubmit() {
    this.common.showLoading()

    this.serviceObj.isMainChecker = this.isMainChecker;
    this.serviceObj.createdTime = "";
    this.serviceObj.isActive = true


    if (this.serviceObj.subscription == undefined) {
      this.serviceObj.subscription = false
    }
    if (this.serviceObj.otpMaskingFlag == undefined) {
      this.serviceObj.otpMaskingFlag = false
    }
    if (this.serviceObj.validateBlockTime == undefined) {
      this.serviceObj.validateBlockTime = false
    }
    if (this.serviceObj.greaterLimit == undefined) {
      this.serviceObj.greaterLimit = false
    }
    if (this.serviceObj.finTxn == undefined) {
      this.serviceObj.finTxn = false
    }
    if (this.serviceObj.validateCustomerAccount == undefined) {
      this.serviceObj.validateCustomerAccount = false
    }
    if (this.serviceObj.multiRequest == undefined) {
      this.serviceObj.multiRequest = false
    }
    if (this.serviceObj.multiReply == undefined) {
      this.serviceObj.multiReply = false
    }
    if (this.serviceObj.validateCustomer == undefined) {
      this.serviceObj.validateCustomer = false
    }
    if (this.serviceObj.confirmKeyReq == undefined) {
      this.serviceObj.confirmKeyReq = false
    }

    var emptyId = []
    if (_.isEmpty(this.serviceObj.promoId)) {
      this.serviceObj.promoId = []


    } else {
      for (let z = 0; z < this.serviceObj.promoId.length; z++) {
        var pushNotId = this.serviceObj.promoId[z].reqId
        emptyId.push(pushNotId)
      }
      this.serviceObj.promoId = emptyId
    }

    var emptyId2 = []
    if (_.isEmpty(this.serviceObj.mobileAppId)) {
      this.serviceObj.mobileAppId = []


    } else {
      for (let z = 0; z < this.serviceObj.mobileAppId.length; z++) {
        var mobileAppId = this.serviceObj.mobileAppId[z].mobileId
        emptyId2.push(mobileAppId)
      }
      this.serviceObj.mobileAppId = emptyId2

    }



    this.apiService.post(this.constantsService.addService, this.serviceObj).subscribe((succ: any) => {

      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/service-management/default-services/']);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    },
      err => {
        this.common.hideLoading()
      });
    return;

  }


  back() {
    this.location.back();
  }


  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;

  }


  EnableFields($event) {

    this.showContainer($event.target.value);

  }

  Draft() {
    if (this.ServiceForm.invalid) {
      this.ServiceForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      this.common.showLoading()
      if (this.ServiceForm.controls.keyword.value.length != 0) {
        let values = this.ServiceForm.controls.keyword.value

        const lookup = values.reduce((a, e) => {
          a[e.Language] = ++a[e.Language] || 0;
          return a;
        }, {});

        var chek = values.filter(e => lookup[e.Language]);
        if (chek != 0) {
          this.common.showErrorMessage("Duplicated")
          this.common.hideLoading()
        } else {
          this.common.hideLoading()



          let messageText = [];
          var keyword = this.ServiceForm.controls.keyword.value;

          let item = keyword.forEach((item, i) => {
            let obj: any = {}
            var key = (item.Language).trim();
            obj[key] = item.keyword;

            messageText.push(obj)


          });



          this.serviceObj.keyword = JSON.stringify(messageText)
          this.mainDraft()
        }
      } else {

        this.mainDraft()

      }
    }
  }
  mainDraft() {
    this.common.showLoading();

    this.serviceObj.isMainChecker = this.isMainChecker;
    this.serviceObj.createdTime = "";
    this.serviceObj.isActive = true

    //To be Noted
    //To be Noted
    //To be Noted


    if (_.isEmpty(this.edit)) {
      this.serviceObj.statusFilter = 1
    } else {
      this.serviceObj.statusFilter = this.edit.status;
    }

    this.common.showLoading();
    if (this.serviceObj.subscription == undefined) {
      this.serviceObj.subscription = false
    }
    if (this.serviceObj.otpMaskingFlag == undefined) {
      this.serviceObj.otpMaskingFlag = false
    }
    if (this.serviceObj.validateBlockTime == undefined) {
      this.serviceObj.validateBlockTime = false
    }
    if (this.serviceObj.greaterLimit == undefined) {
      this.serviceObj.greaterLimit = false
    }
    if (this.serviceObj.finTxn == undefined) {
      this.serviceObj.finTxn = false
    }
    if (this.serviceObj.validateCustomerAccount == undefined) {
      this.serviceObj.validateCustomerAccount = false
    }
    if (this.serviceObj.multiRequest == undefined) {
      this.serviceObj.multiRequest = false
    }
    if (this.serviceObj.multiReply == undefined) {
      this.serviceObj.multiReply = false
    }
    if (this.serviceObj.validateCustomer == undefined) {
      this.serviceObj.validateCustomer = false
    }
    if (this.serviceObj.confirmKeyReq == undefined) {
      this.serviceObj.confirmKeyReq = false
    }


    var emptyId = []
    if (_.isEmpty(this.serviceObj.promoId)) {
      this.serviceObj.promoId = []


    } else {
      for (let z = 0; z < this.serviceObj.promoId.length; z++) {
        var pushNotId = this.serviceObj.promoId[z].reqId
        emptyId.push(pushNotId)
      }
      this.serviceObj.promoId = emptyId
    }

    var emptyId2 = []
    if (_.isEmpty(this.serviceObj.mobileAppId)) {
      this.serviceObj.mobileAppId = []


    } else {
      for (let z = 0; z < this.serviceObj.mobileAppId.length; z++) {
        var mobileAppId = this.serviceObj.mobileAppId[z].mobileId
        emptyId2.push(mobileAppId)
      }
      this.serviceObj.mobileAppId = emptyId2

    }

    this.apiService.post(this.constantsService.saveServiceDrafts, this.serviceObj).subscribe((succ: any) => {

      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/service-management/default-services/']);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    },
      err => {
        this.common.hideLoading()

      });
    return;

  }



  topEdite() {
    this.serviceObj.serviceId = this.serviceId
    this.serviceObj.serviceName = this.serviceName
  }
  isEditOrUpdate() {
    let ret = false;
    if (this.temp.status == 'approveOrReject') {
      if (this.getAccessRole('isChecker')) {
        ret = true;
      }
    }
    else if (this.temp.status == 'edit') {
      if (this.getAccessRole('isEdit')) {
        ret = true;
      }
    } else if (this.temp.status = "new") {
      if (this.getAccessRole('isAdd')) {
        ret = true;
      }
    }
    return ret;
  }
}