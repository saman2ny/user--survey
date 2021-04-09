import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import * as _ from 'lodash';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit, OnDestroy {
  pageObj: any = {
    is_active: "Active"
  };
  pageForm: FormGroup;
  isEdit: any;
  editData: any;
  listPages: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) { }

  ngOnInit() {

    myMethod();
    selectSearchMethod();
    
    this.pageForm = this.formBuilder.group({

      menu_label: ['', Validators.required],

      is_active: ['', Validators.required],
      is_sub_menu: ['', Validators.required],
      menu_icon: ['', Validators.required],
      menu_url: ['', Validators.required],
      sequence: ['', Validators.required],
      is_default: ['', Validators.required],
      ref_menu_id: [''],
    });
    this.editData = this.common.getEditPage()
    
    if (_.isEmpty(this.editData)) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.pageObj = this.editData;
    }
    this.common.showLoading()
    let reqObj = {
      "searchText": "",
      "noOfRecords": 1000,
      "pageIndex": 1,

    }
    this.apiService.post(this.constantsService.listMenu, reqObj).subscribe((succ: any) => {
      
      this.common.hideLoading()


      let d = succ.data.menulist;
      for (let i = 0; i < d.length; i++) {
        if (!d[i].is_sub_menu)
          this.listPages.push(d[i]);
      }
      


      // this.listPage=[{

      // }]

    }, err => {
      this.common.hideLoading()

      
    }
    )
  }
  ngOnDestroy() {
    this.common.setEditPage({})
    // this.common.setEditOperator(Opid)
  }
  Update() {

  }
  Save() {
    
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      return;
    }

    
    // return;
    this.common.showLoading()

    this.apiService.post(this.constantsService.addMenu, this.pageObj).subscribe((succ: any) => {
      
      this.common.hideLoading()


      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/group-management/pageList']);



      }
      else {
        this.common.showErrorMessage(succ.message)

      }

    },
      err => {
        this.common.hideLoading()

      });
  }
  back() {
    this.router.navigate(['../home/group-management/pageList']);
  }
  changeSubMenuSelect(value) {

    
    if (value == "1") {
      this.pageForm.get('ref_menu_id').setValidators([Validators.required])
      this.pageForm.get('ref_menu_id').updateValueAndValidity();

    } else {
      this.pageForm.get('ref_menu_id').clearValidators();
      this.pageForm.get('ref_menu_id').updateValueAndValidity();
    }

  }
}
