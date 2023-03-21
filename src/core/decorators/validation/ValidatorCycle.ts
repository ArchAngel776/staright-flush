import { AsyncAwait } from "@data/types/AsyncAwait"

import { ValidatorConstructor } from "@decorators/constructors/ValidatorConstructor"



export default function ValidatorCycle<Schema, Value>()
{
    return function <Target extends ValidatorConstructor<Schema, Value>>(Target: Target): Target
    {
        return class extends Target
        {
            

            public validate(value: Value): AsyncAwait<boolean>
            {
                this.init(value)
                return true
            }

            public getErrorMessage(): string
            {
                return ""
            }
        }
    }
}