import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Fournisseur } from '../fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {
  
  fournisseur: Fournisseur = {fournisseur_id : '', nom : '', telephone: '',  mail: '',  cp: '',  adresse: '',  ville: '',};
  submitted = false;
  fournisseurSubmitted = false;
  statut = 'Actif'

  constructor(private fournisseurService: FournisseurService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

// CREATE -------------------



  newFournisseur(): void {
    this.submitted = false;
    this.fournisseur = {fournisseur_id : '', nom : '', telephone: '',  mail: '',  cp: '',  adresse: '',  ville: '',};
  }

// SAVE ------------------------

  saveFournisseur(): void {
    if (this.fournisseur.nom === '' || this.fournisseur.telephone === '' || this.fournisseur.mail === '' || this.fournisseur.cp === '' || this.fournisseur.adresse === '' || this.fournisseur.ville === ''){
      console.log("Impossible");
      this.fournisseurSubmitted = true;
      this.showError();
      return;
    }
    const data = {
      nom: this.fournisseur.nom,
      telephone: this.fournisseur.telephone,
      mail: this.fournisseur.mail,
      cp: this.fournisseur.cp,
      adresse: this.fournisseur.adresse,
      ville: this.fournisseur.ville,
      statut: this.statut
    };
    this.fournisseurService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.fournisseurSubmitted = false;
          this.showSuccess()
        },
        error: (e) => console.error(e,
          this.showError1())
      });
  }

// MESSAGE SERVICE ------------------------------

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
  } 

  showError1() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de créer ce fournissseur !'});
  } 


  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Le fournisseur a été crée avec succès !'});
  }
  
}
