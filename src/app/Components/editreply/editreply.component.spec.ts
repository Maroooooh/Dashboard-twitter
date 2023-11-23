import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreplyComponent } from './editreply.component';

describe('EditreplyComponent', () => {
  let component: EditreplyComponent;
  let fixture: ComponentFixture<EditreplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditreplyComponent]
    });
    fixture = TestBed.createComponent(EditreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
