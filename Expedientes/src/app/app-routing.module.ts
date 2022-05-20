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
import { RegitroInfoEscolarComponent } from './pages/regitro-info-escolar/regitro-info-escolar.component';
import { RegisIdiomasComponent } from './pages/regis-idiomas/regis-idiomas.component';
import { EditoNewDataComponent } from './components/edito-new-data/edito-new-data.component';
import { RegistroNewDataComponent } from './components/registro-new-data/registro-new-data.component';
import { ConsultoNewDataComponent } from './components/consulto-new-data/consulto-new-data.component';
import { RegistroInfoExisPersonalComponent } from './components/registro-info-exis-personal/registro-info-exis-personal.component';
import { LoginguardGuard } from './guards/loginguard.guard';
//import { RegistroDatosComponent } from './Componentes/registro-datos/registro-datos.component';
//import { EditoDatosComponent } from './Componentes/edito-datos/edito-datos.component';
//import { ConsultoDatosComponent } from './Componentes/consulto-datos/consulto-datos.component';

const routes: Routes = [ 
  {path:'',redirectTo:'/login',pathMatch:'full'},  
  { path:'registrar-persona', 
    component:RegistrarPersonaComponent,
    data:{
      role:'CAPTURISTA'
    },
    canActivate:[LoginguardGuard]

  },
  {path:'list-agg-docs-expediente', component:ListAggDocsExpedienteComponent},
  {path:'edit-info-personal', component:EditInfoPersonalComponent},
  {path:'subir-docs-expediente', component: SubirDocsExpedienteComponent},
  {path:'modal-subir-docs', component:ModalSubirDocsComponent},
  {path:'ver-expediente',component:VerExpedienteComponent},
  {path:'login',component:LoginComponent},
  {path:'registrar-info-escolar', component:RegitroInfoEscolarComponent},
  {path:'registrar-idiomas', component:RegisIdiomasComponent},

  { path: 'registro-new-data', 
    component: RegistroNewDataComponent,
    data:{
      role:'CAPTURISTA'
    },
    canActivate:[LoginguardGuard]
  },
  { path: 'edit-new-data', 
    component:EditoNewDataComponent,
    data:{
      role:'CAPTURISTA'
    },
    canActivate:[LoginguardGuard]
  },
  { path: 'consulto-data',
    component: ConsultoNewDataComponent,
    data:{
      role:'CAPTURISTA'
    },
    canActivate:[LoginguardGuard]
  },
  { path: 'registro-info-personal-existente', 
    component: RegistroInfoExisPersonalComponent,
    data:{
      role:'CAPTURISTA'
    },
    canActivate:[LoginguardGuard]
  }
 // {path:'registro-datos', component: RegistroDatosComponent},
  //{path:'edito-datos', component: EditoDatosComponent},
  //{path: 'consulto-datos', component: ConsultoDatosComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
