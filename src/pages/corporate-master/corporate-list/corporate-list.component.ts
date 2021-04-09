import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-corporate-list',
  templateUrl: './corporate-list.component.html',
  styleUrls: ['./corporate-list.component.css']
})
export class CorporateListComponent implements OnInit, OnDestroy  {

  isScroll: boolean;
  user: any = {};
  listCorporate: any = [];
  selectedUser: any;
  reqObj = {
    "searchText": "",
    "noOfRecords": 10,
    "pageIndex": 1,

  }
  constructor(private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser()


  }

  ngOnInit() {
    myMethod();
    selectSearchMethod();

    console.log(this.reqObj)
    this.common.showLoading()
    this.apiService.post(this.constantsService.listCorporate, this.reqObj).subscribe((succ: any) => {
      console.log(succ)
      this.common.hideLoading()
      // if(this.isScroll){
      //   this.listCorporate=this.listCorporate.concat(succ.data.corporateList);
      //   // this.isScroll=false;
      // }else{
      //   this.listCorporate = succ.data.corporateList;

      // }

      if(this.isScroll){
        if(succ.message == null)
      {
      this.isScroll = false;
      }
      else{
        this.listCorporate=this.listCorporate.concat(succ.data.corporateList);
      
      }
        // this.isScroll=false;
      }else{
        this.listCorporate = succ.data.corporateList ? succ.data.corporateList : [];

      }
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip({
          trigger:'hover'
        });
      }, 3000);


    }, err => {
      this.common.hideLoading()

      console.log(err + "err")
    }
    )

  }
  addCorporate(){

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
    this.isScroll = true;
    var CorpId = {  };
    this.common.setEditCorporate(CorpId)

    this.router.navigateByUrl('/home/corporate-master/corporate');

  }

  ngOnDestroy() {

    this.reqObj = {
      "searchText": "",
      "noOfRecords": 10,
      "pageIndex": 1,
    }
  }


  goEditListCorporate(id:any){

    var CorpId = { "id": id };
    this.common.setEditCorporate(CorpId)
    console.log(this.common.getEditCorporate() + "easy 2.1")
    this.router.navigateByUrl('/home/corporate-master/corporate');

  }

  showModal(user) {
    // let data={}
    // =\
    $('#userModal').modal('show')

    this.selectedUser = user;
  }


  deleteUser() {
    this.common.showLoading()

    this.apiService.post(this.constantsService.deleteCorporate, { corporateId: this.selectedUser.corporateId }).subscribe((succ: any) => {
      console.log(succ);
      $('#userModal').modal('hide')

      this.common.hideLoading();
      if (succ.code == 200) {
        this.common.showSuccessMessage(succ.message);

        this.ngOnInit();
      }
      else {
        this.common.showErrorMessage(succ.message);
      }

    }, err => {
      $('#userModal').modal('hide')

      this.common.hideLoading();
      console.log(err + "err")
    });
  }
  onScroll() {
    console.log("onscroll");
    ++this.reqObj.pageIndex;
    this.isScroll = true;
    this.ngOnInit();
  }
  changeSearch() {
    this.reqObj.pageIndex = 1;
    this.isScroll = false;
    this.ngOnInit();
    console.log(event);
  }
  

}

