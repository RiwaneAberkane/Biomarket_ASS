import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFournisseursListeComponent } from './pagination-fournisseurs-liste.component';

describe('PaginationFournisseursListeComponent', () => {
  let component: PaginationFournisseursListeComponent;
  let fixture: ComponentFixture<PaginationFournisseursListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationFournisseursListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFournisseursListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
