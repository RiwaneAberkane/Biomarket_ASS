package com.biomarket.biomarket.repository;

import java.util.Optional;

import com.biomarket.biomarket.domain.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {

    public Optional<Role> findByNom(String nom);
    public Optional<Role> deleteByNom(String nom);


    
}
