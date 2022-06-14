import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{PdfViewerModule} from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';



import { RouterModule } from '@angular/router';
//import { ListaTramiteComponent } from './pages/lista-tramite/lista-tramite.component';

import { TypeCapturistaRoutingModule } from './type-capturista-routing.module';

import { RegistroTramiteComponent } from './pages/registro-tramite/registro-tramite.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { RegistroDatosPersonaExistenteComponent } from './pages/registro-datos-persona-existente/registro-datos-persona-existente.component';
import { NabvarcapComponent } from './component/nabvarcap/nabvarcap.component';
import { FormRegistroDatosPersonalesComponent } from './component/form-registro-datos-personales/form-registro-datos-personales.component';
import { FootercapComponent } from './component/footercap/footercap.component';



@NgModule({
  declarations: [
    RegistroTramiteComponent,
    EditarComponent,
    ConsultarComponent,
    RegistroDatosPersonaExistenteComponent,
    NabvarcapComponent,
    FormRegistroDatosPersonalesComponent,
    FootercapComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule,
    TypeCapturistaRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [CookieService],
  bootstrap: [RegistroTramiteComponent]
})

export class TypeCapturistaModule { }
