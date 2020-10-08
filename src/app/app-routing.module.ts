import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';

const routes: Routes = [
  { path: 'cursos', component: CursosListaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'cursos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
