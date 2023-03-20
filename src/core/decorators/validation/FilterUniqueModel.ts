import { Document, Filter, FilterOperators, ObjectId } from "mongodb"

import { QueryOperator } from "@data/enums/QueryOperator"

import MethodModel from "@foundations/MethodModel"
import UniqueValidator from "@foundations/validation/UniqueValidator"
import QueryValue from "@helpers/query/QueryValue"

import defined from "@hooks/defined"

import Model from "@core/Model"


export default class FilterUniqueModel<Schema> extends MethodModel<UniqueValidator<Schema>, Promise<boolean>, [filter: Filter<Document>]>
{
    public method(this: UniqueValidator<Schema>, { original, filterID }: FilterUniqueModel<Schema>, filter: Filter<Document>): Promise<boolean>
    {
        if (this.model instanceof Model && defined(this.model._id)) {
            filter._id = filterID(<ObjectId> this.model._id)
        }
        return original(filter)
    }

    public filterID(id: ObjectId): FilterOperators<ObjectId>
    {
        return new QueryValue(id).getValue(QueryOperator.NOT)
    }
}