import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListeComponent } from './clients-liste.component';

describe('ClientsListeComponent', () => {
  let component: ClientsListeComponent;
  let fixture: ComponentFixture<ClientsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
