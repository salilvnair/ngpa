![npm (scoped)](https://img.shields.io/npm/v/@salilvnair/ngpa.svg?style=plastic)
# Angular Persistent Api Repository (ngpa) [Electron+Angular App]

    Angular Persistent API ngpa is similar to
    Springboot JPA repository where we can define our custom
    repo with entity class as generic type and all of the
    default available crud functions can be directly used.

#### 1. Package dependencies which needs to be installed

> `npm install nedb`

> `npm install ngx-electron`

#### 2. Electron Configuration `main.js`

```javascript
electron = require("electron");
const { app, BrowserWindow } = electron;
let nedbDatabase = require("nedb");

global.ngpa_provider = {
  nedb: nedbDatabase
};
```

> Above settings are required in **main.js** else neDb will be creating the tables in the in-memory-database instead of file based database.

> This issue is with Angular CLI as it doesn't allow runtime creation of files using nedb, hence above configuration needs to be done.

#### 3. Create a model class with a decorator `Database`

```javascript
import { Database } from "@salilvnair/ngpa";

@Database("employee")
export class Employee {
  firstName: string;
  lastName: string;
  designation: string;
}
```

#### 4. Create a repo for above model class extending `NeDBRepository` and implement the `returnEntityInstance` method like below

```javascript
import { NeDBRepository } from "@salilvnair/ngpa";
import { Employee } from "../model/employee.model";

export class EmployeeRepo extends NeDBRepository<Employee> {
  // this is an abstract implementation which needs to be given
  returnEntityInstance(): Employee {
    return new Employee();
  }
}
```

#### 5. Import `NgpaRepositoryModule` in `app.module`

```javascript
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NgpaRepositoryModule } from "@salilvnair/ngpa";

@NgModule({
  declarations: [AppComponent],
  imports: [NgpaRepositoryModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

#### 6. How to use it in any angular component or service

```javascript
import { Component, OnInit } from '@angular/core';
import { EmployeeRepo } from './employee/repo/employee.repo';
import { Employee } from './employee/model/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private employeeRepo:EmployeeRepo){}

  ngOnInit(){
    let employee:Employee = new Employee();
    employee.firstName = "John";
    employee.lastName = "Doe";
    employee.designation = "CEO";
    this.employeeRepo.save(employee);
  }
}
```

> _when the above ngOnInit code executes a folder named **ngpa-data** will be created at the root path._

> _which will have a subfolder named **nedb** which in turn will have two subfolders named **config** and **database**._

> _config folder contains **nedb.config.json** which is generated as default config._

> _database folder is where the real data recides post save with file named as whatever given in the entity Database decorators value._

> _records in each database will have _id attribute uniquely generated id by nedb._
