import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";


import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm: FormGroup;
  token: any;
  passwordChange: any = {};


  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, public common: CommonService, public apiService: ApiService, public constantsService: ConstantsService) {



    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      // console.log(this.token);
      this.passwordChange.token = this.token


    })

    console.log(this.passwordChange.token);
  }

  ngOnInit() {



    this.ForgotForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
      confirmNewPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],



    });


  }

  submitPassword() {




    if (this.ForgotForm.invalid) {
      this.ForgotForm.markAllAsTouched();
      return;
    }
    this.common.showLoading()
    console.log(this.constantsService.ForgotPasswordV2)
    this.apiService.post(this.constantsService.ForgotPasswordV2, this.passwordChange).subscribe((succ: any) => {
      console.log(succ);

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        // this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      // $('#userModal').modal('hide')


      this.common.hideLoading();
      console.log(err + "err")
    });
  }




}
