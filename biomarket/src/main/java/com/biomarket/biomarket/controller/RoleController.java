package com.biomarket.biomarket.controller;

import java.util.Optional;

import com.biomarket.biomarket.domain.Role;
import com.biomarket.biomarket.dto.RoleRequest;
import com.biomarket.biomarket.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private RoleRepository roleRepository;

/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/role")
    public @ResponseBody ResponseEntity<Iterable<Role>> getRoles(){
        Iterable<Role> role = roleRepository.findAll();
        return ResponseEntity.ok().body(role);
    }

/*------------------------------POST-------------------------------------------*/


@PostMapping("/api/v1/role")
public @ResponseBody ResponseEntity<Role> postRole(@RequestBody RoleRequest roleRequest){
    Role role = new Role();
    role.setNom(roleRequest.getNom());
    roleRepository.save(role);
    return ResponseEntity.ok().body(role);
}


/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/role/{id}")
public @ResponseBody ResponseEntity<Role> get(@PathVariable int id){
   Optional<Role> resultat = roleRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Role role = resultat.get();
   return ResponseEntity.ok().body(role);
}   


/*------------------------------GET BY NAME----------------------------------------*/

@GetMapping("/api/v1/roleByNom/{nom}")
public @ResponseBody ResponseEntity<Role> getByName(@PathVariable String nom){
   Optional<Role> resultat = roleRepository.findByNom(nom);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Role role = resultat.get();
   return ResponseEntity.ok().body(role);
}   

/*------------------------------DELETE(ID)-------------------------------------*/


@DeleteMapping("/api/v1/role/{id}")
public @ResponseBody ResponseEntity<Role> deleteRole(@PathVariable int id){
    Optional<Role> resultat = roleRepository.findById(id);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Role role = resultat.get();
    roleRepository.deleteById(id);
    return ResponseEntity.ok().body(role);
}

/*------------------------------DELETE(NOM)-------------------------------------*/


@DeleteMapping("/api/v1/roleByName/{nom}")
public @ResponseBody ResponseEntity<Role> deleteRoleByName(@PathVariable String nom){
    Optional<Role> resultat = roleRepository.findByNom(nom);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Role role = resultat.get();
    roleRepository.deleteByNom(nom);
    return ResponseEntity.ok().body(role);
}

/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allRole/")
public void deletAllRole(){
    roleRepository.deleteAll();
}

/*------------------------------PUT(ID)-----------------------------------------*/

@PutMapping("/api/v1/role/{id}")
public @ResponseBody ResponseEntity<Role> modifyRole(@PathVariable int id,
        @RequestBody RoleRequest requestDto) {
    Optional<Role> result = roleRepository.findById(id);
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    Role role = result.get();
    role.setNom(requestDto.getNom());
    roleRepository.save(role);
    return ResponseEntity.ok().body((role));
    }  
}
