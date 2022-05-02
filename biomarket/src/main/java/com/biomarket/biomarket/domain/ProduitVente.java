package com.biomarket.biomarket.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;


@Entity
public class ProduitVente {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @EmbeddedId ProduitVenteKey id = new ProduitVenteKey();


    // int numero;

    @ManyToOne
    @MapsId("produit_id")
    @JoinColumn(name = "produit_id")
    Produit produit;

    @ManyToOne
    @MapsId("vente_id")
    @JoinColumn(name = "vente_id")

    Vente vente;

    int numero;
    
    float quantitekg;

    String statut;

/*------------------------------GETTER/SETTER--------------------------------------*/


    public int getNumero() {
        return this.numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public ProduitVenteKey getId() {
        return this.id;
    }

    public void setId(ProduitVenteKey id) {
        this.id = id;
    }

    public Produit getProduit() {
        return this.produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Vente getVente() {
        return this.vente;
    }

    public void setVente(Vente vente) {
        this.vente = vente;
    }

    public float getQuantitekg() {
        return this.quantitekg;
    }

    public void setQuantitekg(float quantitekg) {
        this.quantitekg = quantitekg;
    }
    
    public String getStatut() {
        return this.statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

}
