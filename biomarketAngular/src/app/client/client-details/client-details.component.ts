import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input()currentClient: Client = {client_id : '', nom : '', prenom: '',  cp: '',  adresse: '',  ville: '',   mail: '', telephone: '', statut: ''};
  updateClient = false;
  status = false
  msgs: Message[] = [];
  message = '';

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService : MessageService) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getClient(this.route.snapshot.params["id"]);
    }
  }
  
  getClient(id: Number): void {
    this.clientService.get(id)
      .subscribe({
        next: (data) => {
          this.currentClient = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


// ENABLE ---------------------------------------- 

  disabled(){
    
    this.currentClient.statut = "Inactif"
    this.status = true
    this.updateSuccess()
    this.showInfo()
   
  }

  enable(){
    this.currentClient.statut = "Actif"
    this.status = false
    this.updateSuccess()
    this.showInfo()
  }


// UPDATE -----------------------------------------

  update(): void {
    if (this.currentClient.nom === '' || this.currentClient.prenom === '' || this.currentClient.cp === '' || this.currentClient.adresse === '' || this.currentClient.ville === '' || this.currentClient.mail === '' || this.currentClient.telephone === ''){
      this.showErrorVide();
      return;
    }
    this.message = '';
    this.clientService.update(this.currentClient.client_id, this.currentClient)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateClient = true
          this.showSuccess();
        },
        error: (e) => console.error(e)
      });
  }

  updateSuccess(): void {
    this.message = '';
    this.clientService.update(this.currentClient.client_id, this.currentClient)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateClient = true
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.clientService.delete(this.currentClient.client_id)
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
        message: 'Voulez vous vraiment supprimer ce client ?',
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

// MESSAGE SERVICE --------------------------------------------

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce client ne peut pas être supprimé !'});
} 

showErrorVide() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
} 

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Statut mis à jour.'});
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Client mis à jour avec succès !'});
}

}
