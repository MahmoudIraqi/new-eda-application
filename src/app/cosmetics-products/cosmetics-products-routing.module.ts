import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CosmeticsProductsContainerComponent} from "./cosmetics-products-container/cosmetics-products-container.component";
import {CosmeticsProductsComponent} from "./cosmetics-products/cosmetics-products.component";
import {CustomReleaseComponent} from "../custom-release/custom-release.component";
import {DraftRequestsComponent} from "./draft-requests/draft-requests.component";
import {TrackRequestsComponent} from "./track-requests/track-requests.component";

const routes: Routes = [
  {
    path: 'inner',
    component: CosmeticsProductsContainerComponent,
    children: [
      {
        path: 'importation-services',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'release-services',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'release-services/:departId',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'release-services/:departId/:departSecId',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request',
        component: CustomReleaseComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:serviceId/:serviceTypeId',
        component: CustomReleaseComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'draft-request',
        component: DraftRequestsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'track-request',
        component: TrackRequestsComponent,
        data: {animation: 'inner'}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CosmeticsProductsRoutingModule {
}
