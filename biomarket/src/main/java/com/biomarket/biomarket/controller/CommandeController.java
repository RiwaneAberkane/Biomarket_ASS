package com.biomarket.biomarket.controller;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.Commande;
import com.biomarket.biomarket.domain.Fournisseur;
import com.biomarket.biomarket.domain.Utilisateur;
import com.biomarket.biomarket.dto.CommandeRequest;
import com.biomarket.biomarket.repository.CommandeRepository;
import com.biomarket.biomarket.repository.FournisseurRepository;
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
public class CommandeController {

    
/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;

/*------------------------------GET--------------------------------------------*/


@GetMapping("/api/v1/commande")
public @ResponseBody ResponseEntity<Iterable<Commande>> getCommandes(){
    Iterable<Commande> commande = commandeRepository.findAll();
    return ResponseEntity.ok().body(commande);
}


/*------------------------------GET BY DATE--------------------------------------------*/

@GetMapping("/api/v1/commandeByAllDate")
public @ResponseBody ResponseEntity<Iterable<Commande>> getByAllDate(@RequestBody CommandeRequest commandeRequest){
    Iterable<Commande> commande = commandeRepository.findAllByDate(commandeRequest.getDate());
    return ResponseEntity.ok().body(commande);
}


/*------------------------------POST-------------------------------------------*/


// @PostMapping("/api/v1/commande")
// public @ResponseBody ResponseEntity<Commande> postCommande(@RequestBody CommandeRequest commandeRequest){
//     Optional<Utilisateur> result = utilisateurRepository.findById(commandeRequest.getUtilisateur());
//     Optional<Fournisseur> result1 = fournisseurRepository.findById(commandeRequest.getFournisseur());
//     if(result.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     if(result1.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     Commande commande = new Commande();
//     commande.setDate(commandeRequest.getDate());
//     commande.setUtilisateur(result.get());
//     commande.setFournisseur(result1.get());
//     commandeRepository.save(commande);
//     return ResponseEntity.ok().body(commande);
// }

// POST BY NOM  ------------------------------------------------------------


@PostMapping("/api/v1/commandeByName")
public @ResponseBody ResponseEntity<Commande> postCommandeByName(@RequestBody CommandeRequest commandeRequestByName){
    Optional<Utilisateur> resultUtilisateur = utilisateurRepository.findByLogin(commandeRequestByName.getUtilisateurLogin());
    Optional<Fournisseur> resultFournisseur = fournisseurRepository.findByNom(commandeRequestByName.getFournisseurNom());
    if(resultUtilisateur.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    if(resultFournisseur.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Optional<Commande> resultCommmande = commandeRepository.findByDateAndFournisseur(commandeRequestByName.getDate(), resultFournisseur.get());
    if (resultCommmande.isPresent()){
        return  ResponseEntity.ok().body(resultCommmande.get());
    }
    Commande commande = new Commande();
    commande.setDate(commandeRequestByName.getDate());
    commande.setUtilisateur(resultUtilisateur.get());
    commande.setFournisseur(resultFournisseur.get());
    commandeRepository.save(commande);
    return ResponseEntity.ok().body(commande);
}

/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/commande/{id}")
public @ResponseBody ResponseEntity<Commande> get(@PathVariable int id){
   Optional<Commande> resultat = commandeRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Commande commande = resultat.get();
   return ResponseEntity.ok().body(commande);
}   

/*------------------------------GET BY DATE----------------------------------------*/

@GetMapping("/api/v1/commandeByDate/{date}")
public @ResponseBody ResponseEntity<Commande> getByDate(@PathVariable Date date){
   Optional<Commande> resultat = commandeRepository.findByDate(date);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
    Commande commande = resultat.get();
   return ResponseEntity.ok().body(commande);
}   

/*------------------------------DELETE(ID)-------------------------------------*/


@DeleteMapping("/api/v1/commande/{id}")
public @ResponseBody ResponseEntity<Commande> deleteCommande(@PathVariable int id){
    Optional<Commande> resultat = commandeRepository.findById(id);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Commande commande = resultat.get();
    commandeRepository.deleteById(id);
    return ResponseEntity.ok().body(commande);
}


/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allCommande/")
public void deleteAllCommande(){
    commandeRepository.deleteAll();
}

/*------------------------------PUT(ID)-----------------------------------------*/

@PutMapping("/api/v1/commandeByName/{id}")
public @ResponseBody ResponseEntity<Commande> modifyCommande(@PathVariable int id, @RequestBody CommandeRequest commandeRequest) {
    Optional<Commande> result = commandeRepository.findById(id);
    Optional<Utilisateur> result1 = utilisateurRepository.findByLogin(commandeRequest.getUtilisateur().getLogin());
    Optional<Fournisseur> result2 = fournisseurRepository.findByNom(commandeRequest.getFournisseur().getNom());
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if (result1.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if (result2.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    Commande commande = result.get();
    commande.setDate(commandeRequest.getDate());
    commande.setUtilisateur(result1.get());
    commande.setFournisseur(result2.get());
    commandeRepository.save(commande);
    return ResponseEntity.ok().body((commande));
    }
 
}
