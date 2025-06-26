import { APP_INITIALIZER, ApplicationConfig, ApplicationRef, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppSettingsService } from './common/services/app-settings/app-settings.service';
import { firstValueFrom } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { FullSpinnerInterceptor } from './app-core/full-spinner/full-spinner.interceptor';

export const appSettingFactory = (configService: AppSettingsService, appRef: ApplicationRef) => {
  return () => {
    return firstValueFrom(configService.loadConfig()).then(
      (config: any) => {
        configService.environment = config;
      },
      (error: any) => {
        console.error('Error loading config:', error);
        // appRef.tick(); // Manually trigger change detection to stop the app
        throw error; // Re-throw the error to prevent app startup
      }
    );
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule,
      IonicStorageModule.forRoot(
        {
          name: '_fptcl_Web',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        }
      )
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FullSpinnerInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingFactory,
      deps: [AppSettingsService],
      multi: true,
    },
  ]
};
