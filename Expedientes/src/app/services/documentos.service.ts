import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  urlPostDocumentos = environment.urlPostDocumentos ;
  
  urlTraerImg = environment.urlTraerImg ;

  urlTraerListaDocumentosIniciales = environment.urlTraerListaDocumentosIniciales ;

  urlTraerListaDocsInsertadosByIdEnlace = environment.urlTraerListaDocsInsertadosByIdEnlace;
  urlGetIdExpedienteById = environment.urlGetIdExpedienteById;
  urlGetExpedienteById = environment.urlGetExpedienteById;

  urlEditarDocumentos = environment.urlEditarDocumentos ;

  urlTraeListaDocsByCveEmp = environment.urlTraeListaDocsByCveEmp;

  urlTraeIdExpedienteByCveEmp = environment.urlTraeIdExpedienteByCveEmp;
  urlTraeExpedienteByCveEmp = environment.urlTraeExpedienteByCveEmp;

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

  getIdExpedienteeByIdEnlace(IdEnlace: any){
    return this.http.get(this.urlGetIdExpedienteById + IdEnlace)
  }
  

  getListaDocsByCveEmp(CVE_EMPLEADO: any){
    return this.http.get(this.urlTraeListaDocsByCveEmp + CVE_EMPLEADO)
  }

  getIdExpedienteByCveEmp(CVE_EMPLEADO: any){
    return this.http.get(this.urlTraeIdExpedienteByCveEmp + CVE_EMPLEADO)
  }

  getExpedienteCriteriosByCveEmp(CVE_EMPLEADO: any){
    return this.http.get(this.urlTraeExpedienteByCveEmp + CVE_EMPLEADO)
  }

  getExpedienteCriteriosByIdEnlace(IdEnlace: any){
    return this.http.get(this.urlGetExpedienteById + IdEnlace)
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
  APE_MATERNO: String,
  USUARIO:String,
  IdExpediente: Number

}
