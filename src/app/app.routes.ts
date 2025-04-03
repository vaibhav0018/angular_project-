import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'heroes', component: HeroesComponent, canActivate: [authGuard] },
    { path: 'detail/:id', component: HeroDetailComponent, canActivate: [authGuard] }
];


    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: 'login', component: LoginComponent },


