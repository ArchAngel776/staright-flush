import { Filter, FilterOperators } from "mongodb"
import { Projection } from "../enums/Projection"
import { KeyofModel } from "./KeyofModel"
import { ValueofModel } from "./ValueofModel"
import ModelSchema from "../interfaces/ModelSchema"

export type ProjectionMatchDataValue<Schema extends ModelSchema> = Filter<Schema> | FilterOperators<ValueofModel<Schema>>

export type ProjectionSliceDataValue = number | [ number, number ]

export type ProjectionDataValues<Schema extends ModelSchema> = ProjectionSliceDataValue | ProjectionMatchDataValue<Schema>

export type ProjectionSliceData = {
    $slice: ProjectionSliceDataValue
}

export type ProjectionMatchData<Schema extends ModelSchema> = {
    $elemMatch: ProjectionMatchDataValue<Schema>
}

export type ProjectionDataValue<Schema extends ModelSchema> = ProjectionSliceData | ProjectionMatchData<Schema>

export type ProjectionData<Schema extends ModelSchema> = {
    [Property in KeyofModel<Schema>]?: Projection | ProjectionDataValue<Schema>
}