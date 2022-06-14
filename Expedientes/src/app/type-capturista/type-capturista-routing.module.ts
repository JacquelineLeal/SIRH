import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginguardGuard } from '../guards/loginguard.guard';


import { RegistroTramiteComponent } from './pages/registro-tramite/registro-tramite.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { RegistroDatosPersonaExistenteComponent } from './pages/registro-datos-persona-existente/registro-datos-persona-existente.component';

const routes : Routes=[
  {
    path:'',
    children: [
      { path:'personal-tramite', 
        component: RegistroTramiteComponent,
        data:{
          role:'CAPTURISTA'
        },
        canActivate:[LoginguardGuard]
      },
      { path:'editar-personal', 
        component: EditarComponent,
        data:{
          role:'CAPTURISTA'
        },
        canActivate:[LoginguardGuard]
      },
      { path:'consultas', 
        component: ConsultarComponent,
        data:{
          role:'CAPTURISTA'
        },
        canActivate:[LoginguardGuard]
      },
      { path:'personal-existente', 
        component: RegistroDatosPersonaExistenteComponent,
        data:{
          role:'CAPTURISTA'
        },
        canActivate:[LoginguardGuard]
      },
    
      ,{path:'**', redirectTo:'personal-tramite'}
      
       
    ]
  }
]

 
@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class TypeCapturistaRoutingModule { }
