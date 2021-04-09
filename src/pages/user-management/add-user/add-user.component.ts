import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import * as _ from 'lodash';
import { spaceValidator } from 'src/service/utils';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {


  OperatorForm: FormGroup;
  ActiveForm: FormGroup;
  approve: boolean;
  maxIncidentReasonLength: number = 50;

  user: any = {};
  keysInB: any = {}
  listGroups: any = [];
  listDepartments = [];
  listBranchs = [];
  listCompany = [];
  setPush = []
  theCheckbox = false;
  selectedAll = false;
  selectedAll2 = true;
  marked = false;
  isFavorite: boolean = false;
  UserId: any;
  sessionId: any;
  selectedRoles: any[];
  companyId: any;
  Edit: boolean = false;

  operatorObj: any = {
    selectedGroups: [],
    opStatus: "Active",
    showSelectedGroup: true,
    dayLimit: 0,
    monthLimit: 0,
    groups: []

  };
  edit: any;
  getOperatorDetails: any;
  EditoperatorObj: any;
  operatorObjselectedGroups: any;
  role: any;
  listCountryCode: any;
  isApprove: boolean;
  errReasonMsg: boolean;
  RoleDisable: boolean = false;
  isMainChecker: any;
  isUniqueUserId: boolean = true;
  operatorStatus: any = []

  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];

  selectedCorpPreMobileNo = "in"
  operatorObjs: any = {

  }
  firstName: any;
  lastName: any;
  showNames: boolean = false
  showAdd: boolean = true
  defaultTrue: boolean = false
  temp: any = {

  };
  UserTopForm: FormGroup;
  redColor = {

  }

  newvalue = {
    "opFirstName": '',
    "opLastName": '',
    "opEmailId": '',
    "opMobileNo": '',
    "opDesignation": '',
    "departmentId": '',
    "branchId": '',
    "selectedGroups": '',
    "opStatus": '',
    'companyId': ''

  }
  oldvalue = {
    "opFirstName": '',
    "opLastName": '',
    "opEmailId": '',
    "opMobileNo": '',
    "opDesignation": '',
    "departmentId": '',
    "branchId": '',
    "selectedGroups": '',
    "opStatus": '',
    'companyId': ''
  }
  opFirstName: boolean;
  opLastName: boolean;
  opEmailId: boolean;
  opMobileNo: boolean;
  opDesignation: boolean;
  departmentId: boolean;
  branchId: boolean;
  selectedGroups: boolean;
  opStatus: boolean;
  companyIde: boolean = false;
  listOperator: any = [];
  reqObj: any = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,
    "statusFilter": "6",
    "filterStatus": "Pending",
    "stat": {},
    "isMainChecker": false,
    "menuId": 0,
  }
  selectedUser: any = {};
  pluginVali: boolean;
  superUser: boolean = true
  companyUser: boolean = true
  branchUser: boolean = true
  companyIdShow: boolean = true
  branchIdShow: boolean = true
  listBrachsDup: any;
  reference: any;
  hasChanges: boolean;
  operatorObjDup: any = {

  };
  active: boolean = true;
  OperatorFormNew: any = {};
  OperatorFormOld: any = {};
  ActiveFormOld: any = {};
  ActiveFormNew: any = {};
  UserTopFormOld: any = {};
  UserTopFormNew: any = {};
  GroupReqObj: any;
  frameLDAP: any;
  CountryISO: any = [];


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, public countryService: CountryService) {
    this.allCounties = this.countryService.allCountries;
    this.CountryISO = this.countryService.getcountryCode();
    console.log(this.CountryISO)
    this.user = this.common.getUser();
    let details = this.user.data["userGroupName"]
    this.operatorObj.companyIdLoad = this.user["companyId"]

    if (details === "Super Admin") {
      this.reqObj.superAdmin = 0
      this.superUser = true
      this.companyUser = true
      this.branchUser = true
      this.detailsList()
    }
    if (details === "Company") {
      this.reqObj.CompanyAdmin = 1
      this.superUser = false
      this.companyUser = true
      this.branchUser = true
      this.companyDetails()
    }

    if (details === "Branch") {
      this.reqObj.BranchAdmin = 2
      this.superUser = false
      this.companyUser = false
      this.branchUser = true
    }
    


    this.role = this.common.getRole();

    
    this.reqObj.isMainChecker = this.role.isChecker;
    this.isMainChecker = this.common.getMainMenu().isMainChecker;
  }
  companyDetails() {

    var setObj = {
      'companyId': this.operatorObj.companyIdLoad
    }
    // ListBranch 
    this.apiService.post(this.constantsService.listBranchDup, setObj).subscribe((succ: any) => {
      this.listBranchs = succ.data;
      this.operatorObj.branch = this.listBranchs[0];
      this.operatorObj.branchDup = this.listBranchs[0];
      
    }, err => {
      
    })



    // ListDepartment
    this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
      this.listDepartments = succ.data;
      this.operatorObj.department = this.listDepartments[0];

      
    }, err => {
      
    })
    this.common.hideLoading()
    this.onLoadChangeRoles()



  }
  detailsList() {
    this.common.showLoading()



    if (this.reqObj.validity === 2 && this.reqObj.superAdmin === 0) {
      this.operatorObj.companyIdLoad = 0
    }
    else {
      // ListCompany
      this.apiService.post(this.constantsService.listCompanyForAddUsers, {}).subscribe((succ: any) => {
        this.listCompany = succ.data;
        this.operatorObj.company = this.listCompany[0];
        this.operatorObj.OnloadCom = this.listCompany[0].companyId;
        this.operatorObj.companyIdLoad = this.listCompany[0].companyId;
        
      }, err => {
        
      })

      setTimeout(() => {
        this.onLoadChangeRoles()

        var setObj = {
          'companyId': this.operatorObj.OnloadCom
        }
        // ListBranch 
        this.apiService.post(this.constantsService.listBranchDup, setObj).subscribe((succ: any) => {
          this.listBranchs = succ.data;
          this.operatorObj.branch = this.listBranchs[0];
          this.operatorObj.branchDup = this.listBranchs[0];
          
        }, err => {
          
        })

      }, 5000);




      // ListDepartment
      this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
        this.listDepartments = succ.data;
      
        this.operatorObj.department = this.listDepartments[0];

        
      }, err => {
        
      })
      this.common.hideLoading()


      this.operatorObj.companyIdLoad = this.operatorObj.OnloadCom
      

      this.onLoadChangeRoles()

    }



  }
  showCompanyDrop() {
    
    this.reqObj.searchText = "Company"

    this.reqObj.validity = 1
    
    this.branchIdShow = true
    if (this.reqObj.superAdmin == 0) {
      this.companyIdShow = false
      this.detailsList()


    } else {
      this.companyIdShow = true
      this.companyDetails()
    }



  }
  showSuperDrop() {
    this.reqObj.searchText = "Super Admin"

    this.common.showLoading()
    this.operatorObj.companyIdLoad = 0
    this.onLoadChangeRoles()

    this.operatorObj.company = undefined
    this.operatorObj.branch = undefined
    this.reqObj.validity = 2


    this.companyIdShow = true;
    this.branchIdShow = true
    this.common.hideLoading()

  }
  showBranchDrop() {

    this.reqObj.searchText  = "Branch"

    this.reqObj.validity = 3
    if (this.reqObj.BranchAdmin == 2) {
      this.branchIdShow = true

    } else {
      this.branchIdShow = false

    }

    if (this.reqObj.superAdmin == 0) {
      this.companyIdShow = false
      this.branchIdShow = false
      this.detailsList()


    } else {
      this.companyIdShow = true
      this.companyDetails()

    }
    



  }



  onLoadChangeRoles() {

    this.GroupReqObj = {
      "searchText":  this.reqObj.searchText,
      "noOfRecords": 10,
      "pageIndex": 1,
      "companyId": this.operatorObj.companyIdLoad
    }
    this.apiService.post(this.constantsService.getActiveGroupList, this.GroupReqObj).subscribe((succ: any) => {
      this.listGroups = succ.data;
      this.listGroups.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.OperatorForm.controls.opGroup as FormArray).push(control);
      });

    }, err => {
    })
    function minSelectedCheckboxes(min = 1) {
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

  }


  basedOnCompanyId($event) {

    this.operatorObj.companyIdLoad = $event.value.companyId

    var setObj = {
      'companyId': $event.value.companyId
    }


    // ListBranch 
    this.apiService.post(this.constantsService.listBranchDup, setObj).subscribe((succ: any) => {
      this.listBranchs = succ.data;
    }, err => {
    })


    this.onLoadChangeRoles()
  }
  toggleVisibility(groups) {

    if (!groups.isChecked)
      groups.isChecked = false;
    else
      groups.isChecked = true;

    if (groups.isChecked) {
      this.operatorObj.groups.push(groups.groupId)
    } else {
      for (let i = 0; i < this.operatorObj.groups.length; i++) {
        if (this.operatorObj.groups[i] == groups.groupId) {
          this.operatorObj.groups.splice(i, 1);
        }
      }
    }
    this.operatorObj.selectedGroups = this.operatorObj.groups;

  }
  setCredit() {
    let daymax = 0, monthmax = 0;
    for (var i = 0; i < this.listGroups.length; i++) {
      if (this.listGroups[i].theCheckbox) {
        daymax = this.listGroups[i].dayLimit > daymax ? this.listGroups[i].dayLimit : daymax
        monthmax = this.listGroups[i].monthLimit > monthmax ? this.listGroups[i].monthLimit : monthmax
      }
    }
    this.operatorObj.dayLimit = daymax;
    this.operatorObj.monthLimit = monthmax;
  }


  searchModal() {
    this.common.showLoading()
    $("#searchModal").modal('show')

    this.apiService.post(this.constantsService.listAllUserssss, this.reqObj).subscribe((succ: any) => {
      this.common.hideLoading()
      if (succ.code == 200) {
        

        this.listOperator = succ.data
        $('.datatable1').dataTable().fnDestroy();

        setTimeout(() => {
          $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
          });
          this.initDatatable()
          this.common.hideLoading()
        }, 2500);

      }

    }, err => {
      this.common.hideLoading()

    })

  }


  
  initDatatable() {
    var oTable = $(".datatable1").DataTable({
      scrollCollapse: true,
    })
    $('#searchTextId').keyup(function () {
      oTable.search($(this).val()).draw();
    })

  }
  gotoDefaultUser(user) {
    if (user.status == "N") {
      user.status = "N"
      
      this.common.setEditOperator(user)
      $("#searchModal").modal('hide')

      this.ngOnInit()
    }

    if (user.status == "Y") {
      user.status = "Y"
      this.common.setEditOperator(user)
      $("#searchModal").modal('hide')

      this.ngOnInit()

    }
  }

  selectAllGroup() {
    this.operatorObj.showSelectGroup = !this.operatorObj.showSelectGroup
    this.operatorObj.groups = []

    for (var i = 0; i < this.listGroups.length; i++) {

      if (this.operatorObj.showSelectGroup) {
        this.listGroups[i].isChecked = true;
        this.selectedAll2 = false
        this.operatorObj.groups.push(this.listGroups[i].groupId)
      } else {
        this.selectedAll2 = true
        this.listGroups[i].isChecked = false;
      }



    }
    this.operatorObj.selectedGroups = this.operatorObj.groups;
    

  }


  selectAll(e) {
    

    for (var i = 0; i < this.listGroups.length; i++) {

      this.listGroups[i].theCheckbox = e.target.checked ? true : false;

    }
  }






  focusOutUserId($event) {
    

    const userId = $event.target.value
    if (!userId) {
      return;

    }
    
    this.apiService.post(this.constantsService.validateUserId, { opUserId: userId,  "isEdit":  "false" }).subscribe((succ: any) => {
      
      
      if (succ.code == 200) {
        this.isUniqueUserId = true;
        this.OperatorForm.get('opUserId').setValidators([this.validateUserIdUnique()])
        this.OperatorForm.get('opUserId').updateValueAndValidity();
      } else {
        let val = this.validateUserIdUnique;
        
        this.isUniqueUserId = false;
        this.OperatorForm.get('opUserId').setValidators([this.validateUserIdUnique()])
        this.OperatorForm.get('opUserId').updateValueAndValidity();
      }
    });

  }
  focusOutEmailId($event) {
    

    const userId = $event.target.value
    if (!userId) {
      return;

    }
    
    this.apiService.post(this.constantsService.validateUserId, { opUserId: userId, "isEdit":  "false" }).subscribe((succ: any) => {
      
      
      if (succ.code == 200) {
        this.isUniqueUserId = true;
        this.OperatorForm.get('opEmailId').setValidators([this.validateUserIdUnique()])
        this.OperatorForm.get('opEmailId').updateValueAndValidity();
      } else {
        let val = this.validateUserIdUnique;
        
        this.isUniqueUserId = false;
        this.OperatorForm.get('opEmailId').setValidators([this.validateUserIdUnique()])
        this.OperatorForm.get('opEmailId').updateValueAndValidity();
      }
    });

  }
  private validateUserIdUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (this.isUniqueUserId != false) {
        return null
      }
      return { 'alreadyExist': true }
    }
  }





  ngOnInit() {
    myMethod();

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);

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
    selectSearchMethod();

    this.OperatorForm = this.formBuilder.group({

      opFirstName: ['', [Validators.required, spaceValidator]],
      opLastName: ['', [Validators.required, spaceValidator]],
      opDesignation: ['', [Validators.required, spaceValidator]],
      opEmailId: ['', [Validators.required, Validators.email]],
      opMobileNo: ['', [Validators.required]],
      opGroup: new FormArray([], minSelectedCheckboxes(1)),
      departmentId: [''],
      branchId: [''],
      userGroupName: ['', Validators.required],
      companyId: [''],
      isLDAP: [''],


      
      dayLimit: [''],
      monthLimit: ['']
    });

    this.OperatorForm.patchValue(this.OperatorForm)

    this.ActiveForm = this.formBuilder.group({
      opStatus: [''],
      reasons: ['']
    })
    this.ActiveForm.patchValue(this.ActiveForm)

    this.UserTopForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
    this.UserTopForm.patchValue(this.UserTopForm)

    this.GroupReqObj = {
      "searchText": this.reqObj.searchText,
      "noOfRecords": 10,
      "pageIndex": 1,
      "companyId": this.operatorObj.companyIdLoad
    }
    this.apiService.post(this.constantsService.getActiveGroupList, this.GroupReqObj).subscribe((succ: any) => {
      this.listGroups = succ.data;
      this.listGroups.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.OperatorForm.controls.opGroup as FormArray).push(control);
      });

    }, err => {
    })
    function minSelectedCheckboxes(min = 1) {
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





    this.edit = this.common.getEditOperator()

    if (_.isEmpty(this.edit) || this.edit.status === "R") {
      
      this.Edit = false
      this.OperatorForm.controls['opEmailId'].enable();
      this.showNames = true
      this.showAdd = false
      this.temp.status = "new";
      this.operatorObj.opStatus = true
      this.ActiveForm.disable()



    } else {
      if (this.edit.status === "Y") { //Edit
        
        this.OperatorForm.controls['opFirstName'].disable();
        this.OperatorForm.controls['opEmailId'].disable();
        this.OperatorForm.controls['userGroupName'].disable();
        this.OperatorForm.controls['branchId'].disable();
        this.OperatorForm.controls['companyId'].disable();
        this.OperatorForm.controls['isLDAP'].disable();


        this.Edit = true;
        this.showNames = false
        this.showAdd = true
        this.common.showLoading();
        
        this.apiService.post(this.constantsService.getOperatorDetails, this.edit).subscribe((succ: any) => {
          this.getOperatorDetails = succ.data;



          if (this.user.data.adminUser) {

            this.RoleDisable = false;

          }
          else if (this.operatorObj.opUserId == this.user.userId) {

            this.RoleDisable = true;
            

            this.OperatorForm.disable();


          }
  
          if (succ.code == 200) {

            this.operatorObj = succ.data
            
            this.operatorObj.opUserId = succ.data.opEmailId
            this.operatorObj.isLDAP = succ.data.isLdapUser
            if(succ.data.isLdapUser === 0){
              this.operatorObj.isLDAP = false
            }else{
              this.operatorObj.isLDAP = true
            }
            this.OperatorForm.controls.opLastName.setValue(succ.data.opLastName);

            this.firstName = succ.data.opFirstName
            this.lastName = succ.data.opLastName
            this.UserTopForm.controls.firstName.setValue(succ.data.opFirstName)
            this.UserTopForm.controls.lastName.setValue(succ.data.opLastName)
    
            this.opStatus = false
            var statusCheck = succ.data.opStatus
            if (statusCheck === "Active") {
              this.operatorObj.opStatus = true
              this.defaultTrue = false
              this.active = true
            }
            if (statusCheck === "Inactive") {
              this.operatorObj.opStatus = false
              this.defaultTrue = true
              this.active = false
            }

            if (succ.data.userGroupName === "Super Admin") {

              this.operatorObj.company = undefined
              this.operatorObj.branch = undefined
              this.companyIdShow = true;
              this.branchIdShow = true
              this.operatorObj.userGroupName = "Super Admin"
            }

            if (succ.data.userGroupName === "Company") {
              this.operatorObj.userGroupName = "Company"

              this.branchIdShow = true
              if (this.reqObj.superAdmin == 0) {
                this.companyIdShow = false

              } else {
                this.companyIdShow = true
              }
            }


            if (succ.data.userGroupName === "Branch") {
              this.operatorObj.userGroupName = "Branch"

              this.branchIdShow = false
              if (this.reqObj.superAdmin == 0) {
                this.companyIdShow = false

              } else {
                this.companyIdShow = true
              }
            }

            var mobile = _.split(this.operatorObj.opMobileNo, '-', 2);
            this.operatorObj.opPreMobileNo = mobile[0]
            this.operatorObj.opPostMobileNo = mobile[1]

            var mobile = _.split(this.operatorObj.opMobileNo, '-', 2);

            this.OperatorForm.controls.opMobileNo.setValue(mobile[1]);



            let ch = succ.data.selectedGroups


            let countryCode: any = this.allCounties.filter(element => {
              return element[2] == mobile[0];
            });
            countryCode = countryCode[0]
            this.selectedCorpPreMobileNo = countryCode[1];


            this.operatorObj.companyId = JSON.stringify(this.operatorObj.companyId)
            


            this.operatorObj.branchId = this.operatorObj.branchId
            


            this.operatorObj.departmentId = this.operatorObj.departmentId
            
            this.common.showLoading()

            setTimeout(() => {






              this.apiService.post(this.constantsService.listCompanyForAddUsers, {}).subscribe((succ: any) => {
                this.listCompany = succ.data;
                this.operatorObj.company = this.listCompany.filter(element => {
                  return element.companyId == this.operatorObj.companyId;
                });
                this.operatorObj.company = this.operatorObj.company[0];

              }, err => {
                
              })


              var setObj = {
                'companyId': this.operatorObj.companyId
              }
              
              this.apiService.post(this.constantsService.listBranchDup, setObj).subscribe((succ: any) => {
                this.listBranchs = succ.data;

                this.operatorObj.branch = this.listBranchs.filter(element => {
                  return element.branchId == this.operatorObj.branchId;
                });
                this.operatorObj.branch = this.operatorObj.branch[0];
                


                
              }, err => {
                
              })







              this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
                this.listDepartments = succ.data;
                this.operatorObj.department = this.listDepartments.filter(element => {
                  return element.departmentId == this.operatorObj.departmentId;
                });
                this.operatorObj.department = this.operatorObj.department[0];
                


                
              }, err => {
                
              })

              this.operatorObj.companyIdLoad = " "
              if(succ.data.adminUser != true && this.user.data["userGroupName"] != "Super Admin"){
                this.operatorObj.companyIdLoad = JSON.parse(this.operatorObj.companyId)
              }else{
                this.operatorObj.companyIdLoad = 0

              }
              this.reqObj.searchText = this.operatorObj.userGroupName

              this.onLoadChangeRoles()



              this.operatorObj.groups = [];

              setTimeout(() => {

                


                
                

                for (let i = 0; i < this.listGroups.length; i++) {
                  for (let j = 0; j < ch.length; j++) {
                    if (ch[j] == this.listGroups[i].groupId)
                      this.listGroups[i].isChecked = true;
                  }
                }
                this.operatorObj.groups = ch;
                this.common.hideLoading()

                setTimeout(() => {


                  this.OperatorFormOld = this.OperatorForm.value

                  this.OperatorForm.valueChanges.subscribe(value => {

                    this.OperatorFormNew = value
                  });

                  this.ActiveFormOld = this.ActiveForm.value

                  this.ActiveForm.valueChanges.subscribe(value => {
            
                    this.ActiveFormNew = value
                  });

                  this.UserTopFormOld = this.UserTopForm.value

                  this.UserTopForm.valueChanges.subscribe(value => {
                 
                    this.UserTopFormNew = value
                  });

                }, 3000);
              }, 4000);


            }, 7000);


            


          }
          else {
            this.common.showErrorMessage(succ.message)
          }

        }, err => {
          
          this.common.showErrorMessage(err.message)

          

        })


      }
      if (this.edit.status === "N") { // Pending For Approval
        
        this.isApprove = true;
        this.temp.status = "new";
        this.OperatorForm.disable();

        this.ActiveForm.disable()
        this.showAdd = true
        this.showNames = true

        this.UserTopForm.disable()
        this.RoleDisable = true;
        this.common.showLoading();
        this.apiService.post(this.constantsService.getApproveData, this.edit).subscribe((succ: any) => {
          
          this.common.hideLoading();
          if (succ.code == 200) {
            let newValue = JSON.parse(succ.data.new_DTLS);
            
            
            let newValue1 = JSON.parse(succ.data.new_DTLS);
            
            let oldValue = JSON.parse(succ.data.modify_DTLS);
            



            let opFirstName = newValue1.opFirstName
            let opFirstNameNo = oldValue.opFirstName
            let f = !_.isEqual(opFirstName, opFirstNameNo);
            
            if (f === true) {
              this.opFirstName = true
              this.newvalue['opFirstName'] = newValue1.opFirstName
              this.oldvalue['opFirstName'] = oldValue.opFirstName
            } else { this.opFirstName = false }


            let opLastName = newValue1.opLastName
            let opLastNameNo = oldValue.opLastName
            let ff = !_.isEqual(opLastName, opLastNameNo);
            if (ff === true) {
              this.opLastName = true
              this.newvalue['opLastName'] = newValue1.opLastName
              this.oldvalue['opLastName'] = oldValue.opLastName
            } else { this.opLastName = false }

            let opEmailId = newValue1.opEmailId
            let opEmailIdNo = oldValue.opEmailId
            let fff = !_.isEqual(opEmailId, opEmailIdNo);
            if (fff === true) {
              this.opEmailId = true
              this.newvalue['opEmailId'] = newValue1.opEmailId
              this.oldvalue['opEmailId'] = oldValue.opEmailId
            } else { this.opEmailId = false }

            let opMobileNo = newValue1.opMobileNo
            let opMobileNoNo = oldValue.opMobileNo
            let ffff = !_.isEqual(opMobileNo, opMobileNoNo);
            if (ffff === true) {
              this.opMobileNo = true
              this.newvalue['opMobileNo'] = newValue1.opMobileNo
              this.oldvalue['opMobileNo'] = oldValue.opMobileNo
            } else { this.opMobileNo = false }

            let opDesignation = newValue1.opDesignation
            let opDesignationNo = oldValue.opDesignation
            let fffff = !_.isEqual(opDesignation, opDesignationNo);
            if (fffff === true) {
              this.opDesignation = true
              this.newvalue['opDesignation'] = newValue1.opDesignation
              this.oldvalue['opDesignation'] = oldValue.opDesignation
            } else { this.opDesignation = false }

            let departmentId = newValue1.departmentId
            let departmentIdNo = oldValue.departmentId
            let ffffff = !_.isEqual(departmentId, departmentIdNo);
            if (ffffff === true) {
              this.departmentId = true

              this.newvalue['departmentId'] = newValue1.departmentId
              this.oldvalue['departmentId'] = oldValue.departmentId
            } else { this.departmentId = false }

            let branchId = newValue1.branchId
            let branchIdNo = oldValue.branchId
            let fffffff = !_.isEqual(branchId, branchIdNo);
            if (fffffff === true) {
              this.branchId = true
              this.newvalue['branchId'] = newValue1.branchId
              this.oldvalue['branchId'] = oldValue.branchId

            } else { this.branchId = false }

            let opStatus = newValue1.opStatus
            let opStatusNo = oldValue.opStatus
            let ffffffff = !_.isEqual(opStatus, opStatusNo);
            if (ffffffff === true) {
              this.opStatus = true
              this.newvalue['opStatus'] = newValue1.opStatus
              this.oldvalue['opStatus'] = oldValue.opStatus
            } else { this.opStatus = false }






            this.operatorObj = newValue
            this.operatorObj.wfId = succ.data.wf_ID
            this.firstName = newValue.opFirstName
            this.lastName = newValue.opLastName


            var statusCheck = newValue.opStatus
            if (statusCheck === "Active") {
              this.operatorObj.opStatus = true
              this.defaultTrue = false

            }
            if (statusCheck === "Inactive") {
              this.operatorObj.opStatus = false
              this.defaultTrue = true

            }





            if (newValue.userGroupName === "Super Admin") {

              this.operatorObj.company = undefined
              this.operatorObj.branch = undefined
              this.companyIdShow = true;
              this.branchIdShow = true
              this.operatorObj.userGroupName = "Super Admin"
            }

            if (newValue.userGroupName === "Company") {
              this.operatorObj.userGroupName = "Company"

              this.branchIdShow = true
              if (this.reqObj.superAdmin == 0) {
                this.companyIdShow = false

              } else {
                this.companyIdShow = true
              }
            }


            if (newValue.userGroupName === "Branch") {
              this.operatorObj.userGroupName = "Branch"

              if (this.reqObj.BranchAdmin == 2) {
                this.branchIdShow = true

              } else {
                this.branchIdShow = false

              }


            }



            var mobile = _.split(this.operatorObj.opMobileNo, '-', 2);
            this.operatorObj.opPreMobileNo = mobile[0]
            this.operatorObj.opPostMobileNo = mobile[1]

            var mobile = _.split(this.operatorObj.opMobileNo, '-', 2);

            this.OperatorForm.controls.opMobileNo.setValue(mobile[1]);



            let ch = newValue.selectedGroups
            let ch2 = JSON.parse(ch)
            


            let countryCode: any = this.allCounties.filter(element => {
              return element[2] == mobile[0];
            });
            countryCode = countryCode[0]
            this.selectedCorpPreMobileNo = countryCode[1];

            if (this.listGroups.length)
              this.operatorObj.companyId = JSON.stringify(this.operatorObj.companyId)
            


            this.operatorObj.branchId = this.operatorObj.branchId
            


            this.operatorObj.departmentId = this.operatorObj.departmentId
            
            this.common.showLoading()

            setTimeout(() => {





              this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
                this.listDepartments = succ.data;
                this.operatorObj.department = this.listDepartments.filter(element => {
                  return element.departmentId == this.operatorObj.departmentId;
                });
                this.operatorObj.department = this.operatorObj.department[0];
                


              
              }, err => {
                
              })

              this.operatorObj.companyIdLoad = this.user["companyId"]

              this.onLoadChangeRoles()

              this.operatorObj.groups = [];

              setTimeout(() => {

                

                for (let i = 0; i < this.listGroups.length; i++) {
                  for (let j = 0; j < ch2.length; j++) {
                    if (ch2[j] == this.listGroups[i].groupId)
                      
                      this.listGroups[i].isChecked = true;
                  }
                }
                this.operatorObj.groups = ch2;
                this.common.hideLoading()

              }, 4000);



            }, 7000);

          } else {
            this.common.showErrorMessage(succ.message);
          }

          
        }, err => {
          this.common.hideLoading();
          this.common.showErrorMessage(err.message)
        })

      }
    }



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
  }




  ngAfterViewInit() {


    setInterval(() => {
      $('.icon-checkout-previous').click(function () {
        $(this).find('.popup-previous').toggleClass('show');
      });



    }, 2000);
  }

  showAprroveorRejecte(data) {
    $('#userModale').modal('show')

    if (data != 'approve') {
      this.approve = false
    } else {
      this.approve = true
    }
  

  }


  sendOver(data) {

    let obj: any = {
      wfId: this.operatorObj.wfId
    }
    if (data != 'approve') {
      if (!this.operatorObj.reason) {
        this.common.showErrorMessage("Reason is Must for Reject");
        return;
      }
      obj.reason = this.operatorObj.reason;

      this.apiService.post(this.constantsService.rejectOperator, obj).subscribe((succ: any) => {
        

        this.common.hideLoading();
        if (succ.code == 200) {

          this.common.showSuccessMessage(succ.message);
          
          $('#userModale').modal('hide')
          this.router.navigate(['/home/operator-management/'])
          
        }
        else {
          this.common.showErrorMessage(succ.message);
        }

      }, err => {
        $('#userModale').modal('hide')
        this.common.hideLoading();
        
      });


    } else {
      obj.isApprove = true;

      this.apiService.post(this.constantsService.approveOperator, obj).subscribe((succ: any) => {
        

        this.common.hideLoading();
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          
          $('#userModale').modal('hide')
          this.router.navigate(['/home/operator-management/'])
          
        }
        else {
          this.common.showErrorMessage(succ.message);
        }

      }, err => {
        $('#userModale').modal('hide')
        this.common.hideLoading();
        
      });
    }
   
  }

  approveField(event, pattern, min, limitTo, id) {
    var k;
    k = event.keyCode;
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

  }

  cancel() {
    this.location.back()
    $("#userModale").modal('hide')

  }


  Update() {
    

    var opMobileNo = this.OperatorForm.get('opMobileNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali = false } else { this.pluginVali = true }
    if (this.OperatorForm.invalid) {
      this.OperatorForm.markAllAsTouched();
      return;
    }
    else {

      if (_.isEmpty(this.OperatorFormNew)) {
        this.OperatorFormNew = this.OperatorFormOld
      }
      else {
        this.OperatorFormNew = this.OperatorFormNew
      }

  


      if (_.isEmpty(this.ActiveFormNew)) {
        this.ActiveFormNew = this.ActiveFormOld
      }
      else {
        this.ActiveFormNew = this.ActiveFormNew
      }

      

      if (_.isEmpty(this.UserTopFormNew)) {
        this.UserTopFormNew = this.UserTopFormOld
      }
      else {
        this.UserTopFormNew = this.UserTopFormNew
      }

  

      if (_.isEqual(this.OperatorFormOld, this.OperatorFormNew) && _.isEqual(this.ActiveFormOld, this.ActiveFormNew)
        && _.isEqual(this.UserTopFormOld, this.UserTopFormNew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      } else {



        this.operatorObj.opMobileNo = this.common.convertCompleteCountryCode(this.operatorObj.opMobileNo)
        this.operatorObj.mobileNumber = this.operatorObj.opMobileNo.replace('-', ''); 

        this.operatorObj.isMainChecker = this.isMainChecker;
        this.operatorObj.selectedGroups = this.operatorObj.groups




        this.operatorObj.departmentId = this.operatorObj.department.departmentId;
        if (this.operatorObj.company === undefined) {
          this.operatorObj.companyId = 0;
          
        } else {
          this.operatorObj.companyId = this.operatorObj.company.companyId;
          
        }

        if (this.operatorObj.branch === undefined) {
          this.operatorObj.branchId = 0;
          
        } else {
          this.operatorObj.branchId = this.operatorObj.branch.branchId;
          
        }


        

        if (this.operatorObjs.firstName === undefined) {
          
          this.operatorObj.opFirstName = this.firstName
        }

        if (this.operatorObjs.firstName != undefined) {
          
          this.operatorObj.opFirstName = this.operatorObjs.firstName
        }

        if (this.operatorObjs.lastName === undefined) {
          
          this.operatorObj.opLastName = this.lastName
        }

        if (this.operatorObjs.lastName != undefined) {
          
          this.operatorObj.opLastName = this.operatorObjs.lastName
        }


        if (this.operatorObj.opStatus == true) {
          this.operatorObj.opStatus = "Active"

        }
        if (this.operatorObj.opStatus == false) {
          this.operatorObj.opStatus = "Inactive"

        }



        

            
      if(this.operatorObj.isLDAP === undefined || this.operatorObj.isLDAP === false){
        this.operatorObj.isLdapUser = 0;
      }else{
        this.operatorObj.isLdapUser = 1;
      }

        this.common.setOperator(this.operatorObj);
        this.common.showLoading()


        this.apiService.post(this.constantsService.editOperator, this.operatorObj).subscribe((succ: any) => {
          
          this.common.hideLoading()
          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            this.router.navigate(['../home/operator-management']);
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



  ngOnDestroy() {

    this.common.setEditOperator({})
  }

  get f() { return this.OperatorForm.controls; }
  back() {
    this.location.back();
  }

  topEdite() {
    this.operatorObjs.firstName = this.firstName
    this.operatorObjs.lastName = this.lastName
  }

  backToList() {
    this.router.navigateByUrl('/home/operator-management')

  }

  ActiveUpdate() {
    
    if (this.operatorObj.opStatus == undefined) {
      this.operatorObj.opStatus = false
      this.ActiveForm.get('reasons').setValidators(Validators.required)
      this.ActiveForm.get('reasons').updateValueAndValidity();
    }
    if (this.operatorObj.opStatus == true) {
      this.operatorObj.opStatus = true
      this.ActiveForm.get('reasons').clearValidators();
      this.ActiveForm.get('reasons').updateValueAndValidity();
    }
    if (this.operatorObj.opStatus == false) {
      this.operatorObj.opStatus = false
      this.ActiveForm.get('reasons').setValidators(Validators.required)
      this.ActiveForm.get('reasons').updateValueAndValidity();
    }
  }

  cancelActive() {
    $("#activeModal").modal('hide')
  }


  CloseModalActive() {
    $("#activeModal").modal('hide');
    this.ActiveForm.get('reasons').clearValidators();
    this.ActiveForm.get('reasons').updateValueAndValidity();

  }
  statusSubmit() {

    if (this.ActiveForm.invalid) {
      this.ActiveForm.markAllAsTouched();
      return;
    }

    else {

      if (_.isEmpty(this.OperatorFormNew)) {
        this.OperatorFormNew = this.OperatorFormOld
      }
      else {
        this.OperatorFormNew = this.OperatorFormNew
      }

     


      if (_.isEmpty(this.ActiveFormNew)) {
        this.ActiveFormNew = this.ActiveFormOld
      }
      else {
        this.ActiveFormNew = this.ActiveFormNew
      }

      if (_.isEmpty(this.UserTopFormNew)) {
        this.UserTopFormNew = this.UserTopFormOld
      }
      else {
        this.UserTopFormNew = this.UserTopFormNew
      }

    

      if (_.isEqual(this.OperatorFormOld, this.OperatorFormNew) && _.isEqual(this.ActiveFormOld, this.ActiveFormNew)
        && _.isEqual(this.UserTopFormOld, this.UserTopFormNew)) {

        let b4Update = this.common.b4Update()
        this.common.showErrorMessage(b4Update)
        this.common.hideLoading()
      } else {



        this.operatorObj.opMobileNo = this.common.convertCompleteCountryCode(this.operatorObj.opMobileNo)
        this.operatorObj.isMainChecker = this.isMainChecker;
        this.operatorObj.selectedGroups = this.operatorObj.groups




        this.operatorObj.departmentId = this.operatorObj.department.departmentId;
        if (this.operatorObj.company === undefined) {
          this.operatorObj.companyId = 0;
          
        } else {
          this.operatorObj.companyId = this.operatorObj.company.companyId;
          
        }

        if (this.operatorObj.branch === undefined) {
          this.operatorObj.branchId = 0;
          
        } else {
          this.operatorObj.branchId = this.operatorObj.branch.branchId;
          
        }


        

        if (this.operatorObjs.firstName === undefined) {
          
          this.operatorObj.opFirstName = this.firstName
        }

        if (this.operatorObjs.firstName != undefined) {
          
          this.operatorObj.opFirstName = this.operatorObjs.firstName
        }

        if (this.operatorObjs.lastName === undefined) {
          
          this.operatorObj.opLastName = this.lastName
        }

        if (this.operatorObjs.lastName != undefined) {
          
          this.operatorObj.opLastName = this.operatorObjs.lastName
        }


        if (this.operatorObj.opStatus == true) {
          this.operatorObj.opStatus = "Active"

        }
        if (this.operatorObj.opStatus == false) {
          this.operatorObj.opStatus = "Inactive"

        }

        this.operatorObj.reason = this.operatorObj.reasons

        this.common.showLoading()
        
        this.common.setOperator(this.operatorObj);

console.log(this.operatorObj)


        this.apiService.post(this.constantsService.editOperator, this.operatorObj).subscribe((succ: any) => {
          
          this.common.hideLoading()
          if (succ.code == 200) {
            this.common.showSuccessMessage(succ.message);
            $("#activeModal").modal('hide')
            this.router.navigateByUrl('/home/operator-management')

          }
          else {
            this.common.showErrorMessage(succ.message)
            this.common.hideLoading()
          }
        });
        return;
      }
    }
  }

  focusOutMobile() {
    this.pluginVali = true
  }
  setdayLimit()
  {
    if (this.operatorObj.dayLimit && !this.operatorObj.monthLimit) {
      
      this.OperatorForm.get('monthLimit').setValidators([Validators.required
      ]);
      this.OperatorForm.get('monthLimit').updateValueAndValidity();
    }
    else {
      
      this.OperatorForm.get('monthLimit').clearValidators();
      this.OperatorForm.get('monthLimit').updateValueAndValidity();
    }
  }
  setmonthLimit()
  {
    if (this.operatorObj.monthLimit && !this.operatorObj.dayLimit ) {
     
      this.OperatorForm.get('dayLimit').setValidators([Validators.required
      ]);
      this.OperatorForm.get('dayLimit').updateValueAndValidity();
    }
    else {
     
      this.OperatorForm.get('dayLimit').clearValidators();
      this.OperatorForm.get('dayLimit').updateValueAndValidity();
    }
  }
  
 
  Save() {
    
    var opMobileNo = this.OperatorForm.get('opMobileNo').value
    if (_.isEmpty(opMobileNo)) { this.pluginVali = false } else { this.pluginVali = true }
    if (this.OperatorForm.invalid) {
      this.OperatorForm.markAllAsTouched();
      return;
    }



    
    this.operatorObj.opMobileNo = this.common.convertCompleteCountryCode(this.operatorObj.opMobileNo)
    this.operatorObj.mobileNumber = this.operatorObj.opMobileNo.replace('-', ''); 

    this.operatorObj.opUserId = this.operatorObj.opEmailId

    this.operatorObj.opStatus = "Active";

    if(this.operatorObj.isLDAP === undefined || this.operatorObj.isLDAP === false){
      this.operatorObj.isLdapUser = 0;
    }else{
      this.operatorObj.isLdapUser = 1;
    }

    this.operatorObj.departmentId = this.operatorObj.department.departmentId;
    if (this.operatorObj.company === undefined) {
      this.operatorObj.companyId = 0;
      
    } else {
      this.operatorObj.companyId = this.operatorObj.company.companyId;
      
    }

    if (this.operatorObj.branch === undefined || this.branchIdShow === true) {
      this.operatorObj.branchId = 0;
      
    } else {
      this.operatorObj.branchId = this.operatorObj.branch.branchId;
      
    }


    this.operatorObj.isMainChecker = this.isMainChecker;

    
    this.common.showLoading()
    this.common.setOperator(this.operatorObj);
    
    
    this.apiService.post(this.constantsService.addOperator, this.operatorObj).subscribe((succ: any) => {
      
      this.common.hideLoading()


      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.router.navigate(['../home/operator-management']);



      }
      else {
        this.common.showErrorMessage(succ.message)

      }

    },
      err => {
        this.common.hideLoading()

      });
    return;
  }


  getAccessRole(role) {
    let access = this.role[role] ? false : true;
    return access;

  }

  changeField(event, pattern, min, limitTo, id, length) {

    var k;
    k = event.keyCode;  

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

  getBranchName(id) {
    if (this.listBranchs.length == 0)
      return;

    let branch = this.listBranchs.filter(
      bran => {
        if (bran.branchId == parseInt(id))
          return bran;
      });
    if (branch.length)
      return branch[0].branchName

  }

  getDepartmentName(id) {
    if (this.listDepartments.length == 0)
      return;
    let department = this.listDepartments.filter(
      depart => {
        if (depart.departmentId == id)
          return depart;
      });
    if (department.length)
      return department[0].departmentName

  }
  isEditOrUpdate() {
    let ret = false;
    if (this.isApprove) {
      if (this.getAccessRole('isChecker')) {
        ret = true;
      }
    }
    else if (!this.Edit) {
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
