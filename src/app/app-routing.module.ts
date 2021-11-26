import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnonceCreateComponent } from './components/annonce-create/annonce-create.component';
import { AnnonceDetailsComponent } from './components/annonce-details/annonce-details.component';
import { AnnonceListComponent } from './components/annonce-list/annonce-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'annonces', pathMatch: 'full' },
  { path: 'annonces', component: AnnonceListComponent },
  { path: 'annonces/:id', component: AnnonceDetailsComponent },
  { path: 'create', component: AnnonceCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
