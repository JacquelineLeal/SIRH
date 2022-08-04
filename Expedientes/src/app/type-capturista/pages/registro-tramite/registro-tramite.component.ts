import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

 
import {DatosEscolares, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import {Datos, DatosInicialesExpedientesService} from '../../../services/datos-iniciales-expedientes.service';
import {DatosPersonalesTable ,DatosPDomComService } from '../../../services/datos-p-dom-com.service';
import{DatosIdiomas ,IdiomasService} from '../../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';

import { DomSanitizer } from '@angular/platform-browser';
import { LoginComponent } from 'src/app/pages/login/login.component';


@Component({
  selector: 'app-registro-tramite',
  templateUrl: './registro-tramite.component.html',
  styleUrls: ['./registro-tramite.component.scss']
})
export class RegistroTramiteComponent implements OnInit {

  claseListaDocumentos:any = 'bg-success';

  array:any ={
    
  }

  //PARA MODAL ¿SE CAPTURO TODA LA INFO?
  IdInfoCompleta: any = {
    Id: String
  };

  //PARA MODAL ¿SE CAPTURO TODA LA INFO? 
  NombreCompleto = '';

  cortarStringBase64: String = "";

  archivoCapturado: any= [];
  pdfSrc: any ="";
  previzualizacionDoc: any = [];
  xd: any =[];
  tipo ='';
  fileUrl: any;
  salida: any =[];

  ListaDatosPersonales: any =[];
  listaMediaFil: any =[];
  lengthCriteriosExpediente: Number;

  datosDomicilio: any = [];
  datosComplementarios: any = [];
  listaMediaFilLength: number;
  datosDomicilioLength: number;
  datosComplemenLength: number;

  
  listaEstadoCivil: any = [];
  listaPaisNac: any = [];
  listaEstados: any = []; 
  listaMunicipios: any = [];
  listaCiudades: any = [];
  listaValoresEscolaridad: any = [];
  listaDocumentosIni: any =[];
  listaDocsInsertadosByIdEnlace: any = [];
  IdExpediente: Number;

  listaDatosEscolares:any =[];
  listaDatosIdiomas: any = [];
 
  listaNombresRegis: any = [];
  today : Date = new Date();
  date : any = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' +  this.today.getDate();
  //date: Date = new Date();

  arrayForInsertDatosPer: DatosPersonalesTable ={
    
  
    INFO_COMPLETA:'NO',
    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    //Id: 0,
    ESTATUS : 'P',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
    
        
    SEXO:null,
    FECHA_NAC: this.date,
    EST_CIVIL:null,
    
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

    OBSERVACIONES:''
  }

  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
    IdEnlace: '',
    CONSECUTIVO: 0,
   // NOMBRE: this.cookieService.get('Nombrethis'),
    NOMBRE: '',
    APE_PATERNO:'',
    APE_MATERNO:'',
    CVE_EMPLEADO: '00000',
    ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''        

      
  }

  newRegistrarIdiomas: DatosIdiomas = {
    CVE_EMPLEADO: '00000',
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
 
  newRegisDocumentos: DatosDocumentos={
    CVE_EMPLEADO: '00000',
    CONSECUTIVO: 0,
    TIPO: 0,
    DOCUMENTO: [],
    FCH_REGISTRO: this.date,
  
    IdEnlace: 0,
    IdDocumentos: 0,
    TIPO_INSERCION: 'NEW2022',

    USUARIO: this.cookieService.get('user'),
    IdExpediente: 0,
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: '',
    STATUS_EXPEDIENTE:'',
    LUGAR_EXPEDIENTE:''
  }


  limpiarInputsRegistro:Datos={
    
    Id: '',
    INFO_COMPLETA:'',
    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    ESTATUS : 'P',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
    CONSECUTIVO: 1,
        
    SEXO:null,
    FECHA_NAC: this.date,
    EST_CIVIL:null,
    SANGRE:'',
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
    IdEnlace: '',
    IdDomicilio: '',
    IdComplemen: '',
    IdMediaFiliacion:'',
    IdExpediente:0,
    STATUS_EXPEDIENTE: '',
    LUGAR_EXPEDIENTE: ''


  }


  constructor(
    public router:Router,
    public modal:NgbModal,
    public datosPDC: DatosPDomComService,
    private datosEscolaresService: DatosEscolaresServiService,
    private datosInicialesService: DatosInicialesExpedientesService,
    private datosIdiomasService : IdiomasService,
    private datosDocumentosService : DocumentosService,
    private sanitizer : DomSanitizer,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.GetNombresRegistro();
    console.log(this.arrayForInsertDatosPer);
    
    console.log(this.newRegistrarDatosEscolares);
    
    console.log(this.newRegisDocumentos);
    
    
    this.GetDataestadoCivil();
    this.GetDatapaisNac();
    this.GetDataEstados();
    this.GetDataMunicipios();
    this.GetDataCiudades();
    this.GetValuesListaEscolaridad();
    this.GetListDocsIniciales();

  }

  abrirModalInfoEscolar(regisInfoEscolar: any, Id: any, NOMBRE: any, APE_PATERNO:any, APE_MATERNO:any){
    this.newRegistrarDatosEscolares.ESCOLARIDAD = '';
    this.newRegistrarDatosEscolares.ESCUELA = '';
    this.newRegistrarDatosEscolares.ESPECIALIDAD= '';
    this.newRegistrarDatosEscolares.CEDULA = '';
    this.newRegistrarDatosEscolares.TRATAMIENTO = '';
    this.newRegistrarDatosEscolares.FCH_TERMINO = '';
    this.newRegistrarDatosEscolares.FCH_TERMINO = ''; 


    this.newRegistrarDatosEscolares.IdEnlace = Id;
    this.newRegistrarDatosEscolares.NOMBRE = NOMBRE;
    this.newRegistrarDatosEscolares.APE_PATERNO = APE_PATERNO;
    this.newRegistrarDatosEscolares.APE_MATERNO = APE_MATERNO;
    this.getDatosEscolares(Id);
    this.modal.open(regisInfoEscolar,{size:'xl'});
   
  }

  abrirModalInfoIdiomas(regisInfoIdiomas: any,  Id: any, NOMBRE:any, APE_PATERNO:any,APE_MATERNO:any){
    this.newRegistrarIdiomas.IDIOMA = '';
    this.newRegistrarIdiomas.LECTURA = '';
    this.newRegistrarIdiomas.ESCRITURA = '';
    this.newRegistrarIdiomas.CONVERSACION = '';
    this.newRegistrarIdiomas.IdEnlace = Id;

    this.newRegistrarIdiomas.NOMBRE = NOMBRE;
    this.newRegistrarIdiomas.APE_PATERNO = APE_PATERNO;
    this.newRegistrarIdiomas.APE_MATERNO = APE_MATERNO;

    this.getDatosIdiomas(Id);
    this.modal.open(regisInfoIdiomas,{size:'xl'});
  }

  abrirModalSubirDocumentos(subirDocumentos: any,  Id: any, NOMBRE:any, APE_PATERNO:any,APE_MATERNO:any){
    this.previzualizacionDoc = '';
    this.newRegisDocumentos.DOCUMENTO = '';
    this.newRegisDocumentos.TIPO = 0;
    this.newRegisDocumentos.IdEnlace = Id;
    this.newRegisDocumentos.NOMBRE = NOMBRE;
    this.newRegisDocumentos.APE_PATERNO = APE_PATERNO;
    this.newRegisDocumentos.APE_MATERNO = APE_MATERNO;

    for(var i=0; i< Object.keys(this.listaDocumentosIni).length; i++){
      this.listaDocumentosIni[i].estilo = '';
    }

    this.traerIdExpedienteByIdEnlace(this.newRegisDocumentos.IdEnlace);
    this.getDocumentosByIdEnlace(this.newRegisDocumentos.IdEnlace);
    console.log(Id);
    
    


        
   // this.getImagen();
    this.modal.open(subirDocumentos,{size: 'xl'});

  }

  abrirModalConfirmacionCapData(confirmacionRegistros: any, Id: any, NOMBRE:any, APE_PATERNO:any,APE_MATERNO:any){
    this.IdInfoCompleta.Id = Id;
    this.NombreCompleto = NOMBRE + ' ' + APE_PATERNO + ' ' + APE_MATERNO;
    
    this.modal.open(confirmacionRegistros,{size:'md'});

  }
  


  async GetNombresRegistro(){
    await this.datosPDC.getListaNombresRegistrar().subscribe(
      res=>{
        this.listaNombresRegis = res;
        
        console.log(this.listaNombresRegis);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }  

 limpiarInputsRegistroIPDC(){
    console.log('limpiar');
    console.log(this.datosInicialesService.newRegistrarDatos);
    this.datosInicialesService.newRegistrarDatos = this.limpiarInputsRegistro;
    console.log('ya limpios');
    console.log(this.datosInicialesService.newRegistrarDatos);
    
    
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
 
 async validacionInputsNombres(){
   if(this.arrayForInsertDatosPer.NOMBRE =='' || this.arrayForInsertDatosPer.APE_PATERNO == '' || this.arrayForInsertDatosPer.APE_MATERNO == '' ){
     console.log('alguno vacio');
     Swal.fire(
      '',
      'Favor de llenar todos los valores',
      'info'
     )

     //alert("Favor de llenar todos los valores");
     
   }else{
     console.log('todo okay');
     await this.PostNombresDatosPer();
     
   }
 }

  async PostNombresDatosPer(){
    await this.datosPDC.agregarNombreDP(this.arrayForInsertDatosPer).subscribe(
      res=>{

        console.log(res);
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Continué capturando información eligiendo las opciones presentadas',
          'success'
        )


       // alert("El registro fue exitoso, continué capturando información eligiendo las opciones presentadas.");
        this.GetNombresRegistro();
        this.arrayForInsertDatosPer.NOMBRE = '';
        this.arrayForInsertDatosPer.APE_PATERNO= '';
        this.arrayForInsertDatosPer.APE_MATERNO = '';
        
        
      },
      err =>{ 
        console.log(err);
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )

        //alert("Se ha generado un error, favor de intentarlo de nuevo");
        
      }
      
    )
  }

  async clickBtnRegistroInfoP(regisInfoPersonal: any, Id:any, NOMBRE:any, APE_PATERNO:any,APE_MATERNO:any, FECHA_REGISTRO_DATA_PERSONAL:any, INFO_COMPLETA:any, FCH_UAC:any){

    //--------------------------------------------------------------------------------------------------------------------------------------
        this.lengthCriteriosExpediente = 0;
        this.IdExpediente = 0;
        await this.getExpedienteCriteriosId(Id);
  
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
        this.datosInicialesService.newRegistrarDatos.ENTRE_CALLE = '';
        this.datosInicialesService.newRegistrarDatos.Y_CALLE = '';
        this.datosInicialesService.newRegistrarDatos.NO_EXTERIOR = '';
        this.datosInicialesService.newRegistrarDatos.NO_INTERIOR = '';
        this.datosInicialesService.newRegistrarDatos.COLONIA = '';
        this.datosInicialesService.newRegistrarDatos.CODIGO_POSTAL = '';
        this.datosInicialesService.newRegistrarDatos.ENTIDAD ='' ;
        this.datosInicialesService.newRegistrarDatos.MUNICIPIO = '';
        this.datosInicialesService.newRegistrarDatos.CIUDAD = '';

        this.datosInicialesService.newRegistrarDatos.PERTENECE_ETNIA = '';
        this.datosInicialesService.newRegistrarDatos.NOM_ETNIA = '';
        this.datosInicialesService.newRegistrarDatos.HABLA_LEN_INDIGENA = '';
        this.datosInicialesService.newRegistrarDatos.LENGUA_INDIGENA = '';
        this.datosInicialesService.newRegistrarDatos.ES_PADRE = '';
        this.datosInicialesService.newRegistrarDatos.NOM_DISCAPACIDAD = '';
        this.datosInicialesService.newRegistrarDatos.ES_AGENTEMP_PERITO = '';



      await this.datosPDC.getDatosPersonalesTramiteById(Id).subscribe(
        res=>{
          this.ListaDatosPersonales = res;
          this.datosInicialesService.newRegistrarDatos.Id = this.ListaDatosPersonales[0].Id;
          this.datosInicialesService.newRegistrarDatos.FECHA_REGISTRO_DATA_PERSONAL= this.ListaDatosPersonales[0].FECHA_REGISTRO_DATA_PERSONAL;

          this.datosInicialesService.newRegistrarDatos.ESTATUS= this.ListaDatosPersonales[0].ESTATUS;
          this.datosInicialesService.newRegistrarDatos.NOMBRE= this.ListaDatosPersonales[0].NOMBRE;
          this.datosInicialesService.newRegistrarDatos.APE_PATERNO= this.ListaDatosPersonales[0].APE_PATERNO;
          this.datosInicialesService.newRegistrarDatos.APE_MATERNO= this.ListaDatosPersonales[0].APE_MATERNO;

          this.datosInicialesService.newRegistrarDatos.SEXO= this.ListaDatosPersonales[0].SEXO;
          this.datosInicialesService.newRegistrarDatos.FECHA_NAC= this.ListaDatosPersonales[0].FECHA_NAC;
          this.datosInicialesService.newRegistrarDatos.EST_CIVIL= this.ListaDatosPersonales[0].EST_CIVIL;

          this.datosInicialesService.newRegistrarDatos.CVE_RFC= this.ListaDatosPersonales[0].CVE_RFC;
          this.datosInicialesService.newRegistrarDatos.CURP= this.ListaDatosPersonales[0].CURP;
          this.datosInicialesService.newRegistrarDatos.CVE_ELECTOR= this.ListaDatosPersonales[0].CVE_ELECTOR;
          this.datosInicialesService.newRegistrarDatos.LICENCIA= this.ListaDatosPersonales[0].LICENCIA;

          this.datosInicialesService.newRegistrarDatos.PASAPORTE= this.ListaDatosPersonales[0].PASAPORTE;
          this.datosInicialesService.newRegistrarDatos.CARTILLA= this.ListaDatosPersonales[0].CARTILLA;

          this.datosInicialesService.newRegistrarDatos.PAIS_NAC= this.ListaDatosPersonales[0].PAIS_NAC;
          this.datosInicialesService.newRegistrarDatos.EDO_NAC= this.ListaDatosPersonales[0].EDO_NAC;
          this.datosInicialesService.newRegistrarDatos.MUN_NAC= this.ListaDatosPersonales[0].MUN_NAC;
          this.datosInicialesService.newRegistrarDatos.NACIONALIDAD= this.ListaDatosPersonales[0].NACIONALIDAD;

          this.datosInicialesService.newRegistrarDatos.CVE_EMPLEADO= this.ListaDatosPersonales[0].CVE_EMPLEADO;
          this.datosInicialesService.newRegistrarDatos.TABLAS= this.ListaDatosPersonales[0].TABLAS;
          this.datosInicialesService.newRegistrarDatos.FCH_UAC= this.ListaDatosPersonales[0].FCH_UAC;

          this.datosInicialesService.newRegistrarDatos.OBSERVACIONES= this.ListaDatosPersonales[0].OBSERVACIONES;
          this.datosInicialesService.newRegistrarDatos.INFO_COMPLETA= this.ListaDatosPersonales[0].INFO_COMPLETA;


          console.log(this.ListaDatosPersonales);

          this.datosPDC.getDomicilioByIdEnlace(Id).subscribe(
            resDom=>{
              this.datosDomicilio = resDom;
              this.datosDomicilioLength = Object.keys(this.datosDomicilio).length;


              if(this.datosDomicilioLength == 0){
                this.datosInicialesService.newRegistrarDatos.CONSECUTIVO = 1;
                console.log('true',this.datosDomicilioLength);
                this.datosPDC.getComplementariaByIdEnlace(Id).subscribe(
                  resCom=>{
                    this.datosComplementarios = resCom;
                    this.datosComplemenLength = Object.keys(this.datosComplementarios).length;

                    if(this.datosComplemenLength == 0){
                      
                      //TRAER EL SANGRE
                      this.datosPDC.getMediaFiliacionByIdEnlace(Id).subscribe(
                        resMediaFil=>{
                          this.listaMediaFil = resMediaFil;
                          console.log('MEDIAFIL',this.listaMediaFil);
                          this.listaMediaFilLength = Object.keys(this.listaMediaFil).length;
                          if(this.listaMediaFilLength == 0){
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }else{
                            this.datosInicialesService.newRegistrarDatos.SANGRE = this.listaMediaFil[0].SANGRE;
                            this.datosInicialesService.newRegistrarDatos.IdMediaFiliacion = this.listaMediaFil[0].IdMediaFiliacion;
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }
                        }
                      )


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
                  

                      //TRAER EL SANGRE
                      this.datosPDC.getMediaFiliacionByIdEnlace(Id).subscribe(
                        resMediaFil=>{
                          this.listaMediaFil = resMediaFil;
                          console.log('MEDIAFIL',this.listaMediaFil);
                          this.listaMediaFilLength = Object.keys(this.listaMediaFil).length;
                          if(this.listaMediaFilLength == 0){
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }else{
                            this.datosInicialesService.newRegistrarDatos.SANGRE = this.listaMediaFil[0].SANGRE;
                            this.datosInicialesService.newRegistrarDatos.IdMediaFiliacion = this.listaMediaFil[0].IdMediaFiliacion;
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }
                        }
                      )
                      //this.modal.open(regisInfoPersonal,{size:'xl'});


                    }

                  }
                )

              }else{
                this.datosInicialesService.newRegistrarDatos.CONSECUTIVO = this.datosDomicilio[0].CONSECUTIVO + 1;
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
    

                this.datosPDC.getComplementariaByIdEnlace(Id).subscribe(
                  resCom=>{ 
                    this.datosComplementarios = resCom;
                    this.datosComplemenLength = Object.keys(this.datosComplementarios).length;

                    if(this.datosComplemenLength == 0){
                     // this.modal.open(regisInfoPersonal,{size:'xl'});
                      //TRAER EL SANGRE
                      this.datosPDC.getMediaFiliacionByIdEnlace(Id).subscribe(
                        resMediaFil=>{
                          this.listaMediaFil = resMediaFil;
                          console.log('MEDIAFIL',this.listaMediaFil);
                          this.listaMediaFilLength = Object.keys(this.listaMediaFil).length;
                          if(this.listaMediaFilLength == 0){
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }else{
                            this.datosInicialesService.newRegistrarDatos.SANGRE = this.listaMediaFil[0].SANGRE;
                            this.datosInicialesService.newRegistrarDatos.IdMediaFiliacion = this.listaMediaFil[0].IdMediaFiliacion;
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }
                        }
                      )

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
                      this.datosInicialesService.newRegistrarDatos.IdEnlace = this.ListaDatosPersonales[0].Id;

                      //TRAER EL SANGRE
                      this.datosPDC.getMediaFiliacionByIdEnlace(Id).subscribe(
                        resMediaFil=>{
                          this.listaMediaFil = resMediaFil;
                          this.listaMediaFilLength = Object.keys(this.listaMediaFil).length;
                          console.log('MEDIAFIL',this.listaMediaFil);
                          
                          if(this.listaMediaFilLength == 0){
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }else{
                            this.datosInicialesService.newRegistrarDatos.SANGRE = this.listaMediaFil[0].SANGRE;
                            this.datosInicialesService.newRegistrarDatos.IdMediaFiliacion = this.listaMediaFil[0].IdMediaFiliacion;
                            this.modal.open(regisInfoPersonal,{size:'xl'});

                          }
                        }
                      )

                      //this.modal.open(regisInfoPersonal,{size:'xl'});
                    }
                  }
                )
              }
            },
            err=>{
              console.log(err);
            }
          )
          //this.modal.open(regisInfoPersonal,{size:'xl
        },
        err=>{
          Swal.fire(
            'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
            'Si persisten los problemas comuníquese con el administrador',
            'error'
          )
          //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
          console.log(err);
          
        }
      )


    

    //this.modal.open(regisInfoPersonal,{size:'xl'});
    //console.log(Id);
    //console.log(NOMBRE);
      
      
    

  }


  async getExpedienteCriteriosId(Id: any){
    
    await this.datosDocumentosService.getExpedienteCriteriosByIdEnlace(Id).subscribe(
      res=>{
        this.lengthCriteriosExpediente = Object.keys(res).length;
        console.log('lenghtttcrite',this.lengthCriteriosExpediente);

        if(this.lengthCriteriosExpediente === 0){

        }else{
          this.IdExpediente = res[0].IdExpediente;
          this.datosInicialesService.newRegistrarDatos.IdExpediente = this.IdExpediente;
        }  
      },
      err=>{
        console.log(err);
      }
    )
  }


  ///clickBtnGuardarInfoModalRegisIP
  async POSTclickBtnGuardarInfoModalRegisIP(){

    if (this.lengthCriteriosExpediente == 0) {
      console.log('TRUE DEL CRITERIO');
  
      if(this.datosDomicilioLength == 0){
       
        if(this.datosComplemenLength == 0){
  
          if(this.listaMediaFilLength == 0){
            //OPCION 1
            await this.Op1_PostDataDPDomComMediaFil_Tramite();
  
          }else{
            if(this.listaMediaFilLength > 0){
              //OPCION 2
              await this.Op2_PostDataDPDomComMediaFil_Tramite();
  
            }
          }
  
          
        }else{
          if(this.datosComplemenLength > 0){
            if(this.listaMediaFilLength == 0){
              //OPCION 3
              await this.Op3_PostDataDPDomComMediaFil_Tramite();
  
            }else{
              if(this.listaMediaFilLength > 0){
                //OPCION 4
                await this.Op4_PostDataDPDomComMediaFil_Tramite();
    
              }
            }
  
          }
        }
  
      }else{
        
        if(this.datosComplemenLength == 0){
          if(this.listaMediaFilLength == 0){
            //OPCION 5
            await this.Op5_PostDataDPDomComMediaFil_Tramite();
  
          }else{
            if(this.listaMediaFilLength > 0){
              //OPCION 6
              await this.Op6_PostDataDPDomComMediaFil_Tramite();
  
            }
          }
         
  
        }else{
         
          if(this.datosComplemenLength >0){
            if(this.listaMediaFilLength == 0){
              //OPCION 7
              await this.Op7_PostDataDPDomComMediaFil_Tramite();
  
            }else{
              if(this.listaMediaFilLength > 0){
                //OPCION 8
                await this.Op8_PostDataDPDomComMediaFil_Tramite();
    
              }
            }
          }
        }
      }
      
    }else{
  
      console.log('ELSE DEL CRITERIO');
      
      if(this.datosDomicilioLength == 0){
       
        if(this.datosComplemenLength == 0){
  
          if(this.listaMediaFilLength == 0){
            //OPCION 9
            await this.Op9_PostDataDPDomComMediaFil_Tramite();
  
          }else{
            if(this.listaMediaFilLength > 0){
              //OPCION 10
              await this.Op10_PostDataDPDomComMediaFil_Tramite();
  
            }
          }
  
          
        }else{
          if(this.datosComplemenLength > 0){
            if(this.listaMediaFilLength == 0){
              //OPCION 11
              await this.Op11_PostDataDPDomComMediaFil_Tramite();
  
            }else{
              if(this.listaMediaFilLength > 0){
                //OPCION 12
                await this.Op12_PostDataDPDomComMediaFil_Tramite();
    
              }
            }
  
          }
        }
  
      }else{
        
        if(this.datosComplemenLength == 0){
          if(this.listaMediaFilLength == 0){
            //OPCION 13
            await this.Op13_PostDataDPDomComMediaFil_Tramite();
  
          }else{
            if(this.listaMediaFilLength > 0){
              //OPCION 14
              await this.Op14_PostDataDPDomComMediaFil_Tramite();
  
            }
          }
         
  
        }else{
         
          if(this.datosComplemenLength >0){
            if(this.listaMediaFilLength == 0){
              //OPCION 15
              await this.Op15_PostDataDPDomComMediaFil_Tramite();
  
            }else{
              if(this.listaMediaFilLength > 0){
                console.log('sesupone qe en este dbe entrar');
                //console.log('number EXP',);
                
                
                //OPCION 16
                await this.Op16_PostDataDPDomComMediaFil_Tramite();
    
              }
            }
           
  
          }
  
        }
  
      }
  
    }



   //addDatosPDomCom
    /*await this.datosInicialesService.addDatosPDomComTRAMITE(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        )

       // alert("Datos registrados exitosamente");
        console.log(res);
        this.limpiarInputsRegistroIPDC();
        
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        //alert("Ha ocurrido un error al registrar, intentelo nuevamente");
        console.log(err);
        
      }
      
    )*/
    //this.datosInicialesService.newRegistrarDatos = this.datosInicialesService.limpiarInputsRegistro;

  }


  //OPCION 1
  async Op1_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op1_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }

  //OPCION 2
  async Op2_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op2_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 3
  async Op3_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op3_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 4
  async Op4_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op4_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 5
  async Op5_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op5_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 6
  async Op6_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op6_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 7
  async Op7_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op7_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 8
  async Op8_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op8_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }


  //OPCION 9
  async Op9_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op9_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }

  //OPCION 10
  async Op10_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op10_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 11
  async Op11_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op11_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 12
  async Op12_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op12_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 13
  async Op13_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op13_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 14
  async Op14_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op14_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 15
  async Op15_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op15_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }
  //OPCION 16
  async Op16_PostDataDPDomComMediaFil_Tramite(){  
    await this.datosPDC.Op16_addDatosPDomComMediaFil_Tramite(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        );
        console.log(res); 
        this.modal.dismissAll();
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(err);
      }
    )
  }







  async validarLenghtRFC_CURP_LICENCIA_CARTILLA_PASAPORTE_ELECTOR(){
    var DI = this.datosInicialesService.ValoresInputsRegistroDataPD;
    if(DI.CVE_ELECTOR != '' && DI.CARTILLA != '' && DI.LICENCIA !='' && DI.PASAPORTE != ''){
      
      var lenghtRfc = DI.CVE_RFC.length;
      var lenghtElector = DI.CVE_ELECTOR.length;
      var lenghtCartilla = DI.CARTILLA.length;
      var lenghtLicencia = DI.LICENCIA.length;
      var lenghtCurp = DI.CURP.length;
      var lenghtPasaporte = DI.PASAPORTE.length;
      console.log('lenght cve ele', lenghtElector);

    }else{

    }


  }




  async ValidarEmailTelCel(){

    var DI = this.datosInicialesService.ValoresInputsRegistroDataPD;
    var expRegEmail =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expRegEmail.test(DI.EMAIL);
    var celLenght = DI.CELULAR.toString().length;
    var telLenght = DI.TELEFONO.toString().length;
    this.datosInicialesService.ValoresInputsRegistroDataPD.TELEFONO = this.datosInicialesService.ValoresInputsRegistroDataPD.TELEFONO.toString();
    this.datosInicialesService.ValoresInputsRegistroDataPD.CELULAR = this.datosInicialesService.ValoresInputsRegistroDataPD.CELULAR.toString();
    console.log('ES NUMBER?', this.datosInicialesService.ValoresInputsRegistroDataPD.TELEFONO);
    
    if(esValido == true){
      console.log('es valido email');

      if(telLenght == 10){
        if(celLenght == 10){
          console.log('todo valido');
         await this.POSTclickBtnGuardarInfoModalRegisIP();
         this.modal.dismissAll(); 
          //this.clickBtnGuardarInfo();
          
        }else{
          console.log('cel no valido');
          Swal.fire(
            'Dato ingresado en "Celular" no es válido',
            'El campo "Celular" debe de ser de 10 caracteres',
            'error'
          )
          

        }
        

      }else{
        if(celLenght == 10){
          console.log('tell no valido');
          Swal.fire(
            'Dato ingresado en "Teléfono" no es válido',
            'El campo "Teléfono" debe de ser de 10 caracteres',
            'error'
          )
          
        }else{
          console.log('tel ni cel no valido');
          Swal.fire(
            'Datos ingresados en "Celular" y "Teléfono" no son válidos',
            'Los campos deben de ser de 10 caracteres',
            'error'
          )
          

        }

      }
      console.log('LENGHT TEL', telLenght);
      console.log('LENGHT CEL', celLenght);

      

      
    }else{
     
      if(telLenght == 10){
        if(celLenght == 10){
          console.log('correo no valido');
          Swal.fire(
            'Dato ingresado en "Email" no es válido',
            'Ejemplo: nombre@dominio.com',
            'error'
          )
          
        }else{
          console.log('correo y cel no valido');
          Swal.fire(
            'Datos ingresado en "Email" y "Celular"  no son válidos',
            'El campo "Celular" debe de ser de 10 caracteres, ejemplo de email: nombre@dominio.com ',
            'error'
          )
          

        }
        

      }else{
        if(celLenght == 10){
          console.log('correo no valido tell no valido');
          Swal.fire(
            'Datos ingresado en "Email" y "Teléfono"  no son válidos',
            'El campo "Teléfono" debe de ser de 10 caracteres, ejemplo de email: nombre@dominio.com ',
            'error'
          )
          
        }else{
          console.log('ni email ni tel ni cel no valido');
          Swal.fire(
            'Datos ingresado en "Email" , "Teléfono" y "Celular" no son válidos',
            'los campos "Celular" y "Teléfono" deben de ser de 10 caracteres, ejemplo de email: nombre@dominio.com ',
            'error'
          )
          

        }

      }

      
    }

  }


  async validarInputsRegistroDP_DOM_COM(){
    var DI = this.datosInicialesService.ValoresInputsRegistroDataPD;
    console.log('NAMEEEE',DI.NOMBRE);
    /*if(DI.EST_CIVIL == null){
      console.log('es null');
      

    }else{
      console.log('ELSE');
      
    }*/

    if(DI.NOMBRE != '' && DI.APE_PATERNO != '' && DI.APE_MATERNO!= '' && DI.SEXO != null  && DI.FECHA_NAC != '' 
      && DI.EST_CIVIL != null && DI.SANGRE!='' && DI.CVE_RFC != '' && DI.CURP != '' && DI.CVE_ELECTOR != '' && DI.LICENCIA != ''
      && DI.PASAPORTE != '' && DI.CARTILLA != '' && DI.PAIS_NAC != 0 && DI.EDO_NAC != 0 && DI.MUN_NAC != 0 && DI.NACIONALIDAD != 0
      
      && DI.EMAIL !='' && DI.TELEFONO != '' && DI.CELULAR != ''  && DI.CALLE != '' && DI.ENTRE_CALLE != '' && DI.Y_CALLE != '' 
      && DI.NO_EXTERIOR != '' && DI.NO_INTERIOR != '' && DI.COLONIA !='' && DI.CODIGO_POSTAL != '' && DI.ENTIDAD != '' && DI.MUNICIPIO != ''  && DI.CIUDAD != ''

      && DI.PERTENECE_ETNIA != ''  && DI.NOM_ETNIA != ''  && DI.HABLA_LEN_INDIGENA != '' && DI.LENGUA_INDIGENA != '' && DI.ES_PADRE != ''
      && DI.TIENE_DISCAPACIDAD != '' && DI.NOM_DISCAPACIDAD != '' && DI.ES_AGENTEMP_PERITO != ''
    ){
      //SO QUE 
      console.log('todos los inputs llenos, peticion post');
      await this.ValidarEmailTelCel();
      //this.modal.dismissAll(); 
      
    }else{

      if(DI.NOMBRE != '' && DI.APE_PATERNO != '' && DI.APE_MATERNO!= '' && DI.SEXO != null  && DI.FECHA_NAC != '' 
      && DI.EST_CIVIL != null && DI.SANGRE!=''  && DI.CVE_RFC != '' && DI.CURP != ''  && DI.PAIS_NAC != 0 && DI.EDO_NAC != 0  && DI.NACIONALIDAD != 0
      
      && DI.EMAIL !='' && DI.TELEFONO != '' && DI.CELULAR != ''  && DI.CALLE != '' && DI.ENTRE_CALLE != '' && DI.Y_CALLE != '' 
      && DI.NO_EXTERIOR != '' && DI.NO_INTERIOR != '' && DI.COLONIA !='' && DI.CODIGO_POSTAL != '' && DI.ENTIDAD != '' && DI.MUNICIPIO != ''  && DI.CIUDAD != ''

      && DI.PERTENECE_ETNIA != ''    && DI.HABLA_LEN_INDIGENA != ''  && DI.ES_PADRE != ''
      && DI.TIENE_DISCAPACIDAD != ''  && DI.ES_AGENTEMP_PERITO != '' && 

      (DI.CVE_ELECTOR == '' || DI.LICENCIA == '' || DI.PASAPORTE == '' || DI.CARTILLA != '' || DI.MUN_NAC == 0 
      || DI.NOM_ETNIA == '' || DI.LENGUA_INDIGENA == '' || DI.NOM_DISCAPACIDAD == '')){

        //here
        console.log('make post with los nulos');
       await this.ValidarEmailTelCel();
       //this.modal.dismissAll(); 
      

      }else{
        //si cualquiera esta vacio
        //UNICOS CAMPOS QUE SE PUEDEN GUARDAR NULL SON
        //CVE_ELECTOR, LICENCIA,PASAPORTE,CARTILLA,MUN_NAC, NOMBRE_ETNIA, NOMBRE_LENGUA_INDIGENA, NOM_DISCAPACIDAD
        if(DI.NOMBRE == '' || DI.APE_PATERNO == '' || DI.APE_MATERNO == '' || DI.SEXO == null  || DI.FECHA_NAC == '' 
        || DI.EST_CIVIL == null  || DI.SANGRE == '' || DI.CVE_RFC == '' || DI.CVE_RFC == '' || DI.CURP == '' || DI.PAIS_NAC == 0 || DI.EDO_NAC == 0  || DI.NACIONALIDAD == 0
        
        || DI.EMAIL =='' || DI.TELEFONO == '' || DI.CELULAR == ''  || DI.CALLE == '' || DI.ENTRE_CALLE == '' || DI.Y_CALLE == '' 
        || DI.NO_EXTERIOR == '' || DI.NO_INTERIOR == '' || DI.COLONIA =='' || DI.CODIGO_POSTAL == '' || DI.ENTIDAD == '' || DI.MUNICIPIO == ''  || DI.CIUDAD == ''

        || DI.PERTENECE_ETNIA == ''    || DI.HABLA_LEN_INDIGENA == ''  || DI.ES_PADRE == ''
        || DI.TIENE_DISCAPACIDAD == ''  || DI.ES_AGENTEMP_PERITO == ''){
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
    
  }
////----------------------------------------------------------------------




  //--------------------------------------------------------------

  async GetDataestadoCivil(){
    await this.datosInicialesService.getEstadosCivil().subscribe(
      res=>{
        this.listaEstadoCivil = res;
        this.datosInicialesService.listaEstadoCivil = this.listaEstadoCivil;
        console.log(this.listaEstadoCivil);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

  async getImagen(){
    
    await this.datosDocumentosService.getImagen().subscribe(
      res=>{
        this.xd = res;
       // console.log(this.xd[0].PIZQUIERDO.type);
        
        //this.arrayBufferToBase64(this.xd[0].PIZQUIERDO, 'jpg')
       // console.log(this.previzualizacionDoc);
        
        //this.previzualizacionDoc = archivo;
        //aqui le quiteeeeeeeeeeeeee el [0] a xd
        this.previzualizacionDoc = this.xd; 
        console.log('logdelget');
        
        console.log(this.previzualizacionDoc);
      },
      err =>{
        console.log(err);
        
      }
    )

  }

  async GetDatapaisNac(){
    await this.datosInicialesService.getPaisNac().subscribe(
      res=>{
        this.listaPaisNac = res;
        this.datosInicialesService.listaPaisNac = this.listaPaisNac;
        console.log(this.listaPaisNac);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

  async GetDataEstados(){
    await this.datosInicialesService.getEstados().subscribe(
      res=>{
        this.listaEstados = res;
        this.datosInicialesService.listaEstados = this.listaEstados;
        console.log(this.listaEstados);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }


  async GetDataMunicipios(){
    await this.datosInicialesService.getMunicipios().subscribe(
      res=>{
        this.listaMunicipios = res;
        this.datosInicialesService.listaMunicipios = this.listaMunicipios;
        console.log(this.listaMunicipios);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

  async GetDataCiudades(){
    await this.datosInicialesService.getCiudades().subscribe(
      res=>{
        this.listaCiudades = res;
        this.datosInicialesService.listaCiudades = this.listaCiudades;
        console.log(this.listaCiudades);
        

      },
      err =>{
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

  async GetListDocsIniciales(){
    var estilo:any={
      estilo:''
    };
    var respuesta:any={};
    
    await this.datosDocumentosService.getListaDocsIniciales().subscribe(
      res=>{
        respuesta = res;
        //this.listaDocumentosIni = res;
        for(var i =0; i< Object.keys(respuesta).length; i ++){
          var posisiones = Object.assign(respuesta[i],estilo);
          this.listaDocumentosIni.push(posisiones);
        }
        
        
        console.log('docsIni',this.listaDocumentosIni);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

  async getDatosEscolares(IdEnlace: any){
    await this.datosEscolaresService.GetDatosEscolares(IdEnlace).subscribe(
      res =>{
        this.listaDatosEscolares = res;
        var lenghtDatosEscolares = Object.keys(this.listaDatosEscolares).length;
        console.log(this.listaDatosEscolares);

        if(lenghtDatosEscolares == 0){
          this.newRegistrarDatosEscolares.CONSECUTIVO = 1;
        }else{
          this.newRegistrarDatosEscolares.CONSECUTIVO = this.listaDatosEscolares[0].CONSECUTIVO + 1;
          console.log('Ultimo consecutivo',this.listaDatosEscolares[0].CONSECUTIVO);
          console.log('nuevo valor post',this.newRegistrarDatosEscolares.CONSECUTIVO);
                    
        }
      }
    )
  }

  async  postInfoEscolar(){
    await this.datosEscolaresService.addInfoEscolar(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        )
       // alert("Datos registrados exitosamente");
        this.limpiarInputsRegisInfoEsc();

        this.getDatosEscolares(this.newRegistrarDatosEscolares.IdEnlace);
        //this.getInfoEscolar();

      },
      err => {
        console.log(err);
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )

      }
      
    );
  }

  async validacionInfoEscolar(){
    var DE = this.newRegistrarDatosEscolares;
    console.log('ESCO',DE.ESCOLARIDAD);

    if(DE.ESCOLARIDAD != '' && DE.ESCUELA != '' && DE.ESPECIALIDAD != '' && DE.CEDULA != '' && DE.TRATAMIENTO != '' && DE.FCH_INICIO != '' && DE.FCH_TERMINO != ''){
      //TODOS LLENOS
      console.log('todos con datos post');
      this.postInfoEscolar();

    }else{
      if(DE.ESCOLARIDAD != '' && DE.ESCUELA != '' && DE.ESPECIALIDAD != ''  && DE.TRATAMIENTO != '' && DE.FCH_INICIO != '' && DE.FCH_TERMINO != '' && DE.CEDULA == ''){
        //cedula vacio
        console.log('post con cedula vaciod post vacio');
        this.postInfoEscolar();
        
        
      }else{
        if(DE.ESCOLARIDAD == '' || DE.ESCUELA == '' || DE.ESPECIALIDAD == '' || DE.TRATAMIENTO == '' || DE.FCH_INICIO == '' || DE.FCH_TERMINO == ''){
          //cualqiera vacio
          console.log('alguno vacio');
          Swal.fire(
            '',
            'Favor de llenar todos los campos requeridos',
            'info'
          )
          
        }
      }

    }
    

    



  }

  






  async getDatosIdiomas(IdEnlace: any){
    await this.datosIdiomasService.getIdiomasById(IdEnlace).subscribe(
      res=>{
        this.listaDatosIdiomas = res;
        var lenghtDatosIdiomas = Object.keys(this.listaDatosIdiomas).length;
        console.log(this.listaDatosIdiomas);


        if(lenghtDatosIdiomas == 0){
          this.newRegistrarIdiomas.CONSECUTIVO = 1;
        }else{
          this.newRegistrarIdiomas.CONSECUTIVO = this.listaDatosIdiomas[0].CONSECUTIVO + 1;
          console.log('Ultimo consecutivo',this.listaDatosIdiomas[0].CONSECUTIVO);
          console.log('nuevo valor post',this.newRegistrarIdiomas.CONSECUTIVO);
                    
        }

      }
    )
  }

  async postDatosIdiomas(){
    await this.datosIdiomasService.addIdiomas(this.newRegistrarIdiomas).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        )
        //alert("Datos registrados exitosamente");
        this.limpiarInputsIdiomas();
        this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
       // alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }

  async validacionInfoIdiomas(){
    var DI = this.newRegistrarIdiomas;
    
    if(DI.IDIOMA != '' && DI.LECTURA != '' && DI.ESCRITURA != '' && DI.CONVERSACION != ''){
      console.log('todos los inputs llenos');

      if((DI.LECTURA >= 1 && DI.LECTURA <= 100)&&(DI.ESCRITURA >= 1 && DI.ESCRITURA <= 100)&&(DI.CONVERSACION >= 1 && DI.CONVERSACION <= 100)){
        this.postDatosIdiomas();
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

  async UpdateInfoCompletaDataTramite(){
    await this.datosInicialesService.Update_InfoCompletaDataPersonalTramite(this.IdInfoCompleta).subscribe(
      res=>{
        Swal.fire(
          'La persona desaparecerá de la lista',
          'Si desea capturar o hacer cambios en la información dirijase a "Registro existentes" una vez que la persona cuente con número de empleado',
          'success'
        );
        this.modal.dismissAll();
        this.GetNombresRegistro(); 
        console.log(res); 
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        console.log(this.datosInicialesService.ValoresInputsRegistroDataPD);
        
        console.log(err);
      }
    )
  }




  async postDatosDocumentos(){
    console.log(this.newRegisDocumentos);
    
    //this.base64ToArrayFile(this.newRegisDocumentos.DOCUMENTO);
    await this.datosDocumentosService.addDocumento(this.newRegisDocumentos).subscribe(
      
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los documentos fueron almacenados',
          'success'
        )
        //alert("Datos registrados exitosamente");
        this.limpiarInputsDocs();
        this.getDocumentosByIdEnlace(this.newRegisDocumentos.IdEnlace);
        

        ///this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
      },
      err=>{
        Swal.fire(
          'SE HA GENERADO UN ERROR,  INTÉNTELO DE NUEVO',
          'Si persisten los problemas comuníquese con el administrador',
          'error'
        )
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  async verificarSiEsDocumentoRepetido(){
    var existeQuestion: boolean = false;
    console.log("this.newRegisDocumentos.TIPO",this.newRegisDocumentos.TIPO);
    console.log("listaDocsporId",this.listaDocsInsertadosByIdEnlace);
    
  
    for(var i=0; i<Object.keys(this.listaDocsInsertadosByIdEnlace).length; i++){
      if(this.newRegisDocumentos.TIPO == this.listaDocsInsertadosByIdEnlace[i].TIPO){
        console.log('sisoy', this.listaDocsInsertadosByIdEnlace[i].desc_doc);
        existeQuestion=true;
        break;
      }else{
        console.log('nelprro');
        existeQuestion=false;
        
      }

    }
    
    if(existeQuestion == true){
      Swal.fire(
        '',
        'Ya se encuentra un registro del tipo de documento seleccionado',
        'info'
      )

    }else{
      this.postDatosDocumentos();
    }


  }

  async verificarSiexisteEnTablaCriteriosExpedienteCompleto(){
    console.log('VALOR ID ENLACE',this.newRegisDocumentos.IdEnlace);
    
    var lenghtRespuesta: any = '';
    await this.datosDocumentosService.getExpedienteCriteriosByIdEnlace(this.newRegisDocumentos.IdEnlace).subscribe(
      res=>{
        lenghtRespuesta = Object.keys(res).length;
        console.log('LENGHTcCRITERIOS',lenghtRespuesta);
        
      
        if(lenghtRespuesta == 0){
          Swal.fire(
            '',
            'Para guardar documentación, es necesario haber realizado previamente el registro de información personal, favor de capturarla',
            'info'
          )
          //this.verificarSiEsDocumentoRepetido();

        }else{

          this.verificarSiEsDocumentoRepetido();
          
        }  
      },
      err=>{
        console.log(err);
      }
    )
    
  }

  async validacionInsertarDocumentos(){
    if(this.newRegisDocumentos.TIPO != 0 &&  this.newRegisDocumentos.DOCUMENTO != ''){
      console.log('con valores');
    await  this.verificarSiexisteEnTablaCriteriosExpedienteCompleto();
     // this.postDatosDocumentos();
      

    }else{
      if(this.newRegisDocumentos.TIPO == 0 && this.newRegisDocumentos.DOCUMENTO != ''){
        Swal.fire(
          '',
          'Favor de especificar el tipo de documento',
          'info'
        )
        //alert('Favor de especificar el tipo de documento');

      }

      if(this.newRegisDocumentos.TIPO != 0 && this.newRegisDocumentos.DOCUMENTO == ''){
        Swal.fire(
          '',
          'Aún no ha seleccionado un archivo',
          'info'
        )
        //alert('Aún no ha seleccionado un archivo');

      }

      if(this.newRegisDocumentos.TIPO == 0 && this.newRegisDocumentos.DOCUMENTO == ''){
        Swal.fire(
          '',
          'Favor de llenar todos los campos requeridos',
          'info'
        )
        //alert('Favor de llenar todos los datos requiridos');
      }

    }
  }


  async getDocumentosByIdEnlace(IdEnlace: any){
    var listalenght: any;
    
    await this.datosDocumentosService.getListaDocsByIdEnlace(IdEnlace).subscribe(
      res=>{
       // respuesta = res;
        this.listaDocsInsertadosByIdEnlace = res;
        for(var i=0; i < Object.keys(this.listaDocumentosIni).length; i++){
          for(var j=0; j < Object.keys(this.listaDocsInsertadosByIdEnlace).length; j++ ){
            if(this.listaDocumentosIni[i].desc_doc == this.listaDocsInsertadosByIdEnlace[j].desc_doc){
              console.log('si soy', this.listaDocumentosIni[i].desc_doc);
              this.listaDocumentosIni[i].estilo = 'bg';
              
            }else{
              console.log('no soy');
               
            }

          }
        }
        
        listalenght = Object.keys(this.listaDocsInsertadosByIdEnlace).length;

        if(listalenght == 0){
          this.newRegisDocumentos.CONSECUTIVO = 1;
          console.log('concen true', this.newRegisDocumentos.CONSECUTIVO);

        }else{
          this.newRegisDocumentos.CONSECUTIVO = this.listaDocsInsertadosByIdEnlace[0].CONSECUTIVO + 1;
          console.log('concen else', this.newRegisDocumentos.CONSECUTIVO);
        }
        
        
        
       // console.log(this.listaDocsInsertadosByIdEnlace);
      }
    )
  }


  async traerIdExpedienteByIdEnlace(IdEnlace: any){
    
    await this.datosDocumentosService.getIdExpedienteeByIdEnlace(IdEnlace).subscribe(
      res=>{
        this.IdExpediente = res[0].IdExpediente; 
        this.newRegisDocumentos.IdExpediente = this.IdExpediente; 
        console.log('IDEXPPP',this.IdExpediente);
      }
    )
  }

  


  capturarArchivo(event: any ){

    const archivo = event.target.files[0];

  /*  const tipo = archivo.type;
    if(tipo === 'image/jpeg' || tipo=== 'image/png'){

      reader.onload= ()=>{
        var result = String(reader.result);
        //result = result.replace("data:image/png;base64,","");
       // result = result.replace("data:image/jpeg;base64,","");
        this.previzualizacionDoc = result;
        console.log('prevvvvv');
      
        console.log(this.previzualizacionDoc);
      }
      reader.readAsDataURL(archivo);
      console.log('prevvvvv');
      
      console.log(this.previzualizacionDoc);
      
    }else{

    }*/

//-----------------------------
   
    this.extraerBase64(archivo).then((img: any) =>{
      this.previzualizacionDoc = img.base;
     // this.pdfSrc = img.base;
      //console.log(this.pdfSrc);
      
      console.log('previzuliazacion');

      this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:application/pdf;base64,","");

     /* if(event.target.files[0].type == 'image/png'){
        console.log('SOY PNG');
        this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/png;base64,","");

      }else{
        console.log('SOY JPEG');
        this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/jpeg;base64,","");
        
      }*/
      
      console.log(this.previzualizacionDoc);
     
    
    });
  }

  /*click2(){

   /* this.cortarStringBase64 = this.previzualizacionDoc.slice(23);
    console.log('cortada');
    
    console.log(this.cortarStringBase64);
    this.newRegisDocumentos.DOCUMENTO = this.cortarStringBase64;*/

    

    

   /* console.log(this.previzualizacionDoc.DOCUMENTO.data);
    
    
    this.extraerBase64(this.previzualizacionDoc.DOCUMENTO.data).then((img: any) =>{
      this.salida = img.base;
      //this.newRegisDocumentos.DOCUMENTO=img.base;
     
    });
    console.log('prevClick2:',this.salida);*
    //this.getImagen();
    //this.base64ToArrayFile(this.previzualizacionDoc);
  }*/

  //DE UNA IMAGEN LE SACA EL BASE64
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

 
 




/*async clickk(){
 
//  this.bufferToBase64ImageSource(this.xd[0].DOCUMENTO.data);--------------------------------------la buenaaaaa
 // this.base64ToArrayBuffer(this.previzualizacionDoc);
 // console.log('click');

  //await this.handleUpload(this.previzualizacionDoc);
  
  //this.buf2hex(this.previzualizacionDoc);
  
  //console.log(this.previzualizacionDoc);
  
 //this.otroIntentoConverArray(this.previzualizacionDoc);

 //this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc;
  ///console.log(this.newRegisDocumentos);

 ///--------------------------------LE QUITE EÑ [0]
 this.bufferToBase64ImageSource(this.xd[0].DOCUMENTO.data);
 //console.log(this.newRegisDocumentos);
 
 
  
}*/



//BUFFER TO BASE 64
//CONVERTIR BUFFER DEL ARRAY TRAIDOS DE LA BD para pasarlo a base 64 para despues pasarlo a las 
//etiquedas html <img> y <pdf-viewer>  
//CONVERTIR A BASE 64 LOS ARRAY TRAIDOS DE LA BD
//LA VAR DATOS ES PARA LAS IMAGENES QE YO INSERTÉ EN BASE64 LA VAR QUITA1ER
//LE QUITA A DATOS EL 1ER ELEMENTO "  Y YA QEDA LA BASE 64 LISTA
//A LAS IMAGENES QE YO NO INSERTÉ SE LE PASA LA VARIABLE BASE64STRING
/*
bufferToBase64ImageSource(buffer: any) {
  var Datos ='';
  var Bytes = 0;
  const base64String = btoa(new Uint8Array(buffer).reduce((data, byte)=> {
   Datos = data;
   Bytes = byte;
   
    
    return data + String.fromCharCode(byte);
  }, ''));
  

  /*const base64String = btoa(new Uint8Array(buffer).reduce((data, byte)=> {
   // console.log(data + String.fromCharCode(byte));
   
    
    return data + String.fromCharCode(byte);
  }, ''));*


  console.log('data:image/jpg;base64, ');
  console.log(Datos);
  var quita1er = Datos.slice(1);
  console.log('bytes', Bytes);
  

  console.log('quitar', quita1er);
  
  //AQUI SE LE PASA BASE64STRING EN VEZ DE QUITA1ER SE PUEDE PONER UN IF 
  this.previzualizacionDoc = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + quita1er);
  console.log('buffertobase');
  
  console.log(this.previzualizacionDoc);
  
  

  return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);

}*/





//----------------------------------------
//SI CONVIERTE PERO NO SE PUEDE INSERTAR QE EL VALOR ES INVALIDO BUFFER INVALIDO
async handleUpload(e:any){
  console.log('handlerecivo', e);
  
  let image = e;

  console.log('image', image);
  

  const buffer = await image.arrayBuffer();
  //const byteArray = new Uint8ClampedArray(buffer);
  const byteArray = new Int8Array(buffer);
  console.log('bytearraynew:');
  
  console.log(byteArray.buffer);
  this.newRegisDocumentos.DOCUMENTO = byteArray.buffer;
  
  //formik.setFieldValue(name, byteArray);
}



//-----
async otroIntentoConverArray(image:any){
  //const processImageBuffer = new ArrayBuffer(image); //vacio

 // const blob = new Blob(image);
  //console.log(blob);
  const processImageBuffer =  image.arrayBuffer();
  console.log(processImageBuffer.Promise);
}

buf2hex(bufferArray:any) { // buffer is an ArrayBuffer
 const hexa = Array.prototype.map.call(new Uint8Array(bufferArray), x => ('00' + x.toString(16)).slice(-2)).join('');
 this.newRegisDocumentos.DOCUMENTO = hexa;
 console.log('hexa');
  
 console.log(this.newRegisDocumentos.DOCUMENTO);

 return Array.prototype.map.call(
    new Uint8Array(bufferArray), x => ('00' + x.toString(16)).slice(-2)).join('');
    
}


}
