import { MatButtonModule } from '@angular/material/button';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentViewComponent } from './attachment-view.component';
import { PermissionModule } from '../../permission/permission/permission.module';
import { PipesModule } from "../../pipes/pipes.module";



@NgModule({
    declarations: [
        AttachmentViewComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AttachmentViewComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        PermissionModule,
        PipesModule,
    ]
})
export class AttachmentViewModule { }
