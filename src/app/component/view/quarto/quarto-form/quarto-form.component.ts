import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaQuarto } from 'src/app/enum/categoriaQuarto.enum';
import { Hotel } from 'src/app/model/hotel.model';
import { Quarto } from 'src/app/model/quarto.model';
import { HotelService } from 'src/app/service/hotel.service';
import { QuartoService } from 'src/app/service/quarto.service';


@Component({
  selector: 'app-quarto-form',
  templateUrl: './quarto-form.component.html',
  styleUrls: ['./quarto-form.component.css']
})
export class QuartoFormComponent implements OnInit {

  titulo: String = "Cadastrar novo quarto";
 

   quarto : Quarto = {
    categoriaQuarto :  CategoriaQuarto.PADRAO,
    hotel:  {
      nmHotel : "",
      endereco: "",
      qtdEstrelas: 0
    },
    qtdLeito: 0,
    prDiaria: 0.0,
    nrQuarto: 0
  }

  public categorias = Object.values(CategoriaQuarto);
  public hoteis : Hotel[] = [];



  constructor(private router: Router,
    private service: QuartoService,
    private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.findAll().subscribe(hoteis =>{
      this.hoteis = hoteis;
    });
  }

  salvar(): void {
    this.service.create(this.quarto).subscribe(() =>{
      this.service.showMessage("Quarto cadastro com sucesso!")
      this.router.navigate(['/quartos']);
    },
    err => {
      this.service.showMessage("Não foi possível cadastrar quarto")
    });
  }



}
