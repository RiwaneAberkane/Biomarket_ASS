package com.biomarket.biomarket.dto;

import java.sql.Date;

import com.biomarket.biomarket.domain.Produit;
import com.biomarket.biomarket.domain.Vente;

/*------------------------------ATTRIBUTS--------------------------------------*/

public class ProduitVenteRequest {


    Produit produit;
    String produitNom;
    Vente vente;
    Date venteDate;
    float quantitekg;
    String client;
    String statut;
    int numero;

/*------------------------------GETTER/SETTER--------------------------------------*/


    public int getNumero() {
        return this.numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
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

    public String getProduitNom() {
        return this.produitNom;
    }

    public void setProduitNom(String produitNom) {
        this.produitNom = produitNom;
    }

    public Date getVenteDate() {
        return this.venteDate;
    }

    public void setVenteDate(Date venteDate) {
        this.venteDate = venteDate;
    }

    public String getClient() {
        return this.client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getStatut() {
        return this.statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

}