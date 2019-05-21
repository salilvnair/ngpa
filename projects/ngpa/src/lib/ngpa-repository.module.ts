import { NgModule, ModuleWithProviders } from "@angular/core";
import { NeDBProviderModule } from "./provider/nedb/module/nedb-provider.module";
import { NeDBConfig } from "./provider/nedb/model/nedb-config.model";
const IMPORT_EXPORT_MODULE_ARRAY = [NeDBProviderModule];
@NgModule({
  imports: [IMPORT_EXPORT_MODULE_ARRAY],
  exports: [IMPORT_EXPORT_MODULE_ARRAY]
})
export class NgpaRepositoryModule {
  static configure(config: NeDBConfig): ModuleWithProviders {
    return {
      ngModule: NgpaRepositoryModule,
      providers: [{ provide: NeDBConfig, useValue: config }]
    };
  }
}
