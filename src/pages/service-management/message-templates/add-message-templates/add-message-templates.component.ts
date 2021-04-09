import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
// import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import insertTextAtCursor from 'insert-text-at-cursor';
import * as _ from 'lodash';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { spaceValidator } from 'src/service/utils';
import MyCustomUploadAdapterPlugin from '../../test.js';

import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';




declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-add-message-templates',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './add-message-templates.component.html',
  styleUrls: ['./add-message-templates.component.css']
})
export class AddMessageTemplatesComponent implements OnInit {
  DefaultForm: FormGroup
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
  showLang: boolean;
  ary: any;
  lowerParamaters: boolean;
  den: any = [];
  headers: any = [];
  active: boolean = true;
  defaultObjDup: any = {

  };
  defaultObjAll: any = {

  };
  DefaultFormOld: any = {

  };
  DefaultFormNew: any = {};
  isActiveFormNew: any = {};
  isActiveFormOld: any = {};
  isCorrectParams: any;
  serviceIdNotThere: boolean;
  Clear: boolean;
  notThere: boolean;
  returnized: string;
  normalReq: boolean;
  inital: boolean;
  notClosed: boolean;
 

  //for virtual keyboard variables
  value = "";
  keyboard: Keyboard;
  keyboardLayouts: any;
  layouts: Array<object>;
  layoutsObj: object;
  selectedLayout: string = "english";
  caretPos: number = 0;
  // @ViewChild('ckeditor') public ckeditor: any;
  @ViewChild("lang", { static: false }) lang: any;
  previousTextHeader: any;

  @ViewChild('dynamic', { static: false }) private dynamicRef: ElementRef<HTMLElement>;

  
  showSearchButton: boolean;
  speechData: string;
  forCkEditorPlace: any;
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, private speechRecognitionService: SpeechRecognitionServiceService) {
      console.log("template");


      this.showSearchButton = true;
        this.speechData = "";



    this.user = this.common.getUser();
    this.role = this.common.getRole();
    this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.common.showLoading();

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
      if (this.isNew) {
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
      }

      // this.listZones = succ.data;
      
    });



    //getActiveChannel
    this.apiService.post(this.constantsService.getActiveChannel, {}).subscribe((succ: any) => {
      this.listChannelId = succ.data.channel;
      this.listChannels = succ.data.channel;
      this.common.hideLoading();
    }, err => {
      
    })

    // listServicesDropdown     
    this.apiService.post(this.constantsService.listServicesDropdown, {}).subscribe((succ: any) => {
      this.listMessageTemplates = succ.data;
      this.common.hideLoading();
      
    }, err => {
      
    })
  }




  kealuVoice(i, getLangid){
    var msg = new SpeechSynthesisUtterance();
          var langId = getLangid.toLowerCase();

    msg.volume = 1; // From 0 to 1
    msg.rate = 1; // From 0.1 to 10
    msg.pitch = 2; // From 0 to 2
    msg.lang = langId;


    if(this.getFieldname == "Msgbody"){
      var textIDPOs = "text+" + i
      // var el: any = document.getElementById(textIDPOs).value;
      var el = (<HTMLInputElement>document.getElementById(textIDPOs)).value;

      msg.text = el
      window.speechSynthesis.speak(msg);
      // window.speechSynthesis.cancel();
    }

    if(this.getFieldname == "msgHeader"){
      var textIDPOs = "headerText+" + i
      var el = (<HTMLInputElement>document.getElementById(textIDPOs)).value;

      // var el: any = document.getElementById(textIDPOs).value;
      msg.text = el
      window.speechSynthesis.speak(msg);
      // window.speechSynthesis.cancel();
    }

    if(this.getFieldname == "msgFooter"){
      var textIDPOs = "footerText+" + i;
      // const params: any = this.DefaultForm['controls'].selectedLanguage['controls'][i].controls[textIDPOs].value as FormArray;

      // var el = (document.getElementById(textIDPOs)).value
      var el = (<HTMLInputElement>document.getElementById(textIDPOs)).value;

      msg.text = el
      window.speechSynthesis.speak(msg);
      // window.speechSynthesis.cancel();
    }

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
          if(this.getFieldname == "Msgbody"){

            
          
          var textIDPOs = "text+" + i
          const el = document.getElementById(textIDPOs);
      
          let getValue = ""
          let secodFinal = value
          var finalDatea = getValue + secodFinal
          // this.common.showSuccessMessage(secodFinal + "Added Successfully")
      
      insertTextAtCursor(el, finalDatea);

          }
          else if(this.getFieldname == "msgHeader"){
            var textIDPOs = "headerText+" + i
                const el = document.getElementById(textIDPOs);
            
                let getValue = ""
                let secodFinal = value
                var finalDatea = getValue + secodFinal
                // this.common.showSuccessMessage(secodFinal + "Added Successfully")
            
            insertTextAtCursor(el, finalDatea);
          }
          else if(this.getFieldname == "msgFooter"){
            var textIDPOs = "footerText+" + i
                const el = document.getElementById(textIDPOs);
            
                let getValue = ""
                let secodFinal = value
                var finalDatea = getValue + secodFinal
                // this.common.showSuccessMessage(secodFinal + "Added Successfully")
            
            insertTextAtCursor(el, finalDatea);
          }


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












  // virtual keyboard functions starting
  getindex;
  AddKeyborad(index,value){

      this.keyboard = new Keyboard({
      onChange: input => this.onChange1(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: this.layoutsObj[this.selectedLayout]
      
    });

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
  AddKeyborad1(index,value){

    this.keyboard = new Keyboard({
      onChange: input => this.onChange2(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: this.layoutsObj[this.selectedLayout]
      
    });


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


  AddKeyboradHeader(index,value){

    this.keyboard = new Keyboard({
      onChange: input => this.onChangeHeader(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: this.layoutsObj[this.selectedLayout]
      
    });


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
    // this.keyboard = new Keyboard({
    //   onChange: input => this.onChange1(input),
    //   onKeyPress: button => this.onKeyPress(button),
    //   layout: this.layoutsObj[this.selectedLayout]
      
    // });
    
  }

  onChangeHeader(input: any){
    this.DefaultForm['controls'].selectedLanguage['controls'][this.getindex].controls['headerText'].setValue(input) as FormArray
  }
  
  onChange2 = (input: any) => {
   this.DefaultForm['controls'].selectedLanguage['controls'][this.getindex].controls['footerText'].setValue(input) as FormArray

    // let sel:any=this.DefaultForm['controls'].selectedLanguage['controls'][this.getindex].controls['headerText'];
    // let obj=sel.controls[this.getindex].value;
    // obj.lang=input
    // sel.controls[this.getindex].setValue(input);

    
  };
  onChange1 = (input: any) => {
    let sel:any=this.DefaultForm.controls.selectedLanguage;
    let obj=sel.controls[this.getindex].value;
    obj.lang=input
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
  public onReady(editor) {
    

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
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
    let obj: any = {}
     let formControl = this.DefaultForm.get("selectedLanguage").value
      
     
    this.previousTextHeader= event.target.value;
  }
  changeFieldFooter(event, pattern, min, limitTo, id, length,index) {
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
    this.previousTextHeader = event.target.value;
  }
  changeMessageField (event,index,lan){
    console.log(lan)
    if(this.editChannels.channelId === 2){
      this.listLanguage[index].message = event.target.innerText;
    }
    else{
      this.listLanguage[index].message = event.target.value;
    }
  }
  
  ngOnInit() {
    $('.simple-keyboard').removeClass('active');
    this.showType = false
    this.languageForm = this.formBuilder.group({
      language: new FormArray([]),
    });

    myMethod();
    selectSearchMethod();
    setTimeout(() => {
      $('[rel=tooltip]').tooltip({
        trigger: 'hover'
      });
    }, 3000);
    this.DefaultForm = this.formBuilder.group({
      notiId: ['', Validators.compose([Validators.required])],
      // messageText: ['', Validators.compose([Validators.required,spaceValidator, Validators.maxLength(500)])],
      // messageLang: ['', Validators.required],
      selectedLanguage: this.formBuilder.array([]),
      // channelId: ['', Validators.compose([Validators.required])],
      smsResult: [''],
      selectedChannel: [''],
      selectedChannelId: [''],
      // headerText: ['', Validators.compose([Validators.maxLength(500),spaceValidator])],
      // footerText: ['', Validators.compose([Validators.maxLength(500),spaceValidator])],
      // previewText: ['', Validators.compose([Validators.maxLength(500)])],
    });

    this.DefaultForm.patchValue(this.DefaultForm)

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
      this.DefaultForm.controls['selectedChannel'].disable();


    } else {
      this.isNew = false;

      if (this.edit.statusValue == 1) {
        this.temp.status = 'draft';
        this.statusHideInAdd = false
        this.isActiveForm.disable()

        this.DefaultForm.controls['selectedChannel'].disable();
        this.getNonApproveData();
      }
      if (this.edit.statusValue == 2) {
        this.temp.status = 'edit';
        this.statusHideInAdd = true
        this.getApprovedData();
        // this.DefaultForm.controls['serviceId'].disable();
        this.DefaultForm.get('notiId').disable();
        this.DefaultForm.controls['selectedChannel'].disable();

        this.languageForm.disable();
        this.showLang = true
        
        this.temp.id = this.edit.id

      }
      if (this.edit.statusValue == 3) {
        this.DefaultForm.disable();
        this.languageForm.disable();
        this.isActiveForm.disable()
        this.showLang = false
        this.statusHideInAdd = true
        this.temp.topButton = "new";
        this.temp.status = 'approveOrReject';
        this.DefaultForm.controls['selectedChannel'].disable();

        this.getNonApproveData();
      }
      if (this.edit.statusValue == 4) {
        this.DefaultForm.disable();
        this.languageForm.disable();
        this.isActiveForm.disable()
        this.showLang = false
        this.statusHideInAdd = true
        this.temp.status = 'reject';
        this.temp.topButton = "new";
        this.DefaultForm.controls['selectedChannel'].disable();

        this.getNonApproveData();
      }
      if (this.edit.statusValue == 5) {
        this.temp.status = 'reopen';
        this.showLang = false
        this.statusHideInAdd = false
        this.DefaultForm.controls['selectedChannel'].disable();

        this.getNonApproveData();
      }
    }
    this.editChannels = this.common.getEditServiceActiveChannels()
    

    if (!_.isEmpty(this.editChannels)) {
      
      if (this.editChannels.channelId === 1) {
        this.selectedChannel.channelId = this.editChannels.channelId
        this.selectedChannel.channelName = this.editChannels.channelDesc
        this.DefaultForm.controls.selectedChannel.disable()
        this.showHeader = true

        this.showSMSText = true
        this.lowerParamaters = true
      }
      if (this.editChannels.channelId === 2) {
        // alert("2")

        this.selectedChannel.channelName = this.editChannels.channelDesc
        this.selectedChannel.channelId = this.editChannels.channelId
        this.DefaultForm.controls.selectedChannel.disable()
        this.showHeader = false

        this.showCk = true
        this.lowerParamaters = false

      }
      if (this.editChannels.channelId === 3) {
        this.selectedChannel.channelName = this.editChannels.channelDesc
        this.selectedChannel.channelId = this.editChannels.channelId
        this.DefaultForm.controls.selectedChannel.disable()
        // this.showHeader = true


        // this.showPush = true

        this.showHeader = false
        this.showSMSText = true

        this.showCk = false
        this.lowerParamaters = true

      }
      // this.temp.status = "new";

    } else {

      this.selectedChannel.channelName = this.editChannels.channelDesc
      this.selectedChannel.channelId = this.editChannels.channelId
      this.DefaultForm.controls.selectedChannel.disable()
      this.showHeader = true
      this.showSMSText = true
    }


  }

  getApprovedData() {
    this.common.showLoading();
    this.apiService.post(this.constantsService.getMessageTemplateDetails, this.edit).subscribe((succ: any) => {

      if (succ.code == 200) {
        this.getEditMessageDetails = succ;
        


        this.defaultObjAll = succ.data['msgTemplates']
        this.defaultObj = succ.data.templateMaster


        var isActive = JSON.parse(succ.data.templateMaster['isActive']);
        this.defaultObj.isActive = isActive
        if (isActive == true) {
          this.defaultTrue = true
          this.active = true
        }
        else {
          this.defaultTrue = false
          this.active = false


        }


        this.defaultObj.notiId = succ.data.templateMaster['serviceId']
        this.reqObj['notiId'] = succ.data.templateMaster['serviceId']



        var aarPush = []
        var headers = []
        this.idPush = []
        let headersSet: any = {}

        for (var i = 0; i < succ.data.msgTemplates.length; i++) {
          let fObjj: any = {}
          // fObjj[succ.data.msgTemplates[i].langId] = succ.data.msgTemplates[i].msgText
          fObjj["langId"] = succ.data.msgTemplates[i].langId
          fObjj["msgText"] = succ.data.msgTemplates[i].msgText
          fObjj["headerText"] = succ.data.msgTemplates[i].headerText
          fObjj["footerText"] = succ.data.msgTemplates[i].footerText
          fObjj["idee"] = succ.data.msgTemplates[i].id
          
          aarPush.push(fObjj)
        }

        for (var i = 0; i < succ.data.msgTemplates.length; i++) {
          // let headersSet: any = {}
          let headersFinalSet = { "headerText": succ.data.msgTemplates[i].headerText, "footerText": succ.data.msgTemplates[i].footerText }

          // headersSet[succ.data.msgTemplates[i].headerText] = succ.data.msgTemplates[i].headerText
          // headersSet[succ.data.msgTemplates[i].footerText] = succ.data.msgTemplates[i].footerText
          headers.push(headersFinalSet)

          let onlyId: any = {}
          onlyId["id"] = succ.data.msgTemplates[i].id
          this.idPush.push(onlyId)



        }

        

        // var sample = [{"EN":"popiuy"},{"AR":"popiuy"}]
        this.getEditMessageDetails.data.messageText = aarPush
        let message = this.getEditMessageDetails.data.messageText
        setTimeout(() => {



          this.selectedChannel.channelId = succ.data.templateMaster['channelId']
          // this.selectedChannel.channelId = succ.data.templateMaster['channelId']
          const langList = this.listChannels;

          let obj: any = {};
          for (var i = 0; i < langList.length; i++) {

            if (this.selectedChannel.channelId === langList[i].channelId) {
              
              
              obj = langList[i].channelDesc
            }
          }
          this.selectedChannel.channelName = obj


          // this.defaultObjDup = JSON.stringify(this.defaultObjAll)
          


          this.DefaultForm.controls.selectedChannelId.setValue(succ.data.templateMaster['channelId']);



          this.listLanguage.forEach((o, i) => {
            
            
            const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
            (this.languageForm.controls.language as FormArray).push(control);
            if (o.isDefault == 1) {
              // control.disable();
              o.check = true;
              // this.addActiveLanguage();
            }
            for (let i = 0; i < message.length; i++) {
              if (message[i].langId == o.langId) {
                o.check = true;
                this.selectedLanguages.push(o);
                o.message = message[i].msgText;
                o.headerText = message[i].headerText;
                o.footerText = message[i].footerText;
                o.ide = message[i].idee;
                
                this.addNewLanguage(o);

              }

            }
          });


          setTimeout(() => {
            this.addActiveLanguage("dontPush");
          }, 2000);
          


          this.DefaultFormOld = this.DefaultForm.value

          this.DefaultForm.valueChanges.subscribe(value => {
            
            
            this.DefaultFormNew = value
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
    this.apiService.post(this.constantsService.getApproveData, this.edit).subscribe((succ: any) => {
      
      if (succ.code == 200) {
        let newValue = JSON.parse(succ.data.new_DTLS);
        
        this.defaultObj = newValue.templateMaster


        // this.defaultObj = newValue
        this.ohj = {}
        this.defaultObj.wfId = succ.data.wf_ID
        this.ohj["wfId"] = this.defaultObj.wfId
        
        // let message = newValue.msgTemplates

        // changeService($event)


        this.defaultObj.notiId = newValue.templateMaster['serviceId']
        this.reqObj['notiId'] = newValue.templateMaster['serviceId']




        var isActive = JSON.parse(newValue.templateMaster['isActive']);
        this.defaultObj.isActive = isActive
        if (isActive == true) {
          this.defaultTrue = true
          this.active = true

        }
        else {
          this.defaultTrue = false
          this.active = false


        }

        var aarPush = []
        this.headers = []
        this.idPush = []

        for (var i = 0; i < newValue.msgTemplates.length; i++) {
          let fObjj: any = {}
          // fObjj[newValue.msgTemplates[i].langId] = newValue.msgTemplates[i].msgText
          fObjj["langId"] = newValue.msgTemplates[i].langId
          fObjj["msgText"] = newValue.msgTemplates[i].msgText
          fObjj["headerText"] = newValue.msgTemplates[i].headerText
          fObjj["footerText"] = newValue.msgTemplates[i].footerText
          
          aarPush.push(fObjj)
        }

        for (var i = 0; i < newValue.msgTemplates.length; i++) {
          let headersFinalSet = { "headerText": newValue.msgTemplates[i].headerText, "footerText": newValue.msgTemplates[i].footerText }
          this.headers.push(headersFinalSet)

          let onlyId: any = {}
          onlyId["id"] = newValue.msgTemplates[i].id
          this.idPush.push(onlyId)



        }

        

        // var sample = [{"EN":"popiuy"},{"AR":"popiuy"}]
        // this.getEditMessageDetails.data.messageText = aarPush
        var message = aarPush
        setTimeout(() => {





          this.selectedChannel.channelId = newValue.templateMaster['channelId']
          const langList: any = this.listChannels;
          let obj = {};
          for (var i = 0; i < langList.length; i++) {
            if (this.selectedChannel.channelId == langList[i].channelId) {
              
              
              obj = langList[i].channelDesc

            }
          }

          this.selectedChannel.channelName = obj

          this.den = []

          this.listLanguage.forEach((o, i) => {
            
            
            const control = new FormControl(o.isDefault == 1); // if first item set to true, else false
            (this.languageForm.controls.language as FormArray).push(control);
            for (let i = 0; i < message.length; i++) {
              if (message[i].langId == o.langId) {
                o.check = true;
                this.selectedLanguages.push(o);
                o.message = message[i].msgText;
                o.headerText = message[i].headerText;
                o.footerText = message[i].footerText;
                
                this.addNewLanguage(o);

              }

            }
          });

        }, 3000);

      } else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
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
    this.DefaultForm.removeControl('selectedLanguage');
    this.DefaultForm.addControl('selectedLanguage', new FormArray([]));

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
      this.showHeader = true
      this.showSMSText = true
      this.showCk = false
      this.lowerParamaters = true

      let fg = this.formBuilder.group({
        'lang': [item.message, Validators.required],
        'ide': [item.ide],
        id: [item.id],
        'headerText': [item.headerText, Validators.compose([Validators.maxLength(500), spaceValidator, Validators.required])],
        'footerText': [item.footerText, Validators.compose([Validators.maxLength(500), spaceValidator, Validators.required])],
  
      });
  
      (<FormArray>this.DefaultForm.get('selectedLanguage')).push(fg);


    }

    if (this.selectedChannel.channelId === 2) {
      this.showHeader = false
      this.showCk = true
      this.showSMSText = false
      this.lowerParamaters = false

      
    let fg = this.formBuilder.group({
      'lang': [item.message, Validators.required],
      'ide': [item.ide],
      id: [item.id],
      'headerText': [item.headerText, Validators.compose([Validators.maxLength(500), spaceValidator])],
      'footerText': [item.footerText, Validators.compose([Validators.maxLength(500), spaceValidator])],

    });

    (<FormArray>this.DefaultForm.get('selectedLanguage')).push(fg);
    }
    if (this.selectedChannel.channelId === 3) {
      this.showHeader = false
      this.showSMSText = true
      this.showCk = false
      this.lowerParamaters = true


      
    let fg = this.formBuilder.group({
      'lang': [item.message, Validators.required],
      'ide': [item.ide],
      id: [item.id],
      'headerText': [item.headerText],
       'footerText': [item.footerText],

    });

    (<FormArray>this.DefaultForm.get('selectedLanguage')).push(fg);
    }





  }





  openModal() {
    // this.defaultObj.isActive  = false

    $("#userModal").modal("show")

  }
  closeModal() {
    $("#userModal").modal("hide")

  }

  ActiveUpdate() {
    // this.defaultObj.isActive = this.defaultObj.isActive
    if (this.defaultObj.isActive == undefined) {
      this.isActiveForm.get('reasons').setValidators(Validators.required)
      this.isActiveForm.get('reasons').updateValueAndValidity();

      // this.defaultObj.isActive= false
      // this.isActiveForm.get('reasons').setValidators(Validators.required)

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.defaultObj.isActive = false
        $("#userModal").modal("hide")

      }
    }

    if (this.defaultObj.isActive == true) {
      this.defaultObj.isActive = true
      this.isActiveForm.get('reasons').clearValidators();
      this.isActiveForm.get('reasons').updateValueAndValidity();

      $("#userModal").modal("hide")
    }

    if (this.defaultObj.isActive == false) {
      this.isActiveForm.get('reasons').setValidators(Validators.required)
      this.isActiveForm.get('reasons').updateValueAndValidity();

      // this.defaultObj.isActive= false
      // this.isActiveForm.get('reasons').setValidators(Validators.required)

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.defaultObj.isActive = false
        $("#userModal").modal("hide")

      }
    }
  }

  Update() {
    this.common.showLoading()

    
    if (this.DefaultForm.invalid) {
      this.DefaultForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {


      if (_.isEmpty(this.DefaultFormNew)) {
        this.DefaultFormNew = this.DefaultFormOld
      }
      else {
        this.DefaultFormNew = this.DefaultFormNew
      }

      
      


      if (_.isEmpty(this.isActiveFormNew)) {
        this.isActiveFormNew = this.isActiveFormOld
      }
      else {
        this.isActiveFormNew = this.isActiveFormNew
      }

      
      




      if (_.isEqual(this.DefaultFormOld, this.DefaultFormNew) && _.isEqual(this.isActiveFormOld, this.isActiveFormNew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      }
      else {
        this.common.showLoading()

        if (this.selectedLanguages.length == 0) {
          this.common.showErrorMessage("Language is must");
          this.common.hideLoading()
          return;
        }

        let messageText = [];
        let item = this.selectedLanguages.forEach((item, i) => {
          let obj: any = {}
          let formControl = this.DefaultForm.get("selectedLanguage").value
          obj["msgText"] = formControl[i].lang

          obj["footerText"] = formControl[i].footerText
          obj["headerText"] = formControl[i].headerText
          obj["langId"] = item.langId
          obj["id"] = item.ide
          messageText.push(obj)

          


        });
        


        const ids: any = this.idPush;

        this.defaultObj.msgTemplates = messageText;
        this.defaultObj.isMainChecker = this.isMainChecker;
        this.defaultObj.createTime = "";
        // this.defaultObj.isActive = true;
        

        let obj2: any = {}
        obj2["serviceId"] = this.defaultObj.notiId
        obj2["msgType"] = this.defaultObj.smsResult
        obj2["channelId"] = this.selectedChannel.channelId
        obj2["preferredChannel"] = this.reqObj["preferredChannel"]
        obj2["isActive"] = JSON.stringify(this.defaultObj.isActive)
        obj2["reason"] = this.defaultObj.reasons
        obj2["id"] = this.temp.id
        let finalObj: any = { "msgTemplates": this.defaultObj.msgTemplates, "templateMaster": obj2, "isMainChecker": this.defaultObj.isMainChecker, "createTime": this.defaultObj.createTime }

        


        this.apiService.post(this.constantsService.updateServiceMessageTemplates, finalObj).subscribe((succ: any) => {
          
          this.common.hideLoading()


          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.router.navigate(['../home/service-management/message-templates/']);

          }
          else {
            this.common.hideLoading()
            this.common.showErrorMessage(succ.message)

          }

        },
          err => {
            this.common.hideLoading()

          });

      }
    }
  }

  Submit() {
    
console.log(this.DefaultForm, "this.DefaultForm")
    if (this.DefaultForm.invalid) {
      this.DefaultForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    // else {
    if (this.selectedLanguages.length == 0) {
      this.common.showErrorMessage("Language is must");
      this.common.hideLoading()
      return;
    }
    let messageText = [];
    let item = this.selectedLanguages.forEach((item, i) => {
      let obj: any = {}
      let formControl = this.DefaultForm.get("selectedLanguage").value
      obj["msgText"] = formControl[i].lang

      obj["footerText"] = formControl[i].footerText
      obj["headerText"] = formControl[i].headerText
      obj["langId"] = item.langId
      messageText.push(obj)

      
    });
    
    this.defaultObj.msgTemplates = messageText;
    this.defaultObj.isMainChecker = this.isMainChecker;
    this.defaultObj.createTime = "";
    // this.defaultObj.isActive = true;
    

    let obj2: any = {}
    obj2["serviceId"] = this.defaultObj.notiId
    obj2["msgType"] = this.defaultObj.smsResult
    obj2["channelId"] = this.selectedChannel.channelId
    obj2["preferredChannel"] = this.reqObj["preferredChannel"]
    obj2["isActive"] = "true"
    let finalObj: any = {
      "msgTemplates": this.defaultObj.msgTemplates, "templateMaster": obj2, "isMainChecker": this.defaultObj.isMainChecker, "createTime": this.defaultObj.createTime,
      "wfId": this.defaultObj.wfId
    }
    this.common.showLoading()
    this.apiService.post(this.constantsService.addServiceMessageTemplatess, finalObj).subscribe((succ: any) => {
      
      this.common.hideLoading()
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/service-management/message-templates/']);
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
    // if (data != 'approve') {
    //   if (!this.defaultObj.reason) {
    //     this.common.showErrorMessage("Reason is Must for Reject");
    //     this.errReasonMsg = true;
    //     return;
    //   }
    //   this.errReasonMsg = false;
    //   url = this.constantsService.rejectMessageTemplates
    // } else {
    //   url = this.constantsService.approveMessageTemplates
    // }

    if (data == 'reject') {

      if (!this.defaultObj.reason) {
        this.common.showErrorMessage("Reason is must for reject");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.rejectMessageTemplates

    } else if (data == 'approve') {
      url = this.constantsService.approveMessageTemplates
    }
    if (data == 'reopen') {
      if (!this.defaultObj.reason) {
        this.common.showErrorMessage("Reason is must for reopen");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.reopenMessageTemplates
    }

   
    this.common.showLoading()
    this.apiService.post(url, { wfId: this.ohj['wfId'], reason: this.defaultObj.reason }).subscribe((succ: any) => {
      
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

  back() {
    this.location.back();
    // this.router.navigate(['../home/service-management/message-templates/']);
  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  changeService($event) {
    

    this.reqObj["notiId"] = $event.target.value;


    this.editChannels = this.common.getEditServiceActiveChannels()
    var channelId = this.editChannels.channelId
    var ezhilObj = {
      "serviceId": $event.target.value,
      "channelId": channelId,
      // "companyId": 59
    }
    this.apiService.post(this.constantsService.validateExistMessageTemplate, ezhilObj).subscribe((succ: any) => {
      if (succ.code != 200) {
        this.common.showErrorMessage(succ.message)

      }
    }, err => {
      
    })


    this.common.showLoading();
    this.apiService.post(this.constantsService.listforEdit, this.reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading()
      // this.listServ = succ.data;
      let categ = succ.data.categoryId
      this.reqObj["preferredChannel"] = succ.data.channelId
      

      if (categ != 5) {
        this.showType = false
        // this.reqObj["notiId"] = '';
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

    if (this.DefaultForm.invalid) {
      this.DefaultForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      this.defaultObj.isMainChecker = this.isMainChecker;
      this.defaultObj.createTime = "";
      this.defaultObj.isActive = true;

      if (_.isEmpty(this.edit)) {
        this.defaultObj.statusFilter = 1
      } else {
        this.defaultObj.statusFilter = this.edit.statusValue ;
      }
      if (this.selectedLanguages.length == 0) {
        this.common.showErrorMessage("Language is must");
        this.common.hideLoading()
        return;
      }
      let messageText = [];
      let item = this.selectedLanguages.forEach((item, i) => {
        let obj: any = {}
        let formControl = this.DefaultForm.get("selectedLanguage").value
        obj["msgText"] = formControl[i].lang

        obj["footerText"] = formControl[i].footerText
        obj["headerText"] = formControl[i].headerText
        obj["langId"] = item.langId
        messageText.push(obj)

        
      });
      
      this.defaultObj.msgTemplates = messageText;
      this.defaultObj.isMainChecker = this.isMainChecker;
      this.defaultObj.createTime = "";
      // this.defaultObj.isActive = true;
      

      let obj2: any = {}
      obj2["serviceId"] = this.defaultObj.notiId
      obj2["msgType"] = this.defaultObj.smsResult
      obj2["channelId"] = this.selectedChannel.channelId
      obj2["preferredChannel"] = this.reqObj["preferredChannel"]
      obj2["isActive"] = true
      let finalObj: any = {
        "msgTemplates": this.defaultObj.msgTemplates, "templateMaster": obj2, "isMainChecker": this.defaultObj.isMainChecker, "createTime": this.defaultObj.createTime,
        "statusFilter": this.defaultObj.statusFilter, "wfId": this.defaultObj.wfId
      }

      this.common.showLoading();
      this.apiService.post(this.constantsService.saveMessageTemplateDrafts, finalObj).subscribe((succ: any) => {
        
        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/service-management/message-templates/']);
        }
        else {
          this.common.showErrorMessage(succ.message)
          this.common.hideLoading()
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
    
    

    if (!this.listLanguage[index].check) {
      this.listLanguage[index].check = false;
      // this.DefaultForm.removeControl('selectedLanguage');
      // (<FormArray>this.DefaultForm.get('selectedLanguage')).reset(index)

    }

    if (this.listLanguage[index].check) {
      this.listLanguage[index].check = true;
    }
  }











  getLangForm(index) {
    return this.DefaultForm['controls'].selectedLanguage['controls'][index] as FormArray;
  }


getLangid:any
  getLanguagedescription(index) {
    if (this.selectedLanguages[index])
    this.getLangid = this.selectedLanguages[index].langId
      return this.selectedLanguages[index].nativeDesc
  }
  langs:any
  getLanguageMasterDesctiption(index) {
    this.langs = this.listLanguage[index].nativeDesc
    return this.listLanguage[index].nativeDesc

  }

  okPreview() {
    $('#preview-modal').modal('hide')

  }

  preview(i) {
    
    let arr: any = []
    arr.push(this.DefaultForm['controls'].selectedLanguage['controls'][i].value as FormArray)

    
    this.previewText = arr
  }
 

  public checkParamsCK( { editor }: ChangeEvent ) {
    const data = editor.getData();

    
}

  checkParameters(i) {
    
    var ide = i;

  const params = this.DefaultForm['controls'].selectedLanguage['controls'][i].controls['lang'].value as FormArray;
  
 
  this.isCorrectParams = params


  var string  = this.isCorrectParams;

  if(!string){
   
    this.DefaultForm['controls'].selectedLanguage['controls'][i].controls['lang'].setValidators([Validators.required])
    this.DefaultForm['controls'].selectedLanguage['controls'][i].controls['lang'].updateValueAndValidity();
  }else{

  var Correctcount = (string.match(/<@/g) || []).length;
var CorrectEndcount = (string.match(/@>/g) || []).length;



var Spacecount = (string.match(/< @/g) || []).length;
var SpaceEndcount = (string.match(/@ >/g) || []).length;



var Bracketcount = (string.match(/< /g) || []).length;
var BracketEndcount = (string.match(/ >/g) || []).length;



var unwanted = (string.match(/<@>/g) || []).length;



if(Correctcount !== CorrectEndcount ){
  this.notClosed = true
  this.notThere = false
  this.Clear = false
  this.serviceIdNotThere = false
  this.inital = false

  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].setValidators([this.validateUserIdUnique()])
  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].updateValueAndValidity();
  // this.common.showErrorMessage("Paramters not ClosedKindly")


}else if(Spacecount > 0 || SpaceEndcount > 0 ){
  this.notClosed = true
this.notThere = false
this.Clear = false
this.serviceIdNotThere = false
this.inital = false

  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].setValidators([this.validateUserIdUnique()])
  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].updateValueAndValidity();
  // this.common.showErrorMessage("check Paramters Kindly")
  
}else if(Bracketcount > 0 || BracketEndcount > 0 ){
  this.notClosed = true
  this.notThere = false
  this.Clear = false
  this.serviceIdNotThere = false
  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].setValidators([this.validateUserIdUnique()])
  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].updateValueAndValidity(); 
  //  this.common.showErrorMessage("check Parameters Kindly space ")

  
}else if(unwanted > 0  ){
this.notClosed = true
this.notThere = false
this.Clear = false
this.serviceIdNotThere = false
this.inital = false


  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].setValidators([this.validateUserIdUnique()])
  this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].updateValueAndValidity();
  // this.common.showErrorMessage("please go and hang urself ")
  
}else{

  


var regex   =  "/(?<=<@\s*).*?(?=\s*@>)/gs"
  var result = string.match(regex); // Returns multiple matches if any
  
  if(result != null){
  for(let i =0; i < result.length; i++){
    let trimmed = result[i].trim()
    this.reqObj['serviceId'] = this.reqObj['notiId']
    
    if(_.isEmpty(this.reqObj['serviceId']) || this.reqObj['serviceId'] === undefined){
      

      // this.returnized = 'NoserviceId'

    }else{
         
      var str = trimmed;
      

var setObj = {"serviceId": this.reqObj['serviceId'], "parameter":str}
    this.apiService.post(this.constantsService.validateExistParameter, setObj).subscribe((succ: any) => {
      
      if (succ.code == 200) {
        // this.returnized = 'Clear'   
        this.Clear = true
        this.notThere = false
        this.notClosed = false
        this.serviceIdNotThere = false
          this.inital = false

      this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].setValidators([this.validateUserIdUnique()])
      this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].updateValueAndValidity();

      } else if (succ.code != 200){
        this.common.showErrorMessage(succ.message)

        this.notThere = true
        this.Clear = false
        this.notClosed = false
        this.serviceIdNotThere = false
        this.inital = false

        this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].setValidators([this.validateUserIdUnique()])
        this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].updateValueAndValidity();

        // this.returnized =  'notThere'
        // let cool = "<"+ "@"+str+"@"+">"
        // var finalDatea = this.isCorrectParams.replace(cool,'');

 
        // return this.DefaultForm['controls'].selectedLanguage['controls'][ide].controls['lang'].patchValue(finalDatea) as FormArray;


       
      }
    });


    }
  }

  }




  this.Clear = true
  this.notThere = false
  this.notClosed = false
  this.serviceIdNotThere = false
  this.inital = false

  this.DefaultForm['controls'].selectedLanguage['controls'][i].controls['lang'].setValidators([this.validateUserIdUnique()])
  this.DefaultForm['controls'].selectedLanguage['controls'][i].controls['lang'].updateValueAndValidity()

  


}


  }
















  



 

  
  }
 

  
  private validateUserIdUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      

      if (this.Clear == true) {
        return null
      }
      if (this.notThere == true) {
        return { 'notThere': true }
      }
      if (this.serviceIdNotThere == true) {
        return { 'serviceId': true }
      }
      if (this.inital == true) {
        return { required: true }
      }
      if (this.notClosed == true) {
        return { 'notClosed': true }
      }
    
    }
  }


  showParamater(i) {
    this.common.showLoading()
    this.reqObj['textId'] = i
    this.reqObj['serviceId'] = this.reqObj['notiId']

    this.apiService.post(this.constantsService.getTemplateParameterByServiceId, this.reqObj).subscribe((succ: any) => {
      
      if (succ.code == 200) {
        this.common.hideLoading()



        if (succ.data === null) {
          $('#parameter-modal').modal('hide');
          this.listTemplateParameters = []
          this.common.showErrorMessage("Nothing to Add")
        }
        else {
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


          }


        }

        
      }

    }, err => {
      this.common.hideLoading()
      
    })

  }


  public ckEditorFocusOut(event) {
    
    var selection = event.editor.getSelection();
    var ranges = selection.getRanges();
    var range = ranges[0];

    var newRange = event.editor.createRange();

    var moveToEnd = true;
    newRange.moveToElementEditablePosition(range.endContainer, moveToEnd);

    var newRanges = [newRange];
    selection.selectRanges(newRanges);

    event.editor.insertHtml("<span>Hello World!</span>");
}
getFieldname:any = {}


getLangid2:any
focusBody(data, index){
this.getFieldname = data
if (this.selectedLanguages[index])
this.getLangid2 = this.selectedLanguages[index].langId
console.log(this.getLangid2, "this.getLangid2this.getLangid2")
  // return this.selectedLanguages[index].nativeDesc

}

focusHeader(data, index){
  this.getFieldname = data
  if (this.selectedLanguages[index])
this.getLangid2 = this.selectedLanguages[index].langId
console.log(this.getLangid2, "this.getLangid2this.getLangid2")
  // return this.selectedLanguages[index].nativeDesc
  }
  focusFooter(data, index){
    this.getFieldname = data
    if (this.selectedLanguages[index])
this.getLangid2 = this.selectedLanguages[index].langId
console.log(this.getLangid2, "this.getLangid2this.getLangid2")
  // return this.selectedLanguages[index].nativeDesc
    }

  getFieldName(data) {

    var textIdCK = this.reqObj['textId']

if(this.editChannels.channelId === 2){

    let checkValue = this.DefaultForm['controls'].selectedLanguage['controls'][textIdCK].controls['lang'].value as FormArray;
    if (_.isEmpty(checkValue)) {
      let getValue = ""
      let secodFinal = "<" + "@" + data + "@" + ">"
      var finalDatea= getValue+ secodFinal
      this.common.showSuccessMessage(finalDatea + "Added Successfully")
      return this.DefaultForm['controls'].selectedLanguage['controls'][textIdCK].controls['lang'].patchValue(finalDatea) as FormArray;
    } 
    if (!_.isEmpty(checkValue)) {
      var finalDateaa = checkValue + "<" + "@" + data + "@" + ">"
      // var finalDateaaResult = "<" + "@" + data + "@" + ">"
      this.common.showSuccessMessage(finalDateaa + "Added Successfully")
      return this.DefaultForm['controls'].selectedLanguage['controls'][textIdCK].controls['lang'].patchValue(finalDateaa) as FormArray;
    }
  }



  if(this.editChannels.channelId != 2 || this.editChannels.channelId != 3){



    if(this.getFieldname == "Msgbody"){
      var textId = this.reqObj['textId']
      var textIDPOs = "text+" + textId
          const el = document.getElementById(textIDPOs);
      
          let getValue = ""
          let secodFinal = "<" + "@" + data + "@" + ">"
          var finalDatea = getValue + secodFinal
          this.common.showSuccessMessage(secodFinal + "Added Successfully")
      
      insertTextAtCursor(el, finalDatea);
    }
    else if(this.getFieldname == "msgHeader"){
      var textId = this.reqObj['textId']
      var textIDPOs = "headerText+" + textId
          const el = document.getElementById(textIDPOs);
      
          let getValue = ""
          let secodFinal = "<" + "@" + data + "@" + ">"
          var finalDatea = getValue + secodFinal
          this.common.showSuccessMessage(secodFinal + "Added Successfully")
      
      insertTextAtCursor(el, finalDatea);
    }
    else if(this.getFieldname == "msgFooter"){
      var textId = this.reqObj['textId']
      var textIDPOs = "footerText+" + textId
          const el = document.getElementById(textIDPOs);
      
          let getValue = ""
          let secodFinal = "<" + "@" + data + "@" + ">"
          var finalDatea = getValue + secodFinal
          this.common.showSuccessMessage(secodFinal + "Added Successfully")
      
      insertTextAtCursor(el, finalDatea);
    }
    else {
      var textId = this.reqObj['textId']
      var textIDPOs = "text+" + textId
          const el = document.getElementById(textIDPOs);
      
          let getValue = ""
          let secodFinal = "<" + "@" + data + "@" + ">"
          var finalDatea = getValue + secodFinal
          this.common.showSuccessMessage(secodFinal + "Added Successfully")
      
      insertTextAtCursor(el, finalDatea);
    }



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
