import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product} from 'src/app/models/product';
import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!:Product[];
  dataLoaded:boolean=false;
  filterText:string="";

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe((response)=>{
      this.products=response.data;
      //this.dataLoaded=true;
      this.dataLoaded=response.success;
    })
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe((response)=>{
      this.products=response.data;
      //this.dataLoaded=true;
      this.dataLoaded=response.success;
    })
  }

  addToCart(product:Product){
    if (product.productId===1) {
      this.toastrService.error("Ürün sepete eklenemez.",product.productName);
    } else {
      this.cartService.addToCart(product);
      this.toastrService.success("Sepete eklendi.",product.productName);
    }
  }

}
