import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/presentation/pages/page-login/page-login.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
  { path: '', component: PageLoginComponent, data: { fullscreen: true } },
  {
    path: 'recaudos',
    canLoad: [AuthenticationGuard],
    loadChildren: () =>
      import('./recaudo/recaudo.module').then((m) => m.RecaudoModule),
  },
  {
    path: 'users',
    canLoad: [AuthenticationGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
