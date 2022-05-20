import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosEscolaresServiService {

  urlGetDatosEscolares ='http://localhost:5000/datosescolares/get';
  urlPostDatosEscolares = 'http://localhost:5000/datosescolares/post';
  urlGetDatosEscolaresById = 'http://localhost:5000/datosescolares/get/';
  urlPutDatosEscolares = 'http://localhost:5000/datosescolares/put';

  urlGetDatosEscolareByIdEnlace = 'http://localhost:5000/datosescolares/get/';

  urlGetDatosEscoByCveEmp = "http://localhost:5000/datosescolares/get-by-cve/";
 

  constructor(private http:HttpClient) { }


  /*traerDatosEscolares(infoEscolar : TraerInfoEscolar){
    return this.http.post(this.urlGetDatosEscolares,infoEscolar);
  }*/

  addInfoEscolar(escolarData: DatosEscolares){
    return this.http.post(this.urlPostDatosEscolares, escolarData);
  }

  getDatosEscolaresById(IdEstudios: any){
    return this.http.get(this.urlGetDatosEscolaresById + IdEstudios);
  }

  editarDatosEscolares(escolarData: DatosEscolares){
    return this.http.put(this.urlPutDatosEscolares, escolarData);
  }
 

  //-----------------------------------------------------------------------------
  //--------------NEW INTERFACE-------------------------------------------------
  //PARA REGISTRO DE LOS CVE EMPLEADO =00000
  GetDatosEscolares(IdEnlace: any){
    return this.http.get(this.urlGetDatosEscolareByIdEnlace + IdEnlace)
  }

  //PARA EDITAR BUSCAR POR CVE EMPLEADO REAL
  GetDatosEscolaresByCveEm(CVE_EMPLEADO: any){
    return this.http.get(this.urlGetDatosEscoByCveEmp + CVE_EMPLEADO)
    //return this.http.post(this.urlGetDatosEscoByCveEmp, CVE_EMPLEADO)
  } 



  

  

}

export interface Cve{
  CVE_EMPLEADO: String
}

export interface DatosEscolares{
  IdEstudios: String;
  IdEnlace: string;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  CVE_EMPLEADO: String;
  ESCOLARIDAD: String;
  ESCUELA: String;
  ESPECIALIDAD: String;
  CEDULA: String;
  TRATAMIENTO:String;
  FCH_INICIO: String;
  FCH_TERMINO: String
}

export interface TraerInfoEscolar{
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;
}
