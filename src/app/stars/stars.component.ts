import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input() rating: number = 0;

  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[];

  clickStar(index: number){
    if(this.activatedRoute.snapshot.params['id']== undefined){
      return false;
    }else {
      setTimeout(()=>{
        this.rating = index+1;
        this.ratingChange.emit(this.rating);
      },0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = [];
    for(let i = 1; i<=5; i++){
      this.stars.push(i > this.rating);
    }
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
