import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryCode } from 'ngx-intl-tel-input/lib/data/country-code';
import { Country } from 'ngx-intl-tel-input/lib/model/country.model';
import { CountryService } from 'src/service/country.service';
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-add-corporate',
  templateUrl: './add-corporate.component.html',
  styleUrls: ['./add-corporate.component.css']
})
export class AddCorporateComponent implements OnInit {
  CorporateForm: FormGroup;
  ContactForm: FormGroup;
  corporateObj: any = {
    userType: 'Corporate'
  }
  user: any = {};
  listGroups: any = [];
  listDepartments = [];
  listBranchs = [];
  theCheckbox: boolean = false;
  selectedAll = false;
  marked = false;
  isFavorite: boolean = false;
  UserId: any;
  sessionId: any;
  selectedRoles: any[];
  companyId: any;
  Edit: boolean = false;
  detailsTabs: boolean = true;
  contactTabs: boolean = false;
  isActive: boolean = true;
  edit: any;
  getCorporateDetails: any;
  corObjselectedGroups: any;
  listCountryCode = [];
  listCity = [];
  corpContObj: any = {

  }
  contactList: any = []
  isUniqueUserId: boolean = true;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedArabEmirates, CountryISO.UnitedStates];
  selectedPhoneCountry = "us"
  selectedMobilePhoneCountry = "us"
  countryCodeData: Country;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public countryService: CountryService,
    public constantsService: ConstantsService) {
    this.allCounties = this.countryService.allCountries;
    this.user = this.common.getUser()

    this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {
      this.listCountryCode = succ.data.countryCodeList;
      this.corpContObj.CorpPreMobileNo = succ.data.countryCodeList[0].countryCode;
      this.corpContObj.CorpPreWorkMobileNo = succ.data.countryCodeList[0].countryCode;

      this.corporateObj.CorpPreMobileNo = succ.data.countryCodeList[0].countryCode;
      console.log(this.listCountryCode, 'succ')
    }, err => {
      console.log(err + "err")
    })


    this.apiService.post(this.constantsService.listCity, {}).subscribe((succ: any) => {
      this.listCity = succ.data.listCity
    }, err => {
      console.log(err + "err")

    })

    this.corpContObj.isActive = 1
  }


  focusOutUserId($event) {
    console.log("fous out email");

    const userId = $event.target.value
    if (!userId) {
      return;

    }
    // console.log(userId);
    this.apiService.post(this.constantsService.validateUserId, { opUserId: userId }).subscribe((succ: any) => {
      // this.common.hideLoading();
      console.log(succ);
      if (succ.code == 200) {
        this.isUniqueUserId = true;
        this.ContactForm.get('email').setValidators([this.validateUserIdUnique()])
        this.ContactForm.get('email').updateValueAndValidity();
      } else {
        let val = this.validateUserIdUnique;
        console.log(val);
        this.isUniqueUserId = false;
        this.ContactForm.get('email').setValidators([this.validateUserIdUnique()])
        this.ContactForm.get('email').updateValueAndValidity();
      }
    });

  }

  private validateUserIdUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      console.log(this.isUniqueUserId)
      if (this.isUniqueUserId != false) {
        return null
      }
      return { 'alreadyExist': true }
    }
  }


  changeField(event, pattern, min, limitTo, id, length) {
    // var k = event.keyCode;
    //Limits
    const value = event.target.value.substr(0, limitTo)

    if (event.target.value != value) {
      event.target.value = value;
      return
    }

    //Pattern
    let patt = new RegExp(pattern);
    event.target.value = event.target.value.replace(patt, '')
    if (event.target.value != value) {
      return;
    }

    //set limit
    if (length >= limitTo) {
      return;
    }
  }






  ngOnInit() {
    myMethod();
    selectSearchMethod();

    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.CorporateForm = this.formBuilder.group({
      corporateName: ['', Validators.compose([Validators.required])],
      corporateCode: ['', Validators.required],


      phone: ['', Validators.required],
      fax: [''],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      // websiteURL: ['', Validators.compose([Validators.required, Validators.pattern('https?://.+')])],
      websiteURL: [''],
      address1: ['', Validators.required],
      // address2: ['', Validators.required],

      city: ['', Validators.required],
      state: ['', Validators.required],


      pinCode: ['', Validators.required],
      country: ['', Validators.required],


    });

    this.ContactForm = this.formBuilder.group({
      CorpPreWorkMobileNo: [''],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      designation: ['', Validators.required],
      // userId: ['', Validators.required],
      contactName: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      // workPhone: [''],
      address: ['', Validators.required],
      fax: [''],
      isPrimaryContact: [''],
      contactList: this.formBuilder.array([])

    });

    this.edit = this.common.getEditCorporate()
    console.log(JSON.stringify(this.edit));

    if (_.isEmpty(this.edit)) {
      this.Edit = false
      this.ContactForm.controls['email'].enable();

    }
    else {


      this.CorporateForm.controls['email'].disable();

      this.CorporateForm.controls['corporateCode'].disable();
      // this.ContactForm.controls['userId'].disable();

      console.log(this.ContactForm.controls['email']);
      this.Edit = true
      console.log(JSON.stringify(this.edit));
      this.common.showLoading();
      this.apiService.post(this.constantsService.corporateInfo, this.edit).subscribe((succ: any) => {
        this.common.hideLoading();
        this.getCorporateDetails = succ.data;

        console.log(this.getCorporateDetails, 'succ')
        if (succ.code == 200) {

          this.corporateObj = succ.data.corporate
          this.corpContObj = succ.data.corporateContact


          var mobile = _.split(succ.data.corporate.phoneNo, '-', 2);

          this.CorporateForm.controls.phone.setValue(mobile[1]);


          let countryCode: any = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });
          countryCode = countryCode[0]
          this.selectedPhoneCountry = countryCode[1];

          mobile = _.split(succ.data.corporateContact.workPhone, '-', 2);
          this.ContactForm.controls.mobilePhone.setValue(mobile[1]);
          countryCode = this.allCounties.filter(element => {
            return element[2] == mobile[0];
          });
          countryCode = countryCode[0]
          this.selectedMobilePhoneCountry = countryCode[1];



          this.corporateObj.email = this.corporateObj.emailId;
          this.corporateObj.websiteURL = this.corporateObj.websiteUrl;


        } else {
          this.common.showErrorMessage(succ.message)
        }

      }, err => {
        console.log(err + "err")
      })

    }

  }
  setCountryCode(dialCode) {
    let country;
    for (let i = 0; i < this.allCounties.length; i++) {
      let indCountry = this.allCounties[i]
      if (indCountry[2] == dialCode) {
        country = this.allCounties[i];
      }
    }
    console.log(country);
    return country;

  }
  changeCountry(event) {
    console.log(event);
    this.corporateObj.opPostMobileNo = "87845"
  }

  contactsTab() {

    if (this.detailsTab) {
      if (this.CorporateForm.invalid) {
        return;
      }
    }

    this.detailsTabs = false
    this.contactTabs = true
  }

  detailsTab() {
    this.detailsTabs = true
    this.contactTabs = false
  }

  previous() {
    this.contactTabs = false;
    this.detailsTabs = true
  }

  // detailsSubmit() {
  //   console.log(this.CorporateForm);
  //   if (this.CorporateForm.invalid) {
  //     // this.detailsTabs = false;
  //     this.CorporateForm.markAllAsTouched();
  //     let target;

  //     target = this.el.nativeElement.querySelector('.ng-invalid')

  //     if (target) {
  //       $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
  //       target.focus();
  //     }
  //     return;
  //   }
  //   else {
  //     this.detailsTabs = false;
  //     this.contactTabs = true;
  //     return;
  //   }
  // }


  back() {
    this.router.navigate(['../home/corporate-master']);
  }

  cancel() {
    this.router.navigate(['../home/corporate-master']);

  }




  CorpSubmit(data?) {


    console.log(this.ContactForm);
    console.log(this.CorporateForm);
    if (this.ContactForm.invalid || this.CorporateForm.invalid) {
      // this.detailsTabs = false;
      this.ContactForm.markAllAsTouched();
      this.CorporateForm.markAllAsTouched();
      let target;

      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }
      return;
    }
    console.log(this);
    var geer = this.corpContObj.contactName
    // this.compObj.theme = "Blue"
    console.log(geer + "erersre");
    console.log(this.corporateObj);

    // var CompleteMobileNumberRough = "";
    // if (this.corporateObj.CorpPreMobileNo)
    //   CompleteMobileNumberRough = _.concat(this.corporateObj.CorpPreMobileNo + "-" + this.corporateObj.phone);
    // else
    //   CompleteMobileNumberRough = this.corporateObj.phone
    // var CompleteMobileNumber = CompleteMobileNumberRough.toString();

    // this.corporateObj.phone = CompleteMobileNumber;
    this.corporateObj.phone = this.common.convertCompleteCountryCode(this.corporateObj.opPostMobileNo)
    this.corporateObj.phoneNo = this.common.convertCompleteCountryCode(this.corporateObj.opPostMobileNo)



    // var CompleteMobileNumberRough = "";
    // if (this.corpContObj.CorpPreMobileNo)
    //   CompleteMobileNumberRough = _.concat(this.corpContObj.CorpPreMobileNo + "-" + this.corpContObj.mobilePhone);
    // else
    //   CompleteMobileNumberRough = this.corpContObj.phone
    // var CompleteMobileNumber = CompleteMobileNumberRough.toString();
    // this.corpContObj.mobilePhone = CompleteMobileNumber;

    // if (this.corpContObj.CorpPreWorkMobileNo)
    //   CompleteMobileNumberRough = _.concat(this.corpContObj.CorpPreWorkMobileNo + "-" + this.corpContObj.workPhone);
    // else
    //   CompleteMobileNumberRough = this.corpContObj.phone
    // var CompleteMobileNumber = CompleteMobileNumberRough.toString();
    // this.corpContObj.workPhone = CompleteMobileNumber;
    this.corpContObj.workPhone = this.common.convertCompleteCountryCode(this.corpContObj.opPostMobileNo)

    let staticContact: any = {};
    this.corpContObj.userId = this.corpContObj.email;

    
    staticContact.corporate = this.corporateObj;
    staticContact.corporateContact = this.corpContObj;
    console.log(staticContact)
    // return;

    let url = ""
    if (data == 'submit') {
      this.corporateObj.phoneNo = this.corporateObj.phone;
      this.corporateObj.emailId = this.corporateObj.email;
      this.corporateObj.websiteUrl = this.corporateObj.websiteURL;

      url = this.constantsService.addCorporate
    } else {
      url = this.constantsService.updateCorporate

    }
    this.common.showLoading();
    this.apiService.post(url, staticContact).subscribe((succ: any) => {
      console.log(succ);
      this.common.hideLoading()


      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);


        this.router.navigate(['../home/corporate-master']);
      }
      else {
        this.common.showErrorMessage(succ.message)

      }

    }, err => {
      this.common.hideLoading()

    });


  }

}

