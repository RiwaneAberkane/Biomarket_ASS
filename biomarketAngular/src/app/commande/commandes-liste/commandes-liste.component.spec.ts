import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesListeComponent } from './commandes-liste.component';

describe('CommandesListeComponent', () => {
  let component: CommandesListeComponent;
  let fixture: ComponentFixture<CommandesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
