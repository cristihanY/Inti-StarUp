import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {finalize} from 'rxjs/operators'
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {CategoriesService} from './../../../../core/services/categories.service';
import { AngularFireStorage} from '@angular/fire/storage';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

 
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  
  form: FormGroup;
  isNew= true;
 //@Input() category: Category;
 @Input()
  set category(data: Category){
    if(data){
      //this.isNew=false;
      this.form.patchValue(data);
      console.log(data);
    }
  };
  @Output() create= new EventEmitter();
  @Output() update= new EventEmitter();
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) { 
    this.buildForm();
  }

  generateNum (){
    let letras = 'ab0cdef1ghi2jklmn3opqrs4tuvwx5yzABC6DEFG7HIJKLM8NOPQRST9UVWXYZ';
    let letra_random='';
    for (let i = 0; i <= 6; i++) {
      let indice_aleatorio = Math.floor(Math.random() * letras.length);
      let cami=letras.charAt(indice_aleatorio);
      letra_random+=cami;
    }
    return letra_random;
  }

  ngOnInit(): void {



  }

  private buildForm() {
    this.form = this.formBuilder.group({
      categoryId: ['', ],
      category: ['',],
      active: ['true',]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  imprimir(){
    console.log(this.form.value);
  }

  save(){
    console.log("llegamos1");
    if(this.form.valid){
      console.log("llegamos1.1")
      if(this.isNew){
        console.log("llegamos1.2")
        this.create.emit(this.form.value);
        //this.updateCategory();
          
      }else{
        //this.createCategory();
        console.log("llegamos1.3")
        this.update.emit(this.form.value);
      }
    }else{
      this.form.markAllAsTouched();
    }
    
  }



  uploadFile(event){
    const image= event.target.files[0];
    const name = `image_${this.generateNum()}.png`;
    const ref= this.storage.ref(name);
    const task= this.storage.upload(name, image);
    console.log('aqui esta');
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        const urlImage$= ref.getDownloadURL();
        urlImage$.subscribe(url=>{
          console.log(url);
          this.imageField.setValue(url);
        })

      })
    )
      .subscribe();
  }
  

}


