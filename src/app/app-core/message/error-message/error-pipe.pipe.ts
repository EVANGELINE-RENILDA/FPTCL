import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorPipe',
  standalone: true
})
export class ErrorPipePipe implements PipeTransform {
  transform(data: any[], id: number, key: string): any[] {
    // debugger
    if (!data || data.length === 0 || !id || !key) {
      return data;
    }

    return data.filter(item => item[key] === id);
  }

}
