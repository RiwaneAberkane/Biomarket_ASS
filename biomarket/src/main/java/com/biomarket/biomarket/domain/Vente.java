package com.biomarket.biomarket.domain;



import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Vente {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int vente_id;
    Date date;

    @ManyToOne
    private Utilisateur utilisateur;

    @ManyToOne
    private Client client;

/*------------------------------GETTER/SETTER--------------------------------------*/


    public int getVente_id() {
        return this.vente_id;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public void setVente_id(int vente_id) {
        this.vente_id = vente_id;
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

}
