import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-subir-docs-expediente',
  templateUrl: './subir-docs-expediente.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subir-docs-expediente.component.scss']
})
export class SubirDocsExpedienteComponent implements OnInit {
  estaCompleto = true;
  constructor(public modal:NgbModal) { }

  ngOnInit(): void {
  }

  openDescargar(contDescargarDocs: any){
    this.modal.open(contDescargarDocs,{size:'xl', backdropClass:'azul'});
  }

}
