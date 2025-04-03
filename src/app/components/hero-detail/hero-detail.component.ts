import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit{
  hero?: Hero;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id  = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    }

  goBack(): void{
      this.location.back();
    }

  save(): void {
    if (this.hero)
    this.heroService.getUpdate(this.hero).subscribe(); 
  }
}
