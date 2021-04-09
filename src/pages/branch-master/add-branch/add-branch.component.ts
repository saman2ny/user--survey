import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Location } from '@angular/common';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';
import * as _ from 'lodash';
import * as moment from 'moment';

declare var $: any;
declare function myMethod(): any;

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;

  BranchForm: FormGroup
  ContactForm: FormGroup
  branchObj: any = {
    isActiveBranch: true,

  }
  contactObj: any = {
    groups: [],
    isActiveContact: false


  }
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
  listGroups: any;
  TooltipLabel = TooltipLabel;
  separateDialCode = true;
  selectedCorpPreMobileNo = "in"
  RoleDisable: boolean = false;
  listCountryCode = [];
  contactFieldDataModel: any = [];
  showText: boolean = true;
  contactList: any = []
  isContact: boolean = true
  isBranch: boolean = false
  selectedAll2 = true;

  // isActiveBranch :boolean
  // isActiveContact: boolean
  edit: any
  temp: any = {};
  Edit: boolean = false;
  isUniqueEmailId: boolean = true;
  disableContact: boolean
  disableBranch: boolean
  primaryContactPush: any = []
  pluginVali: boolean;
  pluginVali2: boolean;
  pluginVali3: boolean;
  isPrev: boolean = true;
  branchContactId: any;
  BranchFormNew: any = {

  };
  BranchFormOld: any = {

  };
  ContactFormOld: any = {};
  ContactFormNew: any = {};
  changeStatus: any = ""
  role: any;
  user: any;
  isEditUser: any;
  CountryISO: any = [];
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) {
    this.branchObj.isActiveBranch = true
    this.contactObj.isActiveContact = false
    this.CountryISO = this.countryService.getcountryCode();
    this.disableBranch = false
    this.disableContact = true
    this.role = this.common.getRole();
    
    
    // this.isMainChecker = this.common.getMainMenu().isMainChecker;
    this.user = this.common.getUser();
    // this.reqObj.menuId = this.common.getMainMenu().menuId;
    // this.reqObj.isMainChecker = this.role.isChecker;
    // this.reqObj.isMainChecker = this.common.getMainMenu().isMainChecker;

    this.allCounties = this.countryService.allCountries;

    this.apiService.post(this.constantsService.listCountryCode, {}).subscribe((succ: any) => {
      this.listCountryCode = succ.data;
      
    }, err => {
      
    })

  }

  openStatus() {
    this.branchObj.changeStatus = this.branchObj.isActive;
  }
  updateStatus() {
    let url = this.constantsService.updateBranchStatus
    if (!this.changeStatus) {
      this.common.showErrorMessage("Reason is must")
      return;

    }

    let obj: any = {
      id: this.branchObj.branchId,
    }

    if (this.branchObj.changeStatus == true || this.branchObj.changeStatus == 1)
      obj.isActive = 'Active';
    else
      obj.isActive = 'Inactive';



    
    this.common.showLoading()
    this.apiService.post(url, obj).subscribe((succ: any) => {
      
      $('#statusModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {

        this.common.showSuccessMessage(succ.message);

        this.router.navigate(['../home/branch/']);



      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading()
      $('#statusModal').modal('hide')

    });
  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
  back() {
    this.location.back();
  }
  ngOnInit(): void {
  
    myMethod();
    $(".user-arrow").click(function () {
      $(this).parent("th").find(".table-checkfilter").toggleClass("active");
      $('.tablesearch-content').mCustomScrollbar('update');
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

    this.BranchForm = this.formBuilder.group({
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNo: ['', Validators.required],
      fax: [''],
      apiSuite: ['', Validators.required],
      websiteUrl: [''],
      address1: ['', Validators.compose([Validators.required])],
      address2: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      postalCode: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])]
    });
    this.BranchForm.patchValue(this.BranchForm)


    this.ContactForm = this.formBuilder.group({

      contactName: ['', Validators.required],
      designation: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      workPhoneNo: ['', Validators.required],
      fax: [''],
      // apiSuite:['', Validators.compose([Validators.required])],
      // websiteUrl:[''],
      // address1: ['', Validators.compose([Validators.required])],
      // address2: [''],
      // state: ['', Validators.compose([Validators.required])],
      // city: ['', Validators.compose([Validators.required])],
      // postalCode: ['', Validators.compose([Validators.required])],
      // country: ['', Validators.compose([Validators.required])],
      isPrimaryContact: [''],
      opGroup: new FormArray([], this.minSelectedCheckboxes(1)),

      contactList: this.formBuilder.array([]),

    });

    this.ContactForm.patchValue(this.ContactForm)

    // (<FormArray>this.ContactForm.get('contactList')).push(fg);




    let GroupReqObj = {
      "searchText": "Branch",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
    this.apiService.post(this.constantsService.getActiveGroupList, GroupReqObj).subscribe((succ: any) => {
      this.listGroups = succ.data;
      
      this.listGroups.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.ContactForm.controls.opGroup as FormArray).push(control);
      });

    }, err => {
      
    })


    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);






    this.edit = this.common.getEditBranch()
    if (_.isEmpty(this.edit)) {
      
      this.Edit = false
      this.temp.status = 'submit';



    }
    else if (!_.isEmpty(this.edit)) {
      
      // if (this.edit.isActive == 1) {

      this.temp.status = 'edit';
      this.Edit = true
      // this.ContactForm.controls['emailId'].disable()
      this.getBranchDetails();
      // }

    }

  }


  focusOutMobile() {
    this.pluginVali = true
  }


  focusOutMobile2() {
    this.pluginVali2 = true
  }


  focusOutMobile3() {
    this.pluginVali3 = true
  }
  getBranchDetails() {
    this.edit = { "id": this.edit.branchId }
    
    this.apiService.post(this.constantsService.getBranchDetails, this.edit).subscribe((succ: any) => {
      
      // this.common.hideLoading();
      if (succ.code == 200) {



        this.branchObj = succ.data.branch



        this.branchObj.isActiveBranch = true
        this.contactObj.isActiveContact = false

        this.disableBranch = false
        this.disableContact = true

      
        //Mobile No
        var mobile = _.split(this.branchObj.mobileNo, '-', 2);
        this.branchObj.opPreMobileNo = mobile[0]
        this.branchObj.opPostMobileNo = mobile[1]

        var mobile = _.split(this.branchObj.mobileNo, '-', 2);
        this.BranchForm.controls.mobileNo.setValue(mobile[1]);
        let countryCodeee: any = this.allCounties.filter(element => {
          return element[2] == mobile[0];
        });
        countryCodeee = countryCodeee[0]
        this.selectedCorpPreMobileNo = countryCodeee[1];

        var contactArr = succ.data.branchContact;
        
        this.primaryContactPush = []
        for (var i = 0; i < contactArr.length; i++) {
          if (!contactArr) {
            break;
          }

          if (contactArr[i].isPrimaryContact == 1) {
            this.primaryContactPush.push(contactArr[i])
            


            this.contactObj = contactArr[i];

            this.branchObj.groups = contactArr[i].selectedGroups
            
            




            var mobile = _.split(this.primaryContactPush[0].mobileNo, '-', 2);
            this.contactObj.opPreMobileNo = mobile[0]
            this.contactObj.opPostMobileNo = mobile[1]

            var mobile = _.split(this.primaryContactPush[0].mobileNo, '-', 2);
            // this.ContactForm.controls.mobileNo.setValue(mobile[1]);
            this.contactObj.mobileNo = mobile[1];
            let countryCodeee: any = this.allCounties.filter(element => {
              return element[2] == mobile[0];
            });
            countryCodeee = countryCodeee[0]
            this.selectedCorpPreMobileNo = countryCodeee[1];



            //workPhoneNo
            var mobile = _.split(this.primaryContactPush[0].workPhoneNo, '-', 2);
            this.contactObj.opPreMobileNo = mobile[0]
            this.contactObj.opPostMobileNo = mobile[1]

            var mobile = _.split(this.primaryContactPush[0].workPhoneNo, '-', 2);
            this.contactObj.workPhoneNo = mobile[1];
            // this.ContactForm.controls.workPhoneNo.setValue(mobile[1]);
            let countryCodeworkPhoneNo: any = this.allCounties.filter(element => {
              return element[2] == mobile[0];
            });
            countryCodeworkPhoneNo = countryCodeworkPhoneNo[0]
            this.selectedCorpPreMobileNo = countryCodeworkPhoneNo[1];

            // let obj ={"mobileNo":contactArr[i].mobileNo, "workPhoneNo":contactArr[i].workPhoneNo}


            continue;
          }
          this.contactList.push(contactArr[i]);
          this.addContactFormFields(contactArr[i]);
        }




        

        var branchLength = this.contactObj.selectedGroups
        var dupTrash = []
        for (var i = 0; i < branchLength.length; i++) {
          if (!branchLength) {
            break;
          }
          dupTrash.push(parseInt(branchLength[i]))
        }
        

        let ch = dupTrash
        this.contactObj.groups = [];


        


        for (let i = 0; i < this.listGroups.length; i++) {
          for (let j = 0; j < ch.length; j++) {
            if (ch[j] == this.listGroups[i].groupId) {
              this.listGroups[i].isChecked = true;
            }




          }
        }
        this.contactObj.groups = ch;

        setTimeout(() => {


          this.BranchFormOld = this.BranchForm.value

          this.BranchForm.valueChanges.subscribe(value => {
            
            
            this.BranchFormNew = value
          });


          this.ContactFormOld = this.ContactForm.value

          this.ContactForm.valueChanges.subscribe(value => {
            
            
            this.ContactFormNew = value
          });

        }, 2000);








      } else {
        this.common.showErrorMessage(succ.message);
      }
    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)
      
    })



  }


  focusOutEmailId($event) {
    

    const emailId = $event.target.value
    if (!emailId) {
      return;

    }
    if (_.isEmpty(this.edit)) {
      this.isEditUser = "false" //Not Edit


    }
    else {
      this.isEditUser = "true"  // Edit

    }
    this.apiService.post(this.constantsService.validateUserId, { opUserId: emailId , "isEdit":  this.isEditUser, 
    id : this.branchObj.branchId, userGroupName :"Branch"}).subscribe((succ: any) => {
      // this.common.hideLoading();
      
      if (succ.code == 200) {
        this.isUniqueEmailId = true;
        this.ContactForm.get('emailId').setValidators([this.validateUserIdUnique()])
        this.ContactForm.get('emailId').updateValueAndValidity();
      } else {

        this.isUniqueEmailId = false;
        this.ContactForm.get('emailId').setValidators([this.validateUserIdUnique()])
        this.ContactForm.get('emailId').updateValueAndValidity();
      }
    });

  }
  cancel() {
    this.location.back()
  }
  private validateUserIdUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      
      if (this.isUniqueEmailId != false) {
        return null
      }
      return { 'alreadyExist': true }
    }
  }
  updateBranch() {
  

    var opMobileNo = this.BranchForm.get('mobileNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali = false } else { this.pluginVali = true }

    var opMobileNo = this.ContactForm.get('mobileNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali2 = false } else { this.pluginVali2 = true }

    var opMobileNo = this.ContactForm.get('workPhoneNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali3 = false } else { this.pluginVali3 = true }


    if (this.ContactForm.invalid || this.BranchForm.invalid) {
      this.ContactForm.markAllAsTouched();
      this.BranchForm.markAllAsTouched();
      return;
    }
    else {

      if (_.isEmpty(this.BranchFormNew)) {
        this.BranchFormNew = this.BranchFormOld
      }
      else {
        this.BranchFormNew = this.BranchFormNew
      }

 


      if (_.isEmpty(this.ContactFormNew)) {
        this.ContactFormNew = this.ContactFormOld
      }
      else {
        this.ContactFormNew = this.ContactFormNew
      }


      if (_.isEqual(this.BranchFormOld, this.BranchFormNew) && _.isEqual(this.ContactFormOld, this.ContactFormNew)) {
        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        // return;
      } else {

        this.contactObj.mobileNo = this.common.convertCompleteCountryCode(this.contactObj.mobileNo);
        this.contactObj.workPhoneNo = this.common.convertCompleteCountryCode(this.contactObj.workPhoneNo);
        this.branchObj.mobileNo = this.common.convertCompleteCountryCode(this.branchObj.mobileNo);

        let contactArr = []
        this.contactObj.isPrimaryContact = 1
        

        this.contactObj.selectedGroups = this.contactObj.groups



        var ezhil = this.contactObj
        

        contactArr.push(ezhil);


        
        for (var i = 0; i < this.ContactForm.value.contactList.length; i++) {
          let contact = this.ContactForm.value.contactList[i]
          contact.isPrimaryContact = 0;
          contact.mobileNo = this.common.convertCompleteCountryCode(this.ContactForm.value.contactList[i].mobileNo);
          contact.workPhoneNo = this.common.convertCompleteCountryCode(this.ContactForm.value.contactList[i].workPhoneNo);

          



          contactArr.push(contact);
        }

        

        var branch = { "branch": this.branchObj, "branchContact": contactArr }

        





        this.apiService.post(this.constantsService.updateBranches, branch).subscribe((succ: any) => {
          
          this.common.hideLoading();
          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message)

            this.router.navigate(['../home/branch/']);



          } else {
            this.common.showErrorMessage(succ.message);
          }
        }, err => {
          this.common.hideLoading();
          this.common.showErrorMessage(err.message)
          
        })
      }
    }

  }
  toggleVisibility(groups) {

    


    if (!groups.isChecked)
      groups.isChecked = false;
    else
      groups.isChecked = true;

    if (groups.isChecked) {
      this.contactObj.groups.push(groups.groupId)
    } else {
      for (let i = 0; i < this.contactObj.groups.length; i++) {
        if (this.contactObj.groups[i] == groups.groupId) {
          this.contactObj.groups.splice(i, 1);
        }
      }
    }
    this.contactObj.selectedGroups = this.contactObj.groups;
    


  
    // this.branchObj.dayLimt = e.dayLimit
    // this.branchObj.monthLimit = e.monthLimit
    
    // let selectAll = 0;

    // for (var i = 0; i < this.listGroups.length; i++) {

    //   if (this.listGroups[i].theCheckbox)
    //     selectAll++;




    // }

    // if (this.listGroups.length == selectAll) {
    //   this.branchObj.showSelectGroup = true;

    // } else {
    //   this.branchObj.showSelectGroup = false;

    // }
    // this.setCredit();
  }
  setCredit() {
    let daymax = 0, monthmax = 0;
    for (var i = 0; i < this.listGroups.length; i++) {
      if (this.listGroups[i].theCheckbox) {
        daymax = this.listGroups[i].dayLimit > daymax ? this.listGroups[i].dayLimit : daymax
        monthmax = this.listGroups[i].monthLimit > monthmax ? this.listGroups[i].monthLimit : monthmax
      }
    }

    this.branchObj.dayLimit = daymax;
    this.branchObj.monthLimit = monthmax;
  }



  selectAllGroup() {
    this.contactObj.showSelectGroup = !this.contactObj.showSelectGroup
    
    this.contactObj.groups = []

    for (var i = 0; i < this.listGroups.length; i++) {

      if (this.contactObj.showSelectGroup) {
        this.listGroups[i].isChecked = true;
        this.selectedAll2 = false

        this.contactObj.groups.push(this.listGroups[i].groupId)
      } else {
        this.listGroups[i].isChecked = false;
        this.selectedAll2 = true

      }



    }
    this.contactObj.selectedGroups = this.contactObj.groups;
    

  }

  changeField(event, pattern, min, limitTo, id, length) {

    //Setting Limits
    const value = event.target.value.substr(0, limitTo)
    if (event.target.value != value) {
      event.target.value = value;
      return;
    }

    //Patterns
    let patt = new RegExp(pattern);
    event.target.value = event.target.value.replace(patt, '');
    if (event.target.value != value) {
      return;
    }

    if (length >= limitTo) {
      return;
    }
  }


  addContacts() {

    let obj = {
      contactName: "",
      designation: "",
      emailId: "",
      mobileNo: "",
      workPhoneNo: "",
      fax: "",
      branchContactId: ""
      // apiSuite: "",
      // websiteUrl: "",
      // address1: "",
      // address2: "",
      // city: "",
      // state: "",
      // postalCode: "",
      // country: "",

    }

    this.contactList.push(obj);
    this.addContactFormFields(obj);

  }


  addContactFormFields(contact) {
    

    if (contact.mobileNo == "") {
      // alert("empty")
      var mobilePro = ""
    } else {
      //Mobile
      var mobile = _.split(contact.mobileNo, '-', 2);
      this.branchObj.opPreMobileNo = mobile[0]
      this.branchObj.opPostMobileNo = mobile[1]

      var mobile = _.split(contact.mobileNo, '-', 2);
      // this.contactList.controls.mobileNo.setValue(mobile[1]);
      let countryCodemobilePhoneNo: any = this.allCounties.filter(element => {
        return element[2] == mobile[0];
      });
      countryCodemobilePhoneNo = countryCodemobilePhoneNo[0]
      this.selectedCorpPreMobileNo = countryCodemobilePhoneNo[1];
      var mobilePro = mobile[1]
    }

    if (contact.workPhoneNo == "") {
      // alert("empty")
      var workPro = ""
    } else {
      //work Phone
      var work = _.split(contact.workPhoneNo, '-', 2);
      this.branchObj.opPreMobileNo = work[0]
      this.branchObj.opPostMobileNo = work[1]

      var work = _.split(contact.workPhoneNo, '-', 2);
      let countryCodeWorkPhoneNo: any = this.allCounties.filter(element => {
        return element[2] == work[0];
      });
      countryCodeWorkPhoneNo = countryCodeWorkPhoneNo[0]
      this.selectedCorpPreMobileNo = countryCodeWorkPhoneNo[1];

  
      var workPro = work[1]

    }


    let fg = this.formBuilder.group({
      contactName: [contact.contactName, Validators.required],
      designation: [contact.designation, Validators.required],
      emailId: [contact.emailId, [Validators.required, Validators.email]],
      mobileNo: [mobilePro],
      workPhoneNo: [workPro],
      fax: [contact.fax],
      branchContactId: [contact.branchContactId]
      // apiSuite:[contact.apiSuite, Validators.compose([Validators.required])],
      // websiteUrl:[contact.websiteUrl],
      // address1: [contact.address1, Validators.compose([Validators.required])],
      // address2: [contact.address2],
      // state: [contact.state, Validators.compose([Validators.required])],
      // city: [contact.city, Validators.compose([Validators.required])],
      // postalCode: [contact.postalCode, Validators.compose([Validators.required])],
      // country: [contact.country, Validators.compose([Validators.required])],
    });

    (<FormArray>this.ContactForm.get('contactList')).push(fg);





  }


  deleteContact(index: number) {
    


    (<FormArray>this.ContactForm.get('contactList')).setErrors(null);
    (<FormArray>this.ContactForm.get('contactList')).removeAt(index)

  }
  // setPrimary(index: number, event){
  
  //   if ( event.target.checked ) {
  
  //   }else{
  

  //   }

  // }
  // showBranch()
  // {
  //      if (this.BranchForm.invalid) {
  //     this.BranchForm.markAllAsTouched();
  //     return;
  //   }else{

  //     this.isActiveBranch  = true
  //     this.isActiveContact  = false

  //   this.isBranch = false
  //   this.isContact = true
  // }

  // }


  //   showContact()
  // {
  //      if (this.BranchForm.invalid) {
  //       this.BranchForm.markAllAsTouched();
  //     return;


  //     }else{

  //       this.isActiveBranch  = false
  //       this.isActiveContact  = true

  //   this.isBranch = true
  //   this.isContact = false
  // }
  // }
  next() {
    if (this.BranchForm.invalid) {
      this.BranchForm.markAllAsTouched();
      return;
    } else {

      this.branchObj.isActiveBranch = false
      this.contactObj.isActiveContact = true

      this.disableBranch = true
      this.disableContact = false







      this.isPrev = false

      this.scrollToTop()
    }
  }

  prev() {



    this.isPrev = false
    this.branchObj.isActiveBranch = true
    this.contactObj.isActiveContact = false

    this.disableBranch = false
    this.disableContact = true

    this.scrollToTop()

  }

  public scrollToTop() {
    // this.scroll.nativeElement.scrollTop = 0;

    let target;
    target = this.el.nativeElement.querySelector('.inner-head')

    if (target) {
      $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
      target.focus();
    }
    return;

  }
  regBranch() {
    var opMobileNo = this.BranchForm.get('mobileNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali = false } else { this.pluginVali = true }

    var opMobileNo = this.ContactForm.get('mobileNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali2 = false } else { this.pluginVali2 = true }

    var opMobileNo = this.ContactForm.get('workPhoneNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali3 = false } else { this.pluginVali3 = true }

    if (this.ContactForm.invalid) {

      this.ContactForm.markAllAsTouched();
      return;
    }
    else {
      this.common.showLoading()
      let contactArr = []
      this.contactObj.mobileNo = this.common.convertCompleteCountryCode(this.contactObj.mobileNo);
      this.contactObj.workPhoneNo = this.common.convertCompleteCountryCode(this.contactObj.workPhoneNo);
      this.branchObj.mobileNo = this.common.convertCompleteCountryCode(this.branchObj.mobileNo);
      this.contactObj.isPrimaryContact = 1
      this.contactObj.selectedGroups = this.contactObj.selectedGroups

      var ezhil = this.contactObj
      
      contactArr.push(ezhil);


      for (var i = 0; i < this.ContactForm.value.contactList.length; i++) {
        let contact = this.ContactForm.value.contactList[i]
        contact.isPrimaryContact = 0;
        contact.mobileNo = this.common.convertCompleteCountryCode(this.ContactForm.value.contactList[i].mobileNo);
        contact.workPhoneNo = this.common.convertCompleteCountryCode(this.ContactForm.value.contactList[i].workPhoneNo);



        contactArr.push(contact);
      }
      

      var branch = { "branch": this.branchObj, "branchContact": contactArr }

      


      this.apiService.post(this.constantsService.addBranches, branch).subscribe((succ: any) => {
        
        if (succ.code == 200) {
          this.common.hideLoading()
          this.common.showSuccessMessage(succ.message)
          this.router.navigate(['../home/branch/']);
        } else {
          this.common.hideLoading()
          this.common.showErrorMessage(succ.message)
        }


      }, err => {
        this.common.hideLoading()

        
      }
      )

    }
  }

  ngOnDestroy() {

    this.common.setEditBranch({})
  }
  
  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;
  }

  isEditOrUpdate() {
    let ret = false;

    if (!this.Edit) {
      if (this.getAccessRole('isAdd')) {
        ret = true;
      }
    } else if (this.Edit) {
      if (this.getAccessRole('isEdit')) {
        ret = true;
      }
    }
    return ret;
  }
}
