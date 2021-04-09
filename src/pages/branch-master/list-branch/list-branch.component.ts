import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
import * as _ from 'lodash';
import { CountryService } from 'src/service/country.service';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css']
})
export class ListBranchComponent implements OnInit, OnDestroy {
  SearchValue:any;
  user: any = {};
  role: any;
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,

  }
  table: any;
  listBranch: any;
  listMainBranch: any = [];
  tableBranch: any = [];
  statusInActive: any = true;
  statusActive: any = true;

  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public countryService: CountryService) { 

    this.role = this.common.getRole();

    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.user = this.common.getUser();
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;
    //this.countryService.getApiCountryCode();
    }

  ngOnInit(): void {
    myMethod();
    selectSearchMethod();
    
    //ListBranch
    this.apiService.post(this.constantsService.bracheelist, {}).subscribe((succ: any) => {
      this.listMainBranch = succ.data;
      this.listBranch = Object.assign(this.listMainBranch, {})
      this.getBranchMaster();
      
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
         this.loadJquery();
         this.initDatatable();

      }, 1500);

    }, err => {
      
    })
  }
  resetSearch() {
    this.SearchValue = '';
$('.datatable').dataTable().fnDestroy();
this.initDatatable();
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
    // $(".user-arrow").click(function () {
    //   $(this).parent("th").find(".table-checkfilter").toggleClass("active");
    //   $('.tablesearch-content').mCustomScrollbar('update');
    // });
   $(".user-arrow").click(function () {
      $(this).parent("th").find(".table-checkfilter").toggleClass("active");
      $('.tablesearch-content').mCustomScrollbar('update');
      $(this).toggleClass("filter-close").removeClass('filter-open')
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

  getBranchMaster() {
    this.tableBranch = [];
    for (let i = 0; i < this.listBranch.length; i++) {
      // if()
      this.tableBranch.push({
        id: i + 1,
        name:this.listBranch[i].country,
        isChecked: true,

      })
    }
    var uniqueArray = _.uniqBy(this.tableBranch, 'name');

    
    this.tableBranch = uniqueArray
    
  }

  countryChange() {
    
    this.listBranch = [];
    let temp = 0;
    for (let i = 0; i < this.tableBranch.length; i++) {
      if (this.tableBranch[i].isChecked) {

        for (let j = 0; j < this.listMainBranch.length; j++) {
          
          if (this.listMainBranch[j].country == this.tableBranch[i].name) {
            this.listBranch.push(this.listMainBranch[j]);
            temp++;
          }
        }
      }
    }
    if (temp == this.listMainBranch.length) {
      this.reqObj.isCountryFilter = false;
    } else {
      this.reqObj.isCountryFilter = true;
    }
    
    // setTimeout(() => {
    this.reinitTable();

  }


  onStatusChange(status) {



    this.listBranch = [];
    let temp = 0;
    for (let j = 0; j < this.listMainBranch.length; j++) {
     var one =  this.listMainBranch[j].isActive
     if(one === 1){
       alert("true1")
      var finalTrueOne: any  = true
     }
     if(one != 1){
      var finalFalseOne: any  = false
     }
      if (this.statusActive && finalTrueOne == "Active") {
        alert("true2")

        this.listBranch.push(this.listMainBranch[j]);
        temp++;
      }
      if (this.statusInActive && finalFalseOne == "Inactive") {
        this.listBranch.push(this.listMainBranch[j]);

        temp++;

      }

    }
    if (temp == this.listMainBranch.length) {
      this.reqObj.isStatusFilter = false;
    } else {
      this.reqObj.isStatusFilter = true;

    }
    this.reinitTable();
    // this.ngOnInit();

  }
  clearAllFilter() {
    this.listBranch = this.listMainBranch;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.reqObj.isCountryFilter = false;
    this.statusActive = true
    this.statusInActive = true
    for (let i = 0; i < this.tableBranch.length; i++) {
      this.tableBranch[i].isChecked = true;
    }

  }

  clearCountry(){
    this.listBranch = this.listMainBranch;
    this.reinitTable();
    this.reqObj.isCountryFilter = false;
    for (let i = 0; i < this.tableBranch.length; i++) {
      this.tableBranch[i].isChecked = true;
    }
  }

  clearStatus() {
    this.listBranch = this.listMainBranch;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.statusActive = true
    this.statusInActive = true
  }

  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      this.initDatatable();

    }, 1000);
  }

  initDatatable() {
    // setTimeout(() => {
    //  alert("2")
    var oTable = $(".datatable").DataTable({
      scrollCollapse: true,
      // searching: false,
      // aaSorting: [[0, 'asc']],
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })
  }
  gotoDefaultBranch(data){

    this.common.setEditBranch(data);
    
    this.router.navigateByUrl('/home/branch/add-branch');

  }

  deleteBranch(){

  }
  addBranch(){
    this.router.navigateByUrl('/home/branch/add-branch');

  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  ngOnDestroy() {
   this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,  
    }
  }
}
