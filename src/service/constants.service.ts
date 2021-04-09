import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  pushDefaultMsgLength:any=500;
  pushMessageLength:number;
  isSmsChannelAvailable:boolean=false;

  token = "pushToken"
  login = "auth/login";
  forgot = "auth/forgotPasswordUrl";
  ForgotPasswordV2 = "changePassword";
  validateLogin = "auth/validateLogin"
  generateOtp = "auth/generateOtp"
  //Add Operator (listGroup)
  pendingCustTxnsList = "pendingCustTxnsList"
  // .pendingCustTxnsList=".pendingCustTxnsList"
  deleteGroup = "deleteGroup";
  listBranchDup = "listBranchForSuperAdmin"
  listBranchMain = "listBranchForCompanyAdmin"
  listBranchWithHead = "listBranchWithHeadOffice"

  listBranch = "listBranch";
  listDepartment = "listDepartment";
  addOperator = "addOperator";
  getUserStatus = "getUserStatus"
  // list operator
  listOperator = "listOperator";
  getOperatorDetails = "getOperatorDetails";
  deleteOperator = "deleteOperator";
  editOperator = "modifyOperatorSubmit";
  passwordReset = "passwordReset";
  changePasswordSubmit = "auth/changePasswordSubmit";
  getApproveData = "getApproveData"
  //approve operator
  approveOperator = "approveOperator";
  pendingOperatorList = "pendingOperatorList";
  rejectOperator = "rejectOperator"

  // list Corporate
  listCorporate = "listOfCorporate";
  //addCorporate = "createCorporate";
  //getCorporateDetails = "getCorporateInfo";
  //editCorporate = "updateCorporate";
  deleteCorporate = "deleteCorporate";
  validateUserId = 'validateUserId';


  // Country Codes for All 
  listCountryCode = "auth/countryCodeMobile";
  getPropertyValueById = "getPropertyValueById";

  // myprofile
  myProfile = "auth/myProfile"
  updateMyProfile = "auth/updateMyProfile"


  //companies
  companyList = "companyList";
  listCompanyForAddUsers = "listCompanyForAddUsers"
  companyInfo = "companyInfo";
  getCompanyContact="getCompanyContact"
  getCompanyParameter="getCompanyParameter"
  getCompanyDocument = "getCompanyDocument";
  deleteCompanyDocument = "deleteCompanyDocument";
  saveCompanyDocDetails = "saveCompanyDocDetails"
  updateCompanyDocument = "updateCompanyDocument"
  downloadDocument = "downloadDocument"
  addCompany = "addCompany";
  updateCompany = "updateCompany";
  deleteCompany = "deleteCompany";
  listCity = "listCity"
  validateEmailId = "validateEmailId"
  getTheme = "getTheme"
  listMasterSystemParameters = "listMasterSystemParameters"
  getCompanyMaster = "getCompanyMaster"
  updateStatus = "updateStatus"
  updateBranchStatus = "updateBranchStatus"
  addCompanyDocument = "addCompanyDocument"
  saveApnsDocument = "saveApnsDocument"
  downloadApnsFile = "downloadApnsFile"

  // group
  listGroup = "listGroup";
  addGroup = "addGroup"
  updateGroup = "updateGroup"
  draftGroup = "draftGroup"

  // group privilege
  getGroupPrivilege = "getGroupPrivilege";
  updateGroupPrivilege = "updateGroupPrivilege"
  getDefaultPrivilege = "getDefaultPrivilege";
  approveGroup = "approveGroup";
  rejectGroup = "rejectGroup";

  //pages
  listMenu = "listMenu"
  deleteMenu = "deleteMenu"
  addMenu = "addMenu"
  updateMenu = "updateMenu"



  //service-management
  listServices = "listServices";
  serviceMessageTemplateLists = "serviceMessageTemplateList"
  listServicesDropdown = "listServicesDropdown"
  deleteService = "deleteServices";
  addService = "addServices";
  updateServices = 'updateServices';
  listforEdit = "getdefaultServicesByNotiId";
  approveServices = "approveServices";
  rejectServices = "rejectServices";
  pendingServicesList = "pendingServicesList";
  // listCategory = "listAllCategories";
  templateList = "listTemplateParameterByNotiId";
  msgTemplateList = "listMessageTemplates";
  deleteMsgTemplate = "deleteMessageTemplates";
  pendingMessageTemplatesList = "pendingMessageTemplatesList";
  regMessageTemplate = "addMessageTemplates";
  regEditMessageTemplate = "listMessageTemplatesbyNoti";
  updateMessageTemplate = "updateMessageTemplates";
  updateServiceMessageTemplates = "updateServiceMessageTemplates"
  messageTemplist = "listAllMessageTemplatesbyService";
  regTemplateParameters = "addTemplateParameters"
  regEdiTemplateParameters = "getTemplateParameterByServiceId"
  updateTemplateParameters = "updateTemplateParameters"
  deleteTemplateParameters = "deleteTemplateParameters"
  pendingTempParamList = "pendingTempParamList"
  approveTemplateParameters = "approveTemplateParameters";
  rejectTemplateParameters = "rejectTemplateParameters";
  saveServiceDrafts = "saveServiceDraft";

  saveTemplateParametersDrafts = "saveTemplateParametersDraft";
  savePromotionsDrafts = "savePromotionsDraft";
  reopenServicess = "reopenServices";
  reopenMessageTemplatess = "reopenMessageTemplates";
  reopenTemplateParameterss = "reopenTemplateParameters";
  reopenPromotions = "reopenPromotion";
  listTemplateParameterByServices = "listTemplateParameterByServices";
  listAllApiForTempParam = "listAllApiForTempParam"
  addServiceMessageTemplatess = "addServiceMessageTemplates"
  rejectMessageTemplates = "rejectServiceMessageTemplates"
  approveMessageTemplates = "approveServiceMessageTemplates"
  reopenMessageTemplates = "reopenServiceMessageTemplates"
  deleteMessageTemplates = "deleteServiceMessageTemplates"
  getMessageTemplateDetails = "getMessageTemplateDetails"
  saveMessageTemplateDrafts = "saveServiceMessageTemplateDraft";
  deleteDraft = "deleteDrafts"
  validateExistTemplateParameters = "validateExistTemplateParameter"
  getActiveChannel = "getChannelsForCompanyId"
  getServiceMasterData = "getServiceMaster"

  getServiceListByChannel = "getServiceListByChannel"
  //branch
  listBranchforCompany = "listBranchforCompany"
  addBranch = "addBranch"
  deleteBranch = "deleteBranch"
  bracheelist = "listBranches"
  addBranches = "addBranches"
  getBranchDetails = "getBranchDetails"
  updateBranches = "updateBranches"
  listAllUserssss = "listAllUsers"

  //department
  listDepartmentforCompany = "listDepartmentforCompany"
  addDepartment = "addDepartment"
  deleteDepartment = "deleteDepartment"

  corporateInfo = "corporateInfo";
  addCorporate = "addCorporate";
  updateCorporate = "updateCorporate";
  validateExistParameter = "validateExistParameter"


  // customerManagement
  searchCustomer = "searchCustomer"
  customerRegistration = "customerRegistration"
  getCustomerApproveData = "getCustomerApproveData"
  pendingCustomerList = "pendingCustomerList"
  approveOrRejectCustomer = "approveOrRejectCustomer";
  searchLocalCustomer = "searchLocalCustomer"
  updateCustomer = "updateCustomer"
  createBlocklistMobileNumbers = "createBlocklistMobileNumbers"
  viewBlockAndWhiteListMobileNumbers = "viewBlockAndWhiteListMobileNumbers"
  searchAssociateMobile = "searchAssociateMobile"
  saveAssociateNo = "saveAssociateNo";
  saveUnsubscription = "saveUnsubscription";
  searchLocalCustomerUnsub = "searchLocalCustomerexcludeUnsubs";
  searchCustforServices = "searchCustforService";

  listCustomers = "listAllCustomers";
  updateSubUnSub = "updateSubUnSub";
  getCustomerAuditLogs = "getCustomerAuditLogs"
  getCustomerDetails = "getCustomerDetails"
  listAllTmpCustomerss = "listAllTmpCustomers"
  listCustClassCode = "listCustClassCode"
  listAllChannelss = "listAllChannels"
  // pendingCustTxnsList = "pendingCustTxnsList"

  // blockitems
  viewBlockItems = "viewBlockItems"
  countBlockItems = "countBlockItems"
  blockSMS = "blockSMS"
  blockEmail = "blockEmail"
  blockCountryCode = "blockCountryCode"
  blockContent = "blockContent"
  blockSMSFileUpload = "blockSMSFileUpload"
  deleteBlockItems = "deleteBlockItems"
  exitingBlockConent = "exitingBlockConent"
  updateBlockItems = "updateBlockItems"

  createBlock = "createBlock"
  rejectBlock = "rejectBlock"
  approveBlock = "approveBlock"
  pendingForApprovalRecord = "pendingForApprovalRecord"
  //campaign
  getPushMaster = "getPushMaster"
  getTemplateByChannelName = "getTemplateByChannelName"
  getTimeZones = "getTimeZones"
  addPushSMS = "addPushSMS"
  submitPush = "submitPush"
  savePushDraft = "savePushDraft"
  listcampaignTemplate = "listcampaignTemplate"
  getCampaignTemplateByChannelId = "getCampaignTemplateByChannelId"

  // previewPush = "previewPush"


  // listPushCampaign = "listPushCampaign "
  listPushCampaign = "listPush"
  pendingPushCampaignList = "pendingPushCampaignList"
  approvePushCampaign = "approvePush"
  rejectPushCampaign = "rejectPush"
  returnToMakerPushCampaign = "returnToMakerPushCampaign";
  deletePushCampaign = "deletePushCampaign"
  listLanguage = "getLanguages"
  webToMessage = "webToMessage"
  getPushApprovalData = "getPushApprovalData"
  modifyPush = "modifyPush"
  saveSMSFile = "saveSMSFile"
  saveEmailFile = "saveEmailFile"
  savePushFile = "savePushFile"
  checkMessageBlock = "checkMessageBlock";
  checkBlockContent = "checkBlockContent"
  getSystemParam = "getSystemParam"
  messageTemplateListDropdownssss = "messageTemplateListDropdown"
  stopPush = "stopPush"
  listPromoDropdown = "listPromoDropdown"
  getFileTemplateList = "getFileTemplateList"

  getStatusM = "getStatusM";
  getOperatorStatusM = "getOperatorStatusM"

  // Distribution List
  viewDistributionList = "viewDistributionList"
  distList = "viewDistributionList"
  deleteDistributionList = "deleteDistributionList"
  createDistributionList = "createDistributionList";
  downloadContacts = "downloadContacts";
  sampleSave = "sampleSave"
  distEditName = "updateDistributionList"
  addDist = "createContactList"
  listDist = "viewContactList"
  deleteDist = "deleteContactList"
  editDist = "updateContactList"
  saveContactsFile = "saveContactsFile";
  deleteMultipleContactListDL = "deleteMultipleContactList"
  listCheckAllDetails = "countForDLActive"
  validateFileContent = "validateFileContent"
  activateInactivateContactList = "activateInactivateContactList"
  //  downlaodContacts="downlaodContacts" 
  // save file
  saveFile = "saveFile";
  downloadPushFile = "downloadPushFile"
  checkCampaignDesc = "checkCampaignDesc"
  downloadFileTemplate = "downloadFileTemplate"

  //Promotional Marketing
  // listChannels = "listAllChannels";
  listPromotions = "listPromo";
  // listPr = "listPromotions";
  addPromotions = "addPromotions";
  approvePromotions = "approvePromotions";
  updatePromotion = "updatePromotion";
  deletePromotion = "deletePromotion";
  deleteDrafts = "deleteDrafts"
  rejectPromotion = "rejectPromotion";
  promotionPendingList = "promotionPendingList";
  listforEditPromo = "getPromoListByReqId";
  // listforEditPromo = "getPromoListByServiceId";
  getSelectiveLanguage = "getSelectiveLanguage"
  registerDevice = "registerDevice";
  sendPreviewMessage = "sendPreviewMessage";
  previewPush = "previewPush"
  getActiveLanguages = "getActiveLanguages"
  // system parameter
  getMasterParam = "getMasterParam";
  listSysParameters = "listSysParameters"
  addsystemParameters = "addsystemParameters"
  listMobileAppIdDropdown = "listMobileAppIdDropdown"
  getSysParamsForCompanyId = "getSysParamsForCompanyId"

  //Message_Template_Management
  messageTemplateList = "messageTemplateList"
  createTemplate = "createTemplate"
  templateById = "templateById"
  updateTemplate = "updateTemplate"
  approveTemplate = "approveTemplate"
  rejectTemplate = "rejectTemplate"
  sampleBlockDownload = "downloadSampleForBL"

  // reports

  campaignUploadReport = "campaignUploadReport";
  campaignMessageStatusSummary = "campaignMessageStatusSummary";
  downloadReports = "downloadReports";
  campaignUploadDownload = "campaignUploadDownload";
  campaignMessageStatusSummaryDownload = "campaignMessageStatusSummaryDownload"
  campaignMessageDetailReportDownload = "campaignMessageDetailReportDownload"
  getCampaginNameByChannel = "getCampaginNameByChannel"
  getChannelByCampaginName = "getChannelByCampaginName"
  campaignMessageDetailReport = "campaignMessageDetailReport"
  campaignUploadReportUserLevel = "campaignUploadReportUserLevel";
  campaignMessageStatusSummaryUserLevel = "campaignMessageStatusSummaryUserLevel";
  campaignMessageDetailReportUserLevel = "campaignMessageDetailReportUserLevel";
  getAuditLogReport = "getAuditLogReport";
  getAduitLogReportMaster = "getAduitLogReportMaster"
  getUserProfileReportMaster = "getUserProfileReportMaster"
  getUserProfileReport = "getUserProfileReport"
  messageStatisticsDetailReport = "messageStatisticsDetailReport"
  getChannels = "getChannels"
  messageStatisticsReportDownload = "messageStatisticsReportDownload"
  auditLogReportDownload = "auditLogReportDownload"
  userProfileReportDownload = "userProfileReportDownload"
  // Dashboard
  scheduledPushSmsNotification = "scheduledPushSmsNotification";
  scheduledCount = "scheduledCount";
  getCompanyUsers = "getCompanyUsers";
  upcomingScheduleList = "upcomingScheduleList";
  scheduledCountDateWise = "scheduledCountDateWise";
  scheduledMessageCountWeekWise = "scheduledMessageCountWeekWise"
  scheduledMessageCountYearWise = "scheduledMessageCountYearWise"
  scheuledMonthCount = "scheuledMonthCount"
  getScheduleDetailsByDate = "getScheduleDetailsByDate"
  ListOfQuickLinks = "ListOfQuickLinks";
  getMenuList = "getMenuList"
  AddQuickLink = "AddQuickLink"
  saveWebToken = "saveWebToken"
  getTemplateParameterByServiceId = "getTemplateParameterByServiceId"
  getCampaignPendingCount = "getCampaignPendingCount"
  getUserPendingCount = "getUserPendingCount"
  getServicePendingCount = "getServicePendingCount"
  promoMonthCount = "promoMonthCount"
  getPromoDetailsByDate = "getPromoDetailsByDate"
  // common
  getChannel = "getChannel";

  // monitor
  notisifyHealth = "actuator/health"


  // Chatservice 
  chatOrgReg = "DucontMessenger/createorg"
  updateChattterId = "updateChatId"
  addUserChat = "DucontMessenger/signup.json"
  getCompanyDetailsById = "getCompanyDetailsById";
  conversation = "conversations.json";
  listChatUserss = "DucontMessenger/users.json"
  personal_messagess = "personal_messages"

  //Language Master
  getLanguages = "getLanguages"
  updateLanguage = "updateLanguage "


  //Campaign Category

  createCategory = "createCategory"
  viewCategoryList = "viewCategoryList"
  searchCategory = "searchCategory"
  deleteCategory = "deleteCategory"
  updateCategory = "updateCategory"
  editCategory = "editCategory"

  //Notifications
  recentNotifications = "recentNotifications"
  notificationsCounts = "unreadNotificationCounts"
  deleteNotification = "deleteNotifications"
  notificationsList = "notificationList"
  readNotificationss = "readNotifications"
  getActiveGroupList = "getActiveGroupList"

  //CampaignTemplates
  campaignTemplateLists = "listcampaignTemplate"
  rejectCampaignTemplates = "rejectcampaignTemplates"
  approveCampaignTemplates = "approvecampaignTemplate"
  reopenCampaignTemplates = "reopencampaignTemplates"
  deleteCampaignTemplates = "deletecampaignTemplate"
  draftcampaignTemplates = "draftcampaignTemplate"
  getCampaignTxnsData = "getCampaignTxnsData"
  addcampaignTemplate = "addcampaignTemplate"
  getCampaignTemplateDetails = "getCampaignTemplateDetails"
  updatecampaignTemplates = "updatecampaignTemplate"
  deleteDraftCampaignTemplate = "deleteCampaignTemplateDraft"
  validateExistMessageTemplate = "validateExistMessageTemplate"


  // MAskType
  listAllDateFormat = "listAllDateFormats"
  listMaskTypeMasterr = "listMaskTypeMaster"
  getMaskTypeForParameterById = "getMaskTypeForParameterById"
  updateMaskTypeForParameter = "updateMaskTypeForParameter"
  listMaskTypeAll = "listMaskTypes"
  deleteMaskTypeForParameter = "deleteMaskTypeForParameter"
  addMaskTypeForParameter = "addMaskTypeForParameter"

  //summary
  messageStatisticsSummary = "messageStatisticsSummary"
  messageStatisticsSummaryDownload = "messageStatisticsSummaryDownload"
  campaignSummary = "campaignSummary"
  campaignSummaryDownload = "campaignSummaryDownload"
  logout = "logout"

  countryCodeMobile = "auth/countryCodeMobile"
  getAnalyticalPrivilege="auth/getAnalyticalPrivilege"
  getRolesByUserId="auth/getRolesByUserId"


  // survey call
  fetchSurveyTypes ="/fetchSurveyTypes"
  fetchSurveyConfig="/fetchSurveyConfig"
  addSurvey="addSurvey"
  listSurveyyy="listSurvey"
  fetchQuestionType="/fetchQuestionType"
  addQuestion="v2/addQuestion"
  getSurveyDetailsUsingId = "getSurveyDetailsUsingId"
  deleteSurvey="deleteSurvey"
  deleteQuestion="deleteQuestion"
  addAnswers="addAnswer"
  deleteAnswerss="deleteAnswer"
  fetchSurveyStatuss= "fetchSurveyStatus"
  // surveyDetails="surveyDetails"
  constructor() { }
}