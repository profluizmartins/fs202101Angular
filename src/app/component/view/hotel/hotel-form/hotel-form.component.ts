import { HotelService } from './../../../../service/hotel.service';
import { Hotel } from './../../../../model/hotel.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  titulo: string = "Cadastrar novo Hotel";

  hotel: Hotel = {
    nmHotel : "",
    endereco: "",
    qtdEstrelas: 0
  }

  constructor(
    private service: HotelService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.service.create(this.hotel).subscribe(() =>{
      this.service.showMessage("Hotel cadastro com sucesso!")
      this.router.navigate(['/hoteis']);
    });
  }

}
