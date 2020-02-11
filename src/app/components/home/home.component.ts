import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../../services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi:DataApiService) { }
  public books=[];
  public book='';

  ngOnInit() {
    this.dataApi.getAllBooks().subscribe(books=>{//llamamos a getallbooks en data api service
      console.log('BOOKS',books);
      this.books=books;//asigno la respuesta de la promesa a nuestro array books
    })
  }

}
