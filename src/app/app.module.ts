import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgpaRepositoryModule } from 'projects/ngpa/src/public_api';
import { TestRepository } from './test/repo/test.repo';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgpaRepositoryModule.configure({applicationName:'HolyWOw',createExplicitDB:true,inMemoryDB:false,storeInUserHome:true})
  ],
  providers: [TestRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
