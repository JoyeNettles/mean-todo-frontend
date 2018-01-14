import {Response} from '@angular/http';
import {TodoService} from './services/todo.service';
import ToDo from './models/todo.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">

      <div class="todos" *ngIf="todosList">
        <table class="table">
          <thead class="h">
          <tr class="h">
            <th class="h">Title</th>
            <th class="h">Description</th>
            <th class="h">Date</th>
            <th class="h">Status</th>
            <th class="h">Options</th>
          </tr>
          </thead>
          <tbody>

          <tr class="todo" (dblclick)="editTodo(todo)" *ngFor="let todo of todosList">

            <td>{{todo.title}}</td>
            <td>{{todo.description}}</td>
            <td>{{todo.date | date}}</td>
            <td>{{todo.status}}</td>

            <td>
              <button class="btn btn-success" (click)="doneTodo(todo)">
                <i  class="fa fa-check"></i>
              </button>
              <button class="btn btn-primary" (click)="editTodo(todo)">
                <i  class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-danger" (click)="deleteTodo(todo)">
                <i  class="fa fa-trash"></i>
              </button>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private todosList: ToDo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((response) => {
        this.todosList = ToDo.createFromArray(response);
        console.log(this.todosList);
      });
  }
}
