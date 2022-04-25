package com.biomarket.biomarket.domain;



import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.ManyToOne;



@Entity
public class Utilisateur {

/*------------------------------ATTRIBUTS--------------------------------------*/

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int utilisateur_id;
    String login;
    String mdp;
    String nom;
    String prenom;
    String telephone;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

/*------------------------------GETTER/SETTER--------------------------------------*/


    public int getUtilisateur_id() {
        return this.utilisateur_id;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getMdp() {
        return this.mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public String getNom() {
        return this.nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setUtilisateur_id(int utilisateur_id) {
        this.utilisateur_id = utilisateur_id;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    // A compléter lorsque sécurité -----------------------------------

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     return null;
    // }
    // -----------------------------------------------------------------

    // @Override
    // public boolean isAccountNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isAccountNonLocked() {
    //     return true;
    // }

    // @Override
    // public boolean isCredentialsNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isEnabled() {
    //     return true;
    // }

    // @Override
    // public String getPassword() {
    //     // TODO Auto-generated method stub
    //     return mdp;
    // }

    // @Override
    // public String getUsername() {
        
    //     // TODO Auto-generated method stub
    //     return login;
    // }
   
}
