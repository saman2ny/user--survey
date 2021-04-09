import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
declare var $: any;




@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	ForgotForm: FormGroup;
	invalidLogin: boolean = false;
	user: any = {
		language:"en"
	};
	forgot: any = {};
	logincheck: any;



	languageList: any = [
		{
		  id: 1,
		  name: "English",
		  code:"en",
		  direction:"ltr"
		},
		{
		  id: 2,
		  name: "Arabic",
		  code:"ar",
		  direction:"rtl"
		},
		
	  ]


	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) {
		//scheduler function
		// this.apiService.callScheduler(this.constantsService.token, this.user).subscribe((succ: any) => {
				
		// 	this.common.hideLoading()
			

		// }, err => {
		// 	this.common.hideLoading()

		
		// 	// this.common.showErrorMessage(err.message)
		// 	this.location.back();

		// })

		
	}

	loginSubmit() {

		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		} else {
			this.common.showLoading()
			this.apiService.post(this.constantsService.login, this.user).subscribe((succ: any) => {
				
				this.common.hideLoading()
				if (succ.code == 200) {
					if (succ.data.otp === true) {
						this.common.showSuccessMessage(succ.message)
						this.common.setUser(succ);
						
						this.router.navigateByUrl('/two-factor-auth');

					}
					else if (succ.data.otp === false) {

						this.common.showSuccessMessage(succ.message)
						this.common.sessionId = succ.sessionId;
						let roles = succ.data.roles
						let mainPages = [];
						let subPages = [];


						this.common.setUser(succ);
						
						for (let i = 0; i < roles.length; i++) {
							if (!roles[i].subMenu) {
								mainPages.push(roles[i])
							}
							else {
								subPages.push(roles[i])
							}
						}
						this.router.navigateByUrl('/home/dashboard');
						// this.common.getAuthorize();  
					}


				} else {
					this.common.showErrorMessage(succ.message)
					this.router.navigateByUrl('/');

				}


			}, err => {
				this.common.hideLoading()

			
				this.common.showErrorMessage(err.message)
				// this.location.back();

			})

		}
	}
	ngOnInit() {

		this.loginForm = this.formBuilder.group({
			opUserId: ['', Validators.compose([Validators.required])],
			opPassword: ['', Validators.required],
			language:['English'] 
		});


		this.ForgotForm = this.formBuilder.group({
			opEmailId: ['', Validators.compose([Validators.required])],
		});
	}

	showForgot() {
		this.ForgotForm.reset()
		$('#forgotModal').modal('show')
	}
	changeLanguage(lang){
		console.log(lang);
		this.common.setLanguage(lang);
	}

}
