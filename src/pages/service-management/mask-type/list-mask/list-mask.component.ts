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
  selector: 'app-list-mask',
  templateUrl: './list-mask.component.html',
  styleUrls: ['./list-mask.component.css']
})
export class ListMaskComponent implements OnInit {
  listMasks : any = [];
  listMainMasks: any = [];
  reqObj: any = {    
    // "statusFilter": "1",
    "isMainChecker": false,   
  }
  statusInActive: any = true;
  statusActive: any = true;
  selectedMask: any = {};
  isScroll: boolean;
  user: any;
  role: any;
  MaskTypeMasterList: any = [];

  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) { 
     
      this.apiService.post(this.constantsService.listMaskTypeMasterr, {}).subscribe((succ: any) => {
        if(succ.code === 200){
        this.MaskTypeMasterList = succ.data;
        this.common.hideLoading();
        }
      }, err => {
        console.log(err + "err")
        this.common.hideLoading();        
      })
    }

  ngOnInit(){
    myMethod();
    selectSearchMethod();

    this.apiService.post(this.constantsService.listMaskTypeAll, {}).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading()
     
    this.listMainMasks = succ.data;      
    this.listMasks = Object.assign(this.listMainMasks, {})     


      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
        });
        this.loadJquery();
        this.initDatatable();

      }, 1500);

      // }
    }, err => {
      this.common.hideLoading()
      console.log(err + "err")
    }
    )


  }

  reinitTable() {
    $('.datatable').dataTable().fnDestroy();
    setTimeout(() => {
      this.common.hideLoading()
      console.log("init table")
      this.initDatatable();

    }, 1000);
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

onStatusChange(status) {
  this.common.showLoading()
      console.log(status)
      console.log(this.statusActive)
      console.log(this.statusInActive)
      this.listMasks = [];
      let temp = 0;
      for (let j = 0; j < this.listMainMasks.length; j++) {
  
        if (this.statusActive && this.listMainMasks[j].isActive == "true") {
          this.listMasks.push(this.listMainMasks[j]);
          temp++;
        }
        if (this.statusInActive && this.listMainMasks[j].isActive == "false") {
          this.listMasks.push(this.listMainMasks[j]);
  
          temp++;
  
        }
  
      }
      if (temp == this.listMainMasks.length) {
        this.reqObj.isStatusFilter = false;
      } else {
        this.reqObj.isStatusFilter = true;
  
      }
      this.reinitTable();
  
    }

    clearAllFilter() {
      this.listMasks = this.listMainMasks;
      this.reinitTable();
      this.reqObj.isStatusFilter = false;    
      this.statusActive = true
      this.statusInActive = true     
    }

    clearStatus() {
      this.listMasks = this.listMainMasks;
      this.reinitTable();
      this.reqObj.isStatusFilter = false;
      this.statusActive = true
      this.statusInActive = true
    }

  addMask(){
    this.reqObj = {    
      // "statusFilter": "1",
      "isMainChecker": false  
    }

    this.isScroll = true;
    this.common.setEditService({});
    this.router.navigateByUrl('/home/service-management/mask-type');
  }

  showModal(id) {
    $('#deleteMaskModal').modal('show')
    this.selectedMask = id;
  }

  deleteMask(){
    this.common.showLoading()
    // let obj = { id: this.selectedMask }
    this.apiService.post(this.constantsService.deleteMaskTypeForParameter, this.selectedMask).subscribe((succ: any) => {
      console.log(succ);
      $('#deleteMaskModal').modal('hide')
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('.datatable').dataTable().fnDestroy();
        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#deleteMaskModal').modal('hide')

      this.common.hideLoading();
      console.log(err + "err")
    });
  }

  gotoMaskEdit(data){
    this.common.setEditService(data);
    console.log(this.common.getEditService() + "id")
    this.router.navigateByUrl('/home/service-management/mask-type');
  }

  getMaskName(id) {
    let branch = this.MaskTypeMasterList.filter(
      bran => {
        if (bran.id == parseInt(id))
          return bran;
      });
    if (branch.length)
      return branch[0].maskTypes
  }

ngOnDestroy() {
    this.reqObj = {     
      // "statusFilter": "1",
      "isMainChecker": false,
    }
  }

}
