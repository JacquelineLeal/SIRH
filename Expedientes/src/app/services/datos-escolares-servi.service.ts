import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosEscolaresServiService {


  urlGetDatosEscolares ='';

  constructor(private http:HttpClient) { }

  traerDatosEscolares(infoEscolar : TraerInfoEscolar){
    return this.http.post(this.urlGetDatosEscolares,infoEscolar);
  }



}


export interface TraerInfoEscolar{
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;
}