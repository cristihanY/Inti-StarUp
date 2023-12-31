import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from './../../../../core/models/category.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  //categories: Category[] = [];
  categories: Category[] = [
 ];

  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  constructor(
    private categoriesService: CategoriesService,
  ) { 
    this.getCategories();
  }

  ngOnInit(): void {
  }
  private getCategories() {
    this.categoriesService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }
}
