import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vente } from '../vente';
import { VenteService } from '../vente.service';

@Component({
  selector: 'app-vente-details',
  templateUrl: './vente-details.component.html',
  styleUrls: ['./vente-details.component.scss']
})
export class VenteDetailsComponent implements OnInit {

  
  @Input() viewMode = false;

  @Input()  currentVente: Vente = {vente_id: '',date : '',};

  message = '';

  constructor(
    private venteService: VenteService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getVente(this.route.snapshot.params["id"]);
    }
  }
  
  getVente(id: Number): void {
    this.venteService.get(id)
      .subscribe({
        next: (data) => {
          this.currentVente = data;
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
    this.venteService.update(this.currentVente.vente_id, this.currentVente)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Vente was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.venteService.delete(this.currentVente.vente_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/ventes']);
        },
        error: (e) => console.error(e)
      });
  }

}
