import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import { AppService } from '../../../app.service';

import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../app-core/template/drop-zone/drop-zone.component';
import { NgClass } from '@angular/common';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { StatusHistoryComponent } from '../../../app-core/template/status-history/status-history.component';
import { CoreService } from '../../../app-core/service/core.service';
import { EditEstateInfoComponent } from './edit-estate-info/edit-estate-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estate-application',
  standalone: true,
  imports: [FormsModule, Row, ViewLabel, AccordionModule, IconButtonComponent, InputControlComponent, AppTableComponent, DropZoneComponent, NgClass, AppDatePipe, StatusHistoryComponent, CellDefDirective, CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-application.component.html',
  styleUrl: './estate-application.component.scss',
})
export class EstateApplicationComponent {
  estateInfoEdit = false
  editDecesedEstate = false;
  selectedTab: any = 1
  selectedTab1: any = 1
  selectedTabValue: any = '1'
  selectedTabValue1: any = '1'
  fileTypePattern = /(\.xlx|\.xlsx|\.DOC|\.pdf|\.PDF)$/i;
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  uploadError = "File size exceeds the limit of 10mb and will not be uploaded";
  uploadLimit = 10;


  showStatusHistory = true
  showEmailHistory = false
  accordianOpen = true
  accordianOpen1 = true
  activeValue1 = true
  activeValue2 = false

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [
    {
      "statusValue": "REPET",
      "statusDescription": "Repeat",
      "changedBy": "CCO",
      "changedByFullname": "Customer Creation Officer",
      "changedDate": "24-05-2024 10:23",
      "idoObjState": "Selected",
      "updateSeq": 0,
      "msg": {
        "infoMessage": null,
        "errorMessage": [],
        "hasError": false
      }
    },
    {

      "statusValue": "CUSTR",
      "statusDescription": "Customer",
      "changedBy": "TO2",
      "changedByFullname": "Trust Officer 2",
      "changedDate": "24-05-2024 10:20",
      "idoObjState": "Selected",
      "updateSeq": 0,
      "msg": {
        "infoMessage": null,
        "errorMessage": [],
        "hasError": false
      }
    },

  ];
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
  willColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action", ""];
  willColumnsName: any = ["Witness Name", " Is Deceased", "Date Of Death", "Place Of Death", " Is Benificiary", ""];
  willTableData: any = [];


  liablityColumns: any = ["toEmailId", "sentDate", "sentStatusDescription"];
  liablityColumnsName: any = ["Creditor", "Address", "Paticulars ", "Amount"];
  liablityTableData: any = [];
  liablityColumns1: any = ["toEmailId", "sentDate", "sentStatusDescription"];
  liablityColumnsName1: any = ["Insurance Cover", "Company", "Premium Amount ", "Expiry date", "Place Of Policy Document"];
  liablityTableData1: any = [];

  binificiaryColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action", ""];
  binificiaryColumnsName: any = ["Benificiary Name", " Relationship to Deceased", "Occupation", "Date Of Death", "Marital Status", " Action"];
  binificiaryTableData: any = [];


  conductInitialColumnsName: any = ["Document Name", "File Name | Size | Extn", "Action"];
  conductInitialColumns: any = ['docName', 'file', 'action']
  assetsTableData: any = [{

    "docName": 'Death Certificate',
    'file': 'doc.pdf | 2.3mb | pdf',

  },
  {
    "docName": 'Marriage Certificate',
    'file': 'doc.pdf | 2.3mb | pdf',
  }]
  conductInitialTableData: any = [{
    "docName": 'Death Certificate',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Marriage Certificate',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Birth Certificate (Children)',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Last Will of the the Deceased (if any)',
    'file': 'doc.pdf | 2.3mb | pdf',

  },
  {
    "docName": 'Certified copy of Certificate of Title, or lease relative to all land or houses owned by the deceased',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Palicies covering Fire Insurance, Houses, Fumiture and Other assets',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Life Insurance policies in the name of the deceased',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Savings Passbooks for five years before death',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Passbooks or statements for five years before death covering other bank accounts',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Contracts of Sale, Mortgages and Leases',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Treasury Bonds',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Cheque Butts for five years before death',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Safe custody receipts for development loan etc',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Income Tax certificate of deductions held by deceased',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Share Certificates for all shares in Companies held by Deceased',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Cane Contract',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Current Hire Purchase Agreement, receipts, mortgages, crop lien or bill of sale',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  {
    "docName": 'Copies of previous income tax returns furnished to Taxation Department',
    'file': 'doc.pdf | 2.3mb | pdf',
  },
  ];



  constructor(
    public appService: AppService,
    public dialog: CoreService,
    public router: Router
  ) {

  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  editEstateDetils() {
    this.estateInfoEdit = true
  }
  saveEstateDetils() {
    this.estateInfoEdit = false
  }

  editDecesedEstateDetils() {
    this.editDecesedEstate = true
  }
  saveDecesedEstateDetils() {
    this.editDecesedEstate = false
  }
  selectedTabChange(val: any) {
    if (val === 1) {
      this.selectedTabValue = '1'
      this.activeValue1 = true
      this.activeValue2 = false
      console.log(this.activeValue1, this.activeValue2);

    }
    if (val === 2) {
      this.selectedTabValue = '2';
      this.activeValue2 = true
      this.activeValue1 = false
      console.log(this.activeValue1, this.activeValue2);
    }
  }
  createNotes() {

  }
  //

  openStatusValueProcess(val: any) {
    console.log(val);

    // if (this.accordianOpen === false) {
    if (val === 1) {
      this.showStatusHistory = true;
      this.showEmailHistory = false;
      this.accordianOpen = true;
    }
    else if (val === 2) {
      this.showEmailHistory = true;
      this.showStatusHistory = false;
      this.accordianOpen = true
    }

  }
  openAccordianProcess(dujuk: any) {
    console.log(dujuk);
    if (dujuk === false) {
      this.accordianOpen = true
      this.showStatusHistory = true;
      this.showEmailHistory = false
    }
    else {
      this.accordianOpen = false;
      this.showStatusHistory = false;
      this.showEmailHistory = false

    }
  }

  openStatusValue(val: any) {
    console.log(val);
    this.selectedTab = val
    this.accordianOpen = true;
  }
  openStatusValue1(val: any) {
    console.log(val);
    this.selectedTab1 = val
    this.accordianOpen1 = true;
  }

  openAccordian(tab: any) {
    if (tab === false) {
      this.accordianOpen = true
      this.selectedTab = 1;
    }
    else {
      this.accordianOpen = false;
      this.selectedTab = 0
    }
  }
  openAccordian1(tab: any) {
    if (tab === false) {
      this.accordianOpen1 = true
      this.selectedTab1 = 1;
    }
    else {
      this.accordianOpen1 = false;
      this.selectedTab1 = 0
    }
  }


  async editInfo(val: any) {
    let response: any = await this.dialog.openDialog(EditEstateInfoComponent, {
      height: 'auto',
      width: '100%',
      maxWidth: '1100px',
      data: {
        type: val,
      }
    });
  }
  navigateToList() {
    this.router.navigateByUrl('/home/estate/estate-application/search');
  }
}
