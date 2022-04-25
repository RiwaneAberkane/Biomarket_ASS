package com.biomarket.biomarket.controller;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.Client;
import com.biomarket.biomarket.domain.Produit;
import com.biomarket.biomarket.domain.ProduitVente;
import com.biomarket.biomarket.domain.Vente;
import com.biomarket.biomarket.dto.ProduitVenteRequest;
import com.biomarket.biomarket.repository.ClientRepository;
import com.biomarket.biomarket.repository.ProduitRepository;
import com.biomarket.biomarket.repository.ProduitVenteRepository;
import com.biomarket.biomarket.repository.VenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitVenteController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private ProduitVenteRepository produitVenteRepository;

    @Autowired
    private VenteRepository venteRepository;
    
    @Autowired
    private ProduitRepository produitRepository;
    
    @Autowired 
    private ClientRepository clientRepository;
/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/produitVente")
    public @ResponseBody ResponseEntity<Iterable<ProduitVente>> getProduitVente(){
        Iterable<ProduitVente> produitVente = produitVenteRepository.findAll();
        return ResponseEntity.ok().body(produitVente);
    }
   


/*------------------------------GET BY DATE----------------------------------------*/

@GetMapping("/api/v1/produitVenteByAllDate/{date}")
public @ResponseBody ResponseEntity<Iterable<ProduitVente>> getByDate(@PathVariable Date date){
   Iterable<ProduitVente> resultat = produitVenteRepository.findByVenteDate(date);
   return ResponseEntity.ok().body(resultat);
}   


/*------------------------------GET BY NUMERO----------------------------------------*/


// @GetMapping("/api/v1/produitVenteByNumero/{numero}")
// public @ResponseBody ResponseEntity<ProduitVente> getByDNumero(@PathVariable int numero){
//    Optional<ProduitVente> resultat = produitVenteRepository.findByNumero(numero);
//    if(resultat.isEmpty())
//    return ResponseEntity.notFound().build();
//    ProduitVente produitVente = resultat.get();
//    return ResponseEntity.ok().body(produitVente);
// }   

/*------------------------------POST--------------------------------------------*/

// @PostMapping("/api/v1/produitVente")
// public @ResponseBody ResponseEntity<ProduitVente> postProduitVente(@RequestBody ProduitVenteRequest produitVenteRequest){
//     Optional<Vente> resultvente = venteRepository.findByDate(produitVenteRequest.getVenteDate());
//     Optional<Produit> resultproduit = produitRepository.findByNom(produitVenteRequest.getProduitNom());
//     if(resultvente.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     if(resultproduit.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     ProduitVente produitVente = new ProduitVente();
//     produitVente.setProduit(resultproduit.get());
//     produitVente.setVente(resultvente.get());
//     produitVente.setQuantitekg(produitVenteRequest.getQuantitekg());
//     produitVenteRepository.save(produitVente);
//     return ResponseEntity.ok().body(produitVente);
// }
    
/*------------------------------POST BY NAME--------------------------------------------*/

@PostMapping("/api/v1/produitVenteByName")
public @ResponseBody ResponseEntity<ProduitVente> postProduitVenteByName(@RequestBody ProduitVenteRequest produitVenteRequestByName){
    Optional<Client> resultClient = clientRepository.findByMail(produitVenteRequestByName.getClient());
    if(resultClient.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Optional<Vente> resultvente = venteRepository.findByDateAndClient(produitVenteRequestByName.getVenteDate(), resultClient.get());
    Optional<Produit> resultproduit = produitRepository.findByNom(produitVenteRequestByName.getProduitNom());
    if(resultvente.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    if(resultproduit.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Produit produit = resultproduit.get();
    if(produit.getQuantitekg() < produitVenteRequestByName.getQuantitekg())
    {
        return ResponseEntity.notFound().build();
    }
    produit.setQuantitekg(produit.getQuantitekg() - produitVenteRequestByName.getQuantitekg());
    produitRepository.save(produit);
    ProduitVente produitVente = new ProduitVente();
    produitVente.setProduit(produit);
    produitVente.setVente(resultvente.get());
    produitVente.setQuantitekg(produitVenteRequestByName.getQuantitekg());
    produitVenteRepository.save(produitVente);
    return ResponseEntity.ok().body(produitVente);
}


/*------------------------------PUT(ID)-----------------------------------------*/

// @PutMapping("/api/v1/produitVenteByName/{id}")
// public @ResponseBody ResponseEntity<ProduitVente> modifyProduitVente(@PathVariable int id, @RequestBody ProduitVenteRequest produitVenteRequest) {
//     Optional<ProduitVente> result = produitVenteRepository.findById(id);
//     Optional<Produit> result1 = produitRepository.findByNom(produitVenteRequest.getProduit().getNom());
//     Optional<Vente> result2 = venteRepository.findByDate(produitVenteRequest.getVente().getDate());
//     if (result.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if (result1.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if (result2.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     ProduitVente produitVente = result.get();
//     produitVente.setProduit(result1.get());
//     produitVente.setVente(result2.get());
//     produitVente.setQuantitekg(produitVenteRequest.getQuantitekg());
//     produitVenteRepository.save(produitVente);
//     return ResponseEntity.ok().body((produitVente));
//     }
    


/*------------------------------PUT(NUMERO)-----------------------------------------*/

// @PutMapping("/api/v1/produitVenteByNumero/{numero}")
// public @ResponseBody ResponseEntity<ProduitVente> modifyProduitVente(@PathVariable int numero, @RequestBody ProduitVenteRequest produitVenteRequest) {
//     Optional<ProduitVente> result = produitVenteRepository.findByNumero(numero);
//     Optional<Produit> result1 = produitRepository.findByNom(produitVenteRequest.getProduit().getNom());
//     Optional<Vente> result2 = venteRepository.findByDate(produitVenteRequest.getVente().getDate());
//     if (result.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if (result1.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if (result2.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     ProduitVente produitVente = result.get();
//     produitVente.getId().setProduit_id(result1.get().getProduit_id());
//     produitVente.setProduit(result1.get());
//     produitVente.setVente(result2.get());
//     produitVente.setQuantitekg(produitVenteRequest.getQuantitekg());
//     // ProduitVenteKey pvk = new ProduitVenteKey();
//     // pvk.setProduit_id(result1.get().getProduit_id());
//     // pvk.setVente_id(result2.get().getVente_id());
//     // produitVente.setId(pvk);
//     produitVenteRepository.save(produitVente);
//     return ResponseEntity.ok().body((produitVente));
//     }

/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allProduitVente/")
public void deleteAllProduitVente(){
    produitVenteRepository.deleteAll();
}


/*------------------------------DELETE(NUMERO)-------------------------------------*/


// @DeleteMapping("/api/v1/produitVente/{numero}")
// public @ResponseBody ResponseEntity<ProduitVente> deleteProduitVente(@PathVariable int numero){
//     Optional<ProduitVente> resultat = produitVenteRepository.findByNumero(numero);
//     if(resultat.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     ProduitVente produitVente = resultat.get();
//     produitVenteRepository.deleteByNumero(numero);
//     return ResponseEntity.ok().body(produitVente);
// }

     
}
