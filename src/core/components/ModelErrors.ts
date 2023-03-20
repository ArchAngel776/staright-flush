/* eslint-disable @typescript-eslint/no-unused-vars */
import { Constructor } from "@data/types/Constructor"
import { ModelErrorsData } from "@data/types/ModelErrorsData"
import { ModelFirstErrorsData } from "@data/types/ModelFirstErrorsData"
import type { Keyof } from "@data/types/Keyof"

import Method from "@helpers/Method"
import CreateIfNotExists from "@decorators/models/errors/CreateIfNotExists"

import empty from "@hooks/empty"


export default class ModelErrors<Schema>
{
    protected errors: ModelErrorsData<Schema>

    public constructor(errors: ModelErrorsData<Schema> = {})
    {
        this.errors = errors
    }

    public getErrors(): ModelErrorsData<Schema>
    {
        return this.errors
    }

    public getError(property: Keyof<Schema>): Array<string>
    {
        return this.errors[property] || []
    }

    public hasErrors(): boolean
    {
        return !empty(this.getErrors())
    }

    public hasError(property: Keyof<Schema>): boolean
    {
        return !empty(this.getError(property))
    }

    public getFirstErrors(): ModelFirstErrorsData<Schema>
    {
        const errors: ModelFirstErrorsData<Schema> = {}
        this.getErrorsProperties().forEach(property => errors[property] = this.getFirstError(property))
        return errors
    }

    public getFirstError(property: Keyof<Schema>): string | undefined
    {
        return this.getError(property).shift()
    }

    public getErrorsProperties(): Array<Keyof<Schema>>
    {
        return Object.keys(this.errors).map(key => key as Keyof<Schema>)
    }

    public getFirstErrorProperty(): Keyof<Schema> | undefined
    {
        return this.getErrorsProperties().shift()
    }

    public getFirstErrorFromAll(): string | undefined
    {
        const property = this.getFirstErrorProperty()
        return property ? this.getFirstError(property) : undefined
    }

    @Method(<Constructor<CreateIfNotExists<Schema>>> CreateIfNotExists)
    public appendError(attribute: Keyof<Schema>, message: string): this
    {
        this.errors[attribute]?.push(message)
        return this
    }

    public clearAllErrors(): this
    {
        this.getErrorsProperties().forEach(attribute => this.clearErrors(attribute))
        return this
    }

    public clearErrors(attribute: Keyof<Schema>): this
    {
        delete this.errors[attribute]
        return this
    }

    public set operationErrors(errors: ModelErrorsData<Schema>)
    {
        this.errors = errors
    }
}