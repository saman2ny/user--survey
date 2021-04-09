import { Component, OnInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { formatDate, DatePipe } from '@angular/common';
// import { url } from 'inspector';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../test.js';
import { spaceValidator } from 'src/service/utils';
import { TooltipLabel } from 'ngx-intl-tel-input';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Container } from '@amcharts/amcharts4/core';
import { CountryService } from 'src/service/country.service';


import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';
import insertTextAtCursor from 'insert-text-at-cursor';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-push-sms-campaign',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './push-sms-campaign.component.html',
  styleUrls: ["/node_modules/simple-keyboard/build/css/index.css", './push-sms-campaign.component.css']
})
export class PushSmsCampaignComponent implements OnInit {
  @Input('maxLength') public maxLength = 7;

  user: any;
  role: any;
  compaingForm: FormGroup;
  compaignObj: any = {
    msgText: "",
    pushMsgText: "",
    msgdelivery: "1",
    isDl: "0",
    integrationReq: 0,
    channel: "1",
    campaignType: "Push",
    noEndDate: 0,
    language: "",
    promoName: [],
    category: ""
    // category: 1,
  };
  listCountryCode: any;
  listDepartments: any;
  listSenderId: any;
  listOperatorId: any;
  listLanguageId: any;
  listChannelId: any = [];
  listPriorityId: any;
  listCategoryId: any;
  isChecked = true;
  checkedtrue: any = "0";
  edit: any;
  // getEditpushCompany: any;
  Edit: boolean = false;
  DlEditAttachment: boolean = false;
  isApprove: boolean;
  errReasonMsg: boolean;
  showDownloadFile: boolean;
  those: any;
  AcceptfileFormat: any = ['.xls', '.xlsx'];
  calculateMsg: any = [];
  reqObj: any = {
  };
  public Editor = ClassicEditor;
  config = { extraPlugins: [MyCustomUploadAdapterPlugin], useValue: { useUtc: true } };
  isMainChecker: any;
  distributionList: any;
  appName: any = [];
  isMessageText: boolean;
  messageError: any;
  listTemplate: any;
  listTemplates: any = [];
  listZones: any;
  showSuccessMsg: any = {};
  isDraft: boolean;
  newCampaign: boolean;
  isFileAlreadyUpload: boolean;
  isUniqueCampaignDesc: boolean;
  public minDate: any = new Date();
  selectedTemplate: any = {};
  searchTemplate: any;
  searchPromoTemplate: any;
  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];

  selectedCorpPreMobileNo = "in";
  selectedCorpContactPreMobileNo = "in";
  phoneForm: FormGroup;
  emailForm: FormGroup;
  phoneNumbers: any[] = [];
  emailIds: any = [];
  compFormDisable: boolean;
  //for virtual keyboard variables
  value = "";
  keyboard: Keyboard;
  keyboardLayouts: any;
  layouts: Array<object>;
  layoutsObj: object;
  selectedLayout: string = "english";
  listPromoDropdown: any = [];
  sampleDownloadFile: any = [];
  searchTemplates: any;
  ListTemplates: any = [];
  selectedTemplates: any = {};
  selectedPromoTemplates: any = {};
  promoModalList: any = [];
  CountryISO: any = [];
  messageTextLength: any = 0;

  showSearchButton: boolean;
  speechData: string;
  getLangid2: any;


  constructor(private speechRecognitionService: SpeechRecognitionServiceService, private el: ElementRef, public common: CommonService, public formBuilder: FormBuilder,
    public constantsService: ConstantsService, public apiService: ApiService, public router: Router, public countryService: CountryService) {

    this.showSearchButton = true;
    this.speechData = "";

    this.user = this.common.getUser();
    this.role = this.common.getRole();
    console.log(this.user)
    console.log("total lenfth", this.constantsService.pushMessageLength)

    if (this.constantsService.isSmsChannelAvailable == true)
      this.messageTextLength = this.constantsService.pushMessageLength
    else
      this.messageTextLength = this.constantsService.pushDefaultMsgLength

    this.CountryISO = this.countryService.getcountryCode();
    // for virtual key board
    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));

    this.isMainChecker = this.common.getMainMenu().isMainChecker;



    this.emailForm = this.formBuilder.group({

      email: this.formBuilder.array([]),

    });
    this.phoneForm = this.formBuilder.group({

      phoneNo: this.formBuilder.array([]),
    });
    this.addPhoneForm();
    this.addEmailForm();
    this.compaingForm = this.formBuilder.group({

      campaignType: ["", Validators.required],
      channel: this.formBuilder.array([]),


      campaignDesc: ['', [Validators.required, spaceValidator]],
      department: ['', Validators.compose([Validators.required])],
      priorityLevel: ['', Validators.required],
      Category: ['', Validators.required],


      // Category: [""],
      template: [''],

      selctPromotion: [''],
      containText: [''],
      distribution: [''],

      isSdkIntegration: [''],

      // messageText: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      messageText: ['', Validators.compose([Validators.required, Validators.maxLength(this.messageTextLength)])],



      //sms
      senderId: ['', Validators.required],
      Operator: ["", Validators.required],
      Language: ["", Validators.required],




      // email
      subject: [''],
      attachmentFileName: [],
      attachmentFile: [],
      // push notification
      appName: [""],

      scheduledTimeDup: ['', Validators.required],
      validityDateTime: ['', Validators.required],

      file: [null, Validators.required],
      fileName: [],
      getZones: ['', Validators.required],
      // responseMessage: ["", Validators.required],

      // pull
      shortCode: [''],
      ackMsg: [""],
      nackMsg: [""],
      integrationReq: [""],
      pullURL: [""],
      startDate: [''],
      // campaignValidity: [''],
      noEndDate: [""],
      endDate: [''],



    });
    this.compaingForm.controls["pullURL"].disable();
    let req = {
      "category": "Campaign"
    }

    this.apiService.post(this.constantsService.getFileTemplateList, req).subscribe((succ: any) => {



      this.sampleDownloadFile = succ.data;


    });

    this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
      this.listDepartments = succ.data;


      this.common.showLoading();
      this.apiService.post(this.constantsService.getSystemParam, { SystemParamName: "MOBILE_APP" }).subscribe((succ: any) => {


        if (succ.data)
          this.appName = JSON.parse(succ.data);



      });


      //   Get Zones

      this.apiService.post(this.constantsService.getTimeZones, {}).subscribe((succ: any) => {
        this.listZones = succ.data;

      });
      this.apiService.post(this.constantsService.listPromoDropdown, {}).subscribe((succ: any) => {

        this.listPromoDropdown = succ.data;

      });
      this.common.showLoading();

      this.apiService.post(this.constantsService.getPushMaster, {}).subscribe((succ: any) => {
        this.common.hideLoading();

        this.listSenderId = succ.data.senderId;
        this.listOperatorId = succ.data.smsoperator;
        this.listChannelId = succ.data.channel;
        this.listLanguageId = succ.data.language;

        this.listPriorityId = succ.data.priority;
        this.listCategoryId = succ.data.campaigncategory;
        this.distributionList = succ.data.distributionList;


        this.getLangid2 = this.listLanguageId[0].langId;
        this.compaignObj.language = this.listLanguageId[0].langId;
        this.setTemplateData();
        let fg = this.formBuilder.group({
          'channel': ['', Validators.required],


        });
        for (let f = 0; f < this.listChannelId.length; f++)
          (<FormArray>this.compaingForm.get('channel')).push(fg);

        this.edit = this.common.getEditpushCampaign();

        if (_.isEmpty(this.edit)) {
          this.newCampaign = true;
          this.virtualKey = true
          // this.CorporateForm.controls['corporateId'].enable();
          this.compaignObj.channel = this.listChannelId[0].channelId.toString();
          this.setCampaignData(this.compaignObj.channel.toString());
        }

        else {


          this.virtualKey = false
          this.compaingForm.controls['campaignDesc'].disable();

          this.compaignObj.campaingStatus = this.edit.campaingStatus;

          this.compaignObj = this.common.getEditpushCampaign();

          //promo list set
          // this.compaignObj.promoName = [];

          if (this.compaignObj.promo) {
            this.compaignObj.promoName = []

            let pro = JSON.parse(this.compaignObj.promo);
            for (let i = 0; i < pro.length; i++) {
              for (let j = 0; j < this.listPromoDropdown.length; j++) {
                if (pro[i] == this.listPromoDropdown[j].reqId) {
                  this.compaignObj.promoName.push(this.listPromoDropdown[j]);
                  this.promoArry.push(this.listPromoDropdown[j].promoName)
                }
              }
            }
          } else {
            this.compaignObj.promoName = []
          }




          this.compaignObj.fileNa = this.compaignObj.campaignDesc;

          this.compaignObj.getZones = this.compaignObj.timeZone;

          this.compaignObj.distribution = this.compaignObj.distributionId;

          this.compaignObj.templateId = this.compaignObj.templateId;
          this.setTemplateData();
          this.compaignObj.channel = this.compaignObj.channel.toString();
          this.setCampaignData(this.compaignObj.channel.toString());
          if (this.compaignObj.isDl == "1") {
            //  this.isApprove = true;
            this.DlEditAttachment = false;
            this.compaingForm.get('containText').disable();
            this.compaingForm.get('file').disable();
          } else {
            this.DlEditAttachment = true;
            this.compaingForm.get('containText').enable();
            this.compaingForm.get('file').enable();

          }

          if (this.compaignObj.isSdkIntegration == "1") {

            this.compaingForm.get('containText').disable();
            this.compaingForm.get('distribution').disable();
            this.compaingForm.get('file').disable();

          }


          if (this.edit.campaingStatus == 1 || this.edit.campaingStatus == 5) {
            this.Edit = true;
          }
          else {

            this.compFormDisable = true;
            this.compaingForm.disable();
            if (this.edit.campaingStatus == 3)
              this.isApprove = true;
            // this.compaingForm.controls['containText'].disable()

          }

          var datePipe = new DatePipe('en');
          if (this.compaignObj.scheduledTime) {
            const utcDate = moment.utc(this.compaignObj.scheduledTime);
            var utcDate2 = new Date(utcDate.format());

            this.compaignObj.scheduledTimeDup = new Date(datePipe.transform(utcDate2, 'dd MMM yyyy hh:mm a'));

          }
          if (this.compaignObj.validityDate) {
            const validityDateTime = moment.utc(this.compaignObj.validityDate);
            var validityDateTimeConvert = new Date(validityDateTime.format());
            this.compaignObj.validityDateTime = new Date(datePipe.transform(validityDateTimeConvert, 'dd MMM yyyy hh:mm a'));

          }
          if (this.compaignObj.startDate) {
            const validityDateTime = moment.utc(this.compaignObj.startDate);
            var validityDateTimeConvert = new Date(validityDateTime.format());
            this.compaignObj.startDate = new Date(datePipe.transform(validityDateTimeConvert, 'dd MMM yyyy hh:mm a'));


          }
          if (this.compaignObj.endDate) {
            const validityDateTime = moment.utc(this.compaignObj.endDate);
            var validityDateTimeConvert = new Date(validityDateTime.format());
            this.compaignObj.endDate = new Date(datePipe.transform(validityDateTimeConvert, 'dd MMM yyyy hh:mm a'));


          }
          if (this.compaignObj.noEndDate == 1) {

          }
          this.campaginTypeChange();
          setTimeout(() => {
            this.isFileAlreadyUpload = true;
            this.compaingForm.controls["file"].clearValidators();
            this.compaingForm.controls["file"].updateValueAndValidity();
          }, 2000);

        }


      }, err => {
        this.common.hideLoading();


      });
    }, err => {
      this.common.hideLoading();


    });


  }

  focusBody() {
    this.getLangid2 = this.checklang
    console.log(this.getLangid2, "this.getLangid2this.getLangid2")

  }



  kealuVoice(getLangid) {
    var msg = new SpeechSynthesisUtterance();
    var langId = getLangid.toLowerCase();

    msg.volume = 1; // From 0 to 1
    msg.rate = 1; // From 0.1 to 10
    msg.pitch = 2; // From 0 to 2
    msg.lang = langId;


    var textIDPOs = "text0"
    // var el: any = document.getElementById(textIDPOs).value;
    var el = (<HTMLInputElement>document.getElementById(textIDPOs)).value;

    msg.text = el
    window.speechSynthesis.speak(msg);
    // window.speechSynthesis.cancel();


    // window.speechSynthesis.cancel();

    // msg.text = "Good Morning";
    // window.speechSynthesis.speak(msg);
  }
  stopVoice(getLangid) {
    console.log("--Stop Listening--");
    window.speechSynthesis.cancel();

  }


  stopSpeech(getLangid) {

    this.showSearchButton = true;
    console.log("--Stop--");
    this.speechRecognitionService.DestroySpeechObject();

  }


  activateSpeechSearchMovie(getLangid2) {
    console.log(getLangid2, "langId")

    this.showSearchButton = false;
    var langId = getLangid2.toLowerCase();


    this.speechRecognitionService.record(langId)
      .subscribe(
        //listener
        (value) => {


          var textIDPOs = "text0"
          const el = document.getElementById(textIDPOs);

          let getValue = ""
          let secodFinal = value
          var finalDatea = getValue + secodFinal
          // this.common.showSuccessMessage(secodFinal + "Added Successfully")

          insertTextAtCursor(el, finalDatea);





          // this.speechData = value;
          console.log(value);
        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateSpeechSearchMovie(langId);
          }
        },
        //completion
        () => {
          this.showSearchButton = true;
          console.log("--completeed speech--");
          // this.activateSpeechSearchMovie(i);
        });


  }


  addPhoneControl() {
    if (this.phoneForm.invalid) {
      this.phoneForm.markAllAsTouched();
      return;
    }
    this.addPhoneForm();
  }
  addPhoneForm() {

    this.phoneNumbers.push({
      no: ""
    });

    let fg = this.formBuilder.group({

      'phone': ["", Validators.required],
    });
    (<FormArray>this.phoneForm.get('phoneNo')).push(fg);


  }
  addEmailControl() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    this.addEmailForm();
  }
  addEmailForm() {

    this.emailIds.push({
      email: ""
    });

    let fg = this.formBuilder.group({

      'email': ["", Validators.required],
    });
    (<FormArray>this.emailForm.get('email')).push(fg);


  }
  ngOnInit() {
    $('.simple-keyboard').hide()

    // $(".styled-select select").select2({
    //   placeholder: "Select",
    //   allowClear: true
    // });
    myMethod();

    $(".overall-template").mCustomScrollbar({
      axis: "y",
      theme: "dark",
      scrollbarPosition: "inside",
      advanced: {
        updateOnContentResize: true
      }
    });


  }
  public onReady(editor) {

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  campaginChange(event, channel) {
    console.log("channel change")
    // this.compaignObj.template = undefined

    // if (channel.channelId == 1) {
    //   this.messageTextLength = this.constantsService.pushMessageLength

    // } else


    this.compaingForm.get('distribution').enable();


    let value = event.target.value;
    this.compaignObj.msgText = "";
    if (channel.channelDesc === "Email") {
      this.compaingForm.controls["subject"].setValidators([Validators.required]);
      this.compaingForm.controls["subject"].updateValueAndValidity();
    }
    else {
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();
    }
    this.setCampaignData(this.compaignObj.channel);
    this.setTemplateData();

  }
  setCampaignData(value) {

    this.compaingForm.controls["messageText"].markAsUntouched();
    this.compaingForm.controls["messageText"].clearValidators();
    this.compaingForm.controls["messageText"].updateValueAndValidity();
    if (value == '1') {
      this.messageTextLength = this.constantsService.pushMessageLength
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();

      this.compaingForm.controls["appName"].clearValidators();
      this.compaingForm.controls["appName"].updateValueAndValidity();


      this.compaingForm.controls["Operator"].setValidators([Validators.required]);
      this.compaingForm.controls["senderId"].setValidators([Validators.required]);
      this.compaingForm.controls["messageText"].setValidators([Validators.required, Validators.maxLength(this.messageTextLength)]);
      this.compaingForm.controls["Operator"].updateValueAndValidity();
      this.compaingForm.controls["senderId"].updateValueAndValidity();
      this.compaingForm.controls["messageText"].updateValueAndValidity();

    } else if (value == '2') {

      this.messageTextLength = this.constantsService.pushDefaultMsgLength

      this.compaingForm.controls["Operator"].clearValidators();
      this.compaingForm.controls["Operator"].updateValueAndValidity();
      this.compaingForm.controls["senderId"].clearValidators();
      this.compaingForm.controls["senderId"].updateValueAndValidity();

      this.compaingForm.controls["appName"].clearValidators();
      this.compaingForm.controls["appName"].updateValueAndValidity();

      this.compaingForm.controls["messageText"].setValidators([Validators.required, Validators.maxLength(this.messageTextLength)]);
      this.compaingForm.controls["subject"].setValidators([Validators.required]);
      this.compaingForm.controls["messageText"].updateValueAndValidity();
      this.compaingForm.controls["subject"].updateValueAndValidity();

    } else if (value == '3') {
      this.messageTextLength = this.constantsService.pushDefaultMsgLength
      this.compaingForm.controls["Operator"].clearValidators();
      this.compaingForm.controls["Operator"].updateValueAndValidity();
      this.compaingForm.controls["senderId"].clearValidators();
      this.compaingForm.controls["senderId"].updateValueAndValidity();

      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();


      this.compaingForm.controls["messageText"].setValidators([Validators.required, Validators.maxLength(this.messageTextLength)]);
      this.compaingForm.controls["appName"].setValidators([Validators.required]);

      this.compaingForm.controls["messageText"].updateValueAndValidity();
      this.compaingForm.controls["appName"].updateValueAndValidity();


    }
  }
  setTemplateData() {
    const msgDelivery = 1//parseInt(this.compaignObj.channel);
    let obj = {
      channelId: msgDelivery,
      langId: this.compaignObj.language
    };
    this.apiService.post(this.constantsService.getCampaignTemplateByChannelId, obj).subscribe((succ: any) => {


      this.common.hideLoading();
      if (succ.code == 200) {
        this.listTemplates = succ.data;
        // this.compaignObj.templateId = succ.data[0].templateId;

        selectSearchMethod();


      }
      else {
        // this.common.showErrorMessage(succ.message);
      }

    }, err => {
      this.common.hideLoading();

    });
  }

  changeIssdk($event) {
    if (this.compaignObj.isSdkIntegration) {
      this.compaignObj.isSdkIntegration = 1;

      this.compaignObj.distribution = "";
      this.compaignObj.isDl = "0";
      this.compaignObj.distributionId = 0;
      this.compaingForm.get('containText').disable();
      this.compaingForm.get('distribution').disable();
      this.compaingForm.get('file').disable();

    }
    else {
      this.compaignObj.isSdkIntegration = 0;

      this.compaignObj.distributionId = 0;
      this.compaignObj.isDl = "0";
      this.compaingForm.get('containText').enable();
      this.compaingForm.get('file').enable();
      this.compaingForm.get('distribution').enable();

    }
  }

  distList($event) {

    if ($event.target.value != "undefined") {
      this.compaignObj.distributionId = $event.target.value;
      this.compaignObj.isDl = "1";
      this.compaingForm.get('containText').disable();
      this.compaingForm.get('file').disable();
      this.compaingForm.get('isSdkIntegration').disable();
      this.compaignObj.isSdkIntegration = 0;

    }
    else {
      this.compaignObj.isSdkIntegration = 0;

      this.compaignObj.distributionId = 0;
      this.compaignObj.isDl = "0";
      this.compaingForm.get('containText').enable();
      this.compaingForm.get('file').enable();
      this.compaingForm.get('isSdkIntegration').enable();

    }

  }
  selectTemplate(listTemplate) {

    this.selectedTemplate = listTemplate;

    let cont = JSON.parse(this.selectedTemplate.msgText);
    let str = "";
    for (let i = 0; i < 1; i++) {

      for (var key in cont[i]) {
        if (cont[i].hasOwnProperty(key)) {
          // alert(key); // 'a'
          // alert(message[i][key]); // 'hello'
          str = cont[i][key];
          break;
        }
      }
    }
    this.selectedTemplate.content = str;

    for (let i = 0; i < this.listTemplates.length; i++) {
      this.listTemplates[i].active = false;
    }
    listTemplate.active = true;
  }
  templateSelect() {

    if (this.selectedTemplate.content) {
      if (this.compaignObj.channel == 1) {
        this.compaignObj.msgText = this.selectedTemplate.content;
      } else if (this.compaignObj.channel == 2) {
        this.compaignObj.msgText = this.selectedTemplate.content;
        this.compaignObj.subject = this.selectedTemplate.subject;

      }
      $('#multitemplate-popup').modal('hide');

      this.compaignObj.selectedTemplated = this.selectedTemplate;
    } else {
      alert("Please select template");
    }
  }
  approve(data) {
    let url = "";
    if (data != 'approve') {
      if (!this.compaignObj.reason) {
        // this.common.showErrorMessage("Reason is Must");
        this.errReasonMsg = true;
        return;
      }
      this.errReasonMsg = false;
      if (data == 'stop')
        url = this.constantsService.stopPush;
      else if (data == 'resume')
        url = this.constantsService.stopPush;
      else if (data != 'ReturnToMaker')
        url = this.constantsService.rejectPushCampaign;
      else
        url = this.constantsService.returnToMakerPushCampaign;

    } else {
      url = this.constantsService.approvePushCampaign;
    }

    // return;
    this.common.showLoading();

    let PushId: any = { "pushsms": this.compaignObj };

    this.apiService.post(url, PushId).subscribe((succ: any) => {


      this.common.hideLoading();
      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);
        this.back();
        this.constructor();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide');

      this.common.hideLoading();

    });
  }

  Update() {




    if (this.compaingForm.invalid) {
      this.compaingForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid');

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      this.common.showLoading();

      this.those = this.compaignObj.scheduledTimeDup;



      this.compaignObj.scheduleTime = this.common.scheduledTimeFormat(this.those);
      this.compaignObj.validityDateTime = this.common.scheduledTimeFormat(this.compaignObj.validityDateTime);
      let PushId: any = { "pushsms": this.compaignObj };

      PushId.isMainChecker = this.isMainChecker;

      this.apiService.post(this.constantsService.submitPush, PushId).subscribe((succ: any) => {

        this.common.hideLoading();


        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/campaign-management/PushSmsList/']);

        }
        else {
          this.common.showErrorMessage(succ.message);

        }

      },
        err => {
          this.common.hideLoading();

        });

    }


  }



  uploadFile(submitUrl) {


    var array = 'mobile_list.xlsx'.split(/\.(?=[^\.]+$)/);

    var campaignDescFileName = this.compaignObj.campaignDesc + '.' + array[1];

    this.compaignObj.sessionId = this.user.sessionId;
    this.compaignObj.userId = this.user.userId;
    this.compaignObj.companyId = this.user.companyId;
    this.compaignObj.fileContainsText = parseInt(this.checkedtrue);
    this.compaignObj.user = parseInt(this.checkedtrue);

    const formData = new FormData();
    formData.append('name', this.compaignObj.campaignDesc);
    formData.append('fileContains', this.compaignObj.fileContainsText);
    formData.append('filePart', this.compaignObj.file);
    formData.append('user', this.compaignObj.userId);
    let url = "";
    if (this.compaignObj.channel == 1) {
      url = this.constantsService.saveSMSFile;
    }
    else if (this.compaignObj.channel == 2) {
      url = this.constantsService.saveEmailFile;
    } else {
      url = this.constantsService.savePushFile;
    }
    this.common.showLoading();
    this.apiService.uploadFile(url, formData).subscribe((succ: any) => {

      if (succ.code == 200) {

        // this.common.showSuccessMessage(succ.message);
        this.compaignObj.fileName = succ.fileName;
        this.compaignObj.fileType = succ.fileType;

        this.compaignObj.totalMsgs = succ.data.totalMsgs;
        this.compaignObj.validMsgs = succ.data.validMsgs;
        this.compaignObj.duplicateMsgs = succ.data.duplicateMsgs;
        this.compaignObj.invalidMsgs = succ.data.invalidMsgs;
        this.compaignObj.costPerMsg = succ.data.costPerMsg;
        this.compaignObj.totalCost = succ.data.totalCost;
        this.saveCampaign(submitUrl);
        this.common.hideLoading();
      }
      else {
        this.common.hideLoading();
        this.showDownloadFile = true;
        this.compaignObj.filePath = succ.fileName;

        this.common.showErrorMessage(succ.message);

      }


    }, err => {
      this.common.hideLoading();

    });
  }


  save(submitUrl) {

    console.log(this.compaingForm)
    this.compaignObj.promo = [];
    // for (let i = 0; i < this.compaignObj.promoName.length; i++) {
    //   this.compaignObj.promo.push(this.compaignObj.promoName[i].reqId);
    // }
    // this.compaignObj.promo = JSON.stringify(this.compaignObj.promo)
    // return;
    this.compaignObj.promo = JSON.stringify(this.promoID)

    if (this.compaingForm.invalid) {
      this.compaingForm.markAllAsTouched();
      let target;

      target = this.el.nativeElement.querySelector('form .ng-invalid');

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top - 100 }, 'slow');
        target.focus();
      }
      return;
    }


    else {


      this.common.showLoading();

      if (this.compaignObj.campaignType == 'Pull') {
        this.saveCampaign(submitUrl);
        return;
      }

      if (this.compaignObj.isSdkIntegration == 1 || this.compaignObj.isDl == "1" || this.isFileAlreadyUpload)
        this.saveCampaign(submitUrl);
      else {
        this.uploadFile(submitUrl);

      }


    }

  }
  saveCampaign(data) {

    this.compaignObj.status = "Active";


    this.compaignObj.department = parseInt(this.compaignObj.department);
    this.compaignObj.senderID = parseInt(this.compaignObj.senderID);
    this.compaignObj.prioritylvl = parseInt(this.compaignObj.prioritylvl);
    this.compaignObj.operator = parseInt(this.compaignObj.operator);
    this.compaignObj.channel = parseInt(this.compaignObj.channel);
    this.compaignObj.category = parseInt(this.compaignObj.category);
    this.compaignObj.companyId = parseInt(this.compaignObj.companyId);
    this.compaignObj.fileContainsText = parseInt(this.checkedtrue);
    this.compaignObj.timeZone = this.compaignObj.getZones;

    if (this.compaignObj.campaignType == 'Pull') {
      this.compaignObj.startDate = this.common.getAddTimezone(this.compaignObj.startDate, this.compaignObj.getZones);
      // this.compaignObj.campaignValidity = this.common.getAddTimezone(this.compaignObj.campaignValidity, this.compaignObj.getZones)
      if (this.compaignObj.endDate)
        this.compaignObj.endDate = this.common.getAddTimezone(this.compaignObj.endDate, this.compaignObj.getZones);




    }
    else if (this.compaignObj.campaignType == 'Push') {
      if (!this.compaignObj.scheduledTimeDup) {
        this.compaignObj.scheduleTime = new Date();
        this.compaignObj.validityDateTime = new Date();

      } else {
        // if (this.Edit)
        //   this.compaignObj.scheduleTime = this.common.scheduledTimeFormat(this.those)
        // else
        //   this.compaignObj.scheduleTime = this.common.scheduledTimeFormat(this.compaignObj.scheduledTimeDup)

        // var getZones = this.compaignObj.getZones
        // var getTimes = this.compaignObj.scheduledTimeDup
        // var getTimesFinal = getTimes.toString();
        // var consolew = getTimesFinal.substr(0, 25)


        // var datiDup = new Date(consolew + getZones);
        // var BefConfr = datiDup.toString()
        // var finalDate = BefConfr.substr(0, 25)

        // this.compaignObj.scheduledTime = new Date(finalDate);
        this.compaignObj.scheduledTime = this.common.getAddTimezone(this.compaignObj.scheduledTimeDup, this.compaignObj.getZones);
        this.compaignObj.validityDateTime = this.common.getAddTimezone(this.compaignObj.validityDateTime, this.compaignObj.getZones);




      }
    } else {
      if (!this.compaignObj.scheduledTimeDup) {
        this.compaignObj.scheduleTime = new Date();
        this.compaignObj.validityDateTime = new Date();

      } else {

        this.compaignObj.scheduledTime = this.common.getAddTimezone(this.compaignObj.scheduledTimeDup, this.compaignObj.getZones);
        this.compaignObj.validityDateTime = this.common.getAddTimezone(this.compaignObj.validityDateTime, this.compaignObj.getZones);

        this.compaignObj.startDate = this.common.getAddTimezone(this.compaignObj.startDate, this.compaignObj.getZones);
        // this.compaignObj.campaignValidity = this.common.getAddTimezone(this.compaignObj.campaignValidity, this.compaignObj.getZones)
        if (this.compaignObj.endDate)
          this.compaignObj.endDate = this.common.getAddTimezone(this.compaignObj.endDate, this.compaignObj.getZones);


      }
    }





    // Here will be









    let pushsms: any = { "pushsms": this.compaignObj };
    pushsms.isMainChecker = this.isMainChecker;

    let url = this.constantsService.submitPush;
    if (data == 'draft') {
      url = this.constantsService.savePushDraft;
    }


    // return;
    this.apiService.post(url, pushsms).subscribe((succ: any) => {



      this.common.hideLoading();
      if (succ.code == 200) {


        // this.common.showSuccessMessage(succ.message);
        this.showSuccessMsg = succ.data;
        $('#showMessageModal').modal('show');
        // 
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      this.common.hideLoading();

    });
  }
  back() {
    this.router.navigate(['../home/campaign-management/PushSmsList/']);
  }
  onFileSelect($event) {
    // this.compaignObj.campaignDesc;
    this.isFileAlreadyUpload = false;
    this.compaingForm.controls["file"].setValidators([Validators.required]);
    var file: File = $event.target.files[0];

    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);



    if ($event.target.files.length > 0) {


      if (_.indexOf(this.AcceptfileFormat, fileFormat.toLowerCase()) === -1) {
        this.common.showErrorMessage('Invalid File Type');

        return;
      }
      else {
        const file = $event.target.files[0];
        // file.name="sam";
        this.compaignObj.file = file;
        this.compaignObj.fileNa = file.name;

      }

    }
  }
  onChangeIntegratonPull($event) {
    this.compaingForm.controls["pullURL"].setValue("");
    if ($event.target.checked == true) {
      this.compaingForm.controls["pullURL"].enable();
      this.compaingForm.controls["pullURL"].setValidators([Validators.required]);
      this.compaingForm.controls["pullURL"].updateValueAndValidity();
      this.compaignObj.integrationReq = 1;
    }
    else {
      this.compaingForm.controls["pullURL"].disable();
      this.compaingForm.controls["pullURL"].clearValidators();
      this.compaingForm.controls["pullURL"].updateValueAndValidity();
      this.compaignObj.integrationReq = 0;
    }
  }

  onChange($event) {

    if ($event.target.checked == true) {
      this.compaingForm.controls['messageText'].disable();
      this.compaingForm.controls["messageText"].clearValidators();
      this.compaingForm.controls["messageText"].updateValueAndValidity();
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();
      this.checkedtrue = "1";

    }
    else {

      if (this.compaignObj.msgdelivery == '2') {
        this.compaingForm.controls["subject"].setValidators([Validators.required]);


      }
      this.compaingForm.controls['messageText'].enable();
      this.compaingForm.controls["messageText"].setValidators([Validators.required, Validators.maxLength(this.messageTextLength)]);

      // this.compaingForm.controls['pushMessageText'].enable();
      this.checkedtrue = "0";
    }
  }

  downloadAttachement() {
    var pushsms = { "pushsms": { fileName: this.compaignObj.filePath, campaignDesc: this.compaignObj.campaignDesc } };

    if (this.Edit || this.isApprove) {
      pushsms.pushsms.fileName = this.compaignObj.fileName;
    }

    this.common.showLoading();
    // var dist = { distributionId: distribution.distributionId }
    this.apiService.downloadFile(this.constantsService.downloadPushFile, pushsms).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, this.compaignObj.campaignDesc);
    }, err => {


      this.common.hideLoading();

    });



  }





  calculate() {

    if (this.compaingForm.invalid) {
      this.compaingForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid');

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      this.apiService.post(this.constantsService.getPushMaster, {}).subscribe((succ: any) => {


        if (succ.code == 200) {
          var arabiclangId = succ.data.language[0].langId;
          var arabicMaxLength = succ.data.language[0].maxMsgLen;

          var englishlangId = succ.data.language[1].langId;
          var englishMaxLength = succ.data.language[1].maxMsgLen;





          var language = this.compaignObj.language;


          if (language == arabiclangId) {

            // Calculation Arabic



            var arabicLengthCal = (this.compaignObj.msgText.length) / (arabicMaxLength - this.maxLength);
            var arabicPostFinal = Math.round(arabicLengthCal);



            var arabicLength = (this.compaignObj.msgText.length);
            var BackArabicLength = arabicMaxLength;
            this.common.showSuccessMessage("Total Message Count Arabic Message for is '" + arabicPostFinal + "' ");


          }
          else if (language == englishlangId) {

            // Calculation English

            var englishLengthCal = (this.compaignObj.msgText.length) / (englishMaxLength - this.maxLength);
            var englishPostFinal = Math.round(englishLengthCal);

            var englishLength = this.compaignObj.msgText.length;
            var BackEnglishLength = englishMaxLength;
            this.common.showSuccessMessage("Total Message Count English Message for is '" + englishPostFinal + "' ");


          }


        }
      }, err => {

        this.common.showErrorMessage("Please select language");
      });







    }





  }

  public checkParamsCK({ editor }: ChangeEvent) {
    const data = editor.getData();


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
  preview() {
    // this.calculate()
    this.compaignObj.previewMsg = this.compaignObj.msgText;

  }
  sendMessage() {

    let reqObj: any = {};
    let url = this.constantsService.previewPush;
    if (this.compaignObj.channel == '1') {
      reqObj.isSms = true;
      reqObj.isEmail = false;
      reqObj.isPushNotification = false;

      if (this.phoneForm.invalid) {
        this.phoneForm.markAllAsTouched();

        return;
      }
      reqObj.address = [];
      let emailValue = this.phoneForm.value.phoneNo;
      for (let i = 0; i < emailValue.length; i++) {
        let ph = this.common.convertCompleteCountryCode(emailValue[i].phone);

        reqObj.address.push(ph);
      }
      reqObj.messageText = this.compaignObj.previewMsg;

    } else if (this.compaignObj.channel == '2') {
      reqObj.isEmail = true;
      reqObj.isSms = false;
      reqObj.isPushNotification = false;
      if (this.compaignObj.subject == "" || this.compaignObj.subject == undefined) {
        this.common.showErrorMessage("Email cannot send without subject")
        return
      }
      if (this.emailForm.invalid) {
        this.emailForm.markAllAsTouched();

        return;
      }

      // if (reqObj.messageText.length > 500) {
      //   this.common.showErrorMessage("Please enter message text not more than 500 Characters.")
      //   return
      // }
      reqObj.subject = this.compaignObj.subject;
      reqObj.emailId = "gunase@gmailc.co";
      reqObj.messageText = this.compaignObj.previewMsg;
      reqObj.address = [];
      let emailValue = this.emailForm.value.email;
      for (let i = 0; i < emailValue.length; i++) {
        reqObj.address.push(emailValue[i].email);
      }
      // url = this.constantsService.previewPush
      reqObj.isPushNotification = false;

    } else {
      reqObj.isPushNotification = true;
      reqObj.isSms = false;
      reqObj.isEmail = false;

      reqObj.title = "preview";
      reqObj.messageText = this.compaignObj.previewMsg;
    }
    this.common.showLoading();
    this.apiService.post(url, reqObj).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('#testcampaign-modal').modal('hide');
        this.phoneForm.reset();
        this.emailForm.reset();

        return;
      }
      this.common.showErrorMessage(succ.message);

    }, err => {
      this.common.showErrorMessage(err);

      this.common.hideLoading();
    });
  }
  cancel() {
    $('#preview-modal').modal('hide');

  }
  private validateText(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      if (this.isMessageText) {
        return null;
      }
      return { 'existContent': true };
    };
  }
  getlang: any;
  checklang: any;
  ChangLang: boolean = true
  changeLanguage($event) {
    this.checklang = $event.target.value
    this.ChangLang = false
    this.promoArry = []
    this.promoID = []
    this.compaignObj.selectedPromoTemplated = []
    this.getlang = $event.target.options[$event.target.options.selectedIndex].text.toLowerCase()

    this.setTemplateData();
    this.setPromoTemplateDatas()
    if (this.compaignObj.channelId != '2')
      this.messageTextfoucsOut();
    else
      this.messageEmailTextfoucsOut("");
  }
  isShown: boolean = true;
  // virtual keyboard functions starting
  virtualKey: boolean;
  AddKeyborad() {
    if (this.virtualKey != false) {
      this.keyboard.setOptions({
        layout: this.layoutsObj[this.getlang]
      });
      $('.virtualkeyboard').click(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('.simple-keyboard').removeClass('active');

        }
        else {
          $('.simple-keyboard').addClass('active');
          $('.virtualkeyboard').removeClass('active');
          $(this).addClass('active');
          $(this).next().filter('.simple-keyboard').removeClass('active');

        }

      });
    }

  }
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange1(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: this.layoutsObj[this.selectedLayout]
    });


    // const control = new FormControl; 
    // (this.listTemplateForm.controls.listTemp as FormArray).push(control);
  }
  promoTemp: any = []

  setPromoTemplateDatas() {
    this.promoTemp = []
    this.common.showLoading();
    this.apiService.post(this.constantsService.listPromoDropdown, {}).subscribe((succ: any) => {


      this.common.hideLoading();
      if (succ.code == 200) {

        this.promoModalList = []
        let data = succ.data;
        let str = ""


        for (var i = 0; i < data.length; i++) {

          data[i].langIds = []
          let cont = JSON.parse(data[i].messageTextEn);

          for (let j = 0; j < cont.length; j++) {
            for (var key in cont[j]) {
              if (cont[j].hasOwnProperty(key)) {


                if (key.trim() == this.checklang.trim()) {
                  data[i].langIds.push(key)
                  this.promoModalList.push(data[i]);
                }

              }

            }
          }

        }


        selectSearchMethod();


      }
      else {
        // this.common.showErrorMessage(succ.message);
      }

    }, err => {
      this.common.hideLoading();

    });
  }
  listTemplateSelect(event, index) {

    if (!$(".CheckList" + index).is(":checked")) {
      // do something if the checkbox is NOT checked

      $(".CheckList" + index).removeClass('active')
    }
    else {

      $(".CheckList" + index).addClass('active')
    }
    // if (!this.listTemp[index].check)
    // {
    //   this.listTemp[index].check = false;

    // }

    // if (this.listTemp[index].check)
    // {
    //   this.listTemp[index].check = true;

    // }



  }
  promoArry = []
  promoID = []
  getPromotemplate() {

    if (this.ChangLang == true) {
      this.checklang = this.compaignObj.language
      this.setPromoTemplateDatas()
    }
  }
  selectPromoTemplates(listTemplate, index) {
    $('.pre-templatelist' + index).toggleClass("active")

    this.selectedTemplates = listTemplate;

    let cont = this.selectedTemplates.promoName
    let str = "";
    // for (let i = 0; i < cont.length; i++) {

    //   for (var key in cont[i]) {
    //     if (cont[i].hasOwnProperty(key)) {
    //        if(this.checklang.trim() == key.trim())
    //         {

    //       str = cont[i][key];

    //      // break;
    //      }
    //     //   else{
    //     //     str = "";
    //     //  // break;
    //     //    }
    //     }
    //   }
    // }

    this.selectedTemplates.content = cont;
    if ($('.pre-templatelist' + index).hasClass("active")) {
      this.promoArry.push(this.selectedTemplates.content)

      this.promoID.push(this.selectedTemplates.reqId)
    }
    else {
      const index = this.promoArry.indexOf(this.selectedTemplates.content);
      if (index > -1) {
        this.promoArry.splice(index, 1);
      }
      const index1 = this.promoID.indexOf(this.selectedTemplates.reqId);
      if (index1 > -1) {
        this.promoID.splice(index1, 1);
      }
    }


    for (let i = 0; i < this.selectedTemplates.length; i++) {
      this.selectedTemplates[i].active = false;
    }
    listTemplate.active = true;
  }
  templateSelect1() {

    if (this.selectedTemplates.content) {
      // if (this.compaignObj.channel == 1) {
      //   this.compaignObj.msgText = this.selectedTemplates.content;
      // } else if (this.compaignObj.channel == 2) {
      //   this.compaignObj.msgText = this.selectedTemplates.content;
      //   this.compaignObj.subject = this.selectedTemplates.subject;

      // }
      $('#multitemplate-popup1').modal('hide');

      this.compaignObj.selectedPromoTemplated = this.promoArry//this.selectedTemplates;
    } else {
      alert("Please select promo template");
    }
  }

  onChange1 = (input: any) => {
    this.value = input;
  };

  onKeyPress = (button: string) => {

    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  // virtual keyboard functions ending
  messageEmailTextfoucsOut(event) {


    let rawtext = this.compaignObj.msgText.replace(/<\/?[^>]+(>|$)/g, " ");
    this.compaignObj.msgText.replace("&nbsp;", "");

    this.checkMessage(rawtext);

  }
  messageTextfoucsOut() {
    this.checkMessage(this.compaignObj.msgText);
    // this.common.showLoading();

  }
  checkMessage(msg) {
    this.apiService.post(this.constantsService.checkMessageBlock, { messageText: msg, type: 4, languageId: this.compaignObj.language }).subscribe((succ: any) => {


      if (succ.code == 200) {
        this.isMessageText = true;
        this.compaingForm.get('messageText').setValidators([this.validateText(), Validators.required, Validators.maxLength(this.messageTextLength)]);
        this.compaingForm.get('messageText').updateValueAndValidity();
      } else {
        let val = this.isMessageText;

        this.isMessageText = false;
        this.compaingForm.get('messageText').setValidators([this.validateText(), Validators.required, Validators.maxLength(this.messageTextLength)]);
        this.compaingForm.get('messageText').updateValueAndValidity();
        this.messageError = succ.message;
      }

    }, err => {

    });
  }


  goToBack() {
    $('#showMessageModal').modal('hide');
    this.router.navigate(['../home/campaign-management/PushSmsList/']);
  }
  focusOutUserId(value) {


    if (!value) {
      return;

    }
    let push: any = { "pushsms": this.compaignObj };


    this.apiService.post(this.constantsService.checkCampaignDesc, push).subscribe((succ: any) => {
      // this.common.hideLoading();

      if (succ.code == 200) {
        this.isUniqueCampaignDesc = true;
        this.compaingForm.get('campaignDesc').setValidators([Validators.required, this.validateCampaignDescFn()]);
        this.compaingForm.get('campaignDesc').updateValueAndValidity();
      } else {

        this.isUniqueCampaignDesc = false;
        this.compaingForm.get('campaignDesc').setValidators([Validators.required, this.validateCampaignDescFn()]);
        this.compaingForm.get('campaignDesc').updateValueAndValidity();
      }
    });

  }
  private validateCampaignDescFn(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      if (this.isUniqueCampaignDesc != false) {
        return null;
      }
      return { 'alreadyExist': true };
    };
  }
  campaginTypeChange() {


    // this.compaignObj.campaignType=event.target.value;
    this.compaingForm.get('distribution').enable();

    if (this.compaignObj.campaignType == 'Push') {
      this.compaingForm.controls["channel"].enable();


      this.compaingForm.controls["scheduledTimeDup"].setValidators([Validators.required]);


      if (this.isFileAlreadyUpload) {
        this.compaingForm.controls["file"].clearValidators();
      } else {
        this.compaingForm.controls["file"].setValidators([Validators.required]);
      }


      this.compaingForm.controls["validityDateTime"].setValidators([Validators.required]);

      this.compaingForm.controls["scheduledTimeDup"].updateValueAndValidity();
      this.compaingForm.controls["file"].updateValueAndValidity();
      this.compaingForm.controls["validityDateTime"].updateValueAndValidity();


      this.compaingForm.controls["shortCode"].clearValidators();
      this.compaingForm.controls["shortCode"].updateValueAndValidity();

      this.compaingForm.controls["ackMsg"].clearValidators();
      this.compaingForm.controls["nackMsg"].clearValidators();
      this.compaingForm.controls["integrationReq"].clearValidators();
      this.compaingForm.controls["pullURL"].clearValidators();
      this.compaingForm.controls["startDate"].clearValidators();
      // this.compaingForm.controls["campaignValidity"].clearValidators();
      this.compaingForm.controls["noEndDate"].clearValidators();
      this.compaingForm.controls["endDate"].clearValidators();

      this.compaingForm.controls["startDate"].updateValueAndValidity();
      // this.compaingForm.controls["campaignValidity"].updateValueAndValidity();
      this.compaingForm.controls["noEndDate"].updateValueAndValidity();
      this.compaingForm.controls["endDate"].updateValueAndValidity();
      this.compaingForm.controls["ackMsg"].updateValueAndValidity();
      this.compaingForm.controls["nackMsg"].updateValueAndValidity();
      this.compaingForm.controls["integrationReq"].updateValueAndValidity();
      this.compaingForm.controls["pullURL"].updateValueAndValidity();
    } else if (this.compaignObj.campaignType == 'Pull') {
      this.compaignObj.msgText = "";
      this.compaignObj.channel = "1";
      // this.setCampaignData("1");
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();

      this.compaingForm.controls["appName"].clearValidators();
      this.compaingForm.controls["appName"].updateValueAndValidity();


      this.compaingForm.controls["Operator"].setValidators([Validators.required]);
      this.compaingForm.controls["senderId"].setValidators([Validators.required]);
      this.compaingForm.controls["messageText"].clearValidators();
      this.compaingForm.controls["Operator"].updateValueAndValidity();
      this.compaingForm.controls["senderId"].updateValueAndValidity();
      this.compaingForm.controls["messageText"].updateValueAndValidity();
      this.setTemplateData();
      this.compaingForm.controls["channel"].disable();

      this.compaingForm.controls["scheduledTimeDup"].clearValidators();
      this.compaingForm.controls["validityDateTime"].clearValidators();
      this.compaingForm.controls["scheduledTimeDup"].updateValueAndValidity();
      this.compaingForm.controls["validityDateTime"].updateValueAndValidity();
      this.compaingForm.controls["file"].clearValidators();
      this.compaingForm.controls["file"].updateValueAndValidity();



      this.compaingForm.controls["startDate"].setValidators([Validators.required]);
      // this.compaingForm.controls["campaignValidity"].setValidators([Validators.required]);
      this.compaingForm.controls["shortCode"].setValidators([Validators.required]);
      this.compaingForm.controls["ackMsg"].setValidators([Validators.required]);
      this.compaingForm.controls["nackMsg"].setValidators([Validators.required]);
      this.compaingForm.controls["integrationReq"].clearValidators();
      this.compaingForm.controls["pullURL"].clearValidators();

      if (this.compaignObj.noEndDate == 0)
        this.compaingForm.controls["endDate"].setValidators([Validators.required]);

      this.compaingForm.controls["startDate"].updateValueAndValidity();
      // this.compaingForm.controls["campaignValidity"].updateValueAndValidity();
      this.compaingForm.controls["noEndDate"].updateValueAndValidity();
      this.compaingForm.controls["endDate"].updateValueAndValidity();
      this.compaingForm.controls["shortCode"].updateValueAndValidity();
      this.compaingForm.controls["ackMsg"].updateValueAndValidity();
      this.compaingForm.controls["nackMsg"].updateValueAndValidity();
      this.compaingForm.controls["integrationReq"].updateValueAndValidity();
      this.compaingForm.controls["pullURL"].updateValueAndValidity();

    }

    else {

      this.compaingForm.controls["channel"].disable();
      // push control

      this.compaingForm.controls["scheduledTimeDup"].setValidators([Validators.required]);
      if (this.isFileAlreadyUpload) {
        this.compaingForm.controls["file"].clearValidators();
      } else {
        this.compaingForm.controls["file"].setValidators([Validators.required]);
      } this.compaingForm.controls["validityDateTime"].setValidators([Validators.required]);

      this.compaingForm.controls["scheduledTimeDup"].updateValueAndValidity();
      this.compaingForm.controls["file"].updateValueAndValidity();
      this.compaingForm.controls["validityDateTime"].updateValueAndValidity();

      //pull control
      this.compaingForm.controls["startDate"].setValidators([Validators.required]);
      // this.compaingForm.controls["campaignValidity"].setValidators([Validators.required]);
      this.compaingForm.controls["shortCode"].setValidators([Validators.required]);
      this.compaingForm.controls["ackMsg"].setValidators([Validators.required]);
      this.compaingForm.controls["nackMsg"].setValidators([Validators.required]);
      this.compaingForm.controls["integrationReq"].clearValidators();
      this.compaingForm.controls["pullURL"].clearValidators();
      if (this.compaignObj.noEndDate == 0)
        this.compaingForm.controls["endDate"].setValidators([Validators.required]);

      this.compaingForm.controls["startDate"].updateValueAndValidity();
      // this.compaingForm.controls["campaignValidity"].updateValueAndValidity();
      this.compaingForm.controls["noEndDate"].updateValueAndValidity();
      this.compaingForm.controls["endDate"].updateValueAndValidity();
      this.compaingForm.controls["shortCode"].updateValueAndValidity();
      this.compaingForm.controls["ackMsg"].updateValueAndValidity();
      this.compaingForm.controls["nackMsg"].updateValueAndValidity();
      this.compaingForm.controls["integrationReq"].updateValueAndValidity();
      this.compaingForm.controls["pullURL"].updateValueAndValidity();
    }

  }
  changeCampaignStartDate(event) {
    const dateObj = new Date();
    const dateStr = dateObj.toISOString().split('T').shift();

    this.compaignObj.endDate = null;
    // this.compaignObj.endDate = new Date(datePipe.transform(this.compaignObj.startDate, 'dd MMM yyyy hh:mm a'));


  }
  onChangenoEndDate(event) {
    if (event.target.checked == true) {
      this.compaingForm.controls["endDate"].clearValidators();
      this.compaingForm.controls["endDate"].updateValueAndValidity();

      this.compaignObj.noEndDate = 1;
    }
    else {

      this.compaingForm.controls["endDate"].setValidators([Validators.required]);
      this.compaingForm.controls["endDate"].updateValueAndValidity();
      this.compaignObj.noEndDate = 0;
    }
  }
  focusOutshortCode(value) {
  }
  AcceptImageFormat: any = ['.jpeg', '.png', '.jpg',];

  onAttachmentFileChange($event) {
    // this.compaignObj.campaignDesc;
    var file: File = $event.target.files[0];
    if (!file) {
      this.compaignObj.attachmentFile = "";
      this.compaignObj.attachmentFileName = "";
      return;
    }
    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);



    if ($event.target.files.length > 0) {


      if (_.indexOf(this.AcceptImageFormat, fileFormat.toLowerCase()) === -1) {
        this.common.showErrorMessage('Invalid File attchment');

        return;
      }
      else {
        const file = $event.target.files[0];
        // file.name="sam";
        this.common.convertBase64(file, (result) => {
          this.compaignObj.attachmentFile = result;
          this.compaignObj.attachmentFileName = file.name;

        });


      }

    }
  }

  downloadSampleFile(file) {
    // var pushsms = file;



    this.common.showLoading();
    // var dist = { distributionId: distribution.distributionId }
    this.apiService.downloadFile(this.constantsService.downloadFileTemplate, file).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, file.description);
    }, err => {


      this.common.hideLoading();

    });



  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  ngOnDestroy() {

    this.common.setEditpushCampaign({});

  }

}


