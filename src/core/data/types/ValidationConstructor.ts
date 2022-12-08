import Validation, { ValidationData } from "../../foundations/Validation"
import ModelSchema from "../interfaces/ModelSchema"

export type ValidationConstructor<Schema extends ModelSchema, Data extends ValidationData> = new (data: Partial<Data>) => Validation<Schema, Data>