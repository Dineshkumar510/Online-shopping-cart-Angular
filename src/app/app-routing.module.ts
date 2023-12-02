import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartItemsComponent} from './Components/cart-items/cart-items.component'
import {AppComponent} from './app.component';
const routes: Routes = [
  {path:'', redirectTo: '/products', pathMatch: 'full'},
  {path:':element', component: CartItemsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
