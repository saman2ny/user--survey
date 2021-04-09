import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
import { spaceValidator } from 'src/service/utils';


@Component({
  selector: 'app-mask-type',
  templateUrl: './mask-type.component.html',
  styleUrls: ['./mask-type.component.css']
})
export class MaskTypeComponent implements OnInit {
  maskObj: any = {};
  maskForm: FormGroup
  isActiveForm: FormGroup
  listDate: any;
  MaskTypeMasterList: any;
  showOne = true
  showThree = true
  showFour = true
  showFive = true
  marked: any;
  showInnerOne = true
  edit: any;
  final: any;
  maskFormOld: any = {}
  maskFormNew: any = {}
  temp: any = {};
  defaultTrue: boolean = true;
  statusHideInAdd: boolean;
  active: boolean = true;
  isActiveFormNew: any = {};
  isActiveFormOld: any = {};
  
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location) {
    this.common.showLoading();


    this.apiService.post(this.constantsService.listAllDateFormat, {}).subscribe((succ: any) => {
      if (succ.code === 200) {
        this.listDate = succ.data;
        this.common.hideLoading();
      }
    }, err => {
      console.log(err + "err")
      this.common.hideLoading();
    })



    this.apiService.post(this.constantsService.listMaskTypeMasterr, {}).subscribe((succ: any) => {
      if (succ.code === 200) {
        this.MaskTypeMasterList = succ.data;
        this.common.hideLoading();
      }
    }, err => {
      console.log(err + "err")
      this.common.hideLoading();
    })


  }

  ngOnInit(): void {
    this.maskForm = this.formBuilder.group({
      maskTypeName: ['', Validators.compose([Validators.required])],
      maskType: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([])],
      amount: ['', Validators.compose([])],
      maskChar: ['', Validators.compose([])],
      maskEnabled: ['', Validators.compose([])],
      rangeToBeMasked: ['', Validators.compose([])],
      length: ['', Validators.compose([])],
      email: ['', Validators.compose([])],

    })
    this.maskForm.patchValue(this.maskForm)

    this.isActiveForm = this.formBuilder.group({
      isActive: [''],
      reason: [''],
    })
    this.isActiveForm.patchValue(this.isActiveForm)


    this.edit = this.common.getEditService()
    // this.edit = {"id": 1}
    if (!_.isEmpty(this.edit)) {
      this.temp.status = 'edit';
      this.statusHideInAdd = true
      this.getApprovedData();


    } else {
      this.temp.status = 'new';
      this.statusHideInAdd = false
      this.isActiveForm.disable()
    }

  }


  activeNameChange(){
    if(this.maskObj.isActive == true){
this.active = true

this.isActiveForm.get('reason').clearValidators();
this.isActiveForm.get('reason').updateValueAndValidity();



    }if(this.maskObj.isActive == false){
      this.active = false
      this.isActiveForm.get('reason').setValidators(Validators.required)
      this.isActiveForm.get('reason').updateValueAndValidity();

    }
  }
  

  getApprovedData() {
    // alert("2")
    this.common.showLoading();
    this.apiService.post(this.constantsService.getMaskTypeForParameterById, this.edit).subscribe((succ: any) => {
      this.common.hideLoading();

      if (succ.code == 200) {

        this.maskObj = succ.data;
        console.log(this.maskObj)

        var isActive = JSON.parse(succ.data.isActive);
        this.maskObj.isActive = isActive

        if (this.maskObj.isActive == true) {
          this.defaultTrue = true
          this.active = true

        }
        else {
          this.defaultTrue = false
          this.active = false
        }


        let Type = succ.data.maskType
        this.maskType(Type)

        let maskEnabled = JSON.parse(succ.data.maskEnabled)
        if(maskEnabled ===  true){
          this.toggleVisiblity(maskEnabled)
        }else{
          this.maskObj.maskEnabled = false
        }
        this.common.showLoading()

        setTimeout(() => {
this.common.hideLoading()
          this.maskFormOld = this.maskForm.value

          this.maskForm.valueChanges.subscribe(value => {


            this.maskFormNew = value
          });

          this.isActiveFormOld = this.isActiveForm.value

          this.isActiveForm.valueChanges.subscribe(value => {
            
            
            this.isActiveFormNew = value
          });

        }, 3000);


      }
      else {
        this.common.hideLoading();
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)

    })
  }



  toggleVisiblity(e) {
    
    if (e.target === undefined || e === null) {
      this.marked = e
    } else {
      this.marked = e.target.checked

    }
    if (this.marked === true) {
      this.showInnerOne = false
      this.maskForm.get('maskChar').setValidators(Validators.required);
      this.maskForm.get('maskChar').updateValueAndValidity();
    } else if(this.marked === false){
      this.showInnerOne = true
      this.maskForm.get('maskChar').clearValidators();
      this.maskForm.get('maskChar').updateValueAndValidity();
    }

    // if (e.target.checked === "Hide") {
    //   this.showInnerOne = false
    //   this.maskForm.get('maskChar').setValidators(Validators.required);
    //   this.maskForm.get('maskChar').updateValueAndValidity();
    // } else {
    //   this.showInnerOne = true
    //   this.maskForm.get('maskChar').clearValidators();
    //   this.maskForm.get('maskChar').updateValueAndValidity();
    // }

  }

  maskType($event) {
    // console.log($event.target.value, "valueee");
    if ($event.target === undefined) {
      this.final = $event

    } else {
      this.final = $event.target.value;

    }
    if (this.final === "1" || this.final === "2") {
      this.showOne = false
      this.showThree = true
      this.showFour = true
      this.showFive = true

      this.maskForm.get('length').setValidators(Validators.required);
      this.maskForm.get('length').updateValueAndValidity();
      this.maskForm.get('rangeToBeMasked').setValidators(Validators.required);
      this.maskForm.get('rangeToBeMasked').updateValueAndValidity();
      this.maskForm.get('date').clearValidators();
      this.maskForm.get('date').updateValueAndValidity();
      this.maskForm.get('amount').clearValidators();
      this.maskForm.get('amount').updateValueAndValidity();
      this.maskForm.get('email').clearValidators();
      this.maskForm.get('email').updateValueAndValidity();

    } else if (this.final === "3") {
      this.showThree = false
      this.showFour = true
      this.showFive = true
      this.showOne = true
      this.maskForm.get('date').setValidators(Validators.required);
      this.maskForm.get('date').updateValueAndValidity();


      this.maskForm.get('length').clearValidators();
      this.maskForm.get('length').updateValueAndValidity();
      this.maskForm.get('rangeToBeMasked').clearValidators();
      this.maskForm.get('rangeToBeMasked').updateValueAndValidity();

      this.maskForm.get('amount').clearValidators();
      this.maskForm.get('amount').updateValueAndValidity();

      this.maskForm.get('email').clearValidators();
      this.maskForm.get('email').updateValueAndValidity();

    } else if (this.final === "4") {
      this.showThree = true
      this.showOne = true
      this.showFour = false
      this.showFive = true
      this.maskForm.get('amount').setValidators(Validators.required);
      this.maskForm.get('amount').updateValueAndValidity();

      this.maskForm.get('length').clearValidators();
      this.maskForm.get('length').updateValueAndValidity();
      this.maskForm.get('rangeToBeMasked').clearValidators();
      this.maskForm.get('rangeToBeMasked').updateValueAndValidity();

      this.maskForm.get('date').clearValidators();
      this.maskForm.get('date').updateValueAndValidity();

      this.maskForm.get('email').clearValidators();
      this.maskForm.get('email').updateValueAndValidity();

    } else if (this.final === "5") {
      this.showOne = true
      this.showThree = true
      this.showFour = true
      this.showFive = false
      this.maskForm.get('email').setValidators(Validators.required);
      this.maskForm.get('email').updateValueAndValidity();


      this.maskForm.get('length').clearValidators();
      this.maskForm.get('length').updateValueAndValidity();
      this.maskForm.get('rangeToBeMasked').clearValidators();
      this.maskForm.get('rangeToBeMasked').updateValueAndValidity();

      this.maskForm.get('amount').clearValidators();
      this.maskForm.get('amount').updateValueAndValidity();

      this.maskForm.get('date').clearValidators();
      this.maskForm.get('date').updateValueAndValidity();
    } else {
      this.maskForm.get('maskEnabled').clearValidators();
      this.maskForm.get('maskEnabled').updateValueAndValidity();
      this.maskForm.get('length').clearValidators();
      this.maskForm.get('length').updateValueAndValidity();
      this.maskForm.get('rangeToBeMasked').clearValidators();
      this.maskForm.get('rangeToBeMasked').updateValueAndValidity();
      this.maskForm.get('maskChar').clearValidators();
      this.maskForm.get('maskChar').updateValueAndValidity();
      this.maskForm.get('amount').clearValidators();
      this.maskForm.get('amount').updateValueAndValidity();
      this.maskForm.get('date').clearValidators();
      this.maskForm.get('date').updateValueAndValidity();


      this.maskForm.get('email').clearValidators();
      this.maskForm.get('email').updateValueAndValidity();

    }


  }



  Update() {
    this.common.showLoading()
    if (this.maskForm.invalid) {
      this.maskForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      if (_.isEmpty(this.maskFormNew)) {
        this.maskFormNew = this.maskFormOld
      }
      else {
        this.maskFormNew = this.maskFormNew
      }

      if (_.isEmpty(this.isActiveFormNew)) {
        this.isActiveFormNew = this.isActiveFormOld
      }
      else {
        this.isActiveFormNew = this.isActiveFormNew
      }
      console.log(this.maskFormOld, "this.maskFormOld")
console.log(this.maskFormNew, "this.maskFormNew")

      if (_.isEqual(this.maskFormOld, this.maskFormNew) && _.isEqual(this.isActiveFormOld, this.isActiveFormNew) ) {
        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()

      } else {

        this.apiService.post(this.constantsService.updateMaskTypeForParameter, this.maskObj).subscribe((succ: any) => {

          this.common.hideLoading();
          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.router.navigate(['../home/service-management/list-mask/']);
          }
          else {
            this.common.showErrorMessage(succ.message)
            this.common.hideLoading()
          }
        },
          err => {
            this.common.hideLoading()
          });

      }
    }

  }

  Submit() {

    if (this.maskForm.invalid) {
      this.maskForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')
      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {
      this.common.showLoading()
      this.maskObj.isActive = true
      this.apiService.post(this.constantsService.addMaskTypeForParameter, this.maskObj).subscribe((succ: any) => {

        this.common.hideLoading();
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.router.navigate(['../home/service-management/list-mask/']);
        }
        else {
          this.common.showErrorMessage(succ.message)
          this.common.hideLoading()
        }
      },
        err => {
          this.common.hideLoading()
        });
    }
  }

  back() {
    this.location.back();
  }

  openModal() {
  
    $("#userModal").modal("show")

  }
  closeModal() {
    $("#userModal").modal("hide")

  }

  ActiveUpdate() {
    
    if (this.maskObj.isActive == undefined) {
      this.isActiveForm.get('reason').setValidators(Validators.required)
      this.isActiveForm.get('reason').updateValueAndValidity();

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.maskObj.isActive = false
        $("#userModal").modal("hide")

      }
    }

    if (this.maskObj.isActive == true) {
      this.maskObj.isActive = true
      this.isActiveForm.get('reason').clearValidators();
      this.isActiveForm.get('reason').updateValueAndValidity();

      $("#userModal").modal("hide")
    }

    if (this.maskObj.isActive == false) {
      this.isActiveForm.get('reason').setValidators(Validators.required)
      this.isActiveForm.get('reason').updateValueAndValidity();

      if (this.isActiveForm.invalid) {
        this.isActiveForm.markAllAsTouched()
        $("#userModal").modal("show")

        return;
      }
      else {
        this.maskObj.isActive = false
        $("#userModal").modal("hide")

      }

    }
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
      // this.licenseNumberError=false;
      // this.appService.numberfield(length,limitTo);
      return;
    }
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}
