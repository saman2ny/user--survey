import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  login = 'auth/login';


  // survey call
  fetchSurveyTypes ='/fetchSurveyTypes';
  fetchSurveyConfig='/fetchSurveyConfig';
  addSurvey='addSurvey';
  listSurveyyy='listSurvey';
  fetchQuestionType='/fetchQuestionType';
  addQuestion='v2/addQuestion';
  getSurveyDetailsUsingId = 'getSurveyDetailsUsingId';
  deleteSurvey='deleteSurvey';
  deleteQuestion='deleteQuestion';
  addAnswers='addAnswer';
  deleteAnswerss='deleteAnswer';
  fetchSurveyStatuss= 'fetchSurveyStatus';
  // surveyDetails="surveyDetails"
  surveyReport = 'report';
  constructor() { }
}
