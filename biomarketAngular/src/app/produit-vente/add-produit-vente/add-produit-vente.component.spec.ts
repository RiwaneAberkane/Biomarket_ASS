import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduitVenteComponent } from './add-produit-vente.component';

describe('AddProduitVenteComponent', () => {
  let component: AddProduitVenteComponent;
  let fixture: ComponentFixture<AddProduitVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProduitVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduitVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
