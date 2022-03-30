import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-subir-docs',
  templateUrl: './modal-subir-docs.component.html',
  styleUrls: ['./modal-subir-docs.component.scss']
})
export class ModalSubirDocsComponent implements OnInit {

  constructor( public modal:NgbModal) { }

  ngOnInit(): void {
  }

}
