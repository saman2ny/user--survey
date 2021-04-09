import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';
import * as _ from 'lodash';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  listAllCustomerLogs: any = [];
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
  user: any;
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "isMainChecker": false,
    "menuId": 0
  }
  role: any;
  code:any = {};
  edit: any = {};


  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) { 

      this.allCounties = this.countryService.allCountries;
      // this.SubmitButton = true
  
  
      this.user = this.common.getUser();
      this.role = this.common.getRole();
     
      // this.reqObj.isMainChecker = this.role.isChecker;
      this.reqObj.menuId = this.common.getMainMenu().menuId;
      // this.isMainChecker = this.common.getMainMenu().isMainChecker;
      this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;


    }

  ngOnInit() {
    myMethod();
    selectSearchMethod();
    
    let username = this.common.getAuditLogs()
    let newValue = JSON.parse(username[0].new_DTLS)
     this.code = newValue.firstName
    this.listAllCustomerLogs = this.common.getAuditLogs()

  }
  back()
  {
    this.edit = this.common.getAuditLogsDatas()
    let repost =  this.edit
    this.common.setEditcustomerDetails(repost)
    this.router.navigateByUrl('/home/customer-management');
  }

}
