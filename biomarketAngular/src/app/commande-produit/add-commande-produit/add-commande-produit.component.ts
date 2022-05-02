import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Commande } from 'src/app/commande/commande';
import { CommandeService } from 'src/app/commande/commande.service';
import { Fournisseur } from 'src/app/fournisseur/fournisseur';
import { FournisseurService } from 'src/app/fournisseur/fournisseur.service';
import { Produit } from 'src/app/produit/produit';
import { ProduitService } from 'src/app/produit/produit.service';
import { Utilisateur } from 'src/app/utilisateur/utilisateur';
import { UtilisateurService } from 'src/app/utilisateur/utilisateur.service';
import { CommandeProduit } from '../commande-produit';
import { CommandeProduitService } from '../commande-produit.service';

@Component({
  selector: 'app-add-commande-produit',
  templateUrl: './add-commande-produit.component.html',
  styleUrls: ['./add-commande-produit.component.scss']
})
export class AddCommandeProduitComponent implements OnInit {

  @Input() tab : Produit[] = [];
  @Input() fournisseurTab : Fournisseur[] = [];
  tabUtilisateur : Utilisateur[] = [];
  tabFournisseur : Fournisseur[] = [];
  tabCommandeProduit : any[] = [];
  tabProduit : any[] = []
  commandeProduit:   CommandeProduit = {id: '',produitNom : '',commandeDate: '',quantitekg :''};
  commandeSubmitted = false
  submitted = false;
  commande: Commande = new Commande(0,'');
  utilisateur : Utilisateur = new Utilisateur('','', '','','','' )
  errorText = '';
  successText = '';
  alert = false
  tabbo = false
  statut = 'En attente de confirmation ...'


  constructor(private commandeProduitService: CommandeProduitService, private commandeService: CommandeService, private messageService: MessageService, private utilisateurService: UtilisateurService, private fournisseurService : FournisseurService,
              private produitService: ProduitService) { }


  ngOnInit(): void { 
    this.utilisateurService.getAll().subscribe( data => {this.tabUtilisateur = data
    console.log(this.tabUtilisateur)} 
      )

    this.fournisseurService.getAll().subscribe(data => {this.tabFournisseur = data
    console.log(this.tabFournisseur);
    })

    this.produitService.getAll().subscribe(data => {this.tabProduit = data
      console.log(this.tabProduit)}
    
    )}

// CREATE -------------------



  newCommandeProduit(): void {
    this.submitted = false;
    this.commandeProduit = {id: '',produitNom : '',commandeDate: '',quantitekg :''};
    this.alert = false;
}

// SAVE ------------------------

  save(): void {

    if (this.commandeProduit.produitNom === '' || this.commande.date === '' || this.commandeProduit.quantitekg === '' || this.commande.utilisateurLogin === '' || this.commande.fournisseurMail === ''){
      console.log("Impossible");
      this.commandeSubmitted = true;
      this.showErrorVide();
      return
    }
    if (this.commandeProduit.quantitekg > 100)
    {
      this.showErrorQuantite();
      this.showInfo();
      return
    }
    this.produitService.search(this.commandeProduit.produitNom).subscribe(produit => {
      if  ( produit.statut === 'Inactif')
      {
      this.showErrorProduit()
      return
      } 
    this.fournisseurService.searchByMail(this.commande.fournisseurMail).subscribe(fournisseur => {
      if  ( fournisseur.statut === 'Inactif')
      {
      this.showErrorFournisseur()
      return
      } 
    this.utilisateurService.findByLogin(this.commande.utilisateurLogin).subscribe(utilisateur => {
      if  ( utilisateur.statut === 'Inactif')
      {
      this.showError()
      return
      } 

      const data = {
        produitNom: this.commandeProduit.produitNom,
        commandeDate: this.commande.date,
        quantitekg: this.commandeProduit.quantitekg,
        fournisseurMail: this.commande.fournisseurMail,
        statut: this.statut
      };
      const commandeData = {
        date: this.commande.date,
        utilisateurLogin: this.commande.utilisateurLogin,
        fournisseurMail: this.commande.fournisseurMail
      }
  
      this.commandeService.create(commandeData)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.commandeSubmitted = false
            this.submitted = true;
  
      
  
            this.commandeProduitService.create(data)
            .subscribe({
              next: (res) => {
                console.log(res);
                this.tabCommandeProduit.push(res)
                this.commandeSubmitted = false
                this.submitted = true;
                this.successText ="La commande a été crée avec succès !"
                this.showSuccess()
                this.tabbo = true
              },
              error: (e) => {console.error(e)
                this.errorText = "Impossible de créer cette commande !",
                this.showErrorImpossible()
                this.alert = true}
              
            });
  
          },
          error: (e) => console.error(e)
        });
    })
  })
})
}

// SHOW SERVICE ------------------------------

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de passer une commande avec cet utilisateur !'});
} 

showErrorVide() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
} 

showErrorFournisseur() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de passer une commande avec ce fournisseur !'});
} 

showErrorProduit() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de passer une commande avec ce produit !'});
} 

showErrorImpossible() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de créer cette commande !'});
} 

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'La commande a été crée avec succès !'});
}

showErrorQuantite() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'La quantité commandée est trop importante !'});
} 

showInfo() {
  this.messageService.add({severity:'warn', summary: 'Warning', detail: '100Kg par produit maximum ! '});
} 
}
