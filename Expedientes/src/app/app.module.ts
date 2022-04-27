import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrarUsuarioComponent } from './components/registrar-personal-form/registrar-usuario.component';
import { ContentComponent } from './components/content/content.component';
import { ListAggDocsExpedienteComponent } from './pages/list-agg-docs-expediente/list-agg-docs-expediente.component';
import { SubirDocsExpedienteComponent } from './components/subir-docs-expediente/subir-docs-expediente.component';
import { EditInfoPersonalComponent } from './pages/edit-info-personal/edit-info-personal.component';
import { RegistrarPersonaComponent } from './pages/registrar-persona/registrar-persona.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSubirDocsComponent } from './components/modal-subir-docs/modal-subir-docs.component';
import { VerExpedienteComponent } from './components/ver-expediente/ver-expediente.component';
import { LoginComponent } from './pages/login/login.component';

import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RegitroInfoEscolarComponent } from './pages/regitro-info-escolar/regitro-info-escolar.component';
import { RegisIdiomasComponent } from './pages/regis-idiomas/regis-idiomas.component';

import { EditoNewDataComponent } from './components/edito-new-data/edito-new-data.component';
import { RegistroNewDataComponent } from './components/registro-new-data/registro-new-data.component';
import { ConsultoNewDataComponent } from './components/consulto-new-data/consulto-new-data.component';
import { RegistroInfoExisPersonalComponent } from './components/registro-info-exis-personal/registro-info-exis-personal.component';

//import { RegistroDatosComponent } from './componentes/registro-datos/registro-datos.component';
//import { EditoDatosComponent } from './componentes/edito-datos/edito-datos.component';
//import { ConsultoDatosComponent } from './componentes/consulto-datos/consulto-datos.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    RegistrarUsuarioComponent,
    ContentComponent,
    ListAggDocsExpedienteComponent,
    SubirDocsExpedienteComponent,
    EditInfoPersonalComponent,
    RegistrarPersonaComponent,
    ModalSubirDocsComponent,
    VerExpedienteComponent,
    LoginComponent,
    RegitroInfoEscolarComponent,
    RegisIdiomasComponent,
   
    EditoNewDataComponent,
    RegistroNewDataComponent,
    ConsultoNewDataComponent,
    RegistroInfoExisPersonalComponent,
   
   // RegistroDatosComponent,
    //EditoDatosComponent,
    //ConsultoDatosComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
