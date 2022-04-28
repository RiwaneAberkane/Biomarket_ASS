export class Fournisseur {
    fournisseur_id: any;
    nom : String;
    telephone : String;
    mail : String;
    cp : String;
    adresse : String;
    ville : String;
    statut? :any

    constructor( 
        fournisseur_id : number,
        nom : String,
        telephone : String,
        mail : String,
        cp : String,
        adresse : String,
        ville : String,
        )
    {
        this.fournisseur_id = fournisseur_id;
        this.nom = nom;
        this.telephone = telephone;
        this.mail = mail;
        this.cp = cp;
        this.adresse = adresse;
        this.ville = ville;
        
    }
}
