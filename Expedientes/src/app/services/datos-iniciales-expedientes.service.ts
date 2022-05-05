import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';




  

  
 
@Injectable({
  providedIn: 'root'
})
export class DatosInicialesExpedientesService {
  //VARIABLES PARA ALMACENAR LOS ID´S DE LA TABLA DATOS PERSONALES Y ID DE DOMICILIO PARA BUSCAR LOS DATOS Y PODER EDITAR
   Id: String = '';
   IdDomicilio: String = '';
   IdEstudios : String = '';

   listaEstadoCivil: any = [];
   listaPaisNac: any = [];
   listaEstados: any = [];
   listaMunicipios: any = [];
   listaCiudades: any = [];

  //OBJETO PARA ALMACENAR LOS VALORES DE LOS INPUTS DEL COMPONENTE DE REGISTRO FORM TO REGISTRO PERSONA
   ValoresInputsRegistroDataPD:any = {};
   
   
   verSiInputsVacios:any = {};

   var$ = new EventEmitter<any>();

   date: Date = new Date();
  newRegistrarDatos: Datos = {

    Id: '',
    INFO_COMPLETA:'',
    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    ESTATUS : 'P',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
        
    SEXO:'',
    FECHA_NAC: this.date,
    EST_CIVIL:'',
    CVE_RFC:'',
    CURP:'',
    CVE_ELECTOR:'',
    LICENCIA:'',
        
    PASAPORTE:'',
    CARTILLA:'',

    PAIS_NAC:0,
    EDO_NAC:0,
    MUN_NAC:0,
    NACIONALIDAD:0,

    CVE_EMPLEADO:'00000',
    TABLAS:'1000000000000000000000000',
   
    FCH_UAC: this.date,


    OBSERVACIONES:'', 

    EMAIL:'',
    TELEFONO:'',
    CELULAR:'',

    CALLE:'',
    ENTRE_CALLE:'',
    Y_CALLE:'',

    NO_EXTERIOR:'',
    NO_INTERIOR:'',
    COLONIA:'',
    CODIGO_POSTAL:'',
    ENTIDAD :'',
    MUNICIPIO:'',
    CIUDAD:'',

    PERTENECE_ETNIA:'',
    NOM_ETNIA:'',
    HABLA_LEN_INDIGENA:'',
    LENGUA_INDIGENA:'',
    ES_PADRE:'',
    TIENE_DISCAPACIDAD:'',
    NOM_DISCAPACIDAD:'',
    ES_AGENTEMP_PERITO:'',
    IdEnlace: ''


  /*  ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''  */      

       
  }

  limpiarInputsRegistro:Datos={
    
    Id: '',
    INFO_COMPLETA:'',
    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    ESTATUS : 'P',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
        
    SEXO:'',
    FECHA_NAC: this.date,
    EST_CIVIL:'',
    CVE_RFC:'',
    CURP:'',
    CVE_ELECTOR:'',
    LICENCIA:'',
        
    PASAPORTE:'',
    CARTILLA:'',

    PAIS_NAC:0,
    EDO_NAC:0,
    MUN_NAC:0,
    NACIONALIDAD:0,

    CVE_EMPLEADO:'00000',
    TABLAS:'1000000000000000000000000',
   
    FCH_UAC: this.date,


    OBSERVACIONES:'', 

    EMAIL:'',
    TELEFONO:'',
    CELULAR:'',

    CALLE:'',
    ENTRE_CALLE:'',
    Y_CALLE:'',

    NO_EXTERIOR:'',
    NO_INTERIOR:'',
    COLONIA:'',
    CODIGO_POSTAL:'',
    ENTIDAD :'',
    MUNICIPIO:'',
    CIUDAD:'',

    PERTENECE_ETNIA:'',
    NOM_ETNIA:'',
    HABLA_LEN_INDIGENA:'',
    LENGUA_INDIGENA:'',
    ES_PADRE:'',
    TIENE_DISCAPACIDAD:'',
    NOM_DISCAPACIDAD:'',
    ES_AGENTEMP_PERITO:'',
    IdEnlace: ''


  }
  
  updateDatos: DatosUpdate = {

    Id: '',
    IdDomicilio: '',
    IdEstudios:  '',
    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    ESTATUS : '',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
        
    SEXO:'',
    FECHA_NAC: this.date,
    EST_CIVIL:'',
    CVE_RFC:'',
    CURP:'',
    CVE_ELECTOR:'',
    LICENCIA:'',
        
    PASAPORTE:'',
    CARTILLA:'',

    PAIS_NAC:0,
    EDO_NAC:0,
    MUN_NAC:0,
    NACIONALIDAD:0,

    CVE_EMPLEADO:'00000',
    TABLAS:'0000001',
    FCH_UAC: this.date,


    OBSERVACIONES:'',

    EMAIL:'',
    TELEFONO:'',
    CELULAR:'',

    CALLE:'',
    ENTRE_CALLE:'',
    Y_CALLE:'',

    NO_EXTERIOR:'',
    NO_INTERIOR:'',
    COLONIA:'',
    CODIGO_POSTAL:'',
    ENTIDAD :'',
    MUNICIPIO:'',
    CIUDAD:''


  }

 // urlListaNombres = process.env.URLGETLISTARNOMBRES;
  urlListaNombres = 'http://localhost:5000/datospersonales/get';
  urlAgregarDatosPersonalesDomicilio ='http://localhost:5000/datospersonales/post';
  urlEditarDatosPersonalesDomicilio = 'http://localhost:5000/datospersonales/put';

  urlListaNombreSearchByNombre = 'http://localhost:5000/datospersonales/search-by-name';
  urlListaNombreSearchByNomAP ='http://localhost:5000/datospersonales/search-by-name-ap';
  urlListaNombreSearchByNomComplete='http://localhost:5000/datospersonales/search-by-name-complete';

  urlTraerDatosPDByIDParaEditar = 'http://localhost:5000/datospersonales/get-by-ids';
  
//--------------------------------------------------------------------------------------------

  urlPostDatosPDomCom = 'http://localhost:5000/all-data/post';

  urlGetEstadoCivil = 'http://localhost:5000/datos-inputs/get/estadoCivil';

  urlGetPaisNac = 'http://localhost:5000/datos-inputs/get/paisNacionalidad';

  urlGetEstados = 'http://localhost:5000/datos-inputs/get/estados';

  urlGetMunicipios ='http://localhost:5000/datos-inputs/get/municipios';

  urlGetCiudades ='http://localhost:5000/datos-inputs/get/ciudades';

  urlBuscarByCve = 'http://localhost:5000/edit/search-by-cve';

  urlBuscarByNombre = 'http://localhost:5000/edit/search-by-name';

  urlBuscarByNameAp = 'http://localhost:5000/edit/search-by-name-ap';

  urlBuscarByCompleteName = 'http://localhost:5000/edit/search-by-name-complete';






  constructor(private http:HttpClient) { }


  //get datos para la lista componente  ver listado personal (list-agg-docs-expediente)
  getListaDeNombresEmpleados(){ 
    return this.http.get(this.urlListaNombres);
  }

  
 // busquedas de los inputs 
 
  getListaNomSearchByCve(CVE_EMPLEADO:DatosBuscarInputs){
    return this.http.post(this.urlBuscarByCve, CVE_EMPLEADO);
  }

  getListaNomSearchByNom(NOMBRE:DatosBuscarInputs){
    return this.http.post(this.urlBuscarByNombre, NOMBRE);
  }
  
  getListaNomSearchByNomAP(datos:DatosBuscarInputs ){
    return this.http.post(this.urlBuscarByNameAp,datos);
  }

  getListaNomSearchByNomComplet(datos: DatosBuscarInputs){

    return this.http.post(this.urlBuscarByCompleteName, datos)
  }
  //---------------------------------------------------------------------------------

 
  //agregar la info personal y domicilio del componente registrar-usuario  
  addDatosPDE(datos:Datos){
    return this.http.post(this.urlAgregarDatosPersonalesDomicilio,datos);
  }



  //editar datos personales y de domicilio 
  editarDatosPD(datosUpdate:DatosUpdate){
    return this.http.put(this.urlEditarDatosPersonalesDomicilio, datosUpdate);
  } 


  getDatosEmpleadoById(Ids: IdsParaEditarDataPD){
    return this.http.post(this.urlTraerDatosPDByIDParaEditar, Ids);
  }


  //----------NUEVAS PETICIONES NEW DESING------------------

  addDatosPDomCom(datos:Datos){
    return this.http.post(this.urlPostDatosPDomCom, datos);
  }

  getEstadosCivil(){ 
    return this.http.get(this.urlGetEstadoCivil);
  }

  getPaisNac(){ 
    return this.http.get(this.urlGetPaisNac);
  }

  getEstados(){ 
    return this.http.get(this.urlGetEstados);
  }

  getMunicipios(){ 
    return this.http.get(this.urlGetMunicipios);
  }

  getCiudades(){ 
    return this.http.get(this.urlGetCiudades);
  }



}

export interface IdsParaEditarDataPD {
  Id: String;
  IdDomicilio: String;
  IdEstudios: String
}

export interface DatosUpdate{
  Id: String;
  IdDomicilio: String;
  IdEstudios: String;

  FECHA_REGISTRO_DATA_PERSONAL : Date;
  ESTATUS: String;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  SEXO: String;
  FECHA_NAC: Date; 
  EST_CIVIL: String;
  
  CVE_RFC: String;
  CURP: String;
  CVE_ELECTOR?: String;
  LICENCIA?: String;

  PASAPORTE?: String;
  CARTILLA?: String;

  PAIS_NAC: Number;
  EDO_NAC: Number;
  MUN_NAC:Number;
  NACIONALIDAD: Number;

  CVE_EMPLEADO: String;
  TABLAS: String;
  FCH_UAC: Date;

  OBSERVACIONES?: String;

  EMAIL:String;
  TELEFONO: String;
  CELULAR: String;

  CALLE: String;
  ENTRE_CALLE: String;
  Y_CALLE: String;

  NO_EXTERIOR: String;
  NO_INTERIOR: String;
  COLONIA: String;
  CODIGO_POSTAL: String;
  ENTIDAD: String;
  MUNICIPIO: String;
  CIUDAD: String
}


export interface Datos{ 
  Id: String;
  INFO_COMPLETA: String;

  FECHA_REGISTRO_DATA_PERSONAL : Date;
  ESTATUS: String;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  SEXO: String;
  FECHA_NAC: Date; 
  EST_CIVIL: String;
  
  CVE_RFC: String;
  CURP: String;
  CVE_ELECTOR?: String;
  LICENCIA?: String;

  PASAPORTE?: String;
  CARTILLA?: String;

  PAIS_NAC: Number;
  EDO_NAC: Number;
  MUN_NAC:Number;
  NACIONALIDAD: Number;

  CVE_EMPLEADO: String;
  TABLAS: String;
  FCH_UAC: Date;

  OBSERVACIONES?: String;

  EMAIL:String;
  TELEFONO: String;
  CELULAR: String;

  CALLE: String;
  ENTRE_CALLE: String;
  Y_CALLE: String;

  NO_EXTERIOR: String;
  NO_INTERIOR: String;
  COLONIA: String;
  CODIGO_POSTAL: String;
  ENTIDAD: String;
  MUNICIPIO: String;
  CIUDAD: String;

  PERTENECE_ETNIA: String;
	NOM_ETNIA: String;
	HABLA_LEN_INDIGENA: String;
	LENGUA_INDIGENA:String;
	ES_PADRE: String;
	TIENE_DISCAPACIDAD: String;
	NOM_DISCAPACIDAD: String;
	ES_AGENTEMP_PERITO: String;
	IdEnlace: String;
}


export interface DatosBuscarInputs{
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;
  CVE_EMPLEADO: String;
}




