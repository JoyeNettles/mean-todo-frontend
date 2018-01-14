import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TodoService} from "./services/todo.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
