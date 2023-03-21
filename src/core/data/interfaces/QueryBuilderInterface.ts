import { BSONType, BSONTypeAlias, Filter, FilterOperators } from "mongodb"

import QueryCallback from "@data/callbacks/QueryCallback"
import { ProjectionArray } from "@data/enums/ProjectionArray"
import { QueryArrayOperator } from "@data/enums/QueryArrayOperator"
import { QueryOperator } from "@data/enums/QueryOperator"
import { KeyofModel } from "@data/types/KeyofModel"
import { MongoFunctionExpression } from "@data/types/MongoFunctionExpression"
import { Multi } from "@data/types/Multi"
import { ProjectionData,ProjectionMatchDataValue, ProjectionSliceDataValue } from "@data/types/ProjectionData"
import { ValueofModel } from "@data/types/ValueofModel"
import ModelSchema from "@data/interfaces/ModelSchema"


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