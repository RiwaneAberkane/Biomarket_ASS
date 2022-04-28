import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Commande } from 'src/app/commande/commande';
import { CommandeService } from 'src/app/commande/commande.service';
import { Fournisseur } from 'src/app/fournisseur/fournisseur';
import { FournisseurService } from 'src/app/fournisseur/fournisseur.service';
import { Produit } from 'src/app/produit/produit';
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

  
  commandeProduit:   CommandeProduit = {id: '',produitNom : '',commandeDate: '',quantitekg :''};
  commandeSubmitted = false
  submitted = false;
  commande: Commande = new Commande(0,'');
  utilisateur : Utilisateur = new Utilisateur('','', '','','','' )
  errorText = '';
  successText = '';
  alert = false


  constructor(private commandeProduitService: CommandeProduitService, private commandeService: CommandeService, private messageService: MessageService, private utilisateurService: UtilisateurService, private fournisseurService : FournisseurService) { }

  ngOnInit(): void { 
    this.utilisateurService.getAll().subscribe( data => {this.tabUtilisateur = data
    console.log(this.tabUtilisateur)} 
      )

    this.fournisseurService.getAll().subscribe(data => {this.tabFournisseur = data
    console.log(this.tabFournisseur);
    })
  }

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
     
      return;
    }
    if(this.utilisateur.statut === 'Inactif'){
      this.showError()
      console.log("LALALAL");
      return;
    }
 
    const data = {
      produitNom: this.commandeProduit.produitNom,
      commandeDate: this.commande.date,
      quantitekg: this.commandeProduit.quantitekg,
      fournisseurMail: this.commande.fournisseurMail
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
              this.successText ="La commande a été crée avec succès et le stock a été mis à jour !"
            },
            error: (e) => {console.error(e)
              this.errorText = "La quantité commandée est trop importante!",
              this.alert = true}
            
          });

        },
        error: (e) => console.error(e)
      });
  }


showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de passer une commande avec cet utilisateur !'});
} 


}
