import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Produit } from '../produit';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  produit: Produit = {produit_id : '', nom : '', type: '',  quantitekg: '',  pachatkg: '',  pventekg: ''};
  submitted = false;
  produitSubmitted = false;
  statut = 'Actif'

  constructor(private produitService: ProduitService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

// CREATE -------------------


  newProduit(): void {
    this.submitted = false;
    this.produit = {produit_id : '', nom : '', type: '',  quantitekg:'',  pachatkg: '', pventekg: ''};
  }

// SAVE ------------------------

  saveProduit(): void {
    if (this.produit.nom === '' || this.produit.type === '' || this.produit.quantitekg === '' || this.produit.pachatkg === '' || this.produit.pventekg === '' ){
      console.log("Impossible");
      this.produitSubmitted = true;
      this.showError();
      return;
    }
    if (this.produit.type != 'Légume' && this.produit.type != 'Fruit'){
      this.showErrorType();
      return;
    }
    const data = {
      nom: this.produit.nom,
      type: this.produit.type,
      quantitekg: this.produit.quantitekg,
      pachatkg: this.produit.pachatkg,
      pventekg: this.produit.pventekg,
      statut: this.statut
    };
    this.produitService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.produitSubmitted = false
          this.showSuccess();
        },
        error: (e) => console.error(e,
          this.showError1)
      });
  }

// MESSAGE SERVICE -----------------------------------

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
  } 

  showError1() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de créer ce produit !'});
  } 


  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Le produit a été crée avec succès !'});
  }

  showErrorType() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Problème type (Fruit ou Légume) !'});
  } 
  
}
