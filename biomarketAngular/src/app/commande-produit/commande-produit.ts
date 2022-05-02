export class CommandeProduit {
    id: any
    produit? : any;
    produitNom? : any;
    commande?: any;
    commandeDate?: any;
    quantitekg : any;
    numero?: number;
    statut?: any;

    constructor( id: number, quantitekg: any){
        this.id = id
        this.quantitekg = quantitekg;
    }
}
