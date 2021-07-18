import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ApiService } from '../service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
// import { Subscription } from 'rxjs/Subscription';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ForgotForm: FormGroup;
  forgot: any = {};
  passwordForm: FormGroup;
  changePasswordObj: any = {};
  token: any;
  private paramsSubscription: Subscription;
  message: any;

  resolved(captchaResponse: string) {
    
  }




  constructor(public formBuilder: FormBuilder, public common: CommonService, public apiService: ApiService, public constantsService: ConstantsService,
    public activateRoute: ActivatedRoute,  private translate: TranslateService
  ) {
    
    this.ForgotForm = this.formBuilder.group({
      opEmailId: ['', Validators.compose([Validators.required])],
      recaptcha: ['', Validators.compose([Validators.required])]
    });
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])],

    });
    this.paramsSubscription = this.activateRoute.queryParams.subscribe(params => {
      
      this.token = params.link;
      
      this.changePasswordObj.token = this.token
      $('#firstTimeChangePassword').modal('show')

    })
    // localaization
    // let language = sessionStorage.getItem('language');
    let language = "en";
    
    if (language == undefined || !language) {
      
      this.translate.use('en');
      this.common.setLanguage('en');
      sessionStorage.setItem('language', 'en');


    } else {
      if (language == 'ar') {
        this.translate.use('ar');
        // this.common.setLanguage('ar');

      } else {

        this.translate.use('en');
        // this.common.setLanguage('en');

      }

    }
  }
  title = 'enterprise-alerts';

  modalClose() {
    this.ForgotForm.reset();
    $('#forgotModal').modal('hide')
    grecaptcha.reset();

  }
  ForgotSubmit() {

    if (this.ForgotForm.invalid) {
      this.ForgotForm.markAllAsTouched();
      return;
    } else {


      this.common.showLoading()
      this.apiService.post(this.constantsService.forgot, this.forgot).subscribe((succ: any) => {
        
        this.common.hideLoading()


        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message)
          this.ForgotForm.reset();
          $('#forgotModal').modal('hide')
          grecaptcha.reset();



          // this.router.navigateByUrl('/home/dashboard');
        } else {
          // this.ForgotForm.reset();
          this.common.showErrorMessage(succ.message)
          this.modalClose()
          // $('#forgotModal').modal('hide')
          // grecaptcha.reset();



        }


      }, err => {
        this.common.hideLoading()


        
        this.common.showErrorMessage(err)
      })


    }
  }
  submitPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    } else {
      this.common.showLoading()

      this.apiService.post(this.constantsService.ForgotPasswordV2, this.changePasswordObj).subscribe((succ: any) => {
        

        this.common.hideLoading();
        this.changePasswordObj = {};
        this.passwordForm.reset();
        // this.passwordForm.markAsUntouched();

        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
          this.paramsSubscription.unsubscribe();

          $('#firstTimeChangePassword').modal('hide')
          this.common.logout(succ.body);

          // this.ngOnInit();
        }
        else {
          this.common.showErrorMessage(succ.message);
        }

      }, err => {
        this.common.hideLoading()
        this.changePasswordObj = {};
        this.passwordForm.reset();
        
        this.common.showErrorMessage(err.message)
      })

    }
  }

  close() {
    $('#firstTimeChangePassword').modal('hide')
    this.paramsSubscription.unsubscribe();
  }
}
