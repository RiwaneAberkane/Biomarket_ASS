package com.biomarket.biomarket.controller;

import java.util.Optional;

import com.biomarket.biomarket.domain.Fournisseur;
import com.biomarket.biomarket.dto.FournisseurRequest;
import com.biomarket.biomarket.repository.FournisseurRepository;

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
public class FournisseurController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private FournisseurRepository fournisseurRepository;

/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/fournisseur")
    public @ResponseBody ResponseEntity<Iterable<Fournisseur>> getClients(){
        Iterable<Fournisseur> fournisseur = fournisseurRepository.findAll();
        return ResponseEntity.ok().body(fournisseur);
    }

/*------------------------------POST-------------------------------------------*/


@PostMapping("/api/v1/fournisseur")
public @ResponseBody ResponseEntity<Fournisseur> postFournisseur(@RequestBody FournisseurRequest fournisseurRequest){
    Fournisseur fournisseur = new Fournisseur();
    fournisseur.setNom(fournisseurRequest.getNom());
    fournisseur.setTelephone(fournisseurRequest.getTelephone());
    fournisseur.setMail(fournisseurRequest.getMail());
    fournisseur.setCp(fournisseurRequest.getCp());
    fournisseur.setAdresse(fournisseurRequest.getAdresse());
    fournisseur.setVille(fournisseurRequest.getVille());
    fournisseurRepository.save(fournisseur);
    return ResponseEntity.ok().body(fournisseur);
}


/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/fournisseur/{id}")
public @ResponseBody ResponseEntity<Fournisseur> get(@PathVariable int id){
   Optional<Fournisseur> resultat = fournisseurRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Fournisseur fournisseur = resultat.get();
   return ResponseEntity.ok().body(fournisseur);
}   



/*------------------------------GET BY NOM----------------------------------------*/

@GetMapping("/api/v1/fournisseurByNom/{nom}")
public @ResponseBody ResponseEntity<Fournisseur> getByNom(@PathVariable String nom){
   Optional<Fournisseur> fournisseurResult = fournisseurRepository.findByNom(nom);
   if(fournisseurResult.isEmpty())
    return ResponseEntity.notFound().build();
   Fournisseur fournisseur = fournisseurResult.get();
   return ResponseEntity.ok().body(fournisseur);
}   

/*------------------------------DELETE(ID)-------------------------------------*/


@DeleteMapping("/api/v1/fournisseur/{id}")
public @ResponseBody ResponseEntity<Fournisseur> deleteFournisseur(@PathVariable int id){
    Optional<Fournisseur> resultat = fournisseurRepository.findById(id);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Fournisseur fournisseur = resultat.get();
    fournisseurRepository.deleteById(id);
    return ResponseEntity.ok().body(fournisseur);
}


/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allFournisseur/")
public void deletAllFournisseur(){
    fournisseurRepository.deleteAll();
}

/*------------------------------PUT(ID)-----------------------------------------*/

@PutMapping("/api/v1/fournisseur/{id}")
public @ResponseBody ResponseEntity<Fournisseur> modifyFournisseur(@PathVariable int id,
        @RequestBody FournisseurRequest requestDto) {
    Optional<Fournisseur> result = fournisseurRepository.findById(id);
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    Fournisseur fournisseur = result.get();
    fournisseur.setNom(requestDto.getNom());
    fournisseur.setTelephone(requestDto.getTelephone());
    fournisseur.setMail(requestDto.getMail());
    fournisseur.setCp(requestDto.getCp());
    fournisseur.setAdresse(requestDto.getAdresse());
    fournisseur.setVille(requestDto.getVille());
    fournisseurRepository.save(fournisseur);
    return ResponseEntity.ok().body((fournisseur));
    }

    
}
