import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
} from '@angular/core';
import { ErrorPipePipe } from './error-pipe.pipe';
import { DataService } from '../../../common/services/data/data.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [ErrorPipePipe],
  providers: [ErrorPipePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent implements AfterViewInit {
  activeTab = 'error';

  constructor(public data: DataService, private error: ErrorPipePipe) {}

  ngAfterViewInit(): void {
    let hasError = this.error.transform(
      this.data.message.errorMessage,
      2,
      'msgType'
    );
    if (hasError.length > 0) {
      this.activeTab = 'error';
    } else if (
      this.error.transform(this.data.message.errorMessage, 1, 'msgType')
        .length > 0
    ) {
      this.activeTab = 'warning';
    } else if (this.data.message.infoMessage.msgDescription !== '') {
      this.activeTab = 'info';
    }

    setTimeout(() => {
      this.doClose();
    }, 3000);
  }

  setActiveTab(val: any) {
    this.activeTab = val;
  }
  doClose() {
    this.data.clearMessageBox();
  }
}
