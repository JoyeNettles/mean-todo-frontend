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
        
        <h3>Add New Todo</h3>
        <form>
          <div class="form-row">

            <div class="col-md-5">
              <input type="text" name="title" id="title" [(ngModel)]="newTodo.title" placeholder="Title" class="form-control">
            </div>
            <div class="col-md-5">
              <input name="description" id="description" [(ngModel)]="newTodo.description" placeholder="Description" class="form-control"
                     id="description">
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-primary" (click)="create()">Add</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-2">

      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private todosList: ToDo[];
  private editTodos: ToDo[] = [];
  private newTodo: ToDo = new ToDo();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((response) => {
        this.todosList = ToDo.createFromArray(response);
        console.log(this.todosList);
      });
  }

  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((response) => {
        this.todosList.push(response.data);
        this.newTodo = new ToDo();
      });
  }

  editTodo(todo: ToDo) {
    console.log(todo)
    if(this.todosList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo)
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editTodo(todo)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  doneTodo(todo:ToDo){
    todo.status = 'Done'
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editTodo(todo)
      console.error('Update Unsuccesful')
    })
  }

  submitTodo(event, todo:ToDo){
    if(event.keyCode ==13){
      this.editTodo(todo)
    }
  }

  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
  }
}
