import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Produit } from '../produit';
import { ProduitService } from '../produit.service';



@Component({
  selector: 'app-produits-liste',
  templateUrl: './produits-liste.component.html',
  styleUrls: ['./produits-liste.component.scss']
})


export class ProduitsListeComponent implements OnInit {

  produits?: Produit;
  tab : Produit[] = [];
  currentProduit: Produit = {produit_id : '', nom : '', type: '',  quantitekg: '',  pachatkg: '',  pventekg: ''};
  currentIndex = -1;
  nom = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  msgs: Message[] = [];

  constructor(private produitService: ProduitService, private router: Router, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }


  ngOnInit(): void {
    this.retrieveProduits();
  }
  retrieveProduits(): void {
    this.produitService.getAll()
      .subscribe({
        next: (data) => {
          this.tab = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveProduits();
    this.currentProduit = {produit_id : '', nom : '', type: '',  quantitekg: "",  pachatkg: '',  pventekg: ''};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveRole(produit: Produit, index: number): void {
    this.currentProduit = produit;
    this.currentIndex = index;
  }

// Supprimer tout les -----------------------------------------------------

  removeAll(): void {
    this.produitService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

// Rechercher par le nom pour afficher son détail---------------------

  search(): void {
    this.currentIndex = -1;
    this.produitService.search(this.nom)
      .subscribe({
        next: (data) => {
          this.produits = data;
          console.log(data);
          this.currentProduit = this.produits;
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
    this.retrieveProduits();
  }

  
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProduits();
  }


  addProduit(): void{
    this.router.navigate(['/addProduit']);
  }


  confirm2() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment supprimer ce produit ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}
  
}
