package com.biomarket.biomarket.dto;

/*------------------------------ATTRIBUTS--------------------------------------*/

public class FournisseurRequest {
    private String nom;
    private String telephone;
    private String mail;
    private int cp;
    private String adresse;
    private String ville;

/*------------------------------GETTER/SETTER--------------------------------------*/
    
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
