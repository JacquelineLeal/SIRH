import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-info-exis-personal',
  templateUrl: './registro-info-exis-personal.component.html',
  styleUrls: ['./registro-info-exis-personal.component.scss']
})

export class RegistroInfoExisPersonalComponent implements OnInit {

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

}
