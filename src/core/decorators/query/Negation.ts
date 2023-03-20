import { Filter, FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { FilterProperties } from "@data/types/FilterProperties"
import { FunctionArguments } from "@data/types/FunctionArguments"
import { KeyofModel } from "@data/types/KeyofModel"
import { ValueofModel } from "@data/types/ValueofModel"

import MethodModel from "@foundations/MethodModel"
import QueryBuilder from "@components/builders/QueryBuilder"


export default class Negation<Schema extends ModelSchema> extends MethodModel<QueryBuilder<Schema>, QueryBuilder<Schema>, [property: KeyofModel<Schema>, ...args: FunctionArguments]>
{
    public method(this: QueryBuilder<Schema>, { original, getNegatedValue }: Negation<Schema>, property: KeyofModel<Schema>, ...args: FunctionArguments): QueryBuilder<Schema>
    {
        original(property, ...args)
        if (this.negation) {
            this.negation = false
            this.filter = getNegatedValue(<FilterProperties<Schema>> this.filter, property)
        }
        return this
    }

    public getNegatedValue(filter: FilterProperties<Schema>, property: KeyofModel<Schema>): Filter<Schema>
    {
        filter[property] = <FilterOperators<ValueofModel<Schema>>> { $not: filter[property] }
        return <Filter<Schema>> filter
    }
}