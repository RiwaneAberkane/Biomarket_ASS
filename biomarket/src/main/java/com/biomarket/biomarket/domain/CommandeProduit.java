package com.biomarket.biomarket.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;


@Entity
public class CommandeProduit {

/*------------------------------ATTRIBUTS--------------------------------------*/




    @EmbeddedId CommandeProduitKey id = new CommandeProduitKey();
    
    int numero;

    @ManyToOne
    @MapsId("produit_id")
    @JoinColumn(name = "produit_id")
    Produit produit;

    @ManyToOne
    @MapsId("commande_id")
    @JoinColumn(name = "commande_id")
    Commande commande;
    
    float quantitekg;
    
/*------------------------------GETTER/SETTER--------------------------------------*/

    public CommandeProduitKey getId() {
        return this.id;
    }

    public void setId(CommandeProduitKey id) {
        this.id = id;
    }

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
    

    public int getNumero() {
        return this.numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

}
