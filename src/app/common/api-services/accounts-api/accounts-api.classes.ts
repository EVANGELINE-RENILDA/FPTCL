export class CustomerSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstCustomerSearchResultset: any = [];
        
}

export class CustomerSearchResultset {
  actCustomerId = 0;
         customerrefno = '';
         customerName = '';
         credittype = '';
         type = '';
         subtype = '';
         contactNo = '';
         emailid = '';
         status = '';
         customerid = '';
         createdDate = '';
         currencyValue = '';
        
}

export class VendorBankDetails {
  actVendorBankDetailId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actVendorId = 0;
         beginDate = '';
         endDate = '';
         bankName = '';
         bankAccountNo = '';
         bankCode = '';
         swiftCode = '';
         statusId = 0;
         statusValue = '';
         iAddress = new entActAddress();
         lstAddress: any = [];
         ilstActNotes: any = [];
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusdescription = '';
        
}

export class VendorBankDetailslist {
  plstVendorBankDetails: any = [];
         msg = new entIEMessage();
        
}

export class VendorContact {
  actVendorContactId = 0;
         actVendorId = 0;
         actCompanyId = 0;
         firstName = '';
         middleName = '';
         lastName = '';
         contactNo = '';
         emailId = '';
         designationId = 0;
         designationValue = '';
         effectiveDatetime = '';
         statusId = 0;
         statusValue = '';
         typeId = 0;
         typeValue = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusdescription = '';
         designationDescription = '';
        
}

export class VendorContactlist {
  plstVendorContact: any = [];
         msg = new entIEMessage();
        
}

export class VendorCreditTypeHistory {
  actVendorCreditTypeHistoryId = 0;
         actVendorId = 0;
         actCompanyId = 0;
         effectiveDate = '';
         creditTypeId = 0;
         creditTypeValue = '';
         statusId = 0;
         statusValue = '';
         statusdescription = '';
        
}

export class entAccountsReport {
  fromDate = '';
         toDate = '';
         companyId = 0;
         reportResult = '';
         currentFiscalYearId = 0;
         fiscalYearId = 0;
         companyName = '';
         companyAddress1 = '';
         companyAddress2 = '';
         isExcludeZero = '';
         generatedDateTime = '';
         ledgerId = 0;
         ledgerCode = '';
         groupId = 0;
         companyCurrency = '';
         plstentActLedgerDetailReport: any = [];
         plstDistinctledgers: any = [];
         msg = new entIEMessage();
         plstentListLong: any = [];
         strResultExcel = '';
         errorMsg = '';
         plstentActLedgerInfo: any = [];
         regionValue = '';
        
}

export class entActAddress {
  actAddressId = 0;
         actCompanyId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         effectiveDate = '';
         addressLine1 = '';
         addressLine2 = '';
         addressLine3 = '';
         city = '';
         districtId = 0;
         districtValue = '';
         stateId = 0;
         stateValue = '';
         countryId = 0;
         countryValue = '';
         statusId = 0;
         statusValue = '';
         typeId = 0;
         typeValue = '';
         postCode = 0;
         reftypedescription = '';
         statusdescription = '';
         statedescription = '';
         districtdescription = '';
         countrydescription = '';
         typedescription = '';
         fulladdress = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         emailId = '';
         cityId = 0;
         cityDescription = '';
        
}

export class entActAddressList {
  plstentActAddress: any = [];
         msg = new entIEMessage();
        
}

export class entActAttachments {
  actAttachmentsId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         attachmentFileName = '';
         attachmentStatusId = 0;
         attachmentStatusValue = '';
         attachmentSize = '';
         attachmentType = '';
         attachmentRelativePath = '';
         mailSent = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         actCompanyBranchId = 0;
         statusDescription = '';
         istringFileContent = '';
         createdBy = '';
         createdDate = '';
         modifiedByFullName = '';
        
}

export class entActAttachmentsList {
  plstentActAttachments: any = [];
         msg = new entIEMessage();
        
}

export class entActBankReconciliationStatement {
  bankReconciliationStatementId = 0;
         actCompanyId = 0;
         bankReconciliationSummaryId = 0;
         ledgerTransactionId = 0;
         actCompanyFiscalYearId = 0;
         actCompanyBranchId = 0;
         documentDate = '';
         clearedDate = '';
         voucherConfigId = 0;
         documentNumber = '';
         reconciliationStatus = '';
         notes = '';
         referenceNumber = '';
         payeeName = '';
         actLedgerId = 0;
         paymentAmount = '';
         depositAmount = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         reconciliedDate = '';
         voucherName = '';
         voucherTypeDescription = '';
         iblSelectedFlag = false;
         pentLedger = new entLedger();
         pentActVoucherConfig = new entActVoucherConfig();
         msg = new entIEMessage();
         strResultExcel = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entActBankReconciliationSummary {
  bankReconciliationSummaryId = 0;
         actCompanyId = 0;
         actCompanyFiscalYearId = 0;
         actCompanyBranchId = 0;
         lastReconciliationDate = '';
         bankBalance = '';
         bookBalance = '';
         differenceAmount = '';
         bankLedgerId = 0;
         bankAccountNo = '';
         openingBalance = '';
         totalBookBalance = '';
         totalBankBalance = '';
         totalDeposit = '';
         totalPayment = '';
         totalReconciliedDeposit = '';
         totalReconciliedPayment = '';
         totalDifference = '';
         currentReconciliationDate = '';
         companyName = '';
         ledgerName = '';
         viewReconciledDetails = false;
         reconcilebtn = false;
         plstentActBankReconciliationStatement: any = [];
         plstentActBankReconciliedStatement: any = [];
         plstentActBankReconciliationSummary: any = [];
         pentLedger = new entLedger();
         msg = new entIEMessage();
         strResultExcel = '';
         ilistBankAccountNo = new entDDL();
         updateSeq = '';
         idoObjState = '';
         regionValue = '';
         regionDescription = '';
         regionId = 0;
        
}

export class entActCompany {
  actCompanyId = 0;
         companyName = '';
         addressLine1 = '';
         addressLine2 = '';
         addressLine3 = '';
         addressLine4 = '';
         phoneNo = '';
         faxNo = '';
         emailId = '';
         website = '';
         logo = '';
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         branchId = 0;
         branchName = '';
         token = '';
         updateSeq = 0;
         idoObjState = '';
         tinNo = '';
         lstActCompanyFiscalYear: any = [];
         iActCompanyFiscalYear = new entActCompanyFiscalYear();
         iActCompanyOtherDetails = new entActCompanyOtherDetails();
         lstActCompanyBranch: any = [];
         statusdescription = '';
         msg = new entIEMessage();
        
}

export class entActCompanyBranch {
  actCompanyBranchId = 0;
         companyId = 0;
         branchValue = '';
         admLocationId = 0;
         admBranchId = 0;
         statusId = 0;
         statusValue = '';
         isHeadOffice = '';
         startDate = '';
         endDate = '';
         phoneNo = '';
         faxNo = '';
         emailId = '';
         termClosurePeriod = 0;
         addressId = 0;
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         branchName = '';
         locationValue = '';
         locationId = 0;
         statusDescription = '';
         admBranchName = '';
         admLocationName = '';
         createdBy = '';
         createdDate = '';
         iAddress = new entActAddress();
         branchCode = '';
         branchId = 0;
        
}

export class entActCompanyBranchBankDetail {
  actCompanyBranchBankDetailId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         beginDate = '';
         endDate = '';
         bankName = '';
         bankAccountNo = '';
         bankCode = '';
         swiftCode = '';
         bankLedgerId = 0;
         statusId = 0;
         statusValue = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         lstentActCompanyBranchBankDetail: any = [];
         statusDescription = '';
         bankAccountName = '';
         lastChequeNo = 0;
         iAddress = new entActAddress();
        
}

export class entActCompanyFiscalTerm {
  actCompanyFiscalTermId = 0;
         actCompanyFiscalYearId = 0;
         termNo = 0;
         termName = '';
         startDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         statusDescription = '';
        
}

export class entActCompanyFiscalYear {
  actCompanyFiscalYearId = 0;
         actCompanyId = 0;
         startDate = '';
         endDate = '';
         booksClosed = '';
         calendarMonth = '';
         statusId = 0;
         statusValue = '';
         approvedBy = '';
         approvedDate = '';
         lstActCompanyFiscalTerm: any = [];
         updateSeq = 0;
         idoObjState = '';
         statusDescription = '';
         msg = new entIEMessage();
         fiscalYear = '';
        
}

export class entActCompanyFiscalYearList {
  lstentActCompanyFiscalYear: any = [];
         msg = new entIEMessage();
        
}

export class entActCompanyOtherDetails {
  actCompanyOtherDetailsId = 0;
         actCompanyId = 0;
         currencyId = 0;
         currencyValue = '';
         symbolId = 0;
         symbolValue = '';
         suffixSymbol = '';
         noOfDecimalPlace = 0;
         currencyValueName = '';
         decimalValueName = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         fiscalYearStartMonth = '';
         fiscalYearEndMonth = '';
         fiscalYearTerm = 0;
         commaSeparatorId = 0;
         commaSeparatorValue = '';
         currencyDescription = '';
         symbolDescription = '';
         commaSeparatorDescription = '';
         endMonthName = '';
         startMonthName = '';
        
}

export class entActCompanySearch {
  istrCompanyName = '';
         istrCompanyEmailId = '';
         istrCompanyWebsite = '';
         istrCompanyPhoneNo = '';
         istrCompanysStatus = '';
         statusId = 0;
         dtmEffectiveDateFrom = '';
         dtmEffectiveDateTo = '';
         isortcolumn = '';
         iblnSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entActCompanySearchSet {
  istrCompanyName = '';
         effectiveDate = '';
         istrCompanyEmailId = '';
         istrCompanyWebsite = '';
         istrCompanyPhoneNo = '';
         addressLine1 = '';
         istrCompanysStatus = '';
         companyId = 0;
        
}

export class entActCompanyTaxSearch {
  strTaxCode = '';
         strActCompanyId = 0;
         srtTaxName = '';
         strCurrentPercentageFrom = '';
         strCurrentPercentageTo = '';
         dtmEffectiveDateFrom = '';
         dtmEffectiveDateTo = '';
         status = '';
         strItemId = '';
         taxStatus = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entActCompanyTaxSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstActCompanyTaxSearchSet: any = [];
        
}

export class entActCompanyTaxSearchSet {
  actCompanyTaxId = 0;
         strTaxCode = '';
         srtTaxName = '';
         currentPercentage = '';
         effectiveDate = '';
         taxStatusDescription = '';
         statusDescription = '';
        
}

export class entActCompanyVoucherAccountDetail {
  actVoucherAccountConfigId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         effectiveDate = '';
         voucherAccountTypeId = 0;
         voucherAccountTypeValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         actVoucherConfigId = 0;
         effectTypeId = 0;
         effectTypeValue = '';
         taxCodeId = 0;
         netAmountDebitLedgerId = 0;
         debitPartyAccountFlag = '';
         netAmountCreditLedgerId = 0;
         creditPartyAccountFlag = '';
         entryTypeId = 0;
         entryTypeValue = '';
         voucherCategoryId = 0;
         voucherCategoryValue = '';
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         indexNumber = 0;
         taxAccountLedgerId = 0;
         discountAccountLedgerId = 0;
         modifiedBy = '';
         branchAccountTypeDescription = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         ibusActBranch = new entActCompanyBranch();
         ibusActLedger = new entLedger();
         ibusActCreditLedger = new entLedger();
         ibusActVoucherConfig = new entActVoucherConfig();
        
}

export class entActCreditNote {
  actCreditNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actCustomerId = 0;
         creditNoteRefNo = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         voucherReferenceNo = '';
         dueDate = '';
         companyDebitLedgerId = 0;
         actVendorId = 0;
         customerCreditLedgerId = 0;
         actVoucherConfiId = 0;
         amount = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         comments = '';
         currencyRate = '';
         currencyId = 0;
         currencyValue = '';
         effectiveDate = '';
         documentDate = '';
         totalAfterDiscountLedgerId = 0;
         docCurrencyValue = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         salesInvoiceId = 0;
         plentActCompanyBranch = new entActCompanyBranch();
         pientSalAttachments = new entSalAttachments();
         pientVoucherConfig = new entActVoucherConfig();
         iActCustomerDetails = new entActCustomerDetails();
         plstentActCompanyDebitLedger = new entLedger();
         plstentctCustomerCreditLedger = new entLedger();
         plstentSalNotes: any = [];
         plstentAttachments: any = [];
         plstentCreditNoteItem: any = [];
         plstentCurrencyExchangeRate: any = [];
         plstentCreditNoteLedgerItems: any = [];
         plstentCreditNoteStatusHistory: any = [];
         creditNoteReciept = '';
         pientCreditNoteItem = new entActCreditNoteItem();
         isNeedInventory = '';
         voucherTypeDescription = '';
         enteredByUserName = '';
         approvedByUserName = '';
         isNeedCalculation = '';
         isVmsRequired = '';
         buttonVisible = false;
         dcCurrencyrate = '';
         totalAfterDiscount = '';
         totalTaxAmount = '';
         totalNetAmount = '';
         rowid = 0;
         pentSalNotes = new entSalNotes();
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActCreditNoteItem {
  actCreditNoteItemId = 0;
         actCompanyId = 0;
         actCreditNoteId = 0;
         salCustomerReturnReceiptId = 0;
         salSalesInvoiceId = 0;
         invItemId = 0;
         itemDescription = '';
         batchNumber = '';
         unitTypeId = 0;
         unitTypeValue = '';
         unitPrice = '';
         quantity = '';
         discountPercentage = '';
         discountAmount = '';
         totalAfterDiscount = '';
         taxPercentage = '';
         vatAmount = '';
         totalPrice = '';
         salSalesInvoiceItemId = 0;
         itemLedgerId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         itemCode = '';
         salInvRefNo = '';
         taxCodeValue = '';
         unitTypeDescription = '';
         strDeleteFlag = '';
         strItemLedgerName = '';
         rowid = 0;
         plentInvItem = new entInvItem();
         plentActCompanyTax = new entCompanyTax();
         plentSalSalesInvoice = new entSalSalesInvoice();
         plentLedger = new entLedger();
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
         narration = '';
         maximumQuantity = '';
        
}

export class entActCreditNoteItemList {
  plstentActCreditNoteItem: any = [];
         msg = new entIEMessage();
        
}

export class entActCreditNoteLedgerItems {
  actCreditNoteLedgerItemsId = 0;
         actCompanyId = 0;
         actCreditNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entActCreditNoteList {
  plstentActCreditNote: any = [];
         msg = new entIEMessage();
        
}

export class entActCreditNoteSearch {
  strCreditNoteRefNo = '';
         lngActCustomerId = 0;
         actCompanyBranchId = 0;
         dtmEnteredDateFrom = '';
         dtmEnteredDateTo = '';
         dtmApprovedDateFrom = '';
         dtmApprovedDateTo = '';
         strStatusValue = '';
         lngActCompanyId = 0;
         approvedBy = '';
         enteredBy = '';
         userLoginID = '';
         strVoucherColour = '';
         istrSortColumn = '';
         strDocCurrency = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         actCompanyId = 0;
         fiscalYearId = 0;
         actVoucherConfigId = 0;
         customername = '';
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         istrSortOrder = false;
         regionValue = '';
        
}

export class entActCreditNoteSearchResult {
  plstentActCreditNoteSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entActCreditNoteSearchResultSet {
  actCreditNoteId = 0;
         creditNoteRefNo = '';
         enteredDate = '';
         documentDate = '';
         approvedDate = '';
         statusDescription = '';
         approvedByFullname = '';
         enteredByFullname = '';
         currencyCodeValue = '';
         customerName = '';
         branchName = '';
         amount = '';
         reportingNetAmount = '';
         voucherName = '';
         regionDescription = '';
        
}

export class entActCreditNoteStatusHistory {
  appActCreditNoteHistoryId = 0;
         appActCreditNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         actCompanyId = 0;
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         statusDescription = '';
         changedByUserName = '';
        
}

export class entActCurrencyExchangerate {
  currencyExchangerateId = 0;
         actCompanyId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         documentCurrencyAmount = '';
         reportingCurrencyAmount = '';
         description = '';
         descriptionConst = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
        
}

export class entActCustomerDetails {
  actCustomerId = 0;
         actCompanyId = 0;
         customerRefno = '';
         customerName = '';
         customerAliasName = '';
         contactNo = '';
         faxNo = '';
         emailId = '';
         webAddress = '';
         dateOfBirth = '';
         customerTinNumber = '';
         statusId = 0;
         statusValue = '';
         currencyCodeId = 0;
         currencyCodeValue = '';
         creditDuration = 0;
         paymentTermId = 0;
         paymentTermValue = '';
         customerTypeId = '';
         customerTypeValue = '';
         customerSubTypeId = 0;
         customerSubTypeValue = '';
         creditTypeId = 0;
         debtLimit = '';
         discountPercentage = '';
         taxable = '';
         sendStatement = '';
         indispute = '';
         financeCharges = '';
         roundInvoices = '';
         salesRepUserId = 0;
         customerLedgerId = 0;
         customerTypeDescription = '';
         customerSubTypeDescription = '';
         closingBalance = '';
         notesDetails = '';
         currencyCodeDescription = '';
         paymentTermDescription = '';
         creditTypeDescription = '';
         statusDescription = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         symbolValue = '';
         lstCustomerContact: any = [];
         ientCustomerCreditType = new entCustomerCreditType();
         lstentCustomerCreditType: any = [];
         iAddress = new entActAddress();
         lstAddress: any = [];
         lstentCustomerBankDetail: any = [];
         lstActNotes: any = [];
         ientActLedger = new entLedger();
         isB2BTransaction = '';
         creditTypeValue = '';
         openningBalance = '';
         customerLegacyCode = '';
         lstentActAttachments: any = [];
         creditPeriod = 0;
         plstentActCustomerRegionAccess: any = [];
         customerId = 0;
        
}

export class entActCustomerDetailsLst {
  lstentActCustomerDetails: any = [];
        
}

export class entActCustomerRegionAccess {
  actCustomerRegionAccessId = 0;
         actCustomerId = 0;
         regionId = 0;
         regionValue = '';
         createdDate = '';
         modifiedDate = '';
         enteredBy = '';
         enteredByFullName = '';
         modifiedByFullName = '';
         regionDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         plstentActCustomerRegionAccessHistory: any = [];
         ledgerId = 0;
         ledgerName = '';
        
}

export class entActCustomerRegionAccessHistory {
  actCustomerRegionAccessHistoryId = 0;
         actCustomerRegionAccessId = 0;
         regionId = 0;
         regionValue = '';
         changedDate = '';
         changedBy = '';
         regionDescription = '';
         statusDescription = '';
         changedByFullName = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         ledgerId = 0;
         ledgerName = '';
        
}

export class entActCustomerRegionAccessList {
  plstentActCustomerRegionAccess: any = [];
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

export class entActDebitNote {
  actDebitNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         debitNoteRefNo = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         voucherReferenceNo = '';
         dueDate = '';
         companyCreditLedgerId = 0;
         actVendorId = 0;
         vendorDebitLedgerId = 0;
         actVoucherConfigId = 0;
         netAmount = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         comments = '';
         currencyRate = '';
         currencyId = 0;
         currencyValue = '';
         effectiveDate = '';
         documentDate = '';
         totalAfterDiscountLedgerId = 0;
         docCurrencyValue = '';
         purchaseInvoiceId = 0;
         updateSeq = '';
         idoObjState = '';
         ilistentPurAttachments: any = [];
         ilistentActDebitNoteItem: any = [];
         ilistentActDebitNoteLedgerItems: any = [];
         ilistentActDebitNoteStatusHistory: any = [];
         plstentCurrencyExchangeRate: any = [];
         ilistbusPurNotes: any = [];
         ibusActBranch = new entActCompanyBranch();
         ibusActVoucherConfig = new entActVoucherConfig();
         pentPurNotes = new entPurNotes();
         ibusActVendorDetails = new entActVendor();
         iCreditLedger = new entLedger();
         msg = new entIEMessage();
         iDebitLedger = new entLedger();
         ilistentPurNotes = new entPurNotes();
         statusDescription = '';
         debitNoteReciept = '';
         voucherDescription = '';
         enteredByUserName = '';
         approvedByUserName = '';
         isNeedCalculation = '';
         buttonVisibleBranch = '';
         isNeedInventory = '';
         pientPurAttachments = new entPurAttachments();
         totalAfterDiscount = '';
         totalTaxAmount = '';
         totalNetAmount = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActDebitNoteItem {
  actDebitNoteItemId = 0;
         actCompanyId = 0;
         actDebitNoteId = 0;
         purPurchaseInvoiceId = 0;
         purchaseVendorReturnNoteId = 0;
         invItemId = 0;
         itemDescription = '';
         batchNumber = '';
         unitTypeId = 0;
         unitTypeValue = '';
         unitPrice = '';
         quantity = '';
         discountPercentage = '';
         discountAmount = '';
         totalAfterDiscount = '';
         taxPercentage = '';
         vatAmount = '';
         totalPrice = '';
         purPurchaseInvoiceItemId = 0;
         itemLedgerId = 0;
         updateSeq = '';
         msg = new entIEMessage();
         ientInvItem = new entInvItem();
         idoObjState = '';
         plentActCompanyTax = new entCompanyTax();
         pentPurPurchaseInvoice = new entPurPurchaseInvoice();
         modifiedBy = '';
         plentLedger = new entLedger();
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
         narration = '';
         maximumQuantity = '';
         strDeleteFlag = '';
        
}

export class entActDebitNoteItemList {
  plstentActDebitNoteItem: any = [];
         msg = new entIEMessage();
        
}

export class entActDebitNoteLedgerItems {
  actDebitNoteLedgerItemsId = 0;
         actCompanyId = 0;
         actDebitNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entActDebitNoteList {
  lstActDebitNote: any = [];
        
}

export class entActDebitNoteSearch {
  actDebitNoteId = 0;
         debitNoteRefNo = '';
         vendorname = '';
         actCompanyBranchId = 0;
         actVoucherConfigId = 0;
         statusValue = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         approvedDateFrom = '';
         approvedDateTo = '';
         lngActVendorId = '';
         actCompanyId = 0;
         debitAmountFrom = 0;
         debitAmountTo = 0;
         enteredBy = '';
         approvedBy = '';
         vendorDebitLedgerId = 0;
         strVoucherColour = '';
         userLoginID = '';
         istrSortColumn = '';
         iblnSortOrder = false;
         strDocCurrency = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         documentDateFrom = '';
         documentDateTo = '';
         actFiscalYearId = 0;
         regionValue = '';
        
}

export class entActDebitNoteSearchSet {
  actdebitnoteid = 0;
         vouchername = '';
         debitnoterefno = '';
         branchname = '';
         amount = '';
         enteredby = '';
         entereddate = '';
         approvedby = '';
         approveddate = '';
         currencyname = '';
         statusdescription = '';
         vendorname = '';
         documentdate = '';
         reportingNetAmount = '';
         regionDescription = '';
        
}

export class entActDebitNoteSearchresultSet {
  lstActDebitNoteSearchresultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entActDebitNoteStatusHistory {
  appActDebitNoteHistoryId = 0;
         appActDebitNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByUserName = '';
         msg = new entIEMessage();
        
}

export class entActFundTransferNote {
  actFundTransferNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         fundTransferNoteRefNo = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         voucherReferenceNo = '';
         companyCreditAccountId = 0;
         companyDebitAccountId = 0;
         debitAmount = '';
         creditAmount = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         comment = '';
         effectiveDate = '';
         actVoucherConfigId = 0;
         currencyId = 0;
         currencyValue = '';
         reportingCurrencyValue = '';
         reportingCurrencyId = 0;
         currencyRate = '';
         creditLedgerTypeId = 0;
         creditLedgerTypeValue = '';
         debitLedgerTypeId = 0;
         debitLedgerTypeValue = '';
         documentDate = '';
         referenceNumber = '';
         chequeDate = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         lstFundTransferNote: any = [];
         ilistbusActFundTransferNoteStatusHistory: any = [];
         ilistbusActAttachments: any = [];
         sentActAttachments = new entActAttachments();
         ilistbusActNotes: any = [];
         sentActCompanyBranch = new entActCompanyBranch();
         ibusCompanyCreditActLedger = new entLedger();
         ibusCompanyDebitActLedger = new entLedger();
         ibusActVoucherConfig = new entActVoucherConfig();
         statusDescription = '';
         notesDetails = '';
         fundTransferNoteReciept = '';
         iFundTransferNoteReciept = '';
         enteredByUserName = '';
         approvedByUserName = '';
         pentActNotes = new entActNotes();
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActFundTransferNoteList {
  lstentActFundTransferNote: any = [];
         msg = new entIEMessage();
        
}

export class entActFundTransferNoteSearch {
  fundTransferNoteRefNo = '';
         statusValue = '';
         companyCreditAccountId = 0;
         companyDebitAccountId = 0;
         dtmEnteredDateFrom = '';
         dtmEnteredDateTo = '';
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         dtmApprovedDateFrom = '';
         dtmApprovedDateTo = '';
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actVoucherConfigId = 0;
         actFiscalYearId = 0;
         enteredBy = '';
         approvedBy = '';
         dcdebitAmountFrom = '';
         dcdebitAmountTo = '';
         strVoucherColour = '';
         istrSortColumn = '';
         iblnSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         regionValue = '';
        
}

export class entActFundTransferNoteSearchResult {
  ilstentActFundTransferNoteSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entActFundTransferNoteSearchResultSet {
  actFundTransferNoteId = 0;
         actFundTransferNoteRefNo = '';
         branchName = '';
         voucharName = '';
         entertrdBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         creditAmount = '';
         status = '';
         documentDate = '';
         regionDescription = '';
        
}

export class entActFundTransferNoteStatusHistory {
  actFundTransferNoteStatusHistoryId = 0;
         actFundTransferNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         actCompanyId = 0;
         statusDescription = '';
         changedByUserName = '';
        
}

export class entActGroup {
  actGroupId = 0;
         actCompanyFiscalYearId = 0;
         groupName = '';
         parentGroupId = 0;
         codeName = '';
         groupNatureId = 0;
         groupNatureValue = '';
         effectiveDate = '';
         impactProfitLoss = '';
         isDefaultGroup = '';
         ilistSubGroup: any = [];
         ilistOfGroup: any = [];
         ientCompanyFiscalYear = new entActCompanyFiscalYear();
         ilistentLedger: any = [];
         parentGroupName = '';
         nodeValue = '';
         groupNatureDescription = '';
         groupCreditValue = '';
         groupDebitValue = '';
         groupClosingBalance = '';
         ledgerCreditValue = '';
         ledgerDebitValue = '';
         ledgerClosingBalance = '';
         children: any = [];
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         count = 0;
         decLedgerClosingBalance = '';
         ientIntGroupSearchResult = new entIntGroupSearchResult();
         actCompanyId = 0;
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActGroupList {
  lstentActGroup: any = [];
         msg = new entIEMessage();
        
}

export class entActGroupSearch {
  codeName = '';
         groupName = '';
         groupNatureValue = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entActGroupSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         plstentActGroupSearchset: any = [];
        
}

export class entActGroupSearchset {
  groupId = 0;
         groupName = '';
         groupCode = '';
         groupNature = '';
         totalLedger = 0;
         totalDebit = '';
         totalCredit = '';
        
}

export class entActJournalVoucher {
  actJournalVoucherId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         journalVoucherNo = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         referenceNo = '';
         documentDate = '';
         postingDate = '';
         documentHeaderText = '';
         docCurrencyId = 0;
         docCurrencyValue = '';
         conversionRate = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         actVoucherConfigId = 0;
         isIncludeBankLedger = '';
         debitamount = '';
         creditamount = '';
         strVoucherColour = '';
         voucherTypeValue = '';
         statusChangedBy = '';
         statusChangedDate = '';
         buttonVisible = '';
         approvedByUserName = '';
         typeDescription = '';
         voucherCategory = '';
         strSymbolValue = '';
         strBaseCurrencyValue = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ilistbusActJournalVoucherDetail: any = [];
         ilistbusActJournalVoucherStatusHistory: any = [];
         ilistbusActAttachments: any = [];
         ilistbusActNotes: any = [];
         journalVoucherReciept = '';
         ibusActJournalVoucherDetail = new entActJournalVoucherDetail();
         ibusActBranch = new entActCompanyBranch();
         ibusActVoucherConfig = new entActVoucherConfig();
         notesDatails = '';
         ibusActnotes = new entActNotes();
         enteredByUserName = '';
         strDifferenceAmount = '';
         reversingJournalRefNo = '';
         reversingJournalId = 0;
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActJournalVoucherDetail {
  actJournalVoucherDetailId = 0;
         actJournalVoucherId = 0;
         actCompanyId = 0;
         ledgerNatureId = 0;
         ledgerNatureValue = '';
         ledgerTypeId = 0;
         ledgerTypeValue = '';
         ledgerAccountId = 0;
         debitAmount = '';
         creditAmount = '';
         narration = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         ientLedger = new entLedger();
         updateSeq = '';
         idoObjState = '';
         strDeleteFlag = '';
        
}

export class entActJournalVoucherSearch {
  dtmApprovedDateFrom = '';
         istrSortColumn = '';
         lngActVoucherConfigId = 0;
         lngActBranchId = 0;
         lngActCompanyId = 0;
         dtmApprovedDateTo = '';
         userLoginID = '';
         dtmEnteredDateTo = '';
         dtmEnteredDateFrom = '';
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         statusValue = '';
         istrEnterBy = '';
         istrApprovedBy = '';
         istrvoucherno = '';
         strVoucherColour = '';
         totalCount = 0;
         pageNumber = 0;
         pageSize = 0;
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         orderByColumnName = '';
         ascending = false;
         istrSortOrder = false;
         regionValue = '';
        
}

export class entActJournalVoucherSearchResult {
  ilstentActJournalVoucherSearchResultset: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entActJournalVoucherSearchResultset {
  actJournalvoucharId = 0;
         actJournalvoucharNo = '';
         branchName = '';
         postingDate = '';
         documentDate = '';
         enteredDate = '';
         voucherName = '';
         currencyName = '';
         debitAmount = '';
         creditAmount = '';
         enteredBy = '';
         statusChangedBy = '';
         statusChangedDate = '';
         status = '';
         docCurrencyValue = '';
         createdBy = '';
         regionDescription = '';
        
}

export class entActJournalVoucherStatusHistory {
  actJournalVoucherStatusHistoryId = 0;
         actJournalVoucherId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         statusDescription = '';
         changedByUserName = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entActLedgerDetailReport {
  sNo = 0;
         voucherType = '';
         voucherNumber = '';
         voucherTypeValue = '';
         voucherId = 0;
         documentDate = '';
         debitAmount = '';
         creditAmount = '';
         runningBalance = '';
         voucherName = '';
         ledgerId = 0;
         runningBalanceAbs = '';
         pentActLedgerSummary = new entActLedgerSummary();
         pentActLedgerInfo = new entActLedgerInfo();
         plstentListLong: any = [];
         msg = new entIEMessage();
        
}

export class entActLedgerEntrySearch {
  ilngledgerId = 0;
         ilngActCompanyId = '';
         dtmEffectiveDateFrom = '';
         dtmEffectiveDateTo = '';
         ilngActFiscalYearId = 0;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         isOpeningBalanceUpdation = '';
         openingBalance = '';
        
}

export class entActLedgerEntrySearchResult {
  totalCount = 0;
         pageNumber = 0;
         pageSize = 0;
         pActLedgerEntrySearchSet: any = [];
        
}

export class entActLedgerEntrySearchSet {
  actLedgerEntryId = 0;
         documentNumber = '';
         effectiveDate = '';
         postedDate = '';
         voucherName = '';
         voucherType = '';
         runningBalance = '';
         creditAmount = '';
         debitAmount = '';
         narration = '';
         voucherTypeValue = '';
         voucherId = 0;
        
}

export class entActLedgerInfo {
  groupId = 0;
         groupName = '';
         groupNature = '';
         ledgerName = '';
         ledgerCode = '';
         aliasName = '';
         ledgerType = '';
         ledgerId = 0;
         msg = new entIEMessage();
         pentActLedgerSummary = new entActLedgerSummary();
         plstentActLedgerVoucherInfo: any = [];
        
}

export class entActLedgerList {
  lstActLedger: any = [];
        
}

export class entActLedgerSearch {
  istrLedgerName = '';
         aliasName = '';
         codeName = '';
         groupName = '';
         istrLedgerTypeValue = '';
         currencyUsedValue = '';
         ilngActCompanyId = 0;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         notCashType = '';
         notBankType = '';
         expnseIncmeLedgerTypeValue = '';
         salesPurLedgerTypeValue = '';
         isItemSearch = '';
         regionValue = '';
         groupId = 0;
        
}

export class entActLedgerSearchResult {
  totalCount = 0;
         pageNumber = 0;
         pageSize = 0;
         pActLedgerSearchSet: any = [];
        
}

export class entActLedgerSearchSet {
  actLedgerId = 0;
         ledgerName = '';
         ledgerAliasName = '';
         effectiveDate = '';
         natureOfGroup = '';
         groupName = '';
         codeName = '';
         ledgerType = '';
         currency = '';
        
}

export class entActLedgerSummary {
  openingBalance = '';
         totalDebit = '';
         totalCredit = '';
         netTransaction = '';
         closingBalance = '';
         currency = '';
         ledgerId = 0;
         closingBalanceAbs = '';
         msg = new entIEMessage();
        
}

export class entActLedgerTranctionHistory {
  ledgerId = 0;
         debitAmount = '';
         creditAmount = '';
         ledgerType = '';
         runningBalance = '';
         ledgerCode = '';
         descriptions = '';
         tranctonDate = '';
         totalTransactionAmount = '';
         transactionType = '';
        
}

export class entActLedgerTranctionHistoryList {
  plstentActLedgerTranctionHistory: any = [];
        
}

export class entActLedgerTransactionsSearch {
  ilngFromReferenceId = '';
         ilngToReferenceId = '';
         ilngActCompanyId = 0;
         dtmTransactionDateFrom = '';
         dtmTransactionDateTo = '';
         istrTransactionStatus = '';
         ilngActCompanyBranchId = 0;
         lngactVoucherConfigId = '';
         userLoginID = '';
         istrSortColumn = '';
         istrSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         ledgerName = '';
         sourceTypeValue = '';
         codeName = '';
         regionValue = '';
         branchId = 0;
        
}

export class entActLedgerVoucherInfo {
  sNo = 0;
         voucherType = '';
         voucherNumber = '';
         voucherTypeValue = '';
         voucherId = 0;
         documentDate = '';
         debitAmount = '';
         creditAmount = '';
         runningBalance = '';
         voucherName = '';
         ledgerId = 0;
         runningBalanceAbs = '';
        
}

export class entActNetoutVoucher {
  actNetoutVoucherId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         netoutVoucherNo = '';
         actVoucherConfigId = 0;
         statusId = 0;
         statusValue = '';
         referenceNo = '';
         documentDate = '';
         postingDate = '';
         documentHeaderText = '';
         docCurrencyId = 0;
         docCurrencyValue = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         totalDebit = '';
         totalCredit = '';
         totalNetoutValue = '';
         exchangeGain = '';
         exchangeLoss = '';
         conversionRate = '';
         netoutVoucherTypeId = 0;
         netoutVoucherTypeValue = '';
         ientActNetoutVoucherDetail = new entActNetoutVoucherDetail();
         ilstentActNotes: any = [];
         ilstActAttachments: any = [];
         ientActNotes = new entActNotes();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         approvedByUserName = '';
         enteredByUserName = '';
         docCurrencyDescription = '';
         strVoucherColour = '';
         strSymbolValue = '';
         strBaseCurrencyValue = '';
         buttonVisible = false;
         statusChangedBy = '';
         statusChangedDate = '';
         netoutVoucherTypeDescription = '';
         ilstentActNetoutVoucherDetail: any = [];
         ilstentActNetoutVoucherStatusHistory: any = [];
         ientActCompanyBranch = new entActCompanyBranch();
         ilstentActNetoutVoucherLedgerItems: any = [];
         ientActVoucherConfig = new entActVoucherConfig();
         totalDocCurrencyDebitAmount = '';
         totalDocCurrencyCreditAmount = '';
         totalRepCurrencyDebitAmount = '';
         totalRepCurrencyCreditAmount = '';
         ientAdvanceActVoucherConfig = new entActVoucherConfig();
         pentActCustomerDetails = new entActCustomerDetails();
         pentActVendor = new entActVendor();
         ientLedger = new entLedger();
         partyId = 0;
         advanceVoucherConfigId = 0;
         partyLedgerId = 0;
         pVoucherentDDLClass: any = [];
         pVoucherConfigentDDLClass: any = [];
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActNetoutVoucherDetail {
  actNetoutVoucherDetailId = 0;
         actNetoutVoucherId = 0;
         actCompanyId = 0;
         actVoucherConfigId = 0;
         actVoucherId = 0;
         actVendorId = 0;
         actCustomerId = 0;
         actLedgerId = 0;
         debitAmountDocCurrency = '';
         creditAmountDocCurrency = '';
         debitAmountRepCurrency = '';
         creditAmountRepCurrency = '';
         exchangeRate = '';
         rowid = 0;
         disableCredit = '';
         disableDebit = '';
         decMaximamAmt = '';
         decTempAmount = '';
         iblDefaultRecord = false;
         ientLedger = new entLedger();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         pentActCustomerDetails = new entActCustomerDetails();
         pentActVendor = new entActVendor();
         documentDate = '';
         strDeleteFlag = '';
         debitMaximumQuantity = '';
         creditMaximumQuantity = '';
         gain = '';
         loss = '';
        
}

export class entActNetoutVoucherLedgerItems {
  appActNetoutVoucherLedgerItemsId = 0;
         actCompanyId = 0;
         actNetoutVoucherId = 0;
         actCompanyVoucherAccountDetailId = 0;
         ledgerAmount = '';
         indexNumber = 0;
         ientActNetoutVoucherDetail = new entActNetoutVoucherDetail();
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entActNetoutVoucherSearch {
  istrvoucherno = '';
         lngActBranchId = 0;
         lngActVoucherConfigId = 0;
         statusValue = '';
         istrApprovedBy = '';
         istrEnterBy = '';
         dtmEnteredDateFrom = '';
         dtmEnteredDateTo = '';
         dtmApprovedDateFrom = '';
         dtmApprovedDateTo = '';
         lngActCompanyId = 0;
         istrSortColumn = '';
         iblnSortOrder = false;
         userLoginID = '';
         strVoucherColour = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         istrVoucherTypeValue = '';
         regionValue = '';
        
}

export class entActNetoutVoucherSearchResult {
  ilstentActNetoutVoucherSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entActNetoutVoucherSearchSet {
  netOutVoucherId = 0;
         netVoucherNo = '';
         branchName = '';
         postingDate = '';
         voucherTypeValue = '';
         entertrdBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         totalNetOutValue = '';
         status = '';
         voucherName = '';
         documentDate = '';
         customerVendorName = '';
         regionDescription = '';
        
}

export class entActNetoutVoucherStatusHistory {
  actNetoutVoucherStatusHistoryId = 0;
         actNetoutVoucherId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         changedByUserName = '';
        
}

export class entActNotes {
  actNotesId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         notesDetail = '';
         actCompanyId = 0;
         actFiscalYearId = 0;
         createdFullName = '';
         enteredDate = '';
         temporaryDocumentDate = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         modifiedDate = '';
         statusValue = '';
         lddlData: any = [];
         createdBy = '';
         createdDate = '';
        
}

export class entActNotesList {
  plstentActNotes: any = [];
         msg = new entIEMessage();
        
}

export class entActReversingJournal {
  actReversingJournalId = 0;
         actJournalVoucherId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         journalVoucherNo = '';
         reversingJournalVoucherNo = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         referenceNo = '';
         documentDate = '';
         postingDate = '';
         documentHeaderText = '';
         docCurrencyId = 0;
         docCurrencyValue = '';
         conversionRate = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         admBranchId = 0;
         actVoucherConfigId = 0;
         statusDescription = '';
         statusChangedBy = '';
         statusChangedDate = '';
         buttonVisible = '';
         enteredByUserName = '';
         docCurrencyDescription = '';
         typeDescription = '';
         strVoucherColour = '';
         voucherTypeValue = '';
         debitamount = '';
         creditamount = '';
         approvedByUserName = '';
         voucherCategory = '';
         strSymbolValue = '';
         strBaseCurrencyValue = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ilistbusActReversingJournalDetail: any = [];
         ilistbusActReversingJournalStatusHistory: any = [];
         ilistbusActAttachments: any = [];
         ilistbusActNotes: any = [];
         reverseJournalVoucherReciept = '';
         ibusActBranch = new entActCompanyBranch();
         ibusActVoucherConfig = new entActVoucherConfig();
         ibusActJournalVoucher = new entActJournalVoucher();
         noteDetails = '';
         ibusActAttachments = new entActAttachments();
         pentActNotes = new entActNotes();
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActReversingJournalDetail {
  actReversingJournalVoucherDetailId = 0;
         actReversingJournalId = 0;
         actCompanyId = 0;
         ledgerNatureId = 0;
         ledgerNatureValue = '';
         ledgerTypeId = 0;
         ledgerTypeValue = '';
         ledgerAccountId = 0;
         debitAmount = '';
         creditAmount = '';
         narration = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ledgerNatureDescription = '';
         ledgerTypeDescription = '';
         ientActLedger = new entLedger();
        
}

export class entActReversingJournalStatusHistory {
  actReversingJournalStatusHistoryId = 0;
         actReversingJournalId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByUsername = '';
        
}

export class entActReversingJournalsearch {
  actReversejournalId = 0;
         istrreversingjournalvoucherno = '';
         actJournalVoucharNo = '';
         istrApprovedBy = '';
         istrEnterBy = '';
         statusValue = '';
         dtmEnteredDateFrom = '';
         dtmEnteredDateTo = '';
         dtmDocumentDateFrom = '';
         dtmdocumentDateTo = '';
         lngActCompanyId = 0;
         lngActBranchId = 0;
         lngActVoucherConfigId = 0;
         istrSortColumn = '';
         iblnSortOrder = false;
         strVoucherColour = '';
         userLoginID = '';
         lngActFiscalYearId = 0;
         admBranchId = 0;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         doccurrencyid = 0;
         strdocCurrencyValue = '';
         dtmApprovedDateFrom = '';
         dtmApprovedDateTo = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         regionValue = '';
        
}

export class entActReversingJournalsearchResult {
  ilstentActReversingJournalsearchResultset: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entActReversingJournalsearchResultset {
  actReversejournalId = 0;
         actReversingjournalVoucharNo = '';
         actJournalVoucharNo = '';
         branchName = '';
         postingDate = '';
         currencyName = '';
         debitAmount = '';
         creditAmount = '';
         enteredBy = '';
         statusChangedDate = '';
         status = '';
         createdDate = '';
         createdBy = '';
         documentDate = '';
         regionDescription = '';
        
}

export class entActRunningVoucherNumber {
  actRunningVoucherNumberId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actVoucherConfigId = 0;
         actCompanyBranchId = 0;
         currentRefNo = '';
         restartedDate = '';
         runningNumber = 0;
         idoObjState = '';
         updateSeq = 0;
         modifiedDate = '';
         branchName = '';
         ientCompanyBranch = new entActCompanyBranch();
        
}

export class entActVendor {
  actVendorId = 0;
         actCompanyId = 0;
         vendorName = '';
         vendorCode = '';
         vendorLegacyCode = '';
         vendorTin = '';
         vendorRocNo = '';
         vendorBusinessLicenseNo = '';
         vendorTypeId = 0;
         vendorTypeValue = '';
         phoneNo = '';
         emailId = '';
         website = '';
         creditTypeId = 0;
         creditTypeValue = '';
         currencyId = 0;
         currencyValue = '';
         effectiveDate = '';
         discountPercentage = '';
         usualPaymentTerm = 0;
         settlementDiscount = '';
         settlementTerm = 0;
         statusId = 0;
         statusValue = '';
         vendorAliasName = '';
         taxCodeId = 0;
         vendorLedgerId = 0;
         chequePaymentName = '';
         paymentModeId = 0;
         paymentModeValue = '';
         faxNumber = '';
         indispute = '';
         vendorSubTypeId = 0;
         vendorSubTypeValue = '';
         admIslandId = 0;
         isFijian = '';
         shareDeduction = '';
         shareDeductionPercentage = '';
         shareDeductionValue = '';
         vatRegistered = '';
         freightSubsidyGiven = '';
         freightCompany = '';
         takeAllItem = '';
         vendorTypeDescription = '';
         vendorSubTypeDescription = '';
         creditTypeDescription = '';
         currencyDescription = '';
         statusDescription = '';
         paymentModeDescription = '';
         symbolValue = '';
         lstVendorContact: any = [];
         iVendorCreditTypeHistory = new VendorCreditTypeHistory();
         lstVendorCreditTypeHistory: any = [];
         lstentVendorInvItemLink: any = [];
         lstentActAttachments: any = [];
         sAdmIsland = new entAdmIsland();
         iAddress = new entActAddress();
         lstAddress: any = [];
         lstVendorBankDetails: any = [];
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         lstActNotes: any = [];
         msg = new entIEMessage();
         ientActLedger = new entLedger();
         creditPeriod = 0;
         plstentActVendorRegionAccess: any = [];
        
}

export class entActVendorRegionAccess {
  actVendorRegionAccessId = 0;
         actVendorId = 0;
         regionId = 0;
         regionValue = '';
         createdDate = '';
         modifiedDate = '';
         enteredBy = '';
         enteredByFullName = '';
         modifiedByFullName = '';
         regionDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         plstentActVendorRegionAccessHistory: any = [];
         ledgerId = 0;
         ledgerName = '';
        
}

export class entActVendorRegionAccessHistory {
  actVendorRegionAccessHistoryId = 0;
         actVendorRegionAccessId = 0;
         regionId = 0;
         regionValue = '';
         changedDate = '';
         changedBy = '';
         regionDescription = '';
         statusDescription = '';
         changedByFullName = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         ledgerId = 0;
         ledgerName = '';
        
}

export class entActVendorRegionAccessList {
  plstentActVendorRegionAccess: any = [];
         msg = new entIEMessage();
        
}

export class entActVoucherAccountDetail {
  actVoucherAccountConfigId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         effectiveDate = '';
         voucherAccountTypeId = 0;
         voucherAccountTypeValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         actVoucherConfigId = 0;
         effectTypeId = 0;
         effectTypeValue = '';
         taxCodeId = 0;
         netAmountDebitLedgerId = 0;
         debitPartyAccountFlag = '';
         netAmountCreditLedgerId = 0;
         creditPartyAccountFlag = '';
         entryTypeId = 0;
         entryTypeValue = '';
         voucherCategoryId = 0;
         voucherCategoryValue = '';
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         indexNumber = 0;
         taxAccountLedgerId = 0;
         discountAccountLedgerId = 0;
         ientCompanyBranch = new entActCompanyBranch();
         ientLedger = new entLedger();
         ientCreditLedger = new entLedger();
         ientVoucherAccountDetailSearchResult = new entVoucherAccountDetailSearchResult();
         branchAccountTypeDescription = '';
         applicableBranchDescription = '';
         voucherTypeDescription = '';
         effectTypeDescription = '';
         voucherconfigname = '';
         entryTypeDescription = '';
         voucherCategoryDescription = '';
         leggerName = '';
         ientActVoucherConfig = new entActVoucherConfig();
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entActVoucherAccountDetailSearch {
  lstrActCompanyBranchId = '';
         lstrBranchAccountTypeValue = '';
         llngActLedgerId = 0;
         ldtmEffectiveDateFrom = '';
         ldtmEffectiveDateTo = '';
         lstrIndividualCompanyBranchId = '';
         llngActCompanyId = 0;
         lstrVoucherTypeValue = '';
         lngactVoucherConfigId = 0;
         lstrEffectTypeValue = '';
         userLoginID = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         regionValue = '';
         ascending = false;
        
}

export class entActVoucherBranchAccess {
  actVoucherBranchAccessId = 0;
         actVoucherConfigId = 0;
         actCompanyBranchId = 0;
         effectiveDate = '';
         endDate = '';
         isAllowed = '';
         isRestricted = '';
         statusId = 0;
         statusValue = '';
         accessTypeId = 0;
         accessTypeValue = '';
         addedBy = '';
         approvedBy = '';
         ientCompanyBranch = new entActCompanyBranch();
         ilistentActVoucherBranchAccessStatusHistory: any = [];
         statusDescription = '';
         accessTypeDescription = '';
         istrAddedByUserName = '';
         istrApprovedByUserName = '';
         actCompanyId = 0;
         updateSeq = '';
         idoObjState = '';
         lddlData: any = [];
         createdDate = '';
        
}

export class entActVoucherBranchAccessStatusHistory {
  actVoucherBranchAccessStatusHistoryId = 0;
         actVoucherBranchAccessId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         updateSeq = '';
         idoObjState = '';
         changedByFullName = '';
        
}

export class entActVoucherConfig {
  actVoucherConfigId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         voucherName = '';
         voucherCategoryId = 0;
         voucherCategoryValue = '';
         voucherTypeId = 0;
         voucherTypeValue = '';
         narrationMandatory = '';
         effectiveDate = '';
         printAfterSaving = '';
         entryTypeId = 0;
         entryTypeValue = '';
         chequePrintingAllowed = '';
         voucherNatureId = 0;
         voucherNatureValue = '';
         voucherColour = '';
         isLedgerPosting = '';
         needInventory = '';
         isDirectApproval = '';
         invTypeId = 0;
         invSubTypeId = 0;
         needCash = '';
         ledgerPostingFromId = 0;
         ledgerPostingFromValue = '';
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientActVoucherNumber = new entActVoucherNumber();
         ilistentActVoucherNumberPrefix: any = [];
         ilistentActVoucherNumberSuffix: any = [];
         ilistentActRunningVoucherNumber: any = [];
         ilistentActVoucherBranchAccess: any = [];
         voucherCategoryDescription = '';
         voucherTypeDescription = '';
         entryTypeDescription = '';
         voucherNatureDescription = '';
         ledgerPostingFromValueDescription = '';
         acessType = '';
         isAutoRefnum = '';
         ientActVoucherNumberPrefix = new entActVoucherNumberPrefix();
         ientActVoucherNumberSuffix = new entActVoucherNumberSuffix();
         ientActRunningVoucherNumber = new entActRunningVoucherNumber();
         isTaxEditable = '';
         isItemLedgerEditable = '';
         postingVoucherConfigId = 0;
         pdfOtherComments = '';
         pdfSignature = '';
         plstentDDLClass: any = [];
         plstentActVoucherRegionAccess: any = [];
        
}

export class entActVoucherConfigSearch {
  voucherName = '';
         voucherCategoryValue = '';
         voucherTypeValue = '';
         entryTypeValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         actCompanyId = 0;
         lstrVoucherNatureValue = '';
         userLoginID = '';
         istrSortColumn = '';
         totalCount = 0;
         pageNumber = 0;
         pageSize = 0;
         msg = new entIEMessage();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         orderByColumnName = '';
         ascending = false;
         istrSortOrder = false;
        
}

export class entActVoucherNumber {
  actVoucherNumberId = 0;
         actVoucherConfigId = 0;
         voucherNumberingId = 0;
         voucherNumberingValue = '';
         startingNumber = 0;
         applyPrefix = '';
         applySuffix = '';
         effectiveFrom = '';
         numberLength = 0;
         zeroPrefixNumber = '';
         restartNumberId = 0;
         restartNumberValue = '';
         uniqueNumberingId = 0;
         uniqueNumberingValue = '';
         addMonth = '';
         addYear = '';
         ientActVoucherNumberPrefix = new entActVoucherNumberPrefix();
         ientActVoucherNumberSuffix = new entActVoucherNumberSuffix();
         ilistentActVoucherNumberPrefix: any = [];
         ilistentActVoucherNumberSuffix: any = [];
         ilistentActRunningVoucherNumber: any = [];
         updateSeq = '';
         idoObjState = '';
        
}

export class entActVoucherNumberPrefix {
  actVoucherNumberPrefixId = 0;
         actVoucherConfigId = 0;
         actVoucherNumberId = 0;
         effectiveFrom = '';
         prefixValue = '';
         addBranchCode = '';
         actCompanyId = 0;
         updateSeq = '';
         idoObjState = '';
        
}

export class entActVoucherNumberSuffix {
  actVoucherNumberSuffixId = 0;
         actVoucherConfigId = 0;
         actVoucherNumberId = 0;
         effectiveFrom = '';
         suffixValue = '';
         addBranchCode = '';
         actCompanyId = 0;
         updateSeq = '';
         idoObjState = '';
        
}

export class entActVoucherRegionAccess {
  actVoucherRegionAccessId = 0;
         actVoucherConfigId = 0;
         regionId = 0;
         regionValue = '';
         createdDate = '';
         modifiedDate = '';
         enteredBy = '';
         enteredByFullName = '';
         modifiedByFullName = '';
         regionDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         plstentActVoucherRegionAccessHistory: any = [];
        
}

export class entActVoucherRegionAccessHistory {
  actVoucherRegionAccessHistoryId = 0;
         actVoucherRegionAccessId = 0;
         regionId = 0;
         regionValue = '';
         changedDate = '';
         changedBy = '';
         regionDescription = '';
         statusDescription = '';
         changedByFullName = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entActVoucherRegionAccessList {
  plstentActVoucherRegionAccess: any = [];
         msg = new entIEMessage();
        
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

export class entBalanceSheetMonthlyReport {
  monthName = '';
         year = 0;
         userLoginID = '';
         isExcludeZero = '';
         fiscalYearId = 0;
         companyId = 0;
         companyBranchId = 0;
         pentBalanceSheetReport = new entBalanceSheetReport();
         plstentActGroup: any = [];
         pentActGroup = new entActGroup();
         msg = new entIEMessage();
         openingBalance = '';
         currentPeriodBalance = '';
         transferdAmount = '';
         profitandLossTotal = '';
         totalAssestAmount = '';
         totalliabilityAmount = '';
         differenceInLiabilityLedgerOpeningBalance = '';
         differenceInAssetLedgerOpeningBalance = '';
         plstAssetentActGroup: any = [];
         plstLiabilityentActGroup: any = [];
        
}

export class entBalanceSheetReport {
  companyId = 0;
         fiscalYearId = 0;
         fromDate = '';
         isExcludeZero = '';
         expandAll = '';
         toDate = '';
         ddlFiscalYearId = 0;
         openingBalance = '';
         currentPeriodBalance = '';
         transferdAmount = '';
         profitandLossTotal = '';
         totalAssestAmount = '';
         totalliabilityAmount = '';
         companyName = '';
         differenceInLiabilityLedgerOpeningBalance = '';
         differenceInAssetLedgerOpeningBalance = '';
         differenceInItemOpeningBalance = '';
         differenceInCreditItemOpeningBalance = '';
         differenceInDebitItemOpeningBalance = '';
         pentActGroup = new entActGroup();
         plstentActGroup: any = [];
         plstAssetentActGroup: any = [];
         plstLiabilityentActGroup: any = [];
         msg = new entIEMessage();
         strResultExcel = '';
         plstentBalanceSheetMonthlyReport: any = [];
         fiscalYear = '';
         regionValue = '';
        
}

export class entBranchBankSearch {
  lstrActCompanyBranchId = 0;
         lstrBankName = '';
         ldtmBeginDateFrom = '';
         ldtmBeginDateTo = '';
         lstrBankCode = '';
         lstrSwiftCode = '';
         lstrBankAccountNo = '';
         lstrBankLedgerName = '';
         statusId = 0;
         strStatusValue = '';
         llngBankLedgerId = 0;
         llngActCompanyId = 0;
         isortcolumn = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entBranchBankSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstBranchBankSearchSet: any = [];
        
}

export class entBranchBankSearchSet {
  actCompanyBranchBankDetailId = 0;
         lstrBankName = '';
         branchName = '';
         companyBranchName = '';
         lstrBankCode = '';
         swiftCode = '';
         lstrBankAccountNo = '';
         lstrBankLedgerName = '';
         strStatusValue = '';
         ldtmBeginDate = '';
         endDate = '';
         actCompanyBranchId = 0;
         bankAccountName = '';
        
}

export class entByteData {
  byteData: any = [];
         msg = new entIEMessage();
         contentType = '';
         fileName = '';
        
}

export class entCMNAttachment {
  attachmentName = '';
         attachmentContent = '';
        
}

export class entCheckLineItemBasedonDocumentDate {
  documentDate = '';
         voucherType = '';
         voucherIds = '';
         targetCurrencyValue = '';
         voucherConfigId = '';
        
}

export class entCommonItem {
  itemId = 0;
         documentDate = '';
         voucherConfigId = 0;
         enteredQuantity = '';
        
}

export class entCompanySearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstActCompanySearchSet: any = [];
        
}

export class entCompanyTax {
  actCompanyTaxId = 0;
         actCompanyId = 0;
         taxCode = '';
         taxName = '';
         currentPercentage = '';
         effectiveDate = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         statusId = 0;
         statusValue = '';
         taxStatusId = 0;
         taxStatusValue = '';
         ilistentCompanyTaxHistory: any = [];
         ilistentCompanyTaxStatusHistory: any = [];
         ilstentFinAttachments: any = [];
         ilstentActNotes: any = [];
         statusDescription = '';
         approvedByUsername = '';
         enteredByUsername = '';
         taxStatusDescription = '';
         taxCodeDescription = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         pentActNotes = new entActNotes();
         createdDate = '';
        
}

export class entCompanyTaxHistory {
  actCompanyTaxHistoryId = 0;
         actCompanyTaxId = 0;
         taxPercentage = '';
         effectiveDate = '';
         preparedBy = '';
         preparedDate = '';
         approvedBy = '';
         approvedDate = '';
         taxPreparedBy = '';
         taxApprovedBy = '';
        
}

export class entCompanyTaxStatusHistory {
  actCompanyTaxStatusHistoryId = 0;
         actCompanyTaxId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         statusDescription = '';
         changedByUserName = '';
        
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

export class entCreditorsAmountSummary {
  totalDue = '';
         noDue = '';
         totalDueOn30Days = '';
         totalDueOn60Days = '';
         totalDueOn90Days = '';
         totalDueAbove90Days = '';
         balanceDue = '';
         totalInvoiceAmount = '';
         msg = new entIEMessage();
        
}

export class entCreditorsSummary {
  companyId = 0;
         sNo = 0;
         vendorCode = '';
         vendorId = 0;
         vendorName = '';
         vendorCurrency = '';
         totalDue = '';
         noDue = '';
         totalDueOn30Days = '';
         totalDueOn60Days = '';
         totalDueOn90Days = '';
         totalDueAbove90Days = '';
         msg = new entIEMessage();
        
}

export class entCreditorsVoucherDetail {
  sNo = 0;
         voucherId = 0;
         voucherConfigId = 0;
         voucherRefNo = '';
         vendorId = 0;
         vendorName = '';
         vendorCode = '';
         voucherType = '';
         documentDate = '';
         dueDate = '';
         dueDays = 0;
         totalCredit = '';
         totalDebit = '';
         balanceAmount = '';
         totalDue = '';
         noDue = '';
         totalDueOn30Days = '';
         totalDueOn60Days = '';
         totalDueOn90Days = '';
         totalDueAbove90Days = '';
         voucherName = '';
         invoiceAmount = '';
         vendorCurrency = '';
         currencyRate = '';
         actualAmount = '';
         purchasevalue = '';
         paymentvalue = '';
         balance = '';
         voucherTypeDescription = '';
         documentCurrency = '';
         vendorReferenceNumber = '';
         msg = new entIEMessage();
        
}

export class entCreditorsVouchers {
  plstentCreditorsVoucherDetail: any = [];
         pentCreditorsAmountSummary = new entCreditorsAmountSummary();
         msg = new entIEMessage();
        
}

export class entCustomerBankDetail {
  actCustomerBankDetailId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actCustomerId = 0;
         beginDate = '';
         endDate = '';
         bankName = '';
         bankAccountNo = '';
         bankCode = '';
         swiftCode = '';
         statusId = 0;
         statusValue = '';
         iAddress = new entActAddress();
         lstAddress: any = [];
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusdescription = '';
        
}

export class entCustomerContact {
  actcustomercontactId = 0;
         actcustomerid = 0;
         actcompanyid = 0;
         firstname = '';
         middlename = '';
         lastname = '';
         dob = '';
         emailid = '';
         mobileno = '';
         phoneno = '';
         receivepromotionemails = '';
         dom = '';
         genderid = 0;
         gendervalue = '';
         maritalstatusid = 0;
         maritalstatusvalue = '';
         contacttypeid = 0;
         contacttypevalue = '';
         maritalstatusdescription = '';
         genderdescription = '';
         contacttypedescription = '';
         iAddress = new entActAddress();
         lstAddress: any = [];
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusId = 0;
         statusValue = '';
         statusDescription = '';
        
}

export class entCustomerContactList {
  plstentCustomerContact: any = [];
         msg = new entIEMessage();
        
}

export class entCustomerCreditType {
  actCustomerCreditId = 0;
         actCustomerId = 0;
         creditTypeId = 0;
         creditTypeValue = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entCustomerSalesAmountSummay {
  totalValue = '';
         totalQuantity = '';
        
}

export class entCustomerSalesSummay {
  sNo = 0;
         quantity = '';
         totalValue = '';
         customerId = 0;
         itemId = 0;
         itemName = '';
         unitType = '';
        
}

export class entCustomerSalesVoucherDetails {
  sNo = 0;
         voucherId = 0;
         voucherConfigId = 0;
         voucherRefNo = '';
         customerId = 0;
         customerName = '';
         documentDate = '';
         voucherName = '';
         shippingAddress = '';
         voucherType = '';
         invoiceAmount = '';
         currencyRate = '';
         totalQuantity = '';
         totalValue = '';
        
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

export class entDebtorsAmountSummary {
  totalDue = '';
         noDue = '';
         totalDueOn30Days = '';
         totalDueOn60Days = '';
         totalDueOn90Days = '';
         totalDueAbove90Days = '';
         balanceDue = '';
         totalInvoiceAmount = '';
        
}

export class entDebtorsSummary {
  companyId = 0;
         sNo = '';
         customerCode = '';
         customerId = 0;
         customerName = '';
         customerCurrency = '';
         totalDue = '';
         noDue = '';
         totalDueOn30Days = '';
         totalDueOn60Days = '';
         totalDueOn90Days = '';
         totalDueAbove90Days = '';
        
}

export class entDebtorsVoucherDetail {
  sNo = 0;
         voucherId = 0;
         voucherConfigId = 0;
         voucherRefNo = '';
         customerId = 0;
         customerName = '';
         customerCode = '';
         voucherType = '';
         documentDate = '';
         dueDate = '';
         dueDays = 0;
         totalCredit = '';
         totalDebit = '';
         balanceAmount = '';
         totalDue = '';
         noDue = '';
         totalDueOn30Days = '';
         totalDueOn60Days = '';
         totalDueOn90Days = '';
         totalDueAbove90Days = '';
         voucherName = '';
         shippingAdrs = '';
         invoiceAmount = '';
         customerCurrency = '';
         currencyRate = '';
         actualAmount = '';
         salesvalue = '';
         receiptvalue = '';
         balance = '';
         voucherTypeDescription = '';
         documentCurrency = '';
         customerReferenceNumber = '';
        
}

export class entDebtorsVouchers {
  lstentDebtorsVoucherDetail: any = [];
         ientDebtorsAmountSummary = new entDebtorsAmountSummary();
        
}

export class entExchangeRate {
  actExchangeRateId = 0;
         baseCurrencyId = 0;
         baseCurrencyValue = '';
         targetCurrencyId = 0;
         targetCurrencyValue = '';
         conversionRate = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         actCompanyId = 0;
         ilistentExchangeRateStatusHistory: any = [];
         ilstentActNotes: any = [];
         msg = new entIEMessage();
         statusDescription = '';
         baseCurrencyDescription = '';
         targetCurrencyDescription = '';
         approvedByUsername = '';
         enteredByUsername = '';
         pentActNotes = new entActNotes();
         updateSeq = 0;
         idoObjState = '';
        
}

export class entExchangeRateSearch {
  istrBaseCurrencyValue = '';
         istrTargetCurrencyValue = '';
         idtmEffectiveDateFrom = '';
         idtmEffectiveDateTo = '';
         groupName = '';
         istrStatusValue = '';
         ilngActCompanyId = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         enteredDateFrom = '';
         enteredDateTo = '';
        
}

export class entExchangeRateStatusHistory {
  exchangeRateStatusHistoryId = 0;
         exchangeRateId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         statusDescription = '';
         changedByUserName = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entGetMailInfo {
  subject = '';
         toMailList = '';
         ccMailList = '';
         isIncludeAttachment = '';
         isIncludePdf = '';
         content = '';
         msg = new entIEMessage();
         lpdFentCMNAttachment = new entCMNAttachment();
         lstentCMNAttachment: any = [];
        
}

export class entIEMessage {
  infoMessage = new entMsgDetail();
         errorMessage: any = [];
         hasError = false;
        
}

export class entInputAutoCompVoucher {
  partyId = 0;
         voucherType = '';
         documentDate = '';
         refNo = '';
         voucherConfigId = 0;
         regionValue = '';
        
}

export class entIntGroupSearch {
  codeName = '';
         groupName = '';
         groupNatureValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         createdBy = '';
         istrSortColumn = '';
         istrSortOrder = false;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entIntGroupSearchResult {
  lentIntGroupSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entIntGroupSearchResultSet {
  actGroupId = 0;
         groupName = '';
         codeName = '';
         groupNature = '';
         effectiveDate = '';
         createdBy = '';
        
}

export class entInvAttachments {
  invAttachmentsId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         attachmentFileName = '';
         attachmentStatusId = 0;
         attachmentStatusValue = '';
         attachmentSize = '';
         attachmentType = '';
         attachmentRelativePath = '';
         mailSent = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         istrFileContent = '';
         istringFileContent = '';
         createdDate = '';
         modifiedByFullName = '';
        
}

export class entInvAttachmentsList {
  plstentInvAttachments: any = [];
         msg = new entIEMessage();
        
}

export class entInvBatch {
  invBatchNumberId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         batchNumber = '';
         grnRefernceNo = '';
         invItemId = 0;
         dateOfManufacture = '';
         dateOfExpiry = '';
         beginDate = '';
         endDate = '';
         previousInvBatchId = 0;
         comments = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entInvBranchItemMapping {
  invBranchItemMappingId = 0;
         invItemId = 0;
         actCompanyBranchId = 0;
         minQty = 0;
         maxQty = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         listInvBranchItemMapping: any = [];
         msg = new entIEMessage();
         actComapnyBranchName = '';
        
}

export class entInvCategory {
  invCategoryId = 0;
         actCompanyId = 0;
         categoryName = '';
         categoryCode = '';
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         shortDescription = '';
         categoryPrefix = '';
         runningSeqNo = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         ientInvCategorySearchResultSet = new entInvCategorySearchResultSet();
        
}

export class entInvCategorySearch {
  stCategoryName = '';
         strCategoryCode = '';
         dtmEffectiveDateFrom = '';
         dtmEffectiveDateTo = '';
         strStatusValue = '';
         actCompanyId = 0;
         strShortDescription = '';
         isortcolumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entInvCategorySearchResultSet {
  ilstentInvCategorySearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entInvCategorySearchSet {
  invCategoryId = 0;
         categoryCode = '';
         categoryName = '';
         effectiveDate = '';
         shortDescription = '';
         status = '';
        
}

export class entInvGdnStatusHistory {
  invGdnStatusHistoryId = 0;
         actCompanyId = 0;
         invGoodsDeliveryNoteId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         changedByUsername = '';
        
}

export class entInvGdnStockOut {
  invGdnStockOutId = 0;
         actCompanyId = 0;
         invGoodsDeliveryNoteId = 0;
         gdnStockOutRefNo = '';
         purCustomerQuotationId = 0;
         salSalesInvoiceId = 0;
         invCustomerReturnReceiptId = 0;
         salSalesOrderId = 0;
         comment = '';
         statusId = 0;
         statusValue = '';
         referenceId = 0;
         referenceType = '';
         statusDescription = '';
         ilistbusInvGDNStockOutItem: any = [];
         ibusSalesInvoice = new entSalSalesInvoice();
         ientSalSalesOrder = new entSalSalesOrder();
         ibusActVoucherConfig = new entActVoucherConfig();
         ibusActBranch = new entActCompanyBranch();
        
}

export class entInvGdnStockOutItem {
  invGdnStockOutItemId = 0;
         actCompanyId = 0;
         invGdnStockOutId = 0;
         batchNumber = '';
         itemId = 0;
         customerQuotationItemId = 0;
         salSalesInvoiceItemId = 0;
         salSalesOrderItemId = 0;
         invCustomerReturnRecieptItemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         itemConditionId = 0;
         itemConditionValue = '';
         unitPrice = '';
         totalPrice = '';
         taxAmount = '';
         comment = '';
         statusId = 0;
         statusValue = '';
         referenceId = 0;
         ibusInvItem = new entInvItem();
         isChecked = '';
         itemCode = '';
         itemName = '';
         statusDescription = '';
         itemConditionDescription = '';
         unitTypeDescription = '';
         msg = new entIEMessage();
        
}

export class entInvGoodsDeliveryNote {
  invGoodsDeliveryNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         gdnReferenceNo = '';
         actCompanyBranchId = 0;
         actCustomerId = 0;
         customerShipmentAddressId = 0;
         shipmentTypeId = 0;
         shipmentTypeValue = '';
         dispatchDate = '';
         dispatchBy = '';
         statusId = 0;
         statusValue = '';
         verifiedDate = '';
         verifiedBy = '';
         preparedDate = '';
         preparedBy = '';
         goodsDeliveryNoteFilePath = '';
         actCustomerAddressId = 0;
         actVoucherConfigId = 0;
         comment = '';
         currencyId = 0;
         currencyValue = '';
         documentDate = '';
         dueDate = '';
         effectiveDate = '';
         salesOrderId = 0;
         netAmount = '';
         currencyRate = '';
         docCurrencyValue = '';
         referenceId = 0;
         statusDescription = '';
         shipmentFromTypeDescription = '';
         branchValue = '';
         shipmentVendorName = '';
         gdnPreparedBy = '';
         gdnDispatchBy = '';
         gdnApprovedBy = '';
         salesOrderNumber = '';
         totalCost = '';
         currencySymbolValue = '';
         isNeedInventory = '';
         totalDiscountAmount = '';
         totalCalculatedAmount = '';
         totalAmountAfterDiscount = '';
         totalTaxAmount = '';
         totalNetAmount = '';
         strVoucherColour = '';
         voucherConfigName = '';
         iblnInventoryIntegration = false;
         ilistbusInvAttachments: any = [];
         ilistbusInvNotes: any = [];
         ibusInvGoodsDeliveryNoteItem = new entInvGoodsDeliveryNoteItem();
         ibusActCompanyVoucherAccountDetail = new entActVoucherAccountDetail();
         ilistbusInvGoodsDeliveryNoteItem: any = [];
         ilistbusInvGoodsDeliverydNoteLedgerItem: any = [];
         ibusActCustomerDetails = new entActCustomerDetails();
         ibusActVoucherConfig = new entActVoucherConfig();
         ilistbusActCurrencyExchangeRate: any = [];
         ibusActBranch = new entActCompanyBranch();
         ilistbusActBranch: any = [];
         msg = new entIEMessage();
         ilistbusInvGDNStockOut: any = [];
         ilistbusInvGDNStockOutItem: any = [];
         ibusSalSalesOrder = new entSalSalesOrder();
         ilistbusInvGDNStatusHistory: any = [];
         listofInvGoodsDelliveryNote: any = [];
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entInvGoodsDeliveryNoteItem {
  invGoodsDeliveryNoteItemId = 0;
         invGoodsDeliveryNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         invItemId = 0;
         batchNumber = '';
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         unitPrice = '';
         discountAmount = '';
         discountPercentage = '';
         totalAfterDiscount = '';
         vatAmount = '';
         taxPercentage = '';
         totalPrice = '';
         salSalesOrderItemId = 0;
         salSalesOrderId = 0;
         actCompanyBranchId = 0;
         itemDescription = '';
         serviceCode = '';
         taxAmount = '';
         referenceId = 0;
         unitTypeDescription = '';
         salesOrderRefNo = '';
         deleteFlag = '';
         rowId = 0;
         isNeedInventory = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         ibusInvItem = new entInvItem();
         ibusSalSaleseOrder = new entSalSalesOrder();
         ibusSalSalesOrderItem = new entSalSalesOrderItem();
         ibusActCompanyVoucherAccountDetail = new entActVoucherAccountDetail();
         ilistbusSalSalesOrder: any = [];
        
}

export class entInvGoodsDeliveryNoteLedgerItem {
  invGoodsDeliveryNoteLedgerItemsId = 0;
         actCompanyId = 0;
         invGoodsDeliveryNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         referenceId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         ientActCompanyVoucherAccountDetail = new entActVoucherAccountDetail();
         branchAccountTypeDescription = '';
         addReduceEffectDescription = '';
        
}

export class entInvGoodsDeliveryNoteSearch {
  gdnReferenceNo = '';
         actCompanyBranchId = '';
         statusValue = '';
         customerId = 0;
         verifiedBy = '';
         verifiedDateFrom = '';
         verifiedDateTo = '';
         preparedBy = '';
         preparedDateFrom = '';
         preparedDateTo = '';
         actCompanyId = 0;
         dcnetAmountFrom = '';
         dcnetAmountTo = '';
         branchName = '';
         symbolValue = '';
         actVoucherConfigId = 0;
         istrSortColumn = '';
         userLoginID = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         doucmentDate = '';
         needInventory = '';
         istrSortOrder = false;
        
}

export class entInvGoodsDeliveryNoteSearchResultSet {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         updateSeq = '';
         idoObjState = '';
        
}

export class entInvGoodsDeliveryNoteSearchSet {
  invGoodsDeliveryNoteId = 0;
         gdnReferenceNo = '';
         voucherName = '';
         branchName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         invoiceAmount = '';
         status = '';
        
}

export class entInvGoodsReceivedNote {
  invGoodsReceivedNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         grnReferenceNo = '';
         actCompanyBranchId = 0;
         shipmentFromTypeId = 0;
         shipmentFromTypeValue = '';
         receivedDate = '';
         receivedBy = '';
         statusId = 0;
         statusValue = '';
         preparedBy = '';
         preparedDate = '';
         verifiedDate = '';
         verifiedBy = '';
         goodsRecievedNoteFilePath = '';
         voucherConfigId = 0;
         shipmentVendorId = 0;
         comment = '';
         currencyId = 0;
         currencyRate = '';
         currencyValue = '';
         documentDate = '';
         dueDate = '';
         effectiveDate = '';
         vendorAddressId = 0;
         vendorReferenceNumber = '';
         docCurrencyValue = '';
         netAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         listentInvGoodsReceivedNote: any = [];
         ientInvGoodsReceivedNoteItems = new entInvGoodsReceivedNoteItem();
         statusDescription = '';
         lstentInvGoodsReceivedNoteItem: any = [];
         ilistentInvGRNStatusHistory: any = [];
         ilistentInvNotes: any = [];
         ilistentActCompanyBranch: any = [];
         ilistentInvAttachments: any = [];
         ilistentInvGoodsReceivedNoteLedgerItem: any = [];
         ilistentActCurrencyExchangeRate: any = [];
         ientPurPurchaseOrder = new entPurPurchaseOrder();
         ientActCompanyBranch = new entActCompanyBranch();
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
         ientActVoucherConfig = new entActVoucherConfig();
         ientActVendor = new entActVendor();
         msg = new entIEMessage();
         isNeedInventory = '';
         ientInvItem = new entInvItem();
         ientInvNotes = new entInvNotes();
         ilstentInvGrnStockInItem: any = [];
         lstentInvGrnStockIn: any = [];
         sentInvGrnStockIn = new entInvGrnStockIn();
        
}

export class entInvGoodsReceivedNoteItem {
  invGoodsReceivedNoteItemId = 0;
         invGoodsReceivedNoteId = 0;
         purPurchaseOrderId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         invItemId = 0;
         itemDescription = '';
         purPurchaseOrderItemId = 0;
         quantity = '';
         unitPrice = '';
         unitTypeId = 0;
         unitTypeValue = '';
         discountPercentage = '';
         taxAmount = '';
         discountAmount = '';
         batchNumber = '';
         totalAfterDiscount = '';
         taxPercentage = '';
         serviceCode = '';
         totalPrice = '';
         vatAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         isNeedInventory = false;
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
         ientPurPurchaseOrder = new entPurPurchaseOrder();
         lstentPurPurchaseOrder: any = [];
         ientPurPurchaseOrderItem = new entPurPurchaseOrderItem();
        
}

export class entInvGoodsReceivedNoteLedgerItem {
  invGoodsReceivedNoteLedgerItemsId = 0;
         invGoodsReceivedNoteId = 0;
         actCompanyId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         grnItemId = 0;
         grnNumberId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entInvGoodsReceivedNoteSearch {
  strGrnReferenceNo = '';
         statusValue = '';
         companyBranchId = 0;
         companyFiscalYearId = 0;
         lngActVendorId = 0;
         verifiedBy = '';
         dtmVerifiedDateFrom = '';
         dtmVerifiedDateTo = '';
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         preparedBy = '';
         dtmPreparedDateFrom = '';
         dtmPreparedDateTo = '';
         actCompanyId = 0;
         dcnetAmountFrom = '';
         dcnetAmountTo = '';
         strVendorName = '';
         strVoucherColour = '';
         symbolValue = '';
         currencyValue = '';
         istrSortColumn = '';
         istrSortOrder = false;
         userLoginID = '';
        
}

export class entInvGoodsReceivedNoteSearchResultSet {
  searchResult: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         updateSeq = '';
         idoObjState = '';
        
}

export class entInvGoodsReceivedNoteSearchSet {
  invGoodsReceivedNoteId = 0;
         grnReferenceNo = '';
         voucherName = '';
         branchName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         invoiceAmount = '';
         status = '';
        
}

export class entInvGoodsReceivedNotelist {
  ilstentInvGoodsReceivedNote: any = [];
        
}

export class entInvGrnStatusHistory {
  invGrnStatusHistoryId = 0;
         invGoodsReceivedNoteId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         changedByUsername = '';
        
}

export class entInvGrnStockIn {
  invGrnStockInId = 0;
         invGoodsReceivedNoteId = 0;
         invStockOrderId = 0;
         grnStockInRefNo = '';
         purPurchaseOrderId = 0;
         actVendorId = 0;
         invoiceNumber = '';
         gdnRefNo = '';
         comment = '';
         statusId = 0;
         statusValue = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         lstentInvGrnStockInItem: any = [];
         ientActVendor = new entActVendor();
        
}

export class entInvGrnStockInItem {
  invGrnStockInItemId = 0;
         invGrnStockInId = 0;
         batchNumber = '';
         vendorBatchNumber = '';
         purPurchaseOrderItemId = 0;
         invStockOrderItemId = 0;
         itemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         itemConditionId = 0;
         itemConditionValue = '';
         unitPrice = '';
         taxAmount = '';
         comment = '';
         freeQuantity = '';
         discountPercentage = '';
         discountPrice = '';
         grossPrice = '';
         dutyAmount = '';
         netAmount = '';
         manufactureDate = '';
         expiryDate = '';
         statusId = 0;
         statusValue = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
        
}

export class entInvItem {
  invItemId = 0;
         actCompanyId = 0;
         itemCode = '';
         itemName = '';
         actVendorId = 0;
         effectiveDate = '';
         stockUnitId = 0;
         stockUnitValue = '';
         itemNumber = 0;
         statusId = 0;
         statusValue = '';
         typeId = 0;
         typeValue = '';
         subTypeId = 0;
         subTypeValue = '';
         invCategoryId = 0;
         purchaseUnitId = 0;
         purchaseUnitValue = '';
         gradeCode = '';
         taxableItem = '';
         discountApplicable = '';
         actTaxCodeId = 0;
         dutyRate = '';
         indentItem = '';
         itemLegacyCode = '';
         itemReferenceNumber = '';
         itemLogo = '';
         itemDescription = '';
         inventoryGoods = '';
         openingBalance = '';
         openingQuantity = '';
         itemBelongsToId = 0;
         itemBelongsToValue = '';
         ledgerId = 0;
         actTaxCodeValue = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         listinvitemtype: any = [];
         actCompanyBranchId = 0;
         voucherconfigid = 0;
         ilistInvBranchItemMapping: any = [];
         ilistitementInvItemStatusHistory: any = [];
         ilistitementInvItemDetailHistory: any = [];
         ilistitementInvNotes: any = [];
         ilistitementInvAttachments: any = [];
         ilistitementInvBatch: any = [];
         ilistitementInvStockRegister: any = [];
         msg = new entIEMessage();
         statusDescription = '';
         purchaseUnitDescription = '';
         stockItemTypeDescription = '';
         groupDescription = '';
         stockUnitDescription = '';
         vendorName = '';
         vendorEffectiveDatetime = '';
         vendorStatusDescription = '';
         itemBelongsToDescription = '';
         vendorCode = '';
         batchNumber = '';
         itemMinQuantity = 0;
         itemMaxQuantity = 0;
         avaliableTotal = '';
         minLevel = 0;
         maxLevel = 0;
         unitPrice = '';
         taxPercentage = '';
         discountPercentage = '';
         discountPrice = '';
         inQuantity = 0;
         outQuantity = 0;
         thisBranchStockQuantity = 0;
         quantity = '';
         totalPrice = '';
         taxAmount = '';
         companyBranchId = 0;
         categoryName = '';
         taxCode = '';
         ledgerName = '';
         symbolValue = '';
         ledgerCode = '';
         minQuantity = '';
         maxQuantity = '';
         maximumDiscount = '';
         creditLedgerId = 0;
         creditLedgerName = '';
         creditLedgerCode = '';
         plstentInvItemRegionAccess: any = [];
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entInvItemDetailHistory {
  invItemDetailHistoryId = 0;
         invItemId = 0;
         effectiveDate = '';
         taxableItem = '';
         discountApplicable = '';
         taxCodeId = 0;
         dutyRate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         taxCode = '';
        
}

export class entInvItemRegionAccess {
  invItemRegionAccessId = 0;
         invItemId = 0;
         regionId = 0;
         regionValue = '';
         createdDate = '';
         modifiedDate = '';
         enteredBy = '';
         enteredByFullName = '';
         modifiedByFullName = '';
         regionDescription = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         plstentInvItemRegionAccessHistory: any = [];
         ledgerId = 0;
         ledgerName = '';
        
}

export class entInvItemRegionAccessHistory {
  invItemRegionAccessHistoryId = 0;
         invItemRegionAccessId = 0;
         regionId = 0;
         regionValue = '';
         changedDate = '';
         changedBy = '';
         regionDescription = '';
         statusDescription = '';
         changedByFullName = '';
         updateSeq = 0;
         idoObjState = '';
         msg = new entIEMessage();
         ledgerId = 0;
         ledgerName = '';
        
}

export class entInvItemRegionAccessList {
  plstentInvItemRegionAccess: any = [];
         msg = new entIEMessage();
        
}

export class entInvItemSearch {
  strItemName = '';
         strItemCode = '';
         strItemLegacyCode = '';
         strInvCategoryId = '';
         longTypeid = '';
         longSubTypeId = '';
         dtmEffectiveDateFrom = '';
         dtmEffectiveDateTo = '';
         strBatchNumber = '';
         indentItem = '';
         strStatusValue = '';
         actCompanyId = 0;
         strVendorId = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         actCompanyBranchId = 0;
         isInventoryGoods = '';
         regionValue = '';
        
}

export class entInvItemSearchResult {
  itemCode = '';
         itemName = '';
         itemLegacyCode = '';
         createdBy = '';
         effectiveDate = '';
         minQty = '';
         maxQty = '';
         status = '';
         invItemId = 0;
         taxPercentage = '';
         isInventoryGoods = '';
         invItemSubtypeName = '';
         invItemTypeName = '';
         categoryName = '';
         regionDescription = '';
        
}

export class entInvItemSearchResultSet {
  searchResultInvItem: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entInvItemStatusHistory {
  invItemStatusHistoryId = 0;
         invItemId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         statusDescription = '';
         changedByUsername = '';
         createdDate = '';
        
}

export class entInvItemSubtype {
  invItemSubtypeId = 0;
         actCompanyId = 0;
         invItemTypeId = 0;
         invItemSubtypeName = '';
         itemSubtypeCodePrefix = '';
         itemSubtypeCodeSuffix = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         listofinvitem: any = [];
         msg = new entIEMessage();
        
}

export class entInvItemSubtypeList {
  plstitemSubtype: any = [];
         msg = new entIEMessage();
        
}

export class entInvItemType {
  invItemTypeId = 0;
         actCompanyId = 0;
         invItemTypeName = '';
         itemtypeCodePrefix = '';
         itemtypeCodeSuffix = '';
         effectiveDatetime = '';
         invcategoryid = 0;
         statusId = 0;
         statusValue = '';
         statusDescription = '';
         groupName = '';
         msg = new entIEMessage();
         idoObjState = '';
         updateSeq = 0;
         lstInvItemSubType: any = [];
         pentInvItemTypeSearchResultSet = new entInvItemTypeSearchResultSet();
        
}

export class entInvItemTypeList {
  plstentInvItemType: any = [];
         msg = new entIEMessage();
        
}

export class entInvItemTypeSearch {
  categoryid = 0;
         itemTypeId = 0;
         actCompanyId = 0;
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entInvItemTypeSearchResultSet {
  ilstentInvItemTypeSearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         updateSeq = '';
         idoObjState = '';
        
}

export class entInvItemTypeSearchSet {
  invItemTypeId = 0;
         typeName = '';
         prefix = '';
         suffix = '';
         categoryName = '';
         effectiveDatetime = '';
         status = '';
        
}

export class entInvNotes {
  actNotesId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         notesDetail = '';
         actCompanyId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         createdFullName = '';
         modifiedDate = '';
         createdBy = '';
         createdDate = '';
         statusValue = '';
         lstDDLClass: any = [];
         temporaryDocumentDate = '';
        
}

export class entInvProductionNote {
  appInvProductionNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         productionNoteRefNo = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         documentDate = '';
         actVoucherConfigId = 0;
         approvedBy = '';
         enteredBy = '';
         enteredDate = '';
         approvedDate = '';
         netAmount = '';
         comments = '';
         updateSeq = '';
         idoObjState = '';
         ientInvproductionNoteItem = new entInvProductionNoteItem();
         ientActVoucherConfig = new entActVoucherConfig();
         ientActCompanyBranch = new entActCompanyBranch();
         productionNoteReceipt = '';
         ilistInvAttachments: any = [];
         ilistInvNotes: any = [];
         ilstentInvProductionStatusHistory: any = [];
         ilistentInvProductionNoteItem: any = [];
         msg = new entIEMessage();
         statusDescription = '';
         approvedByFullName = '';
         enteredByFullName = '';
         pentInvNotes = new entInvNotes();
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entInvProductionNoteItem {
  appInvProductionNoteDetailId = 0;
         appInvProductionNoteId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         appInvItemId = 0;
         unitPrice = '';
         consumptionQuantiy = '';
         productionQuantity = '';
         totalAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientInvItems = new entInvItem();
         strDeleteFlag = '';
        
}

export class entInvProductionNoteSearch {
  strProductionNoteRefNo = '';
         lngActCompanyId = 0;
         lngActBranchId = 0;
         branchName = '';
         voucherName = '';
         lngActVoucherConfigId = 0;
         statusValue = '';
         dtmEnteredDateFrom = '';
         dtmEnteredDateTo = '';
         dtmApprovedDateFrom = '';
         dtmApprovedDateTo = '';
         istrApprovedBy = '';
         istrEnteredBy = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         lngActFiscalYearId = 0;
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         istrSortColumn = '';
         regionValue = '';
        
}

export class entInvProductionStatusHistory {
  appInvProductionStatusHistoryId = 0;
         actCompanyId = 0;
         appInvProductionNoteId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByUsername = '';
        
}

export class entInvStockRegister {
  invStockRegisterId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         actVoucherConfigId = 0;
         voucherId = 0;
         debitors = 0;
         creditors = 0;
         voucherTypeValue = '';
         registerName = '';
         registerRefNo = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
        
}

export class entInvStockRequestItem {
  invStockRequestItemId = 0;
         actCompanyId = 0;
         invStockRequestId = 0;
         invItemId = 0;
         unitId = 0;
         unitValue = '';
         requestQuantity = '';
         statusId = 0;
         statusValue = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientInvItems = new entInvItem();
         searchField = '';
         statusDescription = '';
         symbolValues = '';
         unitDescription = '';
         strVoucherColour = '';
         msg = new entIEMessage();
         strDeleteFlag = '';
        
}

export class entInvStockRequestItemList {
  pentInvStockRequestItem: any = [];
        
}

export class entInvStockTransferNote {
  invStockTransferNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         referenceNo = '';
         transferDate = '';
         transferedBy = '';
         fromCompanyBranchId = 0;
         toCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         comment = '';
         verifiedDate = '';
         verifiedBy = '';
         preparedBy = '';
         preparedDate = '';
         packedBy = '';
         packedDate = '';
         stockTransferNoteFilePath = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         documentDate = '';
         actVoucherConfigId = 0;
         statusDescription = '';
         ientInvNotes = new entInvNotes();
         lstentInvNotes: any = [];
         ientInvStockTransferNoteItem = new entInvStockTransferNoteItem();
         lstentInvStockTransferNoteItem: any = [];
         ientInvAttachments = new entInvAttachments();
         lstentInvAttachments: any = [];
         toCompanyBranchName = '';
         stnPreparedBy = '';
         stnApprovedBy = '';
         stnTransferedBy = '';
         strPackedBy = '';
         symbolValue = '';
         strVoucherColour = '';
         lstentInvStockTransferNoteStatusHistory: any = [];
         ientActCompanyBranch = new entActCompanyBranch();
         ientActVoucherConfig = new entActVoucherConfig();
         msg = new entIEMessage();
         stockTransferNoteReceipt = '';
         stockTransferNoteReceiptByteArray = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entInvStockTransferNoteItem {
  invStockTransferNoteItemId = 0;
         actCompanyId = 0;
         invStockTransferNoteId = 0;
         batchNumber = '';
         invStockRequestItemId = 0;
         itemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         itemConditionId = 0;
         itemConditionValue = '';
         unitPrice = '';
         totalPrice = '';
         taxAmount = '';
         comment = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         unitTypeDescription = '';
         itemConditionDescription = '';
         stockRequestItemName = '';
         invStockRequestId = 0;
         stockRequestNo = '';
         batchNumberName = 0;
         symbolValue = '';
         rownumber = '';
         deletedFlag = '';
         msg = new entIEMessage();
         ientInvItems = new entInvItem();
         actCompanyBranchId = 0;
        
}

export class entInvStockTransferNoteList {
  ilstentInvStockTransferNote: any = [];
        
}

export class entInvStockTransferNoteSearch {
  strStockTransferNoteReferenceNo = '';
         fromBranchId = 0;
         actCompanyFiscalYearId = 0;
         transferDateFrom = '';
         transferDateTo = '';
         preparedDateFrom = '';
         preparedDateTo = '';
         documentDateFrom = '';
         documentDateTo = '';
         transferedBy = '';
         statusValue = '';
         toBranchId = 0;
         approvedDateFrom = '';
         approvedDateTo = '';
         verifiedBy = '';
         actCompanyId = '';
         lngActVoucherConfigId = 0;
         strVoucherColour = '';
         istrSortColumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         regionValue = '';
        
}

export class entInvStockTransferNoteStatusHistory {
  invStockTransferNoteStatusHistoryId = 0;
         actCompanyId = 0;
         invStockTransferNoteId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         stnChangedBy = '';
         msg = new entIEMessage();
        
}

export class entInvStockWrittenOffNote {
  invStockTransferNoteId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         referenceNo = '';
         transferDate = '';
         transferedBy = '';
         fromCompanyBranchId = 0;
         toCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         comment = '';
         verifiedDate = '';
         verifiedBy = '';
         preparedBy = '';
         preparedDate = '';
         packedBy = '';
         packedDate = '';
         stockWrittenoffNoteFilePath = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         documentDate = '';
         actVoucherConfigId = '';
         statusDescription = '';
         ientInvNotes = new entInvNotes();
         lstentInvNotes: any = [];
         ientInvStockWrittenOffNoteItem = new entInvStockWrittenOffNoteItem();
         lstentInvStockWrittenOffNoteItem: any = [];
         ientInvAttachments = new entInvAttachments();
         lstentInvAttachments: any = [];
         toCompanyBranchName = '';
         stnPreparedBy = '';
         stnApprovedBy = '';
         stnTransferedBy = '';
         strPackedBy = '';
         symbolValue = '';
         strVoucherColour = '';
         lstentInvStockWrittenOffNoteStatusHistory: any = [];
         ientActCompanyBranch = new entActCompanyBranch();
         ientActVoucherConfig = new entActVoucherConfig();
         msg = new entIEMessage();
        
}

export class entInvStockWrittenOffNoteItem {
  invStockTransferNoteItemId = 0;
         actCompanyId = 0;
         invStockTransferNoteId = 0;
         batchNumber = '';
         invStockRequestItemId = 0;
         itemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         itemConditionId = 0;
         itemConditionValue = '';
         unitPrice = '';
         totalPrice = '';
         taxAmount = '';
         comment = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         unitTypeDescription = '';
         itemConditionDescription = '';
         stockRequestItemName = '';
         invStockRequestId = 0;
         stockRequestNo = '';
         batchNumberName = 0;
         symbolValue = '';
         rownumber = '';
         deletedFlag = '';
         msg = new entIEMessage();
         ientInvItems = new entInvItem();
         actCompanyBranchId = 0;
        
}

export class entInvStockWrittenOffNoteList {
  ilstentInvStockWrittenOffNote: any = [];
        
}

export class entInvStockWrittenOffNoteSearch {
  strStockTransferNoteReferenceNo = '';
         fromBranchId = 0;
         actCompanyFiscalYearId = 0;
         transferDateFrom = '';
         transferDateTo = '';
         preparedDateFrom = '';
         preparedDateTo = '';
         documentDateFrom = '';
         documentDateTo = '';
         transferedBy = '';
         statusValue = '';
         toBranchId = 0;
         approvedDateFrom = '';
         approvedDateTo = '';
         verifiedBy = '';
         actCompanyId = '';
         lngActVoucherConfigId = 0;
         strVoucherColour = '';
         istrSortColumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
        
}

export class entInvStockWrittenOffNoteStatusHistory {
  invStockTransferNoteStatusHistoryId = 0;
         actCompanyId = 0;
         invStockTransferNoteId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         stnChangedBy = '';
         msg = new entIEMessage();
        
}

export class entItemBasedPurchaseReport {
  companyId = 0;
         vendorId = 0;
         reportResult = '';
         fiscalYearId = 0;
         ddlFiscalYearId = 0;
         branchId = 0;
         categoryId = 0;
         itemId = 0;
         itemTypeId = 0;
         itemSubTypeId = 0;
         fromDate = '';
         toDate = '';
         errorMsg = '';
         itemName = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entItemBasedSalesReport {
  companyId = 0;
         customerId = 0;
         reportResult = '';
         fiscalYearId = 0;
         ddlFiscalYearId = 0;
         branchId = 0;
         categoryId = 0;
         itemId = 0;
         itemTypeId = 0;
         itemSubTypeId = 0;
         fromDate = '';
         toDate = '';
         errorMsg = '';
         itemName = '';
         unitType = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entLedger {
  actLedgerId = 0;
         actCompanyFiscalYearId = 0;
         groupId = 0;
         effectiveDate = '';
         ledgerTypeId = 0;
         ledgerTypeValue = '';
         ledgerName = '';
         aliasName = '';
         codeName = '';
         currencyUsedId = 0;
         currencyUsedValue = '';
         billByBillBalance = '';
         isLocked = '';
         isDebitLocked = '';
         isCreditLocked = '';
         warnNegativeCashBalance = '';
         actCompanyBranchId = 0;
         openingBalance = '';
         isDefaultLedger = '';
         ledgerTypeDescription = '';
         currencyUsedDescription = '';
         groupName = '';
         offsetValue = 0;
         debitValue = '';
         creditValue = '';
         closingBalance = '';
         enteredBy = '';
         natureOfGroup = '';
         nodeValue = 0;
         companyFiscalyearId = 0;
         fiscalYearFlag = '';
         ientActLedgerEntrySearchResult = new entActLedgerEntrySearchResult();
         ilistentLedgerBranchAccess: any = [];
         ilistentLedgerLockHistory: any = [];
         ientCompanyFiscalYear = new entActCompanyFiscalYear();
         ientActGroup = new entActGroup();
         ilistentLedgerEntry: any = [];
         ilistentLedgerTransaction: any = [];
         updateSeq = '';
         idoObjState = '';
         closingBalanceSymbol = '';
         msg = new entIEMessage();
         isIncludeVatReport = '';
         reportTypeDescription = '';
         reportTypeId = 0;
         reportTypeValue = '';
         decClosingBalance = '';
         runningBalance = '';
         lentActCompanyBranchBankDetail = new entActCompanyBranchBankDetail();
         ientLedgerSearchResult = new entLedgerSearchResult();
         ientLedgerEntrySearchResult = new entLedgerEntrySearchResult();
         actCompanyId = 0;
         regionId = 0;
         regionValue = '';
         regionDescription = '';
         transactionDate = '';
         totalTransactionAmount = '';
        
}

export class entLedgerBranchAccess {
  actLedgerBranchAccessId = 0;
         actLedgerId = 0;
         actCompanyBranchId = 0;
         effectiveDate = '';
         endDate = '';
         isAllowed = '';
         isRestricted = '';
         statusId = 0;
         statusValue = '';
         addedBy = '';
         approvedBy = '';
         statusDescription = '';
         actCompanyId = 0;
         ientCompanyBranch = new entActCompanyBranch();
         istrAddedByUserName = '';
         istrApprovedByUserName = '';
         ilistentLedgerBranchAccessStatusHistory: any = [];
         idoObjState = '';
         updateSeq = '';
         strIsRestrictedDescription = '';
         strIsAllowedDescription = '';
         createdDate = '';
         modifiedDate = '';
         lddlData: any = [];
        
}

export class entLedgerBranchAccessStatusHistory {
  actLedgerBranchAccessStatusHistoryId = 0;
         actLedgerBranchAccessId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         statusDescription = '';
         changedByUserName = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entLedgerEntry {
  actLedgerEntryId = 0;
         actLedgerTransactionDetailsId = 0;
         ledgerId = 0;
         debitAmount = '';
         creditAmount = '';
         postedDate = '';
         effectiveDate = '';
         notes = '';
         runningBalance = '';
         companyFiscalyearId = 0;
         documentNumber = '';
         narration = '';
         transactionTypeId = 0;
         transactionTypeValue = '';
         actCompanyId = 0;
         check = false;
         voucherName = '';
         voucherTypeDescription = '';
         documentDate = '';
         ientLedgerTransaction = new entLedgerTransaction();
         ientLedgerTransactionDetail = new entLedgerTransactionDetail();
         plstentLedgerEntryAttribute: any = [];
         updateSeq = '';
         idoObjState = '';
        
}

export class entLedgerEntryAttribute {
  ledgerEntryAttributeId = 0;
         ledgerTransactionDetailId = 0;
         ledgerEntryId = 0;
         attributeCodeId = 0;
         attributeCodeValue = '';
         attributeValue = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entLedgerEntryList {
  lstentLedgerEntry: any = [];
        
}

export class entLedgerEntrySearch {
  ilngledgerId = 0;
         ilngActCompanyId = '';
         dtmEffectiveDateFrom = '';
         dtmEffectiveDateTo = '';
         ilngActFiscalYearId = 0;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         isOpeningBalanceUpdation = '';
         openingBalance = '';
         transactionTypeValue = '';
         istrSortColumn = '';
         istrSortOrder = false;
        
}

export class entLedgerEntrySearchResult {
  totalCount = 0;
         pageNumber = 0;
         pageSize = 0;
         pLedgerEntrySearchSet: any = [];
        
}

export class entLedgerEntrySearchSet {
  actLedgerEntryId = 0;
         documentNumber = '';
         effectiveDate = '';
         postedDate = '';
         runningBalance = '';
         creditAmount = '';
         debitAmount = '';
         narration = '';
         transactionType = '';
        
}

export class entLedgerLockHistory {
  actLedgerLockHistoryId = 0;
         actLedgerId = 0;
         lockTypeId = 0;
         lockTypeValue = '';
         effectiveDate = '';
         endDate = '';
         statusId = 0;
         statusValue = '';
         requestedBy = '';
         approvedBy = '';
         actCompanyId = 0;
         lockTypeDescription = '';
         statusDescription = '';
         istrRequestedByUserName = '';
         istrApprovedByUserName = '';
         ilistentLedgerLockStatusHistory: any = [];
         updateSeq = '';
         idoObjState = '';
         lddlData: any = [];
        
}

export class entLedgerLockStatusHistory {
  actLedgerLockStatusHistoryId = 0;
         actLedgerLockHistoryId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         statusDescription = '';
         changedByUserName = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entLedgerSearch {
  ledgerName = '';
         aliasName = '';
         codeName = '';
         groupId = 0;
         ledgerTypeValue = '';
         effectiveDateFrom = '';
         effectiveDateTo = '';
         istrSortColumn = '';
         istrSortOrder = false;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entLedgerSearchResult {
  lentLedgerSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entLedgerSearchResultSet {
  ledgerId = 0;
         ledgerName = '';
         aliasName = '';
         effectiveDate = '';
         groupNature = '';
         groupName = '';
         codeName = '';
         ledgerType = '';
        
}

export class entLedgerTransaction {
  actLedgerTransactionId = 0;
         companyId = 0;
         companyBranchId = 0;
         companyFiscalYearId = 0;
         sourceTypeId = 0;
         sourceTypeValue = '';
         sourceId = 0;
         documentNumber = '';
         statusId = 0;
         statusValue = '';
         transactionDate = '';
         effectiveDate = '';
         postedDate = '';
         narration = '';
         notes = '';
         voucherTypeDescription = '';
         fromTypeDescription = '';
         toTypeDescription = '';
         statusDescription = '';
         istrFromLedgerName = '';
         voucherName = '';
         istrToLedgerName = '';
         ientActVoucherConfig = new entActVoucherConfig();
         ilistentLedgerTransactionDetail: any = [];
         updateSeq = '';
         idoObjState = '';
         referenceId = 0;
         plstentLedgerTransactionDetailAttribute: any = [];
        
}

export class entLedgerTransactionDetail {
  actLedgerTransactionDetailId = 0;
         ledgerTransactionId = 0;
         ledgerTypeId = 0;
         ledgerTypeValue = '';
         ledgerReferenceId = 0;
         debitAmount = '';
         creditAmount = '';
         isTaxAmount = '';
         transactionTypeId = 0;
         transactionTypeValue = '';
         voucherTypeDescription = '';
         fromTypeDescription = '';
         toTypeDescription = '';
         statusDescription = '';
         istrFromLedgerName = '';
         voucherName = '';
         istrToLedgerName = '';
         ientActVoucherAccountDetail = new entActVoucherAccountDetail();
         updateSeq = 0;
         idoObjState = '';
         plstentLedgerTransactionDetailAttribute: any = [];
        
}

export class entLedgerTransactionDetailAttribute {
  ledgerTransactionDetailAttributeId = 0;
         ledgerTransactionDetailId = 0;
         ledgerEntryId = 0;
         attributeCodeId = 0;
         attributeCodeValue = '';
         attributeValue = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entListLong {
  data: any = [];
         msg = new entIEMessage();
        
}

export class entListeLedgerLockHistory {
  lstentLedgerLockHistory: any = [];
         msg = new entIEMessage();
        
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

export class entLongData3 {
  data1 = 0;
         data2 = 0;
         msg = new entIEMessage();
        
}

export class entLongStringData {
  data = 0;
         data1 = '';
         msg = new entIEMessage();
        
}

export class entMsgDetail {
  msgID = 0;
         msgType = 0;
         msgDescription = '';
        
}

export class entNetoutVoucherSummary {
  totalDocCurrencyDebit = '';
         totalDocCurrencyCredit = '';
         totalRepCurrencyCredit = '';
         totalRepCurrencyDebit = '';
         differenceAmount = '';
         ilstentActNetoutVoucherDetail: any = [];
        
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

export class entProfitAndLoss {
  fromDate = '';
         toDate = '';
         companyId = 0;
         companyBranchId = 0;
         userLoginID = '';
         ddlFiscalYearId = 0;
         isExcludeZero = '';
         fiscalYearId = 0;
         grossProfitCO = '';
         grossLossCO = '';
         grossLossBF = '';
         grossProfitBF = '';
         grossTotalExpense = '';
         grossTotalIncome = '';
         netProfit = '';
         netLoss = '';
         totalIncome = '';
         totalExpense = '';
         closingBalance = '';
         openingBalance = '';
         companyName = '';
         fiscalYear = '';
         expandAll = '';
         pentActGroup = new entActGroup();
         plstentActGroup: any = [];
         msg = new entIEMessage();
         strResultExcel = '';
         plstentProfitAndLossMonthlyReport: any = [];
         regionValue = '';
        
}

export class entProfitAndLossMonthlyReport {
  monthName = '';
         year = 0;
         isExcludeZero = '';
         fiscalYearId = 0;
         companyId = 0;
         companyBranchId = 0;
         closingBalance = '';
         openingBalance = '';
         totalRevenue = '';
         totalCostofSale = '';
         grossProfitOrLoss = '';
         totalofOtherIncome = '';
         totalofOtherExpenses = '';
         netProfitOrLoss = '';
         msg = new entIEMessage();
         plstentActGroup: any = [];
         pTotalRevenueBusActGroup = new entActGroup();
         pTotalCostOfSaleBusActGroup = new entActGroup();
         pTotalofOtherIncomeBusActGroup = new entActGroup();
         pTotalofOtherExpenseBusActGroup = new entActGroup();
        
}

export class entPurAdvancePaymentNote {
  purAdvancePaymentNoteId = 0;
         apnRefNo = '';
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         purAdvancePurchaseInvoiceId = 0;
         actVendorId = 0;
         paymentBy = '';
         paidBy = '';
         statusId = 0;
         statusValue = '';
         comments = '';
         approvedBy = '';
         approvedDate = '';
         modeId = 0;
         modeValue = '';
         amount = '';
         paidAmount = '';
         balanceAmount = '';
         paymentDate = '';
         transactionRefNo = '';
         chequeBankName = '';
         chequeNumber = '';
         chequeDate = '';
         chequeAmount = '';
         advancePaymentNoteFilePath = '';
         currencyId = 0;
         currencyValue = '';
         reportingCurrencyId = 0;
         reportingCurrencyValue = '';
         effectiveDate = '';
         enteredBy = '';
         enteredDate = '';
         mailSendCount = 0;
         actVendorBankDetailId = 0;
         actCompanyBranchBankDetailId = 0;
         actVoucherConfigId = 0;
         cashbookLedgerId = 0;
         currencyRate = '';
         documentDate = '';
         docCurreny = '';
         vendorLedgerId = 0;
         statusDescription = '';
         branchDescription = '';
         modeDescription = '';
         paidByUsername = '';
         approvedByUsername = '';
         enteredByUsername = '';
         taxAmount = '';
         strVoucherColour = '';
         symbolValue = '';
         advancedPaidAmount = '';
         toMail = '';
         ccMail = '';
         invoiceBalanceAmount = '';
         buttonVisible = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         ilistbusPurAdvancePaymentNoteStatusHistory: any = [];
         ilistbusPurAdvancePaymentNoteDetail: any = [];
         iListbusPurAdvancePaymentNoteLedgerItems: any = [];
         ilistbusPurNotes: any = [];
         ilistbusPurAttachments: any = [];
         pentActVendor = new entActVendor();
         ibusPurAdvancePaymentNoteDetail = new entPurAdvancePaymentNoteDetail();
         ibusActBranch = new entActCompanyBranch();
         ibusActVoucherConfig = new entActVoucherConfig();
         ibusActCurrencyExchangeRate = new entActCurrencyExchangerate();
         ibusActLedger = new entLedger();
         ibusActCompanyBranchBankDetail = new entActCompanyBranchBankDetail();
         ibusPurAttachments = new entPurAttachments();
         ibusPurPurchaseInvoice = new entPurPurchaseInvoice();
         ilstbusActCurrencyExchangeRate: any = [];
         iVendorActLedger = new entLedger();
         pentPurNotes = new entPurNotes();
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entPurAdvancePaymentNoteDetail {
  purAdvancePaymentNoteDetailId = 0;
         purAdvancePaymentNoteId = 0;
         purPurchaseOrderId = 0;
         advancePercentage = '';
         advancePayment = '';
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         previousPaidAmount = '';
         balancePaidAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ibusPurPurchaseOrder = new entPurPurchaseOrder();
         strDeleteFlag = '';
        
}

export class entPurAdvancePaymentNoteDetailList {
  plstentPurAdvancePaymentNoteDetail: any = [];
         msg = new entIEMessage();
        
}

export class entPurAdvancePaymentNoteLedgerItems {
  purAdvancePurchaseNoteLedgerItemsId = 0;
         actCompanyId = 0;
         purAdvancePaymentNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         ibusActCompanyVoucherAccountDetail = new entActVoucherAccountDetail();
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entPurAdvancePaymentNoteList {
  ilistAdvancepaymentNote: any = [];
        
}

export class entPurAdvancePaymentNoteResultSet {
  purAdvancePaymentnoteId = 0;
         purAdvancepaymentnoteRefno = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         status = '';
         paidAmount = '';
         documentDate = '';
         vendorName = '';
         reportingNetAmount = '';
         regionDescription = '';
        
}

export class entPurAdvancePaymentNoteSearch {
  strApnRefNo = '';
         strPurAdvancePurchaseInvoiceId = '';
         lngActFiscalYearId = 0;
         dtmPaidDatefrom = '';
         dtmPaidDateto = '';
         dtmDocumentDatefrom = '';
         dtmDocumentdDateto = '';
         dectotalPricefrom = '';
         dectotalPriceto = '';
         strstatusValue = '';
         strModeValue = '';
         lngActCompanyId = 0;
         lngActVendorId = 0;
         lngActCompanyBranchId = 0;
         lngActVoucherConfigId = 0;
         strenteredby = '';
         enteredDatefrom = '';
         enteredDateto = '';
         strApprovedby = '';
         approvedDatefrom = '';
         approvedDateto = '';
         strVoucherColour = '';
         userLoginID = '';
         istrSortColumn = '';
         istrSortOrder = false;
         strDocCurrency = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         symbolValue = '';
         regionValue = '';
        
}

export class entPurAdvancePaymentNoteSearchResult {
  ilstentPurAdvancePaymentNoteResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entPurAdvancePaymentNoteStatusHistory {
  purAdvancePaymentNoteStatusHistoryId = 0;
         actCompanyId = 0;
         purAdvancePaymentNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         statusDescription = '';
         changedByUsername = '';
         modifiedBy = '';
         updateSeq = 0;
         idoObjState = '';
        
}

export class entPurAttachments {
  purAttachmentsId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         attachmentFileName = '';
         attachmentStatusId = 0;
         attachmentStatusValue = '';
         attachmentSize = '';
         attachementType = '';
         attachementRelativePath = '';
         mailSent = '';
         actCompanyId = 0;
         istringFileContent = '';
         modifiedFullName = '';
         istrFileContent = '';
         modifiedDate = '';
        
}

export class entPurAttachmentsList {
  plstentPurAttachments: any = [];
         msg = new entIEMessage();
        
}

export class entPurNotes {
  purNotesId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         notesDetail = '';
         actCompanyId = 0;
         createdBy = '';
         createdDate = '';
         updateSeq = 0;
         idoObjState = '';
         statusValue = '';
         lstDDLClass: any = [];
         createdFullName = '';
         temporaryDocumentDate = '';
        
}

export class entPurPaymentNote {
  purPaymentNoteId = 0;
         paymentNoteRefNo = '';
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         purPurchaseInvoiceId = 0;
         actVendorId = 0;
         paymentBy = '';
         statusId = 0;
         statusValue = '';
         comments = '';
         approvedBy = '';
         approvedDate = '';
         modeId = 0;
         modeValue = '';
         amount = '';
         paidAmount = '';
         balanceAmount = '';
         paymentDate = '';
         transactionRefNo = '';
         chequeBankName = '';
         chequeNumber = '';
         chequeDate = '';
         chequeAmount = '';
         paymentNoteFilePath = '';
         currencyId = 0;
         currencyValue = '';
         reportingCurrencyId = 0;
         reportingCurrencyValue = '';
         effectiveDate = '';
         enteredBy = '';
         enteredDate = '';
         mailSendCount = 0;
         actVendorBankDetailId = 0;
         actCompanyBranchBankDetailId = 0;
         actVoucherConfigId = 0;
         cashbookLedgerId = 0;
         currencyRate = '';
         documentDate = '';
         vendorLedgerId = 0;
         statusDescription = '';
         iPurPaymentNote: any = [];
         ibusPurPurchaseInvoice = new entPurPurchaseInvoice();
         ilistbusPurPaymentNoteLedgerItems: any = [];
         ilistbusPurPaymentNoteStatusHistory: any = [];
         ilistbusActCurrencyExchangeRate: any = [];
         ilistbusPurPaymentNoteDetail: any = [];
         ilistbusPurNotes: any = [];
         ilistbusPurAttachments: any = [];
         ibusActVendorDetails = new entActVendor();
         ibusActBranch = new entActCompanyBranch();
         ibusActLedger = new entLedger();
         ibusActVoucherConfig = new entActVoucherConfig();
         paymentNoteReceipt = '';
         ibusPurPaymentNoteDetail = new entPurPaymentNoteDetail();
         ibusActCompanyBranchBankDetail = new entActCompanyBranchBankDetail();
         ibusActCurrencyExchangeRate = new entActCurrencyExchangerate();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         sentPurNotes = new entPurNotes();
         strdeletedFlag = '';
         invoiceBalanceAmount = '';
         modeDescription = '';
         taxAmount = '';
         symbolValue = '';
         pnPaidBy = '';
         pnApprovedBy = '';
         strVoucherColour = '';
         alreadyPaidAmount = '';
         toMail = '';
         ccMail = '';
         buttonVisible = false;
         statusChangedBy = '';
         statusChangedDate = '';
         voucherType = '';
         dcInvoiceCurrencyRate = '';
         pentPurAttachments = new entPurAttachments();
         fnEnteredBy = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entPurPaymentNoteDetail {
  appPurPaymentNoteDetailId = 0;
         purPaymentNoteId = 0;
         purPurchaseInvoiceId = 0;
         purCopraPurchaseInvoiceId = 0;
         purPurchaseOrderId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         balanceAmount = '';
         paidAmount = '';
         paidTillDate = '';
         debitAmount = '';
         ibusPurPurchaseInvoice = new entPurPurchaseInvoice();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         strDeleteFlag = '';
         dcInvoiceCurrencyRate = '';
         gain = '';
         loss = '';
        
}

export class entPurPaymentNoteDetailList {
  plstentPurPaymentNoteDetail: any = [];
         msg = new entIEMessage();
        
}

export class entPurPaymentNoteLedgerItems {
  purPaymentNoteLedgerItemsId = 0;
         actCompanyId = 0;
         purPaymentNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ibusActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entPurPaymentNoteSearch {
  strPaymentNoteRefNo = '';
         strActVendorId = '';
         strPurInvoiceId = '';
         strcompanyBranchId = 0;
         dtmentereddatefrom = '';
         dtmentereddateto = '';
         dtmapproveddatefrom = '';
         dtmapproveddateto = '';
         dtmPaiddatefrom = '';
         dtmPaiddateto = '';
         dectotalpricefrom = '';
         dectotalpriceto = '';
         dtmDocumentdatefrom = '';
         dtmDocumentddateto = '';
         strstatusvalue = '';
         lngActCompanyId = 0;
         strmodevalue = '';
         lngActVoucherConfigId = 0;
         enteredBy = '';
         approvedBy = '';
         dcpaidAmountFrom = '';
         dcpaidAmountTo = '';
         symbolValue = '';
         strVoucherColour = '';
         userLoginID = '';
         istrSortColumn = '';
         strDocCurrency = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         istrSortOrder = false;
         regionValue = '';
        
}

export class entPurPaymentNoteSearchResult {
  ilstentPurPaymentNoteSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entPurPaymentNoteSearchResultSet {
  purPaymentnoteId = 0;
         purPaymentnoteRefno = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         documentDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         status = '';
         statusChangedBy = '';
         statusChangedDate = '';
         paidAmount = '';
         vendorName = '';
         reportingCurrencyValue = '';
         reportingAmount = '';
         regionDescription = '';
        
}

export class entPurPaymentNoteStatusHistory {
  purPaymentNoteStatusHistoryId = 0;
         actCompanyId = 0;
         purPaymentNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         statusDescription = '';
         changedByUsername = '';
        
}

export class entPurPurchaseInvoice {
  purPurchaseInvoiceId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         invoiceReferenceNo = '';
         invoiceDate = '';
         vendorAddressId = 0;
         companyShippingAddressId = 0;
         enteredBy = '';
         enteredDate = '';
         preparedBy = '';
         preparedDate = '';
         statusId = 0;
         statusValue = '';
         approvedBy = '';
         approvedDate = '';
         netAmount = '';
         purchaseInvoiceFilePath = '';
         dueDate = '';
         currencyId = 0;
         currencyValue = '';
         comment = '';
         mailSendCount = 0;
         effectiveDate = '';
         shippingVendorId = 0;
         voucherConfigId = 0;
         currencyRate = '';
         documentDate = '';
         vendorReferenceNumber = '';
         totalAfterDiscountLedgerId = 0;
         vendorInvoiceNumber = '';
         paymentDueDate = '';
         transportationMode = '';
         paymentTerm = '';
         docCurrencyValue = '';
         purchaseCash = '';
         pentPurNotes = new entPurNotes();
         pentPurPurchaseInvoiceItem = new entPurPurchaseInvoiceItem();
         ientInventoryGoodsReceivedNotes = new entInvGoodsReceivedNote();
         pentPurPurchaseOrder = new entPurPurchaseOrder();
         ientInvItem = new entInvItem();
         pentPurQuotation = new entPurQuotation();
         pentActVendor = new entActVendor();
         pActBranch = new entActCompanyBranch();
         pActVoucherConfig = new entActVoucherConfig();
         plistentPurAttachments: any = [];
         plistentPurPurchaseInvoiceItem: any = [];
         plistentPurPurchaseInvoiceLedgerItems: any = [];
         plistentPurPurchaseInvoiceStatusHistory: any = [];
         plistentPurNotes: any = [];
         ilstActCurrencyExchangerate: any = [];
         purchaseInvoiceReciept = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         isNeedInventory = '';
         pentPurPurchaseInvoiceLedgerItems = new entPurPurchaseInvoiceLedgerItems();
         ientActExchangeRate = new entExchangeRate();
         plstActBranch: any = [];
         actVendorId = 0;
         statusDescription = '';
         piEnteredby = '';
         piApprovedby = '';
         showbtnForCreatedUser = false;
         symbolValue = '';
         balanceAmount = '';
         noOfDays = 0;
         paidAmount = '';
         iblnInventoryIntegration = false;
         toMail = '';
         ccMail = '';
         advanceAmount = '';
         voucherConfigName = '';
         totalDiscountAmount = '';
         totalCalculatedAmount = '';
         totalAmountAfterDiscount = '';
         totalTaxAmount = '';
         totalNetAmount = '';
         notesDetails = '';
         pentActVoucherAccountDetail = new entActVoucherAccountDetail();
         totalAfterDiscount = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entPurPurchaseInvoiceItem {
  purPurchaseInvoiceItemId = 0;
         actCompanyId = 0;
         purPurchaseOrderId = 0;
         purPurchaseOrderItemId = 0;
         purPurchaseInvoiceId = 0;
         invItemId = 0;
         quantity = '';
         unitTypeId = 0;
         unitTypeValue = '';
         unitPrice = '';
         totalPrice = '';
         vatAmount = '';
         itemDescription = '';
         discountPercentage = '';
         taxAmount = '';
         discountAmount = '';
         batchNumber = '';
         totalAfterDiscount = '';
         taxPercentage = '';
         serviceCode = '';
         grnNumberId = 0;
         grnItemId = 0;
         ientPurPurchaseOrder = new entPurPurchaseOrder();
         ientInvItem = new entInvItem();
         unitTypeDescription = '';
         purchasrOrderRefNo = '';
         grnRefNo = '';
         strDeleteFlag = '';
         availableQuantiy = '';
         rowid = '';
         strItemLedgerName = '';
         itemLedgerId = 0;
         itemRemarks = '';
         msg = new entIEMessage();
         plstentPurPurchaseOrder: any = [];
         pentPurPurchaseOrderItem = new entPurPurchaseOrderItem();
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
         strItemLedgerCode = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         narration = '';
         maximumQuantity = '';
        
}

export class entPurPurchaseInvoiceItemList {
  plstentPurPurchaseInvoiceItem: any = [];
         msg = new entIEMessage();
        
}

export class entPurPurchaseInvoiceLedgerItems {
  purPurchaseInvoiceLedgerItemsId = 0;
         actCompanyId = 0;
         purPurchaseInvoiceId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         pentActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entPurPurchaseInvoiceSearch {
  strPurchaseInvoiceRefNo = '';
         netAmount = '';
         dtmEntereddateFrom = '';
         dtmEntereddateTo = '';
         companyBranchId = '';
         statusvalue = '';
         enteredBy = '';
         lngactVoucherConfigId = 0;
         dtmApproveddateFrom = '';
         dtmApproveddateTo = '';
         approvedBy = '';
         actCompanyId = 0;
         dcnetAmountFrom = '';
         dcnetAmountTo = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         lngActVendorId = 0;
         strDocCurrency = '';
         needInventory = '';
         symbolValue = '';
         currencyValue = '';
         istrSortOrder = false;
         istrSortColumn = '';
         dtmDocumentDateFrom = '';
         dtmDocumentDateTo = '';
         inputVoucherConfigId = 0;
         regionValue = '';
        
}

export class entPurPurchaseInvoiceSearchresult {
  ilstentPurchaseInvoiceSearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entPurPurchaseInvoiceStatusHistory {
  purPurchaseInvoiceStatusHistoryId = 0;
         actCompanyId = 0;
         purPurchaseInvoiceId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         piChangedBy = '';
         statusDescription = '';
        
}

export class entPurPurchaseInvoicelist {
  lstentPurPurchaseInvoice: any = [];
         msg = new entIEMessage();
        
}

export class entPurPurchaseOrder {
  purPurchaseOrderId = 0;
         actCompanyId = 0;
         vendorAddressId = 0;
         actFiscalYearId = 0;
         purchaseOrderNumber = '';
         purchaseOrderFilePath = '';
         poSubject = '';
         enteredBy = '';
         enteredDate = '';
         purPurchaseRequestId = 0;
         purQuotationId = 0;
         statusId = 0;
         statusValue = '';
         actCompanyBranchId = 0;
         approvedBy = '';
         approvedDate = '';
         netAmount = '';
         comment = '';
         totalQuantity = '';
         currencyId = 0;
         currencyValue = '';
         mailSendCount = 0;
         advancePayment = '';
         advancePercentage = '';
         actVendorContactId = 0;
         effectiveDate = '';
         voucherConfigId = 0;
         currencyRate = '';
         vendorId = 0;
         documentDate = '';
         dueDate = '';
         vendorReferenceNumber = '';
         totalAfterDiscountLedgerId = 0;
         docCurreny = '';
         voucherStatusValue = '';
         voucherStatusId = 0;
         statusDescription = '';
         usrEnteredBy = '';
         usrApprovedBy = '';
         currencySymbolValue = '';
         statusName = '';
         orderQuantity = '';
         strVoucherColour = '';
         toMail = '';
         ccMail = '';
         advanceAmount = '';
         purchaseRequestRefNo = '';
         purchaseQuotationRefNo = '';
         totalDiscountAmoun = '';
         totalCalculatedAmount = '';
         totalAmountAfterDiscount = '';
         totalTaxAmount = '';
         totalNetAmount = '';
         isNeedInventory = '';
         iblnIsInventoryIntegration = false;
         showbtnForCreatedUser = false;
         branchViseBtnVisible = false;
         modifiedBy = '';
         updateSeq = '';
         purchaseOrderReciept = '';
         msg = new entIEMessage();
         sentPurNotes = new entPurNotes();
         sentActCompanyBranch = new entActCompanyBranch();
         sPurQuotation = new entPurQuotation();
         sentPurAttachments = new entPurAttachments();
         sentActVendor = new entActVendor();
         sVendorContact = new VendorContact();
         sentActVoucherConfig = new entActVoucherConfig();
         sentPurPurchaseOrderItem = new entPurPurchaseOrderItem();
         lstentPurNotes: any = [];
         ilistbusPurAttachments: any = [];
         lstentPurPurchaseOrderItem: any = [];
         lstentPurPurchaseOrderLedgerItems: any = [];
         ilstActCurrencyExchangerate: any = [];
         lstentPurPurchaseOrderStatusHistory: any = [];
         totalAfterDiscount = '';
         idoObjState = '';
         createdBy = '';
         preVoucherStatus = '';
         pentPurchaseOrderVoucherStatusHistorySearchResult = new entPurchaseOrderVoucherStatusHistorySearchResult();
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entPurPurchaseOrderItem {
  purPurchaseOrderItemId = 0;
         actCompanyId = 0;
         purPurchaseOrderId = 0;
         actCompanyBranchId = 0;
         purQuotationItemId = 0;
         purPurchaseRequestOrderItemId = 0;
         invItemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         unitPrice = '';
         discountPercentage = '';
         discountAmount = '';
         vatAmount = '';
         totalPrice = '';
         dueDate = '';
         shipmentDate = '';
         trackingNumber = '';
         shipmentVendorId = 0;
         itemDescription = '';
         batchNumber = '';
         totalAfterDiscount = '';
         taxPercentage = '';
         serviceCode = '';
         purchaseQuotationId = 0;
         itemRemarks = '';
         modifiedBy = '';
         updateSeq = '';
         unitTypeDescription = '';
         statusDescription = '';
         purchaseQuotationNo = '';
         isNeedCalculation = '';
         strDeleteFlag = '';
         rowid = 0;
         sentInvItem = new entInvItem();
         pentActVendor = new entActVendor();
         ientPurPurchaseOrderItemShippingDetails = new entPurPurchaseOrderItemShippingDetails();
         lstentPurPurchaseOrderItemShippingDetails: any = [];
         msg = new entIEMessage();
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
         idoObjState = '';
         ientPurQuotation = new entPurQuotation();
        
}

export class entPurPurchaseOrderItemList {
  plstentPurPurchaseOrderItem: any = [];
         msg = new entIEMessage();
        
}

export class entPurPurchaseOrderItemShippingDetails {
  purPurchaseOrderItemShippingDetailsId = 0;
         purPurchaseOrderItemId = 0;
         purPurchaseOrderId = 0;
         actCompanyBranchId = 0;
         shipmentVendorId = 0;
         shipmentDate = '';
         trackingNumber = '';
         arrivalDate = '';
         receivedQuantity = 0;
         shipmentStatusId = 0;
         shipmentStatusValue = '';
         shipmentStatusDescription = '';
         ientActVendor = new entActVendor();
         idoObjState = '';
        
}

export class entPurPurchaseOrderLedgerItems {
  purPurchaseOrderLedgerItemsId = 0;
         actCompanyId = 0;
         purPurchaseOrderId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         sCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entPurPurchaseOrderList {
  plstentPurPurchaseOrder: any = [];
         msg = new entIEMessage();
        
}

export class entPurPurchaseOrderSearch {
  strPurchaseOrderNumber = '';
         statusValue = '';
         enteredDateFrom = '';
         enteredDateTo = '';
         documentDateFrom = '';
         documentDateTo = '';
         approvedDateFrom = '';
         approvedDateTo = '';
         approvedBy = '';
         enteredBy = '';
         actCompanyBranchId = 0;
         actCompanyFiscalYearId = 0;
         vendorId = 0;
         actCompanyId = 0;
         actVoucherConfigId = 0;
         voucherName = '';
         shipmentVendorId = 0;
         lngPurchaseQuotationId = 0;
         lngPurchaseRequestId = 0;
         itemCOde = 0;
         strVoucherColour = '';
         strAdvancePayment = '';
         netAmountFrom = '';
         netAmountTo = '';
         userLoginID = '';
         istrSortColumn = '';
         istrSortOrder = false;
         strDocCurrency = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         totalCount = 0;
         inputVoucherConfigId = 0;
         regionValue = '';
        
}

export class entPurPurchaseOrderStatusHistory {
  purPurchaseOrderStatusHistoryId = 0;
         purPurchaseOrderId = 0;
         actCompanyBranchId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         strVoucherColour = '';
         istrSortColumn = '';
         modifiedBy = '';
         updateSeq = '';
         statusDescription = '';
         changedByUsername = '';
         idoObjState = '';
        
}

export class entPurQuotation {
  purQuotationId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         purchaseQuotationRefNo = '';
         purQuotationRequestId = 0;
         purQuotationRequestIssuedId = 0;
         actVendorId = 0;
         vendorAddressId = 0;
         quotationReceivedDate = '';
         preparedDate = '';
         preparedBy = '';
         actCompanyBranchId = 0;
         verifiedBy = '';
         verifiedDate = '';
         statusId = 0;
         statusValue = '';
         comments = '';
         purPurchaseOrderId = 0;
         purchaseQuotationFilePath = '';
         currencyId = 0;
         currencyValue = '';
         actVendorContactId = 0;
         voucherConfigId = 0;
         currencyRate = '';
         docCurreny = '';
         documentDate = '';
         effectiveDate = '';
         netAmount = '';
         vendorReferenceNumber = '';
         pentActNotes = new entActNotes();
         sentPurNotes = new entPurNotes();
         plistentPurNotes: any = [];
         plistentActNotes: any = [];
         plistentPurQuotationItem: any = [];
         penturQuotationItem = new entPurQuotationItem();
         plistentPurQuotationStatusHistory: any = [];
         plistentPurQuotationLedgerItems: any = [];
         msg = new entIEMessage();
         idoObjState = '';
         ientActCompanyBranch = new entActCompanyBranch();
         purchaseQuotationReciept = '';
         statusDescription = '';
         symbolValueDetail = '';
         pqPreparedBy = '';
         pqApprovedBy = '';
         strVoucherColour = '';
         iblnIsInventoryIntegration = '';
         isNeedInventory = '';
         ientPurAttachments = new entPurAttachments();
         ientActVoucherConfig = new entActVoucherConfig();
         ientActVendor = new entActVendor();
         ilstentPurAttachments: any = [];
         ilstentActCurrencyExchangerate: any = [];
         modifiedBy = '';
         updateSeq = '';
         taxAmount = '';
         totalAfterDiscount = '';
         ientPurQuotationItem = new entPurQuotationItem();
         totalNetAmount = '';
         totalTaxAmount = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entPurQuotationItem {
  purQuotationItemId = 0;
         actCompanyId = 0;
         purQuotationId = 0;
         purQuotationRequestItemId = 0;
         invItemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quoteQuantity = 0;
         proposedQuantity = 0;
         unitPrice = '';
         discountedPrice = '';
         discountedPercentage = '';
         totalPrice = '';
         vatAmount = '';
         itemDescription = '';
         batchNumber = '';
         comments = '';
         quantity = '';
         taxPercentage = '';
         totalAfterDiscount = '';
         itemRemarks = '';
         itemCode = '';
         msg = new entIEMessage();
         unitTypeDescription = '';
         itemName = '';
         strDeleteFlag = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientInvItem = new entInvItem();
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
        
}

export class entPurQuotationLedgerItems {
  purQuotationLedgerItemsId = 0;
         actCompanyId = 0;
         purQuotationId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entPurQuotationSearch {
  strPurchaseQuotationRefNo = '';
         lngActVendorId = 0;
         actVoucherConfigId = 0;
         netAmountFrom = '';
         netAmountTo = '';
         preparedDateFrom = '';
         preparedDateTo = '';
         approvedDateFrom = '';
         approvedDateTo = '';
         actCompanyBranchId = '';
         strPreparedBy = '';
         strApprovedBy = '';
         actCompanyId = 0;
         statusValue = '';
         strVoucherColour = '';
         strDocCurrency = '';
         istrSortColumn = '';
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         documentDateFrom = '';
         documentDateTo = '';
         istrSortOrder = false;
         inputVoucherConfigId = 0;
         regionValue = '';
        
}

export class entPurQuotationSearchResult {
  ilstentPurQuotationSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entPurQuotationSearchResultSet {
  purchaseQuotationId = 0;
         purchaseQuotationRefno = '';
         branchName = '';
         vendorName = '';
         voucherName = '';
         preparedBy = '';
         preparedDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         status = '';
         netAmount = '';
         reportingNetAmount = '';
         documentDate = '';
         regionDescription = '';
        
}

export class entPurQuotationStatusHistory {
  purQuotationStatusHistoryId = 0;
         actCompanyId = 0;
         purQuotationId = 0;
         statusId = 0;
         statusValue = '';
         effectiveDate = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         pqChangedBy = '';
        
}

export class entPurchaseInvoiceSearchSet {
  purchaseInvoiceId = 0;
         piNo = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         netAmount = '';
         status = '';
         vendorName = '';
         documentDate = '';
         docCurrencyValue = '';
         reportingAmount = '';
         regionDescription = '';
        
}

export class entPurchaseOrderOutstandingReport {
  vendorName = '';
         purchaseOrderDate = '';
         purchaseOrderNo = '';
         nameOfItem = '';
         unitType = '';
         orderedQuantity = '';
         receivedQuantity = '';
         balanceQuantity = '';
         ratePerItem = '';
         value = '';
         dueDate = '';
         overDueInDays = '';
         stockGroup = '';
         stockType = '';
         stockSubType = '';
         stockCode = '';
         groupName = '';
         ledgerName = '';
         companyId = 0;
         totalQuantity = '';
         currencyvalue = '';
         lstentPurchaseOrderOutstandingReportVoucherDetail: any = [];
         purchaseOrderItemId = 0;
        
}

export class entPurchaseOrderOutstandingReportDetail {
  decTotalOrderQuantity = '';
         decTotalReceivedQuantity = '';
         decTotalBalanceQuantity = '';
         decTotalValue = '';
         fromDate = '';
         toDate = '';
         vendorId = 0;
         companyId = 0;
         companyBranchId = 0;
         itemTypeId = 0;
         itemCategoryId = 0;
         itemSubTypeId = 0;
         itemId = 0;
         itemCode = '';
         orderNo = '';
         userLoginID = '';
         fiscalYearId = 0;
         lstentPurchaseOrderOutstandingReport: any = [];
         purchaseOrderNo = '';
         purchaseOrderItemId = 0;
         nameOfItem = '';
         totalQuantity = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entPurchaseOrderOutstandingReportVoucherDetail {
  voucherType = '';
         branchName = '';
         voucherName = '';
         voucherNumber = '';
         voucherDate = '';
         quantity = '';
         unit = '';
        
}

export class entPurchaseOrderOutstandingReportVoucherDetailList {
  lstentPurchaseOrderOutstandingReportVoucherDetail: any = [];
        
}

export class entPurchaseOrderSearchResultSet {
  ilstentPurchaseOrderSearchResultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entPurchaseOrderSearchSet {
  purchaseOrderId = 0;
         purchaseOrderNo = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         purchaseOrderAmount = '';
         status = '';
         vendorname = '';
         documentdate = '';
         reportingNetAmount = '';
         regionDescription = '';
        
}

export class entPurchaseOrderVoucherStatusHistorySearch {
  purPurchaseOrderId = 0;
         istrSortColumn = '';
         istrSortOrder = '';
         pageSize = 0;
         pageNumber = 0;
        
}

export class entPurchaseOrderVoucherStatusHistorySearchResult {
  ilstentPurchaseOrderVoucherStatusHistorySearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entPurchaseOrderVoucherStatusHistorySearchSet {
  purPurchaseOrderVoucherStatusHistoryId = 0;
         purPurchaseOrderId = 0;
         effectiveDate = '';
         changedByFullName = '';
         statusDescription = '';
        
}

export class entPurchaseReport {
  fromDate = '';
         toDate = '';
         agingDate = '';
         currencyValue = '';
         vendorOpenningBalance = '';
         vendorId = 0;
         companyId = 0;
         companyBranchId = 0;
         currentFiscalYearId = 0;
         fiscalYearId = 0;
         typeId = 0;
         itemId = 0;
         orderNo = '';
         voucherStatus = '';
         userLoginID = '';
         reportResult = '';
         voucherConfigId = 0;
         refNo = '';
         companyName = '';
         companyAddress1 = '';
         companyAddress2 = '';
         generatedDateTime = '';
         plstentCreditorsSummary: any = [];
         pentCreditorsAmountSummary = new entCreditorsAmountSummary();
         pentCreditorsVouchers: any = [];
         pentCreditorsAmountGrantTotal = new entCreditorsAmountSummary();
         plstentPurchaseVendorAccountDebtorsReport: any = [];
         pentCreditorsSummary = new entCreditorsSummary();
         msg = new entIEMessage();
         strResultExcel = '';
         errorMsg = '';
         vendarName = '';
         vendorCode = '';
         vendorCurrency = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entSalAdvanceReceiptNote {
  salAdvanceReceiptNoteId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         salProformaInvoiceId = 0;
         actCustomerId = 0;
         advanceReceiptNoteRefNo = '';
         receiptDate = '';
         receiptBy = '';
         statusId = 0;
         statusValue = '';
         paymentBy = '';
         approvedBy = '';
         approvedDate = '';
         comments = '';
         effectiveDate = '';
         enteredBy = '';
         enteredDate = '';
         modeId = 0;
         advanceReceiptNoteFilePath = '';
         modeValue = '';
         advanceToBePaid = '';
         receivedAmount = '';
         balanceAmount = '';
         receivedDate = '';
         transactionRefNo = '';
         chequeBankName = '';
         chequeNumber = '';
         chequeDate = '';
         currencyRate = '';
         chequeAmount = '';
         mailSendCount = 0;
         actVoucherConfigId = 0;
         currencyId = 0;
         currencyValue = '';
         actCompanyBranchBankDetailId = 0;
         cashbookLedgerId = 0;
         reportingCurrencyId = 0;
         reportingCurrencyValue = '';
         documentDate = '';
         docCurreny = '';
         customerLedgerId = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         lstentSalAdvanceReceiptNoteDetail: any = [];
         lstentSalAdvanceReceiptNoteLedgerItems: any = [];
         lstentSalAdvanceReceiptNoteStatusHistory: any = [];
         lstentSalAttachments: any = [];
         lstentSalNotes: any = [];
         lstentActCurrencyExchangerate: any = [];
         iActBranch = new entActCompanyBranch();
         pActCustomerDetails = new entActCustomerDetails();
         iActVoucherConfig = new entActVoucherConfig();
         iActLedger = new entLedger();
         iActCurrencyExchangerate = new entActCurrencyExchangerate();
         advanceReceiptNoteReciept = '';
         ientSalAdvanceReceiptNoteDetail = new entSalAdvanceReceiptNoteDetail();
         branchDescription = '';
         modeDescription = '';
         receiptByUsername = '';
         approvedByUsername = '';
         advancedReceivedAmount = '';
         taxAmount = '';
         arnPaidBy = '';
         arnApprovedBy = '';
         strVoucherColour = '';
         ccMail = '';
         symbolValue = '';
         currencySymbolValue = '';
         enteredByUsername = '';
         toMail = '';
         buttonVisible = '';
         statusChangedBy = '';
         statusChangedDate = '';
         ientSalSalesInvoice = new entSalSalesInvoice();
         msg = new entIEMessage();
         iCustomerActLedger = new entLedger();
         pentSalNotes = new entSalNotes();
         createdBy = '';
         ientActCompanyBranchBankDetail = new entActCompanyBranchBankDetail();
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entSalAdvanceReceiptNoteDetail {
  salAdvanceReceiptNoteDetailId = 0;
         salAdvanceReceiptNoteId = 0;
         salSalesInvoiceId = 0;
         salSalesOrderId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         balanceAmount = '';
         advancePercentage = '';
         balancePaidAmount = '';
         previousPaidAmount = '';
         advancePayment = '';
         receivedAmount = '';
         receivedTillDate = '';
         creditAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ibusSalesOrder = new entSalSalesOrder();
         ibusSalesInvoice = new entSalSalesInvoice();
         strDeleteFlag = '';
        
}

export class entSalAdvanceReceiptNoteDetailList {
  plstentSalAdvanceReceiptNoteDetail: any = [];
         msg = new entIEMessage();
        
}

export class entSalAdvanceReceiptNoteLedgerItems {
  salAdvanceReceiptNoteLedgerItemsId = 0;
         actCompanyId = 0;
         salAdvanceReceiptNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entSalAdvanceReceiptNoteSearch {
  strAdvanceReceiptNoteRefNo = '';
         customerName = '';
         strbranchId = '';
         dtmApprovedDatefrom = '';
         dtmApprovedDateto = '';
         dtmEnteredDatefrom = '';
         dtmEnteredDateto = '';
         strEnteredby = '';
         dectotalPricefrom = '';
         dectotalPriceto = '';
         strstatusValue = '';
         strDocCurrency = '';
         strApprovedBy = '';
         orderByColumnName = '';
         ascending = false;
         actVoucherConfigId = 0;
         pageSize = 0;
         pageNumber = 0;
         lngActcustomerId = 0;
         documentDateFrom = '';
         documentDateTo = '';
         regionValue = '';
        
}

export class entSalAdvanceReceiptNoteSearchSet {
  saladvancereceiptnoteid = 0;
         advancereceiptnoterefno = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         documentDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyname = '';
         receivedamount = '';
         statusdescription = '';
         currencyValue = '';
         customerName = '';
         receivedRepotingAmount = '';
         regionDescription = '';
        
}

export class entSalAdvanceReceiptNoteSearchresultSet {
  lstentSalAdvanceReceiptNoteSearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entSalAdvanceReceiptNoteStatusHistory {
  salAdvanceReceiptNoteStatusHistoryId = 0;
         actCompanyId = 0;
         salAdvanceReceiptNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByUsername = '';
        
}

export class entSalAdvanceReceiptNotelist {
  lstSalAdvanceReceiptNote: any = [];
        
}

export class entSalAttachments {
  salAttachmentsId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         attachmentFileName = '';
         attachmentStatusId = 0;
         attachmentStatusValue = '';
         attachmentSize = '';
         attachementType = '';
         attachementRelativePath = '';
         mailSent = '';
         actCompanyId = 0;
         istrFileContent = '';
         istringFileContent = '';
         modifiedByFullName = '';
         createdDate = '';
        
}

export class entSalAttachmentsList {
  plstentSalAttachments: any = [];
         msg = new entIEMessage();
        
}

export class entSalNotes {
  salNotesId = 0;
         referenceTypeId = 0;
         referenceTypeValue = '';
         referenceId = 0;
         notesDetail = '';
         actCompanyId = 0;
         createdBy = '';
         createdDate = '';
         updateSeq = 0;
         idoObjState = '';
         statusValue = '';
         lstDDLClass: any = [];
         createdFullName = '';
         temporaryDocumentDate = '';
        
}

export class entSalReceiptNote {
  salReceiptNoteId = 0;
         receiptNoteRefNo = '';
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actCompanyBranchBankDetailId = 0;
         actFiscalYearId = 0;
         salSalesInvoiceId = 0;
         actCustomerId = 0;
         receiptDate = '';
         receiptBy = '';
         statusId = 0;
         statusValue = '';
         comments = '';
         enteredBy = '';
         enteredDate = '';
         modeId = 0;
         modeValue = '';
         amount = '';
         receivedAmount = '';
         balanceAmount = '';
         receivedDate = '';
         transactionRefNo = '';
         chequeBankName = '';
         chequeNumber = '';
         chequeDate = '';
         chequeAmount = '';
         receiptNoteFilePath = '';
         currencyId = 0;
         currencyValue = '';
         mailSendCount = 0;
         effectiveDate = '';
         documentDate = '';
         actVoucherConfigId = 0;
         cashbookLedgerId = 0;
         currencyRate = '';
         reportingCurrencyId = 0;
         reportingCurrencyValue = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         modeDescription = '';
         enteredByUsername = '';
         voucherType = '';
         taxAmount = '';
         strVoucherColour = '';
         alreadyReceivedAmount = '';
         currencySymbolValue = '';
         receivedByUsername = '';
         toMail = '';
         ccMail = '';
         voucherConfigName = '';
         statusChangedBy = '';
         statusChangedDate = '';
         dcinvoiceCurrencyrate = '';
         userLoginID = '';
         companyId = 0;
         buttonVisible = false;
         lstentSalReceiptNoteDetail: any = [];
         lstentSalReceiptNoteLedgerItems: any = [];
         lstentSalReceiptNoteStatusHistory: any = [];
         lstentSalAttachments: any = [];
         lstentSalNotes: any = [];
         lstentActCurrencyExchangerate: any = [];
         iActBranch = new entActCompanyBranch();
         iActCustomerDetails = new entActCustomerDetails();
         iActVoucherConfig = new entActVoucherConfig();
         iActLedger = new entLedger();
         iActCurrencyExchangerate = new entActCurrencyExchangerate();
         iSalReceiptNoteDetail = new entSalReceiptNoteDetail();
         iActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
         iSalSalesInvoice = new entSalSalesInvoice();
         receiptNoteReciept = '';
         pentSalReceiptNoteDetail = new entSalReceiptNoteDetail();
         approvedBy = '';
         approvedDate = '';
         pentActCompanyBranchBankDetail = new entActCompanyBranchBankDetail();
         msg = new entIEMessage();
         pentSalNotes = new entSalNotes();
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entSalReceiptNoteDetail {
  salReceiptNoteDetailId = 0;
         salReceiptNoteId = 0;
         salSalesInvoiceId = 0;
         salSalesOrderId = 0;
         actCompanyId = 0;
         actCompanyBranchId = 0;
         actFiscalYearId = 0;
         balanceAmount = '';
         receivedAmount = '';
         receivedTillDate = '';
         creditAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         strDeleteFlag = '';
         ibusSalesInvoice = new entSalSalesInvoice();
         ibusSalesOrder = new entSalSalesOrder();
         dcInvoiceRate = '';
         dcInvoiceCurrencyRate = '';
         gain = '';
         loss = '';
        
}

export class entSalReceiptNoteDetailList {
  plstentSalReceiptNoteDetail: any = [];
         msg = new entIEMessage();
        
}

export class entSalReceiptNoteLedgerItems {
  salReceiptNoteLedgerItemsId = 0;
         actCompanyId = 0;
         salReceiptNoteId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entSalReceiptNoteSearch {
  strReceiptNoteRefNo = '';
         strSalesreceiptId = 0;
         lngActcustomerId = 0;
         strSalesInvoiceId = 0;
         strActCompanybranchId = 0;
         dtmEnteredDatefrom = '';
         dtmEnteredDateto = '';
         dtmapproveddatefrom = '';
         dtmDocumentDateto = '';
         dtmDocumentDatefrom = '';
         dtmapproveddateto = '';
         dtmReceiptDatefrom = '';
         dtmReceiptDateto = '';
         dectotalPricefrom = '';
         dectotalPriceto = '';
         strstatusValue = '';
         strModeValue = '';
         lngActCompanyId = 0;
         actVoucherConfigId = 0;
         strEnteredby = '';
         strDocCurrency = '';
         strReceiptby = '';
         strapprovedby = '';
         strVoucherColour = '';
         symbolValue = '';
         userLoginID = '';
         istrSortColumn = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
         istrSortOrder = false;
         regionValue = '';
        
}

export class entSalReceiptNoteSearchSet {
  salesReceiptnoteId = 0;
         salesInvoiceId = 0;
         receiptnoterefno = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         documentDate = '';
         currencyName = '';
         receiptamount = '';
         statuschangedby = '';
         statuschangeddate = '';
         status = '';
         customerName = '';
         istrSortOrder = false;
         currencyValue = '';
         reportingAmount = '';
         regionDescription = '';
        
}

export class entSalReceiptNoteSearchresultSet {
  lstSalReceiptNoteSearchresultSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entSalReceiptNoteStatusHistory {
  salReceiptNoteStatusHistoryId = 0;
         actCompanyId = 0;
         salReceiptNoteId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByUsername = '';
        
}

export class entSalSalesInvoice {
  salSalesInvoiceId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         saleOrderId = 0;
         actCustomerId = 0;
         saleInvoiceReferenceNo = '';
         statusId = 0;
         statusValue = '';
         invoiceGeneratedBy = '';
         invoiceGeneratedDate = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         comments = '';
         netAmount = '';
         customerBillingAddressId = 0;
         customerShippingAddressId = 0;
         dueDate = '';
         currencyId = 0;
         currencyValue = '';
         mailSendCount = 0;
         effectiveDate = '';
         actCustomerContactId = 0;
         invoiceFilePath = '';
         appActVoucherConfigId = 0;
         currencyRate = '';
         fromBranch = 0;
         documentDate = '';
         customerReferenceNumber = '';
         totalAfterDiscountLedgerId = 0;
         docCurrencyValue = '';
         salesCash = '';
         paymentTermOption = '';
         transportationMode = '';
         paymentModeId = 0;
         paymentModeValue = '';
         isExport = '';
         isB2BTransaction = '';
         pActCustomerDetails = new entActCustomerDetails();
         pActBranch = new entActCompanyBranch();
         pActVoucherConfig = new entActVoucherConfig();
         pentSalSalesOrder = new entSalSalesOrder();
         pentSalSalesInvoiceItem = new entSalSalesInvoiceItem();
         pentSalNotes = new entSalNotes();
         plistentSalSalesInvoiceItem: any = [];
         plistentSalSalesInvoiceLedgerItems: any = [];
         plistentSalSalesInvoiceStatusHistory: any = [];
         plistSalNotes: any = [];
         plistSalAttachments: any = [];
         salesInvoiceReciept = '';
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         pilstActCurrencyExchangerate: any = [];
         pentActCurrencyExchangerate = new entActCurrencyExchangerate();
         statusDescription = '';
         pentActExchangeRate = new entExchangeRate();
         paymentModeDescription = '';
         enteredByUsername = '';
         invoiceApprovedBy = '';
         symbolValue = '';
         strVoucherColour = '';
         paidAmount = '';
         balanceAmount = '';
         toMail = '';
         ccMail = '';
         isNeedInventory = '';
         isVmsRequired = '';
         iblnIsInventoryIntegration = false;
         resultdata = '';
         pentInvItem = new entInvItem();
         totalAfterDiscount = '';
         totalNetAmount = '';
         totalTaxAmount = '';
         transportationModeId = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
         crmCustomerId = 0;
         crmCustomerName = '';
         crmCustomerShippingAddressId = 0;
         applicationTypeId = 0;
         applicationTypeValue = '';
         applicationId = 0;
         applicationReferenceNo = '';
         applicationTypeDescription = '';
        
}

export class entSalSalesInvoiceItem {
  salSalesInvoiceItemId = 0;
         actCompanyId = 0;
         saleSalesInvoiceId = 0;
         itemId = 0;
         batchNumber = '';
         description = '';
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         unitPrice = '';
         discountAmount = '';
         discountPercentage = '';
         discountValue = '';
         totalAfterDiscount = '';
         taxPercentage = '';
         vatAmount = '';
         totalPrice = '';
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
         itemDescription = '';
         appSalSalesOrderId = 0;
         appInvGdnId = 0;
         salSalesOrderItemId = 0;
         invGdnStockOutItemId = 0;
         invGoodsDeliveryNoteItemId = 0;
         itemLedgerId = 0;
         itemRemarks = '';
         taxCodeValue = '';
         ientSalSalesOrder = new entSalSalesOrder();
         updateSeq = '';
         idoObjState = '';
         pentInvItem = new entInvItem();
         pentInvGoodsDeliveryNote = new entInvGoodsDeliveryNote();
         itemLedgerName = '';
         itemLedgerCode = '';
         narration = '';
         maximumQuantity = '';
         strDeleteFlag = '';
        
}

export class entSalSalesInvoiceItemList {
  plstentSalSalesInvoiceItem: any = [];
         msg = new entIEMessage();
        
}

export class entSalSalesInvoiceLedgerItems {
  salSalesInvoiceLedgerItemsId = 0;
         actCompanyId = 0;
         salSalesInvoiceId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
         updateSeq = '';
         idoObjState = '';
        
}

export class entSalSalesInvoiceResult {
  ilstentSalesInvoiceSearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entSalSalesInvoiceSearch {
  strSiRefNo = '';
         lngActcustomerId = 0;
         strbranchId = '';
         dtmEnteredDatefrom = '';
         dtmEnteredDateto = '';
         dtmApprovedDatefrom = '';
         dtmApprovedDateto = '';
         strstatusValue = '';
         strEnteredby = '';
         strDocCurrency = '';
         netAmountFrom = '';
         netAmountTo = '';
         customerName = '';
         strApprovedby = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         lngAppActVoucherConfigId = 0;
         orderByColumnName = '';
         ascending = false;
         needInventory = '';
         documentDateFrom = '';
         documentDateTo = '';
         istrSortOrder = false;
         istrSortColumn = '';
         inputVoucherConfigId = 0;
         regionValue = '';
        
}

export class entSalSalesInvoiceStatusHistory {
  salSalesInvoiceStatusHistoryId = 0;
         actCompanyId = 0;
         salSalesInvoiceId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByUsername = '';
        
}

export class entSalSalesInvoicelist {
  lstentSalesInvoicAutoComplete: any = [];
        
}

export class entSalSalesOrder {
  salSalesOrderId = 0;
         actCompanyId = 0;
         actFiscalYearId = 0;
         saleOrderReferenceNo = '';
         salCustomerQuotationId = 0;
         actCustomerId = 0;
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         requestedDate = '';
         actCompanyBranchId = 0;
         statusId = 0;
         statusValue = '';
         advancePayment = '';
         customerPurchaseOrderRefNo = '';
         customerBillingAddressId = 0;
         customerShippingAddressId = 0;
         orderFilePath = '';
         currencyId = 0;
         currencyValue = '';
         advancePercentage = '';
         netAmount = '';
         mailSendCount = 0;
         effectiveDate = '';
         actCustomerContactId = 0;
         appActVoucherConfigId = 0;
         currencyRate = '';
         documentDate = '';
         dueDate = '';
         docCurreny = '';
         customerReferenceNumber = '';
         totalAfterDiscountLedgerId = 0;
         comments = '';
         voucherStatusValue = '';
         voucherStatusId = 0;
         isExport = '';
         isB2BTransaction = '';
         paymentModeId = 0;
         paymentModeValue = '';
         ilstentSalSalesOrderItem: any = [];
         ilstentSalSalesOrderLedgerItems: any = [];
         ilstentSalSalesOrderStatusHistory: any = [];
         ilstSalNotes: any = [];
         ilstSalAttachments: any = [];
         ientSalSalesOrderItem = new entSalSalesOrderItem();
         lstSalSalesOrder: any = [];
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         quotationDate = '';
         totalItem = 0;
         totalQuantity = '';
         symbolValueDetail = '';
         soEnteredBy = '';
         soApprovedBy = '';
         strVoucherColour = '';
         shipmentDate = '';
         iblnIsInventoryIntegration = '';
         currencyDescription = '';
         advanceAmount = '';
         toMail = '';
         ccMail = '';
         isNeedInventory = '';
         isVmsRequired = '';
         ientCustomerContact = new entCustomerContact();
         ientSalSalesQuotation = new entSalSalesQuotation();
         ientActCompanyBranch = new entActCompanyBranch();
         ientActCustomerDetails = new entActCustomerDetails();
         ientActVoucherConfig = new entActVoucherConfig();
         ientActCurrencyExchangerate: any = [];
         ientInvItem = new entInvItem();
         totalAfterDiscount = '';
         totalNetAmount = '';
         msg = new entIEMessage();
         totalTaxAmount = '';
         pentSalNotes = new entSalNotes();
         createdBy = '';
         preVoucherStatus = '';
         pentSalesOrderVoucherStatusHistorySearchResult = new entSalesOrderVoucherStatusHistorySearchResult();
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entSalSalesOrderItem {
  salSalesOrderItemId = 0;
         actCompanyId = 0;
         salSalesOrderId = 0;
         salSalesQuotationId = 0;
         invItemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         quantity = '';
         unitPrice = '';
         discountPercentage = '';
         totalAfterDiscount = '';
         discountAmount = '';
         vatAmount = '';
         totalPrice = '';
         dueDate = '';
         batchNumber = '';
         shipmentDate = '';
         trackingNumber = '';
         shipmentVendorId = 0;
         shipmentVendorName = '';
         gdnRefNumber = '';
         invGoodsDeliveryNoteId = 0;
         invGdnStockOutItemId = 0;
         itemDescription = '';
         taxPercentage = '';
         salSalesQuotationItemId = 0;
         serviceCode = '';
         itemRemarks = '';
         taxCodeValue = '';
         updateSeq = '';
         idoObjState = '';
         unitTypeDescription = '';
         strDeleteFlag = '';
         msg = new entIEMessage();
         itemnameandcode = '';
         rowid = 0;
         ientInvItem = new entInvItem();
         ientSalSalesQuotation = new entSalSalesQuotation();
         ientSalSalesOrderItemShippingDetails = new entSalSalesOrderItemShippingDetails();
         ilstSalSalesOrderItemShippingDetails: any = [];
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
        
}

export class entSalSalesOrderItemList {
  plstentSalSalesOrderItem: any = [];
         msg = new entIEMessage();
        
}

export class entSalSalesOrderItemShippingDetails {
  salSalesOrderItemShippingDetailsId = 0;
         salSalesOrderItemId = 0;
         actCompanyBranchId = 0;
         shipmentVendorId = 0;
         shipmentDate = '';
         trackingNumber = '';
         expectedArrivalDate = '';
         shipmentStatusId = 0;
         shipmentStatusValue = '';
         vendorGdnNo = '';
         dispatchedQty = '';
         updateSeq = '';
         idoObjState = '';
        
}

export class entSalSalesOrderLedgerItems {
  salSalesOrderLedgerItemsId = 0;
         actCompanyId = 0;
         salSalesOrderId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         updateSeq = '';
         idoObjState = '';
         ientActCompanyVoucherAccountDetail = new entActCompanyVoucherAccountDetail();
        
}

export class entSalSalesOrderList {
  plstentSalSalesOrder: any = [];
         msg = new entIEMessage();
        
}

export class entSalSalesOrderSearch {
  strSalesOrderReferenceNo = '';
         lngActcustomerId = 0;
         customerName = '';
         enteredDatefrom = '';
         enteredDateto = '';
         actCompanyBranchId = '';
         totalPricefrom = '';
         totalPriceto = '';
         statusValue = '';
         actCompanyId = 0;
         strenteredby = '';
         approvedDatefrom = '';
         approvedDateto = '';
         netAmountFrom = '';
         netAmountTo = '';
         strApprovedby = '';
         strDocCurrency = '';
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         appActVoucherConfigId = 0;
         orderByColumnName = '';
         ascending = false;
         documentDate = '';
         needInventory = '';
         documentDateFrom = '';
         documentDateTo = '';
         isortorder = false;
         istrSortColumn = '';
         salesInvoiceVoucherConfigId = 0;
         voucherType = '';
         regionValue = '';
        
}

export class entSalSalesOrderSearchResult {
  ilistentSalesOrderSearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entSalSalesOrderStatusHistory {
  salSalesOrderStatusHistoryId = 0;
         actCompanyId = 0;
         salSalesOrderId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         soChangedBy = '';
         changedByUsername = '';
        
}

export class entSalSalesQuotation {
  salSalesQuotationId = 0;
         customerQuotationRefNo = '';
         actCompanyId = 0;
         salCustomerQuotationRequestId = 0;
         preparedDate = '';
         preparedBy = '';
         checkedDate = '';
         checkedBy = '';
         actCustomerId = 0;
         sentDate = '';
         sentBy = '';
         statusId = 0;
         statusValue = '';
         actCompanyBranchId = 0;
         quotationDate = '';
         previousSalQuotationId = 0;
         comments = '';
         quotationFilePath = '';
         quotationExpiryDate = '';
         customerAreaId = 0;
         customerAreaValue = '';
         paymentTerm = 0;
         validityPeriod = 0;
         addItemImage = '';
         currencyId = 0;
         currencyValue = '';
         actCustomerContactId = 0;
         actFiscalYearId = 0;
         appActVoucherConfigId = 0;
         currencyRate = '';
         customerReferenceNumber = '';
         docCurreny = '';
         documentDate = '';
         effectiveDate = '';
         mailSendCount = 0;
         totalAfterDiscountLedgerId = 0;
         netAmount = '';
         pentSalNotes = new entSalNotes();
         pentSalSalesQuotationItem = new entSalSalesQuotationItem();
         plistentSalNotes: any = [];
         plistSalSalesQuotationItem: any = [];
         plistSalSalesQuotationLedgerItems: any = [];
         plistSalSalesQuotationStatusHistory: any = [];
         plistSalAttachments: any = [];
         plistActCurrencyExchangerate: any = [];
         ientCustomerContact = new entCustomerContact();
         ientActCustomerDetails = new entActCustomerDetails();
         iActBranch = new entActCompanyBranch();
         iActVoucherConfig = new entActVoucherConfig();
         msg = new entIEMessage();
         updateSeq = '';
         idoObjState = '';
         ientActVoucherAccountDetail = new entActVoucherAccountDetail();
         statusDescription = '';
         newQuotation = '';
         statusChangedBy = '';
         symbolValue = '';
         cqPreparedBy = '';
         cqSentBy = '';
         cqApprovedBy = '';
         toEmailId = '';
         customerAreaDescription = '';
         ccMailId = '';
         vstrVoucherColour = '';
         isNeedInventory = '';
         iblnIsInventoryIntegration = false;
         totalAfterDiscount = '';
         totalNetAmount = '';
         totalTaxAmount = '';
         createdBy = '';
         regionId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entSalSalesQuotationItem {
  salSalesQuotationItemId = 0;
         actCompanyId = 0;
         salSalesQuotationId = 0;
         salCustomerQuotationRequestItemId = 0;
         invItemId = 0;
         unitTypeId = 0;
         unitTypeValue = '';
         requestedQuantity = '';
         proposedQuantity = '';
         unitPrice = '';
         totalPrice = '';
         vatAmount = '';
         discountPercentage = '';
         discountPrice = '';
         comments = '';
         itemDescription = '';
         batchNumber = '';
         quantity = '';
         taxPercentage = '';
         totalAfterDiscount = '';
         itemRemarks = '';
         updateSeq = '';
         idoObjState = '';
         pentInvItem = new entInvItem();
         unitTypeDescription = '';
         symbolValue = '';
         strDeleteFlag = '';
         itemnameandcode = '';
         msg = new entIEMessage();
         totalPriceReportingCurrency = '';
         totalAfterDiscountReportingCurrency = '';
        
}

export class entSalSalesQuotationLedgerItems {
  salSalesQuotationLedgerItemsId = 0;
         actCompanyId = 0;
         salSalesQuotationId = 0;
         actCompanyVoucherAccountDetailId = 0;
         percentage = '';
         ledgerAmount = '';
         indexNumber = 0;
         addReduceEffectId = 0;
         addReduceEffectValue = '';
         updateSeq = '';
         idoObjState = '';
         ientActVoucherAccountDetail = new entActVoucherAccountDetail();
         msg = new entIEMessage();
        
}

export class entSalSalesQuotationList {
  plstentSalSalesQuotation: any = [];
         msg = new entIEMessage();
        
}

export class entSalSalesQuotationSearch {
  strSalesQuotationReferenceNo = '';
         strbranchvalue = '';
         strpreparedatefrom = '';
         strprepareddateto = '';
         strpreparedby = '';
         strStatusValue = '';
         actCompanyId = 0;
         strverifieddatefrom = '';
         strVerifieddateto = '';
         strVerifieddby = '';
         strActCustomerId = 0;
         strDocCurrency = '';
         totalPricefrom = '';
         totalPriceto = '';
         appActVoucherConfigId = 0;
         strVoucherColour = '';
         strSortValue = '';
         blnSort = false;
         symbolValueDetail = '';
         istrSortColumn = '';
         isortorder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         actFiscalYearId = 0;
         actCompanyBranchId = 0;
         documentDate = '';
         needInventory = '';
         documentDateFrom = '';
         documentDateTo = '';
         salesOrderVoucherConfigId = 0;
         regionValue = '';
        
}

export class entSalSalesQuotationSearchResult {
  ilstentSalSalesQuotationSearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         modifiedBy = '';
        
}

export class entSalSalesQuotationSearchSet {
  salesQuotationId = 0;
         salesQuotationRefNo = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         netAmount = '';
         status = '';
         customerName = '';
         documentDate = '';
         reportingNetAmount = '';
         regionDescription = '';
        
}

export class entSalSalesQuotationStatusHistory {
  salSalesQuotationStatusHistoryId = 0;
         actCompanyId = 0;
         salSalesQuotationId = 0;
         effectiveDate = '';
         statusId = 0;
         statusValue = '';
         changedBy = '';
         updateSeq = '';
         idoObjState = '';
         statusDescription = '';
         changedByFullName = '';
         cqChangedby = '';
        
}

export class entSaleReport {
  fromDate = '';
         toDate = '';
         agingDate = '';
         currencyValue = '';
         cusShipppingAddressId = 0;
         customerOpenningBalance = '';
         companyId = 0;
         companyBranchId = 0;
         currentFiscalYearId = 0;
         fiscalYearId = 0;
         typeId = 0;
         orderNo = '';
         voucherStatus = '';
         userLoginID = '';
         reportResult = '';
         voucherConfigId = 0;
         refNo = '';
         customerId = 0;
         companyName = '';
         companyAddress1 = '';
         companyAddress2 = '';
         generatedDateTime = '';
         customerFullAddress = '';
         customerName = '';
         itemname = '';
         unittype = '';
         branchname = '';
         shippingAddress = '';
         saleReportExcelFileContent = '';
         saleReportExcelFileContentBase64 = '';
         lentSaleReport: any = [];
         errorMsg = '';
         itemId = 0;
         regionValue = '';
         regionDescription = '';
        
}

export class entSalesInvoicAutoComplete {
  salSalesInvoiceId = 0;
         saleInvoiceReferenceNo = '';
        
}

export class entSalesInvoiceSearchSet {
  salesInvoiceId = 0;
         salesInvoiceRefNo = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         purchaseOrderAmount = '';
         status = '';
         netAmount = '';
         customerName = '';
         docCurrencyValue = '';
         reportingAmount = '';
         documentDate = '';
         regionDescription = '';
        
}

export class entSalesOrderOutstandingReportDetails {
  decTotalOrderQuantity = '';
         decTotalDispatchedQuantity = '';
         decTotalBalanceQuantity = '';
         decTotalValue = '';
         fromDate = '';
         toDate = '';
         customerId = 0;
         companyId = 0;
         companyBranchId = 0;
         itemTypeId = 0;
         itemCategoryId = 0;
         itemSubTypeId = 0;
         itemId = 0;
         itemCode = '';
         orderNo = '';
         userLoginID = '';
         fiscalYearId = 0;
         plstentSalesOrderOutstandingsReport: any = [];
         msg = new entIEMessage();
         salesOrderNo = '';
         salesOrderItemId = 0;
         nameOfItem = '';
         totalQuantity = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entSalesOrderOutstandingReportVoucherDetail {
  voucherType = '';
         branchName = '';
         voucherName = '';
         voucherNumber = '';
         voucherDate = '';
         quantity = '';
         unit = '';
         msg = new entIEMessage();
        
}

export class entSalesOrderOutstandingReportVoucherDetailList {
  lstentSalesOrderOutstandingReportVoucherDetail: any = [];
        
}

export class entSalesOrderOutstandingsReport {
  customerName = '';
         salesOrderDate = '';
         salesOrderNo = '';
         nameOfItem = '';
         unitType = '';
         orderedQuantity = '';
         dispatchedQuantity = '';
         balanceQuantity = '';
         ratePerItem = '';
         value = '';
         dueDate = '';
         overDueInDays = '';
         stockGroup = '';
         stockType = '';
         stockSubType = '';
         stockCode = '';
         groupName = '';
         ledgerName = '';
         totalQuantity = '';
         currencyvalue = '';
         plstentSalesOrderOutstandingReportVoucherDetail: any = [];
         msg = new entIEMessage();
         salesOrderItemId = 0;
        
}

export class entSalesOrderSearchSet {
  salesOrderId = 0;
         salesOrderNo = '';
         branchName = '';
         voucherName = '';
         enteredBy = '';
         enteredDate = '';
         approvedBy = '';
         approvedDate = '';
         currencyName = '';
         netAmount = '';
         status = '';
         documentDate = '';
         customerName = '';
         reportingNetAmount = '';
         regionDescription = '';
        
}

export class entSalesOrderVoucherStatusHistorySearch {
  salSalesOrderId = 0;
         istrSortColumn = '';
         istrSortOrder = '';
         pageSize = 0;
         pageNumber = 0;
        
}

export class entSalesOrderVoucherStatusHistorySearchResult {
  ilstentSalesOrderVoucherStatusHistorySearchSet: any = [];
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
        
}

export class entSalesOrderVoucherStatusHistorySearchSet {
  salSalesOrderVoucherStatusHistoryId = 0;
         salSalesOrderId = 0;
         effectiveDate = '';
         changedByFullName = '';
         statusDescription = '';
        
}

export class entSalesReport {
  fromDate = '';
         toDate = '';
         agingDate = '';
         currencyValue = '';
         cusShipppingAddressId = 0;
         customerOpenningBalance = '';
         companyId = 0;
         companyBranchId = 0;
         currentFiscalYearId = 0;
         fiscalYearId = 0;
         typeId = 0;
         itemId = 0;
         orderNo = '';
         voucherStatus = '';
         userLoginID = '';
         reportResult = '';
         voucherConfigId = 0;
         refNo = '';
         customerId = 0;
         companyName = '';
         companyAddress1 = '';
         companyAddress2 = '';
         generatedDateTime = '';
         customerFullAddress = '';
         customerName = '';
         ilstDebtorsSummaryReport: any = [];
         ilstSalesCustomerAccountDebtorsReport: any = [];
         ibusDebtorsAmountSummary = new entDebtorsAmountSummary();
         ilstDebtorsVouchers: any = [];
         ibusDebtorsAmountGrantTotal = new entDebtorsAmountSummary();
         ibusDebtorsSummaryReport = new entDebtorsSummary();
         ilstCustomerSalesSummaryReport: any = [];
         ilstbusCustomerSalesVoucherDetails: any = [];
         ibusCustomerSalesAmountSummay = new entCustomerSalesAmountSummay();
         itemname = '';
         unittype = '';
         branchname = '';
         shippingAddress = '';
         errorMsg = '';
         customerCode = '';
         customerCurrency = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entStockRegisterReport {
  fromDate = '';
         toDate = '';
         companyId = 0;
         transactionId = 0;
         companyBranchId = 0;
         loginId = '';
         itemId = 0;
         categoryId = 0;
         typeId = 0;
         subTypeId = 0;
         customerId = 0;
         vendorId = 0;
         voucherType = '';
         voucherRefNo = '';
         voucherConfigId = 0;
         voucherNumberId = 0;
         ledgerName = '';
         totalInwardQuantity = '';
         totalOutwardQuantity = '';
         totalInwardValue = '';
         totalOutwardValuey = '';
         totalClosingBalQuantity = '';
         totalClosingBalValue = '';
         fiscalYearId = 0;
         lstentStockReport: any = [];
         itemName = '';
         unitType = '';
         ddlFiscalYearId = 0;
         reportResult = '';
         lstentDDL: any = [];
         regionValue = '';
         msg = new entIEMessage();
         ledgerId = 0;
        
}

export class entStockReport {
  rowNumber = 0;
         monthName = '';
         entrydate = '';
         paticulars = '';
         voucherType = '';
         voucherName = '';
         branchName = '';
         invoiceNumber = '';
         inQuantity = '';
         inValue = '';
         flag = '';
         outQuantity = '';
         transactionId = 0;
         outValue = '';
         closingQuantity = '';
         closingValue = '';
         companyBranchId = 0;
        
}

export class entString2Int1 {
  data1 = 0;
         data2 = '';
         data3 = '';
         msg = new entIEMessage();
        
}

export class entString3Long2 {
  longData1 = 0;
         stringData1 = '';
         stringData2 = '';
         stringData3 = '';
         longData2 = 0;
        
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

export class entTrialBalanceMonthlyReport {
  monthName = '';
         year = 0;
         userLoginID = '';
         isExcludeZero = '';
         fiscalYearId = 0;
         companyId = 0;
         companyBranchId = 0;
         msg = new entIEMessage();
         plstentActGroup: any = [];
         pentActGroup = new entActGroup();
         differenceInLedgerCreditOpeningBalance = '';
         differenceInLedgerDebitOpeningBalance = '';
         differenceInOpeningBalance = '';
         openingBalance = '';
         profitandLossCreditTotal = '';
         profitandLossDebitTotal = '';
         totalDebit = '';
         totalCredit = '';
        
}

export class entTrialBalanceReport {
  companyId = 0;
         fiscalYearId = 0;
         fromDate = '';
         isExcludeZero = '';
         expandAll = '';
         toDate = '';
         ddlFiscalYearId = 0;
         openingBalance = '';
         totalDebit = '';
         totalCredit = '';
         profitandLossTotal = '';
         profitandLossCreditTotal = '';
         profitandLossDebitTotal = '';
         companyName = '';
         differenceInLedgerOpeningBalance = '';
         differenceInLedgerCreditOpeningBalance = '';
         differenceInLedgerDebitOpeningBalance = '';
         differenceInItemOpeningBalance = '';
         differenceInOpeningBalance = '';
         differenceInCreditItemOpeningBalance = '';
         differenceInDebitItemOpeningBalance = '';
         pentActGroup = new entActGroup();
         plstentActGroup: any = [];
         companyBranchId = 0;
         userLoginID = '';
         fiscalYear = '';
         ytdEnable = false;
         msg = new entIEMessage();
         strResultExcel = '';
         plstentTrialBalanceMonthlyReport: any = [];
         regionValue = '';
        
}

export class entTrialBalanceReportList {
  plstentTrialBalanceReport: any = [];
         msg = new entIEMessage();
        
}

export class entUnitPriceForItemParams {
  itemId = 0;
         forBranch = '';
         date = '';
        
}

export class entVendorBasedPurchaseReport {
  companyId = 0;
         vendorId = 0;
         reportResult = '';
         ddlFiscalYearId = 0;
         fiscalYearId = 0;
         branchId = 0;
         itemId = 0;
         fromDate = '';
         toDate = '';
         vendorName = '';
         itemName = '';
         unitType = '';
         branchName = '';
         errorMsg = '';
         regionValue = '';
         regionDescription = '';
        
}

export class entVendorInvItemLink {
  actVendorInvItemLinkId = 0;
         actCompanyId = 0;
         actVendorId = 0;
         invItemId = 0;
         unitPrice = '';
         effectiveDate = '';
         pentInvItem = new entInvItem();
         modifiedBy = '';
         updateSeq = '';
         idoObjState = '';
         msg = new entIEMessage();
        
}

export class entVoucherAccountDetailSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilistentVoucherAccountDetailSearchSet: any = [];
        
}

export class entVoucherAccountDetailSearchSet {
  actVoucherAccountConfigId = 0;
         actCompanyBranchId = 0;
         voucherTypeDescription = '';
         effectTypeDescription = '';
         applicableBranchDescription = '';
         branchAccountTypeDescription = '';
         effectiveDate = '';
         actCompanyId = 0;
         voucherName = '';
         regionDescription = '';
        
}

export class vendorSearch {
  vendorName = '';
         actVendorId = 0;
         phoneNo = '';
         emailId = '';
         vendorCode = '';
         vendorBussinessLicenseNo = '';
         vendorTypeValue = '';
         vendorSubTypeValue = '';
         creditypeValue = '';
         vendorLegacyCode = '';
         dtmEffectiveDatefrom = '';
         dtmEffectiveDateto = '';
         currencyValue = '';
         actCompanyId = 0;
         website = '';
         statusvalue = '';
         itemName = '';
         istrSortColumn = '';
         iblSortOrder = false;
         totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         orderByColumnName = '';
         ascending = false;
         isNetoutVoucherSearch = '';
         voucherType = '';
        
}

export class vendorSearchResult {
  totalCount = 0;
         pageSize = 0;
         pageNumber = 0;
         ilstvendorSearchset: any = [];
        
}

export class vendorSearchset {
  vendorName = '';
         actVendorId = 0;
         vendorCode = '';
         vendorId = '';
         effectiveDate = '';
         vendorCategory = '';
         emailid = '';
         phoneNo = '';
         statusDescription = '';
         vendorTypeDescription = '';
        
}




