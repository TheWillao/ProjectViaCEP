import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryComponent } from './components/registry/registry.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UserareaComponent } from './components/registry/userarea/userarea.component';

const routes: Routes = [
  {
    path: 'Registry',
    component: RegistryComponent,
  },
  {
    path: '',
    component: CarouselComponent,
  },
  {
    path: 'UserArea',
    component: UserareaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
