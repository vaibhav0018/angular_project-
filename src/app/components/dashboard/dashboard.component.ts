import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = []

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes(); // ✅ still call this when logged in
  }
  

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
      console.log(this.heroes);
      
      }

}
