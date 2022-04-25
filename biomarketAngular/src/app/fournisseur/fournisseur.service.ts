import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from './fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private url = 'http://localhost:8080/api/v1/fournisseur/';
  private URLsearch = 'http://localhost:8080/api/v1/fournisseurByNom/';
  private urlDeleteAllRole = 'http://localhost:8080/api/v1/allRole/'
  

  //CONSTRUCTOR -----------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.url}`);
  }
  get(id: any): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.url}${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.url}${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDeleteAllRole);
  }
  search(nom: String): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.URLsearch}${nom}`);
  }
}
