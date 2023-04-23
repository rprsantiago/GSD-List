import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
