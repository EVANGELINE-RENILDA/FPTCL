import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
} from "@angular/core";


import { DropZoneService } from "./drop-zone.service";
import { FileTypePipe } from "./file-type.pipe";
import { AttachmentViewComponent } from "../attachment-view/attachment-view.component";
import { DataService } from "../../../common/services/data/data.service";
import { AppStorageService } from "../../../common/services/app-storage/app-storage.service";
import { AppSettingsService } from "../../../common/services/app-settings/app-settings.service";
import { CoreService } from "../../service/core.service";
import { entIEMessage } from "../../../common/api-services/application-api/application-api.classes";
import { ViewPdfComponent } from "../view-pdf/view-pdf.component";
import { DirectivesModule } from "../../directives/directives.module";
import { JsonPipe, NgClass, NgTemplateOutlet } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileSizePipe } from "./file-size.pipe";
import { Row } from "../../core-component/core-component.component";
import { ButtonAccessDirective } from "../../../common/permission/button-access.directive";
import { IconButtonComponent } from "../icon-button/icon-button.component";

@Component({
  selector: "app-drop-zone",
  templateUrl: "./drop-zone.component.html",
  styleUrls: ["./drop-zone.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [DirectivesModule, NgClass, FormsModule, FileTypePipe, FileSizePipe, NgTemplateOutlet, Row, ButtonAccessDirective, IconButtonComponent, JsonPipe],
})
export class DropZoneComponent implements OnInit {
  pageId = "PRODT";
  @Input() public accessbtnName = "";
  @Input() public fileSizeLimit = 5;
  @Input() public errorTrue = false;
  @Input() public multiple = false;
  @Input() public mandatory = false;
  @Input() public subTypeDocument = false;
  @Input() public btnClicked = false;
  isfileSizeError = false;
  @Input() public acceptFileType = "image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/*";
  flag: any;
  @Input() public single = false;
  @Input() public fileTypePattern = /(\.jpeg|\.JPEG|\.jpg|\.JPG|\.png|\.PNG|\.gif|\.GIF|\.tiff|\.TIFF|\.tif|\.pdf|\.PDF|\.doc|\.docx|\.ppt|\.csv)$/i;
  // @Input() public fileTypePattern = /(\.jpeg|\.JPEG|\.jpg|\.JPG|\.png|\.PNG|\.gif|\.GIF|\.tiff|\.TIFF|\.webp|\.WEBP|\.doc|\.DOC|\.docx|\.DOCX|\.pdf|\.PDF\.xlx|\.xlsx)$/i;
  @Input() public fileType = "jpg, jpeg, png, tiff, gif, tif ,pdf,doc,docx";
  @Input() public documentType = "xls, doc, pdf, docx, ppt, pptx, sql, txt, csv";
  @Input() public dropText = "Drop your files here";
  @Input() public accept = "image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/*";
  @Input() public uploadWarning =
    "Upload only images with file extention of " + this.fileType;
  @Input() public isUploadOpen = false;
  @Input() public isUploadBtnFlag = false;
  @Input() public fileSizeError =
    "File Size Exceeded. The Maximum Allowed File Size is 4.95 only. ";
  // +
  // this.fileSizeLimit +
  // " mb and will not be uploaded."

  @Input() public fileTypeError = "";
  isUploadCancel = false;
  @Input() public uploadHide: any;
  @Input() public existingList: any = [];
  @Input() public languageChanger: any = {};
  @Input() public clearExisting: any = false;
  @Input() public dialogUpload = false;

  @ViewChild(AttachmentViewComponent) imageViewer: any;
  @Input('type') type = '';


  errorMessage: any = [];
  findFiles: any = [];
  currentFileName: any = '';
  alreadyExistsFileName: any = '';
  isAlreadyExists = false;
  checkingList: any = [];
  isFileType = false;
  exists = false;
  removeExits: any = [];
  clearData: any = [];
  @Input() public id = 0;
  // clearSelected: any = ''

  @Input() public xFile: any = {
    fileName: "",
    fileType: "",
    fileSize: 0,
    relativePath: "",
    istrFileContent: "",
    fileExtension: "",
  };



  // isUploadOpen = false;
  private dropzone!: ElementRef;
  @ViewChild("dropzone", { static: false }) set content(content: ElementRef) {
    this.dropzone = content;
  }

  completedCount = 0;

  @ViewChild("nativefileupload", { static: false })
  nativefileupload!: ElementRef;
  @ViewChild("fileinput", { static: false })
  fileinput!: ElementRef;
  temp: any;
  @ViewChild('Template', { static: true }) Templates!: TemplateRef<any>;
  @Output("onUpload") onUpload: EventEmitter<any> = new EventEmitter();
  errorText = '';
  isfileTypeError = false;
  constructor(
    public renderer: Renderer2,
    public dropZoneService: DropZoneService,
    public data: DataService,
    // public messageBoxService: MessageBoxService,
    public storage: AppStorageService,
    public appSetting: AppSettingsService,
    // public appService: AppServices,
    public dialog: CoreService,
  ) {


  }



  ngOnInit(): void {

    this.setDropZone();

    this.fileTypeError =
      "This file is not valid and will not be uploaded.";




  }

  fileTypeErrorOccur() {
    this.isUploadCancel = true;
    return this.fileTypeError;
  }
  showFiles() {
    this.isUploadOpen = !this.isUploadOpen;
  }

  setDropZone() {
    if (this.dropzone) {
      this.dropFn();

    } else {

      setTimeout(() => {
        this.setDropZone();
      }, 400);
    }
  }

  dropFn() {
    this.isUploadCancel = false;
    this.renderer.listen(this.dropzone.nativeElement, "dragenter", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.renderer.addClass(this.dropzone.nativeElement, "entered");
    });
    this.renderer.listen(this.dropzone.nativeElement, "dragleave", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.renderer.removeClass(this.dropzone.nativeElement, "entered");
    });
    this.renderer.listen(this.dropzone.nativeElement, "dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.renderer.addClass(this.dropzone.nativeElement, "entered");
    });
    this.renderer.listen(this.dropzone.nativeElement, "drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.dropFileUpload(event);
    });
  }

  async dropFileUpload(event: any) {

    
    this.isfileSizeError = false;
    this.dropZoneService.files = [];
    this.renderer.removeClass(this.dropzone.nativeElement, "entered");
    const dt = event.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      if (this.multiple) {
        this.data.message = new entIEMessage();
        this.errorMessage = [];
        this.isUploadOpen = false;
        for (let index = 0; index < files.length; index++) {

          if (files[0].type === 'application/pdf' || files[0].type === 'image/png' || files[0].type === 'image/jpg' || files[0].type === 'image/jpeg' || files[0].type === 'csv' || files[0].type === 'ppt' || files[0].type === 'doc' || files[0].type === 'docx') {
            const obj = {
              fileName: files[index].name,
              fileSize: files[index].size,
              fileSizeKb: parseInt((files[index].size / 1024).toString()),
              fileType: files[index].type,
              uploading: false,
              completed: false,
              content: "",
              fileExtension: ""
            };

            let isNewFile = await this.checkForDuplicate(obj.fileName);
            if (isNewFile) {
              const reader = new FileReader();
              reader.readAsDataURL(files[index]);
              reader.onload = () => {
                // if (this.fileSizeLimit > parseInt((obj.fileSizeKb / 1024).toString())) {
                const img: any = reader.result;
                obj.content = img;
                this.dropZoneService.files.push(obj);
                this.isUploadOpen = this.dropZoneService.files.length > 0;
                // }
                // else {
                //   this.data.errorInfoMessage(this.appSetting.environment.fileSizeErrorMsg)
                // }

                if (this.isUploadBtnFlag === true && this.dropZoneService.files.length > 0) {
                  this.onUpload.emit(this.dropZoneService.files);
                }
              };
              reader.onerror = (error) => {

                //  this.general.openMsg('Error has been occured,while selecting the file.', 'danger');
              };
            }
          } else {
            this.data.errorInfoMessage("For enhanced security, we request that you convert the file into PDF, PNG, JPG forma1t.");
          }
        }
      } else {
        this.dropZoneService.files = [];
        this.data.message = new entIEMessage();
        this.errorMessage = [];

        // if (files[0].type === 'text/plain') 
        // if (files[0].type === 'application/pdf' || files[0].type === 'image/png' || files[0].type === 'image/jpg' || files[0].type === 'image/jpeg' || files[0].type === 'text/csv' || files[0].type === 'ppt' || files[0].type === 'doc' || files[0].type === 'application/msword' || files[0].type === 'text/xls') {
        const obj = {
          fileName: files[0].name,
          fileSize: files[0].size,
          fileSizeKb: parseInt((files[0].size / 1024).toString()),
          fileType: files[0].type,
          uploading: false,
          completed: false,
          content: "",
        };
        let isNewFile = await this.checkForDuplicate(obj.fileName);

        if (isNewFile) {
          const reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = () => {
            const img: any = reader.result;
            obj.content = img;
            this.dropZoneService.files.push(obj);

            if (this.isUploadBtnFlag === true && this.dropZoneService.files.length > 0) {
              this.onUpload.emit(this.dropZoneService.files);
            }
          };
          reader.onerror = (error) => {
            // console.log(error);
            //  this.general.openMsg('Error has been occured,while selecting the file.', 'danger');
          };
          // this.files.push(obj);
        }
        // } else {
        //   this.data.errorInfoMessage("For enhanced security, we request that you convert the file into PDF, PNG, JPG2 format.");
        // }
      }


    }
    this.showDuplicateError();
    // } else {
    //   this.data.errorMessageOnly("For enhanced security, we request that you convert the file into PDF format.");
    // }
  }

  triggerClick() {
    if (this.btnClicked === false) {

      this.nativefileupload.nativeElement.click();
    }

  }

  removeImage(val: any, fileType: any) {

    this.dropZoneService.files.splice(val, 1);
    if (this.dropZoneService.files.length === 0) {
      this.isUploadOpen = false;
    }
  }

  clearAll() {

    this.dropZoneService.files = [];
    this.fileinput.nativeElement.value = "";
    this.isUploadOpen = false;
    this.data.message = new entIEMessage();
  }

  upload() {

    let dropZoneFiles: any = [];
    this.dropZoneService.files.forEach((element: any) => {
      const uploadTrue = new FileTypePipe().transform(
        element.fileName,
        this.fileTypePattern,

      );

      if (!uploadTrue) {
        this.isfileSizeError = false;

        let filesize = (element.fileSizeKb / 1024).toString();
        if (this.fileSizeLimit > parseInt(filesize)) {
          dropZoneFiles.push(element);
        }
        else {
          this.isfileSizeError = true;
        }
      }
    });
    if (dropZoneFiles.length > 0) {
      this.dropZoneService.files = dropZoneFiles;
      this.onUpload.emit(this.dropZoneService.files);
      this.clearAll();
      // this.dialog.closeDialog()
    }
  }

  async loadImageFromDeviceMultiple(event: any) {


    this.isUploadCancel = false;
    this.isfileSizeError = false;
    this.dropZoneService.files = [];
    this.data.message = new entIEMessage();
    this.errorMessage = [];
    const files = event.target.files;
    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        if (files[index].type !== 'text/plain') {
          const obj = {
            fileName: files[index].name,
            fileSize: files[index].size,
            fileSizeKb: parseInt((files[0].size / 1024).toString()),
            fileType: files[index].type,
            uploading: false,
            completed: false,
            content: "",
          };
          let isNewFile = await this.checkForDuplicate(obj.fileName);

          if (isNewFile) {
            const reader = new FileReader();
            reader.readAsDataURL(files[index]);
            reader.onload = () => {
              const img: any = reader.result;
              obj.content = img;
              this.dropZoneService.files.push(obj);
              // this.onUpload.emit(this.dropZoneService.files);
              if (this.dialogUpload === false) {

                if (this.isUploadBtnFlag === true && this.dropZoneService.files.length > 0) {
                  this.onUpload.emit(this.dropZoneService.files);

                }
              }
              if (this.dialogUpload === true) {
                if (this.dropZoneService.files.length > 0) {
                  this.onUpload.emit(this.dropZoneService.files);
                }
              }
            };
            reader.onerror = (error) => {

              //  this.general.openMsg('Error has been occured,while selecting the file.', 'danger');
            };
            // this.files.push(obj);
          }
        } else {
          this.data.errorInfoMessage("For enhanced security, we request that you convert the file into PDF format.");
        }
      }



      this.fileinput.nativeElement.value = "";
    }


    this.showDuplicateError();
  }



  showDuplicateError() {
    if (this.errorMessage.length > 0) {
      this.data.message.errorMessage = this.errorMessage;
      this.data.message.hasError = true;
      // this.messageBoxService.expandMessageBox(0);
    }
  }

  checkForDuplicate(fileName: any) {

    return new Promise((resolve) => {
      let fileNameAvb = this.dropZoneService.files.map((e: any) => e.fileName).indexOf(fileName);
      let fileExNameAvb = this.existingList.map((e: any) => e.fileName).indexOf(fileName);
      if (fileNameAvb === -1 && fileExNameAvb === -1) {
        resolve(true);
      } else {
        const eobj = {
          msgID: 0,
          msgType: 0,
          msgDescription: "File '" + fileName + "' already " + (fileExNameAvb === -1 ? 'selected' : 'uploaded'),
        };
        this.errorMessage.push(eobj);
        resolve(false);
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
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     // this.logout();
    //   }
    // });
  }

  deleteFunction(val: any) {
    this.fileinput.nativeElement.value = "";
    this.dropZoneService.files.splice(val, 1);
    if (this.dropZoneService.files.length === 0) {
      this.isUploadOpen = false;
    }
  }



}
