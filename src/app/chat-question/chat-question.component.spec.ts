import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatQuestionComponent } from './chat-question.component';

describe('ChatQuestionComponent', () => {
  let component: ChatQuestionComponent;
  let fixture: ComponentFixture<ChatQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
