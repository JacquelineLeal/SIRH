import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edito-new-data',
  templateUrl: './edito-new-data.component.html',
  styleUrls: ['./edito-new-data.component.scss']
})
export class EditoNewDataComponent implements OnInit {

  constructor(
    public router:Router,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
  }

  abrirModalEditInfoPersonal(editInfoPersonal: any){
    this.modal.open(editInfoPersonal,{size:'xl'});
  }

  abrirModalEditInfoEscolar(editInfoEscolar: any){
    this.modal.open(editInfoEscolar,{size:'xl'});

  }

  abrirModalEditInfoIdiomas(editInfoIdiomas: any){
    this.modal.open(editInfoIdiomas,{size:'xl'});
  }

  abrilModalEditSubirDocumentos(editSubirDocumentos: any){
    this.modal.open(editSubirDocumentos,{size:'xl'})
  }


  //--------------------------------------------------------


  abrirModal2EditInfoEscolar(btnEditarInfoEscolar: any){
    this.modal.open(btnEditarInfoEscolar,{size:'xl'})

  }
  

  abrirModal2EditInfoIdiomas(btnEditarInfoIdiomas: any){
    this.modal.open(btnEditarInfoIdiomas,{size:'xl'})

  }

  abrirModalEditDocs(btnEditarDocs: any){
    this.modal.open(btnEditarDocs,{size:'xl'})

  }
}  
