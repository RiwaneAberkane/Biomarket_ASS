import { Component, OnInit } from '@angular/core';
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

  constructor(private produitService: ProduitService) { }

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
      return;
    }
    const data = {
      nom: this.produit.nom,
      type: this.produit.type,
      quantitekg: this.produit.quantitekg,
      pachatkg: this.produit.pachatkg,
      pventekg: this.produit.pventekg
    };
    this.produitService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.produitSubmitted = false
        },
        error: (e) => console.error(e)
      });
  }
}
