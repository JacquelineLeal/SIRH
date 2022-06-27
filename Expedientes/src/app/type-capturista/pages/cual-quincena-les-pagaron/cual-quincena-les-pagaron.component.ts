import { Component, OnInit } from '@angular/core';
import {DatosBuscarInputsFechaPago ,DatosInicialesExpedientesService} from '../../../services/datos-iniciales-expedientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cual-quincena-les-pagaron',
  templateUrl: './cual-quincena-les-pagaron.component.html',
  styleUrls: ['./cual-quincena-les-pagaron.component.scss']
})
export class CualQuincenaLesPagaronComponent implements OnInit {

  listaPersonas: any = [];
  ValorBusquedaFechaInicio = '';
  ValorBusquedaFechaFin = '';

  valoresInputBusqueda: DatosBuscarInputsFechaPago={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    FECHA_INICIO: '',
    FECHA_FIN: ''
  }
  constructor(
    private datosInicialesService: DatosInicialesExpedientesService,
  ) { }

  ngOnInit(): void {
  }

  async getListaFchByCve(){
    await this.datosInicialesService.getListaFchByCve(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  async getListaFchByFchas(){
    await this.datosInicialesService.getListaFchByFchas(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  async getListaFchByNombre(){
    await this.datosInicialesService.getListaFchByNombre(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }

  cambiarFormatoFechas(){
    this.valoresInputBusqueda.FECHA_INICIO = this.ValorBusquedaFechaInicio;//.replace(/-/g,"");
    this.valoresInputBusqueda.FECHA_FIN = this.ValorBusquedaFechaFin;//.replace(/-/g,"");
  }

  limpiarFechas(){
    this.valoresInputBusqueda.FECHA_INICIO = '';
    this.valoresInputBusqueda.FECHA_FIN = '';

  }

  async  buscarData(){
   
    console.log(this.valoresInputBusqueda);

    if( this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.ValorBusquedaFechaInicio == '' && this.ValorBusquedaFechaFin == ''){
      console.log('TODOS VACIOS');
      Swal.fire(
        '',
        'Aún no ha ingresado datos para buscar',
        'info'
      );
      this.listaPersonas = [];

    }else{

      if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' &&  this.ValorBusquedaFechaInicio == '' && this.ValorBusquedaFechaFin == ''){
        await this.limpiarFechas();
        console.log('cveemp');
       
        await this.getListaFchByCve();
      }else{
        if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.ValorBusquedaFechaInicio == '' && this.ValorBusquedaFechaFin == ''){
          await this.limpiarFechas();
          console.log('nombre');
         
          await this.getListaFchByNombre();
        }else{
          if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.ValorBusquedaFechaInicio != '' && this.ValorBusquedaFechaFin != ''){
            console.log('fecha');
            
            await this.cambiarFormatoFechas();
            await this.getListaFchByFchas();
          }else{
             
            Swal.fire({
              title:'INFORMACIÓN NO VÁLIDA',
              html:'La consultas que puede realizar son las siguientes:<br><br>'+
                    '<ol align="left"><li> Por <b>Número de empleado</b></li>'+
                    '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                    '<li>Por <b>Rango de fechas</b> (Fecha Inicio - Fecha Final)</li></ol><br>',
                    
              icon:'info'
            });
            this.listaPersonas = [];
            this.limpiarFechas();
          }

        }

      }

      

      

    }


    
  }



}
