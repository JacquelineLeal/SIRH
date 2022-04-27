import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulto-new-data',
  templateUrl: './consulto-new-data.component.html',
  styleUrls: ['./consulto-new-data.component.scss']
})
export class ConsultoNewDataComponent implements OnInit {

  constructor(
    public router: Router,
    public modal: NgbModal
  ) { }

  ngOnInit(): void { 
  }

  abrirModalVerInfoGeneral(verInfoGeneral: any){
    this.modal.open(verInfoGeneral,{size:'xl'});
  }

  abrirModalVerDocumentos(verDocs: any){
    this.modal.open(verDocs,{size:'xl'});

  }

  openDescargar(contDescargarDocs:any){
    this.modal.open(contDescargarDocs,{size:'xl'});
  }



}
