import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { formatDate, DatePipe } from '@angular/common';
import MyCustomUploadAdapterPlugin from '../test.js';
import { spaceValidator } from 'src/service/utils';
import { TooltipLabel } from 'ngx-intl-tel-input';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-categrory-master',
  templateUrl: './categrory-master.component.html',
  styleUrls: ['./categrory-master.component.css']
})
export class CategroryMasterComponent implements OnInit {

  role: any;
  reqObj :any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,

    "isMainChecker": false,
    "menuId": 0,


  }
  user: any = {};
  selectedcategory: any = {};
  categoryList: any = [];
  selectedCate: any;
  SearchValue:any;
  listCompany: any[];
  statusInActive: any = true;
  statusActive: any = true;
  listMainCustomers: any = [];
  listAllCustomers: any = [];
  constructor(private el: ElementRef, public common: CommonService, public formBuilder: FormBuilder, public constantsService: ConstantsService, public apiService: ApiService, public router: Router) {
    this.role = this.common.getRole();
    
    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
  }
  resetSearch(){
    this.SearchValue = '';
    $('.datatable').dataTable().fnDestroy();
    this.ngOnInit();
    }
  goToaddCateogory() { this.router.navigate(["home/campaign-management/AddCategory"]); }

  ngOnInit(): void {
    myMethod();
    selectSearchMethod();
    this.user = this.common.getUser()


    this.common.showLoading()
    this.apiService.post(this.constantsService.viewCategoryList, this.reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading();
      this.categoryList = succ.data.data;
      this.listMainCustomers = succ.data.data;
      this.categoryList = Object.assign(this.listMainCustomers, {})
      
      setTimeout(() => {
        this.initTable()
        this.loadJquery();
        
          $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
          });
      }, 1000);

    }, err => {
      this.common.hideLoading()

      
    }
    )


  }
  onStatusChange(status) {

  
    this.categoryList = [];
    let temp = 0;
    for (let j = 0; j < this.listMainCustomers.length; j++) {

      if (this.statusActive && this.listMainCustomers[j].status == "true") {
        this.categoryList.push(this.listMainCustomers[j]);
        temp++;
      }
      if (this.statusInActive && this.listMainCustomers[j].status == "false") {
        this.categoryList.push(this.listMainCustomers[j]);

        temp++;

      }

    }
    if (temp == this.listMainCustomers.length) {
      this.reqObj.isStatusFilter = false;
    } else {
      this.reqObj.isStatusFilter = true;

    }
   // $('.datatable').dataTable().fnDestroy();
    this.reinitTable();

  }
  clearAllFilter() {
    this.listAllCustomers = this.listMainCustomers;
   // $('.datatable').dataTable().fnDestroy();
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.statusActive = true
    this.statusInActive = true

  }
  clearStatus() {
    this.listAllCustomers = this.listMainCustomers;
   // $('.datatable').dataTable().fnDestroy();
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.statusActive = true
    this.statusInActive = true
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      this.initTable();

    }, 1000);
  }

  initTable() {
    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      aaSorting: [],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
  }
  loadJquery() {
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
  gotoCategory(category: any) {
    this.common.setEditCampaignCategory(category)
    this.router.navigateByUrl('/home/campaign-management/AddCategory');
  }
  deleteCategory(category) {
    this.selectedCate = category;
    $("#deleteModal").modal("show");
  }
  delete() {

    
    // this.categoryObj=this.categoryForm.value;
    // this.categoryObj.categoryId=this.category.categoryId;
    
    this.common.showLoading()
    this.apiService.post(this.constantsService.deleteCategory, this.selectedCate).subscribe((succ: any) => {
      this.common.hideLoading();

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $("#deleteModal").modal("hide");

        $('.datatable').dataTable().fnDestroy();
        // $("deleteModal").modal("hide");

        // this.router.navigate(['../home/campaign-management/categoryMaster/']);
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      this.common.hideLoading();
      
    })
  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

}
