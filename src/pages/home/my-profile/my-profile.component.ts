import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { TooltipLabel } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileObj: any = {};
  profileForm: FormGroup;
  listBranchs: any = [];
  listDepartments: any = [];
  separateDialCode = true;
  TooltipLabel = TooltipLabel;
  allCounties: ((string | number | string[])[] | (string | number | number[])[])[];

  selectedCorpPreMobileNo = "in"
  selectedCorpContactPreMobileNo = "in"
  selectedCorpContactWorkPre = "in"
  constructor(private location: Location, public common: CommonService, public formBuilder: FormBuilder, public apiService: ApiService,
    public constantsService: ConstantsService, public countryService: CountryService) {
    
    this.allCounties = this.countryService.allCountries;
    
    this.profileForm = this.formBuilder.group({

      opImageCopy: [{ value: '' },],
      opEmailId: [{ value: '', disabled: true },],
      opMobileNo: [{ value: '', disabled: true },],
      opUserName: [{ value: '', disabled: true },],
      employeeId: [{ value: '', disabled: true },],
      opDept: [{ value: '', disabled: true },],
      opBranch: [{ value: '', disabled: true },],
      opPreMobileNo: [{ value: '', disabled: true },]



    });
  }
  ngOnInit() {
    // ListBranch 
    this.apiService.post(this.constantsService.listBranch, {}).subscribe((succ: any) => {
      this.listBranchs = succ.data;
      
    }, err => {
      
    })



    // ListDepartment
    this.apiService.post(this.constantsService.listDepartment, {}).subscribe((succ: any) => {
      this.listDepartments = succ.data;
      
    }, err => {
      
    })
    this.common.showLoading();
    this.apiService.post(this.constantsService.myProfile, {}).subscribe((succ: any) => {
      this.common.hideLoading();
      
      if (succ.code == 200) {
        this.profileObj = succ.data;
        this.profileObj.opImageCopy = "data:image/png;base64," + this.profileObj.opImageCopy
        var mobile = _.split(this.profileObj.opMobileNo, '-', 2);
        // this.profileObj.opPreMobileNo = mobile[0]
        // this.profileObj.opMobileNo = mobile[1]
        this.profileForm.controls.opPreMobileNo.setValue(mobile[1]);


        let countryCode: any = this.allCounties.filter(element => {
          return element[2] == mobile[0];
        });
        countryCode = countryCode[0]
        this.selectedCorpPreMobileNo = countryCode[1];
        // this.profileObj.opUserName=this.profileObj.opFirstName+""+this.profileObj.opLastName
      }
    }, err => {
      this.common.hideLoading();

    });

  }
  // select image and convert into base64 format
  onFileChange($event) {
    var file: File = $event.target.files[0];
    
    var FileSize = file.size; // in MB
    
    if (FileSize > 21000) {
      this.common.showErrorMessage("Image size exceeds 20 KB")
      return;
    }
    // if (FileSize > 2) {
    //   alert('File size exceeds 2 MB');
    //   // $(file).val(''); //for clearing with Jquery
    // } else {

    // }
    if (file.size <= 4000000) {
      this.common.convertBase64(file, (result) => {
        this.profileObj.opImageCopy = result;
      })
    } else {
      this.profileObj.opImageCopy = '';
      $event.target.value = '';
    }
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  Save() {
    
    // return;
    this.common.showLoading();
    let img = this.profileObj.opImageCopy.split(',');
    
    // return;
    this.apiService.post(this.constantsService.updateMyProfile, { opProfileImage: img[1] }).subscribe((succ: any) => {
      this.common.hideLoading();
      
      if (succ.code == 200) {
        // this.profileObj = succ.data;
        this.common.showSuccessMessage(succ.message)

        // this.profileObj.opUserName=this.profileObj.opFirstName+""+this.profileObj.opLastName
      } else {
        this.common.showErrorMessage(succ.message)

      }
    }, err => {
      this.common.showErrorMessage(err.message)

      this.common.hideLoading();

    });
  }


  getBranchName(id) {

    let branch = this.listBranchs.filter(
      bran => {
        
        
        if (bran.branchId == parseInt(id))
          return bran;
        
        // book.BrandName.toLowerCase().indexOf(id) > -1
      });
    
    if (branch.length)
      return branch[0].branchName

  }

  getDepartmentName(id) {

    let department = this.listDepartments.filter(
      depart => {
        if (depart.departmentId == id)
          return depart;
        
        // book.BrandName.toLowerCase().indexOf(id) > -1
      });
    
    if (department.length)
      return department[0].departmentName

  }



}
