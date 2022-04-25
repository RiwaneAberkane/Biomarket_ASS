package com.biomarket.biomarket.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class ProduitVenteKey implements Serializable {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Column(name = "produit_id")
    int produit_id;

    @Column(name = "vente_id")
    int vente_id;


/*------------------------------GETTER/SETTER--------------------------------------*/

    public int getProduit_id() {
        return this.produit_id;
    }

    public void setProduit_id(int produit_id) {
        this.produit_id = produit_id;
    }

    public int getVente_id() {
        return this.vente_id;
    }

    public void setVente_id(int vente_id) {
        this.vente_id = vente_id;
    }


/*------------------------------HASHCODE--------------------------------------*/

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ProduitVenteKey)) {
            return false;
        }
        ProduitVenteKey produitVenteKey = (ProduitVenteKey) o;
        return produit_id == produitVenteKey.produit_id && vente_id == produitVenteKey.vente_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(produit_id, vente_id);
    }


    
}
