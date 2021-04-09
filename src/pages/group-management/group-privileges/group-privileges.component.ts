import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { spaceValidator } from 'src/service/utils';

declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;
@Component({
  selector: 'app-group-privileges',
  templateUrl: './group-privileges.component.html',
  styleUrls: ['./group-privileges.component.css']
})
export class GroupPrivilegesComponent implements OnInit {
  groupReqObj = {
    "searchText": "",
    "noOfRecords": 1000,
    "pageIndex": 1,

  };
  groupPrevilege: any = {
    selectAll: false
  };
  listGroup: any;
  groupForm: FormGroup;
  mainPages: any = [

  ]
  pages: any;
  role: any;
  editData: any = {};
  isEdit: boolean = false;
  groupObj: any = {};
  showAddRole: boolean = true;
  searchRole: any = "";
  changeStatus: any;
  isMainChecker: any;
  nonApproveData: any;
  reason: any;
  errMsg: boolean;
  currentStatus: any;
  user: any;
  userGroup: any;
  userGroupList: any[];
  selectedThreshold: any = {};
  isShortMessageRequired:any=[
    {
      id:"1",
      name:"Yes",

    },
    {
      id:"0",
      name:"No",
    }
  ];
  constructor(private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public formBuilder: FormBuilder, public location: Location) {

    this.role = this.common.getRole();

    this.isMainChecker = this.common.getMainMenu().isMainChecker;
    // this.isMainChecker = 1;



    // this.apiService.post(this.constantsService.listGroup, this.groupReqObj).subscribe((succ: any) => {

    //   this.common.hideLoading();
    //   this.listGroup = succ.data;


    // }, err => {
    //   this.common.hideLoading()
    // }
    // )
    this.groupForm = formBuilder.group({
      groupName: ['', [Validators.required, spaceValidator]],
      groupDesc: ['', [Validators.required, spaceValidator]],
      userGroupName: [''],
      // status: ['', Validators.required],
      dayLimit: [''],
      monthLimit: [''],
      isShortMessageRequired:[''],
      shortMessageLength :[''],
      mainPages: formBuilder.array([])
    });
    if (this.mainPages) {
      this.mainPages.forEach(mainPage => {
        this.addMainPages(mainPage);
      });
    } else {
      this.addMainPages();
    }



    this.user = this.common.getUser()
    this.userGroup = this.user.data["userGroupName"]

    this.groupForm.controls['userGroupName'].setValue(this.userGroup);
    this.groupForm.controls['isShortMessageRequired'].setValue("0");
    if (this.userGroup === "Super Admin") {
      // this.reqObj.superAdmin = 0
      this.userGroupList = [
        {
          id: 1,
          name: "Super Admin",
          value: "Super Admin"
        },
        {
          id: 2,
          name: "Company",
          value: "Company"
        },
        {
          id: 3,
          name: "Branch",
          value: "Branch"
        }
      ]
    
    }
    if (this.userGroup === "Company") {
      this.userGroupList = [

        {
          id: 2,
          name: "Company",
          value: "Company"
        },
        {
          id: 3,
          name: "Branch",
          value: "Branch"
        }
      ]
     
    }

    if (this.userGroup === "Branch") {
      this.userGroupList = [

        {
          id: 3,
          name: "Branch",
          value: "Branch"
        }
      ]
    
    }

  }
  // add group
  showSuperDrop() {
    setTimeout(() => {
      this.getDefaultPages();
    }, 100);

  }
  shortMessageLengthChange() {
   
    console.log(this.groupForm);
    this.groupForm.controls['shortMessageLength'].setValue(0);


  }
  addMainPages(mainPage?: any) {

    let fg = this.formBuilder.group({
      'name': [mainPage.menuLabel],
      'selectAllSubpage': [false],
      'subPages': this.formBuilder.array([]),
    });
    (<FormArray>this.groupForm.get('mainPages')).push(fg);
    let pageIndex = (<FormArray>this.groupForm.get('mainPages')).length - 1;
    if (!mainPage) {
      this.addSubpages(pageIndex);
    }
    else {
      mainPage.subPages.forEach(phone => {
        this.addSubpages(pageIndex, phone);
      });
    }
  }
  addSubpages(pageIndex: number, data?: any) {


    let fg = this.formBuilder.group({
      'name': [data.menuLabel],
      'isView': [data.isView],
      "isAdd": [data.isAdd],
      "isEdit": [data.isEdit],
      "isDelete": [data.isDelete],
      "isChecker": [data.isChecker]
    });
    (<FormArray>(<FormGroup>(<FormArray>this.groupForm.controls['mainPages'])
      .controls[pageIndex]).controls['subPages']).push(fg);

  }
  back() {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    setTimeout(() => {
      this.router.navigate(['../home/group-management']);

    }, 1000);
    // this.location.back();
    // this.router.navigate(['../home/service-management/default-services']);
  }
  showRole() {
    this.showAddRole = true;
    this.groupForm.controls['groupName'].setValue(this.groupObj.groupName);
    this.groupForm.controls['groupDesc'].setValue(this.groupObj.groupDesc);
    this.groupForm.controls['dayLimit'].setValue(this.groupObj.dayLimit);
    this.groupForm.controls['monthLimit'].setValue(this.groupObj.monthLimit);
    this.groupForm.controls['userGroupName'].setValue(this.groupObj.userGroupName);
    this.groupForm.controls['shortMessageLength'].setValue(this.groupObj.shortMessageLength);

    this.groupForm.controls['isShortMessageRequired'].setValue(this.groupObj.isShortMessageRequired.toString());
    // this.groupForm.setValue(this.groupObj);

  }
  cancelRoleEdit() {
    this.showAddRole = false;

  }
  openStatus() {
    this.groupObj.changeStatus = this.groupObj.status;
  }
  ngOnInit() {

    myMethod();
    selectSearchMethod();
    this.editData = this.common.getEditGroup()

    if (_.isEmpty(this.editData)) {
      this.isEdit = false;
      $(".show-editdiv").addClass('active');
      $(".edit-toggle").addClass('current');
      $('.show-content').addClass('active');
      this.showAddRole = true;
      this.groupObj = Object.assign({}, this.editData);
      // this.getPages(this.groupObj.groupId)
      this.getDefaultPages();
      this.currentStatus = "New"
    } else {


      this.currentStatus = this.editData.statusName

      if (this.editData.statusName == "Draft" || this.editData.statusName == "Pending For Approval") {

        let grou = JSON.parse(this.editData.groupNewDetails);
        console.log(grou);
        this.groupObj = Object.assign({}, grou);
        this.groupObj.status = parseInt(this.groupObj.status);


        this.groupForm.controls['groupName'].setValue(grou.role.groupName);
        this.groupForm.controls['groupDesc'].setValue(grou.role.groupDesc);
        this.groupForm.controls['dayLimit'].setValue(grou.role.dayLimit);
        this.groupForm.controls['monthLimit'].setValue(grou.role.monthLimit);
        this.groupForm.controls['userGroupName'].setValue(grou.role.userGroupName);
        this.groupForm.controls['shortMessageLength'].setValue(grou.role.shortMessageLength);

        this.groupForm.controls['isShortMessageRequired'].setValue(grou.role.isShortMessageRequired.toString());
        this.nonApproveData = grou;

        if (this.editData.statusName == "Pending For Approval" && (this.editData.TXN_SUB_CODE == 'Modify' || this.editData.TXN_SUB_CODE == 'Delete')) {
          this.getPages(grou.role.groupId);

        } else {
          this.getDefaultPages();
        }


      } else {
        this.isEdit = true;
        this.showAddRole = false;
        this.groupObj = Object.assign({}, this.editData);
        this.groupObj.status = parseInt(this.groupObj.status);
        this.groupForm.reset();
        this.getPages(this.groupObj.groupId)

      }
    }
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      });
    }, 3000);
  }
  getDefaultPages() {

    let control: any = (this.groupForm.controls['mainPages'])
    control.clear();
    let seText = this.groupForm.value.userGroupName || this.groupObj.userGroupName;
    this.common.showLoading();
    this.apiService.post(this.constantsService.getDefaultPrivilege, { "searchText": seText }).subscribe((succ: any) => {
      console.log(succ)

      this.common.hideLoading();
      let oldPages;
      if (this.pages) {
        oldPages = this.pages;

      }
      this.pages = succ.data;
      let roles = succ.data;

      let mainPages: any = [];
      let subPages = [];
      for (let i = 0; i < roles.length; i++) {

        if (this.editData) {
          if (this.editData.statusName == "Draft" || this.editData.statusName == "Pending For Approval") {

            roles[i].isAdd = this.nonApproveData.rolePrivilege[i].isAdd
            roles[i].isChecker = this.nonApproveData.rolePrivilege[i].isChecker
            roles[i].isDelete = this.nonApproveData.rolePrivilege[i].isDelete
            roles[i].isEdit = this.nonApproveData.rolePrivilege[i].isEdit
            roles[i].isView = this.nonApproveData.rolePrivilege[i].isView
          }

        }

        if (!roles[i].isSubMenu) {
          // if (roles[i].menuLabel != "Reports")
            mainPages.push(roles[i])
        }
        else {
          if (roles[i].menuLabel == "Approve Customer Request"){

          }else{
            subPages.push(roles[i])
          }
          
          // subPages.push(roles[i])
        }

      }
      if (oldPages)
        for (let i = 0; i < roles.length; i++) {

          for (let j = 0; j < oldPages.length; j++) {


            if (oldPages[j].menuId == roles[i].menuId)
              roles[i].id = oldPages[j].id;
            roles[i].groupId = oldPages[j].groupId;
            roles[i].isActive = oldPages[j].isActive;
          }
        }
      for (let i = 0; i < mainPages.length; i++) {

        mainPages[i].subPages = [];
        for (let j = 0; j < subPages.length; j++) {
          if (mainPages[i].menuId == subPages[j].refMenuId) {
            mainPages[i].subPages.push(subPages[j])
          }
        }
        this.changeCheckBox(1, {}, mainPages[i]);
 
      }
      this.mainPages = mainPages;
      if (this.mainPages) {
        this.mainPages.forEach(mainPage => {
          this.addMainPages(mainPage);
        });
      }
      // this.listGroup = succ.data;
      setTimeout(() => {

        this.checkSelectAllPage();
      }, 2000);

    }, err => {
      this.common.hideLoading()


    }
    )
  }
  getPages(group) {


    this.common.showLoading();
    this.apiService.post(this.constantsService.getGroupPrivilege, { "id": group }).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading()
      this.pages = succ.data;
      let roles = succ.data;

      let mainPages: any = [];
      let subPages = [];
      for (let i = 0; i < roles.length; i++) {

        if (!roles[i].isSubMenu) {
          // if (roles[i].menuLabel == "Reports"){

          // }
           if (roles[i].menuLabel == "Approve Customer Request"){

          }else{
            mainPages.push(roles[i])
          }
           
        }
        else {
          if (roles[i].menuLabel == "Approve Customer Request"){

          }else{
            subPages.push(roles[i])
          }
          
        }
      }
      for (let i = 0; i < mainPages.length; i++) {

        mainPages[i].subPages = [];
        for (let j = 0; j < subPages.length; j++) {
          if (mainPages[i].menuId == subPages[j].refMenuId) {
            mainPages[i].subPages.push(subPages[j])
          }
        }
        this.changeCheckBox(1, {}, mainPages[i]);

      }
      this.mainPages = mainPages;
      if (this.mainPages) {
        this.mainPages.forEach(mainPage => {
          this.addMainPages(mainPage);
        });
      }
      // this.listGroup = succ.data;
      setTimeout(() => {

        this.checkSelectAllPage();
      }, 2000);

    }, err => {
      this.common.hideLoading()


    }
    )
  }

  submit() {
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].isAdd = this.pages[i].isAdd ? 1 : 0;
      this.pages[i].isEdit = this.pages[i].isEdit ? 1 : 0;
      this.pages[i].isDelete = this.pages[i].isDelete ? 1 : 0;
      this.pages[i].isChecker = this.pages[i].isChecker ? 1 : 0;
      this.pages[i].isView = this.pages[i].isView ? 1 : 0;
      // this.pages[i].subPages=[]
    }

    let req: any = {
      rolePrivilege: this.pages,
      role: this.groupObj
    }
    req.isMainChecker = this.isMainChecker;

    this.common.showLoading();
    this.apiService.post(this.constantsService.updateGroupPrivilege, req).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        $("html, body").animate({ scrollTop: 0 }, "slow");

        this.common.showSuccessMessage(succ.message);
        setTimeout(() => {
          this.router.navigate(['../home/group-management']);

        }, 1000);
      }
      else {
        this.common.showErrorMessage(succ.message);
      }
    },
      err => {
        this.common.showErrorMessage(err.message);
        this.common.hideLoading()

      });
  }
  selectAll(value) {




    for (let i = 0; i < this.mainPages.length; i++) {
      this.mainPages[i].isAdd = this.groupPrevilege.selectAll ? 1 : 0;
      this.mainPages[i].isEdit = this.groupPrevilege.selectAll ? 1 : 0;
      this.mainPages[i].isDelete = this.groupPrevilege.selectAll ? 1 : 0;
      this.mainPages[i].isChecker = this.groupPrevilege.selectAll ? 1 : 0;

      this.mainPages[i].isView = this.groupPrevilege.selectAll ? 1 : 0;
      this.mainPages[i].selectAllSubpage = this.groupPrevilege.selectAll ? 1 : 0;


      for (let j = 0; j < this.mainPages[i].subPages.length; j++) {
        this.mainPages[i].subPages[j].isAdd = this.groupPrevilege.selectAll ? 1 : 0;
        this.mainPages[i].subPages[j].isEdit = this.groupPrevilege.selectAll ? 1 : 0;
        this.mainPages[i].subPages[j].isDelete = this.groupPrevilege.selectAll ? 1 : 0;
        if (this.mainPages[i].isMainChecker)
          this.mainPages[i].subPages[j].isChecker = this.groupPrevilege.selectAll ? 1 : 0;

        this.mainPages[i].subPages[j].isView = this.groupPrevilege.selectAll ? 1 : 0;
        this.mainPages[i].subPages[j].selectAllSubpage = this.groupPrevilege.selectAll ? 1 : 0;
      }

    }

   

  }

  selectAllSubpageclick(page) {

    page.selectAllSubpage = !page.selectAllSubpage;

    for (let i = 0; i < page.subPages.length; i++) {
      page.subPages[i].isAdd = page.selectAllSubpage ? 1 : 0;
      page.subPages[i].isEdit = page.selectAllSubpage ? 1 : 0;
      page.subPages[i].isDelete = page.selectAllSubpage ? 1 : 0;
      if (page.isMainChecker)
        page.subPages[i].isChecker = page.selectAllSubpage ? 1 : 0;
      page.subPages[i].isView = page.selectAllSubpage ? 1 : 0;
      if (!page.subPages[i].isView) {
        page.subPages[i].disable = true;
      } else
        page.subPages[i].disable = false;

    }
    this.checkSelectAllPage();

  }
  checkSelectAllPage() {
    let sub = 0;
    for (let i = 0; i < this.mainPages.length; i++) {

      if (this.mainPages[i].selectAllSubpage) {
        sub++;
      }



    }
    if (sub == this.mainPages.length)
      this.groupPrevilege.selectAll = true
    else
      this.groupPrevilege.selectAll = false;
  }
  changeCheckBox(value, subPage, mainPage) {

    let len = 0;
    for (let i = 0; i < mainPage.subPages.length; i++) {
      if (mainPage.subPages[i].isAdd &&
        mainPage.subPages[i].isEdit &&
        mainPage.subPages[i].isDelete &&
        mainPage.subPages[i].isChecker &&
        mainPage.subPages[i].isView) {
        len++;


      }

    }
    if (len == mainPage.subPages.length) {
      mainPage.selectAllSubpage = true;

    }
    else {
      mainPage.selectAllSubpage = false;

    }
    this.checkSelectAllPage();

  }
  changeSubPageCheckBox(value, subPage, mainPage) {

    if (!value) {
      subPage.isAdd = 0;
      subPage.isEdit = 0;
      subPage.isDelete = 0;
      subPage.isChecker = 0;
      subPage.disable = true;
    } else {
      subPage.disable = false;

    }
    this.checkSelectAllPage();

  }
 
  createNewRole() {
    this.groupForm.reset();
    this.common.setEditGroup({})
    let control: any = (this.groupForm.controls['mainPages'])
    control.clear();
    this.ngOnInit();
  }
  editGroupPrivilege(group) {
    this.groupForm.reset();
    this.common.setEditGroup(group)
    let control: any = (this.groupForm.controls['mainPages'])
    control.clear(); this.ngOnInit();
  }
  SaveRoleDescription() {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }
    let url = ""

    url = this.constantsService.updateGroup

    let obj = this.groupObj;
    // .getRawValue();
    obj.groupName = this.groupForm.value.groupName
    obj.groupDesc = this.groupForm.value.groupDesc
    obj.dayLimit = this.groupForm.value.dayLimit
    obj.monthLimit = this.groupForm.value.monthLimit
    obj.userGroupName = this.groupForm.value.userGroupName
    obj.shortMessageLength = this.groupForm.value.shortMessageLength
    obj.isShortMessageRequired = this.groupForm.value.isShortMessageRequired
    // obj.status = this.groupObj.status
    obj.isMainChecker = this.isMainChecker;


    // return; 
    this.common.showLoading()
    this.apiService.post(url, obj).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (this.isMainChecker) {

        } else {
          this.groupObj = obj;
          this.editData = Object.assign({}, this.groupObj);
        }

        this.showAddRole = false;
        this.common.showSuccessMessage(succ.message);
        // setTimeout(() => {
        // this.router.navigate(['../home/group-management']);

        // }, 1000);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading()

    });
  }
  updateStatus() {
    let url = this.constantsService.updateGroup

    if (this.groupObj.changeStatus == 0 || this.groupObj.changeStatus == false) {
      if (!this.changeStatus) {
        this.common.showErrorMessage("Reason is must")
        return;

      }
    }

    if (this.groupObj.changeStatus == true || this.groupObj.changeStatus == 1)
      this.groupObj.status = 1;
    else
      this.groupObj.status = 0;


    this.groupObj.isMainChecker = this.isMainChecker;



    this.common.showLoading()
    this.apiService.post(url, this.groupObj).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        $('#statusModal').modal('hide')
        $("html, body").animate({ scrollTop: 0 }, "slow");

        this.common.showSuccessMessage(succ.message);
        setTimeout(() => {
          this.router.navigate(['../home/group-management']);

        }, 1000);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading()

    });
  }
  createGroup(isSave) {

    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return;
    }


    // return;

    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].isAdd = this.pages[i].isAdd ? 1 : 0;
      this.pages[i].isEdit = this.pages[i].isEdit ? 1 : 0;
      this.pages[i].isDelete = this.pages[i].isDelete ? 1 : 0;
      this.pages[i].isChecker = this.pages[i].isChecker ? 1 : 0;
      this.pages[i].isView = this.pages[i].isView ? 1 : 0;
    }



    let req: any = {
      rolePrivilege: this.pages,
      role: this.groupForm.getRawValue()
    }
    req.role.status = 1;
    req.role.branchId = this.user.data.branchId;
    // req.isMainChecker = this.isMainChecker;
    req.isMainChecker = this.isMainChecker;


    let url = this.constantsService.addGroup
    if (isSave) {
      url = this.constantsService.draftGroup

    }
    if (this.editData)
      if (this.editData.statusName == "Draft") {
        req.wfId = this.editData.wfId
      }

    // return;
    this.common.showLoading()
    this.apiService.post(url, req).subscribe((succ: any) => {

      this.common.hideLoading();
      if (succ.code == 200) {
        $("html, body").animate({ scrollTop: 0 }, "slow");

        this.common.showSuccessMessage(succ.message);
        setTimeout(() => {
          this.router.navigate(['../home/group-management']);

        }, 1000);
      }
      else {
        this.common.showErrorMessage(succ.message)
      }
    }, err => {
      this.common.hideLoading()

    });
  }
  approveOrReject(data) {
    let url;
    if (!data) {

      if (!this.reason) {
        // $("html, body").animate({ scrollBottom: 0 }, "slow");
        $("html, body").animate({ scrollTop: $(document).height() + $(window).height() }, "slow");

        this.errMsg = true;
        return;
      }


      url = this.constantsService.rejectGroup
    } else {
      this.editData.groupNewDetails = JSON.parse(this.editData.groupNewDetails)
      url = this.constantsService.approveGroup
    }
    this.editData.reason = this.reason;

    // return;
    this.errMsg = false;
    this.common.showLoading()

    this.apiService.post(url, this.editData).subscribe((succ: any) => {


      this.common.hideLoading();
      if (succ.code == 200) {

        $("html, body").animate({ scrollTop: 0 }, "slow");

        this.common.showSuccessMessage(succ.message);
        setTimeout(() => {
          this.router.navigate(['../home/group-management']);

        }, 1000);
        // this.ngOnInit(); 
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {


      this.common.hideLoading();

    });

  }

  checkerOrActionAvailable(page){
      if(page.isCheckerAvailable)
      return true;
      else if(page.actionRequired)
      return true;
      else
      return false;

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
      // this.licenseNumberError=false;
      // this.appService.numberfield(length,limitTo);
      return;
    }
    // if(id=='reason'){
    //   this.errReasonMsg=false;
    // }
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  ngOnDestroy() {
    // var Opid = {};
    this.common.setEditGroup({})
  }
}
