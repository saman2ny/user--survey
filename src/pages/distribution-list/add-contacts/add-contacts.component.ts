import { Component, OnInit, OnDestroy, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit, OnDestroy {
  @Input('maxLength') public maxLength = 2;
  EditDistForm: FormGroup;
  EditDistFormSingleOld: any = {

  };
  EditDistFormSingleNew: any = {};
  BeforeDistList: FormGroup;
  EditDistFormSingle: FormGroup;
  forName: FormGroup;
  FileUpload: FormGroup;
  distObj: any = {}
  distAddObj: any = {}
  distributionId: any = " ";
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
  }
  listDistribution: any = [];
  isScroll: boolean;
  listCountryCode = [];
  selectedUserPush: any = [];
  selectedUser: any = {};
  selectedUserEdit: any = {}
  root: any;

  masterSelected: boolean;
  contactID: any;
  SaveButtons: boolean = false;
  EditButtons: boolean = true;
  user: any = {

  };
  Contacts: any;
  active: any;
  inactive: any;
  contactList: any = [];
  contactCount: any = {};
  totalCount: any;
  isEdit: boolean = false;
  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];

  selectedCorpPreMobileNo = "in"
  selectedCorpContactPreMobileNo = "in"
  updateUploadContact: FormGroup;
  uploadEditContact: any = {};
  uploadFiles: any = [];
  offlineContactsList: any = [];
  distributionNewName: any = "";
  fileUploadContent: any = {
    validContactList: []
  };
  @ViewChild('uploadMulitpleFile') uploadMultipleFile: ElementRef;
  @ViewChild('uploadSingleFile') uploadSingleFile: ElementRef;
  firstTime: number = 1;
  role: any = {};
  sampleDownloadFile: any;
  CountryISO: any = [];
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) {
    this.allCounties = this.countryService.allCountries;
  
    this.CountryISO = this.countryService.getcountryCode();
    // this.CountryISO=[
    //   'af',
    //   'al',
    //   'by',
    // ];
    this.role = this.common.getRole();
    let req = {
      "category": "DL"
    }
    this.apiService.post(this.constantsService.getFileTemplateList, req).subscribe((succ: any) => {


      console.log(succ);
      this.sampleDownloadFile = succ.data;


    });
  

  }

  ngOnInit() {
    myMethod();
    selectSearchMethod();



    this.BeforeDistList = this.formBuilder.group({

      distName: [''],
      phoneNumber: ['',],
      mainName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email])],
      pushToken: ['',],


    });
    this.updateUploadContact = this.formBuilder.group({

      phoneNumber: ['',],
      mainName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email])],
      pushToken: ['',]

    });

    this.EditDistFormSingle = this.formBuilder.group({

      phoneNumber: ['',],
      mainName: ['', Validators.compose([Validators.required])],
      email: ['', [Validators.email]],
      pushToken: ['',]

      // opPreMobileNo: ['', ]

    });
    this.EditDistFormSingle.patchValue(this.EditDistFormSingle)

    this.EditDistForm = this.formBuilder.group({
      distributionName: ['']
    });


    this.forName = this.formBuilder.group({
      forNameEdit: [''],
    });

    this.forName.controls['forNameEdit'].disable();
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.FileUpload = this.formBuilder.group({


      file: [''],
      fileName: [''],

    });

    const getid = this.common.getEditDistribution()
    this.user = this.common.getUser()

    if (!_.isEmpty(getid)) {
      this.loadList()
      this.isEdit = true;
      this.distObj.distributionName = getid.distributionName
      this.distObj.distributionId = getid.distributionId





      this.distObj.companyId = this.user.companyId
      this.distObj.distributionId = this.distObj.distributionId




    } else {

    }

    this.loadJquery();




  }
  getDistCount() {
    this.apiService.post(this.constantsService.listCheckAllDetails, this.distObj).subscribe((succ: any) => {

      this.Contacts = succ.data.totalCount
      this.active = succ.data.totalActive
      this.inactive = succ.data.totalInActive
    }, err => {
      this.common.hideLoading()

    }
    )
  }

  loadJquery() {
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);



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
    $(".user-arrow").click(function () {
      $(this).parent("th").find(".table-checkfilter").toggleClass("active");
      $('.tablesearch-content').mCustomScrollbar('update');
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
    this.getDistCount();

  }

  change2() {
    this.SaveButtons = true
    this.EditButtons = false
    this.forName.controls['forNameEdit'].enable();
  }

  change3() {
    this.SaveButtons = false
    this.EditButtons = true
    this.forName.controls['forNameEdit'].disable();
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


  editDist() {





    const getid = this.common.getEditDistribution()
    this.distObj.distributionId = getid.distributionId


    this.apiService.post(this.constantsService.distEditName, this.distObj).subscribe((succ: any) => {

      this.common.hideLoading();
      $('#contact-edit1').modal('hide')




      // if (!succ.data) {
      //   return;
      // }
      // if (this.isScroll) {
      //   this.listPushDistribution = this.listPushDistribution.concat(succ.data);
      // } else {
      //   this.listPushDistribution = succ.data;

      // }



    }, err => {
      this.common.hideLoading()


    }
    )



  }
  AcceptfileFormat: any = ['.xlsx', '.xls'];

  onFileSelect(event) {
    // this.compaignObj.campaignDesc



    // this.compaignObj.campaignDesc
    var file: File = event.target.files[0];
    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);


    // if (FileSize < 20000 || FileSize > 55000) {
    //   this.common.showErrorMessage("Please upload the image based on the given format and size should be within 20 - 50 Kb")
    //   return;
    // }

    if (_.indexOf(this.AcceptfileFormat, fileFormat.toLowerCase()) === -1) {
      this.common.showErrorMessage('Please upload excel file only');

      return;
    }
    if (event.target.files.length > 0) {
      $('#multiple-upload-file').modal('show')
      const file = event.target.files[0];

      this.uploadFiles.push({
        fileName: file.name,
        size: this.common.formatBytes(file.size),
        file: file,
        id: Math.random()
      })

      // this.distAddObj.fileNa = file.name;
      // this.distAddObj.file = file;




      // const getid = this.common.getEditDistribution()
      // this.distAddObj.distributionId = getid.distributionId
      //   const formData= {"distributionId":this.distAddObj.distributionId, "filePart":  this.distAddObj.file}


      // this.checkFileContent()


    }
  }
  deleteUploadFile(file) {
    for (var i = this.uploadFiles.length - 1; i >= 0; i--) {
      if (this.uploadFiles[i].id == file.id) {
        this.uploadFiles.splice(i, 1);
      }
    }
    this.reinitPopupTable();

    setTimeout(() => {
      this.initPopupDatatable();
    }, 2000);
  }
  cancelSelectMorePopup() {
    $('#multiple-upload-file').modal('hide');

    this.clearFileUpload();
    this.uploadFiles = [];

  }
  clearFileUpload() {
    this.uploadMultipleFile.nativeElement.value = null;
    this.uploadSingleFile.nativeElement.value = null;
    // this.uploadFiles = [];
  }
  checkFileContent() {
    const formData = new FormData();
    formData.append('companyId', this.user.companyId);
    formData.append('distributionName', this.distObj.distributionName);
    formData.append('distributionId', this.distAddObj.distributionId ? this.distAddObj.distributionId : 0);
    // formData.append('filePart', this.distAddObj.file);

    for (let i = 0; i < this.uploadFiles.length; i++) {
      formData.append('filePart', this.uploadFiles[i].file);

    }

    this.common.showLoading()

    this.apiService.uploadFile(this.constantsService.validateFileContent, formData).subscribe((succ: any) => {

      this.common.hideLoading()

      if (succ.code == 200) {
        this.clearFileUpload();
        this.reinitPopupTable();
        $('#multiple-upload-file').modal('hide')
        this.fileUploadContent = succ.data;
        this.contactList = succ.data.errorContactList;
        setTimeout(() => {
          this.initPopupDatatable();
        }, 1000);
        if (!this.isEdit) {
          if (succ.data.errorContactList.length) {
            $('#multiupload-popup').modal('show');


          } else {
            $('#multiupload-popup').modal('show')
            // this.initPopupDatatable();

            // if (this.offlineContactsList.length == 0)
            //   this.offlineContactsList = succ.data.validContactList;
            // else{
            //     for(let i=0;i<succ.data.validContactList.length;i++){
            //       this.offlineContactsList.push(succ.data.validContactList[i]);
            //     }
            // }
            // this.offlineContactsList.concat(succ.data.validContactList);
          }
        } else {
          if (succ.data.errorContactList.length == 0) {
            // this.uploadSuccessContact(this.fileUploadContent.validContactList);
            // this.common.showSuccessMessage("Contacts uploaded succesfully");
            $('#multiupload-popup').modal('show')
            // this.initPopupDatatable();


          } else {
            this.contactList = succ.data.errorContactList;
            $('#multiupload-popup').modal('show')
            // this.initPopupDatatable();



            this.countData();

          }
        }

        this.countData();

        // this.common.showSuccessMessage(succ.message);
        // this.distAddObj.fileName = succ.fileName;
        // this.distAddObj.fileType = succ.fileType;


        // this.router.navigateByUrl('/home/distribution-list')
        // this.saveCampaign();
      }
      else {
        // this.showDownloadFile=true;
        this.common.showErrorMessage(succ.message);

      }


    }, err => {

      this.common.hideLoading()
    })
  }
  countData() {
    this.contactCount = {
      valid: this.fileUploadContent.validContactList.length,
      invalid: this.fileUploadContent.errorContactList.length,
      total: this.fileUploadContent.validContactList.length + this.fileUploadContent.errorContactList.length
    };
    // for (var i = 0; i < this.contactList.length; i++) {
    //   if (this.contactList[i].isActive) {
    //     this.contactCount.valid++;
    //   } else {
    //     this.contactCount.invalid++;

    //   }
    // }
  }
  upload() {



    const formData = new FormData();
    formData.append('companyId', this.user.companyId);
    formData.append('distributionName', this.distObj.distributionName);
    formData.append('distributionId', this.distAddObj.distributionId);
    formData.append('filePart', this.distAddObj.file);

    this.common.showLoading()

    this.apiService.uploadFile(this.constantsService.saveContactsFile, formData).subscribe((succ: any) => {

      this.common.hideLoading()

      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);
        this.distAddObj.fileName = succ.fileName;
        this.distAddObj.fileType = succ.fileType;


        // this.router.navigateByUrl('/home/distribution-list')
        // this.saveCampaign();
      }
      else {
        // this.showDownloadFile=true;
        this.common.showErrorMessage(succ.message);

      }


    }, err => {

      this.common.hideLoading()
    })
    // this.common.hideLoading()

  }

  deleteFileContent(file) {
    const len = this.fileUploadContent.validContactList.length
    // for (let i = 0; i < this.fileUploadContent.validContactList.length; i++) {
    for (var i = this.fileUploadContent.validContactList.length - 1; i >= 0; i--) {

      if (file.fileName == this.fileUploadContent.validContactList[i].sourceFileName) {
        this.fileUploadContent.validContactList.splice(i, 1);
      }
    }

    for (var i = this.contactList.length - 1; i >= 0; i--) {
      if (this.contactList[i].sourceFileName == file.fileName) {
        this.contactList.splice(i, 1);
      }
    }
    this.deleteUploadFile(file)
  }
  Save() {

    let val = this.BeforeDistList.value;
    console.log(val)
    if (this.BeforeDistList.invalid) {
      this.BeforeDistList.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else if (!val.phoneNumber && !val.email && !val.pushToken) {
      console.log("invalid form")
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      this.common.showErrorMessage("Mobile number or email id or push token is required");
      return;
    }

    // return;
    // if (this.BeforeDistList.invalid) {
    //   this.BeforeDistList.markAllAsTouched();
    //   let target;
    //   target = this.el.nativeElement.querySelector('.ng-invalid')

    //   if (target) {
    //     $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
    //     target.focus();
    //   }
    //   return;
    // }

    else {
      if (val.phoneNumber)
        this.distAddObj.mobileNumber = this.common.convertCompleteCountryCode(this.distAddObj.phoneNumber)
      else
        this.distAddObj.mobileNumber = "";

      this.distAddObj.contactName = this.distAddObj.mainName
      this.distAddObj.isActive = '1'

      if (!this.isEdit) {

        for (let i = 0; i < this.offlineContactsList.length; i++) {

          if (val.phoneNumber && this.distAddObj.mobileNumber == this.offlineContactsList[i].mobileNumber) {
            this.common.showSuccessMessage("Mobile no is duplicate");
            return;
          } if (val.email && this.distAddObj.email == this.offlineContactsList[i].email) {
            this.common.showSuccessMessage("Email is duplicate");
            return;
          } if (val.pushToken && this.distAddObj.pushToken == this.offlineContactsList[i].pushToken) {
            this.common.showSuccessMessage("Push Token is duplicate");
            return;
          }
        }

        this.distAddObj.createdDate = new Date();
        this.offlineContactsList.push(this.distAddObj);
        this.distAddObj = {};
        this.BeforeDistList.reset();


        return;

      }

      this.common.showLoading()


      const getid = this.common.getEditDistribution()
      this.distAddObj.distributionId = getid.distributionId



      this.apiService.post(this.constantsService.addDist, this.distAddObj).subscribe((succ: any) => {

        this.common.hideLoading()


        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          // this.ngOnInit();
          this.router.navigateByUrl('/home/distribution-list/distribution');
          this.BeforeDistList.reset();
          // this.ngOnInit()
          this.loadList();
          this.getDistCount();

          // this.router.navigate(['../home/distribution-list']);



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


  showModal(user) {
    // let data={}
    // =\
    $('#userModal').modal('show')

    this.selectedUser = user;
  }


  showModalEdit(user) {
    // let data={}
    // =\



    // this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {
    //   this.listCountryCode = succ.data.countryCodeList;
    //   this.distAddObj.opPreMobileNo = this.listCountryCode[0].countryCode

    // }, err => {

    // })
    this.selectedUserEdit = {};


    $('#contact-edit').modal('show')

    Object.assign(this.selectedUserEdit, user)


    // this.selectedUserEdit = user;
    setTimeout(() => {
      this.EditDistFormSingleOld = this.EditDistFormSingle.value

      this.EditDistFormSingle.valueChanges.subscribe(value => {


        this.EditDistFormSingleNew = value
      });
    }, 3000);
    var mobile = _.split(user.mobileNumber, '-', 2);

    this.EditDistFormSingle.controls.phoneNumber.setValue(mobile[1]);

    let countryCode: any = this.allCounties.filter(element => {
      return element[2] == mobile[0];
    });
    countryCode = countryCode[0]
    this.uploadEditContact.mobileIso = countryCode[1];

    // this.selectedUserEdit.mobileNumberDup = this.common.splitNo(this.selectedUserEdit.mobileNumberDup)
    // var opPreMobileNo = this.selectedUserEdit.mobileNumberDup.preMobileNo
    // this.selectedUserEdit.opPreMobileNo = opPreMobileNo
    // this.selectedUserEdit.postMobileNo = this.selectedUserEdit.mobileNumberDup.postMobileNo
  }



  checkUncheckAll() {


    for (var i = 0; i < this.listDistribution.length; i++) {
      this.listDistribution[i].isSelected = this.masterSelected;


      this.selectedUserPush.push(this.listDistribution[i])
      if (this.listDistribution[i].isSelected === true) {
        this.totalCount = this.listDistribution.length



      }
      if (this.listDistribution[i].isSelected === false) {
        this.totalCount = ''



      }




    }

    // this.apiService.post(this.constantsService.listDist, this.reqObj).subscribe((succ: any) => {

    //   this.common.hideLoading()

    //   if (!succ.data) {
    //     return;
    //   }


    //   this.listDistribution = succ.data;






    // });

  }



  isAllSelected(value) {


    let count = 0;

    this.masterSelected = this.listDistribution.every(function (listDistribution: any, value) {
      return listDistribution.isSelected == true;



    })


    // this.selectedUser = value;
    // this.getCheckedItemList();
  }
  initDatatable() {

    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      aaSorting: [],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {

      this.initDatatable();


    }, 2000);
  }
  initPopupDatatable() {

    var oTable = $(".popupDatatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      aaSorting: [],
    })
    // $('#searchTextId').keyup(function () {
    //   oTable.search($(this).val()).draw();
    // })
  }
  reinitPopupTable() {
    $('.popupDatatable').dataTable().fnDestroy();
    // setTimeout(() => {

    //   this.initDatatable();


    // }, 2000);
  }
  deleteall() {
    let id = [];
    for (var i = 0; i < this.listDistribution.length; i++) {
      if (this.listDistribution[i].isSelected) {
        id.push(this.listDistribution[i].contactId)
      }

    }
    var data = {
      contactIds: id
    }
    this.common.showLoading()
    this.apiService.post(this.constantsService.deleteMultipleContactListDL, data).subscribe((succ: any) => {

      this.common.hideLoading();

      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        // this.ngOnInit();
        let id = [];
        this.back();
      }

      else {
        this.common.showErrorMessage(succ.message);
        // this.ngOnInit();
        this.loadList();
        this.getDistCount();
      }





    }, err => {


      this.common.hideLoading();

    });

  }






  statusCall(data) {
    let id = [];
    for (var i = 0; i < this.listDistribution.length; i++) {
      if (this.listDistribution[i].isSelected) {
        id.push(this.listDistribution[i].contactId)
      }

    }

    if (data == 'active') {

      var finaldata = {
        contactIds: id,
        isActive: 1
      }

    }

    if (data == 'inactive') {

      var finaldata = {
        contactIds: id,
        isActive: 0
      }

    }
    this.common.showLoading()

    this.apiService.post(this.constantsService.activateInactivateContactList, finaldata).subscribe((succ: any) => {

      this.common.hideLoading();

      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        let id = [];
        this.back();

      }

      else {
        this.common.showErrorMessage(succ.message);
        // this.ngOnInit();
        this.loadList();
        this.getDistCount();
      }





    }, err => {


      this.common.hideLoading();

    });

  }


  Clear() {
    this.BeforeDistList.reset()

  }
  back() {
    this.location.back();
    // this.router.navigate(['../home/service-management/']);
  }

  editSingleDist() {
    let val = this.EditDistFormSingle.value;
    console.log(val)
    if (this.EditDistFormSingle.invalid) {
      this.EditDistFormSingle.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else if (!val.phoneNumber && !val.email && !val.pushToken) {
      console.log("invalid form")
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      this.common.showErrorMessage("Mobile number or email id or push token is required");
      return;
    }

    // if (this.EditDistFormSingle.invalid) {
    //   this.EditDistFormSingle.markAllAsTouched();
    //   return;
    // }
    else {


      if (_.isEmpty(this.EditDistFormSingleNew)) {
        this.EditDistFormSingleNew = this.EditDistFormSingleOld
      }
      else {
        this.EditDistFormSingleNew = this.EditDistFormSingleNew
      }
      if (_.isEqual(this.EditDistFormSingleOld, this.EditDistFormSingleNew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      }
      else {
        if (this.selectedUserEdit.postMobileNo)
          this.selectedUserEdit.mobileNumber = this.common.convertCompleteCountryCode(this.selectedUserEdit.postMobileNo)
        else
          this.selectedUserEdit.mobileNumber = ""

        this.common.showLoading()
        var pushdist = {
          "mobileNumber": this.selectedUserEdit.mobileNumber,
          "contactName": this.selectedUserEdit.contactName,
          "email": this.selectedUserEdit.email,
          "contactId": this.selectedUserEdit.contactId,
          pushToken: this.selectedUserEdit.pushToken
        }

        this.apiService.post(this.constantsService.editDist, pushdist).subscribe((succ: any) => {

          $('#contact-edit').modal('hide')

          this.common.hideLoading();

          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.getDistCount();
            this.loadList();
            this.EditDistFormSingle.reset();
            this.selectedUserEdit = {}
            $('#contact-edit').modal('hide')
          }
          else {
            this.common.showErrorMessage(succ.message);
          }

        }, err => {
          $('#contact-edit').modal('hide')

          this.common.hideLoading();

        });

      }
    }
    this.getDistCount();


  }


  backDsitName() {
    $('#contact-edit1').modal('hide')

  }
  backSingleDist() {
    $('#contact-edit').modal('hide')

  }

  loadList() {


    // this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {
    //   this.listCountryCode = succ.data.countryCodeList;
    //   // this.distAddObj.opPreMobileNo = this.listCountryCode[0].countryCode

    // }, err => {

    // })
    this.listDistribution = []
    const getid = this.common.getEditDistribution()
    this.distAddObj.distributionId = getid.distributionId

    this.reqObj['distributionId'] = this.distAddObj.distributionId
    this.apiService.post(this.constantsService.listDist, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();


      this.listDistribution = succ.data

      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        if (this.firstTime == 1) {
          this.initDatatable();
          this.firstTime = 0;
        }
        else
          this.reinitTable()
      }, 1000);
      setTimeout(() => {
        $('.dtmain-search').click(function () {
          $('.dt-box').show();
          $('.dt-remove').addClass('active');
        });
        $('.icon-close1').click(function () {
          $('.dt-box').hide();
          $('.dt-remove').removeClass('active');
        });
      }, 3000);

    },
      err => {
        this.common.hideLoading()

      });


  }
  closeDetailModal() {
    $('#multiupload-popup').modal('hide')
    this.reinitPopupTable();

    this.distAddObj.fileNa = "";
    this.distAddObj.file = "";
    this.uploadFiles = [];
  }
  onScroll() {

    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }

  changeSearch(val) {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    if (val.length <= this.maxLength) {

    }
    else {
      // this.ngOnInit();
      this.loadList();

    }

  }



  deleteSingleDist() {


    if (!this.isEdit) {
      for (let i = 0; i < this.offlineContactsList.length; i++) {
        if (this.offlineContactsList[i] === this.selectedUser) {
          this.offlineContactsList.splice(i, 1);
        }
      }
      $('#userModal').modal('hide')
      return;
    }

    this.common.showLoading()
    var pushdist = { "mobileNumber": this.selectedUser.mobileNumber, "contactName": this.selectedUser.contactName, "email": this.selectedUser.email, "contactIds": [this.selectedUser.contactId] }
    this.apiService.post(this.constantsService.deleteDist, pushdist).subscribe((succ: any) => {

      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        // this.ngOnInit();
        this.loadList();
        this.getDistCount();
        this.selectedUser = {}
        this.selectedUserPush.push = []
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide')

      this.common.hideLoading();

    });
  }
  uploadContacts() {


    this.common.showLoading()
    for (var i = 0; i < this.contactList.length; i++) {

      this.apiService.post(this.constantsService.addDist, this.contactList[i]).subscribe((succ: any) => {

        // this.BeforeDistList.reset();
        // this.ngOnInit()
        this.loadList();
        this.getDistCount();


      },
        err => {
          this.common.hideLoading()

        });

    }



    setTimeout(() => {
      this.loadList();
      this.router.navigateByUrl('/home/distribution-list/distribution');
      this.BeforeDistList.reset();
      this.uploadFiles = [];
      this.closeDetailModal()
      this.common.hideLoading()

    }, 5000);



  }
  deleteContact(contact) {
    for (var i = this.contactList.length - 1; i >= 0; i--) {
      if (this.contactList[i] === contact) {
        this.contactList.splice(i, 1);
      }
    }
    this.reinitPopupTable();
    setTimeout(() => {
      this.initPopupDatatable();
    }, 1000);
    this.countData();
  }
  editUploadContact(contact) {

    this.uploadEditContact = contact;
    var mobile = _.split(contact.mobileNumber, '-', 2);
    contact.id = Math.random();
    this.updateUploadContact.controls.phoneNumber.setValue(mobile[1]);

    let countryCode: any = this.allCounties.filter(element => {
      return element[2] == mobile[0];
    });
    countryCode = countryCode[0]
    this.uploadEditContact.mobileIso = countryCode[1];
    // this.uploadEditContact.phoneNumber = mobileNumber

  }
  saveUploadEditContact() {

    if (this.updateUploadContact.invalid) {
      this.updateUploadContact.markAllAsTouched();
      return;
    }

    if (this.isEdit) {
      let obj = this.updateUploadContact.value;

      let no = "";
      if (obj.phoneNumber)
        no = this.common.convertCompleteCountryCode(obj.phoneNumber)

      this.uploadEditContact.mobileNumber = no;

      let reqObj: any = {}
      reqObj.distributionId = this.distObj.distributionId;
      if (this.uploadEditContact.phoneNumber)
        reqObj.mobileNumber = this.common.convertCompleteCountryCode(this.uploadEditContact.phoneNumber)
      else
        reqObj.phoneNumber = ""
      reqObj.phoneNumber = reqObj.mobileNumber
      reqObj.email = this.uploadEditContact.email
      reqObj.contactName = this.uploadEditContact.contactName
      reqObj.pushToken = this.uploadEditContact.pushToken
      reqObj.isActive = '1'


      this.common.showLoading();
      this.apiService.post(this.constantsService.addDist, reqObj).subscribe((succ: any) => {

        this.common.hideLoading()


        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          // this.ngOnInit();
          for (var i = this.contactList.length - 1; i >= 0; i--) {
            if (this.contactList[i].id == this.uploadEditContact.id) {
              this.contactList.splice(i, 1);
            }
          }
          this.countData();
          $("#edit-upload").modal("hide");
          this.reinitPopupTable();

          setTimeout(() => {
            this.initPopupDatatable();
          }, 1000);
        }
        else {
          this.common.showErrorMessage(succ.message)

        }

      }, err => {
        this.common.hideLoading()

      });
    } else {
      let obj = this.updateUploadContact.value;
      let no = "";
      if (obj.phoneNumber)
        this.common.convertCompleteCountryCode(obj.phoneNumber)
      for (let i = 0; i < this.fileUploadContent.validContactList.length; i++) {

        if (no && no == this.fileUploadContent.validContactList[i].mobileNumber) {
          this.common.showSuccessMessage("Mobile no is duplicate");
          return;
        } if (obj.email && obj.email == this.fileUploadContent.validContactList[i].email) {
          this.common.showSuccessMessage("Email is duplicate");
          return;
        } if (obj.pushToken && obj.pushToken == this.fileUploadContent.validContactList[i].pushToken) {
          this.common.showSuccessMessage("Push Token is duplicate");
          return;
        }
      }
      this.uploadEditContact.mobileNumber = no;
      this.fileUploadContent.validContactList.push(this.uploadEditContact);
      for (var i = this.contactList.length - 1; i >= 0; i--) {
        if (this.contactList[i].id == this.uploadEditContact.id) {
          this.contactList.splice(i, 1);
        }
      }
      $("#edit-upload").modal("hide");
      this.reinitPopupTable();

      setTimeout(() => {
        this.initPopupDatatable();
      }, 1000);
    }


    // this.fileUploadContent.
  }
  createDistributionList() {
    this.distributionNewName = this.distributionNewName.trim()
    if (!this.distributionNewName) {
      this.common.showErrorMessage("Please enter distribution name");
      return;
    }
    // this.distributionNewName.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
    // if(/\s/g.test(this.distributionNewName)){
    //   this.common.showErrorMessage("Please enter distribution name");
    //   return; 
    // }

    let reqObj = {
      "distributionList": {
        "distributionId": 0,
        "distributionName": this.distributionNewName.replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
        "dlCategory": "1",
        "isActive": 1,
      },

      "contactList": this.offlineContactsList,
    }
    this.common.showLoading();
    this.apiService.post(this.constantsService.createDistributionList, reqObj).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigateByUrl('/home/distribution-list');
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    },
      err => {
        this.common.hideLoading()

      });
  }
  cancel() {
    this.router.navigateByUrl('/home/distribution-list');
  }
  proceedData() {
    if (!this.isEdit) {
      for (let i = 0; i < this.fileUploadContent.validContactList.length; i++) {
        this.fileUploadContent.validContactList[i].createdDate = new Date()

      }

      if (this.offlineContactsList.length == 0)
        this.offlineContactsList = this.fileUploadContent.validContactList;
      else {
        for (let k = 0; k < this.fileUploadContent.validContactList.length; k++) {
          this.offlineContactsList.push(this.fileUploadContent.validContactList[k]);

        }

      }

    } else {

      this.uploadSuccessContact(this.fileUploadContent.validContactList);
    }


    $('#multiupload-popup').modal('hide');
    this.reinitPopupTable();
    this.distAddObj.fileNa = "";
    this.distAddObj.file = "";
    this.uploadFiles = [];
  }
  uploadSuccessContact(data) {
    this.common.showLoading();
    for (let i = 0; i < data.length; i++) {


      let reqObj: any = {}
      reqObj.distributionId = this.distObj.distributionId;

      // reqObj.mobileNumber = this.common.convertCompleteCountryCode(data[i].phoneNumber)
      reqObj.mainName = data[i].contactName
      reqObj.phoneNumber = data[i].mobileNumber
      reqObj.mobileNumber = data[i].mobileNumber

      reqObj.email = data[i].email
      reqObj.contactName = data[i].contactName
      reqObj.pushToken = data[i].pushToken
      reqObj.isActive = '1'


      this.common.showLoading();
      this.apiService.post(this.constantsService.addDist, reqObj).subscribe((succ: any) => {




      }, err => {


      });
    }
    setTimeout(() => {
      $('#multiupload-popup').modal('hide');
      this.reinitPopupTable();
      this.distAddObj.fileNa = "";
      this.distAddObj.file = "";
      this.uploadFiles = [];
      // this.changeSearch();
      this.router.navigateByUrl('/home/distribution-list');

      this.common.hideLoading();
      this.common.showSuccessMessage("Contacts uploaded succesfully");
    }, 3000);
  }
  downloadSampleFile() {
    // var pushsms = file;
    let file = this.sampleDownloadFile[0];
    console.log(file);

    this.common.showLoading();
    // var dist = { distributionId: distribution.distributionId }
    this.apiService.downloadFile(this.constantsService.downloadFileTemplate, file).subscribe((succ: any) => {

      this.common.hideLoading();

      this.common.downloadFile(succ, file.description);
    }, err => {


      this.common.hideLoading();

    });



  }
  ngOnDestroy() {
    // var Opid = {};
    // alert("sdfk")
    this.common.setEditDistribution({});
  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
}
