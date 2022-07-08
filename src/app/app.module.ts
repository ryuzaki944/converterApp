import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DndDirective } from './directive/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    ProgressComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      // path = url
      path: '',
      component: MainComponent
    }]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
