export class Vente {
    vente_id : any;
    date : any;
    utilisateur? : any;
    utilisateurLogin?: any;
    client? : any;
    clientMail?: any;

    constructor(
        vente_id : number,
        date : any,
    )
    {
        this.vente_id = vente_id;
        this.date = date;
    }

}
