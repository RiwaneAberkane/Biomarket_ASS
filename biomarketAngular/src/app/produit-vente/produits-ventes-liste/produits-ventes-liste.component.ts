import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProduitVente } from '../produit-vente';
import { ProduitVenteService } from '../produit-vente.service';

@Component({
  selector: 'app-produits-ventes-liste',
  templateUrl: './produits-ventes-liste.component.html',
  styleUrls: ['./produits-ventes-liste.component.scss']
})
export class ProduitsVentesListeComponent implements OnInit {

  produitsVentes?: ProduitVente;
  tab : ProduitVente[] = [];
  tabAny: any
  detailsTab = false

  currentProduitVente: ProduitVente = {id: '',  produit: '', vente: '', quantitekg :''};
  
  currentIndex = -1;
  date = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private produitVenteService: ProduitVenteService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveProduitsVentes();
  }
  retrieveProduitsVentes(): void {
    this.produitVenteService.getAll()
      .subscribe({
        next: (data) => {
          this.tab = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveProduitsVentes();
    this.currentProduitVente = {id: '',  produit: '', vente: '', quantitekg :''};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveUtilisateur(produitVente: ProduitVente, index: number): void {
    this.currentProduitVente = produitVente;
    this.currentIndex = index;
  }

// Supprimer tout ------------------------------------------------

  removeAll(): void {
    this.produitVenteService.deleteAll()
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
    this.produitVenteService.findByDate(this.date)
      .subscribe({
        next: (data) => {
          this.tabAny = data;
          console.log(data);
          this.detailsTab = true
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
    this.retrieveProduitsVentes();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProduitsVentes();
  }

  addProduitVente(): void{
    this.router.navigate(['/addProduitVente']);
  }

  reload(){
    this.detailsTab = false
    this.showInfo();
  }

  showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Liste rechargée.'});
  }
  

}
