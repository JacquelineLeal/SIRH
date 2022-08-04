// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//require('dotenv').config();

export const environment = {
  
  production: false,
  sistema: "EXPEDIENTES",
  rolUser1:"CAPTURISTA",
  rolUser2:"ARCHIVO",

  //RUTAS DATOS INICIALES EXPEDIENTES SERVICE
  
  //11
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

  url_OP9_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op9',
  url_OP10_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op10',
  url_OP11_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op11',
  url_OP12_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op12',
  url_OP13_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op13',
  url_OP14_PostDatosPDomComMerdiaFil : 'http://localhost:5000/all-data/post-op14',
  url_OP15_PostDatosPDomComMerdiaFil :  'http://localhost:5000/all-data/post-op15',
  url_OP16_PostDatosPDomComMerdiaFil :'http://localhost:5000/all-data/post-op16',





  urlPutInfoCompletaDataPersonalTramite:'http://localhost:5000/all-data/update-info-completa-data-tramite',

  //6
  urlPutDatosPDomCom : 'http://localhost:5000/all-data/put',
  urlGetEstadoCivil : 'http://localhost:5000/datos-inputs/get/estadoCivil',
  urlGetPaisNac : 'http://localhost:5000/datos-inputs/get/paisNacionalidad',
  urlGetEstados : 'http://localhost:5000/datos-inputs/get/estados',
  urlGetMunicipios :'http://localhost:5000/datos-inputs/get/municipios',
  urlGetCiudades :'http://localhost:5000/datos-inputs/get/ciudades',

  //5
  urlGetListaEscolaridadValInputs : 'http://localhost:5000/datos-inputs/get/lista-escolaridades',

  urlBuscarByCve : 'http://localhost:5000/edit/search-by-cve',
  urlBuscarByNombre : 'http://localhost:5000/edit/search-by-name',
  urlBuscarByNameAp : 'http://localhost:5000/edit/search-by-name-ap',
  urlBuscarByCompleteName : 'http://localhost:5000/edit/search-by-name-complete',

  //4
  urlGetDatosPersonalesEdit : 'http://localhost:5000/edit/get-data-personal-edit/',
  urlGetDatosDomEdit : 'http://localhost:5000/edit/get-data-dom-edit/',
  urlGetDatosComplementariosEdit : 'http://localhost:5000/edit/get-data-complementarios-edit/',
  urlGetDatosMediaFiliacionEdit : 'http://localhost:5000/edit/get-data-mediafiliacion-edit/',


  urlBuscarFchPagoByCve : 'http://localhost:5000/edit/search-fch-by-cve',
  urlBuscarFchPagoByFechas : 'http://localhost:5000/edit/search-fch-by-fechas',
  urlBuscarFchPagoByNombres : 'http://localhost:5000/edit/search-fch-by-nombre',





  // RUTAS PARA DATOS ESCOLARES SERVICES

  //3
  urlPostDatosEscolares : 'http://localhost:5000/datosescolares/post',
  urlGetDatosEscolaresById : 'http://localhost:5000/datosescolares/get/',
  urlPutDatosEscolares : 'http://localhost:5000/datosescolares/put',

  //2
  urlGetDatosEscolareByIdEnlace : 'http://localhost:5000/datosescolares/get/',
  urlGetDatosEscoByCveEmp : "http://localhost:5000/datosescolares/get-by-cve/",
  
  // RUTAS PARA DATOS-P-DOM-COM SERVICES

  //3
  urlGetListaNombresRegis : 'http://localhost:5000/registro-nombres/get',
  urlPostNombresToDP : 'http://localhost:5000/registro-nombres/post',
  urlGetDataPersonalByCveEmp :'http://localhost:5000/registro-nombres/get-data-personal-list/',//thissisisishiefdhehf

  urlGetDataPersonalTramiteById:'http://localhost:5000/registro-nombres/get-data-personal-tramite/',
  urlGetDomicilioByIdEnlace:'http://localhost:5000/registro-nombres/get-domicilio-byIdEnlace/',
  urlGetComplementariaByIdEnlace:'http://localhost:5000/registro-nombres/get-complementaria-byIdEnlace/',
  urlGetMediaFiliacionByIdEnlace:'http://localhost:5000/registro-nombres/get-mediaFiliacion-byIdEnlace/',


  url_OP1_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op1-tramite',
  url_OP2_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op2-tramite',
  url_OP3_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op3-tramite',
  url_OP4_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op4-tramite',
  url_OP5_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op5-tramite',
  url_OP6_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op6-tramite',
  url_OP7_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op7-tramite',
  url_OP8_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op8-tramite',

  url_OP9_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op9-tramite',
  url_OP10_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op10-tramite',
  url_OP11_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op11-tramite',
  url_OP12_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op12-tramite',
  url_OP13_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op13-tramite',
  url_OP14_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op14-tramite',
  url_OP15_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op15-tramite',
  url_OP16_PostDatosPDomComMerdiaFil_Tramite:'http://localhost:5000/registro-nombres/post-op16-tramite',



 

 









  //RUTAS PARA  DOCUMENTOS SERVICE

  //6
  urlPostDocumentos : 'http://localhost:5000/documentos/post',
  urlTraerImg : 'http://localhost:5000/documentos/get',
  urlTraerListaDocumentosIniciales : 'http://localhost:5000/documentos/get-lista-docs-iniciales',
  urlTraerListaDocsInsertadosByIdEnlace : 'http://localhost:5000/documentos/getDocsById/',
  urlGetIdExpedienteById:'http://localhost:5000/documentos/getIdExpedienteById/',
  urlGetExpedienteById:'http://localhost:5000/documentos/getExpedienteById/',

  urlEditarDocumentos : 'http://localhost:5000/documentos/put',
  urlTraeListaDocsByCveEmp : 'http://localhost:5000/documentos/getDocsByCveEmp/',
  urlTraeIdExpedienteByCveEmp : 'http://localhost:5000/documentos/getIdExpedienteByCveEmp/',
  urlTraeExpedienteByCveEmp : 'http://localhost:5000/documentos/getExpedienteByCveEmp/',


  urlPostDocumentosYpostCriteriosByCveEmp:'http://localhost:5000/documentos/post-criterios-doc-cve-emp',
  urlPostDocumentosYupdateCriteriosByCveEmp:'http://localhost:5000/documentos/post-cve-emp',
  

  //RUTAS PARA IDIOMAS SERVICES 

  //4
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
