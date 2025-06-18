import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material-module/angular-material-module.module';
import { SharedModule } from '../../shared/shared.module';


describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        SharedModule,
      ],
      declarations: [TaskFormComponent],
      providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { params: {} },
          params: of({}),
        }
      }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
