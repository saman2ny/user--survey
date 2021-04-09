import { Component, OnInit, Compiler  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { Location } from '@angular/common';

declare var $: any;
declare function myMethod(): any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {





 

  changePasswordObj: any = {};
  passwordForm: FormGroup;
  showPassword: any;
  constructor(private _compiler: Compiler, public common: CommonService, public formBuilder: FormBuilder, public apiService: ApiService, public constantsService: ConstantsService,
    public location: Location) {
      this._compiler.clearCache();


    console.log(this.common.getUser())

    // this.common.sideNav()
    this.passwordForm = this.formBuilder.group({
      pass: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])],
      // opEmailId: ['', [Validators.required, Validators.email]],


    });
  }

  ngOnInit() {
    myMethod();

  }

  ezhilSam()
  {
    this.changePasswordObj.newPassword =""
    this.changePasswordObj.confirmNewPassword =""
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel

  }
  submitPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.common.showLoading()

    this.apiService.post(this.constantsService.changePasswordSubmit, this.changePasswordObj).subscribe((succ: any) => {
      console.log(succ);

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.common.logout(succ.body);
        // this.hideModal() 
        // this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
        this.changePasswordObj = {};
        this.passwordForm.markAsUntouched();

      }

    }, err => {
      // $('#userModal').modal('hide')


      this.common.hideLoading();
      console.log(err + "err")
    });
  }
  ShowPasswordIcon() {
    this.showPassword = !this.showPassword;

  }
}
