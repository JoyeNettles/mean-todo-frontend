import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {TodoService} from "./services/todo.service";
import {Observable} from "rxjs";

describe('AppComponent', () => {

  let fixture, component, element;
  let todoService: TodoService;

  beforeEach(async(() => {
    todoService = new TodoService(null);
    const todos = {data:
      {
        docs: [
          {
            title: 'todo1',
            description: 'first desc',
            date: 'first date',
            status: 'first status'
          }
        ]
      }};

    spyOn(todoService, 'getTodos')
      .and.returnValue(Observable.of(todos));

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: TodoService, useValue: todoService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should render title in a h1 tag', async(() => {
    const title = element.querySelector('h1').textContent;
    expect(title).toContain('Welcome to app!');
  }));
});
