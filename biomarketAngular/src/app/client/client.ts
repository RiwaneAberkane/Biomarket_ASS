export class Client {
    
    client_id : any;
    nom : String;
    prenom : String;
    cp : String;
    adresse : String;
    ville : String;
    mail : String;
    telephone : String;
    statut : String;


    constructor( 
        client_id : number,
        nom : String,
        prenom : String,
        cp : String,
        adresse : String,
        ville : String,
        mail : String,
        telephone : String,
        statut : String
        )
    {
        this.client_id = client_id;
        this.nom = nom;
        this.prenom = prenom;
        this.cp = cp;
        this.adresse = adresse;
        this.ville = ville;
        this.mail = mail;
        this.telephone = telephone;
        this.statut = statut;
        
    }
}
