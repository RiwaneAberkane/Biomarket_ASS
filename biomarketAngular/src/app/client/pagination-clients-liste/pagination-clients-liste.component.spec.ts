import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationClientsListeComponent } from './pagination-clients-liste.component';

describe('PaginationClientsListeComponent', () => {
  let component: PaginationClientsListeComponent;
  let fixture: ComponentFixture<PaginationClientsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationClientsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationClientsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
