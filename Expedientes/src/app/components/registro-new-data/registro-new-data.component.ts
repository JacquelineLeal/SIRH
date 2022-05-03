import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {DatosEscolares, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import {Datos, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import {DatosPersonalesTable ,DatosPDomComService } from '../../services/datos-p-dom-com.service';
import{DatosIdiomas ,IdiomasService} from '../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';

import { DomSanitizer } from '@angular/platform-browser';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
@Component({
  selector: 'app-registro-new-data',
  templateUrl: './registro-new-data.component.html',
  styleUrls: ['./registro-new-data.component.scss']
})
export class RegistroNewDataComponent implements OnInit {
  array:any ={
    
  }

  archivoCapturado: any= [];
  previzualizacionDoc: any = [];
  xd: any =[];
  tipo ='';
  fileUrl: any;
  salida: any =[];

  listaEstadoCivil: any = [];
  listaPaisNac: any = [];
  listaEstados: any = [];
  listaMunicipios: any = [];
  listaCiudades: any = [];

  listaDatosEscolares:any =[];
  listaDatosIdiomas: any = [];
 
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
    CONSECUTIVO: 1,
    TIPO: 1,
    DOCUMENTO: null,
    FCH_REGISTRO: this.date,
    IdEnlace: 0,
    IdDocumentos: 0,

    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
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
    private datosInicialesService: DatosInicialesExpedientesService,
    private datosIdiomasService : IdiomasService,
    private datosDocumentosService : DocumentosService,
    private sanitizer : DomSanitizer
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
    this.newRegisDocumentos.DOCUMENTO = undefined;
    this.newRegisDocumentos.IdEnlace = Id;
    this.newRegisDocumentos.NOMBRE = NOMBRE;
    this.newRegisDocumentos.APE_PATERNO = APE_PATERNO;
    this.newRegisDocumentos.APE_MATERNO = APE_MATERNO;
        
    this.getImagen();
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

  async getImagen(){
    
    await this.datosIdiomasService.getImagen().subscribe(
      res=>{
        this.xd = res;
       // console.log(this.xd[0].PIZQUIERDO.type);
        
        //this.arrayBufferToBase64(this.xd[0].PIZQUIERDO, 'jpg')
       // console.log(this.previzualizacionDoc);
        
        //this.previzualizacionDoc = archivo;
        this.previzualizacionDoc = this.xd[0];
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


  async getDatosIdiomas(IdEnlace: any){
    await this.datosIdiomasService.getIdiomasById(IdEnlace).subscribe(
      res=>{
        this.listaDatosIdiomas = res;
        console.log(this.listaDatosIdiomas);
      }
    )
  }

  async postDatosIdiomas(){
    await this.datosIdiomasService.addIdiomas(this.newRegistrarIdiomas).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  async postDatosDocumentos(){
    console.log(this.newRegisDocumentos);
    
    //this.base64ToArrayFile(this.newRegisDocumentos.DOCUMENTO);


    await this.datosDocumentosService.addDocumento(this.newRegisDocumentos).subscribe(
      res=>{
        alert("Datos registrados exitosamente");
        ///this.getDatosIdiomas(this.newRegistrarIdiomas.IdEnlace);
      },
      err=>{
        alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  capturarArchivo(event: any ){
    const archivo = event.target.files[0];
    
    this.extraerBase64(archivo).then((img: any) =>{
      this.previzualizacionDoc = img.base;
      //this.newRegisDocumentos.DOCUMENTO=img.base;
      console.log(this.previzualizacionDoc);
    });
   
    this.archivoCapturado = event.target.files[0].blob;
    //this.archivoCapturado.push(event.target.files[0]);
    //this.newRegisDocumentos.DOCUMENTO = this.archivoCapturado;
    console.log('target');
    
    console.log(this.archivoCapturado);
  }
  click2(){
    console.log(this.previzualizacionDoc.DOCUMENTO.data);
    
    
    this.extraerBase64(this.previzualizacionDoc.DOCUMENTO.data).then((img: any) =>{
      this.salida = img.base;
      //this.newRegisDocumentos.DOCUMENTO=img.base;
     
    });
    console.log('prevClick2:',this.salida);
    //this.getImagen();
    //this.base64ToArrayFile(this.previzualizacionDoc);
  }

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

 /* crearArrayBuffer(imagen: any){
    imagen = new ArrayBuffer(8);
    const view = new Int32Array(imagen)
    console.log('imagen crear array');
    
    console.log(imagen);
  }*/

  base64ToArrayFile(base64:any) {
    const binary_string = base64;
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for(var i = 0; i<len; i++){
      bytes[i] = binary_string.charCodeAt(i);
    }
    //this.newRegisDocumentos.DOCUMENTO = bytes.buffer;
    console.log('base64toarra');
    
    console.log(atob(base64));
    
    return bytes.buffer;
  /*  const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    return (fetch(dataURL)
      .then(function (result) {
        const yaListo = result.arrayBuffer();
        console.log('Listo');
        console.log(yaListo);
        
        return result.arrayBuffer();
    }));*/
  }


 arrayBufferToBase64(Arraybuffer: any, Filetype: any) {
  let binary = '';
  const bytes = new Uint8Array(Arraybuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const file = window.btoa(binary);
  const mimType = Filetype === 'pdf' ? 'application/pdf' : Filetype === 'xlsx' ? 'application/xlsx' :
    Filetype === 'pptx' ? 'application/pptx' : Filetype === 'csv' ? 'application/csv' : Filetype === 'docx' ? 'application/docx' :
      Filetype === 'jpg' ? 'application/jpg' : Filetype === 'png' ? 'application/png' : '';
  const url = `data:${mimType};base64,` + file;

  // url for the file
  this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  // download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'holi'//fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

clickk(){
 
  this.bufferToBase64ImageSource(this.xd[0].DOCUMENTO.data);
 // this.base64ToArrayBuffer(this.previzualizacionDoc);
  console.log('click');
  
  
}

 /*base64ToArrayBuffer(base64: any) {
  let binaryString = window.btoa(base64);
  let binaryLength = binaryString.length;
  let bytes = new Uint8Array(binaryLength);

  for (let i = 0; i < binaryLength; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
  }
  return bytes;
   
}*/



bufferToBase64ImageSource(buffer: any) {

  const base64String = btoa(new Uint8Array(buffer).reduce((data, byte)=> {
   // console.log(data + String.fromCharCode(byte));
    
    return data + String.fromCharCode(byte);
  }, ''));

  console.log('data:image/jpg;base64, ');
  this.previzualizacionDoc = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
  console.log(this.previzualizacionDoc);
  
  

  return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
}


/*async extraerBufferArray ($event: any){
  const reader = new FileReader(); 
  reader.readAsArrayBuffer($event);


  reader.onload = () =>{
    const arrayBuffer = new Uint8Array(reader);
    console.log(arrayBuffer);
    
      //base:reader.result
  };
  

}*/


extraerBufferArray = async($event: any) => new Promise((resolve, reject)=>{
  try{
    
    const reader = new FileReader();
    const ab = $event.ArrayBuffer();
   // reader.readAsArrayBuffer($event);
   

   // reader.readAsDataURL($event);
    reader.onload = () =>{
      resolve({
        arrayBuffer: new Uint8Array(ab),
        //base:reader.result
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


 base64ToBufferAsync(base64:any) {
  var dataUrl = "data:application/octet-binary;base64," + base64;

  fetch(dataUrl)
    .then(res => res.arrayBuffer())
    .then(buffer => {
      console.log("base64 to buffer: " + new Uint8Array(buffer));
    })
}



}
