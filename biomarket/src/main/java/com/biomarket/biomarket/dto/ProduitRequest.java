package com.biomarket.biomarket.dto;

/*------------------------------ATTRIBUTS--------------------------------------*/

public class ProduitRequest {

    private String nom;
    private String type;
    private float quantitekg;
    private float pachatkg;
    private float pventekg;
    private String statut;


/*------------------------------GETTER/SETTER--------------------------------------*/


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

    public String getStatut() {
        return this.statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }


    
}
