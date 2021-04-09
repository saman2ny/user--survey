import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
import{Location} from "@angular/common";
// import * as $ from 'jquery'
declare var $: any;
import * as _ from 'lodash';

import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  otp:any ={}
  otpform: FormGroup;
  getloginCred;
  user: any;
  regenDisable:boolean = true





	ticks = 60;
    
	minutesDisplay: number = 0;
	hoursDisplay: number = 0;
	secondsDisplay: number = 0;
  
	sub: Subscription;
  finishCountDown: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, public location: Location
	) { 
  }

  ngOnInit() {

    this.startTimer();
    this.setTimeout()


this.otpform =  this.formBuilder.group({
  otp: ['', Validators.required]
})

     
this.getloginCred = this.common.getLogin();

if(_.isNil(this.getloginCred))
{
  this.router.navigateByUrl('/');
}
      
  }


public setTimeout()
{
  setTimeout(() => {
    this.regenDisable = false
    
  }, 60000);
}

  private startTimer() {
 this.common.hideLoading()
		const countdownStart = 60;

		let timer = Observable.timer(1, 1000).map(i =>  countdownStart - i).take(countdownStart + 1);
		this.sub = timer.subscribe(
		

			t => {
				this.ticks = t;
        this.secondsDisplay = this.getSeconds(this.ticks);
        
        this.finishCountDown = this.secondsDisplay
  
        console.log(this.ticks, "ticksticksticksticks")

    //     if(this.finishCountDown  === "00")
    // {
    //   console.log("came")
    //   this.regenDisable = false
    
    // }

				this.minutesDisplay = this.getMinutes(this.ticks);
				this.hoursDisplay = this.getHours(this.ticks);
			}
    );
    
    
    // if(this.finishCountDown  === '00')
    // {
    //   console.log("came")
    //   this.regenDisable = false
    
    // }
	}
	
	private getSeconds(ticks: number) {

    return this.pad(ticks % 60);

	}
	
	private getMinutes(ticks: number) {
		 return this.pad((Math.floor(ticks / 60)) % 60);
	}
	
	private getHours(ticks: number) {
		return this.pad(Math.floor((ticks / 60) / 60));
	}
	
	private pad(digit: any) { 
		return digit <= 9 ? '0' + digit : digit;
	}
	


  save()
  {

		if (this.otpform.invalid) {
			this.otpform.markAllAsTouched();
			return;
		} else {
      this.common.showLoading()

    console.log(this.secondsDisplay, "secondsDisplay")
      this.getloginCred = this.common.getLogin();
      this.otp.userId = this.getloginCred.userId;
      this.otp.opPassword = this.getloginCred.opPassword
      this.otp.sessionId = this.getloginCred.sessionId
      this.otp.companyId = this.getloginCred.companyId
      this.common.showLoading()
      this.finishCountDown = this.secondsDisplay
      console.log(this.otp, "otp")

  console.log("2")

    this.apiService.post(this.constantsService.validateLogin, this.otp).subscribe((succ: any) => {
      console.log(succ);
      if (succ.code == 200) {
  

        this.common.showSuccessMessage(succ.message)
        this.common.sessionId = succ.sessionId;
        let roles = succ.data.roles
        let mainPages = [];
        let subPages = [];


        this.common.setUser(succ);
        console.log(this.common.getUser(),"sdf");
        for (let i = 0; i < roles.length; i++) {
          if (!roles[i].subMenu) {
            mainPages.push(roles[i])
          }
          else {
            subPages.push(roles[i])
          }
        }
        this.router.navigateByUrl('/home/dashboard');




				} else {
          this.common.hideLoading()		
          this.common.showErrorMessage(succ.message)
          this.location.back();


				}


			}, err => {
        
				this.common.hideLoading()

				console.log(err);
        this.common.showErrorMessage(err.message)
        this.location.back();

      })
    


    }



  }


otpExpiryCall()
{


  
  this.regenDisable = true

    

  this.getloginCred = this.common.getUser();
  console.log(this.getloginCred, "OTPGENT")
  console.log(this.common.getUser(),"sdf");

  this.otp.userId = this.getloginCred.userId;
  this.otp.opPassword = this.getloginCred.opPassword
  this.otp.sessionId = this.getloginCred.sessionId
  this.otp.otp = " "

  this.common.showLoading()
  console.log(this.otp, "otp")


  this.apiService.post(this.constantsService.generateOtp, this.otp).subscribe((succ: any) => {
    console.log(succ);
    if (succ.code == 200) {
      this.common.showSuccessMessage(succ.message)
      this.startTimer();
      this.setTimeout();





      } else {
        this.common.showErrorMessage(succ.message)
        this.location.back();


      }


    }, err => {
      

      console.log(err);
      this.common.showErrorMessage(err.message)
      this.location.back();

    })




}


regenrate()
{
  // this.startTimer();

  this.otpExpiryCall()
}


}
