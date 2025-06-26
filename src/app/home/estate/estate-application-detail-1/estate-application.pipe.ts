import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estateApplication',
  standalone: true
})
export class EstateApplicationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
