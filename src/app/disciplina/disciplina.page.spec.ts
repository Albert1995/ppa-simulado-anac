import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaPage } from './disciplina.page';

describe('DisciplinaPage', () => {
  let component: DisciplinaPage;
  let fixture: ComponentFixture<DisciplinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
