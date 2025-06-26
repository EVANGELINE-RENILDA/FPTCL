import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileType",
  standalone: true,
})
export class FileTypePipe implements PipeTransform {
  transform(value: any, filetype: any): any {
    



    if (filetype === "") {
      return true;
    }
    if (!filetype) {
      return true;
    }
    return !filetype.test(value);
  }
}
