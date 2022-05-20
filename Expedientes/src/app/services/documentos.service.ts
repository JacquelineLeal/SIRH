import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  urlPostDocumentos = 'http://localhost:5000/documentos/post';
  urlGetDocumentos = '';
  urlTraerImg = 'http://localhost:5000/documentos/get'

  urlTraerListaDocumentosIniciales = 'http://localhost:5000/documentos/get-lista-docs-iniciales';

  urlTraerListaDocsInsertadosByIdEnlace = 'http://localhost:5000/documentos/getDocsById/';

  urlEditarDocumentos = 'http://localhost:5000/documentos/put';

  urlTraeListaDocsByCveEmp = 'http://localhost:5000/documentos/getDocsByCveEmp/';

  constructor(private http:HttpClient) { }

  getImagen(){
    return this.http.get(this.urlTraerImg);
  }

  addDocumento(documentoData: DatosDocumentos){
    
    return this.http.post(this.urlPostDocumentos, documentoData); 
  }


  getListaDocsIniciales(){
    return this.http.get(this.urlTraerListaDocumentosIniciales);
  }

  getListaDocsByIdEnlace(IdEnlace: any){
    return this.http.get(this.urlTraerListaDocsInsertadosByIdEnlace + IdEnlace)
  }

  getListaDocsByCveEmp(CVE_EMPLEADO: any){
    return this.http.get(this.urlTraeListaDocsByCveEmp + CVE_EMPLEADO)
  }

  


  editarDocumentos(documentoData: DatosDocumentos){
    return this.http.put(this.urlEditarDocumentos, documentoData);
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
  TIPO_INSERCION: String,

  NOMBRE: String,
  APE_PATERNO: String,
  APE_MATERNO: String

}
