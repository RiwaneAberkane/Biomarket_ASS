package com.biomarket.biomarket.repository;

import java.util.List;
import java.util.Optional;

import com.biomarket.biomarket.domain.Utilisateur;
import org.springframework.data.repository.CrudRepository;

public interface UtilisateurRepository extends CrudRepository<Utilisateur, Integer>{
    
    public Optional<Utilisateur> findByLogin(String login);
    public Optional<Utilisateur> findByLoginAndMdp(String login, String mdp);
    public List<Utilisateur> findByStatut(String statut);

}
