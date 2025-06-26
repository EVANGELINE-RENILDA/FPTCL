import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStorageService } from './common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) 
export class AppComponent implements OnInit {

  constructor(private storage: AppStorageService) { 

  } 

  async ngOnInit(): Promise<void> {
    this.storage.init();
  }
}
