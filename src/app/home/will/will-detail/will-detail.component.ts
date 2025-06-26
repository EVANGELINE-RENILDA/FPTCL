import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { entWill, entWillApplication } from '../../../common/api-services/application-api/application-api.classes';
import { MultiPageUrlComponent } from '../../../app-core/template/multi-page-url/multi-page-url.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../app-core/template/tab/tab1';
import { TabComponent, TabGroupComponent } from '../../../app-core/template/tab/tab'; 
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { AppService } from '../../../app.service';
import { ApplicationComponent } from './application/application.component';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import { FileSizePipe } from "../../../app-core/template/drop-zone/file-size.pipe";
import { ViewPdfComponent } from '../../../app-core/template/view-pdf/view-pdf.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';

@Component({
  selector: 'app-will-detail',
  standalone: true,
  imports: [Row, ViewLabel, InputControlComponent, FormsModule, AppDatePipe, MultiPageUrlComponent,
    TabSubGroupComponent, TabSubComponent, TabComponent, TabGroupComponent, ApplicationComponent, 
    AccordionModule, FileSizePipe, AppTableComponent,CellDefDirective,CellHeaderDefDirective, IconButtonComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './will-detail.component.html',
  styleUrl: './will-detail.component.scss'
})
export class WillDetailComponent {
  willApplication = new entWill();
showData = false;
@ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,

    public appService: AppService) {
    this.appService.helpFile ='Will%20Application%20Detail.pdf'

    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  id = {
    currentIndex: 0,
    array: []
  };
  willApplicationId = 0 

 async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.willApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForWillApplication');
    await this.loadProvinceDDL();
    await this.initialData.getDDL('getInitialDataForCustomer');
    this.openWilApplication()
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }

  navigateToList() {
    this.router.navigateByUrl('/home/will/search')
  }
  openWilApplication() {
    debugger
    const obj = {
      data: this.willApplicationId
    }
    this.apiService.openWill(obj).subscribe((success) => {
      this.willApplication = success;
      this.showData = true;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    })
  }
       //clientDoc
       clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action'];
       clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action'];
       documentTableData:any = []

       viewFile(element: any) {

        let base64Data = element.ientFile.content.split(';base64,').pop();
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: element.ientFile.fileType });
    
        const url = URL.createObjectURL(blob);
        if (element.ientFile.fileType === 'application/pdf') {
          this.openPDFViewer(url);
        } else if (element.ientFile.fileType.includes('image')) {
          this.imageView(url, element.ientFile.fileName, element);
        }
      }
      openPDFViewer(xurl: any) {
        const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
          width: "100%",
          height: "85%",
          data: {
            url: xurl,
          },
        });
      }
      filePath: any;
      fileName = "";
      imageId: any;
      @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
      imageView(path: any, filename: any, val: any) {
    
        this.filePath = path;
        this.fileName = filename;
        this.imageId = val
        this.dialog.openDialog(this.Templates, {
          width: '600px',
          height: 'auto'
        })
      }
      downloadImageFile() {
        this.downloadFile(this.imageId)
        this.dialog.closeAll()
       
      }
      downloadFile(element: any) {
        let base64Data: any = element.ientFile.content.split(';base64,').pop();
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: element.ientFile.fileType });
    
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = element.ientFile.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
}
