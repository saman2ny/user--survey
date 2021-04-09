import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
declare var $: any;
import * as _ from 'lodash';


@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.component.html',
  styleUrls: ['./chat-users-list.component.css']
})
export class ChatUsersListComponent implements OnInit {
  user: any = {};
  listChatUsers: any = [];
  listChatUsersDetails: any = []
  orgId: any;
  chatters: any = {

  }
  convo_id: any = {};
  chatList: boolean = true
  DeleteList: boolean = true
  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
      this.user = this.common.getUser();   
      this.apiService.post(this.constantsService.getCompanyDetailsById, {}).subscribe((succ: any) => {
        console.log(succ);
        this.common.hideLoading() 
  
        if (succ.code == 200) {
          this.common.showSuccessMessage(succ.message);
           this.orgId = succ.data.chatOrgId  
           this.chatUserList()
        }
        else {
          this.common.showErrorMessage(succ.message)  
        }  
      },
        err => {
          this.common.hideLoading()  
      });     
   
  }



  chatUserList()
  {
    let chatUsers =  { 
      "UserID"  :this.user.userId,
      "OrgID" : this.orgId                         
   }

   this.common.setHeaderschat(chatUsers);


this.apiService.chatGet(this.constantsService.listChatUserss, chatUsers).subscribe((succ: any) => {
  console.log(succ, 'succ') 

  this.listChatUsers = succ.user;

  // this.conversationUser()

console.log(this.listChatUsers, 'succ') 
}, err => {
console.log(err + "err")
})
  }


  conversationUser(company){


    let chatUsers =  { 
                        // "Authorization"  : "Duc0123",                          
                        "UserID"  :company.email,
                        "OrgID" : this.orgId,
                     }

                     this.common.setHeaderschat(chatUsers);

                     this.apiService.chatGet("conversations.json/", chatUsers).subscribe((succ: any) => {
                       console.log(succ, "userLsitss")
                       if(!_.isEmpty(succ.data))
                       {
                      this.convo_id  = succ.data[0].conversation_id
                      this.chatters.receiver_id  = succ.data[0].receiver_id
                      this.getallDatas()

                       }
                       else{
                        //  alert("pool")
                         this.convo_id  = " "
                         this.chatters.receiver_id  = company.email
                         this.getallDatas()
                       }

                    }, err => {
                      console.log(err + "err")
                    })

  }

  getallDatas()
  {

    
    let chatUserss =  { 
      // "Authorization"  : "Duc0123",                          
      "UserID"  :this.user.userId,
      "OrgID" : this.orgId,
      "convo_id": this.convo_id,

   }
   console.log(JSON.stringify(chatUserss) + "chatUserschatUsers")
      console.log(chatUserss['convo_id'], "convo_id")
      let convo_id = chatUserss['convo_id']
      let urlCheck = "conversations/"+convo_id+"/"
      console.log(urlCheck, "urlCheck")
    this.apiService.chatGet(urlCheck, chatUserss).subscribe((succ: any) => {
      this.listChatUsersDetails = succ.data;
      console.log(this.listChatUsersDetails, 'succ') 
    }, err => {
      console.log(err + "err")
    })
  }

  goModalChat(company)
  {
      $("#userModal").modal('show')
      this.DeleteList = true
      this.chatList = false
      // company
    //   let companyy = {"company": company}
    //  var comp =  this.common.setcompanychat(companyy);
    //  console.log(comp, "compsss")

      this.conversationUser(company)
      // this.chatters.receiver_id  = company.email
      console.log(company, "companycompanycompanycompany")   
      console.log(this.chatters.receiver_id, "receiver_id")   


  }
  DeleteModal(company)
  {
    $("#userModal").modal('show')
    this.DeleteList = false
    this.chatList = true
    // this.deleteEntrieConvo(company)

    console.log(company.email, "delecompanyhittehit")

     this.chatters.email = company.email
     this.conversationUser(company)

  }

  deleteEntrieConvo()
  {
console.log(this.convo_id, "convo")
    console.log(this.chatters.email, "deletehit")
    // this.common.getcompanychat()
    let chatUsers =  { 
      // "Authorization"  : "Duc0123",                          
      "UserID"  :this.chatters.email,
      "OrgID" : this.orgId,
      "convo_id": this.convo_id,
      "delfor": 2
   }


   console.log(JSON.stringify(chatUsers) + "chatUserschatUsers")
   console.log(chatUsers['convo_id'], "convo_id")
   let convo_id = chatUsers['convo_id']
   let urlCheck = "personal_messages/"+convo_id+"/"
   console.log(urlCheck, "urlCheck")

   this.common.setHeaderschat(chatUsers);
    this.apiService.patch(urlCheck, chatUsers).subscribe((succ: any) => {
      this.listChatUsersDetails = succ.data;
      console.log(this.listChatUsersDetails, 'succ') 
    }, err => {
      console.log(err + "err")
    })
    this.ngOnInit()
  }
  chatEnter()
  {
    this.common.showLoading()
    if(this.chatters.new != "")
    {


          this.chatters = 
          {
            "receiver_id": this.chatters.receiver_id, 
          "personal_message": {"body": this.chatters.new}
        }
    
console.log(this.chatters, "newChatr")   
   this.apiService.put(this.constantsService.personal_messagess, this.chatters).subscribe((succ: any) => {
     if(succ.status == 200)
     {
       this.convo_id = succ.conversation_id
       this.common.hideLoading()
     }
     this.common.hideLoading()

        this.getallDatas()

      }, err => {
        console.log(err + "err")
        this.common.hideLoading()

      })
    }

  
  }
  ngOnInit() {

  
  }

}
