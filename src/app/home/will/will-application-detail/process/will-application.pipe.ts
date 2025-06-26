import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'willApplicationPipe',
  standalone: true
})
export class WillApplicationPipe implements PipeTransform {
  transform(items: any[], applicationStageValue: any, identityNo: any): any[] {
    debugger
    if (!items) return [];
    if (!applicationStageValue && !identityNo) return items;

    return items.filter(item => {
      const matchesApplicationStage = applicationStageValue ? item.applicationStageValue === applicationStageValue : true;
      const matchesIdentityNo = identityNo ? item.identityNo === identityNo : true;
      return matchesApplicationStage && matchesIdentityNo;
    });
  }
}
