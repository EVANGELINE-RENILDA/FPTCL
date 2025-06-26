import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import {
  entCustomer,
  entCustomerServiceLeadSearch,
} from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import {
  Row,
  InnerScroll,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { entInvCategory } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    InputControlComponent,
    Row,
    FormsModule,
    IconButtonComponent,
    InnerScroll,
    AddressEditComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    CheckboxComponent,
    ViewLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  pageId = 'ITCSC';
  ItemCategory = new entInvCategory();
  ItemCategoryRaw = new entInvCategory();
  dialogData: any;
  errorTrue = false;
  showEditData = false;
  options = {
    type: 'accountsPath',
  };
  @ViewChild('l') lform!: NgForm;
  constructor(
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService,
    public dialog: CoreService,
    public appService: AppService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any
  ) {
    this.dialogData = xData;
  }
  ngOnInit(): void {
    this.init();
    this.errorTrue = false;
  }

  async init() {
    await this.initialData.getAcccountsDDL(
      'getInvCategoryInitialData',
      this.options
    );
    if (!!this.dialogData.val) {
      this.openSelectedCategoryDetail(this.dialogData.val);
    } else {
      this.createNewInvCategory();
    }
  }
  createNewInvCategory() {
    this.accountsService
      .createNewInvCategory(this.options)
      .subscribe((success) => {
        this.ItemCategory = success;
        this.errorTrue = false;
      });
  }

  onClear() {
    this.createNewInvCategory();
    this.data.successMessage('Data Cleared Successfully');
  }

  openSelectedCategoryDetail(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openSelectedCategoryDetail(obj, this.options)
      .subscribe((success) => {
        this.ItemCategory = success;
      });
  }

  refreshCategoryDetails(id: number) {
    this.openSelectedCategoryDetail(id);
    this.data.successMessage('Data Refreshed');
  }

  saveInvCategoryDetails() {
    if (this.lform.valid) {
      this.accountsService
        .saveInvCategoryDetails(this.ItemCategory, this.options)
        .pipe(finalize(() => {}))
        .subscribe((success) => {
          this.ItemCategory = success;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.dialog.closeDialog();
        });
    } else {
      this.errorTrue = true;
    }
  }
}
