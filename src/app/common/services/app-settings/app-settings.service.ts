import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public environment: any = {
    adminPath: '',
    accountsPath: '',
    socketPath: '',
    serverDateFormat: "",
    serverDateFormatWithTime: "",
    dateViewFormat: "",
    dateViewFormatWithTime: "",
    clientCode: "",
    userLoginId: '',
    emailId: '',
    menuName: '',
    countryCode:'',
  };
  helperText: any = {};

  constructor(private http: HttpClient) { }

  loadConfig() {
    let d = new Date();
    let n = d.getTime();
    return this.http.get('./app.settings.json?v=' + n);
  }
  // loadHelperText() {
  //   let d = new Date();
  //   let n = d.getTime();
  //   return this.http.get('./app.helper.json?v=' + n);
  // }

}
