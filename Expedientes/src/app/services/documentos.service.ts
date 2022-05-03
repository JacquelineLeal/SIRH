import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  urlPostDocumentos = 'http://localhost:5000/documentos/post';
  urlGetDocumentos = '';
  urlTraerImg = 'http://localhost:5000/documentos/get'

  constructor(private http:HttpClient) { }

  getImagen(){
    return this.http.get(this.urlTraerImg);
  }

  addDocumento(documentoData: DatosDocumentos){
    return this.http.post(this.urlPostDocumentos, documentoData); 
  }


}


export interface DatosDocumentos{
  CVE_EMPLEADO: String,
  CONSECUTIVO: Number,
  TIPO: Number,
  DOCUMENTO: any,
  FCH_REGISTRO: Date,
  IdEnlace: Number,
  IdDocumentos:Number,

  NOMBRE: String,
  APE_PATERNO: String,
  APE_MATERNO: String

}
