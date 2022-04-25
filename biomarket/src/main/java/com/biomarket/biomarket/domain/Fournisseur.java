package com.biomarket.biomarket.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Fournisseur {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int fournisseur_id;
    String nom;
    String telephone;
    String mail;
    int cp;
    String adresse;
    String ville;

/*------------------------------GETTER/SETTER--------------------------------------*/


    public int getFournisseur_id() {
        return this.fournisseur_id;
    }

    public String getNom() {
        return this.nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMail() {
        return this.mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public int getCp() {
        return this.cp;
    }

    public void setCp(int cp) {
        this.cp = cp;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return this.ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    
}
