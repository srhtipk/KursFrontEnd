import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories!:Category[];
  currentCategory!:Category;   //tsconfig.json dosyasında 9. satırda yazdığımız kod ile ilk değer atamadan oluşturabildik.

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories=response.data;
    })
  }

  setCurrentCategory(category:Category){
    this.currentCategory=category;
  }

  getCurrentCategoryClass(category:Category){
    if (category==this.currentCategory) {
      return "active";
    }
    else{
      return "";
    }
  }

  getAllCategoryClass(){
    if (!this.currentCategory) {
      return "active";
    }else{
      return "";
    }
  }


  
}
