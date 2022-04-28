package com.biomarket.biomarket.controller;

import java.util.Optional;

import com.biomarket.biomarket.domain.Produit;

import com.biomarket.biomarket.dto.ProduitRequest;
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
public class ProduitController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private ProduitRepository produitRepository;

/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/produit")
    public @ResponseBody ResponseEntity<Iterable<Produit>> getProduits(){
        Iterable<Produit> produit = produitRepository.findAll();
        return ResponseEntity.ok().body(produit);
    }


/*------------------------------GET BY NOM--------------------------------------------*/

@GetMapping("/api/v1/produitByNom/{nom}")
public @ResponseBody ResponseEntity <Produit> getByNom(@PathVariable String nom){
    Optional<Produit> produitResult = produitRepository.findByNom(nom);
    if(produitResult.isEmpty())
    return ResponseEntity.notFound().build();
    Produit produit = produitResult.get();
    return ResponseEntity.ok().body(produit);
}

/*------------------------------GET BY NOM--------------------------------------------*/

@GetMapping("/api/v1/produitByNom/{statut}")
public @ResponseBody ResponseEntity<Iterable<Produit>> getByStatus(@PathVariable String statut){
    Iterable<Produit> produitResult = produitRepository.findByStatut(statut);
    return ResponseEntity.ok().body(produitResult);
}

/*------------------------------POST-------------------------------------------*/


@PostMapping("/api/v1/produit")
public @ResponseBody ResponseEntity<Produit> postProduit(@RequestBody ProduitRequest produitRequest){
    Produit produit = new Produit();
    produit.setNom(produitRequest.getNom());
    produit.setType(produitRequest.getType());
    produit.setQuantitekg(produitRequest.getQuantitekg());
    produit.setPachatkg(produitRequest.getPachatkg());
    produit.setPventekg(produitRequest.getPventekg());
    produit.setStatut(produitRequest.getStatut());
    produitRepository.save(produit);
    return ResponseEntity.ok().body(produit);
}


/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/produit/{id}")
public @ResponseBody ResponseEntity<Produit> get(@PathVariable int id){
   Optional<Produit> resultat = produitRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Produit produit = resultat.get();
   return ResponseEntity.ok().body(produit);
}   

/*------------------------------DELETE(ID)-------------------------------------*/


@DeleteMapping("/api/v1/produit/{id}")
public @ResponseBody ResponseEntity<Produit> deleteProduit(@PathVariable int id){
    Optional<Produit> resultat = produitRepository.findById(id);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Produit produit = resultat.get();
    produitRepository.deleteById(id);
    return ResponseEntity.ok().body(produit);
}
/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allProduit/")
public void deleteAllProduit(){
    produitRepository.deleteAll();
}

/*------------------------------PUT(ID)-----------------------------------------*/

@PutMapping("/api/v1/produit/{id}")
public @ResponseBody ResponseEntity<Produit> modifyProduit(@PathVariable int id,
        @RequestBody ProduitRequest requestDto) {
    Optional<Produit> result = produitRepository.findById(id);
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    Produit produit = result.get();
    produit.setNom(requestDto.getNom());
    produit.setType(requestDto.getType());
    produit.setQuantitekg(requestDto.getQuantitekg());
    produit.setPachatkg(requestDto.getPachatkg());
    produit.setPventekg(requestDto.getPventekg());
    produit.setStatut(requestDto.getStatut());
    produitRepository.save(produit);
    return ResponseEntity.ok().body((produit));
    }
 
    
}
