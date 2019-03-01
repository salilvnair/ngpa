
import { Test } from "../model/test.model";
import { NeDBRepository } from "projects/ngpa/src/public_api";
import { Injectable } from "@angular/core";

@Injectable()
export class TestRepository extends NeDBRepository<Test> {
  returnEntityInstance(): Test {
    return new Test();
  }
}
