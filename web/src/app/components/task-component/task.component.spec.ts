import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('TaskComponentComponent', () => {
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

  describe('component initializing', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the task title if a task is passed', () => {
      const title = fixture.nativeElement.querySelector('[data-test="title"]');
      expect(title.textContent).toBe(component.task.title);
    });

    it('should be shown when the task was created', () => {
      const date = fixture.nativeElement.querySelector('[data-test="date"]');
      expect(date).toBeTruthy();
    });

    describe('component initializing with description', () => {
      it('should show the task description if a task with description is passed', () => {
        component.task.description = 'description';
        fixture.detectChanges();

        const description = fixture.nativeElement.querySelector('[data-test="description"]');
        expect(description.textContent).toBe(component.task.description);
      });

      it('should not show the task description if a task without description is passed', () => {
        component.task.description = '';
        fixture.detectChanges();

        const description = fixture.nativeElement.querySelector('[data-test="description"]');
        expect(description.textContent).toBe('');
      });
    });

    describe('task checking', () => {
      it('should be showing a X when the task is not completed', () => {
        const checkedImage = fixture.nativeElement.querySelector('[data-test="check-image"]');
        expect(checkedImage.src).toContain('/assets/imgs/close.svg');
      });

      it('should be showing a check-mark when the task is completed', () => {
        component.task.completed = true;
        fixture.detectChanges();

        const checkedImage = fixture.nativeElement.querySelector('[data-test="check-image"]');
        expect(checkedImage.src).toContain('/assets/imgs/checkmark-outline.svg');
      });
    });
  });
});
