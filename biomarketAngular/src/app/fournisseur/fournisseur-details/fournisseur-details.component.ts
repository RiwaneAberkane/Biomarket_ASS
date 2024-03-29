import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Fournisseur } from '../fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-fournisseur-details',
  templateUrl: './fournisseur-details.component.html',
  styleUrls: ['./fournisseur-details.component.scss']
})
export class FournisseurDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentFournisseur: Fournisseur = {fournisseur_id : '', nom : '', telephone: '',  mail: '',  cp: '',  adresse: '',  ville: '',};
  updateFournisseur = false;
  msgs: Message[] = [];
  status = false
  message = '';

  constructor(
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService : MessageService) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getFournisseur(this.route.snapshot.params["id"]);
    }
  }
  
  getFournisseur(id: Number): void {
    this.fournisseurService.get(id)
      .subscribe({
        next: (data) => {
          this.currentFournisseur = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  disabled(){
    this.currentFournisseur.statut = "Inactif"
    this.status = true
    this.updateSuccess()
    this.showInfo()
   
  }

  enable(){
    this.currentFournisseur.statut = "Actif"
    this.status = false
    this.updateSuccess()
    this.showInfo()
  }


// UPDATE ---------------------------

  update(): void {
    if (this.currentFournisseur.nom === '' || this.currentFournisseur.telephone === '' || this.currentFournisseur.mail === '' || this.currentFournisseur.cp === '' || this.currentFournisseur.adresse === '' || this.currentFournisseur.ville === ''){
      this.showErrorVide();
      return;
    }
    this.message = '';
    this.fournisseurService.update(this.currentFournisseur.fournisseur_id, this.currentFournisseur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateFournisseur = true
          this.showSuccess();
        },
        error: (e) => console.error(e, 
          this.showError1())
      });
  }

  updateSuccess(): void {
    this.message = '';
    this.fournisseurService.update(this.currentFournisseur.fournisseur_id, this.currentFournisseur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateFournisseur = true
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.fournisseurService.delete(this.currentFournisseur.fournisseur_id)
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
        message: 'Voulez vous vraiment supprimer ce fournisseur ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.delete() 
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce fournisseur ne peut pas être supprimé !'});
} 

showError1() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce fournisseur ne peut pas être mis à jour !'});
} 

showErrorVide() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
} 

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Statut mis à jour.'});
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Fournisseur mis à jour avec succès !'});
}
}
