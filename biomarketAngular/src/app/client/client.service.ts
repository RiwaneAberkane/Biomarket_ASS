import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = 'http://localhost:8080/api/v1/client/';
  private urlStatut = 'http://localhost:8080/api/v1/clientStatut/';
  private URLsearch = 'http://localhost:8080/api/v1/clientByMail/';
  private urlDeleteAllClient = 'http://localhost:8080/api/v1/allClient/'
  

  tabClients : any[] = [];

  
  //CONSTRUCTOR -----------------------

  constructor( private http : HttpClient) {
    this.getAll().subscribe(data => this.tabClients = data)
   }

  //CRUD ------------------------------

  getAllActive(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlStatut}/Actif`);
  }
  
  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}`);
  }
  get(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.url}${id}`);
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
    return this.http.delete(this.urlDeleteAllClient);
  }
  search(mail: String): Observable<Client> {
    return this.http.get<Client>(`${this.URLsearch}${mail}`);
  }
}
