import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../../services/data-api.service';
import { BookInterface } from './../../models/book';
import {ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(private dataApi:DataApiService,private route:ActivatedRoute) { }
  private book: BookInterface={};
  ngOnInit() {
    const idBook= this.route.snapshot.params['id'];//extraiga el parametro id
   this.getDetails(idBook);
  }

  getDetails(idBook:string):void{
    this.dataApi.getOneBook(idBook).subscribe(book=>{
      this.book=book;//asigno a mi book la respuesta de la funcion susbcribe(book)
    });
  }

}
