import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
    selector: 'app-todos',
    imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
    todoService = inject(TodoService);
    todoItems = signal<Array<Todo>>([]);
    searchTearm = signal('');

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

    updateTodoItem = (updatedTodo: Todo) => {
        this.todoItems.update((todos) => {
            return todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            });
        });
    };
}
