import ModelSchema from "../../../data/interfaces/ModelSchema"
import { ProjectionSliceData, ProjectionSliceDataValue } from "../../../data/types/ProjectionData"
import QueryArrayProjectionExpression from "../../../foundations/query/QueryArrayProjectionExpression"

export default class QueryArrayProjectionSliceValue<Schema extends ModelSchema> extends QueryArrayProjectionExpression<Schema, ProjectionSliceDataValue>
{
    public getValue(): ProjectionSliceData
    {
        return { $slice: this.value }
    }
}