import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from '../components/heroes/heroes.component';
import path from 'path';
import { AppComponent } from '../app.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }