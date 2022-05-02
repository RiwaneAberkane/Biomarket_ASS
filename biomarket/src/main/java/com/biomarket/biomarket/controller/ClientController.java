package com.biomarket.biomarket.controller;

import java.util.Optional;

import com.biomarket.biomarket.domain.Client;
import com.biomarket.biomarket.dto.ClientRequest;
import com.biomarket.biomarket.repository.ClientRepository;

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
public class ClientController {

/*------------------------------AUTOWIRED--------------------------------------*/

    @Autowired
    private ClientRepository clientRepository;

/*------------------------------GET--------------------------------------------*/

    @GetMapping("/api/v1/client")
    public @ResponseBody ResponseEntity<Iterable<Client>> getClients(){
        Iterable<Client> client = clientRepository.findAll();
        return ResponseEntity.ok().body(client);
    }

/*------------------------------GET BY STATUT--------------------------------------------*/

@GetMapping("/api/v1/clientStatut/{statut}")
public @ResponseBody ResponseEntity<Iterable<Client>> getClientsByStatus(@PathVariable String statut){
    Iterable<Client> client = clientRepository.findByStatut(statut);
    return ResponseEntity.ok().body(client);
}


/*------------------------------GET BY MAIL----------------------------------------*/

@GetMapping("/api/v1/clientByMail/{mail}")
public @ResponseBody ResponseEntity<Client> getByMail(@PathVariable String mail){
   Optional<Client> resultatClient = clientRepository.findByMail(mail);
   if(resultatClient.isEmpty())
    return ResponseEntity.notFound().build();
    Client client = resultatClient.get();
   return ResponseEntity.ok().body(client);
}   
    
/*------------------------------POST-------------------------------------------*/

    @PostMapping("/api/v1/client")
    public @ResponseBody ResponseEntity<Client> postClient(@RequestBody ClientRequest clientRequest){
        Client client = new Client();
        client.setNom(clientRequest.getNom());
        client.setPrenom(clientRequest.getPrenom());
        client.setCp(clientRequest.getCp());
        client.setAdresse(clientRequest.getAdresse());
        client.setVille(clientRequest.getVille());
        client.setNom(clientRequest.getNom());
        client.setMail(clientRequest.getMail());
        client.setTelephone(clientRequest.getTelephone());
        client.setStatut(clientRequest.getStatut());
        clientRepository.save(client);
        return ResponseEntity.ok().body(client);
    }
    
/*------------------------------GET(ID)----------------------------------------*/

    @GetMapping("/api/v1/client/{id}")
    public @ResponseBody ResponseEntity<Client> get(@PathVariable int id){
       Optional<Client> resultat = clientRepository.findById(id);
       if(resultat.isEmpty())
        return ResponseEntity.notFound().build();
       Client client = resultat.get();
       return ResponseEntity.ok().body(client);
    }   

/*------------------------------DELETE(ID)-------------------------------------*/

    @DeleteMapping("/api/v1/client/{id}")
    public @ResponseBody ResponseEntity<Client> deleteClient(@PathVariable int id){
        Optional<Client> resultat = clientRepository.findById(id);
        if(resultat.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Client client = resultat.get();
        clientRepository.deleteById(id);
        return ResponseEntity.ok().body(client);
    }

/*------------------------------DELETE ALL-------------------------------------*/

@DeleteMapping("/api/v1/allClient/")
public void deleteAllClient(){
    clientRepository.deleteAll();
}

/*------------------------------PUT(ID)-----------------------------------------*/

    @PutMapping("/api/v1/client/{id}")
    public @ResponseBody ResponseEntity<Client> modifyClient(@PathVariable int id,
            @RequestBody ClientRequest requestDto) {
        Optional<Client> result = clientRepository.findById(id);
        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Client client = result.get();
        client.setNom(requestDto.getNom());
        client.setPrenom(requestDto.getPrenom());
        client.setCp(requestDto.getCp());
        client.setAdresse(requestDto.getAdresse());
        client.setVille(requestDto.getVille());
        client.setNom(requestDto.getNom());
        client.setMail(requestDto.getMail());
        client.setTelephone(requestDto.getTelephone());
        client.setStatut(requestDto.getStatut());
        clientRepository.save(client);
        return ResponseEntity.ok().body((client));
    }
}
