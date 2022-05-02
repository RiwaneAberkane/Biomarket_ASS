import { Component, OnInit } from '@angular/core';
import { ProduitVenteService } from 'src/app/produit-vente/produit-vente.service';
import { Vente } from '../vente';
import { VenteService } from '../vente.service';

@Component({
  selector: 'app-add-vente',
  templateUrl: './add-vente.component.html',
  styleUrls: ['./add-vente.component.scss']
})
export class AddVenteComponent implements OnInit {

  vente: Vente = {vente_id: '',date : '',utilisateurLogin: '',clientMail :''};
  submitted = false;

  constructor(private venteService: VenteService, private produitVenteService: ProduitVenteService) { }

  ngOnInit(): void {
  }

// CREATE -------------------

  newVente(): void {
    this.submitted = false;
    this.vente = {
      vente_id: '',
      date: '',
  }
}

// SAVE ------------------------


  save(): void {
    const data = {
      date: this.vente.date,
      utilisateurLogin: this.vente.utilisateurLogin,
      clientMail: this.vente.clientMail
    };
    this.venteService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}
