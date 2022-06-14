import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {Datos, IdsParaEditarDataPD, DatosInicialesExpedientesService} from '../../../services/datos-iniciales-expedientes.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-form-registro-datos-personales',
  templateUrl: './form-registro-datos-personales.component.html',
  styleUrls: ['./form-registro-datos-personales.component.scss']
})
export class FormRegistroDatosPersonalesComponent implements OnInit {

  date: Date = new Date();
  newRegistrarDatos: any = this.datosInicialesService.newRegistrarDatos;
  listaEstadoCivil: any = this.datosInicialesService.listaEstadoCivil;
  listaPaisNac: any = this.datosInicialesService.listaPaisNac;
  listaEstados: any = this.datosInicialesService.listaEstados;
  listaMunicipios: any = this.datosInicialesService.listaMunicipios;
  listaCiudades: any = this.datosInicialesService.listaCiudades;
  listaTiposSangre = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];

  arreglo:any = {};
  value: any ='';
  value2: any = '';
  arregloIdsParaTraerInfo: IdsParaEditarDataPD = {
    Id : this.datosInicialesService.Id,
    IdDomicilio: this.datosInicialesService.IdDomicilio,
    IdEstudios: this.datosInicialesService.IdEstudios
  }

  //VARIABLES PARA MANDAR LOS VALORES DE LOS INPUTS AL COMPONENTE DE REGISTRO
  @Input() valorInputRegistro: any = {};
  @Output() valorOutputRegistro = new EventEmitter<any>();

  @Input() valorInputEditarDatosIni: any = {};
  @Output() valorOutputEditarDatosIni = new EventEmitter<any>();


  constructor(
    public router:Router, 
    public datosInicialesService: DatosInicialesExpedientesService, 
    public cookieService: CookieService
  ) { }

  ngOnInit(): void {
    console.log('oninitregis');
    console.log(this.newRegistrarDatos);


    if(this.newRegistrarDatos.NOMBRE === ''){
      console.log('vacio');
      this.guardarDatosInputs();
      

    }else{
      console.log('con data', this.newRegistrarDatos);
      this.newRegistrarDatos =  this.datosInicialesService.newRegistrarDatos;
      this.guardarDatosInputs();

    }

  }


  guardarDatosInputs(){
    this.valorInputRegistro = this.newRegistrarDatos;
    this.valorOutputRegistro.emit(this.valorInputRegistro);
    this.datosInicialesService.ValoresInputsRegistroDataPD = this.valorInputRegistro; 
    //this.datosInicialesService.ValoresInputsRegistroDataPD.TELEFONO = this.newRegistrarDatos.TELEFONO.toString();
  }
  
}
