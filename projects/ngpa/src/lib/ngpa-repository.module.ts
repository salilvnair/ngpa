import { NgModule } from "@angular/core";
import { NeDBProviderModule } from "./provider/nedb/module/nedb-provider.module";
const IMPORT_EXPORT_MODULE_ARRAY = [NeDBProviderModule];
@NgModule({
  imports: [IMPORT_EXPORT_MODULE_ARRAY],
  exports: [IMPORT_EXPORT_MODULE_ARRAY]
})
export class NgpaRepositoryModule {}
