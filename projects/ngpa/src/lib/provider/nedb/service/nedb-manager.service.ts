import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { NeDBConfig } from "../model/nedb-config.model";
import * as NeDBConstant from "../constant/nedb.constant";
import * as NgpaConstant from "../../../constant/ngpa.constant";
import { FsCommonUtil } from "../util/fs-common.util";
import { ElectronAppUtil } from "../util/electron-app.util";

@Injectable()
export class NeDBConnectionManager {
  constructor(
     private _electronService: ElectronService,
     private fsCommonUtil: FsCommonUtil,
     private electronAppUtil:ElectronAppUtil
     ) {}
  path = this._electronService.remote.require("path");
  fs = this._electronService.remote.require("fs");
  getInstance() {
    return this.getDefinedInstance(
      NeDBConstant.NEDB_CONFIG_DATABASE_FOLDER_NAME,
      NeDBConstant.NEDB_CONFIG_DEFAULT_DB_FILE_NAME
    );
  }

  getDefinedInstance(databaseFolderName: string,
     databaseFileName: string,
     neDBConfig?:NeDBConfig) {
    var app = this._electronService.remote.require("electron").app;
    var path = this._electronService.remote.require("path");
    var pathDetail:string;
    if(neDBConfig){
      if(neDBConfig.storeInUserHome) {
        pathDetail = path.join(
          this.electronAppUtil.getUserHome(),
          '.ngpa',
          neDBConfig.applicationName.toLowerCase(),
          NgpaConstant.NGPA_FOLDER_NAME,
          NeDBConstant.NEDB_HOME_FOLDER_NAME,
          databaseFolderName,
          databaseFileName + NeDBConstant.NEDB_DATABASE_FILENAME_EXTENSTION
        );
      }
    }
    else{
      pathDetail = path.join(
        app.getAppPath(),
        NgpaConstant.NGPA_FOLDER_NAME,
        NeDBConstant.NEDB_HOME_FOLDER_NAME,
        databaseFolderName,
        databaseFileName + NeDBConstant.NEDB_DATABASE_FILENAME_EXTENSTION
      );
    }
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

  public getNeDBConfig(neDBConfig:NeDBConfig): NeDBConfig {
    var app = this._electronService.remote.require("electron").app;
    var path = this._electronService.remote.require("path");
    var configPathDetail:string;
    if(neDBConfig){
      if(neDBConfig.storeInUserHome) {
        configPathDetail = path.join(
          this.electronAppUtil.getUserHome(),
          '.ngpa',
          neDBConfig.applicationName.toLowerCase(),
          NgpaConstant.NGPA_FOLDER_NAME,
          NeDBConstant.NEDB_HOME_FOLDER_NAME,
          NgpaConstant.NGPA_SUBFOLDER_CONFIG,
          NgpaConstant.NGPA_PROVIDER_CONFIG_NEDB
        );
      }
    }
    else{
      configPathDetail = path.join(
        app.getAppPath(),
        NgpaConstant.NGPA_FOLDER_NAME,
        NeDBConstant.NEDB_HOME_FOLDER_NAME,
        NgpaConstant.NGPA_SUBFOLDER_CONFIG,
        NgpaConstant.NGPA_PROVIDER_CONFIG_NEDB
      );
    }

    var basePath:string;
    if(neDBConfig){
      if(neDBConfig.storeInUserHome) {
        basePath = path.join(
          this.electronAppUtil.getUserHome(),
          '.ngpa',
          neDBConfig.applicationName.toLowerCase(),
          NgpaConstant.NGPA_FOLDER_NAME,
          NeDBConstant.NEDB_HOME_FOLDER_NAME,
          NgpaConstant.NGPA_SUBFOLDER_CONFIG
        );
      }
    }
    else{
      basePath = path.join(
        app.getAppPath(),
        NgpaConstant.NGPA_FOLDER_NAME,
        NeDBConstant.NEDB_HOME_FOLDER_NAME,
        NgpaConstant.NGPA_SUBFOLDER_CONFIG
      );
    }
    this.fsCommonUtil.checkAndCreateDestinationPath(basePath);
    var nedbBasicConfig = {
      applicationName: "your_app",
      createExplicitDB: true,
      inMemoryDB: false,
      storeInUserHome: false
    };
    if(neDBConfig){
      nedbBasicConfig  = neDBConfig;
    }
    var nedbBasicConfigString = JSON.stringify(nedbBasicConfig);
    this.fsCommonUtil.writeFileIfNotExist(configPathDetail, nedbBasicConfigString);
    return this.fsCommonUtil.readFileAsJson(configPathDetail);
  }
}
