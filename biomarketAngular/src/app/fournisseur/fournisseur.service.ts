import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from './fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private url = 'http://localhost:8080/api/v1/fournisseur/';
  private urlStatut= 'http://localhost:8080/api/v1/fournisseurStatut/';
  private URLsearch = 'http://localhost:8080/api/v1/fournisseurByNom/';
  private URLsearchByMail = 'http://localhost:8080/api/v1/fournisseurByMail/';
  private urlDeleteAllFournisseur = 'http://localhost:8080/api/v1/allFournisseur/'
  

  tabFournisseur : any[] = []
  
  //CONSTRUCTOR -----------------------


  constructor( private http : HttpClient) {
    this.getAll().subscribe(data => this.tabFournisseur = data)
  }

  //CRUD ------------------------------
  
  
  getAllActive(): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(`${this.urlStatut}/Actif`)
  }

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
    return this.http.delete(this.urlDeleteAllFournisseur);
  }
  search(nom: String): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.URLsearch}${nom}`);
  }

  searchByMail(mail: String): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.URLsearchByMail}${mail}`);
  }
}
