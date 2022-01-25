import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ProductResponseModel } from '../models/productResponseModel';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl:string="https://localhost:44314/api/";

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ProductResponseModel> {
    let newPath=this.apiUrl + "products/getall";
    return this.httpClient.get<ProductResponseModel>(newPath);
  }

  getProductsByCategory(categoryId:number):Observable<ProductResponseModel> {
    let newPath= this.apiUrl+"products/getbycategory?categoryId="+categoryId;
    return this.httpClient.get<ProductResponseModel>(newPath);
  }

  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/add",product);
  }

}
