export class Utilisateur {
    utilisateur_id : any;
    login: String;
    mdp: string;
    nom: string;
    prenom: string;
    telephone: string;
    statut ?:any
    role?: any;
    roleNom?: any

    constructor( utilisateur_id : any,
        login: String,
        mdp: string,
        nom: string,
        prenom: string,
        telephone: string,
        ){
            this.utilisateur_id = utilisateur_id
            this.login = login
            this.mdp = mdp
            this.nom = nom
            this.prenom = prenom
            this.telephone = telephone
    }
    
}
