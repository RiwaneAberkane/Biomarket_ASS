import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-utilisateur-details',
  templateUrl: './utilisateur-details.component.html',
  styleUrls: ['./utilisateur-details.component.scss']
})
export class UtilisateurDetailsComponent implements OnInit {
  
  @Input() viewMode = false;

  @Input() currentUtilisateur: Utilisateur = {
    utilisateur_id: '',
    login: '',
    mdp : '',
    nom : '',
    prenom : '',
    telephone :'',
  };
  update = false;
  msgs: Message[] = [];
  status = false

  message = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService ) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUtilisateur(this.route.snapshot.params["id"]);
    }
  }
  
  getUtilisateur(id: Number): void {
    this.utilisateurService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUtilisateur = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  disabled(){
    
    this.currentUtilisateur.statut = "Inactif"
    this.status = true
    this.updateUtilisateur1()
    this.showInfo()
   
  }

  enable(){
    this.currentUtilisateur.statut = "Actif"
    this.status = false
    this.updateUtilisateur1()
    this.showInfo()
  }



// UPDATE ---------------------------

  updateUtilisateur(): void {
    if (this.currentUtilisateur.login === '' || this.currentUtilisateur.mdp === '' || this.currentUtilisateur.nom === '' || this.currentUtilisateur.prenom === '' || this.currentUtilisateur.telephone === ''){
      this.showErrorVide();
      return;
    }
    this.message = '';
    this.utilisateurService.update(this.currentUtilisateur.utilisateur_id, this.currentUtilisateur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.update = true
          this.showSuccess()
        },
        error: (e) => console.error(e)
      });
  }

  updateUtilisateur1(): void {
    this.message = '';
    this.utilisateurService.update(this.currentUtilisateur.utilisateur_id, this.currentUtilisateur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.update = true
        },
        error: (e) => console.error(e,
          this.showError1())
      });
  }

// DELETE ----------------------------

  deleteUtilisateur(): void {
    this.utilisateurService.delete(this.currentUtilisateur.utilisateur_id)
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
        message: 'Voulez vous vraiment supprimer cet utilisateur ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.deleteUtilisateur() 
  
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Cet utilisateur ne peut pas être supprimé !'});
} 

showError1() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Cet utilisateur ne peut pas être mis à jour !'});
} 

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Statut mis à jour.'});
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: "Uilisateur mis à jour avec succès !"});
}

showErrorVide() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
} 

}
