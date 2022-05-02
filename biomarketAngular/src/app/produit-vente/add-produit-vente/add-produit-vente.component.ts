import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ProduitService } from 'src/app/produit/produit.service';
import { Utilisateur } from 'src/app/utilisateur/utilisateur';
import { UtilisateurService } from 'src/app/utilisateur/utilisateur.service';
import { Vente } from 'src/app/vente/vente';
import { VenteService } from 'src/app/vente/vente.service';
import { ProduitVente } from '../produit-vente';
import { ProduitVenteService } from '../produit-vente.service';

@Component({
  selector: 'app-add-produit-vente',
  templateUrl: './add-produit-vente.component.html',
  styleUrls: ['./add-produit-vente.component.scss']
})
export class AddProduitVenteComponent implements OnInit {

  produitVente: ProduitVente = {id: '',produitNom : '',venteDate: '',quantitekg :''};
  venteSubmitted = false
  submitted = false;
  vente: Vente = new Vente(0, '');
  errorText = '';
  successText = '';
  alert = false
  tabProduitVente : any[] = []
  tabUtilisateur : Utilisateur[] = [];
  tabClient : Client[] = [];
  tabProduit: any[] = []
  tabbo = false
  statut = 'Vendu'

  constructor(private produitVenteService: ProduitVenteService, private venteService: VenteService,  private utilisateurService: UtilisateurService, private clientService : ClientService,
    private produitService : ProduitService, private messageService: MessageService) { }


    
  ngOnInit(): void {
    this.utilisateurService.getAll().subscribe( data => {this.tabUtilisateur = data
      console.log(this.tabUtilisateur)} 
        )

    this.clientService.getAll().subscribe( data => {this.tabClient = data
      console.log(this.tabClient)} 
        )

    this.produitService.getAll().subscribe(data => {this.tabProduit = data
      console.log(this.tabProduit)}
        
    )}

// CREATE -------------------



  newProduitVente(): void {
    this.submitted = false;
    this.produitVente = {id: '',produitNom : '',venteDate: '',quantitekg :''};
    this.alert = false ;
  }

// SAVE ------------------------

  save(): void {
    if (this.produitVente.produitNom === '' || this.vente.date === '' || this.produitVente.quantitekg === '' || this.vente.utilisateurLogin === '' || this.vente.clientMail === ''){
      this.venteSubmitted = true;
      this.showError();
      return;
    }
    this.produitService.search(this.produitVente.produitNom).subscribe(produit => {
      if  ( produit.statut === 'Inactif')
      {
      this.showError6()
      return
      } 
      if (produit.quantitekg < this.produitVente.quantitekg)
      {
        this.showError10();
        this.showWarning();
        return 
      }
    this.clientService.search(this.vente.clientMail).subscribe(client => {
      if  ( client.statut === 'Inactif')
      {
      this.showError5()
      return
      } 

    this.utilisateurService.findByLogin(this.vente.utilisateurLogin).subscribe(utilisateur => {
      if  ( utilisateur.statut === 'Inactif')
      {
      this.showError3()
      return
      }
    const data = {
      produitNom: this.produitVente.produitNom,
      venteDate: this.vente.date,
      quantitekg: this.produitVente.quantitekg,
      client: this.vente.clientMail,
      statut : this.statut
    };
    const venteData ={
      date: this.vente.date,
      utilisateurLogin: this.vente.utilisateurLogin,
      clientMail: this.vente.clientMail
    }
    this.venteService.create(venteData)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.venteSubmitted = false;
        this.submitted = true;

        this.produitVenteService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.tabProduitVente.push(res)
            this.venteSubmitted = false;
            this.successText ="La vente a été crée avec succès et le stock a été mis à jour !"
            this.showSuccess();
            this.tabbo = true
          },
          error: (e) => {console.error(e);
          this.errorText = "Pas assez de quantité dans le stock !",
          this.showError1()
          this.alert = true}
          
        });
    },
    error: (e) => console.error(e)
  });
  })
})
}) 
}

showError6() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de procéder à une vente avec ce produit !'});
} 

  showError5() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de procéder à une vente avec ce client !'});
  } 
  
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
  } 

  showError3() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de procéder à une vente avec cet utilisateur !'});
  } 
  
  showError1() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Pas assez de quantité dans le stock !'});
  } 

  showError10() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Pas assez de quantité dans le stock !'});
  } 

  showWarning() {
    this.produitService.search(this.produitVente.produitNom).subscribe(produit => {
    this.messageService.add({severity:'warn', summary: 'Attention', detail: produit.quantitekg + 'Kg de ' + this.produitVente.produitNom + ' dans le stock !' });
  })
  } 

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'La vente a été crée avec succès et le stock a été mis à jour !'});
  }
}
