import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/commande/commande.service';
import { CommandeProduit } from '../commande-produit';
import { CommandeProduitService } from '../commande-produit.service';

@Component({
  selector: 'app-commandes-produits-liste',
  templateUrl: './commandes-produits-liste.component.html',
  styleUrls: ['./commandes-produits-liste.component.scss']
})
export class CommandesProduitsListeComponent implements OnInit {

  commandesProduits?: CommandeProduit;
  tabCommandeProduit : CommandeProduit[] = [];
  tabAny: any
  detailsTab = false



  currentCommandeProduit: CommandeProduit = {id: '',  produit: '', commande: '', quantitekg :''};
  
  currentIndex = -1;
  date = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private commandeProduitService: CommandeProduitService, private router: Router, private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.retrieveCommandesProduits();
  }
  retrieveCommandesProduits(): void {
    this.commandeProduitService.getAll()
      .subscribe({
        next: (data) => {
          this.tabCommandeProduit = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveCommandesProduits();
    this.currentCommandeProduit = {id: '', produit: '', commande: '', quantitekg :''};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveUtilisateur(commandeProduit: CommandeProduit, index: number): void {
    this.currentCommandeProduit = commandeProduit;
    this.currentIndex = index;
  }

// Supprimer tout ------------------------------------------------

  removeAll(): void {
    this.commandeProduitService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

// Rechercher pour afficher son détail---------------------

  searchDate(): void {
    this.currentIndex = -1;
    this.commandeProduitService.findByDate(this.date)
      .subscribe({
        next: (data) => {
          this.tabAny = data;
          console.log(this.tabAny);
          console.log(data);
          this.detailsTab = true
          // this.currentCommandeProduit = this.commandesProduits;
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
    this.retrieveCommandesProduits();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCommandesProduits();
  }


  addCommandeProduit(): void{
    this.router.navigate(['/addCommandeProduit']);
  }


}
