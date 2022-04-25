import { Component, OnInit } from '@angular/core';
import { Vente } from 'src/app/vente/vente';
import { VenteService } from 'src/app/vente/vente.service';
import { ProduitVente } from '../produit-vente';
import { ProduitVenteService } from '../produit-vente.service';

@Component({
  selector: 'app-add-produit-vente',
  templateUrl: './add-produit-vente.component.html',
  styleUrls: ['./add-produit-vente.component.scss']
})
export class AddProduitVenteComponent implements OnInit {

  produitVente: ProduitVente = {id: '',produitNom : '',venteDate: '',quantitekg :''};
  venteSubmitted = false
  submitted = false;
  vente: Vente = new Vente(0, '');
  errorText = '';
  successText = '';
  alert = false

  constructor(private produitVenteService: ProduitVenteService, private venteService: VenteService) { }

  ngOnInit(): void {
  }

// CREATE -------------------



  newProduitVente(): void {
    this.submitted = false;
    this.produitVente = {id: '',produitNom : '',venteDate: '',quantitekg :''};
    this.alert = false ;
  }

// SAVE ------------------------

  save(): void {
    if (this.produitVente.produitNom === '' || this.vente.date === '' || this.produitVente.quantitekg === '' || this.vente.utilisateurLogin === '' || this.vente.clientMail === ''){
      console.log("Impossible");
      this.venteSubmitted = true;
      return;
    }
    const data = {
      produitNom: this.produitVente.produitNom,
      venteDate: this.vente.date,
      quantitekg: this.produitVente.quantitekg,
      client: this.vente.clientMail
    };
    const venteData ={
      date: this.vente.date,
      // statut: this.vente.statut,
      utilisateurLogin: this.vente.utilisateurLogin,
      clientMail: this.vente.clientMail
    }
    this.venteService.create(venteData)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.venteSubmitted = false;
        this.submitted = true;

        this.produitVenteService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.venteSubmitted = false;
            // this.submitted = true;
            this.successText ="La vente a été crée avec succès et le stock a été mis à jour !"
          },
          error: (e) => {console.error(e);
          this.errorText = "Pas assez de quantité dans le stock !",
          this.alert = true}
          
        });
    },
    error: (e) => console.error(e)
  });


  }
}