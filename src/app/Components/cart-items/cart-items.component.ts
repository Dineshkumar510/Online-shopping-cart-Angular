import { Subscription } from 'rxjs';
import { cartItemsService } from '../Services/cart-items.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {

  cartItems:any;
  starWidth: number = 0;
  discount = Math.floor(Math.random() * 100);
  aspectdiscount = Math.floor(Math.random() * 1000);

  private routeSub: Subscription;
  elementContent: any;
  loading = false;
  elementValue: any;

  constructor(
    private cartItemsService: cartItemsService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.elementContent = params['element'];
      //this.Condition(this.elementContent);
      this.OnDataLoad();
    })
  }

  rateProduct(rateValue: number) {
    this.starWidth = rateValue * 75 / 5;
  }

//   Condition(elements: any) {
//     if (elements === "products") {
//       this.elementValue = 0;
//     }else if (elements === "Clothes") {
//       this.elementValue = 1;
//     } else if (elements === "Electronics") {
//       this.elementValue = 2;
//     } else if (elements === "Audi") {
//       this.elementValue = 3;
//     } else if (elements === "Shoes") {
//       this.elementValue = 4;
//     } else if (elements === "Miscellaneous") {
//       this.elementValue = 5;
//     } else {
//       this.elementValue = null;
//     }
//     return this.elementValue;
// }

async OnDataLoad() {
  try {
    this.loading = true;
    const data: any = await this.cartItemsService.getProductItems({ category: this.elementContent }).toPromise();
    console.log(data);
    this.cartItems = data;
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    this.loading = false;
  }
}

  addedToCart(event:any){
   this.cartItemsService.AddtoCart(event);
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  get isSubMenuOpen(): boolean {
    return this.cartItemsService.sidebarShow;
  }

}
