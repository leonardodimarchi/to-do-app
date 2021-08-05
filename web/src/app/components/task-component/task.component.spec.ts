import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('__Task__', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const taskMock = { title: 'title', completed: false, createdAt: new Date() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = taskMock;
    fixture.detectChanges();
  });

  describe('__component initializing__', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the task title if a task is passed', () => {
      const title = query<HTMLTitleElement>('[data-test="title"]');
      expect(title.textContent).toBe(component.task.title);
    });

    it('should be shown when the task was created', () => {
      const date = query<HTMLSpanElement>('[data-test="date"]');
      expect(date).toBeTruthy();
    });

    describe('component initializing with description', () => {
      it('should show the task description if a task with description is passed', () => {
        component.task.description = 'description';
        fixture.detectChanges();

        const description = query<HTMLParagraphElement>('[data-test="description"]');
        expect(description.textContent).toBe(component.task.description);
      });

      it('should not show the task description if a task without description is passed', () => {
        component.task.description = '';
        fixture.detectChanges();

        const description = query<HTMLParagraphElement>('[data-test="description"]');
        expect(description.textContent).toBe('');
      });
    });

    describe('__task checking__', () => {
      it('should not show the check image when the task is not completed', () => {
        const checkBox = query<HTMLDivElement>('[data-test="check-box"]');

        component.task.completed = false;
        fixture.detectChanges();

        expect(checkBox.children.length === 1).toBeFalse();
      });

      it('should be showing a check-mark when the task is completed', () => {
        component.task.completed = true;
        fixture.detectChanges();

        const checkedImage = query<HTMLImageElement>('[data-test="check-image"]');
        expect(checkedImage.src).toContain('/assets/imgs/checkmark-outline.svg');
      });

      it('should make the test complete by clicking the check-box', () => {
        const checkBox = query<HTMLDivElement>('[data-test="check-box"]');
        checkBox.click();
        expect(component.task.completed).toBeTrue();
      })
    });
  });

  function query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
});
