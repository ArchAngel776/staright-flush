import { ExceptConstructor } from "@decorators/constructors/ExceptConstructor"


export default function Except<Target extends ExceptConstructor>(Target: Target)
{
    return class extends Target 
    {
        public constructor(...args: ConstructorParameters<ExceptConstructor>)
        {
            super(...args)
            this.name = this.getName()
            this.message = this.getMessage()
        }
    }
}