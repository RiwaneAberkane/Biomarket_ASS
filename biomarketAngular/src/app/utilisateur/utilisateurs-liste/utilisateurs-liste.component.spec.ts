import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursListeComponent } from './utilisateurs-liste.component';

describe('UtilisateursListeComponent', () => {
  let component: UtilisateursListeComponent;
  let fixture: ComponentFixture<UtilisateursListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateursListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
