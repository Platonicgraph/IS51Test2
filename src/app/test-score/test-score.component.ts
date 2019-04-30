import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  name = '';

  async ngOnInit() {
    this.tests = await this.loadTests();
  }

  async loadTests() {
    let tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
    } else {
      tests = await this.loadTestsFromJson();
    }
    console.log('this.contacts from ngOninit... ', this.tests);
    this.tests = tests;
    return tests;
  }

  async loadTestsFromJson() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }

  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }

  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveTest() {
    this.saveToLocalStorage();
    this.toastService.showToast('success', 5000, 'Success: Items Saved!');
  }

  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }

  computeGrade() {
    const commaIndex = this.name.indexOf(', ');
    let error = false;

    if (this.name === '') {
      // this.errorMessage = 'Name must not be empty!';
      this.toastService.showToast('warning', 5000, 'Name must not be null');
      error = true;
    } else if (commaIndex === -1) {
      // this.errorMessage = 'Name must have a comma and a space!';
      this.toastService.showToast('warning', 5000, 'Name must contain a comma and a space');
      error = true;
    }

    if (!error) {
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex);
      const fullName = firstName + ' ' + lastName;
      const data = this.calculate();
      localStorage.setItem('calculatedData', JSON.stringify(data));
      this.router.navigate(['home', data]);
    }
  }

  // calculateGrade() {
  //   this.calculate();
  //   switch (true) {
  //     case totalPercentage >= 90:
  //       grade = 'A';
  //       break;
  //     case score >= 80:
  //       grade = 'B';
  //       break;
  //     case score >= 70:
  //       grade = 'C';
  //       break;
  //     case score >= 60:
  //       grade = 'D';
  //       break;
  //     default:
  //       grade = 'F';
  //       break;
  // }

  // }

  calculate() {
    let pointsPossible = 0;
    let pointsReceived = 0;
    let percentage = 0;
    // let grade = 0;
    for (let i = 0; i < this.tests.length; i++) {
      pointsPossible += this.tests[i].pointsPossible;
      pointsReceived += this.tests[i].pointsReceived;
      percentage += (pointsReceived / pointsPossible);
      // grade = this.tests[i].
    }
    return {
      totalPointsPossible: pointsPossible,
      totalPointsReceived: pointsReceived,
      totalPercentage: percentage / this.tests.length,
      // finalGrade:
    };
  }

  Name() {

  }

}
