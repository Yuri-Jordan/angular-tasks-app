import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryDataService } from './in-memory-data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
  ],
})
export class CoreModule { }
