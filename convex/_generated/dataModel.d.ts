import type {
  DataModelFromSchemaDefinition,
  GenericId,
} from "convex/server";
import type schema from "../schema.js";

export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
export type TableNames = keyof DataModel & string;
export type Id<TableName extends TableNames> = GenericId<TableName>;
export type Doc<TableName extends TableNames> = DataModel[TableName]["document"];
