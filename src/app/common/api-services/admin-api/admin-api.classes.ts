export class endAuditLogDetailBind {
  tableName = '';
         primaryKey = 0;
         lstentAuditLogDetail: any = [];
        
}

export class entADMBranch {
  admBranchId = 0;
         actCompanyId = 0;
         admLocationId = 0;
         admRegionId = 0;
         branchName = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         branchCode = '';
         msg = new entIEMessage();
        
}

export class entADMBranchSearch {
  location = 0;
         branch = '';
         statusValue = '';
         fromDate = '';
         toDate = '';
         admRegionId = 0;
         actCompanyId = 0;
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entADMBranchSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
        
}

export class entADMBranchSearchResultSet {
  admBranchId = '';
         branchName = '';
         effectiveDate = '';
         statusDescription = '';
        
}

export class entAdmDepartment {
  admDepartmentId = 0;
         actCompanyId = 0;
         departmentName = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         msg = new entIEMessage();
        
}

export class entAdmDepartmentSearch {
  strdepartmentName = '';
         streffectiveDateFrom = '';
         streffectiveDateTo = '';
         strstatusValue = '';
         actCompanyId = 0;
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entAdmDepartmentSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
         msg = new entIEMessage();
        
}

export class entAdmDepartmentSearchResultSet {
  departmentId = 0;
         departmentName = '';
         effectiveDate = '';
         statusDescription = '';
        
}

export class entAdmIsland {
  admIslandId = 0;
         islandName = '';
         islandCode = '';
         admProvinceId = 0;
         freightSubsidyRate = '';
         freightRate = '';
         actCompanyId = 0;
        
}

export class entAdmIslandSearch {
  islandName = '';
         islandcode = '';
         freightSubsidyRate = '';
         freightRate = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entAdmIslandSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
        
}

export class entAdmIslandSearchResultSet {
  islandName = '';
         islandCode = '';
         freightSubsidyRate = '';
         freightRate = '';
         admIslandId = 0;
        
}

export class entAdmLocation {
  admLocationId = 0;
         actCompanyId = 0;
         admRegionId = 0;
         admProvinceId = 0;
         admIslandId = 0;
         locationName = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         regionName = '';
         msg = new entIEMessage();
        
}

export class entAdmLocationSearch {
  location = '';
         dtFromDate = '';
         dtToDate = '';
         statusValue = '';
         region = '';
         actCompanyId = 0;
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entAdmLocationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
         msg = new entIEMessage();
        
}

export class entAdmLocationSearchResultSet {
  locationName = '';
         regionName = '';
         provinceName = '';
         islandName = '';
         effectiveDate = '';
         locationId = 0;
         statusDescription = '';
        
}

export class entAdmProvince {
  admProvinceId = 0;
         provinceName = '';
         provinceCode = '';
         admRegionId = 0;
         actCompanyId = 0;
         symbolvalue = '';
         currencyvalue = '';
         msg = new entIEMessage();
         pAdmIsland = new entAdmIsland();
         plstAdmIsland: any = [];
        
}

export class entAdmProvinceSearch {
  provinceName = '';
         provinceCode = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entAdmProvinceSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
         msg = new entIEMessage();
        
}

export class entAdmProvinceSearchResultSet {
  admProvinceId = 0;
         provinceName = '';
         provinceCode = '';
        
}

export class entAdmRegion {
  admRegionId = 0;
         actCompanyId = 0;
         regionName = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         msg = new entIEMessage();
         plstAdmProvince: any = [];
        
}

export class entAdmRegionSearch {
  strregionName = '';
         streffectiveDateFrom = '';
         streffectiveDateTo = '';
         strstatusValue = '';
         actCompanyId = 0;
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entAdmRegionSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
         msg = new entIEMessage();
        
}

export class entAdmRegionSearchResultSet {
  regionId = 0;
         regionName = '';
         effectiveDate = '';
         statusDescription = '';
        
}

export class entAdmTeam {
  admTeamId = 0;
         actCompanyId = 0;
         admDepartmentId = 0;
         teamName = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         departmentName = '';
         iAdmDepartment = new entAdmDepartment();
         msg = new entIEMessage();
        
}

export class entAdmTeamSearch {
  strTeamname = '';
         streffectiveDateFrom = '';
         streffectiveDateTo = '';
         strStatusValue = '';
         department = '';
         actCompanyId = 0;
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entAdmTeamSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResultSet: any = [];
        
}

export class entAdmTeamSearchResultSet {
  teamId = 0;
         teamName = '';
         effectiveDate = '';
         statusDescription = '';
         departmentName = '';
        
}

export class entApplicationStatusFlow {
  currentSteps = 0;
         totalSteps = 0;
         lstentApplicationStatusFlowHistory: any = [];
        
}

export class entApplicationStatusFlowHistory {
  statusDescription = '';
         statusValue = '';
         changedBy = '';
         changedDate = '';
         isCompleted = false;
         isCurrent = false;
        
}

export class entAuditLog {
  auditLogId = 0;
         tableName = '';
         primaryKey = 0;
         primaryKey2 = '';
         primaryKey3 = '';
         changeModeId = 0;
         changeModeValue = '';
         machineIpAddress = '';
         referenceId = 0;
         changeModeDescription = '';
         lstAuditLogDetail: any = [];
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entAuditLogDetail {
  auditLogDetailId = 0;
         auditLogId = 0;
         columnName = '';
         oldValue = '';
         newValue = '';
         referenceId = 0;
         iAuditLog = new entAuditLog();
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         changedBy = '';
         changedDate = '';
        
}

export class entAuditLogDetailSearchList {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         plstAuditLogDetail: any = [];
        
}

export class entAuditLogSearchSet {
  tableName = '';
         primaryKey = '';
         changedMode = '';
         logCount = '';
         changedBy = '';
         auditLogId = 0;
         changedDate = '';
        
}

export class entAuditlogSearch {
  auditLogId = 0;
         tableName = '';
         primaryKey = '';
         changeModeValue = '';
         changedBy = '';
         changedFromDate = '';
         changedToDate = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entCommonparam {
  stringparam = '';
         longparam = 0;
         intparam = 0;
         dateparam = '';
         boolparam = false;
         longpara2 = 0;
         stringparam2 = '';
         msg = new entIEMessage();
        
}

export class entCommunicationTracking {
  communicationTrackingId = 0;
         fromEmailId = '';
         toEmailId = '';
         ccEmailIds = '';
         bccEmailIds = '';
         sentDate = '';
         sentStatusId = 0;
         sentStatusValue = '';
         mailContent = '';
         referenceId = 0;
         sentStatusDescription = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entCommunicationTrackingSearch {
  toMailId = '';
         statusValue = '';
         fromDate = '';
         toDate = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         ccemailids = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entCommunicationTrackingSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResult: any = [];
        
}

export class entCommunicationTrackingSearchSet {
  communicationTrackingId = 0;
         toMailId = '';
         sentStatusDescription = '';
         sentDate = '';
         mailContent = '';
         fromEmailId = '';
         ccEmailIds = '';
        
}

export class entConfig {
  configSerialId = 0;
         configId = 0;
         configValue = '';
         configDescription = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         configValueList: any = [];
         msg = new entIEMessage();
        
}

export class entConfigMetaData {
  configMetaDataId = 0;
         metaDataName = '';
         metaDataType = '';
         metaDataValue = '';
         configValueSerialId = 0;
         msg = new entIEMessage();
         referenceId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         metaDataDescription = '';
        
}

export class entConfigMetaDataList {
  configValueSerialId = 0;
         ilistentConfigMetaData: any = [];
         msg = new entIEMessage();
        
}

export class entConfigSearch {
  configSerialId = '';
         configId = '';
         configValue = '';
         configDescription = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         moduleValue = '';
         configIdFrom = '';
         configIdTo = '';
        
}

export class entConfigSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entConfigSearchSet {
  configSerialId = 0;
         configId = 0;
         configValue = '';
         configDescription = '';
        
}

export class entConfigValue {
  configId = 0;
         configConstant = '';
         configConstDescription = '';
         configValueSerialId = 0;
         referenceId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         configMetaDataList: any = [];
         msg = new entIEMessage();
         config = new entConfig();
         configmetaData = new entConfigMetaData();
         lstConfigValue: any = [];
         metaDataValue = '';
        
}

export class entCredential {
  companyId = 0;
         password = '';
         token: any = [];
         clientcode = '';
         mPin = '';
         emailId = '';
         newPassword = '';
         confirmPassword = '';
         urlDate = '';
         confirmMPin = 0;
         userLoginId = '';
         userSerialId = 0;
         pin = '';
         isPinValidation = '';
         isPasswordValidation = '';
         languagePreference = '';
         screenName = '';
         oldPassword = '';
         msg = new entIEMessage();
         clinetName = '';
        
}

export class entDDL {
  key = '';
         value: any = [];
         msg = new entIEMessage();
        
}

export class entDDLClass {
  id = 0;
         code = '';
         description = '';
         name = '';
         parentConstant = '';
         constant = '';
         fullName = '';
         vendorContactNo = '';
         vendorCode = '';
         vendorLegacyCode = '';
         stritemtype = '';
         ledgerId = 0;
         lstDDLClass: any = [];
         msg = new entIEMessage();
        
}

export class entDDLData {
  data: any = [];
         count1 = '';
         count2 = '';
         msg = new entIEMessage();
        
}

export class entGroup {
  groupId = 0;
         groupName = '';
         beginDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         referenceId = 0;
         statusDescription = '';
         ilstRoleGroup: any = [];
         ilstUserGroup: any = [];
         currentGroupRoleId = 0;
         msg = new entIEMessage();
         activeUserGroupList: any = [];
         inActiveUserGroupList: any = [];
         updateSeq = 0;
         idoObjState = '';
         catetoryId = 0;
         categoryValue = '';
        
}

export class entGroupByRoleGroup {
  pentRoleGrouplst: any = [];
         groupId = 0;
         moduleValue = '';
        
}

export class entGroupByUserGroup {
  lstentUserGrouplst: any = [];
        
}

export class entGroupByUserRequestGroup {
  userRequestId = 0;
         defaultLandingPageValue = '';
         plstentUserRequestGroupList: any = [];
        
}

export class entGroupSearchResults {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResult: any = [];
        
}

export class entGroupbyUserDepartmentTeamLink {
  userSerialId = 0;
         plstentUserDepartmentTeamLinkList: any = [];
        
}

export class entGroupbyUserRequestDepartmentTeamLink {
  userRequestId = 0;
         plstentUserRequestDepartmentTeamLinkList: any = [];
        
}

export class entGroupeSearch {
  istrgroupId = 0;
         istrgroupName = '';
         istrgroupBeginDateFrom = '';
         istrgroupBeginDateTo = '';
         istrgroupEndDateFrom = '';
         istrgroupEndDateTo = '';
         istrgroupStatusid = 0;
         istrgroupStatusvalue = '';
         istrRoleId = 0;
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         moduleValue = '';
        
}

export class entGroupeSearchset {
  groupId = 0;
         groupName = '';
         beginDate = '';
         endDate = '';
         statusDescription = '';
         moduleName = '';
        
}

export class entHolidayList {
  holidayListId = 0;
         year = 0;
         date = '';
         name = '';
         description = '';
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
        
}

export class entHolidaySearch {
  year = '';
         dateFrom = '';
         dateTo = '';
         name = '';
         description = '';
         sortColumn = '';
         sortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entHolidaySearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entHolidaySearchResultSet {
  holidayListId = 0;
         year = 0;
         date = '';
         name = '';
         description = '';
        
}

export class entIEMessage {
  infoMessage = new entMsgDetail();
         errorMessage: any = [];
         hasError = false;
        
}

export class entInt2StringData {
  data1 = 0;
         data2 = 0;
         data3 = '';
         msg = new entIEMessage();
        
}

export class entIntData {
  data = 0;
         msg = new entIEMessage();
        
}

export class entListString {
  data: any = [];
         msg = new entIEMessage();
        
}

export class entLongData {
  data = 0;
         msg = new entIEMessage();
        
}

export class entLongStringData {
  data = 0;
         data1 = '';
         msg = new entIEMessage();
        
}

export class entMenuViewNames {
  resourcename = '';
         permission = 0;
         screenName = '';
        
}

export class entMessage {
  messageId = 0;
         messageNo = 0;
         message = '';
         messageTypeId = 0;
         messageTypeValue = '';
         referenceId = 0;
         messageTypeDescription = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         messageNoFrom = '';
         messageNoTo = '';
        
}

export class entMessageSearch {
  messageId = 0;
         messageNo = 0;
         message = '';
         messageTypeValue = '';
         isortcolumn = '';
         isortorder = false;
         pageSize = 0;
         pageNumber = 0;
         messageNoFrom = '';
         messageNoTo = '';
         moduleValue = '';
        
}

export class entMessageSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResult: any = [];
         msg = new entIEMessage();
        
}

export class entMessageSearchResultSet {
  messageId = 0;
         messageNo = 0;
         message = '';
         messageTypeDescription = '';
        
}

export class entModuleBasedMessage {
  moduleName = '';
         startRange = '';
         endRange = '';
         msgcount = '';
         moduleValue = '';
         rowno = 0;
        
}

export class entModuleBasedMessageLst {
  lsttModuleBasedMessage: any = [];
         msg = new entIEMessage();
        
}

export class entMsgDetail {
  msgID = 0;
         msgType = 0;
         msgDescription = '';
        
}

export class entNewResourceSearch {
  screenName = '';
         moduleName = '';
         resourceType = '';
        
}

export class entNewResourceSearchResult {
  screenName = '';
         screenValue = '';
         resourceType = '';
         resourceName = '';
         resourceCount = '';
         moduleValue = '';
         moduleName = '';
        
}

export class entNewResourceSearchResultSet {
  lstentNewResourceSearchResult: any = [];
        
}

export class entPassingParam {
  intData1 = 0;
         intData2 = 0;
         intData3 = 0;
         strData1 = '';
         strData2 = '';
         strData3 = '';
         strData4 = '';
         strData5 = '';
         longData1 = 0;
         longData2 = 0;
         longData3 = 0;
         msg = new entIEMessage();
        
}

export class entProcessLogSearch {
  processLogId = '';
         processName = '';
         logMessage = '';
         dateFrom = '';
         dateTo = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entProcessLogSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResult: any = [];
        
}

export class entProcessLogSearchSet {
  processLogId = 0;
         processName = '';
         logMessage = '';
         dateFrom = '';
        
}

export class entResource {
  resourceId = 0;
         viewNameId = 0;
         viewNameValue = '';
         resourceName = '';
         resourceTypeId = 0;
         resourceTypeValue = '';
         resourceDescription = '';
         referenceId = 0;
         viewNameDescription = '';
         resourceTypeDescription = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         moduleValue = '';
        
}

export class entResourcePermission {
  iResourceName = '';
         iPermission = '';
        
}

export class entResourceSearch {
  resourceId = 0;
         viewNameId = 0;
         viewNameValue = '';
         resourceName = '';
         resourceTypeId = 0;
         resourceTypeValue = '';
         resourceDescription = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entResourceSearchResults {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResult: any = [];
        
}

export class entResourceSearchset {
  viewNameDescription = '';
         resourceName = '';
         resourceTypeDescription = '';
         resourceDescription = '';
         resourceId = 0;
        
}

export class entResourcelst {
  viewNameValue = '';
         moduleValue = '';
         lstentResource: any = [];
         msg = new entIEMessage();
        
}

export class entResult {
  data = '';
        
}

export class entRole {
  roleId = 0;
         roleName = '';
         statusId = 0;
         statusValue = '';
         beginDate = '';
         endDate = '';
         moduleId = 0;
         moduleValue = '';
         referenceId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         ilstRoleResource: any = [];
         statusDescription = '';
         moduleDescription = '';
         ilstentUSer: any = [];
         screenId = 0;
         screenValue = '';
         screenDescription = '';
        
}

export class entRoleGroup {
  roleGroupId = 0;
         groupId = 0;
         roleId = 0;
         beginDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         referenceId = 0;
         role = new entRole();
         ddlRolename = new entDDL();
         msg = new entIEMessage();
         statusDescription = '';
         roleName = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         ilstConfigValue: any = [];
         iGroup = new entGroup();
        
}

export class entRoleGrouplst {
  screenValue = '';
         screenName = '';
         lstentRoleGroup: any = [];
        
}

export class entRoleList {
  ilstRole: any = [];
        
}

export class entRoleResource {
  roleResourceId = 0;
         roleId = 0;
         resourceId = 0;
         permissionId = 0;
         permissionValue = '';
         referenceId = 0;
         msg = new entIEMessage();
         role = new entRole();
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         resource = new entResource();
         ilstDDLRoleName: any = [];
        
}

export class entRoleResourcelist {
  ilRoleResource: any = [];
         msg = new entIEMessage();
        
}

export class entRoleSearch {
  roleId = '';
         roleName = '';
         fromBeginDate = '';
         toBeginDate = '';
         fromEndDate = '';
         toEndDate = '';
         roleStatusId = '';
         roleStatusValue = '';
         roleModuleValue = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         screenValue = '';
        
}

export class entRoleSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         searchResult: any = [];
        
}

export class entRoleSearchset {
  roleName = '';
         moduleDescription = '';
         beginDate = '';
         endDate = '';
         statusDescription = '';
         screenDescription = '';
         roleId = 0;
        
}

export class entString2Int1 {
  data1 = 0;
         data2 = '';
         data3 = '';
         msg = new entIEMessage();
        
}

export class entStringData {
  data = '';
         msg = new entIEMessage();
        
}

export class entUser {
  userSerialId = 0;
         userLoginId = '';
         keyword = '';
         firstName = '';
         middleName = '';
         lastName = '';
         fatherName = '';
         motherName = '';
         dob = '';
         emailId = '';
         contactNumber = '';
         alternateNumber = '';
         genderId = 0;
         genderValue = '';
         webSession = '';
         keyToken = '';
         beginDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         designationId = 0;
         designationValue = '';
         locationId = 0;
         locationValue = '';
         branchId = 0;
         branchValue = '';
         employeeCode = '';
         departmentId = 0;
         departmentValue = '';
         teamId = 0;
         teamValue = '';
         referenceId = 0;
         genderDescription = '';
         designationDescription = '';
         teamDescription = '';
         branchDescription = '';
         locationDescription = '';
         statusDescription = '';
         defaultLandingValueDescription = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         userAdditionalDetail = new entUserAdditionalDetail();
         userRights: any = [];
         userGroup: any = [];
         role: any = [];
         fullname = '';
         employeeNo = '';
         attachmentSizeLimit = '';
         fileTypes = '';
         isTempPwd = '';
         userDefaultLandingPage = '';
         isManagementGroup = false;
         userBranchCode = '';
         msg = new entIEMessage();
         pentgroup = new entGroup();
         pin = '';
         plstentDDLClass: any = [];
         plstentUserTeamLink: any = [];
         departmentDescription = '';
         screenName = '';
         clientCode = '';
         isPasswordResetted = '';
         maritalStatusId = 0;
         maritalStatusValue = '';
         spouseName = '';
         spouseDob = '';
         plstentUserBranchLink: any = [];
         userFullName = '';
         isAdminUser = '';
         plstentMenuViewNames: any = [];
        
}

export class entUserAdditionalDetail {
  userAdditionalInfoId = 0;
         userSerialId = 0;
         isTempPassword = '';
         currentLoginDatetime = '';
         lastLoginDatetime = '';
         defaultLandingPage = '';
         colorCode = '';
         isSupervisor = '';
         isManager = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         defaultLandingValueDescription = '';
         ilstentDDLClass: any = [];
         msg = new entIEMessage();
         languagePreference = '';
         isAdUser = '';
         failedAttemptCount = 0;
         lastFailedAttemptDatetime = '';
         isAccountLocked = '';
         urlSendDatetime = '';
         lastPasswordResetDate = '';
         otp = '';
        
}

export class entUserBranchLink {
  userBranchLinkId = 0;
         userSerialId = 0;
         branchId = 0;
         branchValue = '';
         statusId = 0;
         statusValue = '';
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         branchDescription = '';
         referenceId = 0;
         beginDate = '';
         endDate = '';
        
}

export class entUserBranchLinkList {
  userSerialId = 0;
         plstentUserBranchLink: any = [];
         msg = new entIEMessage();
        
}

export class entUserDepartmentTeamLink {
  userDepartmentTeamLinkId = 0;
         userSerialId = 0;
         teamId = 0;
         teamValue = '';
         statusId = 0;
         statusValue = '';
         oldValue = '';
         departmentId = 0;
         departmentValue = '';
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         departmentDescription = '';
         teamDescription = '';
         statusDescription = '';
         referenceId = 0;
         beginDate = '';
         endDate = '';
        
}

export class entUserDepartmentTeamLinkList {
  departmentValue = '';
         departmentDescription = '';
         plstentUserDepartmentTeamLink: any = [];
         msg = new entIEMessage();
        
}

export class entUserGroup {
  userGroupId = 0;
         userSerialId = 0;
         groupId = 0;
         beginDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         strGroupName = '';
         strUserLoginId = '';
         strUserfullName = '';
         strUserStatus = '';
         referenceId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         iUser = new entUser();
         iGroup = new entGroup();
         msg = new entIEMessage();
        
}

export class entUserGrouplst {
  moduleValue = '';
         moduleName = '';
         lstentUserGroup: any = [];
        
}

export class entUserList {
  ilstUser: any = [];
         msg = new entIEMessage();
        
}

export class entUserRequest {
  alternateNumber = '';
         beginDate = '';
         branchId = 0;
         branchValue = '';
         contactNumber = '';
         departmentId = 0;
         departmentValue = '';
         designationId = 0;
         designationValue = '';
         dob = '';
         emailId = '';
         employeeCode = '';
         endDate = '';
         fatherName = '';
         firstName = '';
         genderId = 0;
         genderValue = '';
         keyToken = '';
         lastName = '';
         locationId = 0;
         locationValue = '';
         middleName = '';
         motherName = '';
         referenceId = 0;
         requestStatusId = 0;
         requestStatusValue = '';
         requestTypeId = 0;
         requestTypeValue = '';
         salutationTypeId = 0;
         salutationTypeValue = '';
         statusId = 0;
         statusValue = '';
         supervisorCode = '';
         teamId = 0;
         teamValue = '';
         userRequestId = 0;
         userSerialId = 0;
         webSession = '';
         modifiedBy = '';
         updateSeq = 0;
         designationDescription = '';
         fullName = '';
         genderDescription = '';
         requestStatusDescription = '';
         requestTypeDescription = '';
         salutationTypeDescription = '';
         statusDescription = '';
         plstentUserRequestAssignedOfficer: any = [];
         plstentUserRequestEmailHistory: any = [];
         plstentUserRequestGroup: any = [];
         plstentUserRequestNotes: any = [];
         plstentUserRequestStatusHistory: any = [];
         msg = new entIEMessage();
         assingenedOfficer = '';
         selfAssingened = '';
         reassigened = '';
         locationDescription = '';
         departmentDescription = '';
         teamDescription = '';
         branchDescription = '';
         idoObjState = '';
         oldValue = '';
         userLoginId = '';
         defaultLandingPageValue = '';
         plstentUserRequestTeamLink: any = [];
         lstentDDLClass: any = [];
         requestRefNo = '';
         maritalStatusId = 0;
         maritalStatusValue = '';
         spouseName = '';
         spouseDob = '';
         plstentUserRequestDepartmentTeamLink: any = [];
         plstentUserRequestBranchLink: any = [];
         isDirectRequestApprove = '';
        
}

export class entUserRequestAssignedOfficer {
  assignedDate = '';
         assignedOfficerCode = '';
         referenceId = 0;
         requestStatusId = 0;
         requestStatusValue = '';
         userRequestAssignedOfficerId = 0;
         userRequestId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         requestStatusDescription = '';
         assignedToFullName = '';
         assignedByFullName = '';
         lstentDDLClass: any = [];
        
}

export class entUserRequestBranchLink {
  userRequestBranchLinkId = 0;
         userRequestId = 0;
         branchId = 0;
         branchValue = '';
         statusId = 0;
         statusValue = '';
         oldValue = '';
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         branchDescription = '';
         referenceId = 0;
         beginDate = '';
         endDate = '';
        
}

export class entUserRequestBranchLinkList {
  userRequestId = 0;
         plstentUserRequestBranchLink: any = [];
         msg = new entIEMessage();
        
}

export class entUserRequestDepartmentTeamLink {
  userRequestDepartmentTeamLinkId = 0;
         userRequestId = 0;
         teamId = 0;
         teamValue = '';
         statusId = 0;
         statusValue = '';
         oldValue = '';
         departmentId = 0;
         departmentValue = '';
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         departmentDescription = '';
         teamDescription = '';
         statusDescription = '';
         referenceId = 0;
         beginDate = '';
         endDate = '';
        
}

export class entUserRequestDepartmentTeamLinkList {
  departmentValue = '';
         departmentDescription = '';
         plstentUserRequestDepartmentTeamLink: any = [];
         msg = new entIEMessage();
        
}

export class entUserRequestEmailHistory {
  communicationTrackingId = 0;
         referenceId = 0;
         requestStatusId = 0;
         requestStatusValue = '';
         userRequestEmailHistoryId = 0;
         userRequestId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         requestStatusDescription = '';
         pentCommunicationTracking = new entCommunicationTracking();
        
}

export class entUserRequestGroup {
  groupId = 0;
         referenceId = 0;
         userRequestGroupId = 0;
         userRequestId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         statusDescription = '';
         groupName = '';
         pentgroup = new entGroup();
         lstentDDLClass: any = [];
         userGroupId = 0;
         beginDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         oldValue = '';
        
}

export class entUserRequestGroupList {
  moduleValue = '';
         moduleName = '';
         plstentUserRequestGroup: any = [];
         msg = new entIEMessage();
         lstentDDLClass: any = [];
        
}

export class entUserRequestNotes {
  notes = '';
         referenceId = 0;
         requestStatusId = 0;
         requestStatusValue = '';
         userRequestId = 0;
         userRequestNotesId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         requestStatusDescription = '';
         lstentDDLClass: any = [];
         modifiedByFullname = '';
         modifiedDate = '';
        
}

export class entUserRequestSearch {
  firstName = '';
         emailId = '';
         contactNumber = '';
         employeeCode = '';
         groupId = 0;
         requestedBy = '';
         requestedFromDate = '';
         requestedToDate = '';
         requestRefNo = '';
         statusValue = '';
         istrSortColumn = '';
         iblSortOrder = false;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         userLoginId = '';
        
}

export class entUserRequestSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entUserRequestSearchResultset {
  userRequestId = 0;
         userSerialId = 0;
         userLoginId = '';
         requestRefNo = '';
         requestedDate = '';
         requestedBy = '';
         fullName = '';
         employeeCode = '';
         requestStatusDescription = '';
        
}

export class entUserRequestStatusHistory {
  referenceId = 0;
         requestStatusId = 0;
         requestStatusValue = '';
         userRequestId = 0;
         userRequestStatusHistoryId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         requestStatusDescription = '';
         modifiedByFullname = '';
         modifiedDate = '';
        
}

export class entUserRequestTeamLink {
  branchId = 0;
         branchValue = '';
         departmentId = 0;
         departmentValue = '';
         locationId = 0;
         locationValue = '';
         statusId = 0;
         statusValue = '';
         teamId = 0;
         teamValue = '';
         userRequestId = 0;
         userRequestTeamId = 0;
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         branchDescription = '';
         departmentDescription = '';
         locationDescription = '';
         teamDescription = '';
         changeTypeId = 0;
         changeTypeValue = '';
         changeDescription = '';
         sentUserTeamLink = new entUserTeamLink();
         oldValue = '';
        
}

export class entUserRights {
  iViewName = '';
         resourcePermission: any = [];
        
}

export class entUserSearch {
  istrUserName = '';
         istrFirstName = '';
         istrLastName = '';
         istrMiddleName = '';
         istrDesignation = '';
         istrUserStatus = '';
         idtmbeginDateFrom = '';
         idtmbeginDateTo = '';
         idtmendDateFrom = '';
         idtmendDateTo = '';
         istrGroupid = 0;
         istrGroupStatus = '';
         istrLocation = '';
         istrBranch = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         dob = '';
         emailId = '';
         contactNumber = '';
         employeeCode = '';
        
}

export class entUserSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entUserSearchset {
  userSerialId = 0;
         userLoginId = '';
         firstName = '';
         middleName = '';
         lastName = '';
         beginDateFrom = '';
         endDateFrom = '';
         statusDescription = '';
         dob = '';
         emailId = '';
         contactNumber = '';
         employeeCode = '';
         requestRefNo = '';
         requestedBy = '';
         requestedDate = '';
         employeeName = '';
        
}

export class entUserTeamLink {
  branchId = 0;
         branchValue = '';
         departmentId = 0;
         departmentValue = '';
         locationId = 0;
         locationValue = '';
         statusId = 0;
         statusValue = '';
         teamId = 0;
         teamValue = '';
         userSerialId = 0;
         userTeamId = 0;
         statusDescription = '';
         branchDescription = '';
         departmentDescription = '';
         locationDescription = '';
         teamDescription = '';
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
        
}

export class entUserURLDetail {
  iClientCode = '';
         iUserLoginId = '';
         iOtp = '';
         screenName = '';
         updateSeq = '';
        
}

export class entWorkflowSearch {
  workflowName = '';
         statusValue = '';
         sourceRefValue = '';
         sourceRefNo = '';
         stepName = '';
         stepStatusValue = '';
         assignedTo = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
        
}

export class entWorkflowSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entWorkflowSearchResultSet {
  workflowId = 0;
         workflowTemplateId = 0;
         workflowRefNo = '';
         workflowName = '';
         sourceName = '';
         sourceRefValue = '';
         sourceRefNo = '';
         sourcePrimaryKey = 0;
         workflowElementStepId = 0;
         stepName = '';
         stepStatusDescription = '';
         workflowTemplateElementId = 0;
         actualTatInMinutes = '';
         assignedTo = '';
         assignedDateTime = '';
         slaDay = 0;
         slaHour = 0;
         slaMin = 0;
         escalationLevel = 0;
         remainingTatInMinutes = '';
         totalTatInMinutes = '';
         completedTatInMinutes = '';
         tatCompletedPercentage = '';
         assignedToFullName = '';
         workflowStatusDescription = '';
         totalTatInWords = '';
         completedTatInWords = '';
         remainingTatInWords = '';
         expectedCompletionDateTime = '';
        
}

export class entWorkflowSet {
  workflowSetId = 0;
         workflowTemplateId = 0;
         setGuid = '';
         setName = '';
         topCoordinate = '';
         leftCoordinate = '';
         blnSaveAllElements = false;
         plstentWorkflowTemplateElement: any = [];
         pCurrententWorkflowTemplateElement = new entWorkflowTemplateElement();
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
        
}

export class entWorkflowTemplate {
  workflowTemplateId = 0;
         guid = '';
         name = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         effectiveDate = '';
         plstentWorkflowSet: any = [];
         pCurrententWorkflowSet = new entWorkflowSet();
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         totalTemplateTat = '';
         totalTatDays = 0;
         totalTatHours = 0;
         totalTatMinutes = 0;
        
}

export class entWorkflowTemplateElement {
  workflowTemplateElementId = 0;
         workflowSetId = 0;
         elementRefNo = '';
         elementTypeId = 0;
         elementTypeValue = '';
         elementTypeDescription = '';
         previousElementGuid = '';
         parentTemplateElementGuid = '';
         sequenceNo = 0;
         plstentWorkflowTemplateElementProperties: any = [];
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         isSaveOrUpdate = '';
         plstConditionElements = new entWorkflowTemplateElementList();
        
}

export class entWorkflowTemplateElementList {
  plstElements: any = [];
        
}

export class entWorkflowTemplateElementProperties {
  workflowTemplateElementPropertiesId = 0;
         workflowTemplateElementId = 0;
         workflowTemplateParentElementPropertiesId = 0;
         propertyNameId = 0;
         propertyNameValue = '';
         propertyNameDescription = '';
         propertyValue = '';
         datatype = '';
         isMandatory = '';
         idoObjState = '';
         updateSeq = 0;
         isStep = false;
         propertyOptionKey = '';
         propertyOptionKeyName = '';
         fieldType = '';
         percision = 0;
         decimalValue = 0;
         minLength = 0;
         maxLength = 0;
         minValue = 0;
         maxValue = 0;
         filterBy = '';
         msg = new entIEMessage();
         plstDDLPropertyOptions: any = [];
         pConfiguredWorkflowTemplateElementSubProperties = new entWorkflowTemplateElementSubProperties();
        
}

export class entWorkflowTemplateElementSubProperties {
  workflowTemplateElementPropertiesId = 0;
         workflowTemplateElementId = 0;
         workflowTemplateParentElementPropertiesId = 0;
         propertyNameId = 0;
         propertyNameValue = '';
         propertyNameDescription = '';
         propertyValue = '';
         datatype = '';
         isMandatory = '';
         idoObjState = '';
         updateSeq = 0;
         isStep = false;
         propertyOptionKey = '';
         propertyOptionKeyName = '';
         fieldType = '';
         percision = 0;
         decimalValue = 0;
         minLength = 0;
         maxLength = 0;
         minValue = 0;
         maxValue = 0;
         filterBy = '';
         msg = new entIEMessage();
         plstDDLPropertyOptions: any = [];
        
}

export class entWorkflowTemplateMaster {
  pentWorkflowTemplate = new entWorkflowTemplate();
         plstentWorkflowTemplateDefaultElements: any = [];
         msg = new entIEMessage();
        
}

export class entWorkflowTemplateResultSet {
  plstentWorkflowTemplateSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entWorkflowTemplateSearch {
  guid = '';
         name = '';
         statusValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         sortColumn = '';
         sortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entWorkflowTemplateSearchResultSet {
  guid = '';
         name = '';
         statusDescription = '';
         effectiveDate = '';
         workflowTemplateId = 0;
        
}

export class entconfigValueList {
  ilistConfigValue: any = [];
         msg = new entIEMessage();
        
}




