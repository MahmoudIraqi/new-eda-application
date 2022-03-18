import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {HomeContainerComponent} from './home-container/home-container.component';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {ApplicationGuard} from './application.guard';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {
    path: 'pages', component: HomeContainerComponent, children: [
      {path: 'home', component: HomepageComponent, data: {animation: 'home'}, canActivate: [ApplicationGuard]},
      {
        path: 'notification-list',
        component: NotificationListComponent,
        data: {animation: 'notification-list'},
        canActivate: [ApplicationGuard]
      },
      {
        path: 'pharmaceutical-raw-material',
        canActivate: [ApplicationGuard],
        data: {animation: 'pharmaceutical-raw-material'},
        loadChildren: () =>
          import('./pharmaceutical-raw-materials/pharmaceutical-raw-materials.module').then((m) => m.PharmaceuticalRawMaterialsModule),
      },
      {
        path: 'cosmetics-product',
        canActivate: [ApplicationGuard],
        data: {animation: 'cosmetics-product'},
        loadChildren: () =>
          import('./cosmetics-products/cosmetics-products.module').then((m) => m.CosmeticsProductsModule),
      },
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
