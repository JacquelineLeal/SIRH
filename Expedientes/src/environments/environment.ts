// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//require('dotenv').config();

export const environment = {
  
  production: false,

  //RUTAS DATOS INICIALES EXPEDIENTES SERVICE
  
  urlPostDatosPDomComTRAMITE:'http://localhost:5000/all-data/post-tramite',
  urlPostDatosPDomCom:'http://localhost:5000/all-data/post',
  url_OP1_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op1',
  url_OP2_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op2',
  url_OP3_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op3',
  url_OP4_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op4',
  url_OP5_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op5',
  url_OP6_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op6',
  url_OP7_PostDatosPDomComMerdiaFil :  'http://localhost:5000/all-data/post-op7',
  url_OP8_PostDatosPDomComMerdiaFil :'http://localhost:5000/all-data/post-op8',
  urlPutInfoCompletaDataPersonalTramite:'http://localhost:5000/all-data/update-info-completa-data-tramite',

  urlPutDatosPDomCom : 'http://localhost:5000/all-data/put',
  urlGetEstadoCivil : 'http://localhost:5000/datos-inputs/get/estadoCivil',
  urlGetPaisNac : 'http://localhost:5000/datos-inputs/get/paisNacionalidad',
  urlGetEstados : 'http://localhost:5000/datos-inputs/get/estados',
  urlGetMunicipios :'http://localhost:5000/datos-inputs/get/municipios',
  urlGetCiudades :'http://localhost:5000/datos-inputs/get/ciudades',

  urlGetListaEscolaridadValInputs : 'http://localhost:5000/datos-inputs/get/lista-escolaridades',
  urlBuscarByCve : 'http://localhost:5000/edit/search-by-cve',
  urlBuscarByNombre : 'http://localhost:5000/edit/search-by-name',
  urlBuscarByNameAp : 'http://localhost:5000/edit/search-by-name-ap',
  urlBuscarByCompleteName : 'http://localhost:5000/edit/search-by-name-complete',

  urlGetDatosPersonalesEdit : 'http://localhost:5000/edit/get-data-personal-edit/',
  urlGetDatosDomEdit : 'http://localhost:5000/edit/get-data-dom-edit/',
  urlGetDatosComplementariosEdit : 'http://localhost:5000/edit/get-data-complementarios-edit/',
  urlGetDatosMediaFiliacionEdit : 'http://localhost:5000/edit/get-data-mediafiliacion-edit/',


  // RUTAS PARA DATOS ESCOLARES SERVICES
  urlPostDatosEscolares : 'http://localhost:5000/datosescolares/post',
  urlGetDatosEscolaresById : 'http://localhost:5000/datosescolares/get/',
  urlPutDatosEscolares : 'http://localhost:5000/datosescolares/put',

  urlGetDatosEscolareByIdEnlace : 'http://localhost:5000/datosescolares/get/',

  urlGetDatosEscoByCveEmp : "http://localhost:5000/datosescolares/get-by-cve/",
  
  // RUTAS PARA DATOS-P-DOM-COM SERVICES
  urlGetListaNombresRegis : 'http://localhost:5000/registro-nombres/get',
  urlPostNombresToDP : 'http://localhost:5000/registro-nombres/post',

  
  
  urlGetDataPersonalByCveEmp :'http://localhost:5000/registro-nombres/get-data-personal-list/',

  //RUTAS PARA  DOCUMENTOS SERVICE
  urlPostDocumentos : 'http://localhost:5000/documentos/post',
  urlTraerImg : 'http://localhost:5000/documentos/get',
  urlTraerListaDocumentosIniciales : 'http://localhost:5000/documentos/get-lista-docs-iniciales',
  urlTraerListaDocsInsertadosByIdEnlace : 'http://localhost:5000/documentos/getDocsById/',
  urlEditarDocumentos : 'http://localhost:5000/documentos/put',
  urlTraeListaDocsByCveEmp : 'http://localhost:5000/documentos/getDocsByCveEmp/',

  //RUTAS PARA IDIOMAS SERVICES
  urlPostIdiomas : 'http://localhost:5000/idiomas/post',
  urlGetIdiomasByIdEnlace : 'http://localhost:5000/idiomas/get/',
  urlGetIdiomasByCveEmp : 'http://localhost:5000/idiomas/get-idiomas-cve/',
  urlPutIdiomas : 'http://localhost:5000/idiomas/put',

  //RUTAS PARA LOGIN
  urlPostLogin : 'http://localhost:5000/usuarios/login'



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
