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
