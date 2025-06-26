export class ListentEventMappingList {
  lstentEventMappingList: any = [];
         msg = new entIEMessage();
        
}

export class entAccountSearch {
  accountTypeValue = '';
         dateFrom = '';
         dateTo = '';
         accountNo = '';
         customerId = 0;
         statusValue = '';
         fileId = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         staffUserId = '';
         fileNo = '';
         fullname = '';
        
}

export class entAccountSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entAccountSearchResultSet {
  accountId = 0;
         date = '';
         accountNo = '';
         fileNo = '';
         statusDescription = '';
         accountTypeDescription = '';
         fullname = '';
        
}

export class entActCustomerDetails {
  actCustomerId = 0;
         customerRefno = '';
         customerName = '';
         contactNo = '';
         emailId = '';
         dateOfBirth = '';
         customerTinNumber = '';
        
}

export class entActCustomerDetailsLst {
  lstentActCustomerDetails: any = [];
         ientActCustomerDetails = new entActCustomerDetails();
         msg = new entIEMessage();
        
}

export class entActCustomerSearch {
  customerName = '';
         contactno = '';
         customerrefno = '';
         emailid = '';
         dtmDateOfBrith = '';
         status = '';
         type = '';
         subtype = '';
         credittype = '';
         actCompanyId = 0;
         creditduration = '';
         customerid = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         createdDateFrom = '';
         createdDateTo = '';
         customerCurrencyCodeValue = '';
         isNetoutVoucherSearch = '';
         voucherType = '';
         crmOrAccount = '';
        
}

export class entAddress {
  addressId = 0;
         line1 = '';
         line2 = '';
         line3 = '';
         provinceId = 0;
         islandId = 0;
         tikinaId = 0;
         provinceDescription = '';
         islandDescription = '';
         village = '';
         tikinaDescription = '';
         poBoxNo = '';
         idoObjState = '';
         updateSeq = 0;
        
}

export class entBank {
  bankId = 0;
         bankName = '';
         bankCode = '';
         swiftCode = '';
         ifscCode = '';
         bankAddressId = 0;
         branchTypeId = 0;
         branchTypeValue = '';
         branchTypeDescription = '';
         headOfficeBankId = 0;
         ientAddress = new entAddress();
         idoObjState = '';
         updateSeq = 0;
         headOfficeBank = '';
        
}

export class entBankSearch {
  bankName = '';
         bankCode = '';
         swiftCode = '';
         ifscCode = '';
         branchTypeValue = '';
         headOfficeBankId = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
        
}

export class entBankSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entBankSearchResultSet {
  bankId = 0;
         bankName = '';
         bankCode = '';
         swiftCode = '';
         ifscCode = '';
         headOfficeBankName = '';
         headOfficeBankId = 0;
         branchTypeDescription = '';
        
}

export class entByteData {
  byteData: any = [];
         msg = new entIEMessage();
         contentType = '';
         fileName = '';
        
}

export class entCashCounter {
  cashCounterId = 0;
         cashCounterName = '';
         cashCounterNo = '';
         cashCounterCode = '';
         branchId = 0;
         branchValue = '';
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         branchDescription = '';
         statusDescription = '';
         lastDateOfOPeration = '';
         exportToExcelFileContent = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         previousCashCounterStatus = '';
         enteredByFullName = '';
         lastReceiptNo = '';
         receiptFileId = '';
         assignedOfficerFlag = false;
         selfAssignFlag = false;
         reAssignFlag = false;
         plstCashCounterTiming: any = [];
         plstCashCounterStatusHistory: any = [];
         ilstCashCounterAssignedOfficerHistory: any = [];
         ilstCashCounterAssignedCashierHistory: any = [];
         ilstCashCounterAssignedCashier: any = [];
         msg = new entIEMessage();
         plstCashCounterNotes: any = [];
         plstCashCounterDepositBook: any = [];
         plstCashCounterEmailHistory: any = [];
         lstentCashCounterEmailHistory: any = [];
         ientCashCounterEmailHistory = new entCashCounterEmailHistory();
         pentDepositBookSearchResult = new entDepositBookSearchResult();
        
}

export class entCashCounterAssignedCashier {
  cashCounterAssignedCashierId = 0;
         cashCounterId = 0;
         assignedUserId = 0;
         startDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         notes = '';
         cashierName = '';
         statusDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         lstentCashCounterAssignedCashierHistory: any = [];
         lentCashCounterAssignedCashierHistory = new entCashCounterAssignedCashierHistory();
        
}

export class entCashCounterAssignedCashierHistory {
  cashCounterAssignedCashierHistoryId = 0;
         cashCounterAssignedCashierId = 0;
         assignedUserId = 0;
         startDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         notes = '';
         changedBy = '';
         changedDate = '';
         updateSeq = 0;
         idoObjState = '';
         cashierName = '';
         statusDescription = '';
         changedByFullName = '';
        
}

export class entCashCounterAssignedOfficerHistory {
  cashCounterAssignedOfficerHistoryId = 0;
         cashCounterId = 0;
         assignedOfficer = '';
         assignedBy = '';
         assignedDate = '';
         statusId = 0;
         statusValue = '';
         branchId = 0;
         branchValue = '';
         updateSeq = 0;
         idoObjState = '';
         statusDescription = '';
         assignedOfficerFullName = '';
         assignedByFullName = '';
         isAllowedToReAssign = '';
         branchDescription = '';
         ientDDL = new entDDL();
         msg = new entIEMessage();
        
}

export class entCashCounterDepositBook {
  cashCounterDepositBookId = 0;
         depositBookNo = '';
         cashCounterId = 0;
         cashCounterAssignedCashierId = 0;
         effectiveDate = '';
         openTime = '';
         closeTime = '';
         statusId = 0;
         statusValue = '';
         reconciledBy = '';
         reconciledDate = '';
         statusDescription = '';
         initialBranchConst = '';
         branchName = '';
         cashCounterNo = '';
         cashierName = '';
         totalTransaction = '';
         depositSlip = '';
         exportToExcelFileContent = '';
         iCashCounter = new entCashCounter();
         lstCashCounterDepositBookChequeDetail: any = [];
         plstentTransactionPosting: any = [];
         lstCashCounterDepositBookStatusHistory: any = [];
         plstentTransactionPostingSearchResult: any = [];
         iCashCounterDepositBookSummary = new entCashCounterDepositBookSummary();
         iCashCounterDepositBookNotes = new entCashCounterDepositBookNotes();
         lstCashCounterDepositBookNotes: any = [];
         lstCashCounterDepositBookSummary: any = [];
         iCashCounterDepositBookEmailHistory = new entCashCounterDepositBookEmailHistory();
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         prevCreatedBy = '';
         prevStatusValue = '';
         msg = new entIEMessage();
         lentDDLClass = new entDDLClass();
         entDDLClassBranch: any = [];
         branchFullName = '';
         ilstDepositSearchResult = new entDepositSearchResult();
         pentDDLClassStatus: any = [];
         lstentDepositBookSearchResult: any = [];
         pentTransactionPostingSearchResult = new entTransactionPostingSearchResult();
         branchDescription = '';
         cashCounterDepositBookSummaryId = 0;
         branchValue = '';
         isdepositBookUpdate = '';
         pentCashCounterDepositBookChequeDetail = new entCashCounterDepositBookChequeDetail();
        
}

export class entCashCounterDepositBookChequeDetail {
  cashCounterDepositBookChequeDetailId = 0;
         cashCounterDepositBookId = 0;
         chequeNo = '';
         chequeAmount = '';
         issuedDate = '';
         issuedBankName = '';
         locationId = 0;
         locationValue = '';
         branchCode = '';
         isOpeningCheque = '';
         collectedByFinance = '';
         locationDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         prevBranchCode = '';
         prevLocationValue = '';
         prevChequeNo = '';
         prevChequeAmount = '';
         prevIssuedDate = '';
         prevIssuedBankName = '';
         receiptDetailId = 0;
        
}

export class entCashCounterDepositBookEmailHistory {
  cashCounterDepositBookEmailHistoryId = 0;
         cashCounterDepositBookId = 0;
         emailTrackingId = 0;
         cashCounterDepositBookStatusId = 0;
         cashCounterDepositBookStatusValue = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entCashCounterDepositBookNotes {
  cashCounterDepositBookNotesId = 0;
         cashCounterDepositBookId = 0;
         notes = '';
         statusId = 0;
         statusValue = '';
         enteredBy = '';
         enteredDate = '';
         statusDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         enteredByFullName = '';
         ientDDL = new entDDL();
        
}

export class entCashCounterDepositBookStatusHistory {
  cashCounterDepositBookStatusHistoryId = 0;
         cashCounterDepositBookId = 0;
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         statusDescription = '';
         updatedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entCashCounterDepositBookSummary {
  cashCounterDepositBookSummaryId = 0;
         cashCounterDepositBookId = 0;
         receiptModeId = 0;
         receiptModeValue = '';
         openingAmount = '';
         closingAmount = '';
         computedAmount = '';
         mismatchAmount = '';
         chequeReconciled = '';
         collectedByFinance = '';
         receiptModeDescription = '';
         isBoolClosingBalance = '';
         updateSeq = 0;
         idoObjState = '';
         prevOpeningAmount = '';
         prevMismatchAmount = '';
         prevCollectedByFinance = '';
         msg = new entIEMessage();
         plstDepositSummaryDenomination: any = [];
        
}

export class entCashCounterEmailHistory {
  cashCounterEmailHistoryId = 0;
         cashCounterId = 0;
         emailTrackingId = 0;
         sendBy = '';
         sendDate = '';
         cashCounterStatusId = 0;
         cashCounterStatusValue = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         ientCommunicationTracking = new entCommunicationTracking();
         sendOfficerFullName = '';
        
}

export class entCashCounterNotes {
  cashCounterNotesId = 0;
         cashCounterId = 0;
         notes = '';
         statusId = 0;
         statusValue = '';
         enteredBy = '';
         enteredDate = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         statusDescription = '';
         ientDDL = new entDDL();
         enteredByFullName = '';
         msg = new entIEMessage();
        
}

export class entCashCounterSearch {
  cashcounterName = '';
         cashCounterNo = '';
         statusValue = '';
         branchValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         assignedUserId = 0;
         istrSortOrder = false;
         istrSortColumn = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entCashCounterSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstentCashCounterSearchSet: any = [];
        
}

export class entCashCounterSearchSet {
  cashcounterName = '';
         cashCounterNo = '';
         statusDescription = '';
         branchDescription = '';
         cashCounterId = 0;
         effectiveDate = '';
        
}

export class entCashCounterStatusHistory {
  cashCounterStatusHistoryId = 0;
         cashCounterId = 0;
         cashCounterStatusId = 0;
         cashCounterStatusValue = '';
         changedBy = '';
         changedDate = '';
         cashCounterStatusDescription = '';
         changedByFullName = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entCashCounterTiming {
  cashCounterTimingId = 0;
         cashCounterId = 0;
         dayId = 0;
         dayValue = '';
         startTime = '';
         endTime = '';
         breakStarttime = '';
         breakEndtime = '';
         isHoliday = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         dayDescription = '';
         msg = new entIEMessage();
        
}

export class entCashCounterTimingList {
  lstentCashCounterTiming: any = [];
         msg = new entIEMessage();
         lentCashCounterTiming = new entCashCounterTiming();
        
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

export class entCompanyUser {
  ientUser = new entUser();
         companyCurrencyValue = '';
         companySymbolValue = '';
         companyName = '';
         companyLogo = '';
         companyId = 0;
         branchName = '';
         commaSeparatorValue = '';
         noOfDecimalPlaces = 0;
         fiscalYearList = '';
         corporateAccount = '';
         genralAccount = '';
         fiscalYear = '';
        
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

export class entCostCategory {
  costCategoryId = 0;
         costCategoryName = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         addedBy = '';
         addedDate = '';
         addedByFullname = '';
         updateSeq = '';
         idoObjState = '';
         plstentCostCenter: any = [];
         plstentCostCategoryStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entCostCategoryList {
  plstentCostCategory: any = [];
         msg = new entIEMessage();
        
}

export class entCostCategorySearch {
  costCategoryName = '';
         statusValue = '';
         addedBy = '';
         addedDateFrom = '';
         addedDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
        
}

export class entCostCategorySearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         lstentCostCategorySearchResultSet: any = [];
        
}

export class entCostCategorySearchResultSet {
  costCategoryId = 0;
         costCategoryName = '';
         statusDescription = '';
         addedByFullname = '';
         addedDate = '';
        
}

export class entCostCategoryStatusHistory {
  costCategoryStatusHistoryId = 0;
         costCategoryId = 0;
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByFullname = '';
         msg = new entIEMessage();
        
}

export class entCostCenter {
  costCentreId = 0;
         costCategoryId = 0;
         costCentreName = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         addedBy = '';
         addedDate = '';
         addedByFullname = '';
         updateSeq = '';
         idoObjState = '';
         plstentCostCenterStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entCostCenterAllocation {
  costCentreAllocationId = 0;
         costCategoryId = '';
         costCentreId = '';
         ledgerId = '';
         fiscalYearId = '';
         allocatedPercentage = '';
         addedBy = '';
         addedDate = '';
         addedByFullname = '';
         updateSeq = '';
         idoObjState = '';
         plstentCostCenterAllocationUpdateHistory: any = [];
         plstentFinCostCenterTransaction: any = [];
         msg = new entIEMessage();
        
}

export class entCostCenterAllocationList {
  plstentCostCenterAllocation: any = [];
         msg = new entIEMessage();
        
}

export class entCostCenterAllocationSearch {
  costCategoryId = '';
         costCentreId = '';
         ledgerId = '';
         fiscalYearId = '';
         addedBy = '';
         addedDateFrom = '';
         addedDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         msg = new entIEMessage();
        
}

export class entCostCenterAllocationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         lstentCostCenterAllocationSearchResultSet: any = [];
        
}

export class entCostCenterAllocationSearchResultSet {
  costCentreAllocationId = 0;
         costCategoryName = '';
         costCentreName = '';
         ledger = '';
         allocatedPercentage = '';
         addedByFullname = '';
         addedDate = '';
        
}

export class entCostCenterAllocationUpdateHistory {
  costCentreAllocationUpdateHistoryId = 0;
         costCentreAllocationId = 0;
         costCategoryId = 0;
         costCentreId = 0;
         allocatedPercentage = '';
         changedBy = '';
         changedDate = '';
         oldData = '';
         changedByFullname = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entCostCenterList {
  plstentCostCenter: any = [];
         msg = new entIEMessage();
        
}

export class entCostCenterSearch {
  costCentreName = '';
         statusValue = '';
         addedBy = '';
         addedDateFrom = '';
         addedDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         msg = new entIEMessage();
        
}

export class entCostCenterSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         lstentCostCenterSearchResultSet: any = [];
        
}

export class entCostCenterSearchResultSet {
  costCentreId = 0;
         costCentreName = '';
         statusDescription = '';
         addedBy = '';
         addedDate = '';
        
}

export class entCostCenterStatusHistory {
  costCentreStatusHistoryId = 0;
         costCentreId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         changedBy = '';
         changedDate = '';
         changedByFullname = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
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
         applicationEmailUrl = '';
        
}

export class entCrmCustomerBank {
  customerBankId = 0;
         customerId = 0;
         accountNo = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         bankId = 0;
         ientBank = new entBank();
         lstentBank: any = [];
         idoObjState = '';
         updateSeq = 0;
         editableFlag = '';
         msg = new entIEMessage();
         headOfficeBank = '';
        
}

export class entCustomer {
  customerId = 0;
         customerRefNo = '';
         firstName = '';
         middleName = '';
         lastName = '';
         dateOfBirth = '';
         genderId = 0;
         genderValue = '';
         genderDescription = '';
         contactNo = '';
         alternateContactNo = '';
         emailId = '';
         permanentAddressId = 0;
         residentialAddressId = 0;
         fnpfNo = '';
         driverLicenseNo = '';
         voterId = '';
         nationalId = '';
         tin = '';
         passportNo = '';
         nationalityId = 0;
         nationalityValue = '';
         nationalityDescription = '';
         customerStatusId = 0;
         customerStatusValue = '';
         customerStatusDescription = '';
         facebookId = '';
         linkedinId = '';
         whatsappNumber = '';
         viberNumber = '';
         skypeId = '';
         fatherName = '';
         motherName = '';
         gaurdianName = '';
         dateOfDeath = '';
         ientCustomerDocument = new entCustomerDocument();
         ientCustomerPhoto = new entCustomerPhoto();
         ientCustomerNotes = new entCustomerNotes();
         ientLead = new entLead();
         lstentCustomerDocument: any = [];
         lstentCustomerNotes: any = [];
         lstentLead: any = [];
         lstentCustomerService: any = [];
         ientCustomerService = new entCustomerService();
         iPermanentaddress = new entAddress();
         iResidentialaddress = new entAddress();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         previousStatusValue = '';
         ientCrmCustomerBank = new entCrmCustomerBank();
         entCrmCustomerBankList: any = [];
         customerServiceCount = 0;
         leadCount = 0;
         screenName = '';
         studentId = '';
         schoolName = '';
         employerName = '';
         employerAddressId = 0;
         netSalary = '';
         occupation = '';
         iEmployerAddress = new entAddress();
         ientCustomerType = new entCustomerType();
         lstentCustomerType: any = [];
         customerBankCount = 0;
         customerDocumentCount = 0;
         customerStatusCount = 0;
         customerNotesCount = 0;
         customerUpdateCount = 0;
         isCustomerEtit = '';
         trustAccountCount = 0;
         lstentPassingParam: any = [];
         isResidential = '';
         isAddInfoSaveOrUpdate = '';
         isCustomerUpdateNewFlge = '';
         trustCount = 0;
         willCount = 0;
         estateCount = 0;
         legalOrOtherServiceCount = 0;
         birthRegNo = '';
         customerName = '';
        
}

export class entCustomerBankList {
  entCrmCustomerBankList: any = [];
         ientCrmCustomerBank = new entCrmCustomerBank();
         msg = new entIEMessage();
        
}

export class entCustomerDashboard {
  customerCount = 0;
         serviceCount = 0;
         leadCount = 0;
         datasets: any = [];
         labels: any = [];
         msg = new entIEMessage();
        
}

export class entCustomerDocument {
  customerDocumentId = 0;
         customerId = 0;
         docTypeId = 0;
         docTypeValue = '';
         docTypeDescription = '';
         otherDocName = '';
         fileId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         createdByFullname = '';
         createdDate = '';
         customerRefNo = '';
         enteredDate = '';
         enteredBy = '';
         isMandatory = '';
         docRefNo = '';
         sourceId = 0;
         sourceValue = '';
         sourceDescription = '';
        
}

export class entCustomerDocumentList {
  lstentCustomerDocument: any = [];
         msg = new entIEMessage();
         ientCustomerDocument = new entCustomerDocument();
        
}

export class entCustomerNotes {
  customerNotesId = 0;
         customerId = 0;
         notes = '';
         enteredBy = '';
         enteredDate = '';
         customerStatusId = 0;
         customerStatusValue = '';
         customerStatusDescription = '';
         ientDDL = new entDDL();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         enteredByFullName = '';
        
}

export class entCustomerNotesList {
  lstentCustomerNotes: any = [];
         lentCustomerNotes = new entCustomerNotes();
         msg = new entIEMessage();
        
}

export class entCustomerPhoto {
  customerPhotoId = 0;
         customerId = 0;
         photoFileTypeId = 0;
         photoFileTypeValue = '';
         photoFileTypeDescription = '';
         fileSize = '';
         fileContent = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entCustomerSearch {
  customerRefNo = '';
         customerStatusValue = '';
         genderValue = '';
         firstName = '';
         lastName = '';
         middleName = '';
         dateOfBirth = '';
         dateOfBirthFrom = '';
         dateOfBirthTo = '';
         emailId = '';
         contactNo = '';
         pfNo = '';
         drivingLicenseNo = '';
         voterId = '';
         nationalId = '';
         tin = '';
         passportNo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         isAddInfoScreen = '';
        
}

export class entCustomerSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entCustomerSearchResultSet {
  customerId = 0;
         customerRefNo = '';
         genderDescription = '';
         dateOfBrith = '';
         emailId = '';
         contactNo = '';
         statusdescription = '';
         customerName = '';
         statusValue = '';
        
}

export class entCustomerService {
  customerServiceId = 0;
         customerId = 0;
         serviceRefNo = '';
         qmsTicketNo = '';
         serviceTypeId = 0;
         serviceTypeValue = '';
         serviceTypeDescription = '';
         contactModeId = 0;
         contactModeValue = '';
         contactModeDescription = '';
         branchId = 0;
         branchValue = '';
         branchDescription = '';
         serviceDatetime = '';
         servicedBy = '';
         serviceNote = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         communicationTypeId = 0;
         communicationTypeValue = '';
         communicationTypeDescription = '';
         previousStatusValue = '';
         entCustomerServiceStatusHistoryList: any = [];
         lstentLead: any = [];
         ientLead = new entLead();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         customerRefNo = '';
         customerName = '';
         customerContactNo = '';
         customerEmailId = '';
         customerDateOfBirth = '';
         customerGenderDescription = '';
         leadCount = 0;
         servicedByFullname = '';
         createdByFullname = '';
         createdDate = '';
         customerAlternateContactNo = '';
         customerNationality = '';
         customerFatherName = '';
         customerMotherName = '';
         customerGuardianName = '';
         customerStatus = '';
         screenName = '';
         notesFlag = '';
         createdBy = '';
         customerServiceEditFlag = '';
         ibranchddl = new entDDL();
         fnpfNo = '';
         voterId = '';
         passportNo = '';
         driverLicenseNo = '';
         nationalId = '';
         tin = '';
         ientCustomerServiceDocument = new entCustomerServiceDocument();
         lstentCustomerServiceDocument: any = [];
         ientCustomerServiceCommunicationHistory = new entCustomerServiceCommunicationHistory();
         lstentCustomerServiceCommunicationHistory: any = [];
         lstentCustomerService: any = [];
         birthRegNo = '';
         customerStatusValue = '';
        
}

export class entCustomerServiceCommunicationHistory {
  customerServiceCommunicationEmialHistoryId = 0;
         customerServiceId = 0;
         emialCommunicationId = 0;
         statusId = 0;
         statusValue = '';
         sendBy = '';
         sendDate = '';
         statusDescription = '';
         sendByFullname = '';
         ientCommunicationTracking = new entCommunicationTracking();
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
        
}

export class entCustomerServiceCommunicationHistoryList {
  entCustomerServiceCommunicationHistoryList: any = [];
         ientCustomerServiceCommunicationHistory = new entCustomerServiceCommunicationHistory();
         msg = new entIEMessage();
        
}

export class entCustomerServiceDocument {
  customerServiceDocumentId = 0;
         customerServiceId = 0;
         docTypeId = 0;
         docTypeValue = '';
         otherDocName = '';
         fileId = 0;
         enteredBy = '';
         enteredDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         createdByFullname = '';
         createdDate = '';
         isMandatory = '';
         docTypeDescription = '';
         customerServiceRefNo = '';
         docRefNo = '';
         sourceId = 0;
         sourceValue = '';
         sourceDescription = '';
        
}

export class entCustomerServiceDocumentList {
  lstentCustomerServiceDocument: any = [];
         msg = new entIEMessage();
         ientCustomerServiceDocument = new entCustomerServiceDocument();
        
}

export class entCustomerServiceLeadSearch {
  serviceRefNo = '';
         leadRefNo = '';
         customerRefNo = '';
         leadTypeValue = '';
         assignedDepartmentValue = '';
         productTypeValue = '';
         statusValue = '';
         createdBy = '';
         createdDateFrom = '';
         createdDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
        
}

export class entCustomerServiceLeadSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entCustomerServiceList {
  entCustomerServiceList: any = [];
         ientCustomerService = new entCustomerService();
         msg = new entIEMessage();
        
}

export class entCustomerServiceSearch {
  serviceRefNo = '';
         firstName = '';
         lastName = '';
         middleName = '';
         customerRefNo = '';
         serviceTypeValue = '';
         branchValue = '';
         statusValue = '';
         communicationTypeValue = '';
         servicedBy = '';
         serviceDate = '';
         serviceDateTo = '';
         serviceDateFrom = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         customerId = 0;
         customerName = '';
        
}

export class entCustomerServiceSearchLeadResultSet {
  leadId = 0;
         leadRefNo = '';
         serviceRefNo = '';
         customerRefNo = '';
         customerName = '';
         leadTypeDescription = '';
         productTypeDescription = '';
         createdBy = '';
         createdDate = '';
         statusDescription = '';
         statusValue = '';
         description = '';
         duration = 0;
         trustApplRefNo = '';
         trustApplicationStatusValue = '';
         trustApplicationStatusDescription = '';
        
}

export class entCustomerServiceSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entCustomerServiceSearchResultSet {
  customerServiceId = 0;
         serviceRefNo = '';
         customerName = '';
         customerRefNo = '';
         serviceTypeDescription = '';
         branchDescription = '';
         serviceDate = '';
         serviceBy = '';
         statusDescription = '';
         statusValue = '';
         leadCount = 0;
         duration = 0;
         serviceNote = '';
        
}

export class entCustomerServiceStatusHistory {
  customerServiceStatusHistoryId = 0;
         customerServiceId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         changedBy = '';
         changedDate = '';
         changedByFullname = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entCustomerServiceStatusHistoryList {
  listentCustomerServiceStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entCustomerStatusHistory {
  customerStatusHistoryId = 0;
         customerId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         changedBy = '';
         changedByFullname = '';
         changedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entCustomerStatusHistoryList {
  listentCustomerStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entCustomerType {
  crmCustomerTypeId = 0;
         crmCustomerId = 0;
         customerTypeId = 0;
         customerTypeValue = '';
         customerTypeDescription = '';
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         isChecked = '';
        
}

export class entCustomerTypeList {
  lstentCustomerType: any = [];
         msg = new entIEMessage();
         ientCustomerType = new entCustomerType();
        
}

export class entCustomerUpdate {
  customerUpdateId = 0;
         customerId = '';
         firstName = '';
         middleName = '';
         lastName = '';
         dateOfBirth = '';
         genderId = 0;
         genderValue = '';
         genderDescription = '';
         contactNo = '';
         alternateContactNo = '';
         emailId = '';
         permanentAddressId = 0;
         residentialAddressId = 0;
         pfNo = '';
         driverLicenseNo = '';
         voterId = '';
         nationalId = '';
         tin = '';
         passportNo = '';
         nationalityId = 0;
         nationalityValue = '';
         nationalityDescription = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         facebookId = '';
         linkedinId = '';
         whatsappNumber = '';
         viberNumber = '';
         skypeId = '';
         fatherName = '';
         motherName = '';
         gaurdianName = '';
         dateOfDeath = '';
         iPermanentaddress = new entAddress();
         iResidentialaddress = new entAddress();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         previousStatusValue = '';
         ientCustomerUpdateDocument = new entCustomerUpdateDocument();
         ientCustomerUpdatePhoto = new entCustomerUpdatePhoto();
         ientCustomerUpdateNotes = new entCustomerUpdateNotes();
         lstentCustomerUpdateDocument: any = [];
         lstentCustomerUpdateNotes: any = [];
         ientCustomerUpdateBank = new entCustomerUpdateBank();
         entCustomerUpdateBankList: any = [];
         oldValue = '';
         customerUpdateRefNo = '';
         assignedOfficerFlag = '';
         reAssignFlag = '';
         selfAssignFlag = '';
         enteredBy = '';
         enteredByFullname = '';
         enteredDate = '';
         ientCustomerUpdateAssignedOfficerHistory = new entCustomerUpdateAssignedOfficerHistory();
         lstentCustomerUpdateAssignedOfficerHistory: any = [];
         screenName = '';
         customerStatus = '';
         customerNo = '';
         studentId = '';
         schoolName = '';
         employerName = '';
         employerAddressId = 0;
         netSalary = '';
         occupation = '';
         iEmployerAddress = new entAddress();
         customerUpdateBankCount = 0;
         customerUpdateDocumentCount = 0;
         customerUpdateStatusCount = 0;
         customerUpdateNotesCount = 0;
         customerUpdateAssignedOfficerCount = 0;
         customerUpdateEmailCount = 0;
         ientCustomerUpdateType = new entCustomerUpdateType();
         lstentCustomerUpdateType: any = [];
         isResidential = '';
         birthRegNo = '';
         customerServiceCount = 0;
         leadCount = 0;
         trustAccountCount = 0;
         trustCount = 0;
         willCount = 0;
         estateCount = 0;
         legalOrOtherServiceCount = 0;
         lstentPassingParam: any = [];
         customerStatusValue = '';
         workflowId = 0;
        
}

export class entCustomerUpdateAssignedOfficerHistory {
  customerUpdateAssignedOfficerHistoryId = 0;
         customerUpdateId = 0;
         assignedTo = '';
         assignedDate = '';
         assignedToFullname = '';
         assignedByFullname = '';
         assignedBy = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entCustomerUpdateAssignedOfficerHistoryList {
  entCustomerUpdateAssignedOfficerList: any = [];
         ientCustomerUpdateAssignedOfficer = new entCustomerUpdateAssignedOfficerHistory();
        
}

export class entCustomerUpdateBank {
  customerUpdateBankId = 0;
         customerUpdateId = 0;
         accountNo = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         bankId = 0;
         ientBank = new entBank();
         lstentBank: any = [];
         idoObjState = '';
         updateSeq = 0;
         editableFlag = '';
         oldValue = '';
         customerBankId = 0;
         msg = new entIEMessage();
         headOfficeBank = '';
        
}

export class entCustomerUpdateBankList {
  entCustomerUpdateBankList: any = [];
         ientCustomerUpdateBank = new entCustomerUpdateBank();
         msg = new entIEMessage();
        
}

export class entCustomerUpdateDocument {
  customerUpdateDocumentId = 0;
         customerUpdateId = 0;
         docTypeId = 0;
         docTypeValue = '';
         docTypeDescription = '';
         otherDocName = '';
         fileId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         customerDocumentId = 0;
         enteredDate = '';
         enteredBy = '';
         createdByFullname = '';
         customerUpdateRefNo = '';
         docRefNo = '';
         sourceId = 0;
         sourceValue = '';
         sourceDescription = '';
         isMandatory = '';
        
}

export class entCustomerUpdateDocumentList {
  lstentCustomerUpdateDocument: any = [];
         msg = new entIEMessage();
         ientCustomerUpdateDocument = new entCustomerUpdateDocument();
        
}

export class entCustomerUpdateEmailHistory {
  customerUpdateEmailHistoryId = 0;
         customerUpdateId = 0;
         emailCommunicationId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         sendBy = '';
         sendByFullname = '';
         sendDate = '';
         ientCommunicationTracking = new entCommunicationTracking();
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
        
}

export class entCustomerUpdateEmailHistoryList {
  entCustomerUpdateEmailHistoryList: any = [];
         ientCustomerUpdateEmailHistory = new entCustomerUpdateEmailHistory();
         msg = new entIEMessage();
        
}

export class entCustomerUpdateList {
  entCustomerUpdateList: any = [];
         ientCustomerUpdate = new entCustomerUpdate();
         msg = new entIEMessage();
        
}

export class entCustomerUpdateNotes {
  customerUpdateNotesId = 0;
         customerUpdateId = 0;
         notes = '';
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         ientDDL = new entDDL();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         enteredByFullname = '';
        
}

export class entCustomerUpdateNotesList {
  lstentCustomerUpdateNotes: any = [];
         lentCustomerUpdateNotes = new entCustomerUpdateNotes();
         msg = new entIEMessage();
        
}

export class entCustomerUpdatePhoto {
  customerUpdatePhotoId = 0;
         customerUpdateId = 0;
         photoFileTypeId = 0;
         photoFileTypeValue = '';
         photoFileTypeDescription = '';
         fileSize = '';
         fileContent = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         oldValue = '';
         crmCustomerPhotoId = 0;
        
}

export class entCustomerUpdateSearch {
  customerUpdateRefNo = '';
         statusValue = '';
         genderValue = '';
         firstName = '';
         lastName = '';
         middleName = '';
         dateOfBirth = '';
         dateOfDeathFrom = '';
         dateOfBirthTo = '';
         emailId = '';
         contactNo = '';
         pfNo = '';
         drivingLicenseNo = '';
         voterId = '';
         nationalId = '';
         tin = '';
         passportNo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         customerRefNo = '';
        
}

export class entCustomerUpdateSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entCustomerUpdateSearchResultSet {
  customerUpdateid = 0;
         customerUpdateRefno = '';
         genderDescription = '';
         dateOfBrith = '';
         emailId = '';
         contactNo = '';
         statusdescription = '';
         customerName = '';
         customerRefNo = '';
         createdByFullname = '';
         createdDate = '';
         statusValue = '';
        
}

export class entCustomerUpdateStatusHistory {
  customerUpdateStatusHistoryId = 0;
         customerUpdateId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         changedBy = '';
         changedByFullname = '';
         changedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entCustomerUpdateStatusHistoryList {
  listentCustomerUpdateStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entCustomerUpdateType {
  crmCustomerUpdateId = 0;
         customerTypeValue = '';
         customerTypeId = 0;
         crmCustomerTypeId = 0;
         crmCustomerUpdateTypeId = 0;
         customerTypeDescription = '';
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         oldValue = '';
         isChecked = '';
        
}

export class entCustomerUpdateTypeList {
  lstentCustomerUpdateType: any = [];
         msg = new entIEMessage();
         ientCustomerUpdateType = new entCustomerUpdateType();
        
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

export class entData {
  data: any = [];
         label: any = [];
        
}

export class entDatawithLegand {
  legand = '';
         data: any = [];
         label: any = [];
        
}

export class entDeathNotice {
  deathNoticeId = 0;
         deathNoticeRefNo = '';
         noticeDate = '';
         dateOfDeath = '';
         personId = 0;
         willRefNo = '';
         paperId = 0;
         paperValue = '';
         probateRegistryRefNo = '';
         noticeDocId = 0;
         estateApplicationId = 0;
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         paperDescription = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ibranchddl = new entDDL();
         comments = '';
         causeOfDeath = '';
         estateApplicationRefNo = '';
         branchId = 0;
         branchValue = '';
         branchDescription = '';
         ientDeathNoticeStatusHistory = new entDeathNoticeStatusHistory();
         ilstentDeathNoticeStatusHistory: any = [];
         ientDeathNoticeAssignedOfficerHistory = new entDeathNoticeAssignedOfficerHistory();
         ilstentDeathNoticeAssignedOfficerHistory: any = [];
         ientDeathNoticeEmailHistory = new entDeathNoticeEmailHistory();
         ilstentDeathNoticeEmailHistory: any = [];
         assignedOfficerFlag = '';
         reAssignFlag = '';
         selfAssignFlag = '';
         ientCustomer = new entCustomer();
         ientProbateRegistry = new entProbateRegistry();
         ilstentDeathNoticeDocumentList = new entDeathNoticeDocumentList();
         assignedOfficer = '';
        
}

export class entDeathNoticeAssignedOfficerHistory {
  deathNoticeAssignedOfficerHistoryId = 0;
         deathNoticeId = 0;
         statusId = 0;
         statusValue = '';
         assignedTo = '';
         assignedDate = '';
         assignedBy = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         assignedByFullname = '';
         assignedToFullname = '';
        
}

export class entDeathNoticeDocument {
  deathNoticeDocumentId = 0;
         deathNoticeId = 0;
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         documentTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         deathNoticeRefNo = '';
        
}

export class entDeathNoticeDocumentList {
  ientDeathNoticeDocument = new entDeathNoticeDocument();
         ilstentDeathNoticeDocument: any = [];
         msg = new entIEMessage();
        
}

export class entDeathNoticeEmailHistory {
  deathNoticeEmailHistoryId = 0;
         deathNoticeId = 0;
         communicationTrackingId = 0;
         statusId = 0;
         statusValue = '';
         sendBy = '';
         sendDate = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientCommunicationTracking = new entCommunicationTracking();
         sendByFullname = '';
        
}

export class entDeathNoticeList {
  lstentDeathNotice: any = [];
         ientDeathNotice = new entDeathNotice();
         msg = new entIEMessage();
        
}

export class entDeathNoticeSearch {
  deathNoticeRefNo = '';
         personId = 0;
         paperValue = '';
         dateOfDeathFrom = '';
         dateOfDeathTo = '';
         noticeDateFrom = '';
         noticeDateTo = '';
         statusValue = '';
         assignedOfficer = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         sortColumn = '';
         sortOrder = false;
        
}

export class entDeathNoticeSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entDeathNoticeSearchResultSet {
  deathNoticeId = 0;
         deathNoticeRefNo = '';
         personName = '';
         paperDescription = '';
         dateOfDeath = '';
         noticeDate = '';
         statusDescription = '';
         assignedOfficer = '';
        
}

export class entDeathNoticeStatusHistory {
  daethNoticeStatusHistoryId = 0;
         deathNoticeId = 0;
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         changedByFullname = '';
        
}

export class entDeceasedPerson {
  deceasedPersonId = 0;
         estateApplicationId = 0;
         customerId = '';
         estateApplicationRefNo = '';
         maritalStatusId = 0;
         maritalStatusValue = '';
         notifiedByFullname = '';
         ientDeceasedPersonWill = new entDeceasedPersonWill();
         notifiedBy = '';
         ilstentDeceasedPersonMarriageDetail: any = [];
         deathCertificateRefNo = '';
         deathCertificateDocId = 0;
         deathNoticeId = 0;
         deathNoticeRefNo = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         maritalStatusDescription = '';
         ientFile = new entFile();
        
}

export class entDeceasedPersonMarriageDetail {
  deceasedPersonMarriageDetailId = 0;
         deceasedPersonId = 0;
         estateApplicationId = 0;
         placeOfMarriage = '';
         marriedTo = '';
         maidenName = '';
         isSpouseLiving = '';
         placeOfDeath = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entDeceasedPersonMarriageDetailList {
  ilstentDeceasedPersonMarriageDetail: any = [];
         ientDeceasedPersonMarriageDetail = new entDeceasedPersonMarriageDetail();
         msg = new entIEMessage();
        
}

export class entDeceasedPersonSearch {
  deathNoticeRefNo = '';
         personName = '';
         paperValue = '';
         dateOfDeath = '';
         noticeDate = '';
         statusValue = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         sortColumn = '';
         sortOrder = false;
        
}

export class entDeceasedPersonSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entDeceasedPersonSearchResultSet {
  deceasedPersonId = 0;
         deathCertificateRefNo = '';
         personName = '';
         dateOfDeath = '';
         noticeDate = '';
        
}

export class entDeceasedPersonWill {
  deceasedPersonWillId = 0;
         deceasedPersonId = 0;
         estateApplicationId = 0;
         willId = 0;
         testatorId = '';
         willDocumentId = 0;
         willFileNo = '';
         testatorMarriageDate = '';
         willHeldBy = '';
         willHeldByFullname = '';
         testatorName = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
        
}

export class entDepositBookSearch {
  depositBookNo = '';
         branchValue = '';
         cashCounterNo = '';
         assignedOfficer = 0;
         idtmEffectiveDateFrom = '';
         idtmEffectiveDateTo = '';
         istrSortColumn = '';
         istrSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         statusValue = '';
         branchName = '';
        
}

export class entDepositBookSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         pentDepositBookSearchSet: any = [];
        
}

export class entDepositBookSearchSet {
  cashCounterDepositBookId = 0;
         depositBookNo = '';
         branchValue = '';
         cashCounterNo = '';
         effectiveDate = '';
         depositBookstatus = '';
         openingAmount = '';
         closingAmount = '';
         computedAmount = '';
         mismatchAmount = '';
         totalReceiptAmount = '';
         cashCounterId = 0;
         branchName = '';
         istrSortColumn = '';
         istrSortOrder = false;
        
}

export class entDepositSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstentDepositSearchSet: any = [];
        
}

export class entDepositSearchSet {
  transactionNo = '';
         transactionCreatedDate = '';
         customerName = '';
         transactionPaymentModeDescription = '';
         totalTransactionAmount = '';
         voucherTypeDescription = '';
         statusDescription = '';
         fileTypeDescription = '';
        
}

export class entDepositSummaryDenomination {
  depositSummaryDenominationId = 0;
         depositSummaryId = 0;
         denominationId = 0;
         denominationValue = '';
         denominationCount = 0;
         totalAmount = '';
         isClosingAmountDenominations = '';
         denominationDescription = '';
         msg = new entIEMessage();
         updateSeq = 0;
         idoObjState = '';
        
}

export class entDiary {
  diaryId = 0;
         staffUserId = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         lstentDiaryEntry: any = [];
         stafFullname = '';
        
}

export class entDiaryEntry {
  diaryEntryId = 0;
         diaryId = 0;
         eventTypeId = 0;
         eventTypeValue = '';
         date = '';
         time = '';
         reminderDatetime = '';
         statusId = 0;
         statusValue = '';
         title = '';
         notes = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         eventTypeDescription = '';
         priorityDescription = '';
         corresDescription = '';
         priorityId = 0;
         priorityValue = '';
         corresId = 0;
         corresValue = '';
        
}

export class entDiaryEntryList {
  lstentDiaryEntry: any = [];
         lentDiaryEntry = new entDiaryEntry();
         msg = new entIEMessage();
        
}

export class entDiaryEntrySearch {
  eventTypeValue = '';
         dateFrom = '';
         dateTo = '';
         time = '';
         reminderDatetimeFrom = '';
         reminderDatetimeTo = '';
         statusValue = '';
         eventType = '';
         priorityValue = '';
         corresValue = '';
         title = '';
         notes = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         staffUserId = '';
        
}

export class entDiaryEntrySearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entDiaryEntrySearchResultSet {
  diaryEntryId = 0;
         diaryId = 0;
         date = '';
         time = '';
         reminderDatetime = '';
         title = '';
         notes = '';
         statusDescription = '';
         eventTypeDescription = '';
         priorityDescription = '';
         corresDescription = '';
         staffUserId = '';
         fullname = '';
        
}

export class entEstate {
  estateId = 0;
         estateApplicationId = 0;
         fileNo = '';
         leadId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         leadRefNo = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplication {
  estateApplicationId = 0;
         estateApplicationRefNo = '';
         applicationDate = '';
         applicationStageId = 0;
         applicationStageValue = '';
         appliedBy = '';
         appliedDate = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         fileNo = '';
         actionStatusId = 0;
         actionStatusValue = '';
         estateRegNo = '';
         receiptNo = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         leadRefNo = '';
         editableIdentificationNo = 0;
         applicationStageDescription = '';
         statusDescription = '';
         appliedBranchDescription = '';
         actionStatusDescription = '';
         branchDescription = '';
         leadId = 0;
         ientDeathNotice = new entDeathNotice();
         lstentDeathNotice: any = [];
         ientDeceasedPerson = new entDeceasedPerson();
         lstentEstateApplicationBeneficiary: any = [];
         lstentEstateApplicationRealestate: any = [];
         ientEstateApplicationAssignedOfficerHistory = new entEstateApplicationAssignedOfficerHistory();
         lstentEstateApplicationProcessHistory: any = [];
         ientEstateApplicationApplicant = new entEstateApplicationApplicant();
         workflowId = 0;
         assignedOfficer = '';
         enteredByFullname = '';
         appliedByFullname = '';
         assignedOfficerFullName = '';
         identifierCount = 0;
         assignedOfficerFlag = '';
         reAssignFlag = '';
         leadAssignedDepartment = '';
         isCompleted = '';
         assignedToFullname = '';
         selfAssignFlag = '';
         ientEstateApplicationExecutor = new entEstateApplicationExecutor();
         ientEstateApplicationInitialInterview = new entEstateApplicationInitialInterview();
         ientEstateApplicationDetailInstruction = new entEstateApplicationDetailInstruction();
        
}

export class entEstateApplicationApplicant {
  estateApplicationApplicantId = 0;
         estateApplicationId = 0;
         customerId = 0;
         maritalStatusId = 0;
         maritalStatusValue = '';
         occupation = '';
         maritalStatusDescription = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationAssignedOfficerHistory {
  estateApplicationAssignedOfficerHistoryId = 0;
         estateApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         assignedTo = '';
         assignedBy = '';
         assignedDate = '';
         identificationNo = 0;
         applicationStageDescription = '';
         statusDescription = '';
         actionStatusDescription = '';
         designation = '';
         assignedByFullname = '';
         assignedToFullname = '';
         verifiedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationBeneficiary {
  estateApplicationBeneficiaryId = 0;
         estateApplicationId = 0;
         customerId = 0;
         guardianId = 0;
         isDeceased = '';
         placeOfDeath = '';
         occupation = '';
         isMentionedInWill = '';
         isMinor = '';
         residentId = 0;
         residentValue = '';
         relationshipId = 0;
         relationshipValue = '';
         maritalStatusId = 0;
         maritalStatusValue = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         maritalStatusDescription = '';
         relationshipDescription = '';
         residentDescription = '';
        
}

export class entEstateApplicationBeneficiaryList {
  ilstentEstateApplicationBeneficiary: any = [];
         ientEstateApplicationBeneficiary = new entEstateApplicationBeneficiary();
         msg = new entIEMessage();
        
}

export class entEstateApplicationDetailInstruction {
  estateApplicationDetailInstructionId = 0;
         estateApplicationId = 0;
         securityDeposit = '';
         isDeathCertificateAvailable = '';
         applicationStageId = 0;
         applicationStageValue = '';
         identityNumber = 0;
        
}

export class entEstateApplicationDocument {
  estateApplicationDocumentId = 0;
         estateApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         statusId = 0;
         statusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         isMandatory = '';
         identificationNo = 0;
         applicationStageDescription = '';
         statusDescription = '';
         actionStatusDescription = '';
         ientFile = new entFile();
         documentTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationDocumentList {
  entEstateApplicationDocumentList: any = [];
         ientEstateApplicationDocument = new entEstateApplicationDocument();
         msg = new entIEMessage();
        
}

export class entEstateApplicationExecutor {
  estateApplicationExecutorId = 0;
         estateApplicationId = 0;
         customerId = '';
         isDeceased = '';
         placeOfDeath = '';
         occupation = '';
         relationshipId = 0;
         relationshipValue = '';
         maritalStatusId = 0;
         maritalStatusValue = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         maritalStatusDescription = '';
         relationshipDescription = '';
        
}

export class entEstateApplicationFinanceDetails {
  estateApplicationFinanceDetailId = 0;
         estateApplicationId = 0;
         institutionName = '';
         accountNo = '';
         accountTypeId = 0;
         accountTypeValue = '';
         bsb = '';
         ientestateApplicationFinanceDetailsAddress = new entAddress();
         addressId = 0;
         accountTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationFinanceDetailsList {
  ilstentEstateApplicationFinanceDetails: any = [];
         ientEstateApplicationFinanceDetails = new entEstateApplicationFinanceDetails();
         msg = new entIEMessage();
        
}

export class entEstateApplicationInitialInterview {
  estateApplicationInitialInterviewId = 0;
         estateApplicationId = 0;
         isWillExist = '';
         assetValue = '';
         grantRequired = '';
         applicationStageId = 0;
         applicationStageValue = '';
         identityNumber = 0;
        
}

export class entEstateApplicationInvestmentDetails {
  estateApplicationInvestmentDetailId = 0;
         estateApplicationId = 0;
         companyName = '';
         shareNo = '';
         isCertificateAvailable = '';
         shareTypeId = 0;
         shareTypeValue = '';
         ientestateApplicationInvestmentDetailsAddress = new entAddress();
         addressId = 0;
         shareTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationInvestmentDetailsList {
  ilstentEstateApplicationInvestmentDetails: any = [];
         ientEstateApplicationInvestmentDetails = new entEstateApplicationInvestmentDetails();
         msg = new entIEMessage();
        
}

export class entEstateApplicationNotes {
  estateApplicationNotesId = 0;
         estateApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         notes = '';
         identificationNo = 0;
         applicationStageDescription = '';
         statusDescription = '';
         actionStatusDescription = '';
         enteredByFullname = '';
         iActionStatusDDL = new entDDL();
         iStatusDDL = new entDDL();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationProcessHistory {
  estateApplicationProcessHistoryId = 0;
         estateApplicationId = 0;
         estateApplicationStageId = 0;
         estateApplicationStageValue = '';
         identificationNo = 0;
         isEditable = '';
         estateApplicationStageDescription = '';
        
}

export class entEstateApplicationRealestate {
  estateApplicationRealestateId = 0;
         estateApplicationId = 0;
         titleNo = '';
         tenancyId = 0;
         tenancyValue = '';
         tenancyTypeId = 0;
         tenancyTypeValue = '';
         tenureId = 0;
         tenureValue = '';
         landlordName = '';
         titleCopyDocId = 0;
         ientestateApplicationRealestateAddress = new entAddress();
         addressId = 0;
         tenancyDescription = '';
         tenancyTypeDescription = '';
         tenureDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         estateApplicationRefNo = '';
         ientFile = new entFile();
        
}

export class entEstateApplicationRealestateList {
  ilstentEstateApplicationRealestate: any = [];
         ientEstateApplicationRealestate = new entEstateApplicationRealestate();
         msg = new entIEMessage();
        
}

export class entEstateApplicationSearch {
  estateApplicationRefNo = '';
         applicationStageValue = '';
         appliedBranchValue = '';
         estateRegNo = '';
         actionStatusValue = '';
         statusValue = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         enteredBy = '';
         appliedBy = '';
         appliedDateFrom = '';
         appliedDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         sortColumn = '';
         sortOrder = false;
        
}

export class entEstateApplicationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entEstateApplicationSearchResultSet {
  estateApplicationId = 0;
         estateApplicationRefNo = '';
         applicationStageDescription = '';
         appliedBranchDescription = '';
         appliedByFullname = '';
         enteredByFullname = '';
         appliedDate = '';
         fileNo = '';
         statusDescription = '';
         assignedOfficerFullname = '';
         actionStatusDescription = '';
         applicantName = '';
         applicantCrmNo = '';
        
}

export class entEstateApplicationVehicleDetails {
  estateApplicationVehicleDetailId = 0;
         estateApplicationId = 0;
         vehicleRegNo = '';
         vehicleTypeId = 0;
         vehicleTypeValue = '';
         vehicleMake = '';
         model = '';
         insuranceAvailable = '';
         insuranceDocId = 0;
         permitDocId = 0;
         vehicleTypeDescription = '';
         iinsuranceFile = new entFile();
         ipermitFile = new entFile();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateApplicationVehicleDetailsList {
  ilstentEstateApplicationVehicleDetails: any = [];
         ientEstateApplicationVehicleDetails = new entEstateApplicationVehicleDetails();
         msg = new entIEMessage();
        
}

export class entEstateCreditor {
  estateCreditorId = 0;
         estateApplicationId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         evidenceDocId = 0;
         ientFile = new entFile();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entEstateCreditorList {
  ilstentEstateCreditor: any = [];
         ientEstateCreditor = new entEstateCreditor();
         msg = new entIEMessage();
        
}

export class entEstateDashboard {
  estateApplicationCount = 0;
         estateApplicationOpened = 0;
         datasets: any = [];
        
}

export class entEstateSearch {
  estateApplicationRefNo = '';
         estateAccountNo = '';
         fileNo = '';
         customerId = 0;
         deceasedCustomerId = 0;
         statusValue = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         sortColumn = '';
         sortOrder = false;
        
}

export class entEstateSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entEstateSearchResultSet {
  estateId = 0;
         estateApplicationRefNo = '';
         fileNo = '';
         estateAccountNo = '';
         applicantName = '';
         deceasedPersonName = '';
         statusDescription = '';
        
}

export class entEvent {
  eventId = 0;
         eventCode = '';
         eventName = '';
         effectiveDate = '';
         parentEventId = 0;
         eventDescription = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         lstentEventUpdatetHistory: any = [];
         statusDescription = '';
         ientDDL = new entDDL();
        
}

export class entEventList {
  ientEvent = new entEvent();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         plstentEvent: any = [];
        
}

export class entEventMapping {
  eventMappingId = 0;
         eventId = 0;
         subEventId = 0;
         transactionCodeDescription = '';
         isBankFee = '';
         bankFeeValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         fileTypeId = 0;
         fileTypeValue = '';
         accountTypeId = 0;
         accountTypeValue = '';
         postingMatrixConfigurationId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         lstentEventMappingList: any = [];
         voucherTypeDescription = '';
         fileTypeDescription = '';
         accountTypeDescription = '';
         addedBy = '';
         addedDate = '';
         changedBy = '';
         changedDate = '';
         addedByFullName = '';
         changedByFullName = '';
         eventName = '';
         subEventName = '';
         postingMatrix = '';
        
}

export class entEventMappingList {
  eventMappingListId = 0;
         eventMappingId = 0;
         groupId = 0;
         ledgerId = 0;
         postingNatureId = 0;
         postingNatureValue = '';
         isCustomerGl = '';
         isVatOption = '';
         isPrimaryPosting = '';
         isBankFee = '';
         isCorporateGl = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         postingNatureDescription = '';
         groupName = '';
         ledgerName = '';
         ledgerCode = '';
        
}

export class entEventMappingSearch {
  appEventId = 0;
         subEventId = 0;
         transactionCodeDescription = '';
         fileTypeValue = '';
         postingMatrixConfigurationId = 0;
         accountTypeValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         statusValue = '';
         voucherTypeValue = '';
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         pageSize = 0;
         isBankFee = '';
         bankFeeValueFrom = '';
         bankFeeValueTo = '';
        
}

export class entEventMappingSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entEventMappingSearchResultSet {
  eventMappingId = 0;
         vouchertypedescription = '';
         eventName = '';
         eventCode = '';
         subEventName = '';
         subEventCode = '';
         effectiveDate = '';
         postingMatrix = '';
         filetypedescription = '';
         accounttypedescription = '';
         statusDescription = '';
        
}

export class entEventSearch {
  eventCode = '';
         eventName = '';
         effectiveDateFrom = '';
         parentEventId = 0;
         statusValue = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         effectiveDateTo = '';
        
}

export class entEventSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entEventSearchResultSet {
  eventId = 0;
         eventCode = '';
         eventName = '';
         effectiveDate = '';
         statusDescription = '';
        
}

export class entEventUpdatetHistory {
  eventHistoryUpdateId = 0;
         eventId = 0;
         eventName = '';
         effectiveDate = '';
         parentEventId = 0;
         eventDescription = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         changedBy = '';
         changedDate = '';
         oldValue = '';
         statusDescription = '';
         changedByFullname = '';
         eventCode = '';
        
}

export class entFile {
  fileId = 0;
         fileName = '';
         fileExtension = '';
         fileType = '';
         fileSize = '';
         relativePath = '';
         content = '';
        
}

export class entFileSearch {
  fileNo = '';
         fileName = '';
         customerId = 0;
         fileTypeValue = '';
         isPhysical = '';
         statusValue = '';
         refNo = '';
         dateFrom = '';
         dateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         staffUserId = '';
         fullname = '';
        
}

export class entFileSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entFileSearchResultSet {
  fileId = 0;
         fileNo = '';
         fileName = '';
         isPhysical = '';
         statusDescription = '';
         fileTypeDescription = '';
         fullname = '';
         refNo = '';
         date = '';
        
}

export class entFinCostCenterTransaction {
  costCentreTransactionId = 0;
         costCentreAllocationId = 0;
         ledgerId = 0;
         ledgerTransactionDetailId = 0;
         fiscalYearId = 0;
         debitAmount = '';
         creditAmount = '';
         notes = '';
         addedBy = '';
         addedDate = '';
         addedByFullname = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entFptclAccountNo {
  accountId = 0;
         accountNo = 0;
         customerId = 0;
         fileId = 0;
         accountTypeId = 0;
         accountTypeValue = '';
         statusId = 0;
         statusValue = '';
         bankId = 0;
         bankValue = '';
         branchId = 0;
         branchValue = '';
         referenceNo = '';
         accountTypeDescription = '';
         statusDescription = '';
         bankDescription = '';
         branchDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         customerName = '';
         accountName = '';
         gaurdianCustomerName = '';
         gaurdianCustomerId = '';
        
}

export class entFptclAccountNoList {
  ientFptclAccountNo = new entFptclAccountNo();
         lstentFptclAccountNo: any = [];
         msg = new entIEMessage();
        
}

export class entFptclFile {
  fileId = 0;
         fileNo = '';
         fileName = '';
         customerId = 0;
         fileTypeId = 0;
         fileTypeValue = '';
         statusId = 0;
         statusValue = '';
         isPhysicalFile = '';
         referenceNo = '';
         fileTypeDescription = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         customerName = '';
         screenName = '';
        
}

export class entGenerateDepositSlipViewResult {
  generateDepositSlip: any = [];
        
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

export class entIslanddetails {
  islandId = 0;
         islandName = '';
         provinceId = 0;
         provinceName = '';
        
}

export class entIslanddetailsList {
  plistentIslanddetails: any = [];
        
}

export class entLead {
  leadId = 0;
         leadRefNo = '';
         customerServiceId = 0;
         leadTypeId = 0;
         leadTypeValue = '';
         leadTypeDescription = '';
         description = '';
         productTypeId = 0;
         productTypeValue = '';
         productTypeDescription = '';
         assignedDepartmentId = 0;
         assignedDepartmentValue = '';
         assignedDepartmentDescription = '';
         leadDatetime = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         branchValue = '';
         previousProductTypeValue = '';
         ientLeadAssignedOfficer = new entLeadAssignedOfficer();
         ientLeadNotes = new entLeadNotes();
         lstentLeadAssignedOfficer: any = [];
         lstentLeadNotes: any = [];
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         customerRefNo = '';
         customerName = '';
         customerContactNo = '';
         customerEmailId = '';
         customerDateOfBirth = '';
         customerGenderDescription = '';
         serviceNo = '';
         servicedByFullName = '';
         servicedDateTime = '';
         ientDDL = new entDDL();
         assignedOfficerFlag = '';
         reassignFlag = '';
         selfAssignFlag = '';
         createdDate = '';
         createdByFullname = '';
         serviceType = '';
         serviceStatus = '';
         serviceBranch = '';
         customerAlternateContactNo = '';
         customerNationality = '';
         customerFatherName = '';
         customerMotherName = '';
         customerGuardianName = '';
         customerStatus = '';
         serviceTypeDescription = '';
         serviceContactModeDescription = '';
         serviceBranchDescription = '';
         serviceStatusDescription = '';
         serviceCommunicationTypeDescription = '';
         descriptionFlag = '';
         leadCreatedByFullname = '';
         trustAppliRefNo = '';
         trustType = '';
         applicationStage = '';
         serviceStatusValue = '';
         customerStatusValue = '';
         iDepartmentDDL = new entDDL();
         ientLeadDocument = new entLeadDocument();
         lstentLeadDocument: any = [];
         previousStatusValue = '';
         workflowId = 0;
         customerId = 0;
         applicationWorkflowId = 0;
         isClosedWon = '';
         ientLeadApplicationAssignedOfficer = new entLeadApplicationAssignedOfficer();
         lstentLeadApplicationAssignedOfficer: any = [];
        
}

export class entLeadApplicationAssignedOfficer {
  leadApplicationAssignedOfficerId = 0;
         leadId = 0;
         assignedTo = '';
         assignedDate = '';
         assignedBy = '';
         statusId = 0;
         statusValue = '';
         assignedToFullname = '';
         assignedByFullname = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLeadApplicationAssignedOfficerList {
  lstentLeadApplicationAssignedOfficer: any = [];
         ientLeadApplicationAssignedOfficer = new entLeadApplicationAssignedOfficer();
        
}

export class entLeadAssignedOfficer {
  leadAssignedOfficerId = 0;
         leadId = 0;
         assignedTo = '';
         assignedDate = '';
         assignedToFullname = '';
         assignedByFullname = '';
         assignedBy = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLeadAssignedOfficerList {
  entLeadAssignedOfficerList: any = [];
         ientLeadAssignedOfficer = new entLeadAssignedOfficer();
        
}

export class entLeadCommunicationHistory {
  leadCommunicationHistoryId = 0;
         leadId = 0;
         emailCommunicationId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         sendBy = '';
         sendByFullname = '';
         sendDate = '';
         ientCommunicationTracking = new entCommunicationTracking();
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
        
}

export class entLeadCommunicationHistoryList {
  entLeadCommunicationHistoryList: any = [];
         ientLeadCommunicationHistory = new entLeadCommunicationHistory();
         msg = new entIEMessage();
        
}

export class entLeadDocument {
  leadDocumentId = 0;
         leadId = 0;
         docTypeId = 0;
         docTypeValue = '';
         otherDocName = '';
         fileId = 0;
         enteredBy = '';
         enteredDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         createdByFullname = '';
         createdDate = '';
         isMandatory = '';
         docTypeDescription = '';
         leadRefNo = '';
         docRefNo = '';
         sourceId = 0;
         sourceValue = '';
         sourceDescription = '';
        
}

export class entLeadDocumentList {
  lstentLeadDocument: any = [];
         msg = new entIEMessage();
         ientLeadDocument = new entLeadDocument();
        
}

export class entLeadList {
  entLeadList: any = [];
         ientLead = new entLead();
         msg = new entIEMessage();
        
}

export class entLeadNotes {
  leadNoteId = 0;
         leadId = 0;
         notes = '';
         enteredBy = '';
         enteredByFullname = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientDDL = new entDDL();
        
}

export class entLeadNotesList {
  entLeadNotesList: any = [];
         ientLeadNotes = new entLeadNotes();
         msg = new entIEMessage();
        
}

export class entLeadStatusHistory {
  leadStatusHistoryId = 0;
         leadId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         changedBy = '';
         changedByFullname = '';
         changedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLeadStatusHistoryList {
  lstentLeadStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entLeadbyProduct {
  totalLeads = 0;
         lstLeadbyProductchild: any = [];
         datasets: any = [];
         labels: any = [];
         msg = new entIEMessage();
        
}

export class entLeadbyProductchild {
  product = '';
         productLeads = 0;
         pendingLeads = 0;
         closedLeads = 0;
         cancelledLeads = 0;
         msg = new entIEMessage();
        
}

export class entLeadsource {
  datasets: any = [];
         datasets2: any = [];
         msg = new entIEMessage();
        
}

export class entLegalApplication {
  legalApplicationId = 0;
         legalApplRefNo = '';
         leadId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         appliedBy = '';
         appliedDate = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         editableIdentificationNo = 0;
         ientLegalApplicationApplicant = new entLegalApplicationApplicant();
         lstentLegalApplicationApplicant: any = [];
         ientLegalApplicationDocument = new entLegalApplicationDocument();
         lstentLegalApplicationDocument: any = [];
         ientLegalApplicationStatusHistory = new entLegalApplicationStatusHistory();
         lstentLegalApplicationStatusHistory: any = [];
         ientLegalApplicationEmailHistory = new entLegalApplicationEmailHistory();
         lstentLegalApplicationEmailHistory: any = [];
         ientLegalApplicationNotes = new entLegalApplicationNotes();
         lstentLegalApplicationNotes: any = [];
         ientLegalApplicationAssignedOfficerHistory = new entLegalApplicationAssignedOfficerHistory();
         lstentLegalApplicationAssignedOfficerHistory: any = [];
         ientLegalApplicationClient = new entLegalApplicationClient();
         lstentLegalApplicationClient: any = [];
         workflowId = 0;
         statusDescription = '';
         appliedBranchDescription = '';
         enteredByFullname = '';
         appliedByFullname = '';
         previousStatusValue = '';
         applicationStageDescription = '';
         assignedOfficerFlag = '';
         reAssignFlag = '';
         selfAssignFlag = '';
         actionStatusDescription = '';
         previousActionStatusValue = '';
         previousStageValue = '';
         workloadBasedOnflag = '';
         trustAssignedToFullname = '';
         leadAssignedDepartment = '';
         leadAssignedDepartmentValue = '';
         leadRefNo = '';
         isCompleted = '';
         identifierCount = 0;
         serviceTypeId = 0;
         serviceTypeValue = '';
         serviceTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientLegalApplicationRejectHistory = new entLegalApplicationRejectHistory();
         lstentLegalApplicationRejectHistory: any = [];
         ientFptclFile = new entFptclFile();
         lstentFptclFile: any = [];
         legalServiceCompleted = '';
        
}

export class entLegalApplicationApplicant {
  legalApplicationApplicantId = 0;
         legalApplicationId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         customerDdlFlage = '';
        
}

export class entLegalApplicationApplicantlist {
  lstentLegalApplicationApplicant: any = [];
         ientLegalApplicationApplicant = new entLegalApplicationApplicant();
         msg = new entIEMessage();
        
}

export class entLegalApplicationAssignedOfficerHistory {
  legalApplicationAssignedOfficerHistoryId = 0;
         legalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         assignedTo = '';
         assignedBy = '';
         assignedDate = '';
         identificationNo = 0;
         assignedToFullname = '';
         assignedByFullname = '';
         designation = '';
         actionStatusDescription = '';
         applicationStageDescription = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLegalApplicationAssignedOfficerHistoryList {
  lstentLegalApplicationAssignedOfficerHistory: any = [];
         ientLegalApplicationAssignedOfficerHistory = new entLegalApplicationAssignedOfficerHistory();
         msg = new entIEMessage();
        
}

export class entLegalApplicationClient {
  legalApplicationClientId = 0;
         legalApplicationId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         typeId = 0;
         typeValue = '';
         isFptcl = '';
         occupation = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         typeDescription = '';
        
}

export class entLegalApplicationClientlist {
  lstentLegalApplicationClient: any = [];
         ientLegalApplicationClient = new entLegalApplicationClient();
         msg = new entIEMessage();
        
}

export class entLegalApplicationDocument {
  legalApplicationDocumentId = 0;
         legalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         isMandatory = '';
         identificationNo = 0;
         enteredBy = '';
         enteredDate = '';
         ientFile = new entFile();
         documentTypeDescription = '';
         legalApplicationRefNo = '';
         enteredByFullname = '';
         applicationStageDescription = '';
         trustTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLegalApplicationDocumentList {
  lstentLegalApplicationDocument: any = [];
         ientLegalApplicationDocument = new entLegalApplicationDocument();
         msg = new entIEMessage();
        
}

export class entLegalApplicationEmailHistory {
  legalApplicationEmailHistoryId = 0;
         legalApplicationId = 0;
         communicationTrackingId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         sendBy = '';
         sendDate = '';
         identificationNo = 0;
         ientCommunicationTracking = new entCommunicationTracking();
         statusDescription = '';
         sendByFullname = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLegalApplicationEmailHistoryList {
  lstentLegalApplicationEmailHistory: any = [];
         ientLegalApplicationEmailHistory = new entLegalApplicationEmailHistory();
         msg = new entIEMessage();
        
}

export class entLegalApplicationNotes {
  legalApplicationNotesId = 0;
         legalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         notes = '';
         identificationNo = 0;
         enteredDate = '';
         enteredBy = '';
         iActionStatusDDL = new entDDL();
         iStatusDDL = new entDDL();
         applicationStatusDescription = '';
         enteredByFullname = '';
         isUpdateButtonShow = '';
         actionStatusDescription = '';
         applicationStageDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLegalApplicationNotesList {
  lstentLegalApplicationNotes: any = [];
         ientLegalApplicationNotes = new entLegalApplicationNotes();
         msg = new entIEMessage();
        
}

export class entLegalApplicationRejectHistory {
  legalApplicationId = 0;
         legalApplicationStageValue = '';
         legalApplicationIdenityNo = 0;
         legalApplicationRejectHistoryId = 0;
         isEditable = '';
        
}

export class entLegalApplicationSearch {
  legalApplRefNo = '';
         serviceTypeValue = '';
         applicationStageValue = '';
         appliedBranchValue = '';
         statusValue = '';
         actionStatusValue = '';
         customerId = 0;
         applicantCrmNo = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         enteredBy = '';
         appliedBy = '';
         appliedDateFrom = '';
         appliedDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = '';
         istrSortColumn = '';
         istrSortOrder = false;
         applicantName = '';
        
}

export class entLegalApplicationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entLegalApplicationSearchResultSet {
  legalApplicationId = 0;
         legalApplRefNo = '';
         serviceTypeDescription = '';
         serviceTypeValue = '';
         applicationStageDescription = '';
         applicationStageValue = '';
         appliedBranchValue = '';
         appliedBranchDescription = '';
         actionStatusValue = '';
         actionStatusDescription = '';
         appliedDate = '';
         applicantName = '';
         applicantCrmNo = '';
         statusDescription = '';
         statusValue = '';
         assignedOfficer = '';
        
}

export class entLegalApplicationStatusHistory {
  legalApplicationStatusHistoryId = 0;
         legalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         identificationNo = 0;
         statusDescription = '';
         actionStatusDescription = '';
         applicationStageDescription = '';
         changedByFullname = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entLegalApplicationStatusHistoryList {
  lstentLegalApplicationStatusHistory: any = [];
         ientLegalApplicationStatusHistory = new entLegalApplicationStatusHistory();
         msg = new entIEMessage();
        
}

export class entListTrustApplicationApplicant {
  lstentTrustApplicationApplicant: any = [];
         ientTrustApplicationApplicant = new entTrustApplicationApplicant();
         msg = new entIEMessage();
        
}

export class entListTrustApplicationBenificiary {
  lstentTrustApplicationBenificiary: any = [];
         ientTrustApplicationBenificiary = new entTrustApplicationBenificiary();
         msg = new entIEMessage();
        
}

export class entListTrustApplicationCheckList {
  lstentTrustApplicationCheckList: any = [];
         ientTrustApplicationCheckList = new entTrustApplicationCheckList();
         msg = new entIEMessage();
        
}

export class entListTrustSettlementApplicationChecklist {
  lstentTrustSettlementApplicationChecklist: any = [];
         msg = new entIEMessage();
         ientTrustSettlementApplicationChecklist = new entTrustSettlementApplicationChecklist();
        
}

export class entListTrustWithdrawalApplicationChecklist {
  lstentTrustWithdrawalApplicationChecklist: any = [];
         msg = new entIEMessage();
         ientTrustWithdrawalApplicationChecklist = new entTrustWithdrawalApplicationChecklist();
        
}

export class entLongData {
  data = 0;
         msg = new entIEMessage();
        
}

export class entLongData1 {
  data1 = 0;
         data2 = 0;
         msg = new entIEMessage();
        
}

export class entLongData2 {
  data1 = 0;
         data2 = 0;
         data3 = 0;
         data4 = '';
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

export class entMsgDetail {
  msgID = 0;
         msgType = 0;
         msgDescription = '';
        
}

export class entOrganization {
  contactNo = '';
         effectiveDate = '';
         emailId = '';
         orgRefNo = '';
         organizationId = 0;
         organizationName = '';
         organizationTypeId = 0;
         organizationTypeValue = '';
         registeredAddressId = 0;
         statusId = 0;
         statusValue = '';
         website = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         msg = new entIEMessage();
         lstentOrganizationBankDetail: any = [];
         lstentOrganizationContactPerson: any = [];
         lstentOrganizationDocument: any = [];
         ientOrganizationBankDetail = new entOrganizationBankDetail();
         ientOrganizationContactPerson = new entOrganizationContactPerson();
         ientOrganizationDocument = new entOrganizationDocument();
         ipermanentAddress = new entAddress();
         organizationTypeDescription = '';
         enteredBy = '';
         enteredDate = '';
         enterdedByFullName = '';
         appliedByFullName = '';
         branchId = 0;
        
}

export class entOrganizationApplicaitonSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entOrganizationApplication {
  applicationRefNo = '';
         applicationTypeId = 0;
         applicationTypeValue = '';
         contactNo = '';
         effectiveDate = '';
         emailId = '';
         oldValue = '';
         orgStatusId = 0;
         orgStatusValue = '';
         organizationApplicationId = 0;
         organizationId = 0;
         organizationName = '';
         organizationTypeId = 0;
         organizationTypeValue = '';
         registeredAddressId = 0;
         statusId = 0;
         statusValue = '';
         website = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         applicationTypeDescription = '';
         ipermanentAddress = new entAddress();
         msg = new entIEMessage();
         organizationTypeDescription = '';
         orgStatusDescription = '';
         lstentOrganizationApplicationAssignedOfficerHistory: any = [];
         lstentOrganizationApplicationBankDetail: any = [];
         lstentOrganizationApplicationContactPerson: any = [];
         lstentOrganizationApplicationDocument: any = [];
         lstentOrganizationApplicationEmailHistory: any = [];
         lstentOrganizationApplicationNotes: any = [];
         lstentOrganizationApplicationStatusHistory: any = [];
         ientOrganizationApplicationAssignedOfficerHistory = new entOrganizationApplicationAssignedOfficerHistory();
         ientOrganizationApplicationBankDetail = new entOrganizationApplicationBankDetail();
         ientOrganizationApplicationContactPerson = new entOrganizationApplicationContactPerson();
         ientOrganizationApplicationDocument = new entOrganizationApplicationDocument();
         ientOrganizationApplicationEmailHistory = new entOrganizationApplicationEmailHistory();
         ientOrganizationApplicationNotes = new entOrganizationApplicationNotes();
         ientOrganizationApplicationStatusHistory = new entOrganizationApplicationStatusHistory();
         assignedOfficerFlag = '';
         selfAssignFlag = '';
         reAssignFlag = '';
         branchId = 0;
         workflowId = 0;
         previousStatusValue = '';
         ientOrganization = new entOrganization();
        
}

export class entOrganizationApplicationAssignedOfficerHistory {
  assignedBy = '';
         assignedDate = '';
         assignedTo = '';
         organizationAppplicationAssignedOfficerHistoryId = 0;
         organizationApplicationId = 0;
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         msg = new entIEMessage();
         assingnedByFullName = '';
         assingnedToFullName = '';
        
}

export class entOrganizationApplicationAssignedOfficerHistoryList {
  lstentOrganizationApplicationAssignedOfficerHistory: any = [];
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationBankDetail {
  accountNo = 0;
         bankId = 0;
         oldValue = '';
         organizationApplicationBankDetailId = 0;
         organizationApplicationId = 0;
         organizationBankDetailId = 0;
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         msg = new entIEMessage();
         ientBank = new entBank();
         lstentBank: any = [];
         editableFlag = '';
        
}

export class entOrganizationApplicationBankDetailList {
  lstentOrganizationApplicationBankDetail: any = [];
         lentOrganizationApplicationBankDetail = new entOrganizationApplicationBankDetail();
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationContactPerson {
  contactNo = '';
         contactPersonName = '';
         dateOfBirth = '';
         designation = '';
         drivingLicense = '';
         emailId = '';
         genderId = 0;
         genderValue = '';
         nationalId = '';
         oldValue = '';
         organizationApplicationContactPersonId = 0;
         organizationApplicationId = 0;
         organizationContactPersonId = 0;
         pfNo = '';
         statusId = 0;
         statusValue = '';
         voterId = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         genderDescription = '';
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationContactPersonList {
  lstentOrganizationApplicationContactPerson: any = [];
         lentOrganizationApplicationContactPerson = new entOrganizationApplicationContactPerson();
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationDocument {
  documentId = 0;
         documentTypeId = 0;
         documentTypeValue = '';
         isMandatory = '';
         organizationApplicationDocumentId = 0;
         organizationApplicationId = 0;
         idoObjState = '';
         updateSeq = 0;
         documentTypeDescription = '';
         msg = new entIEMessage();
         organizationDocumentId = 0;
         ientFile = new entFile();
         uploadedBy = '';
         uploadedDate = '';
         uploadedByFullName = '';
        
}

export class entOrganizationApplicationDocumentList {
  lstentOrganizationApplicationDocument: any = [];
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationEmailHistory {
  communicationTrackingId = 0;
         organizationApplicationEmialHistoryId = 0;
         organizationApplicationId = 0;
         sendBy = '';
         sendDate = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         msg = new entIEMessage();
         ientCommunicationTracking = new entCommunicationTracking();
         sendOfficerFullName = '';
        
}

export class entOrganizationApplicationEmailHistoryList {
  lstentOrganizationApplicationEmailHistory: any = [];
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationNotes {
  content = '';
         enteredBy = '';
         enteredDate = '';
         organizationApplicationNoteId = 0;
         organizationApplicationId = 0;
         statusId = 0;
         statusValue = '';
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         ientDDL = new entDDL();
         statusDescription = '';
         enteredByFullName = '';
        
}

export class entOrganizationApplicationNotesList {
  lstentOrganizationApplicationNotes: any = [];
         msg = new entIEMessage();
        
}

export class entOrganizationApplicationSearch {
  applicationRefNo = '';
         organizationName = '';
         organizationTypeValue = '';
         emailId = '';
         contactNo = '';
         website = '';
         effectiveDateFrom = '';
         statusValue = '';
         applicationTypeValue = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         effectiveDateTo = '';
        
}

export class entOrganizationApplicationSearchResultSet {
  organizationName = '';
         applicationRefNo = '';
         organizationTypeDescription = '';
         effectiveDate = '';
         statusDescription = '';
         organizationApplicationId = 0;
        
}

export class entOrganizationApplicationStatusHistory {
  changedBy = '';
         changedDate = '';
         organizationApplicationId = 0;
         organizationApplicationStatusHistoryId = 0;
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         changedByFullName = '';
        
}

export class entOrganizationApplicationStatusHistoryList {
  lstentOrganizationApplicationStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entOrganizationBankDetail {
  accountNo = 0;
         bankId = 0;
         organizationBankDetailId = 0;
         organizationId = 0;
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         msg = new entIEMessage();
         ientBank = new entBank();
         lstentBank: any = [];
        
}

export class entOrganizationContactPerson {
  contactNo = '';
         contactPersonName = '';
         dateOfBirth = '';
         designation = '';
         drivingLicense = '';
         emailId = '';
         genderId = 0;
         genderValue = '';
         nationalId = '';
         organizationContactPersonId = 0;
         organizationId = 0;
         pfNo = '';
         statusId = 0;
         statusValue = '';
         voterId = '';
         idoObjState = '';
         updateSeq = 0;
         statusDescription = '';
         genderDescription = '';
         msg = new entIEMessage();
        
}

export class entOrganizationDocument {
  documentId = 0;
         documentTypeId = '';
         documentTypeValue = '';
         isMandatory = '';
         organizationDocumentId = 0;
         organizationId = 0;
         idoObjState = '';
         updateSeq = 0;
         documentTypeDescription = '';
         msg = new entIEMessage();
         ientFile = new entFile();
         uploadedBy = '';
         uploadedDate = '';
         uploadedByFullName = '';
        
}

export class entOrganizationSearch {
  organizationName = '';
         organizationTypeValue = '';
         emailId = '';
         contactNo = '';
         website = '';
         statusValue = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         effectiveDateFrom = '';
         effectiveDateTo = '';
         orgRefNo = '';
        
}

export class entOrganizationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entOrganizationSearchResultSet {
  organizationName = '';
         orgRefNo = '';
         organizationDescription = '';
         effectiveDate = '';
         statusDescription = '';
         organizationId = 0;
        
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

export class entPostingMatrixConfiguration {
  appPostingMatrixConfigurationId = 0;
         voucherTypeId = 0;
         voucherTypeValue = '';
         percentageTypeId = 0;
         percentageTypeValue = '';
         configurationDescription = '';
         primaryPercentageValue = '';
         secondaryPercentageValue = '';
         rangeValue = '';
         addedValue = '';
         vatId = '';
         vatValue = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         percentageTypeDescription = '';
         statusDescription = '';
         voucherTypeDescription = '';
         vatDescription = '';
         plstentPostingMatrixConfigurationUpdateHistory: any = [];
         msg = new entIEMessage();
        
}

export class entPostingMatrixConfigurationList {
  ientPostingMatrixConfiguration = new entPostingMatrixConfiguration();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ilstentPostingMatrixConfiguration: any = [];
        
}

export class entPostingMatrixConfigurationSearch {
  voucherTypeValue = '';
         percentageTypeValue = '';
         configurationDescription = '';
         primaryPercentageValueFrom = '';
         primaryPercentageValueTo = '';
         secondaryPercentageValueFrom = '';
         secondaryPercentageValueTo = '';
         rangeValueFrom = '';
         rangeValueTo = '';
         addedValueFrom = '';
         addedValueTo = '';
         vatValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         statusValue = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entPostingMatrixConfigurationSearchResult {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entPostingMatrixConfigurationSearchResultSet {
  appPostingMatrixConfigurationId = 0;
         vocher = '';
         percentage = '';
         vatvalue = '';
         status = '';
         configurationDescription = '';
         primaryPercentageValue = '';
         secondaryPercentageValue = '';
         rangeValue = '';
         addedValue = '';
         effectiveDate = '';
        
}

export class entPostingMatrixConfigurationUpdateHistory {
  postingMatrixConfigurationUpdateHistoryId = 0;
         postingMatrixConfigurationId = 0;
         voucherTypeId = 0;
         voucherTypeValue = '';
         percentageTypeId = 0;
         percentageTypeValue = '';
         configurationDescription = '';
         primaryPercentageValue = '';
         secondaryPercentageValue = '';
         rangeValue = '';
         addedValue = '';
         vatId = 0;
         vatValue = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         oldValue = '';
         changedByFullName = '';
         voucherTypeDescription = '';
         rangeDescription = '';
         percentageTypeDescription = '';
         statusDescription = '';
         vatDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entProbateRegistry {
  probateRegistryId = 0;
         probateRegistryRefNo = '';
         deathNoticeId = 0;
         ientProbateRegistryStatus = new entProbateRegistryStatus();
         ilstentProbateRegistryStatus: any = [];
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entProbateRegistryStatus {
  probateRegistryStatusId = 0;
         probateRegistryId = 0;
         statusId = 0;
         statusValue = '';
         fileId = 0;
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         deathNoticeId = 0;
        
}

export class entProbateRegistryStatusList {
  ientProbateRegistryStatus = new entProbateRegistryStatus();
         ilstentProbateRegistryStatus: any = [];
         msg = new entIEMessage();
        
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

export class entString2Int1 {
  data1 = 0;
         data2 = '';
         data3 = '';
         msg = new entIEMessage();
        
}

export class entString2Long2Data {
  fileTypeValue = '';
         accountTypeValue = '';
         eventId = 0;
         subEventId = 0;
         voucherTypeValue = '';
        
}

export class entStringData {
  data = '';
         msg = new entIEMessage();
        
}

export class entStringData1 {
  data = '';
         data1 = '';
         msg = new entIEMessage();
        
}

export class entStringData3 {
  data1 = '';
         data2 = '';
         data3 = '';
         msg = new entIEMessage();
        
}

export class entTikinadetails {
  tikinaId = 0;
         tikinaName = '';
         islandId = 0;
         islandName = '';
         provinceId = 0;
         provinceName = '';
        
}

export class entTikinadetailsList {
  plistentTikinadetails: any = [];
        
}

export class entTransactionHistory {
  transactionHistoryId = 0;
         transactionPostingId = 0;
         groupId = 0;
         ledgerId = 0;
         postedDate = '';
         debitAmount = '';
         creditAmount = '';
         fiscalYearId = 0;
         accountTypeId = 0;
         accountTypeValue = '';
         fileTypeId = 0;
         fileTypeValue = '';
         customerAccountNumber = 0;
         documentDate = '';
         transactionDate = '';
         ledgerTransactionDetailId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         accountTypeDescription = '';
         fileTypeDescription = '';
        
}

export class entTransactionPosting {
  transactionPostingId = 0;
         eventId = 0;
         subEventId = 0;
         appEventMappingId = 0;
         fileTypeId = 0;
         fileTypeValue = '';
         fileTypeDescription = '';
         customerAccountNumber = 0;
         referenceId = 0;
         voucherTypeId = 0;
         voucherTypeValue = '';
         voucherTypeDescription = '';
         paymentModeId = 0;
         paymentModeValue = '';
         paymentModeDescription = '';
         bankId = 0;
         bankAccountNumber = '';
         chequeTransactionDate = '';
         chequeTransactionNumber = '';
         accountTypeId = 0;
         accountTypeValue = '';
         accountTypeDescription = '';
         inputValue = '';
         postingValue = '';
         narrative = '';
         enteredBy = '';
         enteredDate = '';
         enterByFullName = '';
         totalDebit = '';
         totalCredit = '';
         postedBy = '';
         postedDate = '';
         postedByFullName = '';
         documentNumber = '';
         documentDate = '';
         branchId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         fiscalYearId = 0;
         voucherConfigId = 0;
         assignedOfficerFlag = false;
         selfAssignFlag = false;
         reAssignFlag = false;
         branchDesription = '';
         groupName = '';
         ledgerName = '';
         idoObjState = '';
         updateSeq = 0;
         transactionCode = '';
         postingMatrix = '';
         msg = new entIEMessage();
         plstentTransactionPostingList: any = [];
         pientTransactionHistory = new entTransactionHistory();
         plstentTransactionHistory: any = [];
         plstentTransactionPostingNotes: any = [];
         plstentTransactionPostingAssignedOfficierHistory: any = [];
         plstentTransactionPostingEmailHistory: any = [];
         plstentTransactionPostingStatusHistory: any = [];
         pentCustomer = new entCustomer();
         pentCompanyUser = new entCompanyUser();
         bankFeeValue = '';
         depositBookNo = '';
         ientTransactionPostingErrorMessage = new entTransactionPostingErrorMessage();
         lstentTransactionPostingErrorMessage: any = [];
         eventName = '';
         subEventName = '';
         bankCode = '';
         isDirectApproval = '';
         ientTransactionPostingPaymentList = new entTransactionPostingPaymentList();
         lstentTransactionPostingPaymentList: any = [];
         appOrganizationId = 0;
         paymentForId = 0;
         paymentForValue = '';
         paymentForDescription = '';
         changeInDocumentNumber = '';
         changeInDocumentId = 0;
         changeInReceiptDate = '';
         changeInReceiptAmount = '';
         changeInReceiptAccountNo = 0;
         amountInWords = '';
         content = '';
        
}

export class entTransactionPostingAssignedOfficierHistory {
  transcationPostingAssignedOfficerId = 0;
         transactionPostingId = 0;
         assingedOfficier = '';
         assignedBy = '';
         assignedDate = '';
         statusId = 0;
         statusValue = '';
         changedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         assignedOfficerFullName = '';
         assignedByFullName = '';
         isAllowedToReAssign = '';
         ientDDL = new entDDL();
        
}

export class entTransactionPostingEmailHistory {
  transactionPostingEmialHistoryId = 0;
         transactionPostingId = 0;
         emialCommunicationId = 0;
         sendBy = '';
         sendDate = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         sentByOfficierFullName = '';
         ientCommunicationTracking = new entCommunicationTracking();
        
}

export class entTransactionPostingErrorMessage {
  transactionPostingErrorMessageId = 0;
         transactionPostingId = 0;
         messageDesc = '';
         insertedBy = '';
         insertedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         insertedByFullname = '';
        
}

export class entTransactionPostingList {
  transactionPostingListId = 0;
         transactionPostingId = 0;
         groupId = 0;
         ledgerId = 0;
         postingNatureId = 0;
         postingNatureValue = '';
         postingValue = '';
         isPrimaryPosting = '';
         isCorporateGl = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         postingNatureDescription = '';
         groupName = '';
         ledgerName = '';
         withdrawalApplicationId = 0;
         transactionPostingPaymentListId = 0;
         eventMappingId = 0;
        
}

export class entTransactionPostingNotes {
  transactionPostingNotesId = 0;
         transactionPostingId = 0;
         notes = '';
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         enteredByFullName = '';
         ientDDL = new entDDL();
        
}

export class entTransactionPostingPaymentList {
  transactionPostingPaymentListId = 0;
         trustAccountNumer = '';
         transactionPostingId = 0;
         withdrawalApplicationId = 0;
         amount = '';
         bankId = 0;
         bankAccountNumber = 0;
         transactionNumber = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         withdrawalApplicationNo = '';
         bankName = '';
         accountName = '';
         eventMappingId = 0;
         eventId = 0;
         subEventId = 0;
         ientTransactionPostingList = new entTransactionPostingList();
         lstentTransactionPostingList: any = [];
         accountTypeValue = '';
         fileTypeValue = '';
         postingValue = '';
         description = '';
         settlementAmount = '';
        
}

export class entTransactionPostingSearch {
  transactionReferenceNumber = '';
         branchId = 0;
         effectiveDateFrom = '';
         effectiveDateTo = '';
         customerAccountNumber = 0;
         appEventId = 0;
         subEventId = 0;
         appEventMappingId = 0;
         transactionCode = '';
         accountTypeValue = '';
         totalDebit = '';
         totalCredit = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         enteredBy = '';
         statusValue = '';
         fileTypeValue = '';
         referenceId = '';
         inputValue = '';
         postingValue = '';
         narrative = '';
         postedBy = '';
         postedDate = '';
         documentNumber = '';
         documentName = '';
         voucherConfigId = '';
         documentDateFrom = '';
         documentDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         assignedOfficer = '';
         voucherTypeValue = '';
         changeInDocumentId = 0;
         changeInDocumentNumber = '';
        
}

export class entTransactionPostingSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entTransactionPostingSearchResultSet {
  eventName = '';
         customerAccountNumber = 0;
         documentNumber = '';
         receiptNo = '';
         accountTypeDescription = '';
         totalCredit = '';
         totalDebit = '';
         createdBy = '';
         statusDescription = '';
         transactionPostingId = 0;
         configurationDescription = '';
         transactionCodeDescription = '';
         subEventName = '';
         effectiveDate = '';
         createdDate = '';
         fileTypeDescription = '';
         branchName = '';
         documentDate = '';
         assignedOfficer = '';
        
}

export class entTransactionPostingStatusHistory {
  transactionPostingStatusHistoryId = 0;
         transactionPostingId = 0;
         effectiveDate = 0;
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         changedByFullName = '';
        
}

export class entTrasactionDetail {
  openingBalance = '';
         documemtDate = '';
         reference = '';
         source = '';
         transaction = '';
         narrative = '';
         moneyIn = '';
         moneyOut = '';
         closingBalance = '';
         interestAccured = '';
         status = '';
        
}

export class entTrasactionDetailList {
  ientTrasactionDetail = new entTrasactionDetail();
         lstentTrasactionDetail: any = [];
        
}

export class entTrust {
  trustId = 0;
         trustRefNo = '';
         legacyRefNo = '';
         legacyFileNo = '';
         startDate = '';
         cashLedgerId = 0;
         nonCashLedgerId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         fileNo = '';
         trustAccountNo = 0;
         trustRegisterId = 0;
         ientTrustDocument = new entTrustDocument();
         ientTrustBenificiary = new entTrustBenificiary();
         lstentTrustBenificiary: any = [];
         lstentTrustDocument: any = [];
         idoObjState = '';
         updateSeq = 0;
         previuousStatusValue = '';
         trustApplicationId = 0;
         ilstentTrustApplicant: any = [];
         ientTrustSettlor: any = [];
         lstentFptclAccountNo: any = [];
         ientFile = new entFptclFile();
         lstentTrustWithdrawalApplication: any = [];
         ientTrustSettlementApplication = new entTrustSettlementApplication();
        
}

export class entTrustAndEstateReport {
  fiscalYearId = 0;
         fromDate = '';
         toDate = '';
         fileType = '';
         accountType = '';
         customerAccountNumber = 0;
         fileNo = '';
         fileName = '';
         fiscalYear = '';
         customerName = '';
         openingBalance = '';
         closingBalance = '';
        
}

export class entTrustAndEstateReportGrid {
  documentDate = '';
         fileType = '';
         accountType = '';
         accountNumber = 0;
         currency = '';
         debit = '';
         credit = '';
         runningBalance = '';
         customerName = '';
         documentName = '';
         narrative = '';
        
}

export class entTrustAndEstateReportList {
  companyName = '';
         customerName = '';
         companyAddressline1 = '';
         companyAddressline2 = '';
         companyAddressline3 = '';
         companyAddressline4 = '';
         customerAddress = '';
         statementFromDate = '';
         statementtoDate = '';
         reportgeneratedDatetime = '';
         plstentTrustAndEstateReportGrid: any = [];
         ientTrustAndEstateReport = new entTrustAndEstateReport();
        
}

export class entTrustApplicant {
  trustApplicantId = 0;
         trustId = 0;
         customerId = 0;
         isPrimaryApplicant = '';
         idoObjState = '';
         updateSeq = 0;
         ientCustomer = new entCustomer();
        
}

export class entTrustApplicantList {
  lstentTrustApplicant: any = [];
         ientTrustApplicant = new entTrustApplicant();
         msg = new entIEMessage();
        
}

export class entTrustApplication {
  trustApplicationId = 0;
         trustApplRefNo = '';
         trustTypeId = 0;
         trustTypeValue = '';
         trustTypeDescription = '';
         appliedBy = '';
         appliedByFullname = '';
         appliedDate = '';
         eneredBy = '';
         enteredByFullname = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         ientTrustApplicationApplicant = new entTrustApplicationApplicant();
         ientTrustApplicationBenificiary = new entTrustApplicationBenificiary();
         entTrustApplicationApplicantList: any = [];
         entTrustApplicationBenificiaryList: any = [];
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         previousStatusValue = '';
         ientTrustApplicationCheckList = new entTrustApplicationCheckList();
         lstentTrustApplicationCheckList: any = [];
         ientTrustApplicationDocument = new entTrustApplicationDocument();
         lstentTrustApplicationDocument: any = [];
         ientTrustApplicationEmailHistory = new entTrustApplicationEmailHistory();
         lstentTrustApplicationEmailHistory: any = [];
         ientTrustApplicationNotes = new entTrustApplicationNotes();
         lstentTrustApplicationNotes: any = [];
         ientTrustApplicationStatusHistory = new entTrustApplicationStatusHistory();
         lstentTrustApplicationStatusHistory: any = [];
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         ientTrustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
         lstentTrustApplicationAssignedOfficer: any = [];
         fileNo = '';
         actionStatusId = 0;
         actionStatusValue = '';
         actionStatusDescription = '';
         assignedOfficerFlag = '';
         reAssignFlag = '';
         selfAssignFlag = '';
         trustRegNo = '';
         trustName = '';
         receiptNo = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         appliedBranchDescription = '';
         additionalNotes = '';
         trustOfficerAssigned = '';
         settledAmount = '';
         dateOfTrustDeed = '';
         trustAssignedToFullname = '';
         leadId = 0;
         leadRefNo = '';
         leadAssignedDepartment = '';
         leadAssignedDepartmentValue = '';
         ientTrustApplicationClient = new entTrustApplicationClient();
         lstentTrustApplicationClient: any = [];
         ientTrustApplicationTrustee = new entTrustApplicationTrustee();
         lstentTrustApplicationTrustee: any = [];
         ientTrustApplicationsettlor = new entTrustApplicationSettlor();
         lstentTrustApplicationsettlor: any = [];
         workflowId = 0;
         trustAccountNo = 0;
         ientTrustApplicationCourtOrder = new entTrustApplicationCourtOrder();
         isCompleted = '';
         isCourtRequired = '';
         trustAccountStatus = '';
         ientTrustApplicationRejectHistory = new entTrustApplicationRejectHistory();
         lstentTrustApplicationRejectHistory: any = [];
         identifierCount = 0;
         clientDocumentCount = 0;
         courtOrderCount = 0;
         legalServiceOfficerId = '';
         previousStageValue = '';
         previousActionStatusValue = '';
         ientTrustRegister = new entTrustRegister();
         lstentTrustRegister: any = [];
         ientFptclAccountNo = new entFptclAccountNo();
         lstentFptclAccountNo: any = [];
         ientFptclFile = new entFptclFile();
         lstentFptclFile: any = [];
         modifiedDate = '';
         trustApplicationCompleted = '';
         createButtonHide = '';
        
}

export class entTrustApplicationApplicant {
  trustApplicationApplicantId = 0;
         trustApplicationId = 0;
         customerId = 0;
         isPrimaryApplicant = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientCustomer = new entCustomer();
         childrenName = '';
         contactNo = '';
         emailId = '';
         ientTrustApplicationParentAddtionalInfo = new entTrustApplicationParentAddtionalInfo();
         lstentTrustApplicationParentAddtionalInfo: any = [];
        
}

export class entTrustApplicationAssignedOfficer {
  trustApplicationAssignedOfficerHistoryId = 0;
         trustApplicationId = 0;
         assignedTo = '';
         assignedDate = '';
         assignedToFullname = '';
         assignedByFullname = '';
         assignedBy = '';
         actionStatusId = 0;
         actionStatusValue = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         tatDays = 0;
         tatHrs = 0;
         tatMin = 0;
         tatSec = 0;
         verificationDate = '';
         designation = '';
         identityNo = 0;
        
}

export class entTrustApplicationAssignedOfficerList {
  entTrustApplicationAssignedOfficerList: any = [];
         ientTrustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
        
}

export class entTrustApplicationBenificiary {
  trustApplicationBeneficiaryId = 0;
         trustApplicationId = 0;
         beneficaryCustomerId = 0;
         isMinor = '';
         gaurdianCustomerId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         benificiaryDateOfbirth = '';
         ientBeneficaryCustomer = new entCustomer();
         ientGaurdianCustomer = new entCustomer();
         relationshipId = 0;
         relationshipValue = '';
         gaurdianDateOfbirth = '';
         relationshipDescription = '';
         nomination = '';
         benificiaryAge = 0;
        
}

export class entTrustApplicationCheckList {
  trustApplicationChecklistId = 0;
         trustApplicationId = 0;
         checklistName = '';
         isMandatory = '';
         checkedBy = '';
         checkedDatetime = '';
         applicationStageId = 0;
         applicationStageValue = '';
         checkedByFullname = '';
         applicationStageDescription = '';
         isChecked = '';
         idoObjState = '';
         updateSeq = 0;
         currentTrustTypeValue = '';
         identityNo = 0;
        
}

export class entTrustApplicationClient {
  trustApplicationClientId = 0;
         trustApplicationId = 0;
         customerId = 0;
         isPrimaryClient = '';
         idoObjState = '';
         updateSeq = 0;
         ientCustomer = new entCustomer();
         ientTrustApplicationClientOrg = new entTrustApplicationClientOrg();
         lstentTrustApplicationClientOrg: any = [];
        
}

export class entTrustApplicationClientList {
  lstentTrustApplicationClient: any = [];
         ientTrustApplicationClient = new entTrustApplicationClient();
         msg = new entIEMessage();
        
}

export class entTrustApplicationClientOrg {
  trustApplicationClientOrgId = 0;
         trustApplictionClientId = 0;
         organizationName = '';
         settlementAmount = '';
         nomineeName = '';
         nomineeDob = '';
         idoObjState = '';
         updateSeq = 0;
         trustApplicationId = 0;
         msg = new entIEMessage();
        
}

export class entTrustApplicationClientOrgList {
  lstentTrustApplicationClientOrg: any = [];
         ientTrustApplicationClientOrg = new entTrustApplicationClientOrg();
         msg = new entIEMessage();
        
}

export class entTrustApplicationCourtOrder {
  trustApplicationCourtOrderId = 0;
         trustApplicationId = 0;
         tlOfficerId = 0;
         tlVerification = '';
         metOfficerId = 0;
         metVerification = '';
         mlOfficerId = 0;
         mlVerification = '';
         legalOfficerId = 0;
         courtOrderDocumentId = 0;
         courtOrderNotes = '';
         lstentTrustApplicationCourtOrder: any = [];
         tlDesignation = '';
         tlUserName = '';
         metDesignation = '';
         metUserName = '';
         mlDesignation = '';
         mlUserName = '';
         legalOfficerName = '';
        
}

export class entTrustApplicationDocument {
  trustApplicationDocumentId = 0;
         trustApplicationId = 0;
         documentTypeId = 0;
         documentTypeValue = '';
         documentTypeDescription = '';
         otherDocName = '';
         fileId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         enteredDate = '';
         enteredBy = '';
         isMandatory = '';
         enteredByFullname = '';
         trustApplicationRefNo = '';
         trustTypeDescription = '';
         trustTypeId = 0;
         trustTypeValue = '';
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         identityNo = 0;
        
}

export class entTrustApplicationDocumentList {
  lstentTrustApplicationDocument: any = [];
         msg = new entIEMessage();
         ientTrustApplicationDocument = new entTrustApplicationDocument();
        
}

export class entTrustApplicationEmailHistory {
  trustApplicationEmailHistoryId = 0;
         trustApplicationId = 0;
         emialCommunicationId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         sendBy = '';
         sendByFullname = '';
         sendDate = '';
         ientCommunicationTracking = new entCommunicationTracking();
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         actionStatusId = 0;
         actionStatusValue = '';
         actionStatusDescription = '';
         applicationStageId = 0;
         applicationStageDescription = '';
         applicationStageValue = '';
         identityNo = 0;
        
}

export class entTrustApplicationEmailHistoryList {
  entTrustApplicationEmailHistoryList: any = [];
         ientTrustApplicationEmailHistory = new entTrustApplicationEmailHistory();
         msg = new entIEMessage();
        
}

export class entTrustApplicationNotes {
  trustApplicationNotesId = 0;
         trustApplicationId = 0;
         notes = '';
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         iActionStatusDDL = new entDDL();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         iStatusDDL = new entDDL();
         actionStatusId = 0;
         actionStatusValue = '';
         enteredByFullname = '';
         actionStatusDescription = '';
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         identityNo = 0;
         isUpdateButtonShow = '';
        
}

export class entTrustApplicationNotesList {
  lstentTrustApplicationNotes: any = [];
         lentTrustApplicationNotes = new entTrustApplicationNotes();
         msg = new entIEMessage();
        
}

export class entTrustApplicationParentAddtionalInfo {
  trustApplicationParentAddtionalInfoId = 0;
         trustApplicationApplicantId = 0;
         childrenName = '';
         dateOfBirth = '';
         genderId = 0;
         genderValue = '';
         idoObjState = '';
         updateSeq = 0;
         genderDescription = '';
         msg = new entIEMessage();
        
}

export class entTrustApplicationParentAddtionalInfoList {
  lstentTrustApplicationParentAddtionalInfo: any = [];
         ientTrustApplicationParentAddtionalInfo = new entTrustApplicationParentAddtionalInfo();
         msg = new entIEMessage();
        
}

export class entTrustApplicationRejectHistory {
  trustApplicationId = 0;
         trustApplicationStageValue = '';
         trustApplicationIdenityNo = 0;
         trustApplicationRejectHistoryId = 0;
         isEditable = '';
        
}

export class entTrustApplicationSearch {
  trustApplRefNo = '';
         trustTypeValue = '';
         applicationStageValue = '';
         appliedBranchValue = '';
         statusValue = '';
         fileNo = '';
         actionStatusValue = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         eneredBy = '';
         appliedBy = '';
         appliedDateFrom = '';
         appliedDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         assignedOfficer = '';
         applicantName = '';
         applicantCrmNo = '';
         settledAmountFrom = '';
         settledAmountTo = '';
         trusDeedDateFrom = '';
         trusDeedDateTo = '';
         trustAccountNo = 0;
         customerId = 0;
        
}

export class entTrustApplicationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entTrustApplicationSearchResultSet {
  trustApplicationId = 0;
         trustApplRefNo = '';
         trustTypeDescription = '';
         stageDescription = '';
         branchDescription = '';
         actionStatusDescription = '';
         appliedDate = '';
         fileNo = '';
         trustAccountNo = 0;
         applicantName = '';
         applicantCrmNo = '';
         settledAmount = '';
         trusDeedDate = '';
         statusDescription = '';
         assignedOfficer = '';
         trustType = '';
         stage = '';
         branch = '';
         actionStatus = '';
         status = '';
        
}

export class entTrustApplicationSettlor {
  trustApplicationSettlorId = 0;
         trustApplicationId = 0;
         settlorName = '';
         isFptcl = '';
         idoObjState = '';
         updateSeq = 0;
         createdByFullname = '';
         createdDate = '';
         customerId = 0;
         ientCustomer = new entCustomer();
        
}

export class entTrustApplicationSettlorList {
  lstentTrustApplicationSettlor: any = [];
         ientTrustApplicationSettlor = new entTrustApplicationSettlor();
         msg = new entIEMessage();
        
}

export class entTrustApplicationStatusHistory {
  trustApplicationStatusHistoryId = 0;
         trustApplicationId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         changedBy = '';
         changedDate = '';
         changedByFullname = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         actionStatusId = 0;
         actionStatusValue = '';
         actionStatusDescription = '';
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         identityNo = 0;
        
}

export class entTrustApplicationStatusHistoryList {
  listentTrustApplicationStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entTrustApplicationTrustee {
  trustApplicationTrusteeId = 0;
         trustApplicationId = 0;
         trusteeName = '';
         isFptcl = '';
         idoObjState = '';
         updateSeq = 0;
         createdByFullname = '';
         createdDate = '';
         customerId = 0;
         ientCustomer = new entCustomer();
        
}

export class entTrustApplicationTrusteeList {
  lstentTrustApplicationTrustee: any = [];
         ientTrustApplicationTrustee = new entTrustApplicationTrustee();
         msg = new entIEMessage();
        
}

export class entTrustBenificiary {
  trustBeneficiaryId = 0;
         trustId = 0;
         beneficiaryCustomerId = 0;
         gaurdianCustomerId = 0;
         cashSharePercentage = '';
         nonCashSharePercentage = '';
         cashLedgerId = 0;
         idoObjState = '';
         updateSeq = 0;
         relationshipId = 0;
         relationshipDescription = '';
         relationshipValue = '';
         beneficiaryName = '';
         gurdianName = '';
         ientBeneficaryCustomer = new entCustomer();
         ientGaurdianCustomer = new entCustomer();
        
}

export class entTrustDashboard {
  trustApplicationCount = 0;
         trustCount = 0;
         trustAccounts = 0;
         trustWithdrawalApplicationCount = 0;
         trustSettlementApplicationCount = 0;
         datasets1: any = [];
         datasets2: any = [];
         dataset3: any = [];
         dataset4: any = [];
         dataset5: any = [];
         msg = new entIEMessage();
        
}

export class entTrustDocument {
  trustDocumentId = 0;
         trustId = 0;
         documentTypeId = 0;
         documentTypeValue = '';
         documentTypeDescription = '';
         otherDocName = '';
         fileId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         enteredDate = '';
         enteredBy = '';
         isMandatory = '';
         enteredByFullname = '';
         lstentFile: any = [];
        
}

export class entTrustDocumentList {
  lstentTrustDocument: any = [];
         msg = new entIEMessage();
         ientTrustDocument = new entTrustDocument();
        
}

export class entTrustRegister {
  trustRegisterId = 0;
         trustApplicationId = 0;
         registerRefNo = '';
         trustFolderName = '';
         fileNo = '';
         statusId = 0;
         statusValue = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
        
}

export class entTrustSearch {
  trustApplRefNo = '';
         trustAccountNo = 0;
         legacyRefNo = '';
         legacyFileNo = '';
         trustName = '';
         fileNo = '';
         statusValue = '';
         startDateFrom = '';
         startDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         trustApplicationId = 0;
         applicantId = 0;
         beneficaryId = 0;
        
}

export class entTrustSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entTrustSearchResultSet {
  trustId = 0;
         trustAccountNo = 0;
         legacyRefNo = '';
         legacyFileNo = '';
         trustName = '';
         startDate = '';
         fileNo = '';
         statusDescription = '';
         trustApplRefNo = '';
         trustApplicationId = 0;
         applicant = '';
         beneficiary = '';
        
}

export class entTrustSettlementApplication {
  trustSettlementApplicationId = 0;
         applicationRefNo = '';
         trustId = 0;
         withdrawalModeId = 0;
         withdrawalModeValue = '';
         reason = '';
         appliedDate = '';
         appliedCustomerId = 0;
         beneficiaryCustomerId = 0;
         relationshipTypeId = 0;
         relationshipTypeValue = '';
         availableAmount = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         applicationStageId = 0;
         applicationStageValue = '';
         assignedOfficer = '';
         leadId = 0;
         paymentModeId = 0;
         paymentModeValue = '';
         paymentOptionId = 0;
         paymentOptionValue = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         modeOfApplicationId = 0;
         modeOfApplicationValue = '';
         enteredBy = '';
         enteredDate = '';
         editableIdentificationNo = 0;
         overseasAddressId = 0;
         workflowId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         appliedBranchDescription = '';
         modeOfApplicationDescription = '';
         paymentModeDescription = '';
         relationshipTypeDescription = '';
         withdrawalModeDescription = '';
         enteredByFullname = '';
         appliedByFullname = '';
         accountName = '';
         leadRefNo = '';
         trustAccountNo = 0;
         beneficiaryCustomerName = '';
         guardianName = '';
         isCompleted = '';
         identifierCount = 0;
         ientTrustSettlementApplicationProcessHistory = new entTrustSettlementApplicationProcessHistory();
         lstentTrustSettlementApplicationProcessHistory: any = [];
         ientTrustSettlementApplicationDocument = new entTrustSettlementApplicationDocument();
         lstentTrustSettlementApplicationDocument: any = [];
         ientTrustSettlementApplicationNotes = new entTrustSettlementApplicationNotes();
         lstentTrustSettlementApplicationNotes: any = [];
         ientTrustSettlementAssignedOfficerHistory = new entTrustSettlementAssignedOfficerHistory();
         lstentTrustSettlementAssignedOfficerHistory: any = [];
         ientTrustSettlementApplicationBankDetail = new entTrustSettlementApplicationBankDetail();
         ientTrustSettlementApplicationChecklist = new entTrustSettlementApplicationChecklist();
         lstentTrustSettlementApplicationChecklist: any = [];
         ientTrustSettlementApplicationEmailHistory = new entTrustSettlementApplicationEmailHistory();
         lstentTrustSettlementApplicationEmailHistory: any = [];
         lstentTrustSettlementApplicationStatusHistory: any = [];
         assignedToFullname = '';
         iOverseasAddress = new entAddress();
         ientTrustSettlementApplicationApplicant = new entTrustSettlementApplicationApplicant();
         assignedOfficerFlag = '';
         reassignFlag = '';
         selfassignFlag = '';
         leadAssignedDepartmentValue = '';
         paymentOptionDescription = '';
         ientDDL = new entDDL();
        
}

export class entTrustSettlementApplicationApplicant {
  trustSettlementApplicationApplicantId = 0;
         trustSettlementApplicationId = 0;
         customerId = 0;
         maritalStatusId = 0;
         maritalStatusValue = '';
         occupation = '';
         officeContact = '';
         maritalStatusDescription = '';
         customerFullName = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationApplicantList {
  lstentTrustSettlementApplicationApplicant: any = [];
         ientTrustSettlementApplicationApplicant = new entTrustSettlementApplicationApplicant();
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationBankDetail {
  trustSettlementApplicationBankDetailId = 0;
         isOverseasBank = '';
         accountNumber = '';
         bankName = '';
         bankCode = '';
         bankBranch = '';
         bankAddressId = 0;
         ibankAddress = new entAddress();
         trustSettlementApplicationId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationChecklist {
  trustSettlementApplicationChecklistId = 0;
         trustSettlementApplicationId = 0;
         checklistName = '';
         isMandatory = '';
         checkedBy = '';
         checkedDatetime = '';
         identificationNo = 0;
         changedByFullname = '';
         isChecked = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationDocument {
  trustSettlementApplicationDocumentId = 0;
         trustSettlementApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         statusId = 0;
         statusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         isMandatory = '';
         identificationNo = 0;
         ientFile = new entFile();
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         documentTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         applicationRefNo = '';
        
}

export class entTrustSettlementApplicationDocumentList {
  lstentTrustSettlementApplicationDocument: any = [];
         msg = new entIEMessage();
         ientTrustSettlementApplicationDocument = new entTrustSettlementApplicationDocument();
        
}

export class entTrustSettlementApplicationEmailHistory {
  trustSettlementApplicationEmailHistoryId = 0;
         trustSettlementApplicationId = 0;
         communicationTrackingId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         sendBy = '';
         sendDate = '';
         identificationNo = 0;
         ientCommunicationTracking = new entCommunicationTracking();
         sendByFullname = '';
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationNotes {
  trustSettlementApplicationNotesId = 0;
         trustSettlementApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         notes = '';
         identificationNo = 0;
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         iStatusDDL = new entDDL();
         iActionStatusDDL = new entDDL();
         enteredByFullname = '';
         enteredBy = '';
         enteredDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationProcessHistory {
  trustSettlementApplicationProcessHistoryId = 0;
         trustSettlementApplicationId = 0;
         trustSettlementApplicationStageId = 0;
         trustSettlementApplicationStageValue = '';
         identificationNo = 0;
         trustSettlementApplicationStageDescription = '';
         isEditable = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementApplicationStatusHistory {
  trustSettlementApplicationStatusHistoryId = 0;
         trustSettlementApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         identificationNo = 0;
         changedByFullname = '';
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustSettlementAssignedOfficerHistory {
  trustSettlementApplicationAssignedOfficerHistoryId = 0;
         trustSettlementApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         assignedTo = '';
         assignedBy = '';
         assignedDate = '';
         identificationNo = 0;
         assignedByFullname = '';
         assignedToFullname = '';
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         designation = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         verifiedDate = '';
        
}

export class entTrustSettlementSearch {
  applicationRefNo = '';
         trustAccountNo = 0;
         leadRefNo = '';
         firstName = '';
         gaurdianName = '';
         appliedBranchValue = '';
         appliedDate = '';
         enteredBy = '';
         enteredDate = '';
         availableAmountFrom = '';
         availableAmountTo = '';
         applicationStageValue = '';
         actionStatusValue = '';
         statusValue = '';
         assignedOfficer = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         sortColumn = '';
         sortOrder = false;
        
}

export class entTrustSettlementSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entTrustSettlementSearchResultSet {
  trustSettlementApplicationId = 0;
         applicationRefNo = '';
         trustAccountNo = 0;
         leadRefNo = '';
         beneficiaryCustomerName = '';
         gaurdianName = '';
         enteredByFullname = '';
         appliedDate = '';
         enteredDate = '';
         appliedBranchDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         assignedOfficer = '';
        
}

export class entTrustSettlor {
  trustSettlorId = 0;
         trustId = 0;
         settlorName = '';
         isFptcl = '';
         idoObjState = '';
         updateSeq = 0;
         createdByFullname = '';
         createdDate = '';
         customerId = 0;
         ientCustomer = new entCustomer();
        
}

export class entTrustSettlorList {
  lstentTrustSettlor: any = [];
         ientTrustSettlor = new entTrustSettlor();
         msg = new entIEMessage();
        
}

export class entTrustTrustee {
  trustTrusteeId = 0;
         trustId = 0;
         trusteeName = '';
         isFptcl = '';
         idoObjState = '';
         updateSeq = 0;
         createdByFullname = '';
         createdDate = '';
         customerId = 0;
         ientCustomer = new entCustomer();
        
}

export class entTrustTrusteeList {
  lstentTrustTrustee: any = [];
         ientTrustTrustee = new entTrustTrustee();
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplication {
  trustWithdrawalApplicationId = 0;
         applicationRefNo = '';
         trustId = 0;
         trustAccountNo = 0;
         withdrawalTypeId = 0;
         withdrawalTypeValue = '';
         appliedDate = '';
         appliedCustomerId = 0;
         requestedAmount = '';
         assignedOfficer = '';
         approvedAmount = '';
         availableAmount = '';
         eligibleAmount = '';
         leadId = 0;
         paymentModeId = 0;
         paymentModeValue = '';
         withdrawalTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         previuousStatusValue = '';
         ientTrustWithdrawalApplicationDocument = new entTrustWithdrawalApplicationDocument();
         lstentTrustWithdrawalApplicationDocument: any = [];
         ientTrustWithdrawalApplicationEmailHistory = new entTrustWithdrawalApplicationEmailHistory();
         lstentTrustWithdrawalApplicationEmailHistory: any = [];
         ientTrustWithdrawalApplicationNotes = new entTrustWithdrawalApplicationNotes();
         lstentTrustWithdrawalApplicationNotes: any = [];
         ientTrustWithdrawalApplicationStatusHistory = new entTrustWithdrawalApplicationStatusHistory();
         lstentTrustWithdrawalApplicationStatusHistory: any = [];
         ientTrustWithdrawalApplicationAssignedOfficerHistory = new entTrustWithdrawalApplicationAssignedOfficerHistory();
         lstentTrustWithdrawalApplicationAssignedOfficerHistory: any = [];
         withdrawalModeId = 0;
         withdrawalModeValue = '';
         withdrawalSubTypeId = 0;
         withdrawalSubTypeValue = '';
         reasonForWithdrawal = '';
         beneficiaryCustomerId = 0;
         relationshipTypeId = 0;
         relationshipTypeValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         actionStatusDescription = '';
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         applicationStatusDescription = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         appliedBranchDescription = '';
         modeOfApplicationId = 0;
         modeOfApplicationValue = '';
         modeOfApplicationDescription = '';
         enteredBy = '';
         enteredDate = '';
         editableIdentificationNo = 0;
         paymentModeDescription = '';
         relationshipTypeDescription = '';
         withdrawalModeDescription = '';
         withdrawalSubTypeDescription = '';
         inspectionDate = '';
         ientTrustWithdrawalApplicationChecklist = new entTrustWithdrawalApplicationChecklist();
         lstentTrustWithdrawalApplicationChecklist: any = [];
         leadRefNo = '';
         appliedByFullname = '';
         ientWithdrawalPayment = new entWithdrawalPayment();
         beneficiaryCustomerName = '';
         guardianName = '';
         fileNo = '';
         accountName = '';
         aboveThereshold = '';
         ientTrustWithdrawalApplicationProcessHistory = new entTrustWithdrawalApplicationProcessHistory();
         lstentTrustWithdrawalApplicationProcessHistory: any = [];
         workflowId = 0;
         isCompleted = '';
         identifierCount = 0;
         assignedToFullname = '';
         enteredByFullname = '';
         leadAssignedDepartmentValue = '';
         assignedOfficerFlag = '';
         reassignFlag = '';
         selfassignFlag = '';
         ientDDL = new entDDL();
        
}

export class entTrustWithdrawalApplicationAssignedOfficerHistory {
  trustWithdrawalApplicationAssignedOfficerHistoryId = 0;
         trustWithdrawalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         assignedTo = '';
         assignedDate = '';
         assignedBy = '';
         identificationNo = 0;
         verfiedDate = '';
         designation = '';
         assignedToFullname = '';
         assignedByFullname = '';
         applicationStatusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplicationChecklist {
  trustWithdrawalApplicationChecklistId = 0;
         trustWithdrawalApplicationId = 0;
         checklistName = '';
         isMandatory = '';
         checkedBy = '';
         checkedDatetime = '';
         identificationNo = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplicationDocument {
  trustWithdrawalApplicationDocumentId = 0;
         trustWithdrawalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         isMandatory = '';
         identificationNo = 0;
         enteredBy = '';
         enteredDate = '';
         ientFile = new entFile();
         documentTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         applicationStatusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         trustApplicationRefNo = '';
        
}

export class entTrustWithdrawalApplicationDocumentList {
  lstentTrustWithdrawalApplicationDocument: any = [];
         msg = new entIEMessage();
         ientTrustWithdrawalApplicationDocument = new entTrustWithdrawalApplicationDocument();
        
}

export class entTrustWithdrawalApplicationEmailHistory {
  trustWithdrawalApplicationEmialHistoryId = 0;
         trustWithdrawalApplicationId = 0;
         communicationTrackingId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         identificationNo = 0;
         ientCommunicationTracking = new entCommunicationTracking();
         sendBy = '';
         sendDate = '';
         applicationStatusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplicationNotes {
  trustWithdrawalApplicationNotesId = 0;
         trustWithdrawalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         notes = '';
         enteredBy = '';
         enteredDate = '';
         identificationNo = 0;
         ientDDL = new entDDL();
         applicationStatusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         iStatusDDL = new entDDL();
         iActionStatusDDL = new entDDL();
         enteredByFullname = '';
        
}

export class entTrustWithdrawalApplicationOrganization {
  trustWithdrawalApplicationOrganizationId = 0;
         trustWithdrawalApplicationId = 0;
         organizationId = 0;
         bankId = 0;
         accountNo = '';
         chequeDate = '';
         chequeAmount = '';
         requestedAmount = '';
         approvedAmount = '';
         eligibleAmount = '';
         organizationName = '';
         bankName = '';
         bankCode = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplicationOrganizationList {
  lstentTrustWithdrawalApplicationOrganization: any = [];
         ientTrustWithdrawalApplicationOrganization = new entTrustWithdrawalApplicationOrganization();
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplicationProcessHistory {
  trustWithdrawalApplicationProcessHistoryId = 0;
         trustWithdrawalApplicationId = 0;
         trustWithdrawalApplicationStageId = 0;
         trustWithdrawalApplicationStageValue = '';
         identificationNo = 0;
         applicationStageDescription = '';
         isEditable = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalApplicationStatusHistory {
  trustWithdrawalApplicationStatusHistoryId = 0;
         trustWithdrawalApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         identificationNo = 0;
         changedBy = '';
         changedDate = '';
         changedByFullname = '';
         applicationStatusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalDashboard {
  trustApplicationCount = 0;
         trustCount = 0;
         trustAccounts = 0;
         datasets1: any = [];
         datasets2: any = [];
         datasets3: any = [];
         labels: any = [];
         msg = new entIEMessage();
        
}

export class entTrustWithdrawalSearch {
  applicationRefNo = '';
         trustAccountNo = 0;
         leadRefNo = '';
         firstName = '';
         gaurdianName = '';
         withdrawalTypeValue = '';
         withdrawalSubTypeValue = '';
         appliedBranchValue = '';
         appliedDate = '';
         enteredBy = '';
         enteredDate = '';
         availableAmountFrom = '';
         availableAmountTo = '';
         applicationStageValue = '';
         actionStatusValue = '';
         applicationStatusValue = '';
         assignedOfficer = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         sortColumn = '';
         sortOrder = false;
        
}

export class entTrustWithdrawalSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entTrustWithdrawalSearchResultSet {
  trustWithdrawalApplicationId = 0;
         applicationRefNo = '';
         trustAccountNo = 0;
         leadRefNo = '';
         beneficiaryCustomerName = '';
         gaurdianName = '';
         enteredByFullname = '';
         appliedDate = '';
         enteredDate = '';
         withdrawalTypeDescription = '';
         withdrawalSubTypeDescription = '';
         appliedBranchDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         assignedOfficer = '';
        
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

export class entUserRights {
  iViewName = '';
         resourcePermission: any = [];
        
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

export class entWill {
  willId = 0;
         willApplicationId = 0;
         willApplRefNo = '';
         appliedBy = '';
         appliedDate = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         enteredBy = '';
         enteredDate = '';
         testatorId = 0;
         willDocId = 0;
         fileNo = '';
         ientWillApplicant = new entWillApplicant();
         lstentWillApplicant: any = [];
         ientWillBeneficiary = new entWillBeneficiary();
         lstentWillBeneficiary: any = [];
         ientWillSpouse = new entWillSpouse();
         lstentWillSpouse: any = [];
         ientWillTestator = new entWillTestator();
         ientWillWitness = new entWillWitness();
         lstentWillWitness: any = [];
         ientWillOtherAssetDetails = new entWillOtherAssetDetails();
         lstentWillOtherAssetDetails: any = [];
         ientWillFinanceDetails = new entWillFinanceDetails();
         lstentWillFinanceDetails: any = [];
         ientWillRealestateDetails = new entWillRealestateDetails();
         lstentWillRealestateDetails: any = [];
         ientWillVehicleDetails = new entWillVehicleDetails();
         lstentWillVehicleDetails: any = [];
         ientWillInvestmentDetails = new entWillInvestmentDetails();
         lstentWillInvestmentDetails: any = [];
         ientWillInsuranceDetails = new entWillInsuranceDetails();
         lstentWillInsuranceDetails: any = [];
         ientWillDocument = new entWillDocument();
         lstentWillDocument: any = [];
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         enteredByFullname = '';
        
}

export class entWillApplicant {
  willApplicantId = 0;
         willId = 0;
         customerId = 0;
         maritalStatusId = 0;
         maritalStatusValue = '';
         occupation = '';
         maritalStatusDescription = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplication {
  willApplicationId = 0;
         willApplRefNo = '';
         leadRefNo = '';
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStageDescription = '';
         appliedBy = '';
         appliedDate = '';
         appliedBranchId = 0;
         appliedBranchValue = '';
         appliedBranchDescription = '';
         enteredBy = '';
         enteredDate = '';
         statusId = 0;
         statusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         actionStatusDescription = '';
         testatorId = 0;
         willDocId = 0;
         ientWillApplicationNotes = new entWillApplicationNotes();
         lstentWillApplicationNotes: any = [];
         ientWillApplicationInvestmentDetails = new entWillApplicationInvestmentDetails();
         lstentWillApplicationInvestmentDetails: any = [];
         ientWillApplicationInsuranceDetails = new entWillApplicationInsuranceDetails();
         lstentWillApplicationInsuranceDetails: any = [];
         ientWillApplicationFinanceDetails = new entWillApplicationFinanceDetails();
         lstentWillApplicationFinanceDetails: any = [];
         ientWillApplicationEmailHistory = new entWillApplicationEmailHistory();
         lstentWillApplicationEmailHistory: any = [];
         ientWillApplicationDocument = new entWillApplicationDocument();
         lstentWillApplicationDocument: any = [];
         ientWillApplicationChildren = new entWillApplicationChildren();
         lstentWillApplicationChildren: any = [];
         ientWillApplicationAssignedOfficerHistory = new entWillApplicationAssignedOfficerHistory();
         lstentWillApplicationAssignedOfficerHistory: any = [];
         ientWillApplicationApplicant = new entWillApplicationApplicant();
         ientWillApplicationVehicleDetails = new entWillApplicationVehicleDetails();
         lstentWillApplicationVehicleDetails: any = [];
         ientWillApplicationTestatorStatus = new entWillApplicationTestatorStatus();
         ientWillApplicationTestator = new entWillApplicationTestator();
         ientWillApplicationStatusHistory = new entWillApplicationStatusHistory();
         lstentWillApplicationStatusHistory: any = [];
         ientWillApplicationSpouse = new entWillApplicationSpouse();
         lstentWillApplicationSpouse: any = [];
         ientWillApplicationWitness = new entWillApplicationWitness();
         lstentWillApplicationWitness: any = [];
         ientWillApplicationRealestateDetails = new entWillApplicationRealestateDetails();
         lstentWillApplicationRealestateDetails: any = [];
         willOfficerAssigned = '';
         willOfficerAssignedtoFullname = '';
         enteredByFullname = '';
         appliedByFullname = '';
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         workflowId = 0;
         willApplicationCompleted = '';
         ientWillApplicationOtherAssetDetails = new entWillApplicationOtherAssetDetails();
         lstentWillApplicationOtherAssetDetails: any = [];
         isCompleted = '';
         leadId = 0;
         ientWillApplicationProcessHistory = new entWillApplicationProcessHistory();
         lstentWillApplicationProcessHistory: any = [];
         identifierCount = 0;
         previousStatusValue = '';
         previousActionStatusValue = '';
         previousStageValue = '';
         assignedOfficerFlag = '';
         reAssignFlag = '';
         selfAssignFlag = '';
         leadAssignedDepartmentValue = '';
         leadAssignedDepartment = '';
         workloadBasedOnflag = '';
         isFptclMaintainFile = '';
         testatorName = '';
         ientFptclFile = new entFptclFile();
         fileNo = '';
        
}

export class entWillApplicationApplicant {
  appWillApplicationApplicantId = 0;
         appWillApplicationId = 0;
         customerId = 0;
         maritalStatusId = 0;
         maritalStatusValue = '';
         occupation = '';
         maritalStatusDescription = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationAssignedOfficerHistory {
  willApplicationAssignedOfficerHistoryId = 0;
         willApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         assignedTo = '';
         assignedBy = '';
         assignedDate = '';
         identityNo = 0;
         verificationDate = '';
         assignedByFullname = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         assignedToFullname = '';
         designation = '';
        
}

export class entWillApplicationAssignedOfficerHistoryList {
  lstentWillApplicationAssignedOfficerHistory = new entWillApplicationAssignedOfficerHistory();
         ientWillApplicationAssignedOfficerHistory: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationChildren {
  willApplicationChildId = 0;
         willApplicationId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationChildrenList {
  lstentWillApplicationChildren: any = [];
         ientWillApplicationChildren = new entWillApplicationChildren();
         msg = new entIEMessage();
        
}

export class entWillApplicationDocument {
  willApplicationDocumentId = 0;
         willApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         isMandatory = '';
         identityNo = 0;
         willApplRefNo = '';
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         documentTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         enteredBy = '';
         enteredDate = '';
         enteredByFullname = '';
        
}

export class entWillApplicationDocumentList {
  lstentWillApplicationDocument: any = [];
         ientWillApplicationDocument = new entWillApplicationDocument();
         msg = new entIEMessage();
        
}

export class entWillApplicationEmailHistory {
  willApplicationEmailHistoryId = 0;
         willApplicationId = 0;
         communicationTrackingId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         identityNo = 0;
         sendBy = '';
         sendDate = '';
         ientCommunicationTracking = new entCommunicationTracking();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         sendByFullname = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
        
}

export class entWillApplicationEmailHistoryList {
  ientWillApplicationEmailHistory = new entWillApplicationEmailHistory();
         lstentWillApplicationEmailHistory: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationFinanceDetails {
  willApplicationFinanceDetailId = 0;
         willApplicationId = 0;
         institutionName = '';
         accountNo = '';
         accountTypeId = 0;
         accountTypeValue = '';
         bsb = '';
         addressId = 0;
         ientAddress = new entAddress();
         accountTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationFinanceDetailsList {
  lstentWillApplicationFinanceDetails: any = [];
         ientWillApplicationFinanceDetails = new entWillApplicationFinanceDetails();
         msg = new entIEMessage();
        
}

export class entWillApplicationInsuranceDetails {
  willApplicationInsuranceDetailId = 0;
         willApplicationId = 0;
         companyName = '';
         policyNo = '';
         insuranceTypeId = 0;
         insuranceTypeValue = '';
         insuredAmount = '';
         lastPremiumAmount = '';
         lastPremiumPaidDate = '';
         addressId = 0;
         ientAddress = new entAddress();
         insuranceTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationInsuranceDetailsList {
  lstentWillApplicationInsuranceDetails: any = [];
         ientWillApplicationInsuranceDetails = new entWillApplicationInsuranceDetails();
         msg = new entIEMessage();
        
}

export class entWillApplicationInvestmentDetails {
  willApplicationInvestmentDetailId = 0;
         willApplicationId = 0;
         companyName = '';
         shareNo = 0;
         isCertificateAvailable = '';
         shareTypeId = 0;
         shareTypeValue = '';
         addressId = 0;
         ientAddress = new entAddress();
         shareTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationInvestmentDetailsList {
  lstentWillApplicationInvestmentDetails: any = [];
         ientWillApplicationInvestmentDetails = new entWillApplicationInvestmentDetails();
         msg = new entIEMessage();
        
}

export class entWillApplicationNotes {
  willApplicationNotesId = 0;
         willApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         notes = '';
         identityNo = 0;
         enteredByFullname = '';
         isUpdateButtonShow = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         applicationStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         iActionStatusDDL = new entDDL();
         msg = new entIEMessage();
         enteredDate = '';
         enteredBy = '';
        
}

export class entWillApplicationNotesList {
  lstentWillApplicationNotes: any = [];
         ientWillApplicationNotes = new entWillApplicationNotes();
         msg = new entIEMessage();
        
}

export class entWillApplicationOtherAssetDetails {
  willApplicationAssetDetailId = 0;
         willApplicationId = 0;
         description = '';
         value = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationOtherAssetDetailsList {
  ientWillApplicationOtherAssetDetails = new entWillApplicationOtherAssetDetails();
         lstentWillApplicationOtherAssetDetails: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationProcessHistory {
  willApplicationProcessHistoryId = 0;
         willApplicationId = 0;
         stageId = 0;
         stageValue = '';
         identityNo = 0;
         isEditable = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationRealestateDetails {
  willApplicationRealestateDetailId = 0;
         willApplicationId = 0;
         titleNo = '';
         tenancyId = 0;
         tenancyValue = '';
         tenancyTypeId = 0;
         tenancyTypeValue = '';
         tenureId = 0;
         tenureValue = '';
         landlordName = '';
         addressId = 0;
         titleCopyDocId = 0;
         ientAddress = new entAddress();
         ientFile = new entFile();
         tenancyDescription = '';
         tenancyTypeDescription = '';
         willApplicationRefNo = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationRealestateDetailsList {
  lstentWillApplicationRealestateDetails: any = [];
         ientWillApplicationRealestateDetails = new entWillApplicationRealestateDetails();
         msg = new entIEMessage();
        
}

export class entWillApplicationSearch {
  willApplRefNo = '';
         applicationStageValue = '';
         appliedBy = '';
         appliedDateFrom = '';
         appliedDateTo = '';
         enteredBy = '';
         appliedBranchValue = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         statusValue = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         actionStatusValue = '';
         willApplicationId = 0;
         applicantCrmId = 0;
         applicantName = '';
         fileNo = '';
        
}

export class entWillApplicationSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entWillApplicationSearchResultSet {
  willApplRefNo = '';
         applicationStageValue = '';
         appliedBy = '';
         appliedDate = '';
         applicantCrmNo = '';
         enteredBy = '';
         appliedBranchValue = '';
         enteredDate = '';
         testatorId = 0;
         statusValue = '';
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         actionStatusValue = '';
         statusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         willApplicationId = 0;
         branchDescription = '';
         applicantName = '';
         fileNo = '';
         assignedOfficer = '';
        
}

export class entWillApplicationSignature {
  willApplicationSignatureId = 0;
         willApplicationId = 0;
         witnessId = 0;
         identityNo = 0;
         ientWillApplicationWitness = new entWillApplicationWitness();
         lstentWillApplicationWitness: any = [];
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationSignatureList {
  ientWillApplicationSignature = new entWillApplicationSignature();
         lstentWillApplicationSignature: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationSpouse {
  willApplicationSpouseId = 0;
         willApplicationId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationSpouseList {
  ientWillApplicationSpouse = new entWillApplicationSpouse();
         lstentWillApplicationSpouse: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationStatusHistory {
  willApplicationStatusHistoryId = 0;
         willApplicationId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         identityNo = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         statusDescription = '';
         changedByFullname = '';
         actionStatusDescription = '';
         applicationStageDescription = '';
        
}

export class entWillApplicationStatusHistoryList {
  ientWillApplicationStatusHistory = new entWillApplicationStatusHistory();
         lstentWillApplicationStatusHistory: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationTestator {
  willApplicationTestatorId = 0;
         willApplicationId = 0;
         customerId = 0;
         maritalStatusId = 0;
         maritalStatusValue = '';
         occupation = '';
         maritalStatusDescription = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationTestatorStatus {
  willApplicationTestatorId = 0;
         willApplicationId = 0;
         isDeathBed = '';
         isUnderstandable = '';
         isMentalAbility = '';
         isOldAge = '';
         isIllness = '';
         isDifficultyInCommunication = '';
         isDoctorOpenionRequired = '';
         doctorOpenionDocId = 0;
         isInfluencedByOthers = '';
         isRequireAssistance = '';
         assistanceName = '';
         isAssistanceFromFamily = '';
         identityNo = 0;
         ientDocument = new entFile();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         willApplicationRefNo = '';
        
}

export class entWillApplicationTestatorStatusList {
  ientWillApplicationTestatorStatus: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationVehicleDetails {
  willApplicationVehicleDetailId = 0;
         willApplicationId = 0;
         vehicleRegNo = '';
         vehicleTypeId = 0;
         vehicleTypeValue = '';
         vehicleMake = '';
         model = '';
         vehicleTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillApplicationVehicleDetailsList {
  ientWillApplicationVehicleDetails = new entWillApplicationVehicleDetails();
         lstentWillApplicationVehicleDetails: any = [];
         msg = new entIEMessage();
        
}

export class entWillApplicationWitness {
  willApplicationWitnessId = 0;
         willApplicationId = 0;
         witnessName = '';
         witnessDob = '';
         isFptcl = '';
         isBeneficiarySpouse = '';
         occupation = '';
         identityNo = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientAddress = new entAddress();
         addressId = 0;
        
}

export class entWillApplicationWitnessList {
  ientWillApplicationWitness = new entWillApplicationWitness();
         lstentWillApplicationWitness: any = [];
         msg = new entIEMessage();
        
}

export class entWillBeneficiary {
  willBeneficiaryId = 0;
         willId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillDashboard {
  willApplicationCount = 0;
         willApplicationOpened = 0;
         willCount = 0;
         datasets: any = [];
        
}

export class entWillDocument {
  willDocumentId = 0;
         willId = 0;
         documentTypeId = 0;
         documentTypeValue = '';
         documentTypeDescription = '';
         fileId = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientFile = new entFile();
         enteredDate = '';
         enteredBy = '';
         isMandatory = '';
         enteredByFullname = '';
         lstentFile: any = [];
        
}

export class entWillFinanceDetails {
  willFinanceDetailId = 0;
         willId = 0;
         institutionName = '';
         accountNo = '';
         accountTypeId = 0;
         accountTypeValue = '';
         bsb = '';
         addressId = 0;
         ientAddress = new entAddress();
         accountTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillInsuranceDetails {
  willInsuranceDetailId = 0;
         willId = 0;
         companyName = '';
         policyNo = '';
         insuranceTypeId = 0;
         insuranceTypeValue = '';
         insuredAmount = '';
         lastPremiumAmount = '';
         lastPremiumPaidDate = '';
         addressId = 0;
         ientAddress = new entAddress();
         insuranceTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillInvestmentDetails {
  willInvestmentDetailId = 0;
         willId = 0;
         companyName = '';
         shareNo = 0;
         isCertificateAvailable = '';
         shareTypeId = 0;
         shareTypeValue = '';
         addressId = 0;
         ientAddress = new entAddress();
         shareTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillList {
  lstentWill: any = [];
         ientWill = new entWill();
         msg = new entIEMessage();
        
}

export class entWillOtherAssetDetails {
  willAssetDetailId = 0;
         willId = 0;
         description = '';
         value = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillRealestateDetails {
  willRealestateDetailId = 0;
         willId = 0;
         titleNo = '';
         tenancyId = 0;
         tenancyValue = '';
         tenancyTypeId = 0;
         tenancyTypeValue = '';
         tenureId = 0;
         tenureValue = '';
         landlordName = '';
         addressId = 0;
         titleCopyDocId = 0;
         ientAddress = new entAddress();
         ientFile = new entFile();
         tenancyDescription = '';
         tenancyTypeDescription = '';
         willApplicationRefNo = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillSearch {
  willApplRefNo = '';
         fileNo = '';
         statusValue = '';
         createdDateFrom = '';
         createdDateTo = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         istrSortColumn = '';
         istrSortOrder = false;
         willApplicationId = 0;
         applicantId = 0;
         beneficaryId = 0;
         testatorId = 0;
        
}

export class entWillSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         result: any = [];
        
}

export class entWillSearchResultSet {
  willId = 0;
         createdDate = '';
         fileNo = '';
         statusDescription = '';
         willApplRefNo = '';
         willApplicationId = 0;
         applicant = '';
         beneficiary = '';
         testator = '';
        
}

export class entWillSpouse {
  willSpouseId = 0;
         willId = 0;
         customerId = 0;
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillTestator {
  willTestatorId = 0;
         willId = 0;
         customerId = 0;
         maritalStatusId = 0;
         maritalStatusValue = '';
         occupation = '';
         maritalStatusDescription = '';
         ientCustomer = new entCustomer();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillVehicleDetails {
  willVehicleDetailId = 0;
         willId = 0;
         vehicleRegNo = '';
         vehicleTypeId = 0;
         vehicleTypeValue = '';
         vehicleMake = '';
         model = '';
         vehicleTypeDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWillWitness {
  willWitnessId = 0;
         willId = 0;
         witnessName = '';
         witnessDob = '';
         isFptcl = '';
         isBeneficiarySpouse = '';
         occupation = '';
         identityNo = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientAddress = new entAddress();
         addressId = 0;
        
}

export class entWithdrawalPayment {
  withdrawalPaymentId = 0;
         trustWithdrawalApplicationId = 0;
         trustId = 0;
         beneficaryCustomerId = 0;
         processedDate = '';
         paidDate = '';
         paymentAmount = '';
         paymentModeId = 0;
         paymentModeValue = '';
         paymentStatusId = 0;
         paymentStatusValue = '';
         collectBy = '';
         collectedDate = '';
         collectedAtBranchId = 0;
         collectedAtBranchValue = '';
         givenBy = '';
         bankId = 0;
         batchNo = '';
         isAutoIncrementCheque = '';
         chequeNo = 0;
         chequeDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
         ientWithdrawalPaymentStatusHistory = new entWithdrawalPaymentStatusHistory();
         lstentWithdrawalPaymentStatusHistory: any = [];
         ientWithdrawalPaymentDocument = new entWithdrawalPaymentDocument();
         lstentWithdrawalPaymentDocument: any = [];
         ientWithdrawalPaymentChecklist = new entWithdrawalPaymentChecklist();
         lstentWithdrawalPaymentChecklist: any = [];
         ientWithdrawalPaymentAssignedOfficerHistory = new entWithdrawalPaymentAssignedOfficerHistory();
         lstentWithdrawalPaymentAssignedOfficerHistory: any = [];
         ientWithdrawalPaymentEmailHistory = new entWithdrawalPaymentEmailHistory();
         lstentWithdrawalPaymentEmailHistory: any = [];
         ientWithdrawalPaymentApplicationNotes = new entWithdrawalPaymentApplicationNotes();
         lstentWithdrawalPaymentApplicationNotes: any = [];
         ientWithdrawalPaymentHistory = new entWithdrawalPaymentHistory();
         lstentWithdrawalPaymentHistory: any = [];
         bankName = '';
         collectedAtBranchDescription = '';
         paymentModeDescription = '';
         guardianName = '';
        
}

export class entWithdrawalPaymentApplicationNotes {
  trustWithdrawlPaymentNotesId = 0;
         trustWithdrawalPaymentId = 0;
         statusId = 0;
         statusValue = '';
         notes = '';
         identificationNo = 0;
         statusDescription = '';
         iStatusDDL = new entDDL();
         iActionStatusDDL = new entDDL();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawalPaymentAssignedOfficerHistory {
  withdrawlPaymentAssignedOfficerHistoryId = 0;
         trustWithdrawalPaymentId = 0;
         statusId = 0;
         statusValue = '';
         assignedTo = '';
         assignedBy = '';
         assignedDate = '';
         identificationNo = 0;
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawalPaymentChecklist {
  appWithdrawalPaymentChecklistId = 0;
         trustWithdrawalPaymentId = 0;
         checklistName = '';
         isMandatory = '';
         checkedBy = '';
         checkedDatetime = '';
         identificationNo = 0;
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawalPaymentDocument {
  appWithdrawalPaymentDocumentId = 0;
         trustWithdrawalPaymentId = 0;
         applicationStageId = 0;
         applicationStageValue = '';
         applicationStatusId = 0;
         applicationStatusValue = '';
         actionStatusId = 0;
         actionStatusValue = '';
         documentTypeId = 0;
         documentTypeValue = '';
         fileId = 0;
         isMandatory = '';
         identificationNo = 0;
         ientFile = new entFile();
         applicationStatusDescription = '';
         applicationStageDescription = '';
         actionStatusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawalPaymentDocumentList {
  lstentWithdrawalPaymentDocument: any = [];
         msg = new entIEMessage();
         ientWithdrawalPaymentDocument = new entWithdrawalPaymentDocument();
        
}

export class entWithdrawalPaymentEmailHistory {
  trustWithdrawalPaymentEmailHistoryId = 0;
         trustWithdrawalPaymentId = 0;
         communicationTrackingId = 0;
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         identificationNo = 0;
         ientCommunicationTracking = new entCommunicationTracking();
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawalPaymentHistory {
  withdrawalPaymentHistoryId = 0;
         withdrawalPaymentId = 0;
         trustWithdrawalApplicationId = 0;
         trustId = 0;
         beneficaryCustomerId = 0;
         processedDate = '';
         paidDate = '';
         paymentAmount = '';
         paymentModeId = 0;
         paymentModeValue = '';
         paymentStatusId = 0;
         paymentStatusValue = '';
         collectBy = '';
         collectedDate = '';
         collectedAtBranchId = 0;
         collectedAtBranchValue = '';
         bankId = 0;
         givenBy = '';
         batchNo = '';
         isAutoIncrementCheque = '';
         chequeNo = 0;
         chequeDate = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawalPaymentStatusHistory {
  trustWithdrawalPaymentStatusHistoryId = 0;
         trustWithdrawalPaymentId = 0;
         statusId = 0;
         statusValue = '';
         changedBy = '';
         changedDate = '';
         identificationNo = 0;
         statusDescription = '';
         idoObjState = '';
         updateSeq = 0;
         msg = new entIEMessage();
        
}

export class entWithdrawdetail {
  requestedAmount = '';
         bankName = '';
         bankId = 0;
         accountNo = '';
        
}

export class entWorkflowSearch {
  workflowName = '';
         statusValue = '';
         sourceRefValue = '';
         sourceRefNo = '';
         stepName = '';
         stepStatusValue = '';
         assignedTo = '';
         sourceName = '';
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




