/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter } from "mongodb"
import QueryCallback from "../../data/callbacks/QueryCallback"
import { Projection } from "../../data/enums/Projection"
import { ProjectionArray } from "../../data/enums/ProjectionArray"
import { QueryArrayOperator } from "../../data/enums/QueryArrayOperator"
import { QueryLogical } from "../../data/enums/QueryLogical"
import { QueryOperator } from "../../data/enums/QueryOperator"
import ModelSchema from "../../data/interfaces/ModelSchema"
import QueryBuilderInterface from "../../data/interfaces/QueryBuilderInterface"
import { Constructor } from "../../data/types/Constructor"
import { FilterProperties } from "../../data/types/FilterProperties"
import { KeyofModel } from "../../data/types/KeyofModel"
import { MongoFunctionExpression } from "../../data/types/MongoFunctionExpression"
import { ProjectionData, ProjectionDataValues } from "../../data/types/ProjectionData"
import { QueryArrayValueType } from "../../data/types/QueryArrayValueType"
import { QueryValueType } from "../../data/types/QueryValueType"
import LogicalJoining from "../../decorators/query/LogicalJoining"
import Negation from "../../decorators/query/Negation"
import Method from "../../helpers/Method"
import QueryArrayValue from "../../helpers/query/QueryArrayValue"
import QueryExpressionValue from "../../helpers/query/QueryExpressionValue"
import QueryProjectionValue from "../../helpers/query/QueryProjectionValue"
import QueryValue from "../../helpers/query/QueryValue"

export default class QueryBuilder<Schema extends ModelSchema> implements QueryBuilderInterface<Schema>
{
    protected projection: ProjectionData<Schema>

    protected filter: Filter<Schema>

    protected logical: QueryLogical

    protected negation: boolean

    public constructor()
    {
        this.projection = {}
        this.filter = {}
        this.logical = QueryLogical.NONE
        this.negation = false
    }

    public with(...fields: Array<KeyofModel<Schema>>): this
    {
        fields.forEach(field => this.projection[field] = Projection.INC)
        return this
    }

    public withArray(field: KeyofModel<Schema>, type: ProjectionArray, condition: ProjectionDataValues<Schema>): this
    {
        this.projection[field] = new QueryProjectionValue(condition).getValue(type)
        return this
    }

    public without(...fields: Array<KeyofModel<Schema>>): this
    {
        fields.forEach(field => this.projection[field] = Projection.EXC)
        return this
    }

    @Method(<Constructor<LogicalJoining<Schema>>> LogicalJoining)
    @Method(<Constructor<Negation<Schema>>> Negation)
    public where(property: KeyofModel<Schema>, value: QueryValueType<Schema>, operator: QueryOperator = QueryOperator.EQ): this
    {
        (<FilterProperties<Schema>> this.filter) [property] = new QueryValue<Schema>(value).getValue(operator)
        return this
    }

    @Method(<Constructor<LogicalJoining<Schema>>> LogicalJoining)
    @Method(<Constructor<Negation<Schema>>> Negation)
    public whereArray(property: KeyofModel<Schema>, value: QueryArrayValueType<Schema>, operator: QueryArrayOperator = QueryArrayOperator.EXACT): this
    {
        (<FilterProperties<Schema>> this.filter) [property] = new QueryArrayValue<Schema>(value).getValue(operator)
        return this
    }
    
    @Method(<Constructor<LogicalJoining<Schema>>> LogicalJoining)
    public whereQuery(callback: QueryCallback<Schema>): this
    {
        this.filter = callback(new QueryBuilder).getFilter()
        return this
    }

    public whereExpression(expression: MongoFunctionExpression<Schema>): this 
    {
        this.filter = new QueryExpressionValue(expression).getValue()
        return this
    }

    public get not(): this
    {
        this.negation = true
        return this
    }

    public get or(): this
    {
        this.logical = QueryLogical.OR
        return this
    }

    public get nor(): this
    {
        this.logical = QueryLogical.NOR
        return this
    }

    public get and(): this
    {
        this.logical = QueryLogical.AND
        return this
    }

    public getProjection(): ProjectionData<Schema>
    {
        return this.projection
    }

    public getFilter(): Filter<Schema>
    {
        return this.filter
    }

    public clearProjection(): this
    {
        this.projection = {}
        return this
    }

    public clearFilter(): this
    {
        this.filter = {}
        return this
    }
}