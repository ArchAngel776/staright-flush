import BooleanValidation from "../../../validators/core/BooleanValidation"
import DateValidation from "../../../validators/core/DateValidation"
import NumberValidation from "../../../validators/core/NumberValidation"
import ObjectValidation from "../../../validators/core/ObjectValidation"
import StringValidation from "../../../validators/core/StringValidation"

export type ValidationSchema<Schema> = {
    [Key in keyof Schema]: (Schema[Key] extends boolean ? BooleanValidation<Schema> : 
        Schema[Key] extends number ? NumberValidation<Schema> :
        Schema[Key] extends string ? StringValidation<Schema> :
        Schema[Key] extends Date ? DateValidation<Schema> :
        //Schema[Key] extends Record<string, unknown> ? ValidationSchema<Schema[Key]> :
        Schema[Key] extends object ? ObjectValidation<Schema> : never)
}