export class Commande {

    commande_id: any;
    date : any;
    utilisateur?: any;
    utilisateurLogin?: any;
    fournisseur?: any;
    fournisseurNom?: any

    constructor(
                commande_id: number,
                date : any
                )
            {
                this.commande_id = commande_id;
                this.date = date;
            }

}
