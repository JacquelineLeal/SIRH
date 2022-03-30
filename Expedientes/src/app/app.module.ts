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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
