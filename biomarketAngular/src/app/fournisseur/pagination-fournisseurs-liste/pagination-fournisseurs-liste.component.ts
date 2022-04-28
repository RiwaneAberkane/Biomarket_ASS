import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fournisseur } from '../fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-pagination-fournisseurs-liste',
  templateUrl: './pagination-fournisseurs-liste.component.html',
  styleUrls: ['./pagination-fournisseurs-liste.component.scss']
})
export class PaginationFournisseursListeComponent implements OnInit {

  fournisseurs?: Fournisseur;
  fournisseurTab: Fournisseur[] = [];
  fournisseurTab1: any[] = []
  currentFournisseur: Fournisseur = {fournisseur_id : '', nom : '', telephone: '',  mail: '',  cp: '',  adresse: '',  ville: '',};
  currentIndex = -1;
  nom = '';
  mail = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private fournisseurService: FournisseurService, private router : Router) { }

  ngOnInit(): void {
    this.retrieveFournisseurs();
    console.log('OOOOOOOO:', this.fournisseurTab1.length); 
    
  }
  retrieveFournisseurs(): void {
    this.fournisseurService.getAll()
      .subscribe({
        next: (data) => {
          this.fournisseurTab = data;
          console.log(data);
          this.fournisseurTab1.push(data)
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveFournisseurs();
    this.currentFournisseur =  {fournisseur_id : '', nom : '', telephone: '',  mail: '',  cp: '',  adresse: '',  ville: '',};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveRole(fournisseur: Fournisseur, index: number): void {
    this.currentFournisseur = fournisseur;
    this.currentIndex = index;
  }

// Supprimer tout les -----------------------------------------------------

  removeAll(): void {
    this.fournisseurService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

// Rechercher par le nom pour afficher son détail---------------------

  // search(): void {
  //   this.currentIndex = -1;
  //   this.fournisseurService.search(this.nom)
  //     .subscribe({
  //       next: (data) => {
  //         this.fournisseurs = data;
  //         console.log(data);
  //         this.currentFournisseur = this.fournisseurs;
  //       },
        
  //       error: (e) => console.error(e)
  //     });
  // }

  searchByMail(): void {
    this.currentIndex = -1;
    this.fournisseurService.searchByMail(this.mail)
      .subscribe({
        next: (data) => {
          this.fournisseurs = data;
          console.log(data);
          this.currentFournisseur = this.fournisseurs;
        },
        
        error: (e) => console.error(e)
      });
  }

// Pagination -------------------------------------------------------------------


  getRequestParams(searchNom: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchNom) {
      params[`nom`] = searchNom;
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
    this.retrieveFournisseurs();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveFournisseurs();
  }

  addFournisseur(): void{
    this.router.navigate(['/addFournisseurs']);
  }
}
