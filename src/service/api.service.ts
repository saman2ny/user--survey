import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { catchError, retry } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { CommonService } from './common.service';
import { ConstantsService } from './constants.service';

@Injectable()
export class ApiService {
  sessionToken: any = "";
  user: any;


  constructor(private http: HttpClient, private common: CommonService, public constantsService: ConstantsService) { }
  // mukesh
  //baseUrl = 'http://172.16.8.222:8084/EA/';

  // umeshwaran
  // baseUrl = 'http://172.16.8.164:9090/EA/';
  // baseUrl = 'http://52.66.140.43:8080/EA/';

  //Rajesh

  // baseUrl = 'http://172.16.8.196:8084/EA/'; 
  //Sam
  // baseUrl = 'http://172.16.8.144:8081/EA/';
  // baseUrl = 'http://enterprisealert.ducont.com:9090/EA/';

  //Ezhil
//  baseUrl = 'http://172.16.8.150:8081/EA/'; 
  //Sam
  // baseUrl = 'http://172.16.8.144:8081/EA/'; 

  // baseUrl = 'http://172.16.8.150:8081/EA/';

  //baseUrl = 'http://172.16.8.144:8081/EA/';
  //  baseUrl = 'http://172.16.8.193:8084/EA/';
  //baseUrl = 'http://192.168.43.92:8084/EA/'; 


  //live 
  // baseUrl = 'http://59.144.137.134/EA/'; 

  //Rajesh
  // baseUrl = 'http://172.16.8.196:8084/EA/';  
  baseUrl = 'http://172.16.8.146:8080/EA/';  

  //oracle live
  //  baseUrl = 'https://enterprisealert.ducont.com:8080/EA/';

  // scheduleUrl = 'http://enterprisealert.ducont.com:8080/scheduler/';
  //sql database
  // baseUrl="http://enterprisealert.ducont.com:8080/EASQL/"
  actatorUrl="http://enterprisealert.ducont.com:8080/EASQL/"
  // scheduleUrl = 'http://172.16.8.164:8085/scheduler/';
  scheduleUrl = 'http://enterprisealert.ducont.com:8080/scheduler/';
// 
  // analyticsUrl = 'http://enterprisealert.ducont.com:84/callback?code=';
  analyticsUrl = 'http://192.168.0.109:4200/callback?code=';


  get(entity, data) {

    return this.http.get(this.baseUrl + entity, data)
      .pipe(

        catchError(this.handleError)
      );
  }
  post(entity, data) {

    return this.http.post(this.baseUrl + entity, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  // callScheduler(entity, data) {

  //   return this.http.post(this.scheduleUrl + entity, data)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }


  getSurvey(entity, data) {
    return this.http.get("http://13.127.150.8:8080/survey/" + entity, data)
      .pipe(

        catchError(this.handleError)
      );
  }

  postSurvey(entity, data) {
    return this.http.post("http://13.127.150.8:8080/survey/" + entity, data)
      .pipe(

        catchError(this.handleError)
      );
  }



  chatGet(entity, data) {
    return this.http.get("https://chat.fieldpower.com/" + entity, data)
      .pipe(

        catchError(this.handleError)
      );
  }

  put(entity, data) {

    return this.http.post("https://chat.fieldpower.com/" + entity, data)
      .pipe(

        catchError(this.handleError)
      );
  }

  patch(entity, data) {

    return this.http.patch("https://chat.fieldpower.com/" + entity, data)
      .pipe(

        catchError(this.handleError)
      );
  }
  delete(entity, data) {

    return this.http.delete(this.baseUrl + entity, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  uploadFile(entity, file) {

    return this.http.post(this.baseUrl + entity, file)
  }
  downloadFile(entity, data) {
    return this.http.post(this.baseUrl + entity, data, { responseType: 'blob' })

  }
  checkBlock(url, obj) {
    // this.common.showLoading();
    return new Promise((resolve, reject) => {

      this.post(url, obj).subscribe((succ: any) => {
        console.log(succ);

        if (succ.code == 200) {
          let obj = {
            msg: succ.message,
            valid: true,
          }
          // return obj;
          resolve(obj);

        } else {
          let obj = {
            msg: succ.message,
            valid: false,
          }
          // return obj;
          resolve(obj);


        }

      }, err => {
        reject(obj)
        console.log(err + "err")
      })
    });
  }
  getActatorData(entity) {
    return this.http.get(this.baseUrl + entity)
      .pipe(

        catchError(this.handleError)
      );
  }
  getAlertEngineActatorData(entity) {
    return this.http.get(this.scheduleUrl + entity)
      .pipe(

        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse) {
    console.log("error");
    return throwError(error);
  }


}

