import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from './produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private url = 'http://localhost:8080/api/v1/produit/';
  private URLsearch = 'http://localhost:8080/api/v1/produitByNom/';
  private urlDeleteAllRole = 'http://localhost:8080/api/v1/allProduit/'
  

  tabProduit : any[] = [];
  //CONSTRUCTOR -----------------------

  constructor( private http : HttpClient) { 
    this.getAll().subscribe(data => this.tabProduit = data)
  }

  //CRUD ------------------------------
  
  getAllActive(): Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.url}/Actif`)
  }
  
  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.url}`);
  }
  get(id: any): Observable<Produit> {
    return this.http.get<Produit>(`${this.url}${id}`);
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
  search(nom: String): Observable<Produit> {
    return this.http.get<Produit>(`${this.URLsearch}${nom}`);
  }
}
