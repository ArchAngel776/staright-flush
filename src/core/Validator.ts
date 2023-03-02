import { AsyncAwait } from "./data/types/AsyncAwait"
import { Keyof } from "./data/types/Keyof"
import BaseModel from "./foundations/BaseModel"
import NeastedObjectHelper from "./helpers/NeastedObjectHelper"
import cast from "./hooks/cast"

export default abstract class Validator<Schema, Value>
{
    protected readonly model: BaseModel<Schema>

    protected readonly attribute: Keyof<Schema>

    public constructor(model: BaseModel<Schema>, attribute: Keyof<Schema>)
    {
        this.model = model
        this.attribute = attribute
    }

    public abstract validate(value: Value): AsyncAwait<boolean>

    public abstract getErrorMessage(): string

    public get target(): BaseModel<Schema>
    {
        return this.model
    }

    public get attributeName(): string
    {
        return <string> this.attribute
    }

    public getProperty<Type>(): Type
    {
        return cast(new NeastedObjectHelper(<Schema> this.model.attributes).get(this.attribute))
    }
}