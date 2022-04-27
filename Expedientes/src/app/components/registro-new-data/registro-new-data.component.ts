import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-new-data',
  templateUrl: './registro-new-data.component.html',
  styleUrls: ['./registro-new-data.component.scss']
})
export class RegistroNewDataComponent implements OnInit {

  constructor(
    public router:Router,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {  
  }

  abrirModalInfoPersonal(regisInfoPersonal: any){
    this.modal.open(regisInfoPersonal,{size:'xl'});
  }

  abrirModalInfoEscolar(regisInfoEscolar: any){
    this.modal.open(regisInfoEscolar,{size:'xl'});

  }

  abrirModalInfoIdiomas(regisInfoIdiomas: any){
    this.modal.open(regisInfoIdiomas,{size:'xl'});
  }

  abrirModalSubirDocumentos(subirDocumentos: any){
    this.modal.open(subirDocumentos,{size: 'xl'});

  }

  abrirModalConfirmacionCapData(confirmacionRegistros: any){
    this.modal.open(confirmacionRegistros,{size:'md'});

  }

}
