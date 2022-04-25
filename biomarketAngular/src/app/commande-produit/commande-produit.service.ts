import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandeProduit } from './commande-produit';

@Injectable({
  providedIn: 'root'
})
export class CommandeProduitService {
  private url = 'http://localhost:8080/api/v1/commandeProduit/';
  private urlCommandeProduitByName =  'http://localhost:8080/api/v1/commandeProduitByName/';
  private urlCommandeProduitByNumero = 'http://localhost:8080/api/v1/commandeProduitByNumero/';
  private urlDeleteAll = 'http://localhost:8080/api/v1/allCommandeproduit/'
  private urlByDate = 'http://localhost:8080/api/v1/commandeProduitByDate/';
  private urlBynumero = 'http://localhost:8080/api/v1/commandeProduitByNumero/'

  
  //CONSTRUCTOR -----------------------------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<CommandeProduit[]> {
    return this.http.get<CommandeProduit[]>(`${this.url}`);
  }
  // get(id: any): Observable<CommandeProduit> {
  //   return this.http.get<CommandeProduit>(`${this.url}${id}`);
  // }

    get(numero: any): Observable<CommandeProduit> {
    return this.http.get<CommandeProduit>(`${this.urlBynumero}${numero}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.urlCommandeProduitByName, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.urlCommandeProduitByNumero}${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDeleteAll);
  }
  findByDate(date: any): Observable<CommandeProduit> {
    return this.http.get<CommandeProduit>(`${this.urlByDate}${date}`);
  }
}
