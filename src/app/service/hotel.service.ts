import { Hotel } from './../model/hotel.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  urlBase: string = "http://localhost:8080/hoteis";
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'Fechar',
    {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: isError ? ['msg-error'] : ['msg-success']
    }
    )
  }

  // CREATE
  create(hotel: Hotel) : Observable<Hotel>{
    return this.http.post<Hotel>(this.urlBase, hotel);
  }

  // READ
    // findAll
    findAll() : Observable<Hotel[]> {
        return this.http.get<Hotel[]>(this.urlBase);
    }
    // findById
    findById(id: string ) : Observable<Hotel>{
      let url = `${this.urlBase}/${id}`;
      return this.http.get<Hotel>(url);
    }

  // UPDATE
  update(hotel: Hotel) : Observable<Hotel>{
    return this.http.put<Hotel>(this.urlBase, hotel);
  }


  // DELETE

  delete(hotel: Hotel): Observable<Hotel>{
    let url = `${this.urlBase}/${hotel.idHotel}`;
    console.log(url);
    return this.http.delete<Hotel>(url);
  }
}
