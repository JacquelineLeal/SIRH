import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{PdfViewerModule} from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import { ContentComponent } from './components/content/content.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './pages/login/login.component';

import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent, 
    ContentComponent,
    LoginComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
