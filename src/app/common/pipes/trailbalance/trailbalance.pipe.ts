import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trailbalance',
  standalone:true
})
export class TrailbalancePipe implements PipeTransform {
  transform(
    items: any,
    type: any,
    id: any,
    key: any,
    content: any,
    parent?: any
  ): any {
    // debugger;
    let xValue: any = 0;
    if (content === 'group') {
      // debugger
      xValue =
        items.plstentActGroup[
          items.plstentActGroup.map((e: any) => e.actGroupId).indexOf(id)
        ][key];
    }

    if (content === 'ledger') {
      const index = items.plstentActGroup
        .map((e: any) => e.actGroupId)
        .indexOf(parent);
      const index1 = items.plstentActGroup[index].ilistentLedger
        .map((e: any) => e.actLedgerId)
        .indexOf(id);

      xValue = items.plstentActGroup[index].ilistentLedger[index1][key];
    }

    if (content === 'child') {
      const index = items.plstentActGroup
        .map((e: any) => e.actGroupId)
        .indexOf(parent);
      const index1 = items.plstentActGroup[index].ilistOfGroup
        .map((e: any) => e.actGroupId)
        .indexOf(id);

      xValue = items.plstentActGroup[index].ilistOfGroup[index1][key];
    }
    return xValue;
  }
}
