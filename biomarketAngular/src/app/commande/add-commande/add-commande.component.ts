import { Component, Input, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/fournisseur/fournisseur';
import { Commande } from '../commande';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.scss']
})
export class AddCommandeComponent implements OnInit {

  // @Input() tabFournisseur? : Fournisseur[];
  commande:   Commande = {commande_id: '',date : '',utilisateurLogin: '',fournisseurMail :''};
  submitted = false;

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
  }

// CREATE -------------------



  newCommande(): void {
    this.submitted = false;
    this.commande = {
      commande_id: '',
      date: '',
  }
}

// SAVE ------------------------

  save(): void {
    const data = {
      date: this.commande.date,
      utilisateurLogin: this.commande.utilisateurLogin,
      fournisseurMail: this.commande.fournisseurMail
    };
    this.commandeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}
