import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trustSettlementPipe',
  standalone: true
})
export class TrustSettlementPipe implements PipeTransform {

  transform(items: any[], applicationStageValue: any, identificationNo: any): any[] {
    debugger
    if (!items) return [];
    if (!applicationStageValue && !identificationNo) return items;

    return items.filter(item => {
      const matchesApplicationStage = applicationStageValue ? item.applicationStageValue === applicationStageValue : true;
      const matchesIdentityNo = identificationNo ? item.identificationNo === identificationNo : true;
      console.log(applicationStageValue, identificationNo);
      return matchesApplicationStage && matchesIdentityNo;

    });

  }

}
