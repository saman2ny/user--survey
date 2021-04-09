import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { Ng2IziToastModule } from 'ng2-izitoast'
import { ConstantsService } from 'src/service/constants.service';
import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';
import { ChangePasswordComponent } from 'src/pages/user/change-password/change-password.component';
import { BasicAuthInterceptor } from 'src/guards/BasicAuthInterceptor';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GoogleChartsModule } from 'angular-google-charts';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MessagingService } from 'src/service/messaging.service';
import { CountryService } from 'src/service/country.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function TranslationLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http);
}


// import { CustomeTableFilterPipe } from './custome-table-filter.pipe';
// import { TemplateFilterPipe } from '../pipes/template-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    // CustomeTableFilterPipe,
    // TemplateFilterPipe,



    // ShowDatePipe


  ],
  imports: [GoogleChartsModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpModule, HttpClientModule, FormsModule, ReactiveFormsModule, Ng2IziToastModule,
    // PipesModule.forRoot()
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),

    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient] }
    })

  ],
  providers: [CommonService, ApiService, ConstantsService, MessagingService, CountryService, SpeechRecognitionServiceService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: BasicAuthInterceptor,
    //   multi: true
    // },
  ],
  // exports:[ShowDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
