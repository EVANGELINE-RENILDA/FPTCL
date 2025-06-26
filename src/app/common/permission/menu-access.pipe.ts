import { Pipe, PipeTransform } from '@angular/core';
import { AppStorageService } from '../services/app-storage/app-storage.service';

@Pipe({
  name: 'menuAccess',
  standalone: true,

})
export class MenuAccessPipe implements PipeTransform {

  constructor(private storage: AppStorageService) { }

  transform(elemId: string, userData: any): any {
    // 
    // this.storage.get('userData').then((userData) => {
    if (!userData || !userData.userRights || !elemId) {
      return false;
    }


    const rights = userData.userRights;
    const hasFullAccess = rights.some((right: any) => right.iViewName === 'fullaccess');
    if (hasFullAccess) {
      return true;
    }

    const prtdvIndex = rights.findIndex((right: any) => right.iViewName === 'PRTDV');
    if (prtdvIndex === -1) {
      return false;
    }

    const permissions = rights[prtdvIndex].resourcePermission;
    const hasPermission = permissions.some(
      (permission: any) => permission.iResourceName === elemId && permission.iPermission === '1'
    );

    return hasPermission;
    // });
  }
}
