import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-utilisateur-details',
  templateUrl: './utilisateur-details.component.html',
  styleUrls: ['./utilisateur-details.component.scss']
})
export class UtilisateurDetailsComponent implements OnInit {
  
  @Input() viewMode = false;

  @Input() currentUtilisateur: Utilisateur = {
    utilisateur_id: '',
    login: '',
    mdp : '',
    nom : '',
    prenom : '',
    telephone :'',
  };
  update = false;
  msgs: Message[] = [];

  message = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,  private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, ) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUtilisateur(this.route.snapshot.params["id"]);
    }
  }
  
  getUtilisateur(id: Number): void {
    this.utilisateurService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUtilisateur = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

// ------------------------------------------------------------

  // updatePublished(status: boolean): void {
  //   const data = {
  //     login: this.currentUtilisateur.login,
  //     mdp: this.currentUtilisateur.mdp,
  //     nom: this.currentUtilisateur.nom,
  //     prenom: this.currentUtilisateur.prenom,
  //     telephone: this.currentUtilisateur.telephone,
  //   };
  //   this.message = '';
  //   this.utilisateurService.update(this.currentUtilisateur.utilisateur_id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentUtilisateur.utilisateur_id = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

// ------------------------------------------------------------

// UPDATE ---------------------------

  updateUtilisateur(): void {
    this.message = '';
    this.utilisateurService.update(this.currentUtilisateur.utilisateur_id, this.currentUtilisateur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.update = true
          // this.message = res.message ? res.message : 'This User was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

// DELETE ----------------------------

  deleteUtilisateur(): void {
    this.utilisateurService.delete(this.currentUtilisateur.utilisateur_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.router.navigate(['/utilisateurs']);
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
  }



  confirm2() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment supprimer cet utilisateur ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.deleteUtilisateur() 
  
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
}

}
