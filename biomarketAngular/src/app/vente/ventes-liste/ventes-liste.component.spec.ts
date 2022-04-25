import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesListeComponent } from './ventes-liste.component';

describe('VentesListeComponent', () => {
  let component: VentesListeComponent;
  let fixture: ComponentFixture<VentesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
