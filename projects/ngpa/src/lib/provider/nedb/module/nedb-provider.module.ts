import { NgModule } from "@angular/core";
import { NgxElectronModule } from "ngx-electron";
import { NeDBConnectionManager } from "../service/nedb-manager.service";
import { NeDBService } from "../service/nedb.service";
import { FsCommonUtil } from "../util/fs-common.util";
const IMPORT_EXPORT_MODULE_ARRAY = [NgxElectronModule];
const PROVIDERS_ARRAY = [NeDBConnectionManager, NeDBService, FsCommonUtil];
@NgModule({
  providers: [PROVIDERS_ARRAY],
  imports: [IMPORT_EXPORT_MODULE_ARRAY],
  exports: [IMPORT_EXPORT_MODULE_ARRAY]
})
export class NeDBProviderModule {}
