import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesProduitsListeComponent } from './commandes-produits-liste.component';

describe('CommandesProduitsListeComponent', () => {
  let component: CommandesProduitsListeComponent;
  let fixture: ComponentFixture<CommandesProduitsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesProduitsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesProduitsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
