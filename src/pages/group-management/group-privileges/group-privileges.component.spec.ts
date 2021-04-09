import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPrivilegesComponent } from './group-privileges.component';

describe('GroupPrivilegesComponent', () => {
  let component: GroupPrivilegesComponent;
  let fixture: ComponentFixture<GroupPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
