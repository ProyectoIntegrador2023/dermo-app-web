import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInComponent } from './components/home-in/home-in.component';
import { HomeOutComponent } from './components/home-out/home-out.component';

const routes: Routes = [
  {
    path: '',
    component: HomeOutComponent,
    pathMatch: 'full'
  },
  {
    path: 'home-in',
    component: HomeInComponent,
    pathMatch: 'full'
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
