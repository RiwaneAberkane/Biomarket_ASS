import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/role/role';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.scss']
})
export class AddUtilisateurComponent implements OnInit {

  @Input() roleTab? : Role[]
  @Input() tab? : Utilisateur[]


  utilisateur: Utilisateur = {
    utilisateur_id: '',
    login: '',
    mdp : '',
    nom : '',
    prenom : '',
    telephone :'',
    roleNom : ''
  };
  submitted = false;
  utilisateurSubmitted = false;
  statut = 'Actif'


  constructor(private utilisateurService: UtilisateurService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

// CREATE -------------------



  newUser(): void {
    this.submitted = false;
    this.utilisateur = {
      utilisateur_id: '',
      login: '',
      mdp : '',
      nom : '',
      prenom : '',
      telephone :'',
    }
  }

// SAVE ------------------------

  saveUser(): void {
    if (this.utilisateur.login === '' || this.utilisateur.mdp === '' || this.utilisateur.nom === '' || this.utilisateur.prenom === '' || this.utilisateur.telephone === '' || this.utilisateur.roleNom === ''){
      console.log("Impossible");
      this.utilisateurSubmitted = true;
      this.showError()
      return;
    }
    const data = {
      login: this.utilisateur.login,
      mdp: this.utilisateur.mdp,
      nom: this.utilisateur.nom,
      prenom: this.utilisateur.prenom,
      telephone: this.utilisateur.telephone,
      statut:this.statut,
      roleNom: this.utilisateur.roleNom
    };
    this.utilisateurService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.utilisateurSubmitted = false;
          this.showSuccess()
        },
        error: (e) => console.error(e,
          this.showError1())
      });
  }
  

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez renseigner tout les champs !'});
  } 

  showError1() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Impossible de créer cet utilisateur !'});
  } 

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: "L'utilisateur a été crée avec succès !"});
  }
  
}
