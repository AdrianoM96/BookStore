
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  /*viewchildbtnclose... uso para cerrar el modal despues de agregar o editar,esto seria en js con Jquery:('#btn').click();
  */
  @ViewChild('btnClose',{static:true}) btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }
/*NgForm da cuando editamos un elemento existente 
,ej un libro, el elemento id de ngForm devuelve el id 
del libro en cuestion,en caso de agregar devuelve indefinido
En este caso comprobamos null,porque en dataApiService a bookSelected se le asigna por defecto id=null*/
onSaveBook(bookForm: NgForm): void {
  if (bookForm.value.id == null) {
    // New 
    bookForm.value.userUid = this.userUid;
    this.dataApi.addBook(bookForm.value);
  } else {
    // Update
    this.dataApi.updateBook(bookForm.value);
  }
  bookForm.resetForm();//limpio el modal para despues de editar algun libro no queden datos
  this.btnClose.nativeElement.click();//al crear o editar se cierra el modal
}

}
