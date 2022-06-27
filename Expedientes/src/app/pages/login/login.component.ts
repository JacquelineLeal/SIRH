import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

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
        console.log(this.listaResLogin);
        

        if(this.listaResLogin.accessToken === 'SinToken'){
          console.log(this.listaResLogin.accessToken);
          Swal.fire(
            'ERROR',
            `${this.listaResLogin.message}`,
            'error'
          )
          //alert(this.listaResLogin.message);
          

        }else{

          //otro if para ver qe tipo de usuario es si es capturista esto y si es archivo direccionar a 
          //otra page vista del hildo, si no es ninguno de los 2 alert qe no tiene acceso a ese sistema

          if(this.listaResLogin.sistema == "EXPEDIENTES"){
            if(this.listaResLogin.rol == 'CAPTURISTA'){
              console.log(this.listaResLogin.accessToken);
              Swal.fire(
                '',
                `${this.listaResLogin.message}`
                
              )
              //alert(this.listaResLogin.message);
              this.cookieService.set('token_access',this.listaResLogin.accessToken, 0, '/');
              this.cookieService.set('rol_user',this.listaResLogin.rol , 0, '/');
              this.cookieService.set('user',this.listaResLogin.user , 0, '/');

              this.router.navigateByUrl('registro/personal-tramite');

            }else{
              if(this.listaResLogin.rol == 'ARCHIVO'){
                console.log(this.listaResLogin.accessToken);
                Swal.fire(
                  '',
                  `${this.listaResLogin.message}`
                  
                )
                //alert(this.listaResLogin.message);
                this.cookieService.set('token_access',this.listaResLogin.accessToken, 0, '/');
                this.cookieService.set('rol_user',this.listaResLogin.rol , 0, '/');
                this.cookieService.set('user',this.listaResLogin.user , 0, '/');

                this.router.navigateByUrl('archivo/list-tramite');
          
 
              }else{
                Swal.fire(
                  'ERROR',
                  'Se ha producido un error, usted no tiene acceso a este sistema',
                  'error'
                );

              }
  
            }

          }else{
            Swal.fire(
              'ERROR',
              'Usted no tiene acceso a este sistema',
              'error'
            );
            
            

          }

         

        /*  console.log(this.listaResLogin.accessToken);
          Swal.fire(
            '',
            `${this.listaResLogin.message}`
            
          )
          //alert(this.listaResLogin.message);
          this.cookieService.set('token_access',this.listaResLogin.accessToken, 0, '/');
          this.cookieService.set('rol_user',this.listaResLogin.rol , 0, '/');
          this.router.navigateByUrl('registro-new-data');*/

        }

       
        

      },
      err=>{

      }
    )


    
  }

}
