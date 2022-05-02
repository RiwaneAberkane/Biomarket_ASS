import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-pagination-clients-liste',
  templateUrl: './pagination-clients-liste.component.html',
  styleUrls: ['./pagination-clients-liste.component.scss']
})
export class PaginationClientsListeComponent implements OnInit {

  clients?: Client;
  tab : Client[] = [];
  currentClient: Client = {client_id : '', nom : '', prenom: '',  cp: '',  adresse: '',  ville: '',   mail: '', telephone: '', statut: ''};
  currentIndex = -1;
  mail = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private ClientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveClients();
  }
  retrieveClients(): void {
    this.ClientService.getAll()
      .subscribe({
        next: (data) => {
          this.tab = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveClients();
    this.currentClient =  {client_id : '', nom : '', prenom: '',  cp: '',  adresse: '',  ville: '',   mail: '', telephone: '', statut: ''};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveRole(client: Client, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }

// Supprimer tout -----------------------------------------------------

  removeAll(): void {
    this.ClientService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

// Rechercher par le nom du Rôle pour afficher son détail---------------------

  search(): void {
    this.currentIndex = -1;
    this.ClientService.search(this.mail)
      .subscribe({
        next: (data) => {
          this.clients = data;
          console.log(data);
          this.currentClient = this.clients;
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
    this.retrieveClients();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveClients();
  }
  
  addClient(): void{
    this.router.navigate(['/addClient']);
  }

}
