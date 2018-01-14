import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import ToDo from "../models/todo.model";

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000';
  todoUrl = `${this.api_url}/api/todos`;

  constructor(private http: HttpClient) {
  }

  createTodo(todo: ToDo): Observable<any> {
    return this.http.post(`${this.todoUrl}`, todo);
  }

  getTodos() {
    return this.http.get(this.todoUrl);
  }

  editTodo(todo: ToDo) {
    const editUrl = `${this.todoUrl}`;
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id: string): any {
    const deleteUrl = `${this.todoUrl}/${id}`;
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
