import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { CountryService } from 'src/service/country.service';
// import * as $ from 'jquery'
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  isScroll: boolean;
  user: any = {};
  listCompany: any = [];
  selectedUser: any;
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,

  }
  table: any;
  tableCountry: any = [];
  statusInActive: any = true;
  statusActive: any = true;
  listOringinalCompany: any = [];
  role: any;
  SearchValue:any;
  constructor(private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public countryService: CountryService) {
    this.user = this.common.getUser()
    this.role = this.common.getRole();
    //this.countryService.getApiCountryCode();

  }
  resetSearch() {
    this.SearchValue = '';
$('.datatable').dataTable().fnDestroy();
    this.reinitTable()
    }
  ngOnInit() {
   
    myMethod();
    selectSearchMethod();

    
    this.common.showLoading()
    this.apiService.post(this.constantsService.companyList, this.reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading()



      this.listOringinalCompany = succ.data.companyList ? succ.data.companyList : [];
      this.listCompany = Object.assign(this.listOringinalCompany, {})

      this.getCountryMaster();

      setTimeout(() => {
       
        this.loadJquery();
        this.initDatatable();
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });

      }, 1000);


    }, err => {
      this.common.hideLoading()

      
    }
    )



  }
  getCountryMaster() {
    this.tableCountry = [];
    for (let i = 0; i < this.listOringinalCompany.length; i++) {
      // if()
      this.tableCountry.push({
        id: i + 1,
        name: this.listOringinalCompany[i].country,
        isChecked: true,

      })
    }
    var uniqueArray = _.uniqBy(this.tableCountry, 'name');

    
    this.tableCountry = uniqueArray
    
  }
  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      
      this.initDatatable();

    }, 1000);
  }
  clearCountry() {
    this.listCompany = this.listOringinalCompany;
    this.reinitTable();
    this.reqObj.isCountryFilter = false;
    for (let i = 0; i < this.tableCountry.length; i++) {
      this.tableCountry[i].isChecked = true;
    }
  }
  countryChange() {
    
    this.listCompany = [];
    let temp = 0;
    for (let i = 0; i < this.tableCountry.length; i++) {
      if (this.tableCountry[i].isChecked) {


        for (let j = 0; j < this.listOringinalCompany.length; j++) {
          if (this.listOringinalCompany[j].country == this.tableCountry[i].name) {
            this.listCompany.push(this.listOringinalCompany[j]);
            temp++;
          }
        }
      }
    }
    if (temp == this.listOringinalCompany.length) {
      this.reqObj.isCountryFilter = false;
    } else {
      this.reqObj.isCountryFilter = true;

    }
    
   
    this.reinitTable();

  }
  clearAllFilter() {
    this.listCompany = this.listOringinalCompany;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    this.reqObj.isCountryFilter = false;
    this.statusActive = true
    this.statusInActive = true
    for (let i = 0; i < this.tableCountry.length; i++) {
      this.tableCountry[i].isChecked = true;
    }

  }
  clearStatus() {
    this.listCompany = this.listOringinalCompany;
    this.reinitTable();
    this.reqObj.isStatusFilter = false;
    
    this.statusActive = true
    this.statusInActive = true
  }
  onStatusChange(status) {
    // this.common.showLoading();
   
    this.listCompany = [];
    let temp = 0;
    for (let j = 0; j < this.listOringinalCompany.length; j++) {

      if (this.statusActive && this.listOringinalCompany[j].isActive == 1) {
        this.listCompany.push(this.listOringinalCompany[j]);
        temp++;
      }
      if (this.statusInActive && this.listOringinalCompany[j].isActive == 0) {
        this.listCompany.push(this.listOringinalCompany[j]);

        temp++;

      }

    }
    if (temp == this.listOringinalCompany.length) {
      this.reqObj.isStatusFilter = false;
    } else {
      this.reqObj.isStatusFilter = true;

    }
   
      this.reinitTable();
   

  }
  initDatatable() {
   
    var oTable = $(".datatable").DataTable({
   
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
    $(".user-arrow").on('click', function () {
      var arrowelement = $(this);
      if ($(this).hasClass('filter-open')) {
        $(this).parent("th").find(".table-checkfilter").addClass("active");
        $(this).parent("th").prop("disabled", true);
        setTimeout(function () {
          arrowelement.removeClass('filter-open');
          arrowelement.addClass('filter-close');
        }, 500);
      }
      if ($(this).hasClass('filter-close')) {
        $(this).parent("th").find(".table-checkfilter").removeClass("active");
        setTimeout(function () {
          arrowelement.removeClass('filter-close');
          arrowelement.addClass('filter-open');
        }, 500);
      }
      $('.tablesearch-content').mCustomScrollbar('update');
      return false;
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
  ngOnDestroy() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
  }
  addCompany() {


    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
    this.isScroll = true;
    this.router.navigateByUrl('/home/company-master/company');

  }

  goEditListCompany(id: any) {
    
    var CompId = { "id": id };
    this.common.setEditcompany(CompId)
    
    this.router.navigateByUrl('/home/company-master/company');

  }

  onScroll() {
    
    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();
    
  }

  showModal(user) {
   
    $('#userModal').modal('show')

    this.selectedUser = user;

  }


  deleteUser() {
    this.common.showLoading()
 
    this.selectedUser.isActive = "Deleted";
    let obj = {
      id: this.selectedUser.companyId,
      "isActive": "Deleted"
    }

    this.apiService.post(this.constantsService.updateStatus, obj).subscribe((succ: any) => {
      
      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.reinitTable();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide')

      this.common.hideLoading();
      
    });
  }

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
}
