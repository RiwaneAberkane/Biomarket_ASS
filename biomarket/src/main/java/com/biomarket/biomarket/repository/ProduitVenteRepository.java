package com.biomarket.biomarket.repository;



import java.sql.Date;
// import java.util.Optional;

import com.biomarket.biomarket.domain.ProduitVente;
import org.springframework.data.repository.CrudRepository;


public interface ProduitVenteRepository extends CrudRepository<ProduitVente, Integer>{
    public Iterable<ProduitVente> findByVenteDate (Date date);
    // public Optional <ProduitVente> findByNumero (int numero);
    // public Optional <ProduitVente> deleteByNumero (int numero); 
 
}
