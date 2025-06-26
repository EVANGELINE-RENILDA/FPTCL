import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter',
  standalone: true
})
export class AppFilterPipe implements PipeTransform {

  keyname: any;

  transform(items: any, filter: any, defaultFilter?: boolean): any {
    // If filter Empty return all items
    if (!filter) {
      return items;
    }
    // check items is array
    if (!Array.isArray(items)) {
      return items;
    }
    let filterKeys = Object.keys(filter);
    this.keyname = filterKeys;
    if (defaultFilter) {
      return items.filter((item) =>
        filterKeys.reduce(
          (x: any, keyName: any) =>
            (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) ||
            filter[keyName] === '',
          true
        )
      );
    } else {
      if (this.keyname[0] === 'nokeyname') {
        return items.filter((item) => {
          return filterKeys.some((keyName) => {
            return (
              new RegExp(filter[keyName], 'gi').test(item) || filter === ''
            );
          });
        });
      } else {
        return items.filter((item) => {
          return filterKeys.some((keyName) => {
            return (
              new RegExp(filter[keyName], 'gi').test(item[keyName]) ||
              filter[keyName] === ''
            );
          });
        });
      }
    }
  }

}
