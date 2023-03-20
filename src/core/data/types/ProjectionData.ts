import { Filter, FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { Projection } from "@data/enums/Projection"
import { KeyofModel } from "@data/types/KeyofModel"
import { ValueofModel } from "@data/types/ValueofModel"


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