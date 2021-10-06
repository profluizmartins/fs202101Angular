import { ConfirmDeleteComponent } from './../../../template/confirm-delete/confirm-delete.component';
import { HotelService } from './../../../../service/hotel.service';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hoteis: Hotel[] = [];
  displayedColumns: string[] = ['id', 'nome', 'endereco', 'estrelas', 'acao'];
  constructor(
    private service : HotelService,
    private dialog: MatDialog
  ) { }

  atualizarDados(): void {
    this.service.findAll().subscribe(hoteis => {
      this.hoteis = hoteis;
    });
  }

  ngOnInit(): void {
    this.atualizarDados();
  }

  excluir(hotel: Hotel): void{

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: `Deseja realmente excluir o hotel ${hotel.nmHotel}?`,
        buttonText: {
          ok: 'Excluir',
          cancel: 'Desistir'
        }
      }
    })

    dialogRef.afterClosed().subscribe((confirm: boolean) =>{
      if(confirm){
        this.service.delete(hotel).subscribe(() => {
          this.service.showMessage("Hotel excluído com sucesso!");
          this.atualizarDados();
        });
      }
    })
    
  }

}
