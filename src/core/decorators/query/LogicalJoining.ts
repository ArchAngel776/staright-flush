import { Filter, RootFilterOperators } from "mongodb"

import { QueryLogical } from "@data/enums/QueryLogical"
import ModelSchema from "@data/interfaces/ModelSchema"
import { FunctionArguments } from "@data/types/FunctionArguments"

import MethodModel from "@foundations/MethodModel"
import QueryBuilder from "@components/builders/QueryBuilder"

import defined from "@hooks/defined"
import empty from "@hooks/empty"


export default class LogicalJoining<Schema extends ModelSchema> extends MethodModel<QueryBuilder<Schema>, QueryBuilder<Schema>, FunctionArguments>
{
    protected originalFilter: Filter<Schema>

    protected currentFilter: Filter<Schema>

    public constructor(target: QueryBuilder<Schema>)
    {
        super(target)
        this.originalFilter = {}
        this.currentFilter = {}
    }

    public method(this: QueryBuilder<Schema>, { original, withFilters, joinLogical }: LogicalJoining<Schema>, ...args: FunctionArguments): QueryBuilder<Schema>
    {
        if (empty(this.filter)) {
            return original(...args)
        }

        const filter = this.filter
        this.clearFilter()

        original(...args)
        withFilters(filter, this.filter)

        switch (this.logical) {
            case QueryLogical.OR:
                this.filter = joinLogical("$or")
                break
            case QueryLogical.NOR:
                this.filter = joinLogical("$nor")
                break
            case QueryLogical.AND:
                this.filter = joinLogical("$and")
                break
            case QueryLogical.NONE:
            default:
                break
        }

        this.logical = QueryLogical.NONE
        return this
    }

    public withFilters(originalFilter: Filter<Schema>, currentFilter: Filter<Schema>): void
    {
        this.originalFilter = originalFilter
        this.currentFilter = currentFilter
    }

    public joinLogical(joiner: keyof RootFilterOperators<Schema>): Filter<Schema>
    {
        if (this.determinateJoiner(<RootFilterOperators<Schema>> this.originalFilter, joiner)) {
            const filter = <RootFilterOperators<Schema>> this.originalFilter
            filter[joiner].push(this.currentFilter)
            return <Filter<Schema>> filter
        }
        const filter: RootFilterOperators<Schema> = {}
        filter[joiner] = [ this.originalFilter, this.currentFilter ]
        return <Filter<Schema>> filter
    }

    public determinateJoiner(filter: RootFilterOperators<Schema>, joiner: keyof RootFilterOperators<Schema>): boolean
    {
        return defined(filter[joiner]) && filter[joiner] instanceof Array
    }
}