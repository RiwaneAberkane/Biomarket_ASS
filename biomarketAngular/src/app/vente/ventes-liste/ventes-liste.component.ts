import { Component, OnInit } from '@angular/core';
import { Vente } from '../vente';
import { VenteService } from '../vente.service';


@Component({
  selector: 'app-ventes-liste',
  templateUrl: './ventes-liste.component.html',
  styleUrls: ['./ventes-liste.component.scss']
})
export class VentesListeComponent implements OnInit {
  ventes?: Vente;
  tab : Vente[] = [];

  currentVente: Vente = {vente_id: '',date : '',utilisateur : '',client :'',};
  
  currentIndex = -1;
  date = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private venteService: VenteService) { }

  ngOnInit(): void {
    this.retrieveVentes();
  }
  retrieveVentes(): void {
    this.venteService.getAll()
      .subscribe({
        next: (data) => {
          this.tab = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveVentes();
    this.currentVente = {vente_id: '',date : '',utilisateur : '',client :'',};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveUtilisateur(vente: Vente, index: number): void {
    this.currentVente = vente;
    this.currentIndex = index;
  }

// Supprimer tout ------------------------------------------------

  removeAllVente(): void {
    this.venteService.deleteAll()
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
    this.venteService.findByDate(this.date)
      .subscribe({
        next: (data) => {
          this.ventes = data;
          console.log(data);
          this.currentVente = this.ventes;
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
    this.retrieveVentes();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveVentes();
  }


}
