import { Component } from '@angular/core';
import { TestRepository } from './test/repo/test.repo';
import { Test } from './test/model/test.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngpa-lib';
  constructor(private testRepo: TestRepository) {}
  ngOnInit(): void {
    let t: Test = new Test();
    t.firstName = "Testing";
    t.lastName = "Ngpa";
    this.testRepo.save(t);
  }
}
