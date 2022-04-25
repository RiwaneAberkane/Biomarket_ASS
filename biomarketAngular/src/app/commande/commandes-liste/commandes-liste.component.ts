import { Component, OnInit } from '@angular/core';
import { Commande } from '../commande';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-commandes-liste',
  templateUrl: './commandes-liste.component.html',
  styleUrls: ['./commandes-liste.component.scss']
})
export class CommandesListeComponent implements OnInit {
  commandes?: Commande;
  tab : Commande[] = [];

  currentCommande: Commande = {commande_id: '',date : '',utilisateur : '',fournisseur :''};
  
  currentIndex = -1;
  date = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.retrieveCommandes();
  }
  retrieveCommandes(): void {
    this.commandeService.getAll()
      .subscribe({
        next: (data) => {
          this.tab = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveCommandes();
    this.currentCommande = {commande_id: '',date : '',utilisateur : '',fournisseur :''};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveUtilisateur(commande: Commande, index: number): void {
    this.currentCommande = commande;
    this.currentIndex = index;
  }

// Supprimer tout ------------------------------------------------

  removeAll(): void {
    this.commandeService.deleteAll()
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
    this.commandeService.findByDate(this.date)
      .subscribe({
        next: (data) => {
          this.commandes = data;
          console.log(data);
          this.currentCommande = this.commandes;
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
    this.retrieveCommandes();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCommandes();
  }

}
