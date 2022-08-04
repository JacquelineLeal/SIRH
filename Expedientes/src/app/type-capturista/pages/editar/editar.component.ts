import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Datos, DatosBuscarInputs, DatosInicialesExpedientesService} from '../../../services/datos-iniciales-expedientes.service';
import {DatosEscolares,TraerInfoEscolar, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import{DatosIdiomas ,IdiomasService} from '../../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  today : Date = new Date();
  date : any = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' +  this.today.getDate();

  ModalEditPersonalReferences: any;
  previzualizacionDoc: any = [];
  listaEscolaridad: any = [];
  listaPersonas: any = [];
  listaIdiomas: any = [];
  listaDocumentosIni: any =[];
  listaDocsByCveEmp : any = []; 
  listaValoresEscolaridad: any = [];
  //let datosPersonales: any [];
  datosPersonales: any = [];
  datosDomicilio: any = [];
  datosComplementarios: any = [];

  DocSeleccionado = '';
  tipoDoc = '';


  newRegistrarIdiomas: DatosIdiomas = {
    CVE_EMPLEADO: '',
    CONSECUTIVO: 0,
    IDIOMA: '',
    LECTURA: '',
    ESCRITURA: '',
    CONVERSACION: '',
    IdEnlace: 0,
    IdIdiomas: 0,
    NOMBRE: '',
    APE_PATERNO:'',
    APE_MATERNO: ''

  }
 
  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
    IdEnlace: '',
    CONSECUTIVO: 0,
   // NOMBRE: this.cookieService.get('Nombrethis'),
    NOMBRE: '',
    APE_PATERNO:'',
    APE_MATERNO:'',
    CVE_EMPLEADO: '',
    ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''        

      
  }

  newRegisDocumentos: DatosDocumentos={
    CVE_EMPLEADO: '',
    CONSECUTIVO: 0,
    TIPO: 0,
    DOCUMENTO: [],
    FCH_REGISTRO: this.date,
  
    IdEnlace: 0,
    IdDocumentos: 0,
    TIPO_INSERCION: 'NEW2022',

    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: '',
    USUARIO: this.cookieService.get('user'),
    IdExpediente: 0,
    STATUS_EXPEDIENTE:'',
    LUGAR_EXPEDIENTE:''
  }
 
  valoresInputBusqueda: DatosBuscarInputs={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
  }
  
  constructor(
    public router:Router, 
    public modal:NgbModal,
    private datosInicialesService: DatosInicialesExpedientesService,
    private datosEscolaresService: DatosEscolaresServiService,
    private datosIdiomasService : IdiomasService,
    private datosDocumentosService : DocumentosService,
    private sanitizer : DomSanitizer,
    private cookieService: CookieService

  ) { }

  ngOnInit(): void {
    this.GetListDocsIniciales();
    this.GetValuesListaEscolaridad();

  }

  limpiarInputsRegisInfoEsc(){
    this.newRegistrarDatosEscolares.ESCOLARIDAD = '';
    this.newRegistrarDatosEscolares.ESCUELA = '';
    this.newRegistrarDatosEscolares.ESPECIALIDAD = '';
    this.newRegistrarDatosEscolares.CEDULA = '';
    this.newRegistrarDatosEscolares.TRATAMIENTO = '';
    this.newRegistrarDatosEscolares.FCH_INICIO = '';
    this.newRegistrarDatosEscolares.FCH_TERMINO = '';
 
  }
 
  limpiarInputsIdiomas(){
    this.newRegistrarIdiomas.IDIOMA = '';
    this.newRegistrarIdiomas.LECTURA = '';
    this.newRegistrarIdiomas.ESCRITURA = '';
    this.newRegistrarIdiomas.CONVERSACION = '';
  }
 
  limpiarInputsDocs(){
    this.newRegisDocumentos.TIPO = 0;
    this.newRegisDocumentos.DOCUMENTO = '';
  }
 
   //MODALES DE LA TABLA 
 
   async abrirModalEditInfoPersonal(editInfoPersonal: any, CVE_EMPLEADO:any){
     //traerdatos por cve de empleado e igualarlos a newdatosIniciales del servicio datos iniciales
     //await this.getDatospersonalesEditar(CVE_EMPLEADO);
     
       
         this.datosInicialesService.newRegistrarDatos.NOMBRE = '';
         this.datosInicialesService.newRegistrarDatos.APE_PATERNO = '';
         this.datosInicialesService.newRegistrarDatos.APE_MATERNO = '';
         this.datosInicialesService.newRegistrarDatos.SEXO = '';
        // this.datosInicialesService.newRegistrarDatos.FECHA_NAC = ;
         this.datosInicialesService.newRegistrarDatos.EST_CIVIL = '';
         this.datosInicialesService.newRegistrarDatos.SANGRE = '';
         this.datosInicialesService.newRegistrarDatos.CVE_RFC = ''
         this.datosInicialesService.newRegistrarDatos.CURP = '';
         this.datosInicialesService.newRegistrarDatos.CVE_ELECTOR = '';
         this.datosInicialesService.newRegistrarDatos.LICENCIA = '';
         this.datosInicialesService.newRegistrarDatos.PASAPORTE = '';
         this.datosInicialesService.newRegistrarDatos.CARTILLA = '';
         this.datosInicialesService.newRegistrarDatos.PAIS_NAC = 0;
         this.datosInicialesService.newRegistrarDatos.EDO_NAC = 0;
         this.datosInicialesService.newRegistrarDatos.MUN_NAC = 0;
         this.datosInicialesService.newRegistrarDatos.NACIONALIDAD = 0;
 
         this.datosInicialesService.newRegistrarDatos.EMAIL = '';
         this.datosInicialesService.newRegistrarDatos.TELEFONO = '';
         this.datosInicialesService.newRegistrarDatos.CELULAR = '';
         this.datosInicialesService.newRegistrarDatos.CALLE ='' ;
         this.datosInicialesService.newRegistrarDatos.ENTRE_CALLE = ' ';
         this.datosInicialesService.newRegistrarDatos.Y_CALLE = ' ';
         this.datosInicialesService.newRegistrarDatos.NO_EXTERIOR = ' ';
         this.datosInicialesService.newRegistrarDatos.NO_INTERIOR = ' ';
         this.datosInicialesService.newRegistrarDatos.COLONIA = ' ';
         this.datosInicialesService.newRegistrarDatos.CODIGO_POSTAL = ' ';
         this.datosInicialesService.newRegistrarDatos.ENTIDAD =' ' ;
         this.datosInicialesService.newRegistrarDatos.MUNICIPIO = ' ';
         this.datosInicialesService.newRegistrarDatos.CIUDAD = ' ';
 
         this.datosInicialesService.newRegistrarDatos.PERTENECE_ETNIA = '';
         this.datosInicialesService.newRegistrarDatos.NOM_ETNIA = '';
         this.datosInicialesService.newRegistrarDatos.HABLA_LEN_INDIGENA = '';
         this.datosInicialesService.newRegistrarDatos.LENGUA_INDIGENA = '';
         this.datosInicialesService.newRegistrarDatos.ES_PADRE = '';
         this.datosInicialesService.newRegistrarDatos.NOM_DISCAPACIDAD = '';
         this.datosInicialesService.newRegistrarDatos.ES_AGENTEMP_PERITO = '';  
         
   
   
 
  
 
    // this.datosInicialesService.newRegistrarDatos = this.datosInicialesService.limpiarInputsRegistro;
     await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
       res=>{
 
         this.datosPersonales = res;
         this.datosInicialesService.newRegistrarDatos.Id = this.datosPersonales[0].Id;
         this.datosInicialesService.newRegistrarDatos.INFO_COMPLETA = this.datosPersonales[0].INFO_COMPLETA;
         this.datosInicialesService.newRegistrarDatos.FECHA_REGISTRO_DATA_PERSONAL = this.datosPersonales[0].FECHA_REGISTRO_DATA_PERSONAL;
         this.datosInicialesService.newRegistrarDatos.ESTATUS = this.datosPersonales[0].ESTATUS;
         this.datosInicialesService.newRegistrarDatos.NOMBRE = this.datosPersonales[0].NOMBRE;
         this.datosInicialesService.newRegistrarDatos.APE_PATERNO = this.datosPersonales[0].APE_PATERNO;
         this.datosInicialesService.newRegistrarDatos.APE_MATERNO = this.datosPersonales[0].APE_MATERNO;
         this.datosInicialesService.newRegistrarDatos.SEXO = this.datosPersonales[0].SEXO;
         this.datosInicialesService.newRegistrarDatos.FECHA_NAC = this.datosPersonales[0].FECHA_NAC;
         this.datosInicialesService.newRegistrarDatos.EST_CIVIL = this.datosPersonales[0].EST_CIVIL;
         this.datosInicialesService.newRegistrarDatos.CVE_RFC = this.datosPersonales[0].CVE_RFC;
         this.datosInicialesService.newRegistrarDatos.CURP = this.datosPersonales[0].CURP;
         this.datosInicialesService.newRegistrarDatos.CVE_ELECTOR = this.datosPersonales[0].CVE_ELECTOR;
         this.datosInicialesService.newRegistrarDatos.LICENCIA = this.datosPersonales[0].LICENCIA;
         this.datosInicialesService.newRegistrarDatos.PASAPORTE = this.datosPersonales[0].PASAPORTE;
         this.datosInicialesService.newRegistrarDatos.CARTILLA = this.datosPersonales[0].CARTILLA;
         this.datosInicialesService.newRegistrarDatos.PAIS_NAC = this.datosPersonales[0].PAIS_NAC;
         this.datosInicialesService.newRegistrarDatos.EDO_NAC = this.datosPersonales[0].EDO_NAC;
         this.datosInicialesService.newRegistrarDatos.MUN_NAC = this.datosPersonales[0].MUN_NAC;
         this.datosInicialesService.newRegistrarDatos.NACIONALIDAD = this.datosPersonales[0].NACIONALIDAD;
         this.datosInicialesService.newRegistrarDatos.CVE_EMPLEADO = this.datosPersonales[0].CVE_EMPLEADO;
         this.datosInicialesService.newRegistrarDatos.TABLAS = this.datosPersonales[0].TABLAS;
         this.datosInicialesService.newRegistrarDatos.FCH_UAC = this.datosPersonales[0].FCH_UAC;
         this.datosInicialesService.newRegistrarDatos.OBSERVACIONES = this.datosPersonales[0].OBSERVACIONES;
         
 
         console.log(this.datosPersonales);
         this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
           resDom=>{
            
             this.datosDomicilio = resDom;
             var datosDomicilioLength = Object.keys(this.datosDomicilio).length;
             if(datosDomicilioLength == 0){
               
 
               console.log('true',datosDomicilioLength);
               this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
                 resCom =>{
                   this.datosComplementarios = resCom;
                   var datosComplemenLength = Object.keys(this.datosComplementarios).length;
                   //console.log(this.datosComplementarios);
 
 
                   if(datosComplemenLength == 0){
                   
 
 
                     this.modal.open(editInfoPersonal,{size:'xl'}); 
                   }else{
                     this.datosInicialesService.newRegistrarDatos.IdComplemen = this.datosComplementarios[0].IdComplemen;
                     this.datosInicialesService.newRegistrarDatos.PERTENECE_ETNIA = this.datosComplementarios[0].PERTENECE_ETNIA;
                     this.datosInicialesService.newRegistrarDatos.NOM_ETNIA = this.datosComplementarios[0].NOM_ETNIA;
                     this.datosInicialesService.newRegistrarDatos.HABLA_LEN_INDIGENA = this.datosComplementarios[0].HABLA_LEN_INDIGENA;
                     this.datosInicialesService.newRegistrarDatos.LENGUA_INDIGENA = this.datosComplementarios[0].LENGUA_INDIGENA;
                     this.datosInicialesService.newRegistrarDatos.ES_PADRE = this.datosComplementarios[0].ES_PADRE;
                     this.datosInicialesService.newRegistrarDatos.TIENE_DISCAPACIDAD = this.datosComplementarios[0].TIENE_DISCAPACIDAD;
                     this.datosInicialesService.newRegistrarDatos.NOM_DISCAPACIDAD = this.datosComplementarios[0].NOM_DISCAPACIDAD;
                     this.datosInicialesService.newRegistrarDatos.ES_AGENTEMP_PERITO = this.datosComplementarios[0].ES_AGENTEMP_PERITO;
                     this.datosInicialesService.newRegistrarDatos.IdEnlace = this.datosComplementarios[0].IdEnlace;
                   
                    this.modal.open(editInfoPersonal,{size:'xl'}); 
 
                   }
                   
                  // this.modal.open(editInfoPersonal,{size:'xl'}); 
                   
                 }
               )
               
 
             }else{
               console.log('FALSE',this.datosDomicilio);
 
               this.datosInicialesService.newRegistrarDatos.IdDomicilio = this.datosDomicilio[0].IdDomicilio;
               this.datosInicialesService.newRegistrarDatos.EMAIL = this.datosDomicilio[0].EMAIL;
               this.datosInicialesService.newRegistrarDatos.TELEFONO = this.datosDomicilio[0].TELEFONO;
               this.datosInicialesService.newRegistrarDatos.CELULAR = this.datosDomicilio[0].CELULAR;
               this.datosInicialesService.newRegistrarDatos.CALLE = this.datosDomicilio[0].CALLE;
               this.datosInicialesService.newRegistrarDatos.ENTRE_CALLE = this.datosDomicilio[0].ENTRE_CALLE;
               this.datosInicialesService.newRegistrarDatos.Y_CALLE = this.datosDomicilio[0].Y_CALLE;
               this.datosInicialesService.newRegistrarDatos.NO_EXTERIOR = this.datosDomicilio[0].NO_EXTERIOR;
               this.datosInicialesService.newRegistrarDatos.NO_INTERIOR = this.datosDomicilio[0].NO_INTERIOR;
               this.datosInicialesService.newRegistrarDatos.COLONIA = this.datosDomicilio[0].COLONIA;
               this.datosInicialesService.newRegistrarDatos.CODIGO_POSTAL = this.datosDomicilio[0].CODIGO_POSTAL;
               this.datosInicialesService.newRegistrarDatos.ENTIDAD = this.datosDomicilio[0].ENTIDAD;
               this.datosInicialesService.newRegistrarDatos.MUNICIPIO = this.datosDomicilio[0].MUNICIPIO;
               this.datosInicialesService.newRegistrarDatos.CIUDAD = this.datosDomicilio[0].CIUDAD;
   
               this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
                 resCom =>{
                   console.log('resss', resCom);
                   this.datosComplementarios = resCom;
                   var datosComplemenLength = Object.keys(this.datosComplementarios).length;
                   
 
 
                   if(datosComplemenLength == 0){
                     this.modal.open(editInfoPersonal,{size:'xl'}); 
                   }else{
                     this.datosInicialesService.newRegistrarDatos.IdComplemen = this.datosComplementarios[0].IdComplemen;
                     this.datosInicialesService.newRegistrarDatos.PERTENECE_ETNIA = this.datosComplementarios[0].PERTENECE_ETNIA;
                     this.datosInicialesService.newRegistrarDatos.NOM_ETNIA = this.datosComplementarios[0].NOM_ETNIA;
                     this.datosInicialesService.newRegistrarDatos.HABLA_LEN_INDIGENA = this.datosComplementarios[0].HABLA_LEN_INDIGENA;
                     this.datosInicialesService.newRegistrarDatos.LENGUA_INDIGENA = this.datosComplementarios[0].LENGUA_INDIGENA;
                     this.datosInicialesService.newRegistrarDatos.ES_PADRE = this.datosComplementarios[0].ES_PADRE;
                     this.datosInicialesService.newRegistrarDatos.TIENE_DISCAPACIDAD = this.datosComplementarios[0].TIENE_DISCAPACIDAD;
                     this.datosInicialesService.newRegistrarDatos.NOM_DISCAPACIDAD = this.datosComplementarios[0].NOM_DISCAPACIDAD;
                     this.datosInicialesService.newRegistrarDatos.ES_AGENTEMP_PERITO = this.datosComplementarios[0].ES_AGENTEMP_PERITO;
                     this.datosInicialesService.newRegistrarDatos.IdEnlace = this.datosPersonales[0].Id;
                   
                     this.modal.open(editInfoPersonal,{size:'xl'}); 
 
                   }
                 }
               )
             }
           }
         )
         //this.modal.open(editInfoPersonal,{size:'xl'});    
       },
       err=>{
         console.log(err);
         
       }
     )
   
     
   }
 
   async abrirModalEditInfoEscolar(editInfoEscolar: any, CVE_EMPLEADO: any, NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any){
     this.newRegistrarDatosEscolares.CVE_EMPLEADO = CVE_EMPLEADO;
     this.newRegistrarDatosEscolares.NOMBRE = NOMBRE;
     this.newRegistrarDatosEscolares.APE_PATERNO = APE_PATERNO;
     this.newRegistrarDatosEscolares.APE_MATERNO = APE_MATERNO;
     this.getListaEscolaridades(CVE_EMPLEADO);
     console.log('hdjgjd',this.newRegistrarDatosEscolares);
     
     
     this.modal.open(editInfoEscolar,{size:'xl'});
   }
 
   async abrirModalEditInfoIdiomas(editInfoIdiomas: any, CVE_EMPLEADO: any, NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any){
     this.newRegistrarIdiomas.CVE_EMPLEADO = CVE_EMPLEADO;
     this.newRegistrarIdiomas.NOMBRE = NOMBRE;
     this.newRegistrarIdiomas.APE_PATERNO = APE_PATERNO;
     this.newRegistrarIdiomas.APE_MATERNO = APE_MATERNO;
     this.getListaIdiomas(CVE_EMPLEADO);
 
     this.modal.open(editInfoIdiomas,{size:'xl'});
   }
 
   abrilModalEditSubirDocumentos(editSubirDocumentos: any, CVE_EMPLEADO: any, NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any){
    
     this.newRegisDocumentos.CVE_EMPLEADO = CVE_EMPLEADO;
     this.newRegisDocumentos.NOMBRE = NOMBRE;
     this.newRegisDocumentos.APE_PATERNO = APE_PATERNO;
     this.newRegisDocumentos.APE_MATERNO = APE_MATERNO;
     this.getListaDocumentosCve(CVE_EMPLEADO);
 
     this.modal.open(editSubirDocumentos,{size:'xl'});
   }
 
 
   //--------------------------------------------------------
 
 
   abrirModal2EditInfoEscolar(btnEditarInfoEscolar: any, escuela:any){
     this.newRegistrarDatosEscolares.CEDULA = escuela.CEDULA;
     this.newRegistrarDatosEscolares.CVE_EMPLEADO = escuela.CVE_EMPLEADO;
     this.newRegistrarDatosEscolares.ESCOLARIDAD = escuela.ESCOLARIDAD;
     this.newRegistrarDatosEscolares.ESCUELA = escuela.ESCUELA;
     this.newRegistrarDatosEscolares.ESPECIALIDAD = escuela.ESPECIALIDAD;
     this.newRegistrarDatosEscolares.FCH_INICIO = escuela.FCH_INICIO;
     this.newRegistrarDatosEscolares.FCH_TERMINO = escuela.FCH_TERMINO;
     this.newRegistrarDatosEscolares.IdEstudios = escuela.IdEstudios;
     this.newRegistrarDatosEscolares.TRATAMIENTO = escuela.TRATAMIENTO;
 
     this.modal.open(btnEditarInfoEscolar,{size:'xl'})
 
   }
   abrirModal2EditInfoIdiomas(btnEditarInfoIdiomas: any, idioma: any){
     this.newRegistrarIdiomas.CONSECUTIVO  = idioma.CONSECUTIVO;
     this.newRegistrarIdiomas.CONVERSACION = idioma.CONVERSACION;
     this.newRegistrarIdiomas.CVE_EMPLEADO = idioma.CVE_EMPLEADO;
     this.newRegistrarIdiomas.ESCRITURA = idioma.ESCRITURA;
     this.newRegistrarIdiomas.IdEnlace = idioma.IdEnlace;
     this.newRegistrarIdiomas.IdIdiomas =idioma.IdIdiomas;
     this.newRegistrarIdiomas.LECTURA = idioma.LECTURA;
     this.newRegistrarIdiomas.IDIOMA = idioma.IDIOMA;
     this.modal.open(btnEditarInfoIdiomas,{size:'xl'})
 
   }
 
   async abrirModalEditDocs(btnEditarDocs: any, documento: any){
    // this.previzualizacionDoc ='';
    // this.newRegisDocumentos.DOCUMENTO='';
    // this.newRegisDocumentos.TIPO = 0;
    this.newRegisDocumentos.CONSECUTIVO = documento.CONSECUTIVO;
    this.newRegisDocumentos.TIPO = documento.TIPO;
    this.newRegisDocumentos.DOCUMENTO = documento.DOCUMENTO;
    this.newRegisDocumentos.FCH_REGISTRO = this.date;
    this.newRegisDocumentos.IdEnlace = documento.IdEnlace;
    this.newRegisDocumentos.IdDocumentos = documento.IdDocumentos;
    this.newRegisDocumentos.CONSECUTIVO = documento.CONSECUTIVO;
    this.tipoDoc = '';
 
    //this.newRe gisDocumentos = documento;
   //el documento.DOCUMENTO pasarlo a base 64 para qe se pueda vizualizar
     console.log(this.newRegisDocumentos);
     if(documento.TIPO_INSERCION === null){
       console.log('soy null', documento.TIPO_INSERCION);
       this.tipoDoc = documento.TIPO_INSERCION;
       this.previzualizacionDoc =  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + documento.DOCUMENTO);
       //this.bufferToBase64ImageSourceRegisAnteriores(documento.DOCUMENTO.data);
       
       
 
     }else{
       console.log('no soy null', documento.TIPO_INSERCION);
       this.tipoDoc = documento.TIPO_INSERCION;
       this.previzualizacionDoc = 'data:application/pdf;base64, ' + documento.DOCUMENTO;
      // this.bufferToBase64ImageSourceNewRegis(documento.DOCUMENTO.data);
       
 
     }
     
   
     this.modal.open(btnEditarDocs,{size:'xl'})
 
   }
 
   buscarData(){
     console.log(this.valoresInputBusqueda);
 
     
     if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == '' ){
       console.log('TODOS VACIOS');
       Swal.fire(
         '',
         'Aún no ha ingresado datos para buscar',
         'info'
       );
       this.listaPersonas = [];
       //alert('No hay datos para buscar');
     }else{
       if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
         console.log('cveEmpleado with valor');
         this.getListaByCve(); 
 
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
         console.log('nombre with valor');
         this.getListaByNombre();
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO == ''){
         console.log('nombre y AP with valor');
         this.getListaByNomAP();
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO != ''){
         console.log('nombre, AP Y AM  with valor');
         this.getListaByNomCompleto();
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && (this.valoresInputBusqueda.NOMBRE != '' || this.valoresInputBusqueda.APE_PATERNO != '' || this.valoresInputBusqueda.APE_MATERNO != '')){
         Swal.fire({
           title:'INFORMACIÓN NO VÁLIDA',
           html:'La consultas que puede realizar son las siguientes:<br><br>'+
                 '<ol align="left"><li> Por <b>Número de empleado</b></li>'+
                 '<li>Por <b>Nombre</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b> + <b>Apellido Materno</b></li></ol><br>',
                 
           icon:'info'
         });
         this.listaPersonas = [];
        // alert('busqueda incorrecta');
       }
 
       if((this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' ) && (this.valoresInputBusqueda.APE_PATERNO != '' || this.valoresInputBusqueda.APE_MATERNO != '')){
         //alert('2da busqueda incorrecta');
         Swal.fire({
           title:'INFORMACIÓN NO VÁLIDA',
           html:'La consultas que puede realizar son las siguientes:<br>'+
                 '<ol align="left"><li> Por <b>número de empleado</b></li>'+
                 '<li>Por <b>Nombre</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b> + <b>Apellido Materno</b></li></ol><br>',
                 
           icon:'info'
         });
         this.listaPersonas = [];
       }
     }
   }
 
 
   async getListaByCve(){
     await this.datosInicialesService.getListaNomSearchByCve(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
 
   async getListaByNombre(){
     await this.datosInicialesService.getListaNomSearchByNom(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
   async getListaByNomAP(){
     await this.datosInicialesService.getListaNomSearchByNomAP(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
   async getListaByNomCompleto(){
     await this.datosInicialesService.getListaNomSearchByNomComplet(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
 
   async GetValuesListaEscolaridad(){
     await this.datosInicialesService.getListEscolaridadVal().subscribe(
       res=>{
         this.listaValoresEscolaridad = res;
         this.datosInicialesService.listaValoresEscolaridad = this.listaValoresEscolaridad;
         console.log(this.listaValoresEscolaridad);
         
 
       },
       err =>{
         console.log(err);
         
       }
     )
   }
 
 
   async putInfoEscolar(){
     
     await this.datosEscolaresService.editarDatosEscolares(this.newRegistrarDatosEscolares).subscribe(
        res=>{
         Swal.fire(
           'EL REGISTRO FUE EXITOSO!',
           'Se han guardado los cambios',
           'success'
         )
          //alert("Se han guardado los cambios");
          this.limpiarInputsRegisInfoEsc();
         // this.modal.dismissAll();
          this.getListaEscolaridades(this.newRegistrarDatosEscolares.CVE_EMPLEADO);
          //this.modal.close(result: any,);
         // this.getInfoEscolar();
        },
        err => console.log(err)
        
      );
   }
 
    async validacionInfoEscolar(){
     var DE = this.newRegistrarDatosEscolares;
     console.log('ESCO',DE.ESCOLARIDAD);
 
     if(DE.ESCOLARIDAD != '' && DE.ESCUELA != '' && DE.ESPECIALIDAD != '' && DE.CEDULA != '' && DE.TRATAMIENTO != '' && DE.FCH_INICIO != '' && DE.FCH_TERMINO != ''){
       //TODOS LLENOS
       console.log('todos con datos post');
       this.putInfoEscolar();
 
     }else{
       if(DE.ESCOLARIDAD != '' && DE.ESCUELA != '' && DE.ESPECIALIDAD != ''  && DE.TRATAMIENTO != '' && DE.FCH_INICIO != '' && DE.FCH_TERMINO != '' && DE.CEDULA == ''){
         //cedula vacio
         console.log('post con cedula vaciod post vacio');
         this.putInfoEscolar();
         
         
       }else{
         if(DE.ESCOLARIDAD == '' || DE.ESCUELA == '' || DE.ESPECIALIDAD == '' || DE.TRATAMIENTO == '' || DE.FCH_INICIO == '' || DE.FCH_TERMINO == ''){
           //cualqiera vacio
           console.log('alguno vacio');
           Swal.fire(
             '',
             'Favor de llenar todos los campos requeridos',
             'info'
           )
           //alert('Favor de llenar todos los campos requeridos');
         }
       }
 
     }
     
 
     
 
 
 
   }
 
 
 
   //--------------------------------
   async getDatospersonalesEditar(CVE_EMPLEADO: any){
     await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
       res=>{
        
         this.datosPersonales = res;
         this.datosInicialesService.newRegistrarDatos.NOMBRE = this.datosPersonales.NOMBRE;
         console.log('DATOSPERSO',this.datosPersonales);
         
       },
       err=>{
         console.log(err);
         
       }
     )
   }
  
 
   async getListaEscolaridades(CVE_EMPLEADO: any){
     console.log('cve',this.newRegistrarDatosEscolares.CVE_EMPLEADO );
     
     await this.datosEscolaresService.GetDatosEscolaresByCveEm(CVE_EMPLEADO).subscribe(
       res=>{
        
         this.listaEscolaridad = res;
         //this.listaEscolaridad[0].FCH_INICIO = this.listaEscolaridad[0].FCH_INICIO.slice(0,10);
         
         console.log(this.listaEscolaridad);
         
       },
       err=>{
         console.log(err);
         
       }
     )
 
   }
 
   async getListaIdiomas(CVE_EMPLEADO: any){
     //console.log('cve',this.newRegistrarDatosEscolares.CVE_EMPLEADO );
     
     await this.datosIdiomasService.getIdiomasByCveEmp(CVE_EMPLEADO).subscribe(
       res=>{
        
         this.listaIdiomas = res;
         
         console.log(this.listaIdiomas);
         
       },
       err=>{
         console.log(err);
         
       }
     )
 
 
 
   }
 
   async getListaDocumentosCve(CVE_EMPLEADO: any){
     await this.datosDocumentosService.getListaDocsByCveEmp(CVE_EMPLEADO).subscribe(
       res=>{
         this.listaDocsByCveEmp = res;
         
         console.log(this.listaDocsByCveEmp); 
       },
       err=>{
         console.log(err);
         
       }
     )
 
 
 
   }
 
  
   //-------------------------------
  /* async putInfoPersonalDomComData(){
     
     await this.datosInicialesService.updateDatosPDomCom(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
        res=>{
           Swal.fire(
             'El REGISTRO FUE EXITOSO!',
             'Se han guardado los cambios',
             'success'
           )
          //alert("Se han guardado los cambios");
          console.log(this.datosInicialesService.ValoresInputsRegistroDataPD);
          this.modal.dismissAll();         
          //this.getListaIdiomas(this.newRegistrarIdiomas.CVE_EMPLEADO);
         // this.getInfoEscolar();
        },
        err => {
           Swal.fire(
             'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
             'Si persisten los problemas comuníquese con el administrador',
             'error'
           );
         console.log(err)
        } 
        
      );
   }
 
   async validarInputsRegistroDP_DOM_COM(){
     var DI = this.datosInicialesService.ValoresInputsRegistroDataPD;
     console.log('NAMEEEE',DI.NOMBRE);
     console.log('DI', DI);
     
 
     if((DI.NOMBRE != null)
     && (DI.APE_PATERNO != null )
     && (DI.APE_MATERNO != null)
     && (DI.SEXO != null )
     && (DI.FECHA_NAC != null) 
       && (DI.EST_CIVIL != null) 
       && (DI.CVE_RFC != null)
       && (DI.CURP != null)
       && (DI.CVE_ELECTOR != null) 
       && (DI.LICENCIA != null)
       && (DI.PASAPORTE != null) 
       && (DI.CARTILLA != null )
       && (DI.PAIS_NAC != null) 
       && (DI.EDO_NAC != null)
       && (DI.MUN_NAC != null)
       && (DI.NACIONALIDAD != null)
       
       && (DI.EMAIL != null) 
       && (DI.TELEFONO != null) 
       && (DI.CELULAR != null)  
       && (DI.CALLE != null)
       && (DI.ENTRE_CALLE != null)
       && (DI.Y_CALLE != null)
       && (DI.NO_EXTERIOR != null) 
       && (DI.NO_INTERIOR != null)
       && (DI.COLONIA != null)
       && (DI.CODIGO_POSTAL != null) 
       && (DI.ENTIDAD != null) 
       && (DI.MUNICIPIO != null)  
       && (DI.CIUDAD != null)
 
       && (DI.PERTENECE_ETNIA != null)  
       && (DI.NOM_ETNIA != null) 
       && (DI.HABLA_LEN_INDIGENA != null) 
       && (DI.LENGUA_INDIGENA != null) 
       && (DI.ES_PADRE != null)
       && (DI.TIENE_DISCAPACIDAD != null)
       && (DI.NOM_DISCAPACIDAD != null )
       && (DI.ES_AGENTEMP_PERITO != null)
     ){
       //SO QUE 
       console.log('todos los inputs llenos, peticion post');
       await this.putInfoPersonalDomComData();
       
     }else{
 
       if((DI.NOMBRE != null )
       && (DI.APE_PATERNO != null) 
       && (DI.APE_MATERNO != null) 
       && (DI.SEXO != null )
       && (DI.FECHA_NAC != null)
       && (DI.EST_CIVIL != null)
       && (DI.CVE_RFC != null)
       && (DI.CURP != null) 
       && (DI.PAIS_NAC != null )
       && (DI.EDO_NAC != null)  
       && (DI.NACIONALIDAD != null)
       
       && (DI.EMAIL != null)
       && (DI.TELEFONO != null)
       && (DI.CELULAR != null )
       && (DI.CALLE != null)
       && (DI.ENTRE_CALLE != null)
       && (DI.Y_CALLE != null) 
       && (DI.NO_EXTERIOR != null )
       && (DI.NO_INTERIOR != null) 
       && (DI.COLONIA != null )
       && (DI.CODIGO_POSTAL != null) 
       && ( DI.ENTIDAD != null)
       && (DI.MUNICIPIO != null)  
       && (DI.CIUDAD != null)
 
       && (DI.PERTENECE_ETNIA != null)    
       && (DI.HABLA_LEN_INDIGENA != null)  
       && (DI.ES_PADRE != null)
       && (DI.TIENE_DISCAPACIDAD != null)  
       && (DI.ES_AGENTEMP_PERITO != null) 
       
       && 
       ((DI.CVE_ELECTOR == null)
       || (DI.LICENCIA == null) 
       || (DI.PASAPORTE == null) 
       || (DI.CARTILLA == null)
       || (DI.MUN_NAC == null)
       || (DI.NOM_ETNIA == null) 
       || (DI.LENGUA_INDIGENA == null)
       || (DI.NOM_DISCAPACIDAD == null))
       
       ){
 
         //here
         console.log('make post with los nulos');
        await this.putInfoPersonalDomComData();
       
         
 
       }else{
         console.log('entre al elseeeeee');
         
         //si cualquiera esta vacio
         //UNICOS CAMPOS QUE SE PUEDEN GUARDAR NULL SON
         //CVE_ELECTOR, LICENCIA,PASAPORTE,CARTILLA,MUN_NAC, NOMBRE_ETNIA, NOMBRE_LENGUA_INDIGENA, NOM_DISCAPACIDAD
         if(DI.NOMBRE == null 
         || DI.APE_PATERNO == null 
         || DI.APE_MATERNO == null 
         || DI.SEXO == null  
         || DI.FECHA_NAC == null 
         || DI.EST_CIVIL == null 
         || DI.CVE_RFC == null 
         || DI.CURP == null 
         || DI.PAIS_NAC == null 
         || DI.EDO_NAC == null  
         || DI.NACIONALIDAD == null
         
         || DI.EMAIL == null 
         || DI.TELEFONO == null 
         || DI.CELULAR == null  
         || DI.CALLE == null 
         || DI.ENTRE_CALLE == null 
         || DI.Y_CALLE == null 
         || DI.NO_EXTERIOR == null 
         || DI.NO_INTERIOR == null 
         || DI.COLONIA == null 
         || DI.CODIGO_POSTAL == null
         || DI.ENTIDAD == null 
         || DI.MUNICIPIO == null  
         || DI.CIUDAD == null
 
         || DI.PERTENECE_ETNIA == null    
         || DI.HABLA_LEN_INDIGENA == null  
         || DI.ES_PADRE == null
         || DI.TIENE_DISCAPACIDAD == null  
         || DI.ES_AGENTEMP_PERITO == null ){
 
           //cualquiera vacio
         console.log('alguno vacio');
         console.log(DI);
           Swal.fire(
             '',
             'Favor de llenar todos los campos requeridos',
             'info'
           )
         //alert('Favor de llenar todos los campos requeridos');
 
 
         }
 
       }
       
       
       
       
 
     }
     
   }*/
 
 
   //------------------------------
 
 
   async putInfoIdiomas(){
     
     await this.datosIdiomasService.updateIdiomas(this.newRegistrarIdiomas).subscribe(
        res=>{
           Swal.fire(
             'El REGISTRO FUE EXITOSO!',
             'Se han guardado los cambios',
             'success'
           )
          //alert("Se han guardado los cambios");
         // this.modal.dismissAll();
          this.limpiarInputsIdiomas();
          this.getListaIdiomas(this.newRegistrarIdiomas.CVE_EMPLEADO);
         
         // this.getInfoEscolar();
        },
        err => {
           Swal.fire(
             'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
             'Si persisten los problemas comuníquese con el administrador',
             'error'
           );
           console.log(err)
        }
        
      );
   }
 
 
   async validacionInfoIdiomas(){
     var DI = this.newRegistrarIdiomas;
     
     if(DI.IDIOMA != '' && DI.LECTURA != '' && DI.ESCRITURA != '' && DI.CONVERSACION != ''){
       console.log('todos los inputs llenos');
 
       if((DI.LECTURA >= 1 && DI.LECTURA <= 100)&&(DI.ESCRITURA >= 1 && DI.ESCRITURA <= 100)&&(DI.CONVERSACION >= 1 && DI.CONVERSACION <= 100)){
         this.putInfoIdiomas();
       }else{
         if(DI.LECTURA < 1 || DI.LECTURA > 100){
           Swal.fire(
             '',
             'El valor "LECTURA" es inválido',
             'info'
           )
   
         }
 
         if(DI.ESCRITURA < 1 || DI.ESCRITURA > 100){
           Swal.fire(
             '',
             'El valor "ESCRITURA" es inválido',
             'info'
           )
   
         }
 
         if(DI.CONVERSACION < 1 || DI.CONVERSACION > 100){
           Swal.fire(
             '',
             'El valor "CONVERSACION" es inválido',
             'info'
           )
   
         }
 
       }
       
     }else{
       console.log('alguno vacio');
       Swal.fire(
         '',
         'Favor de llenar todos los campos requeridos',
         'info'
       )
       //alert('Favor de llenar todos los campos requeridos');
     }
 
   }
 
 
   async GetListDocsIniciales(){
     await this.datosDocumentosService.getListaDocsIniciales().subscribe(
       res=>{
         this.listaDocumentosIni = res;
         
         console.log(this.listaDocumentosIni);
         
 
       },
       err =>{
         console.log(err);
         
       }
     )
   }
 
 
   async putDocumentos(){
     
     await this.datosDocumentosService.editarDocumentos(this.newRegisDocumentos).subscribe(
        res=>{
           Swal.fire(
             'EL REGISTRO FUE EXITOSO!',
             'Los documentos fueron actualizados',
             'success'
           )
          //alert("Se han guardado los cambios");
         // this.modal.dismissAll();
          this.limpiarInputsDocs();
          this.DocSeleccionado = '';
          console.log(this.newRegisDocumentos);
          
          //this.get(this.newRegistrarDatosEscolares.CVE_EMPLEADO);
         // this.getInfoEscolar();
        },
        err => {
          console.log(err);
           Swal.fire(
               'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
               'Si persisten los problemas comuníquese con el administrador',
               'error'
             )
          //alert("Ha ocurrido un error, intente nuevamente");
        }
        
      );
   }
 
    validacionInsertarDocumentos(){
     if(this.newRegisDocumentos.TIPO != 0 &&  this.DocSeleccionado != ''){
       console.log('con valores');
       this.putDocumentos();
       
 
     }else{
       if(this.newRegisDocumentos.TIPO == 0 &&  this.DocSeleccionado != ''){
         Swal.fire(
           '',
           'Favor de especificar el tipo de documento',
           'info'
         )
         //alert('Favor de especificar el tipo de documento');
 
       }
 
       if(this.newRegisDocumentos.TIPO != 0 && this.DocSeleccionado == ''){
         Swal.fire(
           '',
           'Aún no ha seleccionado un archivo',
           'info'
         )
        //alert('Aún no ha seleccionado un archivo');
 
       }
 
       if(this.newRegisDocumentos.TIPO == 0 && this.DocSeleccionado == ''){
         Swal.fire(
           '',
           'Favor de llenar todos los datos requiridos',
           'info'
         )
         //alert('Favor de llenar todos los datos requiridos');
       }
 
     }
   }
 
 
   capturarArchivo(event: any ){
 
     const archivo = event.target.files[0];
 
   
    
     this.extraerBase64(archivo).then((img: any) =>{
     this.previzualizacionDoc = img.base;
     this.DocSeleccionado = img.base;
       
       console.log('previzuliazacion');
       this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:application/pdf;base64,","");
       //this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/jpeg;base64,","");
       console.log(this.previzualizacionDoc);
     
     });
   }
 
 
   //DE UNA IMAGEN LE SACA EL BASE64 PARA AGG A LA BD
   extraerBase64 = async($event: any) => new Promise((resolve, reject)=>{
     try{
       const unsafeImg = window.URL.createObjectURL($event);
       const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
       const reader = new FileReader();
   
 
       reader.readAsDataURL($event);
       reader.onload = () =>{
         
         resolve({
           
           base:reader.result
         });
         
       
       };
       
       reader.onerror = error =>{
         resolve({
          base: null
         });
       }
 
       return $event;
       
 
     }catch (e){
       return null;
     }
   })
 
 
 
 
   //CONVERTIR A BASE 64 LOS ARRAY TRAIDOS DE LA BD
 //LA VAR DATOS ES PARA LAS IMAGENES QE YO INSERTÉ EN BASE64 LA VAR QUITA1ER
 //LE QUITA A DATOS EL 1ER ELEMENTO "  Y YA QEDA LA BASE 64 LISTA
 //A LAS IMAGENES QE YO NO INSERTÉ SE LE PASA LA VARIABLE BASE64STRING
 bufferToBase64ImageSourceRegisAnteriores(buffer: any) {
 
   const base64String = btoa(new Uint8Array(buffer).reduce((data, byte)=> {
     return data + String.fromCharCode(byte);
   }, ''));
 
 
 
   console.log('data:image/jpg;base64, ')
   
   //AQUI SE LE PASA BASE64STRING EN VEZ DE QUITA1ER SE PUEDE PONER UN IF 
   this.previzualizacionDoc = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
   console.log('buffertobase');
   
   console.log(this.previzualizacionDoc);
   return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
 
 }
 
 //CONVERTIR A BASE 64 LOS ARRAY TRAIDOS DE LA BD
 //LA VAR DATOS ES PARA LAS IMAGENES QE YO INSERTÉ EN BASE64 LA VAR QUITA1ER
 //LE QUITA A DATOS EL 1ER ELEMENTO "  Y YA QEDA LA BASE 64 LISTA
 //A LAS IMAGENES QE YO NO INSERTÉ SE LE PASA LA VARIABLE BASE64STRING
 bufferToBase64ImageSourceNewRegis(buffer: any) {
   var Datos ='';
   var Bytes = 0;
   const base64String = btoa(new Uint8Array(buffer).reduce((data, byte)=> {
    Datos = data;
    Bytes = byte;
    
     
     return data + String.fromCharCode(byte);
   }, ''));
   
   console.log('data:application/pdf;base64, ');
   console.log(Datos);
   var quita1er = Datos.slice(1);
   console.log('bytes', Bytes);
   
 
   console.log('quitar', quita1er);
   
   //AQUI SE LE PASA BASE64STRING EN VEZ DE QUITA1ER SE PUEDE PONER UN IF 
   this.previzualizacionDoc = 'data:application/pdf;base64, ' + quita1er; //this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + quita1er);
   console.log('buffertobase');
   
   console.log(this.previzualizacionDoc);
   return this.sanitizer.bypassSecurityTrustUrl('data:application/pdf;base64, ' + quita1er);
 }

}
