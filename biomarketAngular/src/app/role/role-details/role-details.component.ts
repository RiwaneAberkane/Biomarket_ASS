import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentRole: Role = {
    role_id : '',
    nom: '',
    statut: ''
  };

  status = false


  update = false;
  msgs: Message[] = [];

  message = '';
  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }
    

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRole(this.route.snapshot.params["id"]);
      
    }
  }
  
  getRole(id: Number): void {
    this.roleService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRole = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  disabled(){
    
    this.currentRole.statut = "Inactif"
    this.status = true
    this.updateRole1()
    this.showInfo()
   
  }

  enable(){
    this.currentRole.statut = "Actif"
    this.status = false
    this.updateRole1()
    this.showInfo()
  }



// UPDATE ---------------------------

  updateRole(): void {
    if (this.currentRole.nom === '' ){
      this.showErrorVide();
      return;
    }
    this.message = '';
    this.roleService.update(this.currentRole.role_id, this.currentRole)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.update = true
          this.showSuccess()
        },
        error: (e) => console.error(e,
          this.showError1())
      });
  }

  updateRole1(): void {
    this.message = '';
    this.roleService.update(this.currentRole.role_id, this.currentRole)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.update = true
        },
        error: (e) => console.error(e)
      });
  }



// DELETE ----------------------------

  deleteRole(): void {
    this.roleService.delete(this.currentRole.role_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          window.location.reload();
        },
        error: (e) => console.error(e, this.showError())
      });
  }



  confirm2() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment supprimer ce rôle ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.deleteRole()  
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce rôle ne peut pas être supprimé !'});
} 

showError1() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce rôle ne peut pas être mis à jour !'});
} 

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Statut mis à jour.'});
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Le rôle a été mis à jour avec succès !'});
}

showErrorVide() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
} 


}
