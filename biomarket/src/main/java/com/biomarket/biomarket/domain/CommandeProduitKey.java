package com.biomarket.biomarket.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class CommandeProduitKey implements Serializable {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Column(name = "produit_id")
    int produit_id;

    @Column(name = "commande_id")
    int commande_id;


/*------------------------------GETTER/SETTER--------------------------------------*/
    

    public int getProduit_id() {
        return this.produit_id;
    }

    public void setProduit_id(int produit_id) {
        this.produit_id = produit_id;
    }

    public int getCommande_id() {
        return this.commande_id;
    }

    public void setCommande_id(int commande_id) {
        this.commande_id = commande_id;
    }

/*------------------------------HASHCODE--------------------------------------*/


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CommandeProduitKey)) {
            return false;
        }
        CommandeProduitKey commandeProduitKey = (CommandeProduitKey) o;
        return produit_id == commandeProduitKey.produit_id && commande_id == commandeProduitKey.commande_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(produit_id, commande_id);
    }


}
