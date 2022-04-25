package com.biomarket.biomarket.repository;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.Commande;
import com.biomarket.biomarket.domain.Fournisseur;
// import com.biomarket.biomarket.domain.Utilisateur;

import org.springframework.data.repository.CrudRepository;


public interface CommandeRepository extends CrudRepository<Commande, Integer>{
    public Optional<Commande> findByDate (Date date);
    Iterable<Commande> findAllByDate (Date date);
    public Optional<Commande> findByDateAndFournisseur (Date date , Fournisseur fournisseur);
}
