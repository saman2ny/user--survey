import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { CommonService } from 'src/service/common.service';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-severdashboard',
  templateUrl: './severdashboard.component.html',
  styleUrls: ['./severdashboard.component.css']
})
export class SeverdashboardComponent implements OnInit {
  applicationStatus: any = {
    "db": {},
    "mail": {},
    "ldap": {},
    "diskSpace": {},
    "jms": {},
  }
  updateTime: any = moment();
  alertEngineStatus: any = {
    details: {
      "db": {},
      "mail": {},
      "ldap": {},
      "diskSpace": {},
      "jms": {},
    }
  };
  constructor(public apiService: ApiService, public common: CommonService, public constantsService: ConstantsService) { }

  ngOnInit(): void {
    var tableSelector = ".summaryDatatable";
    var table = $(tableSelector).DataTable({
      sScrollX: "100%"

    });


    this.refresh();


  }
  refresh() {
    this.common.showLoading()
    let obj = {}
    // this.apiService.getActatorData(this.constantsService.sendNotificationToWeb).subscribe((succ: any) => {
    //   // this.common.hideLoading()
    //   console.log(succ);
    //   this.applicationStatus = succ.details;
    // }, err => {
    //   this.common.hideLoading()


    // }
    // )
    this.apiService.getActatorData(this.constantsService.notisifyHealth).subscribe((succ: any) => {
      this.common.hideLoading()
      console.log(succ);
      this.applicationStatus = succ.details;
    }, err => {
      this.common.hideLoading()


    }
    )
    this.apiService.getAlertEngineActatorData(this.constantsService.notisifyHealth).subscribe((succ: any) => {
      // this.common.hideLoading()
      console.log(succ);
      this.alertEngineStatus = succ;
    }, err => {
      this.common.hideLoading()


    }
    )



  }

}
