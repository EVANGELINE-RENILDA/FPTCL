import { Injectable } from "@angular/core";
import { entIEMessage } from "../../../common/api-services/application-api/application-api.classes";


@Injectable({
  providedIn: "root",
})
export class DropZoneService {
  files: any = [];
  message = new entIEMessage();
  uploadFile: any = [];
  completedCount: any = 0;
  statusValue: any = '';
  constructor() { }
}
