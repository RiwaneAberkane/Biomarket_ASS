import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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



  constructor(private roleService: RoleService,  private messageService: MessageService) { }
  ngOnInit(): void {
  }


// SAVE ------------------------------------


  saveRole(): void {
    if (this.role.nom === ''){
      console.log("Impossible");
      this.roleSubmitted = true;
      this.showError();
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
          this.showSuccess()
        },
        error: (e) => console.error(e,
          this.showError1())
      });
  }

// NEW --------------------------------------


  newRole(): void {
    this.submitted = false;
    this.role = {
      role_id : '',
      nom: '',
      statut: ''
    }
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
  } 

  showError1() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de créer ce rôle !'});
  } 

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Le rôle a été crée avec succès !'});
  }
  
}