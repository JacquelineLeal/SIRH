import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubirDocsExpedienteComponent } from '../components/subir-docs-expediente/subir-docs-expediente.component';
import { ModalSubirDocsComponent } from '../components/modal-subir-docs/modal-subir-docs.component';
import { ListAggDocsExpedienteComponent } from '../pages/list-agg-docs-expediente/list-agg-docs-expediente.component';
import { EditInfoPersonalComponent } from '../pages/edit-info-personal/edit-info-personal.component';
import { VerExpedienteComponent } from '../components/ver-expediente/ver-expediente.component';
import { RegitroInfoEscolarComponent } from '../pages/regitro-info-escolar/regitro-info-escolar.component';
import { RegisIdiomasComponent } from '../pages/regis-idiomas/regis-idiomas.component';

import { ListaTramiteComponent } from './pages/lista-tramite/lista-tramite.component';

import { LoginguardGuard } from '../guards/loginguard.guard';

const routes: Routes = [
  {
    path:'',
    children: [
      { path:'list-tramite', 
        component: ListaTramiteComponent,
        data:{
          role:'ARCHIVO'
        },
        canActivate:[LoginguardGuard]
      }
      ,{path:'**', redirectTo:'list-tramite'}
      
    ]
  }
]



@NgModule({
 
  imports: [
    RouterModule.forChild( routes )
   
  ]
})
export class TypeArchivoRoutingModule { }
