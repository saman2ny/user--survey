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
  selector: 'app-system-alerts',
  templateUrl: './system-alerts.component.html',
  styleUrls: ['./system-alerts.component.css']
})
export class SystemAlertsComponent implements OnInit {
  isSystemForm: FormGroup
  sysObj: any = {}
  parameterDetails: any = [];
  edit: any;
  filtersLoaded: Promise<boolean>;
  role: any;
  user: any = {};
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    
  }
  listOperator: any = [];
  listMainOperator: any = []
  isSelectedUser: boolean = true;
  isSelectedDays: boolean  = true;

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location) {
    this.role = this.common.getRole();

    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.user = this.common.getUser();
    this.reqObj.branchId = this.user.data["branchId"]
    // this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;



  }

  ngOnInit(): void {

    this.isSystemForm = this.formBuilder.group({
      componentDown: [''],
      creditNeeded: [''],
      passExpiry: [''],
      userId: [''],
      days: ['']
    })




    
    this.apiService.post(this.constantsService.listOperator, this.reqObj).subscribe((succ: any) => {

      if (succ.code == 200) {

        this.listMainOperator = succ.data
        // this.listOperator = Object.assign(this.listMainOperator, {})
        this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data

        this.pureDefault()
      }
    }, err => {
      this.common.hideLoading()




      

    })


  }

    

pureDefault(){
  this.apiService.post(this.constantsService.getSysParamsForCompanyId, {}).subscribe((succ: any) => {

console.log(this.listMainOperator, "succ.data")





    
    if (!_.isEmpty(succ.data)) {  
      
    this.parameterDetails = succ.data.systemParameters;
    for(let i =0; i < this.parameterDetails.length; i++){
      if(this.parameterDetails[i].propertyId  === 33){
        this.parameterDetails[32].propertyId = this.parameterDetails[i].propertyId
        let blean32 = JSON.parse(this.parameterDetails[i].propertyValue)
       
        let final = JSON.parse(blean32[0].componentDown)
        console.log(final, "final")


        if(final === true){
          this.parameterDetails[32].propertyValue = final
          this.firstChange(final)
          let usersBefore = blean32[0].users

          this.parameterDetails[32].opUserId = [];
          for (var ii = 0; ii < usersBefore.length; ii++) {
           for (let j = 0; j < this.listMainOperator.length; j++) {
             var removeSpaces = usersBefore[ii]
             if (removeSpaces == this.listMainOperator[j].opUserId)
    
             this.parameterDetails[32].opUserId.push(this.listMainOperator[j])
           }
         }

        }else{
          this.parameterDetails[32].propertyValue = final

        }

      }
      
      if(this.parameterDetails[i].propertyId  === 34){
        this.parameterDetails[33].propertyId = this.parameterDetails[i].propertyId
        let final = JSON.parse(this.parameterDetails[i].propertyValue)
        this.parameterDetails[33].propertyValue = final
      }
      
      if(this.parameterDetails[i].propertyId  === 35){
        this.parameterDetails[34].propertyId = this.parameterDetails[i].propertyId
        let blean32 = JSON.parse(this.parameterDetails[i].propertyValue)
        let final = JSON.parse(blean32[0].passExpiry)

        if(final === true){
          this.parameterDetails[34].propertyValue = final
          this.secondChange(final)
          let daysBefore = blean32[0].daysBefore
          this.parameterDetails[34].days = daysBefore
        }else{
          this.parameterDetails[34].propertyValue = final

        }


      }
      
            }

            

    console.log(this.parameterDetails, "delay load")
    this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data


    }else
    {


    this.checkDefault()

    }
  });
  
}

  checkDefault(){



    this.apiService.post(this.constantsService.listMasterSystemParameters, {}).subscribe((succ: any) => {
      // this.edit = {}

      // if (_.isEmpty(this.edit)) {

      this.parameterDetails = succ.data;
      this.parameterDetails[32].propertyId = this.parameterDetails[32].id;
      this.parameterDetails[33].propertyId = this.parameterDetails[33].id;
      this.parameterDetails[34].propertyId = this.parameterDetails[34].id;

      this.parameterDetails[32].propertyValue = false
      this.parameterDetails[33].propertyValue = false;
      this.parameterDetails[34].propertyValue = false;

      console.log(this.parameterDetails, "delay load")
      this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data

      // }
    });
    console.log(this.parameterDetails, "short load")


  }

  firstChange($event){
    // console.log($event.target.checked, "chceked")
    let getChhannel = this.parameterDetails[32].propertyValue

    if(this.parameterDetails[32].propertyValue === true){
    
      this.isSelectedUser = false
      this.isSystemForm.get('userId').setValidators(Validators.required)
      this.isSystemForm.get('userId').updateValueAndValidity();
    }else{
 

      this.isSelectedUser = true
      this.isSystemForm.get('userId').clearValidators();
      this.isSystemForm.get('userId').updateValueAndValidity();

    }
  }
  secondChange($event){
    // console.log($event.target.checked, "chceked")
    let getChhannel = this.parameterDetails[34].propertyValue

    if(this.parameterDetails[34].propertyValue === true){

      this.isSelectedDays = false
      this.isSystemForm.get('days').setValidators(Validators.required)
      this.isSystemForm.get('days').updateValueAndValidity();
    }else{
 
      this.isSelectedDays = true
      
      this.isSystemForm.get('days').clearValidators();
      this.isSystemForm.get('days').updateValueAndValidity();

    }
  }
  submitParameter() {


    // this.focusOutFreq()

    if (this.isSystemForm.invalid) {

      this.isSystemForm.markAllAsTouched();
      let target;
      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    else {

      if(this.parameterDetails[32].propertyValue === true || this.parameterDetails[32].propertyValue === false){

        var emptyId = []

        if( typeof (this.parameterDetails[32].opUserId) != "undefined" ){
        for (let z = 0; z < this.parameterDetails[32].opUserId.length; z++) {
          var pushNotId = this.parameterDetails[32].opUserId[z].opUserId
          var pushNotIdFinal = pushNotId
          emptyId.push(pushNotIdFinal)
        }
      }
      else{
        var emptyId = []

      }
        this.parameterDetails[32].opUserId = emptyId
        let obj: any = {"componentDown": JSON.stringify(this.parameterDetails[32].propertyValue), "users": this.parameterDetails[32].opUserId}
        this.parameterDetails[32].propertyValue = JSON.stringify([obj])
        console.log(this.parameterDetails[32], "this.parameterDetails323232")
    

      }else{
        
        // this.parameterDetails[32].propertyValue = JSON.stringify(this.parameterDetails[32].propertyValue)

      }

      
        this.parameterDetails[33].propertyValue = JSON.stringify(this.parameterDetails[33].propertyValue)

      



      if(this.parameterDetails[34].propertyValue === true || this.parameterDetails[34].propertyValue === false){

        // var emptyId = []
        //   var pushNotId = this.parameterDetails[34].days
        //   emptyId.push(pushNotId)
        
        // this.parameterDetails[34] = emptyId
        console.log(this.parameterDetails[34].propertyValue, "this.34 property")
        console.log(this.parameterDetails[34].days, "this.34 days")

        let obj: any = {"passExpiry": JSON.stringify(this.parameterDetails[34].propertyValue), "daysBefore": this.parameterDetails[34].days}
        this.parameterDetails[34].propertyValue = JSON.stringify([obj])
        console.log(this.parameterDetails[34], "this.parameterDetails34")

      }else{


        // this.parameterDetails[34].propertyValue = JSON.stringify(this.parameterDetails[34].propertyValue)

      }

      // this.parameterDetails[32].propertyValue = JSON.stringify(this.parameterDetails[32].propertyValue)
      // this.parameterDetails[33].propertyValue = JSON.stringify(this.parameterDetails[33].propertyValue)
      // this.parameterDetails[34].propertyValue = JSON.stringify(this.parameterDetails[34].propertyValue)

      this.parameterDetails[32].propertyId = this.parameterDetails[32].propertyId
      this.parameterDetails[33].propertyId = this.parameterDetails[33].propertyId
      this.parameterDetails[34].propertyId = this.parameterDetails[34].propertyId

      console.log(this.parameterDetails, "this.parameterDetails")


      let systemParameter = [];
      var output = this.parameterDetails.slice(32, 35)
      systemParameter.push(output);


      let frame = { 'systemParameters': output }


      console.log(frame, "framesss")
      this.isSelectedUser = true
      this.isSelectedDays = true


      this.common.showLoading()
     
      this.apiService.post(this.constantsService.addsystemParameters, frame).subscribe((succ: any) => {

        this.common.hideLoading();
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
                this.ngOnInit()

  
        }
        else {
          this.common.showErrorMessage(succ.message)
          this.common.hideLoading()
                this.ngOnInit()

        }
      },
        err => {
          this.common.hideLoading()
          this.ngOnInit()

        });










    }
  }
  back(){
    
  }
}
