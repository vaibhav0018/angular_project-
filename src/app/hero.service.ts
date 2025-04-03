import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  // private apiUrl = 'http://localhost:5000/heroes'; // ✅ Flask endpoint


  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHero(id: number): Observable<Hero> {
    const hero = this.http.get<Hero>('http://localhost:5000/detail/' + id.toString());
    this.messageService.add('the heroservice fetch hero with id: ' + id.toString());
    return hero;
    }


  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>('http://localhost:5000/heroes');
    this.messageService.add('We grabbed heroes from the server');
    return heroes;
  }

  getUpdate(hero : Hero): Observable<Hero> {
    return this.http.post<Hero>('http://localhost:5000/update', hero);
  }

  deleteHero(id: number): Observable<any> {
    return this.http.post('http://localhost:5000/delete', { id });
  }

  addHero(hero: Hero): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('http://localhost:5000/add', hero);
  }  
  
  }
