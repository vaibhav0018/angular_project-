import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { authGuard } from './auth.guard'; // ✅ adjust path if needed


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },  // 🚫 removed guard
    { path: 'heroes', component: HeroesComponent },        // 🚫 removed guard
    { path: 'detail/:id', component: HeroDetailComponent }

];



