/* eslint-disable @typescript-eslint/no-unused-vars */
import { Validators } from "@data/interfaces/Validators"
import { AsyncAwait } from "@data/types/AsyncAwait"
import { ErrorMessage } from "@data/interfaces/ErrorMessage"
import Scenario from "@data/interfaces/Scenario"
import { UniqueValue } from "@data/types/UniqueValue"
import { Constructor } from "@data/types/Constructor"
import type { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import RequiredValidator from "@foundations/validation/RequiredValidator"
import UniqueValidator from "@foundations/validation/UniqueValidator"
import SameValidator from "@foundations/validation/SameValidator"
import Method from "@helpers/Method"
import Required from "@decorators/validation/Required"

import assert from "@hooks/assert"
import defined from "@hooks/defined"
import cast from "@hooks/cast"
import format from "@hooks/format"


export interface ValidationData<Schema>
{
    required: boolean
    unique: UniqueValue
    sameAs: Keyof<Schema>
}

export default abstract class Validation<Schema, Data extends ValidationData<Schema>> implements Scenario<Schema>
{
    protected data: Partial<Data>

    public constructor(data: Partial<Data> = {})
    {
        this.data = data
    }

    public validators(): Validators<Schema, ValidationData<Schema>>
    {
        return {
            required:   RequiredValidator,
            unique:     UniqueValidator,
            sameAs:     SameValidator
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

            const value = this.data[property]
            if (!value) {
                continue
            }

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