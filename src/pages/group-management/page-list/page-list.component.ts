import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit, OnDestroy {


  user: any = {};
  listPage: any = [];
  selectedpage: any;
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,

  }
  isScroll: boolean;
  role: any;
  constructor(private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
      console.log(this.role);


  }

  ngOnInit() {
    
    myMethod();
    selectSearchMethod();

    console.log(this.reqObj)
    this.common.showLoading()
    this.apiService.post(this.constantsService.listMenu, this.reqObj).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading()
      if (this.isScroll) {
        this.listPage = this.listPage.concat(succ.data.menulist);
        // this.isScroll = false;
      } else {
        this.listPage = succ.data.menulist;

      }

      // this.listPage=[{

      // }]

    }, err => {
      this.common.hideLoading()

      console.log(err + "err")
    }
    )
  }

  ngOnDestroy() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
  }
  deletepage() {
    this.common.showLoading()
    console.log(this.selectedpage);
    var menu = { "menu_id": this.selectedpage.menu_id,"menu_label":this.selectedpage.menu_label }
    this.apiService.post(this.constantsService.updateMenu, menu).subscribe((succ: any) => {
      console.log(succ);
      $('#pageModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);

        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#pageModal').modal('hide')

      this.common.hideLoading();
      console.log(err + "err")
    });
  }
  showModal(page) {
    // let data={}
    // =\
    $('#pageModal').modal('show')

    this.selectedpage = page;
  }


  goEditListManagement(page: any) {
   
    this.common.setEditPage(page)
    console.log(this.common.getEditPage())
    this.router.navigateByUrl('/home/group-management/addPage');


  }
  addPage() {
    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
    this.isScroll = true;
    this.router.navigateByUrl('/home/group-management/addPage');

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

  getAccessRole(role){  
    let access=this.role[role]?false:true;   
    return access;    
  }

}

