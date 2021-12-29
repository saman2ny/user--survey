import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import { setup, track, printSubscribers } from 'observable-profiler';



declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import * as _ from 'lodash';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent extends OnDestroyMixin implements OnInit {
  listSurvey: any =[];
  user: any;
  selectedSurvey: any = {};
  fetchStatus: any = [];


  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) { 
      super();
      this.user = this.common.getUser();
      console.log(this.user, "111111111111")
    }


    demoCall(){

    }
  ngOnInit(): void {
    myMethod();
    // this.loadJquery();
    selectSearchMethod();
    this.demoCall()
    this.listcall();

    this.apiService.getSurvey(this.constantsService.fetchSurveyStatuss, {}).pipe(untilComponentDestroyed(this)).subscribe((succ: any) => {
  
      console.log(succ + "succ")
      this.fetchStatus = succ

    }, err => {
      this.common.hideLoading();
      console.log(err + "err")
    });


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

  addSurvey(){
    this.router.navigateByUrl("/post-survey");
  }
  showReports(listSurvey){
    this.common.setSurveyId(listSurvey)
    this.router.navigateByUrl("/reports-survey/"+listSurvey.surveyId);

  }
  goEditListSurvey(listSurvey){

    var listSurveyId = { "listSurvey": listSurvey };
    this.common.setEditcompany(listSurveyId)
    
    this.router.navigateByUrl('/post-survey');
  }

  showModal(id) {
    $('#deleteSurveyModal').modal('show')
    this.selectedSurvey = id;
  }

  gotoStatus(id){
    let fetStatus = this.fetchStatus.filter(
      fetch => {
        if (fetch.statusId === (id))
          return fetch;
      });
    if (fetStatus.length)
      return fetStatus[0].statusDesc

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
    this.common.hideLoading()
  }
  deleteSurvey(){
    this.common.showLoading()
    // let obj = { id: this.selectedMask }
    this.apiService.postSurvey(this.constantsService.deleteSurvey, this.selectedSurvey).subscribe((succ: any) => {
      console.log(succ);
      $('#deleteSurveyModal').modal('hide')
      this.common.hideLoading();
        // this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
     

    }, err => {
      $('#deleteSurveyModal').modal('hide')

      this.common.hideLoading();
      console.log(JSON.stringify(err) + "err")
    });
  }


  listcall(){
    console.log("listcalll")
    // let listCallFrame = {"createdby": this.user.userId, "type": 1}
    let listCallFrame = {
      "branchId": 0,
      "companyId": 0,
      "corporateId": 0,
      "createdby": "Administrator",
      "sessionId": "UPOJRVQFLKNSDEGADMINISTRATOR235732CVQTAWUPYKEFONM",
      "type": 1,
      "userId": "Administrator"
    }

    this.apiService.postSurvey(this.constantsService.listSurveyyy, listCallFrame).subscribe((succ: any) => {
      console.log(succ, "listSurvey")
   
      this.listSurvey = succ

      // setTimeout(() => {
      //   $('[data-toggle="tooltip"]').tooltip({
      //     trigger: 'hover'
      //   });
      //    this.loadJquery();
      //    this.initDatatable();
  
      // }, 1500);


    }, err => {
      this.common.hideLoading()

      
    })

  }


}
