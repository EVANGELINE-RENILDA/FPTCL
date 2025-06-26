import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { ApplicationApiService } from "../../../common/api-services/application-api/application-api.service";
import { entCrmCustomerBank } from "../../../common/api-services/application-api/application-api.classes";
import { InitialDataService } from "../../../common/services/initial-data/initial-data.service";
import { CoreService } from "../../service/core.service";
import { DataService } from "../../../common/services/data/data.service";

import { IconButtonComponent } from "../icon-button/icon-button.component";
import { InnerScroll, Row, ViewLabel } from "../../core-component/core-component.component";
import { InputControlComponent } from "../../form-input/input-control/input-control.component";
import { FormsModule, NgForm } from "@angular/forms";
import { AddressEditComponent } from "../address-edit/address-edit.component";
import { ErrorMessageComponent } from "../../message/error-message/error-message.component";

@Component({
    selector: 'add-bank',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [IconButtonComponent, Row, InnerScroll, InputControlComponent, FormsModule, ViewLabel, ErrorMessageComponent, AddressEditComponent],
    templateUrl: './add-bank.html',
    styleUrl: './add-bank.scss'
})
export class AddBankComponent {
    customerBank = new entCrmCustomerBank();
    bankCodeValue = "";
    errorTrue = false;
    options = {
        hideFullSpinner: true
    }
    @ViewChild('bankDialog', { static: false }) bankDialog!: TemplateRef<any>;
    @ViewChild('q') qForm!: NgForm;
    @ViewChild('x') xForm!: NgForm;
    createNewBankInfoValues = false;
    __referenceId = 0;
    @Input() set referenceId(referenceId: any) { this.__referenceId = referenceId || 0; }
    get referenceId() { return this.__referenceId; }

    __branchName = "";
    @Input() set branchName(branchName: any) { this.__branchName = branchName || 0; }
    get branchName() { return this.__branchName; }

    @Output('onComplete') onComplete: EventEmitter<any> = new EventEmitter();
    @Output('onClose') onClose: EventEmitter<any> = new EventEmitter();

    constructor(private api: ApplicationApiService,
        public initialData: InitialDataService,
        public dialog: CoreService,
        public data: DataService
    ) {

    }

    createBankDetail() {
        this.api.createNewCustomerBank().subscribe((success) => {
            this.bankDialogBox();
            this.customerBank = success;
        })
    }

    async bankDialogBox() {
        await this.initialData.getAllInitialHeadofficeBankValueDetails(this.options);
        this.data.showErrorMessage = false

        let dialogResponse: any = await this.dialog.openDialog(this.bankDialog, {
            disableClose: true,
            height: '550px',
            width: '100%',
            maxWidth: '1170px',

        });
        if (dialogResponse) {
            // this.getBankList()
        }
    }
    saveBankDetails() {
        if (this.qForm.valid && this.xForm.valid) {
            this.customerBank.customerId = this.__referenceId;
            this.api.saveCustomerBank(this.customerBank).subscribe((success) => {
                this.customerBank = success;
                this.onComplete.emit();
                // this.bankCode(this.receiptTrustEstate.customerAccountNumber);
                this.dialog.closeDialog();
                this.data.successMessage(success.msg.infoMessage.msgDescription);
            })
        }
        else {
            this.errorTrue = true
        }
    }

    viewBankDetailsBasedOnBankCode(x: any) {
        if (!x.valid) { this.errorTrue = true; return; }
        this.errorTrue = false;
        const obj = {
            data: this.bankCodeValue
        }
        this.api.getBankDetailsBasedOnBranchCode(obj).subscribe((success) => {
            this.customerBank = success;
            this.createNewBankInfoValues = true;
            this.customerBank.ientBank.bankCode = this.bankCodeValue;
        })
    }

    clearBankDetails() {
        this.errorTrue = false
        this.bankCodeValue = ''
        this.createBankDetail();
    }

    doClose(){
        this.dialog.closeDialog(); 
        this.onClose.emit();
        // getDDL()
    }
}