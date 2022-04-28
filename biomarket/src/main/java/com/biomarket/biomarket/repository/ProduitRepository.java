package com.biomarket.biomarket.repository;

import java.util.List;
import java.util.Optional;

import com.biomarket.biomarket.domain.Produit;
import org.springframework.data.repository.CrudRepository;

public interface ProduitRepository extends CrudRepository<Produit, Integer> {
    
    public Optional<Produit> findByNom(String nom);
    public List<Produit> findByStatut(String statut);
}
