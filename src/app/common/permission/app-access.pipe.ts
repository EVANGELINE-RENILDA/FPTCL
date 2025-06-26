import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAccess'
})
export class AppAccessPipe implements PipeTransform {

  transform(parent: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
