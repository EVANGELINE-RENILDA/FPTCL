import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { NgClass } from '@angular/common';
import { Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { AppService } from '../../../../app.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../common/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActNotes, entCompanyTax, entExchangeRate } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-exchange-rate-detail',
  standalone: true,
  imports: [Row, IconButtonComponent, MatMenuModule, InputControlComponent, AppTableComponent,
    FooterToggleDirective, NgClass, CellDefDirective, CellHeaderDefDirective, FormsModule, ViewLabel, AppDatePipe, AppAccessDirective,
    ButtonAccessDirective, AccoutsStatusTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './exchange-rate-detail.component.html',
  styleUrl: './exchange-rate-detail.component.scss'
})
export class ExchangeRateDetailComponent {
  selectedTab = 0;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  notes: any = ['notes', 'dateTime', 'add'];
  notesName: any = ['Notes', '', ''];
  pageId = 'EXRSC';
  errorTrue = false;
  errorTrueNotes = false;
  id: any = 0;
  @ViewChild('n') nform!: NgForm
  @ViewChild('x') xform!: NgForm

  options = {
    hideFullSpinner: true,
  };
  exchangeRate = new entExchangeRate()
  companyTax = new entCompanyTax();
  exchangeNote = new entActNotes();
  statusddl = []
  constructor(public appService: AppService,
    public dialog: CoreService,
    public data: DataService,
    public route: ActivatedRoute,
    public url: UrlService,
    public router: Router,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  tableNoteData = [

  ];

  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let paramsId: any = this.route.snapshot.paramMap.get('id');
    this.id = await this.url.decode(paramsId);
    this.initialData.getAcccountsDDL('getExchangeRateInitialData', this.options);
    if (this.id > 0) {
      this.openExchangeRate(this.id);
    } else {
      this.createNewExchangeRate();
    }
  }
  createNewExchangeRate() {
    this.errorTrue = false;
    this.accountsService.createNewExchangeRate().subscribe((success) => {
      this.exchangeRate = success;

    })
  }
  openExchangeRate(id?: any) {
    const obj = {
      data: id
    }
    this.accountsService.openExchangeRate(obj).subscribe((success: any) => {
      this.exchangeRate = success;
      this.tableNoteData = success.ilstentActNotes;
      this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
      this.errorTrue = false;

    })
  }
  saveExchangeRate(type?: any) {


    if (this.nform.valid) {

      this.accountsService.saveExchangeRate(this.exchangeRate).subscribe(async (success) => {
        this.exchangeRate = success;
        this.data.showErrorMessage = false;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.openExchangeRate(this.exchangeRate.actExchangeRateId);
        if (type === 'save') {
          const obj = {
            data: success.actExchangeRateId
          }
          let urlJson = await this.url.encode(obj);
          this.router.navigateByUrl('/home/finance/exchange-rate/detail/' + urlJson)

        }
      })
    }
    else {
      this.errorTrue = true;
    }

  }
  createNewTaxNote() {
    const obj = {
      data: this.exchangeRate.statusValue
    }
    this.errorTrueNotes = false;
    this.accountsService.createNewTaxNote(obj).subscribe((success) => {
      this.exchangeNote = success;
      this.statusddl = success.lddlData;
    })
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async openDialogNotes() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });

  }
  async createNewNotes(val: any) {
    if (val === 0) {

      this.createNewTaxNote()
    }
    else {

      // this.openVendorRegionAccess(val)
    }
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  saveNotesForExchangeRate() {
    if (this.xform.valid) {
      this.exchangeNote.lddlData = []
      this.exchangeNote.referenceId = this.exchangeRate.actExchangeRateId;
      this.exchangeRate.pentActNotes = this.exchangeNote;
      this.accountsService.saveNotesForExchangeRate(this.exchangeRate).subscribe((success) => {
        this.exchangeRate = success
        this.tableNoteData = success.ilstentActNotes;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
      })
    } else {
      this.errorTrueNotes = true;
    }

  }
  saveNotes() {

  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
  navigateToSearch() {
    this.router.navigateByUrl('/home/finance/exchange-rate/search')

  }
  clearTaxNote() {
    this.createNewTaxNote();
    this.data.successMessage('Data Cleared Successfully');
  }

}
