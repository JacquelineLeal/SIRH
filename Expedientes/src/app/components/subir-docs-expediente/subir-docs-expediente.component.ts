import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import {IdsParaEditarDataPD, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';


@Component({
  selector: 'app-subir-docs-expediente',
  templateUrl: './subir-docs-expediente.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subir-docs-expediente.component.scss']
})
export class SubirDocsExpedienteComponent implements OnInit {
  
  listaDatosLabel: any = this.datosInicialesExpedientes.newRegistrarDatos;
  NOMBRE: string = this.listaDatosLabel.NOMBRE + ' ' + this.listaDatosLabel.APE_PATERNO + ' '+ this.listaDatosLabel.APE_MATERNO;
 
  estaCompleto = true;
  constructor(public modal:NgbModal,  private datosInicialesExpedientes:DatosInicialesExpedientesService) { }

  ngOnInit(): void {
    console.log();
    
  }

  openDescargar(contDescargarDocs: any){
    this.modal.open(contDescargarDocs,{size:'xl', backdropClass:'azul'});
  }

}
