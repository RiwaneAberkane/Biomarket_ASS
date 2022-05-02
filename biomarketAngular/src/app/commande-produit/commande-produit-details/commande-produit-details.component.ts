import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ProduitService } from 'src/app/produit/produit.service';
import { CommandeProduit } from '../commande-produit';
import { CommandeProduitService } from '../commande-produit.service';

@Component({
  selector: 'app-commande-produit-details',
  templateUrl: './commande-produit-details.component.html',
  styleUrls: ['./commande-produit-details.component.scss']
})
export class CommandeProduitDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentCommandeProduit: CommandeProduit = {id: '', quantitekg :'', statut: ''};
  @Input() tabAny : any
  @Input() detailsTab = false;
  updateCommande = false;
  message = '';
  tabProduit : any[] = [];
  msgs: Message[] = [];

  constructor(
    private commandeProduitService: CommandeProduitService,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCommandeProduit(this.route.snapshot.params["numero"]);
    }

    this.produitService.getAll().subscribe(data => {this.tabProduit = data
      console.log(this.tabProduit)}
    
    )}

  rejeter(){
    this.currentCommandeProduit.statut = 'Annulé'
    this.update();
    this.showInfo1()
  }

  valider(){
    this.currentCommandeProduit.statut = 'Confirmé'
    let addition = this.currentCommandeProduit.quantitekg +  this.currentCommandeProduit.produit.quantitekg
    this.updateProduit();
    this.update();
    this.showSuccess()
    this.showInfo();
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

// UPDATE ---------------------------

  update(): void {
    this.message = '';
    this.commandeProduitService.update(this.currentCommandeProduit.numero, this.currentCommandeProduit)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateCommande = true
        },
        error: (e) => console.error(e)
      });
  }

  // UPDATE PRODUIT ---------------------------

  updateProduit(): void {
    this.currentCommandeProduit.produit.quantitekg +=  this.currentCommandeProduit.quantitekg
    console.log(this.currentCommandeProduit.produit);
    this.produitService.update(this.currentCommandeProduit.produit.produit_id, this.currentCommandeProduit.produit)
      .subscribe({
        next: (res) => {
          this.currentCommandeProduit.produit = res
          console.log(res);
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

  confirm1() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment annuler cet commande ?',
        header: "Confirmer le l'annulation",
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.rejeter()
          
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
  }


  confirm2() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment valider cette commande ?',
        header: 'Confirmer la validation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.valider()
          
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
}



// MESSAFE SERVICE --------------------------

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Stock mis à jour avec succès !'});
}

showInfo() {
  this.messageService.add({severity:'info', summary: 'info', detail: 'Produit de la commande validé.'});
}

showInfo1() {
  this.messageService.add({severity:'info', summary: 'info', detail: 'Produit de la commande annulé.'});
}
}
