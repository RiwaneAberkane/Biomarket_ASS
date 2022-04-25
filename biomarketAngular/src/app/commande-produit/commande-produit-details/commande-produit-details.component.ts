import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeProduit } from '../commande-produit';
import { CommandeProduitService } from '../commande-produit.service';

@Component({
  selector: 'app-commande-produit-details',
  templateUrl: './commande-produit-details.component.html',
  styleUrls: ['./commande-produit-details.component.scss']
})
export class CommandeProduitDetailsComponent implements OnInit {

 
  @Input() viewMode = false;

  @Input() currentCommandeProduit: CommandeProduit = {id: '', quantitekg :''};

  @Input() tabAny : any

  @Input() detailsTab = false;

  updateCommande = false;
  message = '';

  constructor(
    private commandeProduitService: CommandeProduitService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCommandeProduit(this.route.snapshot.params["numero"]);
    }
  }
  
  getCommandeProduit(id: number): void {
    this.commandeProduitService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCommandeProduit = data;
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

  uodate(): void {
    this.message = '';
    this.commandeProduitService.update(this.currentCommandeProduit.numero, this.currentCommandeProduit)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateCommande = true
          // this.message = res.message ? res.message : 'This Produit was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.commandeProduitService.delete(this.currentCommandeProduit.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/commandesProduits']);
        },
        error: (e) => console.error(e)
      });
  }
}
