import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConstantsService } from '../service/constants.service';
import { CommonService } from '../service/common.service';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    interval: any;
 
    constructor(public router: Router, public common: CommonService, public constantsService: ConstantsService, public commonService: CommonService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        // add authorization header with basic auth credentials if available

        
        let url = request.url;

       

        if (url.match('/auth/') || url.match('/actuator/')) {
            request = request.clone({
                setHeaders: {
                    "Access-Control-Allow-Origin": '*',
                    "Authorization": "Duc0123"
                    // 'Content-Type': 'multipart/form-data',
                }
            });
        } else if (url.endsWith("/assets/i18n/en.json")){

        }
        else{
            var dec= atob(this.common.getUserDetailEncryption())
            // console.log("dec",dec);
            request = request.clone({
                setHeaders: {
                    "Access-Control-Allow-Origin": '*',
                    "Authorization": "Basic "+this.common.getUserDetailEncryption()
                    // 'Content-Type': 'multipart/form-data',
                }
            });
        }

        if(request.method=="GET"){

        }
        else if (url.endsWith(this.constantsService.login)) {

            let opUserId = request.body.userId;
            let opPassword = this.encryptionOf(request.body.pass);

            request.body.opUserId = opUserId
            request.body.opPassword = opPassword 


            delete  request.body.pass;
            delete  request.body.opUserId

            var loginCred = { "userId": opUserId, "opPassword": opPassword }
            this.commonService.setLogin(loginCred);

           var encr= btoa(opUserId+":"+opPassword)
        //    console.log(encr);
            this.common.setUserDetailEncryption(encr);
            this.clean(request.body)


        }

        else if (url.endsWith(this.constantsService.validateLogin)) {



            let otp = request.body.otp;

            this.clean(request.body)
        }


        else if (url.endsWith(this.constantsService.changePasswordSubmit)) {

            let pass = this.encryptionOf(request.body.pass);
            let new_password = this.encryptionOf(request.body.newPassword);
            let confirm_newPassword = this.encryptionOf(request.body.confirmNewPassword);

            request.body.opPassword = pass
            request.body.newPassword = new_password
            request.body.confirmNewPassword = confirm_newPassword
            let user = this.commonService.getUser()

            request.body.sessionId = user.sessionId
            request.body.userId = user.userId
            request.body.companyId = user.companyId
            request.body.corporateId = user.corporateId
            request.body.branchId = user.data.branchId

            this.clean(request.body)
            
            // this.router.navigateByUrl('/');


        }

        else if (url.endsWith(this.constantsService.forgot)) {

            let opEmailId = request.body.opEmailId;
            // let url = this.router.url +'/ForgotPassword';
            request.body.opEmailId = opEmailId
            // url =  url 
            this.clean(request.body)
            



        }

        else if (
            // url.endsWith("https://chat.fieldpower.com/conversations.json/") || url.endsWith("https://chat.fieldpower.com/conversations/149/") || url.endsWith("https://chat.fieldpower.com/personal_messages") || url.endsWith("https://chat.fieldpower.com/personal_messages/149/") || url.endsWith("https://chat.fieldpower.com/DucontMessenger/users.json") 
            url.startsWith("https://chat.fieldpower.com/")
        ) {

            


            var data = this.common.getHeaderschat()
            
            
            let UserID = data.UserID
            let OrgID = data.OrgID

            request = request.clone({
                setHeaders: {
                    "UserID": UserID,
                    "OrgID": OrgID
                }
            });

            this.clean(request.body)
            



        }







        else if (url.endsWith(this.constantsService.ForgotPasswordV2)) {
            let newPasswords = this.encryptionOf(request.body.newPassword);
            let confirmNewPasswords = this.encryptionOf(request.body.confirmNewPassword);
            let token = request.body.token;


            request.body.newPassword = newPasswords
            request.body.confirmNewPassword = confirmNewPasswords
            request.body.token = token
            // url =  url 

            this.clean(request.body)
            


        }


        else if (url.endsWith(this.constantsService.listBranchDup)) {
  
            let user = this.commonService.getUser()
            request.body.sessionId = user.sessionId
            request.body.userId = user.userId

            // this.clean(request.body.companyId)
            // this.clean(request.body.corporateId)
    


        }

        
        else if (url.endsWith(this.constantsService.addOperator)) {
  
            let user = this.commonService.getUser()
            

            let operator = this.commonService.getOperator()
           
            if( user.data.userGroupName === 'Super Admin' || user.data.userGroupName === 'Super User'){
                if(operator.userGroupName != 'Super Admin'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                }else{
                   
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId
                    request.body.corporateId = user.corporateId
                    request.body.branchId = user.data.branchId
                    

                }
             
            }else{
                if(user.data.userGroupName === 'Company'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId

                    if(operator.userGroupName === 'Branch')
                    {
                        request.body.sessionId = user.sessionId
                        request.body.userId = user.userId
                        // request.body.branchId = user.data.branchId

                    }
                }
                else{
                request.body.sessionId = user.sessionId
                request.body.userId = user.userId
                request.body.companyId = user.companyId
                request.body.corporateId = user.corporateId
                request.body.branchId = user.data.branchId
                }
            }


        }


        else if (url.endsWith(this.constantsService.getActiveGroupList)) {
  
            let user = this.commonService.getUser()
            

            if( user.data.userGroupName === 'Super Admin' || user.data.userGroupName === 'Super User'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                }else{
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId
                    request.body.corporateId = user.corporateId
                    request.body.branchId = user.data.branchId
                }
          


        }


        else if (url.endsWith(this.constantsService.editOperator)) {
  
            let user = this.commonService.getUser()
            

            let operator = this.commonService.getOperator()
            
            
            if( user.data.userGroupName === 'Super Admin' || user.data.userGroupName === 'Super User'){
                if(operator.userGroupName != 'Super Admin'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                }else{
                   
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId
                    request.body.corporateId = user.corporateId
                    request.body.branchId = user.data.branchId
                    

                }
             
            }else
            {
                if(user.data.userGroupName === 'Company'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId

                    if(operator.userGroupName === 'Branch')
                    {
                        request.body.sessionId = user.sessionId
                        request.body.userId = user.userId
                        // request.body.branchId = user.data.branchId

                    }
                }
                else{
                request.body.sessionId = user.sessionId
                request.body.userId = user.userId
                request.body.companyId = user.companyId
                request.body.corporateId = user.corporateId
                request.body.branchId = user.data.branchId
                }
            }
          

           
    


        }



        else if (url.endsWith(this.constantsService.customerRegistration) || url.endsWith(this.constantsService.updateCustomer) || url.endsWith(this.constantsService.updateSubUnSub)) {
  
            let user = this.commonService.getUser()
            

            let operator = this.commonService.getCustomer()
            
            
            if( user.data.userGroupName === 'Super Admin' || user.data.userGroupName === 'Super User'){
                if(operator.userGroupName != 'Super Admin'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                }else{
                   
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId
                    request.body.corporateId = user.corporateId
                    request.body.branchId = user.data.branchId
                    

                }
             
            }else
            {
                if(user.data.userGroupName === 'Company'){
                    request.body.sessionId = user.sessionId
                    request.body.userId = user.userId
                    request.body.companyId = user.companyId

                    if(operator.userGroupName === 'Branch')
                    {
                        request.body.sessionId = user.sessionId
                        request.body.userId = user.userId
                        // request.body.branchId = user.data.branchId

                    }
                }
                else{
                request.body.sessionId = user.sessionId
                request.body.userId = user.userId
                request.body.companyId = user.companyId
                request.body.corporateId = user.corporateId
                request.body.branchId = user.data.branchId
                }
            }
          

           
    


        }
        else if (url.endsWith("/assets/i18n/en.json")){

        }
        else if (url.endsWith("/pushToken")){

        }
        else if(url.endsWith("/openid-configuration")){
             
        }
        else {

            let user = this.commonService.getUser()
            request.body.sessionId = user.sessionId
            request.body.userId = user.userId
            request.body.companyId = user.companyId
            request.body.corporateId = user.corporateId
            request.body.branchId = user.data.branchId


        }
        

        return next.handle(request).pipe(
            // We use the map operator to change the data from the response
            map(resp => {
                // Several HTTP events go through that Observable 
                // so we make sure that this is a HTTP response
                if (resp instanceof HttpResponse) {
                    // Just like for request, we create a clone of the response
                    // and make changes to it, then return that clone     
                    
                    if (resp.body.code == 408) {
                        // if (this.interval) {
                        //     clearInterval(this.interval);
                        // }
                        this.commonService.showErrorMessage(resp.body.message);
                        this.commonService.logout(resp.body);
                        // location.reload();
                        return;
                    }
                    let url = resp.url;
                    if (url.endsWith(this.constantsService.login) || url.endsWith(this.constantsService.validateLogin)) {
                        if (resp.body.code == 200) {
                            this.common.sessionValidMinutes = resp.body.data.sessionValidMinutes * 60000;
                            // this.common.sessionValidMinutes = 10000;
                            
                        }
                    } else {
                        
                        // if (this.interval) {
                        //     clearInterval(this.interval);
                        // }

                        // this.interval = setInterval(() => {
                        //     // alert("session logout");
                        //     this.commonService.showErrorMessage("session time out");
                        //     this.commonService.logout(resp.body);
                       
                        //     clearInterval(this.interval);
                        // }, this.common.sessionValidMinutes)
                    }

                    return resp.clone();
                }
            }))

    }

    encryptionOf(msg) {
        var encrptMsg = '';
        var i;
        var j;
        var EN_FROM_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", "#", "$", "-", "+", "_", ".", "@", "&", "!"];
        var EN_TO_KEYS = ["p", "q", "r", "s", "t", "k", "l", "m", "n", "o", "a", "b", "c", "d", "e", "u", "v", "w", "x", "y", "z", "f", "g", "h", "i", "j", "H", "I", "J", "K", "L", "M", "X", "Y", "Z", "E", "F", "G", "N", "O", "P", "Q", "R", "A", "B", "C", "D", "S", "T", "U", "V", "W", "9", "6", "1", "7", "8", "2", "0", "4", "5", "=", "3", ".", "!", "-", "@", "_", "$", "#", "+", "&"];
        for (i = 0; i < msg.length; i++) {
            var ch = msg.charAt(i);
            for (j = 0; j < EN_FROM_KEYS.length; j++)
                if (ch == EN_FROM_KEYS[j]) {
                    ch = EN_TO_KEYS[j];
                    break;
                }
            encrptMsg += ch;
        }
        encrptMsg = this.makeid() + encrptMsg + this.makeid();
        return encrptMsg;
    }



    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    clean(obj) {
        for (var propName in obj) {

            if (obj[propName] === null || obj[propName] === "" || obj[propName] === undefined || obj[propName] === 0) {
                delete obj[propName];
            }
        }
        return obj
    }



}