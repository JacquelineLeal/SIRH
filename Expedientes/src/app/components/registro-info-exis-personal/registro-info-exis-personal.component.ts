import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';



import {DatosEscolares, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import {Datos,DatosBuscarInputs, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import {DatosPersonalesTable ,DatosPDomComService } from '../../services/datos-p-dom-com.service';
import{DatosIdiomas ,IdiomasService} from '../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';

import { DomSanitizer } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-registro-info-exis-personal',
  templateUrl: './registro-info-exis-personal.component.html',
  styleUrls: ['./registro-info-exis-personal.component.scss']
})

export class RegistroInfoExisPersonalComponent implements OnInit {

  listaPersonas: any = [];
  ListaDatosPersonales: any =[];
  listaEscolaridad:any = [];
  listaIdiomas: any = [];
  listaMediaFil: any =[];
  previzualizacionDoc: any = [];

  listaDocsByCveEmp : any = [];


  datosDomicilio: any = [];
  datosComplementarios: any = [];
  listaMediaFilLength: number;
  datosDomicilioLength: number;
  datosComplemenLength: number;

  listaDocumentosIni: any =[];
  listaEstadoCivil: any = [];
  listaPaisNac: any = [];
  listaEstados: any = []; 
  listaMunicipios: any = [];
  listaCiudades: any = [];
  listaValoresEscolaridad: any = [];


  today : Date = new Date();
  date : any = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' +  this.today.getDate();

  valoresInputBusqueda: DatosBuscarInputs={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
  }

  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
    IdEnlace: '',
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
    APE_MATERNO: ''
  }

  constructor(
    public router:Router,
    public modal:NgbModal,
    public datosPDC: DatosPDomComService,
    private datosEscolaresService: DatosEscolaresServiService,
    private datosInicialesService: DatosInicialesExpedientesService,
    private datosIdiomasService : IdiomasService,
    private datosDocumentosService : DocumentosService,
    private sanitizer : DomSanitizer
  ) { }

  ngOnInit(): void {

    this.GetDataestadoCivil();
    this.GetDatapaisNac();
    this.GetDataEstados();
    this.GetDataMunicipios();
    this.GetDataCiudades(); 
    this.GetValuesListaEscolaridad();
    this.GetListDocsIniciales();
    
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


  async abrirModalInfoPersonal(regisInfoPersonal: any, CVE_EMPLEADO: any){
  
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

        this.datosInicialesService.newRegistrarDatos.PERTENECE_ETNIA = ' ';
        this.datosInicialesService.newRegistrarDatos.NOM_ETNIA = ' ';
        this.datosInicialesService.newRegistrarDatos.HABLA_LEN_INDIGENA = ' ';
        this.datosInicialesService.newRegistrarDatos.LENGUA_INDIGENA = ' ';
        this.datosInicialesService.newRegistrarDatos.ES_PADRE = ' ';
        this.datosInicialesService.newRegistrarDatos.NOM_DISCAPACIDAD = ' ';
        this.datosInicialesService.newRegistrarDatos.ES_AGENTEMP_PERITO = ' ';



      await this.datosPDC.getDatosPersonalesPerExis(CVE_EMPLEADO).subscribe(
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

          this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
            resDom=>{
              this.datosDomicilio = resDom;
              this.datosDomicilioLength = Object.keys(this.datosDomicilio).length;

              if(this.datosDomicilioLength == 0){
                console.log('true',this.datosDomicilioLength);
                this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
                  resCom=>{
                    this.datosComplementarios = resCom;
                    this.datosComplemenLength = Object.keys(this.datosComplementarios).length;

                    if(this.datosComplemenLength == 0){
                      
                      //TRAER EL SANGRE
                      this.datosInicialesService.GetDatosMediaFiliacionEditar(CVE_EMPLEADO).subscribe(
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
                      this.datosInicialesService.GetDatosMediaFiliacionEditar(CVE_EMPLEADO).subscribe(
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
                  resCom=>{ 
                    this.datosComplementarios = resCom;
                    this.datosComplemenLength = Object.keys(this.datosComplementarios).length;

                    if(this.datosComplemenLength == 0){
                     // this.modal.open(regisInfoPersonal,{size:'xl'});
                      //TRAER EL SANGRE
                      this.datosInicialesService.GetDatosMediaFiliacionEditar(CVE_EMPLEADO).subscribe(
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
                      this.datosInicialesService.GetDatosMediaFiliacionEditar(CVE_EMPLEADO).subscribe(
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
      
  }








 /* async abrirModalInfoPersonal(regisInfoPersonal: any, CVE_EMPLEADO: any){
 
      this.datosInicialesService.newRegistrarDatos.NOMBRE = '';
      this.datosInicialesService.newRegistrarDatos.APE_PATERNO = '';
      this.datosInicialesService.newRegistrarDatos.APE_MATERNO = '';
      this.datosInicialesService.newRegistrarDatos.SEXO = '';
    // this.datosInicialesService.newRegistrarDatos.FECHA_NAC = ;
      this.datosInicialesService.newRegistrarDatos.EST_CIVIL = '';
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

      this.datosInicialesService.newRegistrarDatos.PERTENECE_ETNIA = ' ';
      this.datosInicialesService.newRegistrarDatos.NOM_ETNIA = ' ';
      this.datosInicialesService.newRegistrarDatos.HABLA_LEN_INDIGENA = ' ';
      this.datosInicialesService.newRegistrarDatos.LENGUA_INDIGENA = ' ';
      this.datosInicialesService.newRegistrarDatos.ES_PADRE = ' ';
      this.datosInicialesService.newRegistrarDatos.NOM_DISCAPACIDAD = ' ';
      this.datosInicialesService.newRegistrarDatos.ES_AGENTEMP_PERITO = ' ';



    await this.datosPDC.getDatosPersonalesPerExis(CVE_EMPLEADO).subscribe(
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
        this.modal.open(regisInfoPersonal,{size:'xl'})
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
    
  }*/

  abrirModalInfoEscolar(regisInfoEscolar: any, CVE_EMPLEADO: any, NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any){
    this.getListaEscolaridades(CVE_EMPLEADO);
    this.newRegistrarDatosEscolares.ESCOLARIDAD = '';
    this.newRegistrarDatosEscolares.ESCUELA = '';
    this.newRegistrarDatosEscolares.ESPECIALIDAD= '';
    this.newRegistrarDatosEscolares.CEDULA = '';
    this.newRegistrarDatosEscolares.TRATAMIENTO = '';
    this.newRegistrarDatosEscolares.FCH_TERMINO = '';
    this.newRegistrarDatosEscolares.FCH_TERMINO = ''; 

    this.newRegistrarDatosEscolares.CVE_EMPLEADO = CVE_EMPLEADO;
    this.newRegistrarDatosEscolares.NOMBRE = NOMBRE;
    this.newRegistrarDatosEscolares.APE_PATERNO = APE_PATERNO;
    this.newRegistrarDatosEscolares.APE_MATERNO = APE_MATERNO;
    console.log(this.newRegistrarDatosEscolares);
    
    this.modal.open(regisInfoEscolar,{size:'xl'});

  }

  abrirModalInfoIdiomas(regisInfoIdiomas: any, CVE_EMPLEADO: any, NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any ){
    this.newRegistrarIdiomas.IDIOMA = '';
    this.newRegistrarIdiomas.LECTURA = '';
    this.newRegistrarIdiomas.ESCRITURA = '';
    this.newRegistrarIdiomas.CONVERSACION = '';
    
    
    this.newRegistrarIdiomas.CVE_EMPLEADO = CVE_EMPLEADO;
    this.newRegistrarIdiomas.NOMBRE = NOMBRE;
    this.newRegistrarIdiomas.APE_PATERNO = APE_PATERNO;
    this.newRegistrarIdiomas.APE_MATERNO = APE_MATERNO;  
  
    console.log(this.newRegistrarIdiomas);
    this.getListaIdiomas(CVE_EMPLEADO);
    //this.getDatosIdiomas(Id);
    this.modal.open(regisInfoIdiomas,{size:'xl'});
  }

  abrirModalSubirDocumentos(subirDocumentos: any, CVE_EMPLEADO: any, NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any  ){
    
    this.previzualizacionDoc = '';
    this.newRegisDocumentos.DOCUMENTO = '';
    this.newRegisDocumentos.TIPO = 0;
    this.newRegisDocumentos.CVE_EMPLEADO = CVE_EMPLEADO;
    this.newRegisDocumentos.NOMBRE = NOMBRE;
    this.newRegisDocumentos.APE_PATERNO = APE_PATERNO;
    this.newRegisDocumentos.APE_MATERNO = APE_MATERNO;
    this.getListaDocumentosCve(CVE_EMPLEADO);
   // this.getDocumentosByIdEnlace(this.newRegisDocumentos.IdEnlace);
    
    this.modal.open(subirDocumentos,{size: 'xl'});

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
        console.log(this.listaPersonas);
        
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

  ///-------------------------------------------------------------------------
 async clickBtnGuardarInfo(){
    if(this.datosDomicilioLength == 0){
     
      if(this.datosComplemenLength == 0){

        if(this.listaMediaFilLength == 0){
          //OPCION 1
          await this.Op1_PostDataDPDomComMediaFil();

        }else{
          if(this.listaMediaFilLength > 0){
            //OPCION 2
            await this.Op2_PostDataDPDomComMediaFil();

          }
        }

        
      }else{
        if(this.datosComplemenLength > 0){
          if(this.listaMediaFilLength == 0){
            //OPCION 3
            await this.Op3_PostDataDPDomComMediaFil();

          }else{
            if(this.listaMediaFilLength > 0){
              //OPCION 4
              await this.Op4_PostDataDPDomComMediaFil();
  
            }
          }

        }
      }

    }else{
      
      if(this.datosComplemenLength == 0){
        if(this.listaMediaFilLength == 0){
          //OPCION 5
          await this.Op5_PostDataDPDomComMediaFil();

        }else{
          if(this.listaMediaFilLength > 0){
            //OPCION 6
            await this.Op6_PostDataDPDomComMediaFil();

          }
        }
       

      }else{
       
        if(this.datosComplemenLength >0){
          if(this.listaMediaFilLength == 0){
            //OPCION 7
            await this.Op7_PostDataDPDomComMediaFil();

          }else{
            if(this.listaMediaFilLength > 0){
              //OPCION 8
              await this.Op8_PostDataDPDomComMediaFil();
  
            }
          }
         

        }

      }

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
         await this.clickBtnGuardarInfo();
          
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
    if(DI.NOMBRE != '' && DI.APE_PATERNO != '' && DI.APE_MATERNO!= '' && DI.SEXO != ''  && DI.FECHA_NAC != '' 
      && DI.EST_CIVIL != '' && DI.SANGRE!='' &&  DI.CVE_RFC != '' && DI.CURP != '' && DI.CVE_ELECTOR != '' && DI.LICENCIA != ''
      && DI.PASAPORTE != '' && DI.CARTILLA != '' && DI.PAIS_NAC != 0 && DI.EDO_NAC != 0 && DI.MUN_NAC != 0 && DI.NACIONALIDAD != 0
      
      && DI.EMAIL !='' && DI.TELEFONO != '' && DI.CELULAR != ''  && DI.CALLE != '' && DI.ENTRE_CALLE != '' && DI.Y_CALLE != '' 
      && DI.NO_EXTERIOR != '' && DI.NO_INTERIOR != '' && DI.COLONIA !='' && DI.CODIGO_POSTAL != '' && DI.ENTIDAD != '' && DI.MUNICIPIO != ''  && DI.CIUDAD != ''

      && DI.PERTENECE_ETNIA != ''  && DI.NOM_ETNIA != ''  && DI.HABLA_LEN_INDIGENA != '' && DI.LENGUA_INDIGENA != '' && DI.ES_PADRE != ''
      && DI.TIENE_DISCAPACIDAD != '' && DI.NOM_DISCAPACIDAD != '' && DI.ES_AGENTEMP_PERITO != ''
    ){
      //SO QUE 
      console.log('todos los inputs llenos, peticion post');
      this.ValidarEmailTelCel();
      //await this.POSTclickBtnGuardarInfoModalRegisIP();
      
    }else{

      if(DI.NOMBRE != '' && DI.APE_PATERNO != '' && DI.APE_MATERNO!= '' && DI.SEXO != ''  && DI.FECHA_NAC != '' 
      && DI.EST_CIVIL != '' && DI.SANGRE!='' && DI.CVE_RFC != '' && DI.CURP != ''  && DI.PAIS_NAC != 0 && DI.EDO_NAC != 0  && DI.NACIONALIDAD != 0
      
      && DI.EMAIL !='' && DI.TELEFONO != '' && DI.CELULAR != ''  && DI.CALLE != '' && DI.ENTRE_CALLE != '' && DI.Y_CALLE != '' 
      && DI.NO_EXTERIOR != '' && DI.NO_INTERIOR != '' && DI.COLONIA !='' && DI.CODIGO_POSTAL != '' && DI.ENTIDAD != '' && DI.MUNICIPIO != ''  && DI.CIUDAD != ''

      && DI.PERTENECE_ETNIA != ''    && DI.HABLA_LEN_INDIGENA != ''  && DI.ES_PADRE != ''
      && DI.TIENE_DISCAPACIDAD != ''  && DI.ES_AGENTEMP_PERITO != '' && 

      (DI.CVE_ELECTOR == '' || DI.LICENCIA == '' || DI.PASAPORTE == '' || DI.CARTILLA != '' || DI.MUN_NAC == 0 
      || DI.NOM_ETNIA == '' || DI.LENGUA_INDIGENA == '' || DI.NOM_DISCAPACIDAD == '')){

        //here
        console.log('make post with los nulos');
        this.ValidarEmailTelCel();
       //await this.POSTclickBtnGuardarInfoModalRegisIP();
        

      }else{
        //si cualquiera esta vacio
        //UNICOS CAMPOS QUE SE PUEDEN GUARDAR NULL SON
        //CVE_ELECTOR, LICENCIA,PASAPORTE,CARTILLA,MUN_NAC, NOMBRE_ETNIA, NOMBRE_LENGUA_INDIGENA, NOM_DISCAPACIDAD
        if(DI.NOMBRE == '' || DI.APE_PATERNO == '' || DI.APE_MATERNO == '' || DI.SEXO == ''  || DI.FECHA_NAC == '' 
        || DI.EST_CIVIL == '' || DI.SANGRE == '' || DI.CVE_RFC == '' || DI.CURP == '' || DI.PAIS_NAC == 0 || DI.EDO_NAC == 0  || DI.NACIONALIDAD == 0
        
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
        


        }

      }
      
      
      
      

    }
    
  }


//OPCION 1
async Op1_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op1_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
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
async Op2_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op2_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
      console.log(res); 
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
async Op3_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op3_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
      console.log(res); 
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
async Op4_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op4_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
      console.log(res); 
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
async Op5_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op5_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
      console.log(res); 
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
async Op6_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op6_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
      console.log(res); 
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
async Op7_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op7_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
      console.log(res); 
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
async Op8_PostDataDPDomComMediaFil(){
  await this.datosInicialesService.Op8_addDatosPDomComMediaFil(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
    res=>{
      Swal.fire(
        'El REGISTRO FUE EXITOSO!',
        'Los datos fueron registrados',
        'success'
      );
      this.modal.dismissAll();
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

/*   // OPCION 1
  async postDatosPDomCom(){
    await this.datosInicialesService.addDatosPDomCom(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        console.log(res);
        
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        alert("Ha ocurrido un error al registrar, intentelo nuevamente");
        console.log(err);
        
      }
      
    )
  }

//OPCION 2
  async postDatosPDomComOpcion2(){
    await this.datosInicialesService.addDatosPDomComOPION2(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        console.log(res);
        
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        alert("Ha ocurrido un error al registrar, intentelo nuevamente");
        console.log(err);
        
      }
      
    )
  }
 
//OPCION 3
  async postDatosPDomComOpcion3(){
    await this.datosInicialesService.addDatosPDomComOPCION3(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        console.log(res);
        
        //this.router.navigateByUrl('registro-new-data');
      },
      err=>{
        alert("Ha ocurrido un error al registrar, intentelo nuevamente");
        console.log(err);
        
      }
      
    )
  }

//OPCION 4
  async putInfoPersonalDomComData(){
    
    await this.datosInicialesService.updateDatosPDomCom(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
       res=>{
         alert("Se han guardado los cambios");
         console.log(this.datosInicialesService.ValoresInputsRegistroDataPD);
         
         //this.getListaIdiomas(this.newRegistrarIdiomas.CVE_EMPLEADO);
        // this.getInfoEscolar();
       },
       err => console.log(err)
       
     );
  }*/




  //---------------------------------------------------------------------------

  async  postInfoEscolar(){
    await this.datosEscolaresService.addInfoEscolar(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        )
        //alert("Datos registrados exitosamente");
        this.limpiarInputsRegisInfoEsc();
        this.getListaEscolaridades(this.newRegistrarDatosEscolares.CVE_EMPLEADO);
       // this.getDatosEscolares(this.newRegistrarDatosEscolares.IdEnlace);
        //this.getInfoEscolar();

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
         // alert('Favor de llenar todos los campos requeridos');
        }
      }

    }
    

    



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
        this.getListaIdiomas(this.newRegistrarIdiomas.CVE_EMPLEADO);
        //this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
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

  async validacionInfoIdiomas(){
    var DI = this.newRegistrarIdiomas;
    
    if(DI.IDIOMA != '' && DI.LECTURA != '' && DI.ESCRITURA != '' && DI.CONVERSACION != ''){
        console.log('todos los inputs llenos');
        console.log(DI);
      

      if((DI.LECTURA >= 1 && DI.LECTURA <= 100)&&(DI.ESCRITURA >= 1 && DI.ESCRITURA <= 100)&&(DI.CONVERSACION >= 1 && DI.CONVERSACION <= 100)){
        console.log('SI ENTRO');
        
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
        console.log('HI');
        

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

  

  async getListaEscolaridades(CVE_EMPLEADO: any){
    console.log('cve',this.newRegistrarDatosEscolares.CVE_EMPLEADO );
    
    await this.datosEscolaresService.GetDatosEscolaresByCveEm(CVE_EMPLEADO).subscribe(
      res=>{
       
        this.listaEscolaridad = res;
        //this.listaEscolaridadLenght = Object.keys(this.listaEscolaridad).length;
        
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
        //this.listaIdiomasLenght = Object.keys(this.listaIdiomas).length;
        
        console.log(this.listaIdiomas);
        
      },
      err=>{
        console.log(err);
        
      }
    )



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

 async  capturarArchivo(event: any ){
    
    const archivo = event.target.files[0];
   
    this.extraerBase64(archivo).then((img: any) =>{
      this.previzualizacionDoc = img.base;
      console.log('previzuliazacion');
      this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:application/pdf;base64,","");
     /* if(event.target.files[0].type == 'image/png'){
        console.log('SOY PNG');
        this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/png;base64,","");

      }else{
        console.log('SOY JPEG');
        this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/jpeg;base64,","");
        
      }*/
      
     
      
      //
      //
      //this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.slice(22);

      //console.log(this.newRegisDocumentos);
      
      //console.log(this.previzualizacionDoc);
    
    });
  }


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


  async postDatosDocumentos(){
    console.log(this.newRegisDocumentos);
    
    //this.base64ToArrayFile(this.newRegisDocumentos.DOCUMENTO);


    await this.datosDocumentosService.addDocumento(this.newRegisDocumentos).subscribe(
      
      res=>{
        Swal.fire(
          'El REGISTRO FUE EXITOSO!',
          'Los datos fueron registrados',
          'success'
        )
        //alert("Datos registrados exitosamente");
        this.limpiarInputsDocs();
        this.getListaDocumentosCve(this.newRegisDocumentos.CVE_EMPLEADO);
        //this.getDocumentosByIdEnlace(this.newRegisDocumentos.IdEnlace);
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

  validacionInsertarDocumentos(){
    if(this.newRegisDocumentos.TIPO != 0 &&  this.newRegisDocumentos.DOCUMENTO != ''){
      console.log('con valores');
      this.postDatosDocumentos();
      

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


  async getListaDocumentosCve(CVE_EMPLEADO: any){
    await this.datosDocumentosService.getListaDocsByCveEmp(CVE_EMPLEADO).subscribe(
      res=>{
        this.listaDocsByCveEmp = res;
        
        console.log('listadocs',this.listaDocsByCveEmp); 
      },
      err=>{
        console.log(err);
        
      }
    )



  }


 
}
