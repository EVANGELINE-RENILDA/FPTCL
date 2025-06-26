import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'legalServicePipe',
  standalone: true
})
export class LegalServicePipe implements PipeTransform {
  transform(items: any[], applicationStageValue: any, identityNo: any): any[] {
    
    if (!items) return [];
    if (!applicationStageValue && !identityNo) return items;

    return items.filter(item => {
      const matchesApplicationStage = applicationStageValue ? item.applicationStageValue === applicationStageValue : true;
      const matchesIdentityNo = identityNo ? item.identificationNo === identityNo : true;
      return matchesApplicationStage && matchesIdentityNo;
    });

  }

}


