import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageRecaudoComponent } from './presentation/pages/page-recaudo/page-recaudo.component';

const routes: Routes = [{ path: '', component: PageRecaudoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecaudoRoutingModule {}
