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

@Component({
  selector: 'app-language-master',
  templateUrl: './language-master.component.html',
  styleUrls: ['./language-master.component.css']
})
export class LanguageMasterComponent implements OnInit {
  languageObj: any = {}
  user: any = {};
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "isMainChecker": false,
    "menuId": 0
  }
  role: any;
  listLanguages = [];
  getLAng: any = "";
  pusharray: any[];
  removeId: any = [];
  selectedLanguage: any;
  ssetVaribaleDefault: any = {};

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location) {

    this.user = this.common.getUser();
    this.role = this.common.getRole();
    
    
    // this.reqObj.isMainChecker = this.role.isChecker;
    this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;
  }

  ezhil(index) {
    // $('.st-change').on('click', function() {
      $('.staus-cont').addClass('status-cont-active');

    $('#removeDefault' + index).toggleClass('status-cont-active');


    $('.status-closediv').click(function () {
      $('.staus-cont').addClass('status-cont-active');
    })
  }

  ezhil2(index) {
    // $('.st-change').on('click', function() {
      $('.staus-cont').addClass('status-cont-active');

    $('#addDefault' + index).toggleClass('status-cont-active');
    $('.status-closediv').click(function () {
      $('.staus-cont').addClass('status-cont-active');
    })
  }



  ngOnInit() {
    myMethod();

    // alert("4")

    this.apiService.post(this.constantsService.getLanguages, {}).subscribe((succ: any) => {
      this.listLanguages = succ.data;
      



    }, err => {
      
    })

  }

  getSelected($event) {
    this.getLAng = $event.target.value
    
    

  }

  addActiveLanguage(lang) {

    
    


    const langList: any = this.listLanguages;
    let obj;
    for (var i = 0; i < langList.length; i++) {
      if (this.getLAng == langList[i].langId) {
        
        langList[i].active = 1
        
        obj = langList[i]

      }
    }
    
    this.common.showLoading();
    this.apiService.post(this.constantsService.updateLanguage, obj).subscribe((succ: any) => {
      // this.common.showSuccessMessage(succ.message)
      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message)
      } else {
        this.common.showErrorMessage(succ.message)

      }
      
    }, err => {
      this.common.hideLoading();

      
    })

  }

  openModal(data) {
    
    this.selectedLanguage = data
    $("#remove").modal("show")

  }

  openModalDefaultLanguage(data){
    
    this.selectedLanguage = data
    $("#changeToSetAsDefault").modal("show")
  }
  removee() {





    this.apiService.post(this.constantsService.getLanguages, {}).subscribe((succ: any) => {
      var ezhilPro = succ.data;
      



      let obj;
      let data = this.selectedLanguage;

      for (var i = 0; i < ezhilPro.length; i++) {
        if (1 == ezhilPro[i].active && 1 == ezhilPro[i].isDefault) {

          obj = ezhilPro[i]

        }

      }

     

      if (obj['langId'] == data['langId']) {
        this.common.showErrorMessage("You cannot remove default language")

      }
      else {
        data.isDefault = 0
        data.active = 0
        this.apiService.post(this.constantsService.updateLanguage, data).subscribe((succ: any) => {
          this.common.hideLoading();
          

          if (succ.code == 200) {
            this.common.showSuccessMessage("Language removed successfully");
            this.ngOnInit();
            $("#remove").modal("hide")

          } else {
            this.common.showErrorMessage(succ.message)

          }

        }, err => {
          this.common.hideLoading();

          
        })
      }








    }, err => {
      
    })



  }
  cancel() {
    $("#remove").modal("hide")
    $("#changeToSetAsDefault").modal("hide")
  }
  RemovedefaultLanguage(data) {

   

    this.common.showLoading();
    // data.isDefault = 0
    var defaultChecker = data
    this.checkValues(defaultChecker);


  }

  checkValues(defaultChecker) {

    this.common.hideLoading()
    this.apiService.post(this.constantsService.getLanguages, {}).subscribe((succ: any) => {
      var ezhilPro = succ.data;
      

      if (ezhilPro.some(person => person.isDefault === 1 && person.active === 1)) {

        this.common.showErrorMessage("Minimum one language should be default")
        this.ngOnInit()
        return;

      } else {


        // alert("Object found inside the array.");

        defaultChecker.isDefault = 0
        this.apiService.post(this.constantsService.updateLanguage, defaultChecker).subscribe((succ: any) => {
          this.common.hideLoading();
          

          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.ngOnInit()


          } else {
            this.common.showErrorMessage(succ.message)

          }

        }, err => {
          this.common.hideLoading();

          
        })
      }





    }, err => {
      
    })



  }


  changeToSetAsDefault(){


    this.apiService.post(this.constantsService.getLanguages, {}).subscribe((succ: any) => {
      var ezhilPro = succ.data;
      

      if (ezhilPro.some(person => person.isDefault === 1 && person.active === 1)) {
        // alert("already there so be changed");
        let obj;
        for (var i = 0; i < ezhilPro.length; i++) {
          if (1 == ezhilPro[i].isDefault && 1 == ezhilPro[i].active) {
            
            ezhilPro[i].active = 1
            ezhilPro[i].isDefault = 0
            
            obj = ezhilPro[i]

          }
        }

        this.apiService.post(this.constantsService.updateLanguage, obj).subscribe((succ: any) => {
          this.common.hideLoading();
          

          if (succ.code == 200) {
            // this.common.showSuccessMessage(succ.message);
            $("#changeToSetAsDefault").modal("hide")

            this.changeRemainingDefualt(this.selectedLanguage);
            // this.ngOnInit();


          } else {
            this.common.showErrorMessage(succ.message)

          }

        }, err => {
          this.common.hideLoading();

          
        })



      }
      else {
        this.common.showErrorMessage("Sélection multiple non autorisée")
        this.ngOnInit()
        return;
      }







    }, err => {
      
    })


  }

  defaultLanguage(data) {
    this.apiService.post(this.constantsService.getLanguages, {}).subscribe((succ: any) => {
      var ezhilPro = succ.data;
      

      if (ezhilPro.some(person => person.isDefault === 1 && person.active === 1)) {
        // alert("already there so be changed");
        let obj;
        for (var i = 0; i < ezhilPro.length; i++) {
          if (1 == ezhilPro[i].isDefault && 1 == ezhilPro[i].active) {
            
            ezhilPro[i].active = 1
            ezhilPro[i].isDefault = 0
            
            obj = ezhilPro[i]

          }
        }

        this.apiService.post(this.constantsService.updateLanguage, obj).subscribe((succ: any) => {
          this.common.hideLoading();
          

          if (succ.code == 200) {
            // this.common.showSuccessMessage(succ.message);
            this.changeRemainingDefualt(data);
            // this.ngOnInit();


          } else {
            this.common.showErrorMessage(succ.message)

          }

        }, err => {
          this.common.hideLoading();

          
        })



      }
      else {
        this.common.showErrorMessage("Sélection multiple non autorisée")
        this.ngOnInit()
        return;
      }







    }, err => {
      
    })
  }
  changeRemainingDefualt(data) {
    this.common.showLoading()

    data.isDefault = 1
    data.active = 1
    this.apiService.post(this.constantsService.updateLanguage, data).subscribe((succ: any) => {
      this.common.hideLoading();
      

      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        // this.changeRemainingDefualt();
        this.common.hideLoading()
        // this.ngOnDestroy()
        this.languageObj.langy = 'undefined'
        this.getLAng = 'undefined'
        this.ngOnInit();


      } else {
        this.common.showErrorMessage(succ.message)

      }

    }, err => {
      this.common.hideLoading();

      
    })

  }
  getInActiveLanguage() {

    return this.listLanguages.filter((item) => item.active == 0);

  }
  getActiveLanguage() {
    return this.listLanguages.filter((item) => item.active == 1);

  }

  back() {
    // this.location.back();
    this.router.navigateByUrl('/home/dashboard');
  }
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }
}
