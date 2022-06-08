import { Component, OnInit } from '@angular/core';
import{IdiomasService} from '../../services/idiomas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regis-idiomas',
  templateUrl: './regis-idiomas.component.html',
  styleUrls: ['./regis-idiomas.component.scss']
})
export class RegisIdiomasComponent implements OnInit {

  listaNumerosEmpleados: any = [];

  ListaTop1PorEmpleado: any = [];
  
  LenghListaNumerosEmpleados = 0;


  constructor(
    private datosIdiomasService : IdiomasService,
    public router:Router
  
  ) { }

  ngOnInit(): void {
  } 

  async traerNumerosEmpleados(){
    await this.datosIdiomasService.getNumEmpleadosFabian().subscribe(
      res=>{
        this.listaNumerosEmpleados = res;
        this.LenghListaNumerosEmpleados = Object.keys(this.listaNumerosEmpleados).length;
        console.log('NumerosEmpleados', this.listaNumerosEmpleados);
        console.log('lenght', this.LenghListaNumerosEmpleados);
        
        
      }
    )
  }

  async traerTopByCveAndLlenarTable1000(){

    for(var i =0; i<1000; i++){
      this.listaNumerosEmpleados[i].CVE_EMPLEADO
      await this.datosIdiomasService.getTop1ByCveFabian(this.listaNumerosEmpleados[i].CVE_EMPLEADO).subscribe(
        res=>{
          this.ListaTop1PorEmpleado.push(res[0]);
    
        }
      )
    }
    console.log('push',this.ListaTop1PorEmpleado);
    



  }

  async traerTopByCveAndLlenarTable1000a2(){
   
     for(var i =1000; i<2000; i++){
       this.listaNumerosEmpleados[i].CVE_EMPLEADO
       await this.datosIdiomasService.getTop1ByCveFabian(this.listaNumerosEmpleados[i].CVE_EMPLEADO).subscribe(
         res=>{
           this.ListaTop1PorEmpleado.push(res[0]);  
     
         }
       )
     }
     console.log('push',this.ListaTop1PorEmpleado);
     
 
 
 
   }

   async traerTopByCveAndLlenarTable1000a3(){
   
 
     for(var i =2000; i<3000; i++){
       this.listaNumerosEmpleados[i].CVE_EMPLEADO
       await this.datosIdiomasService.getTop1ByCveFabian(this.listaNumerosEmpleados[i].CVE_EMPLEADO).subscribe(
         res=>{
           this.ListaTop1PorEmpleado.push(res[0]);
     
         }
       )
     }
     console.log('push',this.ListaTop1PorEmpleado);
     
 
 
 
   }


   async traerTopByCveAndLlenarTable1000a4(){
   
     for(var i =3000; i<4000; i++){
       this.listaNumerosEmpleados[i].CVE_EMPLEADO
       await this.datosIdiomasService.getTop1ByCveFabian(this.listaNumerosEmpleados[i].CVE_EMPLEADO).subscribe(
         res=>{
           this.ListaTop1PorEmpleado.push(res[0]);
     
         }
       )
     }
     console.log('push',this.ListaTop1PorEmpleado);
     
 
 
 
   }

   async traerTopByCveAndLlenarTable1000a4915(){
    
     for(var i =4000; i<4915; i++){
       this.listaNumerosEmpleados[i].CVE_EMPLEADO
       await this.datosIdiomasService.getTop1ByCveFabian(this.listaNumerosEmpleados[i].CVE_EMPLEADO).subscribe(
         res=>{
           this.ListaTop1PorEmpleado.push(res[0]);
     
         }
       )
     }
     console.log('push',this.ListaTop1PorEmpleado);
     
 
 
 
   }

  
 /* async getListaByCve(){
    await this.datosInicialesService.getListaNomSearchByCve(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(this.listaPersonas[0].ESTATUS === 'A'){
          console.log('soy a', this.listaPersonas[0].ESTATUS);
          

        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }*/





}
