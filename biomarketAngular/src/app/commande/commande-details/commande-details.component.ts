import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from '../commande';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.scss']
})
export class CommandeDetailsComponent implements OnInit {
  
  @Input() viewMode = false;

  @Input()  currentCommande: Commande = {commande_id: '',date : ''};

  message = '';

  constructor(
    private commandeService: CommandeService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCommande(this.route.snapshot.params["id"]);
    }
  }
  
  getCommande(id: Number): void {
    this.commandeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCommande = data;
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
    this.commandeService.update(this.currentCommande.commande_id, this.currentCommande)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Commande was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.commandeService.delete(this.currentCommande.commande_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/commandes']);
        },
        error: (e) => console.error(e)
      });
  }

}
