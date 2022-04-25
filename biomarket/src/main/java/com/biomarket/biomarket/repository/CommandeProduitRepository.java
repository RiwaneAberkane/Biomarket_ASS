package com.biomarket.biomarket.repository;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.CommandeProduit;
import org.springframework.data.repository.CrudRepository;

public interface CommandeProduitRepository extends CrudRepository<CommandeProduit, Integer>{
    public Iterable<CommandeProduit> findByCommandeDate (Date date);
    public Optional<CommandeProduit> findByNumero (int numero);
    public Optional<CommandeProduit> deleteByNumero (int numero);
    
    
    
}
