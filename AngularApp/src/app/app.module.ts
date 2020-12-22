import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { IndexComponent } from './task/index/index.component';
import { FormComponent } from './task/form/form.component';
import { FormComponent as TaskLogFormComponent } from './tasklog/form/form.component';
import { CardComponent } from './task/card/card.component';
import { IndexComponent as TaskLogIndexComponent } from './tasklog/index/index.component';
import { DetailsComponent } from './task/details/details.component';
import { ConfirmDialogComponent } from './general/confirm-dialog/confirm-dialog.component';

// import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    FormComponent,
    TaskLogFormComponent,
    CardComponent,
    DetailsComponent,
    ConfirmDialogComponent,
    TaskLogIndexComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxMaterialTimepickerModule.setLocale('sr-Latn'),
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDividerModule,
    SocialLoginModule,
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'sr-Latin' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleAuth.CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
