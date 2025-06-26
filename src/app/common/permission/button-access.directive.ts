import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from "@angular/core";
import { AppStorageService } from "../services/app-storage/app-storage.service";


@Directive({
  selector: "[appButtonAccess]",
  standalone: true
})
export class ButtonAccessDirective implements OnChanges {
  @Input("appButtonAccess") buttonAccess = "";
  @Input("status") status = false;
  @Input('parentId') parentId = '';

  replaceHtml =
    '<div class="v-center text-center"><h3>You are not authorized to view this page</h3></div>';

  constructor(private el: ElementRef, public storage: AppStorageService, public cdf: ChangeDetectorRef, public renderer: Renderer2) {
  }
  ngOnChanges(changes: SimpleChanges): void {


  }

  async ngOnInit() {
    let userData: any = {};
    await this.storage.get('userData').then((val) => {
      if (val) {
        userData = val;
      }
      else {
        return;
      }
    });

    if (userData.userRights) {
      const checkFullAccessIndex = userData.userRights
        .map((e: any) => e.iViewName)
        .indexOf('fullaccess');
      if (checkFullAccessIndex === -1) {
        const rights = userData.userRights;
        if (rights) {
          rights.forEach((element: any) => {
            element.resourcePermission.forEach((Permission: any) => {
              if (Permission.iResourceName === this.buttonAccess) {
                if (Permission.iPermission === '0') {
                  this.el.nativeElement.remove();
                }
              }
            });
          });

        }
      }
    } else {
      this.el.nativeElement.innerHTML = this.replaceHtml;
    }

  }

  // async init() {
  //   if (status) {
  //     this.el.nativeElement.remove();
  //   } else {
  //     if (this.buttonAccess === "False") {
  //       this.el.nativeElement.remove();
  //     }
  //   }
  // }
}
