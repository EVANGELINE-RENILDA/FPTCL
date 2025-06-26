import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileSize",
  standalone: true,

})
export class FileSizePipe implements PipeTransform {
  transform(value: any): any {
    // console.log(value);
    return (value / 1024 / 1024).toFixed(2);
  }
}
