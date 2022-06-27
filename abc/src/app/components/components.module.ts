import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    NgbModule,
    RouterModule,
    ClipboardModule,

    CommonModule 
  ],
  exports: [
    SidebarComponent
  ]
})
export class ComponentsModule { }
