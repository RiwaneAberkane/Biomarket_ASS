import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-roles-liste',
  templateUrl: './roles-liste.component.html',
  styleUrls: ['./roles-liste.component.scss']
})
export class RolesListeComponent implements OnInit {

  
  roles?: Role;
  roleTab : Role[] = [];
  currentRole: Role = {role_id : '', nom : ''};
  currentIndex = -1;
  nom = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private roleService: RoleService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveRoles();
  }


  retrieveRoles(): void {
    this.roleService.getAll()
      .subscribe({
        next: (data) => {
          this.roleTab = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveRoles();
    this.currentRole = {role_id : '', nom : ''};
    this.currentIndex = -1;
  }

// Afficher détail au clique --------------------------------------------


  setActiveRole(role: Role, index: number): void {
    this.currentRole = role;
    this.currentIndex = index;
  }

// Supprimer tout les rôles------------------------------------------------

  removeAllRole(): void {
    this.roleService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

// Rechercher par le nom du Rôle pour afficher son détail---------------------

  searchNom(): void {
    this.currentIndex = -1;
    this.roleService.findByNom(this.nom)
      .subscribe({
        next: (data) => {
          this.roles = data;
          console.log(data);
          this.currentRole = this.roles;
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
    this.retrieveRoles();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveRoles();
  }

  addRole(): void{
    this.router.navigate(['/add']);
  }

  // nameValue(name: any){
  //   this.nom = name

  // }
  
}

