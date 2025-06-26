
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../../common/services/data/data.service';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { CoreService } from '../../service/core.service';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';

@Component({
  selector: 'app-attachment-view',
  templateUrl: './attachment-view.component.html',
  styleUrls: ['./attachment-view.component.scss']
})
export class AttachmentViewComponent implements OnInit, AfterViewInit {
  loadingTrue = false;
  filePath: any;
  fileName: any;
  temp: any;
  constructor(
    public dialog: CoreService,
    public datas: DataService,
    public appSettingService: AppSettingsService,
    public overlay: Overlay,
    public vcr: ViewContainerRef,
    protected _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.pipe();
  }

  openDocumentImage(id: any, fileName: any, temp: any) {

    this.temp = temp;
    this.loadingTrue = true;
    const obj = {
      data: id,
    }
    this.datas.postPDFData('Customer/CustomerDocumentDownload', obj).subscribe((success: any) => {

      const resp = new Blob([success], { type: success.type });
      const fileURL = URL.createObjectURL(resp);
      if (success.type === 'application/pdf') {
        this.openPDFViewer(fileURL);
      } else if (success.type.includes('image')) {
        this.imageView(fileURL, fileName);
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = fileName;
        downloadLink.click();
      }

    })
  }

  openPDFViewer(xurl: any) {
    const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
    // dialogRef.().subscribe((result:any) => {
    //   if (result) {
    //     // this.logout();
    //   }
    // });
  }



  private overlayRef!: OverlayRef;
  download() {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.filePath;
    downloadLink.download = this.fileName;
    downloadLink.click();

  }

  imageView(path: any, filename: any) {
    this.filePath = path;
    this.fileName = filename;
    this.createOverlay();
  }

  createOverlay() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true
    });
    this.overlayRef.backdropClick().subscribe((_) => this.detachOverlay());
    this.attachOverlay();
  }

  attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const overlayRef = this.overlay.create();
      const imageView = new TemplatePortal(
        this.temp,
        this.vcr
      );
      this.temp;
      this.overlayRef.attach(imageView);
      this.imageExpandedView();
    } else {
      this.detachOverlay();
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      setTimeout(() => {
        this.overlayRef.detach();
        setTimeout(() => {
          this.overlayRef.dispose();
        }, 1000);
      }, 600);
    }
  }

  close() {
    this.detachOverlay();
  }

  imageExpandedView() {

  }

  pipe() {
    this.filePath = this._sanitizer.bypassSecurityTrustResourceUrl(this.filePath);
  }
}
