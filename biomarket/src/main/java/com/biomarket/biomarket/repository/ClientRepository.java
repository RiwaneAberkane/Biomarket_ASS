package com.biomarket.biomarket.repository;

import java.util.List;
import java.util.Optional;

import com.biomarket.biomarket.domain.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, Integer>{

    public Optional<Client> findByMail(String mail);
    public List<Client> findByStatut(String statut);
    
}
