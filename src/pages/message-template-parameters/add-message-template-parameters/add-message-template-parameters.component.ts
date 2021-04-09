import { Component, OnInit, OnDestroy, ElementRef,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';

import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../test.js';
import * as _ from 'lodash';
import * as moment from 'moment';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import insertTextAtCursor from 'insert-text-at-cursor';

@Component({
  selector: 'app-add-message-template-parameters',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-message-template-parameters.component.html',
  styleUrls: [ "/node_modules/simple-keyboard/build/css/index.css",'./add-message-template-parameters.component.css']
})
export class AddMessageTemplateParametersComponent implements OnInit {

  TemplateForm: FormGroup;
  templateObj: any = {

  }
  isActiveForm: FormGroup
  user: any = {};
  listMessageTemplates: any;
  Edit: boolean = false;
  defaultObj: any = {}
  edit: any;
  editChannels: any;
  getEditMessageDetails: any;
  role: any;
  maxIncidentDescriptionLength: number = 500;
  isApprove: boolean;
  errReasonMsg: boolean;
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1

  }
  listTemplate: any = [];
  isMainChecker: any;
  temp: any = {};
  languageForm: FormGroup;
  isNew: boolean = true;
  listLanguage: any = []
  selectedLanguages: any = []
  listServ: any;
  showType: boolean = true
  listChannelId: any = [];
  public Editor = ClassicEditor;
  config = { extraPlugins: [MyCustomUploadAdapterPlugin] }
  showCk: boolean;
  showSMSText: boolean;
  showPush: boolean;
  selectedChannel: any = {

  };
  showHeader: boolean;
  showMain: boolean = true
  previewText: any = [];
  listChannels: any = [];
  idPush: any[];
  ohj: any = {

  };
  defaultTrue: boolean = true
  listTemplateParameters: any = [];
  showSuccessandFailure: any = [];
  dataArr: any = []
  textFieldData: boolean;
  delimiterData: boolean;
  xml: boolean;
  jsonData: boolean;
  statusHideInAdd: boolean
  lowerParamaters: boolean;
  active: boolean = true;
  TemplateFormOld: any = {

  };
  TemplateFormNew: any = {};
  isActiveFormNew: any ={};
  isActiveFormOld: any = {};

  //for virtual keyboard variables
  value = "";
  keyboard: Keyboard;
  keyboardLayouts: any;
  layouts: Array<object>;
  layoutsObj: object;
  selectedLayout: string = "english";
  Showtextarea:boolean = false;
  Showtextarea1:boolean = false;


  showSearchButton: boolean;
  speechData: string;
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, private speechRecognitionService: SpeechRecognitionServiceService) {
   
      this.showSearchButton = true;
        this.speechData = "";
   
   
   
   
   
   
   
   
   
      console.log("template parameter");
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.common.showLoading();

    //PsuhMAtrer
    this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
      this.listChannels = succ.data.channel;
    }, err => {
      
    })

    // for virtual key board
    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));

    //GetActiveLanguages
    this.apiService.post(this.constantsService.getActiveLanguages, {}).subscribe((succ: any) => {

      this.listLanguage = succ.data;
      this.common.hideLoading();
      if (this.isNew) {
        this.listLanguage.forEach((o, i) => {

          const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
          (this.languageForm.controls.language as FormArray).push(control);
          if (o.isDefault == 1) {
            o.check = true;

            if (this.isNew) {
              this.addNewLanguage(o);
              this.selectedLanguages.push(o);
            }

          }
        });
      }
    });


  }

  getCKValue( { editor }: ChangeEvent, i ){
    const data = editor.getData();
            
  }
  public onReady(editor) {

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  getLangid2:any
focusBody(data, index){
if (this.selectedLanguages[index])
this.getLangid2 = this.selectedLanguages[index].langId
console.log(this.getLangid2, "this.getLangid2this.getLangid2")
  // return this.selectedLanguages[index].nativeDesc

}


kealuVoice(i, getLangid){
  var msg = new SpeechSynthesisUtterance();
        var langId = getLangid.toLowerCase();

  msg.volume = 1; // From 0 to 1
  msg.rate = 1; // From 0.1 to 10
  msg.pitch = 2; // From 0 to 2
  msg.lang = langId;


    var textIDPOs = "text" + i
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


ngOnDestroy(i,getLangid) {
  
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
       
        
        var textIDPOs = "text" + i
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
  onChangeService(data?: any) {

  }
  ngOnInit() {
    $('.simple-keyboard').removeClass('active');
    this.showType = false
    this.languageForm = this.formBuilder.group({
      language: new FormArray([]),
    });

    setTimeout(() => {
      $('[rel=tooltip]').tooltip({
        trigger: 'hover'
      });
    }, 3000);

    myMethod();
    selectSearchMethod();

    this.TemplateForm = this.formBuilder.group({
      templateName: ['', Validators.compose([Validators.required])],

      selectedLanguage: this.formBuilder.array([]),


      selectedChannel: [''],
      selectedChannelId: [''],
      attachmentFileName: [],
      attachmentFile: []

    });
    this.TemplateForm.patchValue(this.TemplateForm)

    this.isActiveForm = this.formBuilder.group({
      isActive: [''],
      reasons: [''],

    })
    this.isActiveForm.patchValue(this.isActiveForm) 

    this.edit = this.common.getEditMessageTemplate()
    if (_.isEmpty(this.edit)) {
      this.temp.status = "new";
      this.statusHideInAdd = false
      this.isNew = true;
      this.TemplateForm.controls['selectedChannel'].disable();
    } else {
      this.isNew = false;

      if (this.edit.statusValue == 1) {
        this.temp.status = 'draft';
        this.statusHideInAdd = false
        if(this.edit.channelId ==3 )
        this.Showtextarea = true;
        else
        this.Showtextarea = false;
        this.isActiveForm.disable()
        this.TemplateForm.controls['selectedChannel'].disable();
        this.getNonApproveData();
      }
      if (this.edit.statusValue == 2) {
        this.temp.status = 'edit';
        this.statusHideInAdd = true
        if(this.edit.channelId ==3 )
        this.Showtextarea = true;
        else
        this.Showtextarea = false;
        this.getApprovedData();
        this.TemplateForm.controls['templateName'].disable();
        this.TemplateForm.controls['selectedChannel'].disable();
        this.temp.id = this.edit.id

      }
      if (this.edit.statusValue == 3) {
        this.TemplateForm.disable();
        this.languageForm.disable();
        this.isActiveForm.disable()
        this.statusHideInAdd = true
        this.temp.topButton = "new";
        this.temp.status = 'approveOrReject';
        this.TemplateForm.controls['selectedChannel'].disable();
        this.getNonApproveData();
      }
      if (this.edit.statusValue == 4) {
        this.TemplateForm.disable();
        this.languageForm.disable();
        this.isActiveForm.disable()
        this.statusHideInAdd = true
        this.temp.status = 'reject';
        this.temp.topButton = "new";
        this.TemplateForm.controls['selectedChannel'].disable();
        this.getNonApproveData();
      }
      if (this.edit.statusValue == 5) {
        this.temp.status = 'reopen';
        this.statusHideInAdd = false
        this.TemplateForm.controls['selectedChannel'].disable();
        this.getNonApproveData();
      }
    }

    this.editChannels = this.common.getEditServiceActiveChannels()


    if (_.isEmpty(this.editChannels)) {

      if (this.editChannels.channelId === 1) {
        this.selectedChannel.channelName = this.editChannels.channelDesc
        this.selectedChannel.channelId = this.editChannels
        this.showHeader = true
        
        this.showSMSText = true
        this.lowerParamaters = true
      }
      if (this.editChannels.channelId === 2) {
        this.selectedChannel.channelName = this.editChannels.channelDesc
        this.selectedChannel.channelId = this.editChannels
        this.showHeader = false
        
        this.showCk = true
        this.lowerParamaters = false
      }
      if (this.editChannels.channelId === 3) {
        this.selectedChannel.channelName = this.editChannels.channelDesc
        this.selectedChannel.channelId = this.editChannels
        this.showHeader = false
        this.showSMSText = true
       
        this.showCk = false
        this.lowerParamaters = true
      }
      

    } else {

      this.selectedChannel.channelName = this.editChannels.channelDesc
      this.selectedChannel.channelId = this.editChannels.channelId
      this.TemplateForm.controls.selectedChannel.disable()


      

      this.showHeader = true
      this.showSMSText = true
      if(this.editChannels.channelId === 2){
        this.Showtextarea1 = true;
      }
      else{
        this.Showtextarea1 = false;
      }
      if(this.editChannels.channelId === 3){
        this.Showtextarea = true;
      }
      else{
        this.Showtextarea = false;
      }
    }
  }




  AcceptImageFormat: any = ['.jpeg', '.png', '.jpg',];
  onAttachmentFileChange($event) {
    
    var file: File = $event.target.files[0];
    if (!file) {
      this.templateObj.attachmentFile = "";
      this.templateObj.attachmentFileName = "";
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
        
        this.common.convertBase64(file, (result) => {
          this.templateObj.attachmentFile = result;
          this.templateObj.attachmentFileName = file.name;

        });


      }

    }
  }
  getApprovedData() {
    this.common.showLoading();
    this.apiService.post(this.constantsService.getCampaignTemplateDetails, this.edit).subscribe((succ: any) => {
      this.common.hideLoading();
      this.getEditMessageDetails = succ;

      if (succ.code == 200) {
        this.templateObj = succ.data
        this.templateObj.templateName = succ.data.templateName
        this.selectedChannel.channelId = succ.data.channelId

        var isActive = JSON.parse(succ.data['isActive']);
        this.templateObj.isActive = isActive
        if (isActive == true) {
          this.defaultTrue = true
          this.active = true
        }
        else {
          this.defaultTrue = false
          this.active = false

        }

        let message = JSON.parse(succ.data.msgText)

        // services

        setTimeout(() => {



          const langList = this.listChannels;

          let obj: any = {};
          for (var i = 0; i < langList.length; i++) {


            if (this.selectedChannel.channelId === langList[i].channelId) {

              obj = langList[i].channelDesc
            }
          }

          this.selectedChannel.channelName = obj

          this.TemplateForm.controls.selectedChannelId.setValue(succ.data['channelId']);

          this.listLanguage.forEach((o, i) => {


            const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
            (this.languageForm.controls.language as FormArray).push(control);
            if (o.isDefault == 1) {
              
              o.check = true;

              
            }
            for (let i = 0; i < message.length; i++) {
              for (var key in message[i]) {
                if (message[i].hasOwnProperty(key)) {
                  
                  
                  if (key == o.langId) {
                    o.check = true;
                    o.message = message[i][key];
                    this.selectedLanguages.push(o);
                    
                    this.addNewLanguage(o);
                  }
                }
              }
            }
          });
          setTimeout(() => {
            this.addActiveLanguage("dontPush");
          }, 2000);

          this.TemplateFormOld = this.TemplateForm.value

          this.TemplateForm.valueChanges.subscribe(value => {
            
            
            this.TemplateFormNew = value
          });

          this.isActiveFormOld = this.isActiveForm.value

          this.isActiveForm.valueChanges.subscribe(value => {
            
            
            this.isActiveFormNew = value
          });

        }, 4000);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      
    })
  }

  getNonApproveData() {
    this.common.showLoading();
    this.apiService.post(this.constantsService.getCampaignTxnsData, this.edit).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        let newValue = JSON.parse(succ.data.new_DTLS);

        this.templateObj = newValue
        this.templateObj.wfId = succ.data.wf_ID


        setTimeout(() => {

          this.ohj = {}
          this.ohj["wfId"] = this.templateObj.wfId

          this.templateObj.notiId = newValue['serviceId']

          this.selectedChannel.channelId = newValue['channelId']

          var isActive = JSON.parse(newValue['isActive']);
          this.templateObj.isActive = isActive
          if (isActive == true) {
            this.defaultTrue = true
          }
          else {
            this.defaultTrue = false

          }
          let message = JSON.parse(newValue.msgText)

          // services

          setTimeout(() => {



            const langList = this.listChannels;

            let obj: any = {};
            for (var i = 0; i < langList.length; i++) {


              if (this.selectedChannel.channelId === langList[i].channelId) {

                obj = langList[i].channelDesc
              }
            }

            this.selectedChannel.channelName = obj


            this.listLanguage.forEach((o, i) => {

              const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
              (this.languageForm.controls.language as FormArray).push(control);
              for (let i = 0; i < message.length; i++) {
                for (var key in message[i]) {
                  if (message[i].hasOwnProperty(key)) {
                   
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

          }, 3000);
        }, 5000);

      } else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)
      
    })
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
    this.TemplateForm.removeControl('selectedLanguage');

    this.TemplateForm.addControl('selectedLanguage', new FormArray([]));

    this.listLanguage.forEach((o, i) => {

      if (o.check) {
        this.addNewLanguage(o);


      } else {

      }




    });


    $("#sidemodal").modal("hide");
    
    

    if (this.selectedLanguages.length == 0) {
      this.common.showErrorMessage("Language is must");
      this.common.hideLoading()
      return;
    }
  }

  langIndex = 0;
  addNewLanguage(item) {

    if (this.selectedChannel.channelId === 1) {
      this.showSMSText = true
      this.showCk = false
      this.lowerParamaters = true

    }

    if (this.selectedChannel.channelId === 2) {
      this.showCk = true
      this.showSMSText = false
      this.lowerParamaters = false
    }
    if (this.selectedChannel.channelId === 3) {
      this.showSMSText = true
      this.showCk = false
      this.lowerParamaters = true
    }




    let fg = this.formBuilder.group({
      'lang': [item.message, Validators.required],
      id: [item.id],
      langId:[item.langId]

    });


    (<FormArray>this.TemplateForm.get('selectedLanguage')).push(fg);



  }


  openModal() {
    

    $("#userModal").modal("show")

  }
  closeModal() {
    $("#userModal").modal("hide")

  }

  ActiveUpdate() {
    
    if (this.templateObj.isActive == undefined) {
      this.isActiveForm.get('reasons').setValidators(Validators.required)
      this.isActiveForm.get('reasons').updateValueAndValidity();

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.templateObj.isActive = false
        $("#userModal").modal("hide")

      }
    }

    if (this.templateObj.isActive == true) {
      this.templateObj.isActive = true
      this.isActiveForm.get('reasons').clearValidators();
      this.isActiveForm.get('reasons').updateValueAndValidity();

      $("#userModal").modal("hide")
    }

    if (this.templateObj.isActive == false) {
      this.isActiveForm.get('reasons').setValidators(Validators.required)
      this.isActiveForm.get('reasons').updateValueAndValidity();

    

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.templateObj.isActive = false
        $("#userModal").modal("hide")

      }
    }
  }

  Update() {
    

    if (this.TemplateForm.invalid) {
      this.TemplateForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      if (this.selectedLanguages.length == 0) {
        this.common.showErrorMessage("Language is must");
        this.common.hideLoading()
        return;
      }
      else {
        this.TemplateFormNew = this.TemplateFormNew
      }

      
      

      if (_.isEmpty(this.isActiveFormNew)) {
        this.isActiveFormNew = this.isActiveFormOld
      }
      else {
        this.isActiveFormNew = this.isActiveFormNew
      }

      
      



      if (_.isEqual(this.TemplateFormOld, this.TemplateFormNew) && _.isEqual(this.isActiveFormOld, this.isActiveFormNew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      }

      else {
        if (this.selectedLanguages.length == 0) {
          this.common.showErrorMessage("Message is must");
          return;
        }

        let messageText = [];
        let item = this.selectedLanguages.forEach((item, i) => {
          let obj: any = {}
          let formControl = this.TemplateForm.get("selectedLanguage").value
          obj[item.langId] = formControl[i].lang
          messageText.push(obj)

        });

        this.templateObj.messageTextEn = JSON.stringify(messageText);
        this.templateObj.isMainChecker = this.isMainChecker;


        let finalObj: any = {

          "templateName": this.templateObj.templateName,
          "channelId": this.selectedChannel.channelId,
          "msgText": this.templateObj.messageTextEn,
          "isActive": JSON.stringify(this.templateObj.isActive),
          "id": this.temp.id,
          "isMainChecker": this.templateObj.isMainChecker

        }
        this.common.showLoading()
        this.apiService.post(this.constantsService.updatecampaignTemplates, finalObj).subscribe((succ: any) => {

          this.common.hideLoading()


          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.router.navigate(['../home/message-template-management/']);

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
  }

  Submit() {
   


    if (this.TemplateForm.invalid) {
      this.TemplateForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      this.common.hideLoading();

      return;
    }
    
    if (this.selectedLanguages.length == 0) {
      this.common.showErrorMessage("Language is must");
      this.common.hideLoading()
      return;
    }

    let messageText = [];
    let item = this.selectedLanguages.forEach((item, i) => {
      let obj: any = {}
      let formControl = this.TemplateForm.get("selectedLanguage").value
      obj[item.langId] = formControl[i].lang
      messageText.push(obj)


    });

    this.templateObj.messageTextEn = JSON.stringify(messageText);
    this.templateObj.isMainChecker = this.isMainChecker;
    this.templateObj.isActive = "true";

    let finalObj: any = {

      "templateName": this.templateObj.templateName,
      "channelId": this.selectedChannel.channelId,
      "msgText": this.templateObj.messageTextEn,
      "isActive": this.templateObj.isActive,
      "id": this.temp.id,
      "isMainChecker": this.templateObj.isMainChecker,
      "wfId": this.ohj['wfId'],
      "img":this.templateObj.attachmentFile
    }

    this.common.showLoading();

    this.apiService.post(this.constantsService.addcampaignTemplate, finalObj).subscribe((succ: any) => {

      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/message-template-management/']);
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

  approve(data) {
    let url = ""
    

    if (data == 'reject') {

      if (!this.templateObj.reason) {
        this.common.showErrorMessage("Reason is must for reject");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.rejectCampaignTemplates

    } else if (data == 'approve') {
      url = this.constantsService.approveCampaignTemplates
    }
    if (data == 'reopen') {
      if (!this.templateObj.reason) {
        this.common.showErrorMessage("Reason is must for reopen");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.reopenCampaignTemplates
    }


    this.common.showLoading()
    this.apiService.post(url, { wfId: this.ohj['wfId'], reason: this.templateObj.reason }).subscribe((succ: any) => {

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
  MoveTo(){
    this.router.navigate(['../home/group-management/languageMaster'])
  }
  back() {
    this.location.back();
    
  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  changeService($event) {


    this.reqObj["notiId"] = $event.target.value;
    this.common.showLoading();
    this.apiService.post(this.constantsService.listforEdit, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading()
      
      let categ = succ.data.categoryId
      this.reqObj["preferredChannel"] = succ.data.channelId


      if (categ != 5) {
        this.showType = false
        
      } else {
        this.showType = true
        this.showSuccessandFailure = [{ "junk": "success" }, { "junk": "failure" }]

      }
    }, err => {
      this.common.hideLoading()
      
    })


  }

  onChange(notiId) {
    this.reqObj["notiId"] = notiId
    this.common.showLoading();
    this.apiService.post(this.constantsService.templateList, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading()
      this.listTemplate = succ ? succ.data.listParam : [];
    }, err => {
      this.common.hideLoading()
      
    }
    )


  }

  Draft() {
    if (this.TemplateForm.invalid) {
      this.TemplateForm.markAllAsTouched();
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
        this.templateObj.statusFilter = 1
      } else {
        this.templateObj.statusFilter = this.edit.statusValue ;
      }
      if (this.selectedLanguages.length == 0) {
        this.common.showErrorMessage("Language is must");
        this.common.hideLoading()
        return;
      }
      let messageText = [];
      let item = this.selectedLanguages.forEach((item, i) => {
        let obj: any = {}
        let formControl = this.TemplateForm.get("selectedLanguage").value
        obj[item.langId] = formControl[i].lang
        messageText.push(obj)


      });

      this.templateObj.messageTextEn = JSON.stringify(messageText);
      this.templateObj.isMainChecker = this.isMainChecker;
      this.templateObj.createdTime = "";
      this.templateObj.isActive = true;

      let finalObj: any = {

        "templateName": this.templateObj.templateName,
        "channelId": this.selectedChannel.channelId,
        "msgText": this.templateObj.messageTextEn,
        "isActive": this.templateObj.isActive,
        "id": this.temp.id,
        "isMainChecker": this.templateObj.isMainChecker,
        "statusFilter": this.templateObj.statusFilter,
        "createdTime": this.templateObj.createdTime,
        "img":this.templateObj.attachmentFile,
        "wfId":  this.ohj["wfId"]
      }



      this.common.showLoading();
      this.apiService.post(this.constantsService.draftcampaignTemplates, finalObj).subscribe((succ: any) => {

        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/message-template-management/']);
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
    return this.TemplateForm['controls'].selectedLanguage['controls'][index] as FormArray;
  }
  // virtual keyboard functions starting
  getindex;
  AddKeyborad(index,value){
  this.getindex = index
  this.keyboard.setOptions({
  layout: this.layoutsObj[this.selectedLanguages[index].nativeDesc.toLowerCase()]
});
this.keyboard.setInput(value);
$('.virtualkeyboard').click(function() {
  if ($(this).hasClass('active')) {  
      $(this).removeClass('active');
      $('.simple-keyboard').removeClass('active');
      this.keyboard.clearInput();
}
else{
      $('.simple-keyboard').addClass('active');
      $('.virtualkeyboard').removeClass('active');
      $(this).addClass('active');
      $(this).next().filter('.simple-keyboard').removeClass('active');
      this.keyboard.clearInput();
    }
});
  }
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange1(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: this.layoutsObj[this.selectedLayout]
      
    });
    
  }
  changeMessageField (event,index){
    if(this.editChannels.channelId === 2){
      this.listLanguage[index].message = event.target.innerText;
    }
    else{
      this.listLanguage[index].message = event.target.value;
    }
    
  }
  onChange1 = (input: any) => {
    let sel:any=this.TemplateForm.controls.selectedLanguage;
    let obj=sel.controls[this.getindex].value;
    obj.lang=input//"ariv airvu"
    sel.controls[this.getindex].setValue(obj);
    
  };

  onKeyPress = (button: string) => {
    
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
// virtual keyboard functions ending
  getLanguagedescription(index) {

    if (this.selectedLanguages[index])
      return this.selectedLanguages[index].nativeDesc
  }
  getLanguageMasterDesctiption(index) {
    
    return this.listLanguage[index].nativeDesc

  }

  okPreview() {
    $('#preview-modal').modal('hide')

  }

  preview(i) {
    
    let arr: any = []
    arr.push(this.TemplateForm['controls'].selectedLanguage['controls'][i].value as FormArray)

if(this.Showtextarea1 == true) {
    this.previewText = arr
}
else {
  this.previewText = $('#text'+i).val()
}
  }

  showParamater(i) {
    this.common.showLoading()
    this.reqObj['textId'] = i
    this.reqObj['serviceId'] = this.reqObj['notiId']

    this.apiService.post(this.constantsService.getTemplateParameterByServiceId, this.reqObj).subscribe((succ: any) => {

      if (succ.code == 200) {
        this.common.hideLoading()
        if (!_.isEmpty(succ.data.textFieldData)) {
          
          this.listTemplateParameters = JSON.parse(succ.data.textFieldData)
          this.textFieldData = true
          this.delimiterData = false
          this.xml = false
          this.jsonData = false


        }
        else if (!_.isEmpty(succ.data.delimiterData)) {
          this.listTemplateParameters = JSON.parse(succ.data.delimiterData)
          this.textFieldData = false
          this.delimiterData = true
          this.xml = false
          this.jsonData = false



        } else if (!_.isEmpty(succ.data.xmlData)) {
          this.listTemplateParameters = JSON.parse(succ.data.xmlData)
          this.textFieldData = false
          this.delimiterData = false
          this.xml = true
          this.jsonData = false


        }
        else if (!_.isEmpty(succ.data.jsonData)) {
          this.listTemplateParameters = JSON.parse(succ.data.jsonData)
          this.textFieldData = false
          this.delimiterData = false
          this.xml = false
          this.jsonData = true


        } else {
          $('#parameter-modal').modal('hide');
          this.listTemplateParameters = []
          this.common.showErrorMessage("Nothing to Add")


        }
        

      }

    }, err => {
      this.common.hideLoading()
      
    })

  }

  getFieldName(data) {

    var textId = this.reqObj['textId']


    let checkValue = this.TemplateForm['controls'].selectedLanguage['controls'][textId].controls['lang'].value as FormArray;
    if (checkValue === undefined) {
      let getValue = ""
      let secodFinal = "@" + "{" + data + "}"
      var finalDatea = getValue + secodFinal
      this.common.showSuccessMessage(finalDatea + "Added Successfully")
      return this.TemplateForm['controls'].selectedLanguage['controls'][textId].controls['lang'].patchValue(finalDatea) as FormArray;
    } else {
      var finalDateaa = checkValue + "@" + "{" + data + "}"
      this.common.showSuccessMessage(finalDateaa + "Added Successfully")
      return this.TemplateForm['controls'].selectedLanguage['controls'][textId].controls['lang'].patchValue(finalDateaa) as FormArray;
    }

  }

  okDone() {
    this.dataArr = []
    $('#parameter-modal').modal('hide');

  } 
  isEditOrUpdate() {
    let ret = false;
    if (this.temp.status == 'approveOrReject') {
      if (this.getAccessRole('isChecker')) {
        ret = true;
      }
    }
    else if (!this.Edit) {
      if (this.getAccessRole('isAdd')) {
        ret = true;
      }
    } else if (this.Edit) {
      if (this.getAccessRole('isEdit')) {
        ret = true;
      }
    }


    return ret;
  }
}
