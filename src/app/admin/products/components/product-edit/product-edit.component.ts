import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CategoriesService } from 'src/app/core/services/categories.service';
import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  categories: Category[]=[];
  imagenlink: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      //console.log(this.id);
      this.productsService.getProduct(this.id)
      .subscribe(product => {
          this.imagenlink=product.productImg;
        this.form.patchValue(product);
      });
    });
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      //console.log(product);
     this.productsService.createProduct( product)
      .subscribe((newProduct) => {
        // console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      productId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      productImg: [''],
      stock:[''],
      categoryId: ['comida', [Validators.required]],
      descriptionProduct: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  get productImg(){
    return this.form.get("productImg");
  }

  get categoryIdFiel() {
    return this.form.get('categoryId');
  }
  private getCategories(){
    this.categoriesService.getAllCategories()
      .subscribe((category)=>{
          this.categories=category;
      })
  }
}
