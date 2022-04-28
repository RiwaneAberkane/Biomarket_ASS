package com.biomarket.biomarket.repository;

import java.util.List;
import java.util.Optional;

import com.biomarket.biomarket.domain.Fournisseur;
import org.springframework.data.repository.CrudRepository;

public interface FournisseurRepository extends CrudRepository<Fournisseur, Integer>{
    
    public Optional<Fournisseur> findByNom(String nom);
    public Optional<Fournisseur> findByMail(String mail);
    public List<Fournisseur> findByStatut(String statut);
}
