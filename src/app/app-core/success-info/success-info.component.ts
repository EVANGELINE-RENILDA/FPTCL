import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-info',
  standalone: true,
  imports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './success-info.component.html',
  styleUrl: './success-info.component.scss'
})
export class SuccessInfoComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackbar: MatSnackBar) {


  }

  ngOnInit(): void {
  }

  dismiss() {
    this.snackbar.dismiss();
  }
}
