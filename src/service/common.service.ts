import { Injectable, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import * as $ from 'jquery'
// declare function myMethod(): any ;
import { Ng2IzitoastService } from 'ng2-izitoast'
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user: any;
  succ: any;
  sessionId: any;
  Opid: any;
  CorpId: any;
  company: any;
  group: any;
  page: any;
  notiId: any;
  role: any;
  operator: any;
  PushId: any;
  // customerDetails : any;
  customerNumber: any = {};
  dist: any;
  reqId: any;
  mainMenu: any;
  loginCred: any;
  tempId: any;
  mainPages: any;
  headersDetails: any;
  companyy: any;
  category:any;
  logFiles: any;
  branch: any;
  sessionValidMinutes=0;
  tempChannels: any;
  repost: any;
  operators: any;
  customers: any;
  language: any;
  UserDetailEncryption: any="sd";
  listSurvey: any;
  constructor(@Inject(DOCUMENT) private document: Document,public router: Router, public iziToast: Ng2IzitoastService, private translate: TranslateService) {

    this.user = sessionStorage.user;


  }
    //Survey

    setSurveyId(listSurvey) {
      this.listSurvey = listSurvey;
  
    }
    getSurveyId() {
      return this.listSurvey;
    }


  setLogin(loginCred) {
    this.loginCred = loginCred;
  }
  getLogin() {
    return this.loginCred;

  }
  setUserDetailEncryption(data){
    this.UserDetailEncryption=data;
  }
   getUserDetailEncryption(){
   return this.UserDetailEncryption;
  }
 
  setMainPages(mainPages) {
    this.mainPages = mainPages
  }
  getMainPages() {
    return this.mainPages;
  }

  setRole(role) {
    this.role = role;

  }
  getRole() {
    return this.role;

  }
  setMainMenu(menu) {
    this.mainMenu = menu
  }
  getMainMenu() {
    return this.mainMenu;
  }
  setUser(user) {
    // sessionStorage.user = JSON.stringify(user)
    this.user = user;

  }
  getUser() {

    return this.user;
  }


  setOperator(operators) {
    // sessionStorage.user = JSON.stringify(user)
    this.operators = operators;

  }
  getOperator() {

    return this.operators;
  }


  

  setCustomer(customers) {
    this.customers = customers;

  }
  getCustomer() {

    return this.customers;
  }

  //Orperate

  setEditOperator(Opid) {
    this.Opid = Opid;
  }

  getEditOperator() {
    return this.Opid;
  }

  //Corporate

  setEditCorporate(CorpId) {
    this.CorpId = CorpId;
  }

  getEditCorporate() {
    return this.CorpId;
  }

  
    //Branch

    setEditBranch(branch) {
      this.branch = branch;
  
    }
    getEditBranch() {
      return this.branch;
    }

  //Company

  setEditcompany(company) {
    this.company = company;

  }
  getEditCompany() {
    return this.company;
  }

  //Group Privi

  setEditGroup(group) {
    this.group = group;

  }
  getEditGroup() {
    return this.group;
  }
  setEditPage(page) {
    this.page = page;

  }
  getEditPage() {
    return this.page;
  }


  //Services

  setEditService(notiId) {
    this.notiId = notiId;
  }

  getEditService() {
    return this.notiId;
  }

  setEditTemplateParams(notiId) {
    this.notiId = notiId;
  }

  getEditTemplateParams() {
    return this.notiId;
  }


  setEditMessageTemplate(notiId) {
    this.notiId = notiId;
  }

  getEditMessageTemplate() {
    return this.notiId;
  }

  //Set Channels
  setEditServiceActiveChannels(tempChannels) {
    this.tempChannels = tempChannels;
  }

  getEditServiceActiveChannels() {
    return this.tempChannels;
  }

  //Customer

  setEditcustomerDetails(customerNumber) {
    this.customerNumber = customerNumber;
  }

  getEditcustomerDetails() {
    return this.customerNumber;
  }

  //Chat

  setHeaderschat(headersDetails) {
    this.headersDetails = headersDetails;

  }
  getHeaderschat() {
    return this.headersDetails;
  }

  //Logs

  setAuditLogs(logFiles) {
    this.logFiles = logFiles;

  }
  getAuditLogs() {
    return this.logFiles;
  }

    //Logs

    setAuditLogsDatas(repost) {
      this.repost = repost;
  
    }
    getAuditLogsDatas() {
      return this.repost;
    }

    

  //PushSMS

  setEditpushCampaign(PushId) {
    this.PushId = PushId;
  }

  getEditpushCampaign() {
    return this.PushId;
  }


  //DistributionList

  setEditDistribution(dist) {
    this.dist = dist;
  }

  getEditDistribution() {
    return this.dist;
  }

  //CampaignCategory

  setEditCampaignCategory(category) {
    this.category = category;
  }

  getEditCampaignCategory() {
    return this.category;
  }

  //Promotional Marketing

  setEditPromotion(reqId) {
    this.reqId = reqId;
  }

  getEditPromotion() {
    return this.reqId;
  }


  setEditMessageTemplates(tempId) {
    this.tempId = tempId;
  }

  getEditMessageTemplates() {
    return this.tempId;
  }

  setEditCampaignTemplate(tempId) {
    this.tempId = tempId;
  }

  getEditCampaignTemplate() {
    return this.tempId;
  }

  setcompanychat(companyy) {
    this.companyy = companyy;
  }
  getcompanychat() {
    return this.companyy;
  }
  showSuccessMessage(data) {
    this.iziToast.show({ title: data, backgroundColor: "#52BE80", progressBarColor: "#717D7E", titleColor: "#FFFFFF", position: "topRight" });
  }

  showErrorMessage(data) {
    this.iziToast.show({ title: data, backgroundColor: "#E82929", progressBarColor: "#717D7E", titleColor: "#FFFFFF", position: "topRight" });

  }

  b4Update(){
    return "Update is applicable only if changes are made"
  }

  logout(data?) {

    sessionStorage.clear();
    this.setUser({});
    this.hideLoading();
    this.router.navigate(['/']);


  }


  showLoading(): void {
    $("#loading").show();
  }

  hideLoading(): void {
    $("#loading").hide();
  }
  // convert base 64
  convertBase64(file, result) {
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      result(String(myReader.result));
    }
    myReader.readAsDataURL(file);
  }
  getCompleteNo(pre, post) {
    var CompleteMobileNumberRough;
    if (pre)
      CompleteMobileNumberRough = _.concat(pre + "-" + post);
    else
      CompleteMobileNumberRough = post
    var CompleteMobileNumber = CompleteMobileNumberRough.toString();
    post = CompleteMobileNumber;
    return post;
  }
  splitNo(mobileNO) {
    var obj: any = {};
    if (!mobileNO.includes("-")) {
      obj.preMobileNo = "00";
      obj.postMobileNo = mobileNO;
      return obj;
    }
    var mobile = _.split(mobileNO, '-', 2);

    obj.preMobileNo = mobile[0]
    obj.postMobileNo = mobile[1]
    return obj;
  }


  downloadFile(file, fileName, fileFormat?) {
    var newBlob = new Blob([file], { type: file.type });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      if (fileFormat == 'pdf') {
       
        window.navigator.msSaveOrOpenBlob(newBlob,fileName + ".pdf");
      } else {
        window.navigator.msSaveOrOpenBlob(newBlob,fileName + ".xlsx");
  
      }
     
      return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    if (fileFormat == 'pdf') {
      link.download = fileName + ".pdf";

    } else {
      link.download = fileName + ".xlsx";

    }
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
  scheduledTimeFormat(those) {
    // console.log(those, "Date Check Format")
    // var dateTime: any = new Date(those);
    // dateTime = moment(dateTime).format("YYYY-MM-DD");
    // console.log(dateTime, "Date Check Format final")
    // return dateTime;


    const utcDate = moment.utc(those);
    var utcDate2 = new Date(utcDate.format());
    var dateTime = moment(utcDate2).format("YYYY-MM-DD");
    return dateTime;
  }

  convertToDatePickerTime(date) {

    let utcDate = moment(date, 'dd-mm-yyyy hh:mm:ss');
    console.log(utcDate);
    return utcDate.local().format("dd-mm-yyyy hh:mm:ss")

    // return moment(date, 'dd-mm-yyyy hh:mm:ss').format()
  }
  convertCompleteCountryCode(data) {
    data.number = data.number.replace(/-/g, "")
    let cPhone = data.dialCode + "-" + data.number;
    cPhone = cPhone.replace(/ /g, "");

    return cPhone.split("+")[1];
  }
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  getAddTimezone(time,zone){

    var getZones = zone
    var getTimes = time
    var getTimesFinal = getTimes.toString();
    var consolew = getTimesFinal.substr(0, 25)
    console.log(consolew, "console")

    var datiDup = new Date(consolew + getZones);
    var BefConfr = datiDup.toString()
    var finalDate = BefConfr.substr(0, 25)

    return new Date(finalDate);

  }
  downloadDocs(file, fileName, fileFormat?) {
    console.log(file);  
    var newBlob = new Blob([file], { type: file.type });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download=fileName
    // if (fileFormat == 'pdf') {
    //   link.download = fileName + ".pdf";

    // } else {
    //   link.download = fileName + ".xlsx";

    // }
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
  setLanguage(language) {
    sessionStorage.setItem('language',language)
    this.language = language;
    if (language == 'ar') {
      this.translate.use('ar');
      this.document.body.classList.add('arabic');
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');
      link.id   = "ararbicBootstrapRtl";
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = "assets/css/bootstrap-rtl.css";
      link.media = 'all';
      head.appendChild(link);
      var linkTwo  = document.createElement('link');
      linkTwo.id   = "arabicRtl";
      linkTwo.rel  = 'stylesheet';
      linkTwo.type = 'text/css';
      linkTwo.href = "assets/css/rtl.css";
      linkTwo.media = 'all';
      head.appendChild(linkTwo);
    } else {
      this.translate.use('en'); 
      this.document.body.classList.remove('arabic');  
      let  arabicRtl:any=this.document.getElementById("arabicRtl")
      let  arabicBootstrapRtl:any=this.document.getElementById("ararbicBootstrapRtl")
      arabicRtl.disabled = false;///i fit's already there, enable it
      arabicBootstrapRtl.disabled = false;///i fit's already there, enable it

    }
   
  }
  getLanguage() {
    this.language=  sessionStorage.getItem('language')
    return this.language;
    
  }
}
