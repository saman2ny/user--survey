import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-system-parameters',
  templateUrl: './list-system-parameters.component.html',
  styleUrls: ['./list-system-parameters.component.css']
})
export class ListSystemParametersComponent implements OnInit {
  user: any;
  role: any;
  channelForm: FormGroup;
  passwordForm: FormGroup;

  channels: any = [
    // { id: 1, channelDesc: "SMS" },
    // { id: 1, channelDesc: "Push Nodification" },
    // { id: 1, channelDesc: "Email" },
  ]
  mobileApps: any = [];
  system: any = {};
  flag: any = {
    isSms: false,
    isEmail: false,
    isPush: false

  }
  systemParameter: any = [];
  mainMenus: any = [];
  menuForm: FormGroup;
  isPassordError: boolean;
  showContent: boolean = false;
  constructor(public location: Location, public common: CommonService, public formBuilder: FormBuilder, private router: Router, public apiService: ApiService, public constantsService: ConstantsService) {
    this.user = this.common.getUser();
    this.role = this.common.getRole();
    this.channelForm = formBuilder.group({

      channels: formBuilder.array([]),
      mobileApp: formBuilder.array([]),
    });
    this.menuForm = formBuilder.group({
      mainPages: formBuilder.array([]),
    });
    this.common.showLoading();
    this.apiService.post(this.constantsService.getMasterParam, {}).subscribe((succ: any) => {
      console.log(succ)
      this.channels = succ.data.channel;
      this.mainMenus = succ.data.menu;

      if (this.channels.length) {
        this.channels.forEach(channel => {
          this.addchannelControl(channel);
        });
      } else {
        this.addchannelControl();
      }
      if (this.mainMenus.length) {
        this.mainMenus.forEach(menu => {
          this.addMainMenuControl(menu);
        });
      } else {
        this.addMainMenuControl();
      }
      // this.listGroup = succ.data;
      this.apiService.post(this.constantsService.listSysParameters, {}).subscribe((succ: any) => {
        console.log(succ);
        this.common.hideLoading();
        // console.log(JSON.stringify(succ.data));
        if (succ.data.length) {
          this.systemParameter = succ.data;
          this.showContent = true;
          let mobile = JSON.parse(succ.data[17].propertyValue);
          if (succ.data[1].propertyValue == 'false') {
            this.systemParameter[1].propertyValue = false;
          } else {
            this.systemParameter[1].propertyValue = true;

          }
          if (succ.data[19].propertyValue == 'false') {
            this.systemParameter[19].propertyValue = false;
          } else {
            this.systemParameter[19].propertyValue = true;

          }
          if (mobile.length) {
            this.mobileApps = JSON.parse(succ.data[17].propertyValue);
          }
          if (this.mobileApps.length) {
            this.mobileApps.forEach(app => {
              this.addMobileAppForm(app);
            });
          } else {
            this.addMobileAppForm();
          }

          let channels = JSON.parse(succ.data[0].propertyValue);
          let mobileApp = JSON.parse(succ.data[17].propertyValue);
          let mainMenu = JSON.parse(succ.data[18].propertyValue);
          console.log(channels);
          for (var i = 0; i < channels.length; i++) {
            if (channels[i] == 1) {
              this.flag.isSms = true;

              this.channels[0].value = true;

            } else if (channels[i] == 2) {
              this.flag.isEmail = true;
              this.channels[1].value = true;
            } else if (channels[i] == 3) {
              this.flag.isPush = true;
              this.channels[2].value = true;
            }
          }
          console.log(mobileApp);
          console.log(mainMenu);
          for (var i = 0; i < mainMenu.length; i++) {
            console.log(mainMenu[i]);
            for (var j = 0; j < this.menuForm.value.mainPages.length; j++) {
              if (this.menuForm.value.mainPages[j].id == mainMenu[i]) {
                this.menuForm.value.mainPages[j].value = true;
                this.mainMenus[j].value = true;
              }
            }
          }
          console.log(this.menuForm);
        }
        else {
          // return;
          this.addMobileAppForm();
        }






      }, err => {
        console.log(err + "err")

        this.common.hideLoading();
      });

    }, err => {
      this.common.hideLoading()

      console.log(err + "err")
    })

  }

  ngOnInit() {

    this.passwordForm = this.formBuilder.group({

      // LoginNameLength: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      passwordLength: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      wrongPassword: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      lowerCaseNeeded: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      accountLockout: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      upperCaseNeeded: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      passwordExpiry: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      numericsNeeded: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      expiryNotification: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      symbolsNeeded: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      autoInactive: ['', Validators.compose([Validators.required, Validators.maxLength(2)])]

    });

  }

  addMainMenuControl(menu?: any) {

    // console.log(menu);
    let fg = this.formBuilder.group({
      'menu_label': [menu.menu_label],
      'id': [menu.menu_id],
      'value': [false],
    });
    (<FormArray>this.menuForm.get('mainPages')).push(fg);


  }
  addchannelControl(channel?: any) {

    console.log(channel);
    let fg = this.formBuilder.group({
      'channelDesc': [channel.channelDesc],
      'channelId': [channel.channelId],
      'value': [false],

    });
    (<FormArray>this.channelForm.get('channels')).push(fg);


  }
  changeChannel(channel) {
    console.log(channel);
    console.log(this.channelForm);
    if (channel.value) {
      if (channel.channelId == 1) {
        this.flag.isSms = true;
      } else if (channel.channelId == 2) {
        this.flag.isEmail = true;
      } else {
        this.flag.isPush = true;
        // this.addMobileAppForm();
      }
    } else {
      if (channel.channelId == 1) {
        this.flag.isSms = false;
      } else if (channel.channelId == 2) {
        this.flag.isEmail = false;
      } else {

        // for (var i = 0; i < this.mobileApps.length; i++) {

        //   (<FormArray>this.channelForm.get('mobileApp')).removeAt(i)

        // }
        this.flag.isPush = false;
        // this.mobileApps = [];

        // setTimeout(() => {
        //   this.mobileApps = [];
        // }, 5000);


      }
    }
  }
  addMobileApp() {
    console.log(this.channelForm);
    if (this.channelForm.controls.mobileApp.invalid) {
      this.channelForm.controls.mobileApp.markAllAsTouched();
      return;

    }

    this.addMobileAppForm();
  }
  addMobileAppForm(app?: any) {
    this.mobileApps.push({
      "mobileName": "",
      'serverKey': "",
      'mobileId': this.mobileApps.length + 1
    });
    console.log(app);
    let fg;
    if (app) {

      fg = this.formBuilder.group({
        'mobileName': [app.mobileName, Validators.required],
        'serverKey': [app.serverKey, Validators.required],
        'mobileId': [app.mobileId],

      });
    } else {
      // this.mobileApps.push({
      //   mobileName: "[app.channelDesc]",
      //   'serverKey': "app.channelDesc",
      //   'mobileId': "[app.channelId]"
      // });
      fg = this.formBuilder.group({
        'mobileName': ["", Validators.required],
        'serverKey': ["", Validators.required],
        'mobileId': [this.mobileApps.length - 1],

      });
    }

    (<FormArray>this.channelForm.get('mobileApp')).push(fg);


  }

  deleteMobileApp(index: number) {
    console.log('index', index);
    console.log(((<FormArray>this.channelForm.get('mobileApp'))))

    if (this.channelForm.get('mobileApp').value[index]) {
      (<FormArray>this.channelForm.get('mobileApp')).setErrors(null);
      (<FormArray>this.channelForm.get('mobileApp')).value[index].status = 'valid';
      (<FormArray>this.channelForm.get('mobileApp')).removeAt(index)

      return;
    }
    (<FormArray>this.channelForm.get('mobileApp')).removeAt(index)

    delete this.mobileApps[index];



    // (<FormArray>(<FormGroup>(<FormArray>this.channelForm.controls['user'])
    //   .controls[userIndex]).controls['phones']).removeAt(index);
  }
  submit() {

    console.log(this.systemParameter[1].propertyValue);


    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }


    // mobile app
    if (this.flag.isPush && this.channelForm.controls.mobileApp.invalid) {
      this.channelForm.controls.mobileApp.markAllAsTouched();
      return;
    } else if (!this.flag.isPush) {
      this.systemParameter[17].propertyValue = "[]"

    } else if (this.flag.isPush) {
      let mobileApp = this.channelForm.value.mobileApp;
      this.systemParameter[17].propertyValue = [];
      for (var i = 0; i < mobileApp.length; i++) {
        this.systemParameter[17].propertyValue.push(mobileApp[i]);
      }
      this.systemParameter[17].propertyValue = JSON.stringify(this.systemParameter[17].propertyValue);
      console.log(mobileApp);

    }

    // otp value
    if (this.systemParameter[1].propertyValue) {
      this.systemParameter[1].propertyValue = true;
    } else {
      this.systemParameter[1].propertyValue = false;

    }
     // credit limit value
     if (this.systemParameter[19].propertyValue) {
      this.systemParameter[19].propertyValue = true;
    } else {
      this.systemParameter[19].propertyValue = false;

    }
    console.log(this.menuForm);
    console.log(this.channelForm);
    let channels = this.channelForm.value.channels;


    console.log(channels);
    this.systemParameter[0].propertyValue = [];
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].value) {
        this.systemParameter[0].propertyValue.push(channels[i].channelId);
      }
    }
    this.systemParameter[0].propertyValue = JSON.stringify(this.systemParameter[0].propertyValue);

    let mainMenu = this.menuForm.value.mainPages;

    this.systemParameter[18].propertyValue = [];

    for (var i = 0; i < mainMenu.length; i++) {
      if (mainMenu[i].value) {
        this.systemParameter[18].propertyValue.push(mainMenu[i].id);
      }
    }
    this.systemParameter[18].propertyValue = JSON.stringify(this.systemParameter[18].propertyValue);


    console.log(this.systemParameter);
    this.common.showLoading();
    this.apiService.post(this.constantsService.addsystemParameters, { systemParameters: this.systemParameter }).subscribe((succ: any) => {
      console.log(succ);
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);
        this.common.logout(succ.body);
      } else {
        this.common.showErrorMessage(succ.message);
      }
      this.common.hideLoading();
    }, err => {
      console.log(err);
      this.common.hideLoading();
    })

  }
  cancel() {
    this.location.back();
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
    // return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  checkPassword() {
    console.log(this.passwordForm);

    console.log(parseInt(this.systemParameter[2].propertyValue) < (parseInt(this.systemParameter[4].propertyValue) + parseInt(this.systemParameter[6].propertyValue) + parseInt(this.systemParameter[8].propertyValue) + parseInt(this.systemParameter[10].propertyValue)));
    console.log(this.systemParameter[2].propertyValue);
    if (parseInt(this.systemParameter[2].propertyValue) < (parseInt(this.systemParameter[4].propertyValue) + parseInt(this.systemParameter[6].propertyValue) + parseInt(this.systemParameter[8].propertyValue) + parseInt(this.systemParameter[10].propertyValue))) {
      this.isPassordError = true;

    } else {
      this.isPassordError = false;
    }
    this.passwordForm.get('passwordLength').setValidators([this.addPassowrdValidator()])
    this.passwordForm.get('passwordLength').updateValueAndValidity();
  }
  private addPassowrdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.isPassordError) {
        return null
      }
      return { 'passwordCheck': true }
    }
  }
}
