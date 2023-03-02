import BaseModel from "../../foundations/BaseModel"
import { ValidationData } from "../../foundations/Validation"
import Validator from "../../Validator"
import { Keyof } from "./Keyof"

export type ValidatorConstructor<Schema, Data extends ValidationData> = new (model: BaseModel<Schema>, attribute: Keyof<Schema>) => Validator<Schema, Data[keyof Data]>