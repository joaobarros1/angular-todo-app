import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.type';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-todos',
    imports: [],
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
    todoService = inject(TodoService);
    todoItems = signal<Array<Todo>>([]);

    ngOnInit() {
        this.todoService
            .getTodosFromApi()
            .pipe(
                catchError((error) => {
                    console.error('Error fetching todos', error);
                    throw error;
                })
            )
            .subscribe((todos) => {
                this.todoItems.set(todos);
            });
    }
}
