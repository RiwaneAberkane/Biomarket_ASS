package com.biomarket.biomarket.dto;

import com.biomarket.biomarket.domain.Role;

/*------------------------------ATTRIBUTS--------------------------------------*/

public class UtilisateurRequest {

    private String login;
    private String mdp;
    private String nom;
    private String prenom;
    private String telephone;
    private String roleNom;   // Pour créer un utilisateur en utilisant le nom de son rôle 
    private Role role; // On utilise l'objet rôle et on fait un .getNom dessus pour récupérer que le nom du rôle

/*------------------------------GETTER/SETTER--------------------------------------*/



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

    public String getRoleNom() {
        return this.roleNom;
    }

    public void setRoleNom(String roleNom) {
        this.roleNom = roleNom;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }   
}
