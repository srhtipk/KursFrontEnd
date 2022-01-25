import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService) { }
  productAddForm:FormGroup;

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  add(){
    if (this.productAddForm.valid) {
      let productModel=Object.assign({},this.productAddForm.value);
      this.productService.add(productModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message,"Başarılı.");
      },responseError=>{
        
      });
      
    } else {
      this.toastrService.error("Ürün eklenemedi.","Dikkat!");
    }
  }

}