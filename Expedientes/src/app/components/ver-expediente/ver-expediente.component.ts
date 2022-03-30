import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-expediente',
  templateUrl: './ver-expediente.component.html',
  styleUrls: ['./ver-expediente.component.scss']
})
export class VerExpedienteComponent implements OnInit {

  constructor(public modal:NgbModal) { }

  ngOnInit(): void {
  }

  openDescargar(contDescargarDocs: any){
    this.modal.open(contDescargarDocs,{size:'xl'});
  }

}
