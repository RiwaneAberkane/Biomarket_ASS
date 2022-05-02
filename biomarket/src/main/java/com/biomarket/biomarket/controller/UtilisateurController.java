package com.biomarket.biomarket.controller;

import java.util.Optional;

import com.biomarket.biomarket.domain.Role;
import com.biomarket.biomarket.domain.Utilisateur;
import com.biomarket.biomarket.dto.UtilisateurRequest;
import com.biomarket.biomarket.repository.RoleRepository;
import com.biomarket.biomarket.repository.UtilisateurRepository;

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
public class UtilisateurController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private UtilisateurRepository utilisateurRepository;


    @Autowired
    private RoleRepository roleRepository;

/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/utilisateur")
    public @ResponseBody ResponseEntity<Iterable<Utilisateur>> getUtilisateurs(){
        Iterable<Utilisateur> utilisateur = utilisateurRepository.findAll();
        return ResponseEntity.ok().body(utilisateur);
    }

    /*------------------------------GET BY STATUS--------------------------------------------*/

    @GetMapping("/api/v1/utilisateurStatut/{statut}")
    public @ResponseBody ResponseEntity<Iterable<Utilisateur>> getUtilisateurByStatus(@PathVariable String statut){
        Iterable<Utilisateur> utilisateur = utilisateurRepository.findByStatut(statut);
        return ResponseEntity.ok().body(utilisateur);
    }


/*------------------------------POST ID-------------------------------------------*/


// @PostMapping("/api/v1/utilisateur")
// public @ResponseBody ResponseEntity<Utilisateur> postUtilisateur(@RequestBody UtilisateurRequest utilisateurRequest){
//     Optional<Role> result = roleRepository.findById(utilisateurRequest.getRole());
//     if(result.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     Utilisateur utilisateur = new Utilisateur();
//     utilisateur.setLogin(utilisateurRequest.getLogin());
//     utilisateur.setMdp(utilisateurRequest.getMdp());
//     utilisateur.setNom(utilisateurRequest.getNom());
//     utilisateur.setPrenom(utilisateurRequest.getPrenom());
//     utilisateur.setTelephone(utilisateurRequest.getTelephone());
//     utilisateur.setRole(result.get());
//     utilisateurRepository.save(utilisateur);
//     return ResponseEntity.ok().body(utilisateur);
// }

/* ------------------------- POST BY NOM DE ROLE ------------------------------------------------------------ */

@PostMapping("/api/v1/utilisateurByNameRole")
public @ResponseBody ResponseEntity<Utilisateur> postUtilisateurByNameRole(@RequestBody UtilisateurRequest utilisateurRequestByName){
    Optional<Role> resultByName = roleRepository.findByNom(utilisateurRequestByName.getRoleNom());   // Faire un Create Utilisateur avec le nom de son Rôle
    if(resultByName.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Utilisateur utilisateurByName = new Utilisateur();
    utilisateurByName.setLogin(utilisateurRequestByName.getLogin());
    utilisateurByName.setMdp(utilisateurRequestByName.getMdp());
    utilisateurByName.setNom(utilisateurRequestByName.getNom());
    utilisateurByName.setPrenom(utilisateurRequestByName.getPrenom());
    utilisateurByName.setTelephone(utilisateurRequestByName.getTelephone());
    utilisateurByName.setStatut(utilisateurRequestByName.getStatut());
    utilisateurByName.setRole(resultByName.get());
    utilisateurRepository.save(utilisateurByName);
    return ResponseEntity.ok().body(utilisateurByName);
}

/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/utilisateur/{id}")
public @ResponseBody ResponseEntity<Utilisateur> get(@PathVariable int id){
   Optional<Utilisateur> resultat = utilisateurRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Utilisateur utilisateur = resultat.get();
   return ResponseEntity.ok().body(utilisateur);
}   


/*------------------------------GET BY LOGIN----------------------------------------*/

@GetMapping("/api/v1/utilisateurByLogin/{login}")
public @ResponseBody ResponseEntity<Utilisateur> getByLogin(@PathVariable String login){
   Optional<Utilisateur> resultat = utilisateurRepository.findByLogin(login);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Utilisateur utilisateur = resultat.get();
   return ResponseEntity.ok().body(utilisateur);
}   

/*------------------------------GET BY LOGIN AND MDP----------------------------------------*/

@GetMapping("/api/v1/utilisateurByLogin/{login}/{mdp}")
public @ResponseBody ResponseEntity<Utilisateur> getByLoginAndMdp(@PathVariable String login, @PathVariable String mdp ){
   Optional<Utilisateur> resultat = utilisateurRepository.findByLoginAndMdp(login, mdp);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Utilisateur utilisateur = resultat.get();
   return ResponseEntity.ok().body(utilisateur);
}   


/*------------------------------DELETE(ID)-------------------------------------*/


@DeleteMapping("/api/v1/utilisateur/{id}")
public @ResponseBody ResponseEntity<Utilisateur> deleteUtilisateur(@PathVariable int id){
    Optional<Utilisateur> resultat = utilisateurRepository.findById(id);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Utilisateur utilisateur = resultat.get();
    utilisateurRepository.deleteById(id);
    return ResponseEntity.ok().body(utilisateur);
}


/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allUtilisateur/")
public void deletAllUtilisateur(){
    utilisateurRepository.deleteAll();
}

/*------------------------------PUT(ID)-----------------------------------------*/

// @PutMapping("/api/v1/utilisateur/{id}")
// public @ResponseBody ResponseEntity<Utilisateur> modifyUtilisateur(@PathVariable int id,
//         @RequestBody UtilisateurRequest requestDto) {
//     Optional<Utilisateur> result = utilisateurRepository.findById(id);
//     Optional<Role> result1 = roleRepository.findById(requestDto.getRole());
//     if (result.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if(result1.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     Utilisateur utilisateur = result.get();
//     utilisateur.setLogin(requestDto.getLogin());
//     utilisateur.setMdp(requestDto.getMdp());
//     utilisateur.setNom(requestDto.getNom());
//     utilisateur.setPrenom(requestDto.getPrenom());
//     utilisateur.setTelephone(requestDto.getTelephone());
//     utilisateur.setRole(result1.get());
//     utilisateurRepository.save(utilisateur);
//     return ResponseEntity.ok().body((utilisateur));
//     }   
    
/*------------------------------PUT BY ROLE NOM-----------------------------------------*/

    @PutMapping("/api/v1/utilisateurByNom/{id}")
public @ResponseBody ResponseEntity<Utilisateur> modifyUtilisateurByRoleNom(@PathVariable int id,
        @RequestBody UtilisateurRequest requestDto) {
    Optional<Utilisateur> result = utilisateurRepository.findById(id);
    Optional<Role> resultByName = roleRepository.findByNom(requestDto.getRole().getNom()); //Pour récupérer que le nom du rôle et pas l'objet
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if(resultByName.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Utilisateur utilisateur = result.get();
    utilisateur.setLogin(requestDto.getLogin());
    utilisateur.setMdp(requestDto.getMdp());
    utilisateur.setNom(requestDto.getNom());
    utilisateur.setPrenom(requestDto.getPrenom());
    utilisateur.setTelephone(requestDto.getTelephone());
    utilisateur.setStatut(requestDto.getStatut());
    utilisateur.setRole(resultByName.get());
    utilisateurRepository.save(utilisateur);
    return ResponseEntity.ok().body((utilisateur));
    }    

}
