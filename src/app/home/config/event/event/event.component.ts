import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import {
  TabSubComponent,
  TabSubGroupComponent,
} from '../../../../app-core/template/tab/tab1';
import {
  entEventMapping,
  entEventMappingList,
  entTrustApplication,
  entTrustApplicationAssignedOfficer,
  entTrustApplicationDocument,
  entTrustApplicationNotes,
} from '../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { DataService } from '../../../../common/services/data/data.service';
import { SearchGroupComponent } from '../../../search/search-group/search-group.component';
import { LeadgerAutoSearchComponent } from '../../../search/leadger-auto-search/leadger-auto-search.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { entActJournalVoucher } from '../../../../common/api-services/accounts-api/accounts-api.classes';

@Component({
  selector: 'app-event',
  imports: [
    FormsModule,
    InputControlComponent,
    CommonModule,
    Row,
    ViewLabel,
    AccordionModule,
    FileSizePipe,
    AppDatePipe,
    IconButtonComponent,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    MatCheckboxModule,
    InnerScroll,
    TabSubGroupComponent,
    SearchDebitComponent,
    TabSubComponent,
    SearchGroupComponent,
    LeadgerAutoSearchComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit, AfterViewInit {
  eventMappingList = new entEventMappingList();
  journalVoucher = new entActJournalVoucher();
  // @Input() application: any = new entTrustApplication();
  @Input() application = new entEventMapping();
  @Output() applicationChange = new EventEmitter<any>();

  // trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  // trustApplicationDocument = new entTrustApplicationDocument();
  // trustApplicationNotes = new entTrustApplicationNotes()

  accept: any;
  fileExtension = 'jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv';
  documentArray: any = [];
  loading = true;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    trustApplicationStepNo: 0,
    isEditable: '',
  };

  regionValue = '';
  trustData: any = [];
  corporateData: any = [];
  primaryData: any = [];

  clientDocumentColumns: any = [
    'documentTypeDescription',
    'fileName',
    'fileSize',
    'action',
  ];

  clientDocumentColumnsName: any = [
    'Document Name',
    'File Name',
    'Size',
    'Action',
  ];
  clientDocumentTableData: any = [];
  //linked Doc

  trustColumn: any = ['groupName', 'ledgerName', 'postingNature', 'curlGL'];
  trustColumnName: any = [
    'Group Name',
    'Ledger Name',
    'Posting Nature',
    'Customer GL',
  ];

  cusColumn: any = ['groupName', 'ledgerName', 'postingNature'];
  cusColumnName: any = ['Group Name', 'Ledger Name', 'Posting Nature'];
  bankCusColumn: any = ['groupName', 'ledgerName', 'postingNature'];
  bankCusColumnName: any = ['Group Name', 'Ledger Name', 'Posting Nature'];

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
  tableLinkedData: any = [];
  errorTrue = false;
  docNameType = '';

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('e') e!: NgForm;
  ledgers: any = [];
  grouplist: any = [];
  legderDisabled = false;
  ledgerName = '';

  group = {
    name: '',
    id: 0,
  };

  ledger = {
    description: '',
    id: 0,
  };
  tableData = [];
  eventMapping: any;

  constructor(
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService,
    public cdf: ChangeDetectorRef,
    public storage: AppStorageService
  ) {}
  ngAfterViewInit() {
    // this.loading = false;
  }
  async ngOnInit() {
    this.tableLinkedData = [this.group];

    // this.apiService.createNewEventMappingList().subscribe((success) => {
    //   this.application = success;
    // });

    this.application.lstentEventMappingList.forEach((element: any) => {
      if (element.isPrimaryPosting === 'Y') {
        this.primaryData.push(element);
        console.log(this.primaryData, 'primaryData');
      }
    });
    this.application.lstentEventMappingList.forEach((element: any) => {
      if (element.isPrimaryPosting === 'N' && element.isCorporateGl === 'Y') {
        this.corporateData.push(element);
        console.log(this.corporateData, 'corporateData');
      }
    });
    this.application.lstentEventMappingList.forEach((element: any) => {
      if (element.isPrimaryPosting === 'N' && element.isCorporateGl === 'N') {
        this.trustData.push(element);
        console.log(this.trustData, 'trustData');
      }
    });

    let region = await this.storage.get('region');
    this.getGroupBasedOnRegion(region);
  }

  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        break;
    }
  }
  isCheckedLedger(val: any, selecetedElement: any) {
    this.errorTrue = false;

    if (val.checked) {
      console.log(val.checked);
      console.log(selecetedElement);

      console.log(this.application.lstentEventMappingList);
      this.ledger.description = '';
      this.ledgers = [];
      selecetedElement.vtypeDD = '';
      this.legderDisabled = true;
    } else {
      this.getLedgerBasedOnGroupId(selecetedElement.id);
      // console.log(this.tableData, 'tableData');

      // this.tableData = JSON.parse(JSON.stringify(this.tableData));
      this.legderDisabled = false;
    }
  }
  clearLedger() {
    this.ledgers = [];
    // this.getLedgerBasedOnGroupId(this.application.lstentEventMappingList.groupId);
  }
  getLedgerBasedOnGroupId(event: any) {
    this.ledgers = [];
    console.log(event, 'got from event mapper');
    this.group = event;
    const obj = {
      data: event.id,
    };
    this.apiService.getLedgerBasedOnGroup(obj).subscribe((success: any) => {
      this.ledgers = [...success.data[0].value];
      console.log(this.ledgers, 'ledgers');
      this.ledger.description = '';
      this.dialog.closeAll();
      // this.ledgerName = event.name;
    });
  }

  getGroupBasedOnRegion(region: any) {
    const obj = {
      data: region,
    };
    this.apiService.getGroupBasedOnRegion(obj).subscribe((success) => {
      this.grouplist = [...success.data[0].value];
      console.log(this.grouplist, 'grouplist');
    });
  }

  getLedgerData(event: any) {
    console.log(event, 'ledgers');
    this.ledger = event;
  }

  onLedgerSelect(event: any, val: any) {
    debugger;
    val.ientLedger.codeName = event.codeName;
    val.ientLedger.ledgerName = event.ledgerName;
    val.ledgerAccountId = event.actLedgerId;
  }

  onEdit() {}
  trustAndEstateGlIsValid() {
    this.errorTrue = false;
    if (this.e.valid) {
    } else {
      this.errorTrue = true;
    }
  }

  onSave() {
    if (this.e.valid) {
      this.eventMappingList.groupId = this.group.id;
      this.eventMappingList.groupName = this.group.name;
      this.eventMappingList.ledgerId = this.ledger.id;
      this.eventMappingList.ledgerName = this.ledger.description;

      this.saveEventMappingList();
    }
  }

  saveEventMappingList() {
    this.apiService
      .saveEventMappingList(this.eventMappingList)
      .subscribe((success) => {
        this.eventMappingList = success;
        console.log('Data saved successfully:', success);
      });
  }
}
