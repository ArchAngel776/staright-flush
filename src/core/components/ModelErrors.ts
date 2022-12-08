/* eslint-disable @typescript-eslint/no-unused-vars */
import { Constructor } from "../data/types/Constructor"
import { ModelErrorsData } from "../data/types/ModelErrorsData"
import { ModelFirstErrorsData } from "../data/types/ModelFirstErrorsData"
import CreateIfNotExists from "../decorators/models/errors/CreateIfNotExists"
import Method from "../helpers/Method"
import empty from "../hooks/empty"

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

    public getError(property: keyof Schema): Array<string>
    {
        return this.errors[property] || []
    }

    public hasErrors(): boolean
    {
        return !empty(this.getErrors())
    }

    public hasError(property: keyof Schema): boolean
    {
        return !empty(this.getError(property))
    }

    public getFirstErrors(): ModelFirstErrorsData<Schema>
    {
        const firstErrors: ModelFirstErrorsData<Schema> = {}
        for (const property in this.errors) {
            firstErrors[property] = this.errors[property]?.shift()
        }
        return firstErrors
    }

    public getFirstError(property: keyof Schema): string | undefined
    {
        return this.getError(property).shift()
    }

    public getErrorsProperties(): Array<keyof Schema>
    {
        return Object.keys(this.errors).map(key => <keyof Schema> key)
    }

    public getFirstErrorProperty(): keyof Schema | undefined
    {
        return this.getErrorsProperties().shift()
    }

    @Method(<Constructor<CreateIfNotExists<Schema>>> CreateIfNotExists)
    public appendError(attribute: keyof Schema, message: string): this
    {
        this.errors[attribute]?.push(message)
        return this
    }

    public clearAllErrors(): this
    {
        this.getErrorsProperties().forEach(this.clearErrors)
        return this
    }

    public clearErrors(attribute: keyof Schema): this
    {
        delete this.errors[attribute]
        return this
    }

    public set operationErrors(errors: ModelErrorsData<Schema>)
    {
        this.errors = errors
    }
}