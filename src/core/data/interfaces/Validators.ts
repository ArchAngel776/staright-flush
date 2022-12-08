import { ValidationData } from "../../foundations/Validation"
import { ValidatorConstructor } from "../types/ValidatorConstructor"

export type Validators<Schema, Data extends ValidationData> = {
    [property in keyof Data]: ValidatorConstructor<Schema, Data>
}