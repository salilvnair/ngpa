import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";

@Injectable()
export class FsCommonUtil {
  constructor(private electronService: ElectronService) {}
  fs = this.electronService.remote.require("fs");
  path = this.electronService.remote.require("path");

  writeFileIfNotExist(fileWithPath: string, contents: string) {
    if (!this.fs.existsSync(fileWithPath)) {
      var options = options || {};
      options.flag = "wx";
      this.fs.writeFileSync(fileWithPath, contents, options);
    }
  }

  checkAndCreateDestinationPath(fileDestination) {
    this._forceCreateDir(fileDestination);
  }

  _forceCreateDir(dir:string) {
    if (this.fs.existsSync(dir)) {
      return;
    }
    try {
      this.fs.mkdirSync(dir);
    } catch (err) {
      if(err+''.indexOf('ENOENT')){
         this._forceCreateDir(this.path.dirname(dir)); //create parent dir
         this._forceCreateDir(dir); //create dir
      }
    }
  }

  readFileAsJson(jsonPath) {
    return JSON.parse(this.fs.readFileSync(jsonPath, "utf8"));
  }
}
