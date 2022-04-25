import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandeProduitComponent } from './add-commande-produit.component';

describe('AddCommandeProduitComponent', () => {
  let component: AddCommandeProduitComponent;
  let fixture: ComponentFixture<AddCommandeProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommandeProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommandeProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
