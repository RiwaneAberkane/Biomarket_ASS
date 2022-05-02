import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client ={client_id : '', nom : '', prenom: '',  cp: '',  adresse: '',  ville: '',   mail: '', telephone: '', statut: ''};
  submitted = false;
  clientSubmitted = false;
  statut = 'Actif'
  invalid = true

  constructor(private clientService: ClientService,  private messageService: MessageService) { }

  

  ngOnInit(): void {
  }

// CREATE -------------------



  newClient(): void {
    this.submitted = false;
    this.client = {client_id : '', nom : '', prenom: '',  cp: '',  adresse: '',  ville: '',   mail: '', telephone: '', statut: ''};
  }

// SAVE ------------------------


  save(): void {
 
      if (this.client.nom === '' || this.client.prenom === '' || this.client.cp === '' || this.client.adresse === '' || this.client.ville === '' || this.client.mail === '' || this.client.telephone === ''){
      console.log("Impossible");
      this.clientSubmitted = true;
      this.showError();
      return;
    }
    
    const data = {
      nom: this.client.nom,
      prenom: this.client.prenom,
      cp: this.client.cp,
      adresse: this.client.adresse,
      ville: this.client.ville,
      mail: this.client.mail,
      telephone: this.client.telephone,
      statut: this.statut
    };
    this.clientService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.clientSubmitted = false
          this.showSuccess();
        },
        error: (e) => console.error(e,
          this.showErrorUpdate)
      });
  }

// SHOW SUCCESS ------------------------


  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
  } 

  showErrorUpdate() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de créer ce client !'});
  } 

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Le client a été crée avec succès !'});
  }
  
}
