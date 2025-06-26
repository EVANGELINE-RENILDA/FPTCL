import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Storage } from '@ionic/storage';

@Directive({
  selector: '[appTabAccess]',
  standalone: true
})
export class TabAccessDirective {
  @Input('appTabAccess') elemId = '';
  accessId = '';
  parentId = '';
  replaceHtml =
    '<div class="v-center text-center"><h3>You are not authorized to view this tab</h3></div>';
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    public storage: Storage
  ) { }

  async ngOnInit() {
    // g(this.elemId);
    let stringArray = this.elemId.split("/");
    this.parentId = stringArray[0];
    this.accessId = stringArray[1];
    let userData: any = {};
    await this.storage.get('userData').then((val) => {
      if (val) {
        userData = val;
        // 
      } else {
        return;
      }
    });

    if (userData.entUserRights) {
      const rights = userData.entUserRights;
      const index = rights.map((e: any) => e.iViewName).indexOf(this.parentId);

      if (index !== -1) {
        const permissions = rights[index].entResourcePermission;
        const isAvailableIndex = permissions
          .map((e: any) => e.iResourceName)
          .indexOf(this.accessId);
        if (isAvailableIndex !== -1) {
          if (permissions[isAvailableIndex].iPermission === '0') {
            this.viewContainer.clear();
          } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

}
