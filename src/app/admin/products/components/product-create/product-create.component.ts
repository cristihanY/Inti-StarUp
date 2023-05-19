import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  categories: Category[]=[];
  imagenlink: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        //console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          //console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      productId: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      productImg: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      descriptionProduct: ['', [Validators.required, Validators.minLength(10)]],
      stock: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });

    this.form.get('stock').valueChanges
    .subscribe(value=>{
      if(value==0){
        alert("No puede crear un producto sin una cantidad");
      }
    })
  }

  get priceField() {
    return this.form.get('price');
  }

  get nameField() {
    return this.form.get('name');
  }
  get descriptionField() {
    return this.form.get('descriptionProduct');
  }
  get categoryIdFiel() {
    return this.form.get('categoryId');
  }

  get productImg(){
    return this.form.get("productImg");
  }
  
  private getCategories(){
    this.categoriesService.getAllCategories()
      .subscribe((category)=>{
          this.categories=category;
      })
  }

}
