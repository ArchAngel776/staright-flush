import { ValidatorConstructor } from "@data/types/ValidatorConstructor"
import { ValidationData } from "@foundations/Validation"


export type Validators<Schema, Data extends ValidationData<Schema>> =
{
    [Prop in keyof Data]: ValidatorConstructor<Schema, Data, Prop>
}