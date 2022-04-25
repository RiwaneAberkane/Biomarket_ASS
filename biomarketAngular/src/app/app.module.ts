import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { RolesListeComponent } from './role/roles-liste/roles-liste.component';
import { RoleDetailsComponent } from './role/role-details/role-details.component';
import { IonicModule } from '@ionic/angular';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { UtilisateurDetailsComponent } from './utilisateur/utilisateur-details/utilisateur-details.component';
import { UtilisateursListeComponent } from './utilisateur/utilisateurs-liste/utilisateurs-liste.component';
import {AccordionModule} from 'primeng/accordion'; 
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { FournisseurDetailsComponent } from './fournisseur/fournisseur-details/fournisseur-details.component';
import { FournisseursListeComponent } from './fournisseur/fournisseurs-liste/fournisseurs-liste.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { ClientsListeComponent } from './client/clients-liste/clients-liste.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { ProduitDetailsComponent } from './produit/produit-details/produit-details.component';
import { ProduitsListeComponent } from './produit/produits-liste/produits-liste.component';
import { AddVenteComponent } from './vente/add-vente/add-vente.component';
import { VenteDetailsComponent } from './vente/vente-details/vente-details.component';
import { VentesListeComponent } from './vente/ventes-liste/ventes-liste.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { CommandeDetailsComponent } from './commande/commande-details/commande-details.component';
import { CommandesListeComponent } from './commande/commandes-liste/commandes-liste.component';
import { AddCommandeProduitComponent } from './commande-produit/add-commande-produit/add-commande-produit.component';
import { CommandeProduitDetailsComponent } from './commande-produit/commande-produit-details/commande-produit-details.component';
import { CommandesProduitsListeComponent } from './commande-produit/commandes-produits-liste/commandes-produits-liste.component';
import { AddProduitVenteComponent } from './produit-vente/add-produit-vente/add-produit-vente.component';
import { ProduitVenteDetailsComponent } from './produit-vente/produit-vente-details/produit-vente-details.component';
import { ProduitsVentesListeComponent } from './produit-vente/produits-ventes-liste/produits-ventes-liste.component';
import { Sidebar1Component } from './sidebar1/sidebar1/sidebar1.component';
import { NavbarComponent } from './navbar/navbar/navbar.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ToastModule} from 'primeng/toast';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PaginationUtilisateursListeComponent } from './utilisateur/pagination-utilisateurs-liste/pagination-utilisateurs-liste.component';
import { PaginationFournisseursListeComponent } from './fournisseur/pagination-fournisseurs-liste/pagination-fournisseurs-liste.component';
import { PaginationClientsListeComponent } from './client/pagination-clients-liste/pagination-clients-liste.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    AddRoleComponent,
    RolesListeComponent,
    RoleDetailsComponent,
    AddUtilisateurComponent,
    UtilisateurDetailsComponent,
    UtilisateursListeComponent,
    AddFournisseurComponent,
    FournisseurDetailsComponent,
    FournisseursListeComponent,
    AddClientComponent,
    ClientDetailsComponent,
    ClientsListeComponent,
    AddProduitComponent,
    ProduitDetailsComponent,
    ProduitsListeComponent,
    AddVenteComponent,
    VenteDetailsComponent,
    VentesListeComponent,
    AddCommandeComponent,
    CommandeDetailsComponent,
    CommandesListeComponent,
    AddCommandeProduitComponent,
    CommandeProduitDetailsComponent,
    CommandesProduitsListeComponent,
    AddProduitVenteComponent,
    ProduitVenteDetailsComponent,
    ProduitsVentesListeComponent,
    Sidebar1Component,
    NavbarComponent,
    PaginationUtilisateursListeComponent,
    PaginationFournisseursListeComponent,
    PaginationClientsListeComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    ConfirmDialogModule,
    NgxPaginationModule,
    AccordionModule,
    MessageModule,
    MessagesModule,
    FontAwesomeModule,
    ToastModule,
    MatAutocompleteModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],

  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
