import { TestBed } from '@angular/core/testing';

import { ProduitVenteService } from './produit-vente.service';

describe('ProduitVenteService', () => {
  let service: ProduitVenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitVenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
