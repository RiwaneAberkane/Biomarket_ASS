import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitVenteDetailsComponent } from './produit-vente-details.component';

describe('ProduitVenteDetailsComponent', () => {
  let component: ProduitVenteDetailsComponent;
  let fixture: ComponentFixture<ProduitVenteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitVenteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitVenteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
