import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitVente } from './produit-vente';

@Injectable({
  providedIn: 'root'
})
export class ProduitVenteService {
  private url = 'http://localhost:8080/api/v1/produitVente/';
  private urlCommandeProduitByName =  'http://localhost:8080/api/v1/produitVenteByName/';
  private urlCommandeProduitByNom = 'http://localhost:8080/api/v1/produitVenteByName/';
  private urlDeleteAll = 'http://localhost:8080/api/v1/allProduitVente/'
  private urlByDate = 'http://localhost:8080/api/v1/produitVenteByAllDate/';
  private urlByNumero = 'http://localhost:8080/api/v1/produitVenteByNumero/';

  
  //CONSTRUCTOR -----------------------------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<ProduitVente[]> {
    return this.http.get<ProduitVente[]>(`${this.url}`);
  }
  // get(id: any): Observable<ProduitVente> {
  //   return this.http.get<ProduitVente>(`${this.url}${id}`);
  // }

  get(numero: any): Observable<ProduitVente> {
    return this.http.get<ProduitVente>(`${this.urlByNumero}${numero}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.urlCommandeProduitByName, data);
  }
  update(numero: any, data: any): Observable<any> {
    return this.http.put(`${this.urlByNumero}${numero}`, data);
  }
  delete(numero: any): Observable<any> {
    return this.http.delete(`${this.url}${numero}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDeleteAll);
  }
  findByDate(date: any): Observable<ProduitVente> {
    return this.http.get<ProduitVente>(`${this.urlByDate}${date}`);
  }
}
