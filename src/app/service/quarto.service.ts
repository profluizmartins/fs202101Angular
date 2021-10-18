import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Quarto } from '../model/quarto.model';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {

  urlBase: string = "http://localhost:8080/quartos";
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
  create(quarto: Quarto) : Observable<Quarto>{
    return this.http.post<Quarto>(this.urlBase, quarto);
  }

  // READ
    // findAll
    findAll() : Observable<Quarto[]> {
        return this.http.get<Quarto[]>(this.urlBase);
    }
    // findById
    findById(id: string ) : Observable<Quarto>{
      let url = `${this.urlBase}/${id}`;
      return this.http.get<Quarto>(url);
    }

  // UPDATE
  update(quarto: Quarto) : Observable<Quarto>{
    return this.http.put<Quarto>(this.urlBase, quarto);
  }


  // DELETE

  delete(quarto: Quarto): Observable<Quarto>{
    let url = `${this.urlBase}/${quarto.idQuarto}`;
    console.log(url);
    return this.http.delete<Quarto>(url);
  }
}
