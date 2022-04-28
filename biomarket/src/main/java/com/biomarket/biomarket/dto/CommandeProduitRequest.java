package com.biomarket.biomarket.dto;

import java.sql.Date;

import com.biomarket.biomarket.domain.Commande;
import com.biomarket.biomarket.domain.Produit;

/*------------------------------ATTRIBUTS--------------------------------------*/

public class CommandeProduitRequest {

    Produit produit;
    String produitNom;

    Commande commande;
    Date commandeDate;

    float quantitekg;
    String fournisseurMail;

/*------------------------------GETTER/SETTER--------------------------------------*/


    public Produit getProduit() {
        return this.produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Commande getCommande() {
        return this.commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }
   
    public float getQuantitekg() {
        return this.quantitekg;
    }

    public void setQuantitekg(float quantitekg) {
        this.quantitekg = quantitekg;
    }


    public String getProduitNom() {
        return this.produitNom;
    }

    public void setProduitNom(String produitNom) {
        this.produitNom = produitNom;
    }

    public Date getCommandeDate() {
        return this.commandeDate;
    }

    public void setCommandeDate(Date commandeDate) {
        this.commandeDate = commandeDate;
    }
    
    public String getFournisseurMail() {
        return this.fournisseurMail;
    }

    public void setFournisseurMail(String fournisseurMail) {
        this.fournisseurMail = fournisseurMail;
    }


}
