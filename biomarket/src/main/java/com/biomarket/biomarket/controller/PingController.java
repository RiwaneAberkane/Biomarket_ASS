// package com.biomarket.biomarket.controller;


// import java.util.Optional;

// import com.biomarket.biomarket.domain.ProduitVente;
// import com.biomarket.biomarket.domain.Vente;
// import com.biomarket.biomarket.dto.ProduitVenteRequest;
// import com.biomarket.biomarket.dto.VenteRequest;
// import com.biomarket.biomarket.repository.ProduitVenteRepository;
// import com.biomarket.biomarket.repository.VenteRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// public class PingController {
//     @Autowired
//     private VenteRepository venteRepository;
//     @Autowired
//     private ProduitVenteRepository produitVenteRepository;
    
//     @GetMapping("/ping")
//     public @ResponseBody String ping(){
//         return "Success !!!";
//     }

//     @PostMapping("/post")
//     public ResponseEntity<Vente> createVente(@RequestBody VenteRequest venteDto){
//         Vente v = new Vente();
//         v.setStatut("payé");
//         v.setDate(venteDto.getDate());
//         venteRepository.save(v);
//         return ResponseEntity.ok().body(v);  
//     }

//     @PostMapping("/post1")
//     public ResponseEntity<Vente> createVente(@RequestBody ProduitVenteRequest produitVenteDto){
//         Optional<Vente> ov = venteRepository.findById(produitVenteDto.getVente_id());
//         if(ov.isEmpty()) 
//         return ResponseEntity.notFound().build();
//         Vente v = ov.get();
//         ProduitVente pv = new ProduitVente();
//         pv.setProduit_id(produitVenteDto.getProduit_id());
//         pv.setVente_id(v.getVente_id());
//         pv.setQuantitekg(produitVenteDto.getQuantitekg());
//         v.getProduitVente().add(pv);
//         produitVenteRepository.save(pv);
//         venteRepository.save(v);
//         return ResponseEntity.ok().body(v);
        
//     }
// }
