import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public modal:NgbModal, public router:Router) { }

  ngOnInit(): void {

  }

  btnClickGoToRegistrarEmpleado(){
    alert("Bienvenido {{usuario.nombre}} {{usuario.apellidoP}}");
    this.router.navigateByUrl('registrar-persona');
    
  }

}
