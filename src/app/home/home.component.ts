import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = {};
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('calculatedData'));
  }

  // calculateGrade() {
  //   consolelog
  // }

}
