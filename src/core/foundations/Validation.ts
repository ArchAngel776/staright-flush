/* eslint-disable @typescript-eslint/no-unused-vars */
import UniqueValidator from "./validation/UniqueValidator"
import { Validators } from "../data/interfaces/Validators"
import { AsyncAwait } from "../data/types/AsyncAwait"
import format from "../hooks/format"
import BaseModel from "./BaseModel"
import cast from "../hooks/cast"
import Method from "../helpers/Method"
import Required from "../decorators/validation/Required"
import { Constructor } from "../data/types/Constructor"
import RequiredValidator from "./validation/RequiredValidator"
import Scenario from "../data/interfaces/Scenario"
import defined from "../hooks/defined"
import { ErrorMessage } from "../data/interfaces/ErrorMessage"
import assert from "../hooks/assert"
import { Keyof } from "../data/types/Keyof"

export interface ValidationData
{
    required: boolean
    unique: boolean
}

export default abstract class Validation<Schema, Data extends ValidationData> implements Scenario<Schema>
{
    protected data: Partial<Data>

    public constructor(data: Partial<Data> = {})
    {
        this.data = data
    }

    public validators(): Validators<Schema, ValidationData>
    {
        return {
            required: RequiredValidator,
            unique: UniqueValidator
        }
    }

    public abstract isValid(model: BaseModel<Schema>, attribute: Keyof<Schema>): AsyncAwait<boolean>

    @Method(<Constructor<Required<Schema, Data>>> Required)
    public async make(model: BaseModel<Schema>, attribute: Keyof<Schema>): Promise<void>
    {
        assert(await this.isValid(model, attribute), this.getErrorMessage(model, attribute))

        const validators: Validators<Schema, Data> = cast(this.validators())
        
        for (const property in this.data) {
            if (!(defined(this.data[property]) && property in validators)) {
                continue
            }

            const Validator = validators[property]
            const validator = new Validator(model, attribute)

            const value = <Data[keyof Data]> this.data[property]

            assert(await validator.validate(value), format(this.getCustomError(property) || validator.getErrorMessage(), {
                attribute: <string> attribute
            }))
        }
    }

    public errorMessages(): ErrorMessage<Data>
    {
        return {}
    }

    public getCustomError(property: keyof Data): string | undefined
    {
        const errorMessages = this.errorMessages()
        return errorMessages[property]
    }

    public getErrorMessage(model: BaseModel<Schema>, attribute: Keyof<Schema>): string
    {
        return "Invalid property {attribute}"
    }

    public get properties(): Partial<Data>
    {
        return this.data
    }
}