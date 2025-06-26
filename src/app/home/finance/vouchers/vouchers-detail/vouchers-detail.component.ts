import { NgClass } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  signal,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { TabContainerModule } from '../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../app-core/app-template/tab-item/tab-item.module';
import {
  Row,
  ViewLabel,
  InnerScroll,
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  entActVoucherBranchAccess,
  entActVoucherConfig,
  entActVoucherNumberPrefix,
  entActVoucherRegionAccess,
  entActVoucherRegionAccessList,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-vouchers-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    AppDatePipe,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    CheckboxComponent,
    FooterToggleDirective,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vouchers-detail.component.html',
  styleUrl: './vouchers-detail.component.scss',
})
export class VouchersDetailComponent {
  pageId = 'AVOSC';
  errorTrue = false;
  statusLst: any = [];
  selectedTab = 0;
  hideBranchBtn = false;
  // isTaxShow = false;
  btnClicked1 = false;
  btnClicked2 = false;
  imageGallery = {
    iImage: {},
  };

  tablePrefixData = [];
  branchDDL: any = [];

  tableBranchData = [
    'branchName',
    'currentRefNo',
    'restartedDate',
    'modifiedDate',
  ];
  branchValue = '';

  tableBranchAccessData = [];
  tableRegionAccessData = [];

  tableNoteData = [
    {
      sNo: '',
      notes: 'Pending Submission',
      createdBy: 'Chief Finance Officer',
      dateTime: '10/07/2002 10:56 AM',
    },
    {
      sNo: '',
      notes: 'Pending Submission',
      createdBy: 'Chief Finance Officer',
      dateTime: '10/07/2002 10:56 AM',
    },
  ];
  tableAttachmentData = [
    {
      sNo: '',
      fileName: 'image_2024_05_25T0_00_29Z',
      createdBy: 'Chief Finance Officer',
      date: '20/09/2022',
      time: '08:05 PM',
      fileFormat: 'img',
      size: '2.00kb',
    },
    {
      sNo: '',
      fileName: 'image_2024_05_25T0_00_29Z',
      createdBy: 'Chief Finance Officer',
      date: '19/09/2022',
      time: '08:05 PM',
      fileFormat: 'img',
      size: '3.00kb',
    },
  ];
  tableStatusMenuData = [
    {
      changedBy: 'Chief Finance Officer',
      effectiveDate: '29/09/2023 10:57 AM',
      status: 'In Progress',
    },
    {
      changedBy: 'Chief Finance Officer',
      effectiveDate: '29/09/2023 10:57 AM',
      status: 'Approved',
    },
  ];
  previousValue = '';


  prefix: any = ['prefixValue', 'effectiveFrom', 'addBranchCode', 'add'];
  prefixName: any = ['Prefix Value', 'Effective Date', 'Add Branch Code', ''];

  branch: any = ['branchName', 'currentRefNo', 'restartedDate', 'modifiedDate'];
  branchName: any = [
    'Branch',
    'Current Ref No',
    'Returned Date',
    'Modified Date',
  ];

  branchAccess: any = [
    'sNo',
    'branchName',
    'effectiveDate',
    'createdDate',
    'statusDescription',
    'istrApprovedByUserName',
    'add',
  ];
  regionAccessName: any = [
    'Region',
    'Added By',
    'Added Date',
    // 'Modified By',
    // 'Modified Date',
    '',
    ''
  ];
  regionAccess: any = [
    'regionDescription',
    'enteredByFullName',
    'createdDate',
    // 'modifiedByFullName',
    // 'modifiedDate',
    'add',
    'delete'
  ];
  branchAccessName: any = [
    '',
    'Branch Name',
    'Effective Date',
    'End Date',
    'Status',
    'Approved By',
    '', ''
  ];

  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', ''];

  statusMenu: any = ['changedBy', 'status'];
  statusMenuName: any = ['Changed By', 'Status'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('branchAccessDialog') branchAccessDialog!: TemplateRef<any>;
  @ViewChild('regionDialog') regionDialog!: TemplateRef<any>;

  @ViewChild('prefixDialog', { static: false })
  prefixDialog!: TemplateRef<any>;

  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/   vnd.ms-excel, application/pdf, application/msword';
  id: any = 0;
  isProduction = false;
  subtype = [];
  defaultPayment = [];
  access = '';
  options = {
    hideFullSpinner: true,
  };
  voucherConfig = new entActVoucherConfig();
  voucherPrefix = new entActVoucherNumberPrefix();
  voucherBranchAccess = new entActVoucherBranchAccess();
  statusddl = [];
  regionData = new entActVoucherRegionAccess();
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('y') yform!: NgForm;
  @ViewChild('p') pform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('r') rform!: NgForm;
  branchId = 0

  __showTax = signal(true);
  openApproved: boolean = true;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    private appService: AppService,
    public accountsService: AccountsApiService,
    public storage: AppStorageService,

  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let paramsId: any = this.route.snapshot.paramMap.get('id');
    this.id = await this.url.decode(paramsId);

    await this.storage.get('branchDDL').then((val) => {
      this.branchDDL = val;
    });
    await this.storage.get('branchValue').then((val) => {
      this.branchValue = val;
    });
    await this.storage.get('branchId').then((val) => {
      console.log(val);

      this.branchId = val;
    });

    // if (this.branchValue !== '') {
    //   this.changeBranch(this.branchValue);
    // }
    this.initialData.getAcccountsDDL(
      'getVoucherConfigInitialData',
      this.options
    );
    if (this.id > 0) {
      this.openVoucherConfig(this.id);
    } else {
      this.createNewVoucherConfig();
    }
  }

  isShowTax(val: any) {

    this.__showTax.set(
      val !== 'STKTN' &&
      val !== 'JNLVC' &&
      val !== 'REVJN' &&
      val !== 'NTOUT' &&
      val !== 'FTNTE' &&
      val !== 'PDNTE' &&
      val !== 'PYNTE' &&
      val !== 'APYNT' &&
      val !== 'RTNTE' &&
      val !== 'ADVRN'
    );
  }

  createNewVoucherConfig() {
    this.errorTrue = false;
    this.accountsService.createNewVoucherConfig().subscribe(async (success) => {
      this.voucherConfig = success;
      this.isShowTax(this.voucherConfig.voucherTypeValue);
      this.data.successMessage('Data Cleared Successfully');

    });
  }
  createNewVoucherNumberPrefix(type?: any) {
    this.errorTrue = false;
    this.accountsService
      .createNewVoucherNumberPrefix()
      .subscribe(async (success) => {
        this.voucherPrefix = success;
        if (type === 'clear') {

          this.data.successMessage('Data Cleared Successfully');
        }

      });
  }
  clearPrefix() {
    this.createNewVoucherNumberPrefix('clear');
    // this.dialogClose()
    this.data.successMessage('Data Cleared Successfully');
  }

  openVoucherNumberPrefix(val: any, type?: any) {
    const obj = {
      data: val,
    };
    this.errorTrue = false;
    this.accountsService
      .openVoucherNumberPrefix(obj)
      .subscribe(async (success) => {
        this.voucherPrefix = success;
      });
    if (type != 'refresh') {
    } else {
      this.data.successMessage('Data Refreshed Successfully');
    }
  }
  createNewVoucherBranchAccess() {
    this.errorTrue = false;
    this.accountsService
      .createNewVoucherBranchAccess()
      .subscribe(async (success) => {
        this.voucherBranchAccess = success;
        this.statusddl = success.lddlData;
      });
  }
  openVoucherBranchAccess(val: any, type?: any) {
    const obj = {
      data: val,
    };
    this.errorTrue = false;
    this.accountsService
      .openVoucherBranchAccess(obj)
      .subscribe(async (success) => {
        this.voucherBranchAccess = success;
        if (this.voucherBranchAccess.statusValue === 'APROV') {
          this.openApproved = false;
        } else {
          this.openApproved = true;
        }
        this.statusddl = success.lddlData;
      });
    if (type != 'refresh') {
    } else {
      this.data.successMessage('Data Refreshed Successfully');
    }
  }
  saveVoucherConfig(type?: any) {

    if (this.selectedTab === 0) {
      if (this.xForm.valid && this.yform.valid) {
        this.accountsService
          .saveVoucherConfig(this.voucherConfig)
          .subscribe(async (success) => {
            this.voucherConfig = success;

            if (type === 'new') {
              let urlJson = await this.url.encode(success.actVoucherConfigId);
              this.router.navigateByUrl(
                '/home/finance/voucher/detail/' + urlJson
              );
            }
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            this.dialogClose();
          });
      } else {
        this.errorTrue = true;
      }
    }
    else {
      if (this.xForm.valid) {
        this.accountsService
          .saveVoucherConfig(this.voucherConfig)
          .subscribe(async (success) => {
            this.voucherConfig = success;
            
            if (type === 'new') {
              let urlJson = await this.url.encode(success.actVoucherConfigId);
              this.router.navigateByUrl(
                '/home/finance/voucher/detail/' + urlJson
              );
            }
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            this.dialogClose();
          });
      } else {
        this.errorTrue = true;
      }
    }

  }
  region: any = []
  getVoucherSubTypeByVoucherType(value: any) {
    // this.region=[];
    // this.voucherConfig.voucherTypeValue = "";
    const obj = {
      data: value,
    };
    this.accountsService
      .getVoucherSubTypeByVoucherType(obj)
      .subscribe((success) => {
        this.subtype = success.data[0].value;
      });

    // this.initialData.DDLValues.DDLRegion.forEach((element:any) => {
    //   if(value==='TRUST' && element.constant==='REGIO'){
    //     this.regionData.regionValue ='REGIO';
    // // this.region.push(element)
    //   }

    //   else if(value!=='TRUST' && element.constant==='REGI1'){
    //     this.region.push(element)
    //   }

    //   console.log(element);

    // });
    // this.initialData.DDLValues.DDLRegion.forEach((val:any) => {
    //   if(value!=='TRUST' && val.constant!=='"REGIO"'){
    //     console.log(val, 'check');

    // this.region.push(val)
    //   }
    //   console.log(val);

    // });
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  loadImageFromDevice(event: any) {
    const files = event.target.files;
    // if (files[0].type !== 'image/png') {
    if (files.length > 0) {
      this.imageGallery.iImage = {
        content: '',
        relativePath: '',
        fileSizeKb: 0,
        fileTypeId: 0,
        fileTypeValue: '',
        idoObjState: '',
        imageId: 0,
        updateSeq: '',
        fileName: '',
      };
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const img: any = reader.result;
        this.voucherConfig.pdfSignature = img;
      };
      reader.onerror = (error) => {
        this.data.internalServerError(
          'Error has been occured,while selecting the file.'
        );
      };
      this.fileInput.nativeElement.value = '';
    }
    // } else {
    //   this.data.successMessage('For enhanced security, we request that you convert the file into jpeg/jpg format.')
    // }
  }
  navigateToList() {
    this.router.navigateByUrl('/home/finance/voucher/search');
  }
  openVoucherConfig(val: any, type?: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openVoucherConfig(obj)
      .subscribe(async (success: any) => {
        this.voucherConfig = success;
        this.isShowTax(this.voucherConfig.voucherTypeValue)
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.getPostingVoucherDDL();
        this.tablePrefixData = success.ilistentActVoucherNumberPrefix;
        this.tableBranchData = success.ilistentActRunningVoucherNumber;
        this.tableBranchAccessData = success.ilistentActVoucherBranchAccess;
        this.tableRegionAccessData = success.plstentActVoucherRegionAccess;
        await this.getVoucherSubTypeByVoucherType(success.voucherCategoryValue);
        this.getVoucherType(this.voucherConfig.voucherTypeValue);
        //  this.clearimg();
      });
    if (type != 'refresh') {

    } else {
      this.data.successMessage('Data Refreshed Successfully');
    }
    if (this.voucherConfig.voucherCategoryValue === 'TRUST') {
      this.initialData.DDLValues.DDLRegion
    }
  }
  hideNeedInventoryItem() {
    let needInventoryItem = false;
    if (
      this.voucherConfig.voucherTypeValue !== 'RTNTE' &&
      this.voucherConfig.voucherTypeValue !== 'ADVRN' &&
      this.voucherConfig.voucherTypeValue !== 'PYNTE' &&
      this.voucherConfig.voucherTypeValue !== 'APYNT' &&
      this.voucherConfig.voucherTypeValue !== 'JNADM' &&
      this.voucherConfig.voucherTypeValue !== 'FTNTE' &&
      this.voucherConfig.voucherTypeValue !== 'REVJN' &&
      this.voucherConfig.voucherTypeValue !== 'JNLVC' &&
      this.voucherConfig.voucherTypeValue !== 'RVVHR' &&
      this.voucherConfig.voucherTypeValue !== 'PMVHR'
    ) {
      needInventoryItem = true;
    } else {
      needInventoryItem = false;
    }

    return needInventoryItem;
  }
  getPostingVoucherDDL(val?: any) {
    const obj = {
      data: this.voucherConfig.voucherTypeValue,
    };
    this.accountsService.getPostingVoucherDDL(obj).subscribe((success: any) => {
      this.defaultPayment = success.value;
    });
  }

  triggerClick() {
    this.fileInput.nativeElement.click();
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
  }

  async openDialogPrefix(val: any) {
    if (val === 0) {
      this.createNewVoucherNumberPrefix();
    } else {
      this.openVoucherNumberPrefix(val);
    }
    let dialogResponse: any = await this.dialog.openDialog(this.prefixDialog, {
      disableClose: true,
      height: 'auto',
      width: '550px',
      maxWidth: '1170px',
    });
  }

  async openBranchAccess(val: any) {
    this.voucherBranchAccess = new entActVoucherBranchAccess();
    if (val == 0) {
      this.createNewVoucherBranchAccess();
    } else {
      this.openVoucherBranchAccess(val);
    }
    let dialogResponse: any = await this.dialog.openDialog(
      this.branchAccessDialog,
      {
        disableClose: true,
        height: 'atuo',
        width: '600px',
        maxWidth: '1170px',
      }
    );

  }
  saveVoucherNumberPrefix() {
    this.voucherPrefix.actVoucherConfigId =
      this.voucherConfig.actVoucherConfigId;
    if (this.pform.valid) {
      this.accountsService
        .saveVoucherNumberPrefix(this.voucherPrefix)
        .subscribe(async (success) => {
          this.voucherPrefix = success;
          this.tablePrefixData = success.ilstentActVoucherNumberPrefix;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.data.showErrorMessage = false;
          this.dialog.closeDialog();
        });
    } else {
      this.errorTrue = true;
    }
  }
  saveVoucherBranchAccess() {
    this.voucherBranchAccess.actVoucherConfigId =
      this.voucherConfig.actVoucherConfigId;
    if (this.voucherBranchAccess.isAllowed !== 'Y' && this.voucherBranchAccess.isRestricted !== 'Y') {
      this.data.errorInfoMessage('Please select any access type.');
      return
    }
    if (this.bform.valid) {
      this.voucherBranchAccess.actCompanyBranchId = this.branchId;
      this.accountsService
        .saveVoucherBranchAccess(this.voucherBranchAccess)
        .subscribe(async (success) => {
          if (this.voucherBranchAccess.statusValue === 'APROV') {
            this.openApproved = false;
            console.log(this.openApproved);
          }
          this.voucherBranchAccess = success;
          this.tableBranchAccessData = success.ilstentActVoucherBranchAccess;

          this.errorTrue = false;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.data.showErrorMessage = false;
          this.closeAllDialog();
        });
    } else {
      this.errorTrue = true;
    }
    // if (this.branchAccess.statusValue === 'APROV' ||
    //   this.branchAccess.statusValue === 'CANCL' ||
    //   this.branchAccess.statusValue === 'REJCT') {
    //   this.hideBranchBtn = true;

    // }
    // else {
    //   this.data.errorInfoMessage('Please select any access type');
    // }
    // this.onNoClick();
  }
  onNoClick() {
    this.dialog.closeAll();
  }
  clearVoucherBranchAccess() {
    this.createNewVoucherBranchAccess();
    // this.dialogClose()
    this.data.successMessage('Data Cleared Successfully');
  }

  clearimg() {
    this.voucherConfig.pdfSignature = '';
  }
  showCash() {
    let cash = false;
    if (
      this.voucherConfig.voucherTypeValue === 'SAICE' ||
      this.voucherConfig.voucherTypeValue === 'PRINV'
    ) {
      cash = true;
    } else {
      cash = false;
    }
    return cash;
  }
  conditionPosting = ['SAICE', 'PRINV', 'DBNTE', 'CRNTE'];
  showLedgerPostingFrom() {
    let ledgerPostingFrom = false;
    if (
      this.voucherConfig.voucherTypeValue === 'SAICE' ||
      this.voucherConfig.voucherTypeValue === 'PRINV' ||
      this.voucherConfig.voucherTypeValue === 'DBNTE' ||
      this.voucherConfig.voucherTypeValue === 'CRNTE'
    ) {
      ledgerPostingFrom = true;
    } else {
      ledgerPostingFrom = false;
    }

    return ledgerPostingFrom;
  }

  ledgerPostingFromClear() {
    this.voucherConfig.ledgerPostingFromValue = '';
  }

  //region
  createNewVoucherRegionAccess() {
    this.accountsService.createNewVoucherRegionAccess().subscribe((success) => {
      this.regionData = success;
      debugger
      if (this.voucherConfig.voucherCategoryValue === 'TRUST') {
        this.regionData.regionDescription = 'Trust account';
        this.regionData.regionValue = 'REGIO'
      }
      else {
        this.regionData.regionDescription = 'Corporate Account';
        this.regionData.regionValue = 'REGI1'

      }
    });
  }
  openRegionAccess(val: any, type?: any) {
    const obj = {
      data: val,
    };
    this.accountsService.openVoucherRegionAccess(obj).subscribe((success) => {
      this.regionData = success;
    });
    if (type != 'refresh') {
    } else {
      this.data.successMessage('Data Refreshed Successfully');
    }
  }
  async openRegionDialog(val: any) {
    if (val === 0) {
      this.createNewVoucherRegionAccess();
    } else {
      this.openRegionAccess(val);
    }
    let dialogResponse: any = await this.dialog.openDialog(this.regionDialog, {
      disableClose: true,
      height: 'atuo',
      width: '600px',
      maxWidth: '1170px',
    });
  }
  saveRegionAccess() {
    this.regionData.actVoucherConfigId = this.voucherConfig.actVoucherConfigId;

    if (this.rform.valid) {
      this.accountsService
        .saveVoucherRegionAccess(this.regionData)
        .subscribe((success) => {
          this.tableRegionAccessData = success.plstentActVoucherRegionAccess;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.data.showErrorMessage = false;
          this.closeAllDialog();
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearRegion() {
    this.createNewVoucherRegionAccess();
    this.data.successMessage('Data Cleared Sucessfully');
    // this.dialogClose()
  }

  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog();
  }
  closeAllDialog() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
  }
  branchAccessCheck1(event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.voucherBranchAccess.isAllowed = 'Y';
    } else {
      this.voucherBranchAccess.isAllowed = 'N';
    }
    console.log(this.voucherBranchAccess.isRestricted);
  }
  branchAccessCheck2(event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.voucherBranchAccess.isRestricted = 'Y';
    } else {
      this.voucherBranchAccess.isRestricted = 'N';
    }
  }
  getVoucherType(val: any) {
    this.accountsService
      .getVoucherType(this.voucherConfig, this.options)
      .subscribe((success) => {
        this.voucherConfig.isLedgerPosting = success.isLedgerPosting;
        this.isShowTax(val);
        if (this.id === 0) {
          if (val === 'PDNTE' || val === 'STKTN') {
            this.voucherConfig.needInventory = 'Y';
            this.isProduction = true;
          } else {
            this.voucherConfig.needInventory = 'N';
            this.isProduction = false;
          }
        }
      });

    this.getPostingVoucherDDL(val);
  }


  openRegionStatus(id: any) {
    const obj = {
      id: id,
    };
    this.accountsService
      .openVoucherRegionAccess(obj, this.options)
      .subscribe((success) => {
        this.statusLst = success.plstentActVoucherRegionAccessHistory;
      });
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
  // async changeBranch(val: any, flag?: any) {
  //   debugger
  //   if (flag) {
  //     let msg = `Are you sure change the Branch `;
  //     let response = await this.dialog.alertPopup(msg);
  //     if (response) {
  //       this.changeTokenForSelectedBranch(val);
  //       this.previousValue = this.appService.userData.branchValue;

  //       this.branchDDL.forEach(async (ele: any) => {
  //         if (val === ele.constant) {
  //           await this.storage.set('branchFinance', ele.description);
  //           await this.storage.set('branchId', ele.id);
  //           await this.storage.set('branchValue', val);
  //         }
  //       });
  //     } else {
  //       this.appService.userData.branchValue = this.previousValue;
  //     }
  //   } else {
  //     this.branchDDL.forEach(async (ele: any) => {
  //       if (val === ele.constant) {
  //         await this.storage.set('branchFinance', ele.description);
  //         await this.storage.set('branchId', ele.id);
  //       }
  //     });
  //   }
  // }
  // changeTokenForSelectedBranch(val: any) {
  //   const obj = {
  //     data: val,
  //   };
  //   this.accountsService
  //     .changeTokenForSelectedBranch(obj)
  //     .subscribe((success) => {
  //       this.appService.userData = success.ientUser;
  //       this.appService.branchValue = success.branchValue;
  //       this.storage.set('branchName', success.branchName);
  //       this.storage.set('branchvalue', this.branchValue);
  //       this.storage.set('userData', this.appService.userData);
  //       this.data.token = success.ientUser.keyToken;
  //     });
  // }

  deleteVoucherRegionAccess(val: any) {
    const obj = {
      data: val.actVoucherRegionAccessId
    }
    this.accountsService.deleteVoucherRegionAccess(obj).subscribe((success) => {
      this.tableRegionAccessData = success.plstentActVoucherRegionAccess;
    })
  }
  async deleteItemType(val: any) {
    let response = await this.dialog.checkDelete('Do you want to delete this Region');
    if (response) {
      this.deleteVoucherRegionAccess(val);
    }
  }
}
