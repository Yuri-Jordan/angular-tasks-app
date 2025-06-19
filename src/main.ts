import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
})
  .catch(err => console.error(err));
