import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CryptoJS from 'crypto-js';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';


@Injectable({
  providedIn: 'root',
})
export class AesService {
  constructor(public storage: AppStorageService, public appSetting: AppSettingsService) { }

  async encrypt(text: any) {
    return new Promise((resolve, reject) => {
      // ;
      if (this.appSetting.environment.encrypt === false) {
        // ;
        resolve(text);
        return;
      }
      this.storage.get('encryptkey').then((val: any) => {
        // 
        if (val) {
          let Key = CryptoJS.enc.Utf8.parse(val[0]);
          let IV = CryptoJS.enc.Utf8.parse(val[1]);
          let encryptedText = CryptoJS.AES.encrypt(text, Key, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });
          resolve(encryptedText.toString());
          return;
        } else {
          resolve(text);
          return;
        }
      });
    });
  }



}
