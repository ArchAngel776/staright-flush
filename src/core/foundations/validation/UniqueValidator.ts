/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter } from "mongodb"
import CollectionNameException from "../../../exceptions/CollectionNameException"
import Connection from "../../components/database/Connection"
import { String } from "../../data/enums/String"
import { Constructor } from "../../data/types/Constructor"
import FilterUniqueModel from "../../decorators/validation/FilterUniqueModel"
import Method from "../../helpers/Method"
import format from "../../hooks/format"
import Model from "../../Model"
import Validator from "../../Validator"

export default class UniqueValidator<Schema> extends Validator<Schema, boolean | string>
{
    protected collection: string = String.EMPTY

    public async validate(value: boolean | string): Promise<boolean>
    {
        if (typeof value === "boolean" && value) {
            if (!(this.model instanceof Model)) {
                throw new CollectionNameException
            }
            this.collection = this.model.collection()
        }
        else if (typeof value === "string") {
            this.collection = value
        }
        else {
            return true
        }
        
        return !await Connection.getConnection().make(db => db.collection(this.collection).countDocuments(this.filter()))
    }

    @Method(<Constructor<FilterUniqueModel<Schema>>> FilterUniqueModel)
    protected filter(): Filter<Schema>
    {
        const filter: Partial<Schema> = {}
        filter[this.attributeName as keyof Schema] = this.getProperty()
        return filter
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be unqiue in collection {collection}.", {
            attribute: this.attributeName,
            collection: this.collection
        })
    }
}