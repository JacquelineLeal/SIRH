import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {DatosLogin,LoginServiceService} from '../../services/login-service.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newDatosUsuario: DatosLogin = {
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO:'',
    APE_MATERNO: '',
    SISTEMA:'',
	  NOMBRE_USUARIO:'', 
    PASSW: '',
	  TIPO_USUARIO:''
  }

  listaResLogin: any = [];

  constructor(
    public modal:NgbModal, 
    public router:Router,
    private datosLoginService: LoginServiceService,
    private cookieService: CookieService

  ) { }

  ngOnInit(): void {
    console.log(this.newDatosUsuario);
    

  }

  async btnClickInicioSesion(){
   // alert("Bienvenido {{usuario.nombre}} {{usuario.apellidoP}}");
    //this.router.navigateByUrl('registrar-persona');
    await this.datosLoginService.postInicioSesion(this.newDatosUsuario).subscribe(
      res=>{
        this.listaResLogin = res;

        if(this.listaResLogin.accessToken === 'SinToken'){
          console.log(this.listaResLogin.accessToken);
          alert(this.listaResLogin.message);
          

        }else{
          console.log(this.listaResLogin.accessToken);
          alert(this.listaResLogin.message);
          this.cookieService.set('token_access',this.listaResLogin.accessToken, 4, '/');
          this.router.navigateByUrl('registro-new-data');

        }

       
        

      },
      err=>{

      }
    )


    
  }

}
