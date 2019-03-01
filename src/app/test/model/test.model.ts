import { Database } from "projects/ngpa/src/public_api";

@Database("test")
export class Test {
  _id: string;
  firstName: string;
  lastName: string;
}
