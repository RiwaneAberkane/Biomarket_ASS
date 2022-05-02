import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Utilisateur } from 'src/app/utilisateur/utilisateur';
import { UtilisateurService } from 'src/app/utilisateur/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login :any;
  motDePasse: any;
  utilisateur?: Utilisateur
  private logged: boolean = false
  loginBoolean : boolean = false
  loginBoolean2 : boolean = false

  constructor(private utilisateurService: UtilisateurService, private messageService: MessageService ) { }

  ngOnInit(): void {
  }

  logIn(){
    this.utilisateurService.findByLoginAndMdp(this.login , this.motDePasse)
    .subscribe({
      next: (data) => {
        this.utilisateur = data;
        console.log(data);
        this.logged = true
        localStorage.setItem("isLogged", "" + this.logged) 
      },
      error: (e) => console.error(
        this.loginBoolean = true,
        this.showError()
       
      ), 
    }); 
  }

  getLogged() : boolean{
    let value : boolean
    if(localStorage.getItem("isLogged") === "true")
    value = true
    else(value = false)
    return value;
  }



  showError() {
    if(this.loginBoolean === true)
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Login ou mot de passe incorrect !'});
  } 
}
