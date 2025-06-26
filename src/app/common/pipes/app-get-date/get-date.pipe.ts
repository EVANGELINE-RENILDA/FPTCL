import { Pipe, PipeTransform } from '@angular/core';
import { add, format, isValid, parse, sub } from 'date-fns';
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Pipe({
  name: 'getDate',
  standalone: true,
})
export class GetDatePipe implements PipeTransform {
  constructor(
    public appSetting: AppSettingsService
  ) {

  }
  // transform(value: string, num: any, type?: any, xFormat?: any): string {
  //   debugger
  //   if (!value) {
  //     return "";
  //   }
  //   if (!num) {
  //     return value;
  //   }
  //   if (num === 0) {
  //     return "";
  //   }
  //   let xType = "add";
  //   if (type) {
  //     xType = type;
  //   }

  //   let serverTimeFormat = this.appSetting.environment.serverDateFormatWithTime;
  //   if (xFormat) {
  //     serverTimeFormat = xFormat;
  //   }
  //   let returnDate = "";

  //   let parseNewDate = parse(value, serverTimeFormat, new Date());

  //   if (xType === 'add') {
  //     let newAddedDate = add(parseNewDate, { days: parseFloat(num) });
  //     return format(newAddedDate, serverTimeFormat);
  //   }
  //   if (xType === 'minus') {
  //     let newMinusDate = sub(parseNewDate, { days: parseFloat(num) });
  //     return format(newMinusDate, serverTimeFormat);
  //   }
  //   return "";
  // }

  transform(value: string, num: any, type?: any, xFormat?: string): string {
    if (!value) {
      return "";
    }
    if (!num) {
      return value;
    }
    if (num === 0) {
      return "";
    }

    // Default operation type
    let xType = type || "add";

    // Default date format for date-only and date-time formats
    let dateOnlyFormat = this.appSetting.environment.serverDateFormat;
    let dateTimeFormat = this.appSetting.environment.serverDateFormatWithTime;

    // Override format if xFormat is provided
    let serverTimeFormat = xFormat || (value.length > 10 ? dateTimeFormat : dateOnlyFormat);

    // Parse the input date string with the correct format
    let parseNewDate = parse(value, serverTimeFormat, new Date());

    // Ensure the parsed date is valid
    if (!isValid(parseNewDate)) {
      return "Invalid date";
    }

    // Add or subtract days based on the type
    if (xType === 'add') {
      let newAddedDate = add(parseNewDate, { days: parseFloat(num) });
      return format(newAddedDate, serverTimeFormat);
    }

    if (xType === 'minus') {
      let newMinusDate = sub(parseNewDate, { days: parseFloat(num) });
      return format(newMinusDate, serverTimeFormat);
    }

    return "";
  }

}
