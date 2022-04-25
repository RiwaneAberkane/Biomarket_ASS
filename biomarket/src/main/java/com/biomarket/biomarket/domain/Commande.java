package com.biomarket.biomarket.domain;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Commande {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int commande_id;
    Date date;

    @ManyToOne
    private Utilisateur utilisateur;

    @ManyToOne
    private Fournisseur fournisseur;

/*------------------------------GETTER/SETTER--------------------------------------*/

    public int getCommande_id() {
        return this.commande_id;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public void setCommande_id(int commande_id) {
        this.commande_id = commande_id;
    }

    public Utilisateur getUtilisateur() {
        return this.utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Fournisseur getFournisseur() {
        return this.fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

}
