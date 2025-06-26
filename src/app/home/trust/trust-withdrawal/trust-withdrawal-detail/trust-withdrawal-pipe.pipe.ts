import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trustWithdrawalPipe',
  standalone: true
})
export class TrustWithdrawalPipePipe implements PipeTransform {

  transform(items: any[], applicationStageValue: any, identificationNo: any): any[] {
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


