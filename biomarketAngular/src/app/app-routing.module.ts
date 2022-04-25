import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { ClientsListeComponent } from './client/clients-liste/clients-liste.component';
import { PaginationClientsListeComponent } from './client/pagination-clients-liste/pagination-clients-liste.component';
import { AddCommandeProduitComponent } from './commande-produit/add-commande-produit/add-commande-produit.component';
import { CommandeProduitDetailsComponent } from './commande-produit/commande-produit-details/commande-produit-details.component';
import { CommandesProduitsListeComponent } from './commande-produit/commandes-produits-liste/commandes-produits-liste.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { CommandeDetailsComponent } from './commande/commande-details/commande-details.component';
import { CommandesListeComponent } from './commande/commandes-liste/commandes-liste.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { FournisseurDetailsComponent } from './fournisseur/fournisseur-details/fournisseur-details.component';
// import { FournisseursListeComponent } from './fournisseur/fournisseurs-liste/fournisseurs-liste.component';
import { PaginationFournisseursListeComponent } from './fournisseur/pagination-fournisseurs-liste/pagination-fournisseurs-liste.component';
import { AddProduitVenteComponent } from './produit-vente/add-produit-vente/add-produit-vente.component';
import { ProduitVenteDetailsComponent } from './produit-vente/produit-vente-details/produit-vente-details.component';
import { ProduitsVentesListeComponent } from './produit-vente/produits-ventes-liste/produits-ventes-liste.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { ProduitDetailsComponent } from './produit/produit-details/produit-details.component';
import { ProduitsListeComponent } from './produit/produits-liste/produits-liste.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { RoleDetailsComponent } from './role/role-details/role-details.component';
import { RolesListeComponent } from './role/roles-liste/roles-liste.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { PaginationUtilisateursListeComponent } from './utilisateur/pagination-utilisateurs-liste/pagination-utilisateurs-liste.component';
import { UtilisateurDetailsComponent } from './utilisateur/utilisateur-details/utilisateur-details.component';
// import { UtilisateursListeComponent } from './utilisateur/utilisateurs-liste/utilisateurs-liste.component';
import { AddVenteComponent } from './vente/add-vente/add-vente.component';
import { VenteDetailsComponent } from './vente/vente-details/vente-details.component';
import { VentesListeComponent } from './vente/ventes-liste/ventes-liste.component';


const routes: Routes = [
  // UTILISATEURS ----------------------------------
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
  { path: 'utilisateurs', component: PaginationUtilisateursListeComponent },
  { path: 'utilisateurs/:id', component: UtilisateurDetailsComponent },
  { path: 'addUtilisateurs', component: AddUtilisateurComponent },
  // RÔLES -----------------------------------------
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
  { path: 'roles', component: RolesListeComponent },
  { path: 'roles/:id', component: RoleDetailsComponent },
  { path: 'add', component: AddRoleComponent },
  // FOURNISSEURS ----------------------------------
  { path: '', redirectTo: 'fournisseurs', pathMatch: 'full' },
  { path: 'fournisseurs', component: PaginationFournisseursListeComponent },
  { path: 'fournisseurs/:id', component: FournisseurDetailsComponent },
  { path: 'addFournisseurs', component: AddFournisseurComponent },
  // CLIENTS ----------------------------------
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: PaginationClientsListeComponent },
  { path: 'clients/:id', component: ClientDetailsComponent },
  { path: 'addClient', component: AddClientComponent },
   // PRODUITS ----------------------------------
  { path: '', redirectTo: 'produits', pathMatch: 'full' },
  { path: 'produits', component: ProduitsListeComponent },
  { path: 'produits/:id', component: ProduitDetailsComponent },
  { path: 'addProduit', component: AddProduitComponent },
  // VENTES ----------------------------------
  { path: '', redirectTo: 'ventes', pathMatch: 'full' },
  { path: 'ventes', component: VentesListeComponent },
  { path: 'ventes/:id', component: VenteDetailsComponent },
  { path: 'addVente', component: AddVenteComponent },
  // COMMANDES ----------------------------------
  { path: '', redirectTo: 'commandes', pathMatch: 'full' },
  { path: 'commandes', component: CommandesListeComponent },
  { path: 'commandes/:id', component: CommandeDetailsComponent },
  { path: 'addCommande', component: AddCommandeComponent },
  // COMMANDES PRODUITS ----------------------------------
  { path: '', redirectTo: 'commandesProduits', pathMatch: 'full' },
  { path: 'commandesProduits', component: CommandesProduitsListeComponent },
  { path: 'commandesProduits/:numero', component: CommandeProduitDetailsComponent },
  { path: 'addCommandeProduit', component: AddCommandeProduitComponent },
  // PRODUITS VENTE ----------------------------------
  { path: '', redirectTo: 'produitsVentes', pathMatch: 'full' },
  { path: 'produitsVentes', component: ProduitsVentesListeComponent },
  { path: 'produitsVentes/:numero', component: ProduitVenteDetailsComponent },
  { path: 'addProduitVente', component: AddProduitVenteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
