import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';

@Component({
  selector: 'app-campaign-upload',
  templateUrl: './campaign-upload.component.html',
  styleUrls: ['./campaign-upload.component.css']
})
export class CampaignUploadComponent implements OnInit {


  user: any = {};
  campaginList: any = [];
  reqObj = {

    "noOfRecords": 10,
    "pageIndex": 1,
    "isFileContainText": 1,
    "fileType": "",
    "isDownload": false,
    "Date": [new Date(), new Date()],
    "importFrom": new Date(),
    "importTo": new Date()
  }
  status: any = [

  ];
  maxDate: any = new Date();
  isScroll: boolean;
  role: any;
  channelList: any;
  constructor(private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser()
    this.role = this.common.getRole();
    console.log(this.role);
    console.log(this.common.getMainMenu());

    this.status.push({ id: 1, name: "File Contain with Text and Number" });
    this.status.push({ id: 0, name: "File Contain with Number Only" });
    this.apiService.post(this.constantsService.getChannel, {}).subscribe((succ: any) => {
      console.log(succ);
      this.common.hideLoading()
      this.channelList = succ.data.channel;
      // this.list=[{

      // }]

    }, err => {
      this.common.hideLoading()

      console.log(err + "err")
    }
    )
  }

  ngOnInit() {
    console.log(this.reqObj)
    this.common.showLoading();
    this.reqObj.importFrom = this.reqObj.Date[0];
    this.reqObj.importTo = this.reqObj.Date[1];
    this.reqObj.isDownload = false
    this.apiService.post(this.constantsService.campaignUploadReportUserLevel, this.reqObj).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading()
      if (this.isScroll) {
        if (succ.data)
          this.campaginList = this.campaginList.concat(succ.data);
        // this.isScroll = false;
      } else {
        if (succ.data)
          this.campaginList = succ.data;
        else
          this.campaginList = [];

      }

      // this.list=[{

      // }]

    }, err => {
      this.common.hideLoading()

      console.log(err + "err")
    }
    )

  }

  ngOnDestroy() {

    this.reqObj = {
      "noOfRecords": 10,
      "pageIndex": 1,
      "isFileContainText": 1,
      "fileType": "",
      "isDownload": false,
      "Date": [new Date(), new Date()],
      "importFrom": new Date(),
      "importTo": new Date()
    }
  }

  onScroll() {
    console.log("onscroll");
    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();
    console.log(event);
  }

  onChange(id) {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();
  }

  getReport() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    console.log(this.reqObj);
    this.ngOnInit();
  }

  downloadReport(format) {

    console.log(format);
    this.common.showLoading();
    // var dist = { distributionId: distribution.distributionId }
    this.reqObj.importFrom = this.reqObj.Date[0];
    this.reqObj.importTo = this.reqObj.Date[1];
    this.reqObj.fileType = format;
    this.reqObj.isDownload = true;
    this.apiService.downloadFile(this.constantsService.campaignUploadDownload, this.reqObj).subscribe((succ: any) => {
      console.log(succ);
      this.common.hideLoading();

      this.common.downloadFile(succ, "campaign Upload", format);
    }, err => {


      this.common.hideLoading();
      console.log(err)
    });

  }
  getChannelName(id) {
    if (this.channelList.length == 0)
      return;
    let channels = this.channelList.filter(
      depart => {
        if (depart.channelId == id)
          return depart;
        // console.log(book);
        // book.BrandName.toLowerCase().indexOf(id) > -1
      });
    // console.log(name[0].branchName)
    if (channels.length)
      return channels[0].channelDesc
  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }


}
