import { Component, OnInit } from '@angular/core';
import {DatosEscolares, TraerInfoEscolar, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
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
    NOMBRE: 'ANA',
    APE_PATERNO:'LEAL',
    APE_MATERNO:'RIVERA' 
  }


  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
   // NOMBRE: this.cookieService.get('Nombre'),
    NOMBRE: 'ANA',
    APE_PATERNO:'LEAL',
    APE_MATERNO:'RIVERA',
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
  this.getInfoEscolar();
    
  }

  getInfoEscolar(){
    this.datosInicialesService.traerDatosEscolares(this.ParamsTraerInfoEsco).subscribe(
      res=>{
        this.ListaEscolaridad=<any>res;
        console.log(this.ListaEscolaridad);
        
      },
      err=> console.log(err)
      
    );
    
  }

  getInfoEscolarParaEditar(IdEstudios:any){
    this.datosInicialesService.getDatosEscolaresById(IdEstudios).subscribe(
      res=>{
        
        this.arreglo = res;
        this.newRegistrarDatosEscolares = this.arreglo;
        console.log(this.newRegistrarDatosEscolares);
        
        this.fechaIni = this.newRegistrarDatosEscolares.FCH_INICIO?.slice(0,-14);
        this.fechaFin = this.newRegistrarDatosEscolares.FCH_TERMINO?.slice(0,-14);
        this.newRegistrarDatosEscolares.FCH_INICIO = this.fechaIni;
        this.newRegistrarDatosEscolares.FCH_TERMINO = this.fechaFin;
        //console.log(this.fechaIni);
        console.log(this.newRegistrarDatosEscolares);

        
      },
      err => console.log(err)
      
    );
  }

  postInfoEscolar(){
    this.datosInicialesService.addInfoEscolar(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        
        this.getInfoEscolar();

      },
      err => console.log(err)
      
    );
  }

  putInfoEscolar(){
    this.datosInicialesService.editarDatosEscolares(this.newRegistrarDatosEscolares).subscribe(
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
