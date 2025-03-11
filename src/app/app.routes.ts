import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./home/home.component').then(
                (module) => module.HomeComponent
            ),
    },
    {
        path: 'todos',
        loadComponent: () =>
            import('./todos/todos.component').then(
                (module) => module.TodosComponent
            ),
    },
];
