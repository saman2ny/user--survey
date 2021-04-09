import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/service/country.service';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';
import { TooltipLabel } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  styleUrls: ['./distribution-list.component.css']
})
export class DistributionListComponent implements OnInit {

  user: any = {};
  listPushDistribution: any = [];
  selectedDistributed: any = {};
  errMsg: boolean;
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
  }
  isScroll: boolean;
  role: any;
  approveModal: boolean;
  showAddDistribution: boolean = false;
  distribution: any = {};
  uploadFiles: any = [];
  distributionObj: any = {}
  fileUploadContent: any = {
    validContactList: []
  };
  contactList: any = [];
  contactCount: any = {};
  uploadEditContact: any = {};
  updateUploadContact: any;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
  SearchValue: any;
  separateDialCode = true;
  TooltipLabel = TooltipLabel;

  selectedCorpPreMobileNo = "in"
  selectedCorpContactPreMobileNo = "in"
  @ViewChild('uploadMulitpleFile') uploadMultipleFile: ElementRef;
  @ViewChild('uploadSingleFile') uploadSingleFile: ElementRef;
  sampleDownloadFile: any=[];
  constructor(private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public formBuilder: FormBuilder, public countryService: CountryService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
 //this.countryService.getApiCountryCode();
    this.updateUploadContact = this.formBuilder.group({

      phoneNumber: [''],
      mainName: [''],
      email: ['', Validators.compose([Validators.email])],
      pushToken: ['']

    });
    this.allCounties = this.countryService.allCountries;
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




    this.common.showLoading();

    this.apiService.post(this.constantsService.distList, this.reqObj).subscribe((succ: any) => {

      this.common.hideLoading();

      this.listPushDistribution = succ.data;


      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        var oTable = $(".datatable").DataTable({
          scrollCollapse: true,
          // searching: false,
          aaSorting: [],
        })
        $('#searchTextId').keyup(function () {
          oTable.search($(this).val()).draw();
        })
      }, 1000);


    }, err => {
      this.common.hideLoading()


    }
    )

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

  showModal(user) {
    // let data={}
    // =\
    $('#userModal').modal('show')

    this.selectedDistributed = user;
  }

  deleteUser() {

    this.common.showLoading()
    var deleteDistri = { distributionId: this.selectedDistributed.distributionId, distributionName: this.selectedDistributed.distributionName }

    this.apiService.post(this.constantsService.deleteDistributionList, deleteDistri).subscribe((succ: any) => {

      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide')

      this.common.hideLoading();

    });

  }
  goToDistribution() {
    this.router.navigate(['/home/distribution-list/distribution/'])
    this.common.setEditDistribution({});
  }
  AddandEditDistribute(disti: any) {


    // var dist = { "editDistribution": disti };
    this.common.setEditDistribution(disti)

    this.router.navigate(['/home/distribution-list/distribution/'])
  }
  showAdd() {
    this.distribution.name = ''
    $('#distributionModal').modal('show')

  }
  addDistribution() {

    var dist = { distributionName: this.distribution.name, dlCategory: this.distribution.dlCategory }
    this.apiService.post(this.constantsService.createDistributionList, dist).subscribe((succ: any) => {

      $('#distributionModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#distributionModal').modal('hide')

      this.common.hideLoading();

    });
  }
  onScroll() {

    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }
  changeSearch() {
    $('.datatable').dataTable().fnDestroy();
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();

  }

  download(distribution) {
    this.common.showLoading();
    var dist = { distributionId: distribution.distributionId }
    this.apiService.downloadFile(this.constantsService.downloadContacts, dist).subscribe((succ: any) => {

      this.common.hideLoading();
      this.common.downloadFile(succ, distribution.distributionName);
      // var newBlob = new Blob([succ], { type: succ.type });

      // // IE doesn't allow using a blob object directly as link href
      // // instead it is necessary to use msSaveOrOpenBlob
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(newBlob);
      //   return;
      // }

      // // For other browsers: 
      // // Create a link pointing to the ObjectURL containing the blob.
      // const data = window.URL.createObjectURL(newBlob);

      // var link = document.createElement('a');
      // link.href = data;
      // link.download = distribution.distributionName + ".xlsx";
      // // this is necessary as link.click() does not work on the latest firefox
      // link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      // setTimeout(function () {
      //   // For Firefox it is necessary to delay revoking the ObjectURL
      //   window.URL.revokeObjectURL(data);
      //   link.remove();
      // }, 100);
    }, err => {


      this.common.hideLoading();

    });

  }
  AcceptfileFormat: any = ['.xlsx', '.xls'];

  onFileSelect(event) {
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




    $("#excel-upload1").modal("hide");

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
    this.uploadFiles = [];
    this.clearFileUpload();


  }
  clearFileUpload() {
    this.uploadMultipleFile.nativeElement.value = null;
    this.uploadSingleFile.nativeElement.value = null;
    // this.uploadFiles = [];
  }
  checkFileContent() {


    if (!this.distributionObj.distributionId) {
      this.common.showErrorMessage("Please select Distribution");
      return;
    }

    const formData = new FormData();
    formData.append('companyId', this.user.companyId);
    // formData.append('distributionName', this.distObj.distributionName);
    formData.append('distributionId', this.distributionObj.distributionId);
    // formData.append('filePart', this.distAddObj.file);

    for (let i = 0; i < this.uploadFiles.length; i++) {
      formData.append('filePart', this.uploadFiles[i].file);

    }

    this.common.showLoading()

    this.apiService.uploadFile(this.constantsService.validateFileContent, formData).subscribe((succ: any) => {

      this.common.hideLoading()


      if (succ.code == 200) {
        this.fileUploadContent = succ.data;
        this.clearFileUpload();
        $('#multiple-upload-file').modal('hide');
        setTimeout(() => {
          this.initPopupDatatable();
        }, 1000);
        if (succ.data.errorContactList.length == 0) {
          // this.uploadSuccessContact(this.fileUploadContent.validContactList);
          // this.common.showSuccessMessage("Contacts uploaded succesfully");
          $('#multiupload-popup').modal('show')

        } else {
          this.contactList = succ.data.errorContactList;
          $('#multiupload-popup').modal('show')
          // $('body').addClass('modal-open')

          this.countData();

        }


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
  deleteFileContent(file) {
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
  saveUploadEditContact() {


    let val = this.updateUploadContact.value;
    console.log(val)
    if (this.updateUploadContact.invalid) {
      this.updateUploadContact.markAllAsTouched();
      return;
    }
    else if (!val.phoneNumber && !val.email && !val.pushToken) {
      console.log("invalid form")

      this.common.showErrorMessage("Mobile number or email id or push token is required");
      return;
    }

    // if (this.updateUploadContact.invalid) {
    //   this.updateUploadContact.markAllAsTouched();
    //   return;
    // }

    let no = ""
    if (val.phoneNumber)
      no = this.common.convertCompleteCountryCode(val.phoneNumber)

    this.uploadEditContact.mobileNumber = no;

    let reqObj: any = {}

    if (this.uploadEditContact.phoneNumber)
      reqObj.mobileNumber = this.common.convertCompleteCountryCode(this.uploadEditContact.phoneNumber)
    else
      reqObj.mobileNumber = "";

    reqObj.distributionId = this.distributionObj.distributionId;
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
        }, 1500);

      }
      else {
        this.common.showErrorMessage(succ.message)

      }

    }, err => {
      this.common.hideLoading()

    });



    // this.fileUploadContent.
  }
  deleteContact(contact) {
    for (var i = this.contactList.length - 1; i >= 0; i--) {
      if (this.contactList[i] === contact) {
        this.contactList.splice(i, 1);
      }
    }
    this.countData();
    this.reinitPopupTable();
    setTimeout(() => {
      this.initPopupDatatable();
    }, 1000);
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
    }, 1000);
  }
  resetSearch() {
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.reinitPopupTable();
  }

  proceedData() {
    this.uploadSuccessContact(this.fileUploadContent.validContactList)
    $('#multiupload-popup').modal('hide')
    this.reinitPopupTable();
  }
  uploadSuccessContact(data) {
    this.common.showLoading();
    for (let i = 0; i < data.length; i++) {


      let reqObj: any = {}
      reqObj.distributionId = this.distributionObj.distributionId;

      // reqObj.mobileNumber = this.common.convertCompleteCountryCode(data[i].phoneNumber)
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
      $('#multiupload-popup').modal('hide')
      this.reinitPopupTable();
      this.changeSearch();
      this.uploadFiles = [];
      this.common.hideLoading();
      this.common.showSuccessMessage("Contacts uploaded succesfully");
    }, 3000);
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
  downloadSampleFile() {
    // var pushsms = file;
    let file=this.sampleDownloadFile[0];
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
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
} 