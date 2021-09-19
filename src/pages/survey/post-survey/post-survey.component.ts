import { Component, OnInit, OnDestroy, ElementRef, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { ColorEvent } from 'ngx-color';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import * as jsonLogic from 'json-logic-js/logic.js'
import * as _ from 'lodash';


import { Font } from 'ngx-font-picker';
import { keyboard } from '@amcharts/amcharts4/core';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { filter, map, take,  publish} from 'rxjs/operators';
import { DataSaveCheck } from 'src/models/data-save-check';





declare var $: any;
declare function myMethod(): any;
declare function selectSearchMethod(): any;

@Component({
  selector: 'app-post-survey',
  templateUrl: './post-survey.component.html',
  styleUrls: ['./post-survey.component.css']
})
export class PostSurveyComponent implements OnInit {
  survey: FormGroup;
  checkOne: boolean = true;
  checkTwo: boolean = false;

  val: number;
  // salMax = 10;

  isConfigForm: FormGroup
  surveyNameForm: FormGroup

  displayModelForm: FormGroup
  skipModelForm: FormGroup

  MultipleChoiceModelForm: FormGroup

  surveyForm: FormGroup


  configObjModel: any = {

  }
  ConfigObj: any = {
    isActiveConfig: true,

  }
  QuesObj: any = {
    isActiveQues: false,

  }

  QuesTionDetailObj: any = {
    isQuestionTabDetails: true,
    isOptionTab: false,
    isLogicTab: false,

  }




  disableConfig: boolean
  disableQues: boolean
  hexColorBackground: String;
  hexColorQuestions: String;
  hexColorAnswers: String;
  hexColorButton: String;

  red: String = '#d2c4ff';
  Questions: String = "#000000";
  Answers: String = "#000000";
  reqObj: any = {

  }

  state = {
    h: 150,
    s: 0.50,
    l: 0.20,
    a: 1,
  };
  questionId: any = {

  }
  pushdisplayLogic: any[];
  showOpinion: boolean;
  showMcq: boolean;
  showRating: boolean;
  showText: boolean;
  showEmail: boolean;
  showPictureChoice: boolean;
  showYesorNo: boolean;
  showNumberInput: boolean;
  showMessage: boolean;
  showDate: boolean;
  showWebsite: boolean;
  questions = []
  getDisplayLogic: any = [];
  getSkipLogic: any = [];
  shoModelName: any = {

  };

  public font: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });
  uploadFiles: any = [];
  mainConfigChecker: boolean = false;
  surveyTypes: any = [];
  surveyConfig: any = [];
  user: any = {};
  displayModelFormList: any = [];
  skipModelFormList: any = []
  questionTypeDisplay: any = {};
  opinionScaleCount: any = [];
  listQuestionTypes: any = [];
  questionTypeDisplayLogics: any = [];
  questionTypeDisplayLogicsSkip: any = [];
  finalQuestionTypePush: any = [];
  one: any;
  two: any;
  objDemo: {};
  questionTypeDisplayLogicsDemo: any[];

  // Yes or No visible
  thumbsVisible: boolean = true
  RightOrWrongVisible: boolean = false
  // visibleRatingssss
  starVisible: boolean = true;
  thumbsUpVisible: boolean = false;
  crownVisible: boolean = false;
  boltVisible: boolean = false;
  userIconVisible: boolean = false;
  ChoicesModelFormList: any = [];
  quesTypeIdObj: any = {};
  startTyping: any = {};
  changeRequiredObj:any ={};
  startTypeDisplay: boolean = false;
  questionTypeNumberIdDisplay: any = {};
  quesOrder: any = {};
  listSurveyy: any = [];
  listquesOrderAsc: any = [];
  listquesIdAsc: any = [];
  quesOrderBeta: any = {};
  quesIdObj: any;
  surveyIdObj: any;
  isPrev: boolean = true;
  edit: any;
  Edit: boolean = false;
  showOrHide: any;
  listquesOrderAscEdit: any
  addQuestionChecker: boolean;
  indexRange: any;
  // public sizeSelect: boolean = true;
  // public styleSelect: boolean = true;
  options: any = {}
  titleName: any
  quesTypeIdDetails: any = [];
  questionTypeDisplayLogicsDemo5: any = [];
  questionTypeDisplayLogicsDemo4: any = [];
  questionTypeDisplayLogicsDemo3: any = [];
  questionTypeDisplayLogicsDemo2: any = [];
  questionTypeDisplayLogicsDemo1: any = [];
  str3: any = [];
  placeIdPro: any = 0;
  placeId: any = {

  }
  listquesOrderAscOderCheck: any = [];
  showSelectTag: boolean = true;
  showInputTag: boolean = true;
  questionNameShow: any = [];
  quesTpeNameForEditobj: {};
  listquesOrderAscWithName: any = [];
  checkFocus: boolean;
  allQuestion: any = [];
  displayQuestion: any = [];
  skipQuestion: any = [];
  orderIdObj: any;
  currentOrderIdObj: any = {};
  displayLogics: any[] = [];
  displayLogicsSkip: any[] = [];
  displayLogicsDynamic: any[] = [];
  displayLogicsDynamicSkip: any[] = [];
  showDisplayDropdown: boolean = false;
  showDisplayTextField: boolean = false;
  curretAnwserObj: any = {};
  answerIdObj: any = 0;
  ansList: any;
  answerListId: any = [];
  answerListIdSkip: any = [];
  curretAnwserIdObj: any = {};
  getDisplayLabelAnswer: string;
  answerListPush: any = [];
  answerListPushSkip: any = [];
  answerListPushFinal: any[] = [];
  answerListPushFinalSkip: any[] = [];
  answerListPushFinalDynamic: any[] = [];
  answerListPushFinalDynamicSkip: any[] = [];
  answerListQueue: any = [];
  answerListQueueSkip: any = [];
  quesGroupPush: any = [];
  quesGroupPushSkip: any = [];
  getDisplayLabelQuestion: any;
  getDisplayLabelQuestionSkip: any;
  displayLogicValue: any = [];
  getDisplayLabelQuestionCheck: any = {};
  getDisplayAnswerLast: any;
  quesTypeIdDetailsEdit: any = [];
  displayLogicsEdit: any = [];
  comparatorDynamic: any;
  MCQValues: any;
  PictureChoiceValues: any;
  PostEdit: boolean;
  getDisplayLabelFinalAnswer: any;
  displayLogicDynamicValue: any = [];
  dynamicDisplayFramepush: any = [];
  getDisplayLabelQuestionDynamic: any;
  getDisplayLabelAnswerDynamic: any;
  getDisplayAnswerLastDynamic: any;
  displayLogicEditValues: any;
  myVariable: any = {};
  myquesIdVariable: any = {};
  myquesTextVariable: any = {};
  mydataVariable: any = {};
  DisplayLogicValues: any;
  myDynamicDisplayoficalInitial: any[] = [];
  myDynamicDisplayoficalInitialSkip: any[] = [];
  myDynamicDisplayquesIdInitial: any[] = [];
  myDynamicDisplayquesIdInitialSkip: any[] = [];
  myDynamicDisplaydataInitial: any[] = [];
  myDynamicDisplaydataInitialSkip: any[] = [];
  myDynamicDisplayquesTextInitial: any[] = [];
  myDynamicDisplayquesTextInitialSkip: any[] = [];
  quesTypeIdDetailsSkip: any;
  quesTypeIdDetailsSkipTo: any;
  myquesIdVariableSkip: any ={};
  myquesTextVariableSkip: any ={};
  SkipTo: any ={};
  mydataVariableSkip: any ={};
  dynamicDisplayFramepushSkip: any = [];
  skipLogicValue: any;
  LogicStatus: any;
  FinalFrame: any = {};
  diplayLogicCheck: any;
  skipLogicCheck: any;
  questionTypeSkipLogics: any;
  questionTypeSkipLogicsDemo: any;
  pictureObjModel: any = {
    
  };
  ansOrder: any;
  SuccStat: boolean;
  SuccError: boolean;
  getDisplayLabelAnswerDynamicSkip: any;
  questionTypeDisplayDynamicLogicsSkip: any[];
  constructor(private el: ElementRef, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService) {
    this.user = this.common.getUser();

    this.disableConfig = false
    this.disableQues = true

    this.configObjModel.backgroundColor = '#d2c4ff'
    this.configObjModel.Questions = '#d2c4ff'
    this.configObjModel.Answers = '#d2c4ff'
    this.configObjModel.hexColorButton = '#d2c4ff'
    
    this.configObjModel.mainConfig = false


    this.configObjModel.progressBar = false
    this.configObjModel.questionNumber = false
    var opinonLengthValue = 10
    this.showOpinionScale(opinonLengthValue);
    this.showQuestionTypeList()


  }


  showQuestionTypeList() {


    this.apiService.getSurvey(this.constantsService.fetchQuestionType, {}).subscribe((succ: any) => {
      console.log(succ, "listQuestion")


      this.listQuestionTypes = succ


    }, err => {
      this.common.hideLoading()


    })


  }
  showOpinionScale(opinonLengthValue) {

    let arrPush = []
    for (var i = 1; i < opinonLengthValue; i++) {
      let obj = {}
      obj['value'] = i;
      arrPush.push(obj);
    }
    console.log(arrPush, "arrPush")
    this.opinionScaleCount = arrPush
  }


  questionTypeCheck(quesTypeId, e) {
    this.common.showLoading()
    this.placeId = ++this.placeIdPro
    console.log(this.placeId, "this.placeId")

    this.questionTypeNumberIdDisplay = JSON.stringify(quesTypeId)
    if (!_.isEmpty(this.questionTypeDisplay)) {
      this.startTypeDisplay = true
    }
    console.log(this.listQuestionTypes, "this.listQuestionTypes")
    console.log(this.listQuestionTypes.length, "this.listQuestionTypes.length")

    for (var i = 0; i < this.listQuestionTypes.length; i++) {
      if (quesTypeId === this.listQuestionTypes[i].quesTypeId) {
        this.quesTypeIdObj = quesTypeId

        this.questionTypeDisplayLogics = []
        let aaa = JSON.parse(this.listQuestionTypes[i].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayLogics.push(aaa)
      }
    }


    this.questionTypeDisplayLogicsDemo = this.questionTypeDisplayLogics[0]

    console.log(this.questionTypeDisplayLogicsDemo, "this.finalQuestionTypePush")
    // var quesTypeIdObj =this.quesTypeIdObj
    var seconds = new Date().getTime() / 1000;
    this.quesOrder = Math.round(seconds)

    var quesOrderBetaFrame = { "OrderId": this.quesOrder, "quesTypeId": this.quesTypeIdObj }
    // this.quesOrderBeta =[]
    this.quesOrderBeta = quesOrderBetaFrame
    this.startTyping.value = ""
    this.quesIdObj = 0
    this.addQuestionChecker = true
    // this.SubmitQuestion()

    console.log( this.survey.controls.sections['controls'].length, "lenght");
      var join  = 0

    $('#accordion' ).collapse('hide');


    this.SubmitQuestion()

  }




  initSection(maybe, oneAfterOtherQuestion) {
    return new FormGroup({
      questionTypeHeader: new FormControl(maybe.quesName),
      questionTitleHeader: new FormControl(maybe.quesText),
      questions: new FormArray([
        this.initQuestion(maybe, oneAfterOtherQuestion)
      ])
    });
  }

  initMcq() {
    if (!_.isEmpty(this.MCQValues)) {
      return new FormGroup({
        choicesType: new FormControl(this.MCQValues.ansText),
        ansId: new FormControl(this.MCQValues.ansId),
        allStatus: new FormControl(this.MCQValues)
      });
    } else {
      return new FormGroup({
        choicesType: new FormControl(""),
        ansId: new FormControl(""),
        allStatus: new FormControl()

      });
    }

  }

  initPictureChoice() {
    if (!_.isEmpty(this.PictureChoiceValues)) {
      return new FormGroup({
        pictureType: new FormControl(this.PictureChoiceValues.ansText),
        pictureImage:new FormControl(this.PictureChoiceValues.ansText),
        ansId: new FormControl(this.PictureChoiceValues.ansId),
        allStatus: new FormControl(this.PictureChoiceValues)
      });
    } else {
      return new FormGroup({
        pictureType: new FormControl(""),
        pictureImage: new FormControl(""),
        ansId: new FormControl(""),
        allStatus: new FormControl()

      });
    }

  }


  initdisplayLogic() {

    return new FormGroup({
      pickMultipleDisplayLogicType: new FormControl("OR"),
      pickMultipleDisplayQuestion: new FormControl(''),
      dynamicdisplaylogiclogicaltype: new FormControl(''),
      pickMultipleLabelChangeForAnswer: new FormControl(''),
      pickMultipleDisplayAnswer: new FormControl(''),
      pickMultipleCheckDisplayId: new FormControl(''),

    });


  }
  initskipLogic() {
    return new FormGroup({
      pickMultipleDisplayLogicTypeSkip: new FormControl("OR"),
      pickMultipleDisplayQuestionSkip: new FormControl(''),
      pickMultipleDisplayQuestionLogicTypeSkip: new FormControl(''),
      pickMultipleLabelChangeForAnswerSkip: new FormControl(''),
      pickMultipleDisplayAnswerSkip: new FormControl(''),
      pickMultipleCheckDisplayIdSkip: new FormControl(''),
    });
  }

  initQuestion(maybe, oneAfterOtherQuestion) {
    this.common.showLoading()
    if (!_.isEmpty(maybe)) {
      return new FormGroup({
        
        questionTitle: new FormControl(maybe.quesText),
        isRequired: new FormControl(maybe.changeRequiredObj),
        orderId: new FormControl(maybe.quesOrder),
        surveyId: new FormControl(maybe.surveyId),
        questionTypeId: new FormControl(maybe.quesTypeId),
        questionId: new FormControl(maybe.quesId),
        questionType: new FormControl(oneAfterOtherQuestion),
        options: new FormArray([
          // this.initMcq()
        ]),
        pictureChoices: new FormArray([
          // this.initMcq()
        ]),
        pickDisplayQuestion: new FormControl(''),
        pickDisplayLogicType: new FormControl(),
        pickDisplayAnswerDropDown: new FormControl(''),
        checkDisplayId: new FormControl(''),
        pickDisplayLabelLogicTypeForAnswer: new FormControl(''),
        displayLogic: new FormArray([
          // this.initdisplayLogic()
        ]),
        pickDisplayQuestionSkip: new FormControl(),
        pickDisplayLogicTypeSkip: new FormControl(),
        SkipTo: new FormControl(),
        pickDisplayAnswerDropDownSkip: new FormControl(''),
        checkDisplayIdSkip: new FormControl(''),
        pickDisplayLabelLogicTypeForAnswerSkip: new FormControl(''),
        skipLogic: new FormArray([
          // this.initskipLogic()
        ]),
      });
    } else {
      return new FormGroup({
        questionTitle: new FormControl(''),
        orderId: new FormControl(''),
        questionTag: new FormControl(''),
        questionType: new FormControl(''),
        // options: new FormArray([
        //   this.initOptions()
        // ])
      });
    }
    this.common.hideLoading()


  }


  getSections(form) {
    // var total  = form.value.sections.length
    return form.controls.sections.controls;
  }

  getQuestions(form) {
    // console.log(form, "form");
    // console.log(form.controls.questions.controls, "dee");
    return form.controls.questions.controls;
  }

  getChoices(form) {
    //console.log(form.get('options').controls);
    return form.controls.options.controls;
  }
  getPictureChoices(form) {
    //console.log(form.get('options').controls);
    return form.controls.pictureChoices.controls;
  }
  getDisplayLogicArray(form) {
    //console.log(form.get('options').controls);
    return form.controls.displayLogic.controls;
  }

  getSkipLogicArray(form) {
    //console.log(form.get('options').controls);
    return form.controls.skipLogic.controls;
  }



  addDisplayLogic(i, j) {
    //console.log(k);
    const control = <FormArray>this.survey
      .get("sections")
    ['controls'][i].get("questions")
    ['controls'][j].get("displayLogic");

    control.push(this.initdisplayLogic());


  }

  removeDisplayLogic(i, j, k1) {
    const control = this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.removeAt(k1)

    // const control = <FormArray>(
    //   this.survey.get(["sections", i, "questions", j, "displayLogic"])
    // );
    // control.removeAt(k1);
    control.controls = [];
  }


  addSkipLogic(i, j) {
    //console.log(k);
    const control = <FormArray>this.survey
      .get("sections")
    ['controls'][i].get("questions")
    ['controls'][j].get("skipLogic");

    // const control = <FormArray>this.survey.get(['sections',0,'questions',k,'options']); // also try this new syntax
    //console.log(control);
    control.push(this.initskipLogic());
  }

  removeSkipLogic(i, j, k2) {
    const control = this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.removeAt(k2)

    // const control = <FormArray>(
    //   this.survey.get(["sections", i, "questions", j, "skipLogic"])
    // );
    // control.removeAt(0);
    control.controls = [];
  }


  addChoices(i, j) {
    const control = <FormArray>this.survey
      .get("sections")
    ['controls'][i].get("questions")
    ['controls']['0'].get("options");

    // const control = <FormArray>this.survey.get(['sections',0,'questions',k,'options']); // also try this new syntax
    //console.log(control);

    this.MCQValues = ""
    control.push(this.initMcq());

  }

  addPictureChoices(i, j) {
    const control = <FormArray>this.survey
      .get("sections")
    ['controls'][i].get("questions")
    ['controls']['0'].get("pictureChoices");

    // const control = <FormArray>this.survey.get(['sections',0,'questions',k,'options']); // also try this new syntax
    //console.log(control);

    this.PictureChoiceValues = ""
    control.push(this.initPictureChoice());

  }

  removeChoices(i, j, k, status) {
    const control = this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.options.removeAt(k)
console.log(status, "status")
    // const control = <FormArray>(
    //   this.survey.get(["sections", i, "questions", j, "options"])
    // );
    // control.removeAt(0);
    // control.controls = [];
    this.apiService.postSurvey(this.constantsService.deleteAnswerss, status).subscribe((succ: any) => {
    }, err => {
      this.common.hideLoading();
      console.log(err + "err")
    });

  }


  removePictureChoices(i, j, k3, status) {
    const control = this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.pictureChoices.removeAt(k3)
console.log(status, "status")

    this.apiService.postSurvey(this.constantsService.deleteAnswerss, status).subscribe((succ: any) => {
    }, err => {
      this.common.hideLoading();
      console.log(err + "err")
    });

  }

  deleteQuest(sections, i) {
    this.common.showLoading()
    this.getAllDetailsForEdit(sections, i)
    console.log(sections.value.questions, "sections")
    var j = 0
    var getQues = sections.value.questions[0]
    console.log(getQues, "getQues")
    // this.surveyIdObj= getQues[0].surveyId
    // this.quesTypeIdObj= getQues[0].questionTypeId
    // this.quesIdObj= getQues[0].questionId
    if(getQues.options.length === 0){
      var allStatusPush = []
    }
    for (var c = 0; c < getQues.options.length; c++) {
      var allStatusPush = []
      var allStatus = getQues.options[c].allStatus
      allStatusPush.push(allStatus)
      
    }
    let frame = {
      "ansList": allStatusPush,
      "deleted": 0,
      "displayLogic": JSON.stringify(getQues.displayLogic),
      "quesId": getQues.questionId,
      "quesOrder": getQues.orderId,
      "quesText": getQues.questionTitle,
      "quesTypeId": getQues.questionTypeId,
      "required": 0,
      "skipLogic": JSON.stringify(getQues.skipLogic),
      "surveyId": getQues.surveyId
    }




    this.apiService.postSurvey(this.constantsService.deleteQuestion, frame).subscribe((succ: any) => {

      if(succ.code=== 200){
      const control = <FormArray>(
        this.survey.get("sections")
      );
      control.removeAt(i);
      this.common.hideLoading()

      }


    }, err => {
      this.common.hideLoading();
      this.common.showErrorMessage(err.message)

    });



  }
  addAnswer(indexx, k) {

    var seconds = new Date().getTime() / 1000;
    this.ansOrder = Math.round(seconds);
    let frame = {
      "ansId": this.curretAnwserIdObj,
      "ansOrder": this.ansOrder,
      "ansText": this.curretAnwserObj,
      "quesId": this.quesIdObj,
      "respCount": 0,
      "status": 0,
      "surveyId": this.surveyIdObj
    }

    this.apiService.postSurvey(this.constantsService.addAnswers, frame).subscribe((succ: any) => {

      this.common.hideLoading()
      console.log(succ, "succc")
      const sortedActivities = succ.sort((a, b) => a.quesOrder - b.quesOrder)

      console.log(sortedActivities, "edit order ASC")

      this.SubmitQuestion()
      this.curretAnwserIdObj = succ.ansId
      console.log(this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.options.controls[k].controls.ansId, "chekc")
      return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.options.controls[k].controls.ansId.setValue(this.curretAnwserIdObj) as FormArray;
    },
      err => {
        this.common.hideLoading()

      })
  }


  addAnswerPicture(indexx, k) {

    let frame = {
      "ansId": this.curretAnwserIdObj,
      "ansOrder": 0,
      "ansText": this.curretAnwserObj,
      "quesId": this.quesIdObj,
      "respCount": 0,
      "status": 0,
      "surveyId": this.surveyIdObj
    }

    this.apiService.postSurvey(this.constantsService.addAnswers, frame).subscribe((succ: any) => {

      this.common.hideLoading()
      console.log(succ, "succc")
      this.SubmitQuestion()
      this.curretAnwserIdObj = succ.ansId
      console.log(this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.pictureChoices.controls[k].controls.ansId, "chekc")
      return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.pictureChoices.controls[k].controls.ansId.setValue(this.curretAnwserIdObj) as FormArray;
      
      },
      err => {
        this.common.hideLoading()

      })
  }

  getPicture(event, sections, i, k3) {
    if(event.target.files.length === 0){
      return;
    }
        var file: File = event.target.files[0];
        var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);
    
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          console.log(file, "file")
    
    
    
    
      this.common.convertBase64(file, (result) => {
            this.pictureObjModel = result;
            // this.pictureObjModel.attachmentFile = result;
            // this.pictureObjModel.attach = file.name;
    
            // this.pictureObjModel.attachmentFileName = file.name;
          })
        

          setTimeout(() => {
           this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.pictureChoices.controls[k3].controls.pictureImage.setValue(this.pictureObjModel) as FormArray;

        console.log(this.pictureObjModel, "names")
        var getQues = sections.value.questions
        var getOPt = sections.value.questions[0].pictureChoices
        this.surveyIdObj = getQues[0].surveyId
        this.quesTypeIdObj = getQues[0].questionTypeId
        this.quesIdObj = getQues[0].questionId
        this.quesOrder = getQues[0].orderId
        this.curretAnwserObj = this.pictureObjModel
        if (getOPt[k3].ansId === undefined || getOPt[k3].ansId === null || getOPt[k3].ansId === "" || getOPt[k3].ansId === " " || getOPt[k3].ansId === 0) {
          this.curretAnwserIdObj = 0
        } else {
          this.curretAnwserIdObj = getOPt[k3].ansId
    
        }
        this.addAnswerPicture(i, k3)
      }, 2000);

      }

  }
    getMcQ(event, sections, i, k) {
    console.log(event.target.value, "names")
    var getQues = sections.value.questions
    var getOPt = sections.value.questions[0].options
    this.surveyIdObj = getQues[0].surveyId
    this.quesTypeIdObj = getQues[0].questionTypeId
    this.quesIdObj = getQues[0].questionId
    this.quesOrder = getQues[0].orderId
    this.curretAnwserObj = event.target.value
    if (getOPt[k].ansId === undefined || getOPt[k].ansId === null || getOPt[k].ansId === "" || getOPt[k].ansId === " " || getOPt[k].ansId === 0) {
      this.curretAnwserIdObj = 0
    } else {
      this.curretAnwserIdObj = getOPt[k].ansId

    }
    this.addAnswer(i, k)
    // return this.survey.controls.sections['controls'][i].controls.questionTitleHeader.setValue(this.startTyping.value) as FormArray;
  }

  firstFunction(dl, compartor, quesId, quesText, data, i) {
    setTimeout(() => {

    this.myDynamicDisplayoficalInitial[dl] = compartor
  }, 1000);

    setTimeout(() => {
      this.myDynamicDisplayquesIdInitial[dl] = JSON.parse(quesId)
      this.onDisplayFieldSecondQuestionSecondDynamicChange(quesId, i, dl)

    }, 1000);
    setTimeout(() => {

      this.myDynamicDisplayquesTextInitial[dl] = quesText
      if (this.myDynamicDisplayquesTextInitial[dl] === "Answered" || this.myDynamicDisplayquesTextInitial[dl] === "Not answered" || this.myDynamicDisplayquesTextInitial[dl] === "Is Answered" || this.myDynamicDisplayquesTextInitial[dl] === "Not Answered") {
        this.answerListId = ""
        this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[dl].controls.pickMultipleCheckDisplayId.setValue(this.answerListId) as FormArray

      }
    }, 3000);
    setTimeout(() => {
      if(data === "null" || data === null || data === "" || data === " "){
        this.myDynamicDisplaydataInitial[dl] = null
      }else{
        this.myDynamicDisplaydataInitial[dl] = JSON.parse(data)
      }
        }, 3000);


  }


  skipFunction(dl, compartor, quesId, quesText, data, i) {
    setTimeout(() => {

    this.myDynamicDisplayoficalInitialSkip[dl] = compartor
  }, 1000);

    setTimeout(() => {
      this.myDynamicDisplayquesIdInitialSkip[dl] = JSON.parse(quesId)
      this.onDisplayFieldSecondQuestionSecondDynamicChangeSkip(quesId, i, dl)

    }, 1000);
    setTimeout(() => {

      this.myDynamicDisplayquesTextInitialSkip[dl] = quesText
      if (this.myDynamicDisplayquesTextInitialSkip[dl] === "Answered" || this.myDynamicDisplayquesTextInitialSkip[dl] === "Not answered" || this.myDynamicDisplayquesTextInitialSkip[dl] === "Is Answered" || this.myDynamicDisplayquesTextInitialSkip[dl] === "Not Answered") {
        this.answerListId = ""
        this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[dl].controls.pickMultipleCheckDisplayIdSkip.setValue(this.answerListId) as FormArray

      }

    }, 3000);
    setTimeout(() => {
      

      if(data === "null" || data === null || data === "" || data === " "){
        this.myDynamicDisplaydataInitialSkip[dl] = null
      }else{
        this.myDynamicDisplaydataInitialSkip[dl] = JSON.parse(data)
      }
    }, 3000);


  }

  async getAllDetailsForEdit(sections, i) {
    this.quesTypeIdDetails = []
    this.quesTypeIdDetailsSkip  =[]
    this.quesTypeIdDetailsSkipTo  =[]
    console.log(sections.value.questions, "sections")
    var getQues = sections.value.questions
    this.surveyIdObj = getQues[0].surveyId
    // this.quesTypeIdObj = getQues[0].questionTypeId
    this.quesIdObj = getQues[0].questionId
    this.quesOrder = getQues[0].orderId
    this.startTyping.value = getQues[0].questionTitle
    // alert(i)

    this.quesTypeIdObj = this.allQuestion[i].quesTypeId

// check format
var questionOrder = []
questionOrder.push({"quesOrder" :this.quesOrder})
var intersection = _.intersectionBy(this.allQuestion, questionOrder, 'quesOrder');

console.log(intersection, "intersection");

// for setting up answers
// for setting up answers
// for setting up answers
for (var w = 0; w < intersection.length; w++) {
  if (this.Edit === true) {

    if (intersection[w].quesTypeId === 2) {
      this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.options.clear()
      const sortedMCQActivities = intersection[w].ansList.sort((a, b) => a.ansOrder - b.ansOrder)
      console.log(sortedMCQActivities, "sortedMCQActivities")
      for (var yt = 0; yt < sortedMCQActivities.length; yt++) {
        this.MCQValues = sortedMCQActivities[yt]
        console.log(this.MCQValues, "this.MCQValues")

       

        const control = <FormArray>this.survey.get("sections")['controls'][i].get("questions")['controls']['0'].get("options");
        control.push(this.initMcq());
      }
    }

    if (intersection[w].quesTypeId === 6) {
      this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.pictureChoices.clear()
      for (var yt = 0; yt < intersection[w].ansList.length; yt++) {
        this.PictureChoiceValues = intersection[w].ansList[yt]
        console.log(this.PictureChoiceValues, "this.PictureChoiceValues")
        const control = <FormArray>this.survey.get("sections")['controls'][i].get("questions")['controls']['0'].get("pictureChoices");
        control.push(this.initPictureChoice());




      }

    }

  }
}

// for setting up normal
// for setting up normal
// for setting up normal
// for setting up normal


    for (var w = 0; w < this.allQuestion.length; w++) {
     

      // DisplayLogic Logic
      // DisplayLogic Logic
      // DisplayLogic Logic
      if (this.allQuestion[w].quesOrder < this.quesOrder) {
        if (_.isEmpty(this.allQuestion[w].quesText)) {
          this.allQuestion[w].quesText = "..."
        }

        var frame = { "quesId": this.allQuestion[w].quesId,  "quesOrder": this.allQuestion[w].quesOrder, "answerList": this.allQuestion[w].ansList, "quesText": this.allQuestion[w].quesText, "quesTypeId": this.allQuestion[w].quesTypeId }
        this.quesTypeIdDetails.push(frame)
      }

      // SkipLogic Logic
      // SkipLogic Logic
      // SkipLogic Logic
      if (this.allQuestion[w].quesOrder <= this.quesOrder) {
        if (_.isEmpty(this.allQuestion[w].quesText)) {
          this.allQuestion[w].quesText = "..."
        }

        var frame = { "quesId": this.allQuestion[w].quesId,  "quesOrder": this.allQuestion[w].quesOrder, "answerList": this.allQuestion[w].ansList, "quesText": this.allQuestion[w].quesText, "quesTypeId": this.allQuestion[w].quesTypeId }
        this.quesTypeIdDetailsSkip.push(frame)               
        this.quesTypeIdDetailsSkip = this.quesTypeIdDetailsSkip.sort((a, b) => b.quesOrder - a.quesOrder)
        console.log( this.quesTypeIdDetailsSkip, "edit order DESC")

      }



      // SkipToLogic Logic
      // SkipToLogic Logic
      // SkipToLogic Logic
      if (this.allQuestion[w].quesOrder > this.quesOrder) {
        if (_.isEmpty(this.allQuestion[w].quesText)) {
          this.allQuestion[w].quesText = "..."
        }

        var frame = { "quesId": this.allQuestion[w].quesId,  "quesOrder": this.allQuestion[w].quesOrder, "answerList": this.allQuestion[w].ansList, "quesText": this.allQuestion[w].quesText, "quesTypeId": this.allQuestion[w].quesTypeId }
        this.quesTypeIdDetailsSkipTo.push(frame)               
        this.quesTypeIdDetailsSkipTo = this.quesTypeIdDetailsSkipTo.sort((a, b) => a.quesOrder - b.quesOrder)
        console.log( this.quesTypeIdDetailsSkipTo, "edit order ASC")

      }


    }





    if (this.Edit === true) {

            
      // Dont Touch For common
      // Dont Touch For common
      // Dont Touch For common
      this.diplayLogicCheck= JSON.parse(this.allQuestion[i].displayLogic);
      this.skipLogicCheck = JSON.parse(this.allQuestion[i].skipLogic);

      // DisplayLogic Edit
      // DisplayLogic Edit
      // DisplayLogic Edit
      this.myquesIdVariable = true;
      this.myquesTextVariable = true;
      this.mydataVariable = true;
      this.questionTypeDisplayLogics = []


      let aaa = JSON.parse(this.allQuestion[i].displayLogic);
      this.questionTypeDisplayLogics.push(aaa)
      this.questionTypeDisplayLogicsDemo = this.questionTypeDisplayLogics[0]
      console.log(this.questionTypeDisplayLogicsDemo, "this.questionTypeDisplayLogicsDemo"); // true
      this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.clear()
      for (var dl = 0; dl < this.questionTypeDisplayLogicsDemo.length; dl++) {
        this.myDynamicDisplayoficalInitial[dl] = true
        this.myDynamicDisplayquesIdInitial[dl] = true
        this.myDynamicDisplayquesTextInitial[dl] = true
        this.myDynamicDisplaydataInitial[dl] = true


        if (dl < this.questionTypeDisplayLogicsDemo.length - 1) {

          const compartor = this.questionTypeDisplayLogicsDemo[dl].compartor
          const quesId = this.questionTypeDisplayLogicsDemo[dl].quesId
          const quesText = this.questionTypeDisplayLogicsDemo[dl].logics
          const data = this.questionTypeDisplayLogicsDemo[dl].data

          this.DisplayLogicValues = this.questionTypeDisplayLogicsDemo[dl]
          console.log(this.DisplayLogicValues, "this.DisplayLogicValues")
          const control = <FormArray>this.survey.get("sections")['controls'][i].get("questions")['controls']['0'].get("displayLogic");
          control.push(this.initdisplayLogic());

          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[dl].controls.pickMultipleDisplayLogicType.setValue(compartor) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[dl].controls.pickMultipleDisplayQuestion.setValue(quesId) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[dl].controls.dynamicdisplaylogiclogicaltype.setValue(quesText) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[dl].controls.pickMultipleLabelChangeForAnswer.setValue(quesText) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[dl].controls.pickMultipleDisplayAnswer.setValue(data) as FormArray

          await this.firstFunction(dl, compartor, quesId, quesText, data, i);

        }


        if (dl == this.questionTypeDisplayLogicsDemo.length - 1) {

          //quesId Edit
          //quesId Edit
          //quesId Edit
          const quesId = this.questionTypeDisplayLogicsDemo[dl].quesId
          const quesText = this.questionTypeDisplayLogicsDemo[dl].logics
          const data = this.questionTypeDisplayLogicsDemo[dl].data
          setTimeout(() => {
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayQuestion'].setValue(quesId) as FormArray
            this.myquesIdVariable = JSON.parse(quesId)
            this.onFieldQuestionChangeSecond(quesId, i)
          }, 1000);

          //quesId Edit
          //quesId Edit
          //quesId Edit
          setTimeout(() => {
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLogicType'].setValue(quesText) as FormArray
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswer'].setValue(quesText) as FormArray
            this.myquesTextVariable = quesText
            if (this.myquesTextVariable === "Answered" || this.myquesTextVariable === "Not answered" || this.myquesTextVariable === "Is Answered" || this.myquesTextVariable === "Not Answered") {
              this.answerListId = ""
              this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['checkDisplayId'].setValue(this.answerListId) as FormArray;
  
            }
          }, 2000);

          //quesId Edit
          //quesId Edit
          //quesId Edit
          setTimeout(() => {
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDown'].setValue(data) as FormArray
            if(data === "null" || data === null || data === "" || data === " "){
              this.mydataVariable = null
            }else{
            this.mydataVariable = JSON.parse(data)
            }
          }, 2000);
        }
      }
      // SkipLogic Edit
      // SkipLogic Edit
      // SkipLogic Edit
 

      




      this.myquesIdVariableSkip = true
      this.myquesTextVariableSkip = true;
      this.SkipTo = true;
      this.mydataVariableSkip = true;
      this.questionTypeSkipLogics = []


      let bbb = JSON.parse(this.allQuestion[i].skipLogic);
      this.questionTypeSkipLogics.push(bbb)
      this.questionTypeSkipLogicsDemo = this.questionTypeSkipLogics[0]
      console.log(this.questionTypeSkipLogicsDemo, "this.questionTypeDisplayLogicsDemo"); // true
      this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.clear()
    
      for (var dl = 0; dl < this.questionTypeSkipLogicsDemo.length; dl++) {
        this.myDynamicDisplayoficalInitialSkip[dl] = true
        this.myDynamicDisplayquesIdInitialSkip[dl] = true
        this.myDynamicDisplayquesTextInitialSkip[dl] = true
        this.myDynamicDisplaydataInitialSkip[dl] = true


        if (dl < this.questionTypeSkipLogicsDemo.length - 1) {

          const compartor = this.questionTypeSkipLogicsDemo[dl].compartor
          const quesId = this.questionTypeSkipLogicsDemo[dl].quesId
          const quesText = this.questionTypeSkipLogicsDemo[dl].logics
          const data = this.questionTypeSkipLogicsDemo[dl].data

          this.DisplayLogicValues = this.questionTypeSkipLogicsDemo[dl]
          console.log(this.DisplayLogicValues, "this.DisplayLogicValues")
          const control = <FormArray>this.survey.get("sections")['controls'][i].get("questions")['controls']['0'].get("skipLogic");
          control.push(this.initskipLogic());

          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[dl].controls.pickMultipleDisplayLogicTypeSkip.setValue(compartor) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[dl].controls.pickMultipleDisplayQuestionSkip.setValue(quesId) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[dl].controls.pickMultipleDisplayQuestionLogicTypeSkip.setValue(quesText) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[dl].controls.pickMultipleLabelChangeForAnswerSkip.setValue(quesText) as FormArray
          this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[dl].controls.pickMultipleDisplayAnswerSkip.setValue(data) as FormArray

          await this.skipFunction(dl, compartor, quesId, quesText, data, i);

        }


        if (dl == this.questionTypeSkipLogicsDemo.length - 1) {

          //quesId Edit
          //quesId Edit
          //quesId Edit
          const quesId = this.questionTypeSkipLogicsDemo[dl].quesId
          const quesText = this.questionTypeSkipLogicsDemo[dl].logics
          const skipTo = this.questionTypeSkipLogicsDemo[dl].skipTo
          const data = this.questionTypeSkipLogicsDemo[dl].data
          setTimeout(() => {
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayQuestionSkip'].setValue(quesId) as FormArray
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['SkipTo'].setValue(skipTo) as FormArray
            this.myquesIdVariableSkip = JSON.parse(quesId)
            this.displaySkipLogics(quesId, i)
          }, 1000);

          //quesId Edit
          //quesId Edit
          //quesId Edit
          setTimeout(() => {
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLogicTypeSkip'].setValue(quesText) as FormArray
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswerSkip'].setValue(quesText) as FormArray
            this.myquesTextVariableSkip = quesText
            if (this.myquesTextVariableSkip === "Answered" || this.myquesTextVariableSkip === "Not answered" || this.myquesTextVariableSkip === "Is Answered" || this.myquesTextVariableSkip === "Not Answered") {
              this.answerListId = ""
              this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['checkDisplayIdSkip'].setValue(this.answerListId) as FormArray;
  
            }
          }, 2000);

          //quesId Edit
          //quesId Edit
          //quesId Edit
          setTimeout(() => {
            this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDownSkip'].setValue(data) as FormArray
            if(data === "null" || data === null || data === "" || data === " "){
              this.mydataVariableSkip = null
            }else{
            this.mydataVariableSkip = JSON.parse(data)
            }

          }, 2000);
        }

        
      
		}



    }


    console.log(this.myVariable, "skipLogic")


  }








 


  onFieldQuestionChangeIntial(answer2, indexx) {
    let answer = answer2.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayQuestion'].setValue(answer) as FormArray
    // this.onFieldQuestionChangeSecond(answer, indexx)
    if (answer === "select") {
    this.answerListId = ""
    this.secondDisplayHideType(indexx)
    }else{
      this.onFieldQuestionChangeSecond(answer, indexx)
      this.answerListId = ""
      this.secondDisplayHideType(indexx)
    }
  }

  onFieldQuestionChangeSecond(answer, indexx) {
    const allValues = this.quesTypeIdDetails
    this.answerListQueue = allValues.filter(value => value.quesId === parseInt(answer));
    console.log(this.answerListQueue, "answerListId");
    this.answerListPush = [];
    this.mydataVariable =""
    var quesTypeIde = this.answerListQueue[0].quesTypeId
    var quesText = this.answerListQueue[0].quesText
    var answerList = this.answerListQueue[0].answerList
    for (var s = 0; s < answerList.length; s++) {
      var answerFrame = { "ansId": answerList[s].ansId, "ansText": answerList[s].ansText }
      this.answerListPush.push(answerFrame)

    }
  
      var quesTypeId = quesTypeIde - 1;
      if (this.listQuestionTypes[quesTypeId].quesGroup === "SELECT" || 
      this.listQuestionTypes[quesTypeId].quesTypeDesc === "Multiple Choice Questions" ||
      this.listQuestionTypes[quesTypeId].quesTypeDesc === "Opinion Scale" ||
      this.listQuestionTypes[quesTypeId].quesTypeDesc === "Rating") {
        this.quesGroupPush = []
        this.answerListId = "SELECT"
      }else {
        this.quesGroupPush = []
        this.answerListId = "NOT"
      }

      this.questionTypeDisplayLogics = []
      if (quesTypeIde === 1) {
        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa, "parse")
        this.questionTypeDisplayLogics.push(aaa)
        var Opinonscale = []
        for(var ty=1 ; ty <= 10; ty++){
          var OpinonscaleFrame = { "ansId": ty, "ansText": ty }

          Opinonscale.push(OpinonscaleFrame)
        }
        this.displayLogics[indexx] = this.questionTypeDisplayLogics[0]
        console.log(this.displayLogics[indexx], "this.displayLogics[i]")
        this.answerListPushFinal[indexx] = Opinonscale
        console.log(this.answerListPushFinal[indexx], "this.displayLogics[i]")
        this.getDisplayLabelQuestion = answer
        
        return[
          this.secondType(indexx),
          this.initalReset(indexx),
        ]
        

      }
     else if (quesTypeIde === 3) {
        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayLogics.push(aaa)
        
        var Ratingscale = []
        for(var ty=1 ; ty <= 5; ty++){
          var RatingscaleFrame = { "ansId": ty, "ansText": ty }

          Ratingscale.push(RatingscaleFrame)
        }
   
        this.displayLogics[indexx] = this.questionTypeDisplayLogics[0]
        console.log(this.displayLogics[indexx], "Ratingscale.displayLogics[i]")
        this.answerListPushFinal[indexx] = Ratingscale
        console.log(this.answerListPushFinal[indexx], "Ratingscale[i]")
        this.getDisplayLabelQuestion = answer

        return[
          this.secondType(indexx),
          this.initalReset(indexx),
        ]
        
      }
      else {

        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayLogics.push(aaa)

        this.displayLogics[indexx] = this.questionTypeDisplayLogics[0]
        console.log(this.displayLogics[indexx], "this.displayLogics[i]")
        this.answerListPushFinal[indexx] = this.answerListPush
        console.log(this.answerListPushFinal[indexx], "this.displayLogics[i]")
        this.getDisplayLabelQuestion = answer


      return[
        this.secondType(indexx),
        this.initalReset(indexx),
      ]
        
      }

      
    
  }

  firstType(indexx) {
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLogicType'].setValue(this.displayLogics) as FormArray;

  }
  secondType(indexx) {
    this.quesGroupPush.push(this.answerListId)
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['checkDisplayId'].setValue(this.answerListId) as FormArray;
  }
  answerListPushType(indexx) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayAnswerDropDown'].setValue(this.answerListPush) as FormArray;
  }
  initalReset(indexx) {
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswer'].setValue("") as FormArray;

  }

  onDisplayFieldQuestionSecondLogicalChange(event, indexx, sections) {
    let answer2 = event.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLogicType'].setValue(answer2) as FormArray
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswer'].setValue(answer2) as FormArray

    var getQues = sections.value.questions
    this.quesOrder = getQues[0].orderId
    // check format
    const allValues = this.answerListQueue[0].quesOrder
    
var questionOrder = []
questionOrder.push({"quesOrder" :allValues})
var intersection = _.intersectionBy(this.allQuestion, questionOrder, 'quesOrder');

console.log(intersection[0].quesTypeId, "intersection");
if((intersection[0].quesTypeId === 7 && answer2 === "Is") || 
(intersection[0].quesTypeId === 7 && answer2 === "Is Not") ||
(intersection[0].quesTypeId === 7 && answer2 === "Is Answered") ||
(intersection[0].quesTypeId === 7 && answer2 === "Not Answered")){
  this.answerListId = ""
}

    else if (answer2 === "Answered" || answer2 === "Not answered" || answer2 === "Is Answered" || answer2 === "Not Answered" || answer2 === "select") {
      this.answerListId = ""
    } else {
      this.answerListId = this.quesGroupPush[0]
    }

    return [
      // this.firstDisplayLabelChange(indexx),
      this.secondDisplayHideType(indexx),
      // this.SubmitQuestion()

    ]

  }
  firstDisplayLabelChange(indexx) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswer'].setValue(this.getDisplayLabelAnswer) as FormArray;
  }
  secondDisplayHideType(indexx) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['checkDisplayId'].setValue(this.answerListId) as FormArray;

  }
  getLastDisplayAnswer(event, i) {
    let answer2 = event.target.value
    this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDown'].setValue(answer2) as FormArray

  }

  // Dynamic dispaly starts
  // Dynamic dispaly starts
  // Dynamic dispaly starts
  getCompartorDynamic(answer, indexx, k1) {
    this.comparatorDynamic = answer.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleDisplayLogicType.setValue(this.comparatorDynamic) as FormArray

  }
  onDisplayFieldQuestionSecondDynamicChange(answer2, indexx, k1) {
    let answer = answer2.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleDisplayQuestion.setValue(answer) as FormArray
    this.onDisplayFieldSecondQuestionSecondDynamicChange(answer, indexx, k1)
  }
  onDisplayFieldSecondQuestionSecondDynamicChange(answer, indexx, k1) {
    const allValues = this.quesTypeIdDetails
    this.answerListQueue = allValues.filter(value => value.quesId === parseInt(answer));
    console.log(this.answerListQueue, "answerListId");
    this.answerListPush = []
    var quesTypeIde = this.answerListQueue[0].quesTypeId
    var quesText = this.answerListQueue[0].quesText
    var answerList = this.answerListQueue[0].answerList
    for (var s = 0; s < answerList.length; s++) {
      var answerFrame = { "ansId": answerList[s].ansId, "ansText": answerList[s].ansText }
      this.answerListPush.push(answerFrame)

    }

    // for (var i = 1; i <= this.listQuestionTypes.length; i++) {
      var quesTypeId = quesTypeIde - 1;
      if (this.listQuestionTypes[quesTypeId].quesGroup === "SELECT" || 
      this.listQuestionTypes[quesTypeId].quesTypeDesc === "Multiple Choice Questions" ||
      this.listQuestionTypes[quesTypeId].quesTypeDesc === "Opinion Scale" ||
      this.listQuestionTypes[quesTypeId].quesTypeDesc === "Rating") {
        this.quesGroupPush = []
        this.answerListId = "SELECT"
      }else {
        this.quesGroupPush = []
        this.answerListId = "NOT"
      }

      this.questionTypeDisplayLogics = []
      if (quesTypeIde === 1) {
        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa, "parse")
        this.questionTypeDisplayLogics.push(aaa)
        this.displayLogicsDynamic[k1] = this.questionTypeDisplayLogics[0]
        this.answerListPushFinalDynamic[k1] = this.answerListPush
        var Opinonscale = []
        for(var ty=1 ; ty <= 10; ty++){
          var OpinonscaleFrame = { "ansId": ty, "ansText": ty }

          Opinonscale.push(OpinonscaleFrame)
        }
        console.log(Opinonscale, "Opinonscale")
        this.answerListPushFinalDynamic[k1] = Opinonscale
        console.log(this.answerListPushFinalDynamic[k1], "Opinonscale")
        this.getDisplayLabelQuestion = answer
        
        return[
          this.firstDynamicType(indexx, k1),
          this.initalResetDynamic(indexx, k1),
        ]
        

      }
     else if (quesTypeIde === 3) {
        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayLogics.push(aaa)
        this.displayLogicsDynamic[k1] = this.questionTypeDisplayLogics[0]
        this.answerListPushFinalDynamic[k1] = this.answerListPush
        var Ratingscale = []
        for(var ty=1 ; ty <= 5; ty++){
          var RatingscaleFrame = { "ansId": ty, "ansText": ty }

          Ratingscale.push(RatingscaleFrame)
        }
        console.log(Ratingscale, "Ratingscale")
        this.answerListPushFinalDynamic[k1] = Ratingscale
        console.log(this.answerListPushFinalDynamic[k1], "Ratingscale")
        this.getDisplayLabelQuestion = answer

        return[
          this.firstDynamicType(indexx, k1),
          this.initalResetDynamic(indexx, k1),
        ]
        
      }
      else {
        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayLogics.push(aaa)

        this.displayLogicsDynamic[k1] = this.questionTypeDisplayLogics[0]
        this.answerListPushFinalDynamic[k1] = this.answerListPush


        this.getDisplayLabelQuestionDynamic = answer
      return[
          this.firstDynamicType(indexx, k1),
          this.initalResetDynamic(indexx, k1)
      ]
        
      }

      
    // }



  }

  firstDynamicType(indexx, k1) {
    this.quesGroupPush.push(this.answerListId)
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleCheckDisplayId.setValue(this.answerListId) as FormArray;
  }
  secondDynamicType(indexx, k1) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.dynamicdisplaylogiclogicaltype.setValue(this.displayLogics) as FormArray;
  }
  answerListDynamicPushType(indexx, k1) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleDisplayAnswer.setValue(this.answerListPush) as FormArray;
  }
  initalResetDynamic(indexx, k1) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleLabelChangeForAnswer.setValue("") as FormArray;

  }


  onDisplayFieldQuestionSecondDynamicLogicalChange(event, indexx, k1, sections) {
    this.getDisplayLabelAnswerDynamic = event.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.dynamicdisplaylogiclogicaltype.setValue(this.getDisplayLabelAnswerDynamic) as FormArray


    var getQues = sections.value.questions
    this.quesOrder = getQues[0].orderId
    // check format
    const allValues = this.answerListQueue[0].quesOrder

var questionOrder = []
questionOrder.push({"quesOrder" :allValues})
var intersection = _.intersectionBy(this.allQuestion, questionOrder, 'quesOrder');

console.log(intersection[0].quesTypeId, "intersection");
if((intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamic === "Is") || 
(intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamic === "Is Not") ||
(intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamic === "Is Answered") ||
(intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamic === "Not Answered")){
  this.answerListId = ""
}

    else if (this.getDisplayLabelAnswerDynamic === "Answered" || this.getDisplayLabelAnswerDynamic === "Not answered" || this.getDisplayLabelAnswerDynamic === "Is Answered" || this.getDisplayLabelAnswerDynamic === "Not Answered" || this.getDisplayLabelAnswerDynamic === "select") {
      this.answerListId = ""
    } else {
      this.answerListId = this.quesGroupPush[0]
    }


    return [
      // this.firstDisplayDynamicLabelChange(indexx, k1),
      this.secondDisplayDynamicHideType(indexx, k1)


    ]

  }
  firstDisplayDynamicLabelChange(indexx, k1) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleLabelChangeForAnswer.setValue(this.getDisplayLabelAnswerDynamic) as FormArray;
  }
  secondDisplayDynamicHideType(indexx, k1) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleCheckDisplayId.setValue(this.answerListId) as FormArray;

  }



  getLastDisplayDynamicAnswer(event, i, k1) {
    this.getDisplayAnswerLastDynamic = event.target.value
    this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.pickMultipleDisplayAnswer.setValue(this.getDisplayAnswerLastDynamic) as FormArray;


  }
  saveDisplayLogic(i, j) {
    // odd display
    // odd display
    // odd display
    var frame = {
      "quesId": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayQuestion'].value,
      "logics": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLogicType'].value,
      "data": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDown'].value,
      "ansId": null
    }

    // console.log(this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayQuestion'].value, "1")
    // console.log(this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLogicType'].value, "2")
    // console.log(this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDown'].value, "3")

    // dynamic display
    // dynamic display
    // dynamic display
    var dynamiclength = this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.displayLogic.value
    console.log(dynamiclength, "dynamiclength")
    if (dynamiclength.length === 0) {
      this.dynamicDisplayFramepush = []
      this.dynamicDisplayFramepush.push(frame)
    } else {
      this.dynamicDisplayFramepush = []
      for (var t = 0; t < dynamiclength.length; t++) {
        var dynamicDisplayFrame = {}
        dynamicDisplayFrame['compartor'] = dynamiclength[t].pickMultipleDisplayLogicType
        dynamicDisplayFrame['quesId'] = dynamiclength[t].pickMultipleDisplayQuestion
        dynamicDisplayFrame['logics'] = dynamiclength[t].dynamicdisplaylogiclogicaltype
        dynamicDisplayFrame['data'] = dynamiclength[t].pickMultipleDisplayAnswer
        this.dynamicDisplayFramepush.push(dynamicDisplayFrame)
      }
      this.dynamicDisplayFramepush.push(frame)
    }

    console.log(this.dynamicDisplayFramepush, "this.dynamicDisplayFramepush")

    this.displayLogicValue = this.dynamicDisplayFramepush
    // this.skipLogicValue = this.skipLogicCheck
    this.addQuestionChecker = false
    this.skipLogicCheck = JSON.parse(this.allQuestion[i].skipLogic);
        console.log(this.displayLogicValue, "this.displayLogicValue")
        console.log(this.skipLogicValue, "this.skipLogicValue")
        this.quesTypeIdObj = this.allQuestion[i].quesTypeId

    this.SubmitQuestion()
  }



  // Skip Logic
  // Skip Logic
  // Skip Logic

  
  onDisplayFieldQuestionSecondLogicalChangeSkipTo(answer2, indexx) {
    let answerSkip = answer2.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['SkipTo'].setValue(answerSkip) as FormArray
  }

  onSkipFieldQuestionChange(answer3, indexx) {
    let answerSkip = answer3.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayQuestionSkip'].setValue(answerSkip) as FormArray
    // this.onFieldQuestionSkipChangeSecond(answerSkip, indexx)

    if (answerSkip === "select") {
      this.answerListIdSkip = ""
      this.hideTypeSkip(indexx)
      }else{
        this.displaySkipLogics(answerSkip, indexx)
        this.answerListIdSkip = ""
        this.hideTypeSkip(indexx)
      }

  }

 
  displaySkipLogics(answerSkip, indexx){
    const allValuesSkip = this.quesTypeIdDetailsSkip
    this.answerListQueueSkip = allValuesSkip.filter(value => value.quesId === parseInt(answerSkip));
    console.log(this.answerListQueueSkip, "answerListId");
    this.answerListPushSkip = [];
    this.mydataVariableSkip =""

    var quesTypeIdeSkip = this.answerListQueueSkip[0].quesTypeId
    var quesTextSkip = this.answerListQueueSkip[0].quesText
    var answerListSkip = this.answerListQueueSkip[0].answerList
    for (var s = 0; s < answerListSkip.length; s++) {
      var answerFrame = { "ansId": answerListSkip[s].ansId, "ansText": answerListSkip[s].ansText }
      this.answerListPushSkip.push(answerFrame)

    }
    // for (var i = 0; i < this.listQuestionTypes.length; i++) {
    //   if (this.listQuestionTypes[i].quesGroup === "SELECT") {
    //     this.quesGroupPushSkip = []
    //     this.answerListIdSkip = "SELECT"
    //   } else {
    //     this.quesGroupPushSkip = []
    //     this.answerListIdSkip = "NOT"
    //   }

    //   this.questionTypeDisplayLogicsSkip = []
    //   if (this.listQuestionTypes[i].quesTypeId === quesTypeIdSkip) {

    //     let aaa = JSON.parse(this.listQuestionTypes[i].logicsArray);
    //     console.log(aaa.length, "parse")
    //     this.questionTypeDisplayLogicsSkip.push(aaa)

    //     this.displayLogicsSkip[indexx] = this.questionTypeDisplayLogicsSkip[0]
    //     console.log(this.displayLogicsSkip[indexx], "this.displayLogicsSkip[i]")
    //     this.answerListPushFinalSkip[indexx] = this.answerListPushSkip
    //     console.log(this.answerListPushFinalSkip[indexx], "this.displayLogicsSkip[i]")



    //     this.getDisplayLabelQuestionSkip = answer

    //     return [
    //       this.secondTypeSkip(indexx),
    //       this.initalResetSkip(indexx),
    //     ]

    //   }
    // }



      
    var quesTypeIdSkip = quesTypeIdeSkip - 1;
    if (this.listQuestionTypes[quesTypeIdSkip].quesGroup === "SELECT" || 
    this.listQuestionTypes[quesTypeIdSkip].quesTypeDesc === "Multiple Choice Questions" ||
    this.listQuestionTypes[quesTypeIdSkip].quesTypeDesc === "Opinion Scale" ||
    this.listQuestionTypes[quesTypeIdSkip].quesTypeDesc === "Rating") {
      this.quesGroupPushSkip = []
      this.answerListIdSkip = "SELECT"
    }else {
      this.quesGroupPushSkip = []
      this.answerListIdSkip = "NOT"
    }

    this.questionTypeDisplayLogicsSkip = []
    if (quesTypeIdeSkip === 1) {
      let aaa = JSON.parse(this.listQuestionTypes[quesTypeIdSkip].logicsArray);
      console.log(aaa, "parse")
      this.questionTypeDisplayLogicsSkip.push(aaa)
      var Opinonscale = []
      for(var ty=1 ; ty <= 10; ty++){
        var OpinonscaleFrame = { "ansId": ty, "ansText": ty }

        Opinonscale.push(OpinonscaleFrame)
      }
      this.displayLogicsSkip[indexx] = this.questionTypeDisplayLogicsSkip[0]
      console.log(this.displayLogicsSkip[indexx], "this.displayLogicsSkip[i]")
      this.answerListPushFinalSkip[indexx] = Opinonscale
      console.log(this.answerListPushFinalSkip[indexx], "this.displayLogicsSkip[i]")
      this.getDisplayLabelQuestionSkip = answerSkip
      
      return[
        this.secondTypeSkip(indexx),
        this.initalResetSkip(indexx),
      ]
      

    }
   else if (quesTypeIdeSkip === 3) {
      let aaa = JSON.parse(this.listQuestionTypes[quesTypeIdSkip].logicsArray);
      console.log(aaa, "parse")
      this.questionTypeDisplayLogicsSkip.push(aaa)
      
      var Ratingscale = []
      for(var ty=1 ; ty <= 5; ty++){
        var RatingscaleFrame = { "ansId": ty, "ansText": ty }

        Ratingscale.push(RatingscaleFrame)
      }
 
      this.displayLogicsSkip[indexx] = this.questionTypeDisplayLogicsSkip[0]
      console.log(this.displayLogicsSkip[indexx], "this.displayLogicsSkip[i]")
      this.answerListPushFinalSkip[indexx] = Ratingscale
      console.log(this.answerListPushFinalSkip[indexx], "this.displayLogicsSkip[i]")
      this.getDisplayLabelQuestionSkip = answerSkip

      return[
        this.secondTypeSkip(indexx),
        this.initalResetSkip(indexx),
      ]
      
    }
    else {

      let aaa = JSON.parse(this.listQuestionTypes[quesTypeIdSkip].logicsArray);
      console.log(aaa, "else 1")
      this.questionTypeDisplayLogicsSkip.push(aaa)
      console.log(this.questionTypeDisplayLogicsSkip[0], "else 2")

      this.displayLogicsSkip[indexx] = this.questionTypeDisplayLogicsSkip[0]
      console.log(this.displayLogicsSkip[indexx], "else 3")
      this.answerListPushFinalSkip[indexx] = this.answerListPushSkip
      console.log(this.answerListPushFinalSkip[indexx], "this.displayLogicsSkip[i]")
      this.getDisplayLabelQuestionSkip = answerSkip



    return[
      this.secondTypeSkip(indexx),
      this.initalResetSkip(indexx),
    ]
      
    }




  }

  secondTypeSkip(indexx) {
    this.quesGroupPushSkip.push(this.answerListIdSkip)
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['checkDisplayIdSkip'].setValue(this.answerListIdSkip) as FormArray;
  }
 
  initalResetSkip(indexx) {
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswerSkip'].setValue("") as FormArray;
  }



  onDisplayFieldQuestionSecondLogicalChangeSkip(event, indexx, sections) {
    let answer2 = event.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLogicTypeSkip'].setValue(answer2) as FormArray
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['pickDisplayLabelLogicTypeForAnswerSkip'].setValue(answer2) as FormArray

    var getQues = sections.value.questions
    this.quesOrder = getQues[0].orderId
    // check format
    const allValues = this.answerListQueueSkip[0].quesOrder

var questionOrder = []
questionOrder.push({"quesOrder" :allValues})
var intersection = _.intersectionBy(this.allQuestion, questionOrder, 'quesOrder');

console.log(intersection[0].quesTypeId, "intersection");
if((intersection[0].quesTypeId === 7 && answer2 === "Is") || 
(intersection[0].quesTypeId === 7 && answer2 === "Is Not") ||
(intersection[0].quesTypeId === 7 && answer2 === "Is Answered") ||
(intersection[0].quesTypeId === 7 && answer2 === "Not Answered")){
  this.answerListIdSkip = ""
}

    else if (answer2 === "Answered" || answer2 === "Not answered" || answer2 === "Is Answered" || answer2 === "Not Answered"|| answer2 === "select") {
      this.answerListIdSkip = ""
    } else {
      this.answerListIdSkip = this.quesGroupPushSkip[0]
    }

    return [
      // this.firstDisplayLabelChange(indexx),
      this.hideTypeSkip(indexx),
      // this.SubmitQuestion()

    ]

  }
  
  hideTypeSkip(indexx) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls['checkDisplayIdSkip'].setValue(this.answerListIdSkip) as FormArray;
  }
  getLastDisplayAnswerSkip(event, i) {
    let answer2 = event.target.value
    this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDownSkip'].setValue(answer2) as FormArray
  
  }



    // Dynamic Skip starts
    // Dynamic Skip starts
    // Dynamic Skip starts
  getCompartorDynamicSkip(answer, indexx, k2) {
    this.comparatorDynamic = answer.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleDisplayLogicTypeSkip.setValue(this.comparatorDynamic) as FormArray

  }
  onDisplayFieldQuestionSecondDynamicChangeSkip(answer2, indexx, k2) {
    let answer = answer2.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleDisplayQuestionSkip.setValue(answer) as FormArray
    this.onDisplayFieldSecondQuestionSecondDynamicChangeSkip(answer, indexx, k2)
  }
  onDisplayFieldSecondQuestionSecondDynamicChangeSkip(answer, indexx, k2) {
    const allValues = this.quesTypeIdDetailsSkip
    this.answerListQueueSkip = allValues.filter(value => value.quesId === parseInt(answer));
    console.log(this.answerListQueueSkip, "answerListId");
    this.answerListPushSkip = []
    var quesTypeIde = this.answerListQueueSkip[0].quesTypeId
    var quesText = this.answerListQueueSkip[0].quesText
    var answerList = this.answerListQueueSkip[0].answerList
    for (var s = 0; s < answerList.length; s++) {
      var answerFrame = { "ansId": answerList[s].ansId, "ansText": answerList[s].ansText }
      this.answerListPushSkip.push(answerFrame)

    }


    var quesTypeId = quesTypeIde - 1;
    if (this.listQuestionTypes[quesTypeId].quesGroup === "SELECT" || 
    this.listQuestionTypes[quesTypeId].quesTypeDesc === "Multiple Choice Questions" ||
    this.listQuestionTypes[quesTypeId].quesTypeDesc === "Opinion Scale" ||
    this.listQuestionTypes[quesTypeId].quesTypeDesc === "Rating") {
      this.quesGroupPush = []
      this.answerListId = "SELECT"
    }else {
      this.quesGroupPush = []
      this.answerListId = "NOT"
    }

    this.questionTypeDisplayDynamicLogicsSkip = []
    if (quesTypeIde === 1) {
      let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
      console.log(aaa.length, "parse")
      this.questionTypeDisplayDynamicLogicsSkip.push(aaa)

      var Opinonscale = []
      for(var ty=1 ; ty <= 10; ty++){
        var OpinonscaleFrame = { "ansId": ty, "ansText": ty }

        Opinonscale.push(OpinonscaleFrame)
      }
      this.displayLogicsDynamicSkip[k2] = this.questionTypeDisplayDynamicLogicsSkip[0]
      this.answerListPushFinalDynamicSkip[k2] = Opinonscale

      this.getDisplayLabelQuestionDynamic = answer
      
      return[
        this.firstDynamicTypeSkip(indexx, k2),
        this.initalResetDynamicSkip(indexx, k2),
      ]
      

    }
   else if (quesTypeIde === 3) {
    let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
    console.log(aaa.length, "parse")
    this.questionTypeDisplayDynamicLogicsSkip.push(aaa)

      var Ratingscale = []
      for(var ty=1 ; ty <= 5; ty++){
        var RatingscaleFrame = { "ansId": ty, "ansText": ty }

        Ratingscale.push(RatingscaleFrame)
      }
      this.displayLogicsDynamicSkip[k2] = this.questionTypeDisplayDynamicLogicsSkip[0]
      this.answerListPushFinalDynamicSkip[k2] = Ratingscale


    this.getDisplayLabelQuestionDynamic = answer

      return[
        this.firstDynamicTypeSkip(indexx, k2),
        this.initalResetDynamicSkip(indexx, k2),
      ]
      
    }
    else {
        let aaa = JSON.parse(this.listQuestionTypes[quesTypeId].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayDynamicLogicsSkip.push(aaa)

        this.displayLogicsDynamicSkip[k2] = this.questionTypeDisplayDynamicLogicsSkip[0]
        this.answerListPushFinalDynamicSkip[k2] = this.answerListPush


      this.getDisplayLabelQuestionDynamic = answer
    return[
         this.firstDynamicTypeSkip(indexx, k2),
          this.initalResetDynamicSkip(indexx, k2),
    ]
      
    
  }
    // for (var i = 0; i < this.listQuestionTypes.length; i++) {
    //   if (this.listQuestionTypes[i].quesGroup === "SELECT") {
    //     this.quesGroupPush = []
    //     this.answerListId = "SELECT"
    //   } else {
    //     this.quesGroupPush = []
    //     this.answerListId = "NOT"
    //   }

    //   this.questionTypeDisplayLogicsSkip = []
    //   if (this.listQuestionTypes[i].quesTypeId === quesTypeId) {

    //     let aaa = JSON.parse(this.listQuestionTypes[i].logicsArray);
    //     console.log(aaa.length, "parse")
    //     this.questionTypeDisplayLogicsSkip.push(aaa)

    //     this.displayLogicsDynamicSkip[k2] = this.questionTypeDisplayLogicsSkip[0]
    //     this.answerListPushFinalDynamicSkip[k2] = this.answerListPush




    //     this.getDisplayLabelQuestionDynamic = answer

    //     // let IntialLogicalSetup  = this.displayLogics[0].type
    //     // this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.displayLogic.controls[k1].controls.dynamicdisplaylogiclogicaltype.setValue(IntialLogicalSetup) as FormArray


    //     return [
    //       this.firstDynamicTypeSkip(indexx, k2),
    //       // this.secondDynamicType(indexx, k1),
    //       // this.answerListDynamicPushType(indexx, k1),
    //       this.initalResetDynamicSkip(indexx, k2),

    //     ]

    //   }
    // }

  }

  firstDynamicTypeSkip(indexx, k2) {
    this.quesGroupPush.push(this.answerListId)
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleCheckDisplayIdSkip.setValue(this.answerListId) as FormArray;
  }
  secondDynamicTypeSkip(indexx, k2) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleDisplayQuestionLogicTypeSkip.setValue(this.displayLogics) as FormArray;
  }
  answerListDynamicPushTypeSkip(indexx, k2) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleDisplayAnswerSkip.setValue(this.answerListPush) as FormArray;
  }
  initalResetDynamicSkip(indexx, k2) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleLabelChangeForAnswerSkip.setValue("") as FormArray;

  }


  onDisplayFieldQuestionSecondDynamicLogicalChangeSkip(event, indexx, k2, sections) {
    this.getDisplayLabelAnswerDynamicSkip = event.target.value
    this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleDisplayQuestionLogicTypeSkip.setValue(this.getDisplayLabelAnswerDynamicSkip) as FormArray

    
    var getQues = sections.value.questions
    this.quesOrder = getQues[0].orderId
    const allValues = this.answerListQueueSkip[0].quesOrder

var questionOrder = []
questionOrder.push({"quesOrder" :allValues})
var intersection = _.intersectionBy(this.allQuestion, questionOrder, 'quesOrder');

console.log(intersection[0].quesTypeId, "intersection");
if((intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamicSkip === "Is") || 
(intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamicSkip === "Is Not") ||
(intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamicSkip === "Is Answered") ||
(intersection[0].quesTypeId === 7 && this.getDisplayLabelAnswerDynamicSkip === "Not Answered")){
  this.answerListIdSkip = ""
}

   else if (this.getDisplayLabelAnswerDynamicSkip === "Answered" || this.getDisplayLabelAnswerDynamicSkip === "Not answered" || this.getDisplayLabelAnswerDynamicSkip === "Is Answered" || this.getDisplayLabelAnswerDynamicSkip === "Not Answered"||  this.getDisplayLabelAnswerDynamicSkip === "select") {
      this.answerListIdSkip = ""
    } else {
      this.answerListIdSkip = this.quesGroupPush[0]
    }


    return [
      // this.firstDisplayDynamicLabelChangeSkip(indexx, k2),
      this.secondDisplayDynamicHideTypeSkip(indexx, k2)


    ]

  }
  firstDisplayDynamicLabelChangeSkip(indexx, k2) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleLabelChangeForAnswerSkip.setValue(this.getDisplayLabelAnswerDynamicSkip) as FormArray;
  }
  secondDisplayDynamicHideTypeSkip(indexx, k2) {
    return this.survey.controls.sections['controls'][indexx].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleCheckDisplayIdSkip.setValue(this.answerListIdSkip) as FormArray;

  }



  getLastDisplayDynamicAnswerSkip(event, i, k2) {
    this.getDisplayAnswerLastDynamic = event.target.value
    this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.controls[k2].controls.pickMultipleDisplayAnswerSkip.setValue(this.getDisplayAnswerLastDynamic) as FormArray;


  }
  



  saveSkipLogic(i, j) {
    // odd skip
    // odd skip
    // odd skip
    var frame = {
      "quesId": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayQuestionSkip'].value,
      "logics": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLogicTypeSkip'].value,
      "skipTo": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['SkipTo'].value,
      "data": this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDownSkip'].value,
      "ansId": null
    }

    // console.log(this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayQuestion'].value, "1")
    // console.log(this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayLogicType'].value, "2")
    // console.log(this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls['pickDisplayAnswerDropDown'].value, "3")


    // dynamic display
    // dynamic display
    // dynamic display
    var dynamiclengthSkip = this.survey.controls.sections['controls'][i].controls.questions.controls['0'].controls.skipLogic.value
    console.log(dynamiclengthSkip, "dynamiclengthSkip")
    if (dynamiclengthSkip.length === 0) {
      this.dynamicDisplayFramepushSkip = []
      this.dynamicDisplayFramepushSkip.push(frame)
    } else {
      this.dynamicDisplayFramepush = []
      for (var t = 0; t < dynamiclengthSkip.length; t++) {
        var dynamicDisplayFrame = {}
        dynamicDisplayFrame['compartor'] = dynamiclengthSkip[t].pickMultipleDisplayLogicTypeSkip
        dynamicDisplayFrame['quesId'] = dynamiclengthSkip[t].pickMultipleDisplayQuestionSkip
        dynamicDisplayFrame['logics'] = dynamiclengthSkip[t].pickMultipleDisplayQuestionLogicTypeSkip
        dynamicDisplayFrame['data'] = dynamiclengthSkip[t].pickMultipleDisplayAnswerSkip
        this.dynamicDisplayFramepushSkip.push(dynamicDisplayFrame)
      }
      this.dynamicDisplayFramepushSkip.push(frame)
    }

    console.log(this.dynamicDisplayFramepushSkip, "this.dynamicDisplayFramepush")

    this.skipLogicValue = this.dynamicDisplayFramepushSkip
    // this.displayLogicValue = this.diplayLogicCheck
    this.diplayLogicCheck= JSON.parse(this.allQuestion[i].displayLogic);
    this.addQuestionChecker = false
    console.log(this.displayLogicValue, "this.displayLogicValue")
    console.log(this.skipLogicValue, "this.skipLogicValue")
    this.quesTypeIdObj = this.allQuestion[i].quesTypeId

    this.SubmitQuestion()
  }


  ngOnInit(): void {


    this.survey = new FormGroup({
      sections: new FormArray([
        // this.initSection(),
      ]),
    });


        this.apiService.getSurvey(this.constantsService.fetchSurveyTypes, {}).pipe(take(1)).subscribe((succ: any) => {

      this.common.hideLoading()
      console.log(succ, "succ")
      this.surveyTypes = succ
    },
      err => {
        this.common.hideLoading()

      });


    this.edit = this.common.getEditCompany()
    if (!_.isEmpty(this.edit)) {
      this.listquesOrderAscEdit = [];
      this.checkTwo = false
      this.Edit = true
      this.edit = { "id": this.edit.listSurvey }
      this.apiService.postSurvey(this.constantsService.getSurveyDetailsUsingId, this.edit["id"]).subscribe((succ: any) => {
        console.log(succ['survey'], "editsucc")




        this.configObjModel.Answers = succ['survey'].ansColor
        this.configObjModel.backgroundColor = succ['survey'].bgColor
        this.configObjModel.attachmentFile = succ['survey'].bgImageByte
        this.configObjModel.Questions = succ['survey'].quesColor
        this.configObjModel.hexColorButton = succ['survey'].quesColor
        this.configObjModel.surveyStatus = succ['survey'].surveyStatus


        this.configObjModel.surveyName = succ['survey'].surveyName

        
    let findedData = this.surveyTypes.filter(
      i => i.typeId === this.configObjModel.surveyStatus);
      this.configObjModel.typeOfSurvey = JSON.stringify(findedData[0].typeId)
      console.log( this.configObjModel.typeOfSurvey, "this.configObjModel.typeOfSurvey" )
      console.log( findedData, "findedData" )
      // this.surveyForm.controls["typeOfSurvie"].setValue(2);



        // this.font = succ['survey'].fontStyle
        if (succ['survey'].progressBar === 1) {
          this.configObjModel.progressBar = true
        } else {
          this.configObjModel.progressBar = false
        }
        if (succ['survey'].showQuesNo === 1) {
          this.configObjModel.questionNumber = true
        } else {
          this.configObjModel.questionNumber = false
        }

        const sortedActivities = succ['ques'].sort((a, b) => a.quesOrder - b.quesOrder)

        console.log(sortedActivities, "edit order ASC")

        this.listquesOrderAscEdit = sortedActivities;
        this.listquesOrderAsc = sortedActivities
        this.allQuestion = sortedActivities
        this.surveyIdObj = this.allQuestion[0].surveyId

  

        for (var i = 0; i < this.listquesOrderAsc.length; i++) {
          if (this.quesTypeIdObj === this.listquesOrderAsc[i].quesTypeId) {
            var frame = { "quesId": this.listquesOrderAsc[i].quesId,  "quesOrder": this.listquesOrderAsc[i].quesOrder, "quesTypeId": this.listquesOrderAsc[i].quesTypeId, "placeId": this.placeId }
            this.quesTypeIdDetails.push(frame)
          }
        }

        console.log(this.listquesOrderAsc, "this.listquesOrderAsc")

        const control = <FormArray>this.survey.get('sections');

        this.quesTpeNameForEditobj = {}
        for (var i = 0; i < this.listQuestionTypes.length; i++) {
          for (var j = 0; j < this.listquesOrderAsc.length; j++) {
            if (this.listquesOrderAsc[j].quesTypeId === this.listQuestionTypes[i].quesTypeId) {
              var maybeFinal = []

              this.listquesOrderAsc[j].quesName = this.listQuestionTypes[i].quesTypeDesc
              maybeFinal.push(this.listquesOrderAsc)

            }
          }
        }

        console.log(maybeFinal[0], "this.listquesOrderAscWithName")
        var Finalmaybe = maybeFinal[0]
        var oneAfterOtherQuestion = this.quesTypeIdDetails
        // var questionNameShow=this.listquesOrderAscWithName
        // control.push(this.initSection(Finalmaybe, oneAfterOtherQuestion));
        this.common.showLoading()
        for (var f = 0; f < Finalmaybe.length; f++) {
          var maybe = Finalmaybe[f];
          maybe['changeRequiredObj'] =  maybe.required ? true : false
          control.push(this.initSection(maybe, oneAfterOtherQuestion));

          //  this.initSection(finalmaybe, oneAfterOtherQuestion, questionNameShow)

        }
        this.common.hideLoading()

      // isRequired
   

        // for(var t=0 ; t< succ['ques'].length; t++){
        //   this.questionTypeCheck(succ['ques'][t].quesTypeId)

        // }


      }, err => {
        this.common.hideLoading();
        this.common.showErrorMessage(err.message)

      });


    }



    // let findedData = this.surveyTypes.find(i => i.typeId === this.configObjModel.surveyStatus);
    // console.log( findedData[i].typeDesc )


    this.surveyForm = this.formBuilder.group({
      surveyName: ['', [Validators.required]],
      typeOfSurvie: [''],
    })

  





    // 3rd call


    this.apiService.getSurvey(this.constantsService.fetchSurveyConfig, {}).subscribe((succ: any) => {

      this.common.hideLoading()
      console.log(succ, "succ")
      this.surveyConfig = succ

      if (succ.code == 200) {
        // this.common.showSuccessMessage(succ.message);
      }
      else {
        // this.common.showErrorMessage(succ.message)
      }
    },
      err => {
        this.common.hideLoading()

      });




    this.isConfigForm = this.formBuilder.group({
      surveyName: [''],
      typeOfSurvie: ['', Validators.required],
      backgroundColor: [''],
      questions: [''],
      answers: [''],
      button: [''],
      progressBar: [''],
      questionNumber: [''],
      fontStyle: [''],
      backgroundImage: [''],
      mainConfig: ['', Validators.required],

    });




    this.openStatus()

    myMethod();


    if ($(window).width() > 768) {
      $(".tablebody").mCustomScrollbar({
        axis: "y",
        theme: "dark",
        scrollbarPosition: "outside",
        advanced: {
          updateOnContentResize: true
        }
      });
    } else {
      $('.tablebody').mCustomScrollbar('destroy');
    }
    $(window).resize(function () {
      if ($(window).width() > 768) {
        $(".tablebody").mCustomScrollbar({
          axis: "y",
          theme: "dark",
          scrollbarPosition: "outside",
          advanced: {
            updateOnContentResize: true
          }
        });
      } else {
        $('.tablebody').mCustomScrollbar('destroy');
      }
    });
    selectSearchMethod();

  }

  changeIcon(IconName) {
    if (IconName === "times") {
      this.thumbsVisible = false
      this.RightOrWrongVisible = true
    }
    if (IconName === "thumbs") {
      this.thumbsVisible = true
      this.RightOrWrongVisible = false

    }

  }

  changeRatingIcon(IconName) {
    if (IconName === "star") {
      this.starVisible = true
      this.thumbsUpVisible = false
      this.crownVisible = false
      this.userIconVisible = false
      this.boltVisible = false

    }
    if (IconName === "thumbs-up") {
      this.starVisible = false
      this.thumbsUpVisible = true
      this.crownVisible = false
      this.userIconVisible = false
      this.boltVisible = false
    }
    if (IconName === "crown") {
      this.starVisible = false
      this.thumbsUpVisible = false
      this.crownVisible = true
      this.userIconVisible = false
      this.boltVisible = false
    }
    if (IconName === "user") {
      this.starVisible = false
      this.thumbsUpVisible = false
      this.crownVisible = false
      this.userIconVisible = true
      this.boltVisible = false
    }
    if (IconName === "bolt") {
      this.starVisible = false
      this.thumbsUpVisible = false
      this.crownVisible = false
      this.userIconVisible = false
      this.boltVisible = true
    }
  }


  onFileSelect(event) {
    // this.compaignObj.campaignDesc
    var file: File = event.target.files[0];
    var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "file")




      this.common.convertBase64(file, (result) => {
        this.configObjModel.attachmentFile = result;
        this.configObjModel.attach = file.name;

        this.configObjModel.attachmentFileName = file.name;

      })


    }



  }
  opinonClick(what) {
    var temp = what
    this.reqObj['temp'] = what
    console.log(this.reqObj['temp'], "this.reqOFf")
    console.log(this.pushdisplayLogic, "this.pushdisplayLogic")



    // console.log(sam, "sam")


  }

  showTextBox(questionId) {
    console.log(questionId, "questionId")
    //HIT LOgics
    if (_.isEmpty(this.getDisplayLogic) && _.isEmpty(this.getSkipLogic)) {
      this.showText = false
      this.openStatus()
    }
    else if (!_.isEmpty(this.getDisplayLogic) && !_.isEmpty(this.getSkipLogic)) {

    } else if (!_.isEmpty(this.getDisplayLogic) && _.isEmpty(this.getSkipLogic)) {
      console.log(this.getDisplayLogic, "3")
      for (var z = 0; z < this.getDisplayLogic.length; z++) {

        if (this.getDisplayLogic[z].operator === "startsWith") {
          var str = "sam"
          var s = this.getDisplayLogic[z].value.startsWith(str);
          var startsWith = this.getDisplayLogic[z].operator;
          var condition = this.getDisplayLogic[z].condition;

        }
        if (this.getDisplayLogic[z].operator === "endsWith") {
          var str = "antony"
          var e = this.getDisplayLogic[z].value.startsWith(str);
          var endsWith = this.getDisplayLogic[z].operator;

        }
        if (this.getDisplayLogic[z].operator === "contains") {
          var str = "antony"
          var econtians = this.getDisplayLogic[z].value.includes(str);
          var contains = this.getDisplayLogic[z].operator;

        }
        if (this.getDisplayLogic[z].operator === "equals") {
          var str = "antony"
          var eequals = this.getDisplayLogic[z].value.includes(str);
          var equalsWith = this.getDisplayLogic[z].operator;

        }

      }


      console.log("s", s, startsWith)
      console.log("e", e, endsWith)
      console.log("contains", econtians, contains)
      console.log("equals", eequals, equalsWith)

      if (condition === "and") {
        if (s && e === true || contains && eequals === true || s && contains === true || s && eequals === true || e && contains === true || e && eequals === true) {
          console.log("true")
          this.showText = false
          this.openStatus()
        } else {
          console.log("false")
        }



      } if (condition === "or") {

        if ((s || e === true) || (contains || eequals === true) || (s || contains === true) || (s || eequals === true) || (e || contains === true) || (e || eequals === true)) {
          console.log("true")
          this.showText = false
          this.openStatus()
        } else {
          console.log("false")
        }
      }




    } else if (_.isEmpty(this.getDisplayLogic) && !_.isEmpty(this.getSkipLogic)) {
      console.log(this.getSkipLogic, "4")


    }

  }
  showRatingFocus(questionId) {
    console.log(questionId, "questionId")
    //HIT LOgics
    this.showRating = false
    this.openStatus()

  }
  openStatus() {





    console.log(this.questions.length, "this.questions.length")

    for (var y = 0; y < this.questions.length; y++) {
      var quesType: any = this.questions[y].quesType
      var quesId = this.questions[y].questionId
      console.log(quesType, "quesType")
      var getDisplayLogic = this.questions[y].displayLogic
      var getSkipLogic = this.questions[y].skipLogic


      if (quesType === 1 && quesId != this.questionId) {
        this.showOpinion = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;


      }
      if (quesType === 2 && quesId != this.questionId) {
        this.showMcq = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);
        break;

      }
      if (quesType === 3 && quesId != this.questionId) {
        this.showRating = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic


        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);
        console.log(this.questions.length, "questionslength")

        break;

      }
      if (quesType === 4 && quesId != this.questionId) {
        this.showText = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);
        console.log(this.questions.length, "questionslength")

        break;


      }
      if (quesType === 5 && quesId != this.questionId) {
        this.showEmail = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;
      }


      if (quesType === 6 && quesId != this.questionId) {
        this.showPictureChoice = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;
      }

      if (quesType === 7 && quesId != this.questionId) {
        this.showYesorNo = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;

      }
      if (quesType === 8 && quesId != this.questionId) {
        this.showNumberInput = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic


        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;

      }
      if (quesType === 9 && quesId != this.questionId) {
        this.showMessage = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic


        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;
      }

      if (quesType === 10 && quesId != this.questionId) {
        this.showDate = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;
      }

      if (quesType === 11 && quesId != this.questionId) {
        this.showWebsite = true
        this.questionId = quesId
        this.getDisplayLogic = getDisplayLogic
        this.getSkipLogic = getSkipLogic

        var id = quesId;
        var index = this.questions.map(x => {
          return x.questionId;
        }).indexOf(id);

        this.questions.splice(index, 1);

        break;
      }









      //  console.log(logics, "displyLogicQuick")
      //  if(type === "OpinionScale"){
      //    this.showOpinion = true
      //   break;
      //  }
      //  if(type === "TextInput"){
      //   this.pushdisplayLogic = []
      //   this.pushdisplayLogic.push(logics)
      //   console.log(this.pushdisplayLogic, "forloops")

      // }


    }
  }
  changeRequired($event, i, j){
    this.changeRequiredObj = $event.target.checked;
    console.log(this.changeRequiredObj, "this.changeRequiredObj")
    this.SubmitQuestion();

  }

  checkFocusOut(sections) {
    // this.checkFocus = true
    console.log(sections.value.questions, "sections")
    var getQues = sections.value.questions
    this.surveyIdObj = getQues[0].surveyId
    this.quesTypeIdObj = getQues[0].questionTypeId
    this.quesIdObj = getQues[0].questionId
    this.quesOrder = getQues[0].orderId

    console.log(this.surveyIdObj, "this.surveyIdObj")
    // if(this.checkFocus === true){
    this.SubmitQuestion();

    // }
  }

  getstartTyping($event, i, j) {
    this.startTyping.value = $event.target.value;
    this.showOrHide = i;
    // this.titleName[i] = $event.target.value;
    this.addQuestionChecker = false

    return this.survey.controls.sections['controls'][i].controls.questionTitleHeader.setValue(this.startTyping.value) as FormArray;

  }
  getQuesId(quesId, quesOrder, quesTypeId) {
    this.quesIdObj = quesId
    this.quesOrder = quesOrder
    this.quesTypeIdObj = quesTypeId
  }

  showAccordion(i) {
    // var accordion = $(this);
    $(".collapse").removeClass("in");
    $("a").attr("aria-expanded", "false");
    this.indexRange = i
  }

  onDisplayFieldQuestionChange($event) {
    console.log($event.target.value, "valueee")
    var quesTypeId = JSON.parse($event.target.value)
    for (var i = 0; i < this.listQuestionTypes.length; i++) {
      if (quesTypeId === this.listQuestionTypes[i].quesTypeId) {
        this.quesTypeIdObj = quesTypeId
        // }
        // if(this.questionTypeDisplay === this.listQuestionTypes[i].quesTypeDesc){
        this.questionTypeDisplayLogics = []
        let aaa = JSON.parse(this.listQuestionTypes[i].logicsArray);
        console.log(aaa.length, "parse")
        this.questionTypeDisplayLogics.push(aaa)
      }
    }


    this.questionTypeDisplayLogicsDemo = this.questionTypeDisplayLogics[0]

    console.log(this.questionTypeDisplayLogicsDemo, "this.finalQuestionTypePush")

  }


















  SubmitQuestion() {
    // this.changeRequiredObj
    let changeRequiredObj =  this.changeRequiredObj ? 1 : 0
  var frame = {
    "deleted": 0,
    "displayLogic": JSON.stringify(this.displayLogicValue),
    "quesId": this.quesIdObj,
    "quesOrder": this.quesOrder,
    "quesText": this.startTyping.value,
    "quesTypeId": this.quesTypeIdObj, //QuestionTextoodanumber
    "required": changeRequiredObj,
    "skipLogic": JSON.stringify(this.skipLogicValue),
    "surveyId": this.surveyIdObj

  }


    


    console.log(this.listquesOrderAscEdit, "oldPush");

    console.log(frame, "this.FinalFrame")

    // this.listquesOrderAsc = []
    this.apiService.postSurvey(this.constantsService.addQuestion, frame).subscribe((succ: any) => {
if(succ.code === 200){
      this.common.hideLoading()
      console.log(succ, "succc")
 

      const sortedActivities = succ.questions.sort((a, b) => a.quesOrder - b.quesOrder)

      console.log(sortedActivities, "insert order ASC")


      this.listquesOrderAsc = succ.questions
      this.quesTpeNameForEditobj = {}
      for (var i = 0; i < this.listQuestionTypes.length; i++) {
        for (var j = 0; j < succ.questions.length; j++) {
          if (succ.questions[j].quesTypeId === this.listQuestionTypes[i].quesTypeId) {
            var maybeFinal = []

            succ.questions[j].quesName = this.listQuestionTypes[i].quesTypeDesc
            maybeFinal.push(succ.questions)

          }
        }
      }
      console.log(maybeFinal, "maybeFinal")
      var maybe = maybeFinal[0]



      for (var i = 0; i < succ.length; i++) {

        this.quesTypeIdObj = succ.questions[i].quesId
      }

      //Umesh
      this.allQuestion = succ.questions
      const control = <FormArray>this.survey.get('sections');
      var oneAfterOtherQuestion = this.allQuestion
      for (var f = 0; f < maybe.length; f++) {
        var finalmaybe = maybe[f];
        this.initSection(finalmaybe, oneAfterOtherQuestion)
      }
      if (this.addQuestionChecker != false) {
        control.push(this.initSection(finalmaybe, oneAfterOtherQuestion));
      }    

      this.common.hideLoading()
      this.SuccStat = true
    this.SuccError = false}
    else{this.SuccStat = false
    this.SuccError = true}


    },
      err => {
        this.SuccStat = false
        this.SuccError = true
        this.common.hideLoading()

      })




  }

  ngOnDestroy() {

    this.common.setEditcompany({})
  }





  handleChange($event: ColorEvent, rest) {
    console.log(rest, "rest")
    if (rest === 'background') {
      this.hexColorBackground = $event.color.hex;
      this.configObjModel.backgroundColor = this.hexColorBackground
    }
    if (rest === 'questions') {
      this.hexColorQuestions = $event.color.hex;
      this.configObjModel.Questions = this.hexColorQuestions

    }
    if (rest === 'answers') {
      this.hexColorAnswers = $event.color.hex;
      this.configObjModel.Answers = this.hexColorAnswers

    }
    if (rest === 'buttons') {
      this.configObjModel.hexColorButton = $event.color.hex;
      // this.red = this.hexColorButton

    }
  }

  mainConfigCheck() {
    this.mainConfigChecker = !this.mainConfigChecker;

  }


  
  public scrollToTop() {
    let target;
    target = this.el.nativeElement.querySelector('.inner-head')

    if (target) {
      $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
      target.focus();
    }
    return;

  }

  submitConfig() {




    if (this.surveyForm.invalid) {
      // this.detailsTabs = false;
      this.surveyForm.markAllAsTouched();
      let target;

      target = this.el.nativeElement.querySelector('.ng-invalid')

      if (target) {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }


      return;
    }
    else {

      if (this.Edit != true) {
        this.configObjModel.mainConfig = this.mainConfigChecker

        if (this.configObjModel.progressBar === true) {
          this.configObjModel.progressBar = 1
        } else {
          this.configObjModel.progressBar = 0
        }

        if (this.configObjModel.questionNumber === true) {
          this.configObjModel.questionNumber = 1
        } else {
          this.configObjModel.questionNumber = 0

        }

        let frameObj2 = {
          "ansColor": this.configObjModel.Answers,
          "bgColor": this.configObjModel.backgroundColor,
          "bgImgString": "xnsjdfjsdfksdfsfjskdfsjdfsjdf",
          // "bgImgString": this.configObjModel.attachmentFile,
          "companyId": this.user.companyId,
          "config": "string",
          "createdBy": this.user.userId,
          "createdOn": new Date(),
          "cutOffDate": "2020-12-30T18:08:09.910Z",
          "fontStyle": JSON.stringify(this.font),
          "maxResponseCount": 0,  //Doubt
          "progressBar": this.configObjModel.progressBar,
          "quesColor": this.configObjModel.Questions,
          "respCount": 0,       //Doubt
          "showQuesNo": this.configObjModel.questionNumber,   //Doubt
          "surveyId": 0,
          // "surveyName": this.configObjModel.surveyName,
          "surveyName": this.configObjModel.surveyName,
          "surveyStatus": this.configObjModel.typeOfSurvey,
          "surveyUrl": "string",
          "typeId": 0
        }



        this.apiService.postSurvey(this.constantsService.addSurvey, frameObj2).subscribe((succ: any) => {

          this.common.hideLoading()
          console.log(succ, "succc")



          this.surveyIdObj = succ['surveyId']



        },
          err => {
            this.common.hideLoading()

          });





        this.QuesObj.isActiveQues = true
        this.ConfigObj.isActiveConfig = false

        this.disableConfig = true
        this.disableQues = false
        this.isPrev = false


        this.checkOne = false;
        this.checkTwo = true;
      } else {

        this.common.showLoading()
        this.QuesObj.isActiveQues = true
        this.ConfigObj.isActiveConfig = false

        this.disableConfig = true
        this.disableQues = false
        this.isPrev = false


        this.checkOne = false;
        this.checkTwo = true;
        this.common.hideLoading()

      }
    }

  }

  goPrevious() {
    this.isPrev = true

    this.QuesObj.isActiveQues = false
    this.ConfigObj.isActiveConfig = true

    this.checkOne = true;
    this.checkTwo = false;

    this.disableConfig = false
    this.disableQues = true
    this.scrollToTop()


  }

  questionTab() {
    this.ConfigObj.isActiveConfig = false
    this.QuesObj.isActiveQues = true

  }

  showModal(whatConfig) {
    if (whatConfig === "backgroundColor") {
      this.shoModelName = "backgroundColor"
    }

    if (whatConfig === "Questions") {
      this.shoModelName = "questions"
    }


    if (whatConfig === "Answers") {
      this.shoModelName = "answers"
    }


    if (whatConfig === "hexColorButton") {
      this.shoModelName = "hexColorButton"
    }
   


    $('#showButtonColor').modal('show')

  }

  closeModal() {
    $('#showButtonColor').modal('hide')

  }
  back() {

    this.router.navigateByUrl("/");

  }

}
