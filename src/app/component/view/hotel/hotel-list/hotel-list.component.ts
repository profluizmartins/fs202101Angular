import { ConfirmDeleteComponent } from './../../../template/confirm-delete/confirm-delete.component';
import { HotelService } from './../../../../service/hotel.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {merge, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements AfterViewInit {

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  hoteis: Hotel[] = [];
  displayedColumns: string[] = ['id', 'nmHotel', 'endereco', 'estrelas', 'acao'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private service : HotelService,
    private dialog: MatDialog
  ) { }

  /*atualizarDados(): void {
    this.service.findAll().subscribe(hoteis => {
      this.hoteis = hoteis;
      if(this.hoteis.length == 0){
        this.service.showMessage("Não há nenhum hotel cadastrado.");
      }
    });
  }

  ngOnInit(): void {
    this.atualizarDados();
  }*/

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
        //  this.atualizarDados();
        },
        err => {
          this.service.showMessage("Não foi possível excluir hotel", true)
        });
      }else{
        this.service.showMessage("Operação de exclusão de hotel cancelada!");
      }
    })
    
  }

  ngAfterViewInit() {
   
    

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
        
          this.isLoadingResults = true;
          return this.service.findPaginator(
              this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
         console.log(data)
          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;
          return data.content;
        })
      ).subscribe(data => this.hoteis = data);
  }
  

}




export interface HotelApi {
  content: Hotel[];
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  //sort: string,
  //order: SortDirection
}

