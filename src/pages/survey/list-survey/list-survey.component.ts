/* eslint-disable rxjs-angular/prefer-takeuntil */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';


declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {
  listSurvey: any = [];
  user: any;
  selectedSurvey: any = {};
  fetchStatus: any = [];


  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();
  }



  ngOnInit(): void {
    myMethod();
    // this.loadJquery();
    selectSearchMethod();
    this.listcall();

    this.apiService.getSurvey(this.constantsService.fetchSurveyStatuss, {}).subscribe((succ: any) => {

      console.log(succ + 'succ');
      this.fetchStatus = succ;

    }, err => {
      this.common.hideLoading();
      console.log(err + 'err');
    });


  }

  loadJquery(): void {
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

  demoSurvey(): void {
    this.router.navigateByUrl('/demo-reports');

  }
  addSurvey(): void {
    this.router.navigateByUrl("post-survey");
  }

  showReports(listSurvey): void {
    this.common.setSurveyId(listSurvey);
    // this.router.navigateByUrl('/reports-survey/' + listSurvey.surveyId);
    this.router.navigateByUrl('demo-reports');
  }

  goEditListSurvey(listSurvey): void {

    const listSurveyId = { 'listSurvey': listSurvey };
    this.common.setEditcompany(listSurveyId);

    this.router.navigateByUrl('/post-survey');
  }

  showModal(id): void {
    $('#deleteSurveyModal').modal('show');
    this.selectedSurvey = id;
  }

  gotoStatus(id): void {
    const fetStatus = this.fetchStatus.filter(
      fetch => {
        if (fetch.statusId === (id)) { return fetch; }
      });
    if (fetStatus.length)
      return fetStatus[0].statusDesc;

  }

  initDatatable(): void {
    const oTable = $('.datatable').DataTable({
      scrollCollapse: true
    });
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    });
    this.common.hideLoading();
  }
  deleteSurvey(): void {
    this.common.showLoading();
    this.apiService.postSurvey(this.constantsService.deleteSurvey, this.selectedSurvey).subscribe((succ: any) => {
      $('#deleteSurveyModal').modal('hide');
      this.common.hideLoading();
      $('.datatable').dataTable().fnDestroy();
      this.ngOnInit();


    }, err => {
      $('#deleteSurveyModal').modal('hide');

      this.common.hideLoading();
      console.log(JSON.stringify(err) + 'err');
    });
  }


  listcall(): void {
    const listCallFrame = {
      "branchId": 0,
      "companyId": 0,
      "corporateId": 0,
      "createdby": "Administrator",
      "sessionId": "UPOJRVQFLKNSDEGADMINISTRATOR235732CVQTAWUPYKEFONM",
      "type": 1,
      "userId": "Administrator"
    };

    this.apiService.postSurvey(this.constantsService.listSurveyyy, listCallFrame).subscribe((succ: any) => {
      this.listSurvey = succ;
    }, err => {
      this.common.hideLoading();


    });

  }


}
