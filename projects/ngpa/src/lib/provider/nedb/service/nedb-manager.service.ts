import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { NeDBConfig } from "../model/nedb-config.model";
import * as NeDBConstant from "../constant/nedb.constant";
import * as NgpaConstant from "../../../constant/ngpa.constant";
import { FsCommonUtil } from "../util/fs-common.util";

@Injectable()
export class NeDBConnectionManager {
  constructor(private _electronService: ElectronService, private fsCommonUtil: FsCommonUtil) {}
  path = this._electronService.remote.require("path");
  fs = this._electronService.remote.require("fs");
  getInstance() {
    return this.getDefinedInstance(
      NeDBConstant.NEDB_CONFIG_DATABASE_FOLDER_NAME,
      NeDBConstant.NEDB_CONFIG_DEFAULT_DB_FILE_NAME
    );
  }

  getDefinedInstance(databaseFolderName: string, databaseFileName: string) {
    var app = this._electronService.remote.require("electron").app;
    var path = this._electronService.remote.require("path");
    var pathDetail = path.join(
      app.getAppPath(),
      NgpaConstant.NGPA_FOLDER_NAME,
      NeDBConstant.NEDB_HOME_FOLDER_NAME,
      databaseFolderName,
      databaseFileName + NeDBConstant.NEDB_DATABASE_FILENAME_EXTENSTION
    );
    var Datastore = this._electronService.remote.getGlobal(NgpaConstant.NODEJS_GLOBAL_NGPA_PROVIDER)
      .nedb;
    var dbSourceInstance = new Datastore({
      filename: pathDetail,
      autoload: true
    });
    return dbSourceInstance;
  }

  getInMemoryInstance() {
    var Datastore = this._electronService.remote.getGlobal(NgpaConstant.NODEJS_GLOBAL_NGPA_PROVIDER)
      .nedb;
    var dbSourceInstance = new Datastore();
    return dbSourceInstance;
  }

  public getNeDBConfig(): NeDBConfig {
    var app = this._electronService.remote.require("electron").app;
    var path = this._electronService.remote.require("path");
    var configPathDetail = path.join(
      app.getAppPath(),
      NgpaConstant.NGPA_FOLDER_NAME,
      NeDBConstant.NEDB_HOME_FOLDER_NAME,
      NgpaConstant.NGPA_SUBFOLDER_CONFIG,
      NgpaConstant.NGPA_PROVIDER_CONFIG_NEDB
    );
    var basePath = path.join(
      app.getAppPath(),
      NgpaConstant.NGPA_FOLDER_NAME,
      NeDBConstant.NEDB_HOME_FOLDER_NAME,
      NgpaConstant.NGPA_SUBFOLDER_CONFIG
    );
    this.fsCommonUtil.checkAndCreateDestinationPath(basePath);
    var nedbBasicConfig = {
      applicationName: "your_app",
      createExplicitDB: true,
      inMemoryDB: false
    };
    var nedbBasicConfigString = JSON.stringify(nedbBasicConfig);
    this.fsCommonUtil.writeFileIfNotExist(configPathDetail, nedbBasicConfigString);
    return this.fsCommonUtil.readFileAsJson(configPathDetail);
  }
}
