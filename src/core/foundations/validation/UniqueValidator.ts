/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Document, Filter } from "mongodb"

import { String } from "@data/enums/String"
import { Constructor } from "@data/types/Constructor"
import { Keyof } from "@data/types/Keyof"
import type { UniqueValue } from "@data/types/UniqueValue"

import BaseModel from "@foundations/BaseModel"
import Connection from "@components/database/Connection"
import Method from "@helpers/Method"
import Unique from "@helpers/Unique"
import FilterUniqueModel from "@decorators/validation/FilterUniqueModel"
import UniqueValidatorModel from "@decorators/validation/UniqueValidatorModel"

import format from "@hooks/format"

import Validator from "@core/Validator"


export default class UniqueValidator<Schema> extends Validator<Schema, UniqueValue>
{
    protected readonly connection: Connection

    protected collection: string = String.EMPTY

    public constructor(model: BaseModel<Schema>, attribute: Keyof<Schema>)
    {
        super(model, attribute)
        this.connection = Connection.getConnection()
    }

    @Method(<Constructor<UniqueValidatorModel<Schema>>> UniqueValidatorModel)
    public async validate(value: UniqueValue): Promise<boolean>
    {
        if (value instanceof Unique) {
            this.collection = value.getModel().collection()
            const attribute = value.keyPath || this.attributeName

            return this.checkDatabase({
                [attribute]: this.getProperty()
            })
        }
        return true
    }

    @Method(<Constructor<FilterUniqueModel<Schema>>> FilterUniqueModel)
    protected async checkDatabase(filter: Filter<Document>): Promise<boolean>
    {
        return await this.connection.make(database => database.collection(this.collection).countDocuments(filter)) === 0
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be unqiue in collection {collection}.", {
            attribute: this.attributeName,
            collection: this.collection
        })
    }
}