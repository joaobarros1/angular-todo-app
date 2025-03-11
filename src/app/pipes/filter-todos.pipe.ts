import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.type';

@Pipe({
    name: 'filterTodos',
})
export class FilterTodosPipe implements PipeTransform {
    transform(todos: Todo[], searchTearm: string): Todo[] {
        if (!searchTearm) return todos;
        const text = searchTearm.toLowerCase();
        return todos.filter((todo) => todo.title.toLowerCase().includes(text));
    }
}
