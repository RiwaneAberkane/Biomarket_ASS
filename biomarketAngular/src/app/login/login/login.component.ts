import { Component, OnInit } from '@angular/core';
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

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
  }

  logIn(){
    this.utilisateurService.findByLoginAndMdp (this.login , this.motDePasse).subscribe(data => {
      this.utilisateur = data
      this.logged = true
      localStorage.setItem("isLogged", "" + this.logged) 
    })
    this.loginBoolean = true;
  }

  getLogged() : boolean{
    let value : boolean
    if(localStorage.getItem("isLogged") === "true")
    value = true
    else(value = false)
    return value;
  }
}
