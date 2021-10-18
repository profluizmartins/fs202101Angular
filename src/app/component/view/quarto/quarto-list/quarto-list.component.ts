import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/component/template/confirm-delete/confirm-delete.component';
import { Quarto } from 'src/app/model/quarto.model';
import { QuartoService } from 'src/app/service/quarto.service';

@Component({
  selector: 'app-quarto-list',
  templateUrl: './quarto-list.component.html',
  styleUrls: ['./quarto-list.component.css']
})
export class QuartoListComponent implements OnInit {

  quartos: Quarto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'numero', 'categoria', 'diaria', 'acao'];
  constructor(
    private service : QuartoService,
    private dialog: MatDialog
  ) { }

  atualizarDados(): void {
    this.service.findAll().subscribe(quartos => {
      this.quartos = quartos;
    });
  }

  ngOnInit(): void {
    this.atualizarDados();
  }

  excluir(quarto: Quarto): void{

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: `Deseja realmente excluir o quarto ${quarto.nrQuarto}?`,
        buttonText: {
          ok: 'Excluir',
          cancel: 'Desistir'
        }
      }
    })

    dialogRef.afterClosed().subscribe((confirm: boolean) =>{
      if(confirm){
        this.service.delete(quarto).subscribe(() => {
          this.service.showMessage("Quarto excluído com sucesso!");
          this.atualizarDados();
        });
      }
    })
    
  }
}
