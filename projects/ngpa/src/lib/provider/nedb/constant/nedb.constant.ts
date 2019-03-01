import { NeDBConfig } from "../model/nedb-config.model";

export const NEDB_HOME_FOLDER_NAME = "nedb";
export const NEDB_CONFIG_DATABASE_FOLDER_NAME = "database";
export const NEDB_CONFIG_DEFAULT_DB_FILE_NAME = "master";
export const NEDB_DATABASE_FILENAME_EXTENSTION = ".db";
export const NEDB_DEFAULT_CONFIG: NeDBConfig = {
  applicationName: "AppName",
  createExplicitDB: true,
  inMemoryDB: false
};
