import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesListeComponent } from './roles-liste.component';

describe('RolesListeComponent', () => {
  let component: RolesListeComponent;
  let fixture: ComponentFixture<RolesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
