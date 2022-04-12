import { Component, OnInit } from '@angular/core';
import {DatosEscolares, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-regitro-info-escolar',
  templateUrl: './regitro-info-escolar.component.html',
  styleUrls: ['./regitro-info-escolar.component.scss']
})
export class RegitroInfoEscolarComponent implements OnInit {

  newRegistrarDatosEscolares: DatosEscolares = {
    
    NOMBRE: this.cookieService.get('Nombre'),
    APE_PATERNO:this.cookieService.get('ApellidoP'),
    APE_MATERNO:this.cookieService.get('ApellidoM'),
    CVE_EMPLEADO: this.cookieService.get('CveEmpleado'),
    ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''        

      
  }
  constructor(
    public router:Router, 
    private datosInicialesService: DatosInicialesExpedientesService,
    public modal:NgbModal, 
    private cookieService: CookieService
    
  ) { }

  ngOnInit(): void {
    console.log(this.cookieService.get('Nombre'));
    
  }

  openModalInfoEscolar(regisInfoEsc: any){
    this.modal.open(regisInfoEsc,{size:'xl'});
  }


}
