import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {finalize} from 'rxjs/operators'
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {CategoriesService} from './../../../../core/services/categories.service';
import { AngularFireStorage} from '@angular/fire/storage';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params)=>{
        const id= params.id;
        if(params.id){
          this.getCategory(params.id);
        }
    });
}
 createCategory(data){
  console.log(data);
  console.log("llegamos2");
  this.categoriesService.createCategory(data)
    .subscribe(rta=>{
        console.log(rta);
        this.router.navigate(['./admin/categories']);
    })
}

 updateCategory(data){
  console.log("llegamos2");
  this.categoriesService.updateCategory(this.category.categoryId,data)
    .subscribe(rta=>{
        console.log(rta);
        this.router.navigate(['./admin/categories']);
    })
}

private getCategory(id: string){
  console.log("llegamos aqui");
  this.categoriesService.getCategory(id)
   .subscribe(data=>{
    this.category=data;
    //Imprime todos los valores de la data en el html
    ///this.form.patchValue(data);
    // cambio uno por uno
    // this.nameField.setVAlue(data.name);
   });
   
}

}
