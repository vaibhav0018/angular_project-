import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../hero.service';
import { MessageService } from '../../message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  imports: [CommonModule, FormsModule, NgFor, HeroDetailComponent, RouterModule]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    public messageService: MessageService
  ) {} 

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`HeroesComponent: selected hero id=${hero.id} and name=${hero.name}`);
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((x: Hero[]) => {
        console.log(x);
        this.heroes = x;
      });
  }
}
