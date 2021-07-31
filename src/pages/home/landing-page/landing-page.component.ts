import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
declare var $: any;
declare function sideMenuFunction(): any;
declare function myMethod(): any;


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  changePasswordObj: any = {};
  passwordForm: FormGroup;
  user: any;
  pages: any;
  activePage: any = {};
  system: number;
  companyId: any;
  listNotifi: any = [];
  listNotifiCount: any;
  // channelList: any;
  
  constructor(public common: CommonService, public formBuilder: FormBuilder, public apiService: ApiService,
     public constantsService: ConstantsService, public router: Router) {

      var succ = {
        branchId: 0,
        companyId: 0,
        corporateId: 0,
        createdby: "Administrator",
        type: 1,
  userId: "Administrator"
  
      };
      this.common.setUser(succ);
      this.user = this.common.getUser();
      console.log(this.user, "this.user")


   
  }
  ngOnInit() {

  


  }
}
