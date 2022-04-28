export class Produit {
    
    produit_id : any;
    nom : String;
    type : String;
    quantitekg : any;
    pachatkg : any;
    pventekg: any;
    statut? : any

    constructor(
        produit_id : number,
        nom : String,
        type : String,
        quantitekg : any,
        pachatkg : any,
        pventekg: any,
    )
    {

        this.produit_id = produit_id;
        this.nom = nom;
        this.type = type;
        this.quantitekg = quantitekg;
        this.pachatkg = pachatkg;
        this.pventekg = pventekg;
    }
}
