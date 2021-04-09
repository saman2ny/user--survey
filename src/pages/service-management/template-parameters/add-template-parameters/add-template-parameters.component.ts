import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import { spaceValidator, specialCharacters } from 'src/service/utils';
// import { specialCharacters } from 'src/service/utils';

import * as _ from 'lodash';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-add-template-parameters',
  templateUrl: './add-template-parameters.component.html',
  styleUrls: ['./add-template-parameters.component.css']
})
export class AddTemplateParametersComponent implements OnInit {
  TemplateForm: FormGroup;
  fixedFieldForm: FormGroup
  user: any = {};
  listServices: any = [];
  Edit: boolean = false;
  upperField: boolean = false


  templateObj: any = {
    dataModel: "text",
    isDelimeter: false
  }
  reqObj = {
    "searchText": "",
    "noOfRecords": 100,
    "pageIndex": 1,
    "statusFilter": "1",
    "isMainChecker": false,
    "menuId": 0,
  }
  edit: any;
  role: any;
  isApprove: boolean;
  errReasonMsg: boolean;
  isMainChecker: any;
  temp: any = {};
  // addTextFieldLengthList: any = []
  fname: any;
  // addTextDelimiterLengthList: any = [];
  // addTextJsonLengthList: any = [];
  // addTextXmlLengthList: any = [];


  qty: any[] = [];

  textFieldDataModel: any = [];
  textFieldDataModelForm: FormGroup;
  showTextFieldForm: boolean = true;

  textDelimiterDataModel: any = [];
  textDelimiterDataForm: FormGroup;
  showTextDelimiter: boolean = true;

  xmlDataModel: any = [];
  xmlDataForm: FormGroup;
  showTextxml: boolean = true;


  JSONDataModel: any = [];
  JSONDataForm: FormGroup;
  showTextJSON: boolean = true;
  api: any = []
  apiName :any = []

  textDelimiterDataFormOld: any = {};
  textDelimiterDataFormNew: any = {};
  textFieldDataModelFormOld: any = {};
  textFieldDataModelFormNew: any = {};
  xmlDataFormOld: any = {};
  xmlDataFormNew: any = {};
  JSONDataFormNew: any = {};
  JSONDataFormOld: any = {};
  TemplateFormOld: any = {};
  TemplateFormNew: any = {};
  MaskTypeMasterList: any;
  MaskTypeM: any = [];
  maskLength: any = {};
  isLesserThanMaxLength: boolean = true;
  displayLength: string;
  startPositionText: any;
  endPositionText: any;
  isMaxDelimiterDataForm: boolean;
  isMaxxmlDataForm: boolean;
  isMaxJSONDataForm: boolean;
  finalPosition: any;
  isMaxtextFieldDataModelForm: boolean;
  isMaxtextFieldDataModelFormSecond: boolean;
  comingValue: any;
  maskTypeDum: any;
  // initialFalse: boolean = true

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location) {

    this.user = this.common.getUser();
    this.role = this.common.getRole();


    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.isMainChecker = this.common.getMainMenu().isMainChecker;

    // ListServices 
    this.common.showLoading();
    this.apiService.post(this.constantsService.listServicesDropdown, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading()
      this.listServices = succ ? succ.data: [];

    }, err => {
      this.common.hideLoading()


    }
    )

    console.log("parmater");
  }



  changeField(event, pattern, min, limitTo, id) {

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
  }

  

  ngOnInit() {

    this.apiService.post(this.constantsService.listMaskTypeMasterr, {}).subscribe((succ: any) => {
      if (succ.code === 200) {
        this.MaskTypeM = succ.data;
        this.common.hideLoading();
      }
    }, err => {
      console.log(err + "err")
      this.common.hideLoading();
    })
    this.apiService.post(this.constantsService.listMaskTypeAll, {}).subscribe((succ: any) => {
      if (succ.code === 200) {
        this.MaskTypeMasterList = succ.data;
        this.common.hideLoading();
      }
    }, err => {
      console.log(err + "err")
      this.common.hideLoading();
    })
   


    this.Edit = false

    this.upperField = true
    myMethod();
    selectSearchMethod();
    this.textFieldDataModelForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      fieldPosition: ['', Validators.required],
      startPosition: ['', Validators.required],
      endPosition: ['', Validators.required],
      dataType: ['', Validators.required],
      maskType: [''],
    })

    this.textFieldDataModelForm.patchValue(this.textFieldDataModelForm)


    this.textDelimiterDataForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      fieldPosition: ['', Validators.required],
      maxLength: ['', Validators.required],

      dataType: ['', Validators.required],
      maskType: [''],
    })

    this.textDelimiterDataForm.patchValue(this.textDelimiterDataForm)

    this.xmlDataForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      tagName: ['', Validators.required],
      maxLength: ['', Validators.required],

      dataType: ['', Validators.required],
      maskType: [''],
    })

    this.xmlDataForm.patchValue(this.xmlDataForm)


    this.JSONDataForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      keyName: ['', Validators.required],
      maxLength: ['', Validators.required],

      dataType: ['', Validators.required],
      maskType: [''],
    })

    this.JSONDataForm.patchValue(this.JSONDataForm)


    this.TemplateForm = this.formBuilder.group({
      serviceId: ['', Validators.required],
      apiType: ['', Validators.required],
      apiName: ['', Validators.required],
      delimeter: ['', spaceValidator]
    });

    this.TemplateForm.patchValue(this.TemplateForm)



    this.apiService.post(this.constantsService.listAllApiForTempParam, {}).subscribe((succ: any) => {
      // this.common.hideLoading();
      // this.TemplateForm.get('apiName').setValidators(Validators.required);

      this.common.hideLoading()

      if (succ.code == 200) {

        this.api = succ.data.apiType
        this.apiName = succ.data.apiName
        
      }
      else {
        this.common.hideLoading()

        this.common.showErrorMessage(succ.message)
      }


    }, err => {
      this.common.hideLoading()

    })





    this.edit = this.common.getEditTemplateParams()
    if (_.isEmpty(this.edit)) {

      this.temp.status = "new";


    } else {
      if (this.edit.status == 1) {
        this.temp.status = 'draft';
        this.Edit = true
        this.TemplateForm.controls['serviceId'].enable();

        this.getNonApproveData();
      }
      if (this.edit.status == 2) {
        this.temp.status = 'edit';
        this.upperField = false
        this.getApprovedData();
        this.TemplateForm.controls['serviceId'].disable();
      }
      if (this.edit.status == 3) {
        this.TemplateForm.disable();
        this.upperField = false
        this.temp.status = 'approveOrReject';
        this.getNonApproveData();
      }
      if (this.edit.status == 4) {
        this.TemplateForm.disable();
        this.upperField = false
        this.temp.status = 'reject';
        this.getNonApproveData();
      }
      if (this.edit.status == 5) {
        this.upperField = false
        this.temp.status = 'reopen';
        this.getNonApproveData();
      }
    }
  }


  getMaskLengthDelimiter($event) {
    console.log($event.target.value, "default maskLength")
    let comingValue = $event.target.value
    if(this.maskTypeDum === "1" || this.maskTypeDum === "2"){
      if (JSON.stringify(this.maskLength) != comingValue) {
      this.isLesserThanMaxLength = false;
      this.textDelimiterDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
      this.textDelimiterDataForm.get('maxLength').updateValueAndValidity();

    } else {
      this.isLesserThanMaxLength = true;

      this.textDelimiterDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
      this.textDelimiterDataForm.get('maxLength').updateValueAndValidity();
    }
  }else{
    
    this.isLesserThanMaxLength = true;
    this.textDelimiterDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
    this.textDelimiterDataForm.get('maxLength').updateValueAndValidity();
  }

  }



  
  getMaskTypes($event, value) {
    if (value === 1) {
      this.isMaxtextFieldDataModelForm = false
      this.isMaxtextFieldDataModelFormSecond = false

    }
    if (value === 2) {
      this.isMaxDelimiterDataForm = false
      this.textDelimiterDataForm.controls['maxLength'].reset()

    } if (value === 3) {
      this.isMaxxmlDataForm = false
      this.xmlDataForm.controls['maxLength'].reset()

    } if (value === 4) {
      this.isMaxJSONDataForm = false
      this.JSONDataForm.controls['maxLength'].reset()

    }

    if($event === null){
      this.comingValue = "0"
      this.maskLength = "0"
      this.displayLength = "0"
      this.maskTypeDum = "0"
    }else{
    for (let i = 0; i < this.MaskTypeMasterList.length; i++) {
      let maskType = this.MaskTypeMasterList[i].id
      
      if($event.target === undefined){
        this.comingValue = JSON.parse($event)
      }else{
        this.comingValue = JSON.parse($event.target.value)

      }
      if (this.comingValue === maskType) {
        this.maskLength = this.MaskTypeMasterList[i].totalLength
        console.log(this.maskLength, "maskLength")
        this.displayLength = this.MaskTypeMasterList[i].totalLength
        this.maskTypeDum = this.MaskTypeMasterList[i].maskType

      }
    
    }
  }
    console.log(this.displayLength, "displayLength")
    console.log(this.maskTypeDum, "maskTypeDum")


  }

  getMaskLengthXml($event) {
    console.log($event.target.value, "default maskLength")
    let comingValue = $event.target.value
    if(this.maskTypeDum === "1" || this.maskTypeDum === "2"){

    if (JSON.stringify(this.maskLength) != comingValue) {
      this.isLesserThanMaxLength = false;
      this.xmlDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
      this.xmlDataForm.get('maxLength').updateValueAndValidity();

    } else {
      this.isLesserThanMaxLength = true;
      this.xmlDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
      this.xmlDataForm.get('maxLength').updateValueAndValidity();
    }
  } else {
    this.isLesserThanMaxLength = true;
    this.xmlDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
    this.xmlDataForm.get('maxLength').updateValueAndValidity();
  }

  }

  
  getMaskLengthJson($event) {
    console.log($event.target.value, "default maskLength")
    let comingValue = $event.target.value
if(this.maskTypeDum === "1" || this.maskTypeDum === "2"){
    if (JSON.stringify(this.maskLength) != comingValue) {
      this.isLesserThanMaxLength = false;
      this.JSONDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
      this.JSONDataForm.get('maxLength').updateValueAndValidity();

    } else {
      this.isLesserThanMaxLength = true;
      this.JSONDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
      this.JSONDataForm.get('maxLength').updateValueAndValidity();
    }
  } else {
    this.isLesserThanMaxLength = true;
    this.JSONDataForm.get('maxLength').setValidators([this.validateUserIdUnique()])
    this.JSONDataForm.get('maxLength').updateValueAndValidity();
  }
  }



  startPositione($event) {
    this.startPositionText = $event.target.value
    this.isMaxtextFieldDataModelFormSecond = false


  }

  endPositione($event) {
    this.endPositionText = $event.target.value
    if (this.startPositionText <= 1) {
      // return null
      this.finalPosition = JSON.parse(this.endPositionText)
      this.finalLength()


    } else {
      this.finalPosition = this.endPositionText - this.startPositionText
      console.log(this.finalPosition, "this.finalPosition");
      this.finalLength()

    }
  }
  finalLength() {
    if(this.maskTypeDum === "1" || this.maskTypeDum === "2"){

    if (this.maskLength === this.finalPosition) {
      this.isLesserThanMaxLength = true;
      this.textFieldDataModelForm.get('endPosition').setValidators([this.validateUserIdUnique()])
      this.textFieldDataModelForm.get('endPosition').updateValueAndValidity();

    } else {
      this.isLesserThanMaxLength = false;
      this.textFieldDataModelForm.get('endPosition').setValidators([this.validateUserIdUnique()])
      this.textFieldDataModelForm.get('endPosition').updateValueAndValidity();
    }
  }
  else {
    this.isLesserThanMaxLength = false;
    this.textFieldDataModelForm.get('endPosition').setValidators([this.validateUserIdUnique()])
    this.textFieldDataModelForm.get('endPosition').updateValueAndValidity();
  }


  }


  private validateUserIdUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      if (this.isLesserThanMaxLength != false) {
        return null
      }
      return { 'alreadyExist': true }
    }
  }

  apiType($event) {




    if ($event.target.value != "FTP") {
      // alert("ftp")
      this.TemplateForm.get('apiName').setValidators(Validators.required);
      this.TemplateForm.get('apiName').updateValueAndValidity();

    }
    else {
      //  alert("not ftp")
      this.TemplateForm.get('apiName').clearValidators();
      this.TemplateForm.get('apiName').updateValueAndValidity();


    }

  }



  getApprovedData() {
    this.Edit = false
    // this.common.showLoading();
    // let serviceId = JSON.parse(this.edit.serviceId);
    this.apiService.post(this.constantsService.regEdiTemplateParameters, this.edit).subscribe((succ: any) => {
      // this.common.hideLoading();
      this.common.hideLoading()

      if (succ.code == 200) {

        this.templateObj = succ.data


        if (this.templateObj.dataModel == 'text') {

          this.textFieldDataModel = JSON.parse(this.templateObj.textFieldData)
          this.JSONDataForm.disable()
          this.textDelimiterDataForm.disable();
          this.xmlDataForm.disable();
          this.openAccordion11()
          this.openAccordion1()



        } else if (this.templateObj.dataModel == 'delimeter') {

          this.textDelimiterDataModel = JSON.parse(this.templateObj.delimiterData)
          this.JSONDataForm.disable()
          this.textFieldDataModelForm.disable();
          this.xmlDataForm.disable();
          this.openAccordion2()
          this.openAccordion22()
          this.templateObj.isDelimeter = true
          this.templateObj.delimeter = this.textDelimiterDataModel[0].delimeter


        } else if (this.templateObj.dataModel == 'xml') {

          this.xmlDataModel = JSON.parse(this.templateObj.xmlData)
          this.JSONDataForm.disable()
          this.textFieldDataModelForm.disable();
          this.textDelimiterDataForm.disable();
          this.openAccordion3()
          this.openAccordion33()



        } else if (this.templateObj.dataModel == 'json') {

          this.JSONDataModel = JSON.parse(this.templateObj.jsonData)
          this.textFieldDataModelForm.disable();
          this.textDelimiterDataForm.disable();
          this.xmlDataForm.disable();
          this.openAccordion4()
          this.openAccordion44()


        }
        setTimeout(() => {

          //TemplateForm
          //TemplateForm
          //TemplateForm
          this.TemplateFormOld = this.TemplateForm.value

          this.TemplateForm.valueChanges.subscribe(value => {


            this.TemplateFormNew = value
          });




          //JSONDataForm
          //JSONDataForm
          //JSONDataForm
          this.JSONDataFormOld = this.JSONDataForm.value

          this.JSONDataForm.valueChanges.subscribe(value => {


            this.JSONDataFormNew = value
          });



          //xmlDataForm
          //xmlDataForm
          //xmlDataForm
          this.xmlDataFormOld = this.xmlDataForm.value

          this.xmlDataForm.valueChanges.subscribe(value => {


            this.xmlDataFormNew = value
          });


          //textFieldDataModelForm
          //textFieldDataModelForm
          //textFieldDataModelForm
          this.textFieldDataModelFormOld = this.textFieldDataModelForm.value

          this.textFieldDataModelForm.valueChanges.subscribe(value => {


            this.textFieldDataModelFormNew = value
          });


          //textDelimiterDataForm
          //textDelimiterDataForm
          //textDelimiterDataForm
          this.textDelimiterDataFormOld = this.textDelimiterDataForm.value

          this.textDelimiterDataForm.valueChanges.subscribe(value => {


            this.textDelimiterDataFormNew = value
          });
        }, 2000);


      }
      else {
        this.common.hideLoading()

        this.common.showErrorMessage(succ.message)
      }


    }, err => {
      this.common.hideLoading()

    })
  }
  openAccordion1() {
    $(function () {
      // $('#collapseone').addClass('in');
    });

  }
  openAccordion2() {
    $(function () {
      // $('#collapsetwo').addClass('in');
    });

  }
  openAccordion3() {
    $(function () {
      // $('#collapsethree').addClass('in');
    });

  } openAccordion4() {
    $(function () {
      // $('#collapseFour').addClass('in');
    });

  }

  openAccordion11() {
    $(function () {
      $('#back').addClass('backcolor');
      $('#roundButton').addClass('roundColor');
      // $('#roundButton').addClass('roundColor');


    });
  }

  openAccordion22() {
    $(function () {
      $('#back2').addClass('backcolor');
      $('#roundButton2').addClass('roundColor');
    });
  }

  openAccordion33() {
    $(function () {
      $('#back3').addClass('backcolor');
      $('#roundButton3').addClass('roundColor');
    });
  }
  openAccordion44() {
    $(function () {
      $('#back4').addClass('backcolor');
      $('#roundButton4').addClass('roundColor');
    });
  }
  getNonApproveData() {
    // this.Edit = true
    // this.common.showLoading();
    this.apiService.post(this.constantsService.getApproveData, this.edit).subscribe((succ: any) => {

      // this.common.hideLoading();
      if (succ.code == 200) {
        let newValue = JSON.parse(succ.data.new_DTLS);

        this.templateObj = newValue
        this.templateObj.wfId = succ.data.wf_ID

        if (this.templateObj.dataModel == 'text') {

          this.textFieldDataModel = JSON.parse(this.templateObj.textFieldData)

          this.openAccordion1()
          this.openAccordion11()
          if (this.temp.status == 'approveOrReject' || this.temp.status == 'reject') {
            this.JSONDataForm.disable()
            this.textDelimiterDataForm.disable();
            this.xmlDataForm.disable();
            this.textFieldDataModelForm.disable();
          }
          if (this.temp.status == 'draft' || this.temp.status == 'reopen') {
            this.JSONDataForm.disable()
            this.textDelimiterDataForm.disable();
            this.xmlDataForm.disable();
            this.textFieldDataModelForm.enable();
          }


        } else if (this.templateObj.dataModel == 'delimeter') {
          this.textDelimiterDataModel = JSON.parse(this.templateObj.delimiterData)

          this.openAccordion2()
          this.openAccordion22()
          this.templateObj.isDelimeter = true
          if (this.temp.status == 'approveOrReject' || this.temp.status == 'reject') {
            this.JSONDataForm.disable()
            this.textFieldDataModelForm.disable();
            this.xmlDataForm.disable();
            this.textDelimiterDataForm.disable();
          }
          if (this.temp.status == 'draft' || this.temp.status == 'reopen') {
            this.JSONDataForm.disable()
            this.textFieldDataModelForm.disable();
            this.xmlDataForm.disable();
            this.textDelimiterDataForm.enable();
          }

          this.templateObj.delimeter = this.textDelimiterDataModel[0].delimeter
        } else if (this.templateObj.dataModel == 'xml') {
          this.xmlDataModel = JSON.parse(this.templateObj.xmlData)

          this.openAccordion3()
          this.openAccordion33()
          if (this.temp.status == 'approveOrReject' || this.temp.status == 'reject') {
            this.JSONDataForm.disable()
            this.textFieldDataModelForm.disable();
            this.textDelimiterDataForm.disable();
            this.xmlDataForm.disable();
          }
          if (this.temp.status == 'draft' || this.temp.status == 'reopen') {

            this.JSONDataForm.disable()
            this.textFieldDataModelForm.disable();
            this.textDelimiterDataForm.disable();
            this.xmlDataForm.enable();
          }


        } else if (this.templateObj.dataModel == 'json') {
          this.JSONDataModel = JSON.parse(this.templateObj.jsonData)
          this.openAccordion4()
          this.openAccordion44()

          if (this.temp.status == 'approveOrReject' || this.temp.status == 'reject') {
            this.JSONDataForm.disable();
            this.textFieldDataModelForm.disable();
            this.textDelimiterDataForm.disable();
            this.xmlDataForm.disable();

          }
          if (this.temp.status == 'draft' || this.temp.status == 'reopen') {
            this.JSONDataForm.enable();
            this.textFieldDataModelForm.disable();
            this.textDelimiterDataForm.disable();
            this.xmlDataForm.disable();

          }


        }

        // this.textFieldDataModelForm.disable();
        // this.textDelimiterDataForm.disable();
        // this.xmlDataForm.disable();
        // this.JSONDataForm.disable();

        // $("#accordion").accordion({  event: "mouseover" }).activate(3);


        // this.addTextFieldLengthFormFields(sam);

      } else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)

    })
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


      if (_.isEmpty(this.textDelimiterDataFormNew)) {
        this.textDelimiterDataFormNew = this.textDelimiterDataFormOld
      }
      else {
        this.textDelimiterDataFormNew = this.textDelimiterDataFormNew
      }





      if (_.isEmpty(this.textFieldDataModelFormNew)) {
        this.textFieldDataModelFormNew = this.textFieldDataModelFormOld
      }
      else {
        this.textFieldDataModelFormNew = this.textFieldDataModelFormNew
      }





      if (_.isEmpty(this.xmlDataFormNew)) {
        this.xmlDataFormNew = this.xmlDataFormOld
      }
      else {
        this.xmlDataFormNew = this.xmlDataFormNew
      }






      if (_.isEmpty(this.JSONDataFormNew)) {
        this.JSONDataFormNew = this.JSONDataFormOld
      }
      else {
        this.JSONDataFormNew = this.JSONDataFormNew
      }





      if (_.isEmpty(this.TemplateFormNew)) {
        this.TemplateFormNew = this.TemplateFormOld
      }
      else {
        this.TemplateFormNew = this.TemplateFormNew
      }






      if (_.isEqual(this.textDelimiterDataFormOld, this.textDelimiterDataFormNew) && _.isEqual(this.textFieldDataModelFormOld, this.textFieldDataModelFormNew)
        && _.isEqual(this.xmlDataFormOld, this.xmlDataFormNew) && _.isEqual(this.JSONDataFormOld, this.JSONDataFormNew) && _.isEqual(this.TemplateFormOld, this.TemplateFormNew)) {
        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        // return;
      } else {


        if (this.textFieldDataModel.length == 0 && this.textDelimiterDataModel == 0 && this.xmlDataModel.length == 0 && this.JSONDataModel == 0) {
          this.common.showErrorMessage("DataModel is must ")
          return;

        }

        if (this.templateObj.dataModel == 'text') {
          if(_.isEmpty(this.textFieldDataModel[0].maskType)){
            this.textFieldDataModel[0].maskType = "0"
          }
          this.templateObj.textFieldData = JSON.stringify(this.textFieldDataModel)


        } else if (this.templateObj.dataModel == 'delimeter') {
          this.textDelimiterDataModel[0].delimeter = this.templateObj.delimeter;
          if(_.isEmpty(this.textDelimiterDataModel[0].maskType)){
            this.textDelimiterDataModel[0].maskType = "0"
          }
          this.templateObj.delimiterData = JSON.stringify(this.textDelimiterDataModel)
        } else if (this.templateObj.dataModel == 'xml') {
          if(_.isEmpty(this.xmlDataModel[0].maskType)){
            this.xmlDataModel[0].maskType = "0"
          }
          this.templateObj.xmlData = JSON.stringify(this.xmlDataModel)
        } else if (this.templateObj.dataModel == 'json') {
          if(_.isEmpty(this.JSONDataModel[0].maskType)){
            this.JSONDataModel[0].maskType = "0"
          }
          this.templateObj.jsonData = JSON.stringify(this.JSONDataModel)
        }

        this.templateObj.isMainChecker = this.isMainChecker;

        // return
        this.common.showLoading();
        this.apiService.post(this.constantsService.updateTemplateParameters, this.templateObj).subscribe((succ: any) => {

          this.common.hideLoading()
          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.router.navigate(['../home/service-management/']);
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
      return;
    }
    else {

      if (this.textFieldDataModel.length == 0 && this.textDelimiterDataModel == 0 && this.xmlDataModel.length == 0 && this.JSONDataModel == 0) {
        this.common.showErrorMessage("DataModel is must ")
        return;

      }


      if (this.templateObj.dataModel == 'text') {
        if(_.isEmpty(this.textFieldDataModel[0].maskType)){
          this.textFieldDataModel[0].maskType = "0"
        }
        this.templateObj.textFieldData = JSON.stringify(this.textFieldDataModel)


      } else if (this.templateObj.dataModel == 'delimeter') {
        this.textDelimiterDataModel[0].delimeter = this.templateObj.delimeter;

        if(_.isEmpty(this.textDelimiterDataModel[0].maskType)){
          this.textDelimiterDataModel[0].maskType = "0"
        }

        this.templateObj.delimiterData = JSON.stringify(this.textDelimiterDataModel)
       
      } else if (this.templateObj.dataModel == 'xml') {
        if(_.isEmpty(this.xmlDataModel[0].maskType)){
          this.xmlDataModel[0].maskType = "0"
        }
        this.templateObj.xmlData = JSON.stringify(this.xmlDataModel)


      } else if (this.templateObj.dataModel == 'json') {
        if(_.isEmpty(this.JSONDataModel[0].maskType)){
          this.JSONDataModel[0].maskType = "0"
        }
        this.templateObj.jsonData = JSON.stringify(this.JSONDataModel)

        
      }

      this.templateObj.isMainChecker = this.isMainChecker;

      // return
      this.common.showLoading();
      this.apiService.post(this.constantsService.regTemplateParameters, this.templateObj).subscribe((succ: any) => {

        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/service-management/']);
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



  approve(data) {
    let url = ""
    if (data == 'reject') {
      if (!this.templateObj.reason) {
        this.common.showErrorMessage("Reason is must for reject");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.rejectTemplateParameters
    } else if (data == 'approve') {
      url = this.constantsService.approveTemplateParameters
    }
    if (data == 'reopen') {
      if (!this.templateObj.reason) {
        this.common.showErrorMessage("Reason is must for reopen");
        this.errReasonMsg = true;
        return;
      }
      url = this.constantsService.reopenTemplateParameterss
    }


    this.common.showLoading()
    this.apiService.post(url, { wfId: this.templateObj.wfId, reason: this.templateObj.reason }).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.back();
        this.ngOnInit();
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
  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
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
      if (this.textFieldDataModel.length == 0 && this.textDelimiterDataModel == 0 && this.xmlDataModel.length == 0 && this.JSONDataModel == 0) {
        this.common.showErrorMessage("DataModel is must ")
        return;
      }


      if (this.templateObj.dataModel == 'text') {
        this.templateObj.textFieldData = JSON.stringify(this.textFieldDataModel)
      } else if (this.templateObj.dataModel == 'delimeter') {
        this.textDelimiterDataModel[0].delimeter = this.templateObj.delimeter;

        this.templateObj.delimiterData = JSON.stringify(this.textDelimiterDataModel)
      } else if (this.templateObj.dataModel == 'xml') {
        this.templateObj.xmlData = JSON.stringify(this.xmlDataModel)
      } else if (this.templateObj.dataModel == 'json') {
        this.templateObj.jsonData = JSON.stringify(this.JSONDataModel)
      }

      this.templateObj.isMainChecker = this.isMainChecker;
      this.templateObj.createdTime = "";
      if (_.isEmpty(this.edit)) {
        this.templateObj.statusFilter = 1
      } else {
        this.templateObj.statusFilter = this.edit.status;
      }


      // return;


      // this.templateObj.textFieldData = JSON.stringify(this.TemplateForm.value.textFieldData)
      // this.templateObj.delimiterData = JSON.stringify(this.TemplateForm.value.delimiterData)
      // this.templateObj.xmlData = JSON.stringify(this.TemplateForm.value.xmlData)
      // this.templateObj.jsonData = JSON.stringify(this.TemplateForm.value.jsonData)

      this.apiService.post(this.constantsService.saveTemplateParametersDrafts, this.templateObj).subscribe((succ: any) => {

        this.common.hideLoading()
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/service-management/']);
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
  addTextFieldForm(i) {


    if (i == 0) {
      if (this.textFieldDataModelForm.invalid) {
        this.textFieldDataModelForm.markAllAsTouched();
        return;
      }

      this.textFieldDataModel.push(this.textFieldDataModelForm.value)
      this.showTextFieldForm = false
      this.textFieldDataModelForm.reset();


    }
    if (i == 1) {
      this.showTextFieldForm = true
      if (this.textFieldDataModelForm.invalid) {
        this.textFieldDataModelForm.markAllAsTouched();
        return;
      }
      this.textFieldDataModel.push(this.textFieldDataModelForm.value)

      this.textFieldDataModelForm.reset();
    }


    // if (this.textFieldDataModelForm.invalid) {
    //   this.textFieldDataModelForm.markAllAsTouched();
    //   return;
    // }
    // this.textFieldDataModel.push(this.textFieldDataModelForm.value)

    // this.textFieldDataModelForm.reset();

  }
  editTextFieldDataModel(data) {
    data.isEdit = true;
    data.id = Math.random();
    this.textFieldDataModelForm.reset();
    this.showTextFieldForm = false;
    this.textFieldDataModelForm.setValue(data);



  }
  updateTextFieldForm(data) {

    for (let i = 0; i < this.textFieldDataModel.length; i++) {
      if (this.textFieldDataModel[i].id == data.id) {
        this.textFieldDataModel[i] = this.textFieldDataModelForm.getRawValue();
      }
    }
    this.textFieldDataModelForm.reset();

    data.isEdit = false;
    this.showTextFieldForm = false;
  }
  deleteTextFieldDataModel(data) {

    for (let i = 0; i < this.textFieldDataModel.length; i++) {
      if (this.textFieldDataModel[i] == data) {
        this.textFieldDataModel.splice(i, 1);
      }
    }
  }
  // delimeter


  addDelimeterForm(i) {

    if (i == 0) {
      if (this.textDelimiterDataForm.invalid) {
        this.textDelimiterDataForm.markAllAsTouched();
        return;
      }

      this.textDelimiterDataModel.push(this.textDelimiterDataForm.value)
      this.showTextDelimiter = false
      this.textDelimiterDataForm.reset();
    }
    if (i == 1) {
      this.showTextDelimiter = true
      if (this.textDelimiterDataForm.invalid) {
        this.textDelimiterDataForm.markAllAsTouched();
        return;
      }
      this.textDelimiterDataModel.push(this.textDelimiterDataForm.value)

      this.textDelimiterDataForm.reset();
    }


    // if (this.textDelimiterDataForm.invalid) {
    //   this.textDelimiterDataForm.markAllAsTouched();
    //   return;
    // }
    // this.textDelimiterDataModel.push(this.textDelimiterDataForm.value)

    // this.textDelimiterDataForm.reset();

  }
  editDelimeterDataModel(data) {
    data.isEdit = true;
    data.id = Math.random();
    this.textDelimiterDataForm.reset();
    this.showTextDelimiter = false;
    console.log(data, "Delimeterdata")
    this.getMaskTypes(data.maskType, 2)
    this.textDelimiterDataForm.setValue(data);



  }
  updateDelimeterForm(data) {

    for (let i = 0; i < this.textDelimiterDataModel.length; i++) {
      if (this.textDelimiterDataModel[i].id == data.id) {
        this.textDelimiterDataModel[i] = this.textDelimiterDataForm.getRawValue();
      }
    }
    this.textDelimiterDataForm.reset();

    data.isEdit = false;
    this.showTextDelimiter = false;
  }
  deleteDelimeterDataModel(data) {

    for (let i = 0; i < this.textDelimiterDataModel.length; i++) {
      if (this.textDelimiterDataModel[i] == data) {
        this.textDelimiterDataModel.splice(i, 1);
      }
    }
  }
  // xml data

  addXMLForm(i) {

    if (i == 0) {
      if (this.xmlDataForm.invalid) {
        this.xmlDataForm.markAllAsTouched();
        return;
      }

      this.xmlDataModel.push(this.xmlDataForm.value)
      this.showTextxml = false
      this.xmlDataForm.reset();
    }
    if (i == 1) {
      this.showTextxml = true
      if (this.xmlDataForm.invalid) {
        this.xmlDataForm.markAllAsTouched();
        return;
      }
      this.xmlDataModel.push(this.xmlDataForm.value)

      this.xmlDataForm.reset();
    }

    // if (this.xmlDataForm.invalid) {
    //   this.xmlDataForm.markAllAsTouched();
    //   return;
    // }
    // this.xmlDataModel.push(this.xmlDataForm.value)

    // this.xmlDataForm.reset();

  }
  editXMLModel(data) {
    data.isEdit = true;
    data.id = Math.random();
    this.xmlDataForm.reset();
    this.showTextxml = false;
    console.log(data, "xmldata")
    this.getMaskTypes(data.maskType, 3)
    this.xmlDataForm.setValue(data);



  }
  updateXMLForm(data) {

    for (let i = 0; i < this.xmlDataModel.length; i++) {
      if (this.xmlDataModel[i].id == data.id) {
        this.xmlDataModel[i] = this.xmlDataForm.getRawValue();
      }
    }
    this.xmlDataForm.reset();

    data.isEdit = false;
    this.showTextxml = false;
  }
  deleteXMLModel(data) {

    for (let i = 0; i < this.xmlDataModel.length; i++) {
      if (this.xmlDataModel[i] == data) {
        this.xmlDataModel.splice(i, 1);
      }
    }
  }

  // JSON data

  addJSONForm(i) {

    if (i == 0) {
      if (this.JSONDataForm.invalid) {
        this.JSONDataForm.markAllAsTouched();
        return;
      }

      this.JSONDataModel.push(this.JSONDataForm.value)
      this.showTextJSON = false
      this.JSONDataForm.reset();
    }
    if (i == 1) {
      this.showTextJSON = true
      if (this.JSONDataForm.invalid) {
        this.JSONDataForm.markAllAsTouched();
        return;
      }
      this.JSONDataModel.push(this.JSONDataForm.value)

      this.JSONDataForm.reset();
    }
    // if (this.JSONDataForm.invalid) {
    //   this.JSONDataForm.markAllAsTouched();
    //   return;
    // }
    // this.JSONDataModel.push(this.JSONDataForm.value)

    // this.JSONDataForm.reset();

  }
  editJSONModel(data) {
    data.isEdit = true;
    data.id = Math.random();
    this.JSONDataForm.reset();
    this.showTextJSON = false;
    console.log(data, "JSNdata")
    this.getMaskTypes(data.maskType, 4)
    this.JSONDataForm.setValue(data);



  }
  updateJSONForm(data) {

    for (let i = 0; i < this.JSONDataModel.length; i++) {
      if (this.JSONDataModel[i].id == data.id) {
        this.JSONDataModel[i] = this.JSONDataForm.getRawValue();
      }
    }
    this.JSONDataForm.reset();

    data.isEdit = false;
    this.showTextJSON = false;
  }
  deleteJSONModel(data) {

    for (let i = 0; i < this.JSONDataModel.length; i++) {
      if (this.JSONDataModel[i] == data) {
        this.JSONDataModel.splice(i, 1);
      }
    }
  }
  showAccordion(title, data) {

    this.templateObj.dataModel = title;
    if (title == 'text' && data != 'edit') {
      this.textFieldDataModel = []
      this.textFieldDataModelForm.reset();
      this.templateObj.isDelimeter = false;
      this.TemplateForm.get('delimeter').reset();
      this.TemplateForm.get('delimeter').clearValidators();
      this.TemplateForm.get('delimeter').updateValueAndValidity();
    } else if (title == 'delimeter' && data != 'edit') {
      this.textDelimiterDataModel = []
      this.textDelimiterDataForm.reset();
      this.templateObj.isDelimeter = true;
      this.TemplateForm.get('delimeter').reset();

      this.TemplateForm.get('delimeter').setValidators([Validators.required, spaceValidator, specialCharacters])
      this.TemplateForm.get('delimeter').updateValueAndValidity();

    } else if (title == 'xml' && data != 'edit') {
      this.xmlDataModel = []
      this.xmlDataForm.reset();
      this.templateObj.isDelimeter = false;
      this.TemplateForm.get('delimeter').reset();

      this.TemplateForm.get('delimeter').clearValidators();
      this.TemplateForm.get('delimeter').updateValueAndValidity();
    } else if (title == 'json' && data != 'edit') {
      this.JSONDataModel = []
      this.JSONDataForm.reset();
      this.templateObj.isDelimeter = false;
      this.TemplateForm.get('delimeter').reset();

      this.TemplateForm.get('delimeter').clearValidators();
      this.TemplateForm.get('delimeter').updateValueAndValidity();
    }
    // this.TemplateForm.controls["delimeter"].updateValueAndValidity();
  }

  validateParam(notiId) {

    this.common.setEditService(notiId)
    this.reqObj["serviceId"] = notiId
    this.common.showLoading();
    this.apiService.post(this.constantsService.validateExistTemplateParameters, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading()
      if (succ.code != 200) {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      this.common.hideLoading()

    }
    )
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

  getMaskName(id) {
    let maskNAmes = this.MaskTypeM.filter(
      maskName => {
        if (maskName.id === parseInt(id)) {
          return maskName
        }

      })
    if (maskNAmes.length) {
      return maskNAmes[0].maskTypes
    }
  }
}


