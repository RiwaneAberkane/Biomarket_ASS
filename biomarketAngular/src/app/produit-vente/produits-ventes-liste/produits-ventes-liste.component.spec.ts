import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsVentesListeComponent } from './produits-ventes-liste.component';

describe('ProduitsVentesListeComponent', () => {
  let component: ProduitsVentesListeComponent;
  let fixture: ComponentFixture<ProduitsVentesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsVentesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsVentesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
