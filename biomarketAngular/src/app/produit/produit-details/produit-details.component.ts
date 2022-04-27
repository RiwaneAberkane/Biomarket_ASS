import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Produit } from '../produit';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-produit-details',
  templateUrl: './produit-details.component.html',
  styleUrls: ['./produit-details.component.scss']
})
export class ProduitDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentProduit: Produit ={produit_id : '', nom : '', type: '',  quantitekg: '',  pachatkg: '',  pventekg: ''};

  updateProduit = false;
  msgs: Message[] = [];

  message = '';

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduit(this.route.snapshot.params["id"]);
    }
  }
  
  getProduit(id: Number): void {
    this.produitService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduit = data;
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
    this.produitService.update(this.currentProduit.produit_id, this.currentProduit)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateProduit = true
          // this.message = res.message ? res.message : 'This Produit was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  delete(): void {
    this.produitService.delete(this.currentProduit.produit_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.router.navigate(['/produits']);
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
  }

  
  confirm2() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment supprimer ce produit ?',
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
