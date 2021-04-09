import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import * as _ from 'lodash';
import { TooltipLabel } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';
import { spaceValidator } from 'src/service/utils';

// import * as $ from 'jquery';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
// import 'src/assets/js/FarsiType.js'


@Component({
  selector: 'app-safelist',
  templateUrl: './safelist.component.html',
  styleUrls: ['./safelist.component.css']
})
export class SafelistComponent implements OnInit {

  isScroll: boolean;
  role: any;
  pluginVali: boolean;
  ListForm: FormGroup;
  ListFormOld: any;
  ListFormnew: any;
  mobileList: any = {
    "type": "0",
    "languageId": "AR"
  }

  reqObj: any = {

    "type": 1,

  }
  // mobileList.type = 1

  listCountryCode: any = [];
  listLanguage: any = [];
  listBlockList: any = {
    mobileList: [],
    emailList: [],
    countryCodeList: [],
    contentList: [],
    count: ""
  };
  block: boolean = true;

  selectedBlock: any = {};
  table: any;
  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
  compObj: any = {}
  selectedCorpPreMobileNo = "in"
  // selectedCorpPreMobileNo = "in"
  selectedCorpContactPreMobileNo = "in"
  ActiveLanguages: any = [];
  uploadFiles: any = [];
  @ViewChild('uploadMulitpleFile') uploadMultipleFile: ElementRef;
  @ViewChild('uploadSingleFile') uploadSingleFile: ElementRef;
  user: any;
  fileUploadContent: any = { validBlockList: [] }

  errorList: any = []
  editUploadCont: boolean = false;
  validBlockList: any = [];
  uploadReason: any = ""
  deletedReason: any = ""
  deletedBlock: any;
  categoryList: any = [];
  blockCategoryList: { id: number; name: string; }[];
  isEditIndividualBlock: boolean;
  allCountry: any[];
  internationalCountryCode: []
  isEdit: boolean;
  AppOrRejForm: FormGroup;
  pendingBlock: any = {};
  errMsg: boolean;
  isMainChecker: any;
  pendingFileList: any = [];
  getBlockId: number;
  setItem: any;
  CountryISO: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    //this.countryService.getApiCountryCode();
    this.isMainChecker = this.common.getMainMenu().isMainChecker;
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

    this.blockCategoryList = [
      {
        id: 1,
        name: "All",
      },
      {
        id: 2,
        name: "Transaction Alerts",
      },
      {
        id: 3,
        name: "Campaign Alerts",
      }
    ]
    this.apiService.post(this.constantsService.getCompanyMaster, {}).subscribe((succ: any) => {
      this.listCountryCode = succ.data.countryMaster;
      this.compObj.countryMod = this.listCountryCode[0];
    })

    this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {
      this.listCountryCode = succ.data.countryCodeList;

    }, err => {

    })




    // this.apiService.post(this.constantsService.listLanguage, {}).subscribe((succ: any) => {
    //   this.listLanguage = succ.data;

    // }, err => {

    // })

    this.apiService.post(this.constantsService.getActiveLanguages, {}).subscribe((succ: any) => {

      this.ActiveLanguages = succ.data;
      this.selectedBlock.languageId = succ.data[0].langId
    });
    this.ListForm = this.formBuilder.group({


      mobileNumber: ['', Validators.required],
      pendingMobileNumber: [''],
      email: [''],
      countryCode: [''],
      content: [''],
      language: [''],
      reason: ['', Validators.required],
      languageId: [''],
      categoryId: [''],
      allCategory: ['', Validators.required],
    })
    this.ListForm.patchValue(this.ListForm)
    this.apiService.post(this.constantsService.viewCategoryList, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();
      this.categoryList = succ.data.data;


    }, err => {
      this.common.hideLoading()


    }

    )
    this.AppOrRejForm = this.formBuilder.group({
      reason: ['']
    });
  }



  ngOnInit() {

    
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





    myMethod();
    selectSearchMethod();
    this.loadData();


    this.getCountData();


    // this.mobileList.language = 0

  }
  loadJQuery() {

  }
  loadData() {
    this.common.showLoading()
    this.reqObj.isMainChecker = this.isMainChecker;
    this.apiService.post(this.constantsService.viewBlockItems, this.reqObj).subscribe((succ: any) => {
      console.log(succ);
      this.common.hideLoading()


      // if (this.listBlockList.mobileList)
      //   setTimeout(() => {
      //     this.table = $(".smsDatatable").DataTable({
      //       scrollCollapse: true,
      //       aaSorting: [[0, 'asc']]
      //     })
      //     // $('[data-toggle="tooltip"]').tooltip({
      //     //   trigger: 'hover'
      //     // });
      //     //  alert("2")


      //   }, 1000);
      if (this.reqObj.type == 1) {
        this.listBlockList.mobileList = []

        this.listBlockList.mobileList = succ.data ? succ.data : [];
        if (succ.txnData.length) {
          for (let i = 0; i < succ.txnData.length; i++) {
            let json = JSON.parse(succ.txnData[i].new_DTLS);
            console.log(json);
            if (json.length > 0) {
              if (json[0].type != 1)
                continue;
            }
            else if (json.length != 0) {
              if (json.type != 1)
                continue;
            }


            let obj: any = {

              blockId: succ.txnData[i].wf_ID,
              createdBy: succ.txnData[i].userId,
              createdDate: succ.txnData[i].record_TIME,
              wfId: succ.txnData[i].wf_ID,
              fileNewDetails: succ.txnData[i].new_DTLS,
              txn_CODE: succ.txnData[i].txn_CODE,
              TXN_SUB_CODE: succ.txnData[i].txn_SUB_CODE,

              statusId: 3
            }


            obj.categoryList = json.categoryList
            obj.all = json.all
            obj.blockItem = json.blockItem
            obj.reason = json.reason
            obj.createdBy = json.createdBy

            if (obj.TXN_SUB_CODE == "File Upload") {
              obj.blockItem = "File Upload"
              obj.reason = json[0].reason
              obj.createdBy = json[0].createdBy
              obj.statusId = 6;

            }



            this.listBlockList.mobileList.push(obj);
          }

        }
        this.reintiSMSTable();
      }
      else if (this.reqObj.type == 2) {
        this.listBlockList.emailList = []

        this.listBlockList.emailList = succ.data ? succ.data : [];
        if (succ.txnData.length) {
          for (let i = 0; i < succ.txnData.length; i++) {
            let json = JSON.parse(succ.txnData[i].new_DTLS);
            console.log(json);
            if (json.length > 0) {
              if (json[0].type != 2)
                continue;
            }
            else if (json.length != 0) {
              if (json.type != 2)
                continue;
            }

            let obj: any = {

              blockId: succ.txnData[i].wf_ID,
              createdBy: succ.txnData[i].userId,
              createdDate: succ.txnData[i].record_TIME,
              wfId: succ.txnData[i].wf_ID,
              fileNewDetails: succ.txnData[i].new_DTLS,
              txn_CODE: succ.txnData[i].txn_CODE,
              TXN_SUB_CODE: succ.txnData[i].txn_SUB_CODE,

              statusId: 3
            }


            obj.categoryList = json.categoryList
            obj.all = json.all
            obj.blockItem = json.blockItem
            obj.reason = json.reason
            obj.createdBy = json.createdBy

            if (obj.TXN_SUB_CODE == "File Upload") {
              obj.blockItem = "File Upload"
              obj.reason = json[0].reason
              obj.createdBy = json[0].createdBy
              obj.statusId = 6;

            }



            this.listBlockList.emailList.push(obj);
          }

        }
        this.reintiEmailTable();
      }
      else if (this.reqObj.type == 3) {
        this.listBlockList.countryCodeList = []
        this.listBlockList.countryCodeList = succ.data ? succ.data : [];
        if (succ.txnData.length) {
          for (let i = 0; i < succ.txnData.length; i++) {
            let json = JSON.parse(succ.txnData[i].new_DTLS);
            console.log(json);
            if (json.length > 0) {
              if (json[0].type != 3)
                continue;
            }
            else if (json.length != 0) {
              if (json.type != 3)
                continue;
            }

            let obj: any = {

              blockId: succ.txnData[i].wf_ID,
              createdBy: succ.txnData[i].userId,
              createdDate: succ.txnData[i].record_TIME,
              wfId: succ.txnData[i].wf_ID,
              fileNewDetails: succ.txnData[i].new_DTLS,
              txn_CODE: succ.txnData[i].txn_CODE,
              TXN_SUB_CODE: succ.txnData[i].txn_SUB_CODE,

              statusId: 3
            }


            obj.categoryList = json.categoryList
            obj.all = json.all
            obj.blockItem = json.blockItem
            obj.reason = json.reason
            obj.createdBy = json.createdBy

            if (obj.TXN_SUB_CODE == "File Upload") {
              obj.blockItem = "File Upload"
              obj.reason = json[0].reason
              obj.createdBy = json[0].createdBy
              obj.statusId = 6;

            }



            this.listBlockList.countryCodeList.push(obj);
          }

        }
        this.reintiCountryCodeTable();

      }
      else if (this.reqObj.type == 4) {
        this.listBlockList.contentList = []

        this.listBlockList.contentList = succ.data ? succ.data : [];
        if (succ.txnData.length) {
          for (let i = 0; i < succ.txnData.length; i++) {
            let json = JSON.parse(succ.txnData[i].new_DTLS);
            console.log(json);
            if (json.length > 0) {
              if (json[0].type != 4)
                continue;
            }
            else if (json.length != 0) {
              if (json.type != 4)
                continue;
            }

            let obj: any = {

              blockId: succ.txnData[i].wf_ID,
              createdBy: succ.txnData[i].userId,
              createdDate: succ.txnData[i].record_TIME,
              wfId: succ.txnData[i].wf_ID,
              fileNewDetails: succ.txnData[i].new_DTLS,
              txn_CODE: succ.txnData[i].txn_CODE,
              TXN_SUB_CODE: succ.txnData[i].txn_SUB_CODE,

              statusId: 3
            }


            obj.categoryList = json.categoryList
            obj.all = json.all
            obj.blockItem = json.blockItem
            obj.reason = json.reason
            obj.createdBy = json.createdBy

            if (obj.TXN_SUB_CODE == "File Upload") {
              obj.languageId=json[0].languageId
              obj.blockItem = "File Upload"
              obj.reason = json[0].reason
              obj.createdBy = json[0].createdBy
              obj.statusId = 6;

            }



            this.listBlockList.contentList.push(obj);
          }

        }
        this.reintiContenTable();

      }
    }, err => {
      this.common.hideLoading()


    }
    )
  }
  getCountData() {
    this.apiService.post(this.constantsService.countBlockItems, this.reqObj).subscribe((succ: any) => {

      this.listBlockList.count = succ.data[0]

    }, err => {
      this.common.hideLoading()


    }
    )
  }
  get f() { return this.ListForm.controls; }

  downloadSample() {
    console.log(this.setItem, "this.setItem")
    if(this.setItem === undefined){
      this.setItem = "1"
    }
    var  id = this.setItem
    this.common.showLoading()
    const SendId = { "statusFilter": id }
    this.apiService.downloadFile(this.constantsService.sampleBlockDownload, SendId).subscribe((succ: any) => {
      console.log(succ, "succsuccsuccId")

      const format = "xlsx"
      if (id == 1) {
        this.common.downloadFile(succ, "SampleBLSMS", format); 

      }
      if (id == 2) {
        this.common.downloadFile(succ, "SampleBLEmail", format);

      }
      if (id == 3) {
        this.common.downloadFile(succ, "SampleBLCountryCode", format);

      }
      if (id == 4) {
        this.common.downloadFile(succ, "SampleBLContent", format);

      }
      this.common.hideLoading()


    }, err => {
      this.common.hideLoading()

    })

  }
  deleteBlock(block) {


    $('#deleteModal').modal('show');
    this.deletedBlock = block

  }
  closeDelete() {
    $('#deleteModal').modal('hide');
    this.deletedReason = ""
  }
  deleteBlockItem() {

    if (!this.deletedReason) {
      // this.errMsg = true;
      this.common.showErrorMessage("Reason is must");
      return;
    }
    this.deletedBlock.isMainChecker = this.isMainChecker;
    this.common.showLoading();
    this.apiService.post(this.constantsService.deleteBlockItems, this.deletedBlock).subscribe((succ: any) => {

      this.common.hideLoading()
      if (succ.code == 200) {
        $('#deleteModal').modal('hide');
        this.deletedReason = ""
        this.common.showSuccessMessage(succ.message);
        this.getCountData()
        this.loadData();
      } else {
        this.common.showErrorMessage(succ.message);

      }
    }, err => {
      this.common.hideLoading()


    }
    )
  }
  reintiSMSTable() {
    $('.smsDatatable').dataTable().fnDestroy();
    setTimeout(() => {

      var oTable = $(".smsDatatable").DataTable({
        scrollCollapse: true,
        // searching: false,
        aaSorting: [],
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })


    }, 2000);
  }
  reintiEmailTable() {
    $('.emailDatatable').dataTable().fnDestroy();
    setTimeout(() => {

      var oTable = $(".emailDatatable").DataTable({
        scrollCollapse: true,
        // searching: false,
        aaSorting: [],
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })


    }, 2000);
  }
  reintiCountryCodeTable() {
    $('.countryCodeDatatable').dataTable().fnDestroy();
    setTimeout(() => {

      var oTable = $(".countryCodeDatatable").DataTable({
        scrollCollapse: true,
        // searching: false,
        aaSorting: [],
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })


    }, 2000);
  }
  reintiContenTable() {
    $('.contentDatatable').dataTable().fnDestroy();
    setTimeout(() => {

      var oTable = $(".contentDatatable").DataTable({
        scrollCollapse: true,
        // searching: false,
        aaSorting: [],
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })


    }, 2000);
  }
  tabClick(item, type) {
      this.setItem = type

    this.editUploadCont = false;
    this.selectedBlock = {}
    this.selectedBlock.reason = "";
    // this.uploadReason = ""
    this.selectedBlock.categoryId = []
    this.selectedBlock.allCategory = 1

    this.reqObj.type = type;

    this.loadData();

    if (type == "1") {
      this.selectedBlock.title = "SMS";




      this.mobileList.select = type;


    }
    if (type == "2") {
      this.selectedBlock.title = "Email";




      this.mobileList.select = type;


    }


    if (type == "3") {
      this.selectedBlock.title = "Country code";



      this.mobileList.select = type;


    }

    if (type == "4") {
      this.selectedBlock.title = "content";





      this.mobileList.select = type;


    }
    this.mobileList.blockItem = "";
    // blockItem
  }





  selectLanguage($event) {

    if (!$event) {
      return
    }
    // this.ListForm.controls['language'] = this.language;


    this.common.showLoading()
    this.reqObj.isMainChecker = this.isMainChecker;
    this.apiService.post(this.constantsService.viewBlockAndWhiteListMobileNumbers, this.reqObj).subscribe((succ: any) => {
      this.common.hideLoading()
      if (this.isScroll) {

        if (succ.message == null) {
          this.isScroll = false;
        }
        else {
          // this.mobileList.languageId = "AR"

          //  this.listBlockList = this.listBlockList.concat(succ.data.mobileNumbers);
          this.listBlockList = succ.data.mobileNumbers;

        }

      } else {
        // this.mobileList.languageId = "AR"


        this.listBlockList = succ.data.mobileNumbers ? succ.data.mobileNumbers : [];

      }
    }, err => {
      this.common.hideLoading()


    }
    )




  }
  closePendingModal() {
    $('.pendingFileModaltable').dataTable().fnDestroy();
    this.reinitPopupTable();
    $("#pendingFileModal").modal("hide");

  }
  reintiPendingFileModalTable() {

    setTimeout(() => {

      var oTable = $(".pendingFileModaltable").DataTable({
        scrollCollapse: true,
        // searching: false,
        aaSorting: [],
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })


    }, 2000);
  }
  addBlock(title, block) {

    if (block.statusId == '6') {

      this.reintiPendingFileModalTable();
      $("#pendingFileModal").modal("show");
      this.pendingBlock = block;
      this.pendingFileList = JSON.parse(block.fileNewDetails);
      this.AppOrRejForm.get('reason').reset()

      return;

      // this.ListForm.disable();
    }
    this.ListForm.enable();
    //   return;
    this.editUploadCont = false;


    this.ListForm.reset();
    setTimeout(() => {


      if (this.reqObj.type == 1) {
        this.ListForm.controls["mobileNumber"].setValidators([Validators.required]);

        this.ListForm.get('mobileNumber').updateValueAndValidity();
        this.ListForm.controls["allCategory"].setValidators([Validators.required]);

        this.ListForm.get('allCategory').updateValueAndValidity();
        this.ListForm.get('email').clearValidators();
        this.ListForm.get('email').updateValueAndValidity();

        this.ListForm.get('languageId').clearValidators();
        this.ListForm.get('languageId').updateValueAndValidity();
        this.ListForm.get('content').clearValidators();
        this.ListForm.get('content').updateValueAndValidity();

        this.ListForm.get('countryCode').clearValidators();
        this.ListForm.get('countryCode').updateValueAndValidity();
        this.getBlockId = 1


      }
      else if (this.reqObj.type == 2) {
        // this.ListForm.get('email').setValidators(Validators.required);

        this.ListForm.controls["email"].setValidators([Validators.required, Validators.email, spaceValidator]);

        this.ListForm.get('email').updateValueAndValidity();
        this.ListForm.controls["allCategory"].setValidators([Validators.required]);

        this.ListForm.get('allCategory').updateValueAndValidity();

        this.ListForm.get('mobileNumber').clearValidators();
        this.ListForm.get('mobileNumber').updateValueAndValidity();

        this.ListForm.get('language').clearValidators();
        this.ListForm.get('language').updateValueAndValidity();

        this.ListForm.get('countryCode').clearValidators();
        this.ListForm.get('countryCode').updateValueAndValidity();
        this.ListForm.get('languageId').clearValidators();
        this.ListForm.get('languageId').updateValueAndValidity();
        this.ListForm.get('content').clearValidators();
        this.ListForm.get('content').updateValueAndValidity();
        this.getBlockId = 2
      }
      else if (this.reqObj.type == 3) {
        this.ListForm.get('mobileNumber').clearValidators();
        this.ListForm.get('mobileNumber').updateValueAndValidity();

        this.ListForm.get('email').clearValidators();
        this.ListForm.get('email').updateValueAndValidity();


        this.ListForm.get('content').clearValidators();
        this.ListForm.get('content').updateValueAndValidity();
        this.ListForm.get('languageId').clearValidators();
        this.ListForm.get('languageId').updateValueAndValidity();
        this.ListForm.get('allCategory').clearValidators();
        this.ListForm.get('allCategory').updateValueAndValidity();

        this.ListForm.controls["countryCode"].setValidators([Validators.required]);
        this.getBlockId = 3


        this.ListForm.get('countryCode').updateValueAndValidity();
        // // this.ListForm.controls["countryCode"].setValidators([Validators.required]);

        // // this.ListForm.get('countryCode').updateValueAndValidity();
        // this.ListForm.get('countryCode').clearValidators();
        // this.ListForm.get('countryCode').updateValueAndValidity();
        // hide the phone no
        // $(".custom").css({ "display": "none" });
      }
      else if (this.reqObj.type == 4) {
        this.ListForm.get('mobileNumber').clearValidators();
        this.ListForm.get('mobileNumber').updateValueAndValidity();

        this.ListForm.get('email').clearValidators();
        this.ListForm.get('email').updateValueAndValidity();

        this.ListForm.get('allCategory').clearValidators();
        this.ListForm.get('allCategory').updateValueAndValidity();
        this.ListForm.get('countryCode').clearValidators();
        this.ListForm.get('countryCode').updateValueAndValidity();

        this.ListForm.controls["languageId"].setValidators([Validators.required]);
        this.ListForm.controls["content"].setValidators([Validators.required, spaceValidator]);

        this.ListForm.get('content').updateValueAndValidity();
        this.getBlockId = 4

      }
      if (!block) {
        this.selectedBlock = {}
        this.selectedBlock.title = title;
        this.uploadReason = ""
        this.selectedBlock.reason = "";
        this.isEdit = false;
      }
      else {
        this.isEdit = true;
        if (block.statusId == '3') {
          $("#pendingModal").modal("show");
          this.ListForm.disable();
        } else {
          $("#EditIndividualModal").modal("show");
          this.ListForm.enable();
          this.AppOrRejForm.enable();
        }



        this.isEditIndividualBlock = true;

        Object.assign(this.selectedBlock, block)

        // this.selectedBlock = block;
        this.selectedBlock.title = title;

        setTimeout(() => {
          this.ListFormOld = this.ListForm.value

          this.ListForm.valueChanges.subscribe(value => {


            this.ListFormnew = value

          });
        }, 3000);
        if (this.reqObj.type == 1) {
          var mobile = _.split(block.blockItem, '-', 2);
          let countryCode: any = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });

          if (block.statusId == '3') {
            countryCode = countryCode[0]
            this.ListForm.controls.pendingMobileNumber.setValue(mobile[1]);
            this.selectedBlock.mobileIso = countryCode[1];
          } else {
            countryCode = countryCode[0]
            this.ListForm.controls.mobileNumber.setValue(mobile[1]);
            this.selectedBlock.mobileIso = countryCode[1];

          }




          this.selectedBlock.allCategory = this.selectedBlock.all;
          let cateId = JSON.parse(this.selectedBlock.categoryList);
          this.selectedBlock.categoryId = []
          if (cateId)
            for (let i = 0; i < cateId.length; i++) {
              for (let j = 0; j < this.categoryList.length; j++) {
                if (this.categoryList[j].categoryId == cateId[i]) {
                  this.selectedBlock.categoryId.push(this.categoryList[j])
                }
              }
            }
          setTimeout(() => {
            this.ListFormOld = this.ListForm.value

            this.ListForm.valueChanges.subscribe(value => {


              this.ListFormnew = value

            });
          }, 3000);

        } else if (this.reqObj.type == 2) {

          this.selectedBlock.email = block.blockItem
          this.selectedBlock.allCategory = this.selectedBlock.all;
          let cateId = JSON.parse(this.selectedBlock.categoryList);
          this.selectedBlock.categoryId = []
          if (cateId)
            for (let i = 0; i < cateId.length; i++) {
              for (let j = 0; j < this.categoryList.length; j++) {
                if (this.categoryList[j].categoryId == cateId[i]) {
                  this.selectedBlock.categoryId.push(this.categoryList[j])
                }
              }
            }

        } else if (this.reqObj.type == 3) {

          let code = block.blockItem.split('+')[1]
          this.selectedBlock.countryCode = code
          setTimeout(() => {
            this.ListFormOld = this.ListForm.value

            this.ListForm.valueChanges.subscribe(value => {

              this.ListFormnew = value

            });
          }, 3000);

        }
        else if (this.reqObj.type == 4) {

          this.selectedBlock.content = block.blockItem
          setTimeout(() => {
            this.ListFormOld = this.ListForm.value

            this.ListForm.valueChanges.subscribe(value => {

              this.ListFormnew = value

            });
          }, 3000);
        }

      }
    }, 1000);
    // setTimeout(() => {

    // }, 2000);

  }
  hideEditView() {
    $("#EditIndividualModal").modal("hide");
    $("#pendingModal").modal("hide");

  }
  updateIndividual() {

  }
  getSelected(event) {


    this.selectedBlock.languageId = event.target.value;


  }
  addBlockItems(data) {


    if (this.ListForm.invalid) {
      this.ListForm.markAllAsTouched();
      return;
    }
    else {
      if (_.isEmpty(this.ListFormnew)) {
        this.ListFormnew = this.ListFormOld
      }
      else {
        this.ListFormnew = this.ListFormnew //&& data == 'update'
      }

      if (data == 'update' && _.isEqual(this.ListFormOld, this.ListFormnew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      }

      else {
        let obj: any = this.selectedBlock;
        if (this.reqObj.type == 1) {
          obj.blockItem = this.common.convertCompleteCountryCode(this.ListForm.value.mobileNumber)
          if (this.selectedBlock.allCategory)
            obj.all = this.selectedBlock.allCategory;

          if (obj.allCategory == "3") {
            if (!this.ListForm.value.categoryId || !this.ListForm.value.categoryId.length) {
              this.common.showErrorMessage("Please select category");
              return;
            }
          }

          let cate = this.ListForm.value.categoryId;
          obj.categoryList = []
          if (cate)
            for (let i = 0; i < cate.length; i++) {
              obj.categoryList.push(cate[i].categoryId)
            }
          obj.categoryList = JSON.stringify(obj.categoryList)
        }
        else if (this.reqObj.type == 2) {

          obj.blockItem = this.selectedBlock.email
          if (this.selectedBlock.allCategory)
            obj.all = this.selectedBlock.allCategory;
          if (obj.allCategory == "3") {
            if (!this.ListForm.value.categoryId || !this.ListForm.value.categoryId.length) {
              this.common.showErrorMessage("Please select category");
              return;
            }
          }
          let cate = this.ListForm.value.categoryId;
          obj.categoryList = []
          if (cate)
            for (let i = 0; i < cate.length; i++) {
              obj.categoryList.push(cate[i].categoryId)
            }
          obj.categoryList = JSON.stringify(obj.categoryList)
        } else if (this.reqObj.type == 3) {
          // obj.blockItem = this.selectedBlock.mobile.dialCode
          let countryCode: any = this.allCounties.filter(element => {
            if (this.isEdit)
              return element[2] == this.selectedBlock.countryCode;
            else
              return element[2] == this.selectedBlock.countryCode.countryCode;
          });
          var count = countryCode[0]
          obj.country = count[0]
          if (this.isEdit)
            obj.blockItem = "+" + this.selectedBlock.countryCode;
          else
            obj.blockItem = "+" + this.selectedBlock.countryCode.countryCode

        } else if (this.reqObj.type == 4) {
          if (!this.selectedBlock.languageId) {
            this.common.showErrorMessage("Please select language");
            return;
          }
          // url = this.constantsService.blockContent;
          obj.blockItem = this.selectedBlock.content
          obj.languageId = this.selectedBlock.languageId
        }


        // if (data == 'update') {
        //   url = this.constantsService.updateBlockItems
        // }

        let url = this.constantsService.createBlock;
        obj.type = this.reqObj.type;
        console.log(obj);

        // return;
        this.common.showLoading()
        obj.isMainChecker = this.isMainChecker;

        this.apiService.post(url, obj).subscribe((succ: any) => {
          this.common.hideLoading();
          console.log(succ);

          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.getCountData();
            this.loadData();
            this.selectedBlock.reason = ""
            this.selectedBlock.categoryId = []
            this.selectedBlock.allCategory = 1
            $("#add").modal("hide");
            if (data == 'update') {
              $("#EditIndividualModal").modal("hide");
              $("#pendingModal").modal("hide");
            }
          } else {
            this.common.showErrorMessage(succ.message);

          }

        }, err => {
          this.common.hideLoading()


        }
        )

      }
    }

  }


  onFileSelect(event) {
    // this.compaignObj.campaignDesc



    $("#excel-upload1").modal("hide");
    $("#add").modal("hide");

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
  cancelSelectMorePopup() {
    $('#multiple-upload-file').modal('hide');
    // this.uploadReason = ""
    this.clearFileUpload();
    this.uploadFiles = [];

  }
  clearFileUpload() {
    this.uploadMultipleFile.nativeElement.value = null;
    this.uploadSingleFile.nativeElement.value = null;
    // this.uploadFiles = [];
  }
  closeDetailModal() {
    $('#multiupload-popup').modal('hide')
    this.reinitPopupTable();
    this.uploadFiles = [];

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

  checkFileContent() {

    if (!this.uploadReason) {
      this.common.showErrorMessage("Reason is must");

      return;
    }

    if (this.reqObj.type == '4') {
      if (!this.selectedBlock.languageId) {
        this.common.showErrorMessage("Please select language");
        return;
      }
    }

    const formData = new FormData();
    formData.append('companyId', this.user.companyId);
    formData.append('userId', this.user.userId);
    formData.append('sessionId', this.user.sessionId);
    formData.append('type', this.reqObj.type);
    formData.append('languageId', this.selectedBlock.languageId);
    formData.append('reason', this.uploadReason);
    // formData.append('distributionId', this.distributionObj.distributionId);
    // formData.append('filePart', this.distAddObj.file);

    for (let i = 0; i < this.uploadFiles.length; i++) {
      formData.append('file', this.uploadFiles[i].file);

    }
    this.common.showLoading()

    this.apiService.uploadFile(this.constantsService.blockSMSFileUpload, formData).subscribe((succ: any) => {

      console.log(succ);
      this.common.hideLoading()


      if (succ.code == 200) {
        this.fileUploadContent = succ.data.data;
        this.clearFileUpload();
        $('#multiple-upload-file').modal('hide');
        // this.uploadReason = ""

        this.validBlockList = succ.data.data.validBlockList;
        if (succ.data.data.errorBlockList.length == 0) {
          // this.uploadSuccessContact(this.fileUploadContent.validContactList);
          // this.uploadSuccessBlock(); 
          // this.common.showSuccessMessage("uploaded succesfully");


        } else {
          this.errorList = succ.data.data.errorBlockList;



          // this.countData();

        }
        $('#multiupload-popup').modal('show')
        setTimeout(() => { 
          this.initPopupDatatable();
        }, 1000);
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
  uploadSuccessBlock() {

    let url = "";
    let obj: any = {
      "reason": this.uploadReason,
      "all": "",
      "categoryList": "[]",
      // blockListArr: this.validBlockList
    };

    if (this.isMainChecker) {
      url = this.constantsService.pendingForApprovalRecord;
    } else {
      url = this.constantsService.pendingForApprovalRecord;

    }
    let blockArr = [];
    for (let i = 0; i < this.validBlockList.length; i++) {
      let ob = this.validBlockList[i];
      ob.blockItem = ob.blockItems
      ob.reason = this.uploadReason
      ob.all = "1",
        ob.categoryList = "[]"
      ob.isMainChecker = this.isMainChecker;
      blockArr.push(ob);
    }
    obj.blockListArr = blockArr
    obj.isMainChecker = this.isMainChecker;
    // obj.isMainChecker = 0;
    setTimeout(() => {
      this.common.showLoading();
      this.apiService.post(url, obj).subscribe((succ: any) => {
        this.common.hideLoading();


        if (succ.code == 200) {

          $('#multiupload-popup').modal('hide');
          this.reinitPopupTable();
          this.getCountData();
          this.loadData();
          this.uploadFiles = [];
          this.uploadReason = ""

          this.common.hideLoading();
          this.common.showSuccessMessage(succ.message);

        } else {
          // this.common.showErrorMessage(succ.message);

        }

      }, err => {
        this.common.hideLoading()


      }
      )
    }, 1000);

    // for (let i = 0; i < this.validBlockList.length; i++) {
    //   let ob = this.validBlockList[i];
    //   ob.blockItem = ob.blockItems
    //   ob.reason = this.uploadReason
    //   ob.all = "1",
    //     ob.categoryList = "[]"
    //     ob.isMainChecker=this.isMainChecker;
    //   this.apiService.post(url, ob).subscribe((succ: any) => {
    //     this.common.hideLoading();


    //     if (succ.code == 200) {
    //       // this.common.showSuccessMessage(succ.message);
    //       // this.getCountData();
    //       // this.loadData();
    //       // this.selectedBlock.reason = ""
    //       // $("#add").modal("hide");
    //     } else {
    //       // this.common.showErrorMessage(succ.message);

    //     }

    //   }, err => {
    //     this.common.hideLoading()


    //   }
    //   )
    // }
    // this.common.showLoading();
    // setTimeout(() => {
    //   this.getCountData();
    //   this.loadData();
    //   this.uploadFiles = [];
    //   this.uploadReason = ""

    //   this.common.hideLoading();
    //   this.common.showSuccessMessage("uploaded succesfully");
    // }, 3000);

  }
  deleteFileContent(file) {
    // for (let i = 0; i < this.fileUploadContent.validBlockList.length; i++) {
    for (var i = this.fileUploadContent.validBlockList.length - 1; i >= 0; i--) {

      if (file.fileName == this.fileUploadContent.validBlockList[i].sourceFileName) {
        this.fileUploadContent.validBlockList.splice(i, 1);
      }
    }

    for (var i = this.errorList.length - 1; i >= 0; i--) {
      if (this.errorList[i].sourceFileName == file.fileName) {
        this.errorList.splice(i, 1);
      }
    }
    this.deleteUploadFile(file)
  }
  proceedData() {
    // this.uploadSuccessContact(this.fileUploadContent.validContactList)
    this.uploadSuccessBlock();
    // $('#multiupload-popup').modal('hide');
    // this.reinitPopupTable();
  }
  editUploadContact(block) {


    // block.blockItems = "91-9941412787"
    $("#add").modal("show");
    this.editUploadCont = true;

    this.selectedBlock = block;
    if (this.reqObj.type == 1) {
      var mobile = _.split(block.blockItems, '-', 2);
      block.id = Math.random();
      this.ListForm.controls.mobileNumber.setValue(mobile[1]);

      let countryCode: any = this.allCounties.filter(element => {
        return element[2] == mobile[0];
      });
      countryCode = countryCode[0]
      this.selectedBlock.mobileIso = countryCode[1];
    } else if (this.reqObj.type == 2) {
      block.id = Math.random();
      this.selectedBlock.email = block.blockItems

    } else if (this.reqObj.type == 3) {
      block.id = Math.random();
      let code = block.blockItems.split('+')[1]
      this.selectedBlock.countryCode = code

    }
    else if (this.reqObj.type == 4) {
      block.id = Math.random();
      this.selectedBlock.content = block.blockItems

    }

  }
  checkBlockItems() {
    let obj: any = {}
    if (this.reqObj.type == 1) {
      obj.blockItem = this.common.convertCompleteCountryCode(this.ListForm.value.mobileNumber);
      obj.type = 1;
    }
    else if (this.reqObj.type == 2) {
      obj.blockItem = this.selectedBlock.email;
      obj.type = 2;
    }
    else if (this.reqObj.type == 3) {
      obj.blockItem = "+" + this.selectedBlock.countryCode;
      obj.type = 3;
    }
    else if (this.reqObj.type == 4) {
      obj.blockItem = this.selectedBlock.content;
      obj.type = 4;
    }
    for (let i = 0; i < this.validBlockList.length; i++) {
      if (this.validBlockList[i].blockItems == obj.blockItem) {
        this.common.showErrorMessage("Its already in block list")
        return;
      }
    }
    obj.isMainChecker = this.isMainChecker;
    this.common.showLoading();
    this.apiService.post(this.constantsService.exitingBlockConent, obj).subscribe((succ: any) => {
      this.common.hideLoading();


      if (succ.message == 'true') {
        this.common.showErrorMessage("Its already in block list");
        return;

      } else {
        this.reinitPopupTable();

        setTimeout(() => {
          this.initPopupDatatable();
        }, 2000);
        for (let i = 0; i < this.errorList.length; i++) {
          if (this.errorList[i].id == this.selectedBlock.id) {
            this.errorList[i].blockItems = obj.blockItem
            this.errorList[i].id = 0;
            this.validBlockList.push(this.errorList[i]);
            this.errorList.splice(i, 1);
            // this.common.showErrorMessage("Its already in block list")
            $("#add").modal("hide");



            return;
          }
        }
      }


    }, err => {
      this.common.hideLoading()


    }
    )

  }
  deleteUploadContact(block) {
    for (var i = this.errorList.length - 1; i >= 0; i--) {
      if (this.errorList[i] === block) {
        this.errorList.splice(i, 1);
      }
    }
    this.reinitPopupTable();

    setTimeout(() => {
      this.initPopupDatatable();
    }, 2000);
    // this.countData();
  }
  getCountryCode(block) {

    let country = block.split("+")[1];
    let countryCode: any = this.allCounties.filter(element => {
      return element[2] == country;
    });

    let countyName = countryCode[0]
    if (countyName)
      return countyName[0]
  }
  editTableBlock(block) {



  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
  changeField(event, pattern, min, limitTo, id, length) {
    // var k = event.keyCode;
    //Limits
    const value = event.target.value.substr(0, limitTo)

    if (event.target.value != value) {
      event.target.value = value;
      return
    }

    //Pattern
    let patt = new RegExp(pattern);
    event.target.value = event.target.value.replace(patt, '')
    if (event.target.value != value) {
      return;
    }

    //set limit
    if (length >= limitTo) {
      return;
    }
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
  changeStatus(data, status) {
    $('#approveModal').modal('show')
    data.changeStauts = status
    data.title = "Alert message"
    if (status == 5) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to make to return to maker"
    }
    else if (status == 2) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to approve"
    }
    else if (status == 4) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to reject"
    }
    else if (status == 6) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to stop"
    }
    else if (status == 7) {
      this.AppOrRejForm.get('reason').reset()
      data.body = "Are you sure you want to resume"
      
    }

    this.pendingBlock = data;
    this.pendingBlock.rejectReason = "";
    console.log(this.pendingBlock)
  }
  approveOrReject(status) {
    let url;

    if (status == 2) {

      if (!this.selectedBlock.rejectReason) {

        this.errMsg = true;
        return;
      }
      this.selectedBlock.reason = this.selectedBlock.rejectReason;
      url = this.constantsService.rejectBlock
      this.errMsg = false;


    } else {
      this.errMsg = false;

      if (this.selectedBlock.fileNewDetails)
        this.selectedBlock.newDetailsJson = JSON.parse(this.selectedBlock.fileNewDetails)
      else
        this.selectedBlock.newDetailsJson = JSON.parse(this.selectedBlock.fileNewDetails)

      this.selectedBlock.reason = this.selectedBlock.rejectReason;

      url = this.constantsService.approveBlock


    }
    this.selectedBlock.reason = this.selectedBlock.rejectReason;
    this.common.showLoading()
    this.selectedBlock.isMainChecker = this.isMainChecker;
    this.apiService.post(url, this.selectedBlock).subscribe((succ: any) => {

      $('#pendingModal').modal('hide')


      this.common.hideLoading();
      if (succ.code == 200) {
        this.getCountData();
        this.loadData();
        this.selectedBlock.reason = ""
        this.selectedBlock.rejectReason = ""
        this.pendingBlock.rejectReason = ""
        this.selectedBlock.categoryId = []
        this.selectedBlock.allCategory = 1
        this.common.showSuccessMessage(succ.message);

        // this.ngOnInit(); 
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#pendingModal').modal('hide')


      this.common.hideLoading();

    });
  }
  send() {
    let url;

    if (this.pendingBlock.changeStauts != 2) {

      if (!this.pendingBlock.rejectReason) {

        this.errMsg = true;
        return;
      }

      this.pendingBlock.reason = this.pendingBlock.rejectReason;

      url = this.constantsService.rejectBlock
    } else {
      if (this.pendingBlock.statusId == 6)
        this.pendingBlock.blockListArr = JSON.parse(this.pendingBlock.fileNewDetails)
      else
        this.pendingBlock.newDetailsJson = JSON.parse(this.pendingBlock.fileNewDetails)

      url = this.constantsService.approveBlock
    }

    // return;
    this.pendingBlock.reason = this.pendingBlock.rejectReason;
    this.errMsg = false;
    this.common.showLoading()
    this.pendingBlock.isMainChecker = this.isMainChecker;
    this.apiService.post(url, this.pendingBlock).subscribe((succ: any) => {

      $('#approveModal').modal('hide')
      this.errMsg=false;

      this.common.hideLoading();
      if (succ.code == 200) {
        this.getCountData();
        this.loadData();
        this.selectedBlock.rejectReason = ""
        this.pendingBlock.rejectReason = ""
        this.selectedBlock.categoryId = []
        this.selectedBlock.allCategory = 1
        this.common.showSuccessMessage(succ.message);

        // this.ngOnInit(); 
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#approveModal').modal('hide')
      this.errMsg=false;
      $('#pendingModal').modal('hide')
      $('#pendingFileModal').modal('hide')

      this.common.hideLoading();

    });

  }
  approveOrRejectFile(block, status) {
    // this.pendingBlock=blocklist;
    let url;


    if (status == 7) {
      this.pendingBlock.blockListArr = JSON.parse(this.pendingBlock.fileNewDetails)
      url = this.constantsService.approveBlock
    } else {
      if (!this.pendingBlock.rejectReason) {

        this.errMsg = true;
        return;
      }
      url = this.constantsService.rejectBlock
     
    }
    this.errMsg = false;
    this.common.showLoading()
    this.pendingBlock.isMainChecker = this.isMainChecker;
    this.pendingBlock.reason=this.pendingBlock.rejectReason
    this.apiService.post(url, this.pendingBlock).subscribe((succ: any) => {

      $('#pendingFileModal').modal('hide')


      this.common.hideLoading();
      if (succ.code == 200) {
        this.getCountData();
        this.loadData();
        this.pendingBlock.reason = ""
        this.selectedBlock.rejectReason = ""
        this.pendingBlock.rejectReason = ""
        this.selectedBlock.categoryId = []
        this.selectedBlock.allCategory = 1
        this.common.showSuccessMessage(succ.message);

        // this.ngOnInit(); 
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#pendingFileModal').modal('hide')


      this.common.hideLoading();

    });

    // this.pendingBlock.changeStauts = status
    // this.pendingBlock.reason = this.AppOrRejForm.value.reason;
    // this.send();
  }
}
