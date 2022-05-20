import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Datos, DatosBuscarInputs, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import {DatosEscolares,TraerInfoEscolar, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import{DatosIdiomas ,IdiomasService} from '../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-consulto-new-data',
  templateUrl: './consulto-new-data.component.html',
  styleUrls: ['./consulto-new-data.component.scss']
})
export class ConsultoNewDataComponent implements OnInit {

 
  listaPersonas: any = [];
  nombreCompleto ='';
  numEmpleado = '';

  listaIdiomas: any = [];
  listaEscolaridad: any =[];
  listaDocsByCveEmp : any = [];

  previzualizacionDoc: any = [];

  datosPersonales: any = [];
  datosDomicilio: any = [];
  datosComplementarios: any = [];

  todosLosDatos: any =[];


  listaIdiomasLenght: any;
  listaEscolaridadLenght: any;
  datosPersonalesLenght: any ;
  datosDomicilioLenght: any ;
  datosComplementariosLenght: any;



  valoresInputBusqueda: DatosBuscarInputs={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
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



  constructor(
    public router: Router,
    public modal: NgbModal,
    private datosInicialesService: DatosInicialesExpedientesService,
    private datosEscolaresService: DatosEscolaresServiService,
    private datosIdiomasService : IdiomasService,
    private datosDocumentosService : DocumentosService,
    private sanitizer : DomSanitizer

  ) { }

  ngOnInit(): void { 

   
  }

  async abrirModalVerInfoGeneral(verInfoGeneral: any, CVE_EMPLEADO: any){
   // await this.LlenarTodasListas(CVE_EMPLEADO);
    await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
      res=>{
        this.datosPersonales = res;
        this.bufferToBase64ImageSourceRegisAnteriores(this.datosPersonales[0].FRONTAL.data);
        
        console.log(this.datosPersonales);
        this.datosPersonalesLenght = Object.keys(this.datosPersonales).length;

        this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
          resDom=>{
            this.datosDomicilio = resDom;
            console.log(this.datosDomicilio);
            this.datosDomicilioLenght = Object.keys(this.datosDomicilio).length;
            

            this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
              resCom=>{
                this.datosComplementarios = resCom;
                console.log(this.datosComplementarios);
                this.datosComplementariosLenght = Object.keys(this.datosComplementarios).length;

                this.datosEscolaresService.GetDatosEscolaresByCveEm(CVE_EMPLEADO).subscribe(
                  resEsc=>{
                  
                    this.listaEscolaridad = resEsc;
                    this.listaEscolaridadLenght = Object.keys(this.listaEscolaridad).length;
                    
                    console.log(this.listaEscolaridad);
                    this.datosIdiomasService.getIdiomasByCveEmp(CVE_EMPLEADO).subscribe(
                      resIdio=>{
                      
                        this.listaIdiomas = resIdio;
                        this.listaIdiomasLenght = Object.keys(this.listaIdiomas).length;
                        this.modal.open(verInfoGeneral,{size:'xl'});
                        console.log(this.listaIdiomas);
                        
                      },
                      err=>{
                        console.log(err);
                        
                      }
                    )
                    
                  },
                  err=>{
                    console.log(err);
                    
                  }
                )

              },
              err=>{
                console.log(err);
                
              }
            )
          },
          err=>{
            console.log(err);
            
          }
        )

      },
      err=>{
        console.log(err);
        
      }
    )
  

    //this.modal.open(verInfoGeneral,{size:'xl'});
  }

  abrirModalVerDocumentos(verDocs: any,NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any, CVE_EMPLEADO: any){
    this.nombreCompleto = NOMBRE + ' ' + APE_PATERNO +' '+ APE_MATERNO;
    this.numEmpleado = CVE_EMPLEADO;
    this.getListaDocumentosCve(CVE_EMPLEADO);

    this.modal.open(verDocs,{size:'xl'});

  }

  openDescargar(contDescargarDocs:any, documento:any){
    if(documento.TIPO_INSERCION === null){
      console.log('soy null', documento.TIPO_INSERCION);
      this.bufferToBase64ImageSourceRegisAnteriores(documento.DOCUMENTO.data);
      
      

    }else{
      console.log('no soy null', documento.TIPO_INSERCION);
      this.bufferToBase64ImageSourceNewRegis(documento.DOCUMENTO.data);
      

    }


    this.modal.open(contDescargarDocs,{size:'xl'});

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

  //--------------------------------
  async traerDatosP_Dom_DC(CVE_EMPLEADO:any){
    await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
      res=>{
        this.datosPersonales = res;
        console.log(this.datosPersonales);
        

        this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
          resDom=>{
            this.datosDomicilio = resDom;
            console.log(this.datosDomicilio);
            

            this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
              resCom=>{
                this.datosComplementarios = resCom;
                console.log(this.datosComplementarios);
              },
              err=>{
                console.log(err);
                
              }
            )
          },
          err=>{
            console.log(err);
            
          }
        )

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
        this.listaEscolaridadLenght = Object.keys(this.listaEscolaridad).length;
        
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
        this.listaIdiomasLenght = Object.keys(this.listaIdiomas).length;
        
        console.log(this.listaIdiomas);
        
      },
      err=>{
        console.log(err);
        
      }
    )



  }


  async getDatosPersonales(CVE_EMPLEADO: any){
    await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
      res=>{
        this.datosPersonales = res;
        console.log(this.datosPersonales);
        this.datosPersonalesLenght = Object.keys(this.datosPersonales).length;
        
       // this.todosLosDatos.push(this.datosPersonales[0]);
      },
      err=>{
        console.log(err);
        
      }
    )

  }

  async getDatosDomicilio(CVE_EMPLEADO: any){
    
   await  this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
      resDom=>{
        this.datosDomicilio = resDom;
        console.log(this.datosDomicilio);
        this.datosDomicilioLenght = Object.keys(this.datosDomicilio).length;
        //this.todosLosDatos.push(this.datosDomicilio);
      },
      err=>{
        console.log(err);
        
      }
    )

  }

  async getDatosComplementarios(CVE_EMPLEADO: any){
    await this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
      resCom=>{
        this.datosComplementarios= resCom;
        console.log(this.datosComplementarios);
        this.datosComplementariosLenght = Object.keys(this.datosComplementarios).length;
       // this.todosLosDatos.push(this.datosComplementarios);
      },
      err=>{
        console.log(err);
        
      }
    )
    
  }

  async LlenarTodasListas(CVE_EMPLEADO:any){
   
    await this.getDatosPersonales(CVE_EMPLEADO);
    await this.getDatosDomicilio(CVE_EMPLEADO);
    await this.getDatosComplementarios(CVE_EMPLEADO);
    await this.getListaEscolaridades(CVE_EMPLEADO);
    await this.getListaIdiomas(CVE_EMPLEADO);
    
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
    
    console.log('data:image/jpg;base64, ');
    console.log(Datos);
    var quita1er = Datos.slice(1);
    console.log('bytes', Bytes);
    

    console.log('quitar', quita1er);
    
    //AQUI SE LE PASA BASE64STRING EN VEZ DE QUITA1ER SE PUEDE PONER UN IF 
    this.previzualizacionDoc = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + quita1er);
    console.log('buffertobase');
    
    console.log(this.previzualizacionDoc);
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + quita1er);
  }



  downloadImage() {
 
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.previzualizacionDoc);
      link.setAttribute("download", "mrHankey.jpg");
      link.click();
  }





}
