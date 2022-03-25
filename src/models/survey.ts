export interface Survey {
  ansColor?: string;
  bgColor?: string;
  bgImageByte?: string[];
  bgImgString?: string;
  code?: number;
  companyId?: number;
  config?: string;
  createdBy?: string;
  createdOn?: string;
  cutOffDate?: string;
  fontStyle?: string;
  maxResponseCount?: number;
  message?: string;
  progressBar?: number;
  quesColor?: string;
  respCount?: number;
  showQuesNo?: number;
  surveyId?: number;
  surveyName?: string;
  surveyStatus?: 0;
  surveyUrl?: string;
  typeId?: number;
}

export enum SurveyTypeId {
  FOUR = 4,
  FIVE = 5,
  EIGHT = 8,
  TEN = 10,
  ELEVEN = 11
}

export enum QuestionType {
  OPINIONSCALE = 'Opinion Scale',
  MCQ = 'Multiple Choice Questions',
  RATING = 'Rating',
  TEXT = 'Text',
  EMAIL = 'Email',
  PICTURECHOICE = 'Picture Choice',
  YESORNO = 'Yes or No',
  NUMBERINPUT = 'Number Input',
  MESSAGE = 'Message',
  DATE = 'Date',
  WEBSITE = 'Website'
}
