import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginguardGuard } from '../guards/loginguard.guard';

const routes : Routes=[
  {
    path:'',
    children: [
      { path:'list-tramite', 
        //component: ListaTramiteComponent,
        data:{
          role:'CAPTURISTA'
        },
        canActivate:[LoginguardGuard]
      }
    
      ,{path:'**', redirectTo:'login'}
      
       
    ]
  }
]

 
@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class TypeCapturistaRoutingModule { }
