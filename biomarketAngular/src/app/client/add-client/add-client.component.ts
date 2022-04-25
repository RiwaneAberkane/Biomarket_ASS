import { Component, OnInit } from '@angular/core';
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

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

// CREATE -------------------



  newClient(): void {
    this.submitted = false;
    this.client = {client_id : '', nom : '', prenom: '',  cp: '',  adresse: '',  ville: '',   mail: '', telephone: '', statut: ''};
  }

// SAVE ------------------------

  save(): void {
    if (this.client.nom === '' || this.client.prenom === '' || this.client.cp === '' || this.client.adresse === '' || this.client.ville === '' || this.client.mail === '' || this.client.telephone === '' || this.client.statut === ''){
      console.log("Impossible");
      this.clientSubmitted = true;
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
      statut: this.client.statut
    };
    this.clientService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.clientSubmitted = false
        },
        error: (e) => console.error(e)
      });
  }

}
