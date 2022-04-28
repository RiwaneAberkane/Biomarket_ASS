package com.biomarket.biomarket.dto;

import java.sql.Date;

import com.biomarket.biomarket.domain.Fournisseur;
import com.biomarket.biomarket.domain.Utilisateur;


/*------------------------------ATTRIBUTS--------------------------------------*/

public class CommandeRequest {
    private Date date;
    private Utilisateur utilisateur;
    private Fournisseur fournisseur;
    private String utilisateurLogin;
    private String fournisseurMail;


/*------------------------------GETTER/SETTER--------------------------------------*/

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public String getUtilisateurLogin() {
        return this.utilisateurLogin;
    }

    public void setUtilisateurLogin(String utilisateurLogin) {
        this.utilisateurLogin = utilisateurLogin;
    }


    public String getFournisseurMail() {
        return this.fournisseurMail;
    }

    public void setFournisseurMail(String fournisseurMail) {
        this.fournisseurMail = fournisseurMail;
    }

}
