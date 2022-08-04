import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{PdfViewerModule} from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';



import { RouterModule } from '@angular/router';

/*import { SubirDocsExpedienteComponent } from '../components/subir-docs-expediente/subir-docs-expediente.component';
import { ModalSubirDocsComponent } from '../components/modal-subir-docs/modal-subir-docs.component';
import { ListAggDocsExpedienteComponent } from '../pages/list-agg-docs-expediente/list-agg-docs-expediente.component';
import { EditInfoPersonalComponent } from '../pages/edit-info-personal/edit-info-personal.component';
import { VerExpedienteComponent } from '../components/ver-expediente/ver-expediente.component';
import { RegitroInfoEscolarComponent } from '../pages/regitro-info-escolar/regitro-info-escolar.component';
import { RegisIdiomasComponent } from '../pages/regis-idiomas/regis-idiomas.component';*/
import { ListaTramiteComponent } from './pages/lista-tramite/lista-tramite.component'; 


import { TypeArchivoRoutingModule } from './type-archivo-routing.module';
import { NavbararchComponent } from './components/navbararch/navbararch.component';
import { ExpedientesExistentesComponent } from './pages/expedientes-existentes/expedientes-existentes.component';



@NgModule({
  declarations: [
    ListaTramiteComponent,
    NavbararchComponent,
    ExpedientesExistentesComponent
   /* SubirDocsExpedienteComponent,
    ModalSubirDocsComponent,
    ListAggDocsExpedienteComponent,
    EditInfoPersonalComponent,
    VerExpedienteComponent,
    RegitroInfoEscolarComponent,
    RegisIdiomasComponent*/
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    NgbModule,
    HttpClientModule,
    PdfViewerModule,
    TypeArchivoRoutingModule

  ],
  providers: [CookieService],
})
export class TypeArchivoModule { }
