package com.biomarket.biomarket.repository;

import java.util.Optional;

import com.biomarket.biomarket.domain.Utilisateur;
import org.springframework.data.repository.CrudRepository;

public interface UtilisateurRepository extends CrudRepository<Utilisateur, Integer>{
    
    public Optional<Utilisateur> findByLogin(String login);
}
