import { Component, OnInit } from '@angular/core';
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

  constructor(private fournisseurService: FournisseurService) { }

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
      return;
    }
    const data = {
      nom: this.fournisseur.nom,
      telephone: this.fournisseur.telephone,
      mail: this.fournisseur.mail,
      cp: this.fournisseur.cp,
      adresse: this.fournisseur.adresse,
      ville: this.fournisseur.ville
    };
    this.fournisseurService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.fournisseurSubmitted = false;
        },
        error: (e) => console.error(e)
      });
  }
}
