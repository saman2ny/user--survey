import { Component, OnInit, ElementRef, Input,Inject, LOCALE_ID,ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormArray, FormControl,NgControl,NgModel } from '@angular/forms';
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
  selector: 'app-add-category',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-category.component.html',
  styleUrls: [    
        './add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryFormOld: any = {

  };

  categoryFormNew: any = {};
  categoryObj: any = {};
  category: any;
  newCategory: boolean;
  editData: any;
  editCategoryName: boolean = false;
  categoryName: any;
  description: any;
  role: any;



  constructor(private el: ElementRef, public common: CommonService,
     public formBuilder: FormBuilder, public constantsService: ConstantsService, public apiService: ApiService,
      public router: Router) {

        
    
    
  }

 

  ngOnInit(): void {

    myMethod();
    selectSearchMethod();
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, spaceValidator]],
      description: ['', [Validators.required, spaceValidator]],
      Virtualkeyboard:[''],
      Typelang:['']

    });
    // this.categoryObj=""
    this.role = this.common.getRole();
    
   
    // this.category = this.common.getEditCampaignCategory();
    this.editData = this.common.getEditCampaignCategory();
    this.categoryForm.patchValue(this.categoryForm)
    
    setTimeout(() => {
      this.categoryFormOld = this.categoryForm.value

      this.categoryForm.valueChanges.subscribe(value => {
        
        this.categoryFormNew = value
      });

      
    }, 3000);
    if (_.isEmpty(this.editData)) {
      this.newCategory = true;
      
    } else {
      
      this.newCategory = false;
      
      this.categoryObj = this.editData;
      this.categoryName = this.categoryObj.categoryName
      this.description = this.categoryObj.description
      // this.categoryForm.controls["categoryName"].clearValidators();
      // this.categoryForm.controls["categoryName"].updateValueAndValidity();
      // this.categoryObj.categoryName=this.category.categoryName;
      // this.categoryObj.categoryDesc=this.category.description;
    }
    
  }


 




  back() {
    this.router.navigate(['../home/campaign-management/categoryMaster/']);

  }
  edit() {
    // this.categoryForm.controls["categoryName"].setValidators([Validators.required]);

    // this.categoryForm.controls["categoryName"].updateValueAndValidity();
    this.categoryName = this.categoryName;

    this.editCategoryName = true;
    
  }
  cancel() {

    this.editCategoryName = false;

  }
  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    } else {
      
      this.categoryObj = this.categoryForm.value;
      this.common.showLoading()
      this.apiService.post(this.constantsService.createCategory, this.categoryObj).subscribe((succ: any) => {
        
        this.common.hideLoading();

        this.common.hideLoading();
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          
          
          this.router.navigate(['../home/campaign-management/categoryMaster/']);
        }
        else {
          this.common.showErrorMessage(succ.message);
        }

      }, err => {
        this.common.hideLoading();
        
      })
    }
  }
  openStatus() {
    if (this.categoryObj.status == "0")
      this.categoryObj.changeStatus = false;
    else if (this.categoryObj.status == "1")
      this.categoryObj.changeStatus = true;

    this.categoryObj.changeReason = "";
  }
  updateStatus() {
    if (!this.categoryObj.changeReason) {
      this.common.showErrorMessage("Reason is must");
      return;
    }
    if (this.categoryObj.changeStatus == true || this.categoryObj.changeStatus == 1)
      this.categoryObj.status = 1;
    else
      this.categoryObj.status = 0;
    // this.categoryObj.status = this.categoryObj.changeStatus;
    this.categoryObj.reason = this.categoryObj.changeReason;
    

    this.common.showLoading()
    this.apiService.post(this.constantsService.updateCategory, this.categoryObj).subscribe((succ: any) => {
      
      this.common.hideLoading();

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        $('#statusModal').modal("hide");
        this.router.navigate(['../home/campaign-management/categoryMaster/']);
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      this.common.hideLoading();
      
    })

  }
  update() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();

      return;
    } 
    
     
      else {
        
        
        if (_.isEmpty(this.categoryFormNew)) {
          this.categoryFormNew = this.categoryFormOld
        }
        else {
          this.categoryFormNew = this.categoryFormNew
        }
        if (_.isEqual(this.categoryFormOld, this.categoryFormNew) ) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      }
      else{
      
      // this.categoryObj = this.categoryForm.value;
      // this.categoryObj.categoryName = this.categoryObj.categoryName;
      // this.categoryObj.categoryId = this.category.categoryId;
      this.categoryObj.description = this.description;
      this.categoryObj.categoryName = this.categoryName;

      
      this.common.showLoading()
      this.apiService.post(this.constantsService.updateCategory, this.categoryObj).subscribe((succ: any) => {
        
        this.common.hideLoading();

        this.common.hideLoading();
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/campaign-management/categoryMaster/']);
        }
        else {
          this.common.showErrorMessage(succ.message);
        }

      }, err => {
        this.common.hideLoading();
        
      })
    }
  }
  }
  

  ngOnDestroy() {

    this.common.setEditCampaignCategory({})


  }

  

  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
  changeField(event, pattern, min, limitTo, id, length) {

    var k;
    k = event.keyCode;  //         k = event.keyCode;  (Both can be used)

    const value = event.target.value.substr(0, limitTo);
    if (event.target.value != value) {
      event.target.value = value;
      return;
    }
    let patt = new RegExp(pattern);
    event.target.value = event.target.value.replace(patt, '');
    if (event.target.value != value) {

      return;
    }
    if (length >= limitTo) {
      return;
    }
  }

}
