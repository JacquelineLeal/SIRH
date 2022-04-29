import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DatosEscolares, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import {Datos, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import {DatosPersonalesTable ,DatosPDomComService } from '../../services/datos-p-dom-com.service';


@Component({
  selector: 'app-registro-new-data',
  templateUrl: './registro-new-data.component.html',
  styleUrls: ['./registro-new-data.component.scss']
})
export class RegistroNewDataComponent implements OnInit {
  array:any ={
    
  }

  listaEstadoCivil: any = [];
  listaPaisNac: any = [];
  listaEstados: any = [];
  listaMunicipios: any = [];
  listaCiudades: any = [];

  listaDatosEscolares:any =[];
 
  listaNombresRegis: any = [];
  today : Date = new Date();
  date : any = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' +  this.today.getDate();
  //date: Date = new Date();

  arrayForInsertDatosPer: DatosPersonalesTable ={
    
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

    INFO_COMPLETA: 'NO'
  }

  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
    IdEnlace: '',
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

 

  constructor(
    public router:Router,
    public modal:NgbModal,
    public datosPDC: DatosPDomComService,
    private datosEscolaresService: DatosEscolaresServiService,
    private datosInicialesService: DatosInicialesExpedientesService
  ) { }

  ngOnInit(): void {  
    this.GetNombresRegistro();
    console.log(this.arrayForInsertDatosPer);
    
    console.log(this.newRegistrarDatosEscolares);
    
    
    this.GetDataestadoCivil();
    this.GetDatapaisNac();
    this.GetDataEstados();
    this.GetDataMunicipios();
    this.GetDataCiudades();
    
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

  abrirModalInfoIdiomas(regisInfoIdiomas: any){
    this.modal.open(regisInfoIdiomas,{size:'xl'});
  }

  abrirModalSubirDocumentos(subirDocumentos: any){
    this.modal.open(subirDocumentos,{size: 'xl'});

  }

  abrirModalConfirmacionCapData(confirmacionRegistros: any){
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

  async PostNombresDatosPerDomCom(){
    await this.datosPDC.agregarNombreDP(this.arrayForInsertDatosPer).subscribe(
      res=>{

        console.log(res);
        this.GetNombresRegistro();
        this.arrayForInsertDatosPer.NOMBRE = '';
        this.arrayForInsertDatosPer.APE_PATERNO= '';
        this.arrayForInsertDatosPer.APE_MATERNO = '';
        
        
      },
      err =>{
        console.log(err);
        alert("Se ha generado un error, favor de intentarlo de nuevo");
        
      }
      
    )
  }

  async clickBtnRegistroInfoP(regisInfoPersonal: any, Id:any, NOMBRE:any, APE_PATERNO:any,APE_MATERNO:any, FECHA_REGISTRO_DATA_PERSONAL:any, INFO_COMPLETA:any, FCH_UAC:any){
    //await this.limpiarInputsRegistroIPDC(); 
    this.datosInicialesService.newRegistrarDatos.Id = Id;
    this.datosInicialesService.newRegistrarDatos.NOMBRE = NOMBRE;
    this.datosInicialesService.newRegistrarDatos.APE_PATERNO = APE_PATERNO;
    this.datosInicialesService.newRegistrarDatos.APE_MATERNO = APE_MATERNO;
    this.datosInicialesService.newRegistrarDatos.FECHA_REGISTRO_DATA_PERSONAL = FECHA_REGISTRO_DATA_PERSONAL;
    this.datosInicialesService.newRegistrarDatos.INFO_COMPLETA = INFO_COMPLETA;
    this.datosInicialesService.newRegistrarDatos.FCH_UAC = FCH_UAC;
    this.modal.open(regisInfoPersonal,{size:'xl'});
    

     
    
    console.log(Id);
    console.log(NOMBRE);
      
      
    

  }

  async clickBtnGuardarInfoModalRegisIP(){
   
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
    //this.datosInicialesService.newRegistrarDatos = this.datosInicialesService.limpiarInputsRegistro;

  }




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

  async getDatosEscolares(IdEnlace: any){
    await this.datosEscolaresService.GetDatosEscolares(IdEnlace).subscribe(
      res =>{
        this.listaDatosEscolares = res;
        console.log(this.listaDatosEscolares);
      }
    )
  }

 async  postInfoEscolar(){
    await this.datosEscolaresService.addInfoEscolar(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        this.getDatosEscolares(this.newRegistrarDatosEscolares.IdEnlace);
        //this.getInfoEscolar();

      },
      err => console.log(err)
      
    );
  }



}
