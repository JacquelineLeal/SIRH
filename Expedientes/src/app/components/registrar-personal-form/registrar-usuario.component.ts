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
  
  arreglo:any = {};

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
    
    if(this.newRegistrarDatos.NOMBRE === ''){
      console.log('vacio');
      this.guardarDatosInputs();
      

    }else{
      console.log('con data', this.newRegistrarDatos);
      this.newRegistrarDatos =  this.datosInicialesService.newRegistrarDatos;
      this.guardarDatosInputs();

    }




   /* if(this.datosInicialesService.Id === ''){
      console.log('true vacio');
     // this.guardarDatosInputs();
      

    }else{
      console.log('else');
      if(this.newRegistrarDatos.NOMBRE === ''){
        console.log(this.newRegistrarDatos);
        
      }else{
        console.log('otroelse');
         console.log(this.newRegistrarDatos);
        
      }
     /// this.traerById();
      
      

    }*/



    
    
   // console.log(this.datosInicialesService.Id);  
    //console.log(this.datosInicialesService.IdDomicilio);
    


    /*this.datosInicialesService.var$.subscribe(arre =>{
      this.arreglo = arre;
      g
      if(this.newRegistrarDatos.NOMBRE === ''){
  
       console.log('estoy vacio');
       
  
     }else{
       console.log('else');
     }
     this.newRegistrarDatos = this.arreglo;
     console.log('newdatos:', this.newRegistrarDatos);
     
     console.log('taerInoutsValor:', this.arreglo);
      
    })
*/

    //if(this.arregloParaVerSiEstaVacioLosInputs.NOMBRE === undefined || this.arregloParaVerSiEstaVacioLosInputs.NOMBRE ==='' || this.arregloParaVerSiEstaVacioLosInputs.NOMBRE === null){
     // this.guardarDatosInputs();

     // console.log('if name vacio valoresinputs');
      //console.log(this.datosInicialesService.ValoresInputsR egistroDataPD);

   // }else{
            
      //this.sitraevalores();
     // console.log('else si trae datos');
     // console.log(this.arregloParaVerSiEstaVacioLosInputs);
      
     // console.log('oninit:', this.newRegistrarDatos);

      
  
   // }
   // this.guardarDatosInputs();
   
   // console.log(this.datosInicialesService.ValoresInputsRegistroDataPD);
  }

  //MANDAR INFO DE LOS INPUTS A REGISTRAR PERSONAL 
  guardarDatosInputs(){
    this.valorInputRegistro = this.newRegistrarDatos;
    this.valorOutputRegistro.emit(this.valorInputRegistro);
    this.datosInicialesService.ValoresInputsRegistroDataPD = this.valorInputRegistro;
  }

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
