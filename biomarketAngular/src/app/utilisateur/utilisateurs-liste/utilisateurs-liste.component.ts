import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-utilisateurs-liste',
  templateUrl: './utilisateurs-liste.component.html',
  styleUrls: ['./utilisateurs-liste.component.scss']
})
export class UtilisateursListeComponent implements OnInit {

  utilisateurs?: Utilisateur;
  tabUtilisateur : Utilisateur[] = [];
 

  currentUtilisateur: Utilisateur = {
    utilisateur_id: '',
    login : '',
    mdp : '',
    nom : '',
    prenom :'',
    telephone : '',
    role : ''
  };
  
  currentIndex = -1;
  login = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit(): void {  
    this.retrieveUtilisateurs();
    console.log("TAILLE:" + this.tabUtilisateur.length);   
  }


  
  retrieveUtilisateurs(): void {
    this.utilisateurService.getAll()
      .subscribe({
        next: (data) => {
          this.tabUtilisateur = data;
          console.log(data);
          console.log("Taille:" + this.tabUtilisateur.length);
          
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveUtilisateurs();
    this.currentUtilisateur = { utilisateur_id: '',
    login : '',
    mdp : '',
    nom : '',
    prenom :'',
    telephone : '',};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveUtilisateur(utilisateur: Utilisateur, index: number): void {
    this.currentUtilisateur = utilisateur;
    this.currentIndex = index;
  }

// Supprimer tout ------------------------------------------------

  removeAllUtilisateur(): void {
    this.utilisateurService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

// Rechercher pour afficher son détail---------------------

  searchLogin(): void {
    this.currentIndex = -1;
    this.utilisateurService.findByLogin(this.login)
      .subscribe({
        next: (data) => {
          this.utilisateurs = data;
          console.log(data);
          this.currentUtilisateur = this.utilisateurs;
        },
        
        error: (e) => console.error(e)
      });
  }

// Pagination -------------------------------------------------------------------


  getRequestParams(searchLogin: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchLogin) {
      params[`login`] = searchLogin;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveUtilisateurs();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUtilisateurs();
  }


  addUtilisateur(): void{
    this.router.navigate(['/addUtilisateurs']);
  }



}
