import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import * as moment from 'moment';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
import MyCustomUploadAdapterPlugin from '../.././service-management/test.js';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';
import insertTextAtCursor from 'insert-text-at-cursor';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-add-promotional-marketing',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-promotional-marketing.component.html',
  styleUrls: ["/node_modules/simple-keyboard/build/css/index.css",'./add-promotional-marketing.component.css']
})
export class AddPromotionalMarketingComponent implements OnInit, OnDestroy {

  role: any;
  user: any;
  PromotionForm: FormGroup;
  PromotionFormOld: any = {};
  PromotionFormNew: any = {};
  promObj: any = {
    channel: [],
    date: [],
    serviceIds: []
  }

  isApprove: boolean;
  errReasonMsg: boolean;
  listSenderId: any;
  listOperatorId: any;
  listLanguage: any = []
  listChannelId: any;
  listPriorityId: any;
  listCategoryId: any;
  listServices: any;
  channelId: any;
  Edit: boolean = false;
  ActiveForm: FormGroup;

  value: Date;
  edit: any;
  getEditPromoDetails: any;
  getEditServiceDetails: any;
  isMainChecker: any;
  temp: any = {};
  listZones: any;
  minDate: any;
  new_date: any;
  too_date: any;
  serviceId = new FormControl();
  languageForm: FormGroup;
  selectedLanguages: any = []
  isNew: boolean = true;
  defaultTrue: boolean = false
  defaultObj: any = {

  }
  opStatus: boolean;
  disableChannel: boolean;

  //for virtual keyboard variables
  Value = "";
  keyboard: Keyboard;
  keyboardLayouts: any;
  layouts: Array<object>;
  layoutsObj: object;
  selectedLayout: string = "english";
  public Editor = ClassicEditor;
  config = { extraPlugins: [MyCustomUploadAdapterPlugin] }
  virtualKey:boolean = true

  showSearchButton: boolean;
  speechData: string;  
  constructor(private speechRecognitionService: SpeechRecognitionServiceService, private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location) {


      
      this.showSearchButton = true;
      this.speechData = "";

    this.minDate = moment().subtract('1', 'days').toDate();

    this.user = this.common.getUser();
    this.role = this.common.getRole();
    this.isMainChecker = this.common.getMainMenu().isMainChecker;


    //ListServices


    // for virtual key board
    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));

    //   Get Zones
    // this.common.showLoading();
    // this.apiService.post(this.constantsService.getTimeZones, {}).subscribe((succ: any) => {
    //   this.listZones = succ.data;

    // });


    this.apiService.post(this.constantsService.getActiveLanguages, {}).subscribe((succ: any) => {

      this.listLanguage = succ.data;
      if (this.isNew) {

      }

      // this.listZones = succ.data;




      this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
        this.common.hideLoading();
        this.listChannelId = succ.data.channel;
        this.listChannelId.forEach((o, i) => {
          const control = new FormControl(); // if first item set to true, else false
          (this.PromotionForm.controls.channelId as FormArray).push(control);
        });




        this.edit = this.common.getEditPromotion()
        if (_.isEmpty(this.edit)) {

          this.temp.status = "new";
          this.isNew = true;
          this.listLanguage.forEach((o, i) => {


            const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
            (this.languageForm.controls.language as FormArray).push(control);
            if (o.isDefault == 1) {
              // control.disable();
              o.check = true;

              if (this.isNew) {
                this.addNewLanguage(o);
                this.selectedLanguages.push(o);
              }

            }
          });
        } else {
          this.isNew = false;

          if (this.edit.status == 1) {
            this.temp.status = 'draft';
            this.getNonApproveData();
          }
          if (this.edit.status == 2) {
            this.temp.status = 'edit';

            // this.PromotionForm.controls['serviceId'].disable();
            // this.PromotionForm.controls['channelId'].disable();
            this.PromotionForm.controls['selectedLanguage'].disable();

            this.getApprovedData();
            (<FormArray>this.PromotionForm.get('channelId'))
              .controls
              .forEach(control => {
                // control.disable();
              })
          }
          if (this.edit.status == 3) {
            this.virtualKey = false
            this.PromotionForm.disable();
            this.languageForm.disable();
            this.disableChannelInputs();
            this.temp.status = 'approveOrReject';
            this.getNonApproveData();
          }
          if (this.edit.status == 4) {
            this.PromotionForm.disable();
            this.languageForm.disable();
            this.disableChannelInputs();

            this.temp.status = 'reject';
            this.getNonApproveData();
          }
          if (this.edit.status == 5) {
            // this.ServiceForm.disable();
            this.temp.status = 'reopen';
            this.getNonApproveData();
          }
        }
      }, err => {

      })
    });
  }




  getLangid2:any
  focusBody(data, index){
    if (this.selectedLanguages[index])
    this.getLangid2 = this.selectedLanguages[index].langId
    console.log(this.getLangid2, "this.getLangid2this.getLangid2")
  
  }



  
kealuVoice(i, getLangid){
  var msg = new SpeechSynthesisUtterance();
        var langId = getLangid.toLowerCase();

  msg.volume = 1; // From 0 to 1
  msg.rate = 1; // From 0.1 to 10
  msg.pitch = 2; // From 0 to 2
  msg.lang = langId;


    var textIDPOs = "text+" + i
    // var el: any = document.getElementById(textIDPOs).value;
    var el = (<HTMLInputElement>document.getElementById(textIDPOs)).value;

    msg.text = el
    window.speechSynthesis.speak(msg);
    // window.speechSynthesis.cancel();


        // window.speechSynthesis.cancel();

  // msg.text = "Good Morning";
  // window.speechSynthesis.speak(msg);
  }
  stopVoice(i, getLangid){
    console.log("--Stop Listening--");
    window.speechSynthesis.cancel();
  
  }


  stopSpeech(i,getLangid) {
  
  this.showSearchButton = true;
  console.log("--Stop--");
  this.speechRecognitionService.DestroySpeechObject();
  
}


activateSpeechSearchMovie(i, getLangid2) {
  console.log(getLangid2, "langId")

  this.showSearchButton = false;
    var langId = getLangid2.toLowerCase();
 

    this.speechRecognitionService.record(langId)
      .subscribe(
      //listener
      (value) => {
       
        
        var textIDPOs = "text+" + i
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
              this.activateSpeechSearchMovie(i,langId);
          }
      },
      //completion
      () => {
          this.showSearchButton = true;
          console.log("--completeed speech--");
          // this.activateSpeechSearchMovie(i);
      });


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
  // virtual keyboard functions starting
  getindex;
  AddKeyborad(index,value) {
   
if(this.virtualKey != false){
    this.getindex = index
    this.keyboard.setOptions({
      layout: this.layoutsObj[this.selectedLanguages[index].nativeDesc.toLowerCase()]
    });
    this.keyboard.setInput(value);
    $('.virtualkeyboard').click(function() {
     
      if ($(this).hasClass('active')) {  
          $(this).removeClass('active');
          $('.site-content').css({'margin-bottom':'0px'});
          $('.simple-keyboard').removeClass('active');
          this.keyboard.clearInput();
          
    }
    else{
          $('.simple-keyboard').addClass('active');
          $('.site-content').css({'margin-bottom':'200px'});
          $('.virtualkeyboard').removeClass('active');
          $(this).addClass('active');
          $(this).next().filter('.simple-keyboard').removeClass('active');
          this.keyboard.clearInput();
        
        }
        
      });
    }
  }
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange1(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: this.layoutsObj[this.selectedLayout],
    });


  }
  
  onChange1 = (input: any) => {
    let sel: any = this.PromotionForm.controls.selectedLanguage;
    let obj = sel.controls[this.getindex].value;
    obj.lang = input
    sel.controls[this.getindex].setValue(obj);
  };

  onKeyPress = (button: string) => {

    //if (button === "{shift}" || button === "{lock}") this.handleShift();
  };



  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  // virtual keyboard functions ending
  ngOnInit() {
    
    $(".simple-keyboard").css("position" ,"" );
    this.languageForm = this.formBuilder.group({
      language: new FormArray([]),
    });



    this.ActiveForm = this.formBuilder.group({
      opStatus: [''],
      reasons: ['']
    })

    myMethod();
    selectSearchMethod();
    setTimeout(() => {
      $('[rel=tooltip]').tooltip({
        trigger: 'hover'
      });
    }, 3000);
    this.PromotionForm = this.formBuilder.group({
      channelId: new FormArray([], this.minSelectedCheckboxes(1)),
      selectedLanguage: this.formBuilder.array([]),
      name: ['', Validators.required],
      // serviceId: ['', Validators.required],
      date: ['', Validators.required],
      // toDate: ['', Validators.required],
      // languageId: ['', Validators.required],

      maxCustPerDay: ['', Validators.compose([Validators.required, Validators.min(-1)])],
      maxCustPromo: ['', Validators.compose([Validators.required, Validators.min(-1)])],
      maxPromoPerDay: ['', Validators.compose([Validators.required, Validators.min(-1)])],
      maxForPromo: ['', Validators.compose([Validators.required, Validators.min(-1)])],

      // noOfMesgPerCampaign: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      // messageTextEn: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      // messageTextAr: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      reason: [''],
      // getZones: ['', Validators.compose([Validators.required])]
    });
    this.PromotionForm.patchValue(this.PromotionForm)


    $(".languagelist").mCustomScrollbar({
      axis: "y",
      theme: "dark",
      scrollbarPosition: "inside",
      advanced: {
        updateOnContentResize: true
      }
    });

    $('.vkey').keyboard({
      openOn: null,
      stayOpen: true,
      layout: 'qwerty'
    });
    $('.virtualkeyboard').click(function () {
      var kb = $('.vkey').getkeyboard();
      if (kb.isOpen) {
        kb.close();
      } else {
        kb.reveal();
      }
    });
    $('.icon-checkout-previous').click(function () {
      $(this).find('.popup-previous').toggleClass('show');
    });
    // $('.promodaterange').daterangepicker();

  }
  disableChannelInputs() {
    this.disableChannel = true;
  }


  CloseModalActive() {
    $("#activeModal").modal('hide');
    this.ActiveForm.get('reasons').clearValidators();
    this.ActiveForm.get('reasons').updateValueAndValidity();

  }

  cancelActive() {
    $("#activeModal").modal('hide')
  }
  
  public onReady(editor) {
    

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  public checkParamsCK( { editor }: ChangeEvent ) {
    const data = editor.getData();

    
}


  statusSubmit() {

    if (this.ActiveForm.invalid) {
      this.ActiveForm.markAllAsTouched();
      return;
    }
    else {
      this.common.showLoading();

      if (this.defaultObj.opStatus == true) {
        this.defaultObj.opStatus = "Active"

      }
      if (this.defaultObj.opStatus == false) {
        this.defaultObj.opStatus = "Inactive"

      }

      this.defaultObj.reason = this.defaultObj.reasons
      this.defaultObj.selectedGroups = this.defaultObj.groups


      this.apiService.post(this.constantsService.editOperator, this.defaultObj).subscribe((succ: any) => {

        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          $("#activeModal").modal('hide')
          // this.router.navigateByUrl('/home/operator-management')

        }
        else {
          this.common.showErrorMessage(succ.message)
        }
      });
      return;
    }
  }



  getApprovedData() {
    this.common.showLoading();

    this.apiService.post(this.constantsService.listforEditPromo, this.edit).subscribe((succ: any) => {
      this.common.hideLoading();

      this.getEditPromoDetails = succ;


      this.promObj = succ.data;
      // this.promObj.serviceIds = succ.data.serviceId;

      //FromDate
      // var comingDate = succ.data.fromdate

      // // this.promObj.fromdate  = new Date(fromdate)
      // var startdateTime: any = moment(comingDate, 'dd-mm-yyyy hh:mm').format();
      // this.promObj.fromdate = startdateTime


      // //toDate
      // var comingDatee = succ.data.toDate

      // // this.promObj.toDate  = new Date(toDate)
      // var enddateTimee: any = moment(comingDatee, 'dd-mm-yyyy hh:mm').format();
      // this.promObj.toDate = enddateTimee


      this.new_date = moment(succ.data.fromDatee, "YYYY-MM-DD")

      this.promObj.fromdate = new Date(this.new_date)



      this.too_date = moment(succ.data.toDatee, "YYYY-MM-DD")

      this.promObj.toDate = new Date(this.too_date)

      this.promObj.date = []
      this.promObj.date.push(this.promObj.fromdate)
      this.promObj.date.push(this.promObj.toDate)

      let message = JSON.parse(this.getEditPromoDetails.data.messageTextEn)
      // let message = JSON.parse("[{\"TA\":\"tamil\"},{\"EN\":\"engli\"}]")




      // channel selection
      let ch = JSON.parse(this.promObj.channelId)
      this.promObj.channel = [];
      setTimeout(() => {
        for (let i = 0; i < this.listChannelId.length; i++) {
          for (let j = 0; j < ch.length; j++) {
            if (ch[j] == this.listChannelId[i].channelId)
              // this.onChangeService(this.listChannelId[i])
              this.listChannelId[i].isChecked = true;
          }
        }
        this.promObj.channel = ch;
        // this.getServices();


        // services
        setTimeout(() => {
          // var incomeValues = succ.data.serviceId
          // var removeSpaces = incomeValues.trim();

          // let arrayOfValues = removeSpaces;
          // let sid = this.listServices.filter(a =>
          // // arrayOfValues.includes(a.notiId)
          // {
          //   return a.notiId == arrayOfValues;
          // }
          // )

          // this.promObj.serviceIds = this.listServices.filter(element => {
          //   // element.notiId = '9876'

          //   return this.promObj.serviceIds == element.notiId;
          // });

          // let service = this.promObj.serviceId.split(',');
          // this.promObj.serviceIds = [];
          // for (var i = 0; i < service.length; i++) {
          //   for (let j = 0; j < this.listServices.length; j++) {
          //     var removeSpaces = service[i].trim();
          //     if (removeSpaces == this.listServices[j].notiId)
          //       this.promObj.serviceIds.push(this.listServices[j])
          //   }
          // }

          // this.promObj.serviceIds = service;


          this.listLanguage.forEach((o, i) => {


            const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
            (this.languageForm.controls.language as FormArray).push(control);
            if (o.isDefault == 1) {
              // control.disable();
              o.check = true;

              // this.addActiveLanguage();
            }
            for (let i = 0; i < message.length; i++) {
              for (var key in message[i]) {
                if (message[i].hasOwnProperty(key)) {
                  // alert(key); // 'a'
                  // alert(message[i][key]); // 'hello'
                  if (key == o.langId) {
                    o.check = true;
                    this.selectedLanguages.push(o);
                    o.message = message[i][key];

                    this.addNewLanguage(o);
                  }
                }
              }
            }
          });
          setTimeout(() => {
            this.addActiveLanguage("dontPush");

          }, 2000);

        }, 3000);



      }, 4000);




    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)


    })
  }


  getNonApproveData() {

    this.apiService.post(this.constantsService.getApproveData, this.edit).subscribe((succ: any) => {



      if (succ.code == 200) {
        let newValue = JSON.parse(succ.data.new_DTLS);

        this.promObj = newValue
        this.promObj.wfId = succ.data.wf_ID
        this.promObj.serviceId = newValue.serviceId;


        this.new_date = moment(newValue.fromdate, "YYYY-MM-DD");

        this.promObj.fromdate = new Date(this.new_date)



        this.too_date = moment(newValue.toDate, "YYYY-MM-DD");

        this.promObj.toDate = new Date(this.too_date)

        this.promObj.date = []
        this.promObj.date.push(this.promObj.fromdate)
        this.promObj.date.push(this.promObj.toDate)

        let message = JSON.parse(newValue.messageTextEn)
        // let message = JSON.parse("[{\"TA\":\"tamil\"},{\"EN\":\"engli\"}]")




        // channel selection
        let ch = JSON.parse(this.promObj.channelId)
        this.promObj.channel = [];
        setTimeout(() => {
          for (let i = 0; i < this.listChannelId.length; i++) {
            for (let j = 0; j < ch.length; j++) {
              if (ch[j] == this.listChannelId[i].channelId)
                // this.onChangeService(this.listChannelId[i])
                this.listChannelId[i].isChecked = true;
            }
          }
          this.promObj.channel = ch;
          // this.getServices();


          // services
          setTimeout(() => {
            // var incomeValues = newValue.serviceId
            // var removeSpaces = incomeValues.trim();

            // let arrayOfValues = JSON.parse(newValue.serviceId);
            // let sid = this.listServices.filter(a =>
            // // arrayOfValues.includes(a.notiId)
            // {
            //   return a.notiId == arrayOfValues;
            // }
            // )

            // this.promObj.serviceIds = this.listServices.filter(element => {


            //   // element.notiId = '9876'

            //   return this.promObj.serviceIds == element.notiId;
            // });

            // let service
            // if (this.temp.status == 'reject')
            //   service = this.promObj.serviceId.split(',');
            // else
            //   service = JSON.parse(this.promObj.serviceId)
            // this.promObj.serviceIds = [];
            // for (var i = 0; i < service.length; i++) {
            //   for (let j = 0; j < this.listServices.length; j++) {
            //     var removeSpaces = service[i]
            //     if (this.temp.status == 'reject')
            //       removeSpaces = service[i].trim();
            //     if (removeSpaces == this.listServices[j].notiId)
            //       this.promObj.serviceIds.push(this.listServices[j])
            //   }
            // }


            this.listLanguage.forEach((o, k) => {


              const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
              (this.languageForm.controls.language as FormArray).push(control);
              // if (o.isDefault == 1) {
              // control.disable();
              // o.check = true;

              // this.addActiveLanguage();
              // }
              for (let i = 0; i < message.length; i++) {
                for (var key in message[i]) {
                  if (message[i].hasOwnProperty(key)) {
                    // alert(key); // 'a'
                    // alert(message[i][key]); // 'hello'
                    if (key == o.langId) {
                      o.check = true;
                      this.selectedLanguages.push(o);
                      o.message = message[i][key];
                      this.addNewLanguage(o);
                    }
                  }
                }
              }
            });


          }, 2000);

        }, 4000);
      } else {
        this.common.showErrorMessage(succ.message);
      }

      // this.getOperatorDetails = succ.data;
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)


    })
  }

  onchangeChannel($event) {

  }
  desc:boolean = true;
  desc1:boolean = false;
  desc2:boolean = false;
  getChannel:any;
  onChangeService(channel,ind) {
    this.getChannel = channel
   console.log(ind, "ind")
    if (!channel.isChecked){
      
        if(this.listChannelId[0].isChecked == false && this.listChannelId[1].isChecked == false && 
          this.listChannelId[2].isChecked == false
           || this.listChannelId[0].isChecked == false && this.listChannelId[1].isChecked == false
          || this.listChannelId[1].isChecked == false && this.listChannelId[2].isChecked == false  
          )
          {
          this.desc2 = true
          this.desc = false
          this.desc1 = false
          }
      
    else if(channel.channelDesc == "Email"){
      
      this.desc1 = true
      this.desc2 = false
    }
    else if (this.listChannelId[0].isChecked == false && this.listChannelId[2].isChecked == false 
      && this.listChannelId[1].isChecked == true || this.listChannelId[0].isChecked =="undefined" && 
      this.listChannelId[2].isChecked == "undefined" && this.listChannelId[1].isChecked == true ||
      this.listChannelId[0].isChecked ==undefined &&
      this.listChannelId[2].isChecked == undefined && this.listChannelId[1].isChecked == true || 
      this.listChannelId[0].isChecked == false && 
      this.listChannelId[2].isChecked == undefined && this.listChannelId[1].isChecked == true || 
      this.listChannelId[0].isChecked == "undefined" && 
      this.listChannelId[2].isChecked == false && this.listChannelId[1].isChecked == true ||
      this.listChannelId[0].isChecked == undefined && 
      this.listChannelId[2].isChecked == false && this.listChannelId[1].isChecked == true
       ){
        this.desc1 = true
        this.desc = false
        this.desc2 = false
    }
    
      channel.isChecked = false;
  }
    else{
      channel.isChecked = true;
       if(this.listChannelId[0].isChecked == true && this.listChannelId[1].isChecked == true && 
          this.listChannelId[2].isChecked == true
           || this.listChannelId[0].isChecked == true && this.listChannelId[1].isChecked == true
          || this.listChannelId[0].isChecked == true && this.listChannelId[2].isChecked == true || 
          this.listChannelId[1].isChecked == true && this.listChannelId[2].isChecked == true
           )
          {
          this.desc2 = true
          this.desc = false
          this.desc1 = false
          }
        else  if(channel.channelDesc == "Email"){
            this.desc1 = true
            this.desc = false
            this.desc2 = false
          }
          
      else{
        this.desc1 = false
        this.desc = true
        this.desc2 = false
      }
    }


    if (channel.isChecked) {
      this.promObj.channel.push(channel.channelId)
    } else {
      for (let i = 0; i < this.promObj.channel.length; i++) {
        if (this.promObj.channel[i] == channel.channel) {
          this.promObj.channel.splice(i, 1);
        }
      }
    }
    this.promObj.channelId = JSON.stringify(this.promObj.channel);
    // this.getServices();
    // var lets = { "notiId": chekd }
    // this.apiService.post(this.constantsService.listforEdit, lets).subscribe((succ: any) => {
    //   const channelId = succ.data.channelId

    //   this.promObj.channelId = channelId;
    // },
    //   (err) => {

    //   })
  }
  // getServices() {
  //   this.common.showLoading();
  //   this.apiService.post(this.constantsService.getServiceListByChannel, { channelId: this.promObj.channel }).subscribe((succ: any) => {
  //     this.common.hideLoading();

  //     this.listServices = succ.data;

  //   }, err => {
  //     this.common.hideLoading();


  //   })
  // }
  back() {
    this.location.back();
    // this.router.navigate(['../home/service-management/default-services']);
  }



  Submit() {


    if (this.PromotionForm.invalid) {
      this.PromotionForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      if (this.PromotionForm.value.selectedLanguage == 0) {
        this.common.showErrorMessage("Message is must");
        return;
      }

      let messageTextEn = [];
      this.selectedLanguages.forEach((item, i) => {
        let formControl = this.PromotionForm.get("selectedLanguage").value



        let obj: any = {}
        obj[item.langId] = formControl[i].lang
        messageTextEn.push(obj)


      });


      this.promObj.messageTextEn = JSON.stringify(messageTextEn);

      // form Date

      // var getZones = this.promObj.getZones
      // var getTimes = this.promObj.fromdate
      // var getTimesFinal = getTimes.toString();


      // var datiDup = new Date(consolew + getZones);
      // var BefConfr = datiDup.toString()
      // var finalDate = BefConfr.substr(0, 25)

      // this.promObj.fromdate = new Date(finalDate);


      // to Date

      // var getZones = this.promObj.getZones
      // var getTimes = this.promObj.toDate
      // var getTimesFinal = getTimes.toString();


      // var datiDup = new Date(consolew + getZones);
      // var BefConfr = datiDup.toString()
      // var finalDate = BefConfr.substr(0, 25)

      // this.promObj.toDate = new Date(finalDate);


      this.common.showLoading()
      this.promObj.fromdate = this.common.scheduledTimeFormat(this.promObj.date[0]);

      this.promObj.toDate = this.common.scheduledTimeFormat(this.promObj.date[1]);

      this.promObj.isMainChecker = this.isMainChecker;
      this.promObj.createdTime = "";


      // var emptyId = []
      // for (let z = 0; z < this.promObj.serviceIds.length; z++) {
      //   var pushNotId = this.promObj.serviceIds[z].notiId
      //   emptyId.push(pushNotId)
      // }
      // this.promObj.serviceIds = emptyId
      this.promObj.messageText = this.promObj.messageTextEn


      this.apiService.post(this.constantsService.addPromotions, this.promObj).subscribe((succ: any) => {

        // this.promObj.serviceIds = [];
        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/promotional-marketing']);
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
  }

  Update() {

    if (this.PromotionForm.invalid) {
      this.PromotionForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      if (_.isEmpty(this.PromotionFormNew)) {
        this.PromotionFormNew = this.PromotionFormOld
      }
      else {
        this.PromotionFormNew = this.PromotionFormNew
      }
      if (_.isEqual(this.PromotionFormOld, this.PromotionFormNew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      }
      else {
        if (this.selectedLanguages.length == 0) {
          this.common.showErrorMessage("Message is must");
          return;
        }
        let messageTextEn = [];
        this.selectedLanguages.forEach((item, i) => {
          let formControl = this.PromotionForm.get("selectedLanguage").value

          let obj: any = {}
          obj[item.langId] = formControl[i].lang
          messageTextEn.push(obj)


        });


        this.promObj.messageTextEn = JSON.stringify(messageTextEn);


        this.common.showLoading()
        this.promObj.fromdate = this.common.scheduledTimeFormat(this.promObj.date[0]);

        this.promObj.toDate = this.common.scheduledTimeFormat(this.promObj.date[1]);

        this.promObj.isMainChecker = this.isMainChecker;




        // var emptyId = []
        // for (let z = 0; z < this.promObj.serviceIds.length; z++) {
        //   var pushNotId = this.promObj.serviceIds[z].notiId
        //   emptyId.push(pushNotId)
        // }
        // this.promObj.serviceIds = emptyId


        this.apiService.post(this.constantsService.updatePromotion, this.promObj).subscribe((succ: any) => {

          // this.promObj.serviceIds = [];

          this.common.hideLoading()
          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.router.navigate(['../home/promotional-marketing']);
          }
          else {
            this.common.showErrorMessage(succ.message)
          }
        },
          err => {
            this.common.hideLoading()
          });
      }
    }
  }
  approve(data) {
    let url = ""
    // if (data != 'approve') {
    //   if (!this.promObj.reason) {
    //     this.common.showErrorMessage("Reason is Must for Reject");
    //     this.errReasonMsg = true;
    //     return;
    //   }
    //   this.errReasonMsg = false;
    //   url = this.constantsService.rejectPromotion

    // } else {
    //   url = this.constantsService.approvePromotions
    // }

    if (data == 'reject') {
      if (!this.promObj.reason) {
        this.common.showErrorMessage("Reason is Must for Reject");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.rejectPromotion
    } else if (data == 'approve') {
      url = this.constantsService.approvePromotions
    }
    if (data == 'reopen') {
      if (!this.promObj.reason) {
        this.common.showErrorMessage("Reason is Must for Reopen");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.reopenPromotions
    }


    this.common.showLoading()
    this.apiService.post(url, { wfId: this.promObj.wfId, reason: this.promObj.reason }).subscribe((succ: any) => {

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
    var reqId = {};
    this.common.setEditPromotion(reqId)
  }

  Draft() {
    if (this.PromotionForm.invalid) {
      this.PromotionForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      if (_.isEmpty(this.edit)) {
        this.promObj.statusFilter = 1
      } else {
        this.promObj.statusFilter = this.edit.status;
      }
      if (this.selectedLanguages.length == 0) {
        this.common.showErrorMessage("Message is must");
        return;
      }

      let messageTextEn = [];
      this.selectedLanguages.forEach((item, i) => {
        let formControl = this.PromotionForm.get("selectedLanguage").value

        let obj: any = {}
        obj[item.langId] = formControl[i].lang
        messageTextEn.push(obj)


      });


      this.promObj.messageTextEn = JSON.stringify(messageTextEn);

      // form Date

      // var getZones = this.promObj.getZones
      // var getTimes = this.promObj.fromdate
      // var getTimesFinal = getTimes.toString();
      // var consolew = getTimesFinal.substr(0, 25)


      // var datiDup = new Date(consolew + getZones);
      // var BefConfr = datiDup.toString()
      // var finalDate = BefConfr.substr(0, 25)

      // this.promObj.fromdate = new Date(finalDate);



      // to Date

      // var getZones = this.promObj.getZones
      // var getTimes = this.promObj.toDate
      // var getTimesFinal = getTimes.toString();
      // var consolew = getTimesFinal.substr(0, 25)


      // var datiDup = new Date(consolew + getZones);
      // var BefConfr = datiDup.toString()
      // var finalDate = BefConfr.substr(0, 25)

      // this.promObj.toDate = new Date(finalDate);



      // this.common.showLoading()
      this.promObj.fromdate = this.common.scheduledTimeFormat(this.promObj.date[0]);

      this.promObj.toDate = this.common.scheduledTimeFormat(this.promObj.date[1]);

      this.promObj.isMainChecker = this.isMainChecker;
      this.promObj.createdTime = "";


      // var emptyId = []
      // for (let z = 0; z < this.promObj.serviceIds.length; z++) {
      //   var pushNotId = this.promObj.serviceIds[z].notiId
      //   emptyId.push(pushNotId)
      // }
      // this.promObj.serviceIds = emptyId
      this.promObj.messageText = this.promObj.messageTextEn


      this.common.showLoading()
      this.apiService.post(this.constantsService.savePromotionsDrafts, this.promObj).subscribe((succ: any) => {

        // this.promObj.serviceIds = [];
        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/promotional-marketing']);
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

  }

  onChangeClear($event) {
    this.PromotionForm.get('fromdate').reset()
    this.PromotionForm.get('toDate').reset()
    this.PromotionForm.get('languageId').reset()
    this.PromotionForm.get('maxCustPerDay').reset()
    this.PromotionForm.get('maxCustPromo').reset()
    this.PromotionForm.get('maxPromoPerDay').reset()
    this.PromotionForm.get('maxForPromo').reset()
    this.PromotionForm.get('messageTextEn').reset()

  }
  getSelectedLanguages() {
    return this.listLanguage.filter((item) => item.selected == true);

  }
  getUnSelectedLanguages() {
    return this.listLanguage.filter((item) => !item.selected);

  }
  languageSelect(event, index) {


    if (!this.listLanguage[index].check)
      this.listLanguage[index].check = false;
    if (this.listLanguage[index].check)
      this.listLanguage[index].check = true;


  }
  getLangForm(index) {
    return this.PromotionForm['controls'].selectedLanguage['controls'][index] as FormArray;
  }
  langIndex = 0;
  addNewLanguage(item) {
    let fg = this.formBuilder.group({
      'lang': [item.message, Validators.required],
      id: [item.id]
    });

    (<FormArray>this.PromotionForm.get('selectedLanguage')).push(fg);


  }

  addActiveLanguage(dPush?) {
    $('.simple-keyboard').removeClass('active');

    let item = this.listLanguage.filter((item, i) => {

      let selected = this.languageForm.get("language").value;
      if (selected[i]) {
        item.message = item.message
        return item;
      }


    });


    this.selectedLanguages = item;
    this.PromotionForm.removeControl('selectedLanguage');
    this.PromotionForm.addControl('selectedLanguage', new FormArray([]));

    this.listLanguage.forEach((o, i) => {

      if (o.check) {
        this.addNewLanguage(o);


      } else {

      }




    });



    setTimeout(() => {
      this.PromotionFormOld = this.PromotionForm.value

      this.PromotionForm.valueChanges.subscribe(value => {


        this.PromotionFormNew = value
      });
    }, 3000)


    $("#sidemodal").modal("hide");
  }
  langValue: any = []
  addLanguageFormControl(lang) {

    for (var key in lang) {
      if (lang.hasOwnProperty(key)) {
        this.langValue.push({ lang: lang[key] })
        let fg = this.formBuilder.group({
          'lang': ["asdlfkjasl;kfdjl", Validators.required],
        });
        (this.PromotionForm.get('selectedLanguage') as FormArray).push(fg);
      }
    }
    setTimeout(() => {
      // alert(this.langValue)


      this.PromotionForm.get('selectedLanguage').setValue(this.langValue)

    }, 3000);
    // this.PromotionForm.controls.selectedLanguage.setValue
  }
  getLanguagedescription(index) {

    if (this.selectedLanguages[index])
      return this.selectedLanguages[index].nativeDesc
  }
  getLanguageMasterDesctiption(index) {
    return this.listLanguage[index].nativeDesc

  }
  checkChanges(text, modelName) {

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
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  changeMessageField(event, pattern, min, limitTo, id, length, index) {
    var k;
    k = event.keyCode;  //         k = event.keyCode;  (Both can be used)
    if(this.desc2 == true || this.desc == true) {
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
    this.listLanguage[index].message = event.target.value;
  }
  else if(this.desc1 == true){
    this.listLanguage[index].message = event.target.innerText;
  }
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
  Moveto(){
    this.router.navigate(['../home/group-management/languageMaster'])
  }
  isEditOrUpdate() {
    let ret = false;
    if (this.temp.status == 'approveOrReject') {
      if (this.getAccessRole('isChecker')) {
        ret = true;
        this.virtualKey = false
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
