import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'float',
  standalone: true
})
export class FloatPipe implements PipeTransform {

  transform(value: any): any {
    if(!value){
      return 0;
    }

    return parseFloat(value);
  }

}
