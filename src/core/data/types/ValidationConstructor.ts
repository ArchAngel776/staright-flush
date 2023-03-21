import ModelSchema from "@data/interfaces/ModelSchema"

import Validation, { ValidationData } from "@foundations/Validation"


export type ValidationConstructor<Schema extends ModelSchema, Data extends ValidationData<Schema>> = new (data: Partial<Data>) => Validation<Schema, Data>