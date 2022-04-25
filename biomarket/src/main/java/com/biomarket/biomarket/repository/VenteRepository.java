package com.biomarket.biomarket.repository;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.Client;
// import com.biomarket.biomarket.domain.Utilisateur;
import com.biomarket.biomarket.domain.Vente;
import org.springframework.data.repository.CrudRepository;


public interface VenteRepository extends CrudRepository<Vente, Integer>{
    public Optional<Vente> findByDate(Date date);
    // public Optional<Vente> findByDateAndUtilisateur (Date date , Utilisateur utilisateur);
    public Optional<Vente> findByDateAndClient (Date date , Client client);
}
