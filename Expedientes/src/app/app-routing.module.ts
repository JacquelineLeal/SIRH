import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { RegistrarUsuarioComponent } from './components/registrar-personal-form/registrar-usuario.component';
import { ListAggDocsExpedienteComponent } from './pages/list-agg-docs-expediente/list-agg-docs-expediente.component';
import { EditInfoPersonalComponent } from './pages/edit-info-personal/edit-info-personal.component';
import { RegistrarPersonaComponent } from './pages/registrar-persona/registrar-persona.component';
import { SubirDocsExpedienteComponent } from './components/subir-docs-expediente/subir-docs-expediente.component';
import { ModalSubirDocsComponent } from './components/modal-subir-docs/modal-subir-docs.component';
import { VerExpedienteComponent } from './components/ver-expediente/ver-expediente.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [   
  {path:'registrar-persona', component:RegistrarPersonaComponent},
  {path:'list-agg-docs-expediente', component:ListAggDocsExpedienteComponent},
  {path:'edit-info-personal', component:EditInfoPersonalComponent},
  {path:'subir-docs-expediente', component: SubirDocsExpedienteComponent},
  {path:'modal-subir-docs', component:ModalSubirDocsComponent},
  {path:'ver-expediente',component:VerExpedienteComponent},
  {path:'login',component:LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
