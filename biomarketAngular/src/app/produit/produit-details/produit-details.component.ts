import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
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
  status = false
  msgs: Message[] = [];
  message = '';

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,  private messageService: MessageService ) { }
    


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


  disabled(){
    this.currentProduit.statut = "Inactif"
    this.status = true
    this.updateEnable()
    this.showInfo()
   
  }

  enable(){
    this.currentProduit.statut = "Actif"
    this.status = false
    this.updateEnable()
    this.showInfo()
  }


// UPDATE ---------------------------

  update(): void {
    if (this.currentProduit.nom === '' || this.currentProduit.type === '' || this.currentProduit.quantitekg === ''){
      this.showErrorVide();
      return;
    }
    if (this.currentProduit.type != 'Légume' && this.currentProduit.type != 'Fruit'){
      this.showErrorType();
      return;
    }
    this.message = '';
    this.produitService.update(this.currentProduit.produit_id, this.currentProduit)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateProduit = true
          this.showSuccess();
        },
        error: (e) => console.error(e)
      });
  }


  updateEnable(): void {
    this.message = '';
    this.produitService.update(this.currentProduit.produit_id, this.currentProduit)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateProduit = true
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
          window.location.reload();
        },
        error: (e) => console.error(e, this.showError())
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

// MESSAGE SERVICE -------------------



showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ce produit ne peut pas être supprimé !'});
} 

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Statut mis à jour.'});
}

showErrorVide() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
} 

showErrorType() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Problème type (Fruit ou Légume) !'});
} 

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Produit mis à jour avec succès !'});
}

}
