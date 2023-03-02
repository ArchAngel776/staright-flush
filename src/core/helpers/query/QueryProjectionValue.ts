import UnknownProjectionTypeException from "../../../exceptions/UnknownProjectionTypeException"
import { ProjectionArray } from "../../data/enums/ProjectionArray"
import ModelSchema from "../../data/interfaces/ModelSchema"
import { ProjectionDataValue, ProjectionDataValues } from "../../data/types/ProjectionData"
import QueryArrayProjectionExpression from "../../foundations/query/QueryArrayProjectionExpression"
import QueryArrayProjectionMatchValue from "./projection/QueryArrayProjectionMatchValue"
import QueryArrayProjectionSliceValue from "./projection/QueryArrayProjectionSliceValue"

export default class QueryProjectionValue<Schema extends ModelSchema>
{
    protected value: ProjectionDataValues<Schema>

    public constructor(value: ProjectionDataValues<Schema>)
    {
        this.value = value
    }

    public getValue(type: ProjectionArray): ProjectionDataValue<Schema>
    {
        return this.getExpression(type).getValue()
    }

    protected getExpression(type: ProjectionArray): QueryArrayProjectionExpression<Schema>
    {
        switch (type) {
            case ProjectionArray.SLICE:
                return new QueryArrayProjectionSliceValue(this.value)
            case ProjectionArray.MATCH:
                return new QueryArrayProjectionMatchValue(this.value)
            default:
                throw new UnknownProjectionTypeException
        }
    }
}