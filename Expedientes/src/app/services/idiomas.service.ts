import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class IdiomasService {


  urlPostIdiomas = 'http://localhost:5000/idiomas/post';
  urlGetIdiomasByIdEnlace = 'http://localhost:5000/idiomas/get/';
  urlTraerImg = 'http://localhost:5000/documentos/get';

  urlGetIdiomasByCveEmp = 'http://localhost:5000/idiomas/get-idiomas-cve/';
  urlPutIdiomas = 'http://localhost:5000/idiomas/put';


  //____________DATA FABIAN_________________
  urlGetNumerosEmpleados = 'http://localhost:5000/fabian/getNumEmp';
  urlGetTop1ByCveEmpleados = 'http://localhost:5000/fabian/getTopByCve/';

  constructor(private http:HttpClient) { }


  addIdiomas(idiomasData: DatosIdiomas){
    return this.http.post(this.urlPostIdiomas, idiomasData);
  }

  getIdiomasById(IdEnlace: any){
    return this.http.get(this.urlGetIdiomasByIdEnlace + IdEnlace);
  }
  getImagen(){
    return this.http.get(this.urlTraerImg);
  }

  getIdiomasByCveEmp(CVE_EMPLEADO: any){
    return this.http.get(this.urlGetIdiomasByCveEmp + CVE_EMPLEADO);
  }

  updateIdiomas(idiomasData: DatosIdiomas){
    return this.http.put(this.urlPutIdiomas, idiomasData);
  }



  //__________________________________________________________________________________
  //        API PARA LOS DATOS DEL FABIAN 


  getTop1ByCveFabian(CVE_EMPLEADO: any){
    return this.http.get(this.urlGetTop1ByCveEmpleados + CVE_EMPLEADO);
  }
  getNumEmpleadosFabian(){
    return this.http.get(this.urlGetNumerosEmpleados);
  }


}

export interface DatosIdiomas{
  CVE_EMPLEADO: String,
  CONSECUTIVO: Number,
  IDIOMA: String,
  LECTURA: '',
  ESCRITURA: '',
  CONVERSACION: '',
  IdEnlace: Number,
  IdIdiomas: Number,
  NOMBRE: String,
  APE_PATERNO: String,
  APE_MATERNO: String
}
