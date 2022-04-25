import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vente } from 'src/app/vente/vente';
import { VenteService } from 'src/app/vente/vente.service';
import { ProduitVente } from '../produit-vente';
import { ProduitVenteService } from '../produit-vente.service';

@Component({
  selector: 'app-produit-vente-details',
  templateUrl: './produit-vente-details.component.html',
  styleUrls: ['./produit-vente-details.component.scss']
})
export class ProduitVenteDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduitVente: ProduitVente = {id: '', quantitekg :''};

  vente = new Vente(0,"")

  updateVente = false

  message = '';

  id : any;

  constructor(
    private produitVenteService: ProduitVenteService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      console.log(this.currentProduitVente.id);
      this.id = this.route.snapshot.params["numero"]
      console.log((this.id));
      this.message = '';
      this.getProduitVente(this.route.snapshot.params["numero"]);
    }
  }
  
  getProduitVente(id: number): void {
    this.produitVenteService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduitVente = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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
    this.produitVenteService.update(this.currentProduitVente.id, this.currentProduitVente)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateVente = true 
          // this.message = res.message ? res.message : 'This ProduitVente was updated successfully!';  
        },
        error: (e) => console.error(e)
      });
  }



// DELETE ----------------------------

  delete(): void {
    this.produitVenteService.delete(this.currentProduitVente.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/produitsventes']);
        },
        error: (e) => console.error(e)
      });
  }
}
