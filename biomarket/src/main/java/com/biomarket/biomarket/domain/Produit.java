package com.biomarket.biomarket.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Produit {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int produit_id;
    String nom;
    String type;
    float quantitekg;
    float pachatkg;
    float pventekg;

/*------------------------------GETTER/SETTER--------------------------------------*/

    public int getProduit_id() {
        return this.produit_id;
    }

    public String getNom() {
        return this.nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getQuantitekg() {
        return this.quantitekg;
    }

    public void setQuantitekg(float quantitekg) {
        this.quantitekg = quantitekg;
    }

    public float getPachatkg() {
        return this.pachatkg;
    }

    public void setPachatkg(float pachatkg) {
        this.pachatkg = pachatkg;
    }

    public float getPventekg() {
        return this.pventekg;
    }

    public void setPventekg(float pventekg) {
        this.pventekg = pventekg;
    }
}
