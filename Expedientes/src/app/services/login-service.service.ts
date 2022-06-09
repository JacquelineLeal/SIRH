import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  urlPostLogin = environment.urlPostLogin;

  constructor(private http:HttpClient) { }


  postInicioSesion(loginData: DatosLogin){
    return this.http.post(this.urlPostLogin, loginData);

  }

}

export interface DatosLogin{
  CVE_EMPLEADO:String, 
	NOMBRE:String, 
	APE_PATERNO:String,
	APE_MATERNO:String,
	SISTEMA:String,
	NOMBRE_USUARIO:String, 
	PASSW:String,
	TIPO_USUARIO:String
}
