import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from './../../../../common/services/url/url.service';

@Injectable({
  providedIn: 'root'
})
export class LedgerRouteService {

  constructor(
    public urlService: UrlService,
    public router: Router
  ) {  }

  async navigatePageBasedonLedgerEntries(val: any) {
   
    let voucherType = val.voucherTypeValue;
    const obj = {
      data: val.voucherId,
      data1: 0,
    }
    console.log(voucherType,'navigate');
    
    let urlJson = await this.urlService.encode(obj)
    if (voucherType === 'ADVRN') {
      this.router.navigateByUrl(
        '/home/sales/advance-receipt-note/detail/' + urlJson
      );
    }  if (voucherType === 'APYNT') {
      this.router.navigateByUrl(
        '/home/purchase/advance-payment-note/detail/' + urlJson
      );
    }  if (voucherType === 'FTNTE') {
      this.router.navigateByUrl(
        
        '/home/finance/fund-transfer-note/detail/' + urlJson
      );
    }  if (voucherType === 'RTNTE') {
      this.router.navigateByUrl('/home/sales/receipt-note/detail/' + urlJson);
    }  if (voucherType === 'JNLVC') {
      this.router.navigateByUrl(
        '/home/finance/journal-voucher/detail/' + urlJson
      );
    }  if (voucherType === 'REVJN') {
      this.router.navigateByUrl(
        '/home/finance/reversing-journal/detail/' + urlJson
      );
    }  if (voucherType === 'SAODR') {
      this.router.navigateByUrl(
        '/home/sales/order-list/detail/' + urlJson
      );
    } if (voucherType === 'SAICE') {
      this.router.navigateByUrl(
        '/home/sales/invoice-list/detail/' + urlJson
      );
    } if (voucherType === 'PYNTE') {
      this.router.navigateByUrl(
        '/home/purchase/payment-note/detail/' + urlJson
      );
    } if (voucherType === 'PRODR') {
      this.router.navigateByUrl(
        '/home/purchase/order/detail/' + urlJson
      );
    } if (voucherType === 'PRINV') {
      this.router.navigateByUrl(
        '/home/purchase/invoice-list/detail/' + urlJson
      );
    } if (voucherType === 'NTOUT') {
      this.router.navigateByUrl(
        '/home/finance/net-out-voucher/detail/' + urlJson
      );
    } if (voucherType === 'DBNTE') {
      this.router.navigateByUrl(
        '/home/purchase/debit-note/detail/' + urlJson
      );
    } if (voucherType === 'CRNTE') {
      this.router.navigateByUrl(
        '/home/sales/credit-note/detail/' + urlJson
      );
    }
  }
}
