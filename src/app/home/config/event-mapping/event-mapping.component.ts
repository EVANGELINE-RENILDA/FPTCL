import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { UrlService } from '../../../common/services/url/url.service';
import { AppService } from '../../../app.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { JsonPipe, NgClass } from '@angular/common';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import {
  AppToolTipComponent,
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../app-core/core-component/core-component.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../app-core/template/app-table/app-table.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { LeadListComponent } from '../../crm/lead/lead-list/lead-list.component';
import { StatusHistoryComponent } from '../../../app-core/template/status-history/status-history.component';
import { MultiPageUrlComponent } from '../../../app-core/template/multi-page-url/multi-page-url.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { DropZoneComponent } from '../../../app-core/template/drop-zone/drop-zone.component';
import { CheckboxComponent } from '../../../app-core/template/checkbox/checkbox.component';
import { MatTooltip } from '@angular/material/tooltip';
import { ErrorMessageComponent } from '../../../app-core/message/error-message/error-message.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddressEditComponent } from '../../../app-core/template/address-edit/address-edit.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  entCashCounterSearch,
  entEventMapping,
  entEventMappingList,
  entEventMappingSearch,
  entTrustApplication,
} from '../../../common/api-services/application-api/application-api.classes';
import { EventComponent } from '../event/event/event.component';
import {
  TabComponent,
  TabGroupComponent,
} from '../../../app-core/template/tab/tab';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { entActVoucherConfig } from '../../../common/api-services/accounts-api/accounts-api.classes';
import {
  TabSubGroupComponent,
  TabSubComponent,
} from '../../../app-core/template/tab/tab1';
import { LeadgerAutoSearchComponent } from '../../search/leadger-auto-search/leadger-auto-search.component';
import { SearchGroupComponent } from '../../search/search-group/search-group.component';
import { eventMappingLedgerComponent } from './event-mapping-ledger';
import { EmptyStateComponent } from '../../../app-core/template/empty-state';
import { AppCheckBoxComponent } from '../../../app-core/template/checkBox';
import { SearchDebitComponent } from '../../search/search-debit/search-debit.component';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-event-mapping',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CdkAccordionModule,
    TabGroupComponent,
    NgClass,
    TabComponent,
    AccordionModule,
    JsonPipe,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    FormsModule,
    InputControlComponent,
    IconButtonComponent,
    LeadListComponent,
    StatusHistoryComponent,
    AppDatePipe,
    MultiPageUrlComponent,
    DropZoneComponent,
    CheckboxComponent,
    MatTooltip,
    InnerScroll,
    StatusHistoryComponent,
    ErrorMessageComponent,
    SearchComponent,
    MatTabsModule,
    TabSubGroupComponent,
    TabSubComponent,
    SearchGroupComponent,
    LeadgerAutoSearchComponent,
    AppToolTipComponent,
    AddressEditComponent,
    MatCheckboxModule,
    MatSlideToggle,
    EventComponent,
    eventMappingLedgerComponent,
    EmptyStateComponent,
    AppCheckBoxComponent,
    SearchDebitComponent,
  ],
  templateUrl: './event-mapping.component.html',
  styleUrl: './event-mapping.component.scss',
})
export class EventMappingComponent implements OnInit, AfterViewInit {
  errorTrue = false;
  errorTrue1 = false;
  type = 'new';
  type1 = 'new';
  eventID = 0;
  showCheck = true;

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  selectedTabValue = '';
  activeValue1 = false;
  activeValue2 = false;
  activeValue3 = false;
  regionValue = '';
  eventMapping = new entEventMapping();
  tableData = [];
  subEventDDL = [];
  DDLEvent = [];
  postMatrixDDl = [];
  bankFee = '';
  companySymbolValue = '';
  ledgers = [];
  casAccountType: any = [];

  legderDisabled = false;
  ledgerName = '';

  trustData: any = [];
  corporateData: any = [];
  primaryData: any = [];
  tableLinkedData: any = [];

  grouplist: any = [];

  lstTrustEstate: any = [];
  lstTrustBank: any = [];
  lstCorporate: any = [];
  lstCorporateBank: any = [];
  lstPosting: any = [];

  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  group = {
    name: '',
    id: 0,
  };

  ledger = {
    description: '',
    id: 0,
  };

  bankColumns: any = [
    'groupName',
    'ledgerName',
    'postingNatureDescription',
    'isCustomerGl',
  ];
  bankColumnsName: any = [
    'Group Name',
    'Ledger Name',
    'Posting Nature',
    'Customer GL',
  ];

  cusColumn: any = ['groupName', 'ledgerName', 'postingNatureValue'];
  cusColumnName: any = ['Group Name', 'Ledger Name', 'Posting Nature'];

  trustColumn: any = ['groupName', 'ledgerName', 'postingNature', 'curlGL'];
  trustColumnName: any = [
    'Group Name',
    'Ledger Name',
    'Posting Nature',
    'Customer GL',
  ];
  loading = true;
  // @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('p') pform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('d') dform!: NgForm;
  @ViewChild('f') fform!: NgForm;
  @ViewChild('e') e!: NgForm;

  eventMappingList = new entEventMappingList();

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public searchDialog: CoreService,
    private appService: AppService,
    public cdf: ChangeDetectorRef,
    public appStorage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  selectedTabChange(val: any) {
    if (val === 1) {
      this.selectedTabValue = '1';
      this.activeValue1 = true;
      this.activeValue2 = false;
      this.activeValue3 = false;
    }
    if (val === 2) {
      this.selectedTabValue = '2';
      this.activeValue2 = true;
      this.activeValue1 = false;
      this.activeValue3 = false;
    }
    if (val === 3) {
      this.selectedTabValue = '3';
      this.activeValue2 = false;
      this.activeValue1 = false;
      this.activeValue3 = true;
    }
  }
  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'History':
        break;
    }
  }

  ////
  async isChecked(val: any, flag?: any) {
    this.errorTrue = false;

    this.showCheck = false;
    let msg = `Are you want to remove the bank charge, then the bank configuration will disappear ? `;
    let response = await this.dialog.alertPopup(msg);
    if (response) {
      if (val.target.checked) {
        this.eventMapping.isBankFee = 'Y';
        this.bankFee = 'Yes';
        setTimeout(() => {
          this.showCheck = true;
        }, 100);
      } else {
        this.eventMapping.isBankFee = 'N';
        this.eventMapping.bankFeeValue = '';
        this.bankFee = 'No';
        setTimeout(() => {
          this.showCheck = true;
        }, 100);
      }
    }
    setTimeout(() => {
      this.showCheck = true;
    }, 100);
  }

  async init() {
    await this.data.checkToken();
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.eventID = params;
    this.companySymbolValue = await this.appStorage.get('companySymbolValue');
    this.appService.setBreadCrumb(this.breadCrumb);
    this.selectedTabChange(1);
    this.initialData.getDDL('getInitialDataForEventMapping');

    this.openEventMapping(this.eventID);
  }

  onEdit() {
    console.log(this.eventMapping);

    this.type1 = 'edit';
  }

  showAccMapping = false;

  loading1 = false;

  openEventMapping(id: any) {
    const obj = {
      data: id,
    };
    this.apiService.openEventMapping(obj).subscribe(async (success) => {
      this.eventMapping = success;

      this.lstPosting = [];
      this.lstTrustEstate = [];
      this.lstCorporate = [];
      this.lstCorporateBank = [];
      this.lstTrustBank = [];

      this.getAccountType(success.fileTypeValue);
      this.lstPosting = success.lstentEventMappingList.filter(
        (e: any) => e.isPrimaryPosting === 'Y'
      );
      this.lstTrustEstate = success.lstentEventMappingList.filter(
        (e: any) =>
          e.isPrimaryPosting === 'N' &&
          e.isCorporateGl === 'N' &&
          e.isBankFee === 'N'
      );
      success.lstentEventMappingList.forEach((ele: any) => {
        if (ele.isPrimaryPosting === 'N') {
          if (ele.isCorporateGl === 'N') {
            if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'N') {
              this.lstTrustBank.push(ele);
            }
          } else if (ele.isCorporateGl === 'Y') {
            if (ele.isBankFee === 'N') {
              this.lstCorporate.push(JSON.parse(JSON.stringify(ele)));
            }
            if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'Y') {
              this.lstCorporateBank.push(JSON.parse(JSON.stringify(ele)));
            }
          }
        }
      });

      await this.getListOfEventByEventId();
      this.getListOfSubEventByEventId(success.eventId, true);
      this.getListOfPostingMatrixByVoucherType(success.voucherTypeValue);
      this.showAccMapping = true;
      if (this.eventMapping.isBankFee === 'N') {
        this.bankFee = 'No';
      } else if (this.eventMapping.isBankFee === 'Y') {
        this.bankFee = 'Yes';
      }
    });
    this.loading1 = true;
  }

  saveEventMappingList() {
    if (this.eventMapping.isBankFee === 'Y') {
      if (
        this.aform.valid &&
        this.cform.valid &&
        this.dform.valid &&
        this.fform.valid
      ) {
        this.errorTrue = false;

        this.eventMapping.lstentEventMappingList.forEach((element: any) => {
          // trust
          this.lstTrustEstate.forEach((trustRecord: any) => {
            if (
              element.postingNatureValue === 'CREDT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'N' &&
              element.isBankFee === 'N' &&
              trustRecord.postingNatureValue === 'CREDT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = trustRecord;
            } else if (
              element.postingNatureValue === 'DEBIT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'N' &&
              element.isBankFee === 'N' &&
              trustRecord.postingNatureValue === 'DEBIT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = trustRecord;
            }
          });

          console.log(this.eventMapping.lstentEventMappingList, 'check');

          //trust bank
          this.lstTrustBank.forEach((trustBankRecord: any) => {
            if (this.eventMapping.isBankFee === 'Y') {
              if (
                element.postingNatureValue === 'CREDT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'N' &&
                element.isBankFee === 'Y' &&
                trustBankRecord.postingNatureValue === 'CREDT'
              ) {
                if (
                  element.isVatOption === 'Y' &&
                  trustBankRecord.isVatOption === 'Y'
                ) {
                  let index =
                    this.eventMapping.lstentEventMappingList.indexOf(element);
                  this.eventMapping.lstentEventMappingList[index] =
                    trustBankRecord;
                } else if (
                  element.isVatOption === 'N' &&
                  trustBankRecord.isVatOption === 'N'
                ) {
                  let index =
                    this.eventMapping.lstentEventMappingList.indexOf(element);
                  this.eventMapping.lstentEventMappingList[index] =
                    trustBankRecord;
                }
              } else if (
                element.postingNatureValue === 'DEBIT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'N' &&
                element.isBankFee === 'Y' &&
                trustBankRecord.postingNatureValue === 'DEBIT'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  trustBankRecord;
              }
            } else if (this.eventMapping.isBankFee === 'N') {
              trustBankRecord.groupId = 0;
              trustBankRecord.ledgerId = 0;
              trustBankRecord.ledgerName = '';
              trustBankRecord.ledgerCode = '';
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = trustBankRecord;
            }
          });

          //corporate
          this.lstCorporate.forEach((corporateRecord: any) => {
            if (this.eventMapping.isBankFee === 'Y') {
              if (
                element.postingNatureValue === 'CREDT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'Y' &&
                element.isBankFee === 'N' &&
                corporateRecord.postingNatureValue === 'CREDT'
              ) {
                if (
                  element.isVatOption === 'Y' &&
                  corporateRecord.isVatOption === 'Y'
                ) {
                  let index =
                    this.eventMapping.lstentEventMappingList.indexOf(element);
                  this.eventMapping.lstentEventMappingList[index] =
                    corporateRecord;
                } else if (
                  element.isVatOption === 'N' &&
                  corporateRecord.isVatOption === 'N'
                ) {
                  let index =
                    this.eventMapping.lstentEventMappingList.indexOf(element);
                  this.eventMapping.lstentEventMappingList[index] =
                    corporateRecord;
                }
              } else if (
                element.postingNatureValue === 'DEBIT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'Y' &&
                element.isBankFee === 'N' &&
                corporateRecord.postingNatureValue === 'DEBIT'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateRecord;
              }
            } else if (this.eventMapping.isBankFee === 'N') {
              corporateRecord.groupId = 0;
              corporateRecord.ledgerId = 0;
              corporateRecord.ledgerName = '';
              corporateRecord.ledgerCode = '';
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = corporateRecord;
            }
          });

          //corporate Bank
          this.lstCorporateBank.forEach((corporateBankRecord: any) => {
            if (
              element.postingNatureValue === 'CREDT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'Y' &&
              element.isBankFee === 'Y' &&
              corporateBankRecord.postingNatureValue === 'CREDT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] =
                corporateBankRecord;
            } else if (
              element.postingNatureValue === 'DEBIT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'Y' &&
              element.isBankFee === 'Y' &&
              corporateBankRecord.postingNatureValue === 'DEBIT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] =
                corporateBankRecord;
            }
          });

          //primary posting
          this.lstPosting.forEach((postingRecord: any) => {
            if (
              element.postingNatureValue === 'CREDT' &&
              element.isPrimaryPosting === 'Y' &&
              postingRecord.postingNatureValue === 'CREDT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = postingRecord;
            } else if (
              element.postingNatureValue === 'DEBIT' &&
              element.isPrimaryPosting === 'Y' &&
              postingRecord.postingNatureValue === 'DEBIT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = postingRecord;
            }
          });
        });

        this.apiService
          .saveEventMappingList(this.eventMapping)
          .subscribe((success) => {
            this.eventMappingList = success;
            this.lstPosting = [];
            this.lstTrustEstate = [];
            this.lstCorporate = [];
            this.lstCorporateBank = [];
            this.lstTrustBank = [];

            this.lstPosting = success.lstentEventMappingList.filter(
              (e: any) => e.isPrimaryPosting === 'Y'
            );
            this.lstTrustEstate = success.lstentEventMappingList.filter(
              (e: any) =>
                e.isPrimaryPosting === 'N' &&
                e.isCorporateGl === 'N' &&
                e.isBankFee === 'N'
            );
            success.lstentEventMappingList.forEach((ele: any) => {
              if (ele.isPrimaryPosting === 'N') {
                if (ele.isCorporateGl === 'N') {
                  if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'N') {
                    this.lstTrustBank.push(ele);
                  }
                } else if (ele.isCorporateGl === 'Y') {
                  if (ele.isBankFee === 'N') {
                    this.lstCorporate.push(JSON.parse(JSON.stringify(ele)));
                  }
                  if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'Y') {
                    this.lstCorporateBank.push(JSON.parse(JSON.stringify(ele)));
                  }
                }
              }
            });
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please check all mandatory fields. ');
      }
    } else {
      if (this.aform.valid && this.dform.valid) {
        this.errorTrue = false;

        this.eventMapping.lstentEventMappingList.forEach((element: any) => {
          // trust
          this.lstTrustEstate.forEach((trustRecord: any) => {
            if (
              element.postingNatureValue === 'CREDT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'N' &&
              element.isBankFee === 'N' &&
              trustRecord.postingNatureValue === 'CREDT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = trustRecord;
            } else if (
              element.postingNatureValue === 'DEBIT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'N' &&
              element.isBankFee === 'N' &&
              trustRecord.postingNatureValue === 'DEBIT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = trustRecord;
            }
          });

          //trust bank
          this.lstTrustBank.forEach((trustBankRecord: any) => {
            if (this.eventMapping.isBankFee === 'Y') {
              if (
                element.postingNatureValue === 'CREDT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'N' &&
                element.isBankFee === 'Y' &&
                trustBankRecord.postingNatureValue === 'CREDT'
              ) {
                if (
                  element.isVatOption === 'Y' &&
                  trustBankRecord.isVatOption === 'Y'
                ) {
                  let index =
                    this.eventMapping.lstentEventMappingList.indexOf(element);
                  this.eventMapping.lstentEventMappingList[index] =
                    trustBankRecord;
                } else if (
                  element.isVatOption === 'N' &&
                  trustBankRecord.isVatOption === 'N'
                ) {
                  let index =
                    this.eventMapping.lstentEventMappingList.indexOf(element);
                  this.eventMapping.lstentEventMappingList[index] =
                    trustBankRecord;
                }
              } else if (
                element.postingNatureValue === 'DEBIT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'N' &&
                element.isBankFee === 'Y' &&
                trustBankRecord.postingNatureValue === 'DEBIT'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  trustBankRecord;
              }
            } else if (this.eventMapping.isBankFee === 'N') {
              if (
                element.postingNatureValue === 'CREDT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'N' &&
                element.isBankFee === 'Y' &&
                trustBankRecord.postingNatureValue === 'CREDT'
              ) {
                trustBankRecord.groupId = 0;
                trustBankRecord.ledgerId = 0;
                trustBankRecord.ledgerName = '';
                trustBankRecord.ledgerCode = '';
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  trustBankRecord;
              } else if (
                element.postingNatureValue === 'DEBIT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'N' &&
                element.isBankFee === 'Y' &&
                trustBankRecord.postingNatureValue === 'DEBIT'
              ) {
                trustBankRecord.groupId = 0;
                trustBankRecord.ledgerId = 0;
                trustBankRecord.ledgerName = '';
                trustBankRecord.ledgerCode = '';
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  trustBankRecord;
              }
            }
          });

          //corporate
          this.lstCorporate.forEach((corporateRecord: any) => {
            if (
              element.postingNatureValue === 'CREDT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'Y' &&
              element.isBankFee === 'N' &&
              corporateRecord.postingNatureValue === 'CREDT'
            ) {
              if (
                element.isVatOption === 'Y' &&
                corporateRecord.isVatOption === 'Y'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateRecord;
              } else if (
                element.isVatOption === 'N' &&
                corporateRecord.isVatOption === 'N'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateRecord;
              }
            } else if (
              element.postingNatureValue === 'DEBIT' &&
              element.isPrimaryPosting === 'N' &&
              element.isCorporateGl === 'Y' &&
              element.isBankFee === 'N' &&
              corporateRecord.postingNatureValue === 'DEBIT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = corporateRecord;
            }
          });

          // //corporate Bank
          this.lstCorporateBank.forEach((corporateBankRecord: any) => {
            if (this.eventMapping.isBankFee === 'Y') {
              if (
                element.postingNatureValue === 'CREDT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'Y' &&
                element.isBankFee === 'Y' &&
                corporateBankRecord.postingNatureValue === 'CREDT'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateBankRecord;
              } else if (
                element.postingNatureValue === 'DEBIT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'Y' &&
                element.isBankFee === 'Y' &&
                corporateBankRecord.postingNatureValue === 'DEBIT'
              ) {
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateBankRecord;
              }
            } else if (this.eventMapping.isBankFee === 'N') {
              if (
                element.postingNatureValue === 'CREDT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'Y' &&
                element.isBankFee === 'Y' &&
                corporateBankRecord.postingNatureValue === 'CREDT'
              ) {
                corporateBankRecord.groupId = 0;
                corporateBankRecord.ledgerId = 0;
                corporateBankRecord.ledgerName = '';
                corporateBankRecord.ledgerCode = '';
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateBankRecord;
              } else if (
                element.postingNatureValue === 'DEBIT' &&
                element.isPrimaryPosting === 'N' &&
                element.isCorporateGl === 'Y' &&
                element.isBankFee === 'Y' &&
                corporateBankRecord.postingNatureValue === 'DEBIT'
              ) {
                corporateBankRecord.groupId = 0;
                corporateBankRecord.ledgerId = 0;
                corporateBankRecord.ledgerName = '';
                corporateBankRecord.ledgerCode = '';
                let index =
                  this.eventMapping.lstentEventMappingList.indexOf(element);
                this.eventMapping.lstentEventMappingList[index] =
                  corporateBankRecord;
              }
            }
          });

          //primary posting
          this.lstPosting.forEach((postingRecord: any) => {
            if (
              element.postingNatureValue === 'CREDT' &&
              element.isPrimaryPosting === 'Y' &&
              postingRecord.postingNatureValue === 'CREDT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = postingRecord;
            } else if (
              element.postingNatureValue === 'DEBIT' &&
              element.isPrimaryPosting === 'Y' &&
              postingRecord.postingNatureValue === 'DEBIT'
            ) {
              let index =
                this.eventMapping.lstentEventMappingList.indexOf(element);
              this.eventMapping.lstentEventMappingList[index] = postingRecord;
            }
          });
        });
        console.log(this.eventMapping.lstentEventMappingList, 'after Push');
        debugger;
        this.apiService
          .saveEventMappingList(this.eventMapping)
          .subscribe((success) => {
            this.eventMappingList = success;
            this.lstPosting = [];
            this.lstTrustEstate = [];
            this.lstCorporate = [];
            this.lstCorporateBank = [];
            this.lstTrustBank = [];

            this.lstPosting = success.lstentEventMappingList.filter(
              (e: any) => e.isPrimaryPosting === 'Y'
            );
            this.lstTrustEstate = success.lstentEventMappingList.filter(
              (e: any) =>
                e.isPrimaryPosting === 'N' &&
                e.isCorporateGl === 'N' &&
                e.isBankFee === 'N'
            );
            success.lstentEventMappingList.forEach((ele: any) => {
              if (ele.isPrimaryPosting === 'N') {
                if (ele.isCorporateGl === 'N') {
                  if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'N') {
                    this.lstTrustBank.push(ele);
                  }
                } else if (ele.isCorporateGl === 'Y') {
                  if (ele.isBankFee === 'N') {
                    this.lstCorporate.push(JSON.parse(JSON.stringify(ele)));
                  }
                  if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'Y') {
                    this.lstCorporateBank.push(JSON.parse(JSON.stringify(ele)));
                  }
                }
              }
            });
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please check all mandatory fields.');
      }
    }
  }



  saveEventMappingListPrimary() {
    if (this.bform.valid) {
      this.errorTrue1 = false;
      this.eventMapping.lstentEventMappingList.forEach((element: any) => {
        //primary posting
        this.lstPosting.forEach((postingRecord: any) => {
          if (
            element.postingNatureValue === 'CREDT' &&
            element.isPrimaryPosting === 'Y' &&
            postingRecord.postingNatureValue === 'CREDT'
          ) {
            let index =
              this.eventMapping.lstentEventMappingList.indexOf(element);
            this.eventMapping.lstentEventMappingList[index] = postingRecord;
          } else if (
            element.postingNatureValue === 'DEBIT' &&
            element.isPrimaryPosting === 'Y' &&
            postingRecord.postingNatureValue === 'DEBIT'
          ) {
            let index =
              this.eventMapping.lstentEventMappingList.indexOf(element);
            this.eventMapping.lstentEventMappingList[index] = postingRecord;
          }
        });
      });

      this.apiService
        .saveEventMappingList(this.eventMapping)
        .subscribe((success) => {
          this.eventMappingList = success;

          this.lstPosting = [];
          this.lstTrustEstate = [];
          this.lstCorporate = [];
          this.lstCorporateBank = [];
          this.lstTrustBank = [];

          this.lstPosting = success.lstentEventMappingList.filter(
            (e: any) => e.isPrimaryPosting === 'Y'
          );
          this.lstTrustEstate = success.lstentEventMappingList.filter(
            (e: any) =>
              e.isPrimaryPosting === 'N' &&
              e.isCorporateGl === 'N' &&
              e.isBankFee === 'N'
          );
          success.lstentEventMappingList.forEach((ele: any) => {
            if (ele.isPrimaryPosting === 'N') {
              if (ele.isCorporateGl === 'N') {
                if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'N') {
                  this.lstTrustBank.push(ele);
                }
              } else if (ele.isCorporateGl === 'Y') {
                if (ele.isBankFee === 'N') {
                  this.lstCorporate.push(JSON.parse(JSON.stringify(ele)));
                }
                if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'Y') {
                  this.lstCorporateBank.push(JSON.parse(JSON.stringify(ele)));
                }
              }
            }
          });
        });
    } else {
      this.errorTrue1 = true;
      this.data.errorInfoMessage('Please check all mandatory fields. ');
    }
  }

  saveEventMapping() {
    if (this.pform.valid) {
      this.errorTrue = false;
      this.apiService
        .saveEventMapping(this.eventMapping)
        .subscribe((success) => {
          this.eventMapping = success;
          this.lstPosting = [];
          this.lstTrustEstate = [];
          this.lstCorporate = [];
          this.lstCorporateBank = [];
          this.lstTrustBank = [];
          this.lstPosting = success.lstentEventMappingList.filter(
            (e: any) => e.isPrimaryPosting === 'Y'
          );
          this.lstTrustEstate = success.lstentEventMappingList.filter(
            (e: any) =>
              e.isPrimaryPosting === 'N' &&
              e.isCorporateGl === 'N' &&
              e.isBankFee === 'N'
          );
          success.lstentEventMappingList.forEach((ele: any) => {
            if (ele.isPrimaryPosting === 'N') {
              if (ele.isCorporateGl === 'N') {
                if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'N') {
                  this.lstTrustBank.push(ele);
                }
              } else if (ele.isCorporateGl === 'Y') {
                if (ele.isBankFee === 'N') {
                  this.lstCorporate.push(JSON.parse(JSON.stringify(ele)));
                }
                if (ele.isBankFee === 'Y' && ele.isCorporateGl === 'Y') {
                  this.lstCorporateBank.push(JSON.parse(JSON.stringify(ele)));
                }
              }
            }
          });
          this.type1 = 'new';
          this.data.successMessage('Data Updated Successfully');
        });
    } else {
      this.errorTrue = true;
    }
  }

  getListOfEventByEventId() {
    this.apiService.getListOfEventByEventId().subscribe((success) => {
      this.DDLEvent = success.value;
    });
  }
  getListOfSubEventByEventId(eventID: any, flag: any) {
    const obj = {
      data: eventID,
    };
    if (!flag) {
      this.eventMapping.subEventId = 0;
    }
    this.apiService.getListOfSubEventByEventId(obj).subscribe((success) => {
      this.subEventDDL = success.value;
    });
  }

  getListOfPostingMatrixByVoucherType(val: any, flag?: any) {
    const obj = {
      data: val,
    };
    if (flag) {
      this.eventMapping.postingMatrixConfigurationId = 0;
    }
    this.apiService
      .getListOfPostingMatrixByVoucherType(obj)
      .subscribe((success) => {
        this.postMatrixDDl = success.value;
      });
  }

  // ledger

  isLoading = true;
  groups: any = [];
  isReloadCheckox = true;
  getLedgerBasedOnGroupId(event: any, itemTrust?: any, index?: any) {
    switch (itemTrust) {
      case 'lstTrustEstate':
        this.isReloadCheckox = false;
        this.lstTrustEstate[index].groupName = event.name;
        this.lstTrustEstate[index].isCustomerGl = 'N';

        this.lstTrustEstate[index].ledgerId = 0;
        this.lstTrustEstate[index].ledgerCode = '';
        this.lstTrustEstate[index].ledgerName = '';
        setTimeout(() => {
          this.isReloadCheckox = true;
        }, 100);
        break;

      case 'lstTrustBank':
        this.isReloadCheckox = false;
        this.lstTrustBank[index].groupName = event.name;
        this.lstTrustBank[index].isCustomerGl = 'N';

        this.lstTrustBank[index].ledgerId = 0;
        this.lstTrustBank[index].ledgerCode = '';
        this.lstTrustBank[index].ledgerName = '';
        setTimeout(() => {
          this.isReloadCheckox = true;
        }, 100);
        break;

      case 'lstCorporate':
        this.lstCorporate[index].groupName = event.name;

        this.lstCorporate[index].ledgerId = 0;
        this.lstCorporate[index].ledgerCode = '';
        this.lstCorporate[index].ledgerName = '';
        break;

      case 'lstCorporateBank':
        this.lstCorporateBank[index].groupName = event.name;

        this.lstCorporateBank[index].ledgerId = 0;
        this.lstCorporateBank[index].ledgerCode = '';
        this.lstCorporateBank[index].ledgerName = '';
        break;

      case 'lstPosting':
        this.isReloadCheckox = false;
        this.lstPosting[index].groupName = event.name;
        this.lstPosting[index].isCustomerGl = 'N';

        this.lstPosting[index].ledgerId = 0;
        this.lstPosting[index].ledgerCode = '';
        this.lstPosting[index].ledgerName = '';
        setTimeout(() => {
          this.isReloadCheckox = true;
        }, 100);
        break;

      default:
        break;
    }

    // this.loading = false;
    // const obj = {
    //   data: event.id
    // }
    // this.isLoading = false;
    // this.apiService.getLedgerBasedOnGroup(obj).subscribe((success: any) => {

    //   this.ledgers = success.data[0].value;
    //   this.cdf.detectChanges();
    //   console.log(this.ledgers, 'ledgers');
    //   this.loading = true;
    //   this.isLoading = true;
    //   this.ledger.description = '';
    //   console.log(this.lstTrustEstate);

    // });
  }

  getLedgerData(event: any) {
    console.log(event, 'ledgers');
    this.ledger = event;
  }

  isCheckedLedger(val: any, index?: any, selectedItem?: any) {
    this.errorTrue = false;
    this.errorTrue1 = false;
    if (val.checked) {
      selectedItem.isCustomerGl = 'Y';

      selectedItem.groupId = 0;
      selectedItem.groupName = '';
      selectedItem.ledgerId = 0;
      selectedItem.ledgerCode = '';
      selectedItem.ledgerName = '';
    } else {
      this.getLedgerBasedOnGroupId(this.group);
      selectedItem.isCustomerGl = 'N';
    }
  }

  clearLedger() {
    this.ledgers = [];
    this.getLedgerBasedOnGroupId(this.group);
  }

  /// boopathi

  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        break;
    }
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
  navigateToList() {
    this.router.navigateByUrl('home/config/event-mapping/search');
  }
  async getAccountType(event: any, flag?: any) {
    this.casAccountType = [];
    if (flag) {
      this.eventMapping.accountTypeValue = '';
    }
    await this.initialData.DDLValues.DDLAccountType.forEach((element: any) => {
      if (event === 'TRUST' && element.constant === 'CASH') {
        this.casAccountType.push(element);
      }
      if (event === 'COMON' && element.constant === 'CASH') {
        this.casAccountType.push(element);
      } else if (
        event === 'ESTAT' &&
        (element.constant === 'CASH' ||
          element.constant === 'NONCS' ||
          element.constant === 'COMON')
      ) {
        this.casAccountType.push(element);
      }
    });
  }

  onLedgerSelect(event: any, val: any) {
    val.ledgerName = event.ledgerName;
    val.ledgerId = event.actLedgerId;
    val.ledgerCode = event.codeName;
  }
}
