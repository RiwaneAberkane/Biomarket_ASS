package com.biomarket.biomarket.dto;

import java.sql.Date;

import com.biomarket.biomarket.domain.Client;
import com.biomarket.biomarket.domain.Utilisateur;



/*------------------------------ATTRIBUTS--------------------------------------*/

public class VenteRequest {
    private Date date;
    private Utilisateur utilisateur;
    private Client client;
    private String utilisateurLogin;
    private String clientMail;

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

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


    public String getUtilisateurLogin() {
        return this.utilisateurLogin;
    }

    public void setUtilisateurLogin(String utilisateurLogin) {
        this.utilisateurLogin = utilisateurLogin;
    }

    public String getClientMail() {
        return this.clientMail;
    }

    public void setClientMail(String clientMail) {
        this.clientMail = clientMail;
    }

}
