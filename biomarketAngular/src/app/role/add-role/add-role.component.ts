import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {

  role: Role = {
    role_id : '',
    nom : '',
    statut: ''
  };

  submitted = false;
  roleSubmitted = false;
  statut = 'Actif'



  constructor(private roleService: RoleService) { }
  ngOnInit(): void {
  }
  saveRole(): void {
    if (this.role.nom === ''){
      console.log("Impossible");
      this.roleSubmitted = true;
      return;
    }
    const data = {
      nom: this.role.nom,
      statut: this.statut
    };
    this.roleService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.roleSubmitted = false
        },
        error: (e) => console.error(e)
      });
  }
  newRole(): void {
    this.submitted = false;
    this.role = {
      role_id : '',
      nom: '',
      statut: ''
    }
  }
}