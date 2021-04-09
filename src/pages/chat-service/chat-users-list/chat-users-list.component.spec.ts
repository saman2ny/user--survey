import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsersListComponent } from './chat-users-list.component';

describe('ChatUsersListComponent', () => {
  let component: ChatUsersListComponent;
  let fixture: ComponentFixture<ChatUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
