import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDetailsComponent } from './vente-details.component';

describe('VenteDetailsComponent', () => {
  let component: VenteDetailsComponent;
  let fixture: ComponentFixture<VenteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
