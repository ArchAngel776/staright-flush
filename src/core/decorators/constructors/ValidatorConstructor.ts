import { Constructor } from "@data/types/Constructor"
import { AsyncAwait } from "@data/types/AsyncAwait"

import Validator from "@core/Validator"


export type ValidatorConstructor<Schema, Value> = Constructor<Validator<Schema, Value> & {
    validate(value: Value): AsyncAwait<boolean>
    getErrorMessage(): string
}>