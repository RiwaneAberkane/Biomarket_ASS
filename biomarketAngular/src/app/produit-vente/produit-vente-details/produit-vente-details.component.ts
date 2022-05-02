import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Vente } from 'src/app/vente/vente';
import { VenteService } from 'src/app/vente/vente.service';
import { ProduitVente } from '../produit-vente';
import { ProduitVenteService } from '../produit-vente.service';

@Component({
  selector: 'app-produit-vente-details',
  templateUrl: './produit-vente-details.component.html',
  styleUrls: ['./produit-vente-details.component.scss']
})
export class ProduitVenteDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentProduitVente: ProduitVente = {id: '', quantitekg :''};
  vente = new Vente(0,"")
  updateVente = false
  message = '';
  id : any;
  msgs: Message[] = [];

  constructor(
    private produitVenteService: ProduitVenteService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      console.log(this.currentProduitVente.id);
      this.id = this.route.snapshot.params["numero"]
      console.log((this.id));
      this.message = '';
      this.getProduitVente(this.route.snapshot.params["numero"]);
    }
  }

  rejeter(){
    this.currentProduitVente.statut = 'Retourné'
    this.update();
    this.showInfo1()
  }
  
  getProduitVente(id: number): void {
    this.produitVenteService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduitVente = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


// UPDATE ---------------------------

  update(): void {
    this.message = '';
    this.produitVenteService.update(this.currentProduitVente.numero, this.currentProduitVente)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateVente = true 
        },
        error: (e) => console.error(e)
      });
  }


// DELETE ----------------------------

  delete(): void {
    this.produitVenteService.delete(this.currentProduitVente.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/produitsventes']);
        },
        error: (e) => console.error(e)
      });
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Voulez vous vraiment annuler cette vente ?',
        header: "Confirmer le l'annulation",
        icon: 'pi pi-info-circle',
        accept: () => {
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
          this.rejeter();
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }   
    });
  }

  //Message SERVICE


  showInfo1() {
    this.messageService.add({severity:'info', summary: 'info', detail: 'Produit de la vente retourné.'});
  }
}
