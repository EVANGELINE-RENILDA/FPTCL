import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iszero',
  standalone: true
})
export class IszeroPipe implements PipeTransform {

  transform(value: any): boolean {
    if (!value) {
      let rvalue = 0;
      return rvalue === 0 ? true : false;
    }
    let rvalue = parseFloat(value);
    return rvalue === 0 ? true : false;
  }

}
