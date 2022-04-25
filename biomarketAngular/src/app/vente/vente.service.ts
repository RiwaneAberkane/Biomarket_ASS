import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vente } from './vente';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private url = 'http://localhost:8080/api/v1/vente/';
  private urlByNameVente =  'http://localhost:8080/api/v1/venteByName/';
  private urlUserByVenteNom = 'http://localhost:8080/api/v1/venteByName/';
  private urlDeleteAll = 'http://localhost:8080/api/v1/allVenteallCommande/'
  private urlByLogin = 'http://localhost:8080/api/v1/venteByDate/';

  
  //CONSTRUCTOR -----------------------------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.url}`);
  }
  get(id: any): Observable<Vente> {
    return this.http.get<Vente>(`${this.url}${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.urlByNameVente, data);
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
  findByDate(date: any): Observable<Vente> {
    return this.http.get<Vente>(`${this.urlByLogin}${date}`);
  }
}
