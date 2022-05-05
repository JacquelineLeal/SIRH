import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DatosBuscarInputs, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';


@Component({
  selector: 'app-edito-new-data',
  templateUrl: './edito-new-data.component.html',
  styleUrls: ['./edito-new-data.component.scss']
})
export class EditoNewDataComponent implements OnInit {

  listaPersonas: any = [];
  valoresInputBusqueda: DatosBuscarInputs={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
  }
  constructor(
    public router:Router, 
    public modal:NgbModal,
    private datosInicialesService: DatosInicialesExpedientesService,
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

  buscarData(){
    console.log(this.valoresInputBusqueda);
    
    if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == '' ){
      console.log('TODOS VACIOS');
      alert('No hay datos para buscar');
    }else{
      if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
        console.log('cveEmpleado with valor');
        this.getListaByCve();

      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
        console.log('nombre with valor');
        this.getListaByNombre();
      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO == ''){
        console.log('nombre y AP with valor');
        this.getListaByNomAP();
      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO != ''){
        console.log('nombre, AP Y AM  with valor');
        this.getListaByNomCompleto();
      }

     
      
    }
      
    

  }


  async getListaByCve(){
    await this.datosInicialesService.getListaNomSearchByCve(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  async getListaByNombre(){
    await this.datosInicialesService.getListaNomSearchByNom(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }

  async getListaByNomAP(){
    await this.datosInicialesService.getListaNomSearchByNomAP(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }

  async getListaByNomCompleto(){
    await this.datosInicialesService.getListaNomSearchByNomComplet(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }




}  
