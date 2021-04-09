import { Component, OnInit, OnDestroy, ElementRef, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { CountryService } from 'src/service/country.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as moment from 'moment';
import { TooltipLabel } from 'ngx-intl-tel-input';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit, OnDestroy {

  CompanyForm: FormGroup;
  ContactForm: FormGroup;
  user: any = {};
  listGroups: any = [];
  listDepartments = [];
  listBranchs = [];
  theCheckbox: boolean = false;
  selectedAll = false;
  marked = false;
  isFavorite: boolean = false;
  UserId: any;
  sessionId: any;
  selectedRoles: any[];
  companyId: any;
  Edit: boolean = false;

  Imglogo: boolean = false;
  compObj: any = {
    userType: "Company",
    isDetails: true,
    isContact: false,
    isParameter: false,
    isTheme: false,
    companyDomain: "BFSI",
    maxNoBranches: 1,
    maxNoUsers: 1,
    customerSubscription: "Prepaid",
    language: [],
    internationalCountryCode: []
  };
  edit: any;
  getcompanyDetails: any;
  EditcompObj: any;
  compObjselectedGroups: any;


  listCountryCode = [];
  // listCorporate: any;
  reqObj = {
    "searchText": "",
    "noOfRecords": 1000,
    "pageIndex": 1,



  }
  companyContact: any = {

  }

  listCity = [];
  color: any = ""
  // mainPages: any = []


  // contact form
  contactList: any = []
  themesList: any = [
    {
      color: "red",
      active: 0,
    }
  ];
  themeForm: FormGroup;
  isUniqueUserId: boolean = true;
  AcceptfileFormat: any = ['.jpeg', '.png', '.jpg'];

  AcceptDocFormat: any = ['.pdf', '.xls', '.xlsx', '.txt', '.csv', '.doc', '.docx', '.html', '.ppt', '.pptx'];
  APNSDocFormat: any = ['.p12'];

  showContact: boolean = false;
  isContactActive: boolean = false;



  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];

  selectedCorpPreMobileNo = "in"
  selectedCorpContactPreMobileNo = "in"
  selectedCorpContactWorkPre = "in"
  imageChangedEvent: Event;
  croppedImage: string;
  cmpId: any;


  companyDomain: any = [
    {
      id: 1,
      name: "BFSI"
    },
    {
      id: 2,
      name: "GOVT"
    },
    {
      id: 3,
      name: "HOSPITALITY"
    },
    {
      id: 4,
      name: "SERVICES"
    },
    {
      id: 5,
      name: "IT"
    },
    {
      id: 6,
      name: "OTHERS"
    }
  ]
  parameterDetails: any = [{ "id": 3968, "propertyId": 1, "propertyValue": "[{\"channelId\":1,\"channelDesc\":\"SMS\",\"companyId\":0,\"isChecked\":true,\"creditLimit\":\"50\",\"thresholdValue\":7,\"thresholdType\":\"Absolute\"},{\"channelId\":2,\"channelDesc\":\"Email\",\"companyId\":0,\"isChecked\":true,\"creditLimit\":\"500000\",\"thresholdType\":\"Absolute\",\"thresholdValue\":50000},{\"channelId\":3,\"channelDesc\":\"Push Notification\",\"companyId\":0,\"isChecked\":true,\"creditLimit\":\"70\",\"thresholdValue\":10,\"thresholdType\":\"Absolute\"}]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.497+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3724, "propertyId": 2, "propertyValue": "false", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3725, "propertyId": 3, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3726, "propertyId": 4, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3727, "propertyId": 5, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3728, "propertyId": 6, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3729, "propertyId": 7, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3730, "propertyId": 8, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3731, "propertyId": 9, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3732, "propertyId": 10, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3733, "propertyId": 11, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3734, "propertyId": 12, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3735, "propertyId": 13, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3736, "propertyId": 14, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3737, "propertyId": 15, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3738, "propertyId": 16, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3739, "propertyId": 17, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3740, "propertyId": 18, "propertyValue": "[{\"mobileName\":\"22\",\"serverKey\":\"00\",\"mobileId\":1605673743471,\"isFCM\":true,\"isNew\":true,\"isUpdate\":false,\"bundleId\":\"\",\"password\":\"\",\"fileName\":\"\",\"filePart\":\"\",\"isDownload\":false,\"companyCode\":\"256474\"}]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3741, "propertyId": 19, "propertyValue": "[]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3742, "propertyId": 20, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3743, "propertyId": 21, "propertyValue": "1", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3744, "propertyId": 22, "propertyValue": "1", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3745, "propertyId": 23, "propertyValue": "BFSI", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3746, "propertyId": 24, "propertyValue": "[{\"isDefault\":1,\"langDesc\":\"English\",\"id\":2}]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3747, "propertyId": 25, "propertyValue": "Prepaid", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3748, "propertyId": 26, "propertyValue": "UTC +04:30", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3749, "propertyId": 27, "propertyValue": null, "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3750, "propertyId": 28, "propertyValue": "false", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3751, "propertyId": 29, "propertyValue": "[]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3752, "propertyId": 30, "propertyValue": "{\"startTime\":\"9:59 AM\",\"endTime\":\"9:50 AM\"}", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3753, "propertyId": 31, "propertyValue": "false", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3754, "propertyId": 32, "propertyValue": "false", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3755, "propertyId": 33, "propertyValue": "[{\"componentDown\":\"false\",\"users\":\"[]\"}]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3756, "propertyId": 34, "propertyValue": "false", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }, { "id": 3757, "propertyId": 35, "propertyValue": "[{\"passExpiry\":\"true\",\"daysBefore\":\"3\"}]", "companyId": 141, "createdTime": "2020-11-18T04:32:11.530+0000", "createdBy": "Administrator", "modifiedTime": "2020-11-18T10:08:16.507+0000", "modifiedBy": "Administrator" }];
  parameterForm: FormGroup;




  listChannelId: any = [];
  listLanguageId: any;
  listZones: any = [];
  isPassordError: boolean;
  selectedChannel: any = {};
  mainMenus: any;
  showCropImage: boolean;
  allCountry: any[];
  mobileApps: any = [];
  showMakerChecker: boolean;
  role: any;
  changeStatus: any;
  isEditUser: any;
  companyDetailsJson: string;
  formChanges: boolean = false;
  selectedThreshold: any;
  isFreq: boolean;
  documentList: any = [];
  isApnsFile: any = [];
  CountryISO: any = [];
  //   dropdown:boolean = false;
  maxTextLen: number;
  getthresholdVal: any
  Checkthreshlength: boolean = false
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public countryService: CountryService) {

    this.allCounties = this.countryService.allCountries;
    this.CountryISO = this.countryService.getcountryCode();
    this.allCountry = []
    for (let i = 0; i < this.allCounties.length; i++) {
      let t = this.allCounties[i]
      let c = "+" + t[2] + " " + t[0];
      this.allCountry.push({
        name: t[0],
        code: t[1],
        countryCode: t[2],
        combinedName: c
      })

    }
    this.role = this.common.getRole();

    this.showContact = false
    this.user = this.common.getUser()

    // this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {


    // }, err => {

    // })

    this.apiService.post(this.constantsService.getCompanyMaster, {}).subscribe((succ: any) => {



      this.listChannelId = succ.data.channelMaster;
      this.listLanguageId = succ.data.languageMaster;
      this.listCountryCode = succ.data.countryMaster;
      this.compObj.countryMod = this.listCountryCode[0];

      this.listZones = succ.data.timeZoneMaster;

      let zone = succ.data.timeZoneMaster;
      for (let i = 0; i < zone.length; i++) {
        this.listZones[i].custom = "(" + zone[i].gmtOffset + ") " + zone[i].timeZone
        // this.listZones.push(zone[i]);
      }
      this.compObj.timeZone = this.listZones[0];
      this.listChannelId.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.parameterForm.controls.smsDelivery as FormArray).push(control);
      });


      this.listGroups = succ.data.defaultRoleMaster;

      this.listGroups.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.ContactForm.controls.opGroup as FormArray).push(control);
      });

    });
    this.apiService.post(this.constantsService.getMasterParam, {}).subscribe((succ: any) => {

      this.mainMenus = succ.data.menu;


      if (this.mainMenus.length) {
        this.mainMenus.forEach(menu => {
          this.addMainMenuControl(menu);
        });
      } else {
        this.addMainMenuControl();
      }

    });



    this.companyContact.isPrimaryContact = 1

    this.apiService.post(this.constantsService.listMasterSystemParameters, {}).subscribe((succ: any) => {

      if (_.isEmpty(this.edit)) {

        this.parameterDetails = succ.data;
        this.parameterDetails[20].propertyValue = 1;
        this.parameterDetails[21].propertyValue = 1;




        this.parameterDetails[32].propertyId = 33;
        this.parameterDetails[32].propertyValue = false
        this.parameterDetails[32].opId = "[]"
        let obj: any = { "componentDown": JSON.stringify(this.parameterDetails[32].propertyValue), "users": this.parameterDetails[32].opId }
        this.parameterDetails[32].propertyValue = JSON.stringify([obj])

        this.parameterDetails[33].propertyId = 34;
        this.parameterDetails[33].propertyValue = "false";


        this.parameterDetails[34].propertyId = 35;
        this.parameterDetails[34].propertyValue = false
        this.parameterDetails[34].days = "[]"
        let obj2: any = { "passExpiry": JSON.stringify(this.parameterDetails[34].propertyValue), "daysBefore": this.parameterDetails[34].days }
        this.parameterDetails[34].propertyValue = JSON.stringify([obj2])
        // this.parameterDetails[34].propertyValue = "[]";

      }

      console.log(this.parameterDetails, "this.parameterDetails")


    });


  }
  addMainMenuControl(menu?: any) {


    let fg = this.formBuilder.group({
      'menu_label': [menu.menu_label],
      'id': [menu.menu_id],
      'value': [false],
    });
    (<FormArray>this.parameterForm.get('mainMenus')).push(fg);


  }
  addContacts() {

    let obj = {
      contactName: "",
      employeeId: "",
      email: "",
      CorpPreMobileNo: "",
      CorpPreMobileNo2: "",
      workPhone: "",
      mobilePhone: "",
      fax: "",
      isSameAsPrimaryAddress: "",
      // CorpPreMobileNo: "",
      address: ""

    }

    this.showContact = true
    this.contactList.push(obj);
    this.addContactFormFields(obj);

  }

  addContactFormFields(contact) {



    let preMobile;
    let preWork;
    let mobile
    let work;
    var no = _.split(contact.mobilePhone, '-', 2);
    preMobile = no[0]
    mobile = no[1]

    var no = _.split(contact.workPhone, '-', 2);
    preWork = no[0]
    work = no[1]
    if (contact.isActive) {

    }


    if (contact.companyContactId) {
      mobile = _.split(contact.mobilePhone, '-', 2);



      let countryCode: any = this.allCounties.filter(element => {
        return element[2] == mobile[0];
      });
      countryCode = countryCode[0]
      contact.preMobileSelected = countryCode[1];

      mobile = mobile[1];


      work = _.split(contact.workPhone, '-', 2);
      countryCode = this.allCounties.filter(element => {
        return element[2] == work[0];
      });
      countryCode = countryCode[0]
      contact.preWorkPhoneSelected = countryCode[1];
      work = work[1];
    }

    let fg = this.formBuilder.group({
      'contactName': [contact.contactName, Validators.required],
      'designation': [contact.designation, Validators.required],
      'email': [contact.email, Validators.compose([Validators.email, Validators.required])],
      'CorpPreMobileNo': [mobile, Validators.required],
      'CorpPreMobileNo2': [work, Validators.required],
      'workPhone': [work],
      'mobilePhone': [mobile],
      // 'CorpPreMobileNo': [contact.CorpPreMobileNo],
      'fax': [contact.fax],
      'isSameAsPrimaryAddress': [contact.isSameAsPrimaryAddress],
      "suite": [contact.isSameAsPrimaryAddress],
      "websiteURL": [contact.websiteURL],
      'address1': [contact.address],
      'address2': [contact.address2],
      'state': [contact.address2],
      'city': [contact.address2],
      'pinCode': [contact.address2],
      'country': [contact.address2],
      'companyContactId': [contact.companyContactId],
      'companyId': [contact.companyId],
      'isActive': [1]
    });
    (<FormArray>this.ContactForm.get('contactList')).push(fg);

  }

  addColorFields(color) {
    let fg = this.formBuilder.group({
      'active': ['', Validators.required],
      'themeColor': [color.themeColor],

    });
    (<FormArray>this.themeForm.get('colorCode')).push(fg);

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


    myMethod();
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
    selectSearchMethod();

    this.parameterForm = this.formBuilder.group({
      companyDomain: ['', Validators.required],
      maxNoBranches: [1, Validators.required],
      maxNoUsers: [1, Validators.required],
      // channel: ['', Validators.required],
      language: ['', Validators.required],
      customerSubscription: ['Prepaid', Validators.required],
      timeZone: ['', Validators.required],
      twoWayAuth: [''],
      passwordPolicy: [''],
      makerChecker: [''],
      isSmsDelivery: [''],
      smsDelivery: new FormArray([], this.minSelectedCheckboxes(1)),
      mainMenus: new FormArray([]),
      creditValidation: [""],
      smsChannel: [''],
      pushChannel: [''],
      emailChannel: [''],
      passwordLength: [''],
      wrongPassword: [''],
      lowerCaseNeeded: [''],
      accountLockout: [''],
      upperCaseNeeded: [''],
      passwordExpiry: [''],
      numericsNeeded: [''],
      expiryNotification: [''],
      symbolsNeeded: [''],
      autoInactive: [''],
      isOtp: [''],
      internationalSMS: [''],
      internationalCountryCode: [''],

      smtpServerName: [''],
      fromEmail: [''],
      emailUserName: [''],
      emailPassword: [''],
      port: [''],
      noMsgStartTime: ['', Validators.required],
      noMsgEndTime: ['', Validators.required],
      ThresholdSms: [''],
      ThresholdValueSms: [''],
      ThresholdEmail: [''],
      ThresholdValueEmail: [''],
      ThresholdPush: [''],
      ThresholdValuePush: ['']
    })
    this.parameterForm.patchValue(this.parameterForm)
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.CompanyForm = this.formBuilder.group({

      userType: ['', Validators.required],
      companyName: ['', Validators.required],
      companyCode: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],

      CorpPreMobileNo: ['', Validators.required],
      fax: [''],
      suite: ['', Validators.required],

      // websiteURL: ['',Validators.compose([Validators.required,Validators.pattern('https?://.+')])],
      websiteURL: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      state: ['', Validators.required],

      city: ['', Validators.required],
      // corporateId: [''],

      pinCode: ['', Validators.required],
      country: ['', Validators.required],

    });
    this.CompanyForm.patchValue(this.CompanyForm)
    let GroupReqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }

    this.ContactForm = this.formBuilder.group({
      CorpPreMobileNo: ['', Validators.required],
      CorpPreWorkMobileNo: [''],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      designation: ['', Validators.required],
      userId: [''],
      contactName: ['', Validators.required],
      mobilePhone: [''],
      workPhone: ['', Validators.required],
      suite: [''],
      websiteURL: [''],
      address1: [''],
      address2: [''],
      state: [''],
      city: [''],
      postal: [''],
      country: [''],
      fax: [''],
      isPrimaryContact: [''],
      contactList: this.formBuilder.array([]),
      opGroup: new FormArray([], this.minSelectedCheckboxes(1)),
      selectAllGroup: ['']
    });
    this.ContactForm.patchValue(this.ContactForm)
    this.themeForm = this.formBuilder.group({

      documentList: this.formBuilder.array([]),
      theme: ['']
    });

    this.themeForm.patchValue(this.themeForm)
    function minSelectedColor(min = 1) {
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
    this.apiService.post(this.constantsService.getTheme, {}).subscribe((succ: any) => {

      this.themesList = succ.data

    }, err => {

    })
    this.edit = this.common.getEditCompany()


    if (_.isEmpty(this.edit)) {
      this.Edit = false
      this.ContactForm.controls['email'].enable();

    }
    else {

      this.CompanyForm.controls['companyCode'].disable();
      this.CompanyForm.controls['userType'].disable();
      this.ContactForm.controls['userId'].disable();




      this.Edit = true

      this.apiService.post(this.constantsService.getCompanyDocument, this.edit).subscribe((succ: any) => {
        console.log(succ);
        let documentList = succ.data;
        this.documentList = succ.data;
        if (documentList.length) {
          documentList.forEach(app => {
            this.addDocumentListForm(app);
          });
        } else {
          // this.addDocumentListForm();
        }
      });
      this.common.showLoading();
      this.apiService.post(this.constantsService.companyInfo, this.edit).subscribe((succ: any) => {
        this.common.hideLoading();
        this.getcompanyDetails = succ.data;

        this.companyDetailsJson = JSON.stringify(succ.data);

        if (succ.code == 200) {

          console.log(JSON.stringify(succ.data.systemParameters));
          this.compObj = succ.data.company
          this.compObj.isDetails = true;
          this.compObj.isContact = false;
          this.compObj.isParameter = false;
          this.compObj.isTheme = false;

          var mobile = _.split(succ.data.company.phone, '-', 2);
          this.CompanyForm.controls.CorpPreMobileNo.setValue(mobile[1]);


          let countryCode: any = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });
          countryCode = countryCode[0]
          this.selectedCorpPreMobileNo = countryCode[1];


          // country set
          let coun = this.listCountryCode.filter(element => {
            return element.countryDesc == this.compObj.country;
          });
          this.compObj.countryMod = coun[0];
          // group set
          for (var i = 0; i < this.listGroups.length; i++) {
            for (var j = 0; j < succ.data.selectedGroups.length; j++) {
              if (parseInt(succ.data.selectedGroups[j]) == this.listGroups[i].groupId) {

                this.listGroups[i].theCheckbox = true;

              }
            }
          }
          // first tab end

         
          this.colorOld = this.compObj.theme;

          this.compObj.companyImage = "data:image/png;base64," + this.compObj.logoString



          // set default value
          this.compObj.internationalCountryCode =[];

          setTimeout(() => {
            console.log("claue changes")
            this.CompanyForm.valueChanges.pipe(

            ).subscribe((change) => {

              this.formChanges = true;
              // console.log("changes made in details page")

            })
            this.ContactForm.valueChanges.pipe(

            ).subscribe((change) => {
              this.formChanges = true;

              // console.log("changes made in contact page")

            })
            this.parameterForm.valueChanges.pipe(

            ).subscribe((change) => {
              this.formChanges = true;

              // console.log("changes made in parameterForm page")

            })
            this.themeForm.valueChanges.pipe(

            ).subscribe((change) => {
              this.formChanges = true;

              // console.log("changes made in parameterForm page")

            })
          }, 2000);

        }
        else {
          this.common.showErrorMessage(succ.message)
        }

      }, err => {

      })


    }


  }
  setContactListData() {
    this.compObj.isContactDataAvailable=true;
    // second tab start
    if (this.compObj.userType == 'Company') {
      this.common.showLoading();
      this.apiService.post(this.constantsService.getCompanyContact, this.edit).subscribe((succ: any) => {
        this.common.hideLoading();
        console.log(succ);
        var contactArr = succ.data.companyContact;

        for (var i = 0; i < contactArr.length; i++) {
          // this.ContactForm.value.contactList[i].isPrimaryContact = 0;
          if (!contactArr) {
            break;
          }
          if (contactArr[i].isPrimaryContact == 1) {
            this.companyContact = contactArr[i];
            var mobile = _.split(contactArr[i].mobilePhone, '-', 2);
            if (contactArr[i].mobilePhone != null && contactArr[i].mobilePhone != undefined
              && contactArr[i].mobilePhone != "" && contactArr[i].mobilePhone != "undefined") {
              this.ContactForm.controls.CorpPreMobileNo.setValue(mobile[1]);
              // this.ContactForm.controls['email'].disable();

              let countryCode: any = this.allCounties.filter(element => {
                return element[2] == mobile[0];
              });
              countryCode = countryCode[0]
              this.selectedCorpContactPreMobileNo = countryCode[1];
            }
            if (contactArr[i].workPhone) {
              var mobile = _.split(contactArr[i].workPhone, '-', 2);
              this.companyContact.workPrePhone = mobile[1]

              let countryCode: any = this.allCounties.filter(element => {
                return element[2] == mobile[0];
              });
              countryCode = countryCode[0]
              this.selectedCorpContactWorkPre = countryCode[1];
            }

            continue;
          }


          // contactArr.push(contactArr[i]);
          this.contactList.push(contactArr[i]);
          this.addContactFormFields(contactArr[i]);

        }
      });


    }

    // second tab end
  }
  setParameterData() {
    // third tab start
    this.compObj.isParameterDataAvailable=true;
    this.common.showLoading();
    this.apiService.post(this.constantsService.getCompanyParameter, this.edit).subscribe((succ: any) => {
      this.common.hideLoading();

      console.log(succ);
      // hide maximum no of users
      this.parameterDetails = succ.data.systemParameters;
      if (this.compObj.userType == 'Individual') {

        this.CompanyForm.get('email').disable();
        this.parameterForm.get('maxNoBranches').disable();
        this.parameterForm.get('maxNoUsers').disable();
        this.showMakerChecker = false;
      } else {
        this.showMakerChecker = true;
      }


      let lang = JSON.parse(this.parameterDetails[23].propertyValue ? this.parameterDetails[23].propertyValue : '[]')
      this.compObj.language = [];

      for (let i = 0; i < this.listLanguageId.length; i++) {
        for (let j = 0; j < lang.length; j++) {
          if (lang[j].id == this.listLanguageId[i].id) {
            this.compObj.language.push(this.listLanguageId[i])
          }
        }

      }
      // customer subscription
      this.compObj.customerSubscription = this.parameterDetails[24].propertyValue

      // timezone

      let zon = this.parameterDetails[25].propertyValue;
      let zone: any = this.listZones.filter(element => {
        return element.gmtOffset == zon;
      });
      // countryCode = zone[0]
      this.compObj.timeZone = zone[0];

      this.compObj.companyDomain = this.parameterDetails[22].propertyValue


      // channels set
      var mobile = JSON.parse(this.parameterDetails[17].propertyValue ? this.parameterDetails[17].propertyValue : '[]');
      console.log(mobile)
      if (mobile.length) {
        this.mobileApps = JSON.parse(this.parameterDetails[17].propertyValue);
        this.parameterForm.addControl('mobileApp', new FormArray([]));

      }

      if (this.mobileApps.length) {
        this.mobileApps.forEach(app => {
          this.addMobileAppForm(app);
        });
      } else {
        // this.addMobileAppForm();
      }

      let channels = JSON.parse(this.parameterDetails[0].propertyValue ? this.parameterDetails[0].propertyValue : '[]');
      let mobileApp = JSON.parse(this.parameterDetails[17].propertyValue ? this.parameterDetails[17].propertyValue : '[]');

      for (var i = 0; i < channels.length; i++) {

        for (var j = 0; j < this.listChannelId.length; j++) {
          if (channels[i].channelId == this.listChannelId[j].channelId) {
            this.listChannelId[j].isChecked = true;
            this.listChannelId[j].creditLimit = channels[i].creditLimit;
            this.listChannelId[j].thresholdValue = channels[i].thresholdValue;
            this.listChannelId[j].thresholdType = channels[i].thresholdType;
            this.listChannelId[j].thresholdType = channels[i].thresholdType;
            this.listChannelId[j].thresholdValue = channels[i].thresholdValue;
            this.listChannelId[j].thresholdType = channels[i].thresholdType;
            this.listChannelId[j].thresholdValue = channels[i].thresholdValue;

          }
        }


      }
      this.onChangeChannel("");


      // international code
      if (this.parameterDetails[27].propertyValue == 'true') {
        this.parameterDetails[27].propertyValue = true;

      } else {
        this.parameterDetails[27].propertyValue = false;
      }

      // blocktime


      if (this.parameterDetails[29].propertyValue) {

        let time = JSON.parse(this.parameterDetails[29].propertyValue);


        const dateObj = new Date();
        const dateStr = dateObj.toISOString().split('T').shift();

        this.compObj.noMsgStartTime = moment(dateStr + ' ' + time.startTime).toDate();



        this.compObj.noMsgEndTime = moment(dateStr + ' ' + time.endTime).toDate();




      }


      // menu

      if (this.parameterDetails[30].propertyValue == 'true') {
        this.parameterDetails[30].propertyValue = true;

      } else {
        this.parameterDetails[30].propertyValue = false;
      }
      let mainMenu = JSON.parse(this.parameterDetails[18].propertyValue ? this.parameterDetails[18].propertyValue : '[]');

      for (var i = 0; i < mainMenu.length; i++) {

        for (var j = 0; j < this.parameterForm.value.mainMenus.length; j++) {
          if (this.parameterForm.value.mainMenus[j].id == mainMenu[i]) {
            this.parameterForm.value.mainMenus[j].value = true;
            this.mainMenus[j].value = true;
          }
        }
      }


      // password policy

      if (this.parameterDetails[2].propertyValue)
        this.compObj.passwordPolicy = true;


      // countrycode
      this.compObj.internationalCountryCode = JSON.parse(this.parameterDetails[28].propertyValue ? this.parameterDetails[28].propertyValue : "[]");


      if (this.parameterDetails[31].propertyValue == 'true') {
        this.parameterDetails[31].propertyValue = true;
        if (this.parameterDetails[1].propertyValue == 'true') {
          this.parameterDetails[1].propertyValue = true;
        } else {
          this.parameterDetails[1].propertyValue = false;

        }
      } else {
        this.parameterDetails[31].propertyValue = false;
        this.parameterDetails[1].propertyValue = false;
      }
      // third tab end
    });
  }

  getthreshold(val) {
    if (val == "") {
      this.parameterForm.get('ThresholdValueSms').clearValidators();
      this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
    }
    else if (val != "" && this.listChannelId[0].thresholdValue == "" || this.listChannelId[0].thresholdValue == undefined) {
      this.getthresholdVal = val
      this.parameterForm.get('ThresholdValueSms').setValidators([Validators.required
      ]);
      this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
    }
    else {
      this.parameterForm.get('ThresholdValueSms').clearValidators();
      this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
    }

  }
  getthreshold1(val) {
    if (val == "") {
      this.parameterForm.get('ThresholdValueEmail').clearValidators();
      this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
    }
    else if (val != "" && this.listChannelId[1].thresholdValue == "" || this.listChannelId[1].thresholdValue == undefined) {
      this.getthresholdVal = val
      this.parameterForm.get('ThresholdValueEmail').setValidators([Validators.required
      ]);
      this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();

    }
    else {
      this.parameterForm.get('ThresholdValueEmail').clearValidators();
      this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
    }

  }
  getthreshold2(val) {
    if (val == "") {
      this.parameterForm.get('ThresholdValuePush').clearValidators();
      this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
    }
    else if (val != "" && this.listChannelId[2].thresholdValue == "" ||
      this.listChannelId[2].thresholdValue == undefined) {
      this.getthresholdVal = val

      this.parameterForm.get('ThresholdValuePush').setValidators([Validators.required
      ]);
      this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();


    }
    else {
      this.parameterForm.get('ThresholdValuePush').clearValidators();
      this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
    }

  }
  changeThreshold(val) {

    if (val > this.getSMSlength) {
      if (this.getthresholdVal != "Percentage") {
        this.Checkthreshlength = true
      }
      else {
        this.Checkthreshlength = false
      }
    }
    else {
      this.Checkthreshlength = false
    }
  }
  changeThreshold1(val) {

    if (val > this.getSMSlength) {
      if (this.getthresholdVal != "Percentage") {
        this.Checkthreshlength = true
      }
      else {
        this.Checkthreshlength = false
      }
    }
    else {
      this.Checkthreshlength = false
    }
  }
  changeThreshold2(val) {

    if (val > this.getSMSlength) {
      if (this.getthresholdVal != "Percentage") {
        this.Checkthreshlength = true
      }
      else {
        this.Checkthreshlength = false
      }
    }
    else {
      this.Checkthreshlength = false
    }
  }
  openStatus() {
    this.compObj.changeStatus = this.compObj.isActive;
  }
  updateStatus() {
    let url = this.constantsService.updateStatus
    if (!this.changeStatus) {
      this.common.showErrorMessage("Reason is must")
      return;

    }

    let obj: any = {
      id: this.compObj.companyId,
    }

    if (this.compObj.changeStatus == true || this.compObj.changeStatus == 1)
      obj.isActive = 'Active';
    else
      obj.isActive = 'Inactive';




    this.common.showLoading()
    this.apiService.post(url, obj).subscribe((succ: any) => {

      $('#statusModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);

        this.router.navigate(['../home/company-master']);


      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading()
      $('#statusModal').modal('hide')

    });
  }
  selectAll(e) {


    for (var i = 0; i < this.listGroups.length; i++) {

      this.listGroups[i].theCheckbox = e.target.checked ? true : false;

    }
  }
  selectAllGroup() {
    this.compObj.showSelectGroup = !this.compObj.showSelectGroup
    for (var i = 0; i < this.listGroups.length; i++) {

      if (this.compObj.showSelectGroup) {
        this.listGroups[i].theCheckbox = true;
      } else {
        this.listGroups[i].theCheckbox = false;

      }


    }
  }
  toggleVisibility(e) {

    this.compObj.dayLimt = e.dayLimit
    this.compObj.monthLimit = e.monthLimit

    // this.marked = e.target.checked;
    let selectAll = 0;

    for (var i = 0; i < this.listGroups.length; i++) {

      if (this.listGroups[i].theCheckbox)
        selectAll++;




    }

    if (this.listGroups.length == selectAll) {
      this.compObj.showSelectGroup = true;

    } else {
      this.compObj.showSelectGroup = false;

    }
    // this.setCredit();
  }
  getSMSlength: any
  changeField(event, pattern, min, limitTo, id, length) {

    //Setting Limits
    this.getSMSlength = event.target.value
    const value = event.target.value.substr(0, limitTo)
    if (event.target.value != value) {
      event.target.value = value;
      return;
    }

    //Patterns

    let patt = new RegExp(pattern);
    event.target.value = event.target.value.replace(patt, '');
    if (event.target.value != value) {
      return;
    }

    if (length >= limitTo) {
      return;
    }
  }


  focusOutUserId($event) {


    const userId = $event.target.value
    if (!userId) {
      return;

    }

    this.apiService.post(this.constantsService.validateUserId, { opUserId: userId }).subscribe((succ: any) => {
      // this.common.hideLoading();

      if (succ.code == 200) {
        this.isUniqueUserId = true;
        this.ContactForm.get('userId').setValidators([this.validateUserIdUnique()])
        this.ContactForm.get('userId').updateValueAndValidity();
      } else {
        let val = this.validateUserIdUnique;

        this.isUniqueUserId = false;
        this.ContactForm.get('userId').setValidators([this.validateUserIdUnique()])
        this.ContactForm.get('userId').updateValueAndValidity();
      }
    });

  }
  focusOutInidividualEmailId($event, value) {


    if (this.compObj.userType == 'Company') {
      return;
    }

    const userId = value
    if (!userId) {
      return;

    }
    if (_.isEmpty(this.edit)) {
      this.isEditUser = "false" //Not Edit

    }
    else {
      this.isEditUser = "true"  // Edit

    }

    this.apiService.post(this.constantsService.validateUserId,  {
      opUserId: userId, "isEdit": this.isEditUser,
      id: this.compObj.companyId, userGroupName: "Company"
    }).subscribe((succ: any) => {
      // this.common.hideLoading();

      if (succ.code == 200) {
        this.isUniqueUserId = true;
        if (this.compObj.userType == 'Individual') {
          this.CompanyForm.get('email').setValidators([Validators.email, Validators.required])
          this.CompanyForm.get('email').updateValueAndValidity();
        } else {
          this.ContactForm.get('email').setValidators([Validators.email, Validators.required])
          this.ContactForm.get('email').updateValueAndValidity();
        }

      } else {
        let val = this.validateUserIdUnique;

        this.isUniqueUserId = false;
        if (this.compObj.userType == 'Individual') {
          this.CompanyForm.get('email').setValidators([(control: AbstractControl): { [key: string]: any } => {

            return { 'alreadyExist': true }
          }])
          this.CompanyForm.get('email').updateValueAndValidity();
        } else {
          this.ContactForm.get('email').setValidators([(control: AbstractControl): { [key: string]: any } => {

            return { 'alreadyExist': true }
          }])
          this.ContactForm.get('email').updateValueAndValidity();
        }

      }
    });

  }
  focusOutCompanyEmailId($event, value) {


    if (this.compObj.userType == 'Individual') {
      return;
    }

    const userId = value
    if (!userId) {
      return;

    }


    if (_.isEmpty(this.edit)) {
      this.isEditUser = "false" //Not Edit


    }
    else {
      this.isEditUser = "true"  // Edit

    }

    this.apiService.post(this.constantsService.validateUserId, {
      opUserId: userId, "isEdit": this.isEditUser,
      id: this.compObj.companyId, userGroupName: "Company"
    }).subscribe((succ: any) => {
      // this.common.hideLoading();

      if (succ.code == 200) {
        this.isUniqueUserId = true;
        if (this.compObj.userType == 'Individual') {
          this.CompanyForm.get('email').setValidators([Validators.email, Validators.required])
          this.CompanyForm.get('email').updateValueAndValidity();
        } else {
          this.ContactForm.get('email').setValidators([Validators.email, Validators.required])
          this.ContactForm.get('email').updateValueAndValidity();
        }

      } else {
        let val = this.validateUserIdUnique;

        this.isUniqueUserId = false;
        if (this.compObj.userType == 'Individual') {
          this.CompanyForm.get('email').setValidators([(control: AbstractControl): { [key: string]: any } => {

            return { 'alreadyExist': true }
          }])
          this.CompanyForm.get('email').updateValueAndValidity();
        } else {
          this.ContactForm.get('email').setValidators([(control: AbstractControl): { [key: string]: any } => {

            return { 'alreadyExist': true }
          }])
          this.ContactForm.get('email').updateValueAndValidity();
        }

      }
    });

  }

  private validateUserIdUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      return { 'alreadyExist': true }
    }
  }


  ngOnDestroy() {

    this.common.setEditcompany({});
  }
  cancel() {
    this.router.navigate(['../home/company-master']);

  }

  previousToDetails() {
    this.compObj.isDetails = true;
    this.compObj.isContact = false;
    this.compObj.isParameter = false;
    this.compObj.isTheme = false;
    this.scrollToTop()
  }
  previousToContactTab() {

    if (this.compObj.userType != 'Company') {
      this.compObj.isDetails = true;
      this.compObj.isContact = false;
      this.compObj.isParameter = false;
      this.compObj.isTheme = false;
      this.scrollToTop()
    } else {
      this.compObj.isDetails = false;
      this.compObj.isContact = true;
      this.compObj.isParameter = false;
      this.compObj.isTheme = false;
      this.scrollToTop()

    }

  }
  detailsTab() {

    this.compObj.isDetails = true;
    this.compObj.isContact = false;
    this.compObj.isParameter = false;
    this.compObj.isTheme = false;
    this.scrollToTop()


  }
  previousToParameterTab() {
    this.compObj.isDetails = false;
    this.compObj.isContact = false;
    this.compObj.isParameter = true;
    this.compObj.isTheme = false;
    this.scrollToTop()
  }
  contactsTab() {

    // if (this.compObj.isDetails) {
    //   this.detailsSubmit();
    //   return;
    // }
    if (this.compObj.isDetails && this.CompanyForm.invalid) {


     this.detailsSubmit();
     return;
    }   
   else if (this.compObj.isDetails) {

      this.detailsSubmit();
      return;
    }else{
      this.compObj.isDetails = false;
      this.compObj.isContact = true;
      this.compObj.isParameter = false;
      this.compObj.isTheme = false;
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    // if (this.compObj.isDetails && this.CompanyForm.invalid) {

    //   return;
    // }
    

  }
  parameterTab() {

    // if (this.compObj.isContact) {
    //   this.contactSave();
    //   return;
    // }


    if (this.compObj.isDetails && this.CompanyForm.invalid) {


      return;
    }  
    else if(this.compObj.isDetails) {
      this.contactSave();
      return;
    }
    else if (this.compObj.isContact) {
      this.contactSave();
      return;
     

    }else{
         this.compObj.isDetails = false;
      this.compObj.isContact = false;
      this.compObj.isParameter = true;
      this.compObj.isTheme = false;

      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
   


  }
  themesTab() {
   
    if (this.compObj.isDetails && this.CompanyForm.invalid) {


      return;
    }
    else if (this.compObj.isContact && this.ContactForm.invalid) {


      return;
    }   
    else if (this.compObj.isParameter ) {
      this.submitParameter();

    }else{
      this.submitParameter();
    }
 // if (this.compObj.isParameter && this.parameterForm.invalid) {
    //   // this.CompanyForm.markAllAsTouched()

    //   return;
    // }

  }
  detailsSubmit() {




    if (this.CompanyForm.invalid) {
      // this.detailsTabs = false;
      this.CompanyForm.markAllAsTouched();
      let target;

      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      if (this.compObj.userType != 'Company') {

        if (this.ContactForm.get('opGroup').invalid) {
          this.ContactForm.get('opGroup').markAsTouched();
          return;
        }

      }

      return;
    }
    else {

      if (this.compObj.userType != 'Company') {

        if (this.ContactForm.get('opGroup').invalid) {
          this.ContactForm.get('opGroup').markAsTouched();
          return;
        }

      }

      this.compObj.phone = this.common.convertCompleteCountryCode(this.compObj.CorpPreMobileNo)
      this.compObj.country = this.compObj.countryMod.countryDesc
      if (this.compObj.userType != 'Company') {
        this.compObj.isDetails = false;
        this.compObj.isContact = false;
        this.compObj.isParameter = true;
        this.compObj.isTheme = false;

      } else {
        this.compObj.isDetails = false;
        this.compObj.isContact = true;
        this.compObj.isParameter = false;
        this.compObj.isTheme = false;

      }


      if (this.Edit == true) {
        console.log(this.CompanyForm.dirty);
        if (this.compObj.userType != 'Company') {
          if(!this.compObj.isParameterDataAvailable)
          this.setParameterData();
        }
        else {
          if(!this.compObj.isContactDataAvailable)
          this.setContactListData();
        }
      }

      this.scrollToTop()
      // return;
    }

  }
  contactSave() {



    if (this.ContactForm.invalid) {

      this.ContactForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      this.companyContact.mobilePhone = this.common.convertCompleteCountryCode(this.companyContact.CorpPreMobileNo)
      this.companyContact.workPhone = this.common.convertCompleteCountryCode(this.companyContact.workPrePhone)
      this.companyContact.userId = this.companyContact.email
      this.compObj.isDetails = false;
      this.compObj.isContact = false;
      this.compObj.isParameter = true;
      this.compObj.isTheme = false;
      this.scrollToTop()
      if (this.Edit == true) {
        if(!this.compObj.isParameterDataAvailable)
       this.setParameterData();
      }
      // return;
    }



  }
  colorNew: any;
  colorOld: any;
  getColor(color) {
    this.colorNew = color
    this.formChanges = true;

  }


  focusOutFreq1($event) {

    if (this.listChannelId[0].thresholdValue > this.listChannelId[0].creditLimit) {
      this.isFreq = true;
      this.parameterForm.get('ThresholdValueSms').setValidators([this.validateUserIdUniqued()])
      this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
    } else {
      if (this.listChannelId[0].thresholdType && this.getthresholdVal != "") {

        this.parameterForm.get('ThresholdValueSms').setValidators([Validators.required
        ]);
        this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
      }
      else {
        this.isFreq = false;
        this.parameterForm.get('ThresholdValueSms').clearValidators();
        this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
      }
    }

  }
  focusOutFreq2($event) {

    if (this.listChannelId[0].thresholdValue > this.listChannelId[0].creditLimit) {
      this.isFreq = true;
      this.parameterForm.get('ThresholdValueSms').setValidators([this.validateUserIdUniqued()])
      this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
    } else {

      if (this.listChannelId[0].thresholdType && this.getthresholdVal != "") {

        this.parameterForm.get('ThresholdValueSms').setValidators([Validators.required
        ]);
        this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
      }
      else {
        this.isFreq = false;
        this.parameterForm.get('ThresholdValueSms').clearValidators();
        this.parameterForm.get('ThresholdValueSms').updateValueAndValidity();
      }

    }

  }
  focusOutFreq3($event) {

    if (this.listChannelId[1].thresholdValue > this.listChannelId[1].creditLimit) {
      this.isFreq = true;
      this.parameterForm.get('ThresholdValueEmail').setValidators([this.validateUserIdUniqued()])
      this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
    } else {
      if (this.listChannelId[1].thresholdType && this.getthresholdVal != "") {

        this.parameterForm.get('ThresholdValueEmail').setValidators([Validators.required
        ]);
        this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
      }
      else {
        this.isFreq = false;
        this.parameterForm.get('ThresholdValueEmail').clearValidators();
        this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
      }
    }

  }
  focusOutFreq4($event) {

    if (this.listChannelId[1].thresholdValue > this.listChannelId[1].creditLimit) {
      this.isFreq = true;
      this.parameterForm.get('ThresholdValueEmail').setValidators([this.validateUserIdUniqued()])
      this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
    } else {
      if (this.listChannelId[1].thresholdType && this.getthresholdVal != "") {

        this.parameterForm.get('ThresholdValueEmail').setValidators([Validators.required
        ]);
        this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
      }
      else {
        this.isFreq = false;
        this.parameterForm.get('ThresholdValueEmail').clearValidators();
        this.parameterForm.get('ThresholdValueEmail').updateValueAndValidity();
      }
    }

  }
  focusOutFreq5($event) {

    if (this.listChannelId[2].thresholdValuePush > this.listChannelId[2].creditLimit) {
      this.isFreq = true;
      this.parameterForm.get('ThresholdValuePush').setValidators([this.validateUserIdUniqued()])
      this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
    } else {

      if (this.listChannelId[2].thresholdType && this.getthresholdVal != "") {

        this.parameterForm.get('ThresholdValuePush').setValidators([Validators.required
        ]);
        this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
      }
      else {
        this.isFreq = false;
        this.parameterForm.get('ThresholdValuePush').clearValidators();
        this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
      }
    }

  }
  focusOutFreq6($event) {

    if (this.listChannelId[2].thresholdValue > this.listChannelId[2].creditLimit) {
      this.isFreq = true;
      this.parameterForm.get('ThresholdValuePush').setValidators([this.validateUserIdUniqued()])
      this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
    } else {
      if (this.listChannelId[2].thresholdType && this.getthresholdVal != "") {

        this.parameterForm.get('ThresholdValuePush').setValidators([Validators.required
        ]);
        this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
      }
      else {
        this.isFreq = false;
        this.parameterForm.get('ThresholdValuePush').clearValidators();
        this.parameterForm.get('ThresholdValuePush').updateValueAndValidity();
      }
    }

  }


  private validateUserIdUniqued(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (this.isFreq === false) {
        return null
      }
      if (this.isFreq === true) {

        return { 'alreadyExist': true }
      }
    }
  }

  submitParameter() {

    if (this.parameterForm.invalid) {

      this.parameterForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {


      let noMsgStartTime = moment(this.compObj.noMsgStartTime).format('LT');
      let noMsgEndTime = moment(this.compObj.noMsgEndTime).format('LT');

      if (noMsgStartTime === noMsgEndTime) {
        this.common.showErrorMessage("Block time start & end time should not be same")
        return;
      }



      // blocktime

      this.parameterDetails[29].propertyValue = JSON.stringify({
        startTime: noMsgStartTime,
        endTime: noMsgEndTime
      })

      if (!this.selectedChannel.isPush) {
        let obj = []
        this.parameterDetails[17].propertyValue = JSON.stringify(obj)

      } else if (this.selectedChannel.isPush) {
        let obj = []
        let mobileApp = this.parameterForm.value.mobileApp;
        this.parameterDetails[17].propertyValue = [];
        this.isApnsFile = []
        for (var i = 0; i < mobileApp.length; i++) {
          mobileApp[i].companyCode = this.compObj.companyCode
          mobileApp[i].timeStamp = (Date.now()).toString()
          obj.push(mobileApp[i]);
          if (!mobileApp[i].isFCM) {
            if (mobileApp[i].isNew) {
              console.log("isnew")
              const file = {
                isNew: true,
                data: mobileApp[i],
                url: this.constantsService.saveApnsDocument
              }
              this.isApnsFile.push(file)
            } else if (mobileApp[i].isUpdate && !mobileApp[i].isNew) {
              console.log("is update")
              const file = {
                isUpdate: true,
                data: mobileApp[i],
                url: this.constantsService.saveApnsDocument
              }
              this.isApnsFile.push(file)
            }
          }

        }
        this.parameterDetails[17].propertyValue = JSON.stringify(obj);


      }
      // otp value
      if (this.parameterDetails[1].propertyValue) {
        this.parameterDetails[1].propertyValue = true;
      } else {
        this.parameterDetails[1].propertyValue = false;

      }

      // channels
      let channels = this.listChannelId;


      this.parameterDetails[0].propertyValue = [];
      for (var i = 0; i < channels.length; i++) {
        if (channels[i].isChecked) {
          this.parameterDetails[0].propertyValue.push(channels[i]);
        }
      }
      this.parameterDetails[0].propertyValue = JSON.stringify(this.parameterDetails[0].propertyValue);

      // main menu
      let mainMenu = this.parameterForm.value.mainMenus;

      this.parameterDetails[18].propertyValue = [];

      for (var i = 0; i < this.mainMenus.length; i++) {
        if (this.mainMenus[i].value) {
          this.parameterDetails[18].propertyValue.push(this.mainMenus[i].menu_id);
        }
      }
      this.parameterDetails[18].propertyValue = JSON.stringify(this.parameterDetails[18].propertyValue);


      // company domain
      this.parameterDetails[22].propertyValue = this.compObj.companyDomain

      // language supported
      if (this.compObj.language) {
        let obj = []
        for (let j = 0; j < this.compObj.language.length; j++) {
          obj.push({
            id: this.compObj.language[j].id,
            langDesc: this.compObj.language[j].langDesc,
            isDefault: this.compObj.language[j].isDefault
          })
        }
        this.parameterDetails[23].propertyValue = JSON.stringify(obj)
      } else {
        this.parameterDetails[23].propertyValue = JSON.stringify("[]")
      }

      // customer subscription
      this.parameterDetails[24].propertyValue = this.compObj.customerSubscription

      // timezone
      this.parameterDetails[25].propertyValue = this.compObj.timeZone.gmtOffset

      // countrycode
      if (this.compObj.internationalCountryCode) {
        this.parameterDetails[28].propertyValue = JSON.stringify(this.compObj.internationalCountryCode)
      } else {
        this.parameterDetails[28].propertyValue = JSON.stringify([])
      }



      this.compObj.isDetails = false;
      this.compObj.isContact = false;
      this.compObj.isParameter = false;
      this.compObj.isTheme = true;
      this.scrollToTop()
    }
  }
  saveApnsDocument(companyId) {

    let formArray = this.isApnsFile

    for (let i = 0; i < formArray.length; i++) {
      let formValue = formArray[i];
      console.log(formValue);

      const formData = new FormData();
      formData.append('companyId', companyId);
      formData.append('userId', this.user.userId);
      formData.append('sessionId', this.user.sessionId);
      formData.append('name', formValue.data.fileName);
      formData.append('filePart', formValue.data.filePart);
      formData.append('companyCode', this.compObj.companyCode);
      formData.append("timeStamp", formValue.data.timeStamp);


      this.common.showLoading()

      this.apiService.uploadFile(formValue.url, formData).subscribe((succ: any) => {

        console.log(succ);
        this.common.hideLoading()
      }, err => {
        console.log(err);
        this.common.hideLoading()
      })

    }



  }
  ThemeValidate(data?) {

    if (this.themeForm.invalid) {
      this.themeForm.markAllAsTouched();
      return;
    }


    if (this.Edit) {
      if (this.formChanges == false) {
        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
        return;
      }
    }



    var geer = this.companyContact.contactName

    var contactArr = [];
    if (this.compObj.userType == 'Company') {
      contactArr.push(this.companyContact);
      for (var i = 0; i < this.ContactForm.value.contactList.length; i++) {
        let contact = this.ContactForm.value.contactList[i]
        contact.isPrimaryContact = 0;


        let mobileNo = contact.CorpPreMobileNo;

        contact.mobilePhone = this.common.convertCompleteCountryCode(mobileNo);

        let workPhone = contact.CorpPreMobileNo2

        contact.workPhone = this.common.convertCompleteCountryCode(workPhone);


        if (data == 'submit') {
        } else {
          contact.companyId = this.companyContact.companyId
        }

        contactArr.push(contact);
      }
    }


    let staticContact: any = {};
    staticContact.company = this.compObj;
    staticContact.userType = this.compObj.userType;
    staticContact.selectedGroups = [];


    for (var i = 0; i < this.listGroups.length; i++) {

      if (this.listGroups[i].theCheckbox)
        staticContact.selectedGroups.push(this.listGroups[i].groupId)

    }
    staticContact.companyContact = contactArr

    let systemParameter = [];
    for (let i = 0; i < this.parameterDetails.length; i++) {

      if (!this.Edit) {
        this.parameterDetails[i].propertyId = this.parameterDetails[i].id;
        delete this.parameterDetails[i].id;
      }
      // this.parameterDetails[i].id = 0;
      systemParameter.push(this.parameterDetails[i]);

    }




    staticContact.systemParameters = this.parameterDetails





    let url = ""
    if (data == 'submit') {
      url = this.constantsService.addCompany;
      if (!this.compObj.logoString) {
        this.compObj.logoString = "";
      }
    } else {
      url = this.constantsService.updateCompany
    }




    // return;
    this.common.showLoading();
    this.apiService.post(url, staticContact).subscribe((succ: any) => {

      this.common.hideLoading()


      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);
        if (data == 'submit') {
          let cmpId = succ.data.chatCompanyId;
          this.uploadDocument(cmpId);
          this.saveApnsDocument(cmpId)
          this.chatServices(cmpId)
        }

        else {
          this.updateDocument(this.compObj.companyId)
          this.saveApnsDocument(this.compObj.companyId)

        }

        this.router.navigate(['../home/company-master']);

        // let cmpId = succ.data.chatCompanyId;


      }
      else {
        this.common.showErrorMessage(succ.message)

      }

    }, err => {
      this.common.hideLoading()

    });

  }

  // Chat Services

  chatServices(cmpId) {

    let chatReg = { "org": { "name": this.compObj.companyName } }

    this.apiService.put(this.constantsService.chatOrgReg, chatReg).subscribe((succ: any) => {

      this.common.hideLoading()


      if (succ.status == 200) {
        this.common.showSuccessMessage(succ.status_message);
        let chatDetails = { 'chatOrgId': succ.organization_id, "chatCompanyId": cmpId }

        this.afterChatReg(chatDetails)
      }
      else {
        this.common.showErrorMessage(succ.status_message)

      }

    }, err => {
      this.common.hideLoading()

    });


  }

  afterChatReg(chatDetails) {

    this.apiService.post(this.constantsService.updateChattterId, chatDetails).subscribe((succ: any) => {

      this.common.hideLoading()


      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.common.logout(succ.body);


      }
      else {
        this.common.showErrorMessage(succ.message)

      }

    }, err => {
      this.common.hideLoading()

    });

  }


  back() {
    this.router.navigate(['../home/company-master']);
  }

  deleteContact(index: number) {


    if (this.ContactForm.get('contactList').value[index].companyContactId) {
      this.ContactForm.get('contactList').value[index].isActive = 0;
      (<FormArray>this.ContactForm.get('contactList')).setErrors(null);
      (<FormArray>this.ContactForm.get('contactList')).value[index].status = 'valid';
      (<FormArray>this.ContactForm.get('contactList')).removeAt(index)

      return;
    }
    (<FormArray>this.ContactForm.get('contactList')).removeAt(index)


  }

  logoOld: any
  logoNew: any
  logoImg: any
  StaticContactOld: any = {}
  StaticContactNew: any = {}

  onFileChange($event) {
    var file: File = $event.target.files[0];

    this.logoImg = file

    var FileSize = file.size; // in MB

    setTimeout(() => {
      this.logoOld = this.logoImg

      this.logoImg.valueChanges.subscribe(value => {

        this.logoNew = value

      });
    }, 3000);

    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);



    if (_.indexOf(this.AcceptfileFormat, fileFormat.toLowerCase()) === -1) {
      this.common.showErrorMessage('Invalid File Type');

      return;
    }
    this.formChanges = true;

    this.showCropImage = true;
    this.imageChangedEvent = $event


  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready 
  }
  loadImageFailed() {
    // show message
  }
  saveCropImage() {
    let img = this.croppedImage.split(',');

    this.compObj.logoString = img[1];
    this.compObj.companyImage = this.croppedImage;
    // this.companyImage=this.croppedImage;
    this.showCropImage = false;
    this.Imglogo = true
  }
  cancelCropImage() {
    this.showCropImage = false;

  }
  changeUserType() {
    this.parameterDetails[20].propertyValue = 1;
    this.parameterDetails[21].propertyValue = 1;
    if (this.compObj.userType == 'Company') {
      this.CompanyForm.get('email').setValidators([Validators.email, Validators.required])
      this.CompanyForm.get('email').updateValueAndValidity();

    } else {
      if (this.compObj.email)
        this.focusOutInidividualEmailId("", this.compObj.email);

      this.showMakerChecker = false;
    }
  }
  checkPassword() {

    if (parseInt(this.parameterDetails[2].propertyValue) < (parseInt(this.parameterDetails[4].propertyValue) + parseInt(this.parameterDetails[6].propertyValue) + parseInt(this.parameterDetails[8].propertyValue) + parseInt(this.parameterDetails[10].propertyValue))) {
      this.isPassordError = true;

    } else {
      this.isPassordError = false;
    }
    this.parameterForm.get('passwordLength').setValidators([this.addPassowrdValidator()])
    this.parameterForm.get('passwordLength').updateValueAndValidity();
  }

  private addPassowrdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.isPassordError) {
        return null
      }
      return { 'passwordCheck': true }
    }
  }

  checkMaxNoBranch() {
    if (this.parameterDetails[20].propertyValue == 0 || this.parameterDetails[20].propertyValue < -1) {

      this.parameterForm.get('maxNoBranches').setValidators([(control: AbstractControl): { [key: string]: any } => {

        return { 'check': true }
      }]);
      this.parameterForm.get('maxNoBranches').updateValueAndValidity();

    } else {
      this.parameterForm.get('maxNoBranches').clearValidators();
      this.parameterForm.get('maxNoBranches').updateValueAndValidity();

    }
  }
  checkMaxNoUsers() {
    if (this.parameterDetails[21].propertyValue == 0 || this.parameterDetails[21].propertyValue < -1) {

      this.parameterForm.get('maxNoUsers').setValidators([(control: AbstractControl): { [key: string]: any } => {

        return { 'check': true }
      }]);
      this.parameterForm.get('maxNoUsers').updateValueAndValidity();

    } else {
      this.parameterForm.get('maxNoUsers').clearValidators();
      this.parameterForm.get('maxNoUsers').updateValueAndValidity();

    }
    if (this.parameterDetails[21].propertyValue == -1 || this.parameterDetails[21].propertyValue >= 2) {
      this.showMakerChecker = true;
    } else {
      this.showMakerChecker = false;

    }
  }

  public scrollToTop() {

    let target;
    target = this.el.nativeElement.querySelector('.inner-head')

    if (target) {
      $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
      target.focus();
    }
    return;

  }

  onChangeChannel(channel) {
    this.selectedChannel.isSms = true;
    this.selectedChannel.isEmail = true;
    this.selectedChannel.isPush = true;
    for (let i = 0; i < this.listChannelId.length; i++) {
      if (this.listChannelId[i].channelDesc == 'SMS' && this.listChannelId[i].isChecked) {
        this.selectedChannel.isSms = true;
        if (this.compObj.customerSubscription == 'Prepaid') {
          this.parameterForm.get('smsChannel').setValidators(Validators.required);
          this.parameterForm.get('smsChannel').updateValueAndValidity();

        }
      }
      if (this.listChannelId[i].channelDesc == 'SMS' && !this.listChannelId[i].isChecked) {
        this.selectedChannel.isSms = false;
        this.parameterForm.get('smsChannel').clearValidators();
        this.parameterForm.get('smsChannel').updateValueAndValidity();
      }
      if (this.listChannelId[i].channelDesc == 'Email' && this.listChannelId[i].isChecked) {
        this.selectedChannel.isEmail = true;
        this.parameterForm.get('emailChannel').setValidators(Validators.required);
        this.parameterForm.get('emailChannel').updateValueAndValidity();
      }
      if (this.listChannelId[i].channelDesc == 'Email' && !this.listChannelId[i].isChecked) {
        this.selectedChannel.isEmail = false;
        this.parameterForm.get('emailChannel').clearValidators();
        this.parameterForm.get('emailChannel').updateValueAndValidity();
      }
      if (this.listChannelId[i].channelDesc == 'Push Notification' && this.listChannelId[i].isChecked) {
        this.selectedChannel.isPush = true;
        this.parameterForm.get('pushChannel').setValidators(Validators.required);
        this.parameterForm.get('pushChannel').updateValueAndValidity();
        // this.addMobileAppForm();

        this.parameterForm.addControl('mobileApp', new FormArray([]));
        if (this.mobileApps.length == 0)
          this.addMobileAppForm();

      }
      if (this.listChannelId[i].channelDesc == 'Push Notification' && !this.listChannelId[i].isChecked) {
        this.selectedChannel.isPush = false;
        this.parameterForm.get('pushChannel').clearValidators();
        this.parameterForm.get('pushChannel').updateValueAndValidity();

        this.parameterForm.removeControl('mobileApp');
        this.mobileApps = []
        // for (let j = 0; j < this.mobileApps.length; j++) {
        //   this.deleteMobileApp(j); 
        // }
        // setTimeout(() => {
        //   this.mobileApps = []
        // }, 500);
      }
    }
  }
  internationcSms() {
    if (this.parameterDetails[27].propertyValue) {
      this.parameterForm.get('internationalCountryCode').setValidators(Validators.required);
      this.parameterForm.get('internationalCountryCode').updateValueAndValidity();

    } else {
      this.parameterForm.get('internationalCountryCode').clearValidators();
      this.parameterForm.get('internationalCountryCode').updateValueAndValidity();
    }
  }
  onChangePassword() {

  }
  addMobileApp() {

    if (this.parameterForm.controls.mobileApp.invalid) {
      this.parameterForm.controls.mobileApp.markAllAsTouched();
      return;

    }

    this.addMobileAppForm();
  }
  addMobileAppForm(app?: any) {
    console.log("app", app)
    this.mobileApps.push({
      "mobileName": "",
      'serverKey': "",
      'mobileId': (Date.now()).toString(),
      'isFCM': true,
      'bundleId': "",
      "password": "",
      "filePart": "",
      "fileName": ""
    });

    let fg;
    if (app) {
      if (app.isFCM) {
        fg = this.formBuilder.group({
          'mobileName': [app.mobileName, Validators.required],
          'serverKey': [app.serverKey, Validators.required],
          'mobileId': [app.mobileId],
          'isFCM': [app.isFCM],
          'isNew': [false],
          'isUpdate': [false],
          'bundleId': [app.bundleId],
          'password': [app.password],
          'fileName': [app.fileName],
          'timeStamp': [app.timeStamp],
          'isDownload': [false],

        });
      } else {
        fg = this.formBuilder.group({
          'mobileName': [app.mobileName, Validators.required],
          'serverKey': [app.serverKey],
          'mobileId': [app.mobileId, Validators.required],
          'isFCM': [app.isFCM],
          'isNew': [false],
          'isUpdate': [false],
          'bundleId': [app.bundleId, Validators.required],
          'password': [app.password, Validators.required],
          'fileName': [app.fileName],
          'timeStamp': [app.timeStamp],
          'filePart': ["app.file", Validators.required],
          'isDownload': [true],
        });
      }

    } else {

      fg = this.formBuilder.group({
        'mobileName': ["", Validators.required],
        'serverKey': ["", Validators.required],
        'mobileId': [(Date.now()).toString()],
        'isFCM': [true],
        'isNew': [true],
        'isUpdate': [false],
        'bundleId': [""],
        'password': [""],
        'fileName': [""],
        'filePart': [""],
        'timeStamp': [""],
        'isDownload': [false],
      });
    }

    (<FormArray>this.parameterForm.get('mobileApp')).push(fg);


  }

  deleteMobileApp(index: number) {


    if (this.parameterForm.get('mobileApp').value[index]) {
      (<FormArray>this.parameterForm.get('mobileApp')).setErrors(null);
      (<FormArray>this.parameterForm.get('mobileApp')).value[index].status = 'valid';
      (<FormArray>this.parameterForm.get('mobileApp')).removeAt(index)

      return;
    }
    (<FormArray>this.parameterForm.get('mobileApp')).removeAt(index)

    delete this.mobileApps[index];


  }
  onISFCMChange(event, index, control) {
    console.log(event);
    console.log(index)
    console.log(control)
    if (!control.value.isFCM) {
      console.log((<FormArray>this.parameterForm.get('mobileApp')).controls[index]);
      this.parameterForm['controls'].mobileApp['controls'][index].controls['bundleId'].setValidators(Validators.required);
      this.parameterForm['controls'].mobileApp['controls'][index].controls['bundleId'].updateValueAndValidity();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['password'].setValidators(Validators.required);
      this.parameterForm['controls'].mobileApp['controls'][index].controls['password'].updateValueAndValidity();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['filePart'].setValidators(Validators.required);
      this.parameterForm['controls'].mobileApp['controls'][index].controls['filePart'].updateValueAndValidity();

      this.parameterForm['controls'].mobileApp['controls'][index].controls['serverKey'].clearValidators();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['serverKey'].updateValueAndValidity();

    } else {

      this.parameterForm['controls'].mobileApp['controls'][index].controls['serverKey'].setValidators(Validators.required);
      this.parameterForm['controls'].mobileApp['controls'][index].controls['serverKey'].updateValueAndValidity();


      this.parameterForm['controls'].mobileApp['controls'][index].controls['bundleId'].clearValidators();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['bundleId'].updateValueAndValidity();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['password'].clearValidators();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['password'].updateValueAndValidity();

      this.parameterForm['controls'].mobileApp['controls'][index].controls['filePart'].clearValidators();
      this.parameterForm['controls'].mobileApp['controls'][index].controls['filePart'].updateValueAndValidity();


    }
  }
  onPushFileChange($event, index) {
    var file: File = $event.target.files[0];

    this.logoImg = file

    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);



    if (_.indexOf(this.APNSDocFormat, fileFormat.toLowerCase()) === -1) {
      this.common.showErrorMessage('Invalid File Type');
      (<FormArray>this.parameterForm.get('mobileApp')).controls[index].patchValue({
        fileName: "",
        filePart: "",
      })
      this.mobileApps[index].file = "";
      this.mobileApps[index].fileName = "";
      return;
    }
    let formValue = (<FormArray>this.parameterForm.get('mobileApp')).controls[index].value;
    console.log(formValue);
    (<FormArray>this.parameterForm.get('mobileApp')).controls[index].patchValue({
      filePart: file,
      fileName: file.name,
      isUpdate: true
    })
    this.mobileApps[index] = (<FormArray>this.parameterForm.get('mobileApp')).controls[index].value;

    this.mobileApps[index].file = file;
    this.mobileApps[index].fileName = file.name;


  }

  downloadApnsFile(index) {
    console.log(index)
    // 
    console.log(this.compObj.companyCode)
    let obj = (<FormArray>this.parameterForm.get('mobileApp')).controls[index].value
    console.log(obj)
    obj.name = obj.fileName;
    obj.companyCode = this.compObj.companyCode
    obj.path = obj.timeStamp
    // obj.path = listPushDistribution.file
    this.common.showLoading();
    this.apiService.downloadFile(this.constantsService.downloadApnsFile, obj).subscribe((succ: any) => {

      this.common.hideLoading();
      this.common.downloadDocs(succ, obj.name);

    }, err => {


      this.common.hideLoading();

    });
  }

  addDocumentList() {

    if (this.themeForm.controls.documentList.invalid) {
      this.themeForm.controls.documentList.markAllAsTouched();
      return;

    }

    this.addDocumentListForm();
  }
  addDocumentListForm(app?: any) {


    let fg;
    if (app) {

      fg = this.formBuilder.group({
        'description': [app.description, Validators.required],
        'file': [app.path, Validators.required],
        'documentId': [app.documentId],
        'filePart': [app.filePart],
        'name': [app.name],
        'isDownload': [true],

      });
    } else {
      this.documentList.push({
        "description": "",
        'file': "",

        'documentId': "",
        "filePart": "",
        "name": "",

      });
      fg = this.formBuilder.group({
        'description': ["", Validators.required],
        'file': ["", Validators.required],
        'documentId': [""],
        'filePart': [""],
        'name': [""],
        'isDownload': [false],

      });
    }

    (<FormArray>this.themeForm.get('documentList')).push(fg);


  }

  deleteDocumentListForm(index: number) {


    if (this.themeForm.get('documentList').value[index]) {
      let formControl = (<FormArray>this.themeForm.get('documentList'));
      console.log(formControl.value[index].documentId);
      const documentId = formControl.value[index].documentId;
      (<FormArray>this.themeForm.get('documentList')).setErrors(null);
      (<FormArray>this.themeForm.get('documentList')).value[index].status = 'valid';
      (<FormArray>this.themeForm.get('documentList')).removeAt(index)

      for (let i = 0; i < this.documentList.length; i++) {
        if (this.documentList[i].documentId == documentId) {
          this.documentList[i].isDelete = true;
          this.documentList[i].isEdit = true;
        }
      }
      return;
    }
    (<FormArray>this.themeForm.get('documentList')).removeAt(index)

    this.documentList[index].isDelete = true;

  }
  onDiscriptionChange($event, index) {
    this.documentList[index].isDescription = true;
    this.documentList[index].isEdit = true;
    this.documentList[index].description = $event.target.value;
  }
  onDocumentFileChange($event, index) {
    var file: File = $event.target.files[0];

    this.logoImg = file

    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);



    if (_.indexOf(this.AcceptDocFormat, fileFormat.toLowerCase()) === -1) {
      this.common.showErrorMessage('Invalid File Type');
      (<FormArray>this.themeForm.get('documentList')).controls[index].patchValue({
        filePart: "",
        file: "",
      })
      return;
    }
    let formValue = (<FormArray>this.themeForm.get('documentList')).controls[index].value;
    console.log(formValue);
    (<FormArray>this.themeForm.get('documentList')).controls[index].patchValue({
      filePart: file,
      name: file.name
    })
    this.documentList[index] = (<FormArray>this.themeForm.get('documentList')).controls[index].value;
    this.documentList[index].isFileChange = true;
    this.documentList[index].isEdit = true;



  }
  updateDocument(companyId) {

    let documentList = this.documentList;
    console.log(documentList)
    for (let i = 0; i < documentList.length; i++) {
      // console.log(documentList[i].documentId)
      if (!documentList[i].documentId) {
        console.log("new")
        this.updateUploadDocumnet(companyId, documentList[i], true);
      }
      else if (documentList[i].isEdit) {
        if (documentList[i].isDelete) {
          console.log("is File delete")
          this.apiService.post(this.constantsService.deleteCompanyDocument, documentList[i]).subscribe((succ: any) => {
            console.log(succ)
          });
        }
        else if (documentList[i].isFileChange) {
          console.log("is File change")
          this.updateUploadDocumnet(companyId, documentList[i], false);
        } else if (documentList[i].isDescription) {
          console.log("is description change")
          documentList[i].id = documentList[i].companyId;
          this.apiService.post(this.constantsService.saveCompanyDocDetails, documentList[i]).subscribe((succ: any) => {
            console.log(succ)
          });

        }
      }
    }

  }
  updateUploadDocumnet(companyId, data, isNew) {
    let formValue = data;
    console.log(formValue);

    const formData = new FormData();
    formData.append('companyId', companyId);
    formData.append('userId', this.user.userId);
    formData.append('sessionId', this.user.sessionId);
    if (isNew)
      formData.append('documentId', "0");
    else
      formData.append('documentId', formValue.documentId);
    formData.append('description', formValue.description);
    formData.append('name', formValue.name);
    formData.append('filePart', formValue.filePart);
    formData.append('companyCode', this.compObj.companyCode);


    this.common.showLoading()

    this.apiService.uploadFile(this.constantsService.updateCompanyDocument, formData).subscribe((succ: any) => {

      console.log(succ);
      this.common.hideLoading()
    }, err => {
      console.log(err);
      this.common.hideLoading()
    })

  }

  download(listPushDistribution) {
    this.common.showLoading();
    let obj = listPushDistribution
    obj.path = listPushDistribution.file
    this.apiService.downloadFile(this.constantsService.downloadDocument, listPushDistribution).subscribe((succ: any) => {

      this.common.hideLoading();
      this.common.downloadDocs(succ, listPushDistribution.name);

    }, err => {


      this.common.hideLoading();

    });
  }
  uploadDocument(companyId) {

    let formArray = []
    formArray = this.themeForm.get('documentList').value;
    for (let i = 0; i < formArray.length; i++) {
      let formValue = formArray[i];
      console.log(formValue);

      const formData = new FormData();
      formData.append('companyId', companyId);
      formData.append('userId', this.user.userId);
      formData.append('sessionId', this.user.sessionId);
      formData.append('documentId', formValue.documentId);
      formData.append('description', formValue.description);
      formData.append('name', formValue.name);
      formData.append('filePart', formValue.filePart);
      formData.append('companyCode', this.compObj.companyCode);


      this.common.showLoading()

      this.apiService.uploadFile(this.constantsService.addCompanyDocument, formData).subscribe((succ: any) => {

        console.log(succ);
        this.common.hideLoading()
      }, err => {
        console.log(err);
        this.common.hideLoading()
      })

    }



  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
}

