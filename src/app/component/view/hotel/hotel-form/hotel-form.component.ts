import { HotelService } from './../../../../service/hotel.service';
import { Hotel } from './../../../../model/hotel.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  public titulo: string = "Cadastrar novo Hotel";

  public hotel: Hotel = {
    nmHotel : "",
    endereco: "",
    qtdEstrelas: 0
  }

  public formulario: FormGroup;

  constructor(
    private service: HotelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nmHotel: new FormControl(null, Validators.required),
      endereco: new FormControl(null, Validators.required),
      qtdEstrelas: new FormControl(null, [
                                          Validators.required,
                                          Validators.min(1),
                                          Validators.max(5)
                                          ])
    });
  }

  salvar(): void {
    if(this.formulario.valid){
      this.service.create(this.formulario.value).subscribe(() =>{
        this.service.showMessage("Hotel cadastro com sucesso!")
        this.router.navigate(['/hoteis']);
      },
      err => {
        this.service.showMessage("Não foi possível cadastrar hotel", true)
      });
    }else{
      this.service.showMessage("Preencha corretamente os campos destacados", true);
    }
    
  }

}
