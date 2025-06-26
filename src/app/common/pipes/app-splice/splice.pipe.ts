import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splice',
  standalone: true
})
export class SplicePipe implements PipeTransform {

  transform(items: any, keyname: any): any {
    // console.log(items)
    let itemsLsit: any = [];

    if(items) {
      itemsLsit =  items;
      for(let i = 0; i < items.length; i++) {
        if(items[i][keyname].invItemId === 0) {
          itemsLsit.splice(i, 1);
        }
      }
      return itemsLsit;
    }
  }

}
