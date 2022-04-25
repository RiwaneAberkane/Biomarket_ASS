package com.biomarket.biomarket.controller;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.Commande;
import com.biomarket.biomarket.domain.CommandeProduit;
import com.biomarket.biomarket.domain.Fournisseur;
import com.biomarket.biomarket.domain.Produit;
import com.biomarket.biomarket.dto.CommandeProduitRequest;
import com.biomarket.biomarket.repository.CommandeProduitRepository;
import com.biomarket.biomarket.repository.CommandeRepository;
import com.biomarket.biomarket.repository.FournisseurRepository;
import com.biomarket.biomarket.repository.ProduitRepository;


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
public class CommandeProduitController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private CommandeProduitRepository commandeProduitRepository;
   
    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;
       
/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/commandeProduit")
    public @ResponseBody ResponseEntity<Iterable<CommandeProduit>> getCommandeProduit(){
        Iterable<CommandeProduit> commandeProduit = commandeProduitRepository.findAll();
        return ResponseEntity.ok().body(commandeProduit);
    }


/*------------------------------GET BY DATE----------------------------------------*/

@GetMapping("/api/v1/commandeProduitByDate/{date}")
public @ResponseBody ResponseEntity<Iterable<CommandeProduit>> getByDate(@PathVariable Date date){
   Iterable<CommandeProduit> resultat = commandeProduitRepository.findByCommandeDate(date);
   return ResponseEntity.ok().body(resultat);
}   


/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/commandeProduit/{id}")
public @ResponseBody ResponseEntity<CommandeProduit> get(@PathVariable int id){
   Optional<CommandeProduit> resultat = commandeProduitRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
    CommandeProduit commandeProduit = resultat.get();
   return ResponseEntity.ok().body(commandeProduit);
}   

/*------------------------------GET BY NUMERO----------------------------------------*/

@GetMapping("/api/v1/commandeProduitByNumero/{numero}")
public @ResponseBody ResponseEntity<CommandeProduit> getByDNumero(@PathVariable int numero){
   Optional<CommandeProduit> resultat = commandeProduitRepository.findByNumero(numero);
   if(resultat.isEmpty())
   return ResponseEntity.notFound().build();
   CommandeProduit commandeProduit = resultat.get();
   return ResponseEntity.ok().body(commandeProduit);
}   


/*------------------------------POST--------------------------------------------*/

    // @PostMapping("/api/v1/commandeProduit")
    // public @ResponseBody ResponseEntity<CommandeProduit> postCommandeProduit(@RequestBody CommandeProduitRequest commandeProduitRequest){
    // Optional<Produit> resultproduit = produitRepository.findById(commandeProduitRequest.getProduit_id());
    // Optional<Commande> resultcommande= commandeRepository.findById(commandeProduitRequest.getCommande_id());
    // if(resultproduit.isEmpty()){
    //     return ResponseEntity.notFound().build();
    // }
    // if(resultcommande.isEmpty()){
    //     return ResponseEntity.notFound().build();
    // }
    // CommandeProduit commandeProduit = new CommandeProduit();
    // commandeProduit.setProduit(resultproduit.get());
    // commandeProduit.setCommande(resultcommande.get());
    // commandeProduit.setQuantitekg(commandeProduitRequest.getQuantitekg());
    // commandeProduitRepository.save(commandeProduit);
    // return ResponseEntity.ok().body(commandeProduit);
    // }
    
/*------------------------------POST BY NAME--------------------------------------------*/



    @PostMapping("/api/v1/commandeProduitByName")
    public @ResponseBody ResponseEntity<CommandeProduit> postCommandeProduitByName(@RequestBody CommandeProduitRequest commandeProduitRequestByName){
    Optional<Fournisseur> resultFournisseur = fournisseurRepository.findByNom(commandeProduitRequestByName.getFournisseurNom());
    if(resultFournisseur.isEmpty()){
        return ResponseEntity.notFound().build();
    }

    Optional<Produit> resultproduit = produitRepository.findByNom(commandeProduitRequestByName.getProduitNom());
    Optional<Commande> resultcommande= commandeRepository.findByDateAndFournisseur(commandeProduitRequestByName.getCommandeDate(), resultFournisseur.get());
    if(resultproduit.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    if(resultcommande.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Produit produit = resultproduit.get();
    if(commandeProduitRequestByName.getQuantitekg() > 100)
    {
        return ResponseEntity.notFound().build();
    }
    produit.setQuantitekg(produit.getQuantitekg() + commandeProduitRequestByName.getQuantitekg());
    produitRepository.save(produit);
    CommandeProduit commandeProduit = new CommandeProduit();
    commandeProduit.setProduit(resultproduit.get());
    commandeProduit.setCommande(resultcommande.get());
    commandeProduit.setQuantitekg(commandeProduitRequestByName.getQuantitekg());
    commandeProduitRepository.save(commandeProduit);
    return ResponseEntity.ok().body(commandeProduit);
    }

/*------------------------------PUT(ID)-----------------------------------------*/

    // @PutMapping("/api/v1/commandeProduitByName/{id}")
    // public @ResponseBody ResponseEntity<CommandeProduit> modifyCommandeProduit(@PathVariable int id, @RequestBody CommandeProduitRequest commandeProduitRequest) {
    //     Optional<CommandeProduit> result = commandeProduitRepository.findById(id);
    //     Optional<Produit> result1 = produitRepository.findByNom(commandeProduitRequest.getProduit().getNom());
    //     Optional<Commande> result2 = commandeRepository.findByDate(commandeProduitRequest.getCommande().getDate());
    //     if (result.isEmpty()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     if (result1.isEmpty()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     if (result2.isEmpty()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     CommandeProduit commandeProduit = result.get();
    //     commandeProduit.setProduit(result1.get());
    //     commandeProduit.setCommande(result2.get());
    //     commandeProduit.setQuantitekg(commandeProduitRequest.getQuantitekg());
    //     commandeProduitRepository.save(commandeProduit);
    //     return ResponseEntity.ok().body((commandeProduit));
    //     }

/*------------------------------PUT(ID)-----------------------------------------*/

@PutMapping("/api/v1/commandeProduitByNumero/{numero}")
public @ResponseBody ResponseEntity<CommandeProduit> modifyCommandeProduit(@PathVariable int numero, @RequestBody CommandeProduitRequest commandeProduitRequest) {
    Optional<CommandeProduit> result = commandeProduitRepository.findByNumero(numero);
    Optional<Produit> result1 = produitRepository.findByNom(commandeProduitRequest.getProduit().getNom());
    Optional<Commande> result2 = commandeRepository.findByDate(commandeProduitRequest.getCommande().getDate());
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if (result1.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if (result2.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    CommandeProduit commandeProduit = result.get();
    commandeProduit.setProduit(result1.get());
    commandeProduit.setCommande(result2.get());
    commandeProduit.setQuantitekg(commandeProduitRequest.getQuantitekg());
    commandeProduitRepository.save(commandeProduit);
    return ResponseEntity.ok().body((commandeProduit));
    }

/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allCommandeProduit/")
public void deleteAllCommandeProduit(){
    commandeProduitRepository.deleteAll();
}
     
}
