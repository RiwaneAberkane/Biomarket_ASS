export class ProduitVente {
    id: any
    produit? : any;
    produitNom? : any;
    vente?: any;
    venteDate?: any;
    quantitekg: any;
    statut?: any
    numero?: any

    constructor(
        id:any,
        quantitekg: any,
    )
    {
        this.id = id
        this.quantitekg = quantitekg;
    }
}
