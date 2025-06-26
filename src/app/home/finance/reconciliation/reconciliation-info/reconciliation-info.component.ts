import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../common/services/url/url.service';
import { DataService } from '../../../../common/services/data/data.service';
import { NgClass } from '@angular/common';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { entCashCounterDepositBook } from '../../../../common/api-services/application-api/application-api.classes';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { LabelDash } from '../../../../app-core/core-component/core-component.component';

@Component({
  selector: 'app-reconciliation-info',
  standalone: true,
  imports: [
    NgClass,
    AppDatePipe,
    ErrorMessageComponent,
    AppAccessDirective,
    LabelDash
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reconciliation-info.component.html',
  styleUrl: './reconciliation-info.component.scss'
})
export class ReconciliationInfoComponent implements OnInit {
  pageId = '';
  id: any = 0;
  cashCounterDepositBook = new entCashCounterDepositBook();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  branchName: any;
  constructor(
    public route: ActivatedRoute,
    public url: UrlService,
    public data: DataService,
    public apiDataService: ApplicationApiService,
    public appService: AppService,
    public router: Router,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }
  ngOnInit(): void { }

  async init() {
    await this.data.checkToken();
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.id;
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });

    this.openDepositBook();
  }

  openDepositBook() {
    const obj = {
      data: this.id,
    };
    this.apiDataService
      .openCashCounterDepositBook(obj)
      .subscribe((success: any) => {
        this.cashCounterDepositBook = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async navigateDetail() {
    window.history.back();
  }
}
