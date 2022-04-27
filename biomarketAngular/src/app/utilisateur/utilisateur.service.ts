import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from './utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  private url = 'http://localhost:8080/api/v1/utilisateur/';
  private urlByNameRole =  'http://localhost:8080/api/v1/utilisateurByNameRole/';
  private urlUserByRoleNom = 'http://localhost:8080/api/v1/utilisateurByNom/';
  private urlDeleteAll = 'http://localhost:8080/api/v1/allUtilisateur/'
  private urlByLogin = 'http://localhost:8080/api/v1/utilisateurByLogin/';
  private urlByLoginAndMdp = 'http://localhost:8080/api/v1/utilisateurByLogin/';


  
  //CONSTRUCTOR -----------------------

  constructor( private http : HttpClient) { }

  //CRUD ------------------------------
  
  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.url}`);
  }
  get(id: any): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.url}${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.urlByNameRole, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.urlUserByRoleNom}${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDeleteAll);
  }
  findByLogin(login: String): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.urlByLogin}${login}`);
  }

  findByLoginAndMdp(login : any, mdp: any): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.urlByLoginAndMdp}${login}/${mdp}`);
  }
}
