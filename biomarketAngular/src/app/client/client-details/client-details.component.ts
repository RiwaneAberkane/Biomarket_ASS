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

  updateClient = false
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

  disabled(){
    
    this.currentClient.statut = "Inactif"
    this.status = true
    this.update()
    this.showInfo()
   
  }

  enable(){
    this.currentClient.statut = "Actif"
    this.status = false
    this.update()
    this.showInfo()
  }

// ------------------------------------------------------------

  // updatePublished(status: boolean): void {
  //   const data = {
  //     login: this.currentUtilisateur.login,
  //     mdp: this.currentUtilisateur.mdp,
  //     nom: this.currentUtilisateur.nom,
  //     prenom: this.currentUtilisateur.prenom,
  //     telephone: this.currentUtilisateur.telephone,
  //   };
  //   this.message = '';
  //   this.utilisateurService.update(this.currentUtilisateur.utilisateur_id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentUtilisateur.utilisateur_id = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

// ------------------------------------------------------------

// UPDATE ---------------------------

  update(): void {
    this.message = '';
    this.clientService.update(this.currentClient.client_id, this.currentClient)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateClient = true
          // this.message = res.message ? res.message : 'This Client was updated successfully!';
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
          // this.router.navigate(['/clients']);
          // window.location.reload();
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

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce client ne peut pas être supprimé !'});
} 

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Statut mis à jour.'});
}
}
