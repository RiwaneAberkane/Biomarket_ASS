import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Fournisseur } from '../fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-fournisseur-details',
  templateUrl: './fournisseur-details.component.html',
  styleUrls: ['./fournisseur-details.component.scss']
})
export class FournisseurDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentFournisseur: Fournisseur = {fournisseur_id : '', nom : '', telephone: '',  mail: '',  cp: '',  adresse: '',  ville: '',};

  updateFournisseur = false;
  msgs: Message[] = [];

  message = '';

  constructor(
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getFournisseur(this.route.snapshot.params["id"]);
    }
  }
  
  getFournisseur(id: Number): void {
    this.fournisseurService.get(id)
      .subscribe({
        next: (data) => {
          this.currentFournisseur = data;
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
    this.fournisseurService.update(this.currentFournisseur.fournisseur_id, this.currentFournisseur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateFournisseur = true
          // this.message = res.message ? res.message : 'This Fournisseur was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.fournisseurService.delete(this.currentFournisseur.fournisseur_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.router.navigate(['/fournisseurs']);
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
  }

  confirm2() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment supprimer ce fournisseur ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.delete() 
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
}
}
