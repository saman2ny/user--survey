import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../test.js';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { TooltipLabel } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service.js';

import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';
import insertTextAtCursor from 'insert-text-at-cursor';


declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-web-to-sms',
  templateUrl: './web-to-sms.component.html',
  styleUrls: ['./web-to-sms.component.css']
})
export class WebToSMSComponent implements OnInit, AfterViewInit {
  user: any;
  role: any;
  compaingForm: FormGroup;
  compaignObj: any = {
    messageText: "",
    isEmail: false,
    isSms: true,
    isPushNotification: false,
    istwitter: false,
    twitterId: "",
    twitterText: "",



  };
  listCountryCode: any;
  listDepartments: any;
  listSenderId: any;
  listOperatorId: any;
  listLanguageId: any
  listChannelId: any;
  listPriorityId: any;
  listCategoryId: any;
  hours: any = [];
  days: any = [];
  campaignList: any = [
    {
      id: 1,
      name: "SMS"
    },
    {
      id: 2,
      name: "Email"
    },
    {
      id: 3,
      name: "Push Notification"
    },
    {
      id: 4,
      name: "Twitter"
    },
  ]
  public todayDate: any = new Date();
  public Editor = ClassicEditor;
  config = { extraPlugins: [MyCustomUploadAdapterPlugin] }
  isMessageText: boolean;
  messageError: any = {};
  appName: any = [];
  // onReady($event){
  //   $event.plugins.get('FileRepository').createUploadAdapter = (loader)=> {
  //     return new UploadAdapter(loader,'',this.http);
  //   };
  // }

  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
  CountryISO: any = [];
  selectedCorpPreMobileNo = "in"
  getlang: any;
  getLangid2: any;

  showSearchButton: boolean;
  speechData: string;
  messageTextLength: number;

  constructor(private speechRecognitionService: SpeechRecognitionServiceService, private el: ElementRef, public countryService: CountryService, public common: CommonService, public formBuilder: FormBuilder, public constantsService: ConstantsService, public apiService: ApiService, public router: Router) {

    this.showSearchButton = true;
    this.speechData = "";

    this.allCounties = this.countryService.allCountries;

    for (var i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    //this.countryService.getApiCountryCode();

    this.CountryISO = this.countryService.getcountryCode();

    for (var i = 0; i < 8; i++) {
      this.days.push(i);
    }
    this.user = this.common.getUser();
    this.role = this.common.getRole();

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

      } else {
        this.constantsService.pushMessageLength = this.constantsService.pushDefaultMsgLength;

      }
      this.messageTextLength = this.constantsService.pushMessageLength
      this.compaingForm = this.formBuilder.group({

        isSms: [''],
        isEmail: [''],
        isPushNotification: [''],
        departmentId: [''],
        opPreMobileNo: ['', Validators.required],
        opPostMobileNo: ['aasd'],
        languageId: ['', Validators.required],
        priorityLevel: ['', Validators.required],
        senderId: ['', Validators.compose([Validators.required])],
        messageType: [''],
        messageText: ['', Validators.compose([Validators.required])],
        validityDateTime: [''],
        twitterSender: [''],
        twitterText: [''],
        // validityDays: ['', Validators.compose([Validators.required])],
        // validityHours: ['', Validators.compose([Validators.required])],
        // sendTime: ['', Validators.compose([Validators.required])],
        operator: ["", Validators.required],
        emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        subject: [''],
        attachmentFile: [],
        attachmentFileName: [],
        channelId: ['', Validators.required],
        title: [],
        appName: [],
        deviceToken: [],
        // body: [],

      });
    }, err => {
      this.common.hideLoading()


    })




    this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {
      this.listCountryCode = succ.data.countryCodeList;
      // this.compaignObj.opPreMobileNo = this.listCountryCode[0].countryCode

    }, err => {

    })
    this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
      this.listDepartments = succ.data;

    }, err => {

    })
    this.common.showLoading();
    this.apiService.post(this.constantsService.getPushMaster, {}).subscribe((succ: any) => {
      this.common.hideLoading();


      this.listSenderId = succ.data.senderId;
      this.listOperatorId = succ.data.smsoperator;
      this.listChannelId = succ.data.channel;
      this.listLanguageId = succ.data.language;
      this.listPriorityId = succ.data.priority;
      this.listCategoryId = succ.data.category;


      this.compaignObj.channelId = this.listChannelId[0].channelId.toString()
      // this.listChannelId[0].channelId
      this.campaginChange("");

    }, err => {

      this.common.hideLoading();
    })
    this.apiService.post(this.constantsService.getSystemParam, { SystemParamName: "MOBILE_APP" }).subscribe((succ: any) => {


      if (succ.data)
        this.appName = JSON.parse(succ.data);



    });

  }
  public onReady(editor) {


    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  campaginChange(event) {


    this.compaignObj.messageText = "";
    this.compaingForm.controls["messageText"].markAsUntouched();
    this.compaignObj.channelId = this.compaignObj.channelId
    if (this.compaignObj.channelId == '1') {
      this.messageTextLength = this.constantsService.pushMessageLength
      this.compaignObj.isSms = true;
      this.compaignObj.isEmail = false;
      this.compaignObj.istwitter = false;
      this.compaignObj.isPushNotification = false;
      this.compaingForm.controls["emailId"].clearValidators();
      this.compaingForm.controls["emailId"].updateValueAndValidity();
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();
      this.compaingForm.controls['opPreMobileNo'].setValidators([Validators.required]);
      this.compaingForm.controls['senderId'].setValidators([Validators.required]);
      this.compaingForm.controls['operator'].setValidators([Validators.required]);
      this.compaingForm.controls['appName'].clearValidators();
      this.compaingForm.controls['appName'].updateValueAndValidity()
      this.compaingForm.controls['deviceToken'].clearValidators();
      this.compaingForm.controls['deviceToken'].updateValueAndValidity()
      this.compaingForm.controls["title"].clearValidators();
      // this.compaingForm.controls["body"].clearValidators();
      this.compaingForm.controls["title"].updateValueAndValidity();
      // this.compaingForm.controls["body"].updateValueAndValidity();
      this.compaingForm.controls["twitterSender"].clearValidators();
      this.compaingForm.controls["twitterSender"].updateValueAndValidity();

      this.compaingForm.controls["twitterText"].clearValidators();
      this.compaingForm.controls["twitterText"].updateValueAndValidity();

    } else if (this.compaignObj.channelId == '2') {
      this.messageTextLength = this.constantsService.pushDefaultMsgLength
      this.compaignObj.isSms = false;
      this.compaignObj.isEmail = true;
      this.compaignObj.istwitter = false;
      this.compaignObj.isPushNotification = false;
      this.compaingForm.controls['emailId'].setValidators([Validators.required, Validators.email
        , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
      this.compaingForm.controls['subject'].setValidators([Validators.required]);
      this.compaingForm.controls["opPreMobileNo"].clearValidators();
      this.compaingForm.controls["opPreMobileNo"].updateValueAndValidity();
      this.compaingForm.controls["opPostMobileNo"].clearValidators();
      this.compaingForm.controls["opPostMobileNo"].updateValueAndValidity();
      this.compaingForm.controls["senderId"].clearValidators();
      this.compaingForm.controls["senderId"].updateValueAndValidity();
      this.compaingForm.controls["operator"].clearValidators();
      this.compaingForm.controls["operator"].updateValueAndValidity();
      this.compaingForm.controls['appName'].clearValidators();
      this.compaingForm.controls['appName'].updateValueAndValidity()
      this.compaingForm.controls['deviceToken'].clearValidators();
      this.compaingForm.controls['deviceToken'].updateValueAndValidity()
      this.compaingForm.controls["twitterSender"].clearValidators();
      this.compaingForm.controls["twitterSender"].updateValueAndValidity();

      this.compaingForm.controls["twitterText"].clearValidators();
      this.compaingForm.controls["twitterText"].updateValueAndValidity();
      this.compaingForm.controls["title"].clearValidators();
      // this.compaingForm.controls["body"].clearValidators();
      this.compaingForm.controls["title"].updateValueAndValidity();


      // this.compaingForm.controls["body"].updateValueAndValidity();

    } else if (this.compaignObj.channelId == '3') {
      this.messageTextLength = this.constantsService.pushDefaultMsgLength
      this.compaignObj.isSms = false;
      this.compaignObj.isEmail = false;
      this.compaignObj.istwitter = false;
      this.compaignObj.isPushNotification = true;
      this.compaingForm.controls['opPreMobileNo'].setValidators([Validators.required]);
      this.compaingForm.controls["senderId"].clearValidators();
      this.compaingForm.controls["senderId"].updateValueAndValidity();
      this.compaingForm.controls["operator"].clearValidators();
      this.compaingForm.controls["operator"].updateValueAndValidity();
      this.compaingForm.controls["emailId"].clearValidators();
      this.compaingForm.controls["emailId"].updateValueAndValidity();
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();

      this.compaingForm.controls["twitterSender"].clearValidators();
      this.compaingForm.controls["twitterSender"].updateValueAndValidity();

      this.compaingForm.controls["twitterText"].clearValidators();
      this.compaingForm.controls["twitterText"].updateValueAndValidity();

      this.compaingForm.controls['title'].setValidators([Validators.required]);
      this.compaingForm.controls['appName'].setValidators([Validators.required]);
      this.compaingForm.controls['deviceToken'].setValidators([Validators.required]);
      // this.compaingForm.controls['body'].setValidators([Validators.required]);

    }
    else if (this.compaignObj.channelId == '4') {
      this.compaignObj.isSms = false;
      this.compaignObj.isEmail = false;
      this.compaignObj.isPushNotification = false;
      this.compaignObj.istwitter = true;
      this.compaingForm.controls['twitterSender'].setValidators([Validators.required]);
      this.compaingForm.controls['twitterText'].setValidators([Validators.required]);
      this.compaingForm.controls["opPreMobileNo"].clearValidators();
      this.compaingForm.controls["opPreMobileNo"].updateValueAndValidity();
      this.compaingForm.controls["opPostMobileNo"].clearValidators();
      this.compaingForm.controls["opPostMobileNo"].updateValueAndValidity();
      this.compaingForm.controls["senderId"].clearValidators();
      this.compaingForm.controls["senderId"].updateValueAndValidity();
      this.compaingForm.controls["operator"].clearValidators();
      this.compaingForm.controls["operator"].updateValueAndValidity();
      this.compaingForm.controls["emailId"].clearValidators();
      this.compaingForm.controls["emailId"].updateValueAndValidity();
      this.compaingForm.controls["subject"].clearValidators();
      this.compaingForm.controls["subject"].updateValueAndValidity();

      this.compaingForm.controls['title'].setValidators([Validators.required]);
      this.compaingForm.controls['appName'].setValidators([Validators.required]);
      this.compaingForm.controls['deviceToken'].setValidators([Validators.required]);
      // this.compaingForm.controls['body'].setValidators([Validators.required]);

    }

  }
  ngOnInit() {
    myMethod();
    selectSearchMethod();


  }

  focusBody() {
    this.getLangid2 = this.getlang
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


  ngAfterViewInit() {

  }
  formReset() {
    this.compaingForm.reset();

    this.compaignObj = {
      messageText: "",
      isEmail: false,
      isSms: false,
      isPushNotification: false,
      istwitter: false

    };
  }

  onChangeSMS($event) {

    if ($event.target.checked == true) {
      this.compaingForm.controls['opPreMobileNo'].enable();
      this.compaingForm.controls['opPostMobileNo'].enable();
      this.compaingForm.controls['senderId'].enable();
      this.compaingForm.controls['operator'].enable();
      this.compaingForm.controls['messageType'].enable();

      this.compaingForm.controls['emailId'].disable();
      this.compaingForm.controls['subject'].disable();

    }
    else if (!this.compaignObj.isPushNotification) {
      this.compaingForm.controls['opPreMobileNo'].disable();
      this.compaingForm.controls['opPostMobileNo'].disable();
      this.compaingForm.controls['senderId'].disable();
      this.compaingForm.controls['operator'].disable();
      this.compaingForm.controls['messageType'].disable();
    }
  }

  onChangeEmail($event) {

    if ($event.target.checked == true) {

      this.compaingForm.controls['emailId'].enable();
      this.compaingForm.controls['subject'].enable();

      this.compaingForm.controls['messageType'].disable();
    }
    else {
      this.compaingForm.controls['emailId'].disable();
      this.compaingForm.controls['subject'].disable();
      this.compaingForm.controls['messageType'].enable();

    }
  }

  onChangePush($event) {
    if ($event.target.checked == true) {
      this.compaingForm.controls['opPreMobileNo'].enable();
      this.compaingForm.controls['opPostMobileNo'].enable();
      this.compaingForm.controls['senderId'].enable();
      this.compaingForm.controls['operator'].enable();
      this.compaingForm.controls['messageType'].disable();

    }
    else if (!this.compaignObj.isSms) {
      this.compaingForm.controls['opPreMobileNo'].disable();
      this.compaingForm.controls['opPostMobileNo'].disable();
      this.compaingForm.controls['senderId'].disable();
      this.compaingForm.controls['operator'].disable();

    }
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
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
  //   public onChange( { editor }: ChangeEvent ) {
  //     const data = editor.getData();



  // }
  save() {

    if (this.compaingForm.invalid) {
      this.compaingForm.markAllAsTouched();
      let target;

      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      if (!this.compaignObj.isEmail) {
        this.compaignObj.mobileNumber = this.common.convertCompleteCountryCode(this.compaingForm.value.opPreMobileNo);
      }
      // var those = this.compaignObj.sendDateTime;
      // this.compaignObj.sendTime = this.common.scheduledTimeFormat(those);
      // var completeDate = moment(those).add(this.compaignObj.validityDays, 'day');
      // completeDate = moment(completeDate).add(this.compaignObj.validityHours, 'hour');
      // this.compaignObj.validityDateTime = this.common.scheduledTimeFormat(completeDate);
      this.common.showLoading();
      this.apiService.post(this.constantsService.webToMessage, this.compaignObj).subscribe((succ: any) => {


        this.common.hideLoading();
        if (succ.code == 200) {

          this.common.showSuccessMessage(succ.message);
          this.formReset();
          setTimeout(() => {
            this.compaignObj.channelId = this.listChannelId[0].channelId.toString()
            this.compaingForm.controls["opPostMobileNo"].setValue("sdf")
            this.campaginChange("");
          }, 1000);

        }
        else {
          this.common.showErrorMessage(succ.message);
        }

      }, err => {
        this.common.hideLoading();


      })

    }

  }



  checkNumber() {
    if (this.compaignObj.ph != null) {
      let Data: any = this.compaignObj.ph;

      this.prePhoneNoFouctOut(Data.dialCode, this.common.convertCompleteCountryCode(Data));
      this.compaingForm.controls['opPreMobileNo'].markAsTouched();
      this.compaingForm.controls['opPostMobileNo'].markAsTouched();
    }
  }

  prePhoneNoFouctOut(premobile, complete) {

    // const complete = this.compaignObj.opPreMobileNo + "-" + this.compaignObj.opPostMobileNo
    var data = { messageText: premobile, type: 3 }

    this.checkContent(this.constantsService.checkBlockContent, data, 'opPreMobileNo');
    data = { messageText: complete, type: 1 }

    this.checkContent(this.constantsService.checkBlockContent, data, 'opPostMobileNo');
  }
  postPhoneNoFouctOut() {

    const complete = this.compaignObj.opPreMobileNo + "-" + this.compaignObj.opPostMobileNo
    var data = { messageText: complete, type: 1 }

    this.checkContent(this.constantsService.checkBlockContent, data, 'opPostMobileNo');
    data = { messageText: this.compaignObj.opPreMobileNo, type: 3 }

    this.checkContent(this.constantsService.checkBlockContent, data, 'opPreMobileNo');

  }
  emailFocusout() {
    if (!this.compaignObj.emailId)
      return;
    var data = { messageText: this.compaignObj.emailId, type: 2 }
    this.checkContent(this.constantsService.checkBlockContent, data, 'emailId');
  }
  changeLanguage($event) {
    this.getlang = $event.target.value
    if (this.compaignObj.channelId != '2')
      this.messageTextfoucsOut()
    else
      this.messageEmailTextfoucsOut();
  }
  messageEmailTextfoucsOut() {


    let rawtext = this.compaignObj.messageText.replace(/<\/?[^>]+(>|$)/g, " ");
    this.compaignObj.messageText.replace("&nbsp;", "")

    var data = { messageText: rawtext, type: 4, languageId: this.compaignObj.languageId }
    this.checkContent(this.constantsService.checkMessageBlock, data, 'messageText');

  }
  messageTextfoucsOut() {
    var data = { messageText: this.compaignObj.messageText, type: 4, languageId: this.compaignObj.languageId }
    this.checkContent(this.constantsService.checkMessageBlock, data, 'messageText');
  }


  checkContent(url, data, controlName) {
    this.apiService.checkBlock(url, data).then((succ: any) => {

      if (succ.valid) {
        this.isMessageText = true;
        // if (controlName == 'opPreMobileNo') {
        this.compaingForm.get(controlName).setValidators([this.validateText(), Validators.required])

        // } else
        // this.compaingForm.get(controlName).setValidators([this.validateText()])
        this.compaingForm.get(controlName).updateValueAndValidity();
      } else {
        let val = this.isMessageText;

        this.isMessageText = false;
        // if (controlName == 'opPreMobileNo') {
        this.compaingForm.get(controlName).setValidators([this.validateText(), Validators.required])

        // } else
        // this.compaingForm.get(controlName).setValidators([this.validateText()])
        this.compaingForm.get(controlName).updateValueAndValidity();
        this.messageError[controlName] = succ.msg;
      }
    }, err => {

    })
  }

  private validateText(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      if (this.isMessageText) {
        return null
      }
      return { 'existContent': true }
    }
  }
  AcceptfileFormat: any = ['.jpeg', '.png', '.jpg',];

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


      if (_.indexOf(this.AcceptfileFormat, fileFormat.toLowerCase()) === -1) {
        this.common.showErrorMessage('Invalid File attchment');

        return;
      }
      else {
        const file = $event.target.files[0];
        // file.name="sam";
        this.common.convertBase64(file, (result) => {
          this.compaignObj.attachmentFile = result;
          this.compaignObj.attach = file.name;

          this.compaignObj.attachmentFileName = file.name;

        })


      }

    }
  }
  back() {
    this.router.navigate(['../home/dashboard/']);
  }
}
