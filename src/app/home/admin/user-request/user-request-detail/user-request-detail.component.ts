import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { AdminApiService } from '../../../../common/api-services/admin-api/admin-api.service';
import { entGroupbyUserRequestDepartmentTeamLink, entGroupByUserRequestGroup, entUserRequest, entUserRequestAssignedOfficer, entUserRequestBranchLinkList, entUserRequestGroup, entUserRequestNotes } from '../../../../common/api-services/admin-api/admin-api.classes';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-user-request-detail',
  standalone: true,
  imports: [Row, ViewLabel, FormsModule, InputControlComponent, AppDatePipe, AccordionModule, IconButtonComponent, TabGroupComponent, TabComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, ErrorInfoComponent, ErrorMessageComponent, StatusHistoryComponent, TabSubComponent, TabSubGroupComponent, AccoutsStatusTableComponent, InnerScroll, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-request-detail.component.html',
  styleUrl: './user-request-detail.component.scss'
})
export class UserRequestDetailComponent {
  employeecode = ''
  errorTrue = false
  id = {
    currentIndex: 0,
    array: []
  };
  notesDDl: any = []
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  currentDate: any = '';

  userRequestId: any = 0;
  userRequest = new entUserRequest();
  userRequestRAW = new entUserRequest();
  userRequestGroup = new entUserRequestGroup();
  editStaffReg = false;
  userRequestNotes = new entUserRequestNotes();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('y') yForm!: NgForm;
  @ViewChild('a') aForm!: NgForm;
  @ViewChild('u') uForm!: NgForm;
  @ViewChild('userGroupDialog', { static: false })
  userGroupDialog!: TemplateRef<any>;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @ViewChild('emailDialog', { static: false })
  emailDialog!: TemplateRef<any>;
  @ViewChild('infoDialog', { static: false })
  infoDialog!: TemplateRef<any>;
  userGroupColumns: any = ['groupName', 'beginDate', 'endDate', 'statusDescription', 'action'];
  userGroupColumnsName: any = ['Group Name', '	Begin Date', '	End Date', '	Group Status', 'Action'];
  userGroupTableData: any = [];
  assignOfficerColumns: any = ["assignedByFullname", "assignedToFullName", "assignedDate", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned By", "Assigned To", "Assigned Date", "Status",];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [];
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
  listOfOfficer: any = [];
  userDetailBtns = true;
  branchBtns = false;
  teamBtns = false
  groupBtns = false

  userRequestAssignedOfficer = new entUserRequestAssignedOfficer();
  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public apiService: ApplicationApiService,
    public adminService: AdminApiService,
    public url: UrlService,
    public initialData: InitialDataService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
      this.appService.helpFile = 'User%20Request%20Detail.docx.pdf'
    });
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.userRequestId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    console.log(this.userRequestId);
    await this.initialData.getAdminDDL('getUserRequestInitialData');
    await this.initialData.getDDL('getInitialDataForCustomer');
    this.currentDate = this.appService.getCurrentDate();
    if (this.userRequestId === 0) {
      this.createUserRequest()
    }
    else {
      this.openUserRequest();
    }

  }

  createUserRequest() {
    this.errorTrue = false
    const obj = {
      data: "NEW"
    }
    this.adminService.createNewUserRequest(obj).subscribe((success) => {
      this.userRequest = success;
      this.editStaffReg = true

    })

  }
  saveUserRequest() {
    if (this.xForm.valid && this.yForm.valid) {

      this.adminService.saveUserRequest(this.userRequest).subscribe((success) => {
        this.userRequest = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.editStaffReg = false
        this.redirectTo(success.userRequestId)
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
      this.data.errorInfoMessage('Enter all the mandatory fields in User & Emp Details')
    }
  }
  updateUserRequest() {
    if (this.xForm.valid && this.yForm.valid) {

      this.adminService.saveUserRequest(this.userRequest).subscribe((success) => {
        this.userRequest = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.editStaffReg = false;
        this.redirectTo(success.userRequestId)
      })
    }
    else {
      this.errorTrue = true
      this.data.errorInfoMessage('Enter all the mandatory fields in User & Emp Details')
    }
  }
  async redirectTo(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/admin/user-request/detail/' + encodeId);
  }

  openUserRequest() {
    const obj = {
      data: this.userRequestId
    }
    this.adminService.openUserRequest(obj).subscribe((success) => {
      this.userRequest = success;
      // this.defLandPage = success.defaultLandingPageValue
      this.userGroupTableData = success.plstentUserRequestGroup
      this.editStaffReg = false;

      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  clearUserReq() {
    this.createUserRequest();
    this.employeecode = ''
    this.data.successMessage('Data Cleared Successfully');
  }
  editStaffRegistration() {
    this.editStaffReg = true
  }
  onTabChange(event: any) {
    
    switch (event.tabTitle) {
      case 'Branch': this.getBranchList();
        this.userDetailBtns = false;
        this.branchBtns = true;
        this.teamBtns = false;
        this.groupBtns = false
        break;
      case 'User Details':
        this.userDetailBtns = true;
        this.branchBtns = false;
        this.teamBtns = false;
        this.groupBtns = false
        break
      case 'Employee Details':
        this.userDetailBtns = true;
        this.branchBtns = false;
        this.teamBtns = false;
        this.groupBtns = false
        break
      case 'Team':
        this.userDetailBtns = false;
        this.branchBtns = false;
        this.teamBtns = true;
        this.groupBtns = false
        this.loadAllUserRequestDepartmentTeam()
        break
      case 'Team':
        this.userDetailBtns = false;
        this.branchBtns = false;
        this.teamBtns = true;
        this.groupBtns = false
        this.loadAllUserRequestDepartmentTeam()
        break
      case 'Group':
        this.userDetailBtns = false;
        this.branchBtns = false;
        this.teamBtns = false;
        this.groupBtns = true
        this.loadAllUserRequestGroup();
        // this.loadUserRequestDefaultPage();
        break
      case 'History':
        this.userDetailBtns = false;
        this.branchBtns = false;
        this.teamBtns = false;
        this.groupBtns = false
        this.createNewUserRequestAssignedOfficer()
        break
    }


  }
  refreshUserReq() {
    const obj = {
      data: this.userRequestId
    }
    this.adminService.openUserRequest(obj).subscribe((success) => {
      this.userRequest = success;
      this.data.successMessage('Data Refreshed Successfully');
    })
  }
  async userGroupDialogBox() {
    let dialogResponse: any = await this.dialog.openDialog(this.userGroupDialog, {
      height: 'auto',
      width: '800px',
      maxWidth: '1170px',

    });
  }
  createUserGroup() {
    this.errorTrue = false
    this.adminService.createNewUserRequestGroup().subscribe((success) => {
      this.userRequestGroup = success
      this.userGroupDialogBox()
    })
  }
  saveUserGroup() {
    if (this.uForm.valid) {
      this.adminService.saveUserRequestGroup(this.userRequestGroup).subscribe((success) => {
        this.userGroupTableData = success.plstentUserRequestGroup;
        this.dialog.closeAll()
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearUserGroup() {

    this.adminService.createNewUserRequestGroup().subscribe((success) => {
      this.userRequestGroup = success;
      this.errorTrue = false
      this.data.successMessage('Data Cleared Successfully')
    })
  }

  openRequestGroup(val: any) {
    const obj = {
      data: val
    }
    this.adminService.openUserRequestGroup(obj).subscribe((success) => {
      this.userRequestGroup = success;
      this.userGroupDialogBox();
      this.errorTrue = false
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  refreshUserGroup() {
    const obj = {
      data: this.userRequestGroup.userRequestGroupId
    }
    this.adminService.openUserRequestGroup(obj).subscribe((success) => {
      this.userRequestGroup = success;
      this.errorTrue = false
      this.data.successMessage('Data Refreshed Successfully')
    })
  }
  async createUserReqNotesDialog() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      height: '350px',
      width: '700px',
      maxWidth: '1170px',

    });
  }

  createNewUserRequestAssignedOfficer() {
    this.errorTrue = false
    const obj = {
      data: this.userRequest.userRequestId,
      data1: this.userRequest.requestStatusValue
    }
    this.adminService.createNewUserRequestAssignedOfficer(obj).subscribe((success) => {
      this.userRequestAssignedOfficer = success;

      this.listOfOfficer = success.lstentDDLClass;
      this.listOfOfficer.constant = 0;
    })
  }
  reAssignUserReq() {
    this.userRequestAssignedOfficer.userRequestId =
      this.userRequest.userRequestId;

    this.adminService.userRequestReAssign(this.userRequestAssignedOfficer).subscribe((success) => {
      this.userRequest = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  selfAssignUserReq() {
    this.userRequestAssignedOfficer.userRequestId =
      this.userRequest.userRequestId;

    this.adminService.userRequestSelfAssign(this.userRequestAssignedOfficer).subscribe((success) => {
      this.userRequest = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  emailData: any
  async viewEmailDetail(val: any) {
    this.emailData = val;
    console.log(val);
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.emailDialog, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',

    });

  }

  navigateToList() {
    this.router.navigateByUrl('/home/admin/user-request')
  }
  createNewUserRequestNotes() {
    this.errorTrue = false
    const obj = {
      data: this.userRequest.requestStatusValue
    }
    this.adminService.createNewUserRequestNotes(obj).subscribe((success) => {
      this.userRequestNotes = success;
      this.notesDDl = success.lstentDDLClass;
      this.createUserReqNotesDialog();
    })
  }
  clearUserNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.userRequest.requestStatusValue
    }
    this.adminService.createNewUserRequestNotes(obj).subscribe((success) => {
      this.userRequestNotes = success;
      this.notesDDl = success.lstentDDLClass;
      this.data.successMessage('Data Cleared Successfully')
    })
  }

  saveUserRequestNotes() {
    if (this.aForm.valid) {
      this.userRequestNotes.userRequestId = this.userRequestId;
      this.errorTrue = false;

      this.adminService.saveUserRequestNotes(this.userRequestNotes).subscribe((success) => {
        this.userRequest = success
        this.dialog.closeAll()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  branchListData: any = []
  //branch
  branchResult = new entUserRequestBranchLinkList();
  getBranchList() {
    const obj = {
      data: this.userRequest.userRequestId
    }
    this.adminService.loadAllUserRequestBranch(obj).subscribe((success) => {
      this.branchResult = success
    })
  }
  branchStatusChange(event: any, val: any) {
    if (event.target.checked) {
      val.statusValue = 'ACTIV';
      val.statusDescription = 'Active'
    }
    else {
      val.statusValue = 'INACT'
      val.statusDescription = 'In Active'
    }
  }
  saveListOfUserRequestBranch() {
    this.branchResult.userRequestId = this.userRequestId;
    this.adminService.saveListOfUserRequestBranch(this.branchResult).subscribe((success) => {
      this.branchResult = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      // this.data.successMessage(this.appSettings.environment.successMessage);
    })
  }

  //team
  teamResult = new entGroupbyUserRequestDepartmentTeamLink();
  loadAllUserRequestDepartmentTeam() {
    const obj = {
      data: this.userRequestId
    }
    this.adminService.loadAllUserRequestDepartmentTeam(obj).subscribe((success) => {
      this.teamResult = success
    })
  }
  teamStatusChange(event: any, val: any) {
    if (event.target.checked) {
      val.statusValue = 'ACTIV';
      val.statusDescription = 'Active'
    }
    else {
      val.statusValue = 'INACT'
      val.statusDescription = 'In Active'
    }
  }
  saveListOfUserRequestDepartmentTeam() {
    this.adminService.saveListOfUserRequestDepartmentTeam(this.teamResult).subscribe((success) => {
      this.teamResult = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  //group
  groupResult = new entGroupByUserRequestGroup();
  loadAllUserRequestGroup() {
    const obj = {
      data: this.userRequestId
    }
    this.adminService.loadAllUserRequestGroup(obj).subscribe((success) => {
      this.groupResult = success;

      this.loadUserRequestDefaultPage()
    })
  }
  defLandPage: any
  saveListOfUserRequestGroup() {
    
    this.groupResult.userRequestId = this.userRequestId;
    this.groupResult.defaultLandingPageValue = this.defLandPage
    this.adminService.saveListOfUserRequestGroup(this.groupResult).subscribe((success) => {
      this.groupResult = success;
      this.loadUserRequestDefaultPage();
      this.data.successMessage('Data Saved Successfully')
    })
  }
  landingDefaultDDL: any
  loadUserRequestDefaultPage() {
    const obj = {
      data: this.userRequestId
    }
    this.adminService.loadUserRequestDefaultPage(obj).subscribe((success) => {
      this.landingDefaultDDL = success.lstentDDLClass;
    })
  }

  check(val: any) {
    if (val !== null && val !== "") {
      const dialogResponse: any = this.dialog.openDialog(this.infoDialog, {
        width: '350px',
        height: '170px',
        disableClose: true,
      });
    }
    else {
      this.data.errorInfoMessage('Please Enter the Employee Code')
    }
    // }
  }

  getUserDetailsByEmployeeCode(val: any) {
    this.dialog.closeAll()
    const obj = {
      data: val,
    };
    this.adminService.getUserDetailsByEmployeeCode(obj).subscribe((success) => {
      this.userRequest = success;
    })

  }
}
