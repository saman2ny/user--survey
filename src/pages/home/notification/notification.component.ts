import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  table: any;
  user: any = {};
  listNotis: any = [];
  selectedNotifi: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();

    
  
  }

  ngOnInit(): void {
    myMethod();
    selectSearchMethod();

    //ListNotifications
    this.common.showLoading()
    this.apiService.post(this.constantsService.notificationsList, {}).subscribe((succ: any) => {
      this.listNotis = succ.data;
      console.log(this.listNotis, 'succ')
this.common.hideLoading()
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        this.loadJquery();
        this.initDatatable();

      }, 1500);
    }, err => {
      console.log(err + "err")
    })

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger:'hover'
      });
    }, 3000);

    
   

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
        $(this).parent("th").prop("disabled",true);
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

  
  initDatatable() {
    setTimeout(() => {
      //  alert("2")
      var oTable = $(".datatable").DataTable({
        scrollCollapse: true,
        aaSorting: [[0, 'asc']]
      })
      $('#searchTextId').keyup(function () {
        oTable.search($(this).val()).draw();
      })
    }, 1500);
  }

  clearAllFilter() {
    
    this.reinitTable();
  }

  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      this.common.hideLoading()
      console.log("init table")
      this.initDatatable();

    }, 1000);
  }

  showModal(data) {
    $('#notiModal').modal('show')
    this.selectedNotifi = data;
  }

  deleteNotification(){

    this.common.showLoading()
    let obj = this.selectedNotifi
    this.apiService.post(this.constantsService.deleteNotification, obj).subscribe((succ: any) => {
      console.log(succ);
      $('#notiModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      $('#notiModal').modal('hide')
      this.common.hideLoading();
      console.log(err + "err")
    });

  }


}
