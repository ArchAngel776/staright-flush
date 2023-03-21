/* eslint-disable @typescript-eslint/no-unused-vars */
import { AsyncAwait } from "@data/types/AsyncAwait"
import type { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import cast from "@hooks/cast"


export default abstract class Validator<Schema, Value, Type = unknown>
{
    protected readonly model: BaseModel<Schema>

    protected readonly attribute: Keyof<Schema>

    public constructor(model: BaseModel<Schema>, attribute: Keyof<Schema>)
    {
        this.model = model
        this.attribute = attribute
    }

    public init(value: Value): void
    {
        return
    }

    public abstract validate(value: Value): AsyncAwait<boolean>

    public abstract getErrorMessage(): string

    public get target(): BaseModel<Schema>
    {
        return this.model
    }

    public get attributeName(): string
    {
        return this.attribute.toString()
    }

    public getProperty<PropertyValue = Type>(): PropertyValue
    {
        return cast(new NeastedObjectHelper(<Schema> this.model.attributes).get(this.attribute))
    }
}