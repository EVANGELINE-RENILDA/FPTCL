import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profitandloss',
  standalone: true
})
export class ProfitandlossPipe implements PipeTransform {
  transform(
    items: any,
    type: any,
    id: any,
    key: any,
    content: any,
    parent?: any
  ): any {
    let xValue: any;

    if (content === 'group') {
      xValue =
        items[type].ilistOfGroup[
          items[type].ilistOfGroup.map((e: any) => e.actGroupId).indexOf(id)
        ][key];
    }

    if (content === 'ledger') {
      const index = items[type].ilistOfGroup
        .map((e: any) => e.actGroupId)
        .indexOf(parent);
      const index1 = items[type].ilistOfGroup[index].ilistentLedger
        .map((e: any) => e.actLedgerId)
        .indexOf(id);

      xValue = items[type].ilistOfGroup[index].ilistentLedger[index1][key];
    }

    if (content === 'child') {
      const index = items[type].ilistOfGroup
        .map((e: any) => e.actGroupId)
        .indexOf(parent);
      const index1 = items[type].ilistOfGroup[index].ilistOfGroup
        .map((e: any) => e.actGroupId)
        .indexOf(id);

      xValue = items[type].ilistOfGroup[index].ilistOfGroup[index1][key];
    }
    return xValue;
  }
}
