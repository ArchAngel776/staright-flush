import { BSONType, BSONTypeAlias, Filter, FilterOperators } from "mongodb"
import QueryCallback from "../callbacks/QueryCallback"
import { ProjectionArray } from "../enums/ProjectionArray"
import { QueryArrayOperator } from "../enums/QueryArrayOperator"
import { QueryOperator } from "../enums/QueryOperator"
import { KeyofModel } from "../types/KeyofModel"
import { MongoFunctionExpression } from "../types/MongoFunctionExpression"
import { Multi } from "../types/Multi"
import { ProjectionData,ProjectionMatchDataValue, ProjectionSliceDataValue } from "../types/ProjectionData"
import { ValueofModel } from "../types/ValueofModel"
import ModelSchema from "./ModelSchema"

export default interface QueryBuilderInterface<Schema extends ModelSchema>
{
    with(...fields: Array<KeyofModel<Schema>>): this
    withArray(field: KeyofModel<Schema>, type: ProjectionArray.SLICE, condition: ProjectionSliceDataValue): this
    withArray(field: KeyofModel<Schema>, type: ProjectionArray.MATCH, condition: ProjectionMatchDataValue<Schema>): this
    without(...fields: Array<KeyofModel<Schema>>): this
    where(property: KeyofModel<Schema>, value: Multi<ValueofModel<Schema>>): this
    where(property: KeyofModel<Schema>, value: Multi<ValueofModel<Schema>>, operator: QueryOperator.EQ): this
    where(property: KeyofModel<Schema>, value: ValueofModel<Schema>, operator: QueryOperator.LT): this
    where(property: KeyofModel<Schema>, value: ValueofModel<Schema>, operator: QueryOperator.LTE): this
    where(property: KeyofModel<Schema>, value: ValueofModel<Schema>, operator: QueryOperator.GT): this
    where(property: KeyofModel<Schema>, value: ValueofModel<Schema>, operator: QueryOperator.GTE): this
    where(property: KeyofModel<Schema>, value: BSONType | BSONTypeAlias, operator: QueryOperator.TYPE): this
    where(property: KeyofModel<Schema>, value: boolean, operator: QueryOperator.EXISTS): this
    where(property: KeyofModel<Schema>, value: Multi<ValueofModel<Schema>>, operator: QueryOperator.NOT): this
    whereArray(property: KeyofModel<Schema>, value: Array<ValueofModel<Schema>>): this
    whereArray(property: KeyofModel<Schema>, value: Array<ValueofModel<Schema>>, operator: QueryArrayOperator.EXACT): this
    whereArray(property: KeyofModel<Schema>, value: Multi<ValueofModel<Schema>>, operator: QueryArrayOperator.CONTAIN): this
    whereArray(property: KeyofModel<Schema>, value: Filter<Schema> | FilterOperators<ValueofModel<Schema>>, operator: QueryArrayOperator.HAS): this
    whereArray(property: KeyofModel<Schema>, value: Filter<Schema> | FilterOperators<ValueofModel<Schema>>, operator: QueryArrayOperator.MATCH): this
    whereArray(property: KeyofModel<Schema>, value: number, operator: QueryArrayOperator.LENGTH): this
    whereQuery(callback: QueryCallback<Schema>): this
    whereExpression(expression: MongoFunctionExpression<Schema>): this
    get not(): this
    get or(): this
    get nor(): this
    get and(): this
    getProjection(): ProjectionData<Schema>
    getFilter(): Filter<Schema>
    clearProjection(): this
    clearFilter(): this
}