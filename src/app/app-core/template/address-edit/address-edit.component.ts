import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, input } from '@angular/core';
import { entAddress } from '../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { Row } from '../../core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { InputControlComponent } from '../../form-input/input-control/input-control.component';
import { DataService } from '../../../common/services/data/data.service';

@Component({
  selector: 'app-address-edit',
  standalone: true,
  imports: [Row, FormsModule, InputControlComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './address-edit.component.html',
  styleUrl: './address-edit.component.scss'
})
export class AddressEditComponent {
  ngOnInit(): void {
    this.init();
  }
  async init() {
    
   await this.data.checkToken()
   this.loadProvinceDDL()
    // await this.initialData.getDDL('loadAllMProvince');

  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  options = {
    hideFullSpinner: true
  }
  __ientAddress = new entAddress();
  islandDDL: any = [];
  villageDDL: any = [];
  @Output('onUpdate') onUpdate: EventEmitter<any> = new EventEmitter();
  @Input('type') type = '';
  @Input('view') view = false;


  __oldValue: any;
  @Input() set oldValue(oldValue: any) { this.__oldValue = oldValue; }
  get oldValue() {

    return this.__oldValue;
  }
  __oldValueDesription: any;
  @Input() set oldValueDesription(oldValueDesription: any) { this.__oldValueDesription = oldValueDesription; }
  get oldValueDesription() {

    return this.__oldValueDesription;
  }


  @Input()
  set ientAddress(ientAddress: any) {
    this.__ientAddress = ientAddress;


    if (this.__ientAddress.provinceId !== 0) {
      this.getIslandFromProvince(this.__ientAddress.provinceId, this.__ientAddress.islandId);
      this.getTikinaDDL(this.__ientAddress.provinceId, this.__ientAddress.islandId);
    }
  }

  get ientAddress() {
    return this.__ientAddress;
  }

  __btnClicked = false;
  @Input() set btnClicked(btnClicked: boolean) { this.__btnClicked = btnClicked || false; }
  get btnClicked() { return this.__btnClicked; }

  updateAddress() {

    if (!this.view) {
      this.onUpdate.emit(this.__ientAddress);

    }
  }


  __errorTrue = false;
  @Input() set errorTrue(errorTrue: boolean) { this.__errorTrue = errorTrue || false; }
  get errorTrue() { return this.__errorTrue; }
  constructor(private apiService: ApplicationApiService, public initialData: InitialDataService, public data: DataService) { }



  getIslandFromProvince(val: any, islandId?: any) {
    console.log(val );

    let index = this.initialData.DDLValues.DDLProvince.map((e: any) => e.constant).indexOf(val);

    if (index > -1) {
      this.__ientAddress.provinceDescription = this.initialData.DDLValues.DDLProvince[index].description;
    }
    const obj = {
      data: val
    }
    this.apiService.loadAllMIslandswithProvince(obj, this.options).subscribe((success: any) => {
      this.islandDDL = success.plistentIslanddetails;
      this.villageDDL  = []
      if (islandId) {
        this.__ientAddress.islandId = islandId;
      } else {
        this.__ientAddress.islandId = 0;
        this.__ientAddress.islandDescription = "";
        this.__ientAddress.tikinaId = 0;
        this.__ientAddress.tikinaDescription = "";
        
        if (this.islandDDL.length === 1) {
          this.__ientAddress.islandId = this.islandDDL[0].constant;
          // this.onUpdate.emit(this.__ientAddress);
          // this.getVillageFromIsland(this.__ientAddress.islandId);
        }
      }
    })
  }

  getTikinaDDL(val1: any,val2:any, village?: any) {

    let index = this.islandDDL.map((e: any) => e.constant).indexOf(val2);
    if (index > -1) {
      this.__ientAddress.islandDescription = this.islandDDL[index].description;
    }
    const obj = {
      data1: val1,
      data2:val2
    }
    this.apiService.loadTikinaDetailsbasedonProvinceIsland(obj).subscribe((success: any) => {
      this.villageDDL = success.plistentTikinadetails;


    })
  }

  onVillageChange() {
    let index = this.villageDDL.map((e: any) => e.constant).indexOf(this.__ientAddress.village);
    if (index > -1) {
      this.__ientAddress.village = this.villageDDL[index].description;
    }
  }

}
