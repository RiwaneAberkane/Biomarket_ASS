import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationUtilisateursListeComponent } from './pagination-utilisateurs-liste.component';

describe('PaginationUtilisateursListeComponent', () => {
  let component: PaginationUtilisateursListeComponent;
  let fixture: ComponentFixture<PaginationUtilisateursListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationUtilisateursListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationUtilisateursListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
