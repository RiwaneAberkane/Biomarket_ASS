import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  private url = 'http://localhost:8080/api/v1/role/';
  private urlByName = 'http://localhost:8080/api/v1/roleByNom/';
  private urlDeleteAllRole = 'http://localhost:8080/api/v1/allFournisseur/'
  

  //CONSTRUCTOR -----------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}`);
  }
  get(id: any): Observable<Role> {
    return this.http.get<Role>(`${this.url}${id}`);
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
  findByNom(nom: String): Observable<Role> {
    return this.http.get<Role>(`${this.urlByName}${nom}`);
  }
}

