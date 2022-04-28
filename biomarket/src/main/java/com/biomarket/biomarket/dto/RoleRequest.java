package com.biomarket.biomarket.dto;

/*------------------------------ATTRIBUTS--------------------------------------*/

public class RoleRequest {
    private String nom;
    private String statut;
    
/*------------------------------GETTER/SETTER--------------------------------------*/


    public String getNom() {
        return this.nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public String getStatut() {
        return this.statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }


}
