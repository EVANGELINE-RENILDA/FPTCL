import { DIALOG_DATA, DialogRef, DialogModule } from '@angular/cdk/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { InnerScroll } from './core-component.component';

@Component({
    selector: 'app-notification-alert',
    standalone: true,
    imports: [DialogModule, InnerScroll],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `<div class="dialog-container">
                    <div class="dialog-content">
                        <div class="dialog-content-inner">
                            <div class="notification-header">
                                <div class="notification-icon">
                                    <ion-icon name="warning-outline"></ion-icon>
                                </div>
                                <div class="notification-title">Alert</div>
                            </div>
                           <!-- <scroll> -->
                            <div class="outer-content-wrapper">
                                <div class="content-wrapper">

                                    <div class="notification-message">
                                         {{data?.msg}}
                                     </div>
                                </div>
                            </div>
                           <!-- </scroll> -->
                            <div class="notification-button">
                                <button class="btn-notification" (click)="dialogRef.close()">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>`,
})
export class NotificationAlertComponent {
    constructor(
        public dialogRef: DialogRef<string>,
        @Inject(DIALOG_DATA) public data: any,
    ) {

    }

}
@Component({
    selector: 'app-confirmation-alert',
    standalone: true,
    imports: [DialogModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `<div class="dialog-container">
                    <div class="dialog-content">
                        <div class="dialog-content-inner">
                            <div class="notification-header">
                                <div class="notification-icon">
                                    <ion-icon name="warning-outline"></ion-icon>
                                </div>
                                <div class="notification-title">Alert</div>
                            </div>
                            <div class="notification-message">
                                {{data?.msg}}
                            </div>
                            <div class="notification-button">
                            <button class="btn-notification" (click)="dialogRef.close(false)">Cancel</button>
                                <button class="btn-notification" (click)="dialogRef.close(true)">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>`,
})
export class ConfirmationAlertComponent {
    constructor(
        public dialogRef: DialogRef<any>,
        @Inject(DIALOG_DATA) public data: any,
    ) {

    }

}