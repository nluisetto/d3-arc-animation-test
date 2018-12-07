import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArcComponent } from './arc/arc.component';
import { ArcGraphPageComponent } from './arc-graph-page/arc-graph-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ArcWithDotComponent } from './arc-with-dot/arc-with-dot.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ArcComponent,
    ArcGraphPageComponent,
    ArcWithDotComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
