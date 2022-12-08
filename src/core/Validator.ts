import { AsyncAwait } from "./data/types/AsyncAwait"
import BaseModel from "./foundations/BaseModel"
import cast from "./hooks/cast"

export default abstract class Validator<Schema, Value>
{
    protected readonly model: BaseModel<Schema>

    protected readonly attribute: keyof Schema

    public constructor(model: BaseModel<Schema>, attribute: keyof Schema)
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
        return cast(this.model.attributes[this.attribute])
    }
}