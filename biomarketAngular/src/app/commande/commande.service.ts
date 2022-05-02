import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from './commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private url = 'http://localhost:8080/api/v1/commande/';
  private urlCommandeByName =  'http://localhost:8080/api/v1/commandeByName/';
  private urlUserByVenteNom = 'http://localhost:8080/api/v1/commandeByName/';
  private urlDeleteAll = 'http://localhost:8080/api/v1/allCommande/'
  private urlSearchByDate = 'http://localhost:8080/api/v1/commandeByDate/';

  
  //CONSTRUCTOR -----------------------------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.url}`);
  }
  get(id: any): Observable<Commande> {
    return this.http.get<Commande>(`${this.url}${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.urlCommandeByName, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.urlUserByVenteNom}${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDeleteAll);
  }
  findByDate(date: any): Observable<Commande> {
    return this.http.get<Commande>(`${this.urlSearchByDate}${date}`);
  }
}

