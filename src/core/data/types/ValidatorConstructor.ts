import BaseModel from "../../foundations/BaseModel"
import { ValidationData } from "../../foundations/Validation"
import Validator from "../../Validator"

export type ValidatorConstructor<Schema, Data extends ValidationData> = new (model: BaseModel<Schema>, attribute: keyof Schema) => Validator<Schema, Data[keyof Data]>