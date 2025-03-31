import '@angular/platform-server/init';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // ✅ same as main.ts

export function render(): Promise<string> {
  return renderApplication(() =>
    bootstrapApplication(AppComponent, appConfig),
    {}
  );
}
