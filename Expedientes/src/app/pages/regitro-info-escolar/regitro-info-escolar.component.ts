import { Component, OnInit } from '@angular/core';
import {DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import {DatosEscolares,TraerInfoEscolar, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-regitro-info-escolar',
  templateUrl: './regitro-info-escolar.component.html',
  styleUrls: ['./regitro-info-escolar.component.scss']
})
export class RegitroInfoEscolarComponent implements OnInit {
  ListaEscolaridad: any = []; 
  arreglo: any =[];
  fechaIni: any;
  fechaFin: any;

  ParamsTraerInfoEsco: TraerInfoEscolar = {
    NOMBRE: this.datosInicialesService.ValoresInputsRegistroDataPD.NOMBRE,
    APE_PATERNO: this.datosInicialesService.ValoresInputsRegistroDataPD.APE_PATERNO,
    APE_MATERNO:this.datosInicialesService.ValoresInputsRegistroDataPD.APE_MATERNO
  }


  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
   // NOMBRE: this.cookieService.get('Nombre'),
    NOMBRE: this.datosInicialesService.ValoresInputsRegistroDataPD.NOMBRE,
    APE_PATERNO:this.datosInicialesService.ValoresInputsRegistroDataPD.APE_PATERNO,
    APE_MATERNO:this.datosInicialesService.ValoresInputsRegistroDataPD.APE_MATERNO,
    CVE_EMPLEADO: '00000',
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
    private datosEscolaresService: DatosEscolaresServiService,
    private datosInicialesService: DatosInicialesExpedientesService,
    public modal:NgbModal, 
    private cookieService: CookieService
    
  ) { }

  ngOnInit(): void {
    //console.log(this.cookieService.get('Nombre'));
    console.log(this.datosInicialesService.ValoresInputsRegistroDataPD.NOMBRE);
    
    
  this.getInfoEscolar();
    
  }

  getInfoEscolar(){
    this.datosEscolaresService.traerDatosEscolares(this.ParamsTraerInfoEsco).subscribe(
      res=>{
        this.ListaEscolaridad=<any>res;
        console.log('listaEscolaridad');
        console.log(this.ListaEscolaridad);
        
      },
      err=> console.log(err)
      
    );
    
  }

  getInfoEscolarParaEditar(IdEstudios:any){
    this.datosEscolaresService.getDatosEscolaresById(IdEstudios).subscribe(
      res=>{
        
        this.arreglo = res;
        this.newRegistrarDatosEscolares = this.arreglo;

        console.log('get1');
        console.log(this.newRegistrarDatosEscolares);
        
        this.fechaIni = this.newRegistrarDatosEscolares.FCH_INICIO?.slice(0,-14);
        this.fechaFin = this.newRegistrarDatosEscolares.FCH_TERMINO?.slice(0,-14);
        this.newRegistrarDatosEscolares.FCH_INICIO = this.fechaIni;
        this.newRegistrarDatosEscolares.FCH_TERMINO = this.fechaFin;
        console.log('get2');
        console.log(this.newRegistrarDatosEscolares);

        
      },
      err => console.log(err)
      
    );
  }

  postInfoEscolar(){
    this.datosEscolaresService.addInfoEscolar(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        
        this.getInfoEscolar();

      },
      err => console.log(err)
      
    );
  }

 async putInfoEscolar(){
    
   await this.datosEscolaresService.editarDatosEscolares(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        alert("Se han guardado los cambios");
        this.getInfoEscolar();
      },
      err => console.log(err)
      
    );
  }


  openModalInfoEscolar(regisInfoEsc: any){
    this.newRegistrarDatosEscolares.ESCOLARIDAD = '';
    this.newRegistrarDatosEscolares.ESCUELA = '';
    this.newRegistrarDatosEscolares.CEDULA = '';
    this.newRegistrarDatosEscolares.ESPECIALIDAD='';
    this.newRegistrarDatosEscolares.TRATAMIENTO = '';
    this.newRegistrarDatosEscolares.FCH_INICIO ='';
    this.newRegistrarDatosEscolares.FCH_TERMINO = '';
    this.modal.open(regisInfoEsc,{size:'xl'});
  }

  btnClicGoToListadoPersonas(){
    this.router.navigateByUrl('list-agg-docs-expediente');
  }

  btnEditarInfoEsc(id:any, editInfoEsc:any){
    console.log(id);
    this.getInfoEscolarParaEditar(id);
    this.modal.open(editInfoEsc,{size:'xl'});
    
  }
 


}
