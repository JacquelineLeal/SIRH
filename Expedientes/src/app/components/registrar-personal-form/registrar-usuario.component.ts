import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Datos, IdsParaEditarDataPD, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {
  date: Date = new Date();
  newRegistrarDatos: any = this.datosInicialesService.newRegistrarDatos;
  listaEstadoCivil: any = this.datosInicialesService.listaEstadoCivil;
  listaPaisNac: any = this.datosInicialesService.listaPaisNac;
  listaEstados: any = this.datosInicialesService.listaEstados;
  listaMunicipios: any = this.datosInicialesService.listaMunicipios;
  listaCiudades: any = this.datosInicialesService.listaCiudades;

  arreglo:any = {};
  value: any ='';
  value2: any = '';
  arregloIdsParaTraerInfo: IdsParaEditarDataPD = {
    Id : this.datosInicialesService.Id,
    IdDomicilio: this.datosInicialesService.IdDomicilio,
    IdEstudios: this.datosInicialesService.IdEstudios
  }
  //VARIABLES PARA MANDAR LOS VALORES DE LOS INPUTS AL COMPONENTE DE REGISTRO
  @Input() valorInputRegistro: any = {};
  @Output() valorOutputRegistro = new EventEmitter<any>();

  @Input() valorInputEditarDatosIni: any = {};
  @Output() valorOutputEditarDatosIni = new EventEmitter<any>();

  //@Input() arregloParaVerSiEstaVacioLosInputs: any = {};
  //@Output() outputParaVerSiEstaVacioLosInputs = new EventEmitter<any>();

  



 
  constructor(public router:Router, public datosInicialesService: DatosInicialesExpedientesService, public cookieService: CookieService) { }

  ngOnInit(): void {
    //this.traerValordeLosInputs();
    //console.log(this.arreglo); 
    console.log('oninitregis');
    console.log(this.newRegistrarDatos);
   /* this.GetDataestadoCivil();
    this.GetDatapaisNac();
    this.GetDataEstados();
    this.GetDataMunicipios();
    this.GetDataCiudades();*/
    
    
    
    if(this.newRegistrarDatos.NOMBRE === ''){
      console.log('vacio');
      this.guardarDatosInputs();
      

    }else{
      console.log('con data', this.newRegistrarDatos);
      this.newRegistrarDatos =  this.datosInicialesService.newRegistrarDatos;
      this.guardarDatosInputs();

    }




   
  }

  //MANDAR INFO DE LOS INPUTS A REGISTRAR PERSONAL 
  guardarDatosInputs(){
    this.valorInputRegistro = this.newRegistrarDatos;
    this.valorOutputRegistro.emit(this.valorInputRegistro);
    this.datosInicialesService.ValoresInputsRegistroDataPD = this.valorInputRegistro; 
  }

  radioChangePerteneceEtnia(event:any){
    this.value = event.target.value; 
    console.log(this.value);
  }


  radioChangeHablaInd(event:any){
    this.value2 = event.target.value; 
    console.log(this.value2);

  }

 /* async GetDataestadoCivil(){
    await this.datosInicialesService.getEstadosCivil().subscribe(
      res=>{
        this.listaEstadoCivil = res;
        console.log(this.listaEstadoCivil);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }


  mostrarPais(event: any){
    this.value = event.target;
    console.log(this.value);
    
    console.log('HIKEHDE');
    
  }

  async GetDatapaisNac(){
    await this.datosInicialesService.getPaisNac().subscribe(
      res=>{
        this.listaPaisNac = res;
        console.log(this.listaPaisNac);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

  async GetDataEstados(){
    await this.datosInicialesService.getEstados().subscribe(
      res=>{
        this.listaEstados = res;
        console.log(this.listaEstados);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }


  async GetDataMunicipios(){
    await this.datosInicialesService.getMunicipios().subscribe(
      res=>{
        this.listaMunicipios = res;
        console.log(this.listaMunicipios);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

  async GetDataCiudades(){
    await this.datosInicialesService.getCiudades().subscribe(
      res=>{
        this.listaCiudades = res;
        console.log(this.listaCiudades);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }*/

  

  //MANDAR DATOS DE LOS INPUTS A EDITAR PERSONAL
  

  
  traerValordeLosInputs(){
   // this.arreglo = this.datosInicialesService.verSiInputsVacios;
   
  
     
  }

  async traerById(){
    await this.datosInicialesService.getDatosEmpleadoById(this.arregloIdsParaTraerInfo).subscribe(
      res=>{
        //console.log(res);
        this.arreglo = res;
        this.datosInicialesService.newRegistrarDatos = this.arreglo;
        this.newRegistrarDatos = this.arreglo;
        //this.datosInicialesService.var$.emit(this.arreglo);
       // this.arregloParaVerSiEstaVacioLosInputs = res;
       // this.outputParaVerSiEstaVacioLosInputs.emit(this.arregloParaVerSiEstaVacioLosInputs)
       // this.datosInicialesService.verSiInputsVacios = this.arregloParaVerSiEstaVacioLosInputs; 
        console.log('ver-inputs edit');
        
        console.log( this.datosInicialesService.newRegistrarDatos);
      },
      err => {
        console.log(err);

        
      }
      
    )
 


  
  }
 /* sitraevalores(){
    this.newRegistrarDatos = this.arregloParaVerSiEstaVacioLosInputs;

  }*/

 /* registrarDatosPDE(){
    
    this.datosInicialesService.addDatosPDE(this.newRegistrarDatos).subscribe(
      res=>{
        console.log(res);
        this.cookieService.set('Nombre',`${this.newRegistrarDatos.NOMBRE}`);
        this.cookieService.set('ApellidoP',`${this.newRegistrarDatos.APE_PATERNO}`);
        this.cookieService.set('ApellidoM',`${this.newRegistrarDatos.APE_MATERNO}`);
        this.cookieService.set('CveEmpleado',`${this.newRegistrarDatos.CVE_EMPLEADO}`);
        //console.log(this.cookieService.get('Nombre'));
        
        alert("Datos registrados exitosamente");

        this.router.navigateByUrl('registrar-info-escolar');
      
        
       // this.router.navigateByUrl('registrar-info-escolar');
        
      },

      err=>{
        console.log(err);
        alert("Ha ocurrido un error de conexión, favor de intentarlo nuevamente");
      }
    ); 
    

  } */

}
