import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ArcGraphPageComponent} from './arc-graph-page/arc-graph-page.component';

const routes: Route[] = [
  { path: '', redirectTo: 'arc', pathMatch: 'full' },
  { path: 'arc', component: ArcGraphPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
