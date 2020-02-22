import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodosModule } from './todos/todos.module';
import { TodoMainComponent } from './todos/todo-main.component';
import { AuthGuard } from './auth.gurds';
import { TodosResolverService } from './app.resolver';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'todos',
    component: TodoMainComponent,
    // loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule),
    canActivate: [AuthGuard],
    resolve: {
      todo: TodosResolverService,
    },
  },
];

@NgModule({
  // providers[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
