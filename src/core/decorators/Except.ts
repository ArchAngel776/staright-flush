/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExceptConstructor } from "./constructors/ExceptConstructor"

export default function Except<Target extends ExceptConstructor>(Target: Target)
{
    return class extends Target 
    {
        public constructor(...args: Array<any>)
        {
            super(...args)
            this.name = this.getName()
            this.message = this.getMessage()
        }
    }
}