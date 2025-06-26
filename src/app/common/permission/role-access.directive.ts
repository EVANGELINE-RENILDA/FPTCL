import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoleAccess]',
  standalone: true
})
export class RoleAccessDirective {

  // @Input('appRoleAccess') elemId = '';

  elemId = '';
  @Input()
  set appRoleAccess(appRoleAccess: string) {
    this.elemId = appRoleAccess || '';
    this.init();
  }
  get appRoleAccess() {
    return this.elemId;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  async ngOnInit() {

  }
  init() {
    if (this.elemId !== 'true') {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
