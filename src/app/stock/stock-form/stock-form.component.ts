import {Component, OnInit} from '@angular/core';
import { Stock, StockService } from "../stock.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock = new Stock(0,'',0,0,'',[]);

  categories = ['IT','Finance','Insurance'];

  constructor(private stockService: StockService,
              private routeInfo: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params['id'];

    let fb = new FormBuilder();
    this.formModel = fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      price:['', [Validators.required]],
      desc:[''],
      categories: fb.array([
        [false],
        [false],
        [false]
      ],this.categoriesValidator)
    });

    this.stockService.getStock(stockId).subscribe(data => {
      this.stock = data;
      this.formModel.reset({
        name:[data.name],
        price:[data.price],
        desc:[data.desc],
        categories:[
          data.categories.indexOf(this.categories[0]) != -1,
          data.categories.indexOf(this.categories[1]) != -1,
          data.categories.indexOf(this.categories[2]) != -1
          ]
    });
  })

  }

  categoriesValidator(control: FormArray){
    var valid = false;
     control.controls.forEach(val => {
        if(val.value == true){
          valid = true;
        }
      });
      return valid? null: {'categoriesError':{value: true}};
  }

  cancel(){
      this.router.navigateByUrl("/stock");
  }

  save(){
    var cate = [];
    var index = 0;
    for(var i = 0; i<3; i++){
      if(this.formModel.value.categories[i]){
        cate[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = cate;
    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value);
    this.router.navigateByUrl("/stock");
  }

}
