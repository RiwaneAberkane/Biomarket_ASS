package com.biomarket.biomarket.controller;

import java.sql.Date;
import java.util.Optional;

import com.biomarket.biomarket.domain.Client;
import com.biomarket.biomarket.domain.Utilisateur;
import com.biomarket.biomarket.domain.Vente;
import com.biomarket.biomarket.dto.VenteRequest;
import com.biomarket.biomarket.repository.ClientRepository;
import com.biomarket.biomarket.repository.UtilisateurRepository;
import com.biomarket.biomarket.repository.VenteRepository;

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
public class VenteController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private VenteRepository venteRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired 
    private ClientRepository clientRepository;


/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/vente")
    public @ResponseBody ResponseEntity<Iterable<Vente>> getVentes(){
        Iterable<Vente> vente = venteRepository.findAll();
        return ResponseEntity.ok().body(vente);
    }

/*------------------------------GET--------------------------------------------*/

// @GetMapping("/api/v1/produitVenteByAllDate")
// public @ResponseBody ResponseEntity<Iterable<Vente>> getProduitVenteByAllDate(@RequestBody VenteRequest venteRequest){
//     Collection<Date> dates = new ArrayList<Date>();
//     dates.add(venteRequest.getDate());
//     Iterable<Vente> vente = venteRepository.findAllByDate(dates);
//     return ResponseEntity.ok().body(vente);
// }




// /*------------------------------POST-------------------------------------------*/


// @PostMapping("/api/v1/vente")
// public @ResponseBody ResponseEntity<Vente> postVente(@RequestBody VenteRequest venteRequest){
//     Optional<Utilisateur> result = utilisateurRepository.findById(venteRequest.getUtilisateur());
//     Optional<Client> result1 = clientRepository.findById(venteRequest.getClient());
//     if(result.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     if(result1.isEmpty()){
//         return ResponseEntity.notFound().build();
//     }
//     Vente vente = new Vente();
//     vente.setDate(venteRequest.getDate());
//     vente.setStatut(venteRequest.getStatut());
//     vente.setUtilisateur(result.get());
//     vente.setClient(result1.get());
//     venteRepository.save(vente);
//     return ResponseEntity.ok().body(vente);
// }

// POST BY NOM DE UTILISATEUR ET CLIENT ------------------------------------------------------------


@PostMapping("/api/v1/venteByName")
public @ResponseBody ResponseEntity<Vente> postVenteByName(@RequestBody VenteRequest venteRequestByName){
    Optional<Utilisateur> resulUtilisateur = utilisateurRepository.findByLogin(venteRequestByName.getUtilisateurLogin());
    Optional<Client> resultClient = clientRepository.findByMail(venteRequestByName.getClientMail());
    if(resulUtilisateur.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    if(resultClient.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    // Optional<Vente> resultVente = venteRepository.findByDateAndUtilisateur(venteRequestByName.getDate(), resulUtilisateur.get());
    // if (resultVente.isPresent()){
    //     return  ResponseEntity.ok().body(resultVente.get());
    // }
    Optional<Vente> resultVente = venteRepository.findByDateAndClient(venteRequestByName.getDate(), resultClient.get());
    if (resultVente.isPresent()){
        return  ResponseEntity.ok().body(resultVente.get());
    }
    Vente vente = new Vente();
    vente.setDate(venteRequestByName.getDate());
    vente.setUtilisateur(resulUtilisateur.get());
    vente.setClient(resultClient.get());
    venteRepository.save(vente);
    return ResponseEntity.ok().body(vente);
}



/*------------------------------GET(ID)----------------------------------------*/

@GetMapping("/api/v1/vente/{id}")
public @ResponseBody ResponseEntity<Vente> get(@PathVariable int id){
   Optional<Vente> resultat = venteRepository.findById(id);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Vente vente = resultat.get();
   return ResponseEntity.ok().body(vente);
}   



/*------------------------------GET BY DATE----------------------------------------*/

@GetMapping("/api/v1/venteByDate/{date}")
public @ResponseBody ResponseEntity<Vente> getByDate(@PathVariable Date date){
   Optional<Vente> resultat = venteRepository.findByDate(date);
   if(resultat.isEmpty())
    return ResponseEntity.notFound().build();
   Vente vente = resultat.get();
   return ResponseEntity.ok().body(vente);
}   

/*------------------------------DELETE(ID)-------------------------------------*/


@DeleteMapping("/api/v1/vente/{id}")
public @ResponseBody ResponseEntity<Vente> deleteVente(@PathVariable int id){
    Optional<Vente> resultat = venteRepository.findById(id);
    if(resultat.isEmpty()){
        return ResponseEntity.notFound().build();
    }
    Vente vente = resultat.get();
    venteRepository.deleteById(id);
    return ResponseEntity.ok().body(vente);
}


/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allVente/")
public void deleteAllVente(){
    venteRepository.deleteAll();
}

// /*------------------------------PUT(ID)-----------------------------------------*/

// @PutMapping("/api/v1/vente/{id}")
// public @ResponseBody ResponseEntity<Vente> modifyVente(@PathVariable int id,
//         @RequestBody VenteRequest requestDto) {
//     Optional<Vente> result = venteRepository.findById(id);
//     Optional<Utilisateur> result1 = utilisateurRepository.findById(requestDto.getUtilisateur());
//     Optional<Client> result2 = clientRepository.findById(requestDto.getClient());
//     if (result.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if (result1.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     if (result2.isEmpty()) {
//         return ResponseEntity.notFound().build();
//     }
//     Vente vente = result.get();
//     vente.setDate(requestDto.getDate());
//     vente.setStatut(requestDto.getStatut());
//     vente.setUtilisateur(result1.get());
//     vente.setClient(result2.get());
//     venteRepository.save(vente);
//     return ResponseEntity.ok().body((vente));
//     }  



/*------------------------------PUT BY MAIL UTILISATEUR ET CLIENT-----------------------------------------*/

@PutMapping("/api/v1/venteByName/{id}")
public @ResponseBody ResponseEntity<Vente> modifyVente(@PathVariable int id,
        @RequestBody VenteRequest requestDto) {
    Optional<Vente> result = venteRepository.findById(id);
    Optional<Utilisateur> result1 = utilisateurRepository.findByLogin(requestDto.getUtilisateur().getLogin());
    Optional<Client> result2 = clientRepository.findByMail(requestDto.getClient().getMail());
    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if (result1.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    if (result2.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    Vente vente = result.get();
    vente.setDate(requestDto.getDate());
    vente.setUtilisateur(result1.get());
    vente.setClient(result2.get());
    venteRepository.save(vente);
    return ResponseEntity.ok().body((vente));
    }  
}
