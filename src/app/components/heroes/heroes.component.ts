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
  imports: [CommonModule, FormsModule, NgFor, RouterModule]
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

  deleteHero(id: number): void {
    this.heroService.deleteHero(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.heroes = this.heroes.filter(h => h.id !== id);
          alert('Hero deleted successfully!');
        } else {
          alert('Hero not found!');
        }
      },
      error: () => alert('Error deleting hero')
    });
  }

  newHero: Hero = { id: 0, name: '' };

addHero(): void {
  if (!this.newHero.name.trim() || !this.newHero.id) return;

  this.heroService.addHero(this.newHero).subscribe({
    next: (res) => {
      if (res.success) {
        this.heroes.push({ ...this.newHero });
        this.newHero = { id: 0, name: '' };
        this.messageService.add('New hero added successfully!');
      } else {
        alert('Failed to add hero.');
      }
    },
    error: (err) => {
      console.error(err);
      alert('Error adding hero');
    }
  });
}

  
}
