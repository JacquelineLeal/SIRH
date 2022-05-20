import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import {DatosEscolares, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import {Datos,DatosBuscarInputs, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import {DatosPersonalesTable ,DatosPDomComService } from '../../services/datos-p-dom-com.service';
import{DatosIdiomas ,IdiomasService} from '../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';

import { DomSanitizer } from '@angular/platform-browser';

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
  previzualizacionDoc: any = [];

  listaDocsByCveEmp : any = [];

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

  async abrirModalInfoPersonal(regisInfoPersonal: any, CVE_EMPLEADO: any){
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
    
  }

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
      alert('No hay datos para buscar');
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
    }
  }


  async getListaByCve(){
    await this.datosInicialesService.getListaNomSearchByCve(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
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

  async  postInfoEscolar(){
    await this.datosEscolaresService.addInfoEscolar(this.newRegistrarDatosEscolares).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        this.getListaEscolaridades(this.newRegistrarDatosEscolares.CVE_EMPLEADO);
       // this.getDatosEscolares(this.newRegistrarDatosEscolares.IdEnlace);
        //this.getInfoEscolar();

      },
      err => console.log(err)
      
    );
  }

  async postDatosIdiomas(){
    await this.datosIdiomasService.addIdiomas(this.newRegistrarIdiomas).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        this.getListaIdiomas(this.newRegistrarIdiomas.CVE_EMPLEADO);
        //this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
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

  capturarArchivo(event: any ){
    
    const archivo = event.target.files[0];
   
    this.extraerBase64(archivo).then((img: any) =>{
      this.previzualizacionDoc = img.base;
      console.log('previzuliazacion');
      this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/png;base64,","");
      this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.replace("data:image/jpeg;base64,","");
      //this.newRegisDocumentos.DOCUMENTO = this.previzualizacionDoc.slice(22);
      console.log(this.newRegisDocumentos);
      
      console.log(this.previzualizacionDoc);
    
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
        alert("Datos registrados exitosamente");
        this.getListaDocumentosCve(this.newRegisDocumentos.CVE_EMPLEADO);
        //this.getDocumentosByIdEnlace(this.newRegisDocumentos.IdEnlace);
        ///this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
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
