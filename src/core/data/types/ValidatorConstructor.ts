import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import { ValidationData } from "@foundations/Validation"

import Validator from "@core/Validator"


export type ValidatorConstructor<Schema, Data extends ValidationData<Schema>, Prop extends keyof Data> = new (model: BaseModel<Schema>, attribute: Keyof<Schema>) => Validator<Schema, Data[Prop]>